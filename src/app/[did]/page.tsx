import Image from "next/image";
import getDentist from "@/libs/getDentist";

export default async function DentistDetailPage({params} : {params : {did : string}}){

    const dentistDatail = await getDentist(params.did);

    return(
        <main className="text-center p-5 text-black">
            <h1 className="text-lg font-medium">{dentistDatail.data.name}</h1>
            <div className="flex flex-row my-5">
                <Image src={dentistDatail.data.picture}
                    alt="Product Picture"
                    width={0} height={0} sizes="100vw"
                    className="rounded-lg w-[30%] bg-black"
                />
                <div className="flex flex-col items-start mx-5">
                    
                </div>
            </div>      
        </main>
    );
}
