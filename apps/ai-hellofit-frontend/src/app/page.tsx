import { redirect } from "next/navigation";

export default function Home() {
  redirect("/social");
  return (
    <div className="">
      <div className="bg-orange--10 text-white">버튼</div>
    </div>
  );
}
