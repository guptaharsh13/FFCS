import { Entity, BaseEntity, Column, PrimaryColumn } from "typeorm";

@Entity("clashed_slot")
export class ClashedSlot extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column("simple-array", {
    default: [],
    nullable: false,
  })
  clashed_slots: string[];
}
