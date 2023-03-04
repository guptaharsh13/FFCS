import * as Joi from "joi";
import constants from "../utils/constants";

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
        day: Joi.string()
          .valid(
            constants.MON,
            constants.TUE,
            constants.WED,
            constants.THU,
            constants.FRI
          )
          .required(),
        start: Joi.string()
          .required()
          .regex(/^[0-1]?\d:\d{2} ?(AM|PM)$/),
        end: Joi.string()
          .required()
          .regex(/^[0-1]?\d:\d{2} ?(AM|PM)$/),
      }).required()
    ),
  }),

  getFaculty: Joi.object({
    faculty_id: Joi.string().required(),
  }),

  getCourse: Joi.object({
    id: Joi.string().required(),
  }),

  registerCourse: Joi.object({
    course_id: Joi.string().required(),
    faculty_id: Joi.string().required(),
    slot_ids: Joi.array().items(Joi.string().required()).required(),
  }),

  register: Joi.object({
    registration_number: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().valid(constants.ADMIN, constants.STUDENT).required(),
  }),

  login: Joi.object({
    registration_number: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

export default schemas;
