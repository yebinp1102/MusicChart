import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import FileUploader from '../shared/FileUploader'
import { Button } from '../ui/button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEditProfile } from '@/lib/react-query/queries'
import { Models } from 'appwrite'
import { useToast } from '../ui/use-toast'
import { useNavigate } from 'react-router-dom'
import Loader from '../shared/Loader'

type Props = {
  user?: Models.Document
}

const formValidation = z.object({
  name: z.string(),
  email: z.string(),
  ImgFile: z.custom<File[]>(),
})

const ProfileForm = ({user}: Props) => {
  console.log(user);
  const {toast} = useToast();
  const navigate = useNavigate();
  const {mutateAsync: editProfile, isPending: isEditingProfile} = useEditProfile();

  const form = useForm<z.infer<typeof formValidation>>({
    resolver: zodResolver(formValidation),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      ImgFile: [],
    }
  })

  const handleSubmit = async(values: z.infer<typeof formValidation>) => {
    if(user){
      const editedProfile = await editProfile({
        ...values,
        id: user.$id,
        imageUrl: user.imageUrl,
        isAdmin: user.isAdmin,
      })
  
      if(!editedProfile) toast({title: "수정에 실패 했습니다. 다시 시도해주세요"})
      return navigate('/profile');
    }
  }

  return (
    <Form {...form} >
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl pb-48"
      >
        {/* email  */}
        <FormField 
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-input_label">이메일</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* name */}
        <FormField 
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-input_label">이름</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* image */}
        <FormField 
          control={form.control}
          name="ImgFile"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-input_label">커버 이미지 수정</FormLabel>
              <FormControl>
                <FileUploader fieldChange={field.onChange} mediaUrl={user?.imageUrl} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Button */}
        <div className="flex justify-end">
          <Button 
            className="shad-button_primary" 
            type="submit" 
            // disabled={isCreatingSong || isEditingSong}
          >
            {isEditingProfile ? (
              <><Loader /> 로딩 중 . . .</>
            ) : (
              <p>수정하기</p>
            )}
          </Button>
        </div>
      
      </form>
    </Form>
  )
}

export default ProfileForm