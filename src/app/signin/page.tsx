"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <main>
      <p className="text-black m-5" onClick={()=>signIn("email",{email:"asdwawd"})}>ASD</p>
    </main>
  );
}
