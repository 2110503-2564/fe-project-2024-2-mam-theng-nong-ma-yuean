import DateReserve from "@/components/DateReserve";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import getUserProfile from "@/libs/getUserProfile";
import getDentist from "@/libs/getDentist";
import addBooking from "@/libs/addBooking";
import Image from "next/image";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import checkBooking from "@/libs/checkBooking";

export default async function Booking({ params }: { params: { did: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;

  const profile = await getUserProfile(session.user.token);
  const dentist = await getDentist(params.did);

  async function submit(bookingDate: string) {
    "use server";
    if (!session) throw new Error("Not logged in");

    const check: CheckBooking = await checkBooking(params.did, bookingDate);
    console.log(check);

    if (check.currentBooking >= check.maxBooking) {
      return;
    }
    await addBooking(bookingDate,session?.user.token,session?.user._id,params.did);
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
          <h2 className="text-2xl font-bold text-gray-800">Dentist Information</h2>
          <p className="text-xl font-semibold mt-2">{dentist.data.name}</p>
          <p className="text-gray-600">Years of Experience: {dentist.data.yearsOfExperience}</p>
          <p className="text-gray-600">Expertise: {dentist.data.areaOfExpertise}</p>
          
          {/* Date Selection */}
          <div className="mt-5">
            <h3 className="text-md text-gray-600">Pick Up Date & Time</h3>
            <DateReserve dentist={dentist} submitFunc={submit}/>
          </div>
        </div>
      </div>
    </main>
  );
}
