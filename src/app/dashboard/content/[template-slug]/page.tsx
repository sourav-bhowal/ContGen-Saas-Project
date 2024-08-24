"use client";
import { TemplateProps } from "@/components/shared/Templates";
import templates from "@/lib/Templates";
import { Form } from "../Form";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { Button } from "@/components/ui/button";
import { Check, CheckCheck, Copy, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { chatSession } from "@/lib/ai-model";

// INTERFACE OF CREATE CONTENT PAGE
interface CreateContentPageProps {
  params: {
    "template-slug": string; //  TEMPLATE URL PARAMS
  };
}

// interface of user data
interface UserData {
  [key: string]: string;
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

  // Generate AI content
  async function GenerateAiContent(userData: UserData) {
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

// PREVIEW EDITOR
function Preview({
  generatedContent,
  loading,
}: {
  generatedContent: string;
  loading: boolean;
}) {
  // Ref for editor
  const editorRef = useRef<Editor>(null);

  // state for copy text
  const [copied, setCopied] = useState(false);

  // SET MARKDOWN
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current?.getInstance().setMarkdown(generatedContent);
    }
    if (loading) {
      editorRef.current
        ?.getInstance()
        .setMarkdown("Generating your content, please wait...");
    }
  }, [generatedContent, loading]);

  // RENDER PREVIEW
  return (
    <div className="bg-white shadow-lg border rounded-lg">
      <div className="flex justify-between p-5 items-center">
        <h2 className="text-2xl font-medium">Your Preview</h2>
        <Button
          onClick={() => {
            setCopied(true);
            navigator.clipboard.writeText(generatedContent);
            setTimeout(() => setCopied(false), 3000);
          }}
        >
          {copied ? (
            <p className="flex items-center gap-2">
              Copied
              <span>
                <CheckCheck className="w-4 h-4" />
              </span>
            </p>
          ) : (
            <p className="flex items-center gap-2">
              <Copy className="w-4 h-4" />
              <p className="sm:block hidden">Copy</p>
            </p>
          )}
        </Button>
      </div>
      <Editor
        ref={editorRef}
        initialValue="Write your content here..."
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
      />
    </div>
  );
}
