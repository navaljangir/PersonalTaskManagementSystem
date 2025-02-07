/* eslint-disable @typescript-eslint/no-unused-vars */
"use server"
import { db } from "@/db/db";
import { users } from "@/db/schema";
import bcrypt from 'bcrypt'
import { signUpSchema } from "./schema"

import { SignUpType } from "./types"
import { eq } from "drizzle-orm";
export default async function SignUpCall({username , name, email , password } : SignUpType){
    const zodValidation = signUpSchema.safeParse({username ,email , name , password});
    let zodMessage = '';
    zodValidation.error?.issues.forEach((obj)=> {
        zodMessage = zodMessage + obj.message +'. ' 
    });
    console.log(zodMessage);
    if(zodValidation.error){
        console.log(zodValidation.error.issues);
        return {
            success : false, 
            message : zodMessage
        }
    }
    try{
        const usernameExists  = await db.query.users.findFirst({
            where : eq(users.username , username)
        })
        const emailExists = await db.query.users.findFirst({
            where : eq(users.email , email)
        })
        if(usernameExists){
            return {
                success : false,
                message : 'Username already Exists'
            }
        }
        if(emailExists){
            return {
                success : false , 
                message : 'Email Already Exist'
            };
        }
        const genSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , genSalt); 
        const userCreated = await db.insert(users).values({
                email : email ,
                name : name ,
                password : hashedPassword,
        })
        console.log(userCreated);
        if(!userCreated){
            return {
                success: false , 
                message: 'Something Went Wrong'
            }
        }else{
            return {
                success:  true, 
                message: 'User Created Successfull'
            }
        }
    }catch(_e){
        return {
            success : false , 
            message : 'Error While Creating a account'
        }
    }
}