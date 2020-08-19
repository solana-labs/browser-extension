import React, { useState } from "react"
import Toolbar from "@material-ui/core/Toolbar"
import AppBar from "@material-ui/core/AppBar"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import CheckIcon from "@material-ui/icons/Check"
import AddIcon from "@material-ui/icons/Add"
import AccountIcon from "@material-ui/icons/AccountCircle"
import MenuIcon from "@material-ui/icons/Menu"
import Divider from "@material-ui/core/Divider"
import Hidden from "@material-ui/core/Hidden"
import IconButton from "@material-ui/core/IconButton"
import { SolanaIcon } from "./solana-icon"
import Tooltip from "@material-ui/core/Tooltip"
import { useCallAsync } from "../utils/notifications"
import { useBackground } from "../context/background"
import { Network } from "../../core/types"
import { Link as RouterLink } from "react-router-dom"
import { Paths } from "./routes/paths"

const useStyles = makeStyles((theme) => ({
  content: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  bar: {
    backgroundColor: "black",
    color: theme.palette.primary.main,
  },
  title: {
    flexGrow: 1,
  },
  button: {
    marginLeft: theme.spacing(1),
  },
  menuItemIcon: {
    minWidth: 32,
  },
}))

export const NavigationFrame: React.FC = ({ children }) => {
  const classes = useStyles()
  const callAsync = useCallAsync()
  const { request, popupState, changeNetwork, changeAccount } = useBackground()
  const account = popupState?.selectedAccount || ""

  const handleSelectAccount = (account: string) => {
    changeAccount(account)
  }

  const handleCreateAccount = () => {
    callAsync(request("popup_addWalletAccount", {}), {
      progressMessage: "Creating a new account",
      successMessage: "Account created!",
    })
  }

  return (
    <>
      <AppBar className={classes.bar} position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.title} component="h1">
            Solana Wallet
          </Typography>
          {popupState && popupState.walletState === "unlocked" && (
            <NetworkSelector
              availableNetworks={popupState.availableNetworks}
              selectedNetwork={popupState.selectedNetwork}
              changeNetwork={changeNetwork}
            />
          )}
          <WalletSelector
            accounts={popupState?.accounts || []}
            addAccount={handleCreateAccount}
            selectedAccount={account || ""}
            selectAccount={handleSelectAccount}
          />
          {popupState && popupState.walletState === "unlocked" && <MenuSelector />}
        </Toolbar>
      </AppBar>
      <main className={classes.content}>{children}</main>
    </>
  )
}

const MenuSelector: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<any>()
  const { popupState } = useBackground()
  return (
    <>
      <Hidden smUp>
        <Tooltip title="More options" arrow>
          <IconButton color="inherit" onClick={(e) => setAnchorEl(e.target)}>
            <MenuIcon />
          </IconButton>
        </Tooltip>
      </Hidden>

      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        getContentAnchorEl={null}
      >
        <MenuItem key={"menu-0"} component={RouterLink} to={Paths.account}>
          <Typography>Account details</Typography>
        </MenuItem>
        {popupState?.authorizedOrigins && popupState.authorizedOrigins.length > 0 && (
          <MenuItem key={"menu-1"} component={RouterLink} to={Paths.authorizedWebsites}>
            <Typography>Authorized websites</Typography>
          </MenuItem>
        )}
        <MenuItem key={"menu-0"} component={RouterLink} to={Paths.account}>
          <Typography>Lock wallet</Typography>
        </MenuItem>
      </Menu>
    </>
  )
}

interface NetworkSelectorProps {
  availableNetworks: Network[]
  selectedNetwork: Network
  changeNetwork: (network: Network) => void
}

const NetworkSelector: React.FC<NetworkSelectorProps> = ({
  availableNetworks,
  selectedNetwork,
  changeNetwork,
}) => {
  const [anchorEl, setAnchorEl] = useState<any>()
  const classes = useStyles()
  return (
    <>
      <Hidden xsDown>
        <Button color="inherit" onClick={(e) => setAnchorEl(e.target)} className={classes.button}>
          {selectedNetwork.title}
        </Button>
      </Hidden>
      <Hidden smUp>
        <Tooltip title="Select Network" arrow>
          <IconButton color="inherit" onClick={(e) => setAnchorEl(e.target)}>
            <SolanaIcon />
          </IconButton>
        </Tooltip>
      </Hidden>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        getContentAnchorEl={null}
      >
        {availableNetworks.map((network) => (
          <MenuItem
            key={network.endpoint}
            onClick={() => {
              setAnchorEl(null)
              changeNetwork(network)
            }}
            selected={network.endpoint === selectedNetwork.endpoint}
          >
            <ListItemIcon className={classes.menuItemIcon}>
              {network.endpoint === selectedNetwork.endpoint ? (
                <CheckIcon fontSize="small" />
              ) : null}
            </ListItemIcon>
            {network.endpoint}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

interface WalletSelectorProps {
  accounts: string[]
  selectedAccount: string
  addAccount: () => void
  selectAccount: (account: string) => void
}

const WalletSelector: React.FC<WalletSelectorProps> = ({
  accounts,
  selectedAccount,
  addAccount,
  selectAccount,
}) => {
  const [anchorEl, setAnchorEl] = useState<any>()
  const classes = useStyles()

  if (accounts.length === 0) {
    return null
  }

  return (
    <>
      <Hidden xsDown>
        <Button color="inherit" onClick={(e) => setAnchorEl(e.target)} className={classes.button}>
          Account
        </Button>
      </Hidden>
      <Hidden smUp>
        <Tooltip title="Select Account" arrow>
          <IconButton color="inherit" onClick={(e) => setAnchorEl(e.target)}>
            <AccountIcon />
          </IconButton>
        </Tooltip>
      </Hidden>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        getContentAnchorEl={null}
      >
        {accounts.map((account) => (
          <MenuItem
            key={account}
            onClick={() => {
              setAnchorEl(null)
              selectAccount(account)
            }}
            selected={selectedAccount === account}
          >
            <ListItemIcon className={classes.menuItemIcon}>
              {selectedAccount === account ? <CheckIcon fontSize="small" /> : null}
            </ListItemIcon>
            {account}
          </MenuItem>
        ))}
        <Divider />
        <MenuItem
          onClick={() => {
            setAnchorEl(null)
            addAccount()
          }}
        >
          <ListItemIcon className={classes.menuItemIcon}>
            <AddIcon fontSize="small" />
          </ListItemIcon>
          Create Account
        </MenuItem>
      </Menu>
    </>
  )
}
