export interface InitialState {
  isLoading: boolean
  isLoginView: boolean
  error: string
  credentialsLog: {
    email: string
    password: string
  }
}

export interface Action {
  type: string
  inputName: string
  payload: {}
}
