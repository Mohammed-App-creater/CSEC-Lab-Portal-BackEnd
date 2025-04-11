import express from "express";
import { login, signup  } from "../Controllers/authController";
import { validate } from "../Middlewares/validate";
import { loginSchema, signupSchema } from "../Middlewares/authSchemas";

const router = express.Router();

router.post("/login", validate(loginSchema), login);
router.post("/signup", validate(signupSchema), signup);

export default router;