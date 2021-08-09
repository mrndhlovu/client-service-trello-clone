interface IEndpoints {
  [key: string]: string
}

const endPoints: IEndpoints = {
  board: "/board",
  boards: "/boards",
  createBoard: "/boards/create",
  currentUser: "/auth/me",
  login: "/auth/login",
  logout: "/auth/logout",
  payments: "/payments/subscription",
  refreshToken: "/auth/refresh-token",
  signup: "/auth/signup",
  verify: "/accounts/verify",
}

export default endPoints
