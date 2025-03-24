"use client"
import Image from "next/image";

export default function FilterInput({searchFunc}:{searchFunc:Function}){
    return(
        <div className="relative">
            <input type="text"/>
            <button className="aspect-square h-full">

                <Image src={"/img/search.png"} alt="search" fill={true}/>
            </button>
        </div>
    );
}