"use client"

import { BookType } from "@/src/types"
import { useState } from "react";
import RegsiterBookButton from "./ui/buttons/registerBookButton";

interface BookProps {
  bookData: BookType;
  mutate: () => void;
}

const UnRegisteredBookCard: React.FC<BookProps> = ({ bookData, mutate }) => {
  const [book, setBook] = useState<BookType | null>(bookData);

  return (
    <>
    {book &&
      <div className="mx-auto w-4/5 bg-white text-black p-4 rounded">
        <h2 className="text-lg font-bold mb-1">{book.title}</h2>
        <div className="mb-4 text-sm">{book.author}</div>
        <div className="grid grid-flow-col gap-4">
          <div className="text-center block">
            {book.imageUrl && <img src={book.imageUrl} alt={`${book.title}のカバー`} />}
          </div>
          <div className="text-xs mb-3">{book.description}</div>
        </div>
        <div className="mt-4">
          <RegsiterBookButton book={book} mutate={mutate} />
        </div>
      </div>
    }
    </>
  )
}

export default UnRegisteredBookCard;
