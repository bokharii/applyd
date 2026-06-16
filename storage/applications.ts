import { readFile } from "fs/promises";
import type { Application } from "../types/application.js";
import { writeFile } from "fs/promises";

export default async function readApplicationData(): Promise<Application[]> {
  try {
    const rawData = await readFile("./data/applications.json", "utf-8");
    const applications = JSON.parse(rawData) as Application[];
    return applications;
  } catch (error) {
    console.log("Failed to get application data", error);
    return [];
  }
}

export async function storeApplicationData(apps: Application[]) {
  const jsonString = JSON.stringify(apps, null, 2); 
  await writeFile('./data/applications.json', jsonString, 'utf-8');
}
