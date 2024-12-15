import React, { useState,useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FileWithPath } from 'react-dropzone'
import { Button } from '../ui/button'
type fileUploader={
  fieldChange:(FILES:File[])=>void,
  mediaUrl:string
}
function FileUploader({fieldChange,mediaUrl}:fileUploader) {
  const [fileURL, setFileURL] = useState('')
  const [file, setFile] = useState<File[ ]>([])

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFile(acceptedFiles)
    fieldChange(acceptedFiles)
    setFileURL(URL.createObjectURL(acceptedFiles[0]))

  }, [file])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop ,
  accept:{
    'image/*':['.png','.jpg','.jpeg','.svg'],
  }})

  return (
    <div {...getRootProps()} className='flex flex-center flex-col bg-slate-800 border-gray-700 rounded-xl cursor-pointer'>
      <input {...getInputProps()} />
      {
        fileURL ?
          (
          <>
            <p className='text-light-4 my-4'>Click Or Drag to Replace</p>
            <div className='flex flex-1 justify-center p-5 lg:p-10'>
              <img src={fileURL} alt=""  className='fiel_uploader-img'/>
            </div>
          </>
          ) : (
            <div className='file_uploader-box'>
            <img src="src/assests/icons/file-upload.svg" alt="" />
            <h3 className='base-medium text-light-2 mb-2 mt-6 text-center'>Drag Or Select File Here</h3>
            <p className='text-light-4 small-regular mb-5 md:mb-10'>SVG,PNG,JPEG,JPG</p>
            <Button className='bg-slate-900 hover:bg-slate-600 transition'>Select From Computer</Button>
            </div>
          )
      }
    </div>
  )
}
export default FileUploader