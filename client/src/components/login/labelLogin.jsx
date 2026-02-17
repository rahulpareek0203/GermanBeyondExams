import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cn } from "@/lib/utils"

const Label = React.forwardRef((props, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn("text-sm font-medium", props.className)}
    {...props}
  />
))

Label.displayName = "Label"

export { Label }
