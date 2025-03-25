import getBookings from "@/libs/getBookings";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"; 
import { getServerSession } from 'next-auth';
import getDentist from "@/libs/getDentist";
import Image from "next/image";

export default async function BookingList() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.token) {
    return <div className="text-center text-red-500">User not authenticated or token not found</div>;
  }
  
  const bookingDetail = await getBookings(session?.user?.token);
  const bookingCount = bookingDetail.data.length;

  if (bookingCount === 0) {
    return <div className="text-center text-gray-500 mt-12">You have no bookings.</div>;
  }

  const dentists = await Promise.all(
    bookingDetail.data.map((booking: any) => getDentist(booking.dentist.id))
  );

  return (
    <main className="flex flex-col items-center text-black mt-12">
      <div className="text-xl font-bold">Your Booking ({bookingCount}/3)</div>
      {bookingCount >= 3 && (
        <div className="text-red-500 mt-2">You have reached the maximum number of bookings.</div>
      )}
      <div className="flex flex-wrap justify-center mt-4">
        {bookingDetail.data.map((booking: any, index: number) => (
          <div key={booking.id} className="w-[500px] h-[150px] bg-white p-4 rounded-lg shadow flex items-center gap-4">
            <div className="w-[100px] h-full relative rounded-lg bg-gray-400">
              <Image src={dentists[index].image} alt="Dentist Picture" fill={true} className="w-16 h-16 rounded-full object-cover" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold">{booking.dentist.name}</h2>
              <p className="text-sm font-semibold ml-4">Booking Date :</p>
              <p className="text-sm text-gray-600 ml-4">
                {new Date(booking.bookingDate).toLocaleString("en-EN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </p>
            </div>
            <button className="text-gray-500 hover:text-gray-700">🗑</button>
          </div>
        ))}
      </div>
    </main>
  );
}
