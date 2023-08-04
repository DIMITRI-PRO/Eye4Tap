import Joi from "joi";
import AbstractManager from "../AbstractManager.js";

class Users extends AbstractManager {
  constructor() {
    super({
      table: "users",
      schema: Joi.object({
        lastname: Joi.string().max(45).required(),
        firstname: Joi.string().max(45).required(),
        email: Joi.string().email().max(254).required(),
        password: Joi.string().max(254).required(),
        pseudo: Joi.string().max(45).required(),
        picture: Joi.string().max(254).allow(null),
      }),
    });
  }
}

export default new Users();
