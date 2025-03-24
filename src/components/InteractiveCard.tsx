"use client"

import React from "react";

export default function InteractiveCard({children}:{children:React.ReactNode}){
    return(
        <div className="w-[250px] h-[300px] rounded-lg shadow-lg bg-white relative hover:shadow-2xl hover:bg-neutral-200">
            {children}
        </div>
    );
}