import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function DropZone({ setUploadedImages }) {
  const [imageFiles, setImageFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setUploadedImages(acceptedFiles);
    setImageFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const { acceptedFiles, getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png, image/jpg",
    maxFiles: 5,
  });

  return (
    <section className="container">
      {fileRejections.length > 0 && (
        <span className="block text-red-500 text-sm">Please select 5 or less images</span>
      )}
      <div
        {...getRootProps({
          className:
            "max-w-xl flex justify-center px-6 pt-10 pb-11 border-2 border-gray-300 border-dashed cursor-pointer",
        })}
      >
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer bg-white font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
            >
              <span>Click to upload up to 5 images</span>
              <input {...getInputProps()} />
            </label>
          </div>
          <p className="text-xs text-gray-500">For best quality, select square images</p>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-2 mt-2">
        {imageFiles.map((file) => (
          <div className="aspect-w-9 aspect-h-9">
            <img src={file.preview} className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
