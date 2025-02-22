"use client"

import { useState } from "react";
import { BookType } from "@/src/types";
import BookList from "./bookList";
import useSWR from "swr";
import { fetcher } from "../lib/fetcher";
import LoadingAnimation from "./ui/buttons/loadingAnimation";
import PrimaryButton from "./ui/buttons/primaryButton";
import { FaPlus } from "react-icons/fa6";
import NewBookModal from "./newBookModal";

export default function MainLibrary() {
  const { data: bookData, isLoading, mutate} = useSWR<BookType[]>('/api/getAllBooks/', fetcher);
  const [showModal, setShowModal] = useState<boolean>(false);

  const closeModal = () => {
    setShowModal(false);
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowModal(true);
  }

  return (
    <div className="relative">
      <div className="flex gap-6 items-center mb-6">
        <h2 className="text-xl font-bold">ライブラリ</h2>
        <PrimaryButton label={<div className="flex items-center gap-3">本を追加<FaPlus /></div>} clickEvent={handleClick} />
      </div>
      {isLoading ? <div className="mt-8 text-center"><LoadingAnimation /></div>:
        bookData?.length ? <BookList isLibrary={true} books={bookData} mutate={mutate} /> :
        <div>本を追加してください。</div>
      }
      {showModal && <NewBookModal closeModal={closeModal} mutate={mutate} /> }
    </div>
  );
}