"use client"

import { BookType } from "@/src/types"
import RegsiterBookButton from "./ui/buttons/registerBookButton";
import Image from "next/image";

type BookProps = {
  bookData: BookType;
  mutate: () => void;
}

const UnRegisteredBookCard: React.FC<BookProps> = ({ bookData, mutate }) => {

  return (
    <>
    {bookData &&
      <div className="mx-auto w-4/5 bg-white text-black p-4 rounded">
        <h2 className="text-lg font-bold mb-1">{bookData.title}</h2>
        <div className="mb-4 text-sm">{bookData.author}</div>
        <div className="grid grid-flow-col grid-cols-5 gap-4">
          <div className="col-span-1">
          {bookData.imageUrl && <Image width={450} height={800} priority={true} className="w-full rounded shadow-md" src={bookData.imageUrl} alt={`${bookData.title}のカバー`} />}
          </div>
          <div className="text-xs mb-3 col-span-4">{bookData.description}</div>
        </div>
        <div className="mt-4">
          <RegsiterBookButton book={bookData} mutate={mutate} />
        </div>
      </div>
    }
    </>
  )
}

export default UnRegisteredBookCard;
