import models from "../../models/index.js";

const { Users } = models;

const getUsers = async (req, res) => {
  try {
    const { datas } = await Users.find({
      selector: "id,lastname,firstname,email,pseudo,picture",
    });
    res.send(datas);
  } catch (err) {
    res.status(500);
  }
};

const getUser = async ({ payload }, res) => {
  try {
    const { sub } = payload;
    const { datas } = await Users.find({
      selector: "lastname,firstname,email,pseudo,picture",
      by: { id: sub },
    });
    if (datas[0] == null) res.sendStatus(404);
    else res.send(datas[0]);
  } catch (err) {
    res.status(500);
  }
};

const login = async (req, res, next) => {
  try {
    const { datas } = await Users.find({ by: { email: req.body.email } });
    if (datas[0]) {
      req.user = datas;
      next();
    } else res.status(404).send("no existing account...");
  } catch (err) {
    res.status(500);
  }
};

const updateUser = async ({ body, params }, res) => {
  try {
    const user = body;
    user.id = parseInt(params.id, 10);

    const [result] = await Users.update(user);

    if (result.affectedRows === 0) res.sendStatus(404);
    else res.sendStatus(204);
  } catch (err) {
    res.status(500);
  }
};

const postUser = async ({ body }, res) => {
  try {
    const { email } = body;
    const { datas } = await Users.find({
      selector: "email",
      by: { email },
    });
    if (datas[0])
      res.status(409).json({ message: "Item already taken", email });

    await Users.insert(body);
    res.status(201).json({ message: "Item successfully created" });
  } catch (err) {
    res.status(500);
  }
};

const deleteUser = async ({ payload }, res) => {
  try {
    const { id } = payload;
    const [result] = await Users.delete(id);

    if (result.affectedRows === 0) res.sendStatus(404);
    else res.status(204).send("Item successfully deleted from your database");
  } catch (err) {
    res.status(500);
  }
};

const userControllers = (router) => {
  router.route("/").get(getUsers);
  router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

  return router;
};

export default { userControllers, postUser, login };
