"use client"

import { useState } from "react"
import PrimaryButton from "./ui/buttons/primaryButton";

interface BookProps {
  bookId: string;
  mutate: () => void;
}

const NewMemo: React.FC<BookProps> = ({ bookId, mutate }) => {
  const [memoInput, setMemoInput] = useState<string>("");
  const [pageNum, setPageNum] = useState<number | string>("");

  const handlePageNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputNum = e.target.value;
    console.log(inputNum);

    if(inputNum === "") setPageNum("");

    if(/^\d+$/.test(inputNum)) setPageNum(inputNum);
  }

  async function handleSubmit (e: React.FormEvent){
    e.preventDefault();

    const res = await fetch("/api/createMemo", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
        bookId: bookId,
        page: Number(pageNum),
        memo: memoInput
      })
    })

    if(res.ok){
      mutate();
      setPageNum("");
      setMemoInput("");
    }
  }

  return (
    <form className="border-gray-200 border-b last:border-none p-6">
      <div className="flex justify-between items-center">
        <p className="font-bold text-lg">メモを追加</p>
        <div className="flex justify-between">
          <div>
            <label htmlFor="pageNum" className="text-sm">ページ：</label>
            <input
              value={pageNum}
              onChange={handlePageNumChange}
              className="p-1 pl-2 w-24 border border-gray-300 rounded"
              type="text"
              inputMode="numeric"
              pattern="\d*"
              name="pageNum"
              id="pageNum"
             />
          </div>
        </div>
      </div>
      <div className="mt-2">
        <textarea value={memoInput} onChange={(e)=>setMemoInput(e.target.value)} className="w-full border border-gray-300 rounded" rows={3} />
      </div>
      <div className="mt-3 flex justify-end">
        <PrimaryButton label="追加" clickEvent={handleSubmit} />
      </div>
    </form>
  )
}

export default NewMemo;