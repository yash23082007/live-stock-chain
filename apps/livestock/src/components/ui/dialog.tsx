"use client"

export const Dialog = () => null
export const DialogTrigger = () => null  
export const DialogPortal = () => null
export const DialogClose = () => null
export const DialogOverlay = () => null
export const DialogContent = () => null
export const DialogHeader = () => null
export const DialogFooter = () => null
export const DialogTitle = () => null
export const DialogDescription = () => null
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
