"use client"

import { BookType } from "@/src/types"
import { registerBook } from "../lib/registerBook";
import SecondaryButton from "./ui/buttons/secondaryButton";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setRequestMeta } from "next/dist/server/request-meta";

interface BookProps {
  bookData: BookType;
  isRegistered: boolean;
  mutate: () => void;
}

const LibraryBookCard: React.FC<BookProps> = ({ bookData, isRegistered, mutate }) => {
  const {data: session } = useSession();
  const [book, setBook] = useState<BookType | null>(bookData);
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    book && registerBook(book);
    isRegistered = true;
  }

  const handleDeregister = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if(session && book?.id) {
      fetch("/api/deregisterBook", {
        method: "DELETE",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
          bookId: book?.id,
        })
      })
      .then(res => res.json())
      .then(data => {
        isRegistered = false;
        mutate();
        return;
      })
      .catch(e => console.log(e));
    }
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
              {isRegistered?
                <SecondaryButton label="登録解除" clickEvent={handleDeregister} />
                :
                <SecondaryButton label="本を登録" clickEvent={handleRegister} />
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
