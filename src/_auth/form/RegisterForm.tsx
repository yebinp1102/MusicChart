import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createNewAccount } from "@/lib/appwrite/api"
 
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPwd: z.string().min(8, { message: "Password must be at least 8 characters." }),
})

const RegisterForm = ( ) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPwd: ""
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const newUser = await createNewAccount({
      name: values.name,
      email: values.email,
      password: values.password
    });
    console.log(newUser);
  }
  return (
    <Form {...form}>

      <div>
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create your account</h2>
        <p className=" text-light-3 my-2">Music Chart를 사용하기 위해 계정을 생성하세요.</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 gap-5 flex flex-col">

        {/* name field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input className="shad-input" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        {/* email field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input className="shad-input" type="text" {...field} />
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
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input className="shad-input" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* confirm password */}
        <FormField
          control={form.control}
          name="confirmPwd"
          render={({ field }) => (
            <FormItem>
              <FormLabel>confirm password</FormLabel>
              <FormControl>
                <Input className="shad-input" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="shad-button_primary mt-6">Submit</Button>
      </form>
    </Form>
  )
}

export default RegisterForm