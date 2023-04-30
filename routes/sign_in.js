import express from "express"
const router = express.Router();

router.get('/sign_in', (req, res) => {
    res.render("sign_in")
})

router.post('/sign_in', (req, res) => {
    res.render("sign_in")
})

export const sign_in_router = router;