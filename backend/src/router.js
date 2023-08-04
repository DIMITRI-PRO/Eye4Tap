import { Router, json } from "express";
import auth from "./middleware/auth.js";
import Controllers from "./controllers/index.js";
import exectutor from "./utils/exectuteControllers.js";
import models from "./models/index.js";

const { Users } = Controllers;
const { validateSchema } = models.Users;
const { executeControllers } = exectutor;

const router = Router();

const { hashPassword, verifyPassword, verifyToken } = auth;
const { login, postUser } = Users;

router.use(json());

router.post("/register", validateSchema, hashPassword, postUser);
router.post("/login", login, verifyPassword);

router.use(verifyToken);

executeControllers(Controllers, router); // get all controllers in each folders with index.js

export default router;
