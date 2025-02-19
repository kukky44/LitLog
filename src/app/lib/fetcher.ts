import { FetchErrorType } from "@/src/types";

export const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error:FetchErrorType = {};
    error.info = await res.json();
    error.status = res.status
    throw error;
  }

  return res.json();
}
