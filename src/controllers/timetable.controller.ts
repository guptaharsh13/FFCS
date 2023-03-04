import { User } from "../entities/User";
import { Student } from "../entities/Student";

class TimetableController {
  getTimetable = async (user: Express.User | undefined): Promise<Student> => {
    if (!user) {
      throw new Error("User not found");
    }
    const registration_number = (user as User).registration_number;
    const student = await Student.findOneBy({ id: registration_number });
    if (!student) {
      throw new Error("Student not found");
    }
    return student;
  };
}

export default TimetableController;
