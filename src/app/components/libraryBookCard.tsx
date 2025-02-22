"use client"

import { BookType } from "@/src/types"
import { useSession } from "next-auth/react";
import DeregsiterBookButton from "./ui/buttons/deregisterBookButton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import BookIcon from "../../assets/images/bookIcon.svg";

type BookProps = {
  bookData: BookType;
  isRegistered: boolean;
  mutate: () => void;
}

const LibraryBookCard: React.FC<BookProps> = ({ bookData, mutate }) => {
  const { status } = useSession();
  const router = useRouter();
  if(status === "unauthenticated") router.push("/login");

  return (
    <>
    {bookData &&
      <div className="bg-white text-black p-4 rounded">
        <h2 className="text-lg font-bold mb-1">{bookData.title}</h2>
        <div className="mb-2 text-sm">{bookData.author}</div>
        <div className="w-1/2 mx-auto">
        {bookData.imageUrl ?
          <Image width={450} height={800} priority={true} className="w-full rounded shadow-md" src={bookData.imageUrl} alt={`${bookData.title}のカバー`} />
          :
          <Image src={BookIcon} width="0" height="0" alt="本のカバー（画像が登録されていない本）" />
        }
        </div>
        <div className="detail mt-4">
          <div className="text-xs mb-3">{bookData.description}</div>
            <div>
                <DeregsiterBookButton bookId={bookData.id} mutate={mutate}  />
            </div>
        </div>
      </div>
    }
    </>
  )
}

export default LibraryBookCard;
