export const ROUTES = {
  home: "/",
  board: "board",
  signup: "auth/signup",
  login: "auth/login",
}

export const APP_NAME = "Trello Clone"

export const HOME_SIDEBAR_PRIMARY = [
  { key: "boards", title: "Boards", link: "/" },
  { key: "templates", title: "Templates", link: "/templates" },
  { key: "home", title: "Home", link: "/" },
]

export const HOME_SIDEBAR_WORKSPACE_MENU = [
  {
    key: "workspace-boards",
    title: "Boards",
    link: "boards",
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
