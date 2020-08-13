import React from "react";
import { NavigationFrame } from "../navigation-frame"
import { SnackbarProvider } from "notistack"

const BaseLayout: React.FC = ({ children}) => {
  return (
    <NavigationFrame>
      {children}
    </NavigationFrame>
    );
}

export const Layout = BaseLayout;
