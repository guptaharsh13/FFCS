import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { Slot } from "./Slot";

export enum Day {
  MON,
  TUE,
  WED,
  THU,
  FRI,
}

@Entity("timing")
export class Timing extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "enum",
    enum: Day,
  })
  day: Day;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @ManyToOne(() => Slot, (slot) => slot.timings, { onDelete: "CASCADE" })
  slot: Slot;
}
