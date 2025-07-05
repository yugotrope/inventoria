import { UploadDropzone } from "@uploadthing/react";

import { OurFileRouter } from "@/app/api/uploadthing/core";

interface ImageUploadProps {
    endpoint: "postImage",
    onChange: (url: string) => void,
    value: string,
}

import React from 'react'
import { TrashIcon } from "lucide-react";
import toast from "react-hot-toast";

const ImageUpload = ({endpoint, onChange, value}: ImageUploadProps) => {

    if(value){
        return(
            <div className="flex justify-center items-center w-1/2 lg:w-2/3 relative mb-4">
                <img src={value} alt="Uploaded Image" className="rounded-md w-full h-full object-cover"/>
                <button className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2" onClick={() => onChange("")}>
                    <TrashIcon/>
                </button>
            </div>
        );
    } 
    

  return (
    <div className="flex items-center justify-center text-black"> 
        <UploadDropzone<OurFileRouter, "postImage">
            endpoint={endpoint}

            onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);
            toast.success("Image uploaded successfully");
            if(res && res[0]?.ufsUrl) {
                onChange(res[0]?.ufsUrl);
            }
            }}
            onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
            }}
            className="text-primary ut-button:text-primary"
        />
    </div>
  )
}

export default ImageUpload