"use client"

import { useRef } from "react"
import { useDrag, useDrop } from "react-dnd"
import type { FormElement } from "@/lib/types"
import { FormElementRenderer } from "@/components/form-element-renderer"
import { FormElementEditor } from "@/components/form-element-editor"
import { Button } from "@/components/ui/button"
import { Trash2, GripVertical, Settings } from "lucide-react"
import { useState } from "react"

interface DraggableFormElementProps {
  id: string
  index: number
  element: FormElement
  onRemove: (id: string) => void
  onMove: (dragIndex: number, hoverIndex: number) => void
  onUpdate: (id: string, updates: Partial<FormElement>) => void
}

interface DragItem {
  index: number
  id: string
  type: string
}

export function DraggableFormElement({ id, index, element, onRemove, onMove, onUpdate }: DraggableFormElementProps) {
  const [showEditor, setShowEditor] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const [{ handlerId }, drop] = useDrop({
    accept: "DRAGGABLE_ELEMENT",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      onMove(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag, preview] = useDrag({
    type: "DRAGGABLE_ELEMENT",
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  return (
    <div
      ref={preview}
      className={`border rounded-md ${isDragging ? "opacity-50" : "opacity-100"}`}
      data-handler-id={handlerId}
    >
      <div className="p-3 bg-muted/50 border-b rounded-t-md flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div ref={ref} className="cursor-move p-1 hover:bg-muted rounded">
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>
          <span className="text-sm font-medium">{element.props.label}</span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowEditor(!showEditor)}>
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => onRemove(id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="p-3 bg-background">
        <FormElementRenderer element={element} isEditing={true} />
      </div>
      {showEditor && (
        <div className="p-3 bg-muted/30 border-t">
          <FormElementEditor element={element} onUpdate={(updates) => onUpdate(id, updates)} />
        </div>
      )}
    </div>
  )
}

