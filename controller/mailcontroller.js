const nodemailer = require('nodemailer');
const {StatusCodes} = require('http-status-codes');

let transportHoster = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: true,
    auth:{
      user: 'jaifan121322@gmail.com',
      pass: 'xrjulmgvmzionwho'
    }
  })


const check =async (req,res)=> {
    const {msg,email,name} = req.body
    if(name && email && msg){
        try{
            let info =await transportHoster.sendMail({
              from: `Portfolio ${name} jaifan121322@gmail.com`,
              to: 'jiku1213@gmail.com',
              subject: `A New Message From ${name}`,
              text: `${email} : ${msg}`
            })
            res.status(StatusCodes.OK).json({msg: "Active" , MassgeID: info.messageId});
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({msg: "Email is not Correct!"});
          }
    }else{
        res.status(StatusCodes.BAD_REQUEST).json({msg: "Some fields missing"});
    }
   }
 
module.exports = {check};