"use client"

import type React from "react"

import type { FormElement } from "@/lib/types"
import { FormElementRenderer } from "@/components/form-element-renderer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

interface FormPreviewProps {
  formElements: FormElement[]
}

export function FormPreview({ formElements }: FormPreviewProps) {
  const [formData, setFormData] = useState({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Form Submitted",
      description: "Your form was submitted successfully!",
      action: <ToastAction altText="Close">Close</ToastAction>,
    })
    console.log("Form submitted:", formData)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Form Preview</CardTitle>
      </CardHeader>
      <CardContent>
        {formElements.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Your form is empty. Add some elements to see the preview.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {formElements.map((element) => (
              <div key={element.id}>
                <FormElementRenderer element={element} onSubmit={(data) => setFormData({ ...formData, ...data })} />
              </div>
            ))}
          </form>
        )}
      </CardContent>
    </Card>
  )
}

