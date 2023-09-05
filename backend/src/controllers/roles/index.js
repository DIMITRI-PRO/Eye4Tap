import models from "../../models/index.js";

const { Roles } = models;
const { validateSchema } = Roles;

const getRoles = async (req, res) => {
  try {
    const { datas } = await Roles.find({});
    res.send(datas);
  } catch (err) {
    res.status(500);
  }
};

const getRole = async (req, res) => {
  try {
    const { datas } = await Roles.find({});
    if (datas[0] == null) res.sendStatus(404);
    else res.send(datas[0]);
  } catch (err) {
    res.status(500);
  }
};

const updateRole = async ({ body, params }, res) => {
  try {
    const role = body;
    role.id = parseInt(params.id, 10);

    const [result] = await Roles.update(role);

    if (result.affectedRows === 0) res.sendStatus(404);
    else res.sendStatus(204);
  } catch (err) {
    res.status(500);
  }
};

const postRole = async ({ body }, res) => {
  try {
    const { name } = body;
    const { datas } = await Roles.find({
      selector: "name",
      by: { name },
    });
    if (datas[0]) res.status(409).json({ message: "Item already taken", name });

    await Roles.insert(body);
    res.status(201).json({ message: "Item successfully created" });
  } catch (err) {
    res.status(500);
  }
};

const deleteRole = async ({ params }, res) => {
  try {
    const { id } = params;
    const [result] = await Roles.delete(id);

    if (result.affectedRows === 0) res.sendStatus(404);
    else res.send("Item successfully deleted from your database").status(204);
  } catch (err) {
    res.status(500);
  }
};

const roleControllers = (router) => {
  router.route("/").get(getRoles).post(validateSchema, postRole);
  router.route("/:id").get(getRole).put(updateRole).delete(deleteRole);

  return router;
};

export default { roleControllers };
