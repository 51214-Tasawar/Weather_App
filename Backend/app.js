const Exp = require("express")
const cons = require("cors")
require("dotenv").config()


const port = 3002

const app = Exp()

app.use(cors());
app.use(Exp.json());

const Url = process.env.Weather_URl

app.get("/api/weather" , async(req , res)=>{
    try{
   const {city} = req.query
   if(!city){
      return res.status(400).json({
        message : 'City is required'
      })
   }
}
const
})