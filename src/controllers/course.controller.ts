import { Course } from "../entities/Course";

class CourseController {
  getCourse = async (id: string): Promise<Course> => {
    const course = await Course.findOneBy({ id });
    if (!course) {
      throw new Error(`Course id ${id} not found`);
    }
    return course;
  };
}

export default CourseController;
