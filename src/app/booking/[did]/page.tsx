import DateReserve from "@/components/DateReserve";
import TextField from "@mui/material/TextField";
import { Select, MenuItem } from "@mui/material";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import getUserProfile from "@/libs/getUserProfile";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";

export default async function Booking() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;

  const profile = await getUserProfile(session.user.token);

  const hasBooking = profile.data.booking;
  const bookingDate = hasBooking ? profile.data.booking.date : null; // use ISO string for default value

  return (
    <main className="w-[100%] flex flex-col justify-center my-16 items-center">
      <div className="text-2xl text-black my-8">{profile.data.name}</div>
      <div className="w-[300px] flex flex-col items-center space-y-5">
        <div className="text-md text-gray-600 self-start">Pick Up Date & Time</div>
        <DateReserve />
        <button name="Book Venue" className="rounded-md bg-indigo-600 px-3 py-2 shadow-sm text-white">
          Booking
        </button>
      </div>
    </main>
  );
}
