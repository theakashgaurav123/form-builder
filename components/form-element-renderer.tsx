"use client"

import { type FormElement, FormElementType } from "@/lib/types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

interface FormElementRendererProps {
  element: FormElement
  isEditing?: boolean
  onSubmit?: (data: any) => void
}

export function FormElementRenderer({ element, isEditing = false, onSubmit }: FormElementRendererProps) {
  const { type, props } = element

  switch (type) {
    case FormElementType.INPUT:
      return (
        <div className="space-y-2">
          <Label htmlFor={element.id}>{props.label}</Label>
          <Input id={element.id} placeholder={props.placeholder} required={props.required} />
        </div>
      )

    case FormElementType.NUMBER:
      return (
        <div className="space-y-2">
          <Label htmlFor={element.id}>{props.label}</Label>
          <Input
            id={element.id}
            type="number"
            placeholder={props.placeholder}
            min={props.min}
            max={props.max}
            required={props.required}
          />
        </div>
      )

    case FormElementType.TEXTAREA:
      return (
        <div className="space-y-2">
          <Label htmlFor={element.id}>{props.label}</Label>
          <Textarea id={element.id} placeholder={props.placeholder} rows={props.rows} required={props.required} />
        </div>
      )

    case FormElementType.CHECKBOX:
      return (
        <div className="space-y-2">
          <div className="space-y-2">
            <Label>{props.label}</Label>
            <div className="flex items-center space-x-2">
              <Checkbox id={element.id} required={props.required} />
              <Label htmlFor={element.id}>{props.text}</Label>
            </div>
          </div>
        </div>
      )

    case FormElementType.RADIO:
      return (
        <div className="space-y-2">
          <Label>{props.label}</Label>
          <RadioGroup defaultValue={props.options[0]}>
            {props.options.map((option: string, index: number) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${element.id}-${index}`} />
                <Label htmlFor={`${element.id}-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )

    case FormElementType.BUTTON:
      return (
        <Button variant={props.variant} onClick={isEditing ? undefined : () => onSubmit && onSubmit({})}>
          {props.label}
        </Button>
      )

    default:
      return <div>Unknown element type</div>
  }
}

