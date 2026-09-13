import React from "react";
import ProjectForm from "@/components/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ProjectForm isEdit={false} />
    </div>
  );
}
