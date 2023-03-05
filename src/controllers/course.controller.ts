/* eslint-disable @typescript-eslint/no-explicit-any */

import { Course } from "../entities/Course";
import { ICourse, courseResponse } from "../core/CourseResponse";

class CourseController {
  getCourse = async (id: string): Promise<ICourse> => {
    const course = await Course.findOne({
      relations: {
        faculties: true,
        allowed_slots: {
          timings: true,
        },
      },
      where: { id },
    });
    if (!course) {
      throw new Error(`Course id ${id} not found`);
    }
    return courseResponse(course);
  };
}

export default CourseController;
