import styles from './topmenu.module.css'
import Link from 'next/link'

export default function TopMenuItem({title, pageRef}:{title:string,pageRef:string}){
    return (
        <Link className="w-16 text-center font-[Verdana] m-8 text-xl font-medium text-white hover:underline" href={pageRef}>
        {title}
        </Link>
    );
}