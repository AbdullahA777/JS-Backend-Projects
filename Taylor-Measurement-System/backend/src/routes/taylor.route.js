import Router from "express"
import { signUpTaylor, signInTaylor } from "../controller/taylor.controller.js"
import { allMeasurements, createClientMeasurement, deleteMeasurement,  } from "../controller/client.controller.js"

const router = Router()

router.route("/SignUp").post( signUpTaylor )
router.route("/SignIn").post( signInTaylor )
router.route("/AddMeasurement").post( createClientMeasurement )
router.route("/pemaish").post( allMeasurements )
router.route("/DeleteMeasurement/:id").delete( deleteMeasurement )


export default router;