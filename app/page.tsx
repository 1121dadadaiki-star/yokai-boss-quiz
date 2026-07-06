import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4">
          妖怪ウォッチ2 真打
        </h1>

        <h2 className="text-2xl text-gray-300 mb-10">
          ボス全部言えるかな！
        </h2>

        <Link
          href="/game"
          className="rounded-xl bg-red-600 px-8 py-4 text-xl font-bold text-white hover:bg-red-700 transition"
        >
          スタート
        </Link> 
      </div>
    </main>
  );
}