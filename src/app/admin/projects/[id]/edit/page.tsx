import React from "react";
import ProjectForm from "@/components/ProjectForm";
import { getProjectById } from "@/db";
import { notFound } from "next/navigation";

interface EditProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;

  // Find matching project from database
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ProjectForm initialData={project} isEdit={true} />
    </div>
  );
}
