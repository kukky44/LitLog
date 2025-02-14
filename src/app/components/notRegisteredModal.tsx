import Link from "next/link";
import PrimaryButton from "./ui/buttons/primaryButton";
import SecondaryButton from "./ui/buttons/secondaryButton";
import { IoIosClose } from "react-icons/io";
import { MouseEventHandler } from "react";

interface ModalProps {
  closeModal: MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
}

const NotRegisteredModal: React.FC<ModalProps> = ({closeModal}) => {
  const handleWrapperClick:MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    closeModal(e);
  }

  const stopPropagation: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation(); // Prevent clicks inside the modal from closing it
  };

  return (
    <div onClick={handleWrapperClick} className="bg-transparent absolute left-0 top-0 w-screen h-screen bg-gray-400 bg-opacity-40">
      <div onClick={stopPropagation} className="w-96 mx-auto top-1/4 relative bg-white rounded">
        <div className="flex justify-end">
          <button className="p-4 transition opacity-100 hover:opacity-70" onClick={closeModal}><IoIosClose size={32} /></button>
        </div>
        <div className="px-6 pb-6">
          <div className="mb-8">本の登録にはログインまたはユーザー登録が必要です。</div>
          <div className="flex gap-6 justify-between">
            <Link href="/login">
              <SecondaryButton label="ログイン" />
            </Link>
            <Link href="/signup">
              <PrimaryButton label="ユーザー登録" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotRegisteredModal;