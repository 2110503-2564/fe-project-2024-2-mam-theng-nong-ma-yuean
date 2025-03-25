'use client'
import Image from 'next/image'
import InteractiveCard from './InteractiveCard';
import Link from 'next/link';
import deleteBooking from '@/libs/deleteBooking';
import { revalidateTag } from 'next/cache'; 

export default async function Card({dentistName, imgSrc, bookingDate, id ,token, user, role}:
  {dentistName:string, imgSrc:string, bookingDate:string, id:string, token:string, user:string, role:string}) {
  const Delete = async () => {
    try {
      await deleteBooking(id, token);
      revalidateTag("bookings");
      window.location.reload
    } catch (error) {
      console.error(error);
    }
  }
    return (
        <div className="w-[500px] h-[150px] bg-white p-4 rounded-lg shadow flex items-center gap-4 mb-6" flex-row>
            <Link href={id}>
              <div className="w-[100px] h-full relative rounded-lg bg-gray-400">
                <Image
                  src={imgSrc}
                  alt="Dentist Picture"
                  fill={true}
                  className="w-40 h-40 rounded-full object-cover"
                />
              </div>
            </Link>
              <div className="flex-1 ml-5">
                <h2 className="text-lg font-bold">{dentistName}</h2>
                <p className="text-sm font-semibold ml-4">Booking Date :</p>
                <p className="text-sm text-gray-600 ml-4">
                  {new Date(bookingDate).toLocaleString("en-EN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour12: false,
                  })}
                </p>
                { role == "admin" &&(
                <p className="text-sm text-gray-600 ml-4">
                  userID: { user }
                </p>)
                }
              </div>
              <div>
                <button className="bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded-lg " onClick={ Delete }>Cancel</button>
                <Link href= { `/edit/${id}` }>
                  <button className='bg-yellow-400 hover:bg-yelow-600'>Edit</button>
                </Link>
              </div>
        </div>
    );
}