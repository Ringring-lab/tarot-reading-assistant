import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f8f6ff] to-white px-6 py-12 text-gray-900">
      <div className="mx-auto max-w-md">
        <header className="mb-12 text-center">
          <div className="mb-4 text-5xl">🔮</div>

          <h1 className="text-3xl font-bold tracking-tight">
            タロット読解アシスタント
          </h1>

          <p className="mt-4 text-lg font-semibold text-gray-700">
            引くのはあなた。読むのは一緒に。
          </p>

          <p className="mt-6 leading-7 text-gray-500">
            実物のタロットカードを自分で引いて、
            <br />
            カードが伝えていることを一緒に読み解きます。
          </p>
        </header>

        <section className="space-y-5">
          <Link
            href="/daily"
            className="block rounded-3xl bg-[#37285f] p-7 text-white shadow-sm transition hover:opacity-90"
          >
            <div className="text-3xl">🌙</div>

            <h2 className="mt-4 text-xl font-bold">
              今日の1枚
            </h2>

            <p className="mt-2 leading-7 text-violet-100">
              今日のテーマや、意識したいことを
              <br />
              1枚のカードから読みます
            </p>
          </Link>

          <div className="rounded-3xl border border-violet-100 bg-white p-7 shadow-sm">
            <div className="text-3xl">✨</div>

            <h2 className="mt-4 text-xl font-bold">
              テーマから占う
            </h2>

            <p className="mt-2 leading-7 text-gray-500">
              恋愛・仕事・人間関係など、
              <br />
              知りたいテーマを3枚で読み解きます
            </p>
          </div>
        </section>

        <p className="mt-10 text-center text-sm leading-6 text-gray-400">
          カードはあなた自身で引きます。
          <br />
          AIはカードを読むお手伝いをします。
        </p>
      </div>
    </main>
  );
}