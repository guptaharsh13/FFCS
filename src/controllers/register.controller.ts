import { Course } from "../entities/Course";
import { Student } from "../entities/Student";
import { checkClash } from "../core/utils";

class RegisterController {
  registerCourse = async (data: {
    course_id: string;
    faculty_id: string;
    slot_ids: string[];
  }): Promise<Student> => {
    const { course_id, faculty_id, slot_ids } = data;

    const course = await Course.findOneBy({ id: course_id });
    if (!course) {
      throw new Error(`Course id ${course_id} not found`);
    }

    if (!course.faculties.map((faculty) => faculty.id).includes(faculty_id)) {
      throw new Error("Faculty doesn't teach this course");
    }

    if (course.allowed_slots.map((slot) => slot.id) !== slot_ids) {
      throw new Error("Course not available in this slot");
    }

    const student_id = ""; // from req
    const student = await Student.findOneBy({ id: student_id });
    if (!student) {
      throw new Error(`Student not found`);
    }
    if (
      student.registered_courses.map((course) => course.id).includes(course_id)
    ) {
      throw new Error("Course already registered");
    }

    const slots = course.allowed_slots.map((slot) => slot.id);
    for (const registered_course of student.registered_courses) {
      const registered_slots = registered_course.allowed_slots.map(
        (slot) => slot.id
      );
      for (const slot of slots) {
        for (const registered_slot of registered_slots) {
          if (await checkClash(slot, registered_slot)) {
            throw new Error(`Slot id ${slot} clashed with ${registered_slot}`);
          }
        }
      }
    }

    await Student.update(
      { id: student_id },
      { registered_courses: [...student.registered_courses, course] }
    );
    return student;
  };
}

export default RegisterController;
