export default async function getDentists(){
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/dentists`,{cache:'no-store'});
    if (!response.ok){
        throw new Error("Failed to fetch dentists");
    }
    return await response.json();
}