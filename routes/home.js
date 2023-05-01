import { Router } from "express"
const router = Router()

router.get('/', (req, res) => {
	res.render("home", {style: stylesheet})
})

export default router
