"use client"

import { useParams } from "next/navigation"
import LibraryBookCard from "../../../../components/libraryBookCard";
import { useState } from "react";
import { BookType, FetchErrorType } from "@/src/types";
import MemoList from "../../../../components/memoList";
import ReadingStatusRadio from "../../../../components/ui/readingStatusRadio";
import useSWR from "swr";
import { fetcher } from "../../../../lib/fetcher";
import { useSession } from "next-auth/react";
import { Link } from "@/src/i18n/routing";
import { IoChevronForward } from "react-icons/io5";
import LoadingAnimation from "../../../../components/ui/buttons/loadingAnimation";
import { useTranslations } from "next-intl";

export default function Page(){
  const [book, setBook] = useState<BookType | null>(null);

  const tLinks = useTranslations("links");

  const {status} = useSession();
  if(status === "unauthenticated"){
    console.log("no logged in user");
  }

  const params = useParams();
  const bookId: string = params.id ? String(params.id) : "";
  if(!bookId) console.log("No book id");

  const { mutate, isLoading } = useSWR<BookType>(
    `/api/getBookByID/${bookId}`,
    fetcher,
    {
      onSuccess: (data) => {
        if(data) {
          setBook(data);
        } else {
          console.log("no book found");
        }
      },
      onError: (e:FetchErrorType) => {
        if(e.status === 404) {
          console.log(e);
        } else {
          console.log(e);
        }
      }
    }
  );

  return (
    <div>
      {isLoading ? <div className="mt-8 text-center"><LoadingAnimation /></div>:
      book &&
      <div className="flex items-center gap-1 mb-4 text-sm">
        <Link className="hover:text-violet-800 transition" href="/library">
          {tLinks("library")}
        </Link>
        <div><IoChevronForward size={16}/></div>
        <div>{book.title}</div>
      </div>}
      {book?.id &&
      <div>
        <div className="grid grid-cols-5 gap-4 w-full">
          <div className="col-span-2 top-6 sticky">
            <LibraryBookCard bookData={book} isRegistered={true} mutate={mutate} />
          </div>
          <div className="col-span-3 rounded bg-white text-black">
            {book.readingStatus !== undefined &&
              <div className="p-4">
                <ReadingStatusRadio bookId={book.id} status={book.readingStatus} />
              </div>
            }
            <MemoList bookId={book.id} />
          </div>
        </div>
      </div>
      }
    </div>
  )
}