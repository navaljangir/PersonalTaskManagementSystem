'use client'

import { useForm } from "react-hook-form"
import { CardWrapper } from "../ui/CardWrapper"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"


interface SigninType{
    email :string,
    password: string
}
export function SigninPage() {
   const form = useForm<SigninType>({
    defaultValues : {
        email : '',
        password :''
    }
   });

      const onSubmit = (values: SigninType)=>{
        signIn('email' , {
            email : values.email,
            password : values.password,
            redirect : false
        })
      }
    return <CardWrapper title="Login" label="Login to get Access" href="/signup" hrefLabel="Create an Account? Signup">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                name="email"
                control={form.control}
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                        <Input {...field} placeholder="Enter your Email" type="text"/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
                >
                </FormField>
                <FormField
                name="password"
                control={form.control}
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                        <Input {...field} placeholder="*******" type="password"/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
                >
                </FormField>
                <Button type="submit" variant='default' className="w-full">
                    Login
                </Button>
            </form>
        </Form>
    </CardWrapper>
}