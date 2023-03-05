import { Course } from "../entities/Course";
import { Slot } from "../entities/Slot";
import { Student } from "../entities/Student";
import { checkClash } from "../utils/utils";
import { User } from "../entities/User";
import { RegisteredCourse } from "../entities/RegisteredCourse";
import { IStudent, studentResponse } from "../core/StudentResponse";

class RegisterController {
  registerCourse = async (
    data: {
      course_id: string;
      faculty_id: string;
      slot_ids: string[];
    },
    user: Express.User | undefined
  ): Promise<IStudent> => {
    const { course_id, faculty_id, slot_ids } = data;

    const course = await Course.findOne({
      relations: {
        faculties: true,
        allowed_slots: true,
      },
      where: { id: course_id },
    });
    if (!course) {
      throw new Error(`Course id ${course_id} not found`);
    }

    if (!course.faculties.map((faculty) => faculty.id).includes(faculty_id)) {
      throw new Error("Faculty doesn't teach this course");
    }

    const allowed_slots = course.allowed_slots.map((slot) => slot.id);
    for (const slot_id of slot_ids) {
      if (!allowed_slots.includes(slot_id)) {
        throw new Error("Course not available in this slot");
      }
    }

    const slots: Slot[] = [];
    for (const slot_id of slot_ids) {
      const slot = await Slot.findOneBy({ id: slot_id });
      if (!slot) {
        throw new Error(`Slot id ${slot_id} not found`);
      }
      slots.push(slot);
    }

    if (!user) {
      throw new Error("User not found");
    }
    const registration_number = (user as User).registration_number;
    const student = await Student.findOne({
      relations: {
        registered_courses: {
          course: {
            faculties: true,
            allowed_slots: {
              timings: true,
            },
          },
          slots: {
            timings: true,
          },
        },
      },
      where: { id: registration_number },
    });
    if (!student) {
      throw new Error("Student not found");
    }
    if (
      student.registered_courses
        .map(
          (registered_course: RegisteredCourse) => registered_course.course.id
        )
        .includes(course_id)
    ) {
      throw new Error("Course already registered");
    }

    for (const registered_course of student.registered_courses) {
      const registered_slots = registered_course.slots.map(
        (slot: Slot) => slot.id
      );
      // almost constant time complexity
      // because slots and registered_slots would contain limited number of elements only
      for (const slot_id of slot_ids) {
        for (const registered_slot of registered_slots) {
          // checkClash can query the database in almost constant time
          if (await checkClash(slot_id, registered_slot)) {
            throw new Error(
              `Slot id ${slot_id} clashed with ${registered_slot}`
            );
          }
        }
      }
    }

    const registeredCourse = RegisteredCourse.create({
      course,
      slots,
    });
    student.registered_courses.push(registeredCourse);
    await student.save();

    const res = await Student.findOne({
      relations: {
        registered_courses: {
          course: {
            faculties: true,
            allowed_slots: {
              timings: true,
            },
          },
          slots: {
            timings: true,
          },
        },
      },
      where: { id: student.id },
    });
    if (!res) {
      throw new Error("Student not created");
    }
    return studentResponse(res);
  };
}

export default RegisterController;
