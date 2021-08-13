interface IRoutes {
  [key: string]: string
}

interface IWorkspaceLink {
  key: string
  title: string
  link: string
}

export const ROUTES: IRoutes = {
  home: "/",
  board: "board",
  signup: "auth/signup",
  login: "auth/login",
  billing: "profile?active=billing",
  settings: "profile?active=settings",
  mfa: "auth/mfa",
}

export const APP_NAME = "Trello Clone"

export const HOME_SIDEBAR_PRIMARY = [
  { key: "boards", title: "Boards", link: "/" },
  { key: "templates", title: "Templates", link: "/templates" },
  { key: "home", title: "Home", link: "/" },
]

export const HOME_SIDEBAR_WORKSPACE_MENU: IWorkspaceLink[] = [
  {
    key: "workspace-boards",
    title: "Boards",
    link: "/userworkspace-boards",
  },
  {
    key: "workspace-table",
    title: "Workspace table",
    link: "/userworkspace-table",
  },
  {
    key: "workspace-members",
    title: "Members",
    link: "/userworkspace-members",
  },
  {
    key: "workspace-account",
    title: "Settings",
    link: "/userworkspace-account",
  },
]

export const BOARD_COLOR_OPTIONS = [
  {
    key: 0,
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  },
  {
    key: 1,
    image:
      "https://images.unsplash.com/photo-1593642532871-8b12e02d091c?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  },
  {
    key: 2,
    image:
      "https://images.unsplash.com/photo-1627598359861-f83052a1248f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  },
  {
    key: 3,
    image:
      "https://images.unsplash.com/photo-1627635174707-a629d585e1e7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80",
  },
  { key: 4, color: "rgb(0, 121, 191)" },
  { key: 5, color: "rgb(210, 144, 52)" },
  { key: 6, color: "rgb(81, 152, 57)" },
  { key: 7, color: "rgb(176, 70, 50)" },
]

export const PROFILE_TAB_OPTIONS = [
  { key: "profile", title: "Profile and visibility", path: "" },
  { key: "activity", title: "Activity", path: "activity" },
  { key: "cards", title: "Cards", path: "cards" },
  { key: "settings", title: "Settings", path: "cards" },
  { key: "plans", title: "Upgrade Plans", path: "plans" },
]

export const PROFILE_SETTINGS_OPTIONS = [
  { key: "two-step-auth", title: "Two-step verification" },
  { key: "delete-account", title: "Delete account" },
]

export const MFA_TAB_OPTIONS = [
  { key: "verify", title: "Verify Password", id: 0 },
  { key: "install", title: "Install", id: 1 },
  { key: "connect", title: "Connect phone", id: 2 },
  { key: "setup", title: "Setup recovery", id: 3 },
]

export const AUTHENTICATOR_OPTIONS = [
  { key: "google", title: "Google Authenticator" },
  { key: "authy", title: "Authy" },
  { key: "duo", title: "Duo Mobile" },
]
