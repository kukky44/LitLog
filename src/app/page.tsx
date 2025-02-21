"use client"

import Link from "next/link";
import PrimaryButton from "./components/ui/buttons/primaryButton";
import SecondaryButton from "./components/ui/buttons/secondaryButton";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const howto = [
  {
    title: "本を登録",
    desc: "読みたい本を登録。検索フォームから本を探すこともできます（Google Books APIより）。"
  },
  {
    title: "読書ステータスを管理",
    desc: "「未読・読書中・読了」の読書状況を設定。"
  },
  {
    title: "メモを追加",
    desc: "気づきや感想を本ごとにスレッド型で記録。"
  },
  {
    title: "振り返り",
    desc: "過去の読書記録を見返して、新しい発見を。"
  },
]

export default function Home() {
  const {data: session} = useSession();
  const router = useRouter();
  if(session) router.push("/library");

  return (
    <div>
      <div className="mt-12">
        <h1 className="text-3xl font-bold">読む、記録する、振り返る。</h1>
        <div className="mt-4">LitLogは、書籍を登録し、読書の進捗を管理しながらメモを残せる読書ログアプリです。</div>
        <div className="mt-8 flex gap-4">
          <Link href="/signup">
            <PrimaryButton label="ユーザー登録" />
          </Link>
          <Link href="/login">
            <SecondaryButton label="ログイン" />
          </Link>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold">使い方</h2>
        <ul className="mt-4 grid gap-4">
          {howto.map((item, index) => (
            <li key={index} className="px-6 py-4 bg-violet-50 rounded">
              <div className="pl-4">
                <div className="relative font-bold"><span className="top-2 absolute w-2 h-2 -left-4 block bg-violet-900 rounded-full"></span>{item.title}</div>
                <div>{item.desc}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
