export default async function updateDentist(name:string, image:string, yearsOfExperience:number, areaOfExpertise:string, bookingPerDay:number) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/dentists/${name}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            "name":name,
            "image":image,
            "yearsOfExperience":yearsOfExperience,
            "areaOfExpertise":areaOfExpertise,
            "bookingPerDay":bookingPerDay
        })
    })

    if(!response.ok){
        throw new Error("Failed to update dentist");
    }
    
    return await response.json();
    
}