"use client"

import { MemoType } from "@/src/types";
import MemoItem from "./memoItem";
import NewMemo from "./newMemo";
import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

type MemoListProps = {
  bookId: string;
}

const MemoList: React.FC<MemoListProps> = ({ bookId }) => {
  const { data, mutate} = useSWR<MemoType[]>(`/api/getAllMemos/${bookId}`, fetcher);

  return (
    <div className="mt-4">
      <NewMemo bookId={bookId} mutate={mutate} />
      <div className="mt-4">
        {data&&
          data.map(memo => (
            <div key={memo.id} className="border-t border-gray-200 py-2 px-4">
              <MemoItem memo={memo} />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MemoList;