"use client"

import { useState } from "react";

interface RadioProps {
  bookId: string;
  status: number;
}

const statusLabels = ["未読", "読書中", "読了"];


const ReadingStatusRadio: React.FC<RadioProps> = ({bookId, status}) => {
  const [radioValue, setRadioValue] = useState(status);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try{
      const val = Number(e.target.value);
      if(val < 0 || val > 2) return console.log("invalid reading status number");
      setRadioValue(val);

      fetch("/api/updateReadingStatus", {
        method: "PATCH",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
          bookId: bookId,
          readingStatus: val
        })
      })
      .then(res => res.json())
      .catch(e => console.log(e)
      )

    } catch (e) {
      console.log(e);
    }
  }

  return(
    <div className="flex text-sm w-fit">
      {statusLabels.map((sLabel, index) => (
        <label
          className={`py-2 px-3 first:pl-4 last:pr-4 box-border first:rounded-l-full first:border-r-0 last:rounded-r-full last:border-l-0 cursor-pointer border border-gray-200 has-[input:checked]:bg-violet-800 has-[input:checked]:text-white has-[input:checked]:border-violet-800`}
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
          {sLabel}
        </label>
      ))}
    </div>
  )
}

export default ReadingStatusRadio;