const express=require("express");
const app=express();
const bcryptjs=require("bcryptjs");
const path=require("path");

const hbs=require("hbs");
const port=process.env.PORT || 2000;
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const { text } = require("body-parser");
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://raam:0987@cluster0.w8nxgx9.mongodb.net/?retryWrites=true&w=majority');
  console.log("working..........");
}
// Mongoose Schema
const deepakSchema = new mongoose.Schema({
    name:String,
    email:String,
    number:Number,
    password:String,
    confpassword:String,
});
  const Deepak=new mongoose.model("Deepak",deepakSchema);
const staticpath=path.join(__dirname,"/public");
app.use(express.static(staticpath))
app.set("view engine","hbs")
app.get("/",(req,res)=>{
res.status(200).render("signup")
})
app.get("/logout",(req,res)=>{
res.status(200).render("signup")
})
app.get("/home",(req,res)=>{
res.status(200).render("home")
})
app.get("/about",(req,res)=>{
res.status(200).render("about")
})

app.get("/contact",(req,res)=>{
res.status(200).render("contact")
})
app.get("/signup",(req,res)=>{
res.status(200).render("signup")
})
// app.get("/j",(req,res)=>{
//     res.status(200).render("j")
//     });
    app.post("/signup",(req,res)=>{
    const contant=new Deepak(req.body);
    console.log(contant);
    const password=req.body.password;
    const cpassword=req.body.confpassword
    if(password===cpassword){
        contant.save();
        res.render("home")
    }else{
        console.log("Please Check Password And ConformPassword");
    }
    })
    // app.post("/signin",async(req,res)=>{
    //     const password=req.body.password;
    //     const email=req.body.email;
    //     const usermail= Deepak.findOne({email:email});
    //     console.log(usermail);
    // //   console.log(password);
  
// app.post("/signup",async(req,res)=>{
// try {
//      const password=req.body.password;
//      const cpassword=req.body.confpassword;
    
//      if(password===cpassword){
//        const detialsGym=new Register({
//            name:req.body.name,
//            email:req.body.email,
//            number:req.body.number,
//            password:password,
//         //    confpassword:cpassword
//        })
//        const registerdd=await detialsGym.save()
//        res.status(201).render("home")
//      }else{
//          res.send("invillid enterdetials")
//      }
// } catch (error) {
//     res.status(400).send(error)
// }
// })

app.get("/signin",(req,res)=>{
res.status(200).render("signin")
})
app.post("/signin",async(req,res)=>{
try {
    const password=req.body.password;
    const email=req.body.email;
     const usermail=await Deepak.findOne({email:email});
     console.log(usermail);
     if(password===usermail.password){
        res.render("home")
     }
    //  const isMatch= bcryptjs.compare(usermail.password,password)
    //  if(isMatch){
    //      res.status(201).render("home");
    //  }else{
    //      res.status(400).send("invellid detials")
    //  }
     
} catch (error) {
    res.status(400).send("invallid detials")
}
})
// app.post("/contact",async(req,res)=>{
//     try {
//          const naam=req.body.naamm;
//          const mail=req.body.maill;
        
//          if(naam===text){
//            const detialsGym=new Register({
//                naam:req.body.naam,
//                mail:req.body.mail,
//                subject:req.body.subject,
//                textarea:req.body.textarea,
               
//             //    confpassword:cpassword
//            })
//            const registerdd=await detialsGym.save()
//            res.status(201).render("contact")
//          }else{
//              res.send(" fill detials")
//          }
//     } catch (error) {
//         res.status(400).send(error)
//     }
//     })

// const securePassword=async(password) =>{
//     const passwordHash=await bcryptjs.hash(password,10)
//     console.log(passwordHash);
//     const comaprePassword=await bcryptjs.compare(password,passwordHash)
//     console.log(comaprePassword);
// }
// securePassword("Deepak@96");
app.listen(port,()=>{
    console.log(`I Am Connected On Port No:-${port}`);
})