"use client"

import { BookType } from "@/src/types"
import { useSession } from "next-auth/react";
import { useState } from "react";
import DeregsiterBookButton from "./ui/buttons/deregisterBookButton";
import RegsiterBookButton from "./ui/buttons/registerBookButton";
import Image from "next/image";

interface BookProps {
  bookData: BookType;
  isRegistered: boolean;
  mutate: () => void;
}

const LibraryBookCard: React.FC<BookProps> = ({ bookData, isRegistered, mutate }) => {
  const {data: session } = useSession();
  const [isRegisteredState, setIsRegisteredState] = useState(isRegistered);

  const updateRegisteredState = (val: boolean) => {
    setIsRegisteredState(val);
  }

  return (
    <>
    {bookData &&
      <div className="bg-white text-black p-4 rounded">
        <h2 className="text-lg font-bold mb-1">{bookData.title}</h2>
        <div className="mb-2 text-sm">{bookData.author}</div>
        <div className="text-center block">
        {bookData.imageUrl && <Image width={450} height={800} priority={true} className="w-full" src={bookData.imageUrl} alt={`${bookData.title}のカバー`} />}
        </div>
        <div className="detail mt-4">
          <div className="text-xs mb-3">{bookData.description}</div>
          {session &&
            <div>
              {isRegisteredState?
                <DeregsiterBookButton bookId={bookData.id} mutate={mutate} updateRegisteredState={updateRegisteredState} />
              :
                <RegsiterBookButton book={bookData} mutate={mutate} updateRegisteredState={updateRegisteredState} />
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
