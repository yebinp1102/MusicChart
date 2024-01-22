import { Button } from "../ui/button";
import { useCallback, useState } from "react";
import {useDropzone, FileWithPath} from 'react-dropzone'

type Props = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
}

// AudioFileUploader

const AudioFileUploader = ({fieldChange, mediaUrl} : Props) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFile(acceptedFiles);
    fieldChange(acceptedFiles);
    setFileUrl(URL.createObjectURL(acceptedFiles[0]));
  }, [file])

  const {getRootProps, getInputProps} = useDropzone({
    onDrop, 
    accept: {"audio/*" : [".mp3", ".mp4", ".mpeg"] }
  });

  return (
    <div 
      {...getRootProps()} 
      className="flex items-center justify-center flex-col bg-dark3 rounded-xl cursor-pointer border-dark-4 border-2" 
    >
      <input {...getInputProps()} />
      {
        fileUrl? (
          <>
            <div className="flex items-center py-16 gap-4">
              <img 
                src="/assets/icons/add-song.svg"
                width={48}
                height={48}
                alt="add"
              />
              <p>{file[0].name}</p>
            </div>
            <p className="text-light-3 text-center w-fill pb-10">오디오 파일을 바꾸려면 오디오를 클릭하거나 새 파일를 드래그 해주세요.</p>
          </>
        ): (
          <div className="flex flex-col items-center justify-center p-16 h-80">
            <img 
              src="/assets/icons/new-music.svg" 
              alt="file upload" 
              width={80}
              height={80}
            />
            <h3 className=" font-medium text-light-3 mb-2 mt-6">오디오 파일을 여기 드래그 해주세요.</h3>
            <p className="text-light-4 mb-6">MP3, MP4, MPEG</p>

            <Button type="button" className="bg-dark-4">
              컴퓨터에서 오디오 불러오기
            </Button>
          </div>
        )
      }
    </div>
  )
}

export default AudioFileUploader