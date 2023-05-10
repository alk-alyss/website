import { Router } from "express"
const router = Router();

router.get('/', (req, res) => {
    res.render("sign_in", { style: "sign_in" })
})

router.post('/', (req, res) => {
    res.render("sign_in", { style: "sign_in" })
})

router.post('/signing_in', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (username == "admin" && password == "admin") {
        // scenario for admin user
    }
})

export default router