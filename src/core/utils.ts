/* eslint-disable @typescript-eslint/no-explicit-any */

import { Day } from "../entities/Timing";
import { ClashedSlot } from "../entities/ClashedSlot";
import { Request, Response, NextFunction } from "express";
import ApiResponse from "./ApiResponse";

const { unprocessableEntryResponse } = new ApiResponse();

const dayMap: { [key: string]: Day } = {
  MON: Day.MON,
  TUE: Day.TUE,
  WED: Day.WED,
  THU: Day.THU,
  FRI: Day.FRI,
};

const sanitize = (req: Request, res: Response, next: NextFunction): void => {
  try {
    let timings: { day: string; start: string; end: string }[] =
      req.body.timings;
    timings = timings.map((timing) => {
      const { day, start, end } = timing;
      return {
        day: day.toUpperCase(),
        start,
        end,
      };
    });
    req.body.timings = timings;
    next();
  } catch (error) {
    unprocessableEntryResponse(res, "Invalid Request");
  }
};

const parseTime = (time: string): Date => {
  const regex = /^([0-1]?\d) ?: ?(\d{2}) ?(am|pm)$/gis;
  const temp: any = regex.exec(time);
  const hours = temp[1];
  const minutes = temp[2];
  let meridian: string = temp[3];
  meridian = meridian.toLowerCase();

  const date = new Date(0);
  date.setHours(
    parseInt(hours, 10) + (meridian === "pm" && hours !== "12" ? 12 : 0)
  );
  date.setMinutes(parseInt(minutes, 10));
  return date;
};

const checkClash = async (id1: string, id2: string): Promise<boolean> => {
  if (id1 === id2) {
    return true;
  }
  const slot = await ClashedSlot.findOneBy({ id: id1 });
  if (!slot) {
    throw new Error(`Slot id ${id1} not found in clashed_slot`);
  }
  return slot.clashed_slots.includes(id2);
};

export { dayMap, parseTime, sanitize, checkClash };
