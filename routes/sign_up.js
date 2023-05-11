import { Router } from "express"
const router = Router();

import { sign_up } from "../controllers/sign_up.js";

router.get('/', (req, res) => {
    res.render("sign_up", {style: "sign_in"})
})

router.post('/', sign_up)

export default router
