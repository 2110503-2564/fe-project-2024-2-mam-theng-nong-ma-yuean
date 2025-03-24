import Link from 'next/link';
import Image from 'next/image'
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import getUserProfile from '@/libs/getUserProfile';

export default async function TopMenu(){
    const session = await getServerSession(authOptions);
    //console.log(session);
    let profile = null;
    if (session){
        profile = await getUserProfile(session.user.token);
        //console.log(profile);
    }
    
    return(
        <div className="h-24 bg-purple-400 fixed top-0 w-full z-30 border-b-[1px] border-b-soild border-b-gray-300 flex flex-row justify-between">
            <div className='flex flex-row ml-5'>
                <TopMenuItem title='Home' pageRef='/'/>
                <TopMenuItem title='Booking' pageRef='/booking/'/>
            </div>
            <div className='mx-7 flex items-center h-full text-black'>
            <button className="relative inline-flex items-center justify-center text-white text-lg font-medium rounded-lg shadow-lg bg-gradient-to-r transition-all duration-300 ease-in-out hover:scale-105 active:scale-90">
                <span className="bg-[#05062d] px-6 py-4 rounded-md w-full h-full transition-all duration-300 ease-in-out">
                {
                    session? 
                    <Link href="/api/auth/signout">
                        <div>
                            Sing-out
                        </div>
                    </Link>:
                    <Link href="/api/auth/signin">
                        <div>
                            Sign-In
                        </div>
                    </Link>
                }
                </span>
            </button>
            </div>


        </div>
    );
}