import { Router } from "express"
const router = Router();

import { isAuthenticated, sign_in, sign_out, sign_up } from "../controllers/authentication.js";

router.get('/sign_in', (req, res) => {
    res.render("sign_in", { style: "sign_in" })
})

router.post('/sign_in', sign_in)

router.get('/sign_up', (req, res) => {
    res.render("sign_up", {style: "sign_in"})
})

router.post('/sign_up', sign_up)

router.get('/sign_out', sign_out)

router.get('/isAuthenticated', isAuthenticated)

export default router