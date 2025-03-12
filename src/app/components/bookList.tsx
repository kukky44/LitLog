import BookCard from "./bookCard";
import { BookType } from "@/src/types";
import LoadingAnimation from "./ui/buttons/loadingAnimation";
import { useSession } from "next-auth/react";

type BooksProps = {
  books: BookType[];
  registeredGoogleBookIds?: string[] | null;
  isLibrary: boolean;
  mutate: () => void;
}

export default function BookList({books, registeredGoogleBookIds, mutate, isLibrary}: BooksProps) {
  const {data: session} = useSession();
  const cardsClass = "grid sm:grid-cols-2 grid-cols-1 gap-6"

  if(isLibrary) return (
    <div className={cardsClass}>
      {books?.map(book=> {
        return (
          <BookCard key={book.id} book={book} isRegistered={true} mutate={mutate} isLibrary={isLibrary} />
        )
      })}
    </div>
  )
  else return (
    <>
      {session ?
        registeredGoogleBookIds === null || registeredGoogleBookIds === undefined? <div className="mt-8 text-center"><LoadingAnimation /></div>
        :
        <div className={cardsClass}>
          {books?.map(book=> {
            const registered = registeredGoogleBookIds.length && book.googleBookId ? registeredGoogleBookIds.includes(book.googleBookId) : false;

            return (
              <BookCard key={book.googleBookId} book={book} isRegistered={registered} mutate={mutate} />
            )
          }
          )}
        </div>
        :
        <div className={cardsClass}>
          {books?.map(book=> {
            return (
              <BookCard key={book.googleBookId} book={book} isRegistered={false} mutate={mutate} />
            )
          })}
        </div>
      }
    </>
  )
}