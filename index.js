const express = require("express")
// Loads environment variables
require("dotenv").config()
// Heroku will automatically have its own port
const port = process.env.PORT || 5000;
const app = express();
const cors = require("cors")
app.use(cors())
app.use(express.json())

// Connect firebase App: can leave commented out, loads environment variables
const admin = require("firebase-admin")
const adminConfig = {
    type: process.env.TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'), // Special parsing because variable is dumb
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.CERT_URL,
    client_x509_cert_url: process.env.CLIENT_CERT_URL
}
admin.initializeApp({
    credential:admin.credential.cert(adminConfig),
})
const database = admin.firestore()
// Create an API Route: should be available on -> localhost:5000/user
app.get("/user",async(req,res)=>{
    const user= await database.collection("user").doc("jonathan").get();
    const data = user.data();
    res.json({msg: "Testing, sending hello",user: data});
})

// Create an API Route: should be available on -> localhost:5000/hello
app.get("/hello", (req,res) => {
    res.json({msg: "Testing, sending hello"});
})

// Serve Frontend
const path = require('path')
app.use("/",express.static(path.resolve(__dirname, "my-app/build")))
// Make sure this is last or else api will call not be able to call /hello
app.get("*", (req,res) => {
    
    res.sendFile(path.resolve(__dirname, "my-app/build", "index.html"))
})

app.listen(port, ()=>{console.log(`Listening on port ${port}`)} )