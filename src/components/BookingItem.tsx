import Image from 'next/image'
import InteractiveCard from './InteractiveCard';
import Link from 'next/link';

export default function Card({dentistName, imgSrc, bookingDate, id}:{dentistName:string, imgSrc:string, bookingDate:string, id:string}){
    return (
        <div className="w-[500px] h-[150px] bg-white p-4 rounded-lg shadow flex items-center gap-4">
            <Link href={id}>
              <div className="w-[100px] h-full relative rounded-lg bg-gray-400">
                {/* Fallback for image if missing */}
                <Image
                  src={imgSrc}
                  alt="Dentist Picture"
                  fill={true}
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold">{dentistName}</h2>
                <p className="text-sm font-semibold ml-4">Booking Date :</p>
                <p className="text-sm text-gray-600 ml-4">
                  {new Date(bookingDate).toLocaleString("en-EN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </p>
              </div>
            </Link>
        </div>
    );
}