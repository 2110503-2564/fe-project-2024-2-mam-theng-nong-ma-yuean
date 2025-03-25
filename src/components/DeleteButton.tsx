"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import deleteDentist from "@/libs/deleteDentist";

export default function DeleteButton({ id, token }: { id: string; token: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleDelete = () => {
        if (!confirm("Are you sure you want to delete this dentist?")) return;
    
    console.log("Delete Dentist", id);

        setLoading(true);
        deleteDentist(id, token)
            .then(() => {
                console.log("Dentist deleted successfully");
                router.refresh();
                router.push("/");
            })
            .catch((error) => {
                console.error("Delete Error:", error);
                alert("Failed to delete dentist. Please try again.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition-colors"
        >
            {loading ? "Deleting..." : "Delete"}
        </button>
    );
}
