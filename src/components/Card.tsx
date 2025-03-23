import Image from 'next/image'
import InteractiveCard from './InteractiveCard';

export default function Card({dentistName, imgSrc, role}:{dentistName:string, imgSrc:string, role:string}){
    console.log(role)
    return (
        <InteractiveCard>
            <div className="w-full h-[70%] relative rounded-t-lg">
                <Image src={imgSrc}
                    alt='Venue Picture'
                    fill={true}
                    className='object-cover rounded-t-lg'/>
            </div>
            <div className="w-full h-[30%] p-[10px] flex flex-col">
                {dentistName}
            </div>
            {
                role == "admin"? <button className='absolute right-0 top-0 m-2 text-sm rounded p-1 px-3 hover:bg-red-200 border-solid border-red-100'>Edit</button>:""
            }
        </InteractiveCard>
    );
}