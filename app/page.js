"use client"
import Header, { InfoMessage } from "@/components/Header";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DeleteInfo } from "./config";


export default function Home() {
  const { data: session } = useSession();
  const [phoneNo, setPhoneNo] = useState("");
  const [userExist, setUserExist] = useState(false);
  const [userDetails, setUserDetails] = useState("");
  const [deletedSuccessfully, setDeletedSuccessfully] = useState(false);
  const [termsandServices, setTermsandServices] = useState(false);
  const [agreement, setAgreement] = useState(false);

  // console.log("this is hte backend url ", process.env.NEXT_PUBLIC_API_URL);

  const deleteAccount = async () => {
    if (!agreement) {
      toast.error("Please select the checkbox to continue.")
      return;
    }
    try {
      const deleteAccount = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user/deleteaccount/${userDetails._id}`, {});

      if (deleteAccount.data.success) {
        toast.success("Account deleted successfully.");
        setDeletedSuccessfully(true);
        signOut();
      }

    }
    catch (error) {
      console.error('Error while deleting account.', error);
      toast.error(error.response.data.message)
    }

  }

  useEffect(() => {

    async function CheckUserExist() {
      try {
        const userExist = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/userexist`, session.user);
        if (userExist.data.success) {
          toast.success("User exist.");
          setUserDetails(userExist.data.data);
          setUserExist(true);
        }
        else {
          toast.error("user does not exist.");
          signOut()
        }
      }
      catch (error) {
        console.error("Error while fetching the user status.", error);
        toast.error(error.response.data.message);
      }
    }

    if (session) {
      CheckUserExist()
    }
  }, [session])

  
  return (
    <div className='min-h-screen w-full  inset-0 z-50  flex items-center justify-center'>

      {
        deletedSuccessfully && <div className='rounded-xl items-center flex flex-col justify-center gap-4 bg-white shadow-xl w-[40%] min-h-[50%] overflow-scroll p-4 no-scrollbar'>
          <div className="flex flex-col gap-6 pt-4">
            <Header></Header>
            <div className="flex flex-col items-center py-10">
              <h1 className="text-xl font-semibold">Account deleted successfully!</h1>
              <p className="text-sm font-medium tracking-wide mt-4">You can download Reelshort again to experience it.</p>
            </div>
          </div>
        </div>
      }
      {!deletedSuccessfully && (userExist ? <div className='rounded-xl items-center flex flex-col justify-center gap-4 bg-white shadow-xl w-[40%] h-[50%] overflow-scroll p-4 no-scrollbar'>
        <div className="flex flex-col gap-6 pt-4">
          <Header></Header>
          <div className="flex gap-4 items-center ">
            <div className="w-16 h-16 rounded-full p-2 flex items-center justify-center bg-blue-400 text-white">
              {userDetails.userName[0]}
            </div>
            <div className="text-xl font-semibold">{userDetails.userName}</div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-md font-semibold text-neutral-700">Your account will be permanently deleted and:</p>
            <div className="h-[40vh] w-[90%] overflow-auto bg-yellow-200/40 p-4 rounded-2xl ">
              <div className="flex flex-col gap-2 items-start w-full">
                {
                  DeleteInfo.map((details) => {
                    return <p className="text-sm font-medium tracking-wider">&middot; {details}</p>
                  })
                }
              </div>
            </div>
            <div className="flex items-center justify-start gap-2 mt-2">
              <input type="checkbox"
                checked={agreement}
                onChange={() => setAgreement(!agreement)}></input>
              <p className="text-sm font-medium text-red-500">I have read and agree to above terms.</p>
            </div>
            <div className="flex items-center justify-center gap-8 my-3">
              <button onClick={deleteAccount} className="px-6 py-1 text-lg text-red-500 bg-yellow-100/40 rounded-lg cursor-pointer">Delete</button>
              <button onClick={() => {
                if (!agreement) {
                  toast.error("Please select the checkbox to continue.")
                  return;
                }
                toast.info("Your authentication is no longer valid.")
                signOut()
              }} className="px-6 py-1 text-lg text-white bg-red-500 rounded-lg cursor-pointer">Cancel</button>
            </div>
          </div>
        </div>
      </div> :
        <div className=' rounded-xl items-center flex flex-col justify-center gap-10 bg-white shadow-xl w-[40%] h-[90%] overflow-auto  p-4'>
          <Header></Header>
          <InfoMessage></InfoMessage>
          <div className='flex flex-col items-center w-full'>
            <input onChange={(e) => setPhoneNo(e.target.value)} placeholder="Enter your mobile No." type="text" className="w-full px-4 py-2 rounded-full border mb-2"></input>
            <button className='w-full rounded-full shadow bg-white text-black py-2 text-md flex justify-center gap-2 font-semibold items-center border-1 border-blue-500 cursor-pointer hover:scale-105 ease-in-out duration-150' onClick={async () => {
              if (!termsandServices) {
                toast.error("Please accept terms to continue.")
                return;
              }
              await signIn("credentials", {
                mobileNo: phoneNo
              });
            }}>Login with mobile No.</button>
            <br></br>
            <button className='w-full rounded-full shadow text-white py-2 text-md flex justify-center gap-2 font-semibold bg-cyan-500 items-center border-1 border-blue-500 cursor-pointer hover:scale-105 ease-in-out duration-150' onClick={async () => {
              if (!termsandServices) {
                toast.error("Please accept terms to continue.")
                return;
              }
              await signIn("google");
            }}><img src="/Logo-google-icon-PNG.png" className="w-5 h-5 bg-transparent"></img> Login with Google</button>
            <br />
            <button className='w-full  bg-black text-white  shadow border rounded-full py-2 text-md flex justify-center gap-2 font-semibold items-center cursor-pointer hover:scale-105 ease-in-out duration-150'
              onClick={async () => {
                if (!termsandServices) {
                  toast.error("Please accept terms to continue.")
                  return;
                }
                await signIn("apple");
              }}><img src="/image.png" className="w-5 h-5 invert"></img> Login with Apple</button>
          </div>
          {/* <Signin></Signin> */}
          <div className='flex items-center gap-1'>
            <input
              type="checkbox"
              checked={termsandServices}
              onChange={() => setTermsandServices(!termsandServices)}></input>
            <p className='text-sm font-medium text-gray-500'>By continuing, I agree to the <b className='underline underline-offset-2'>Service Agreement</b> and <b className='underline underline-offset-2'>privacy policy</b></p>
          </div>
        </div>
      )}
    </div>
  );
}