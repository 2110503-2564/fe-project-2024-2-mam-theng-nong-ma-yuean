import DateReserve from "@/components/DateReserve";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import getUserProfile from "@/libs/getUserProfile";
import getDentist from "@/libs/getDentist";
import addBooking from "@/libs/addBooking";
import Image from "next/image";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import getBooking from "@/libs/getBooking";
import updateBooking from "@/libs/updateBooking";

export default async function Booking({ params }: { params: { bid: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;

  console.log(params.bid)
  const profile = await getUserProfile(session.user.token);
  const hasBooking = profile.data.booking;
  const booking = await getBooking(params.bid, session.user.token);
  const dentist = await getDentist(booking.data.dentist.id)

  async function submit(bookingDate: string) {
      "use server";
      if (!session) return new Error("Not logged in");
      await updateBooking(params.bid, session.user.token, bookingDate, dentist.data.id, profile.data.id);
      revalidateTag("bookings")
      redirect("/booking")
  }
  return (
      <main className="w-[100%] flex flex-col justify-center my-16 items-center">
        <div className="text-2xl text-black my-8">{profile.data.name}</div>
        
        {/* Dentist Information & Date Selection */}
         <div className="mt-10 w-[80%] max-w-2xl p-5 border rounded-lg shadow-md flex">
          <div className="w-1/3 relative">
            <Image
              src={dentist.data.image}
              alt={dentist.data.name}
              width={150} 
              height={150}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          <div className="w-2/3 pl-5">
            <h2 className="text-2xl font-bold text-gray-800">Your old dentist</h2>
            <p className="text-xl font-semibold mt-2">name : {dentist.data.name}</p>
            <p className="text-gray-600">Years of Experience: {dentist.data.yearsOfExperience}</p>
            <p className="text-gray-600">Expertise: {dentist.data.areaOfExpertise}</p>
            
            <p className="text-gray-800 text-xl font-semibold mt-2">Your old Booking</p>
            <p className="text-sm text-gray-600 ml-4">
                  {new Date(booking.data.bookingDate).toLocaleString("en-EN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour12: false,
                  })}
                </p>
            <div className="mt-5">
              <h3 className="text-md text-gray-600">Pick Up Date & Time</h3>
              <DateReserve dentist={dentist} submitFunc={submit} />
            </div>
          </div>
        </div>
      </main>
    );
}
