"use client"

import { BookType } from "@/src/types"
import Link from "next/link";
import { useState } from "react";
import ReadingStatusLabel from "./ui/readingStatusLabel";
import RegsiterBookButton from "./ui/buttons/registerBookButton";
import DeregsiterBookButton from "./ui/buttons/deregisterBookButton";

type BookProps = {
  book: BookType;
  isRegistered: boolean;
  mutate?: () => void;
}

export default function Book( { book, isRegistered, mutate }: BookProps) {
  const [isRegisteredState, setIsRegisteredState] = useState(isRegistered);

  const updateRegisteredState = (val: boolean) => {
    setIsRegisteredState(val);
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
            <DeregsiterBookButton bookId={book.id} mutate={mutate} updateRegisteredState={updateRegisteredState} />
          :
            <RegsiterBookButton book={book} mutate={mutate} updateRegisteredState={updateRegisteredState} />
          }
        </form>
      </div>
    </div>
  )
}