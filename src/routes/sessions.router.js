import { Router } from "express";
import SessionsController from "../controllers/sessions.controller.js";

const router = Router();
const sessionsController = new SessionsController();

router.post("/register",  sessionsController.register.bind(sessionsController));
router.post("/login", sessionsController.login.bind(sessionsController));
router.get("/faillogin", sessionsController.failLogin.bind(sessionsController));
router.get("/logout", sessionsController.logout.bind(sessionsController));
// router.get(
//   "/github",
//   passportCall("github", { scope: ["user:email"] }),
//   async (req, res) => {}
// );

// router.get("/githubcallback", passportCall("github", {
//     failureRedirect: "/api/sessions/login",
//   }),
//   sessionsController.githubAuthCallback.bind(sessionsController)
// );

export default router;
