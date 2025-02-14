"use client"

import { MemoType } from "@/src/types";
import MemoItem from "./memoItem";
import NewMemo from "./newMemo";
import useSWR from "swr";
import LoadingAnimation from "./ui/buttons/loadingAnimation";
import { fetcher } from "../lib/fetcher";

interface MemoListProps {
  bookId: string;
}

const MemoList: React.FC<MemoListProps> = ({ bookId }) => {
  const { data, error, isLoading, mutate} = useSWR<MemoType[]>(`/api/getAllMemos/${bookId}`, fetcher);

  return (
    <>
      <NewMemo bookId={bookId} mutate={mutate} />
      {data&&
        data.map(memo => (
          <MemoItem key={memo.id} memo={memo} />
        ))
      }
    </>
  )
}

export default MemoList;