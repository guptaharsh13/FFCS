/* eslint-disable @typescript-eslint/no-explicit-any */

import { Slot } from "../entities/Slot";

interface ISlot {
  id: string;
  timings: any;
}

const slotResponse = (slot: Slot) => {
  const { id, timings } = slot;
  return {
    id,
    timings: timings.map((timing) => {
      const { day, start, end } = timing;
      return {
        day,
        start,
        end,
      };
    }),
  };
};

export { ISlot, slotResponse };
