import React from "react"
import { Layout } from "./layout"

export function withLayout<T>(Component: React.ComponentType<T>): React.ComponentType<T> {
  return (props: T) => {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    )
  }
}
