"use client"

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BookType } from "@/src/types";
import BookList from "../components/bookList";
import { testData } from "./testdata";
import LoadingAnimation from "../components/ui/buttons/loadingAnimation";
import { useSession } from "next-auth/react";

export default function Search() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword")
  const [books, setBooks] = useState<BookType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [registeredGBookIds, setRegisteredGBookIds] = useState<string[]>([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    setIsLoading(true);
    if(session){
      fetch('/api/getRegisteredGBookID')
      .then(res => res.json())
      .then(data => {
        setRegisteredGBookIds(data.map((d:any) => d.googleBookId));
      })
    }

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&langRestrict=ja&maxResults=10&orderBy=relevance`)
    .then((res) => {
      return res.json()
    }).then((data) => {
      const bookData = data?.items.map((d: any) => {
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
      setBooks(bookData);
      setIsLoading(false);
    }).catch(e => {
      console.error(e);
    })

  }, [keyword]);

  return (
    <div>
      {isLoading?
        <div className="mt-6">
          <LoadingAnimation />
        </div>
      :
      <div>
        <h2 className="mb-6 text-lg font-bold">検索結果</h2>
        {books && <BookList books={books} registeredGoogleBookIds={registeredGBookIds} />}
        </div>
        }
    </div>
  );
}