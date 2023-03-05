/* eslint-disable @typescript-eslint/no-explicit-any */

import { User } from "../entities/User";
import { Student } from "../entities/Student";
import { IStudent, studentResponse } from "../core/StudentResponse";

class TimetableController {
  getTimetable = async (user: Express.User | undefined): Promise<IStudent> => {
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
    return studentResponse(student);
  };
}

export default TimetableController;
