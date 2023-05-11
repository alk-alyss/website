import { Router } from "express"
const router = Router();

import { sign_in } from "../controllers/sign_in.js";

router.get('/', (req, res) => {
    res.render("sign_in", { style: "sign_in" })
})

router.post('/', sign_in)

export default router