"use client"

import React, { MouseEventHandler, useEffect, useState } from "react";
import { Link, usePathname } from "@/src/i18n/routing";
import { IoSearch } from "react-icons/io5";
import { useRouter } from "@/src/i18n/routing";
import { useSearchParams } from "next/navigation";
import { signOut, useSession } from "next-auth/react"
import PrimaryButton from "../ui/buttons/primaryButton";
import { useTranslations } from "next-intl";
import LangSwitcher from "../ui/langSwitcher";
import { IoMenu } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";

export default function Header() {
  const [searchInput, setSearchInput] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");
  const {data: session, status } = useSession();

  const tLinks = useTranslations("links");
  const tButtons = useTranslations("buttons");
  const tForm = useTranslations("form");

  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(searchInput){
        router.push(`/search?keyword=${searchInput}`);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  }

  const toggleMobileMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  const stopPropagation: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  }

  const handleClickOutSideMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMobileMenuOpen(false);
  }

  useEffect(() => {
    setSearchInput(keyword);
  }, [keyword]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const textNavLinkClassName = "hover:text-violet-800 transition-colors";

  return (
    <header className="flex justify-between sm:py-4 sm:px-8 px-6 py-2 items-center bg-violet-50">
      <div className="text-2xl font-bold">
        <Link href={session ? '/library' : '/'}>LitLog</Link>
      </div>
      <button onClick={toggleMobileMenu} className="md:hidden p-1 hover:opacity-70 transition-opacity">
        <IoMenu size={32} />
      </button>
      <nav className="hidden md:block">
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
              <input id="search-desktop" value={searchInput ? searchInput : ""} onChange={handleChange} className="text-base text-gray-900 placeholder:text-gray-400 sm:text-sm/6 rounded px-2 border border-gray-200" type="text" placeholder={tForm("searchPlaceholder")} autoComplete="on" />
              <button className="hover:bg-violet-800 transition-all p-2 ml-2 bg-violet-900 rounded" type="submit"><IoSearch color="white" /></button>
            </form>
          </li>
          <li>
            <LangSwitcher idPrefix="desktop" />
          </li>
        </ul>
      </nav>

      <div className={`md:hidden fixed w-screen h-screen top-0 right-0 z-10 duration-300 transition-transform ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`} onClick={handleClickOutSideMenu}>
        <div onClick={stopPropagation}>
          <nav className={`py-2 px-2 fixed min-h-dvh top-0 right-0 bg-slate-50 z-20`}>
            <div className="flex justify-end">
              <button className="p-4 transition opacity-100 hover:opacity-70" onClick={toggleMobileMenu}>
                <IoIosClose size={36} />
              </button>
            </div>
            <ul className="px-6 flex flex-col justify-between gap-6">
              <li>
                <form className="flex" onSubmit={handleSubmit}>
                  <input id="search-mobile" value={searchInput ? searchInput : ""} onChange={handleChange} className="text-base text-gray-900 placeholder:text-gray-400 sm:text-sm/6 rounded px-2 border border-gray-200" type="text" placeholder={tForm("searchPlaceholder")} autoComplete="on" />
                  <button className="hover:bg-violet-800 transition-all p-2 ml-2 bg-violet-900 rounded" type="submit"><IoSearch color="white" /></button>
                </form>
              </li>
              {status === "loading" ?
                <></>
              :session ?
                <>
                  <li><Link className={textNavLinkClassName} href="/library">{tLinks("library")}</Link></li>
                  <li><button className={textNavLinkClassName} onClick={() => signOut({callbackUrl: "/"})}>{tButtons("logout")}</button></li>
                </>
                :
                <>
                  <li><Link href="/signup">{tButtons("signup")}</Link></li>
                  <li><Link className={textNavLinkClassName} href="/login">{tButtons("login")}</Link></li>
                </>
              }
              <li>
                <LangSwitcher idPrefix="mobile" />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
