import { Router } from "express"
const router = Router()

import { search } from "../controllers/search.js"

router.get("/", search)

export default router