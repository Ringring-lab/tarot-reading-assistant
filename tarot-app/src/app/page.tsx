"use client";

import Link from "next/link";
import { Klee_One } from "next/font/google";

const kleeOne = Klee_One({
  weight: ["400", "600"],
  display: "swap",
  preload: false,
});

export default function Home() {
  return (
    <main className="tarotHome-page">
      <div className="tarotHome-frame">
        {/* HOME V2 */}
        <section className="homeV2-hero">
          <div className="homeV2-art" aria-hidden="true">
            <svg viewBox="0 0 390 190" preserveAspectRatio="xMidYMin slice">
              {/* 左上：大きな花×ステンドグラス */}
              <g className="homeV2-glassCluster homeV2-glassLeft">
                <ellipse cx="34" cy="27" rx="25" ry="61" className="glassSky" transform="rotate(-42 34 27)" />
                <ellipse cx="34" cy="27" rx="25" ry="61" className="glassMint" transform="rotate(2 34 27)" />
                <ellipse cx="34" cy="27" rx="25" ry="61" className="glassCoral" transform="rotate(44 34 27)" />
                <ellipse cx="34" cy="27" rx="25" ry="61" className="glassButter" transform="rotate(88 34 27)" />
                <circle cx="34" cy="27" r="25" className="glassIvory" />
                <path d="M34 10 L39 22 L51 27 L39 32 L34 44 L29 32 L17 27 L29 22 Z" className="glassStar" />

                <ellipse cx="30" cy="92" rx="23" ry="49" className="glassMint" transform="rotate(-30 30 92)" />
                <ellipse cx="43" cy="126" rx="22" ry="48" className="glassSky" transform="rotate(-68 43 126)" />
                <ellipse cx="23" cy="158" rx="20" ry="43" className="glassCoral" transform="rotate(-108 23 158)" />
              </g>

              {/* 右上：花びらとアーチ */}
              <g className="homeV2-glassCluster homeV2-glassRight">

                {/* 上中央から右外へ流れる、大小バラバラの花びら */}
                <ellipse
                  cx="305" cy="31"
                  rx="11" ry="25"
                  className="glassButter"
                  transform="rotate(65 305 31)"
                />

                <ellipse
                  cx="329" cy="35"
                  rx="15" ry="33"
                  className="glassCoral"
                  transform="rotate(42 329 35)"
                />

                <ellipse
                  cx="354" cy="48"
                  rx="19" ry="40"
                  className="glassMint"
                  transform="rotate(23 354 48)"
                />

                <ellipse
                  cx="368" cy="73"
                  rx="13" ry="29"
                  className="glassSky"
                  transform="rotate(-10 368 73)"
                />

                <ellipse
                  cx="363" cy="99"
                  rx="17" ry="35"
                  className="glassButter"
                  transform="rotate(-38 363 99)"
                />

                <ellipse
                  cx="348" cy="118"
                  rx="12" ry="27"
                  className="glassCoral"
                  transform="rotate(-68 348 118)"
                />

                {/* 左上のお花と同じDNAの、小さめステンドグラス花 */}
                <g className="homeV2-rightMiniBloom"
                   transform="translate(352 138) scale(.68)">
                  <ellipse cx="0" cy="0" rx="25" ry="61"
                    className="glassSky"
                    transform="rotate(-42 0 0)" />

                  <ellipse cx="0" cy="0" rx="25" ry="61"
                    className="glassMint"
                    transform="rotate(2 0 0)" />

                  <ellipse cx="0" cy="0" rx="25" ry="61"
                    className="glassCoral"
                    transform="rotate(44 0 0)" />

                  <ellipse cx="0" cy="0" rx="25" ry="61"
                    className="glassButter"
                    transform="rotate(88 0 0)" />

                  <circle cx="0" cy="0" r="25"
                    className="glassIvory" />

                  <path
                    d="M0 -17 L5 -5 L17 0 L5 5 L0 17 L-5 5 L-17 0 L-5 -5 Z"
                    className="glassStar"
                  />
                </g>
              </g>

              {/* 周囲をつなぐ細い金線 */}
              <g className="homeV2-goldLines">
                <path d="M7 185 V64 Q7 19 54 19 H106" />
                <path d="M383 185 V58 Q383 19 339 19 H292" />
                <path d="M85 8 Q122 29 144 57" />
                <path d="M305 6 Q276 27 252 55" />
              </g>

              {/* 小さな星 */}
              <g className="homeV2-floatingStars">
                <path d="M118 31 L121 39 L129 42 L121 45 L118 53 L115 45 L107 42 L115 39 Z" />
                <path d="M277 35 L280 43 L288 46 L280 49 L277 57 L274 49 L266 46 L274 43 Z" />
                <path d="M35 158 L38 166 L46 169 L38 172 L35 180 L32 172 L24 169 L32 166 Z" />
                <path d="M356 153 L359 161 L367 164 L359 167 L356 175 L353 167 L345 164 L353 161 Z" />
                <circle cx="96" cy="77" r="2.4" />
                <circle cx="295" cy="82" r="2.4" />
              </g>
            </svg>
          </div>

          <div className="homeV2-brandPill">Tarot Reading Assistant</div>
          <p className="homeV2-eyebrow">YOUR CARDS, YOUR INTUITION</p>

          <h1 className={`${kleeOne.className} homeV2-title`}>
            お気に入りの
            <br />
            タロットカードを、
            <br />
            <span>毎日のバイブルに。</span>
          </h1>

          <p className={`${kleeOne.className} homeV2-subtitle`}>
            あなたが引いたカードを、一緒に読み解く。
          </p>
        </section>

        <section className="homeV2-menu" aria-label="メインメニュー">
          <Link href="/daily" className="homeV2-card homeV2-daily">
            <span className="homeV2-icon">☆</span>
            <span className="homeV2-copy">
              <small>DAILY READING</small>
              <strong>今日の1枚</strong>
              <span>今日のカードを読み解く</span>
            </span>
            <span className="homeV2-arrow">›</span>
          </Link>

          <div className="homeV2-card homeV2-dictionary">
            <span className="homeV2-icon">▤</span>
            <span className="homeV2-copy">
              <small>TAROT DICTIONARY</small>
              <strong>タロットカード辞典</strong>
              <span>カードの意味を調べる</span>
            </span>
            <span className="homeV2-soon">準備中</span>
          </div>
        </section>

        <section className="homeV2-firstGuide">
          <div className="homeV2-guide">
            <span className="homeV2-guideSpark">♡</span>
            <span className="homeV2-guideCopy">
              <strong>初めての方へ</strong>
              <small>このサイトの楽しみ方を見る</small>
            </span>
            <span className="homeV2-soon">準備中</span>
          </div>
        </section>

        <section className="homeV2-comingWrap">
          <div className="homeV2-card homeV2-coming">
            <span className="homeV2-icon">◇</span>
            <span className="homeV2-copy">
              <small>3 CARD READING</small>
              <strong>3枚で読む</strong>
              <span>テーマをもう少し深く読み解く</span>
            </span>
            <span className="homeV2-soon">COMING SOON</span>
          </div>
        </section>

        <footer>
          <div className="tarotHome-footerSymbols">
            ☀　✦　☾
          </div>

          <strong>
            Tarot Reading Assistant
          </strong>

          <span>
            Your cards. Your intuition. Read together.
          </span>
        </footer>
      </div>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        .tarotHome-page {
          min-height: 100vh;
          padding: 16px;

          background:
            radial-gradient(
              circle at 4% 8%,
              rgba(244, 195, 47, 0.2),
              transparent 22%
            ),
            radial-gradient(
              circle at 96% 13%,
              rgba(36, 151, 167, 0.17),
              transparent 24%
            ),
            radial-gradient(
              circle at 4% 77%,
              rgba(214, 87, 69, 0.12),
              transparent 22%
            ),
            radial-gradient(
              circle at 96% 84%,
              rgba(105, 180, 143, 0.14),
              transparent 22%
            ),
            #f7f3e9;

          color: #16202c;
        }

        .tarotHome-frame {
          position: relative;
          max-width: 1440px;
          margin: 0 auto;

          overflow: hidden;

          background:
            linear-gradient(
              rgba(255, 255, 255, 0.72),
              rgba(255, 255, 255, 0.72)
            ),
            #faf7ef;

          border: 3px solid #2b8998;
          border-radius: 35px;

          box-shadow:
            inset 0 0 0 7px rgba(255, 255, 255, 0.68),
            0 22px 55px rgba(28, 83, 93, 0.08);
        }

        .tarotHome-frame::before {
          content: "";
          position: absolute;
          inset: 11px;

          border: 1px solid rgba(196, 148, 29, 0.32);
          border-radius: 25px;

          pointer-events: none;
          z-index: 2;
        }

        /* ステンドグラス */
        .tarotHome-glassLine {
          position: absolute;
          z-index: 8;

          display: flex;
          gap: 2px;
        }

        .tarotHome-glassTop {
          top: 7px;
          left: 55px;
        }

        .tarotHome-glassBottom {
          right: 55px;
          bottom: 7px;
        }

        .tarotHome-glassLine span {
          display: block;
          width: 35px;
          height: 14px;

          border-radius: 2px;
        }

        .tarotHome-homeGlassCoral {
          background: #b9543e;
        }

        .tarotHome-homeGlassYellow {
          background: #d7ad25;
        }

        .tarotHome-homeGlassTeal {
          background: #278b9b;
        }

        .tarotHome-homeGlassMint {
          background: #78b79a;
        }

        .tarotHome-homeGlassBlue {
          background: #377ca2;
        }

        .tarotHome-sideDecor {
          position: absolute;
          z-index: 1;

          display: flex;
          flex-direction: column;
          gap: 155px;

          font-size: 43px;
          opacity: 0.13;

          pointer-events: none;
        }

        .tarotHome-leftDecor {
          top: 380px;
          left: 32px;
          color: #b74f3d;
        }

        .tarotHome-rightDecor {
          top: 500px;
          right: 32px;
          color: #248295;
        }

        /* HERO */
        .tarotHome-hero {
          position: relative;
          z-index: 3;

          min-height: 820px;
          padding: 90px 45px 80px;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          text-align: center;
        }

        .tarotHome-brandPill {
          margin-bottom: 38px;
          padding: 10px 21px;

          background: rgba(255, 255, 255, 0.65);

          border: 1px solid rgba(31, 82, 94, 0.13);
          border-radius: 999px;

          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .tarotHome-brandPill span {
          margin-right: 8px;
          color: #b78a14;
        }

        .tarotHome-symbols {
          display: flex;
          gap: 19px;

          margin-bottom: 18px;

          font-size: 25px;
        }

        .tarotHome-symbols span:nth-child(1) {
          color: #c5990b;
        }

        .tarotHome-symbols span:nth-child(2) {
          color: #ad5140;
        }

        .tarotHome-symbols span:nth-child(3) {
          color: #21687b;
        }

        .tarotHome-eyebrow,
        .tarotHome-englishLabel {
          margin: 0;

          color: #19586a;

          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.2em;
        }

        .tarotHome-heroTitle {
          margin: 24px 0;

          display: flex;
          flex-direction: column;
          align-items: center;

          font-size: clamp(36px, 3.7vw, 52px);
          font-weight: 400;
          line-height: 1.5;
          letter-spacing: 0.025em;
        }

        .tarotHome-heroTitle > span {
          white-space: nowrap;
        }

        .tarotHome-heroTitle .tarotHome-accent {
          color: #a84d3a;
        }

        .tarotHome-heroSub {
          margin: 0;

          font-size: 25px;
          font-weight: 600;
          line-height: 1.65;
          letter-spacing: 0.02em;
        }

        .tarotHome-easyBadge {
          margin-top: 24px;
          padding: 10px 18px;

          display: inline-flex;
          align-items: center;
          gap: 9px;

          background: #f3e19a;

          border-radius: 999px;

          box-shadow: 0 6px 16px rgba(169, 129, 12, 0.1);

          font-size: 14px;
          font-weight: 700;
        }

        .tarotHome-check {
          width: 23px;
          height: 23px;

          display: grid;
          place-items: center;

          border-radius: 50%;

          background: #bc900c;
          color: white;

          font-size: 13px;
        }

        .tarotHome-heroDescription {
          margin: 34px 0 28px;

          color: #59636c;

          font-size: 15px;
          line-height: 2;
        }

        /* カードを用意 */
        .tarotHome-prepareBox {
          width: min(620px, 100%);
          margin-bottom: 16px;
          padding: 20px 23px;

          display: flex;
          align-items: center;
          gap: 18px;

          text-align: left;

          background:
            linear-gradient(
              110deg,
              rgba(232, 247, 245, 0.95),
              rgba(255, 248, 219, 0.9)
            );

          border: 2px solid rgba(36, 139, 154, 0.21);
          border-radius: 21px;

          box-shadow: 0 12px 28px rgba(35, 98, 110, 0.09);
        }

        .tarotHome-prepareIcon {
          width: 56px;
          height: 56px;

          flex: 0 0 56px;

          display: grid;
          place-items: center;

          background: #f1df91;
          color: #ad7f00;

          border-radius: 16px;

          font-size: 27px;
        }

        .tarotHome-prepareText {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .tarotHome-prepareLabel {
          color: #197083;

          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.13em;
        }

        .tarotHome-prepareText strong {
          font-size: 16px;
          line-height: 1.55;
        }

        .tarotHome-prepareText > span:last-child {
          color: #657078;
          font-size: 12px;
        }

        .tarotHome-mobileBreak {
          display: none;
        }

        /* HERO CTA */
        .tarotHome-mainButton {
          width: min(620px, 100%);
          min-height: 96px;
          padding: 21px 27px;

          display: flex;
          align-items: center;
          gap: 20px;

          color: white;
          text-decoration: none;
          text-align: left;

          background:
            linear-gradient(
              110deg,
              #09265d,
              #07577d 55%,
              #0792a3
            );

          border: 2px solid rgba(255, 255, 255, 0.28);
          border-radius: 24px;

          box-shadow:
            0 19px 36px rgba(7, 75, 102, 0.22),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);

          transition:
            transform 0.18s ease,
            box-shadow 0.18s ease;
        }

        .tarotHome-mainButton:hover {
          transform: translateY(-4px);

          box-shadow:
            0 25px 45px rgba(7, 75, 102, 0.28),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .tarotHome-buttonIcon {
          color: #f3c425;
          font-size: 34px;
        }

        .tarotHome-buttonText {
          flex: 1;

          display: flex;
          flex-direction: column;
        }

        .tarotHome-buttonMini {
          margin-bottom: 4px;

          font-size: 11px;
          opacity: 0.8;
        }

        .tarotHome-buttonMain {
          font-size: 22px;
          font-weight: 800;
        }

        .tarotHome-arrow {
          font-size: 28px;
        }

        .tarotHome-buttonNote {
          margin-top: 13px;

          color: #737a7e;
          font-size: 12px;
        }

        /* HOW */
        .tarotHome-howSection {
          position: relative;
          z-index: 3;

          padding: 115px 60px;

          text-align: center;

          background:
            linear-gradient(
              180deg,
              rgba(218, 242, 238, 0.52),
              rgba(255, 246, 212, 0.4)
            );

          border-top: 1px solid rgba(35, 124, 141, 0.08);
          border-bottom: 1px solid rgba(35, 124, 141, 0.08);
        }

        .tarotHome-sectionEyebrow {
          margin: 0;

          color: #966a1f;

          font-size: 13px;
          font-weight: 700;
        }

        .tarotHome-sectionTitle {
          margin: 28px auto 55px;

          font-size: clamp(34px, 4vw, 54px);
          font-weight: 400;
          line-height: 1.5;
        }

        .tarotHome-steps {
          max-width: 1180px;
          margin: 0 auto;

          display: grid;
          grid-template-columns: 1fr auto 1fr auto 1fr;
          align-items: center;
          gap: 18px;
        }

        .tarotHome-stepCard {
          min-height: 360px;
          padding: 30px;

          background: rgba(255, 255, 255, 0.8);

          border: 2px solid rgba(38, 91, 101, 0.08);
          border-top: 5px solid;
          border-radius: 28px;

          box-shadow: 0 17px 35px rgba(42, 55, 62, 0.08);

          text-align: center;
        }

        .tarotHome-tealCard {
          border-top-color: #2c8997;
        }

        .tarotHome-goldCard {
          border-top-color: #c49a1b;
        }

        .tarotHome-coralCard {
          border-top-color: #ae513e;
        }

        .tarotHome-stepNumber {
          display: block;

          color: #6c7175;

          text-align: left;

          font-size: 12px;
          font-weight: 800;
        }

        .tarotHome-stepIcon {
          width: 68px;
          height: 68px;
          margin: 52px auto 35px;

          display: grid;
          place-items: center;

          background: #e6efed;

          border-radius: 50%;

          color: #275c67;

          font-size: 30px;
        }

        .tarotHome-goldCard .tarotHome-stepIcon {
          background: #f3e4ad;
          color: #9f7a0a;
        }

        .tarotHome-coralCard .tarotHome-stepIcon {
          background: #efe0d9;
          color: #a64c3d;
        }

        .tarotHome-stepCard h3 {
          margin-bottom: 20px;

          font-size: 20px;
          font-weight: 600;
        }

        .tarotHome-stepCard p {
          margin: 0;

          color: #505963;

          font-size: 14px;
          line-height: 2;
        }

        .tarotHome-stepArrow {
          color: #5e7378;
          font-size: 20px;
        }

        /* WHY */
        .tarotHome-whySection {
          position: relative;
          z-index: 3;

          padding: 115px 75px;

          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 80px;
          align-items: center;

          background:
            radial-gradient(
              circle at 83% 50%,
              rgba(235, 194, 57, 0.11),
              transparent 33%
            ),
            rgba(255, 255, 255, 0.55);
        }

        .tarotHome-whyTitle {
          margin: 24px 0 38px;

          font-size: clamp(36px, 4.2vw, 58px);
          font-weight: 400;
          line-height: 1.55;
        }

        .tarotHome-questions {
          color: #505866;

          font-size: 15px;
          line-height: 1.85;
        }

        .tarotHome-questions p {
          margin: 9px 0;
        }

        .tarotHome-whyStrong {
          margin-top: 35px;

          font-size: 16px;
          font-weight: 700;
        }

        .tarotHome-cardIllustration {
          position: relative;
          min-height: 340px;
        }

        .tarotHome-fakeCard {
          position: absolute;
          top: 40px;
          left: 50%;

          width: 160px;
          height: 260px;

          display: grid;
          place-items: center;

          border: 5px solid white;
          border-radius: 22px;

          color: #f1c527;

          font-size: 66px;

          box-shadow: 0 20px 35px rgba(0, 0, 0, 0.15);
        }

        .tarotHome-cardBlue {
          background:
            linear-gradient(
              160deg,
              #06295a,
              #09839d
            );

          transform:
            translateX(-150px)
            rotate(-12deg);
        }

        .tarotHome-cardYellow {
          z-index: 3;

          background:
            linear-gradient(
              160deg,
              #d1aa43,
              #dcbd67
            );

          transform:
            translateX(-50%)
            rotate(1deg);
        }

        .tarotHome-cardRed {
          color: white;

          background:
            linear-gradient(
              160deg,
              #aa4d3d,
              #76304c
            );

          transform:
            translateX(50px)
            rotate(11deg);
        }

        /* READING */
        .tarotHome-readingSection {
          position: relative;
          z-index: 3;

          padding: 110px 60px 130px;

          background:
            linear-gradient(
              135deg,
              rgba(216, 241, 238, 0.7),
              rgba(255, 247, 216, 0.58)
            );
        }

        .tarotHome-centered {
          text-align: center;
        }

        .tarotHome-readingTitle {
          margin: 28px 0 55px;

          text-align: center;

          font-size: clamp(36px, 4vw, 56px);
          font-weight: 400;
        }

        .tarotHome-readingGrid {
          max-width: 1050px;
          margin: 0 auto;

          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }

        .homeReadingCard {
          position: relative;

          min-height: 470px;
          padding: 44px 42px;

          color: inherit;
          text-decoration: none;

          border-radius: 30px;

          overflow: hidden;

          transition:
            transform 0.18s ease,
            box-shadow 0.18s ease;
        }

        /* 使えるカード */
        .tarotHome-availableCard {
          background:
            linear-gradient(
              145deg,
              #ffffff,
              #eef9f7
            );

          border: 3px solid #2b8c9c;

          box-shadow:
            0 22px 48px rgba(23, 91, 105, 0.15),
            inset 0 0 0 5px rgba(255, 255, 255, 0.55);
        }

        .tarotHome-availableCard:hover {
          transform: translateY(-6px);

          box-shadow:
            0 29px 54px rgba(23, 91, 105, 0.22),
            inset 0 0 0 5px rgba(255, 255, 255, 0.55);
        }

        /* Coming Soonも四角を明確に */
        .tarotHome-comingCard {
          background:
            linear-gradient(
              145deg,
              rgba(248, 244, 234, 0.96),
              rgba(236, 234, 225, 0.94)
            );

          border: 3px solid #c4bcae;

          box-shadow:
            0 18px 38px rgba(77, 70, 59, 0.09),
            inset 0 0 0 5px rgba(255, 255, 255, 0.4);

          opacity: 0.72;
        }

        .tarotHome-readingTop {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .tarotHome-readingIcon {
          width: 64px;
          height: 64px;

          display: grid;
          place-items: center;

          border-radius: 18px;

          font-size: 28px;
        }

        .tarotHome-sunIcon {
          background: #f0e1a1;
          color: #b08200;
        }

        .tarotHome-starIcon {
          background: #eee2bb;
          color: #a98010;
        }

        .tarotHome-status {
          padding: 7px 13px;

          border-radius: 999px;

          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.1em;
        }

        .tarotHome-availableStatus {
          background: #dff2ef;
          color: #176174;
        }

        .tarotHome-comingStatus {
          background: #e4ddd1;
          color: #71685d;
        }

        .homeReadingCard h3 {
          margin: 32px 0 20px;

          font-size: 28px;
          font-weight: 600;
        }

        .homeReadingCard p {
          min-height: 88px;
          margin: 0;

          color: #535c64;

          font-size: 14px;
          line-height: 1.9;
        }

        .tarotHome-tags {
          margin-top: 31px;

          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tarotHome-tags span {
          padding: 7px 11px;

          background: rgba(255, 255, 255, 0.78);

          border: 1px solid rgba(46, 82, 88, 0.08);
          border-radius: 999px;

          font-size: 11px;
          font-weight: 600;
        }

        .tarotHome-cardButton {
          min-height: 61px;
          margin-top: 39px;
          padding: 0 21px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          color: white;

          background:
            linear-gradient(
              110deg,
              #0a4772,
              #0e91a1
            );

          border-radius: 18px;

          box-shadow: 0 13px 26px rgba(14, 101, 120, 0.2);

          font-size: 15px;
          font-weight: 800;
        }

        .tarotHome-soonButton {
          min-height: 61px;
          margin-top: 39px;
          padding: 0 21px;

          display: flex;
          align-items: center;

          color: #746f67;
          background: #ddd7cc;

          border: 2px solid #c8c0b4;
          border-radius: 18px;

          font-size: 14px;
          font-weight: 700;
        }

        /* FINAL */
        .tarotHome-finalSection {
          position: relative;
          z-index: 3;

          padding: 125px 40px;

          text-align: center;

          background:
            radial-gradient(
              circle at 14% 45%,
              rgba(215, 96, 75, 0.1),
              transparent 17%
            ),
            radial-gradient(
              circle at 87% 36%,
              rgba(34, 151, 164, 0.1),
              transparent 19%
            );
        }

        .tarotHome-finalSpark {
          margin-bottom: 26px;

          color: #b38a12;
          font-size: 28px;
        }

        .tarotHome-finalTitle {
          margin: 0 0 34px;

          font-size: clamp(38px, 4.1vw, 58px);
          font-weight: 400;
          line-height: 1.55;
        }

        .tarotHome-finalSection p {
          color: #626a72;

          font-size: 14px;
          line-height: 2;
        }

        /* 最後も完全にボタン化 */
        .tarotHome-finalButton {
          width: min(430px, 100%);
          min-height: 72px;
          margin: 38px auto 0;
          padding: 0 24px;

          display: flex;
          align-items: center;
          gap: 16px;

          color: white;
          text-decoration: none;

          background:
            linear-gradient(
              110deg,
              #082c61,
              #096d89 58%,
              #159aa5
            );

          border: 2px solid rgba(255, 255, 255, 0.34);
          border-radius: 24px;

          box-shadow:
            0 17px 35px rgba(13, 94, 113, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.23);

          transition:
            transform 0.18s ease,
            box-shadow 0.18s ease;
        }

        .tarotHome-finalButton:hover {
          transform: translateY(-4px);

          box-shadow:
            0 23px 44px rgba(13, 94, 113, 0.27),
            inset 0 1px 0 rgba(255, 255, 255, 0.23);
        }

        .tarotHome-finalButtonIcon {
          color: #f2c629;
          font-size: 27px;
        }

        .tarotHome-finalButtonText {
          flex: 1;

          text-align: left;

          font-size: 16px;
          font-weight: 800;
        }

        .tarotHome-finalArrow {
          font-size: 24px;
        }

        footer {
          padding: 55px 30px 65px;

          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 9px;

          text-align: center;

          background: rgba(255, 255, 255, 0.36);

          border-top: 1px solid rgba(20, 60, 70, 0.08);
        }

        .tarotHome-footerSymbols {
          margin-bottom: 8px;
          color: #997516;
        }

        footer strong {
          font-size: 14px;
        }

        footer span {
          color: #767d83;
          font-size: 11px;
        }

        @media (max-width: 820px) {
          .tarotHome-page {
            padding: 7px;
          }

          .tarotHome-frame {
            border-radius: 22px;
          }

          .tarotHome-frame::before {
            inset: 6px;
            border-radius: 17px;
          }

          .tarotHome-glassTop {
            left: 25px;
          }

          .tarotHome-glassBottom {
            right: 25px;
          }

          .tarotHome-glassLine span {
            width: 21px;
            height: 10px;
          }

          .tarotHome-sideDecor {
            display: none;
          }

          .tarotHome-hero {
            min-height: auto;
            padding: 72px 20px 70px;
          }

          .tarotHome-brandPill {
            margin-bottom: 33px;
            font-size: 11px;
          }

          .tarotHome-heroTitle {
            font-size: clamp(31px, 8vw, 38px);
            line-height: 1.55;
          }

          .tarotHome-heroTitle > span {
            white-space: normal;
          }

          .tarotHome-heroSub {
            font-size: 21px;
          }

          .tarotHome-heroDescription {
            font-size: 13px;
          }

          .tarotHome-prepareBox {
            padding: 17px;
          }

          .tarotHome-prepareIcon {
            width: 48px;
            height: 48px;
            flex-basis: 48px;
          }

          .tarotHome-prepareText strong {
            font-size: 14px;
          }

          .tarotHome-mobileBreak {
            display: inline;
          }

          .tarotHome-mainButton {
            min-height: 86px;
            padding: 18px;

            border-radius: 20px;
          }

          .tarotHome-buttonIcon {
            font-size: 28px;
          }

          .tarotHome-buttonMain {
            font-size: 18px;
          }

          .tarotHome-howSection,
          .tarotHome-readingSection {
            padding: 85px 20px;
          }

          .tarotHome-sectionTitle {
            font-size: 32px;
          }

          .tarotHome-steps {
            display: flex;
            flex-direction: column;
          }

          .tarotHome-stepCard {
            width: 100%;
            min-height: auto;
            padding: 28px 25px 38px;
          }

          .tarotHome-stepIcon {
            margin: 32px auto 25px;
          }

          .tarotHome-stepArrow {
            transform: rotate(90deg);
          }

          .tarotHome-whySection {
            padding: 85px 25px;

            grid-template-columns: 1fr;
            gap: 30px;
          }

          .tarotHome-whyTitle {
            font-size: 32px;
          }

          .tarotHome-cardIllustration {
            min-height: 280px;
            transform: scale(0.8);
          }

          .tarotHome-readingTitle {
            font-size: 34px;
          }

          .tarotHome-readingGrid {
            grid-template-columns: 1fr;
          }

          .homeReadingCard {
            min-height: auto;
            padding: 28px;
          }

          .tarotHome-finalSection {
            padding: 90px 25px;
          }

          .tarotHome-finalTitle {
            font-size: 35px;
          }
        }

        @media (max-width: 480px) {
          .tarotHome-heroTitle {
            font-size: 31px;
          }

          .tarotHome-heroSub {
            font-size: 19px;
          }

          .tarotHome-easyBadge {
            font-size: 13px;
          }

          .tarotHome-sectionTitle,
          .tarotHome-whyTitle,
          .tarotHome-readingTitle,
          .tarotHome-finalTitle {
            font-size: 24px;
            line-height: 1.45;
          }

          .homeReadingCard h3 {
            font-size: 20px;
            line-height: 1.4;
            letter-spacing: -0.03em;
            word-break: keep-all;
            overflow-wrap: normal;
          }

          .homeReadingCard p {
            font-size: 13px;
            line-height: 1.8;
          }

          .tarotHome-whyTitle {
            font-size: 23px;
            line-height: 1.5;
          }

          .tarotHome-sectionTitle {
            font-size: 23px;
            line-height: 1.5;
          }

          .tarotHome-cardIllustration {
            margin: -25px -50px;
            transform: scale(0.67);
          }

          .tarotHome-finalButton {
            min-height: 68px;
            padding: 0 18px;
          }

          .tarotHome-finalButtonText {
            font-size: 14px;
          }
        }
      
        /* HOME READING CARD POLISH */
        .homeReadingCard {
          padding: 44px 42px;
        }

        .homeReadingCard h3 {
          margin-top: 22px;
          margin-bottom: 14px;
        }

        .homeReadingCard p {
          margin-top: 0;
          line-height: 1.85;
        }

        @media (max-width: 480px) {
          .homeReadingCard {
            padding: 28px 24px;
            min-height: auto;
          }

          .homeReadingCard h3 {
            font-size: 20px;
            line-height: 1.4;
            letter-spacing: -0.03em;
            word-break: keep-all;
            overflow-wrap: normal;
          }

          .homeReadingCard p {
            font-size: 13px;
            line-height: 1.8;
          }
        }


        /* reading-card-spacing-v1 */

        /* PC：2枚の選択カードにゆったりした余白 */
        @media (min-width: 769px) {
          .homeReadingCard {
            padding: 44px 42px;
          }
        }

        /* スマホ：端に詰まらず、でも広げすぎない */
        @media (max-width: 768px) {
          .homeReadingCard {
            padding: 30px 24px 26px;
          }

          .homeReadingCard h3 {
            font-size: 22px;
            line-height: 1.4;
            letter-spacing: -0.03em;
            word-break: keep-all;
            overflow-wrap: normal;
          }

          .homeReadingCard p {
            font-size: 14px;
            line-height: 1.8;
          }
        }

        

        /* HOME V2 DESIGN */
        .tarotHome-page {
          --home-ivory: #fffaf3;
          --home-navy: #18314b;
          --home-sky: #71c4dc;
          --home-mint: #a9d8cb;
          --home-coral: #f4a08f;
          --home-butter: #f5d977;
          --home-gold: #d8a23a;

          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(255, 243, 199, 0.45),
              transparent 30%
            ),
            var(--home-ivory);
        }

        .homeV2-hero {
          max-width: 680px;
          margin: 0 auto;
          padding: 12px 18px 6px;
          text-align: center;
        }

        .homeV2-art {
          width: min(94%, 430px);
          margin: 0 auto 5px;
        }

        .homeV2-art svg {
          display: block;
          width: 100%;
          height: auto;
          overflow: visible;
        }

        .homeV2-stained ellipse,
        .homeV2-stained circle,
        .homeV2-stained path {
          stroke: var(--home-gold);
          stroke-width: 1.5;
          vector-effect: non-scaling-stroke;
        }

        .petalSky {
          fill: var(--home-sky);
          fill-opacity: 0.86;
        }

        .petalMint {
          fill: var(--home-mint);
          fill-opacity: 0.84;
        }

        .petalCoral {
          fill: var(--home-coral);
          fill-opacity: 0.80;
        }

        .petalButter {
          fill: var(--home-butter);
          fill-opacity: 0.76;
        }

        .petalIvory {
          fill: #fffdf7;
        }

        .centerStar,
        .homeV2-stars {
          fill: var(--home-gold);
        }

        .homeV2-brandPill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 6px 13px;
          border: 1px solid rgba(216, 162, 58, 0.36);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.76);
          color: var(--home-navy);
          font-size: 10px;
          letter-spacing: 0.08em;
        }

        .homeV2-eyebrow {
          margin: 10px 0 4px;
          color: #569aad;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.18em;
        }

        .homeV2-title {
          margin: 0;
          color: var(--home-navy);
          font-size: clamp(28px, 7.7vw, 44px);
          line-height: 1.35;
          letter-spacing: -0.035em;
          font-weight: 600;
        }

        .homeV2-title span {
          color: #2e8194;
        }

        .homeV2-subtitle {
          margin: 7px 0 0;
          color: #566d7d;
          font-size: 13px;
          line-height: 1.65;
        }

        .homeV2-menu {
          width: min(calc(100% - 28px), 610px);
          margin: 12px auto 0;
          display: grid;
          gap: 8px;
        }

        .homeV2-card,
        .homeV2-guide {
          min-width: 0;
          display: flex;
          align-items: center;
          gap: 12px;
          border-radius: 20px;
          color: var(--home-navy);
        }

        .homeV2-card {
          padding: 13px 15px;
        }

        a.homeV2-card {
          text-decoration: none;
        }

        .homeV2-daily {
          min-height: 76px;
          background:
            linear-gradient(
              135deg,
              rgba(113, 196, 220, 0.25),
              rgba(169, 216, 203, 0.25)
            ),
            #fff;
          border: 1.5px solid rgba(75, 165, 191, 0.34);
          box-shadow: 0 7px 20px rgba(38, 103, 126, 0.07);
        }

        .homeV2-dictionary {
          min-height: 68px;
          background:
            linear-gradient(
              135deg,
              rgba(244, 160, 143, 0.14),
              rgba(245, 217, 119, 0.18)
            ),
            #fff;
          border: 1px solid rgba(216, 162, 58, 0.27);
        }

        .homeV2-coming {
          min-height: 60px;
          background: rgba(255, 255, 255, 0.58);
          border: 1px dashed rgba(24, 49, 75, 0.15);
          opacity: 0.72;
        }

        .homeV2-icon {
          flex: 0 0 auto;
          width: 39px;
          height: 39px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          border: 1px solid rgba(216, 162, 58, 0.23);
          background: rgba(255, 255, 255, 0.82);
          color: var(--home-gold);
          font-size: 18px;
        }

        .homeV2-copy {
          min-width: 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .homeV2-copy small {
          margin-bottom: 1px;
          color: #8099a6;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.13em;
        }

        .homeV2-copy strong {
          font-size: 17px;
          line-height: 1.3;
        }

        .homeV2-copy span {
          margin-top: 2px;
          color: #788793;
          font-size: 10px;
          line-height: 1.4;
        }

        .homeV2-arrow {
          flex: 0 0 auto;
          color: #83a7b0;
          font-size: 25px;
          line-height: 1;
        }

        .homeV2-soon {
          flex: 0 0 auto;
          padding: 5px 7px;
          border-radius: 999px;
          background: #f4eee3;
          color: #907c62;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.04em;
        }

        .homeV2-firstGuide {
          width: min(calc(100% - 28px), 610px);
          margin: 11px auto 18px;
        }

        .homeV2-guide {
          padding: 13px 15px;
          background:
            linear-gradient(
              135deg,
              rgba(244, 160, 143, 0.78),
              rgba(245, 217, 119, 0.76)
            );
          border: 1px solid rgba(216, 162, 58, 0.27);
          box-shadow: 0 6px 18px rgba(174, 119, 80, 0.07);
        }

        .homeV2-guideSpark {
          flex: 0 0 auto;
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.72);
          color: #bc7942;
        }

        .homeV2-guideCopy {
          min-width: 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .homeV2-guideCopy strong {
          font-size: 15px;
        }

        .homeV2-guideCopy small {
          margin-top: 2px;
          color: #655f59;
          font-size: 10px;
        }

        @media (min-width: 769px) {
          .homeV2-hero {
            padding-top: 24px;
          }

          .homeV2-menu {
            grid-template-columns: 1fr 1fr;
          }

          .homeV2-daily,
          .homeV2-dictionary {
            min-height: 100px;
          }

          .homeV2-coming {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 430px) {
          .homeV2-hero {
            padding-top: 6px;
          }

          .homeV2-art {
            width: 88%;
            margin-bottom: 2px;
          }

          .homeV2-title {
            font-size: 28px;
          }

          .homeV2-menu {
            margin-top: 9px;
          }
        }



        /* HOME V2 ORNAMENT FIX */
        .homeV2-hero {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          padding-top: 98px;
        }

        .homeV2-art {
          position: absolute;
          z-index: 0;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: min(100%, 680px);
          max-width: none;
          height: 190px;
          margin: 0;
          pointer-events: none;
        }

        .homeV2-art svg {
          width: 100%;
          height: 190px;
        }

        .homeV2-brandPill,
        .homeV2-eyebrow,
        .homeV2-title,
        .homeV2-subtitle {
          position: relative;
          z-index: 1;
        }

        .homeV2-glassCluster ellipse,
        .homeV2-glassCluster circle,
        .homeV2-glassCluster path {
          stroke: #d8a23a;
          stroke-width: 1.35;
          vector-effect: non-scaling-stroke;
        }

        .glassSky {
          fill: #71c4dc;
          fill-opacity: .78;
        }

        .glassMint {
          fill: #a9d8cb;
          fill-opacity: .78;
        }

        .glassCoral {
          fill: #f4a08f;
          fill-opacity: .74;
        }

        .glassButter {
          fill: #f5d977;
          fill-opacity: .72;
        }

        .glassIvory {
          fill: #fffaf3;
        }

        .glassStar,
        .homeV2-floatingStars {
          fill: #d8a23a;
        }

        .homeV2-goldLines {
          fill: none;
          stroke: #d8a23a;
          stroke-width: 1.15;
          stroke-linecap: round;
          opacity: .72;
          vector-effect: non-scaling-stroke;
        }

        .homeV2-floatingStars {
          opacity: .82;
        }

        @media (max-width: 430px) {
          .homeV2-hero {
            padding-top: 88px;
          }

          .homeV2-art {
            width: 100%;
            height: 172px;
          }

          .homeV2-art svg {
            height: 172px;
          }
        }



        /* HOME V2 CORAL POLISH */

        .tarotHome-page {
          --home-ivory: #fffdf9;
          --home-navy: #4d4a52;
          --home-coral: #f6b7b2;
          --home-blush: #f8c8cb;
          --home-peach: #f9cec0;
          --home-sky: #dceff7;
          --home-mint: #ddf3ea;
          --home-butter: #f8e8b6;
          --home-gold: #d8b46f;

          background:
            radial-gradient(circle at 50% 0%,
              rgba(255, 231, 226, .55),
              transparent 28%),
            #fffdf9;
        }

        .homeV2-hero {
          padding-top: 54px;
          padding-bottom: 4px;
        }

        .homeV2-art,
        .homeV2-art svg {
          height: 108px;
        }

        .glassSky {
          fill: #dceff7;
          fill-opacity: .66;
        }

        .glassMint {
          fill: #ddf3ea;
          fill-opacity: .68;
        }

        .glassCoral {
          fill: #f6b7b2;
          fill-opacity: .72;
        }

        .glassButter {
          fill: #f8e8b6;
          fill-opacity: .68;
        }

        .glassIvory {
          fill: #fffaf6;
        }

        .homeV2-glassCluster ellipse,
        .homeV2-glassCluster circle,
        .homeV2-glassCluster path {
          stroke: #d8b46f;
          stroke-width: 1.05;
        }

        .glassStar,
        .homeV2-floatingStars {
          fill: #d8b46f;
        }

        .homeV2-goldLines {
          stroke: #d8b46f;
          opacity: .46;
        }

        .homeV2-title {
          color: #4d4a52;
        }

        .homeV2-title span {
          color: #c97980;
        }

        .homeV2-eyebrow {
          color: #b77f86;
          margin-top: 7px;
        }

        .homeV2-subtitle {
          color: #777078;
          margin-top: 5px;
        }

        .homeV2-menu {
          margin-top: 8px;
          gap: 7px;
        }

        .homeV2-card,
        .homeV2-guide {
          border-radius: 21px;
        }

        .homeV2-daily {
          min-height: 67px;
          padding: 11px 15px;
          background:
            linear-gradient(135deg,
              rgba(246,183,178,.62),
              rgba(248,200,203,.42)),
            rgba(255,255,255,.78);
          border-color: rgba(220,143,148,.30);
          box-shadow: 0 7px 20px rgba(205,127,134,.08);
        }

        .homeV2-daily .homeV2-icon {
          background: rgba(255,255,255,.73);
          color: #cb8087;
        }

        .homeV2-dictionary {
          min-height: 62px;
          padding: 10px 15px;
          background:
            linear-gradient(135deg,
              rgba(221,243,234,.74),
              rgba(255,235,236,.52)),
            rgba(255,255,255,.80);
        }

        .homeV2-dictionary .homeV2-icon {
          color: #88b9ac;
        }

        .homeV2-firstGuide {
          margin-top: 8px;
          margin-bottom: 8px;
        }

        .homeV2-guide {
          min-height: 60px;
          padding: 10px 15px;
          background:
            linear-gradient(135deg,
              rgba(248,200,203,.88),
              rgba(249,206,192,.84));
          border-color: rgba(220,143,148,.24);
        }

        .homeV2-guideSpark {
          background: rgba(255,255,255,.70);
          color: #c97980;
        }

        .homeV2-comingWrap {
          width: min(calc(100% - 28px), 610px);
          margin: 0 auto 18px;
        }

        .homeV2-coming {
          min-height: 50px;
          padding: 8px 14px;
          opacity: .62;
          background:
            linear-gradient(135deg,
              rgba(248,232,182,.30),
              rgba(248,200,203,.16)),
            rgba(255,255,255,.55);
        }

        .homeV2-copy strong {
          color: #4d4a52;
        }

        .homeV2-copy span {
          color: #817980;
        }

        .homeV2-soon {
          background: rgba(255,255,255,.62);
          color: #978780;
        }

        @media (max-width: 430px) {
          .homeV2-title {
            font-size: 27px;
            line-height: 1.30;
          }
        }



        /* HOME V2 COLOR ROLES */

        /* ① 今日の1枚：バターイエロー */
        .homeV2-daily {
          background:
            linear-gradient(
              135deg,
              rgba(248, 226, 157, .82),
              rgba(255, 241, 195, .68)
            ),
            rgba(255,255,255,.82);
          border-color: rgba(218, 184, 101, .34);
          box-shadow: 0 7px 20px rgba(202, 169, 83, .08);
        }

        .homeV2-daily .homeV2-icon {
          background: rgba(255,255,255,.76);
          color: #d1a64f;
          border-color: rgba(209,166,79,.20);
        }

        /* ② 辞典：ミント＋ペールブルー */
        .homeV2-dictionary {
          background:
            linear-gradient(
              135deg,
              rgba(214, 241, 231, .86),
              rgba(220, 239, 247, .70)
            ),
            rgba(255,255,255,.82);
          border-color: rgba(137, 190, 174, .28);
        }

        .homeV2-dictionary .homeV2-icon {
          background: rgba(255,255,255,.75);
          color: #79aa9d;
          border-color: rgba(121,170,157,.18);
        }

        /* ③ 初めての方へ：一番目につくコーラルピンク */
        .homeV2-guide {
          background:
            linear-gradient(
              135deg,
              rgba(247, 166, 174, .92),
              rgba(250, 193, 184, .88)
            );
          border: 1.2px solid rgba(210, 118, 128, .26);
          box-shadow: 0 7px 20px rgba(203, 116, 126, .09);
        }

        .homeV2-guideSpark {
          background: rgba(255,255,255,.78);
          color: #c85f70;
          border: 1px solid rgba(255,255,255,.50);
        }

        .homeV2-guideCopy strong {
          color: #5b454b;
        }

        .homeV2-guideCopy small {
          color: #745e63;
        }

        /* ④ 3枚引き：一番控えめ */
        .homeV2-coming {
          background:
            linear-gradient(
              135deg,
              rgba(244, 236, 218, .44),
              rgba(247, 225, 221, .24)
            ),
            rgba(255,255,255,.52);
          border-color: rgba(171, 155, 139, .15);
          opacity: .58;
        }

        .homeV2-coming .homeV2-icon {
          color: #baa17d;
          background: rgba(255,255,255,.58);
        }

        .homeV2-coming .homeV2-soon {
          background: rgba(255,255,255,.62);
          color: #998d83;
        }



        /* HOME V2 ASYMMETRY */

        /* 上部を少しだけ圧縮 */
        .homeV2-hero {
          padding-top: 46px;
        }

        .homeV2-art,
        .homeV2-art svg {
          height: 96px;
        }

        /*
          左：大きく・少し下へ
          右：小さく・軽く
        */
        .homeV2-glassLeft {
          transform-box: fill-box;
          transform-origin: left top;
          transform: translate(-5px, 7px) scale(1.08);
        }

        .homeV2-glassRight {
          transform-box: fill-box;
          transform-origin: right top;
          transform: translate(7px, -5px) scale(.82);
          opacity: .78;
        }

        /* 金線も左右で少し軽さを変える */
        .homeV2-goldLines {
          opacity: .39;
        }

        /* 星の位置感を少し不均一に */
        .homeV2-floatingStars {
          opacity: .72;
        }

        .homeV2-floatingStars path:nth-child(1) {
          transform: translate(4px, 7px);
        }

        .homeV2-floatingStars path:nth-child(2) {
          transform: translate(-8px, -3px) scale(.82);
          transform-origin: center;
        }

        .homeV2-floatingStars path:nth-child(3) {
          transform: translate(10px, -2px) scale(.92);
          transform-origin: center;
        }

        .homeV2-floatingStars path:nth-child(4) {
          transform: translate(-6px, 5px) scale(.72);
          transform-origin: center;
        }

        @media (max-width: 430px) {
          .homeV2-hero {
            padding-top: 40px;
          }

          .homeV2-art,
          .homeV2-art svg {
            height: 88px;
          }

          .homeV2-glassLeft {
            transform: translate(-9px, 8px) scale(1.12);
          }

          .homeV2-glassRight {
            transform: translate(12px, -7px) scale(.76);
          }
        }



        /* HOME V2 ROUND PETALS */
        .homeV2-glassRight {
          transform: translateX(-4px);
          transform-origin: center;
        }

        .homeV2-glassCluster ellipse {
          stroke-linejoin: round;
        }



        /* HOME V2 PETAL RHYTHM */
        .homeV2-glassLeft {
          transform: translate(-3px, 1px);
          transform-origin: top left;
        }

        .homeV2-glassRight {
          transform: translate(-2px, -3px);
          transform-origin: top right;
        }



        /* HOME V2 RIGHT ORNAMENT V3 */

        /* 右上は左より小さく、違うリズムに */
        .homeV2-glassRight {
          transform: translate(-3px, -2px) scale(.82);
          transform-origin: top right;
        }

        /* 初めての方へ＝Dailyとは違う花アイコン */
        .homeV2-guideSpark {
          font-size: 19px;
          font-family: serif;
          color: #c65f73;
        }



        /* HOME V2 HEART MINI FLOWER STAR SHIFT */

        .homeV2-guideSpark {
          font-family: inherit;
          font-size: 23px;
          line-height: 1;
          color: #c65f73;
        }

        .homeV2-miniFlower {
          opacity: .82;
        }

        .homeV2-miniFlower circle {
          stroke: #d8b46f;
          stroke-width: 1;
          vector-effect: non-scaling-stroke;
        }



        /* HOME V2 MINI BLOOM + OUTLINE STAR */

        .homeV2-rightMiniBloom {
          opacity: .78;
        }

        .homeV2-rightMiniBloom ellipse,
        .homeV2-rightMiniBloom circle,
        .homeV2-rightMiniBloom path {
          stroke: #d8b46f;
          stroke-width: 1.2;
          vector-effect: non-scaling-stroke;
        }

        .homeV2-daily .homeV2-icon {
          font-size: 22px;
          font-weight: 400;
          line-height: 1;
        }



        /* HOME V2 ARCH VARIATION */
        .homeV2-glassRight {
          transform: none;
          transform-origin: top right;
        }

        .homeV2-rightMiniBloom {
          opacity: .80;
        }

`}</style>
    </main>
  );
}