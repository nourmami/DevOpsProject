import { useState } from 'react'
import { useCreateMeme } from './services'
function Upload() {
  let [path, setPath] = useState('')
  const { submit, loading } = useCreateMeme()
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      setPath(window.URL.createObjectURL(file))
      setUploadedFile(file)
    }
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    if (uploadedFile) {
      formData.append('file', uploadedFile)
    }
    formData.set('file_upload', '')
    // const data = Object.fromEntries(formData.entries())
    submit(formData)
  }

  return (
    <form
      method="post"
      onSubmit={handleFormSubmit}
      encType="multipart/form-data"
    >
      <div className="my-8 flex justify-center items-center">
        <div className="backdrop lg:w-3/4 flex flex-col rounded p-3 bg-black bg-opacity-10 text-white shadow-lg md:w-5/6 sm:w-full">
          <div className="w-full px-10 py-6">
            <h3 className="py-3 text-xl font-semibold text-shadow">
              Post a Meme
            </h3>
            <div className="flex items-center bg-black bg-opacity-10 rounded-t-lg">
              <label className="w-32 text-right mr-8 text-white">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Pickloria Rocks!"
                className="bg-black bg-opacity-0 flex-1 p-4 pl-1 outline-none text-white"
              />
            </div>
            <div className="flex items-center bg-black bg-opacity-10 rounded-b-lg">
              <label className="w-32 text-right mr-8 text-white">
                Description
              </label>
              <textarea
                id="desc"
                rows={4}
                name="description"
                placeholder="Lorem Ipsum"
                className="bg-black bg-opacity-0 flex-1 p-4 pl-1 outline-none text-white"
              ></textarea>
            </div>
          </div>
          <div className="w-full py-6 px-10">
            <div className="w-full">
              <label className="flex justify-center w-full h-80 px-4 transition bg-black bg-opacity-10 border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                <span className="flex items-center space-x-2">
                  {!path && (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <span className="font-medium text-gray-600">
                        Drop *.gif or *.jpg to attach, or&nbsp;
                        <span className="text-blue-600 underline">
                          browse your device
                        </span>
                      </span>
                    </>
                  )}
                  {path && <img src={path} className="w-full h-full" alt="" />}
                </span>
                <input
                  type="file"
                  id="file_upload"
                  onChange={onFileChange}
                  name="file_upload"
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-3/4 md:w-5/6 sm:w-5/6 m-auto pb-8">
        <button
          disabled={loading}
          className="bg-black bg-opacity-10 w-full backdrop text-white px-3 py-1.5 rounded focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40 hover:bg-opacity-30 text-lg"
        >
          <i className="fa fa-upload"></i> Upload
        </button>
      </div>
    </form>
  )
}

export default Upload
