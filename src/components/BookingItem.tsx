'use client'

import Image from 'next/image';
import Link from 'next/link';
import deleteBooking from '@/libs/deleteBooking';

export default function BookingItem({ dentistName, bookingDate, id, token, user, role, onDelete }: 
  { dentistName: string, imgSrc: string, bookingDate: string, id: string, token: string, user: string, role: string, onDelete: (id: string) => void }) {

  const Delete = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this booking?");
    
    if (isConfirmed) {
      try {
        // Optimistically remove the booking from the UI
        onDelete(id);

        // Attempt to delete the booking on the backend
        await deleteBooking(id, token);
      } catch (error) {
        console.error(error);
        // If deletion fails, you might want to add the booking back to the UI
        // This could be done by passing an additional callback or modifying state management
      }
    }
  };

  return (
    <div className="w-[500px] h-[150px] bg-white p-4 rounded-lg shadow flex items-center gap-4 mb-6">
      <div className="flex-1 ml-5">
        <h2 className="text-lg font-bold">{dentistName}</h2>
        <p className="text-sm font-semibold ml-4">Booking Date:</p>
        <p className="text-sm text-gray-600 ml-4">
          {new Date(bookingDate).toLocaleString("en-EN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        {role == "admin" && (
          <p className="text-sm text-gray-600 ml-4">
            userID: {user}
          </p>
        )}
      </div>
      <div className='flex flex-col p-5'>
        <button className="bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded-lg mb-2" onClick={Delete}>Cancel</button>
        <Link href={`/edit/${id}`}>
          <button className='bg-yellow-400 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg mt-2' >Edit</button>
        </Link>
      </div>
    </div>
  );
}