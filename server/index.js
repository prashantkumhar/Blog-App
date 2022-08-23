const express = require("express");
const app = express();
const mongoose=require("mongoose");
const authRoute=require("./components/routes/auth");
const userRoute=require("./components/routes/users");
const postRoute=require("./components/routes/posts");
const path = require("path");
const categoryRoute=require("./components/routes/categories");
const url = "mongodb+srv://lokesh_2052:lokesh_2052@cluster0.mvtfn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const multer = require("multer");

app.use(express.json());




mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));


const storage = multer.diskStorage({
	destination:(req,file,cb) =>{
		cb(null,"images");
	},
	filename:(req,file,cb)=>{
		cb(null,req.body.name);
	},
})

const upload = multer({storage : storage});

app.post("/api/upload",upload.single("file"),(req,res)=>{
	res.status(200).json("FIle has been uploded");
});

app.listen(5000,()=>{
	console.log("HEllo How are you?");
});


app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);
app.use("/api/categories",categoryRoute);



app.use("/api/images",express.static(path.join(__dirname,"/images")));