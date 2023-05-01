import { Router } from "express"
const router = Router()

import { search, addListing } from "../controllers/search.js"

router.get("/", search)

router.get("/add", addListing)

export default router