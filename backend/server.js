
import app from "./app.js"
import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name: process.env.cloudinary_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_secret,
});


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`)
})