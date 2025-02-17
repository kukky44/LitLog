"use client"

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import PrimaryButton from "../components/ui/buttons/primaryButton";
import Link from "next/link";
import ErrorMsg from "../components/ui/errorMsg";

interface ErrorMsg {
  email?: string;
  password?: string;
  invalid?: string;
}

export default function Login() {
  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [errors, setErrors] = useState<ErrorMsg>({});
  const router = useRouter();

  async function handleSubmit (e: React.FormEvent){
    const err: ErrorMsg = {};
    e.preventDefault();

    // validate email address
    if(!inputEmail){
      err.email = "メールアドレスを入力してください。";
    }

    // validate password
    if(!inputPassword) {
      err.password = "パスワードを入力してください。";
    }

    setErrors(err);
    if(Object.keys(err).length) return;

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: inputEmail,
        password: inputPassword,
      });
      if (!result || result?.error) {
        setErrors({invalid: "メールアドレスまたはパスワードが正しくありません。"});
        return;
      }else{
        console.log("signin success");
        router.push('/library');
      }
    } catch(e) {
      console.log(e);
      setErrors({invalid: "メールアドレスまたはパスワードが正しくありません。"});
      return;
    }
  }

  const inputClassName = "mb-1 block px-4 py-2 rounded w-full";
  const labelClassName = "block mt-4 mb-1";

  return (
    <div className="w-1/2 mx-auto">
      <h2 className="mb-4 text-lg font-bold">ログイン</h2>
      <form onSubmit={handleSubmit} className="min-w-80">
        <div className="text-black mb-6" >
          {errors.invalid && <ErrorMsg msg={errors.invalid} />}
          <label className={labelClassName} htmlFor="email">メールアドレス</label>
          <input value={inputEmail} onChange={(e => setInputEmail(e.target.value))} className={inputClassName} type="email" id="email" />
          {errors.email && <ErrorMsg msg={errors.email} />}

          <label  className={labelClassName} htmlFor="password">パスワード</label>
          <input value={inputPassword} onChange={(e => setInputPassword(e.target.value))} className={`${inputClassName}`} type="password" id="password" />
          {errors.password && <ErrorMsg msg={errors.password} />}
        </div>
        <div className="flex justify-end">
          <PrimaryButton label="ログイン" />
        </div>
      </form>
      <div className="text-right mt-5 underline"><Link href="/signup">ユーザー登録はこちら</Link></div>
    </div>
  );
}