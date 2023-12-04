import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { useCreateUserAccount } from "@/lib/react-query/queries"
import Loader from "@/components/shared/Loader"
 
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPwd: z.string().min(8, { message: "Password must be at least 8 characters." }),
})

const RegisterForm = () => {
  const navigate = useNavigate();
  const {toast} = useToast();
  const {mutateAsync: createNewAccount, isPending: isCreatingAccount} = useCreateUserAccount();


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPwd: ""
    },
  })
 
  async function onSubmit(values: z.infer<typeof formSchema>) {

    if(values.password !== values.confirmPwd){
      toast({
        title: "비밀번호가 일치하지 않습니다."
      })
      return;
    }

    const newUser = await createNewAccount({
      name: values.name,
      email: values.email,
      password: values.password
    });
    
    if(!newUser){
      toast({title: "회원가입에 실패 했습니다. 다시 시도해주세요.",})
    }else if(newUser && !isCreatingAccount){
      toast({title: "회원가입이 완료 되었습니다. 로그인 해주세요."});
      navigate("/login")
    }

  }
  return (
    <div className="mt-20 w-full px-20">
      <Form {...form}>

        <div className="mb-14">
          <p className="text-light-3 h4-bold">시작하기</p>
          <h2 className="xl:h1-bold h2-bold mb-5 mt-3">새로운 계정을 생성 해보세요.</h2>
          <div className=" text-light-3 my-2 flex gap-1">
            <p>이미 회원가입을 하셨나요?</p>
            <Link to="/login" className="text-primary-500 font-bold">
              로그인
            </Link>
          </div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 gap-6 flex flex-col xl:w-[550px] w-[450px]">

          {/* name field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-input_label">이름</FormLabel>
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
                <FormLabel className="shad-input_label">이메일</FormLabel>
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
                <FormLabel className="shad-input_label">비밀번호</FormLabel>
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
                <FormLabel className="shad-input_label">비밀번호 확인</FormLabel>
                <FormControl>
                  <Input className="shad-input" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex w-full justify-end">
            <Button type="submit" className="shad-button_primary px-20 py-6 mt-4">
              {isCreatingAccount ? (
                <>
                  <Loader /> 처리중...
                </>
              ) : (
                "회원가입"
              )}
            </Button>
          </div>

        </form>
      </Form>
    </div>
  )
}

export default RegisterForm