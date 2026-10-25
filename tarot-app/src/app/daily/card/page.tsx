"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type CategoryKey =
  | "major"
  | "wands"
  | "cups"
  | "swords"
  | "pentacles";

type CategoryInfo = {
  label: string;
  icon: string;
  description: string;
};

const DEFAULT_THEME = "今日の私に必要なメッセージ";

const categories: Record<CategoryKey, CategoryInfo> = {
  major: {
    label: "大アルカナ",
    icon: "☀",
    description: "人生の大きなテーマ・転機",
  },
  wands: {
    label: "ワンド",
    icon: "🪄",
    description: "情熱・行動・意欲",
  },
  cups: {
    label: "カップ",
    icon: "♧",
    description: "感情・愛情・人間関係",
  },
  swords: {
    label: "ソード",
    icon: "†",
    description: "思考・判断・葛藤",
  },
  pentacles: {
    label: "ペンタクル",
    icon: "☆",
    description: "仕事・お金・現実",
  },
};

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
  const router = useRouter();

  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryKey | null>(null);
  const [selectedCard, setSelectedCard] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const themeParam = params.get("theme");

    if (themeParam?.trim()) {
      setTheme(themeParam.trim());
    }
  }, []);

  const cards =
    selectedCategory === "major" ? majorCards : minorCards;

  const chooseCategory = (category: CategoryKey) => {
    setSelectedCategory(category);
    setSelectedCard("");
  };

  const goToResult = (
    orientation: "upright" | "reversed"
  ) => {
    if (!selectedCategory || !selectedCard) return;

    const query = new URLSearchParams({
      category: selectedCategory,
      card: selectedCard,
      orientation,
      theme,
    });

    router.push(`/daily/result?${query.toString()}`);
  };

  return (
    <main className="page">
      <div className="stainedFrame">
        <div className="paper">
          <header className="header">
            <div className="sunMark">☀</div>
            <p className="eyebrow">YOUR CARD</p>
            <h1>引いたカードを選ぶ</h1>
            <p>
              まずカードの種類を選んでください。
              <br />
              その下にカード一覧が表示されます。
            </p>
          </header>

          <section className="themeBar">
            <span>今日のテーマ</span>
            <strong>{theme}</strong>

            <button
              type="button"
              onClick={() => router.push("/daily")}
            >
              変更する
            </button>
          </section>

          <section className="categorySection">
            <p className="stepLabel">1　カードの種類</p>

            <div className="categoryGrid">
              {(Object.keys(categories) as CategoryKey[]).map(
                (key) => {
                  const item = categories[key];
                  const selected = selectedCategory === key;

                  return (
                    <button
                      key={key}
                      type="button"
                      className={`categoryButton ${
                        selected ? "selected" : ""
                      }`}
                      onClick={() => chooseCategory(key)}
                    >
                      <span className="categoryIcon">
                        {item.icon}
                      </span>

                      <strong>{item.label}</strong>
                      <small>{item.description}</small>
                    </button>
                  );
                }
              )}
            </div>
          </section>

          {selectedCategory && (
            <section className="cardSection">
              <div className="cardSectionTitle">
                <div className="roundIcon">
                  {categories[selectedCategory].icon}
                </div>

                <div>
                  <p className="stepLabel">
                    2　カードを選ぶ
                  </p>

                  <h2>
                    {categories[selectedCategory].label}
                  </h2>

                  {selectedCategory === "major" ? (
                    <span>
                      0 愚者 〜 XXI 世界
                    </span>
                  ) : (
                    <span>
                      A〜10・PAGE・KNIGHT・QUEEN・KING
                    </span>
                  )}
                </div>
              </div>

              <div
                className={`cardGrid ${
                  selectedCategory === "major"
                    ? "majorGrid"
                    : ""
                }`}
              >
                {cards.map((card) => (
                  <button
                    key={card}
                    type="button"
                    className={`cardButton ${
                      selectedCard === card
                        ? "selectedCard"
                        : ""
                    }`}
                    onClick={() => setSelectedCard(card)}
                  >
                    {selectedCategory !== "major" && (
                      <span className="tinySuit">
                        {categories[selectedCategory].icon}
                      </span>
                    )}

                    <strong>{card}</strong>
                  </button>
                ))}
              </div>
            </section>
          )}

          {selectedCategory && selectedCard && (
            <section className="orientationSection">
              <p className="stepLabel">3　向きを選ぶ</p>

              <div className="chosenCard">
                <span>
                  {categories[selectedCategory].icon}
                </span>

                <div>
                  <small>
                    {categories[selectedCategory].label}
                  </small>

                  <strong>
                    {selectedCategory === "major"
                      ? selectedCard
                      : `${categories[selectedCategory].label}の${selectedCard}`}
                  </strong>
                </div>
              </div>

              <div className="orientationButtons">
                <button
                  type="button"
                  className="upright"
                  onClick={() => goToResult("upright")}
                >
                  <span>☀</span>
                  <strong>正位置</strong>
                  <small>この向きで読み解く</small>
                </button>

                <button
                  type="button"
                  className="reversed"
                  onClick={() => goToResult("reversed")}
                >
                  <span>☾</span>
                  <strong>逆位置</strong>
                  <small>この向きで読み解く</small>
                </button>
              </div>
            </section>
          )}
        </div>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: #f8fbfc;
        }

        button {
          font: inherit;
        }

        .page {
          min-height: 100vh;
          padding: 18px 10px 40px;
          color: #17243a;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            "Hiragino Sans",
            "Yu Gothic",
            sans-serif;
        }

        .stainedFrame {
          width: min(760px, 100%);
          margin: 0 auto;
          padding: 8px;
          border-radius: 32px;
          background:
            linear-gradient(
              135deg,
              #61ccef 0%,
              #61ccef 12%,
              #ffd94c 12%,
              #ffd94c 23%,
              #ff725f 23%,
              #ff725f 34%,
              #65cfae 34%,
              #65cfae 44%,
              #61ccef 44%,
              #61ccef 58%,
              #ffd94c 58%,
              #ffd94c 69%,
              #ff725f 69%,
              #ff725f 81%,
              #61ccef 81%,
              #61ccef 100%
            );
          box-shadow: 0 18px 45px rgba(28, 75, 108, 0.12);
        }

        .paper {
          position: relative;
          overflow: hidden;
          padding: 30px 18px 36px;
          border: 1px solid #e8c96c;
          border-radius: 26px;
          background: #fffefb;
        }

        .paper::before,
        .paper::after {
          position: absolute;
          z-index: 0;
          width: 95px;
          height: 95px;
          content: "";
          opacity: 0.48;
          pointer-events: none;
        }

        .paper::before {
          top: -40px;
          left: -40px;
          border-radius: 0 0 100% 0;
          background:
            linear-gradient(
              135deg,
              #65cef2 0 30%,
              #ffd850 30% 48%,
              #ff7560 48% 68%,
              #6ad3b1 68%
            );
        }

        .paper::after {
          right: -40px;
          bottom: -40px;
          border-radius: 100% 0 0 0;
          background:
            linear-gradient(
              315deg,
              #65cef2 0 30%,
              #ffd850 30% 48%,
              #ff7560 48% 68%,
              #6ad3b1 68%
            );
        }

        .header,
        .themeBar,
        .categorySection,
        .cardSection,
        .orientationSection {
          position: relative;
          z-index: 1;
        }

        .header {
          padding: 2px 10px 25px;
          text-align: center;
        }

        .sunMark {
          color: #dfa921;
          font-size: 31px;
        }

        .eyebrow {
          margin: 3px 0 6px;
          color: #b98220;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.18em;
        }

        .header h1 {
          margin: 0;
          font-family:
            "Hiragino Mincho ProN",
            "Yu Mincho",
            serif;
          font-size: clamp(29px, 7vw, 43px);
          font-weight: 600;
        }

        .header p:last-child {
          margin: 11px 0 0;
          color: #667085;
          font-size: 13px;
          line-height: 1.8;
        }

        .themeBar {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 4px 12px;
          margin-bottom: 18px;
          padding: 14px 16px;
          border: 1px dashed #e3c872;
          border-radius: 17px;
          background: #fffdf5;
        }

        .themeBar span {
          grid-column: 1;
          color: #9b7a20;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.08em;
        }

        .themeBar strong {
          grid-column: 1;
          font-family:
            "Hiragino Mincho ProN",
            "Yu Mincho",
            serif;
          font-size: 14px;
          font-weight: 600;
        }

        .themeBar button {
          grid-column: 2;
          grid-row: 1 / 3;
          align-self: center;
          padding: 7px 10px;
          border: 0;
          border-radius: 999px;
          background: #eef9fc;
          color: #2b99b8;
          font-size: 11px;
          font-weight: 800;
          cursor: pointer;
        }

        .categorySection,
        .cardSection,
        .orientationSection {
          margin-bottom: 17px;
          padding: 18px;
          border: 1px solid #e3e8eb;
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.94);
        }

        .stepLabel {
          margin: 0 0 11px;
          color: #aa7e22;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.08em;
        }

        .categoryGrid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 8px;
        }

        .categoryButton {
          display: grid;
          gap: 5px;
          justify-items: center;
          min-width: 0;
          min-height: 118px;
          padding: 13px 7px;
          border: 1px solid #e1e7ea;
          border-radius: 16px;
          background: #fff;
          color: #17243a;
          text-align: center;
          cursor: pointer;
          transition: 0.15s ease;
        }

        .categoryButton:hover {
          transform: translateY(-2px);
        }

        .categoryButton.selected {
          border-color: #59bee1;
          background: #f0fbff;
          box-shadow: 0 6px 15px rgba(74, 187, 225, 0.12);
        }

        .categoryIcon {
          display: grid;
          width: 38px;
          height: 38px;
          place-items: center;
          border-radius: 50%;
          background: #fff3c8;
          color: #bd8616;
          font-size: 20px;
        }

        .categoryButton strong {
          font-size: 13px;
        }

        .categoryButton small {
          color: #808b97;
          font-size: 9px;
          line-height: 1.5;
        }

        .cardSectionTitle {
          display: flex;
          gap: 12px;
          align-items: center;
          margin-bottom: 16px;
        }

        .roundIcon {
          display: grid;
          flex: 0 0 auto;
          width: 48px;
          height: 48px;
          place-items: center;
          border-radius: 50%;
          background: #fff0bd;
          color: #bb8313;
          font-size: 22px;
        }

        .cardSectionTitle .stepLabel {
          margin-bottom: 2px;
        }

        .cardSectionTitle h2 {
          margin: 0;
          font-family:
            "Hiragino Mincho ProN",
            "Yu Mincho",
            serif;
          font-size: 22px;
          font-weight: 600;
        }

        .cardSectionTitle span {
          color: #818b96;
          font-size: 10px;
        }

        .cardGrid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 8px;
        }

        .majorGrid {
          grid-template-columns: repeat(4, 1fr);
        }

        .cardButton {
          display: grid;
          gap: 4px;
          min-height: 62px;
          place-items: center;
          padding: 8px 5px;
          border: 1px solid #dde5e9;
          border-radius: 13px;
          background: #fbfdfe;
          color: #17243a;
          cursor: pointer;
        }

        .cardButton:hover {
          border-color: #66c7e8;
          background: #f5fcff;
        }

        .cardButton.selectedCard {
          border-color: #ff826f;
          background: #fff3f0;
          box-shadow: 0 4px 11px rgba(255, 114, 95, 0.1);
        }

        .cardButton strong {
          font-size: 11px;
          line-height: 1.4;
        }

        .tinySuit {
          color: #bd8616;
          font-size: 14px;
        }

        .chosenCard {
          display: flex;
          gap: 12px;
          align-items: center;
          margin-bottom: 15px;
          padding: 13px 15px;
          border-radius: 15px;
          background: #fffaf0;
        }

        .chosenCard > span {
          font-size: 27px;
        }

        .chosenCard div {
          display: grid;
          gap: 2px;
        }

        .chosenCard small {
          color: #a57b24;
          font-size: 10px;
          font-weight: 800;
        }

        .chosenCard strong {
          font-family:
            "Hiragino Mincho ProN",
            "Yu Mincho",
            serif;
          font-size: 18px;
        }

        .orientationButtons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .orientationButtons button {
          display: grid;
          gap: 4px;
          justify-items: center;
          min-height: 100px;
          padding: 14px 10px;
          border: 1px solid;
          border-radius: 18px;
          cursor: pointer;
        }

        .orientationButtons span {
          font-size: 25px;
        }

        .orientationButtons strong {
          font-size: 16px;
        }

        .orientationButtons small {
          color: #7d8792;
          font-size: 10px;
        }

        .upright {
          border-color: #ecd58c;
          background: #fffaf0;
          color: #9f741b;
        }

        .reversed {
          border-color: #cfdfed;
          background: #f4f9fd;
          color: #467b9d;
        }

        @media (max-width: 620px) {
          .page {
            padding: 7px 5px 24px;
          }

          .stainedFrame {
            padding: 5px;
            border-radius: 24px;
          }

          .paper {
            padding: 24px 11px 28px;
            border-radius: 20px;
          }

          .categorySection,
          .cardSection,
          .orientationSection {
            padding: 15px 12px;
          }

          .categoryGrid {
            grid-template-columns: repeat(2, 1fr);
          }

          .categoryButton:first-child {
            grid-column: 1 / 3;
          }

          .categoryButton {
            min-height: 92px;
          }

          .cardGrid {
            grid-template-columns: repeat(4, 1fr);
          }

          .majorGrid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </main>
  );
}