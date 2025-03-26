"use client"

import { useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Button } from "@/components/ui/button"
import { FormElementPalette } from "@/components/form-element-palette"
import { FormCanvas } from "@/components/form-canvas"
import { FormPreview } from "@/components/form-preview"
import type { FormElement } from "@/lib/types"

export function FormBuilder() {
  const [formElements, setFormElements] = useState<FormElement[]>([])
  const [showPreview, setShowPreview] = useState(false)

  const addFormElement = (element: FormElement) => {
    const newElement = {
      ...element,
      id: `${element.type}-${Date.now()}`,
    }
    setFormElements((prevElements) => [...prevElements, newElement])
  }

  const removeFormElement = (id: string) => {
    setFormElements(formElements.filter((element) => element.id !== id))
  }

  const moveFormElement = (dragIndex: number, hoverIndex: number) => {
    const dragElement = formElements[dragIndex]
    const newElements = [...formElements]
    newElements.splice(dragIndex, 1)
    newElements.splice(hoverIndex, 0, dragElement)
    setFormElements(newElements)
  }

  const updateFormElement = (id: string, updates: Partial<FormElement>) => {
    setFormElements(formElements.map((element) => (element.id === id ? { ...element, ...updates } : element)))
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col gap-6">
        <div className="flex justify-end">
          <Button onClick={() => setShowPreview(!showPreview)} variant={showPreview ? "outline" : "default"}>
            {showPreview ? "Back to Editor" : "Preview Form"}
          </Button>
        </div>

        {showPreview ? (
          <FormPreview formElements={formElements} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1 border rounded-lg p-4 bg-card">
              <h2 className="text-lg font-medium mb-4">Form Elements</h2>
              <FormElementPalette onAddElement={addFormElement} />
            </div>
            <div className="md:col-span-3 border rounded-lg p-4 min-h-[500px] bg-card">
              <h2 className="text-lg font-medium mb-4">Form Canvas</h2>
              <FormCanvas
                formElements={formElements}
                onRemoveElement={removeFormElement}
                onMoveElement={moveFormElement}
                onUpdateElement={updateFormElement}
              />
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  )
}

