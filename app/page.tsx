import Image from "next/image";
import styles from "./page.module.css";

import useSwr from 'swr'
import Link from 'next/link'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home() {
  const { data, error } = useSwr('/api/users', fetcher)

  if (error) return <div>Failed to load users</div>
  if (!data) return <div>Loading...</div>

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>
          <Link href="/user/[id]" as={`/user/${user.id}`}>
            <a>{`User ${user.id}`}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
