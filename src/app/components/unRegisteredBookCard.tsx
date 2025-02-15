"use client"

import { BookType } from "@/src/types"
import { registerBook } from "../lib/registerBook";
import { useSession } from "next-auth/react";
import { useState } from "react";
import PrimaryButton from "./ui/buttons/primaryButton";
import NotRegisteredModal from "./notRegisteredModal";

interface BookProps {
  bookData: BookType;
  mutate: () => void;
}

const UnRegisteredBookCard: React.FC<BookProps> = ({ bookData, mutate }) => {
  const {data: session } = useSession();
  const [book, setBook] = useState<BookType | null>(bookData);
  const [showModal, setShowModal] = useState<boolean>(false);

  const closeModal = () => {
    setShowModal(false);
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if(!session){
      setShowModal(true);
      return;
    }
    const result = book && registerBook(book);
    mutate();
  }

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
          <PrimaryButton label="本を登録" clickEvent={handleRegister} />
        </div>
      </div>
    }
    {showModal&&
      <NotRegisteredModal closeModal={closeModal} />
    }
    </>
  )
}

export default UnRegisteredBookCard;
