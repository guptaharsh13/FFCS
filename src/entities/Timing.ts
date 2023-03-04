import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Slot } from "./Slot";

export enum Day {
  MON = "MON",
  TUE = "TUE",
  WED = "WED",
  THU = "THU",
  FRI = "FRI",
}

@Entity("timing")
export class Timing extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index()
  @Column({
    type: "enum",
    enum: Day,
  })
  day: Day;

  @Index()
  @Column()
  start: Date;

  @Index()
  @Column()
  end: Date;

  @ManyToMany(() => Slot, (slot) => slot.timings)
  @JoinTable({
    name: "timings_slots",
    joinColumn: {
      name: "timings",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "slots",
      referencedColumnName: "id",
    },
  })
  slots: Slot[];
}
