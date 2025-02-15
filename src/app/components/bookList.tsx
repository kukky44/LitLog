import BookCard from "./bookCard";
import { BookType } from "@/src/types";

type BooksProps = {
  books: BookType[];
  registeredGoogleBookIds: string[];
  mutate: () => void;
}

export default function BookList({books, registeredGoogleBookIds, mutate}: BooksProps) {

  return (
    <div className="grid grid-cols-2 gap-8">
      {books?.map(book=><BookCard key={book.googleBookId} book={book} isRegistered={registeredGoogleBookIds.includes(book.googleBookId)} mutate={mutate} />)}
    </div>
  )
}