import models from "../../models/index.js";

const { Difficulties } = models;
const { validateSchema } = Difficulties;

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

const deleteDifficulty = async ({ params }, res) => {
  try {
    const { id } = params;
    const [result] = await Difficulties.delete(id);

    if (result.affectedRows === 0) res.sendStatus(404);
    else res.send("Item successfully deleted from your database").status(204);
  } catch (err) {
    res.status(500);
  }
};

const difficultyControllers = (router) => {
  router.route("/").get(getDifficulties).post(validateSchema, postDifficulty);

  router.route("/:id").delete(deleteDifficulty);

  return router;
};

export default { difficultyControllers };
