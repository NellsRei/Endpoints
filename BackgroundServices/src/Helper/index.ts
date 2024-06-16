import nodemailer from 'nodemailer'
import path from 'path'
import dotenv from 'dotenv'
import ejs from 'ejs'
dotenv.config({path:path.resolve(__dirname,"../../.env")})


//creating a configuration object
let config = {
    host :"smtp.gmail.com",
    service : "gmail",
    port : 587 ,
    auth: {
        user: "dovejane028@gmail.com",
        pass: "uduk axls ywtn dvzo"
    }
}

//creating a transporter
function createTransporter(config:any){
    return nodemailer.createTransport(config)
}

//send email
export async function sendEmail(messageOption:any){
    let transporter = createTransporter(config)
    await transporter.verify()
    await transporter.sendMail(messageOption, (err,info)=>{
        if (err){
            console.log(err)
        }
        console.log(info)
    })
}

// let messageOption = {
//     to:process.env.EMAIL,
//     from:process.env.EMAIL,
//     subject:"Trial 1",
//     html :`<p>Hello There</p>`

// }

// sendEmail(messageOption)


// ejs.renderFile("../../Template/register.ejs", {name: 'Jameson Doe'},(err,data)=>{
//     console.log(data)
//     let messageOption = {
//         to:"dovejane028@gmail.com",
//         from:"dovejane028@gmail.com",
//         subject:"Trial 1",
//         html :data
    
//     }
//     sendEmail(messageOption)
// }
// )