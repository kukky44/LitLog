"use client"

import { useRouter } from "@/src/i18n/routing";
import { useLocale } from "next-intl";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const statusLabels = ["あ", "A"];
const locales = ["ja", "en"];

const LangSwitcher: React.FC = () => {
  const [radioValue, setRadioValue] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const params = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try{
      const val = Number(e.target.value);
      if(val < 0 || val > 1) return console.log("invalid reading status number");
      setRadioValue(val);

      const newLocale = locales[val];
      localStorage.setItem("NEXT_LOCALE", newLocale);
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/;`;

      changeLocale(newLocale);
    } catch (e) {
      console.log(e);
    }
  }

  const changeLocale = useCallback((targetLocale: string) => {
    let newPath = pathname.replace(`/${locale}`, "");
    if(newPath === "") newPath = "/";

    const searchParam = params.toString();
    const query = searchParam ? `?${searchParam}` : "";
    if(query) newPath += query;

    router.push(newPath, { locale: targetLocale });
  }, [pathname, router, locale, params]);

  useEffect(() => {
    const savedLocale = localStorage.getItem("NEXT_LOCALE") || "ja";
    if(locale !== savedLocale) {
      changeLocale(savedLocale);
    }
    document.cookie = `NEXT_LOCALE=${savedLocale}; path=/;`;
    setRadioValue(locales.findIndex((lc => lc === savedLocale)));
  }, [locale, changeLocale]);

  return(
    <div className="flex">
      {statusLabels.map((sLabel, index) => (
        <label
          className="py-0.5 first:pl-0.5 last:pr-0.5 box-border first:rounded-l-full first:border-r-0 last:rounded-r-full last:border-l-0 cursor-pointer border border-gray-200"
          key={index}
          htmlFor={`radio-${index}`}
        >
          <input
            className="hidden"
            type="radio"
            name="readingstatus"
            id={`radio-${index}`}
            onChange={handleChange}
            checked={index === radioValue}
            value={index}
            />
          <span
            className={`text-sm flex items-center text-center w-8 h-8 justify-center rounded-full ${
              index === radioValue ? 'bg-violet-900 text-white' : 'text-black'
            }`}
          >
            {sLabel}
          </span>
        </label>
      ))}
    </div>
  )
}

export default LangSwitcher;