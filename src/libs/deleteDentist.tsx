"use server"
export default async function deleteDentist(id: string, token:string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/dentists/${id}`, {
        method: "DELETE",
        headers: {
            authorization:`Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new Error("Failed to delete dentist");
    }
    console.log("delete")
    return await response.json();
}