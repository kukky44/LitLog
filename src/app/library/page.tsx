import MainLibrary from "../components/mainLibrary";
import { serverAuth } from "../lib/auth";
import { redirect } from "next/navigation";

export default async function Library() {
  const session = await serverAuth();
  const uid = session?.user.id;

  if(!session || !uid){
    redirect("/login");
  }

  return (
    <div className="">
      <MainLibrary />
    </div>
  );
}
