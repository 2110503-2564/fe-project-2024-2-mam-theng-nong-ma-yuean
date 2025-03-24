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
        <div className="h-[50px] bg-gray-400 fixed top-0 left-[0px] right-[0px] z-30 border-b-[1px] border-b-soild border-b-gray-300 flex flex-row justify-between">
            <div className='flex flex-row ml-5'>
                <TopMenuItem title='Home' pageRef='/'/>
                <TopMenuItem title='Booking' pageRef='/booking/'/>
            </div>
            <div className='mx-7 flex items-center h-full text-black'>
                <button className='p-1 px-4 bg-white rounded-lg hover:bg-gray-200'>
                    {
                    session? 
                    <Link href="/api/auth/signout">
                        <div>
                            {(profile as UserProfile).data.name}
                        </div>
                    </Link>:
                    <Link href="/api/auth/signin">
                        <div>
                            Sign-In
                        </div>
                    </Link>
                }
                </button>
            </div>


        </div>
    );
}