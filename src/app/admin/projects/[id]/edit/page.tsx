import React from "react";
import ProjectForm from "@/components/ProjectForm";
import { MOCK_PROJECTS } from "@/data/mockProjects";
import { notFound } from "next/navigation";

interface EditProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;

  // Find matching project from mock data
  const project = MOCK_PROJECTS.find((p) => p.id === id || p.slug === id);

  if (!project) {
    // If not found in mock list, provide default or not found
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ProjectForm initialData={project} isEdit={true} />
    </div>
  );
}
