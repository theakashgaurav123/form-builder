"use client"

import { useDrag } from "react-dnd"
import { type FormElement, FormElementType } from "@/lib/types"
import { FileInputIcon as Input } from "lucide-react"
import { CircleDot } from "lucide-react"
import { Square } from "lucide-react"
import { Hash, CheckSquare, AlignLeft } from "lucide-react"

interface FormElementPaletteProps {
  onAddElement: (element: FormElement) => void
}

const elementTypes = [
  {
    type: FormElementType.INPUT,
    label: "Text Input",
    icon: Input,
    defaultProps: {
      label: "Text Input",
      placeholder: "Enter text...",
      required: false,
    },
  },
  {
    type: FormElementType.NUMBER,
    label: "Number Input",
    icon: Hash,
    defaultProps: {
      label: "Number Input",
      placeholder: "Enter a number...",
      min: 0,
      max: 100,
      required: false,
    },
  },
  {
    type: FormElementType.TEXTAREA,
    label: "Text Area",
    icon: AlignLeft,
    defaultProps: {
      label: "Text Area",
      placeholder: "Enter longer text...",
      rows: 4,
      required: false,
    },
  },
  {
    type: FormElementType.CHECKBOX,
    label: "Checkbox",
    icon: CheckSquare,
    defaultProps: {
      label: "Checkbox",
      text: "Check this option",
      required: false,
    },
  },
  {
    type: FormElementType.RADIO,
    label: "Radio Group",
    icon: CircleDot,
    defaultProps: {
      label: "Radio Group",
      options: ["Option 1", "Option 2", "Option 3"],
      required: false,
    },
  },
  {
    type: FormElementType.BUTTON,
    label: "Button",
    icon: Square,
    defaultProps: {
      label: "Submit",
      variant: "default",
    },
  },
]

export function FormElementPaletteItem({
  type,
  label,
  icon: Icon,
  defaultProps,
  onAddElement,
}: {
  type: FormElementType
  label: string
  icon: any
  defaultProps: any
  onAddElement: (element: FormElement) => void
}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "FORM_ELEMENT",
    item: { type, defaultProps },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult && dropResult.name === "FormCanvas") {
        onAddElement({
          type: item.type,
          props: item.defaultProps,
          id: "",
        })
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag}
      className={`p-3 mb-2 border rounded-md cursor-move flex items-center gap-2 bg-background hover:bg-accent ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </div>
  )
}

export function FormElementPalette({ onAddElement }: FormElementPaletteProps) {
  return (
    <div className="space-y-2">
      {elementTypes.map((element) => (
        <FormElementPaletteItem
          key={element.type}
          type={element.type}
          label={element.label}
          icon={element.icon}
          defaultProps={element.defaultProps}
          onAddElement={onAddElement}
        />
      ))}
    </div>
  )
}

