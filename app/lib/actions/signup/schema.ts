import z from "zod"
export const signUpSchema =z.object({
    username : z.string().min(4 ,{message : 'Username must be of Minimum Length 4'}),
    email : z.string().min(5, {message : 'Enter a mail'}).email('Enter a valid Email') ,
    name : z.string(),
    password : z.string().min(8 , {message : 'Password Must be 8 Characters'}) ,
})