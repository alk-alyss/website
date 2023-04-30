import express from "express"
const router = express.Router();

router.get('/sign_up', (req, res) => {
    res.render("sign_up")
})

router.post('/sign_up', (req, res) => {
    res.render("sign_up")
})

export const sign_up_router = router
