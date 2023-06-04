import { FiCalendar } from "react-icons/fi";
import { FC, useEffect, useRef, useState } from "react";

import { Inter } from "next/font/google";
import { AiOutlineBars } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";

const inter400 = Inter({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

const inter600 = Inter({
  weight: "600",
  style: "normal",
  subsets: ["latin"],
});

interface FormProps {
  title?: string;
  setData?: any;
  data?: any;
  setCancel?: any;
}

const Form = ({ title, setData, data, setCancel }: FormProps) => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const router = useRouter();
  const serviceid = useRef<HTMLInputElement>(null);
  const servicename = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
  const totaldays = useRef<HTMLInputElement>(null);
  const totalsessions = useRef<HTMLInputElement>(null);
  const Servicename = useRef<HTMLInputElement>(null);
  const datetime = useRef<HTMLInputElement>(null);

  const handleClick = async (e: any) => {
    e.preventDefault();
    const serviceids = serviceid.current?.value;
    const servicenames = Servicename.current?.value;
    const descriptionv = description.current?.value;
    const totaldayss = totaldays.current?.value;
    const totalsessionss = totalsessions.current?.value;
    const datetimes = datetime.current?.value;
const idToken = sessionStorage.getItem("tokenid");

      //setAccessToken(idToken != null ? idToken :  "")
    if (
      servicenames === "" ||
      descriptionv === "" ||
      totaldayss === "" ||
      totalsessionss === "" ||
      datetimes === ""
    ) {
      setErrorMessage("Please fill all the fields");
      return;
    }

    if (title?.includes("Add")) {
      // create new service here
      const data = {
        name: servicenames,
        description: descriptionv,
        days: totaldayss,
        sessions: totalsessionss,
        date: datetimes,
        dietian_id: 1,
    opertaion_id: 1
      };

      try {
        
      const response = await fetch(
        "https://diet-ideas-production.up.railway.app/v1/service",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
            },
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert("test")
        console.log(data);
       
        sessionStorage.setItem("tokenid", data.data.token);

        router.push('/service');
      } else {
        const error = await response.json();
        const errorMessage = "Authentication failed!";
        throw new Error(errorMessage);
      }
    } catch (error:any) {
      setErrorMessage(error.message);
    }
    }

    if (title?.includes("Edit")) {
       alert(serviceids)
      // update service here
      const data = {
        name: servicenames,
        description: descriptionv,
        days: totaldayss,
        sessions: totalsessionss,
        date: datetimes,
        dietian_id: 1,
    opertaion_id: 1
      };
      const dataid = serviceids;
      try {
       
      const response = await fetch(
        `https://diet-ideas-production.up.railway.app/v1/service/${dataid}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
            },
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert("test")
        console.log(data);
       
        sessionStorage.setItem("tokenid", data.data.token);

        router.push('/service');
      } else {
        const error = await response.json();
        const errorMessage = "Authentication failed!";
        throw new Error(errorMessage);
      }
    } catch (error:any) {
      setErrorMessage(error.message);
    }
    }
  };

  useEffect(() => {
    if (title?.includes("Edit")) {
      serviceid.current!.value = data?.service_id;
      Servicename.current!.value = data?.name;
      description.current!.value = data?.description;
      totaldays.current!.value = data?.days;
      totalsessions.current!.value = data?.sessions;
      datetime.current!.value = new Date(data?.createdAt)
        .toISOString()
        .split("T")[0];
    }
  }, []);

  return (
    <div className="w-96 bg-white shadow rounded-xl h-auto">
      <div className="flex items-center justify-between w-full px-8 py-5">
        <div className="rounded-xl border-2 border-[#E4E7EC] h-12 w-12 bg-opacity-10 flex items-center justify-center">
          <AiOutlineBars className="h-8 w-8" />
        </div>
        <FaTimes className="h-5 w-5 cursor-pointer font-extralight" />
      </div>
      <div className="flex flex-col text-center px-8 w-full">
        <h1 className={`${inter600.className} text-lg text-black`}>{title}</h1>
      </div>
      <form onSubmit={handleClick} className="flex flex-col px-8 w-full mt-2">
       
       <div className="flex my-2 flex-col gap-2">
          
          <div className="flex flex-col border-2 rounded-md px-3 border-[#E4E7EC] items-center gap-2 w-full">
           
             <input
              type="hidden"
              name="serviceid"
              ref={serviceid}
              id="serviceid"
            />
          </div>
        </div>
        <div className="flex my-2 flex-col gap-2">
          <label
            htmlFor="name"
            className={`${inter400.className} text-sm text-black`}
          >
            Service Name
          </label>
          <div className="flex flex-col border-2 rounded-md px-3 border-[#E4E7EC] items-center gap-2 w-full">
           
            <input
              type="text"
              name="name"
              ref={Servicename}
              id="name"
              placeholder="Service Name"
              className="w-full border-none outline-none rounded-lg py-2"
            />
          </div>
        </div>
        <div className="flex flex-col border-2 rounded-md px-3 border-[#E4E7EC] items-center gap-2 w-full">
          <label
            htmlFor="description"
            className={`${inter400.className} text-sm text-black`}
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            ref={description as any}
            rows={4}
            placeholder="Description"
            className="w-full border-none outline-none rounded-lg py-2"
          />
        </div>

        <div className="flex flex-col border-2 rounded-md px-3 border-[#E4E7EC] items-center gap-2 w-full">
          <label
            htmlFor="days"
            className={`${inter400.className} text-sm text-black`}
          >
            Total No. of Days
          </label>
          <input
            type="number"
            name="days"
            ref={totaldays}
            id="days"
            placeholder="Total No. of Days"
            className="w-full border-none outline-none rounded-lg py-2"
          />
        </div>

        <div className="flex flex-col border-2 rounded-md px-3 border-[#E4E7EC] items-center gap-2 w-full">
          <label
            htmlFor="sessions"
            className={`${inter400.className} text-sm text-black`}
          >
            Total No. of Sessions
          </label>
          <input
            type="number"
            name="sessions"
            id="sessions"
            ref={totalsessions}
            placeholder="Total No. of Sessions"
            className="w-full border-none outline-none rounded-lg py-2"
          />
        </div>

        <div className="flex flex-col border-2 rounded-md px-3 border-[#E4E7EC] items-center gap-2 w-full">
          <label
            htmlFor="date"
            className={`${inter400.className} text-sm text-black`}
          >
            Date Created
          </label>
          <input
            type="date"
            name="date"
            id="date"
            ref={datetime}
            placeholder="Date Created"
            className="w-full border-none outline-none rounded-lg py-2"
          />
        </div>

        <div className="flex pb-5 justify-center items-center gap-3 mt-5 px-8">
          <button className="flex items-center gap-2  text-white px-14 py-3 rounded-lg bg-background-200 text-black">
            Confirm
          </button>
          <button
            type="button"
            onClick={() => setCancel(false)}
            className="flex items-center gap-2 py-3 rounded-lg px-14 bg-danger text-white"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
