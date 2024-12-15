import { Button } from '@/components/ui/button'
import { zodResolver } from "@hookform/resolvers/zod"
import {  useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signUpForm } from '@/lib/ValidationSchema'
import { z } from "zod"
import { useToast } from '@/components/ui/use-toast'

import { BarLoader } from 'react-spinners';
import { Link, useNavigate } from 'react-router-dom'
import { useCreateUserAccount, useSignInAccount } from '@/lib/React-Query/querysAndMutation'
import { useUserContext } from '@/context/authContext'






function SignupForm() {

  const {checkAuthUser,isLoading:isUserLoading}=useUserContext()

const  navigate=useNavigate()

  const { mutateAsync: createUserAccount, isPending: isCreatingUser } = useCreateUserAccount()
  const { mutateAsync: signInUserAccount, isPending: isSigningIn } = useSignInAccount()
  const { toast } = useToast()
  // 1. Define your form.
  const form = useForm<z.infer<typeof signUpForm>>({
    resolver: zodResolver(signUpForm),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signUpForm>) {
 
    const newUser = await createUserAccount(values)
    if (!newUser)  return  toast({ title:'Something Went Wrong !',description:'Try Again After Some Moment!'})

    const session = await signInUserAccount({
      email: values.email,
      password: values.password,
    })

    if (!session) return  toast({title:'Something Went Wrong !',description:'Try Again After Some Moment!'})
    console.log(newUser);

    const isLoggedIn=await checkAuthUser()
    if(isLoggedIn){
      form.reset()
      navigate('/')
    }
  }

  return (
    <Form {...form}>
      <div className='sm:w-420 flex flex-center flex-col'>
        
        <img src="src\assests\logo.svg" alt="" />
        <h3 className='h3-bold max-xl:h3-bold my-5 text-white w-auto'>Create New Account</h3>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white'>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Full Name" className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* username */}
          <FormField
            control={form.control}
            name="username"

            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white'>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Create Username" className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* email  */}
          <FormField
            control={form.control}
            name="email"

            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white'>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your Email Address" className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* password */}
          <FormField
            control={form.control}
            name="password"

            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white'>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Create Password" className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          {/* submit button */}
          <Button type="submit" className='shad-button_primary '>
            {
              isCreatingUser ? <BarLoader color="black" />

                : "Create Account"
            }

          </Button>

        </form>
        {/* create already have account  */}
        <div className='flex justify-center items-center mt-5'>
          <p className='text-white'>Already have an account?</p>
          <Link to="/login">
            <p className='text-purple-700 ml-2'>Login</p>
          </Link>


        </div>
      </div>
    </Form>
  )
}

export default SignupForm