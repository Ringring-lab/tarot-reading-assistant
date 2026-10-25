import generatedCache from "./dailyTarotCache.generated.json";

export type DailyTarotCacheEntry = {
  category: string;
  card: string;
  orientation: "upright" | "reversed";
  reading: string;
};

type DailyTarotCacheData = Record<
  string,
  DailyTarotCacheEntry
>;

const dailyTarotCache =
  generatedCache as DailyTarotCacheData;

export function makeDailyTarotCacheKey(
  category: string,
  card: string,
  orientation: string
) {
  return `${category}__${card}__${orientation}`;
}

export function getDailyTarotCache(
  category: string,
  card: string,
  orientation: string
) {
  const key = makeDailyTarotCacheKey(
    category,
    card,
    orientation
  );

  return dailyTarotCache[key] ?? null;
}

export function hasDailyTarotCache(
  category: string,
  card: string,
  orientation: string
) {
  return Boolean(
    getDailyTarotCache(
      category,
      card,
      orientation
    )
  );
}

export function getDailyTarotCacheCount() {
  return Object.keys(dailyTarotCache).length;
}