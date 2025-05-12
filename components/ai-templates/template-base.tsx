"use client"

import type { ReactNode } from "react"

export interface TemplateBaseProps {
  onComplete: (result: any) => void
  onCancel?: () => void
  prompt: string
  defaultValues?: Record<string, any>
  children?: ReactNode
}

export default function TemplateBase({ onComplete, onCancel, prompt, defaultValues, children }: TemplateBaseProps) {
  return <div className="template-container">{children}</div>
}
