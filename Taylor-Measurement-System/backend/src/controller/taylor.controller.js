import { Taylor } from "../model/taylor.model.js"
import { ApiError } from "../utils/apiError.js"
import bcrypt from "bcrypt"
import { ApiResponse } from "../utils/apiResponse.js"



const signUpTaylor = async (req, res) => {

    try {

        const {name, shopName, email, password} = req.body

        if (
            [name, shopName, email, password].some((field) => field?.trim() === "")
        ) {
            return new ApiError(400, "All fields are required.").send(res);
        }
        
        console.log(name, shopName, email, password);    

        const existingTaylor = await Taylor.findOne(
            {
                $or: [{ email }, { name }, { shopName }]
            }
        )

        if (existingTaylor) {
            return new ApiError(409, "This Taylor is already registered.").send(res)
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
            return new ApiError(500, "Something went wrong while creating the taylor.").send(res)
        }

        return new ApiResponse(200, createdTaylor, "Successfully created Taylor").send(res)

    } catch (error) {
        return new ApiError(500,"An error Occured.", error.message).send(res)
    }
}

// Taylor LogIn

const logInTaylor = async (req, res) => {

    try {

        const {shopName, email, password} = req.body

        if (
            [shopName, email, password].some((field) => !field?.trim())
        ) {
            return new ApiError(400, "All fiels are required.").send(res)
        }

        const taylor = await Taylor.findOne({ shopName })                                

        if (!shopName) {
            return new ApiError(409, "This Taylor is not registered.").send(res)
        }

        const isMatch = await bcrypt.compare(password, taylor?.password)

        if (!isMatch) {
            return new ApiError(400,"The password you entered is not correct.").send(res)
        }

        return new ApiResponse(200, taylor, "Successfully LogIn Taylor").send(res)

    } catch (err) {
        return new ApiError(500,"An error Occured.", err.message).send(res)
    }

}

// expot signupTaylor

export {

    signUpTaylor,
    logInTaylor

    }