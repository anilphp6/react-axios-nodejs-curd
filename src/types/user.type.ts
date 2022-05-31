export default interface IUser {
  id?: any | null,
  email: string,
  name: string,
  password: string,
  profession?: string,
}

export interface Ilogin {
  email: string
  password: string
}

export interface IUserProps {
  userState: {
    error: any
    loading: boolean
    users: IUser[]
  },
  dispatch: any,
}