import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile";
import getDentist from "@/libs/getDentist";
import updateDentist from "@/libs/updateDentist";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import DeleteButton from "@/components/DeleteButton"; 

export default async function editDentist({ params }: { params: { id: string } }) {
    const { id } = params;
    const dentist = await getDentist(id);

    if (!dentist) {
        return <div className="text-center text-red-500 mt-10">Dentist not found</div>;
    }

    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;

    const profile = await getUserProfile(session.user.token);
    const createdAt = new Date(profile.data.createAt);

    const Update = async (formData: FormData) => {
        "use server";
        const name = formData.get("name") as string;
        const image = formData.get("image") as string;
        const yearsOfExperience = Number(formData.get("yearsOfExperience")) || 0;
        const areaOfExpertise = formData.get("areaOfExpertise") as string;
        const bookingPerDay = Number(formData.get("bookingPerDay")) || 0;

        await updateDentist(name, image, yearsOfExperience, areaOfExpertise, bookingPerDay, id, session.user.token);

        console.log("update");

        revalidateTag("dentists");
        redirect("/");
    };

    return (
        <main className="relative min-h-screen bg-blue-50 flex items-center justify-center">
            {profile?.data.role === "admin" && (
                <>
                    <div className="absolute top-14 right-6 text-right bg-white p-4 rounded-xl shadow-xl border border-blue-300">
                        <div className="text-3xl font-bold mb-2 text-blue-700">{profile.data.name}</div>
                        <div className="text-base mb-1 text-gray-700">📧 {profile.data.email}</div>
                        <div className="text-base mb-1 text-gray-700">📞 {profile.data.tel}</div>
                        <div className="text-sm text-gray-500">Register At: {createdAt.toLocaleDateString()}</div>
                    </div>
                    <form action={Update} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg border border-blue-300 space-y-4">
                        <h2 className="text-3xl font-bold mb-4 text-center text-blue-700">Edit Dentist</h2>
                        <div>
                            <label className="block text-gray-700 mb-2">Name</label>
                            <input
                                name="name"
                                defaultValue={dentist.data.name}
                                className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Image URL</label>
                            <input
                                name="image"
                                defaultValue={dentist.data.image}
                                className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Years of Experience</label>
                            <input
                                name="yearsOfExperience"
                                type="number"
                                defaultValue={dentist.data.yearsOfExperience}
                                className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Area of Expertise</label>
                            <input
                                name="areaOfExpertise"
                                defaultValue={dentist.data.areaOfExpertise}
                                className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Maximum Booking Per Day</label>
                            <input
                                name="bookingPerDay"
                                type="number"
                                defaultValue={dentist.data.bookingPerDay}
                                className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>
                        <div className="flex flex-row items-center">
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors mr-3"
                            >
                                Update
                            </button>
                            <DeleteButton id={id} token={session.user.token} />
                        </div>
                    </form>
                </>
            )}
        </main>
    );
}
