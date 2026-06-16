import type { ParsedApplication } from "../llm/schemas.js";
import type { Email } from "../types/email.js";
import type { Application } from "../types/application.js";

export default function toApplication(email: Email, parsed: ParsedApplication): Application {
  return {
    id: email.threadId,
    company: parsed.company,
    status: parsed.status,
    role: parsed.role,
    dateApplied: parsed.dateApplied,
  }
}