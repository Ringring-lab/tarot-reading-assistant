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
        {/* ステンドグラス装飾 */}
        <div className="tarotHome-glassLine tarotHome-glassTop" aria-hidden="true">
          <span className="tarotHome-homeGlassCoral" />
          <span className="tarotHome-homeGlassYellow" />
          <span className="tarotHome-homeGlassTeal" />
          <span className="tarotHome-homeGlassMint" />
          <span className="tarotHome-homeGlassBlue" />
          <span className="tarotHome-homeGlassYellow" />
          <span className="tarotHome-homeGlassCoral" />
        </div>

        <div className="tarotHome-glassLine tarotHome-glassBottom" aria-hidden="true">
          <span className="tarotHome-homeGlassBlue" />
          <span className="tarotHome-homeGlassMint" />
          <span className="tarotHome-homeGlassYellow" />
          <span className="tarotHome-homeGlassCoral" />
          <span className="tarotHome-homeGlassTeal" />
          <span className="tarotHome-homeGlassYellow" />
          <span className="tarotHome-homeGlassBlue" />
        </div>

        <div className="tarotHome-sideDecor tarotHome-leftDecor" aria-hidden="true">
          <span>☀</span>
          <span>✦</span>
          <span>❋</span>
          <span>☾</span>
        </div>

        <div className="tarotHome-sideDecor tarotHome-rightDecor" aria-hidden="true">
          <span>☾</span>
          <span>❋</span>
          <span>✦</span>
          <span>☀</span>
        </div>

        {/* HERO */}
        <section className="tarotHome-hero">
          <div className="tarotHome-brandPill">
            <span>✦</span>
            Tarot Reading Assistant
          </div>

          <div className="tarotHome-symbols" aria-hidden="true">
            <span>☀</span>
            <span>✦</span>
            <span>☾</span>
          </div>

          <p className="tarotHome-eyebrow">
            YOUR CARDS, YOUR INTUITION
          </p>

          <h1 className={`${kleeOne.className} tarotHome-heroTitle`}>
              お気に入りの
              <br className="tarotHome-mobileBreak" />
              タロットカードを、
              <br />
              <span>毎日のバイブルに。</span>
            </h1>

          <p className={`${kleeOne.className} heroSub`}>
            あなたが引いたカードを、
            <br />
            一緒に読み解く。
          </p>

          <div className="tarotHome-easyBadge">
            <span className="tarotHome-check">✓</span>
            意味を覚えなくてもOK！
          </div>

          <p className="tarotHome-heroDescription">
            自分でシャッフルして、自分の直感で引いた一枚。
            <br />
            カードを選ぶか写真を撮れば、
            <br />
            今日のテーマに合わせて読み解きをお手伝いします。
          </p>

          <div className="tarotHome-prepareBox">
            <div className="tarotHome-prepareIcon">☀</div>

            <div className="tarotHome-prepareText">
              <span className="tarotHome-prepareLabel">
                STEP 01
              </span>

              <strong>
                  まずは、お気に入りの
                  <br className="tarotHome-mobileBreak" />
                  タロットカードを
                  <br />
                  手元に用意してください。
                </strong>

              <span>
                自分でシャッフルして、直感で1枚引いてみましょう。
              </span>
            </div>
          </div>

          <Link href="/daily" className="tarotHome-mainButton">
            <div className="tarotHome-buttonIcon">☀</div>

            <div className="tarotHome-buttonText">
              <span className="tarotHome-buttonMini">
                カードを引いたら
              </span>
              <span className="tarotHome-buttonMain">
                今日の1枚を読む
              </span>
            </div>

            <span className="tarotHome-arrow">→</span>
          </Link>

          <p className="tarotHome-buttonNote">
            手動で選んでも、写真から読み取ってもOK
          </p>
        </section>

        {/* HOW */}
        <section className="tarotHome-howSection">
          <p className="tarotHome-sectionEyebrow">
            ✦ タロットを、もっと気軽に。
          </p>

          <h2 className="tarotHome-sectionTitle">
            本を開いて探さなくても、
            <br />
            あなたの一枚が読める。
          </h2>

          <div className="tarotHome-steps">
            <div className="tarotHome-stepCard tarotHome-tealCard">
              <span className="tarotHome-stepNumber">01</span>

              <div className="tarotHome-stepIcon">◇</div>

              <h3>自分で引く</h3>

              <p>
                お気に入りのタロットを
                <br />
                自分でシャッフル。
                <br />
                直感で一枚を選びます。
              </p>
            </div>

            <div className="tarotHome-stepArrow">→</div>

            <div className="tarotHome-stepCard tarotHome-goldCard">
              <span className="tarotHome-stepNumber">02</span>

              <div className="tarotHome-stepIcon">▣</div>

              <h3>カードを伝える</h3>

              <p>
                手動で選んでも、
                <br />
                写真を撮ってもOK。
                <br />
                正位置・逆位置にも対応。
              </p>
            </div>

            <div className="tarotHome-stepArrow">→</div>

            <div className="tarotHome-stepCard tarotHome-coralCard">
              <span className="tarotHome-stepNumber">03</span>

              <div className="tarotHome-stepIcon">✦</div>

              <h3>一緒に読む</h3>

              <p>
                カードの意味と
                <br />
                今日のテーマをつないで、
                <br />
                わかりやすく読み解きます。
              </p>
            </div>
          </div>
        </section>

        {/* WHY */}
        <section className="tarotHome-whySection">
          <div className="whyCopy">
            <p className="tarotHome-englishLabel">
              WHY TAROT READING ASSISTANT?
            </p>

            <h2 className="tarotHome-whyTitle">
              読み方がわからなくても、
              <br />
              タロットは楽しめる。
            </h2>

            <div className="tarotHome-questions">
              <p>「このカード、どういう意味だっけ？」</p>
              <p>「逆位置になるとどう読むの？」</p>
              <p>
                「意味はわかるけど、今の悩みにどうつなげるの？」
              </p>
            </div>

            <p className="tarotHome-whyStrong">
              そんなところから、一緒に読みます。
            </p>
          </div>

          <div className="tarotHome-cardIllustration" aria-hidden="true">
            <div className="tarotHome-fakeCard tarotHome-cardBlue">☾</div>
            <div className="tarotHome-fakeCard tarotHome-cardYellow">☀</div>
            <div className="tarotHome-fakeCard tarotHome-cardRed">✦</div>
          </div>
        </section>

        {/* READING MENU */}
        <section className="tarotHome-readingSection">
          <p className="tarotHome-englishLabel tarotHome-centered">
            CHOOSE YOUR READING
          </p>

          <h2 className="tarotHome-readingTitle">
            今日は、何を読もう？
          </h2>

          <div className="tarotHome-readingGrid">
            <Link
              href="/daily"
              className="homeReadingCard tarotHome-availableCard"
            >
              <div className="tarotHome-readingTop">
                <div className="tarotHome-readingIcon tarotHome-sunIcon">
                  ☀
                </div>

                <span className="tarotHome-status tarotHome-availableStatus">
                  AVAILABLE
                </span>
              </div>

              <h3>今日の1枚</h3>

              <p>
                今日のあなたに必要なメッセージや、
                気になるテーマを一枚から読み解きます。
              </p>

              <div className="tarotHome-tags">
                <span>手動入力</span>
                <span>写真判定</span>
                <span>正位置・逆位置</span>
              </div>

              <div className="tarotHome-cardButton">
                <span>今日の1枚を読む</span>
                <span>→</span>
              </div>
            </Link>

            <div className="homeReadingCard tarotHome-comingCard">
              <div className="tarotHome-readingTop">
                <div className="tarotHome-readingIcon tarotHome-starIcon">
                  ✦
                </div>

                <span className="tarotHome-status tarotHome-comingStatus">
                  COMING SOON
                </span>
              </div>

              <h3>テーマから3枚で読む</h3>

              <p>
                恋愛・仕事・人間関係など、
                気になるテーマを複数のカードから
                もう少し深く読み解きます。
              </p>

              <div className="tarotHome-tags">
                <span>3枚引き</span>
                <span>テーマ別</span>
                <span>流れを読む</span>
              </div>

              <div className="tarotHome-soonButton">
                近日公開
              </div>
            </div>
          </div>
        </section>

        {/* FINAL */}
        <section className="tarotHome-finalSection">
          <div className="tarotHome-finalSpark">✦</div>

          <h2 className={`${kleeOne.className} tarotHome-finalTitle`}>
            引くのはあなた。
            <br />
            読むのは一緒に。
          </h2>

          <p>
            誰かが代わりに引いたカードではなく、
            <br />
            あなた自身がシャッフルして、
            <br />
            あなた自身が引いたカードを大切にします。
          </p>

          <Link href="/daily" className="tarotHome-finalButton">
            <span className="tarotHome-finalButtonIcon">☀</span>

            <span className="tarotHome-finalButtonText">
              今日のカードを読んでみる
            </span>

            <span className="tarotHome-finalArrow">→</span>
          </Link>
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

        `}</style>
    </main>
  );
}