import React, { Suspense } from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import {
  makeStyles,
  ThemeProvider,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from "@material-ui/core/styles"
import { ConnectionProvider } from "../context/connection"
import { LoadingIndicator } from "../components/loading-indicator"
import { SnackbarProvider } from "notistack"
import { BackgroundProvider } from "../context/background"
import { Router } from "react-router-dom"
import { history } from "../utils/history"
import { Routes } from "../components/routes/routes"

export const App: React.FC = () => {
  // TODO: add toggle for dark mode
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
          primary: {
            main: "#25c2a0",
            contrastText: "#fff",
          },
          secondary: {
            main: "#86b8b6",
            contrastText: "#fff",
          },
          success: {
            main: "#25c2a0",
            contrastText: "#fff",
          },
          info: {
            main: "#43b5c5",
            contrastText: "#fff",
          },
          error: {
            main: "#fa62fc",
            contrastText: "#fff",
          },
        },
        typography: {
          fontSize: 13,
        },
        spacing: 6,
      }),
    [prefersDarkMode]
  )
  const useStyles = makeStyles({
    success: { backgroundColor: "#25c2a0" },
    error: { backgroundColor: "#B45BDC" },
    warning: { backgroundColor: "#fa62fc" },
    info: { backgroundColor: "#43b5c5" },
  })

  const classes = useStyles()

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
            <SnackbarProvider
              maxSnack={5}
              autoHideDuration={8000}
              classes={{
                variantSuccess: classes.success,
                variantError: classes.error,
                variantWarning: classes.warning,
                variantInfo: classes.info,
              }}
            >
              <Router history={history}>
                <Routes />
              </Router>
            </SnackbarProvider>
          </ConnectionProvider>
        </BackgroundProvider>
      </ThemeProvider>
    </Suspense>
  )
}
