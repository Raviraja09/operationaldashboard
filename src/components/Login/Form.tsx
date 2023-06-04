import  { FC, useRef, useState } from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";

const inter400 = Inter({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
});

const Form: FC = () => {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const enteredEmail = emailRef.current?.value;
    const enteredPassword = passwordRef.current?.value;
    console.log(enteredEmail);
    console.log(enteredPassword);

    try {
      const response = await fetch(
        "https://diet-ideas-production.up.railway.app/v1/signin",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
            },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log(data.data.token);
        sessionStorage.setItem("tokenid", data.data.token);

        router.push('/dashboard');
      } else {
        const error = await response.json();
        const errorMessage = "Authentication failed!";
        throw new Error(errorMessage);
      }
    } catch (error:any) {
      setErrorMessage(error.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="mt-16 w-full gap-2 px-8 flex flex-col"
    >
      <input
        type="email"
         ref={emailRef}
        placeholder="Email"
        className={`${inter400.className} p-3 text-base leading-[19px] w-full text-white bg-transparent border-b-2 border-white focus:outline-none focus:border-white placeholder:text-white placeholder:font-extralight font-extralight`}
      />
      <input
        type="password"
         ref={passwordRef}
        placeholder="Password"
        className={`${inter400.className} p-3 text-base leading-[19px] w-full text-white bg-transparent border-b-2 border-white focus:outline-none focus:border-white placeholder:text-white`}
      />
      <div className="flex mt-5 items-center justify-between">
        <div className="flex items-center justify-between">
          <input
            type="checkbox"
            className="w-4 h-4 text-white border-2 border-white rounded-sm focus:outline-none"
          />
          <p
            className={`${inter400.className} my-0 ml-2 text-[15px] text-white font-extralight`}
          >
            Remember me
          </p>
        </div>
        <Link
          href="/forgot-password"
          className={`${inter400.className} text-[15px] underline text-white font-extralight`}
        >
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        className="mt-10 p-3 text-base leading-[19px] w-full text-white bg-primary rounded-md focus:outline-none"
      >
        Sign In
      </button>
    </form>
  );
};

export default Form;
