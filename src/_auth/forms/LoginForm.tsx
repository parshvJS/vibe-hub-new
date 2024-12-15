import { Button } from '@/components/ui/button'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signInForm } from '@/lib/ValidationSchema'
import { z } from "zod"
import { useToast } from '@/components/ui/use-toast'

import { BarLoader } from 'react-spinners';
import { Link, useNavigate } from 'react-router-dom'
import { useSignInAccount } from '@/lib/React-Query/querysAndMutation'
import { useUserContext } from '@/context/authContext'






function SigninForm() {

  const { checkAuthUser, isLoading } = useUserContext()

  const navigate = useNavigate()

  const { mutateAsync: signInUserAccount, isPending: isSigningIn } = useSignInAccount()
  const { toast } = useToast()
  // 1. Define your form.
  const form = useForm<z.infer<typeof signInForm>>({
    resolver: zodResolver(signInForm),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signInForm>) {

    const session = await signInUserAccount({
      email: values.email,
      password: values.password,
    })
    if (!session) return toast({title:'Login Failed !',description:'Something went wrong !'})

    const isLoggedIn = await checkAuthUser()
    if (isLoggedIn) {
      form.reset()
      navigate('/')
    }
  }

  return (
    <Form {...form}>
      <div className='sm:w-420 flex flex-center flex-col'>

        <img src="src\assests\logo.svg" alt="" />
        <h3 className='h3-bold max-xl:h3-bold my-5 text-white w-auto'>Log In to Your Account !</h3>
        {/* welcome back messenge in purple colour */}
        <p className='text-primary-500 text-2xl font-semibold'>Welcome Back</p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">

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
                  <Input placeholder="Your Password" className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          {/* submit button */}
          <Button type="submit" className='shad-button_primary '>
            {
              isSigningIn ? <BarLoader color="black" />

                : "Log In"
            }

          </Button>

        </form>
        {/* create already have account  */}
        <div className='flex justify-center items-center mt-5'>
          <p className='text-white'>Don't Have Account Yet?</p>
          <Link to="/signin">
            <p className='text-purple-700 ml-2'>create New Account</p>
          </Link>


        </div>
      </div>
    </Form>
  )
}

export default SigninForm