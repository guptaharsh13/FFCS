import { Entity, BaseEntity, Column, PrimaryColumn, ManyToMany } from "typeorm";
import { Course } from "./Course";

@Entity("faculty")
export class Faculty extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Course, (course) => course.faculties)
  courses: Course[];
}
