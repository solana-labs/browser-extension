import React, { useState } from "react"
import { CardActions, makeStyles, Typography } from "@material-ui/core"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import { withLayout } from "../components/layout"
import { useBackground } from "../context/background"
import { useCallAsync } from "../utils/notifications"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos"
import {
  ActionKey,
  ActionRequestAccounts,
  ActionSignTransaction,
  OrderedAction,
} from "../../core/types"
import TextField from "@material-ui/core/TextField"
import ReactMarkdown from "react-markdown"
import { LoadingIndicator } from "../components/loading-indicator"
import { Paths } from "../components/routes/paths"
import { Redirect } from "react-router"
// @ts-ignore FIXME We need to add a mock definition of this library to the overall project

const useStyles = makeStyles({
  notification: {
    height: "100%",
    textAlign: "center",
  },
  actions: {
    textAlign: "center",
  },
  pagination: {
    textAlign: "center",
  },
  paginationTitle: {
    paddingTop: "15px",
  },
  content: {
    // Required for big addresses to break otherwise it overflows, works great for addresses but might not be the case for other words...
    wordBreak: "break-all",
  },
})

interface NotificationPageProps {
  opener: any
}

const NotificationPageBase: React.FC<NotificationPageProps> = (opts: NotificationPageProps) => {
  const { popupState, isNotification } = useBackground()
  const [currentNotificationIndex, setCurrentNotificationIndex] = useState(0)

  if (!popupState) {
    return <LoadingIndicator />
  }

  const notifications = popupState.actions

  if (notifications.length === 0 && isNotification) {
    window.close()
  } else if (notifications.length === 0 && !isNotification) {
    return <Redirect to={{ pathname: Paths.accounts }} />
  }

  const handleNotificationPage = (page: number) => {
    setCurrentNotificationIndex(page)
  }

  const onCloseNotification = (index: number) => {
    console.log("Closing notification with index: ", index)
  }

  const renderNotification = (idx: number, action: OrderedAction) => {
    switch (action.action.type) {
      case "request_accounts":
        return (
          <AuthorizeRequestAccounts
            actionKey={action.key}
            action={action.action}
            onClose={() => {
              onCloseNotification(idx)
            }}
          />
        )
      case "sign_transaction":
        return (
          <AuthorizeTransaction
            actionKey={action.key}
            action={action.action}
            onClose={() => {
              onCloseNotification(idx)
            }}
          />
        )
    }
  }

  return (
    <Container fixed maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <NotificationPagination
            currentIndex={currentNotificationIndex}
            total={notifications.length}
            onPageChange={handleNotificationPage}
          />
        </Grid>
        <Grid item xs={12}>
          <div>
            {renderNotification(currentNotificationIndex, notifications[currentNotificationIndex])}
          </div>
        </Grid>
      </Grid>
    </Container>
  )
}

interface NotificationPaginationProps {
  currentIndex: number
  total: number
  onPageChange: (index: number) => void
}

const NotificationPagination: React.FC<NotificationPaginationProps> = ({
  currentIndex,
  total,
  onPageChange,
}) => {
  const classes = useStyles()
  const hasPrevious = currentIndex > 0 && total > 1
  const hasNext = currentIndex < total - 1 && total > 1
  return (
    <Grid container spacing={3} className={classes.pagination}>
      <Grid item xs={4}>
        {hasPrevious && (
          <Button onClick={() => onPageChange(currentIndex - 1)}>
            <ArrowBackIosIcon />
          </Button>
        )}
      </Grid>
      <Grid item xs={4} className={classes.paginationTitle}>
        {currentIndex + 1} of {total}
      </Grid>
      <Grid item xs={4}>
        {hasNext && (
          <Button onClick={() => onPageChange(currentIndex + 1)}>
            <ArrowForwardIosIcon />
          </Button>
        )}
      </Grid>
    </Grid>
  )
}

export const NotificationPage = withLayout(NotificationPageBase)

export const AuthorizeRequestAccounts: React.FC<{
  actionKey: ActionKey
  action: ActionRequestAccounts
  onClose: () => void
}> = ({ actionKey, action, onClose }) => {
  const classes = useStyles()
  const { request } = useBackground()
  const callAsync = useCallAsync()

  const handleAuthorize = () => {
    callAsync(
      request("popup_authoriseRequestAccounts", {
        actionKey: actionKey,
      }),
      {
        progress: { message: "Authorizing Request Account..." },
        success: { message: "Success!" },
        onFinish: () => {
          onClose()
        },
      }
    )
  }

  const handleDecline = () => {
    callAsync(
      request("popup_declineRequestAccounts", {
        actionKey: actionKey,
      }),
      {
        progress: { message: "Declining Request Account..." },
        success: { message: "Success!" },
        onFinish: () => {
          onClose()
        },
      }
    )
  }

  return (
    <Card className={classes.notification}>
      <CardContent>
        <Typography component="h1" gutterBottom>
          Account Access
        </Typography>
        <Typography component="p">The website:</Typography>
        <Typography component="h2">{action.origin}</Typography>
        <Typography component="p">
          Wants to{" "}
          <b>
            <i>list your accounts.</i>
          </b>
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button onClick={handleDecline} variant="outlined">
          Cancel
        </Button>
        <Button color="primary" variant="outlined" onClick={handleAuthorize}>
          Approve
        </Button>
      </CardActions>
    </Card>
  )
}

export const AuthorizeTransaction: React.FC<{
  actionKey: ActionKey
  action: ActionSignTransaction
  onClose: () => void
}> = ({ actionKey, action, onClose }) => {
  const classes = useStyles()
  const { request } = useBackground()
  const callAsync = useCallAsync()

  const handleAuthorize = () => {
    callAsync(
      request("popup_authoriseTransaction", {
        actionKey: actionKey,
      }),
      {
        progress: { message: "Authorizing Transaction..." },
        success: { message: "Success!" },
        onFinish: () => {
          onClose()
        },
      }
    )
  }

  const handleDecline = () => {
    callAsync(
      request("popup_declineTransaction", {
        actionKey: actionKey,
      }),
      {
        progress: { message: "Declining Transaction..." },
        success: { message: "Declined", variant: "error" },
        onFinish: () => {
          onClose()
        },
      }
    )
  }

  return (
    <Card className={classes.notification}>
      <CardContent>
        <Typography component="h1" gutterBottom>
          Authorize Transaction
        </Typography>
        <Card variant="outlined">
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="h6" component="h5">
              Instructions
            </Typography>
            <div>{renderTransactionDetails(action)}</div>
          </CardContent>
        </Card>
        <TextField
          label="Message"
          fullWidth
          variant="outlined"
          margin="normal"
          value={action.message}
          disabled={true}
        />
      </CardContent>
      <CardActions className={classes.actions}>
        <Button onClick={handleDecline} variant="outlined">
          Cancel
        </Button>
        <Button color="primary" variant="outlined" onClick={handleAuthorize}>
          Approve
        </Button>
      </CardActions>
    </Card>
  )
}

function renderTransactionDetails(transaction: ActionSignTransaction) {
  if (!transaction.details?.length) {
    return <ReactMarkdown key={0} source={undecodedTransactionMessage()} />
  }
  return transaction.details.map((detail, idx) => {
    return <ReactMarkdown key={idx} source={detail.content} />
  })
}

function undecodedTransactionMessage(): string {
  return `You are about to sign transaction that we were not able to decode`
}
