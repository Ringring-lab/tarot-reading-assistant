export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f5ff] text-[#30283d]">
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-6 py-10">
        <header className="mb-12 pt-6 text-center">
          <div className="mb-4 text-5xl">🔮</div>

          <h1 className="text-3xl font-bold tracking-tight">
            タロット読解アシスタント
          </h1>

          <p className="mt-4 text-lg font-medium text-[#695d78]">
            引くのはあなた。読むのは一緒に。
          </p>

          <p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-[#756b80]">
            実物のタロットカードを自分で引いて、
            <br />
            カードが伝えていることを一緒に読み解きます。
          </p>
        </header>

        <section className="space-y-4">
          <button className="w-full rounded-3xl bg-[#5d4777] p-6 text-left text-white shadow-sm transition hover:opacity-90">
            <div className="text-2xl">🌙</div>
            <div className="mt-3 text-xl font-bold">今日の1枚</div>
            <div className="mt-2 text-sm leading-6 text-[#eee8f5]">
              今日のテーマや、意識したいことを
              <br />
              1枚のカードから読みます
            </div>
          </button>

          <button className="w-full rounded-3xl border border-[#ded6e8] bg-white p-6 text-left shadow-sm transition hover:bg-[#faf8fc]">
            <div className="text-2xl">✨</div>
            <div className="mt-3 text-xl font-bold">テーマから占う</div>
            <div className="mt-2 text-sm leading-6 text-[#756b80]">
              恋愛・仕事・人間関係など、
              <br />
              知りたいテーマを3枚で読み解きます
            </div>
          </button>
        </section>

        <div className="mt-auto pt-12 text-center text-xs leading-5 text-[#92899d]">
          カードはあなた自身で引きます。
          <br />
          AIはカードを読むお手伝いをします。
        </div>
      </div>
    </main>
  );
}