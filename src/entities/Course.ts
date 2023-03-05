import {
  Entity,
  BaseEntity,
  Column,
  PrimaryColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { Faculty } from "./Faculty";
import { RegisteredCourse } from "./RegisteredCourse";
import { Slot } from "./Slot";
import { Student } from "./Student";

export enum CourseType {
  THEORY = "THEORY",
  LAB = "LAB",
}

@Entity("course")
export class Course extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Faculty, (faculty) => faculty.courses)
  @JoinTable({
    name: "courses_faculties",
    joinColumn: {
      name: "course",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "faculty",
      referencedColumnName: "id",
    },
  })
  faculties: Faculty[];

  @Column({
    type: "enum",
    enum: CourseType,
    nullable: true,
  })
  course_type: CourseType;

  @ManyToMany(() => Slot, (slot) => slot.courses)
  @JoinTable({
    name: "courses_slots",
    joinColumn: {
      name: "course",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "slot",
      referencedColumnName: "id",
    },
  })
  allowed_slots: Slot[];

  @ManyToMany(() => Student, (student) => student.registered_courses)
  students: Student[];

  @OneToMany(
    () => RegisteredCourse,
    (registered_course) => registered_course.course
  )
  registered_courses: RegisteredCourse[];
}
