import { MouseEventHandler } from "react"

interface ButtonProps {
  clickEvent?: MouseEventHandler<HTMLButtonElement>;
  label: string;
  className?: string;
}

const SecondaryButton: React.FC<ButtonProps> = ({clickEvent, label, className}) => {
  return(
    <button onClick={clickEvent} type="submit" className={`rounded px-6 py-2 border border-violet-900 text-violet-900 transition bg-white hover:bg-violet-50 ${className}`}>
      {label}
    </button>
  )
}

export default SecondaryButton;