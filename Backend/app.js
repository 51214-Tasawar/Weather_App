const Exp = require("express");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");
const port = 3002;
const app = Exp();
app.use(cors());
app.use(Exp.json());
const Url = process.env.Weather_URl;

// Weather API
app.get("/api/weather", async (req, res) => {
    try {

        const { city } = req.query;

        // Check city
        if (!city) {
            return res.status(400).json({
                message: "City is required"
            });
        }

        // Call weather API
        const response = await axios.get(Url, {
            params: {
                q: city,
                appid: process.env.Weather_API_Key,
               //  units: "metric"
            }
        });

        const data = response.data;

        // Send only required information
        res.json({
            city: data.name,
            temperature: data.main.temp,
            pressure :data.main.pressure ,
            visiblity : data.main ,
            // weatherCondition: data.weather[0].description,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed 
        });

    } catch (error) {
    console.log("ERROR:", error.message);
    console.log("API ERROR:", error.response?.data);

    res.status(500).json({
        message: "Unable to get weather data",
        error: error.response?.data || error.message
    });
}
});


// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

