import React from "react"
import { withLayout } from "./layout"

const TestBase: React.FC = () => {
    return (
    <div>
      Test component
    </div>
  )
}


export const Test = withLayout(TestBase)
