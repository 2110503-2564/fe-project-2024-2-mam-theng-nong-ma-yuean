"use server"

export default async function addBooking(bookingDate:string, token:string, id:string, did:string)
{
    let date = new Date(bookingDate);
    date = new Date(date.getFullYear(),date.getMonth(),date.getDate()+1);
    
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/dentists/${did}/bookings`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            authorization:`Bearer ${token}`
        },
        body:JSON.stringify({
            user:id,
            dentist:did,
            bookingDate: date,
            createdAt:new Date()
        })
    })
    
    return await response.json();
    
}