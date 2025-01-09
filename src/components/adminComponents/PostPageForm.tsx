"use client"

import React, { useEffect, useState } from 'react'
import { useImperativeFilePicker } from 'use-file-picker';
import { FileContent } from 'use-file-picker/types';
import { FileTypeValidator } from 'use-file-picker/validators';
import { IoClose } from "react-icons/io5";

export default function PostPage() {

  const [organization, setOrganization] = useState<undefined | string>(undefined);
  const [caption, setCaption] = useState("");
  const [images, setImages] = useState<FileContent<string>[]>([]);

  //upload files
  const { openFilePicker, filesContent, removeFileByIndex } = useImperativeFilePicker({
    readAs: 'DataURL',
    accept: 'image/*',
    multiple: true,
    validators: [
      new FileTypeValidator(['jpg', 'png'])
    ],

    onFilesSuccessfullySelected: ({ filesContent }) => {
      setImages(filesContent)
    },
  });


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const payload = {
        caption,
        organization,
        images: filesContent.map((file) => ({
          file: file.content,
          fileName: file.name,
        })),
      };

      const URL = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${URL}/api/admin-post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    })

    } catch (error) {
      console.error("Network error:", error);
    }

  }

  return (
    <>
      <form className="flex flex-col gap-5 admin-form" onSubmit={handleSubmit}>
        <div className="w-full">
          <p>Select an organization</p>
          <select className="select select-info w-full max-w-sm" onChange={(e) => { setOrganization(e.target.value) }} defaultValue={""}>
            <option value="" disabled hidden>
              Organization
            </option>
            <option>
              Jicto
            </option>
          </select>
        </div>

        <div className="w-full">
          <p>Input a caption</p>
          <textarea
            className="textarea h-[12rem] border-primary textarea-primary textarea-md textarea-bordered w-full !resize-none"
            placeholder="Caption"
            onChange={(e) => { setCaption(e.target.value) }}
          ></textarea>
        </div>

        <div>
          <p>Select images</p>
          <button
            type="button"
            className="btn btn-primary w-full max-w-sm text-white"
            onClick={() => openFilePicker()}
          >Select images</button>
        </div>

        {filesContent.map((file, i) => (
          <div key={i} className='flex gap-4'>
            <div className='w-20 h-20 rounded-md overflow-hidden '><img className='w-full h-full object-cover' src={file.content} alt="" /></div>

            <div className='flex items-center'>
              <div>{file.name}</div>
              <button type='button' className='ml-4' onClick={(e) => { e.preventDefault(); removeFileByIndex(i) }}><IoClose></IoClose></button>
            </div>
          </div>
        ))}

        <input className="btn btn-success my-5 disabled:bg-[#00a96e]" type="submit" value={"Post"}></input>
      </form>
    </>
  )
}
