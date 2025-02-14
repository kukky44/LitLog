"use client"

import { useEffect, useState } from "react";
import { BookType } from "@/src/types";
import BookList from "./bookList";

export default function MainLibrary() {
  const [bookData, setBookData] = useState<BookType[]>([]);
  const [loading, setLoading] = useState(true);
  const [registeredGBookIds, setRegisteredGBookIds] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/getAllBooks')
      .then((res) => res.json())
      .then((data) => {
        setRegisteredGBookIds(data.map((d:any) => d.googleBookId));
        setBookData(data);
        setLoading(false);
      }).catch((err) => {
        console.error('Error fetching data:', err);
      });
  }, [])

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">ライブラリ</h2>
      {bookData && <BookList books={bookData} registeredGoogleBookIds={registeredGBookIds} />}
    </div>
  );
}