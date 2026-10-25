"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import rwsTarotImages from "../../data/rwsTarotImages.generated.json";

type TarotReading = {
  category: string;
  card: string;
  orientation: string;
  theme: string;
};

type TarotImageEntry = {
  category: string;
  card: string;
  imagePath: string;
  sourceTitle?: string;
  sourcePage?: string;
  license?: string;
  usageTerms?: string;
  artist?: string;
  sourceSet?: string;
};

const tarotImageManifest =
  rwsTarotImages as Record<string, TarotImageEntry>;

const DEFAULT_THEME = "今日の私に必要なメッセージ";

const categoryInfo: Record<
  string,
  {
    label: string;
    icon: string;
    subtitle: string;
  }
> = {
  major: {
    label: "大アルカナ",
    icon: "☀",
    subtitle: "人生の大きなテーマ",
  },
  wands: {
    label: "ワンド",
    icon: "🪄",
    subtitle: "情熱・行動",
  },
  cups: {
    label: "カップ",
    icon: "♧",
    subtitle: "感情・愛情",
  },
  swords: {
    label: "ソード",
    icon: "†",
    subtitle: "思考・判断",
  },
  pentacles: {
    label: "ペンタクル",
    icon: "☆",
    subtitle: "仕事・お金・現実",
  },
};

const cardNames: Record<string, string> = {
  A: "エース",
  PAGE: "ペイジ",
  KNIGHT: "ナイト",
  QUEEN: "クイーン",
  KING: "キング",
};

function getCardName(card: string) {
  return cardNames[card] ?? card;
}

function getOrientationLabel(orientation: string) {
  if (orientation === "upright") return "正位置";
  if (orientation === "reversed") return "逆位置";
  return orientation;
}

