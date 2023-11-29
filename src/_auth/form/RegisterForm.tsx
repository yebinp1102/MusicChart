import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
 
const formSchema = z.object({
  name: z.string().min(2, {message: "name must be at least 2 characters.",}),
  email: z.string().min(2, {message: "name must be at least 2 characters.",}),
  password: z.string().min(2, {message: "name must be at least 2 characters.",}),
  confirmPwd: z.string().min(2, {message: "name must be at least 2 characters.",}),
})

const RegisterForm = ( ) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <Form {...form}>

      <div>
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create your account</h2>
        <p className=" text-light-3 my-2">Music Chart를 사용하기 위해 계정을 생성하세요.</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 gap-5 flex flex-col">

        {/* name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        {/* email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
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
                <Input placeholder="password" {...field} />
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
                <Input placeholder="confirm password" {...field} />
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