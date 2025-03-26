"use client"

import { type FormElement, FormElementType } from "@/lib/types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Plus, X } from "lucide-react"

interface FormElementEditorProps {
  element: FormElement
  onUpdate: (updates: Partial<FormElement>) => void
}

export function FormElementEditor({ element, onUpdate }: FormElementEditorProps) {
  const { type, props } = element

  const updateProps = (updates: any) => {
    onUpdate({ props: { ...props, ...updates } })
  }

  switch (type) {
    case FormElementType.INPUT:
      return (
        <div className="space-y-3">
          <div className="grid gap-2">
            <Label htmlFor={`${element.id}-label`}>Label</Label>
            <Input
              id={`${element.id}-label`}
              value={props.label}
              onChange={(e) => updateProps({ label: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`${element.id}-placeholder`}>Placeholder</Label>
            <Input
              id={`${element.id}-placeholder`}
              value={props.placeholder}
              onChange={(e) => updateProps({ placeholder: e.target.value })}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`${element.id}-required`}
              checked={props.required}
              onCheckedChange={(checked) => updateProps({ required: checked })}
            />
            <Label htmlFor={`${element.id}-required`}>Required</Label>
          </div>
        </div>
      )

    case FormElementType.NUMBER:
      return (
        <div className="space-y-3">
          <div className="grid gap-2">
            <Label htmlFor={`${element.id}-label`}>Label</Label>
            <Input
              id={`${element.id}-label`}
              value={props.label}
              onChange={(e) => updateProps({ label: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`${element.id}-placeholder`}>Placeholder</Label>
            <Input
              id={`${element.id}-placeholder`}
              value={props.placeholder}
              onChange={(e) => updateProps({ placeholder: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor={`${element.id}-min`}>Min Value</Label>
              <Input
                id={`${element.id}-min`}
                type="number"
                value={props.min}
                onChange={(e) => updateProps({ min: Number(e.target.value) })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor={`${element.id}-max`}>Max Value</Label>
              <Input
                id={`${element.id}-max`}
                type="number"
                value={props.max}
                onChange={(e) => updateProps({ max: Number(e.target.value) })}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`${element.id}-required`}
              checked={props.required}
              onCheckedChange={(checked) => updateProps({ required: checked })}
            />
            <Label htmlFor={`${element.id}-required`}>Required</Label>
          </div>
        </div>
      )

    case FormElementType.TEXTAREA:
      return (
        <div className="space-y-3">
          <div className="grid gap-2">
            <Label htmlFor={`${element.id}-label`}>Label</Label>
            <Input
              id={`${element.id}-label`}
              value={props.label}
              onChange={(e) => updateProps({ label: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`${element.id}-placeholder`}>Placeholder</Label>
            <Input
              id={`${element.id}-placeholder`}
              value={props.placeholder}
              onChange={(e) => updateProps({ placeholder: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`${element.id}-rows`}>Rows</Label>
            <Input
              id={`${element.id}-rows`}
              type="number"
              min={2}
              max={10}
              value={props.rows}
              onChange={(e) => updateProps({ rows: Number(e.target.value) })}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`${element.id}-required`}
              checked={props.required}
              onCheckedChange={(checked) => updateProps({ required: checked })}
            />
            <Label htmlFor={`${element.id}-required`}>Required</Label>
          </div>
        </div>
      )

    case FormElementType.CHECKBOX:
      return (
        <div className="space-y-3">
          <div className="grid gap-2">
            <Label htmlFor={`${element.id}-label`}>Group Label</Label>
            <Input
              id={`${element.id}-label`}
              value={props.label}
              onChange={(e) => updateProps({ label: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`${element.id}-text`}>Checkbox Text</Label>
            <Input
              id={`${element.id}-text`}
              value={props.text}
              onChange={(e) => updateProps({ text: e.target.value })}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`${element.id}-required`}
              checked={props.required}
              onCheckedChange={(checked) => updateProps({ required: checked })}
            />
            <Label htmlFor={`${element.id}-required`}>Required</Label>
          </div>
        </div>
      )

    case FormElementType.RADIO:
      return <RadioOptionsEditor element={element} options={props.options} onUpdate={updateProps} />

    case FormElementType.BUTTON:
      return (
        <div className="space-y-3">
          <div className="grid gap-2">
            <Label htmlFor={`${element.id}-label`}>Button Text</Label>
            <Input
              id={`${element.id}-label`}
              value={props.label}
              onChange={(e) => updateProps({ label: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`${element.id}-variant`}>Button Style</Label>
            <Select value={props.variant} onValueChange={(value) => updateProps({ variant: value })}>
              <SelectTrigger id={`${element.id}-variant`}>
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="secondary">Secondary</SelectItem>
                <SelectItem value="outline">Outline</SelectItem>
                <SelectItem value="ghost">Ghost</SelectItem>
                <SelectItem value="link">Link</SelectItem>
                <SelectItem value="destructive">Destructive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )

    default:
      return <div>No editor available for this element type</div>
  }
}

function RadioOptionsEditor({
  element,
  options,
  onUpdate,
}: {
  element: FormElement
  options: string[]
  onUpdate: (updates: any) => void
}) {
  const [newOption, setNewOption] = useState("")

  const addOption = () => {
    if (newOption.trim()) {
      onUpdate({ options: [...options, newOption.trim()] })
      setNewOption("")
    }
  }

  const removeOption = (index: number) => {
    const newOptions = [...options]
    newOptions.splice(index, 1)
    onUpdate({ options: newOptions })
  }

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    onUpdate({ options: newOptions })
  }

  return (
    <div className="space-y-3">
      <div className="grid gap-2">
        <Label htmlFor={`${element.id}-label`}>Group Label</Label>
        <Input
          id={`${element.id}-label`}
          value={element.props.label}
          onChange={(e) => onUpdate({ label: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Options</Label>
        {options.map((option, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input value={option} onChange={(e) => updateOption(index, e.target.value)} />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeOption(index)}
              className="h-8 w-8 text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Input
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          placeholder="Add new option"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              addOption()
            }
          }}
        />
        <Button variant="outline" size="icon" onClick={addOption} className="h-8 w-8">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${element.id}-required`}
          checked={element.props.required}
          onCheckedChange={(checked) => onUpdate({ required: checked })}
        />
        <Label htmlFor={`${element.id}-required`}>Required</Label>
      </div>
    </div>
  )
}

