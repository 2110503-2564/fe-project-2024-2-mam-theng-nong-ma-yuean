"use client"
import Image from "next/image";
import Card from "./Card";
import { useReducer, useRef, useState } from "react";
import Link from "next/link";

export default function FilterInput({dentists, profile}:{dentists:GetDentists, profile:UserProfile|null}){

    function filterReducer(filter:GetDentists, filterText:string){
        let newFilter:GetDentists = {
            success:dentists.success,
            count:dentists.count,
            pagination:dentists.pagination,
            data:dentists.data.filter((dentist)=>
            dentist.name.toLowerCase().match(new RegExp(`${filterText.toLowerCase()}.`)))
        }
        return newFilter;
    }

    const [filter,filterDispatch] = useReducer(filterReducer,dentists);
    const filterText = useRef("");

    return(
        <div className="relative">
            <div className="relative inline mx-5">
                <input type="text" className="ml-16 p-2 pr-36 rounded" placeholder="Search for dentist's name"
                onChange={(e)=>{filterText.current = e.target.value}}/>
                <button className="aspect-square h-full absolute right-1 top-0" 
                onClick={()=>{filterDispatch(filterText.current)}}>
                    <Image src={"/img/search.png"} alt="search" fill={true}/>
                </button>
            </div>
            <div className="p-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-center">
            {
                filter.data.map((dentist)=>{
                    return (
                    <div key={dentist.id} className="flex justify-center my-8">
                        <Card dentistName={dentist.name} imgSrc={dentist.image} role={profile? profile.data.role:null} id={dentist.id}/>
                    </div>
                    );
                })
            }
            </div>
            {
                profile?.data.role == "admin"?
                <Link href={"/dentist/addDentist"}>
                    <button className="bg-green-200 hover:bg-green-300 rounded-lg p-1 px-5 absolute top-0 right-1">Add</button>
                </Link>:null
            }

            
        </div>

    );
}