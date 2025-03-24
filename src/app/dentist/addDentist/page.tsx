import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import getUserProfile from "@/libs/getUserProfile"
import Dentist from "@/db/models/Dentist"
import { dbConnect } from "@/db/dbConnect";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";


export default async function addDentist() {

    const add = async (addDentistForm: FormData) => {
        "use server"
        const name = addDentistForm.get("name")
        const image = addDentistForm.get("image")  
        const yearsOfExperience = addDentistForm.get("yearsOfExperience")
        const areaOfExpertise = addDentistForm.get("areaOfExpertise")
        const bookingPerDay = addDentistForm.get("bookingPerDay")

        try{
            await dbConnect()
            const dentist = await Dentist.create({
                "name": name,
                "image": image,
                "yearsOfExperience": yearsOfExperience,
                "areaOfExpertise": areaOfExpertise,
                "bookingPerDay": bookingPerDay
            })
        }catch(error){
            console.log(error)
        }
        revalidateTag("dentists")
        redirect("/")
    }
    const session = await getServerSession(authOptions)
    if (!session || !session.user.token) return null

    const profile = await getUserProfile(session.user.token)
    const createdAt = new Date(profile.data.createAt)

    return (
        <main className="relative min-h-screen bg-blue-50">
            {
                profile?.data.role === "admin" ? <div>
                    <div className="absolute top-14 right-6 text-right bg-white p-4 rounded-xl shadow-xl border border-blue-300">
                        <div className="text-3xl font-bold mb-2 text-blue-700">{profile.data.name}</div>
                        <div className="text-base mb-1 text-gray-700">📧 {profile.data.email}</div>
                        <div className="text-base mb-1 text-gray-700">📞 {profile.data.tel}</div>
                        <div className="text-sm text-gray-500">Register At: {createdAt.toLocaleDateString()}</div>
                    </div>
                    <div className="flex items-center justify-center h-screen">
                        <form className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg border border-blue-300 space-y-4"action={ add }>
                            <h2 className="text-3xl font-bold mb-4 text-center text-blue-700">Add New Dentist</h2>
                            <div>
                                <label className="block text-gray-700 mb-2">Name <span className="text-red-500">*</span></label>
                                <input
                                    name="name"
                                    type="text"
                                    className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="Enter dentist name"
                                    maxLength={50}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Image URL</label>
                                <input
                                    name="image"
                                    type="url"
                                    className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="Enter image URL"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Years of Experience <span className="text-red-500">*</span></label>
                                <input
                                    name="yearsOfExperience"
                                    type="number"
                                    className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="e.g., 5"
                                    required
                                    min={0}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Area of Expertise <span className="text-red-500">*</span></label>
                                <input
                                    name="areaOfExpertise"
                                    type="text"
                                    className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="e.g., Orthodontics, Scrape off tartar"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Maximum Booking Per Day <span className="text-red-500">*</span></label>
                                <input
                                    name="bookingPerDay"
                                    type="number"
                                    className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="Default: 1"
                                    defaultValue={1}
                                    min={1}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Add Dentist
                            </button>
                        </form>
                    </div>
                </div> : null
            }
        </main>
    )
}
