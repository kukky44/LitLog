"use client"

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { BookType } from "@/src/types";
import BookList from "../components/bookList";
import { testData } from "./testdata";
import LoadingAnimation from "../components/ui/buttons/loadingAnimation";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

interface GoogleBooksAPIItems {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: { thumbnail: string };
    industryIdentifiers?: { type: string; identifier: string }[];
  };
}

interface GoogleBooksAPIResponse {
  items: Array<GoogleBooksAPIItems>;
};

export default function Search() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword")
  const [books, setBooks] = useState<BookType[]>([]);
  const [registeredGBookIds, setRegisteredGBookIds] = useState<string[] | null>(null);
  const { data: session } = useSession();
  const { data: bs, error, isLoading, mutate} = useSWR<GoogleBooksAPIResponse>(
    `https://www.googleapis.com/books/v1/volumes?q=${keyword}&langRestrict=ja&maxResults=10&orderBy=relevance`,
    fetcher,
    {
      onSuccess: (data) => {
        if(!data || !data?.items) return;
        const bookData: BookType[] = data.items.map((d: any) => {
          const vInfo = d.volumeInfo;
          let isbn: string = "";

          if(vInfo.industryIdentifiers && vInfo.industryIdentifiers[0].type === "ISBN_13"){
            isbn = vInfo.industryIdentifiers[0].identifier;
          }
          return {
            title: vInfo.title,
            author: vInfo.authors?.join("、"),
            description: vInfo.description,
            imageUrl: vInfo.imageLinks?.thumbnail,
            isbn: isbn,
            googleBookId: d.id
          }
        });
        if(session){
          fetch('/api/getRegisteredBookID')
          .then(res => res.json())
          .then(data => {
            bookData.map(item => {
              item.id = data.find((d:any) => d.googleBookId === item.googleBookId)?.id;
            })
            setRegisteredGBookIds(data.map((d:any) => d.googleBookId));
          })
        }
        setBooks(bookData);
      }
  });

  return (
    <div>
      {isLoading?
        <div className="mt-6 text-center">
          <LoadingAnimation />
        </div>
      :
      <div>
        <h2 className="mb-6 text-lg font-bold">検索結果</h2>
        {books && <BookList books={books} registeredGoogleBookIds={registeredGBookIds} mutate={mutate} />}
        </div>
        }
    </div>
  );
}