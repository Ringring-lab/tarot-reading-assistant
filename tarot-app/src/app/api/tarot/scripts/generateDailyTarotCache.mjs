import { GoogleGenAI } from "@google/genai";
import fs from "node:fs";
import path from "node:path";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("❌ GEMINI_API_KEY が見つかりません。");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

const OUTPUT_PATH = path.join(
  process.cwd(),
  "src",
  "app",
  "data",
  "dailyTarotCache.generated.json"
);

const DEFAULT_THEME = "今日の私に必要なメッセージ";

const PRIMARY_MODEL = "gemini-3.5-flash-lite";
const FALLBACK_MODEL = "gemini-3.8-flash";

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

const minorValues = [
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

const categories = [
  {
    category: "major",
    cards: majorCards,
  },
  {
    category: "wands",
    cards: minorValues,
  },
  {
    category: "cups",
    cards: minorValues,
  },
  {
    category: "swords",
    cards: minorValues,
  },
  {
    category: "pentacles",
    cards: minorValues,
  },
];

const orientations = ["upright", "reversed"];

function makeCacheKey(category, card, orientation) {
  return `${category}__${card}__${orientation}`;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function loadExistingCache() {
  try {
    if (!fs.existsSync(OUTPUT_PATH)) {
      return {};
    }

    const text = fs.readFileSync(OUTPUT_PATH, "utf8").trim();

    if (!text) {
      return {};
    }

    return JSON.parse(text);
  } catch (error) {
    console.error("⚠️ 既存キャッシュを読み込めなかったため空から開始します。");
    console.error(error);
    return {};
  }
}

function saveCache(cache) {
  fs.writeFileSync(
    OUTPUT_PATH,
    JSON.stringify(cache, null, 2),
    "utf8"
  );
}

function categoryLabel(category) {
  const labels = {
    major: "大アルカナ",
    wands: "ワンド",
    cups: "カップ",
    swords: "ソード",
    pentacles: "ペンタクル",
  };

  return labels[category] ?? category;
}

function orientationLabel(orientation) {
  return orientation === "upright" ? "正位置" : "逆位置";
}

function buildPrompt(category, card, orientation) {
  return `
あなたは、初心者にもわかりやすくタロットを読み解く
「タロット・コリーダー」です。

ユーザー自身が実物のカードを引いています。
あなたがカードを引いたような表現はしないでください。

今回のテーマ：
「${DEFAULT_THEME}」

カード：
${categoryLabel(category)} ${card}

向き：
${orientationLabel(orientation)}

今日の1枚として、このカードを読み解いてください。

【絶対ルール】

・前置きや挨拶は書かない
・Markdown記号（##、**など）は使わない
・以下の4つの見出しを必ずそのまま使用する
・4項目以外の見出しを追加しない
・同じ内容を別の項目で繰り返さない
・初心者にも意味がわかる自然な日本語にする
・抽象論だけで終わらせない
・毎回「休む」「自分をいたわる」だけに寄せない
・怖がらせる断定をしない
・カード本来の意味から離れすぎない
・RWS固有の絵柄に触れる場合は「RWS系では」と明記する

出力形式：

【1. このカードの基本】
このカードが持つ核となる意味を説明する。
正位置・逆位置の違いも今回の向きに合わせて自然に説明する。
ここでは行動アドバイスを書かない。

【2. なぜこう読むの？】
スート、数字、人物札、大アルカナの象徴、
正位置・逆位置などから、
なぜ今回の意味になるのかを初心者にもわかるように説明する。
ここでは行動アドバイスを書かない。

【3. 今日の1枚として】
「今日の私に必要なメッセージ」への答えとして、
このカードが今日どんな場面や気持ち、
出来事として現れやすいかを具体的に読む。
日常でイメージできる表現にする。

【4. 今日のヒント】
今日できる具体的な行動を2〜3個書く。
必ず各項目を「・」から始める。
曖昧な精神論ではなく、実際にできる行動にする。

鑑定本文だけを出力してください。
`.trim();
}

function isTemporaryError(error) {
  const text = String(
    error?.message ??
    error ??
    ""
  ).toLowerCase();

  return (
    text.includes("429") ||
    text.includes("500") ||
    text.includes("502") ||
    text.includes("503") ||
    text.includes("504") ||
    text.includes("high demand") ||
    text.includes("unavailable") ||
    text.includes("resource_exhausted") ||
    text.includes("resource exhausted")
  );
}

async function generateWithModel(
  model,
  category,
  card,
  orientation
) {
  const response = await ai.models.generateContent({
    model,
    contents: buildPrompt(
      category,
      card,
      orientation
    ),
    config: {
      temperature: 0.75,
      maxOutputTokens: 1400,
    },
  });

  const text = response.text?.trim();

  if (!text) {
    throw new Error("AIから本文が返りませんでした。");
  }

  return text;
}

async function generateReading(
  category,
  card,
  orientation
) {
  const models = [
    PRIMARY_MODEL,
    FALLBACK_MODEL,
  ];

  let lastError;

  for (const model of models) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        console.log(
          `🤖 ${model} / ${category} / ${card} / ${orientation} (${attempt}/2)`
        );

        return await generateWithModel(
          model,
          category,
          card,
          orientation
        );
      } catch (error) {
        lastError = error;

        console.error(
          `⚠️ ${model} 失敗:`,
          error?.message ?? error
        );

        if (!isTemporaryError(error)) {
          break;
        }

        await sleep(1500 * attempt);
      }
    }
  }

  throw lastError ?? new Error("生成に失敗しました。");
}

function createTasks() {
  const tasks = [];

  for (const group of categories) {
    for (const card of group.cards) {
      for (const orientation of orientations) {
        tasks.push({
          category: group.category,
          card,
          orientation,
        });
      }
    }
  }

  return tasks;
}

const cache = loadExistingCache();
const tasks = createTasks();

console.log("");
console.log("======================================");
console.log("🔮 Daily Tarot Cache Generator");
console.log("======================================");
console.log(`全組み合わせ: ${tasks.length}件`);
console.log(
  `すでに保存済み: ${Object.keys(cache).length}件`
);
console.log("");

let completed = Object.keys(cache).length;
let generatedThisRun = 0;
let failed = 0;

for (const task of tasks) {
  const {
    category,
    card,
    orientation,
  } = task;

  const key = makeCacheKey(
    category,
    card,
    orientation
  );

  if (cache[key]?.reading) {
    console.log(`⏭️ 保存済み: ${key}`);
    continue;
  }

  try {
    const reading = await generateReading(
      category,
      card,
      orientation
    );

    cache[key] = {
      category,
      card,
      orientation,
      reading,
    };

    saveCache(cache);

    completed++;
    generatedThisRun++;

    console.log(
      `✅ 保存完了 ${completed}/${tasks.length}: ${key}`
    );
    console.log("");

    await sleep(700);
  } catch (error) {
    failed++;

    console.error(
      `❌ 今回は生成できませんでした: ${key}`
    );
    console.error(
      error?.message ?? error
    );
    console.log("");

    await sleep(2000);
  }
}

console.log("");
console.log("======================================");
console.log("🎉 キャッシュ生成処理終了");
console.log("======================================");
console.log(
  `今回生成: ${generatedThisRun}件`
);
console.log(
  `保存済み合計: ${Object.keys(cache).length}/${tasks.length}件`
);
console.log(
  `今回失敗: ${failed}件`
);
console.log("");
console.log(
  "失敗したものがあっても、同じコマンドをもう一度実行すれば"
);
console.log(
  "保存済みを飛ばして未生成分だけ続きから作れます。"
);