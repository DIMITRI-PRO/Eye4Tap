import { hash, verify } from "argon2";
import jsonwebtoken from "jsonwebtoken";

const { sign, verify: verifyJWT } = jsonwebtoken;

const hashPassword = async (req, res, next) => {
  try {
    const hashedPassword = await hash(req.body.password, {
      y: 2,
      m: 15360,
      t: 2,
      p: 1,
    });
    delete req.body.password;
    req.body.password = hashedPassword;
    next();
  } catch (err) {
    console.warn(err);
  }
};

const verifyPassword = async (req, res) => {
  try {
    const { user, body } = req;

    const isVerified = await verify(user.password, body.password);

    if (isVerified) {
      const token = sign(
        { sub: user.id, role: user?.id_role || 0 },
        process.env.JWT_SECRET,
        {
          expiresIn: `${process.env.EXPIRE_TIME}s`,
        }
      );
      delete user.password;
      res.cookie(process.env.NAME_COOKIE, token, {
        maxAge: process.env.EXPIRE_TIME * 1000,
      });
      res.status(200).json(user);
    } else res.sendStatus(401);
  } catch (error) {
    res.status(500);
  }
};

const verifyToken = (req, res, next) => {
  try {
    if (process.env.ACTIVE_TOKEN === "false") next();
    else {
      const authorizationHeader = req.get("Authorization");
      if (authorizationHeader == null)
        throw new Error("Authorization header is missing");

      const [type, token] = authorizationHeader.split(" ");
      if (type !== "Bearer")
        throw new Error("Authorization header has not the 'Bearer' type");

      const payload = verifyJWT(token, process.env.JWT_SECRET);

      if (payload?.role !== undefined) {
        req.payload = payload;
        next();
      } else throw new Error("Missing Role token.");
    }
  } catch (err) {
    console.error("Erreur de verification Token:", err);
    res.clearCookie(process.env.NAME_COOKIE).sendStatus(401);
  }
};

export default {
  hashPassword,
  verifyPassword,
  verifyToken,
};
