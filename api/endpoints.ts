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
  deleteUser: "/auth/delete",
  payments: "/payments/subscription",
  refreshToken: "/auth/refresh-token",
  signup: "/auth/signup",
  verify: "/accounts/verify",
  updateUser: "/auth/update",
  verifyMfaCode: "/auth/mfa/validate",
  enableMfa: "/auth/mfa/enable",
  connectMfa: "/auth/mfa/connect",
  verifyCredentials: "/auth/login-verify",
  getQrCodeImage: "/auth/mfa/qr-code",
  getBillingOptions: "/payments/products",
  getBillingHistory: "/payments",
}

export default endPoints
