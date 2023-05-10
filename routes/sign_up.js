import { Router } from "express"
const router = Router();

router.get('/', (req, res) => {
    res.render("sign_up", {style: "sign_in"})
})

router.post('/', (req, res) => {
    res.render("sign_up", {style: "sign_in"})
})

router.post('/signing_up', (req, res) => {
    let username = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
})

export default router
