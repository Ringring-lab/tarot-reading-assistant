"use client";

import { useEffect, useState } from "react";

const categoryInfo: Record<
  string,
  { name: string; icon: string }
> = {
  major: {
    name: "大アルカナ",
    icon: "✨",
  },
  wands: {
    name: "ワンド",
    icon: "🪄",
  },
  cups: {
    name: "カップ",
    icon: "🏆",
  },
  swords: {
    name: "ソード",
    icon: "⚔️",
  },
  pentacles: {
    name: "ペンタクル",
    icon: "🪙",
  },
};

export default function ResultPage() {
  const [category, setCategory] = useState("");
  const [card, setCard] = useState("");
  const [orientation, setOrientation] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    setCategory(params.get("category") ?? "");
    setCard(params.get("card") ?? "");
    setOrientation(params.get("orientation") ?? "");
    setLoaded(true);
  }, []);

  const categoryData = categoryInfo[category];

  const orientationLabel =
    orientation === "upright"
      ? "☀️ 正位置"
      : orientation === "reversed"
        ? "🌙 逆位置"
        : "";

  if (!loaded) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#f8f6ff] to-white px-6 py-12 text-gray-900">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mt-32 text-4xl">🔮</div>

          <p className="mt-6 text-gray-500">
            カードを確認しています…
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f8f6ff] to-white px-6 py-12 text-gray-900">
      <div className="mx-auto max-w-2xl">
        <a
          href="/daily/card"
          className="mb-10 inline-block text-sm text-gray-500 transition hover:text-gray-900"
        >
          ← カード選択に戻る
        </a>

        <header className="mb-12 text-center">
          <div className="mb-4 text-5xl">🔮</div>

          <p className="text-lg font-bold tracking-wider text-[#5d4777]">
            STEP 3
          </p>

          <h1 className="mt-4 text-4xl font-bold">
            カードを読み解く
          </h1>

          <p className="mt-6 leading-8 text-gray-600">
            あなたが引いたカードが、
            <br />
            今日どんなことを伝えているのか見ていきます。
          </p>
        </header>

        {categoryData && card ? (
          <>
            <section className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
              <p className="text-sm text-gray-500">
                あなたが引いたカード
              </p>

              <p className="mt-5 text-xl font-bold">
                {categoryData.icon} {categoryData.name}
              </p>

              <p className="mt-2 text-3xl font-bold">
                {card}
              </p>

              {orientationLabel && (
                <div className="mt-6">
                  <span className="inline-block rounded-full bg-[#f1ebf8] px-5 py-2 font-bold text-[#4b3a60]">
                    {orientationLabel}
                  </span>
                </div>
              )}
            </section>

            <section className="mt-5 rounded-3xl bg-[#eeeaf4] p-7">
              <p className="text-sm font-medium text-gray-600">
                次の実装
              </p>

              <h2 className="mt-3 text-xl font-bold">
                このカードをAIと一緒に読み解きます
              </h2>

              <p className="mt-4 text-sm leading-7 text-gray-600">
                カードそのものの意味だけでなく、
                なぜその意味になるのか、
                正位置・逆位置でどう変わるのか、
                「今日の1枚」としてどう読めばいいのかまで
                分かりやすく表示します。
              </p>
            </section>
          </>
        ) : (
          <section className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <p className="font-bold">
              カード情報が見つかりませんでした
            </p>

            <a
              href="/daily/card"
              className="mt-6 inline-block rounded-2xl bg-[#29264f] px-6 py-3 font-bold text-white"
            >
              カードを選び直す
            </a>
          </section>
        )}
      </div>
    </main>
  );
}