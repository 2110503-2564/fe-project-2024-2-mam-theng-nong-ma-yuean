import DateReserve from "@/components/DateReserve";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import getUserProfile from "@/libs/getUserProfile";
import getDentist from "@/libs/getDentist";
import addBooking from "@/libs/addBooking";

export default async function Booking({params}:{params:{did:string}}) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;

  const profile = await getUserProfile(session.user.token);

  const hasBooking = profile.data.booking;
  //const bookingDate = hasBooking ? profile.data.booking.date : null; // use ISO string for default value
  const dentist = await getDentist(params.did);

  async function submit(bookingDate:string){
    "use server"
    if (!session) return new Error("Not login");
    await addBooking(bookingDate,session?.user.token,session?.user._id,params.did);
  }

  return (
    <main className="w-[100%] flex flex-col justify-center my-16 items-center">
      <div className="text-2xl text-black my-8">{profile.data.name}</div>
      <div className="w-[300px] flex flex-col items-center space-y-5">
        <div className="text-md text-gray-600 self-start">Pick Up Date & Time</div>
        <DateReserve dentist={dentist} submitFunc={submit}/>
      </div>
    </main>
  );
}
