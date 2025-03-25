import Image from 'next/image'
import InteractiveCard from './InteractiveCard';
import Link from 'next/link';
import deleteDentist  from '../libs/deleteDentist';
import { getServerSession } from 'next-auth';
import { authOptions } from '../app/api/auth/[...nextauth]/authOptions';

export default async function Card({dentistName, imgSrc, role, id}:{dentistName:string, imgSrc:string, role:string|null, id:string}){

    const Delete = async () => {
        
        const complete = await deleteDentist(id, "dd");
        if(!complete){
            alert("Dentist Deleted");
            window.location.reload();
        }
    }
    return (
        <div className='relative'>
            <Link href={id}>
                <InteractiveCard>
                    <div className="w-full h-[70%] relative rounded-t-lg">
                        <Image src={imgSrc}
                            alt='Dentist Picture'
                            fill={true}
                            className='object-cover rounded-t-lg'/>
                    </div>
                    <div className="w-full h-[30%] p-[10px] flex flex-col">
                        {dentistName}
                    </div>

                </InteractiveCard>
            </Link>
            {
                role == "admin"? 
                <div>
                    <Link href={`/dentist/editDentist/${id}`}>
                        <button className='absolute right-0 top-0 m-2 text-sm 
                        rounded p-1 px-4 bg-yellow-200 hover:bg-yellow-300'>
                            Edit
                        </button>
                    </Link>
                    <button className="absolute right-0 top-8 m-2 text-sm
                        rounded p-1 px-4 bg-red-200 hover:bg-red-300"
                        onClick={ Delete }>
                            Delete
                    </button>
                </div>
                :""
            }
        </div>
    );
}