import { FC } from "react";

import { Inter } from "next/font/google";

import { useRouter } from "next/router";
import { FaCloudUploadAlt, FaImage } from "react-icons/fa";

const inter500 = Inter({
  subsets: ["latin"],
  weight: "500",
  style: "normal",
});
const inter400 = Inter({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
});
const inter600 = Inter({
  subsets: ["latin"],
  weight: "600",
  style: "normal",
});

const BlogNewMain: FC = () => {
  const router = useRouter();

  return (
    <div className="p-10 pb-20 px-16 flex flex-col pt-20 gap-16">
      <div className="flex items-center justify-between gap-3 w-full">
        <div className="flex w-full justify-between items-center flex-row gap-3">
          <h1 className={`${inter500.className} text-xl my-2 text-black`}>
            Add New Blog Post
          </h1>
        </div>
      </div>

      <div className="flex flex-col px-8 rounded-xl w-full ">
        <div className="flex w-full gap-10 h-[420px] shadow-lg px-6 rounded-xl py-6 bg-white">
          <div className="flex flex-col gap-2 rounded-xl">
            <div className="flex items-center rounded-xl justify-center h-40 bg-background-100 w-40 gap-2">
              <FaImage className="text-6xl text-background-200" />
            </div>
            <button className="flex items-center justify-center rounded-xl h-10 text-background-200 w-40 gap-2">
              UPLOAD IMAGE{" "}
              <FaCloudUploadAlt className="text-2xl text-background-200" />
            </button>
          </div>
          <div className="flex flex-col gap-8 w-9/12">
            <input
              type="text"
              placeholder="Title"
              className="w-full h-14 rounded-lg border-2 shadow-sm shadow-slate-400 focus:border-none focus:outline-none bg-background-100 border-none px-4"
            />
            <textarea
              placeholder="Description"
              rows={8}
              className="w-full py-3 rounded-lg resize-none border-2 shadow-sm shadow-slate-400 focus:border-none focus:outline-none bg-background-100 border-none px-4"
            ></textarea>

            <div className="flex flex-row gap-4">
              <button className="flex items-center justify-center rounded-xl h-10 bg-background-200 text-white w-40 gap-2">
                SAVE
              </button>
              <button className="flex items-center justify-center rounded-xl h-10 bg-danger text-white w-40 gap-2">
                CANCEL
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogNewMain;
