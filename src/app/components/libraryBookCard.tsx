"use client"

import { BookType } from "@/src/types"
import { useSession } from "next-auth/react";
import { useState } from "react";
import DeregsiterBookButton from "./ui/buttons/deregisterBookButton";
import RegsiterBookButton from "./ui/buttons/registerBookButton";

interface BookProps {
  bookData: BookType;
  isRegistered: boolean;
  mutate: () => void;
}

const LibraryBookCard: React.FC<BookProps> = ({ bookData, isRegistered, mutate }) => {
  const {data: session } = useSession();
  const [book, setBook] = useState<BookType | null>(bookData);
  const [isRegisteredState, setIsRegisteredState] = useState(isRegistered);

  const updateRegisteredState = (val: boolean) => {
    setIsRegisteredState(val);
  }

  return (
    <>
    {book &&
      <div className="bg-white text-black p-4 rounded">
        <h2 className="text-lg font-bold mb-1">{book.title}</h2>
        <div className="mb-2 text-sm">{book.author}</div>
        <div className="text-center block">
          <img src={book.imageUrl} alt={`${book.title}のカバー`} />
        </div>
        <div className="detail mt-4">
          <div className="text-xs mb-3">{book.description}</div>
          {session &&
            <div>
              {isRegisteredState?
                <DeregsiterBookButton bookId={book.id} mutate={mutate} updateRegisteredState={updateRegisteredState} />
              :
                <RegsiterBookButton book={book} mutate={mutate} updateRegisteredState={updateRegisteredState} />
              }
            </div>
          }
        </div>
      </div>
    }
    </>
  )
}

export default LibraryBookCard;
