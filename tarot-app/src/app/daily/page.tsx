export default function DailyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f8f6ff] to-white px-6 py-12 text-gray-900">
      <div className="mx-auto max-w-2xl">
        <a
          href="/"
          className="mb-10 inline-block text-sm text-gray-500 hover:text-gray-900"
        >
          ← ホームに戻る
        </a>

        <header className="mb-12 text-center">
          <div className="mb-4 text-5xl">🌙</div>

          <h1 className="text-3xl font-bold">
            今日の1枚
          </h1>

          <p className="mt-4 leading-7 text-gray-600">
            今日のテーマや、意識したいことを
            <br />
            あなたが引いた1枚から一緒に読み解きます。
          </p>
        </header>

        <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mb-6">
            <p className="mb-2 text-sm font-medium text-gray-500">
              STEP 1
            </p>

            <h2 className="text-xl font-bold">
              今日、意識したいことはありますか？
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              特になければ空欄のままでも大丈夫です。
            </p>
          </div>

          <textarea
            placeholder="例：今日は仕事で落ち着いて話したい"
            className="min-h-32 w-full resize-none rounded-2xl border border-gray-200 p-4 outline-none focus:border-purple-400"
          />

          <button className="mt-6 w-full rounded-2xl bg-[#29264f] px-6 py-4 font-bold text-white transition hover:opacity-90">
            次へ
          </button>
        </section>
      </div>
    </main>
  );
}
