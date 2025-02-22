import { useTranslations } from "next-intl";

type RadioProps = {
  status: number
}

const labelBgColors = ["bg-violet-800", "bg-green-800", "bg-white"];
const labelTextColors = ["text-white", "text-white", "text-black"];

const ReadingStatusLabel: React.FC<RadioProps> = ({status}) => {
  const tReadingStatus = useTranslations("readingStatus");
  const statusLabels = [tReadingStatus("toRead"), tReadingStatus("reading"), tReadingStatus("finished")];

  return(
    <div>
      <span
        className={`rounded-full px-2 py-1 text-xs border border-gray-200 ${labelBgColors[status]} ${labelTextColors[status]}`}
      >
        {statusLabels[status]}
      </span>
    </div>
  )
}

export default ReadingStatusLabel;