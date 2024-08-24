"use client";
import { TemplateProps } from "@/components/shared/Templates";
import templates from "@/lib/Templates";
import { Form } from "./Form";
import "@toast-ui/editor/dist/toastui-editor.css";
import { chatSession } from "@/lib/ai-model";
import { Preview } from "./Preview";
import { useState } from "react";

// INTERFACE OF CREATE CONTENT PAGE
interface CreateContentPageProps {
  params: {
    "template-slug": string; //  TEMPLATE URL PARAMS
  };
}

// CREATE CONTENT PAGE
export default function CreateContentPage({ params }: CreateContentPageProps) {
  // Loading state
  const [loading, setLoading] = useState(false);

  // state for generated ai output
  const [aiGeneratedContent, setAiGeneratedContent] = useState<string>("");

  // SELECT A TEMPLATE BASED ON THE URL PARAMS
  const selectedTemplate = templates.find(
    (template) => template.slug === params["template-slug"]
  ) as TemplateProps;

  // Generate AI content function
  async function GenerateAiContent(userData: FormData) {
    // SET LOADING TO TRUE
    setLoading(true);

    // GET THE PROMPT
    const prompt = selectedTemplate?.aiPrompt;

    // PROMPT BASED ON THE USER DATA
    const aiPrompt = JSON.stringify(userData) + "\n" + prompt;

    // GENERATE AI CONTENT BASED ON THE PROMPT
    const aiResult = await chatSession.sendMessage(aiPrompt);

    // SET THE AI CONTENT IN THE STATE
    setAiGeneratedContent(aiResult.response?.text());

    // SET LOADING TO FALSE
    setLoading(false);
  }

  // RENDER FORM AND PREVIEW
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
      {/* RENDER FORM */}
      <Form
        selectedTemplate={selectedTemplate}
        userFormData={(userData) => GenerateAiContent(userData)}
        loading={loading}
      />
      {/* RENDER PREVIEW */}
      <div className="col-span-2">
        <Preview generatedContent={aiGeneratedContent} loading={loading} />
      </div>
    </div>
  );
}
