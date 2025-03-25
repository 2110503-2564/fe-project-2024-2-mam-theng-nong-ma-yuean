import Banner from "@/components/Banner";
import DentistPanel from "@/components/DentistPanel";
import { revalidateTag } from "next/cache";

export default function Home() {
  revalidateTag("dentists");
  return (
    <main className="">
      <Banner/>
      
      <DentistPanel/>

    </main>
  );
}
