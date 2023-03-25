export interface AccountLogin {
  username: string
  password: string
}

export interface AccountRegister extends AccountLogin {
  confirmPassword: string
}
