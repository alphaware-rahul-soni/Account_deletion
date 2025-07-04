"use client"
import Header, { InfoMessage } from '@/components/Header';
import Signin from '@/components/SignIn';
import { Apple, AppleIcon } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';

export default function () {
  const { data: session } = useSession();

  if (session) {
    return redirect("/")
  }

  return <div className='h-screen w-full bg-white flex items-center justify-center'>
    <div className='p-6 rounded-xl items-center flex flex-col justify-center gap-10 fixed inset-0 z-50 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 backdrop-blur-lg bg-black/0 shadow w-[40%] h-[80%]'>
      <Header></Header>
      <InfoMessage></InfoMessage>
      <div className='flex flex-col items-center w-full'>
        <button className='w-full rounded-sm text-white bg-blue-400 py-2 text-md flex justify-center gap-1 items-center cursor-pointer' onClick={async () => {
          await signIn("google");
        }}><AppleIcon></AppleIcon>  Login with google</button>
        <br />
        <button className='w-full rounded-sm text-white bg-black py-2 text-md flex justify-center gap-1 items-center cursor-pointer'
          onClick={async () => {
            await signIn("apple");
          }}><Apple></Apple>Login with Apple</button>
      </div>
      {/* <Signin></Signin> */}
      <div className='flex items-center gap-1'>
        <input type="radio"></input>
        <p className='text-sm font-medium text-gray-500'>By continuing, I agree to the <b className='underline underline-offset-2'>Service Agreement</b> and <b className='underline underline-offset-2'>privacy policy</b></p>
      </div>
    </div>

  </div>
}