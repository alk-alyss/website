import { Router } from "express"
const router = Router();

import { checkAuthentication } from "../controllers/authentication.js";
import { renderProfile, updateProfile } from "../controllers/profile.js";

router.get('/', checkAuthentication, renderProfile)

router.post('/', checkAuthentication, updateProfile)

export default router