import {
  Entity,
  BaseEntity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { Course } from "./Course";
import { Slot } from "./Slot";
import { Student } from "./Student";

@Entity("registered_course")
export class RegisteredCourse extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Course, (course) => course.registered_courses)
  course: Course;

  @ManyToMany(() => Slot, (slots) => slots.registered_courses)
  @JoinTable({
    name: "registered_courses_slots",
    joinColumn: {
      name: "registered_course",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "slot",
      referencedColumnName: "id",
    },
  })
  slots: Slot[];

  @ManyToOne(() => Student, (student) => student.registered_courses)
  student: Student;
}
