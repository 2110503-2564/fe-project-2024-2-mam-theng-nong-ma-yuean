"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import getDentist from "@/libs/getDentist";

export default function DentistDetailPage({ params }: { params: { did: string } }) {
    const [dentistDetail, setDentistDetail] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    
    useEffect(() => {
        const fetchDentistDetail = async () => {
            try {
                console.log("Fetching dentist with ID:", params.did); // ดูค่า params.did
                const detail = await getDentist(params.did);
                console.log("Dentist Detail:", detail); // ดูข้อมูลที่ได้จาก API
                setDentistDetail(detail);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch dentist details:", error);
                setLoading(false);
            }
        };
    
        fetchDentistDetail();
    }, [params.did]);
    

    if (loading) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    if (!dentistDetail || !dentistDetail.data) {
        return <p className="text-center text-red-500">Dentist not found</p>;
    }

    return (
        <main className="flex justify-center items-center text-black">
            <div className="w-[1000px] h-[500px] flex justify-center bg-white p-6 shadow-md rounded-lg mt-24 items-center">
                <div className="w-[315px] h-[400px] bg-gray-200 rounded-md flex items-center justify-center">
                    <Image
                        src={dentistDetail.data.image}
                        alt="Profile"
                        width={300}
                        height={400}
                        className="rounded-md"
                    />
                </div>
                <div className="flex-1 ml-8">
                    <h1 className="text-2xl font-bold text-gray-900">{dentistDetail.data.name}</h1>
                    <p className="mt-4 text-gray-700">
                        <span className="font-medium">Area of expertise:</span>{" "}
                        {dentistDetail.data.areaOfExpertise}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-medium">Years of experience:</span>{" "}
                        {dentistDetail.data.yearsOfExperience}
                    </p>
                    <div className="flex justify-end mt-12">
                        <button
                            onClick={() => router.push(`/booking/${params.did}`)}
                            className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition"
                        >
                            Booking
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
