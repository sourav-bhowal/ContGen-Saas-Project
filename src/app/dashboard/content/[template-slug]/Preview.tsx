import { Button } from "@/components/ui/button";
import { Editor } from "@toast-ui/react-editor";
import { CheckCheck, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// INTERFACE OF PREVIEW
interface PreviewProps {
  generatedContent: string;
  loading: boolean;
}

// PREVIEW EDITOR
export function Preview({ generatedContent, loading }: PreviewProps) {
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
            // SET STATE
            setCopied(true);
            // COPY TO CLIPBOARD
            navigator.clipboard.writeText(generatedContent);
            // REMOVE AFTER 3 SECONDS
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
      {/* EDITOR */}
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
