import z from "zod";

export const ParsedApplicationSchema = z.object({
  company: z.string(),
  role: z.string(),
  status: z.string(),
  dateApplied: z.string()
})

export type ParsedApplication = z.infer<typeof ParsedApplicationSchema>