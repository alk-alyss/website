import { Router } from "express"
const router = Router();

import { checkAuthentication } from "../controllers/authentication.js";

router.get('/', checkAuthentication, (req, res) => {
    res.render("profile", { style: "profile" })
})

router.post('/', checkAuthentication, (req, res) => {
    res.render("profile", { style: "profile" })
})

export default router