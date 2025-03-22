import styles from './topmenu.module.css'
import Link from 'next/link'

export default function TopMenuItem({title, pageRef}:{title:string,pageRef:string}){
    return (
        <Link className="w-[120px] text-center mt-auto mb-auto font-[Verdana] text-[10pt] text-gray-500" href={pageRef}>
        {title}
        </Link>
    );
}