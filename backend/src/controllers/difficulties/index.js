import models from "../../models/index.js";

const { Difficulties } = models;

const getDifficulties = async (req, res) => {
  try {
    const { datas } = await Difficulties.find({});
    if (datas[0] == null) res.sendStatus(404);
    else res.send(datas);
  } catch (err) {
    res.status(500);
  }
};

const postDifficulty = async ({ body }, res) => {
  try {
    await Difficulties.insert(body);
    res.status(201).send({ message: "Difficulty successfully created" });
  } catch (err) {
    res.status(500);
  }
};

const difficultyControllers = (router) => {
  router.route("/").get(getDifficulties).post(postDifficulty);

  return router;
};

export default { difficultyControllers };
