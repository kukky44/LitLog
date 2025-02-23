import { MemoType } from "@/src/types";
import { useTranslations } from "next-intl";

type MemoProps = {
  memo: MemoType;
}

const MemoItem: React.FC<MemoProps> = ({ memo }) => {
  const date: Date = new Date(memo.updatedAt);
  const tMemo = useTranslations("memo");
  const updateAat = date.toLocaleString("ja-JP", {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  return (
    <>
      {memo &&
        <div className="px-2 py-4">
          <div className="text-gray-600 flex justify-between items-center text-sm">
            <div>{updateAat}</div>
            <div className="flex items-center gap-1">
              <div className="text-xs">{tMemo("page")}</div>
              <div>{memo.pageNumber}</div>
            </div>
          </div>
          <div className="mt-2">
            {memo.content}
          </div>
          </div>
        }
    </>
  );
}

export default MemoItem;