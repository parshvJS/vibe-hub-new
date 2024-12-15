import * as z from "zod"

export const signUpForm  = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8,{message : 'Password Must Be 8 characters' }).max(50),
    username: z.string().min(2).max(50),
  })
  
export const signInForm  = z.object({
    email: z.string().email(),
    password: z.string().min(8,{message : 'Password Must Be 8 characters' }).max(50),
  })

export const PostFormValidation=z.object({
  caption: z.string().min(5, { message: "Minimum 5 characters." }).max(2200, { message: "Maximum 2,200 caracters" }),
  file: z.custom<File[]>(),
  location: z.string().min(1, { message: "This field is required" }).max(1000, { message: "Maximum 1000 characters." }),
  tags: z.string(),
})