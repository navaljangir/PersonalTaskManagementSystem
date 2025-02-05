import { signUpSchema } from "./schema";
import z from "zod"
export type SignUpType = z.infer<typeof signUpSchema>