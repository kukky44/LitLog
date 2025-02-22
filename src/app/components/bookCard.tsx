"use client"

import { BookType } from "@/src/types"
import Link from "next/link";
import { useState } from "react";
import ReadingStatusLabel from "./ui/readingStatusLabel";
import RegsiterBookButton from "./ui/buttons/registerBookButton";
import DeregsiterBookButton from "./ui/buttons/deregisterBookButton";
import Image from "next/image";
import BookIcon from "../../assets/images/bookIcon.svg"

type BookProps = {
  book: BookType;
  isRegistered: boolean;
  mutate?: () => void;
  isLibrary?: boolean;
}

export default function Book( { book, isRegistered, mutate, isLibrary }: BookProps) {
  const [isRegisteredState, setIsRegisteredState] = useState(isRegistered);

  let bookHref: string = "";

  if(isRegisteredState && book.id) {
    bookHref = `/library/book/${book.id}`;
  }else if(!isRegisteredState && book.googleBookId){
    bookHref = `/search/book/${book.googleBookId}`
  }

  const updateRegisteredState = (val: boolean) => {
    if(!isLibrary) setIsRegisteredState(val);
  }

  return (
    <div className="grid grid-cols-3 gap-4 p-5 bg-violet-50 rounded">
      <Link
        href={bookHref}
        onClick={() => book.googleBookId && localStorage.setItem(book.googleBookId, JSON.stringify(book))}
        >
        {book.imageUrl ?
          <Image width={450} height={800} priority={true} className="w-full" src={book.imageUrl} alt={`${book.title}のカバー`} />
          :
          <Image src={BookIcon} width="0" height="0" alt="本のカバー（画像が登録されていない本）" />}
      </Link>
      <div className="col-span-2 flex flex-col justify-between">
        <div className="">
          {book.readingStatus !== null && book.readingStatus !== undefined && <ReadingStatusLabel status={book.readingStatus} />}
          <Link
            href={bookHref}
            onClick={() => book.googleBookId && localStorage.setItem(book.googleBookId, JSON.stringify(book))}
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