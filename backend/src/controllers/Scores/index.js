import models from "../../models/index.js";

const { Scores } = models;

const getScores = async (req, res) => {
  try {
    const [rows] = await Scores.find();
    if (rows[0] == null) res.sendStatus(404);
    else res.send(rows);
  } catch (err) {
    res.status(500);
  }
};

const getUserScores = async ({ params }, res) => {
  try {
    const { id } = params;
    const [rows] = await Scores.find({ id_user: id });
    if (rows[0] == null) res.sendStatus(404);
    else res.send(rows);
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
  router.get("/scores", getScores);
  router.route("/scores/:id").get(getUserScores).post(postScore);
};

export default { scoreControllers };
