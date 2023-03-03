import * as Joi from "joi";
import constants from "../constants";

const schemas = {
  createFaculty: Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
  }),

  createCourse: Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    slot_ids: Joi.array().items(Joi.string().required()).required(),
    faculty_ids: Joi.array().items(Joi.string().required()).required(),
    course_type: Joi.string().valid(constants.THEORY, constants.LAB),
  }),

  createStudent: Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
  }),

  createSlot: Joi.object({
    id: Joi.string().required(),
    timings: Joi.array().items(
      Joi.object({
        day: Joi.string().valid(
          constants.MON,
          constants.TUE,
          constants.WED,
          constants.THU,
          constants.FRI
        ).required(),
        start: Joi.string()
          .required()
          .regex(/^[0-1]?\d:\d{2} ?(AM|PM)$/),
        end: Joi.string()
          .required()
          .regex(/^[0-1]?\d:\d{2} ?(AM|PM)$/),
      }).required()
    ),
  }),
};

export default schemas;
