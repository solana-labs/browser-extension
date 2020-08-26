import { Route, Switch } from "react-router-dom"
import { RouteComponentProps, RouteProps, withRouter } from "react-router"
import React from "react"
import { Paths } from "./paths"
import { AuthorizedWebsitesPage } from "../../pages/authorized-websites"
import { AccountsPage } from "../../pages/accounts-page"
import { LockWalletPage } from "../../pages/lock-wallet-page"
import { TokensPage } from "../../pages/tokens"

const RoutesBase: React.FC = () => {
  const routes: {
    [path: string]: React.ComponentType<any>
  } = {
    [Paths.authorizedWebsites]: AuthorizedWebsitesPage,
    [Paths.tokens]: TokensPage,
    [Paths.accounts]: AccountsPage,
    [Paths.lockWallet]: LockWalletPage,
  }

  return (
    <Switch>
      {Object.keys(routes).map((path) => {
        return (
          <UnauthenticatedRoute
            exact={true}
            key={`unauthenticated-route${path.replace("/", "-")}`}
            path={path}
            component={routes[path]}
          />
        )
      })}
      <Route component={AccountsPage} />
    </Switch>
  )
}

const UnauthenticatedRoute = (props: RouteProps) => {
  const Component = props.component as React.ComponentType<any>
  const rest = Object.assign({}, props)
  delete rest.component

  return (
    <Route
      {...rest}
      render={(props: RouteComponentProps) => {
        return <Component {...props} />
      }}
    />
  )
}

export const Routes = withRouter(RoutesBase)
