"use client";

import Link from "next/link";
import { Zen_Maru_Gothic } from "next/font/google";

const zenMaru = Zen_Maru_Gothic({
  weight: ["400", "500", "700"],
  display: "swap",
  preload: false,
});

export default function GuidePage() {
  return (
    <main className="guidePage">
      <div className="guideShell">
        <Link href="/" className="guideBack">
          ‹ トップへ戻る
        </Link>

        <header className="guideHero">
          <div className="guideHeart">♡</div>

          <p className="guideEyebrow">WELCOME</p>

          <h1 className={zenMaru.className}>初めての方へ</h1>

          <p className="guideLead">
            お気に入りのタロットカードを、
            <br />
            もっと気軽に楽しむためのサイトです。
          </p>
        </header>

        <section className="guideIntro">
          <p className="guideLabel">このサイトは</p>

          <h2 className={`${zenMaru.className} guideIntroTitle`}>
            <span>あなたが引いたカードを、</span>
            <span>一緒に読み解くサイトです。</span>
          </h2>

          <p>
            まずは、お手持ちのタロットカードをご準備ください。
          </p>

          <p>
            お気に入りのデッキを自分でシャッフルして、
            <br />
            あなた自身の直感でカードを引いてみてください。
          </p>

          <div className="guidePhotoNote">
            <span className="guidePhotoIcon">◎</span>

            <div>
              <strong className="guidePhotoTitle">
                <span>カードの名前が</span>
                <span>分からなくても大丈夫。</span>
              </strong>
              <p>
                写真を撮れば、カードを見つけるお手伝いをします。
              </p>
            </div>
          </div>

          <p className="guideBrandLine">
            引くのはあなた。読むのは一緒に。
          </p>
        </section>

        <section className="guideSteps">
          <p className="guideLabel">HOW TO USE</p>

          <h2 className={zenMaru.className}>使い方はかんたん。</h2>

          <div className="guideStepCard guideYellow">
            <span className="guideNumber">01</span>
            <div>
              <strong>自分のカードを用意する</strong>
              <p>いつも使っているお気に入りのデッキでOK。</p>
            </div>
          </div>

          <div className="guideStepCard guideMint">
            <span className="guideNumber">02</span>
            <div>
              <strong>自分でカードを引く</strong>
              <p>シャッフルして、直感でカードを選びます。</p>
            </div>
          </div>

          <div className="guideStepCard guideCoral">
            <span className="guideNumber">03</span>
            <div>
              <strong>引いたカードを登録する</strong>
              <p>
                手入力でも写真でもOK。引いたカードを一緒に読み解きます。
              </p>
            </div>
          </div>
        </section>

        <section className="guideFeatures">
          <p className="guideLabel">ENJOY TAROT</p>

          <h2 className={zenMaru.className}>こんなふうに楽しめます。</h2>

          <div className="guideFeature guideFeatureYellow">
            <span>☆</span>
            <div>
              <strong>今日の1枚</strong>
              <p>
                今日引いた1枚を読み解きます。
                同じカードを、仕事・恋愛・人間関係・お金など、
                いろいろな角度から楽しめるようにしていく予定です。
              </p>
            </div>
          </div>

          <div className="guideFeature guideFeatureMint">
            <span>▤</span>
            <div>
              <strong>タロットカード辞典</strong>
              <p>
                カードの基本の意味や正位置・逆位置を、
                分かりやすく調べられる辞典を準備しています。
              </p>
            </div>
          </div>

          <div className="guideFeature guideFeatureSoft">
            <span>◇</span>
            <div>
              <strong>3枚で読む</strong>
              <p>
                ひとつのテーマをもう少し深く読みたいときの
                3枚引きも準備中です。
              </p>
            </div>
          </div>
        </section>

        <Link href="/daily" className="guideCta">
          <span>☆</span>
          <span>
            <small>DAILY READING</small>
            <strong>
              <span className="guideNoBreak">今日の1枚を</span>{" "}
              <span className="guideNoBreak">読んでみる</span>
            </strong>
          </span>
          <span>›</span>
        </Link>

        <footer className="guideFooter">
          <span>♡</span>
          Tarot Reading Assistant
        </footer>
      </div>

      <style jsx global>{`
        .guidePage {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 10% 4%,
              rgba(248, 200, 203, 0.34),
              transparent 24%
            ),
            radial-gradient(
              circle at 92% 13%,
              rgba(221, 243, 234, 0.58),
              transparent 22%
            ),
            #fffdf9;
          color: #4d4a52;
          padding: 18px 14px 40px;
        }

        .guideShell {
          width: min(100%, 680px);
          margin: 0 auto;
        }

        .guideBack {
          display: inline-block;
          margin-bottom: 14px;
          color: #9c7479;
          font-size: 13px;
          text-decoration: none;
        }

        .guideHero {
          text-align: center;
          padding: 14px 8px 24px;
        }

        .guideHeart {
          width: 54px;
          height: 54px;
          margin: 0 auto 10px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: rgba(248, 200, 203, 0.68);
          color: #c65f73;
          font-size: 30px;
        }

        .guideEyebrow,
        .guideLabel {
          color: #b27c84;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.17em;
        }

        .guideHero h1 {
          margin: 5px 0 8px;
          font-size: 32px;
          font-weight: 600;
        }

        .guideLead {
          margin: 0;
          color: #7a7378;
          font-size: 14px;
          line-height: 1.8;
        }

        .guideIntro,
        .guideSteps,
        .guideFeatures {
          margin-top: 12px;
          padding: 24px 20px;
          border: 1px solid rgba(216, 180, 111, 0.23);
          border-radius: 26px;
          background: rgba(255, 255, 255, 0.72);
        }

        .guideIntro h2,
        .guideSteps h2,
        .guideFeatures h2 {
          margin: 7px 0 16px;
          font-size: 21px;
          line-height: 1.55;
          font-weight: 600;
        }

        .guideIntro > p:not(.guideLabel):not(.guideBrandLine) {
          margin: 12px 0;
          color: #746d72;
          font-size: 13px;
          line-height: 1.9;
        }

        .guidePhotoNote {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          margin: 19px 0;
          padding: 16px;
          border-radius: 19px;
          background:
            linear-gradient(
              135deg,
              rgba(221, 243, 234, 0.78),
              rgba(220, 239, 247, 0.64)
            );
        }

        .guidePhotoIcon {
          flex: 0 0 auto;
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.75);
          color: #79aa9d;
          font-size: 19px;
        }

        .guidePhotoNote strong {
          font-size: 14px;
        }

        .guidePhotoNote p {
          margin: 4px 0 0;
          color: #6f7775;
          font-size: 12px;
          line-height: 1.7;
        }

        .guideBrandLine {
          margin: 21px 0 0;
          color: #c16f79;
          font-size: 15px;
          font-weight: 700;
          text-align: center;
        }

        .guideStepCard {
          display: flex;
          gap: 13px;
          align-items: flex-start;
          margin-top: 9px;
          padding: 15px;
          border-radius: 19px;
        }

        .guideYellow {
          background: rgba(248, 226, 157, 0.58);
        }

        .guideMint {
          background: rgba(221, 243, 234, 0.72);
        }

        .guideCoral {
          background: rgba(248, 200, 203, 0.72);
        }

        .guideNumber {
          flex: 0 0 auto;
          color: #a98b62;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
        }

        .guideStepCard strong,
        .guideFeature strong {
          font-size: 14px;
        }

        .guideStepCard p,
        .guideFeature p {
          margin: 4px 0 0;
          color: #756f73;
          font-size: 12px;
          line-height: 1.65;
        }

        .guideFeature {
          display: flex;
          gap: 13px;
          margin-top: 9px;
          padding: 15px;
          border-radius: 19px;
        }

        .guideFeature > span {
          flex: 0 0 auto;
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.72);
          font-size: 19px;
        }

        .guideFeatureYellow {
          background: rgba(248, 226, 157, 0.52);
        }

        .guideFeatureMint {
          background: rgba(221, 243, 234, 0.67);
        }

        .guideFeatureSoft {
          background: rgba(244, 236, 218, 0.48);
          opacity: 0.76;
        }

        .guideCta {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-top: 14px;
          padding: 17px 18px;
          border-radius: 22px;
          background:
            linear-gradient(
              135deg,
              rgba(248, 226, 157, 0.92),
              rgba(255, 241, 195, 0.82)
            );
          color: #4d4a52;
          text-decoration: none;
        }

        .guideCta > span:first-child {
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.75);
          color: #c59a43;
          font-size: 22px;
        }

        .guideCta > span:nth-child(2) {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .guideCta small {
          color: #a28c62;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.13em;
        }

        .guideCta strong {
          margin-top: 2px;
          font-size: 16px;
        }

        .guideCta > span:last-child {
          font-size: 25px;
          color: #b7a06f;
        }

        .guideFooter {
          padding: 26px 0 4px;
          color: #a09296;
          font-size: 11px;
          text-align: center;
        }

        .guideFooter span {
          margin-right: 6px;
          color: #c97980;
        }

        @media (max-width: 430px) {
          .guidePage {
            padding-left: 12px;
            padding-right: 12px;
          }

          .guideIntro,
          .guideSteps,
          .guideFeatures {
            padding: 21px 17px;
          }

          .guideHero h1 {
            font-size: 29px;
          }
        }
      

        /* TYPOGRAPHY POLISH */
        .guideHero h1,
        .guideIntro h2,
        .guideSteps h2,
        .guideFeatures h2 {
          word-break: keep-all;
          overflow-wrap: normal;
          letter-spacing: .01em;
        }

        .guideNoBreak {
          white-space: nowrap;
        }

        .guideCta strong {
          line-height: 1.45;
          word-break: keep-all;
        }

        .guideStepCard strong,
        .guideFeature strong {
          word-break: keep-all;
        }



        /* GUIDE COPY POLISH V2 */

        .guideIntroTitle {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1px;
          max-width: 100%;
          font-family: var(--font-sans, sans-serif);
          font-size: 20px;
          font-weight: 700;
          line-height: 1.55;
          letter-spacing: 0;
        }

        .guideIntroTitle span,
        .guidePhotoTitle span {
          display: block;
        }

        .guidePhotoTitle {
          display: flex;
          flex-direction: column;
          gap: 1px;
          line-height: 1.5;
          word-break: normal;
        }

        .guideIntro p,
        .guideStepCard p,
        .guideFeature p {
          line-break: strict;
          word-break: normal;
        }

        @media (max-width: 430px) {
          .guideIntroTitle {
            font-size: 18px;
            line-height: 1.6;
          }
        }



        /* GUIDE INTRO TITLE FINAL */
        .guideIntroTitle {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 3px;
          max-width: 100%;
          font-size: 21px;
          font-weight: 500;
          line-height: 1.55;
          letter-spacing: 0;
        }

        .guideIntroTitle span {
          display: block;
          white-space: nowrap;
        }

        @media (max-width: 430px) {
          .guideIntroTitle {
            font-size: 19px;
            line-height: 1.6;
          }
        }



        /* GUIDE INTRO FONT UNIFY */
        .guideIntroTitle {
          font-family: inherit;
          font-size: 21px;
          font-weight: 600;
          line-height: 1.55;
          letter-spacing: 0.01em;
        }

        @media (max-width: 430px) {
          .guideIntroTitle {
            font-size: 21px;
            line-height: 1.55;
          }
        }



        /* GUIDE TYPOGRAPHY FINAL */
        .guideHero h1,
        .guideIntroTitle,
        .guideSteps h2,
        .guideFeatures h2 {
          font-family: inherit;
          font-weight: 500;
          letter-spacing: -0.01em;
        }

        .guideIntroTitle {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
          font-size: 21px;
          line-height: 1.55;
        }

        .guideIntroTitle span {
          display: block;
        }

        @media (max-width: 430px) {
          .guideHero h1 {
            font-size: 29px;
          }

          .guideIntroTitle,
          .guideSteps h2,
          .guideFeatures h2 {
            font-size: 21px;
            line-height: 1.55;
          }
        }



`}</style>
    </main>
  );
}
