import { Route, Switch, useLocation } from "react-router-dom"
import { Redirect, RouteComponentProps, RouteProps, withRouter } from "react-router"
import React from "react"
import { Paths } from "./paths"
import { AuthorizedWebsitesPage } from "../../pages/authorized-websites"
import { TokensPage } from "../../pages/tokens"
import { useBackground } from "../../context/background"
import { LoadingIndicator } from "../loading-indicator"
import { RestoreWalletPage } from "../../pages/restore-wallet-page"
import { CreateWalletPage } from "../../pages/create-wallet-page"
import { LoginPage } from "../../pages/login-page"
import { WalletPage } from "../../pages/wallet-page"
import { TestPage } from "../../pages/test-page"

const RoutesBase: React.FC = () => {
  const { popupState } = useBackground()
  const location = useLocation()

  const routes: {
    [path: string]: React.ComponentType<any>
  } = {
    [Paths.authorizedWebsites]: AuthorizedWebsitesPage,
    [Paths.tokens]: TokensPage,
    [Paths.accounts]: WalletPage
  }
  const secureRoute = (key: string, props: RouteProps) => {
    const Component = props.component as React.ComponentType<any>
    const rest = Object.assign({}, props)
    delete rest.component

    return (
      <Route
        key={key}
        {...rest}
        render={(props: RouteComponentProps): React.ReactNode => {
          // If the user is not authenticated, redirect to signup
          if (popupState?.walletState !== "unlocked") {
            const redirectTo = (popupState?.walletState === "locked" ? Paths.login : Paths.welcome)
            return (
              <TestPage from={`attempt to load secure route: ${rest.path} - ${popupState?.walletState} `}/>
              // <Redirect
              //   to={{
              //     pathname: redirectTo,
              //     state: { from: props.location },
              //   }}
              // />
            )
          }

          return <Component {...props} />
        }}
      />
    )
  }

  const unsecureRoute = (key: string, props: RouteProps) => {
    const Component = props.component as React.ComponentType<any>
    const rest = Object.assign({}, props)
    delete rest.component

    return (
      <Route
        key={key}
        {...rest}
        render={(props: RouteComponentProps) => {
          if (popupState?.walletState === "unlocked") {
            return (
              <TestPage from={`attempt to load unsecure route: ${rest.path} - ${popupState?.walletState}`}/>
              // <Redirect
              //   to={{
              //     pathname: Paths.accounts,
              //     state: { from: props.location },
              //   }}
              // />
            )
          }
          return <Component {...props} />
        }}
      />
    )
  }

  const defaultRoute = (key: string, props: RouteProps) => {
    const rest = Object.assign({}, props)
    delete rest.component

    return (
      <Route
        key={key}
        {...rest}
        render={(props: RouteComponentProps) => {

          if (!popupState) {
            return <LoadingIndicator/>
          }
          switch (popupState.walletState) {
            case "locked":
              return <Redirect to={{ pathname: Paths.login }}/>
            case "uninitialized":
              return <Redirect to={{ pathname: Paths.welcome }}/>
            case "unlocked":
              return <Redirect to={{ pathname: Paths.accounts }}/>
          }
        }}
      />
    )
  }


  return (
    <>
      <div style={{ border: "thin red solid" }}>
        Location:
        {JSON.stringify(location)}
      </div>
      <Switch>
        {Object.keys(routes).map((path) => {
          return (
            secureRoute(`authenticated-route${path.replace("/", "-")}`, {
              exact: true,
              path: path,
              component: routes[path]
            })
          )
        })}

        {/* unsecure-only routes */}
        {
          unsecureRoute(`restore-route`, {
            exact: true,
            path: Paths.restore,
            component: RestoreWalletPage
          })
        }
        {
          unsecureRoute(`welcome-route`, {
            exact: true,
            path: Paths.welcome,
            component: CreateWalletPage
          })
        }
        {
          unsecureRoute(`login-route`, {
            exact: true,
            path: Paths.login,
            component: LoginPage
          })
        }

        {defaultRoute(`default-route`, {})}
      </Switch>
    </>
  )
}


export const Routes = withRouter(RoutesBase)
