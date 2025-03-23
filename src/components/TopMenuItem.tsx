import styles from './topmenu.module.css'
import Link from 'next/link'

export default function TopMenuItem({title, pageRef}:{title:string,pageRef:string}){
    return (
        <Link className="w-[110px] text-center mt-auto mb-auto font-[Verdana] text-[12pt] font-medium text-white" href={pageRef}>
        {title}
        </Link>
    );
}