import getBookings from "@/libs/getBookings";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"; 
import { getServerSession } from 'next-auth';
import getDentist from "@/libs/getDentist";
import BookingItem from "@/components/BookingItem";
import getUserProfile from "@/libs/getUserProfile";

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

  const profile = await getUserProfile(session.user.token);
  return (
    <main className="flex flex-col items-center text-black mt-12">
      {
        profile.data.role == "admin" ? <div>
          <div className="text-xl font-bold text-center">All Booking ({bookingCount})</div>
        </div> : <div>
          <div className="text-xl font-bold">Your Booking ({bookingCount})</div>
          {bookingCount >= 3 && (
            <div className="text-red-500 mt-2">You have reached the maximum number of bookings.</div>
          )}
        </div>
      }
      <div className="flex flex-col flex-wrap justify-center mt-4">
        {bookingDetail.data.map((booking: any, index: number) => (
          <BookingItem key={booking._id} dentistName={booking.dentist.name} imgSrc={dentists[index].data.image} bookingDate={booking.bookingDate}
           id={booking._id} token={session.user.token} user={booking.user} role = { profile.data.role }/>
        ))}
      </div>
    </main>
  );
}
