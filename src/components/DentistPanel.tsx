import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getDentists from "@/libs/getDentists";
import FilterInput from "./FilterInput";

export default async function DentistPanel() {
    // get session data
    const dentists:GetDentists = await getDentists();
    const session = await getServerSession(authOptions);
    let profile;

    if(session){
        profile = await getUserProfile(session.user.token);    
    }
    
    // Filter
    return(
        <div className="h-[50%] mt-[75px] mx-10">
            <FilterInput dentists={dentists} profile={profile? profile:null}/>
        </div>

    );
}