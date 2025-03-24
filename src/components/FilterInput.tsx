"use client"
import Image from "next/image";
import Card from "./Card";
import { useReducer, useRef, useState } from "react";
import Link from "next/link";

export default function FilterInput({dentists, profile}:{dentists:GetDentists, profile:UserProfile}){

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
                <input type="text" className="p-1 pr-7 rounded" placeholder="Search for dentist's name"
                onChange={(e)=>{filterText.current = e.target.value}}/>
                <button className="aspect-square h-full absolute right-1 top-0" 
                onClick={()=>{filterDispatch(filterText.current)}}>
                    <Image src={"/img/search.png"} alt="search" fill={true}/>
                </button>
            </div>
            <div className="m-[20px] flex flex-row flex-wrap space-x-10 content-around mt-[50px]">
            {
                filter.data.map((dentist)=>{
                    return (
                    <div key={dentist.id}>
                        <Card dentistName={dentist.name} imgSrc={dentist.image} role={profile.data.role} id={dentist.id}/>
                    </div>
                    );
                })
            }
            </div>
            <Link href={"/adddentist"}>
            <button className="bg-green-200 hover:bg-green-300 rounded-lg p-1 px-5 absolute top-0 right-1">Add</button>
            </Link>
            
        </div>

    );
}