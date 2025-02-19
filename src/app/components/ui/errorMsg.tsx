type ErrorProps = {
  msg?: string;
}

export default function ErrorMsg({ msg }: ErrorProps) {
  return (
    <div className="text-red-600 mb-2 text-sm">
      {msg}
    </div>
  )
}