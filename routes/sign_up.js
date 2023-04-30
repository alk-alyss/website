import { Router } from "express"
const router = Router();

router.get('/', (req, res) => {
    res.render("sign_up")
})

router.post('/', (req, res) => {
    res.render("sign_up")
})

export default router
