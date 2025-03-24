import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import getUserProfile from "@/libs/getUserProfile"


export default async function () {
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
                </div> : null
            }
         </main>
    )
}