/* eslint-disable @typescript-eslint/no-explicit-any */

import { Day } from "../entities/Timing";
import { ClashedSlot } from "../entities/ClashedSlot";
import { Request, Response, NextFunction } from "express";
import ApiResponse from "../core/ApiResponse";
import * as crypto from "crypto";
import { User } from "../entities/User";
import jsonwebtoken from "jsonwebtoken";
import * as path from "path";
import * as fs from "fs";

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

const genPassword = (password: string) => {
  const salt = crypto.randomBytes(32).toString("hex");
  const genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hash: genHash,
  };
};

/**
 *
 * @param {*} password - The plain text password
 * @param {*} hash - The hash stored in the database
 * @param {*} salt - The salt stored in the database
 *
 * This function uses the crypto library to decrypt the hash using the salt and then compares
 * the decrypted hash/salt with the password that the user provided at login
 */
const validPassword = (password: string, hash: string, salt: string) => {
  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === hashVerify;
};

const pathToKey = path.join(__dirname, "..", "id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");

/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the PostgreSQL user ID
 */
const issueJWT = (user: User) => {
  const { registration_number } = user;

  const payload = {
    sub: registration_number,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
  };
};

export {
  dayMap,
  parseTime,
  sanitize,
  checkClash,
  genPassword,
  validPassword,
  issueJWT,
};
