/* eslint-disable @typescript-eslint/no-explicit-any */
import { CourseType } from "../entities/Course";
import { Course } from "../entities/Course";

interface ICourse {
  id: string;
  name: string;
  faculties: {
    id: string;
    name: string;
  }[];
  course_type: CourseType;
  allowed_slots: any;
}

const courseResponse = (course: Course) => {
  const { id, name, faculties, course_type, allowed_slots } = course;
  return {
    id,
    name,
    faculties,
    course_type,
    allowed_slots: allowed_slots.map((allowed_slot) => {
      const { id, timings } = allowed_slot;
      return {
        id,
        timings: timings.map((timing) => {
          const { day, start, end } = timing;
          return {
            day,
            start,
            end,
          };
        }),
      };
    }),
  };
};

export { ICourse, courseResponse };
