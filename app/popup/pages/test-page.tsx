import React from "react"
import { useLocation } from "react-router-dom"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import { Typography } from "@material-ui/core"

export const TestPage: React.FC<{ from: string }> = ({ from }) => {
  const location = useLocation()

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          TEST {from}
        </Typography>
        <div style={{ border: "thin red solid" }}>
          Location:
          {JSON.stringify(location)}
        </div>
      </CardContent>
    </Card>
  )
}
