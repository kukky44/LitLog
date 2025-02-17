import BookCard from "./bookCard";
import { BookType } from "@/src/types";
import LoadingAnimation from "./ui/buttons/loadingAnimation";
import { useSession } from "next-auth/react";

type BooksProps = {
  books: BookType[];
  registeredGoogleBookIds: string[] | null;
  mutate: () => void;
}

export default function BookList({books, registeredGoogleBookIds, mutate}: BooksProps) {
  const {data: session} = useSession();

  return (
    <>
      {session ?
        registeredGoogleBookIds === null ? <div className="mt-8 text-center"><LoadingAnimation /></div>
        :
        <div className="grid grid-cols-2 gap-6">
          {books?.map(book=> {
            const resistered = registeredGoogleBookIds ? registeredGoogleBookIds.includes(book.googleBookId) : false;
            return (
              <BookCard key={book.googleBookId} book={book} isRegistered={resistered} mutate={mutate} />
            )
          }
          )}
        </div>
        :
        <div className="grid grid-cols-2 gap-6">
          {books?.map(book=> {
            return (
              <BookCard key={book.googleBookId} book={book} isRegistered={false} mutate={mutate} />
            )
          }
        )}
      </div>
      }
    </>
  )
}