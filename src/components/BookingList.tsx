// BookingList.tsx
'use client'

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import BookingItem from "@/components/BookingItem";
import BookingListServer from "@/components/BookingListServer";

export default function BookingList() {
  const { data: session, status } = useSession();
  const [bookings, setBookings] = useState<any[]>([]);
  const [dentists, setDentists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (status === 'loading') return;
      if (!session || !session.user || !session.user.token) {
        setLoading(false);
        return;
      }

      try {
        const data = await BookingListServer({ token: session.user.token });
        setBookings(data.bookings);
        setDentists(data.dentists);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session, status]);

  // Handle Delete by removing booking from state
  const handleDelete = (id: string) => {
    setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== id));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex flex-col items-center text-black mt-12">
      <div className="text-xl font-bold">Your Bookings ({bookings.length})</div>
      {bookings.length === 0 && <div className="text-center text-gray-500 mt-12">You have no bookings.</div>}

      <div className="flex flex-col flex-wrap justify-center mt-4">
        {bookings.map((booking: any, index: number) => (
          <BookingItem 
            key={booking._id} 
            dentistName={booking.dentist.name} 
            imgSrc={dentists[index]?.data?.image || ""} 
            bookingDate={booking.bookingDate}
            id={booking._id} 
            token={session?.user?.token || ""}
            user={booking.user} 
            role={booking.role}
            onDelete={handleDelete} // Pass onDelete function to BookingItem
          />
        ))}
      </div>
    </main>
  );
}
