import { Models } from "appwrite"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import FileUploader from "../shared/FileUploader";
import { useCreateSong, useEditSong } from "@/lib/react-query/queries";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../shared/Loader";
import { Button } from "../ui/button";

type Props = {
  action: "Create" | "Edit",
  song?: Models.Document
}

const formValidation = z.object({
  singer: z.string().min(1, { message: "가수명을 추가해주세요." }),
  title: z.string().min(1, { message: "곡명을 추가해주세요." }),
  file: z.custom<File[]>(),
  tags: z.string()
})

const SongForm = ({action, song} : Props) => {
  const {toast} = useToast();
  const navigate = useNavigate();
  const {mutateAsync: createSong, isPending : isCreatingSong} = useCreateSong();
  const {mutateAsync: editSong, isPending: isEditingSong} = useEditSong();

  const form = useForm<z.infer<typeof formValidation>>({
    resolver: zodResolver(formValidation),
    defaultValues: {
      singer: song ? song?.singer : "",
      title: song ? song?.title : "",
      file: [],
      tags: song ? song.tags.join(",") : "",
    }
  })

  const handleSubmit = async (value : z.infer<typeof formValidation>) => {
    const newSong = await createSong(value);

    if(!newSong){
      toast({title: "새로운 곡 정보를 추가하는데 실패했습니다. 잠시후 다시 시도 해주세요."})
    }

    navigate("/");
  }

  return (
    <Form {...form} >
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-9 w-full  max-w-5xl"
      >
        {/* singer  */}
        <FormField 
          control={form.control}
          name="singer"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-input_label">가수</FormLabel>
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
          name="file"
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


        {/* Button */}
        <div className="flex justify-end">
          <Button className="shad-button_primary" type="submit">
            {isCreatingSong || isEditingSong ? (
              <>
                <Loader /> 곡 {isCreatingSong ? '생성' : '수정'} 중 . . .
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

export default SongForm