"use client";

import { useState } from "react";

const categories = [
  {
    id: "major",
    icon: "✨",
    name: "大アルカナ",
    help: "愚者・魔術師・女教皇など",
  },
  {
    id: "wands",
    icon: "🪄",
    name: "ワンド",
    help: "杖・棒",
  },
  {
    id: "cups",
    icon: "🏆",
    name: "カップ",
    help: "杯",
  },
  {
    id: "swords",
    icon: "⚔️",
    name: "ソード",
    help: "剣",
  },
  {
    id: "pentacles",
    icon: "🪙",
    name: "ペンタクル",
    help: "コイン・金貨",
  },
];

const majorCards = [
  "0 愚者",
  "I 魔術師",
  "II 女教皇",
  "III 女帝",
  "IV 皇帝",
  "V 教皇",
  "VI 恋人",
  "VII 戦車",
  "VIII 力",
  "IX 隠者",
  "X 運命の輪",
  "XI 正義",
  "XII 吊るされた男",
  "XIII 死神",
  "XIV 節制",
  "XV 悪魔",
  "XVI 塔",
  "XVII 星",
  "XVIII 月",
  "XIX 太陽",
  "XX 審判",
  "XXI 世界",
];

const minorCards = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "PAGE",
  "KNIGHT",
  "QUEEN",
  "KING",
];

export default function CardPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [orientation, setOrientation] = useState<
    "upright" | "reversed" | null
  >(null);

  const selectedCategoryData = categories.find(
    (category) => category.id === selectedCategory
  );

  const cards =
    selectedCategory === "major"
      ? majorCards
      : selectedCategory
        ? minorCards
        : [];

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedCard(null);
    setOrientation(null);
  };

  const handleCardSelect = (card: string) => {
    setSelectedCard(card);
    setOrientation(null);
  };

  const handleReadCard = () => {
    if (!selectedCategory || !selectedCard || !orientation) return;

    const params = new URLSearchParams({
      category: selectedCategory,
      card: selectedCard,
      orientation,
    });

    window.location.href = `/daily/result?${params.toString()}`;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f8f6ff] to-white px-5 py-10 text-gray-900">
      <div className="mx-auto max-w-2xl">
        <a
          href="/daily"
          className="mb-10 inline-block text-sm text-gray-500 hover:text-gray-900"
        >
          ← 今日の1枚に戻る
        </a>

        <header className="mb-12 text-center">
          <div className="mb-4 text-5xl">🔮</div>

          <p className="font-semibold tracking-wide text-[#5d4777]">STEP 2</p>

          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            引いたカードを教えてください
          </h1>

          <p className="mt-5 leading-7 text-gray-600">
            実物のカードを1枚引いたら、
            <br />
            そのカードを下から選んでください。
          </p>
        </header>

        <section>
          <h2 className="mb-5 text-xl font-bold">① カードの種類を選ぶ</h2>

          <div className="space-y-3">
            {categories.map((category) => {
              const isSelected = selectedCategory === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleCategorySelect(category.id)}
                  className={`w-full rounded-3xl border p-5 text-left transition ${
                    isSelected
                      ? "border-[#5d4777] bg-[#f1ebf8] shadow-sm"
                      : "border-gray-200 bg-white hover:bg-gray-50"
                  }`}
                >
                  <div className="text-2xl">{category.icon}</div>

                  <div className="mt-2 text-xl font-bold">{category.name}</div>

                  <div className="mt-1 text-sm text-gray-500">
                    {category.help}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {selectedCategory && (
          <section className="mt-10">
            <h2 className="text-xl font-bold">② カードを選ぶ</h2>

            <p className="mt-2 text-sm text-gray-500">
              {selectedCategoryData?.icon} {selectedCategoryData?.name}
            </p>

            <div
              className={`mt-6 grid gap-3 ${
                selectedCategory === "major" ? "grid-cols-2" : "grid-cols-4"
              }`}
            >
              {cards.map((card) => {
                const isSelected = selectedCard === card;

                return (
                  <button
                    key={card}
                    type="button"
                    onClick={() => handleCardSelect(card)}
                    className={`min-h-20 rounded-2xl border px-3 py-4 font-medium transition ${
                      isSelected
                        ? "border-[#29264f] bg-[#29264f] text-white shadow-sm"
                        : "border-gray-200 bg-white hover:bg-gray-50"
                    }`}
                  >
                    {card}
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {selectedCard && (
          <section className="mt-10 rounded-3xl bg-[#f1ebf8] p-6">
            <p className="text-center text-sm text-gray-500">選んだカード</p>

            <div className="mt-2 text-center text-xl font-bold">
              {selectedCategoryData?.icon} {selectedCategoryData?.name}
              <br />
              {selectedCard}
            </div>

            <h2 className="mt-8 text-center text-xl font-bold">
              ③ カードの向きを選ぶ
            </h2>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setOrientation("upright")}
                className={`rounded-2xl border px-4 py-4 font-bold transition ${
                  orientation === "upright"
                    ? "border-[#29264f] bg-[#29264f] text-white"
                    : "border-gray-200 bg-white hover:bg-gray-50"
                }`}
              >
                ☀️ 正位置
              </button>

              <button
                type="button"
                onClick={() => setOrientation("reversed")}
                className={`rounded-2xl border px-4 py-4 font-bold transition ${
                  orientation === "reversed"
                    ? "border-[#29264f] bg-[#29264f] text-white"
                    : "border-gray-200 bg-white hover:bg-gray-50"
                }`}
              >
                🌙 逆位置
              </button>
            </div>

            <button
              type="button"
              disabled={!orientation}
              onClick={handleReadCard}
              className={`mt-6 w-full rounded-2xl px-6 py-4 font-bold transition ${
                orientation
                  ? "bg-[#29264f] text-white hover:opacity-90"
                  : "cursor-not-allowed bg-gray-300 text-gray-500"
              }`}
            >
              このカードを読む
            </button>
          </section>
        )}
      </div>
    </main>
  );
}