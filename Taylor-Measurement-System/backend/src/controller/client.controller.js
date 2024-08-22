import { ClientMeasurement } from "../model/client.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const createClientMeasurement = async (req, res) => {

    try {
        const { taylorID, clientName, clientPhone, measurements } = req.body;
        console.log(taylorID, clientName, clientPhone, measurements);
        // Validate required fields
        if (
            [taylorID, clientName, clientPhone].some((field) => field?.trim() === "") ||
            !measurements
        ) {
            return new ApiError(400, "All fields are required.").send(res);
        }

        // Check if client name or phone number already exists
        const existingClient = await ClientMeasurement.findOne({
            $or: [{ clientName }, { clientPhone }]
        });

        if (existingClient) {
            return new ApiError(409, "This client name or phone number already exists.").send(res);
        }


        // Create client measurement
        const clientMeasurement = await ClientMeasurement.create({
            taylorID,
            clientName,
            clientPhone,
            measurements
        }); 

        // Fetch the created client measurement
        const createdClientMeasurement = await ClientMeasurement.findById(clientMeasurement._id);

        if (!createdClientMeasurement) {
            return new ApiError(500, "Something went wrong while creating the client measurement.").send(res);
        }
        console.log(createdClientMeasurement);
        return new ApiResponse(200, createdClientMeasurement, "Successfully created client measurement").send(res);

    } catch (error) {
        return new ApiError(500, "An error occurred.", error.message).send(res);
    }
};

const allMeasurements = async (req, res) => {
    try {
        const measurements = await ClientMeasurement.find({});

        if (!measurements || measurements.length === 0) {
            return new ApiError(404, "No records found").send(res);
        }

        console.log(measurements);
        
        return new ApiResponse(200, measurements, "Successfully fetched all client measurements").send(res);

    } catch (err) {
        return new ApiError(500, "An error occurred.", err.message).send(res);
    }
}

const deleteMeasurement = async (req, res) => {

    try {
        
    
        const deletedClient = await ClientMeasurement.findByIdAndDelete(req.params.id);
    
        return new ApiResponse(200, "Successfully deleted client measurement").send(res);
    } catch (err) {
        return new ApiError(500, "An error occurred.", err.message).send(res);
    }
}

export 
{
    createClientMeasurement,
    allMeasurements,
    deleteMeasurement
}