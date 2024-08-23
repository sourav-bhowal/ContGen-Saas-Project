"use client";
import { TemplateProps } from "@/components/shared/Templates";
import templates from "@/lib/Templates";
import { Form } from "../Form";

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
  // SELECT A TEMPLATE BASED ON THE URL PARAMS
  const selectedTemplate = templates.find(
    (template) => template.slug === params["template-slug"]
  ) as TemplateProps;

  // Generate AI content
  function generateAiContent(userData: UserData) {
    
  }

  // RENDER FORM AND PREVIEW
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
      {/* RENDER FORM */}
      <Form
        selectedTemplate={selectedTemplate}
        userFormData={(userData) => generateAiContent(userData)}
      />
      {/* RENDER PREVIEW */}
      <div className="col-span-2">
        <Preview />
      </div>
    </div>
  );
}

// PREVIEW
function Preview() {
  return <div>Preview</div>;
}
