import Joi from "joi";
import AbstractManager from "../AbstractManager.js";

class Scores extends AbstractManager {
  constructor() {
    super({
      table: "scores",
      schema: Joi.object({
        value_score: Joi.number().max(999).required(),
        id_user: Joi.number().required(),
        id_difficulty: Joi.number().required(),
      }),
    });
  }
}

export default new Scores();
