import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  OneToMany,
  ManyToMany,
} from "typeorm";

import { Timing } from "./Timing";
import { Course } from "./Course";

@Entity("slot")
export class Slot extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @OneToMany(() => Timing, (timing) => timing.slot)
  timings: Timing[];

  @ManyToMany(() => Course, (course) => course.allowed_slots)
  courses: Course[];
}
