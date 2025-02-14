import { MouseEventHandler } from "react"

interface ButtonProps {
  label: string;
  clickEvent?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const PrimaryButton: React.FC<ButtonProps> = ({clickEvent, label, className}) => {
  return(
    <button onClick={clickEvent} type="submit" className={`text-white rounded px-6 py-2 bg-violet-900 transition hover:bg-violet-800 ${className}`}>
      {label}
    </button>
  )
}

export default PrimaryButton;