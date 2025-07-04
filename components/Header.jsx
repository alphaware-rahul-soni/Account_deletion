export default function Header() {
    return <div className="flex items-center gap-3">
        <img src="https://ott-output.s3.ap-south-1.amazonaws.com/logo+(1).png" className="w-20 h-20"></img>
        <div className=" flex flex-col justify-between h-full w-full py-3">
            <p className="text-xl font-semibold font-sans bg-gradient-to-br from-orange-300 to-red-700 text-transparent bg-clip-text">
            Rocket Reel : Stream Drama and TV
            </p>
            <p className="text-sm font-normal">powered by :- <b className="text-yellow-500">Alphaware</b></p>
        </div>

    </div>
} 

export function InfoMessage() {
     return <div className="flex flex-col items-center gap-1">
        <h1 className="text-2xl font-semibold text-red-500">Delete My Account</h1>
        <p className="text-sm font-medium font-sans">Please login to verify your account before deleting</p>
     </div>
}