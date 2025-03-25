"use server"

import alertClient from "./alert";

export default async function checkBooking(id:string,bookingDate:string){
    let date = new Date(bookingDate);
    date = new Date(date.getFullYear(),date.getMonth(),date.getDate(),7,0,0,0);
    console.log(`${process.env.BACKEND_URL}/api/v1/dentists/${id}/${date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()}`)
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/dentists/${id}/${date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()}`);
    if (!response.ok){
        alertClient("test")
        throw new Error("Failed to check booking");
    }
    return await response.json();
}