import { Router } from "express"
const router = Router()

import { showListing, toggleListing } from "../controllers/listing.js"
import { checkAuthentication } from "../controllers/authentication.js"

router.get('/:id', showListing)

router.post('/:id/heart', checkAuthentication, toggleListing)

export default router