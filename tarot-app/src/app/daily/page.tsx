"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type ThemeMode = "default" | "custom";

type IdentifyResult = {
  category: string;
  card: string;
  orientation: string;
  displayName: string;
  confidence: number;
  needsConfirmation: boolean;
  reason: string;
};

const DEFAULT_THEME = "今日の私に必要なメッセージ";

export default function DailyPage() {
  const router = useRouter();

  const [themeMode, setThemeMode] =
    useState<ThemeMode>("default");

  const [customTheme, setCustomTheme] = useState("");

  const [previewUrl, setPreviewUrl] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");

  const [identifying, setIdentifying] = useState(false);
  const [identifyError, setIdentifyError] = useState("");

  const [identifiedCard, setIdentifiedCard] =
    useState<IdentifyResult | null>(null);

  const currentTheme =
    themeMode === "custom" && customTheme.trim()
      ? customTheme.trim()
      : DEFAULT_THEME;

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const goToManualSelection = () => {
    const query = new URLSearchParams({
      theme: currentTheme,
    });

    router.push(`/daily/card?${query.toString()}`);
  };

  const goToResult = () => {
    if (!identifiedCard) return;

    if (
      identifiedCard.category === "unknown" ||
      identifiedCard.orientation === "unknown"
    ) {
      goToManualSelection();
      return;
    }

    const query = new URLSearchParams({
      category: identifiedCard.category,
      card: identifiedCard.card,
      orientation: identifiedCard.orientation,
      theme: currentTheme,
    });

    router.push(`/daily/result?${query.toString()}`);
  };

  const useExample = (text: string) => {
    setThemeMode("custom");
    setCustomTheme(text);
  };

  const identifyImage = async (file: File) => {
    try {
      setIdentifying(true);
      setIdentifyError("");
      setIdentifiedCard(null);

      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/tarot/identify", {
        method: "POST",
        body: formData,
      });

      const responseText = await response.text();

      if (!responseText.trim()) {
        throw new Error(
          "カード判定の返答を受け取れませんでした。"
        );
      }

      let data: IdentifyResult & {
        error?: string;
      };

      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(
          "カード判定結果をうまく読み取れませんでした。"
        );
      }

      if (!response.ok) {
        throw new Error(
          data.error ??
            "カードをうまく判定できませんでした。"
        );
      }

      setIdentifiedCard(data);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "カードをうまく判定できませんでした。";

      setIdentifyError(message);
    } finally {
      setIdentifying(false);
    }
  };

  const handleImage = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const nextPreviewUrl =
      URL.createObjectURL(file);

    setPreviewUrl(nextPreviewUrl);
    setSelectedFileName(file.name);

    await identifyImage(file);

    event.target.value = "";
  };

  return (
    <main className="page">
      <div className="stainedFrame">
        <div className="paper">
          {/* BRAND ORNAMENT TRANSPLANT V1 */}
          <div className="brandOrnamentLayer" aria-hidden="true">
            <span className="brandOval brandOvalA" />
            <span className="brandOval brandOvalB" />
            <span className="brandOval brandOvalC" />
            <span className="brandOval brandOvalD" />

            <span className="brandGoldLine brandGoldLineA" />
            <span className="brandGoldLine brandGoldLineB" />

            <span className="brandSpark brandSparkA">✦</span>
            <span className="brandSpark brandSparkB">✧</span>
            <span className="brandSpark brandSparkC">✦</span>
          </div>
          <header className="header">
            <div className="sunMark">☀</div>

            <p className="eyebrow">
              DAILY READING
            </p>

            <h1>
            <span className="dailyTitleLine">今日の1枚を</span>
            <span className="dailyTitleLine">読み解く</span>
          </h1>

            <p className="lead">
              今から1枚引いても、
              すでに引いたカードがあっても大丈夫。
              <br />
              あなたのカードを一緒に読んでいきます。
            </p>
          </header>

          <section className="themeSection">
            <div className="sectionHeading">
              <div className="roundIcon themeIcon">
                ☀
              </div>

              <div>
                <p className="miniLabel">
                  TODAY&apos;S THEME
                </p>

                <h2>
                  今日は何について読む？
                </h2>
              </div>
            </div>

            <div className="themeOptions">
              <button
                type="button"
                className={`themeChoice ${
                  themeMode === "default"
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setThemeMode("default")
                }
              >
                <span className="radio">
                  {themeMode === "default"
                    ? "●"
                    : "○"}
                </span>

                <span className="choiceText">
                  <strong>
                    今日の私に必要なメッセージ
                  </strong>
                </span>

                <span className="defaultBadge">
                  おすすめ
                </span>
              </button>

              <button
                type="button"
                className={`themeChoice ${
                  themeMode === "custom"
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setThemeMode("custom")
                }
              >
                <span className="radio">
                  {themeMode === "custom"
                    ? "●"
                    : "○"}
                </span>

                <span className="choiceText">
                  <strong>
                    テーマ・質問を指定する
                  </strong>

                  <small>
                    気になることがある時はこちら
                  </small>
                </span>
              </button>
            </div>

            {themeMode === "custom" && (
              <div className="customThemeBox">
                <label htmlFor="customTheme">
              <span className="phraseLine">気になっていることを</span>
              <span className="phraseLine">書いてください</span>
            </label>

                <textarea
                  id="customTheme"
                  value={customTheme}
                  onChange={(event) =>
                    setCustomTheme(
                      event.target.value
                    )
                  }
                  placeholder="例：今日、気になる人と距離を縮めるには？"
                  rows={4}
                />

                <p className="helperText">
                  自由入力では、質問に合わせて読み解くため、結果表示まで少し時間がかかることがあります。
                </p>

                <div className="examples">
                  <p>たとえば</p>

                  <button
                    type="button"
                    onClick={() =>
                      useExample(
                        "今日、仕事で力を発揮するために、何を意識するといい？"
                      )
                    }
                  >
                    <span className="exampleLine">💼 今日、仕事で</span>
                <span className="exampleLine">力を発揮するには？</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      useExample(
                        "今日の金運について、意識するといいことは？"
                      )
                    }
                  >
                    💰 今日の金運は？
                  </button>
                </div>
              </div>
            )}
          </section>

          <section className="cardSection">
            <div className="sectionHeading">
              <div className="roundIcon cardIcon">
                ✦
              </div>

              <div>
                <p className="miniLabel">
                  YOUR CARD
                </p>

                <h2>
                  <span className="dailyTitleDesktop">カードを見せてください</span><span className="dailyTitleMobile">カードを見せて<br />ください</span>
                </h2>
              </div>
            </div>

            <p className="sectionDescription">
              すでに引いたカードを選ぶか、
              写真から読み取ることができます。
            </p>

            <div className="cardActions">
              <button
                type="button"
                className="actionButton manualAction"
                onClick={goToManualSelection}
              >
                <span className="actionIcon manualIcon">
                  ✦
                </span>

                <span className="actionText">
                  <strong>
                    カードを手動で選ぶ
                  </strong>

                  <small>
                    いちばん早く読み解く
                  </small>
                </span>

                <span className="arrow">
                  ›
                </span>
              </button>

              <label className="actionButton galleryAction">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                />

                <span className="actionIcon galleryIcon">
                  ▤
                </span>

                <span className="actionText">
                  <strong>
                    写真から選ぶ
                  </strong>

                  <small>
                    撮っておいたカードでもOK
                  </small>
                </span>

                <span className="arrow">
                  ›
                </span>
              </label>

              <label className="actionButton cameraAction">
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImage}
                />

                <span className="actionIcon cameraIcon">
                  ▣
                </span>

                <span className="actionText">
                  <strong>
                    今、カードを撮る
                  </strong>

                  <small>
                    カメラで1枚撮影
                  </small>
                </span>

                <span className="arrow">
                  ›
                </span>
              </label>
            </div>

            {previewUrl && (
              <div className="previewBox">
                <p className="previewLabel">
                  選んだカード
                </p>

                <div className="previewContent">
                  <img
                    src={previewUrl}
                    alt="選択したタロットカード"
                  />

                  <div className="previewText">
                    {identifying && (
                      <>
                        <strong>
                          カードを読み取っています…
                        </strong>

                        <p>
                          カード名と向きを確認しています。
                        </p>

                        <div className="dots">
                          <span />
                          <span />
                          <span />
                        </div>
                      </>
                    )}

                    {!identifying &&
                      identifyError && (
                        <>
                          <strong>
                            うまく読み取れませんでした
                          </strong>

                          <p>
                            {identifyError}
                          </p>

                          <button
                            type="button"
                            className="manualFallback"
                            onClick={
                              goToManualSelection
                            }
                          >
                            手動で選ぶ
                          </button>
                        </>
                      )}

                    {!identifying &&
                      !identifyError &&
                      identifiedCard && (
                        <>
                          <span className="resultMini">
                            AI判定
                          </span>

                          <strong className="detectedName">
                            {
                              identifiedCard.displayName
                            }
                          </strong>

                          <span className="orientationLabel">
                            {identifiedCard.orientation ===
                            "upright"
                              ? "正位置"
                              : identifiedCard.orientation ===
                                  "reversed"
                                ? "逆位置"
                                : "向きを確認してください"}
                          </span>

                          <p className="reason">
                            {identifiedCard.reason}
                          </p>

                          <p className="confidence">
                            判定の確信度：
                            {
                              identifiedCard.confidence
                            }
                            %
                          </p>
                        </>
                      )}
                  </div>
                </div>

                {!identifying &&
                  !identifyError &&
                  identifiedCard && (
                    <div className="confirmBox">
                      <h3>
                        このカードで合っていますか？
                      </h3>

                      <button
                        type="button"
                        className="confirmButton"
                        onClick={goToResult}
                        disabled={
                          identifiedCard.category ===
                            "unknown" ||
                          identifiedCard.orientation ===
                            "unknown"
                        }
                      >
                        このカードで読み解く
                      </button>

                      <button
                        type="button"
                        className="wrongButton"
                        onClick={
                          goToManualSelection
                        }
                      >
                        違うカード・向きだった
                      </button>
                    </div>
                  )}

                <p className="fileName">
                  {selectedFileName}
                </p>
              </div>
            )}
          </section>
        </div>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: #fffdf9;
        }

        button,
        textarea,
        input {
          font: inherit;
        }

        .page {
          min-height: 100vh;
          padding: 18px 10px 40px;
          color: #4d4a52;
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
              #71c4dc 0%,
              #71c4dc 12%,
              #f5d977 12%,
              #f5d977 23%,
              #f4a08f 23%,
              #f4a08f 34%,
              #a9d8cb 34%,
              #a9d8cb 44%,
              #71c4dc 44%,
              #71c4dc 58%,
              #f5d977 58%,
              #f5d977 69%,
              #f4a08f 69%,
              #f4a08f 81%,
              #71c4dc 81%,
              #71c4dc 100%
            );
        }

        .paper {
          position: relative;
          overflow: hidden;
          padding: 30px 18px 36px;
          border: 1px solid #d8b46f;
          border-radius: 26px;
          background: #fffdf9;
        }

        .header {
          padding: 4px 10px 28px;
          text-align: center;
        }

        .sunMark {
          color: #d8a23a;
          font-size: 32px;
        }

        .eyebrow,
        .miniLabel {
          color: #d8a23a;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.16em;
        }

        .header h1 {
          margin: 5px 0 0;
          font-family:
            "Hiragino Mincho ProN",
            "Yu Mincho",
            serif;
          font-size: clamp(
            29px,
            7vw,
            43px
          );
          font-weight: 600;
        }

        .lead {
          margin: 12px auto 0;
          max-width: 560px;
          color: #667085;
          font-size: 14px;
          line-height: 1.9;
        }

        .themeSection,
        .cardSection {
          margin-bottom: 18px;
          padding: 20px;
          border: 1px solid #f8e8b6;
          border-radius: 24px;
        }

        .themeSection {
          background: #fffdf7;
        }

        .cardSection {
          background: #fffdf9;
        }

        .sectionHeading {
          display: flex;
          gap: 14px;
          align-items: center;
          margin-bottom: 16px;
        }

        .roundIcon,
        .actionIcon {
          display: grid;
          place-items: center;
          border-radius: 50%;
        }

        .roundIcon {
          width: 52px;
          height: 52px;
          font-size: 24px;
        }

        .themeIcon {
          background: #f8e8b6;
          color: #d8a23a;
        }

        .cardIcon {
          background: #dceff7;
          color: #569aad;
        }

        .sectionHeading h2 {
          margin: 2px 0 0;
          font-family:
            "Hiragino Mincho ProN",
            "Yu Mincho",
            serif;
          font-size: 23px;
          font-weight: 600;
        }

        .themeOptions,
        .cardActions {
          display: grid;
          gap: 10px;
        }

        .themeChoice {
          display: grid;
          grid-template-columns:
            28px 1fr auto;
          gap: 10px;
          align-items: center;
          width: 100%;
          padding: 15px 16px;
          border: 1px solid #dde5e9;
          border-radius: 18px;
          background: #fff;
          color: #4d4a52;
          text-align: left;
          cursor: pointer;
        }

        .themeChoice.selected {
          border-color: #71c4dc;
          background: #fffdf9;
        }

        .radio {
          color: #71c4dc;
          font-size: 21px;
        }

        .choiceText {
          display: grid;
          gap: 3px;
        }

        .choiceText strong {
          font-size: 15px;
        }

        .choiceText small {
          color: #7a8492;
          font-size: 12px;
        }

        .defaultBadge {
          padding: 5px 9px;
          border-radius: 999px;
          background: #f8e8b6;
          color: #a9710a;
          font-size: 10px;
          font-weight: 800;
        }

        .customThemeBox {
          margin-top: 13px;
          padding: 16px;
          border: 1px solid #dceff7;
          border-radius: 18px;
          background: #fffdf9;
        }

        .customThemeBox label {
          display: block;
          margin-bottom: 8px;
          font-size: 13px;
          font-weight: 800;
        }

        .customThemeBox textarea {
          width: 100%;
          min-height: 100px;
          padding: 13px 14px;
          border: 1px solid #cfdde2;
          border-radius: 14px;
          resize: vertical;
        }

        .helperText {
          color: #88929e;
          font-size: 11px;
          line-height: 1.7;
        }

        .examples button {
          margin: 0 6px 7px 0;
          padding: 8px 11px;
          border: 1px solid #f8e8b6;
          border-radius: 999px;
          background: #fffaf3;
          font-size: 11px;
          cursor: pointer;
        }

        .sectionDescription {
          color: #667085;
          font-size: 13px;
          line-height: 1.8;
        }

        .actionButton {
          display: grid;
          grid-template-columns:
            48px 1fr auto;
          gap: 12px;
          align-items: center;
          width: 100%;
          min-height: 78px;
          padding: 13px 16px;
          border: 1px solid;
          border-radius: 18px;
          color: #4d4a52;
          text-align: left;
          cursor: pointer;
        }

        .actionButton input {
          display: none;
        }

        .manualAction {
          border-color: #f6b7b2;
          background: #fff8f6;
        }

        .galleryAction {
          border-color: #dceff7;
          background: #fffdf9;
        }

        .cameraAction {
          border-color: #f8e8b6;
          background: #fffaf3;
        }

        .actionIcon {
          width: 44px;
          height: 44px;
        }

        .manualIcon {
          background: #f6b7b2;
          color: #c97980;
        }

        .galleryIcon {
          background: #dceff7;
          color: #569aad;
        }

        .cameraIcon {
          background: #f8e8b6;
          color: #b97e0f;
        }

        .actionText {
          display: grid;
          gap: 4px;
        }

        .actionText strong {
          font-size: 15px;
        }

        .actionText small {
          color: #7c8793;
          font-size: 11px;
        }

        .arrow {
          color: #9ba4ae;
          font-size: 25px;
        }

        .previewBox {
          margin-top: 18px;
          padding: 16px;
          border: 1px solid #dceff7;
          border-radius: 20px;
          background: white;
        }

        .previewLabel {
          margin-top: 0;
          font-size: 11px;
          font-weight: 900;
        }

        .previewContent {
          display: grid;
          grid-template-columns:
            105px 1fr;
          gap: 16px;
        }

        .previewContent img {
          width: 105px;
          height: 145px;
          object-fit: contain;
          border-radius: 10px;
          background: #f5f7f8;
        }

        .previewText {
          align-self: center;
        }

        .previewText strong {
          display: block;
          margin-bottom: 7px;
        }

        .resultMini {
          display: block;
          margin-bottom: 4px;
          color: #a97922;
          font-size: 10px;
          font-weight: 900;
        }

        .detectedName {
          font-family:
            "Hiragino Mincho ProN",
            "Yu Mincho",
            serif;
          font-size: 22px;
        }

        .orientationLabel {
          display: inline-block;
          margin: 3px 0 8px;
          padding: 4px 9px;
          border-radius: 999px;
          background: #f6b7b2;
          color: #c97980;
          font-size: 11px;
          font-weight: 800;
        }

        .reason,
        .confidence {
          color: #667085;
          font-size: 11px;
          line-height: 1.7;
        }

        .confirmBox {
          margin-top: 17px;
          padding-top: 15px;
          border-top: 1px solid #e6ecef;
          text-align: center;
        }

        .confirmBox h3 {
          margin: 0 0 12px;
          font-size: 16px;
        }

        .confirmButton,
        .manualFallback {
          border: 0;
          border-radius: 999px;
          background: #71c4dc;
          color: white;
          font-weight: 900;
          cursor: pointer;
        }

        .confirmButton {
          width: min(
            330px,
            100%
          );
          padding: 13px 18px;
        }

        .confirmButton:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .wrongButton {
          display: block;
          margin: 11px auto 0;
          border: 0;
          background: transparent;
          color: #667085;
          font-size: 12px;
          cursor: pointer;
        }

        .manualFallback {
          padding: 9px 14px;
          font-size: 12px;
        }

        .fileName {
          overflow: hidden;
          margin: 12px 0 0;
          color: #a0a7b0;
          font-size: 9px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .dots {
          display: flex;
          gap: 6px;
          margin-top: 12px;
        }

        .dots span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #71c4dc;
          animation:
            bounce 1.2s infinite;
        }

        .dots span:nth-child(2) {
          background: #f5d977;
          animation-delay: 0.15s;
        }

        .dots span:nth-child(3) {
          background: #f4a08f;
          animation-delay: 0.3s;
        }

        @keyframes bounce {
          50% {
            transform:
              translateY(-5px);
          }
        }

        @media (max-width: 520px) {
          .page {
            padding: 7px 5px 24px;
          }

          .stainedFrame {
            padding: 5px;
          }

          .paper {
            padding: 24px 12px 28px;
          }

          .themeSection,
          .cardSection {
            padding: 16px 13px;
          }

          .themeChoice {
            grid-template-columns:
              25px 1fr;
          }

          .defaultBadge {
            display: none;
          }

          .previewContent {
            grid-template-columns:
              82px 1fr;
          }

          .p
        /* daily-title-mobile-fix */
        .dailyTitleDesktop {
          display: inline;
        }

        .dailyTitleMobile {
          display: none;
        }

        @media (max-width: 768px) {
          .dailyTitleDesktop {
            display: none;
          }

          .dailyTitleMobile {
            display: inline;
          }
        }

        reviewContent img {
            width: 82px;
            height: 115px;
          }
        }
      

        /* ========================================
           DAILY TOP BRAND UNIFY V1
           Top page is the single visual reference
        ======================================== */

        .page {
          min-height: 100vh;
          padding: 18px 12px 42px;
          color: #454543;
          background: transparent;
        }

        /* 旧・虹色フレームを撤去 */
        .stainedFrame {
          width: min(520px, 100%);
          margin: 0 auto;
          padding: 0;
          border: 0;
          border-radius: 32px;
          background: transparent;
        }

        /* トップと同じミルキーな紙面 */
        .paper {
          position: relative;
          overflow: hidden;
          padding: 34px 18px 36px;
          border: 1px solid rgba(184, 162, 109, 0.28);
          border-radius: 30px;
          background: rgba(255, 253, 248, 0.91);
          box-shadow:
            0 18px 48px rgba(104, 92, 73, 0.07);
        }

        /*
          トップの花＋ステンドグラスのDNAを
          「枠」ではなく角の装飾として入れる
        */
        .paper::before,
        .paper::after {
          content: "";
          position: absolute;
          pointer-events: none;
          z-index: 0;
          width: 155px;
          height: 145px;
          opacity: 0.72;
        }

        .paper::before {
          top: -34px;
          left: -42px;
          background:
            radial-gradient(
              ellipse at 35% 33%,
              rgba(234, 217, 149, 0.60) 0 18%,
              transparent 19%
            ),
            radial-gradient(
              ellipse at 63% 28%,
              rgba(207, 227, 217, 0.66) 0 17%,
              transparent 18%
            ),
            radial-gradient(
              ellipse at 30% 65%,
              rgba(223, 164, 156, 0.52) 0 19%,
              transparent 20%
            ),
            radial-gradient(
              ellipse at 68% 65%,
              rgba(219, 231, 230, 0.72) 0 18%,
              transparent 19%
            );
          border-radius: 52% 48% 54% 46%;
          transform: rotate(-9deg);
        }

        .paper::after {
          top: -46px;
          right: -56px;
          width: 138px;
          height: 132px;
          background:
            radial-gradient(
              ellipse at 38% 38%,
              rgba(223, 164, 156, 0.52) 0 18%,
              transparent 19%
            ),
            radial-gradient(
              ellipse at 66% 35%,
              rgba(234, 217, 149, 0.56) 0 17%,
              transparent 18%
            ),
            radial-gradient(
              ellipse at 48% 68%,
              rgba(207, 227, 217, 0.65) 0 20%,
              transparent 21%
            );
          transform: rotate(13deg);
        }

        .paper > * {
          position: relative;
          z-index: 1;
        }

        /* ---------- HERO ---------- */

        .header {
          padding: 16px 8px 28px;
          text-align: center;
        }

        .sunMark {
          display: none;
        }

        .eyebrow,
        .miniLabel {
          margin: 0;
          color: #a87b72;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
        }

        /* 明朝を完全に撤去 */
        .paper .header h1 {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          margin: 9px 0 12px;

          font-family:
            var(--font-zen-maru),
            "Hiragino Sans",
            "Yu Gothic",
            sans-serif;

          font-size: 31px;
          font-weight: 500;
          line-height: 1.42;
          letter-spacing: -0.02em;
          color: #454543;
        }

        .dailyTitleLine {
          display: block;
          white-space: nowrap;
        }

        .lead {
          max-width: 370px;
          margin: 0 auto;
          color: #77736d;
          font-size: 14px;
          line-height: 1.95;
        }

        /* ---------- SECTION CARDS ---------- */

        .themeSection,
        .cardSection {
          margin-top: 14px;
          padding: 22px 18px;
          border: 1px solid rgba(184, 162, 109, 0.23);
          border-radius: 26px;
          background: rgba(255, 255, 255, 0.50);
          box-shadow: none;
        }

        .sectionHeading {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-bottom: 18px;
        }

        .sectionHeading > div:last-child {
          min-width: 0;
        }

        .sectionHeading h2 {
          margin: 4px 0 0;
          font-family:
            var(--font-zen-maru),
            "Hiragino Sans",
            "Yu Gothic",
            sans-serif;
          font-size: 21px;
          font-weight: 500;
          line-height: 1.5;
          letter-spacing: -0.01em;
          color: #454543;
        }

        .dailyNoBreak {
          white-space: nowrap;
        }

        .roundIcon {
          flex: 0 0 auto;
          width: 58px;
          height: 58px;
          border: 0;
          box-shadow: none;
        }

        .themeIcon {
          color: #a78b40;
          background: rgba(234, 217, 149, 0.48);
        }

        .cardIcon {
          color: #6c9ba1;
          background: rgba(219, 231, 230, 0.72);
        }

        .sectionDescription {
          margin-top: 3px;
          color: #77736d;
          font-size: 13px;
          line-height: 1.8;
        }

        /* ---------- THEME OPTIONS ---------- */

        .themeOptions {
          display: grid;
          gap: 11px;
        }

        .themeChoice {
          min-height: 88px;
          padding: 16px 17px;
          border: 1px solid rgba(184, 162, 109, 0.20);
          border-radius: 21px;
          color: #454543;
          background: rgba(255,255,255,0.58);
          box-shadow: none;
        }

        .themeChoice.selected {
          border-color: rgba(184, 162, 109, 0.42);
          background:
            linear-gradient(
              135deg,
              rgba(247, 239, 201, 0.92),
              rgba(255, 253, 248, 0.80)
            );
        }

        .radio {
          color: #b8a26d;
          font-size: 20px;
        }

        .choiceText strong {
          color: #454543;
          font-size: 15px;
          font-weight: 600;
          line-height: 1.55;
        }

        .choiceText small {
          color: #858078;
          font-size: 12px;
          line-height: 1.55;
        }

        .defaultBadge {
          background: rgba(243, 216, 211, 0.72);
          color: #a16f68;
          font-weight: 700;
        }

        /* ---------- CARD ACTIONS ---------- */

        .cardActions {
          display: grid;
          gap: 12px;
        }

        .actionButton {
          min-height: 92px;
          padding: 16px 17px;
          border: 1px solid rgba(184, 162, 109, 0.20);
          border-radius: 22px;
          color: #454543;
          box-shadow: none;
          transition:
            transform 0.15s ease,
            box-shadow 0.15s ease;
        }

        .actionButton:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(104, 92, 73, 0.07);
        }

        .manualAction {
          background: rgba(243, 216, 211, 0.56);
        }

        .galleryAction {
          background: rgba(207, 227, 217, 0.57);
        }

        .cameraAction {
          background: rgba(247, 239, 201, 0.72);
        }

        .actionIcon {
          border: 0;
          box-shadow: none;
        }

        .manualIcon {
          background: rgba(243, 216, 211, 0.92);
          color: #bd7f74;
        }

        .galleryIcon {
          background: rgba(219, 231, 230, 0.96);
          color: #70989c;
        }

        .cameraIcon {
          background: rgba(234, 217, 149, 0.70);
          color: #a78b40;
        }

        .actionText {
          min-width: 0;
        }

        .actionText strong {
          display: block;
          color: #454543;
          font-size: 15px;
          font-weight: 600;
          line-height: 1.55;
          white-space: nowrap;
        }

        .actionText small {
          color: #817c74;
          font-size: 12px;
          line-height: 1.55;
        }

        .arrow {
          color: #a9a299;
          font-size: 24px;
        }

        /* 旧モバイル用強制改行は使わない */
        .dailyTitleDesktop {
          display: inline;
        }

        .dailyTitleMobile {
          display: none;
        }

        @media (max-width: 430px) {
          .page {
            padding: 10px 8px 32px;
          }

          .paper {
            padding: 29px 14px 30px;
            border-radius: 27px;
          }

          .paper .header h1 {
            font-size: 28px;
            line-height: 1.42;
          }

          .lead {
            font-size: 13px;
            line-height: 1.9;
          }

          .themeSection,
          .cardSection {
            padding: 19px 14px;
            border-radius: 24px;
          }

          .sectionHeading {
            gap: 11px;
          }

          .sectionHeading h2 {
            font-size: 19px;
          }

          .roundIcon {
            width: 52px;
            height: 52px;
          }

          .themeChoice,
          .actionButton {
            padding-left: 14px;
            padding-right: 14px;
          }

          .actionText strong {
            font-size: 14px;
          }
        }



        /* DAILY JAPANESE WRAP FINAL */

        .sectionHeading h2 .dailyNoBreak {
          display: inline-block;
          white-space: nowrap !important;
          word-break: keep-all;
        }

        .themeChoice .choiceText strong,
        .actionButton .actionText strong {
          word-break: keep-all;
          overflow-wrap: normal;
        }

        .themeChoice .choiceText strong {
          white-space: nowrap;
          font-size: 14px;
        }

        .sectionDescription,
        .lead,
        .choiceText small,
        .actionText small {
          word-break: keep-all;
          overflow-wrap: normal;
        }

        @media (max-width: 430px) {
          .sectionHeading h2 {
            font-size: 18px;
          }

          .themeChoice .choiceText strong {
            font-size: 13.5px;
          }
        }



        /* DAILY SPARKLE POLISH */

        .header {
          position: relative;
        }

        .header::before,
        .header::after {
          position: absolute;
          pointer-events: none;
          line-height: 1;
          z-index: 2;
        }

        .header::before {
          content: "✦";
          top: 46px;
          left: 12%;
          color: rgba(184, 162, 109, 0.55);
          font-size: 16px;
          transform: rotate(8deg);
        }

        .header::after {
          content: "✧";
          top: 88px;
          right: 11%;
          color: rgba(223, 164, 156, 0.60);
          font-size: 19px;
          transform: rotate(-8deg);
        }

        .eyebrow {
          position: relative;
        }

        .eyebrow::before,
        .eyebrow::after {
          content: "✦";
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(184, 162, 109, 0.42);
        }

        .eyebrow::before {
          left: -24px;
          font-size: 8px;
        }

        .eyebrow::after {
          right: -24px;
          font-size: 6px;
        }



        /* DAILY WRAP HARD FIX */

        /* 見出しの文字領域をちゃんと確保 */
        .sectionHeading {
          display: grid;
          grid-template-columns: 52px minmax(0, 1fr);
          align-items: center;
          column-gap: 12px;
        }

        .sectionHeading > div:last-child {
          min-width: 0;
          width: 100%;
        }

        .sectionHeading h2 {
          width: 100%;
          font-size: 17px !important;
          line-height: 1.5;
          word-break: keep-all !important;
          overflow-wrap: normal !important;
        }

        .sectionHeading h2,
        .sectionHeading h2 span,
        .dailyNoBreak {
          white-space: nowrap !important;
        }

        /* 選択肢のタイトルは途中で折らない */
        .choiceText strong,
        .actionText strong {
          white-space: nowrap !important;
          word-break: keep-all !important;
          overflow-wrap: normal !important;
        }

        .choiceText strong {
          font-size: 13px !important;
        }

        .actionText strong {
          font-size: 14px !important;
        }

        /* 説明文は単語・文節の途中で割れにくくする */
        .lead,
        .sectionDescription,
        .choiceText small,
        .actionText small {
          word-break: keep-all !important;
          overflow-wrap: normal !important;
        }

        @media (max-width: 390px) {
          .sectionHeading {
            grid-template-columns: 48px minmax(0, 1fr);
            column-gap: 10px;
          }

          .sectionHeading h2 {
            font-size: 16px !important;
          }

          .choiceText strong {
            font-size: 12.5px !important;
          }

          .actionText strong {
            font-size: 13.5px !important;
          }
        }



        /* FINAL SEMANTIC WRAP */

        .questionTitleLine,
        .exampleLine {
          display: block;
          white-space: nowrap;
        }

        .questionTitleLine {
          line-height: 1.45;
        }

        .exampleLine {
          text-align: center;
          line-height: 1.45;
        }



        /* DAILY GLAM POLISH V1 */

        /* トップと同じ、少し華やかな入口感 */
        .paper::before {
          width: 205px !important;
          height: 170px !important;
          top: -52px !important;
          left: -54px !important;
          opacity: 0.92 !important;

          background:
            radial-gradient(
              ellipse at 25% 38%,
              rgba(234, 217, 149, .72) 0 20%,
              transparent 21%
            ),
            radial-gradient(
              ellipse at 52% 28%,
              rgba(207, 227, 217, .78) 0 19%,
              transparent 20%
            ),
            radial-gradient(
              ellipse at 28% 70%,
              rgba(223, 164, 156, .68) 0 21%,
              transparent 22%
            ),
            radial-gradient(
              ellipse at 70% 62%,
              rgba(219, 231, 230, .82) 0 19%,
              transparent 20%
            ) !important;

          transform: rotate(-8deg) !important;
        }

        .paper::after {
          width: 195px !important;
          height: 160px !important;
          top: -55px !important;
          right: -58px !important;
          opacity: 0.88 !important;

          background:
            radial-gradient(
              ellipse at 35% 30%,
              rgba(223, 164, 156, .66) 0 20%,
              transparent 21%
            ),
            radial-gradient(
              ellipse at 68% 32%,
              rgba(234, 217, 149, .72) 0 19%,
              transparent 20%
            ),
            radial-gradient(
              ellipse at 38% 70%,
              rgba(207, 227, 217, .76) 0 20%,
              transparent 21%
            ),
            radial-gradient(
              ellipse at 75% 67%,
              rgba(219, 231, 230, .74) 0 17%,
              transparent 18%
            ) !important;

          transform: rotate(12deg) !important;
        }

        /* 薄いゴールドラインでステンドグラス感 */
        .header {
          position: relative;
        }

        .header h1::after {
          content: "";
          display: block;
          width: 76px;
          height: 1px;
          margin: 13px auto 0;

          background: linear-gradient(
            90deg,
            transparent,
            rgba(184,162,109,.72),
            transparent
          );
        }

        /* Dailyのキラキラを少し増やす */
        .header::before {
          content: "✦";
          top: 55px;
          left: 11%;
          color: rgba(184,162,109,.72);
          font-size: 15px;
        }

        .header::after {
          content: "✧";
          top: 114px;
          right: 10%;
          color: rgba(223,164,156,.74);
          font-size: 21px;
        }

        .paper {
          background:
            radial-gradient(
              circle at 50% 3%,
              rgba(255,255,255,.92),
              transparent 34%
            ),
            rgba(255,253,248,.94) !important;
        }




        /* ==========================================
           BRAND ORNAMENT TRANSPLANT V1
           TOPの装飾DNAをDailyへ移植
        ========================================== */

        .paper {
          isolation: isolate;
        }

        .brandOrnamentLayer {
          position: absolute !important;
          inset: 0;
          z-index: 0 !important;
          overflow: hidden;
          pointer-events: none;
          border-radius: inherit;
        }

        /*
          TOPと同じ
          ・淡い楕円
          ・細いゴールドふち
          ・半透明
        */
        .brandOval {
          position: absolute;
          display: block;
          border: 1px solid rgba(216, 180, 111, 0.58);
          border-radius: 999px;
          opacity: 0.78;
        }

        /* 左上：バターイエロー */
        .brandOvalA {
          width: 94px;
          height: 38px;
          top: 21px;
          left: -27px;
          background: rgba(245, 217, 119, 0.38);
          transform: rotate(-31deg);
        }

        /* 左上：ミント */
        .brandOvalB {
          width: 78px;
          height: 34px;
          top: 58px;
          left: -18px;
          background: rgba(169, 216, 203, 0.35);
          transform: rotate(27deg);
        }

        /* 右上：コーラル */
        .brandOvalC {
          width: 90px;
          height: 36px;
          top: 24px;
          right: -25px;
          background: rgba(244, 160, 143, 0.32);
          transform: rotate(-25deg);
        }

        /* 右上：淡ブルー */
        .brandOvalD {
          width: 72px;
          height: 31px;
          top: 66px;
          right: -12px;
          background: rgba(220, 239, 247, 0.58);
          transform: rotate(31deg);
        }

        /*
          TOPで効いている
          “細い金の曲線”
        */
        .brandGoldLine {
          position: absolute;
          display: block;
          border: 1px solid rgba(216, 180, 111, 0.43);
          border-radius: 50%;
          background: transparent;
        }

        .brandGoldLineA {
          width: 190px;
          height: 112px;
          top: -32px;
          left: -73px;
          transform: rotate(18deg);
        }

        .brandGoldLineB {
          width: 180px;
          height: 105px;
          top: -20px;
          right: -76px;
          transform: rotate(-20deg);
        }

        /*
          TOPと同じ小さなキラキラ。
          タイトル本文には被せない。
        */
        .brandSpark {
          position: absolute;
          display: block;
          line-height: 1;
        }

        .brandSparkA {
          top: 101px;
          left: 13%;
          color: rgba(216, 162, 58, 0.72);
          font-size: 12px;
        }

        .brandSparkB {
          top: 128px;
          right: 12%;
          color: rgba(198, 95, 115, 0.56);
          font-size: 17px;
        }

        .brandSparkC {
          top: 52px;
          right: 29%;
          color: rgba(216, 180, 111, 0.62);
          font-size: 8px;
        }

        /*
          中身は装飾より必ず前面。
          装飾が文字を邪魔しない。
        */
        .paper > :not(.brandOrnamentLayer) {
          position: relative;
          z-index: 2;
        }

        /*
          TOPと同じ透明感を少し強化
        */
        .themeSection,
        .cardSection {
          border-color: rgba(216, 180, 111, 0.34) !important;
          background:
            linear-gradient(
              145deg,
              rgba(255, 253, 249, 0.82),
              rgba(255, 250, 243, 0.64)
            ) !important;
        }

        .themeChoice.selected {
          border-color: rgba(216, 180, 111, 0.56) !important;
          background:
            linear-gradient(
              135deg,
              rgba(248, 232, 182, 0.82),
              rgba(255, 253, 249, 0.90)
            ) !important;
        }

        @media (max-width: 430px) {
          .brandOvalA {
            left: -34px;
          }

          .brandOvalC {
            right: -34px;
          }

          .brandGoldLineA {
            left: -92px;
          }

          .brandGoldLineB {
            right: -92px;
          }
        }

`}</style>
    </main>
  );
}