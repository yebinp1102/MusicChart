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
import AudioFileUploader from "../shared/AudioFileUploader";

type Props = {
  action: "Create" | "Edit",
  song?: Models.Document
}

const formValidation = z.object({
  singer: z.string().min(1, { message: "가수명을 추가해주세요." }),
  title: z.string().min(1, { message: "곡명을 추가해주세요." }),
  Imgfile: z.custom<File[]>(),
  tags: z.string(),
  audioFile: z.custom<File[]>(),
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
      Imgfile: [],
      tags: song ? song.tags.join(",") : "",
      audioFile: [],
    }
  })

  const handleSubmit = async (values : z.infer<typeof formValidation>) => {

    // 편집 할 때, editSong 함수 호출
    if(song && action === "Edit"){
      const editedSong = await editSong({
        ...values,
        songId: song.$id,
        imageId: song.imageId,
        imageUrl: song.imageUrl,
        audioFile: song.audioFile,
      })
      if(!editedSong){
        toast({title: "다시 시도해주세요."})
      }
      return navigate(`/song/detail/${song.$id}`)
    }

    // 새로 생성할 때, createSong 함수 호출
    const newSong = await createSong(values);

    if(!newSong){
      toast({title: "새로운 곡 정보를 추가하는데 실패했습니다. 잠시후 다시 시도 해주세요."})
    }

    navigate("/");
  }

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

export default SongForm