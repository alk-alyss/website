import { Router } from "express"
const router = Router();

router.get('/', (req, res) => {
    res.render("sign_in", { style: "sign_in" })
})

router.post('/', (req, res) => {
    res.render("sign_in", { style: "sign_in" })
})

export default router