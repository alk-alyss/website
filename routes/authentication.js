import { Router } from "express"
const router = Router();

import { sign_in, sign_up } from "../controllers/authentication.js";

router.get('/sign_in', (req, res) => {
    res.render("sign_in", { style: "sign_in" })
})

router.post('/sign_in', sign_in)

router.get('/sign_up', (req, res) => {
    res.render("sign_up", {style: "sign_in"})
})

router.post('/sign_up', sign_up)

export default router