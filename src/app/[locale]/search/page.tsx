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
import SecondaryButton from "../../components/ui/buttons/secondaryButton";
import ButtonLoadingAnimation from "../../components/ui/buttons/buttonLoadingAnimation";

function SearchResult() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");
  const [fetchError, setFetchError] = useState<string>("")
  const [books, setBooks] = useState<BookType[] | null>(null);
  const [isMorePage, setIsMorePage] = useState<boolean>(false);
  const [isMoreLoading, setIsmoreLoading] = useState(false);
  const maxResults = 10;
  const [startIndex, setStartIndex] = useState<number>(maxResults);
  const [registeredGBookIds, setRegisteredGBookIds] = useState<string[] | null>(null);
  const { data: session } = useSession();

  const locale = useLocale();
  const tSearch = useTranslations("searchPage");
  const tButtons = useTranslations("buttons");

  const setBookData = (data: BookType[], append: boolean) => {
    if(data.length < 10) setIsMorePage(false);
    else setIsMorePage(true);

    if(session){
      fetch('/api/getRegisteredBookID')
      .then(res => res.json())
      .then(idData => {
        data.map(item => (
          item.id = idData.find((d:BookType) => d.googleBookId === item.googleBookId)?.id
        ));
        setRegisteredGBookIds(idData.map((ids:BookType) => ids.googleBookId));
      })
    }

    //Load more books or initial load
    if (append) {
      setBooks((prev) => [...(prev ?? []), ...data]);
    } else {
      setBooks(data);
    }
  }

  const { isLoading, mutate} = useSWR<BookType[]>(
    `/api/searchBook/${keyword}?locale=${locale}&maxResults=${maxResults}`,
    fetcher,
    {
      onSuccess: (data) => {
        if(!data) return console.log("no book found");

        setBookData(data, false);
        setBooks(data);
      },
      onError: (err: FetchErrorType) => {
        console.log(err.info);
        //set an empty array to display limit error message
        setBooks([]);
        if(err.status === 429) setFetchError("Google booksの検索リミットを超過しました。");
      }
  });

  // Load more button for pagination
  const handlLoadMore = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsmoreLoading(true);
    try {

      const res = await fetch(`/api/searchBook/${keyword}?locale=${locale}&startIndex=${startIndex}&&maxResults=${maxResults}`);
      if (!res.ok) {
        throw new Error("Failed to fetch book data from search");
      }

      const result = await res.json();

      setStartIndex((prev) => prev += maxResults);
      setBookData(result, true);
    } catch (e) {
      console.log(e);
    }
    setIsmoreLoading(false);
  }

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
          <>
            <BookList isLibrary={false} books={books} registeredGoogleBookIds={registeredGBookIds} mutate={mutate} />
            {isMorePage &&
              <div className="text-center mt-6">
                <SecondaryButton
                  clickEvent={handlLoadMore}
                  label={isMoreLoading ? <ButtonLoadingAnimation /> : tButtons("loadMore")}
                  disabled={isMoreLoading}
                />
              </div>
            }
          </>
          :
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