import {
  Entity,
  BaseEntity,
  Column,
  JoinTable,
  OneToOne,
  PrimaryColumn,
} from "typeorm";

import { Student } from "./Student";

export enum Role {
  ADMIN = "admin",
  STUDENT = "student",
}

@Entity("user")
export class User extends BaseEntity {
  @PrimaryColumn()
  registration_number: string;

  @OneToOne(() => Student, { nullable: true })
  @JoinTable()
  student: Student;

  @Column({
    type: "enum",
    enum: Role,
  })
  role: Role;

  @Column()
  hash: string;

  @Column()
  salt: string;
}
