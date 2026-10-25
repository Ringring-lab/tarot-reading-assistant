import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const PRIMARY_MODEL = "gemini-3.5-flash-lite";
const FALLBACK_MODEL = "gemini-3.8-flash";

type IdentifyResult = {
  category: "major" | "wands" | "cups" | "swords" | "pentacles" | "unknown";
  card: string;
  orientation: "upright" | "reversed" | "unknown";
  displayName: string;
  confidence: number;
  needsConfirmation: boolean;
  reason: string;
};

type GeminiError = {
  status?: number;
};

const resultSchema = {
  type: "object",
  properties: {
    category: {
      type: "string",
      enum: [
        "major",
        "wands",
        "cups",
        "swords",
        "pentacles",
        "unknown",
      ],
    },
    card: {
      type: "string",
    },
    orientation: {
      type: "string",
      enum: ["upright", "reversed", "unknown"],
    },
    displayName: {
      type: "string",
    },
    confidence: {
      type: "integer",
      minimum: 0,
      maximum: 100,
    },
    needsConfirmation: {
      type: "boolean",
    },
    reason: {
      type: "string",
    },
  },
  required: [
    "category",
    "card",
    "orientation",
    "displayName",
    "confidence",
    "needsConfirmation",
    "reason",
  ],
};

function isTemporaryError(error: unknown) {
  const typedError = error as GeminiError;

  if (typedError?.status === 429) return true;

  if (
    typeof typedError?.status === "number" &&
    typedError.status >= 500 &&
    typedError.status <= 599
  ) {
    return true;
  }

  const message =
    error instanceof Error ? error.message : String(error);

  return (
    message.includes("429") ||
    message.includes("503") ||
    message.includes("UNAVAILABLE") ||
    message.includes("high demand") ||
    message.includes("RESOURCE_EXHAUSTED")
  );
}

async function identifyWithModel(
  ai: GoogleGenAI,
  model: string,
  prompt: string,
  imageBase64: string,
  mimeType: string
) {
  console.log(`[Tarot Identify] ${model} で画像判定します`);

  const response = await ai.models.generateContent({
    model,
    contents: [
      {
        role: "user",
        parts: [
          {
            text: prompt,
          },
          {
            inlineData: {
              mimeType,
              data: imageBase64,
            },
          },
        ],
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: resultSchema,
    },
  });

  if (!response.text) {
    throw new Error("カード判定結果が返りませんでした。");
  }

  return JSON.parse(response.text) as IdentifyResult;
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "Gemini APIキーが設定されていません。",
        },
        {
          status: 500,
        }
      );
    }

    const formData = await request.formData();
    const image = formData.get("image");

    if (!(image instanceof File)) {
      return NextResponse.json(
        {
          error: "カードの写真が見つかりません。",
        },
        {
          status: 400,
        }
      );
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/heic",
      "image/heif",
    ];

    if (!allowedTypes.includes(image.type)) {
      return NextResponse.json(
        {
          error:
            "この画像形式にはまだ対応していません。JPEG、PNG、WEBP、HEICの写真を使ってください。",
        },
        {
          status: 400,
        }
      );
    }

    const maxBytes = 8 * 1024 * 1024;

    if (image.size > maxBytes) {
      return NextResponse.json(
        {
          error:
            "写真のサイズが大きすぎます。8MB以下の写真を使ってください。",
        },
        {
          status: 400,
        }
      );
    }

    const arrayBuffer = await image.arrayBuffer();

    const imageBase64 =
      Buffer.from(arrayBuffer).toString("base64");

    const ai = new GoogleGenAI({
      apiKey,
    });

    const prompt = `
この写真に写っているタロットカードを1枚判定してください。

ユーザーは、自分で実物のタロットカードを引き、
その写真をアップロードしています。

あなたの仕事は占いをすることではなく、

1. カードを特定する
2. 正位置・逆位置を判定する
3. アプリが使える形式で返す

ことです。

【重要】

写真には、
Rider-Waite-Smith系だけでなく、
猫、動物、アニメ風、かわいい系、現代風、
独自イラストなど様々なタロットデッキが写る可能性があります。

カードに書かれているタイトル、
ローマ数字、
数字、
スート記号、
人物、
象徴、
構図などを総合して判定してください。

写真全体が多少傾いていても、
カードそのものが正位置なのか逆位置なのかを判断してください。

ただし確信がない場合は、
無理に断定しないでください。

confidence が80未満なら
needsConfirmation を true にしてください。

判別できない場合は

category = "unknown"
orientation = "unknown"
confidence を低く設定

してください。

【category の値】

大アルカナ → major
ワンド → wands
カップ → cups
ソード → swords
ペンタクル → pentacles

【card の値】

大アルカナの場合は、
アプリで使っている以下の表記をそのまま返してください。

0 愚者
I 魔術師
II 女教皇
III 女帝
IV 皇帝
V 教皇
VI 恋人
VII 戦車
VIII 力
IX 隠者
X 運命の輪
XI 正義
XII 吊るされた男
XIII 死神
XIV 節制
XV 悪魔
XVI 塔
XVII 星
XVIII 月
XIX 太陽
XX 審判
XXI 世界

小アルカナの場合は、
以下のいずれかだけを返してください。

A
2
3
4
5
6
7
8
9
10
PAGE
KNIGHT
QUEEN
KING

【orientation】

正位置 → upright
逆位置 → reversed
判定不能 → unknown

【displayName】

日本語で自然に表示してください。

例：

星
ワンドのクイーン
カップの10

【reason】

判定理由を短く日本語で書いてください。

例：

「XVIIの表記と星のモチーフから『星』と判断しました。」

ユーザーに見せる確認用なので、
専門的すぎない短い文章にしてください。
`;

    let result: IdentifyResult;
    let modelUsed: string;

    try {
      result = await identifyWithModel(
        ai,
        PRIMARY_MODEL,
        prompt,
        imageBase64,
        image.type
      );

      modelUsed = PRIMARY_MODEL;
    } catch (primaryError) {
      if (!isTemporaryError(primaryError)) {
        throw primaryError;
      }

      console.log(
        `[Tarot Identify] ${PRIMARY_MODEL} が利用しづらいため、${FALLBACK_MODEL} に切り替えます。`
      );

      result = await identifyWithModel(
        ai,
        FALLBACK_MODEL,
        prompt,
        imageBase64,
        image.type
      );

      modelUsed = FALLBACK_MODEL;
    }

    console.log(
      `[Tarot Identify] 判定成功: ${result.displayName} / ${result.orientation} / ${result.confidence}% / ${modelUsed}`
    );

    return NextResponse.json({
      ...result,
      modelUsed,
    });
  } catch (error) {
    console.error(
      "[Tarot Identify] カード判定エラー:",
      error
    );

    return NextResponse.json(
      {
        error:
          "カードをうまく読み取れませんでした。写真を変えるか、手動でカードを選んでください。",
      },
      {
        status: 500,
      }
    );
  }
}