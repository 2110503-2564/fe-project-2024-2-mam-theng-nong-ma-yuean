export default async function deleteDentist(id: string, token:string) {
    console.log(`${process.env.BACKEND_URL}/api/v1/dentists/${id}`)
    const response = await fetch(`localhost:5000/api/v1/dentists/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            authorization:`Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new Error("Failed to delete dentist");
    }
    console.log("delete")
    return await response.json();
}