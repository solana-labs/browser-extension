import React from "react"
import Dialog, { DialogProps } from "@material-ui/core/Dialog"

export const DialogForm: React.FC<DialogProps> = ({
                                                    open,
                                                    onClose,
                                                    onSubmit,
                                                    children,
                                                    ...rest
                                                  }) => (
  <Dialog
    open={open}
    PaperProps={{
      component: "form",
      onSubmit: (e) => {
        e.preventDefault()
        if (onSubmit) {
          onSubmit(e)
        }
      }
    }}
    onClose={onClose}
    {...rest}
  >
    {children}
  </Dialog>
)
