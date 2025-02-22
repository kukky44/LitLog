import { useLocale } from "next-intl";

type TextProp = {
  text: string;
  className?: string;
}

const TitleText: React.FC<TextProp> = ({ text, className }) => {
  const locale = useLocale();
  return (
    <div className={`font-bold ${locale === "en" ? "text-xl" : "text-lg"} ${className}`}>{text}</div>
  )
}

export default TitleText;