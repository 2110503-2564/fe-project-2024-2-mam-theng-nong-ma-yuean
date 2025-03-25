export default async function (id:string, token:string, bookingDate: string, dentist: string, user:string) {
    let date = new Date(bookingDate);
    date = new Date(date.getFullYear(),date.getMonth(),date.getDate()+1);
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            authorization:`Bearer ${token}`
        },
        body:JSON.stringify({
            user : user,
            dentist : dentist,
            bookingDate: date,
            createdAt:new Date()
    
        })
    })
    
    if(!response.ok){
        throw new Error("Failed to update booking");
    }
    
    return await response.json();
}