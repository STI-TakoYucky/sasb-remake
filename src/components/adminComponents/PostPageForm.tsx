"use client"

import React, { useState } from 'react'

export default function PostPage() {

  const [organization, setOrganization] = useState<undefined | string>(undefined);
  const [caption, setCaption] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const URL = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${URL}/api/admin-post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        organization,
        caption
      }),
    })
  }

  return (
    <>
      <form className="flex flex-col gap-5 admin-form" onSubmit={handleSubmit}>
          <div className="w-full">
            <p>Select an organization</p>
            <select className="select select-info w-full max-w-sm" onChange={(e) => {setOrganization(e.target.value)}} value={organization}>
              <option disabled selected>
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
              onChange={(e) => {setCaption(e.target.value)}}
            ></textarea>
          </div>

          <div>
            <p>Select images</p>
            <input
              type="file"
              className="file-input file-input-bordered file-input-primary w-full max-w-sm"
            />
          </div>

          <input className="btn btn-success my-5 disabled:bg-[#00a96e]" type="submit" value={"Post"}></input>
        </form>
    </>
  )
}
