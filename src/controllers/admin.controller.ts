import { Course } from "../entities/Course";
import { Faculty } from "../entities/Faculty";
import { Slot } from "../entities/Slot";
import { Student } from "../entities/Student";
import { CourseType } from "../entities/Course";

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

    let slot_not_found = "";

    for (const slot_id of slot_ids) {
      const slot = await Slot.findOneBy({ id: slot_id });
      if (!slot) {
        slot_not_found = slot_id;
        break
      }
      slots.push(slot);
    }

    if (slot_not_found) {
      throw new Error(`Slot id ${slot_not_found} not found`);
    }

    let faculty_not_found = "";

    for (const faculty_id of faculty_ids) {
      const faculty = await Faculty.findOneBy({ id: faculty_id });
      if (!faculty) {
        faculty_not_found = faculty_id;
        break
      }
      faculties.push(faculty); 
    }

    if (faculty_not_found) {
      throw new Error(`Faculty id ${faculty_not_found} not found`);
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

  // createSlot = async (data: {
  //   id: string;
  //   timings: { day: string; start: Date; end: Date }[];
  // }): Promise<Slot> => {
  //   const { id, timings } = data;

  //   if (await Slot.findOneBy({ id })) {
  //     throw new Error("Duplicate Slot id");
  //   }

  //   const slot = new Slot();
  //   slot.id = id;
  //   const temp: Timing[] = [];

  //   await slot.save();
  //   return slot;
  // };
}

export default AdminController;
