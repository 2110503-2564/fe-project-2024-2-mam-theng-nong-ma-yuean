import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getDentists from "@/libs/getDentists";
import Card from "./Card";

export default async function DentistPanel() {
    const dentists:GetDentists = await getDentists();
    //console.log(dentists);
    const session = await getServerSession(authOptions);
    let profile = null;
    if(session){
        profile = await getUserProfile(session.user.token);    
        //console.log(profile);
    }


    return(
        <div className="m-[20px] flex flex-row flex-wrap justify-around content-around">
            {
                dentists.data.map((dentist)=>{
                    return (
                    <div key={dentist.id}>
                        <Card dentistName={dentist.name} imgSrc="" role={(profile as UserProfile)?.data.role}/>
                    </div>
                    );
                })
            }
        </div>
    );
}