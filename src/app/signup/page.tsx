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
}

const emailExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

export default function SignUp() {
  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [errors, setErrors] = useState<ErrorMsg>({});
  const router = useRouter();

  async function handleSubmit (e: React.FormEvent){
    e.preventDefault();
    let err: ErrorMsg = {};
    setErrors({});

    // validate email address
    if(!inputEmail){
      err.email = "メールアドレスを入力してください。";
    } else if(!emailExp.test(inputEmail)){
      err.email = "入力されたメールアドレスは有効ではありません";
    }

    // validate password
    if(!inputPassword) {
      err.password = "パスワードを入力してください。";
    } else if(inputPassword.length < 7){
      err.password = "パスワードは7文字以上で設定してください。"
    }

    setErrors(err);
    if(Object.keys(err).length) return;

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
      setErrors({email: "すでに存在するメールアドレスです。"});
      return;
    }

    if(res.ok){
      const result = await signIn("credentials", {
        redirect: false,
        email: inputEmail,
        password: inputPassword,
      });

      if (!result || result?.error) {

        return console.error("Signin failed");
      }else{
        console.log("signin success");

        router.push('/library');
      }
    }
  }

  const inputClassName = "mb-1 block px-4 py-2 rounded w-full";
  const labelClassName = "block mt-4 mb-1";

  return (
    <div className="w-1/2 mx-auto">
      <h2 className="mb-4 text-lg font-bold">ユーザー登録</h2>
      <form onSubmit={handleSubmit} className="min-w-80">
        <div className="text-black mb-6" >
          <label className={labelClassName} htmlFor="email">メールアドレス</label>
          <input autoComplete="off" value={inputEmail} onChange={(e => setInputEmail(e.target.value))} className={inputClassName} type="email" id="email" />
          {errors.email && <ErrorMsg msg={errors.email} />}

          <label  className={labelClassName} htmlFor="password">パスワード</label>
          <input value={inputPassword} onChange={(e => setInputPassword(e.target.value))} className={`${inputClassName}`} type="password" id="password" />
          {errors.password && <ErrorMsg msg={errors.password} />}
        </div>
        <div className="flex justify-end">
          <PrimaryButton label="登録" />
        </div>
      </form>
      <div className="mt-5 text-right underline"><Link href="/login">ログインはこちら</Link></div>
    </div>
  );
}