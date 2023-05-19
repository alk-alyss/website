import { Router } from "express"
const router = Router()

import { showListing } from "../controllers/listing.js"
import { checkAuthentication } from "../controllers/authentication.js"

router.get('/:id', showListing)

router.post('/:id/heart', checkAuthentication, toggleHeart)

export default router