import { MouseEventHandler, ReactElement } from "react"

interface ButtonProps {
  label: ReactElement | string;
  disabled?: boolean;
  clickEvent?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const PrimaryButton: React.FC<ButtonProps> = ({clickEvent, label, className, disabled}) => {
  return(
    <button onClick={clickEvent} type="submit" className={`text-white rounded px-6 py-2 bg-violet-900 transition hover:bg-violet-800 ${className} disabled:opacity-50`} disabled={disabled}>
      {label}
    </button>
  )
}

export default PrimaryButton;