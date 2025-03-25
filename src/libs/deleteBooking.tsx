 export default async function deleteBooking(id: string, token:string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            authorization:`Bearer ${token}`
        }
    })
 }