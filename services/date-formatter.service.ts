import dayjs from "dayjs";
import duration, { DurationUnitType } from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(duration);
dayjs.extend(relativeTime);

export function parseDateString(value: string): string {
  return dayjs(value).format("DD MMM YYYY HH:mm");
}
export function getDuration(
  value: number,
  unit: DurationUnitType,
  type: "format" | "humanize" = "format"
): string {
  const _duration = dayjs.duration(value, unit);

  return type === "format"
    ? _duration.format("D[d] H[h] m[m]")
    : _duration.humanize();
}

export function timeElapsedSince(value: string): string {
  dayjs.extend(relativeTime);
  return dayjs(value).fromNow();
}

export function diffTime(date1: string, date2: string): number {
  const _date1 = dayjs(date1);
  const _date2 = dayjs(date2);
  return _date1.diff(_date2);
}
