import { Link } from "@/src/i18n/routing";
import PrimaryButton from "./ui/buttons/primaryButton";
import SecondaryButton from "./ui/buttons/secondaryButton";
import { IoIosClose } from "react-icons/io";
import { MouseEventHandler } from "react";
import { useTranslations } from "next-intl";

type ModalProps = {
  closeModal: MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
}

const NotRegisteredModal: React.FC<ModalProps> = ({closeModal}) => {
  const tErrMsg = useTranslations("errMsg");
  const tButtons = useTranslations("buttons");

  const handleWrapperClick:MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    closeModal(e);
  }

  const stopPropagation: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  return (
    <div onClick={handleWrapperClick} className="fixed left-0 w-screen h-screen top-0 bg-gray-300 bg-opacity-30 transition">
      <div onClick={stopPropagation} className="w-5/6 sm:w-96 mx-auto top-1/4 relative bg-white rounded">
        <div className="flex justify-end">
          <button className="p-4 transition opacity-100 hover:opacity-70" onClick={closeModal}><IoIosClose size={32} /></button>
        </div>
        <div className="px-6 pb-6">
          <div className="mb-8">{tErrMsg("loginRequired")}</div>
          <div className="flex sm:flex-row sm:items-start flex-col items-center gap-4">
            <Link href="/signup">
              <PrimaryButton label={tButtons("signup")} />
            </Link>
            <Link href="/login">
              <SecondaryButton label={tButtons("login")} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotRegisteredModal;