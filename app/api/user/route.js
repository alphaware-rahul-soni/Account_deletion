import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";


export async function GET() {
    
    const session = await getServerSession();
    // const checkUserExistence = await checkUserExists()

    return NextResponse.json({
        name: session?.user?.name
    });

}