import { Models } from "appwrite"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import FileUploader from "../shared/FileUploader";

type Props = {
  action: "Create" | "Edit",
  song?: Models.Document
}

const formValidation = z.object({
  singer: z.string().min(1, { message: "가수명을 추가해주세요." }),
  title: z.string().min(1, { message: "곡명을 추가해주세요." }),
  image: z.custom<File[]>(),
  tags: z.string()
})

const SongForm = ({action, song} : Props) => {

  const form = useForm<z.infer<typeof formValidation>>({
    resolver: zodResolver(formValidation),
    defaultValues: {
      singer: song ? song?.singer : "",
      title: song ? song?.title : "",
      image: [],
      tags: song ? song.tags.join(",") : "",
    }
  })

  const handleSubmit = async (value : z.infer<typeof formValidation>) => {
    console.log(value);
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
          name="image"
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
        

      </form>
    </Form>
  )
}

export default SongForm