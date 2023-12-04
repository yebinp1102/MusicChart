import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import { useLoginAccount } from "@/lib/react-query/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
})

const LoginFrom = () => {
  const navigate = useNavigate();
  const {toast} = useToast();

  // context
  const {checkAuthUser, isLoading: isUserLoading} = useUserContext();
  
  // query
  const {mutateAsync: signInAccount, isPending : isLoginLoading} = useLoginAccount();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
 
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const session = await signInAccount(values);

    if(!session){
      toast({title: "로그인에 실패했습니다. 다시 시도해주세요"});
      return;
    }

    const isLoggedId = await checkAuthUser();

    if(isLoggedId){
      form.reset();
      toast({title: "로그인에 성공했습니다."})
      navigate("/");
    } else{
      toast({title: "로그인에 실패 했습니다. 다시 시도 해주세요."})
      return;
    }

  }

  return (
    <div className="mt-40 px-20">
      <Form {...form}>

        <div className="mb-14">
          <p className="text-light-3 h4-bold">시작하기</p>
          <h2 className="xl:h1-bold h2-bold mb-5 mt-3">Music Chart를 시작 해보세요.</h2>
          <div className=" text-light-3 my-2 flex gap-1">
            <p>회원가입이 필요한가요?</p>
            <Link to="/register" className="text-primary-500 font-bold">
              회원가입
            </Link>
          </div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 gap-10 flex flex-col xl:w-[600px] w-[450px]">

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
          
          <div className="flex w-full justify-end">
            <Button type="submit" className="shad-button_primary px-20 py-6 mt-4">
              {isUserLoading || isLoginLoading ? (
                <>
                  <Loader /> 처리중...
                </>
              ) : (
                "로그인"
              )}
            </Button>
          </div>

        </form>
      </Form>
    </div>
  )
}

export default LoginFrom