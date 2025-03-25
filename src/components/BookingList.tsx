import getBookings from "@/libs/getBookings";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"; 
import { getServerSession } from 'next-auth';
import getDentist from "@/libs/getDentist";
import Image from "next/image";
import Link from 'next/link';
import BookingItem from "@/components/BookingItem";

export default async function BookingList() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.token) {
    return <div className="text-center text-red-500">User not authenticated or token not found</div>;
  }

  let bookingDetail;
  try {
    bookingDetail = await getBookings(session?.user?.token);
  } catch (error) {
    return <div className="text-center text-red-500">Failed to fetch booking details</div>;
  }

  const bookingCount = bookingDetail.data.length;

  if (bookingCount === 0) {
    return <div className="text-center text-gray-500 mt-12">You have no bookings.</div>;
  }

  let dentists = [];
  try {
    dentists = await Promise.all(
      bookingDetail.data.map((booking: any) => getDentist(booking.dentist.id))
    );
  } catch (error) {
    return <div className="text-center text-red-500">Failed to fetch dentist details</div>;
  }

  return (
    <main className="flex flex-col items-center text-black mt-12">
      <div className="text-xl font-bold">Your Booking ({bookingCount})</div>
      {bookingCount >= 3 && (
        <div className="text-red-500 mt-2">You have reached the maximum number of bookings.</div>
      )}
      <div className="flex flex-wrap justify-center mt-4">
        {bookingDetail.data.map((booking: any, index: number) => (
          <BookingItem dentistName={booking.dentist.name} imgSrc={dentists[index].image} bookingDate={booking.bookingDate} id={booking._id} />
        ))}
      </div>
    </main>
  );
}
