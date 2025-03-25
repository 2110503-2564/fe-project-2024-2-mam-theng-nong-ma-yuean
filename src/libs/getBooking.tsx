export default async function getBooking(id: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings/${id}`, { next: { tags: ['bookings'] } });
    if (!response.ok) {
        throw new Error("Failed to fetch booking");
    }
    return await response.json();
}