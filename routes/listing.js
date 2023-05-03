import { Router } from "express"
const router = Router()

import { showListing } from "../controllers/listing.js"

router.get('/:id', showListing)

export default router