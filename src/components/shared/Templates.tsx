import templates from "@/lib/Templates";
import TemplateCard from "./TemplateCard";
import { useEffect, useState } from "react";

// INTERFACE OF TEMPLATE
export interface TemplateProps {
  name: string;
  desc: string;
  icon: string;
  category: string;
  slug: string;
  aiPrompt: string;
  form?: {
    label: string;
    field: string;
    name: string;
    required?: boolean;
  }[];
}

// TEMPLATE COMPONENT
export default function Templates({ searchInput }: { searchInput: string }) {
  // STATE for our templates
  const [templatesList, setTemplatesList] =
    useState<TemplateProps[]>(templates);

  // FILTER TEMPLATES BASED ON THE SEARCH INPUT USING USE EFFECT
  useEffect(() => {
    // IF THERE IS A SEARCH INPUT FILTER THE TEMPLATES
    if (searchInput) {
      setTemplatesList(
        templates.filter((template: TemplateProps) =>
          template.name.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    }
    // IF THE SEARCH INPUT IS EMPTY
    else {
      setTemplatesList(templates);
    }
  }, [searchInput]);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-8">
      {templatesList.map((template: TemplateProps, index: number) => (
        <TemplateCard template={template} key={index} />
      ))}
    </div>
  );
}
