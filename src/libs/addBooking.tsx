// ยังไม่ได้แก้!
export default async function addBooking(bookingDate:string)
{
    console.log(bookingDate);
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/dentists/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            authorization:`Bearer ${token}`
        },
        body:JSON.stringify({
            "name": name,
            "image": image,
            "yearsOfExperience": yearsOfExperience,
            "areaOfExpertise": areaOfExpertise,
            "bookingPerDay": bookingPerDay
        })
    })

    if(!response.ok){
        throw new Error("Failed to update dentist");
    }
    
    return await response.json();
    
}