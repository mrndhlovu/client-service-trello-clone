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
  refreshToken: "/auth/refresh-token",
  signup: "/auth/signup",
}

export default endPoints
