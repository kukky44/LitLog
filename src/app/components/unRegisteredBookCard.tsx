"use client"

import { BookType } from "@/src/types"
import RegsiterBookButton from "./ui/buttons/registerBookButton";
import Image from "next/image";
import { useRouter } from "@/src/i18n/routing";
import TitleText from "./ui/titleText";

type BookProps = {
  bookData: BookType;
}

const UnRegisteredBookCard: React.FC<BookProps> = ({ bookData }) => {
  const router = useRouter();
  const callBack = (url: string) => {
    router.push(url);
  }

  return (
    <>
    {bookData &&
      <div className="mx-auto bg-white text-black p-4 rounded">
        <TitleText text={bookData.title} className="mb-1" />
        <div className="mb-4 text-sm">{bookData.author}</div>
        <div className="grid sm:grid-flow-col grid-flow-row sm:grid-cols-5 gap-4">
          <div className="sm:col-span-1 text-center">
            {bookData.imageUrl && <Image width={450} height={800} priority={true} className="sm:w-full w-3/5 rounded shadow-md" src={bookData.imageUrl} alt={`${bookData.title}のカバー`} />}
          </div>
          <div className="text-xs mb-3 sm:col-span-4">{bookData.description}</div>
        </div>
        <div className="mt-4">
          <RegsiterBookButton book={bookData} callBack={callBack} />
        </div>
      </div>
    }
    </>
  )
}

export default UnRegisteredBookCard;
