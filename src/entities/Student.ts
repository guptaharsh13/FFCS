import {
  Entity,
  BaseEntity,
  Column,
  PrimaryColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Course } from "./Course";

@Entity("student")
export class Student extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Course, (course) => course.students)
  @JoinTable({
    name: "students_courses",
    joinColumn: {
      name: "student",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "course",
      referencedColumnName: "id",
    },
  })
  registered_courses: Course[];
}
