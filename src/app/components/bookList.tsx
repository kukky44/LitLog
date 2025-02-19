import BookCard from "./bookCard";
import { BookType } from "@/src/types";
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
        registeredGoogleBookIds === null ? <></>
        :
        <div className="grid grid-cols-2 gap-6">
          {books?.map(book=> {
            const registered = registeredGoogleBookIds.length ? registeredGoogleBookIds.includes(book.googleBookId) : false;

            return (
              <BookCard key={book.googleBookId} book={book} isRegistered={registered} mutate={mutate} />
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