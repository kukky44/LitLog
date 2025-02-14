"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { signOut, useSession } from "next-auth/react"
import PrimaryButton from "../ui/buttons/primaryButton";

export default function Header() {
  const [searchInput, setSearchInput] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");
  const {data: session } = useSession();

  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(searchInput){
        router.push(`/search?keyword=${searchInput}`);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  }

  useEffect(() => {
    setSearchInput(keyword);
  }, [keyword]);

  return (
    <header className="flex justify-between py-4 px-8 items-center bg-violet-50">
      <h1 className="text-2xl font-bold">
        <Link href="/">LitLog</Link>
      </h1>
      <nav>
        <ul className="flex justify-between gap-8 items-center">
          {session ?
            <>
              <li><Link href="/library">ライブラリ</Link></li>
              <li><button onClick={() => signOut({callbackUrl: "/"})}>ログアウト</button></li>
            </>
            :
            <>
              <li><Link href="/signup"><PrimaryButton label="ユーザー登録" /></Link></li>
              <li><Link href="/login">ログイン</Link></li>
            </>
          }
          <li>
            <form className="flex" onSubmit={handleSubmit}>
              <input value={searchInput ? searchInput : ""} onChange={handleChange} className="text-base text-gray-900 placeholder:text-gray-400 sm:text-sm/6 rounded px-2 py border border-gray-200" type="text" placeholder="本を検索" />
              <button className="hover:bg-violet-800 transition-all p-2 ml-2 bg-violet-900 rounded" type="submit"><IoSearch color="white" /></button>
            </form>
          </li>
        </ul>
      </nav>
    </header>
  );
}
