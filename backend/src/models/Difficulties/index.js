import Joi from "joi";
import AbstractManager from "../AbstractManager.js";

class Difficulties extends AbstractManager {
  constructor() {
    super({
      table: "difficulty",
      schema: Joi.object({
        name: Joi.string().max(45).required(),
        speed: Joi.number().max(10).required(),
        time: Joi.number().max(60).required(),
        coef_point: Joi.number().precision(2).positive().required(),
        malus_point: Joi.number().precision(2).positive().required(),
      }),
    });
  }
}

export default new Difficulties();
