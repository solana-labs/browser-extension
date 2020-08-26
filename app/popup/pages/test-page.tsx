import React, { useEffect } from "react"
import { Link as RouterLink, useLocation } from "react-router-dom"
import { Paths } from "../components/routes/paths"
import { withLayout } from "../components/layout"
import { useCallAsync } from "../utils/notifications"
import { useBackground } from "../context/background"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import { Typography } from "@material-ui/core"
import CardActions from "@material-ui/core/CardActions"
import Button from "@material-ui/core/Button"


export const TestPage: React.FC<{from: string}> = ({from}) => {
  const location = useLocation();

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          TEST {from}
        </Typography>
        <div style={{border: "thin red solid"}}>
          Location:
          {JSON.stringify(location)}
        </div>

      </CardContent>
    </Card>
  )
}


