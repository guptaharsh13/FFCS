import { Entity, BaseEntity, PrimaryColumn, ManyToMany } from "typeorm";

import { Timing } from "./Timing";
import { Course } from "./Course";
import { RegisteredCourse } from "./RegisteredCourse";

@Entity("slot")
export class Slot extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @ManyToMany(() => Timing, (timing) => timing.slots)
  timings: Timing[];

  @ManyToMany(() => Course, (course) => course.allowed_slots)
  courses: Course[];

  @ManyToMany(
    () => RegisteredCourse,
    (registered_course) => registered_course.slots
  )
  registered_courses: RegisteredCourse[];
}
