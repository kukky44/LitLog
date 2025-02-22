"use client"

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { BookType, FetchErrorType } from "@/src/types";
import BookList from "../../components/bookList";
import LoadingAnimation from "../../components/ui/buttons/loadingAnimation";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { fetcher } from "../../lib/fetcher";
import { useLocale, useTranslations } from "next-intl";
import TitleText from "../../components/ui/titleText";

function SearchResult() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");
  const [fetchError, setFetchError] = useState<string>("")
  const [books, setBooks] = useState<BookType[] | null>(null);
  const [registeredGBookIds, setRegisteredGBookIds] = useState<string[] | null>(null);
  const { data: session } = useSession();

  const locale = useLocale();
  const tSearch = useTranslations("searchPage");

  const { isLoading, mutate} = useSWR<BookType[]>(
    `/api/searchBook/${keyword}?locale=${locale}`,
    fetcher,
    {
      onSuccess: (data) => {
        if(!data) return console.log("no book found");

        if(session){
          fetch('/api/getRegisteredBookID')
          .then(res => res.json())
          .then(idData => {
            data.map(item => {
              item.id = idData.find((d:BookType) => d.googleBookId === item.googleBookId)?.id;
            });
            setRegisteredGBookIds(idData.map((ids:BookType) => ids.googleBookId));
          })
        }
        setBooks(data);
      },
      onError: (err: FetchErrorType) => {
        console.log(err.info);
        //set an empty array to display limit error message
        setBooks([]);
        if(err.status === 429) setFetchError("Google booksの検索リミットを超過しました。");
      }
  });

  return (
    <div>
      {isLoading || books === null ?
        <div className="mt-6 text-center">
          <LoadingAnimation />
        </div>
      :
      fetchError ?
      <div>{fetchError}</div>:
      <div>
        <TitleText text={tSearch("title")} className="mb-6" />
        {books.length ?
          <BookList isLibrary={false} books={books} registeredGoogleBookIds={registeredGBookIds} mutate={mutate} />:
          <div>{tSearch("noResult")}</div>
        }
        </div>
        }
    </div>
  );
}

export default function Search() {
  return (
    <Suspense fallback={<LoadingAnimation />}>
      <SearchResult />
    </Suspense>
  )
}