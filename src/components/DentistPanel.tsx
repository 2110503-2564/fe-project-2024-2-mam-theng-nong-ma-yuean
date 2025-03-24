import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getDentists from "@/libs/getDentists";
import Card from "./Card";

export default async function DentistPanel() {
    // get session data
    const dentists:GetDentists = await getDentists();
    const session = await getServerSession(authOptions);
    let profile = null;

    if(session){
        //console.log(session)
        profile = await getUserProfile(session.user.token);    
    }

    // Filter
    return(
        <div>
            <div className="m-[20px] flex flex-row flex-wrap justify-around content-around">
            {
                dentists.data.map((dentist)=>{
                    //console.log(dentist)
                    return (
                    <div key={dentist.id}>
                        <Card dentistName={dentist.name} imgSrc={dentist.image} role={(profile as UserProfile)?.data.role} id={dentist.id}/>
                    </div>
                    );
                })
            }
            </div>
        </div>

    );
}