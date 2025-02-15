"use client"

import { useParams } from "next/navigation"
import LibraryBookCard from "../../components/libraryBookCard";
import { useEffect, useState } from "react";
import { BookType } from "@/src/types";
import MemoList from "../../components/memoList";
import UnRegisteredBookCard from "../../components/unRegisteredBookCard";
import { useSession } from "next-auth/react";

export default function Page(){
  const [book, setBook] = useState<BookType | null>(null);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const {data: session} = useSession();

  const params = useParams();
  const googleBookId: string = params.id ? String(params.id) : "";
  if(!googleBookId) console.log("No book id");

  const getBookFromLocalStorage = () => {
    const bookData = localStorage.getItem(String(googleBookId));
    if(bookData) setBook(JSON.parse(bookData));
    setIsRegistered(false);
  }

  const setRegisterStatus = (value: boolean) => {
    setIsRegistered(value);
  }

  useEffect(() => {
    if(session){
      fetch(`/api/getBookByGoogleId/${googleBookId}`)
      .then((res) => res.json())
      .then((data) => {
        if(data){
          setBook(data);
          setIsRegistered(true);
        }else{
          getBookFromLocalStorage();
        }
      }).catch(err=>{
        console.log(err);
      });
    } else {
      getBookFromLocalStorage();
    }
  }, [googleBookId, isRegistered])

  return (
    <div>
      {isRegistered ? book?.id &&
      <div>
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-2 top-6 sticky max-h-[calc(100vh-4rem)]">
            <LibraryBookCard bookData={book} isRegistered={isRegistered} setRegisterStatus={setRegisterStatus} />
          </div>
          <div className="col-span-3 rounded bg-white text-black">
            <MemoList bookId={book.id} />
          </div>
        </div>
      </div>
        :
      <div>
        {book &&
          <UnRegisteredBookCard bookData={book} setRegisterStatus={setRegisterStatus} />
        }
      </div>
      }
    </div>
  )
}