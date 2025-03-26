"use client"

import { useDrop } from "react-dnd"
import type { FormElement } from "@/lib/types"
import { DraggableFormElement } from "@/components/draggable-form-element"

interface FormCanvasProps {
  formElements: FormElement[]
  onRemoveElement: (id: string) => void
  onMoveElement: (dragIndex: number, hoverIndex: number) => void
  onUpdateElement: (id: string, updates: Partial<FormElement>) => void
}

export function FormCanvas({ formElements, onRemoveElement, onMoveElement, onUpdateElement }: FormCanvasProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["FORM_ELEMENT", "DRAGGABLE_ELEMENT"],
    drop: (item: any, monitor) => {
      // Only handle drops directly on the canvas, not on existing elements
      if (monitor.didDrop()) {
        return
      }
      return { name: "FormCanvas" }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  }))

  return (
    <div
      ref={drop}
      className={`min-h-[400px] border-2 border-dashed rounded-md p-4 ${
        isOver ? "border-primary bg-primary/5" : "border-muted-foreground/20"
      }`}
    >
      {formElements.length === 0 ? (
        <div className="h-full flex items-center justify-center">
          <p className="text-muted-foreground text-center">
            Drag and drop form elements here
            <br />
            <span className="text-sm">or use the buttons to add elements</span>
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {formElements.map((element, index) => (
            <DraggableFormElement
              key={element.id}
              id={element.id}
              index={index}
              element={element}
              onRemove={onRemoveElement}
              onMove={onMoveElement}
              onUpdate={onUpdateElement}
            />
          ))}
        </div>
      )}
    </div>
  )
}

