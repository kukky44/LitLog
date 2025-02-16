import Link from "next/link";
import PrimaryButton from "./components/ui/buttons/primaryButton";
import { serverAuth } from "./lib/auth";

export default async function Home() {
  const session = await serverAuth();

  return (
    <div className="">
      <h2>LitLog</h2>
      {!session &&
        <Link href="/signup">
          <PrimaryButton label="ユーザー登録" />
        </Link>
      }
    </div>
  );
}
