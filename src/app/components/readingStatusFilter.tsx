import { useTranslations } from "next-intl";

type ButtonProps = {
  selectedStatus: number;
  setSelectedStatus: React.Dispatch<React.SetStateAction<number>>;
}


const ReadingStatusFilter: React.FC<ButtonProps> = ({selectedStatus, setSelectedStatus}) => {
  const tReadingStatus = useTranslations("readingStatus");
  const radioLabels = [tReadingStatus("all"), tReadingStatus("toRead"), tReadingStatus("reading"), tReadingStatus("finished")];

  const clickEvent = (index: number) => {
    setSelectedStatus(index);
  }

  return (
    <div className="flex gap-2 mb-6">
      {radioLabels.map((label, index) => (
        <button key={label} onClick={() => clickEvent(index)} data-index={index} type="submit" className={`rounded-full px-4 py-2 text-sm border border-gray-400 text-gray-600 hover:opacity-90 ${selectedStatus === index ? "bg-violet-900 text-white border-violet-900" : "bg-gray-100"}`}>
          {label}
        </button>
      ))}
    </div>
  )
}

export default ReadingStatusFilter;