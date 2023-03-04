/* eslint-disable @typescript-eslint/no-explicit-any */

import { Course } from "../entities/Course";
import { Faculty } from "../entities/Faculty";
import { Slot } from "../entities/Slot";
import { Student } from "../entities/Student";
import { CourseType } from "../entities/Course";
import { Timing } from "../entities/Timing";
import { ClashedSlot } from "../entities/ClashedSlot";
import { LessThanOrEqual, MoreThanOrEqual } from "typeorm";

import { dayMap, parseTime, checkClash } from "../utils/utils";

class AdminController {
  createFaculty = async (data: {
    id: string;
    name: string;
  }): Promise<Faculty> => {
    const { id, name } = data;

    if (await Faculty.findOneBy({ id })) {
      throw new Error("Duplicate Faculty id");
    }

    const faculty: Faculty = Faculty.create({
      id,
      name,
    });
    await faculty.save();
    return faculty;
  };

  createCourse = async (data: {
    id: string;
    name: string;
    slot_ids: string[];
    faculty_ids: string[];
    course_type: CourseType;
  }): Promise<Course> => {
    const { id, name, slot_ids, faculty_ids, course_type } = data;

    if (await Course.findOneBy({ id })) {
      throw new Error("Duplicate Course id");
    }

    const slots: Slot[] = [];
    const faculties: Faculty[] = [];

    for (const slot_id of slot_ids) {
      const slot = await Slot.findOneBy({ id: slot_id });
      if (!slot) {
        throw new Error(`Slot id ${slot_id} not found`);
      }
      slots.push(slot);
    }

    // slots should not clash with each other
    for (let i = 0; i < slot_ids.length - 1; i++) {
      for (let j = i + 1; j < slot_ids.length; j++) {
        // check clash between i and j
        if (await checkClash(slot_ids[i], slot_ids[j])) {
          throw new Error(`Slot id ${slot_ids[i]} clashes with ${slot_ids[j]}`);
        }
      }
    }

    for (const faculty_id of faculty_ids) {
      const faculty = await Faculty.findOneBy({ id: faculty_id });
      if (!faculty) {
        throw new Error(`Faculty id ${faculty_id} not found`);
      }
      faculties.push(faculty);
    }

    const course: Course = Course.create({
      id,
      name,
      allowed_slots: slots,
      faculties,
      course_type,
    });
    await course.save();
    return course;
  };

  createStudent = async (data: {
    id: string;
    name: string;
  }): Promise<Student> => {
    const { id, name } = data;

    if (await Student.findOneBy({ id })) {
      throw new Error("Duplicate Registration Number");
    }

    const student: Student = Student.create({
      id,
      name,
    });

    await student.save();
    return student;
  };

  createSlot = async (data: {
    id: string;
    timings: { day: string; start: string; end: string }[];
  }): Promise<Slot> => {
    const { id, timings } = data;

    if (await Slot.findOneBy({ id })) {
      throw new Error("Duplicate Slot id");
    }

    const slot = new Slot();
    slot.id = id;
    const createdTimings: Timing[] = [];
    const clashedTimings: Timing[] = [];

    for (const timing of timings) {
      const { day, start, end } = timing;
      const startTime = parseTime(start);
      const endTime = parseTime(end);

      if (startTime >= endTime) {
        throw new Error("Start time must be less than end time");
      }

      clashedTimings.push(
        ...(await Timing.findBy({
          day: dayMap[day],
          start: LessThanOrEqual(endTime),
          end: MoreThanOrEqual(startTime),
        }))
      );

      // create timing
      const createTiming = Timing.create({
        day: dayMap[day],
        start: startTime,
        end: endTime,
      });
      await createTiming.save();
      createdTimings.push(createTiming);
    }

    const clashed_slot_ids: Set<string> = new Set();
    for (const clashedTiming of clashedTimings) {
      const temp = await Timing.findOne({
        relations: {
          slots: true,
        },
        where: {
          id: clashedTiming.id,
        },
      });
      if (temp) {
        for (const clashed_slot of temp.slots) {
          clashed_slot_ids.add(clashed_slot.id);
        }
      }
    }

    for (const clashed_slot_id of clashed_slot_ids) {
      const clashed_slot = await ClashedSlot.findOneBy({ id: clashed_slot_id });
      if (!clashed_slot) {
        continue;
      }
      if (!clashed_slot.clashed_slots.includes(id)) {
        await ClashedSlot.update(
          { id: clashed_slot.id },
          { clashed_slots: [...clashed_slot.clashed_slots, id] }
        );
      }
    }

    const clashedSlot = ClashedSlot.create({
      id,
      clashed_slots: Array.from(clashed_slot_ids),
    });
    await clashedSlot.save();

    slot.timings = createdTimings;
    await slot.save();
    return slot;
  };
}

export default AdminController;
