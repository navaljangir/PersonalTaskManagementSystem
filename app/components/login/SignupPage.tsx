'use client'

import { useForm } from "react-hook-form"
import { CardWrapper } from "../ui/CardWrapper"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignUpType } from "@/app/lib/actions/signup/types"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpSchema } from "@/app/lib/actions/signup/schema"
import SignUpCall from "@/app/lib/actions/signup/signup"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function SignupPage() {
    const router = useRouter()
    const form = useForm<SignUpType>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: '',
            username: '',
            name: '',
            password: ''
        }
    });

    const onSubmit = async (values: SignUpType) => {
        const res = await SignUpCall({
            username: values.username,
            name: values.name,
            email: values.email,
            password: values.password
        })
        if (res.success) {
            toast.success(res.message, {
                duration: 2000
            })
            router.push('/signin')
        } else {
            toast.error(res.message, {
                duration: 2000
            })
        }
        console.log(values)
    }
    return <CardWrapper title="Register" label="Create Your Account" href="/signin" hrefLabel="Already have a Account? Login">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                    name="username"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Enter your username" type="text" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                >
                </FormField>
                <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Enter your Email" type="text" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                >
                </FormField>
                <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Enter your name" type="text" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                >
                </FormField>
                <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="*******" type="password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                >
                </FormField>
                <Button type="submit" variant='default' className="w-full">
                    Register
                </Button>
            </form>
        </Form>
    </CardWrapper>
}