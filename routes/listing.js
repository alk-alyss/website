import { Router } from "express"
const router = Router()

router.get('/', (req, res) => {
	res.render("listing", {style: "listing", topSearchOn: true})
})

export default router