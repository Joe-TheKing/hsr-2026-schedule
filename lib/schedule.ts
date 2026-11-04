import fs from "fs/promises";
import path from "path";

export type SessionCategory =
  | "organised"
  | "abstract"
  | "poster"
  | "capacity"
  | "plenary"
  | "satellite";

export interface SessionItem {
  id: string;
  day: string;
  dayTitle: string;
  time: string;
  title: string;
  subtitle?: string;
  typeLabel: string;
  category: SessionCategory;
  lead: string;
  contributors: string[];
  location: string;
  isCoreStopNcd: boolean;
}

export interface HeroStat {
  value: string;
  suffix: string;
  label: string;
}

export interface ScheduleData {
  heroStats: HeroStat[];
  sessions: SessionItem[];
}

const DATA_FILE_PATH = path.join(process.cwd(), "data", "sessions.json");

export async function getScheduleData(): Promise<ScheduleData> {
  const raw = await fs.readFile(DATA_FILE_PATH, "utf-8");
  return JSON.parse(raw) as ScheduleData;
}

export async function saveScheduleData(data: ScheduleData): Promise<void> {
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
}
