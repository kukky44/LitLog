import { useState } from "react";
import SecondaryButton from "./secondaryButton";
import { useSession } from "next-auth/react";
import ButtonLoadingAnimation from "./buttonLoadingAnimation";

type ButtonProps = {
  bookId: string | undefined;
  mutate?: () => void;
  updateRegisteredState?: (val: boolean) => void;
  callBack?: () => void;
}

const DeregsiterBookButton: React.FC<ButtonProps> = ({bookId, mutate, updateRegisteredState, callBack}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const {data: session } = useSession();

  const handleDeregister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(isProcessing) return console.log("process going on");
    if(!bookId) return console.log("no book id found");

    setIsProcessing(true);
    try {
      if(session) {
        await fetch("/api/deregisterBook", {
          method: "DELETE",
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify({
            bookId: bookId,
          })
        })
        .then(res => res.json())
        .then(() => {
          if(updateRegisteredState) updateRegisteredState(false);
          if(mutate) mutate();
          if(callBack) callBack();
        })
        .catch(e => console.log(e)
        )
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <SecondaryButton clickEvent={handleDeregister} label={isProcessing ? <ButtonLoadingAnimation /> : "登録解除"} disabled={isProcessing}/>
  )
}

export default DeregsiterBookButton;
