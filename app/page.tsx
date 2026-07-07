import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-white flex items-center justify-center px-6">
      <div className="text-center max-w-xl">

        <h1 className="text-5xl md:text-6xl font-extrabold">
          妖怪ウォッチ2 真打
        </h1>

        <p className="mt-4 text-xl text-gray-300">
          ボス全部言えるかな！
        </p>

        <div className="mt-10 rounded-2xl bg-slate-800 p-8 shadow-xl">

          <p className="text-lg">
            👹 ボス総数
          </p>

          <p className="mt-2 text-4xl font-bold text-yellow-400">
            43体
          </p>

          <Link
            href="/game"
            className="mt-8 block rounded-xl bg-red-600 py-4 text-2xl font-bold transition hover:bg-red-700"
          >
            ▶ ゲームスタート
          </Link>

        </div>

        <p className="mt-8 text-sm text-gray-500">
          Ver.1.0
        </p>

      </div>
    </main>
  );
}