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
}

const emailExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

export default function SignUp() {
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
    e.preventDefault();
    const err: ErrorMsg = {};
    setErrors({});

    // validate email address
    if(!inputEmail){
      err.email = tErrMsg("emailRequired");
    } else if(!emailExp.test(inputEmail)){
      err.email = tErrMsg("invalidEmail");
    }

    // validate password
    if(!inputPassword) {
      err.password = tErrMsg("passwordRequired");
    } else if(inputPassword.length < 7){
      err.password = tErrMsg("passwordLength");
    }

    setErrors(err);
    if(Object.keys(err).length) return;

    seetIsProcessing(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
        email: inputEmail,
        password: inputPassword,
      })
    });

    const data = await res.json();

    if(res.status === 422 && data.message === "existing email") {
      setErrors({email: tErrMsg("usedEmail")});
      seetIsProcessing(false);
      return;
    }

    if(res.ok){
      const result = await signIn("credentials", {
        redirect: false,
        email: inputEmail,
        password: inputPassword,
      });

      if (!result || result?.error) {
        seetIsProcessing(false);
        return console.error("Signin failed");
      }else{
        router.push('/library');
      }
    }
  }

  const inputClassName = "mb-1 block px-4 py-2 rounded w-full";
  const labelClassName = "block mt-4 mb-1";

  return (
    <div className="w-1/2 mx-auto">
      <TitleText text={tForm("signupTitle")} className="mb-4" />
      <form onSubmit={handleSubmit} className="min-w-80">
        <div className="text-black mb-6" >
          <label className={labelClassName} htmlFor="email">{tForm("mailLabel")}</label>
          <input autoComplete="off" value={inputEmail} onChange={(e => setInputEmail(e.target.value))} className={inputClassName} type="email" id="email" />
          {errors.email && <ErrorMsg msg={errors.email} />}

          <label  className={labelClassName} htmlFor="password">{tForm("passwordLabel")}</label>
          <input value={inputPassword} onChange={(e => setInputPassword(e.target.value))} className={`${inputClassName}`} type="password" id="password" />
          {errors.password && <ErrorMsg msg={errors.password} />}
        </div>
        <div className="flex justify-end">
          <PrimaryButton label={isProcessing ? <ButtonLoadingAnimation /> : tButtons("signup")} disabled={isProcessing} />
        </div>
      </form>
      <div className="mt-5 text-right underline"><Link href="/login">{tLinks("login")}</Link></div>
    </div>
  );
}