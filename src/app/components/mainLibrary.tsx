"use client"

import { useMemo, useState } from "react";
import { BookType } from "@/src/types";
import BookList from "./bookList";
import useSWR from "swr";
import { fetcher } from "../lib/fetcher";
import LoadingAnimation from "./ui/buttons/loadingAnimation";
import PrimaryButton from "./ui/buttons/primaryButton";
import { FaPlus } from "react-icons/fa6";
import NewBookModal from "./newBookModal";
import { useTranslations } from "next-intl";
import ReadingStatusFilter from "./readingStatusFilter";

export default function MainLibrary() {
  const { data: bookData, isLoading, mutate} = useSWR<BookType[]>('/api/getAllBooks/', fetcher);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<number>(0);

  const tLinks = useTranslations("links");
  const tNewBook = useTranslations("newBook");
  const tErrMsg = useTranslations("errMsg");

  const closeModal = () => {
    setShowModal(false);
  }

  const handleClick = () => {
    setShowModal(true);
  }

  const filteredBooks = useMemo(() => {
    if(!bookData) return [];

    if(selectedStatus === 0) return bookData;

    return bookData.filter((book: BookType) => {
      if(book.readingStatus === undefined) return false;
      return selectedStatus === book.readingStatus + 1;
    });
  }, [selectedStatus, bookData])

  return (
    <div className="relative">
      <div className="flex gap-6 items-center mb-6">
        <h2 className="text-xl font-bold">{tLinks("library")}</h2>
        <PrimaryButton label={<div className="flex items-center gap-3">{tNewBook("modalTitle")}<FaPlus /></div>} clickEvent={handleClick} />
      </div>
      <ReadingStatusFilter selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
      {isLoading ? <div className="mt-8 text-center"><LoadingAnimation /></div>:
        filteredBooks?.length ? <BookList isLibrary={true} books={filteredBooks} mutate={mutate} /> :
        <div>{tErrMsg("pleaseAddBook")}</div>
      }
      {showModal && <NewBookModal closeModal={closeModal} mutate={mutate} /> }
    </div>
  );
}