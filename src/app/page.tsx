import Link from "next/link";
import PrimaryButton from "./components/ui/buttons/primaryButton";
import { redirect } from "next/navigation";
import { serverAuth } from "./lib/auth";

export default async function Home() {
  const session = await serverAuth();
  if(session) redirect("/library");

  return (
    <div className="">
      <h2>LitLog</h2>
      <Link href="/signup">
        <PrimaryButton label="ユーザー登録" />
      </Link>
    </div>
  );
}
