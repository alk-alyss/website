import { Router } from "express"
const router = Router();

router.get('/', (req, res) => {
    res.render("profile", { style: "profile" })
})

router.post('/', (req, res) => {
    res.render("profile", { style: "profile" })
})

export default router