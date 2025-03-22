import Link from 'next/link';
import Image from 'next/image'
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export default async function TopMenu(){
    const session = await getServerSession(authOptions);

    return(
        <div className="h-[50px] bg-white fixed top-[0px] left-[0px] right-[0px] z-30 border-b-[1px] border-b-soild border-b-gray-300 border-t-soild border-t-gray-300 border-t-[1px] flex flex-row-reverse">
            {/*<Image src={'/img/logo.png'}
            alt='logo'
            className="h-full w-auto"
            width={0} height={0} sizes='100vh'/>*/}
            <TopMenuItem title='Home' pageRef='/'/>
            <TopMenuItem title='Booking' pageRef='/booking/'/>
            <div className='flex items-center absolute left-0 h-full px-4 text-cyan-600'>
                {
                    session? 
                    <Link href="/api/auth/signout">
                        <div>
                            Sign-Out of {session.user.name}
                        </div>
                    </Link>:
                    <Link href="/api/auth/signin">
                        <div>
                            Sign-In
                        </div>
                    </Link>
                }
                
            </div>


        </div>
    );
}