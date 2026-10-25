import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

import {
  getDailyTarotCache,
  getDailyTarotCacheCount,
} from "../../data/dailyTarotCache";

type TarotRequest = {
  category?: string;
  card?: string;
  orientation?: string;
  theme?: string;
};

type GeminiError = {
  status?: number;
  message?: string;
};

const DEFAULT_THEME = "今日の私に必要なメッセージ";

const PRIMARY_MODEL = "gemini-3.8-flash";
const FALLBACK_MODEL = "gemini-3.5-flash-lite";

const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

function getErrorStatus(error: unknown) {
  const geminiError = error as GeminiError;

  if (typeof geminiError?.status === "number") {
    return geminiError.status;
  }

  const message =
    error instanceof Error ? error.message : String(error);

  const match = message.match(/\b(429|5\d\d)\b/);

  return match ? Number(match[1]) : undefined;
}

function isTemporaryError(error: unknown) {
  const status = getErrorStatus(error);

  if (status === 429) return true;

  if (
    typeof status === "number" &&
    status >= 500 &&
    status <= 599
  ) {
    return true;
  }

  const message =
    error instanceof Error ? error.message : String(error);

  return (
    message.includes("UNAVAILABLE") ||
    message.includes("high demand") ||
    message.includes("RESOURCE_EXHAUSTED") ||
    message.includes("temporarily unavailable")
  );
}

async function generateWithModel(
  ai: GoogleGenAI,
  model: string,
  prompt: string,
  maxAttempts: number
) {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      console.log(
        `[Tarot] ${model} で生成します (${attempt}/${maxAttempts})`
      );

      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });

      const reading = response.text?.trim();

      if (!reading) {
        throw new Error(
          "Geminiから鑑定文が返りませんでした。"
        );
      }

      return reading;
    } catch (error) {
      lastError = error;

      console.error(
        `[Tarot] ${model} ${attempt}/${maxAttempts} 失敗:`,
        error
      );

      if (!isTemporaryError(error)) {
        throw error;
      }

      if (attempt < maxAttempts) {
        await sleep(1200);
      }
    }
  }

  throw lastError;
}

export async function POST(request: Request) {
  try {
    const {
      category,
      card,
      orientation,
      theme,
    } = (await request.json()) as TarotRequest;

    if (!category || !card || !orientation) {
      return NextResponse.json(
        {
          error: "カード情報が不足しています。",
        },
        {
          status: 400,
        }
      );
    }

    const finalTheme =
      theme?.trim() || DEFAULT_THEME;

    const isDefaultDaily =
      finalTheme === DEFAULT_THEME;

    if (isDefaultDaily) {
      const cached = getDailyTarotCache(
        category,
        card,
        orientation
      );

      if (cached) {
        console.log(
          `[Tarot Cache] HIT: ${category} / ${card} / ${orientation}`
        );

        return NextResponse.json({
          reading: cached.reading,
          source: "cache",
          modelUsed: "cache",
        });
      }

      console.log(
        `[Tarot Cache] MISS: ${category} / ${card} / ${orientation}`
      );

      console.log(
        `[Tarot Cache] 現在の保存件数: ${getDailyTarotCacheCount()}`
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Gemini APIキーが設定されていません。",
        },
        {
          status: 500,
        }
      );
    }

    const ai = new GoogleGenAI({
      apiKey,
    });

    const prompt = `
あなたは、ユーザー自身が実物のタロットカードを読み解くための
「タロット読解アシスタント」です。

AIがカードを引くのではなく、
ユーザーが自分で引いたカードを理解し、
自分の状況や質問に重ねて読めるよう支援してください。

今回のカード情報：

カテゴリー：${category}
カード：${card}
向き：${orientation}

今回のテーマ・質問：
${finalTheme}

テーマ・質問が指定されている場合は、
必ずその質問に直接答える形でカードを読み解いてください。

【最重要ルール】

・最初のあいさつ、前置き、導入文は書かない
・Markdown記号を使わない
・必ず指定した4項目だけを出力する
・4項目の役割を混ぜない
・同じ内容を別項目で繰り返さない
・毎回「休みましょう」に寄せない
・カードによって結論や温度感を変える
・テーマ・質問がある場合は、そのテーマを中心に読む
・未来を断定しない
・初心者でも理由が分かる文章にする
・特定デッキの絵柄を断定しない
・RWS固有図像を説明する場合は「RWS系では」と明記する

【1. このカードの基本】

カードそのものの基本的な意味だけを説明する。

大アルカナなら中心テーマ。
小アルカナなら、
スート＋数字または人物札＋正逆。

行動アドバイスは書かない。

150〜250文字程度。


【2. なぜこう読むの？】

今回の解釈がどこから導かれるのか説明する。

小アルカナなら、

スート
＋ 数字または人物札
＋ 正位置・逆位置

を組み合わせる。

逆位置は単純な反対ではなく、
弱まる・滞る・内側に向かう・過剰・偏る
など自然な解釈を選ぶ。

具体的な行動アドバイスは書かない。

180〜280文字程度。


【3. 今日の1枚として】

今回のテーマ・質問
「${finalTheme}」
への答えとして具体的に読む。

今日どんな出来事、
気持ち、
人との関わり、
判断、
チャンス、
注意点として現れやすいかを、
日常の言葉で説明する。

250〜400文字程度。


【4. 今日のヒント】

今回のテーマ・質問に対して、
今日できる具体的な行動を2〜3個提案する。

各項目の先頭に「・」を付ける。

150〜250文字程度。

以上の4項目だけを出力してください。
`;

    let reading: string;
    let modelUsed: string;

    try {
      reading = await generateWithModel(
        ai,
        PRIMARY_MODEL,
        prompt,
        2
      );

      modelUsed = PRIMARY_MODEL;
    } catch (primaryError) {
      if (!isTemporaryError(primaryError)) {
        throw primaryError;
      }

      console.log(
        `[Tarot] ${PRIMARY_MODEL} が混雑しているため、${FALLBACK_MODEL} に切り替えます。`
      );

      reading = await generateWithModel(
        ai,
        FALLBACK_MODEL,
        prompt,
        2
      );

      modelUsed = FALLBACK_MODEL;
    }

    console.log(
      `[Tarot] 鑑定成功。使用モデル: ${modelUsed}`
    );

    return NextResponse.json({
      reading,
      source: "ai",
      modelUsed,
    });
  } catch (error) {
    console.error(
      "[Tarot] 最終的に鑑定できませんでした:",
      error
    );

    if (isTemporaryError(error)) {
      return NextResponse.json(
        {
          error:
            "いまAIが混み合っています。もう一度読み解いてみてください。",
        },
        {
          status: 503,
        }
      );
    }

    return NextResponse.json(
      {
        error:
          "鑑定中にエラーが発生しました。",
      },
      {
        status: 500,
      }
    );
  }
}