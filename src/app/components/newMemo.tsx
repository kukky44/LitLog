"use client"

import { useRef, useState } from "react"
import PrimaryButton from "./ui/buttons/primaryButton";
import { useTranslations } from "next-intl";
import TitleText from "./ui/titleText";

type BookProps = {
  bookId: string;
  mutate: () => void;
}

const NewMemo: React.FC<BookProps> = ({ bookId, mutate }) => {
  const [memoInput, setMemoInput] = useState<string>("");
  const [pageNum, setPageNum] = useState<number | string>("");
  const testAreaRef = useRef<HTMLTextAreaElement>(null);

  const tButtons = useTranslations("buttons");
  const tMemo = useTranslations("memo");

  const handlePageNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputNum = e.target.value;
    if(inputNum === "") setPageNum("");

    if(/^\d+$/.test(inputNum)) setPageNum(inputNum);
  }

  async function handleSubmit (e: React.FormEvent){
    e.preventDefault();
    if(!memoInput) return console.log("empty memo");

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
        <TitleText text={tMemo("add")} />
        <div className="flex justify-between">
          <div>
            <label htmlFor="pageNum" className="text-sm mr-1">{tMemo("page")}</label>
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
        <textarea ref={testAreaRef} value={memoInput} onChange={(e)=>setMemoInput(e.target.value)} className="w-full border border-gray-300 rounded p-1" rows={3} />
      </div>
      <div className="mt-3 flex justify-end">
        <PrimaryButton label={tButtons("add")} clickEvent={handleSubmit} />
      </div>
    </form>
  )
}

export default NewMemo;