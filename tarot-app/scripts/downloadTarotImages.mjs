import fs from "node:fs/promises";
import path from "node:path";

const COMMONS_API = [
  "https:",
  "",
  "commons.wikimedia.org",
  "w",
  "api.php",
].join("/");

const CATEGORY =
  "Category:Rider-Waite-Smith tarot deck (TaionWC)";

const OUTPUT_DIR = path.join(
  process.cwd(),
  "public",
  "tarot",
  "rws"
);

const MANIFEST_PATH = path.join(
  process.cwd(),
  "src",
  "app",
  "data",
  "rwsTarotImages.generated.json"
);

const THUMB_WIDTH = 700;

const USER_AGENT =
  "TarotReadingAssistant/0.1 (local development image importer)";

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

const rankCards = [
  null,
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

const suitMap = {
  Cups: "cups",
  Wands: "wands",
  Swords: "swords",
  Pents: "pentacles",
};

function rankToFileName(rank) {
  return rank.toLowerCase();
}

function sourceTitleToCard(sourceTitle) {
  const name = sourceTitle.replace(/^File:/, "");

  const majorMatch = name.match(
    /^RWS Tarot (\d{2}) .+\.jpg$/i
  );

  if (majorMatch) {
    const number = Number(majorMatch[1]);

    if (
      Number.isNaN(number) ||
      number < 0 ||
      number > 21
    ) {
      throw new Error(
        `大アルカナ番号を判定できません: ${sourceTitle}`
      );
    }

    const card = majorCards[number];

    return {
      key: `major|${card}`,
      category: "major",
      card,
      fileName: `major-${String(number).padStart(
        2,
        "0"
      )}.jpg`,
    };
  }

  const minorMatch = name.match(
    /^(Cups|Wands|Swords|Pents)(\d{2})\.jpg$/i
  );

  if (minorMatch) {
    const sourceSuit =
      minorMatch[1][0].toUpperCase() +
      minorMatch[1].slice(1).toLowerCase();

    const number = Number(minorMatch[2]);

    const category = suitMap[sourceSuit];
    const card = rankCards[number];

    if (!category || !card) {
      throw new Error(
        `小アルカナを判定できません: ${sourceTitle}`
      );
    }

    return {
      key: `${category}|${card}`,
      category,
      card,
      fileName: `${category}-${rankToFileName(
        card
      )}.jpg`,
    };
  }

  throw new Error(
    `未対応のファイル名です: ${sourceTitle}`
  );
}

function stripHtml(value = "") {
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .trim();
}

function getMetadataValue(metadata, key) {
  return metadata?.[key]?.value ?? "";
}

function isPublicDomain(metadata) {
  const license = getMetadataValue(
    metadata,
    "LicenseShortName"
  );

  const usageTerms = getMetadataValue(
    metadata,
    "UsageTerms"
  );

  const text = `${license} ${usageTerms}`.toLowerCase();

  return (
    text.includes("public domain") ||
    text.includes("publicdomain")
  );
}

async function commonsRequest(params) {
  const url = new URL(COMMONS_API);

  url.searchParams.set("format", "json");
  url.searchParams.set("formatversion", "2");

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value));
  }

  const response = await fetch(url, {
    headers: {
      "User-Agent": USER_AGENT,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Commons API エラー: ${response.status}`
    );
  }

  return response.json();
}

async function getCategoryFiles() {
  const data = await commonsRequest({
    action: "query",
    list: "categorymembers",
    cmtitle: CATEGORY,
    cmnamespace: 6,
    cmlimit: 500,
  });

  const files = data?.query?.categorymembers ?? [];

  if (files.length !== 78) {
    throw new Error(
      `78枚のはずですが ${files.length} 枚でした。処理を停止します。`
    );
  }

  return files.map((file) => file.title);
}

async function getImageInfo(titles) {
  const result = {};

  const batchSize = 40;

  for (
    let start = 0;
    start < titles.length;
    start += batchSize
  ) {
    const batch = titles.slice(
      start,
      start + batchSize
    );

    const data = await commonsRequest({
      action: "query",
      prop: "imageinfo",
      titles: batch.join("|"),
      iiprop: "url|extmetadata",
      iiurlwidth: THUMB_WIDTH,
    });

    const pages = data?.query?.pages ?? [];

    for (const page of pages) {
      const info = page?.imageinfo?.[0];

      if (!info) {
        throw new Error(
          `画像情報を取得できません: ${page.title}`
        );
      }

      result[page.title] = info;
    }
  }

  return result;
}

async function readExistingManifest() {
  try {
    const text = await fs.readFile(
      MANIFEST_PATH,
      "utf8"
    );

    return JSON.parse(text);
  } catch {
    return {};
  }
}

async function fileExists(filePath) {
  try {
    const stat = await fs.stat(filePath);

    return stat.size > 1000;
  } catch {
    return false;
  }
}

async function downloadFile(url, destination) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": USER_AGENT,
    },
  });

  if (!response.ok) {
    throw new Error(
      `画像ダウンロード失敗: ${response.status}`
    );
  }

  const buffer = Buffer.from(
    await response.arrayBuffer()
  );

  await fs.writeFile(destination, buffer);
}

async function saveManifest(manifest) {
  const sorted = Object.fromEntries(
    Object.entries(manifest).sort(([a], [b]) =>
      a.localeCompare(b)
    )
  );

  await fs.writeFile(
    MANIFEST_PATH,
    `${JSON.stringify(sorted, null, 2)}\n`,
    "utf8"
  );
}

async function main() {
  console.log("");
  console.log(
    "🃏 Rider-Waite-Smith 基本画像を準備します"
  );
  console.log(
    "======================================"
  );

  await fs.mkdir(OUTPUT_DIR, {
    recursive: true,
  });

  console.log("");
  console.log(
    "🔎 Wikimedia Commons の78枚を確認中..."
  );

  const titles = await getCategoryFiles();

  console.log(`✅ ${titles.length}枚を確認しました`);

  console.log("");
  console.log(
    "🔐 各画像の権利情報を確認中..."
  );

  const imageInfo = await getImageInfo(titles);

  const cards = titles.map((title) => ({
    title,
    mapping: sourceTitleToCard(title),
    info: imageInfo[title],
  }));

  const uniqueKeys = new Set(
    cards.map((item) => item.mapping.key)
  );

  if (uniqueKeys.size !== 78) {
    throw new Error(
      `カード対応表が重複しています。78種類のはずが ${uniqueKeys.size} 種類です。`
    );
  }

  for (const item of cards) {
    const metadata =
      item.info?.extmetadata ?? {};

    if (!isPublicDomain(metadata)) {
      const license = getMetadataValue(
        metadata,
        "LicenseShortName"
      );

      throw new Error(
        [
          "⚠️ Public Domainを確認できない画像がありました。",
          `ファイル: ${item.title}`,
          `ライセンス表示: ${license || "不明"}`,
          "安全のためダウンロードを停止しました。",
        ].join("\n")
      );
    }
  }

  console.log(
    "✅ 78枚すべてPublic Domain表示を確認しました"
  );

  const manifest =
    await readExistingManifest();

  let completed = 0;

  for (const item of cards) {
    completed += 1;

    const {
      key,
      category,
      card,
      fileName,
    } = item.mapping;

    const targetPath = path.join(
      OUTPUT_DIR,
      fileName
    );

    const metadata =
      item.info?.extmetadata ?? {};

    const imageUrl =
      item.info.thumburl ?? item.info.url;

    const alreadyExists =
      await fileExists(targetPath);

    if (alreadyExists) {
      console.log(
        `⏭️ ${completed}/78 保存済み: ${key}`
      );
    } else {
      console.log(
        `⬇️ ${completed}/78 ダウンロード: ${key}`
      );

      await downloadFile(
        imageUrl,
        targetPath
      );

      console.log(
        `✅ ${completed}/78 保存完了: ${fileName}`
      );
    }

    manifest[key] = {
      category,
      card,
      imagePath: `/tarot/rws/${fileName}`,
      sourceTitle: item.title,
      sourcePage:
        item.info.descriptionurl ?? "",
      license:
        getMetadataValue(
          metadata,
          "LicenseShortName"
        ) || "Public domain",
      usageTerms:
        getMetadataValue(
          metadata,
          "UsageTerms"
        ) || "",
      artist:
        stripHtml(
          getMetadataValue(
            metadata,
            "Artist"
          )
        ) || "Pamela Colman Smith",
      sourceSet: CATEGORY,
    };

    await saveManifest(manifest);
  }

  console.log("");
  console.log(
    "======================================"
  );
  console.log(
    "🎉 タロット画像の準備が完了しました！"
  );
  console.log(
    `画像: ${OUTPUT_DIR}`
  );
  console.log(
    `対応表: ${MANIFEST_PATH}`
  );
  console.log(
    `保存済み: ${Object.keys(manifest).length}/78枚`
  );
  console.log(
    "======================================"
  );
}

main().catch((error) => {
  console.error("");
  console.error("❌ 処理を停止しました");
  console.error(
    error instanceof Error
      ? error.message
      : error
  );
  process.exitCode = 1;
});