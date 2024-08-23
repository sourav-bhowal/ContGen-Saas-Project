"use client";
import { TemplateProps } from "@/components/shared/Templates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useState } from "react";

// Interface
interface FormData {
  [key: string]: string;
}

// FORM
export function Form({
  selectedTemplate,
  userFormData,
}: {
  selectedTemplate: TemplateProps;
  userFormData: (formData: FormData) => void;
}) {
  // Form Data
  const [formData, setFormData] = useState<FormData>({});
  
  // On submit
  const onSubmit = (e: any) => {
    e.preventDefault();
    userFormData(formData);
  };

  // Handle input change
  function handleInputChange(e: any) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  // RENDER FORM
  return (
    <div className="p-5 shadow-md border rounded-lg bg-white">
      <Image
        src={selectedTemplate?.icon}
        alt={selectedTemplate?.name}
        width={70}
        height={70}
      />
      <h1 className="text-2xl font-bold mb-2 text-primary">
        {selectedTemplate?.name}
      </h1>
      <p className="text-muted-foreground text-sm">{selectedTemplate?.desc}</p>

      <form className="mt-6" onSubmit={onSubmit}>
        {selectedTemplate.form?.map((item, index) => (
          <div key={index} className="my-3 flex flex-col gap-2 mb-7">
            <label className="font-semibold">{item.label}</label>
            {item.field == "input" ? (
              <Input
                name={item.name}
                required={item?.required}
                onChange={handleInputChange}
              />
            ) : (
              item.field == "textarea" && (
                <Textarea
                  name={item.name}
                  required={item?.required}
                  onChange={handleInputChange}
                />
              )
            )}
          </div>
        ))}
        <Button type="submit" className="w-full py-7 text-lg">
          Generate Content
        </Button>
      </form>
    </div>
  );
}
