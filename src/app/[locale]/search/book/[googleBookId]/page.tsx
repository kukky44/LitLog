"use client"

import { useParams, useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react";
import { BookType } from "@/src/types";
import UnRegisteredBookCard from "../../../../components/unRegisteredBookCard";
import { useSession } from "next-auth/react";
import { IoChevronForward } from "react-icons/io5";
import { useTranslations } from "next-intl";

export default function Page(){
  const [book, setBook] = useState<BookType | null>(null);
  const {data: session} = useSession();
  const router = useRouter();

  const tLinks = useTranslations("links");

  const params = useParams();
  const googleBookId: string = params.googleBookId ? String(params.googleBookId) : "";
  if(!googleBookId) console.log("No book id");

  const getBookFromLocalStorage = useCallback(() => {
    const bookData = localStorage.getItem(String(googleBookId));
    if(bookData) setBook(JSON.parse(bookData));
  },[googleBookId]);

  useEffect(() => {
    getBookFromLocalStorage();
  }, [session, getBookFromLocalStorage]);


  return (
    <div>
      {book &&
      <>
        <div className="flex items-center gap-1 mb-4 text-sm">
          <button className="hover:text-violet-800 transition" onClick={() => router.back()}>
            {tLinks("search")}
          </button>
          <div><IoChevronForward size={16}/></div>
          <div>{book.title}</div>
        </div>
        <div>
        <UnRegisteredBookCard bookData={book}  />
        </div>
      </>
      }
    </div>
  )
}