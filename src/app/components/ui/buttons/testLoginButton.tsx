import { useRouter } from "@/src/i18n/routing";
import { signIn } from "next-auth/react";
import { useState } from "react";
import ButtonLoadingAnimation from "./buttonLoadingAnimation";
import { useTranslations } from "next-intl";

const TestLoginButton: React.FC = () => {
  const [isProcessing, seetIsProcessing] = useState<boolean>(false);
  const router = useRouter();

  const tButtons = useTranslations("buttons");

  const handleClick = async () => {
    seetIsProcessing(true);
    try {
      const result = await signIn("test-user", {
        redirect: false,
      });

      if (!result || result?.error) {
        seetIsProcessing(false);
        return;
      }else{
        router.push('/library');
      }
    } catch(e) {
      console.log(e);
      return;
    }
  }

  return (
    <button onClick={handleClick} disabled={isProcessing} className="rounded-full px-6 py-2 border border-green-700 text-green-700 transition bg-white hover:bg-green-50 disabled:opacity-50">
      {isProcessing ? <ButtonLoadingAnimation /> : tButtons("testLogin")}
    </button>
  )
}

export default TestLoginButton;