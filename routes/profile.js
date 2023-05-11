import { Router } from "express"
import { checkAuthentication } from "../controllers/authentication.js";
const router = Router();

router.get('/', checkAuthentication, (req, res) => {
    res.render("profile", { style: "profile" })
})

router.post('/', checkAuthentication, (req, res) => {
    res.render("profile", { style: "profile" })
})

export default router