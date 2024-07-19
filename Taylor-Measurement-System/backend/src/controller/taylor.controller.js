import { Taylor } from "../model/taylor.model"
import { ApiError } from "../utils/apiError.js"
import bcrypt from "bcrypt"
import { ApiResponse } from "../utils/apiResponse"



const signUpTaylor = async (req, res) => {

    try {

        const {name, shopName, email, password} = req.body

        if (
            [name, shopName, email, password].some((field) => field?.trim() === "")
        ) {
            return new ApiError(201, "All fiels are required.").send(res)
        }

        const exictedTaylor = await Taylor.findOne(
            {
                $or: [{ email }, { name }, { shopName }]
            }
        )

        if (exictedTaylor) {
            return new ApiError(201, "This Taylor is already registered.").send(res)
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // creating taylor
        const taylor =  await Taylor.create(
            {
                name,
                shopName,
                email,
                password : hashedPassword
            }
        )

        const createdTaylor =  await Taylor.findById(taylor._id).select( "password" )

        if (!createdTaylor) {
            return new ApiError(201, "Some thing went wrong while creating the taylor.").send(res)
        }

        return new ApiResponse(200, createdTaylor, "Successfully created Taylor").send(res)

    } catch (error) {
        return new ApiError(201,"An error Occured.", error.message).send(res)
    }
}