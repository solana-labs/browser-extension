import React, { Suspense } from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import {
  ThemeProvider,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from "@material-ui/core/styles"
import blue from "@material-ui/core/colors/blue"
import { NavigationFrame } from "../components/navigation-frame"
import { ConnectionProvider } from "../context/connection"
import { LoadingIndicator } from "../components/loading-indicator"
import { SnackbarProvider } from "notistack"
import { BackgroundProvider } from "../context/background"
import { ContentPage } from "./content-page"

export const App: React.FC = () => {
  // TODO: add toggle for dark mode
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
          primary: blue,
        },
      }),
    [prefersDarkMode]
  )

  // Disallow rendering inside an iframe to prevent clickjacking.
  if (window.self !== window.top) {
    return null
  }

  return (
    <Suspense fallback={<LoadingIndicator />}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BackgroundProvider>
          <ConnectionProvider>
            <SnackbarProvider maxSnack={5} autoHideDuration={8000}>
              <NavigationFrame>
                <Suspense fallback={<LoadingIndicator />}>
                  <ContentPage />
                </Suspense>
              </NavigationFrame>
            </SnackbarProvider>
          </ConnectionProvider>
        </BackgroundProvider>
      </ThemeProvider>
    </Suspense>
  )
}
