import { Form } from 'react-router-dom'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import FileUploader from '../shared/FileUploader'
import { Button } from '../ui/button'

const ProfileForm = () => {
  return (
    <Form {...form} >
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl pb-48"
      >
        {/* singer  */}
        <FormField 
          control={form.control}
          name="singer"
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

        {/* title */}
        <FormField 
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-input_label">제목</FormLabel>
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
          name="Imgfile"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-input_label">커버 이미지 업로드</FormLabel>
              <FormControl>
                <FileUploader fieldChange={field.onChange} mediaUrl={song?.imageUrl} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* tags */}
        <FormField 
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-input_label">태그 추가</FormLabel>
              <FormControl>
                <Input type="text" placeholder="콤마( , )로 태그를 분리해주세요.   예 ) 댄스, 일렉트로닉, 발랄한" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* image */}
        <FormField 
          control={form.control}
          name="audioFile"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-input_label">음원 업로드</FormLabel>
              <FormControl>
                <AudioFileUploader fieldChange={field.onChange} mediaUrl={song?.audioFile} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Button */}
        <div className="flex justify-end">
          <Button className="shad-button_primary" type="submit" disabled={isCreatingSong || isEditingSong}>
            {isCreatingSong || isEditingSong ? (
              <>
                <Loader /> 로딩 중 . . .
              </>            
            ): (
                <>
                {action === "Create" ? '생성하기' : "수정하기"}
              </>
            )}
          </Button>
        </div>
      
      </form>
    </Form>
  )
}

export default ProfileForm