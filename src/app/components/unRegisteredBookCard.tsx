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
        <div className="grid grid-flow-col grid-cols-5 gap-4">
          <div className="col-span-1">
          {bookData.imageUrl && <Image width={450} height={800} priority={true} className="w-full rounded shadow-md" src={bookData.imageUrl} alt={`${bookData.title}のカバー`} />}
          </div>
          <div className="text-xs mb-3 col-span-4">{bookData.description}</div>
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
