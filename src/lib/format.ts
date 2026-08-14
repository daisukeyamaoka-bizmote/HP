export function fmtDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

export function toISODate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** 公開から14日以内の記事に「新着」を付ける */
export function isNew(d: Date): boolean {
  return Date.now() - d.getTime() < 14 * 24 * 60 * 60 * 1000;
}

/** 日本語記事の読了時間(分)。約500字/分で概算 */
export function readingTimeFromBody(body: string): number {
  const chars = body.replace(/\s/g, '').length;
  return Math.max(1, Math.round(chars / 500));
}
