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
          <header className="header">
            <div className="sunMark">☀</div>

            <p className="eyebrow">
              DAILY TAROT
            </p>

            <h1>今日の1枚を読み解く</h1>

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
                  気になっていることを書いてください
                </label>

                <textarea
                  id="customTheme"
                  value={customTheme}
                  onChange={(event) =>
                    setCustomTheme(
                      event.target.value
                    )
                  }
                  placeholder="例：今日の出会い運は？"
                  rows={4}
                />

                <p className="helperText">
                  自由入力では、質問に合わせてAIが読み解くため、
                  結果表示まで少し時間がかかることがあります。
                </p>

                <div className="examples">
                  <p>たとえば</p>

                  <button
                    type="button"
                    onClick={() =>
                      useExample(
                        "いい出会いを広げるために、今日は何を意識するといい？"
                      )
                    }
                  >
                    💕 いい出会いを広げるには？
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      useExample(
                        "仕事で自分の力を発揮するために、今日は何を意識するといい？"
                      )
                    }
                  >
                    💼 仕事で力を発揮するには？
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
                  カードを見せてください
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
          background: #f8fbfc;
        }

        button,
        textarea,
        input {
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
        }

        .paper {
          position: relative;
          overflow: hidden;
          padding: 30px 18px 36px;
          border: 1px solid #e8c96c;
          border-radius: 26px;
          background: #fffefb;
        }

        .header {
          padding: 4px 10px 28px;
          text-align: center;
        }

        .sunMark {
          color: #dda923;
          font-size: 32px;
        }

        .eyebrow,
        .miniLabel {
          color: #b98220;
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
          border: 1px solid #eadcae;
          border-radius: 24px;
        }

        .themeSection {
          background: #fffdf7;
        }

        .cardSection {
          background: #fbfeff;
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
          background: #fff0bd;
          color: #cb9319;
        }

        .cardIcon {
          background: #dff4f8;
          color: #309ebd;
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
          color: #17243a;
          text-align: left;
          cursor: pointer;
        }

        .themeChoice.selected {
          border-color: #58bfe4;
          background: #f5fcff;
        }

        .radio {
          color: #42afd4;
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
          background: #fff1bd;
          color: #a9710a;
          font-size: 10px;
          font-weight: 800;
        }

        .customThemeBox {
          margin-top: 13px;
          padding: 16px;
          border: 1px solid #d9e8ed;
          border-radius: 18px;
          background: #fbfeff;
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
          border: 1px solid #eadfbf;
          border-radius: 999px;
          background: #fffaf0;
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
          color: #17243a;
          text-align: left;
          cursor: pointer;
        }

        .actionButton input {
          display: none;
        }

        .manualAction {
          border-color: #f0d0ca;
          background: #fff8f6;
        }

        .galleryAction {
          border-color: #cde8ef;
          background: #f5fcff;
        }

        .cameraAction {
          border-color: #eddda3;
          background: #fffaf0;
        }

        .actionIcon {
          width: 44px;
          height: 44px;
        }

        .manualIcon {
          background: #ffe1da;
          color: #de644f;
        }

        .galleryIcon {
          background: #dff4f8;
          color: #2c9aba;
        }

        .cameraIcon {
          background: #fff0bd;
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
          border: 1px solid #d8e9ee;
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
          background: #fff0ed;
          color: #df604f;
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
          background: #49b9df;
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
          background: #5fc9ef;
          animation:
            bounce 1.2s infinite;
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

          .previewContent img {
            width: 82px;
            height: 115px;
          }
        }
      `}</style>
    </main>
  );
}