"use client"

import { useParams } from "next/navigation"
import LibraryBookCard from "../../components/libraryBookCard";
import { useState } from "react";
import { BookType } from "@/src/types";
import MemoList from "../../components/memoList";
import UnRegisteredBookCard from "../../components/unRegisteredBookCard";
import { useSession } from "next-auth/react";
import ReadingStatusRadio from "../../components/ui/readingStatusRadio";
import useSWR from "swr";
import { fetcher } from "../../lib/fetcher";

export default function Page(){
  const [book, setBook] = useState<BookType | null>(null);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const {data: session, status} = useSession();

  const params = useParams();
  const googleBookId: string = params.id ? String(params.id) : "";
  if(!googleBookId) console.log("No book id");

  const { data: registeredBook, error, isLoading, mutate} = useSWR<BookType>(`/api/getBookByGoogleId/${googleBookId}`, fetcher, {
    onSuccess: (data) => {
      if(data) {
        setBook(data);
        setIsRegistered(true);
      } else {
        getBookFromLocalStorage();
        setIsRegistered(false);
      }
    },
    onError: (e) => {
      console.log(e);
    }
  });

  const getBookFromLocalStorage = () => {
    const bookData = localStorage.getItem(String(googleBookId));
    if(bookData) setBook(JSON.parse(bookData));
    setIsRegistered(false);
  }

  return (
    <div>
      {isRegistered ? book?.id &&
      <div>
        <div className="grid grid-cols-5 gap-4 w-full">
          <div className="col-span-2 top-6 sticky">
            <LibraryBookCard bookData={book} isRegistered={isRegistered} mutate={mutate} />
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
        :
      <div>
        {book &&
          <UnRegisteredBookCard bookData={book} mutate={mutate} />
        }
      </div>
      }
    </div>
  )
}