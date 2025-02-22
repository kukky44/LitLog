"use client"

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "@/src/i18n/routing";
import PrimaryButton from "../../components/ui/buttons/primaryButton";
import { Link } from "@/src/i18n/routing";
import ErrorMsg from "../../components/ui/errorMsg";
import { useTranslations } from "next-intl";
import ButtonLoadingAnimation from "../../components/ui/buttons/buttonLoadingAnimation";
import TitleText from "../../components/ui/titleText";

type ErrorMsg = {
  email?: string;
  password?: string;
  invalid?: string;
}

export default function Login() {
  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [errors, setErrors] = useState<ErrorMsg>({});
  const [isProcessing, seetIsProcessing] = useState<boolean>(false);
  const router = useRouter();

  const tButtons = useTranslations("buttons");
  const tForm = useTranslations("form");
  const tLinks = useTranslations("links");
  const tErrMsg = useTranslations("errMsg");

  async function handleSubmit (e: React.FormEvent){
    const err: ErrorMsg = {};
    e.preventDefault();

    // validate email address
    if(!inputEmail){
      err.email = tErrMsg("emailRequired");
    }

    // validate password
    if(!inputPassword) {
      err.password = tErrMsg("passwordRequired");
    }

    setErrors(err);
    if(Object.keys(err).length) return;

    seetIsProcessing(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: inputEmail,
        password: inputPassword,
      });
      if (!result || result?.error) {
        setErrors({invalid: tErrMsg("failedLogin")});
        seetIsProcessing(false);
        return;
      }else{
        router.push('/library');
      }
    } catch(e) {
      console.log(e);
      setErrors({invalid: tErrMsg("failedLogin")});
      seetIsProcessing(false);
      return;
    }
  }

  const inputClassName = "mb-1 block px-4 py-2 rounded w-full";
  const labelClassName = "block mt-4 mb-1";

  return (
    <div className="w-1/2 mx-auto">
      <TitleText text={tForm("loginTitle")} className="mb-4" />
      <form onSubmit={handleSubmit} className="min-w-80">
        <div className="text-black mb-6" >
          {errors.invalid && <ErrorMsg msg={errors.invalid} />}
          <label className={labelClassName} htmlFor="email">{tForm("mailLabel")}</label>
          <input value={inputEmail} onChange={(e => setInputEmail(e.target.value))} className={inputClassName} type="email" id="email" />
          {errors.email && <ErrorMsg msg={errors.email} />}

          <label  className={labelClassName} htmlFor="password">{tForm("passwordLabel")}</label>
          <input value={inputPassword} onChange={(e => setInputPassword(e.target.value))} className={`${inputClassName}`} type="password" id="password" />
          {errors.password && <ErrorMsg msg={errors.password} />}
        </div>
        <div className="flex justify-end">
          <PrimaryButton label={isProcessing ? <ButtonLoadingAnimation /> : tButtons("login")} disabled={isProcessing} />
        </div>
      </form>
      <div className="text-right mt-5 underline"><Link href="/signup">{tLinks("signup")}</Link></div>
    </div>
  );
}