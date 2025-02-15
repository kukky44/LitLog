"use client"

import { useRef, useState } from "react"
import PrimaryButton from "./ui/buttons/primaryButton";

interface BookProps {
  bookId: string;
  mutate: () => void;
}

const NewMemo: React.FC<BookProps> = ({ bookId, mutate }) => {
  const [memoInput, setMemoInput] = useState<string>("");
  const [pageNum, setPageNum] = useState<number | string>("");
  const testAreaRef = useRef<HTMLTextAreaElement>(null);

  const handlePageNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputNum = e.target.value;
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
      setMemoInput("");
      testAreaRef.current?.focus();
    }
  }

  return (
    <form className="py-2 px-6">
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
        <textarea ref={testAreaRef} value={memoInput} onChange={(e)=>setMemoInput(e.target.value)} className="w-full border border-gray-300 rounded" rows={3} />
      </div>
      <div className="mt-3 flex justify-end">
        <PrimaryButton label="追加" clickEvent={handleSubmit} />
      </div>
    </form>
  )
}

export default NewMemo;