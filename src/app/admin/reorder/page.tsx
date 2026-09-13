import React from "react";
import { Metadata } from "next";
import ProjectOrderManager from "@/components/ProjectOrderManager";

export const metadata: Metadata = {
  title: "Atur Unggulan & Urutan Project | Admin Panel",
  description: "Kelola urutan prioritas dan status unggulan project portofolio.",
};

export default function AdminReorderPage() {
  return <ProjectOrderManager />;
}
