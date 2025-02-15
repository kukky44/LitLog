"use client"

import { BookType } from "@/src/types"
import Link from "next/link";
import SecondaryButton from "./ui/buttons/secondaryButton";
import { registerBook } from "../lib/registerBook";
import { useSession } from "next-auth/react";
import PrimaryButton from "./ui/buttons/primaryButton";
import NotRegisteredModal from "./notRegisteredModal";
import { useState } from "react";

type BookProps = {
  book: BookType;
  isRegistered: boolean;
  mutate?: () => void;
}

export default function Book( { book, isRegistered, mutate }: BookProps) {
  const {data: session } = useSession();
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if(session) {
      registerBook(book);
      isRegistered = true;
      mutate&& mutate();
    }else{
      setShowModal(true);
    }
  }

  const handleDeregister = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if(session) {
      fetch("/api/deregisterBook", {
        method: "DELETE",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
          bookId: book.id,
        })
      })
      .then(res => res.json())
      .then(data => {
        if(data) isRegistered = false;
        mutate&& mutate();
        return;
      })
      .catch(e => console.log(e)
      )
    }
  }

  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <div className="grid grid-cols-3 gap-4 p-4 bg-violet-50 rounded">
      <Link
        href={`/book/${book.googleBookId}`}
        onClick={() => localStorage.setItem(book.googleBookId, JSON.stringify(book))}
      >
        {book.imageUrl && <img className="w-full" src={book.imageUrl} alt={`${book.title}のカバー`} />}
      </Link>
      <div className="col-span-2 flex flex-col justify-between">
        <div className="">
          <Link
            href={`/book/${book.googleBookId}`}
            onClick={() => localStorage.setItem(book.googleBookId, JSON.stringify(book))}
          >
            <div className="font-bold mb-2">{book.title}</div>
          </Link>
          <div className="text-sm">{book.author}</div>
        </div>
        <form>
          {isRegistered?
            <SecondaryButton clickEvent={handleDeregister} label="登録解除" />
          :
            <PrimaryButton clickEvent={handleRegister} label="本を登録" />
          }
        </form>
      </div>
      {showModal&&
        <NotRegisteredModal closeModal={closeModal} />
      }
    </div>
  )
}