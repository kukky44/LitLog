interface RadioProps {
  status: number
}

const statusLabels = ["未読", "読書中", "読了"];
const labelBgColors = ["bg-violet-800", "bg-green-800", "bg-white"];
const labelTextColors = ["text-white", "text-white", "text-black"];

const ReadingStatusLabel: React.FC<RadioProps> = ({status}) => {

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