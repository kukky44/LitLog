"use client"

import { useState } from "react";
import { BookType } from "@/src/types";
import BookList from "./bookList";
import useSWR from "swr";
import { fetcher } from "../lib/fetcher";
import LoadingAnimation from "./ui/buttons/loadingAnimation";

export default function MainLibrary() {
  const [registeredGBookIds, setRegisteredGBookIds] = useState<string[] | null>(null);
  const { data: bookData, error, isLoading, mutate} = useSWR<BookType[]>('/api/getAllBooks/', fetcher, {
    onSuccess: (data) => {
      if(data) setRegisteredGBookIds(data.map((d:any) => d.googleBookId));
    }
  });

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">ライブラリ</h2>
      {isLoading ? <div className="mt-8 text-center"><LoadingAnimation /></div>:
        bookData?.length ? <BookList books={bookData} registeredGoogleBookIds={registeredGBookIds} mutate={mutate} /> :
        <div>本を追加してください。</div>
      }
    </div>
  );
}