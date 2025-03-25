import Image from "next/image";
import getDentist from "@/libs/getDentist";

export default async function DentistDetailPage({ params }: { params: { did: string } }) {
    const dentistDetail = await getDentist(params.did);
    if (!dentistDetail) {
        return <p className="text-center text-red-500">Dentist not found</p>;
    }
    return (
        <main className="flex justify-center items-center text-black">
            <div className="w-[1000px] h-[500px] flex justify-center bg-white p-6 shadow-md rounded-lg mt-24 items-center">
                <div className="w-[300px] h-[400px] bg-gray-200 rounded-md flex items-center justify-center">
                    <Image
                    src={dentistDetail.data.image}
                    alt="Profile"
                    width={128}
                    height={128}
                    className="rounded-md"
                    />
                </div>
                <div className="flex-1 ml-8">
                    <h1 className="text-2xl font-bold text-gray-900">{dentistDetail.data.name}</h1>
                    <span className={`
                        inline-block text-sm font-medium px-2 py-1 rounded-md mt-2
                        ${dentistDetail.data.bookingPerDay < 2 ? "bg-red-100 text-red-700" :
                        dentistDetail.data.bookingPerDay <= 4 ? "bg-yellow-100 text-yellow-700" :
                        "bg-green-100 text-green-700"}
                    `}> Remain : {dentistDetail.data.bookingPerDay}
                    </span>
                    <p className="mt-4 text-gray-700">
                    <span className="font-medium">Area of expertise:</span> {dentistDetail.data.areaOfExpertise}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-medium">Years of experience:</span> {dentistDetail.data.yearsOfExperience}
                    </p>

                    <h3 className="mt-4 font-semibold text-gray-900">Description</h3>
                    <p className="text-gray-600">
                    Answer the frequently asked question in a simple sentence, a longish
                    paragraph, or even in a list.
                    </p>
                    <div className="flex justify-end mt-12">
                        <button className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition">
                            Booking
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
