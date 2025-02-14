import BookCard from "./bookCard";
import { BookType } from "@/src/types";

type BooksProps = {
  books: BookType[];
  registeredGoogleBookIds: string[];
}

export default function BookList({books, registeredGoogleBookIds}: BooksProps) {

  return (
    <div className="grid grid-cols-2 gap-8">
      {books?.map(book=><BookCard key={book.googleBookId} book={book} isRegistered={registeredGoogleBookIds.includes(book.googleBookId)} />)}
    </div>
  )
}