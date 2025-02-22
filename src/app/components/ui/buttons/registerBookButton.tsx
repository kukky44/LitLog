import { useState } from "react";
import PrimaryButton from "./primaryButton";
import { registerBook } from "@/src/app/lib/registerBook";
import { useSession } from "next-auth/react";
import NotRegisteredModal from "../../notRegisteredModal";
import { BookType } from "@/src/types";
import ButtonLoadingAnimation from "./buttonLoadingAnimation";

type ButtonProps = {
  book: BookType;
  mutate?: () => void;
  updateRegisteredState?: (val: boolean) => void;
  callBack?: (url: string) => void;
}

const RegsiterBookButton: React.FC<ButtonProps> = ({book, mutate, updateRegisteredState, callBack}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const {data: session } = useSession();

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(isProcessing) return console.log("process going on");
    setIsProcessing(true);

    try {
      if(session) {
        const result = await registerBook(book);
        if(updateRegisteredState) updateRegisteredState(true);
        if(mutate) mutate();
        if(result.id && callBack) callBack(`/library/book/${result.id}`);
      }else{
        setShowModal(true);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsProcessing(false);
    }
  }

  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <>
      <PrimaryButton clickEvent={handleRegister} label={isProcessing ? <ButtonLoadingAnimation /> : "本を登録"} disabled={isProcessing} />
      {showModal&&
        <NotRegisteredModal closeModal={closeModal} />
      }
    </>
  )
}

export default RegsiterBookButton;
