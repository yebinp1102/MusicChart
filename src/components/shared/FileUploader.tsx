import { Button } from "../ui/button";
import { useCallback, useState } from "react";
import {useDropzone, FileWithPath} from 'react-dropzone'

type Props = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
}

const FileUploader = ({fieldChange, mediaUrl} : Props) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFile(acceptedFiles);
    fieldChange(acceptedFiles);
    setFileUrl(URL.createObjectURL(acceptedFiles[0]));
  }, [file])

  const {getRootProps, getInputProps} = useDropzone({
    onDrop, 
    accept: {
      "image/*" : [".png", ".jpg", ".jpeg"]
    }
  });

  return (
    <div 
      {...getRootProps()} 
      className="flex items-center justify-center flex-col bg-dark3 rounded-xl cursor-pointer border-dark-4 border-2" 
    >
      <input {...getInputProps()} />
      {
        fileUrl ? (
          <>
            <div className="flex flex-1 w-full p-5 lg:p-10 justify-center">
              <img 
                src={fileUrl} 
                alt="img" 
                className="w-80 h-80 lg:w-[480px] lg:h-[480px] rounded-[24px] object-cover object-center" 
              />
            </div>
            <p className="text-light-3 text-center w-fill pb-10">사진을 바꾸려면 이미지를 클릭하거나 이미지를 드래그 해주세요.</p>
          </>
        ): (
          <div className="flex flex-col items-center justify-center p-16 h-80 lg:h-[612px]">
            <img 
              src="/assets/icons/file-upload.svg" 
              alt="file upload" 
              width={120}
              height={120}
            />
            <h3 className=" font-medium text-light-3 mb-2 mt-6">사진을 여기 드래그 해주세요.</h3>
            <p className="text-light-4 mb-6">SVG, PNG, JPG</p>

            <Button type="button" className="bg-dark-4">
              컴퓨터에서 사진 불러오기
            </Button>
          </div>
        )
      }
    </div>
  )
}

export default FileUploader