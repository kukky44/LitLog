"use client"

import { BookType } from "@/src/types"
import Link from "next/link";
import SecondaryButton from "./ui/buttons/secondaryButton";
import { registerBook } from "../lib/registerBook";
import { useSession } from "next-auth/react";
import PrimaryButton from "./ui/buttons/primaryButton";
import NotRegisteredModal from "./notRegisteredModal";
import { useState } from "react";
import ReadingStatusLabel from "./ui/readingStatusLabel";
import LoadingAnimation from "./ui/buttons/loadingAnimation";

type BookProps = {
  book: BookType;
  isRegistered: boolean;
  mutate?: () => void;
}

export default function Book( { book, isRegistered, mutate }: BookProps) {
  const {data: session } = useSession();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRegisteredState, setIsRegisteredState] = useState(isRegistered);

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(isProcessing) return console.log("process going on");
    setIsProcessing(true);

    try {
      if(session) {
        await registerBook(book);
        setIsRegisteredState(true);
        mutate&& mutate();
      }else{
        setShowModal(true);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsProcessing(false);
    }
  }

  const handleDeregister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(isProcessing) return console.log("process going on");
    setIsProcessing(true);

    try {
      if(session) {
        await fetch("/api/deregisterBook", {
          method: "DELETE",
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify({
            bookId: book.id,
          })
        })
        .then(res => res.json())
        .then(data => {
          setIsRegisteredState(false);
          mutate&& mutate();
        })
        .catch(e => console.log(e)
        )
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsProcessing(false);
    }
  }

  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <div className="grid grid-cols-3 gap-4 p-5 bg-violet-50 rounded">
      <Link
        href={`/book/${book.googleBookId}`}
        onClick={() => localStorage.setItem(book.googleBookId, JSON.stringify(book))}
        >
        {book.imageUrl && <img className="w-full" src={book.imageUrl} alt={`${book.title}のカバー`} />}
      </Link>
      <div className="col-span-2 flex flex-col justify-between">
        <div className="">
          {book.readingStatus !== null && book.readingStatus !== undefined && <ReadingStatusLabel status={book.readingStatus} />}
          <Link
            href={`/book/${book.googleBookId}`}
            onClick={() => localStorage.setItem(book.googleBookId, JSON.stringify(book))}
            >
            <div className="font-bold mt-2 mb-1">{book.title}</div>
          </Link>
          <div className="text-sm mb-2">{book.author}</div>
        </div>
        <form>
          {isRegisteredState?
            <SecondaryButton clickEvent={handleDeregister} label={isProcessing ? "..." : "登録解除"} disabled={isProcessing}/>
          :
            <PrimaryButton clickEvent={handleRegister} label={isProcessing ? "..." : "本を登録"} disabled={isProcessing} />
          }
        </form>
      </div>
      {showModal&&
        <NotRegisteredModal closeModal={closeModal} />
      }
    </div>
  )
}