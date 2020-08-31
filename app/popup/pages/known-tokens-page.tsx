import React, { useState } from "react"
import { withLayout } from "../components/layout"
import { useBackground } from "../context/background"
import { LoadingIndicator } from "../components/loading-indicator"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import IconButton from "@material-ui/core/IconButton"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Paper from "@material-ui/core/Paper"
import { Typography } from "@material-ui/core"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import { useCallAsync } from "../utils/notifications"
import { Token } from "../../core/types"
import { Empty } from "../components/empty"
import AddIcon from "@material-ui/icons/Add"
import Tooltip from "@material-ui/core/Tooltip"
import { AddTokenDialog } from "../components/dialogs/add-token-dialog"
import { UpdateTokenDialog } from "../components/dialogs/update-token-dialog"

const KnownTokensPageBase: React.FC = () => {
  const { popupState, request } = useBackground()
  const [showAddTokenDialog, setShowAddTokenDialog] = useState(false)
  const [editToken, setEditToken] = useState<Token>()

  const callAsync = useCallAsync()

  if (!popupState) {
    return <LoadingIndicator/>
  }

  const tokens = popupState.tokens

  console.log("tokens: ", tokens)

  const deleteToken = (token: Token) => {
    callAsync(
      request("popup_removeToken", {
        mintAddress: token.mintAddress
      }),
      {
        progress: { message: "Deleting token..." },
        success: { message: "Success!" }
      }
    )
  }

  return (
    <>
      <Container fixed maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper>
              <AppBar position="static" color="default" elevation={1}>
                <Toolbar>
                  <Typography variant="h6" style={{ flexGrow: 1 }} component="h2">
                    Known Tokens
                  </Typography>
                  <Tooltip title="Add Token" arrow>
                    <IconButton onClick={() => setShowAddTokenDialog(true)}>
                      <AddIcon/>
                    </IconButton>
                  </Tooltip>
                </Toolbar>
              </AppBar>
              <List disablePadding>
                {Object.keys(tokens).length === 0 && (
                  <ListItem>
                    <ListItemText
                      primary={
                        <Empty
                          title={"No Known Tokens"}
                          description={"Add a token and it will appear here"}
                        />
                      }
                    />
                  </ListItem>
                )}
                {Object.values(tokens).map((token) => (
                  <ListItem>
                    <ListItemText
                      primary={`${token.symbol} - ${token.name}`}
                      secondary={token.mintAddress}
                    />
                    <IconButton onClick={() => setEditToken(token)}>
                      <EditIcon/>
                    </IconButton>
                    <IconButton onClick={() => deleteToken(token)}>
                      <DeleteIcon/>
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
        <AddTokenDialog open={showAddTokenDialog} onClose={() => setShowAddTokenDialog(false)}/>
        {editToken && (
          <UpdateTokenDialog
            token={editToken}
            open={true}
            onClose={() => setEditToken(undefined)}
          />
        )}
      </Container>
    </>
  )
}

export const KnownTokensPage = withLayout(KnownTokensPageBase)
