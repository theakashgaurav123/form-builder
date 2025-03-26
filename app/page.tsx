"use client"

import { FormBuilder } from "@/components/form-builder"

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Form Builder</h1>
      <FormBuilder />
    </main>
  )
}

