"use client"

import React, { useEffect, useState } from "react";
import { Link } from "@/src/i18n/routing";
import { IoSearch } from "react-icons/io5";
import { useRouter } from "@/src/i18n/routing";
import { useSearchParams } from "next/navigation";
import { signOut, useSession } from "next-auth/react"
import PrimaryButton from "../ui/buttons/primaryButton";
import { useTranslations } from "next-intl";

export default function Header() {
  const [searchInput, setSearchInput] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");
  const {data: session, status } = useSession();

  const tLinks = useTranslations("links");
  const tButtons = useTranslations("buttons");
  const tForm = useTranslations("form");

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

  const textNavLinkClassName = "hover:text-violet-800 transition-colors";

  return (
    <header className="flex justify-between py-4 px-8 items-center bg-violet-50">
      <div className="text-2xl font-bold">
        <Link href={session ? '/library' : '/'}>LitLog</Link>
      </div>
      <nav>
        <ul className="flex justify-between gap-8 items-center">
          {status === "loading" ?
            <></>
          :session ?
            <>
              <li><Link className={textNavLinkClassName} href="/library">{tLinks("library")}</Link></li>
              <li><button className={textNavLinkClassName} onClick={() => signOut({callbackUrl: "/"})}>{tButtons("logout")}</button></li>
            </>
            :
            <>
              <li><Link href="/signup"><PrimaryButton label={tButtons("signup")} /></Link></li>
              <li><Link className={textNavLinkClassName} href="/login">{tButtons("login")}</Link></li>
            </>
          }
          <li>
            <form className="flex" onSubmit={handleSubmit}>
              <input value={searchInput ? searchInput : ""} onChange={handleChange} className="text-base text-gray-900 placeholder:text-gray-400 sm:text-sm/6 rounded px-2 border border-gray-200" type="text" placeholder={tForm("searchPlaceholder")} autoComplete="on" />
              <button className="hover:bg-violet-800 transition-all p-2 ml-2 bg-violet-900 rounded" type="submit"><IoSearch color="white" /></button>
            </form>
          </li>
        </ul>
      </nav>
    </header>
  );
}
