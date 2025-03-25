// BookingListServer.tsx (Server Component)
'use server'

import getBookings from "@/libs/getBookings";
import getDentist from "@/libs/getDentist";

export default async function BookingListServer({ token }: { token: string }) {
  const bookingDetail = await getBookings(token);
  const dentistDetails = await Promise.all(
    bookingDetail.data.map((booking: any) => getDentist(booking.dentist.id))
  );

  return { bookings: bookingDetail.data, dentists: dentistDetails };
}
