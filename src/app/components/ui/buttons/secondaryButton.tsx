import { MouseEventHandler, ReactElement } from "react"

type ButtonProps = {
  clickEvent?: MouseEventHandler<HTMLButtonElement>;
  label: ReactElement | string;
  className?: string;
  disabled?: boolean;
}

const SecondaryButton: React.FC<ButtonProps> = ({clickEvent, label, className, disabled}) => {
  return(
    <button onClick={clickEvent} type="submit" className={`rounded px-6 py-2 border border-violet-900 text-violet-900 transition bg-white hover:bg-violet-50 ${className} disabled:opacity-50`} disabled={disabled}>
      {label}
    </button>
  )
}

export default SecondaryButton;