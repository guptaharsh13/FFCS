import { Entity, BaseEntity, PrimaryColumn, ManyToMany } from "typeorm";

import { Timing } from "./Timing";
import { Course } from "./Course";

@Entity("slot")
export class Slot extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @ManyToMany(() => Timing, (timing) => timing.slots)
  timings: Timing[];

  @ManyToMany(() => Course, (course) => course.allowed_slots)
  courses: Course[];
}
