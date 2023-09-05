import models from "../../models/index.js";

const { Scores } = models;
const { validateSchema } = Scores;

const getScores = async ({ query }, res) => {
  try {
    const { limit, difficulty, page } = query;
    let filters = null;

    if (difficulty) filters = { "scores.id_difficulty": difficulty };

    const { datas, infos } = await Scores.find({
      selector: "scores.*,users.pseudo,users.picture,difficulty.name",
      by: filters,
      options: {
        limit,
        offSet: page * limit - limit,
        join: ["difficulty", "users"],
        orderBy: ["value_score"],
        isAsc: false,
      },
    });

    res.send({ datas, infos });
  } catch (err) {
    res.status(500);
  }
};

const getUserScores = async ({ params, payload }, res) => {
  try {
    const { id } = params;
    const { sub } = payload;
    const { datas } = await Scores.find({
      selector: "scores.*, difficulty.name",
      by: { id_user: id || sub },
      options: {
        orderBy: ["value_score"],
        isAsc: false,
        limit: 10,
        join: ["difficulty"],
      },
    });
    res.send(datas);
  } catch (error) {
    res.status(500);
  }
};

const postScore = async ({ body, payload }, res) => {
  try {
    const { sub } = payload;
    if (body.id_user === sub) {
      await Scores.insert(body);
      res.status(201).send({ message: "Score successfully created" });
    } else res.status(401);
  } catch (err) {
    res.status(500);
  }
};

const scoreControllers = (router) => {
  router.route("/").get(getScores);
  router.route("/:id").get(getUserScores).post(validateSchema, postScore);

  return router;
};

export default { scoreControllers };
