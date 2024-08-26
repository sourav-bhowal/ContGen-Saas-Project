"use client";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export interface myPrompts {
  id: number;
  formData: string;
  aiResponse: string;
  templateSlug: string;
  createdBy: string;
}

export default function HistoryPage() {
  const [myPrompts, setMyPrompts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const prompts = async () => {
      setLoading(true);
      const data = await fetch(`/api/get-prompts`);
      const prompts = await data.json();
      setMyPrompts(prompts);
      setLoading(false);
    };
    prompts();
  }, []);

  return (
    <div>
      <h1>History</h1>
      {loading ? (
        <Loader2 className="mx-auto h-12 w-12 animate-spin mt-10" />
      ) : (
        myPrompts.map((prompt: myPrompts) => (
          <div key={prompt?.id}>
            <h1>{prompt?.templateSlug}</h1>
            {/* <p>{prompt?.aiResponse}</p> */}
          </div>
        ))
      )}
    </div>
  );
}
