"use client"

import { Link } from "@/src/i18n/routing";
import PrimaryButton from "../components/ui/buttons/primaryButton";
import SecondaryButton from "../components/ui/buttons/secondaryButton";
import { useTranslations } from "next-intl";

export default function Home() {
  const tHome = useTranslations("home");
  const tHowto = useTranslations("home.howto");
  const tButtons = useTranslations("buttons");
  const keys = ['registerBook', 'manageStatus', 'addNotes', 'review'];

  return (
    <div>
      <div className="mt-12">
        <h1 className="text-3xl font-bold">{tHome("copy")}</h1>
        <div className="mt-4">{tHome("desc")}</div>
        <div className="mt-8 flex gap-4">
          <Link href="/signup">
            <PrimaryButton label={tButtons("signup")} />
          </Link>
          <Link href="/login">
            <SecondaryButton label={tButtons("login")} />
          </Link>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold">{tHome('howtoTitle')}</h2>
        <ul className="mt-4 grid gap-4">
          {keys.map((key) => (
            <li key={key} className="px-6 py-4 bg-violet-50 rounded">
              <div className="pl-4">
                <div className="relative font-bold"><span className="top-2 absolute w-2 h-2 -left-4 block bg-violet-900 rounded-full"></span>{tHowto(`${key}.title`)}</div>
                <div className="text-pretty">{tHowto(`${key}.desc`)}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
