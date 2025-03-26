export enum FormElementType {
  INPUT = "input",
  RADIO = "radio",
  BUTTON = "button",
  NUMBER = "number",
  CHECKBOX = "checkbox",
  TEXTAREA = "textarea",
}

export interface FormElement {
  id: string
  type: FormElementType
  props: any
}

