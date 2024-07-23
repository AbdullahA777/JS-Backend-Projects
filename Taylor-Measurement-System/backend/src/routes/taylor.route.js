import Router from "express"
import { signUpTaylor } from "../controller/taylor.controller.js"

const router = Router()

router.route("/SignUp").post( signUpTaylor )


export default router;