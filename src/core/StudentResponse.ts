/* eslint-disable @typescript-eslint/no-explicit-any */

import { Student } from "../entities/Student";

interface IStudent {
  id: string;
  name: string;
  registered_courses: any;
}

const studentResponse = (res: Student) => {
  const student: IStudent = {
    id: res.id,
    name: res.name,
    registered_courses: res.registered_courses.map((registered_course) => {
      const { course, slots } = registered_course;
      const { id, name, faculties, course_type, allowed_slots } = course;
      return {
        course: {
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
        },
        slots: slots.map((slot) => {
          const { id, timings } = slot;
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
    }),
  };
  return student;
};

export { IStudent, studentResponse };
