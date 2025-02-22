import { MouseEventHandler, useEffect, useRef, useState } from "react";
import PrimaryButton from "./ui/buttons/primaryButton";
import { IoIosClose } from "react-icons/io";
import ErrorMsg from "./ui/errorMsg";
import { registerBook } from "../lib/registerBook";
import { BookType } from "@/src/types";

type ModalProps = {
  closeModal: () => void;
  mutate: () => void;
}

type ErrorMsg = {
  title?: string;
  desc?: string;
  failed?: string;
}

const NewBookModal: React.FC<ModalProps> = ({closeModal, mutate}) => {
  const [bookData, setBookData] = useState<BookType>({
    title: "",
    author: ""
  });
  const [errors, setErrors] = useState<ErrorMsg>({});

  const handleWrapperClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    closeModal();
  }

  const stopPropagation: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  }

  const handleCloseClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    closeModal();
  }

  // Using a single event handler for multiple fields
  // https://react.dev/learn/updating-objects-in-state#using-a-single-event-handler-for-multiple-fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBookData({
      ...bookData,
      [e.target.name]: e.target.value
    })
  }

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();

    const err: ErrorMsg = {}
    if(!bookData.title) err.title = "タイトルを入力してください。";

    setErrors(err);
    if(Object.keys(err).length) return;

    const result = await registerBook(bookData);

    if(result) {
      closeModal();
      mutate();
    }
    else setErrors({failed: "本を登録できませんでした。"});
    // Updating Objects in State
    // https://react.dev/learn/updating-objects-in-state
  }

  return (
    <div onClick={handleWrapperClick} className="fixed left-0 w-screen h-screen top-0 bg-gray-300 bg-opacity-30 transition">
      <div onClick={stopPropagation} className="w-2/5 mx-auto top-24 relative bg-white rounded">
        <div className="flex justify-between items-center">
          <div className="font-bold text-2xl ml-6">本の追加</div>
          <button className="p-4 transition opacity-100 hover:opacity-70" onClick={closeModal}><IoIosClose size={32} /></button>
        </div>
        <form className="px-6 pb-6">
          <ErrorMsg msg={errors.failed} />
          <div>
            <label className="block mb-2" htmlFor="title">タイトル</label>
            <input id="title" name="title" value={bookData.title} onChange={handleChange} className="mb-1 w-full text-gray-900 placeholder:text-gray-400 rounded p-2 border border-gray-300" type="text" autoComplete="on" />
            <ErrorMsg msg={errors.title} />
          </div>
          <div className="mt-4">
            <label className="block mb-2" htmlFor="author">著者（任意）</label>
            <input id="author" name="author" value={bookData.author} onChange={handleChange} className="w-full text-gray-900 placeholder:text-gray-400 rounded p-2 border border-gray-300" type="text" autoComplete="on" />
          </div>
          <div className="mt-4">
            <label className="block mb-2" htmlFor="desc">説明（任意）</label>
            <textarea id="desc" name="description" value={bookData.description} onChange={handleChange} className="w-full border border-gray-300 rounded p-2" rows={3} />
          </div>
          <div className="flex gap-4 justify-end mt-6">
            <button className="hover:opacity-60 transition" onClick={handleCloseClick}>キャンセル</button>
            <PrimaryButton label="追加" clickEvent={handleClick} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewBookModal;