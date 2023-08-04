import Joi from "joi";
import AbstractManager from "../AbstractManager.js";

class Scores extends AbstractManager {
  constructor() {
    super({
      table: "scores",
      schema: Joi.object({
        value_score: Joi.number().max(45).required(),
        id_user: Joi.string().max(45).required(),
        id_difficulty: Joi.number().max(45).required(),
      }),
    });
  }
}

export default new Scores();
