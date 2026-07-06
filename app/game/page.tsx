"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { bosses } from "@/data/bosses";

export default function GamePage() {
  const [input, setInput] = useState("");
  const [answered, setAnswered] = useState<string[]>([]);
  const [time, setTime] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [gaveUp, setGaveUp] = useState(false);
  const [revealed, setRevealed] = useState<string[]>([]);

  const isComplete =
    answered.length === bosses.length || gaveUp;

  useEffect(() => {
    if (isComplete) return;

    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isComplete]);

  function checkAnswer() {
    const text = input.trim();

    const boss = bosses.find(
      (b) => b.name === text || b.yomi === text
    );

    if (boss && !answered.includes(boss.name)) {
      setAnswered([...answered, boss.name]);
    }

    setInput("");
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white p-4 sm:p-8 md:p-10">

      <h1 className="text-4xl font-bold text-center">
        妖怪ウォッチ2 真打
      </h1>

      <p className="text-center mt-3 text-xl">
        ボス全部言えるかな！
      </p>

      {isComplete && (
        <div className="mt-6 rounded-xl bg-yellow-400 p-6 text-center text-black">

          <h2 className="text-4xl font-bold">
            {gaveUp ? "🏳️ 降参！" : "🎉 COMPLETE!! 🎉"}
            {gaveUp ? (
              <>
                <p className="mt-4 text-xl">
                  自力で答えられた数
                </p>

                <p className="text-5xl font-bold">
                  {answered.length} / {bosses.length}
                </p>
              </>
            ) : (
              <>
                <p className="mt-4 text-xl">
                  クリアタイム
                </p>

                <p className="text-5xl font-bold">
                  {String(Math.floor(time / 60)).padStart(2, "0")}:
                  {String(time % 60).padStart(2, "0")}
                </p>
              </>
            )}
          </h2>

          {!gaveUp && (
            <>
              <p className="mt-4 text-xl">
                クリアタイム
              </p>

              <p className="text-5xl font-bold">
                {String(Math.floor(time / 60)).padStart(2, "0")}:
                {String(time % 60).padStart(2, "0")}
              </p>
            </>
          )}

        </div>
      )}

      <p className="text-center mt-6 text-3xl">
        ⏱️ {String(Math.floor(time / 60)).padStart(2, "0")}:
        {String(time % 60).padStart(2, "0")}
      </p>

      <p className="text-center mt-4 text-2xl">
        正解数 {answered.length} / {bosses.length}
      </p>

      <div className="flex flex-col sm:flex-row justify-center mt-8 gap-3">

        <input
          disabled={isComplete}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              checkAnswer();
            }
          }}
          placeholder="ボス名を入力"
          className="rounded-lg px-4 py-3 bg-slate-800 text-white placeholder:text-gray-400 w-full max-w-md"
        />

        <button
          disabled={isComplete}
          onClick={checkAnswer}
          className="bg-red-600 px-5 rounded-lg disabled:bg-gray-500"
        >
          決定
        </button>
        <button
          onClick={() => {
            if (!confirm("本当に降参しますか？")) return;
            const remaining = bosses
              .filter((boss) => !answered.includes(boss.name))
              .map((boss) => boss.name);

            setRevealed(remaining);
            setGaveUp(true);
          }}
          disabled={isComplete}
          className="bg-gray-600 px-5 rounded-lg disabled:bg-gray-500"
        >
          降参
        </button>

      </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-10">
        {bosses.map((boss) => (
          <div
            key={boss.id}
            className={`rounded-lg p-3 text-center transition-all duration-300 ${
              answered.includes(boss.name)
                ? "bg-green-600 scale-105"
                : revealed.includes(boss.name)
                ? "bg-blue-600"
                : "bg-slate-800"
            }`}
          >
            <div className="h-28 flex items-center justify-center">
              <Image
                src={boss.image}
                alt={boss.name}
                width={100}
                height={100}
                onClick={() => setSelectedImage(boss.image)}
                className="mx-auto rounded-lg cursor-pointer hover:scale-110 transition duration-200"
              />
            </div>

            <p className="mt-2 font-bold">
              {answered.includes(boss.name) || revealed.includes(boss.name)
                ? boss.name
                : "？？？？？"}
            </p>
          </div>
        ))}
      </div>

      {isComplete && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => {
              setAnswered([]);
              setInput("");
              setTime(0);
              setGaveUp(false);
              setRevealed([]);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="rounded-lg bg-blue-600 px-6 py-3 text-lg font-bold hover:bg-blue-700 transition-colors"
          >
            もう一回遊ぶ
          </button>
        </div>
      )}
    {selectedImage && (
      <div
        onClick={() => setSelectedImage(null)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative"
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute -top-4 -right-4 bg-white text-black rounded-full w-10 h-10 text-xl font-bold hover:bg-gray-200"
          >
            ×
          </button>

          <Image
            src={selectedImage}
            alt="拡大画像"
            width={700}
            height={700}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-xl"
          />
        </div>
      </div>
    )}
    </main>
  );
}