function cleanMarkdown(text: string) {
  return text
    .replace(/\*\*/g, "")
    .replace(/^#{1,6}\s*/gm, "")
    .replace(/^---+$/gm, "")
    .replace(/^\s*[-*]\s+/gm, "・")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function extractSections(reading: string) {
  const cleaned = cleanMarkdown(reading);

  const matches = [
    ...cleaned.matchAll(
      /【?\s*([1-4])\.\s*([^】\n]+)】?\s*([\s\S]*?)(?=【?\s*[1-4]\.\s*[^】\n]+】?|$)/g
    ),
  ];

  const result: Record<string, string> = {};

  matches.forEach((match) => {
    result[match[1]] = match[3].trim();
  });

  return result;
}

export default function ResultPage() {
  const [selected, setSelected] =
    useState<TarotReading | null>(null);

  const [reading, setReading] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const runReading = async () => {
      try {
        setLoading(true);
        setError("");
        setReading("");

        const params = new URLSearchParams(
          window.location.search
        );

        const category =
          params.get("category") ?? "";

        const card =
          params.get("card") ?? "";

        const orientation =
          params.get("orientation") ?? "";

        const theme =
          params.get("theme")?.trim() ||
          DEFAULT_THEME;

        if (!category || !card || !orientation) {
          throw new Error(
            "カード情報が見つかりませんでした。"
          );
        }

        const cardData: TarotReading = {
          category,
          card,
          orientation,
          theme,
        };

        setSelected(cardData);

        const response = await fetch("/api/tarot", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cardData),
          signal: controller.signal,
        });

        const responseText =
          await response.text();

        if (!responseText.trim()) {
          throw new Error(
            "AIからの返答が途中で止まりました。もう一度お試しください。"
          );
        }

        let data: {
          reading?: string;
          error?: string;
        };

        try {
          data = JSON.parse(responseText);
        } catch {
          throw new Error(
            "鑑定結果をうまく受け取れませんでした。もう一度お試しください。"
          );
        }

        if (!response.ok) {
          throw new Error(
            data.error ??
              "鑑定結果を取得できませんでした。"
          );
        }

        if (!data.reading) {
          throw new Error(
            "鑑定結果が空でした。"
          );
        }

        setReading(data.reading);
      } catch (err) {
        if (controller.signal.aborted) return;

        const message =
          err instanceof Error
            ? err.message
            : "鑑定中にエラーが発生しました。";

        setError(message);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    runReading();

    return () => {
      controller.abort();
    };
  }, [retryCount]);

  const category =
    categoryInfo[selected?.category ?? ""] ?? {
      label: selected?.category ?? "",
      icon: "✦",
      subtitle: "",
    };

  const sections = extractSections(reading);

  const displayedCardName =
    selected?.category === "major"
      ? getCardName(selected.card)
      : `${category.label}の${getCardName(
          selected?.card ?? ""
        )}`;

  const imageKey = selected
    ? `${selected.category}|${selected.card}`
    : "";

  const tarotImage = imageKey
    ? tarotImageManifest[imageKey]
    : undefined;

  const isReversed =
    selected?.orientation === "reversed";

  const sectionList = [
    {
      title: "今日の1枚として",
      icon: "☀",
      className: "today",
      text: sections["3"] ?? "",
    },
    {
      title: "今日のヒント",
      icon: "🌱",
      className: "hint",
      text: sections["4"] ?? "",
    },
    {
      title: "このカードの基本",
      icon: "▤",
      className: "basic",
      text: sections["1"] ?? "",
    },
    {
      title: "なぜこう読むの？",
      icon: "✦",
      className: "why",
      text: sections["2"] ?? "",
    },
  ];

  return (
    <main className="page">
      <div className="stainedFrame">
        <div className="paper">
          <header className="header">
            <div className="sunMark">☀</div>

            <p className="eyebrow">
              DAILY TAROT
            </p>

            <h1>
              今日のカードからのメッセージ
            </h1>

            <p className="lead">
              あなたが引いた1枚を、
              <br className="mobileBreak" />
              今日という一日に重ねて読み解きます。
            </p>
          </header>

          {selected && (
            <>
              <section className="themeBar">
                <span>今回のテーマ</span>
                <strong>{selected.theme}</strong>
              </section>

              <section className="cardHero">
                <div className="tarotCard">
                  {tarotImage ? (
                    <img
                      src={tarotImage.imagePath}
                      alt={`${displayedCardName}・${getOrientationLabel(
                        selected.orientation
                      )}`}
                      className={`tarotImage ${
                        isReversed
                          ? "tarotImageReversed"
                          : ""
                      }`}
                    />
                  ) : (
                    <>
                      <div className="glassTop" />

                      <div className="cardSymbol">
                        {category.icon}
                      </div>

                      <div className="miniCategory">
                        {category.label}
                      </div>

                      <div className="cardName">
                        {getCardName(
                          selected.card
                        )}
                      </div>

                      <div className="cardPosition">
                        {getOrientationLabel(
                          selected.orientation
                        )}
                      </div>

                      <div className="glassBottom" />
                    </>
                  )}
                </div>

                <div className="cardInfo">
                  <div className="suitCircle">
                    {category.icon}
                  </div>

                  <p className="categoryName">
                    {category.label}
                  </p>

                  <h2>{displayedCardName}</h2>

                  <span className="orientationBadge">
                    {getOrientationLabel(
                      selected.orientation
                    )}
                  </span>

                  <p className="categorySubtitle">
                    {category.subtitle}
                  </p>

                  <div className="tinyDecoration">
                    <span>✦</span>
                    <span>🌼</span>
                    <span>✦</span>
                  </div>
                </div>
              </section>
            </>
          )}

          {loading && (
            <section className="loadingBox">
              <div className="loadingIcon">
                ☀
              </div>

              <h2>
                カードを読み解いています
              </h2>

              <p>
                あなたのテーマと今日の1枚を重ねて、
                <br />
                メッセージを言葉にしています。
              </p>

              <div className="dots">
                <span />
                <span />
                <span />
              </div>
            </section>
          )}

          {!loading && error && (
            <section className="errorBox">
              <div className="errorIcon">
                ✦
              </div>

              <h2>
                もう一度読み解いてみましょう
              </h2>

              <p>{error}</p>

              <button
                type="button"
                className="retryButton"
                onClick={() =>
                  setRetryCount(
                    (count) => count + 1
                  )
                }
              >
                もう一度読み解く
              </button>

              <Link
                href="/daily"
                className="subLink"
              >
                最初から選び直す
              </Link>
            </section>
          )}

          {!loading &&
            !error &&
            reading && (
              <section className="readingArea">
                {sectionList.map(
                  (section) => {
                    if (!section.text) {
                      return null;
                    }

                    return (
                      <article
                        key={section.title}
                        className={`readingCard ${section.className}`}
                      >
                        <div
                          className={`sectionIcon ${section.className}Icon`}
                        >
                          {section.icon}
                        </div>

                        <div className="sectionContent">
                          <h2>
                            {section.title}
                          </h2>

                          <p>
                            {section.text}
                          </p>
                        </div>

                        <span className="sparkle">
                          ✦
                        </span>
                      </article>
                    );
                  }
                )}

                {!sections["1"] &&
                  !sections["2"] &&
                  !sections["3"] &&
                  !sections["4"] && (
                    <article className="readingCard fallback">
                      <div className="sectionIcon fallbackIcon">
                        ✦
                      </div>

                      <div className="sectionContent">
                        <h2>
                          カードからのメッセージ
                        </h2>

                        <p>
                          {cleanMarkdown(
                            reading
                          )}
                        </p>
                      </div>
                    </article>
                  )}

                <div className="actions">
                  <Link
                    href="/daily"
                    className="primaryLink"
                  >
                    今日の1枚をもう一度読む
                  </Link>

                  <Link
                    href="/"
                    className="homeLink"
                  >
                    ホームへ戻る
                  </Link>
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
          box-shadow:
            0 18px 45px
            rgba(28, 75, 108, 0.12);
        }

        .paper {
          position: relative;
          overflow: hidden;
          min-height: 90vh;
          padding: 29px 18px 36px;
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
          border-radius:
            0 0 100% 0;
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
          border-radius:
            100% 0 0 0;
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
        .cardHero,
        .loadingBox,
        .errorBox,
        .readingArea {
          position: relative;
          z-index: 1;
        }

        .header {
          padding: 2px 10px 23px;
          text-align: center;
        }

        .sunMark {
          color: #dda923;
          font-size: 31px;
        }

        .eyebrow {
          margin: 3px 0 6px;
          color: #c58b1f;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.19em;
        }

        .header h1 {
          margin: 0;
          font-family:
            "Hiragino Mincho ProN",
            "Yu Mincho",
            serif;
          font-size:
            clamp(
              28px,
              7vw,
              42px
            );
          font-weight: 600;
          line-height: 1.35;
        }

        .lead {
          margin: 11px auto 0;
          max-width: 540px;
          color: #667085;
          font-size: 13px;
          line-height: 1.8;
        }

        .mobileBreak {
          display: none;
        }

        .themeBar {
          display: grid;
          gap: 4px;
          margin-bottom: 17px;
          padding: 13px 16px;
          border:
            1px dashed #e2c76e;
          border-radius: 17px;
          background: #fffdf5;
          text-align: center;
        }

        .themeBar span {
          color: #9e7a1f;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.09em;
        }

        .themeBar strong {
          font-family:
            "Hiragino Mincho ProN",
            "Yu Mincho",
            serif;
          font-size: 15px;
          font-weight: 600;
        }

        .cardHero {
          display: grid;
          grid-template-columns:
            145px 1fr;
          gap: 20px;
          align-items: center;
          margin-bottom: 20px;
          padding: 18px;
          border:
            1px solid #eadba7;
          border-radius: 22px;
          background:
            linear-gradient(
              135deg,
              rgba(
                101,
                206,
                242,
                0.1
              ),
              rgba(
                255,
                255,
                255,
                0.97
              ) 45%,
              rgba(
                255,
                216,
                80,
                0.1
              )
            );
        }

        .tarotCard {
          position: relative;
          display: flex;
          overflow: hidden;
          width: 100%;
          aspect-ratio: 0.58;
          align-items: center;
          justify-content: center;
          border:
            2px solid #d7ac3c;
          border-radius: 10px;
          background: #fff9dd;
          box-shadow:
            0 9px 20px
            rgba(74, 63, 28, 0.12);
          text-align: center;
        }

        .tarotImage {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: rotate(0deg);
          transition:
            transform 0.25s ease;
        }

        .tarotImageReversed {
          transform: rotate(180deg);
        }

        .glassTop,
        .glassBottom {
          position: absolute;
          left: 0;
          width: 100%;
          height: 28%;
          background:
            linear-gradient(
              135deg,
              #65cef2 0 26%,
              #ffd850 26% 46%,
              #ff7560 46% 66%,
              #6ad3b1 66% 82%,
              #257ab8 82%
            );
        }

        .glassTop {
          top: 0;
          clip-path:
            polygon(
              0 0,
              100% 0,
              100% 65%,
              50% 100%,
              0 65%
            );
        }

        .glassBottom {
          bottom: 0;
          clip-path:
            polygon(
              0 35%,
              50% 0,
              100% 35%,
              100% 100%,
              0 100%
            );
        }

        .cardSymbol {
          position: absolute;
          top: 35%;
          right: 0;
          left: 0;
          color: #cc9518;
          font-size: 37px;
        }

        .miniCategory {
          position: absolute;
          top: 51%;
          right: 0;
          left: 0;
          color: #906816;
          font-size: 10px;
          font-weight: 800;
        }

        .cardName {
          position: absolute;
          top: 59%;
          right: 8px;
          left: 8px;
          font-family:
            "Hiragino Mincho ProN",
            "Yu Mincho",
            serif;
          font-size: 17px;
          font-weight: 700;
        }

        .cardPosition {
          position: absolute;
          top: 70%;
          right: 0;
          left: 0;
          color: #df6250;
          font-size: 10px;
          font-weight: 800;
        }

        .suitCircle {
          display: grid;
          width: 47px;
          height: 47px;
          place-items: center;
          margin-bottom: 9px;
          border-radius: 50%;
          background: #fff0bd;
          color: #bd8515;
          font-size: 23px;
        }

        .categoryName {
          margin: 0 0 4px;
          color: #bd8417;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.08em;
        }

        .cardInfo h2 {
          margin: 0;
          font-family:
            "Hiragino Mincho ProN",
            "Yu Mincho",
            serif;
          font-size:
            clamp(
              24px,
              6vw,
              35px
            );
          font-weight: 600;
        }

        .orientationBadge {
          display: inline-flex;
          margin-top: 10px;
          padding: 6px 11px;
          border-radius: 999px;
          background: #fff0ed;
          color: #df604f;
          font-size: 11px;
          font-weight: 900;
        }

        .categorySubtitle {
          margin: 13px 0 0;
          color: #697482;
          font-size: 12px;
        }

        .tinyDecoration {
          display: flex;
          gap: 7px;
          align-items: center;
          margin-top: 14px;
          color: #d6a01e;
          font-size: 18px;
        }

        .loadingBox,
        .errorBox {
          margin-top: 18px;
          padding: 38px 22px;
          border:
            1px solid #dcebf2;
          border-radius: 22px;
          background: #f8fdff;
          text-align: center;
        }

        .loadingIcon,
        .errorIcon {
          color: #e2a820;
          font-size: 35px;
        }

        .loadingBox h2,
        .errorBox h2 {
          margin: 10px 0 8px;
          font-size: 20px;
        }

        .loadingBox p,
        .errorBox p {
          margin: 0;
          color: #667085;
          font-size: 13px;
          line-height: 1.8;
        }

        .dots {
          display: flex;
          gap: 7px;
          justify-content: center;
          margin-top: 21px;
        }

        .dots span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #5fc9ef;
          animation:
            bounce 1.2s
            infinite ease-in-out;
        }

        .dots span:nth-child(2) {
          background: #ffd54a;
          animation-delay: 0.15s;
        }

        .dots span:nth-child(3) {
          background: #ff725f;
          animation-delay: 0.3s;
        }

        @keyframes bounce {
          0%,
          80%,
          100% {
            transform:
              translateY(0);
            opacity: 0.45;
          }

          40% {
            transform:
              translateY(-7px);
            opacity: 1;
          }
        }

        .retryButton {
          display: block;
          width: min(
            320px,
            100%
          );
          margin:
            21px auto 12px;
          padding: 14px 18px;
          border: 0;
          border-radius: 999px;
          background: #48b8df;
          color: white;
          font-size: 14px;
          font-weight: 900;
          cursor: pointer;
        }

        .subLink,
        .homeLink {
          color: #667085;
          font-size: 12px;
          text-decoration: none;
        }

        .readingArea {
          display: grid;
          gap: 14px;
        }

        .readingCard {
          position: relative;
          display: grid;
          grid-template-columns:
            54px 1fr;
          gap: 15px;
          align-items: start;
          overflow: hidden;
          padding: 19px 18px;
          border: 1px solid;
          border-radius: 22px;
        }

        .readingCard.today {
          border-color: #f4cbc5;
          background: #fff8f6;
        }

        .readingCard.hint {
          border-color: #cfe8ef;
          background: #f4fcff;
        }

        .readingCard.basic {
          border-color: #f0dda8;
          background: #fffaf0;
        }

        .readingCard.why {
          border-color: #d6eadf;
          background: #f6fcf8;
        }

        .readingCard.fallback {
          border-color: #dce8ed;
          background: #fff;
        }

        .sectionIcon {
          display: grid;
          width: 50px;
          height: 50px;
          place-items: center;
          border-radius: 50%;
          font-size: 22px;
        }

        .todayIcon {
          background: #ffe0da;
          color: #ef6b58;
        }

        .hintIcon {
          background: #dff4f8;
          color: #39a9c9;
        }

        .basicIcon {
          background: #fff0bd;
          color: #cf9418;
        }

        .whyIcon {
          background: #e0f3e8;
          color: #499b6c;
        }

        .fallbackIcon {
          background: #edf4f7;
          color: #56889d;
        }

        .sectionContent h2 {
          margin: 2px 0 8px;
          font-family:
            "Hiragino Mincho ProN",
            "Yu Mincho",
            serif;
          font-size: 20px;
          font-weight: 600;
        }

        .sectionContent p {
          margin: 0;
          color: #344054;
          font-size: 14px;
          line-height: 1.95;
          white-space: pre-line;
        }

        .sparkle {
          position: absolute;
          top: 11px;
          right: 13px;
          color: #d6a01e;
          font-size: 16px;
        }

        .actions {
          display: grid;
          gap: 11px;
          padding-top: 14px;
          text-align: center;
        }

        .primaryLink {
          display: block;
          width: min(
            360px,
            100%
          );
          margin: 0 auto;
          padding: 14px 20px;
          border-radius: 999px;
          background: #4abbe1;
          color: white;
          font-size: 14px;
          font-weight: 900;
          text-decoration: none;
          box-shadow:
            0 8px 18px
            rgba(
              74,
              187,
              225,
              0.2
            );
        }

        @media (max-width: 520px) {
          .page {
            padding:
              7px 5px 24px;
          }

          .stainedFrame {
            padding: 5px;
            border-radius: 24px;
          }

          .paper {
            padding:
              24px 12px 28px;
            border-radius: 20px;
          }

          .mobileBreak {
            display: block;
          }

          .cardHero {
            grid-template-columns:
              112px 1fr;
            gap: 14px;
            padding: 14px;
          }

          .cardInfo h2 {
            font-size: 23px;
          }

          .readingCard {
            grid-template-columns:
              46px 1fr;
            gap: 12px;
            padding:
              17px 14px;
          }

          .sectionIcon {
            width: 44px;
            height: 44px;
            font-size: 19px;
          }

          .sectionContent h2 {
            font-size: 18px;
          }

          .sectionContent p {
            font-size: 14px;
            line-height: 1.9;
          }
        }
      `}</style>
    </main>
  );
}