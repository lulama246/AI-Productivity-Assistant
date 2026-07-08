import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import { getGatewayModel } from "./ai-gateway.server";

const MODEL = "google/gemini-3-flash-preview";

const EmailInput = z.object({
  purpose: z.string().min(1).max(500),
  recipient: z.string().max(200).optional().default(""),
  tone: z.enum(["Formal", "Friendly", "Professional", "Persuasive"]),
});

export const generateEmail = createServerFn({ method: "POST" })
  .inputValidator((v: unknown) => EmailInput.parse(v))
  .handler(async ({ data }) => {
    const { text } = await generateText({
      model: getGatewayModel(MODEL),
      system:
        "You are an expert communications writer for Lulu's Helping Hands, a compassionate community-support nonprofit. Write clear, respectful, warm emails. Return only the email (Subject + Body), no commentary.",
      prompt: `Write a ${data.tone.toLowerCase()} email.\nRecipient: ${data.recipient || "the recipient"}\nPurpose: ${data.purpose}`,
    });
    return { text };
  });

const NotesInput = z.object({ notes: z.string().min(10).max(20000) });

export const summarizeNotes = createServerFn({ method: "POST" })
  .inputValidator((v: unknown) => NotesInput.parse(v))
  .handler(async ({ data }) => {
    const { text } = await generateText({
      model: getGatewayModel(MODEL),
      system:
        "You are an AI meeting notes assistant. Given raw meeting notes, produce a well-formatted markdown response with these sections in order: ## Summary, ## Key Points, ## Action Items, ## Responsibilities, ## Deadlines. Use bullet lists. If information is missing, say 'Not specified'.",
      prompt: data.notes,
    });
    return { text };
  });

const PlanInput = z.object({
  scope: z.enum(["Daily", "Weekly", "Priority Tasks", "Volunteer Assignments", "Event Planning"]),
  context: z.string().min(5).max(4000),
});

export const generatePlan = createServerFn({ method: "POST" })
  .inputValidator((v: unknown) => PlanInput.parse(v))
  .handler(async ({ data }) => {
    const { text } = await generateText({
      model: getGatewayModel(MODEL),
      system:
        "You are an AI task planner for a nonprofit. Create clear, realistic, prioritized plans as markdown. Include time slots or priority levels, owners where relevant, and a short 'Tips' section at the end.",
      prompt: `Create a ${data.scope} plan.\nContext / goals:\n${data.context}`,
    });
    return { text };
  });

const ResearchInput = z.object({ topic: z.string().min(3).max(500) });

export const researchTopic = createServerFn({ method: "POST" })
  .inputValidator((v: unknown) => ResearchInput.parse(v))
  .handler(async ({ data }) => {
    const { text } = await generateText({
      model: getGatewayModel(MODEL),
      system:
        "You are an AI research assistant focused on community development, fundraising, sponsorship, and social impact. Given a topic, respond in markdown with sections: ## Summary, ## Key Insights, ## Recommendations. Be practical and specific. Remind users to verify sources.",
      prompt: `Research topic: ${data.topic}`,
    });
    return { text };
  });

const ChatInput = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(4000),
      }),
    )
    .min(1)
    .max(40),
});

export const chatWithLulu = createServerFn({ method: "POST" })
  .inputValidator((v: unknown) => ChatInput.parse(v))
  .handler(async ({ data }) => {
    const { text } = await generateText({
      model: getGatewayModel(MODEL),
      system:
        "You are Lulu AI Assistant for Lulu's Helping Hands, an AI-powered community support platform. Help users with questions about donations, volunteering, community events, getting help, sponsorship, and general support. Be warm, empathetic, concise, and practical. If someone is in crisis, encourage them to contact local emergency services. Format responses with light markdown when helpful.",
      messages: data.messages,
    });
    return { text };
  });
