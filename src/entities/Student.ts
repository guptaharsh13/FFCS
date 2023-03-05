import { Entity, BaseEntity, Column, PrimaryColumn, OneToMany } from "typeorm";

import { RegisteredCourse } from "./RegisteredCourse";

@Entity("student")
export class Student extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(
    () => RegisteredCourse,
    (registered_course) => registered_course.student,
    { cascade: true }
  )
  registered_courses: RegisteredCourse[];
}
