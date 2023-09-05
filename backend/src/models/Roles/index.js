import Joi from "joi";
import AbstractManager from "../AbstractManager.js";

class Roles extends AbstractManager {
  constructor() {
    super({
      table: "roles",
      schema: Joi.object({
        name: Joi.string().max(45).required(),
        description: Joi.string().max(200).allow(null),
        level: Joi.number().min(0).required(),
      }),
    });
  }
}

export default new Roles();
