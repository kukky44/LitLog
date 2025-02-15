import BookCard from "./bookCard";
import { BookType } from "@/src/types";
import LoadingAnimation from "./ui/buttons/loadingAnimation";

type BooksProps = {
  books: BookType[];
  registeredGoogleBookIds: string[];
  mutate: () => void;
}

export default function BookList({books, registeredGoogleBookIds, mutate}: BooksProps) {

  return (
    <>
      {registeredGoogleBookIds.length === 0 ?
        <div className="text-center"><LoadingAnimation /></div>
        :
        <div className="grid grid-cols-2 gap-6">
          {books?.map(book=><BookCard key={book.googleBookId} book={book} isRegistered={registeredGoogleBookIds.includes(book.googleBookId)} mutate={mutate} />)}
        </div>
      }
    </>
  )
}