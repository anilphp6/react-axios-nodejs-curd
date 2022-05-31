import http from "../http-common";
import IUser, { Ilogin } from "../types/user.type"

class UserDataService {
  getAll(): Promise<any> {
    return http.get<Array<IUser>>("/users");
  }
  login(credentials: Ilogin) {
    return http.post<Ilogin>(`/login/`, credentials);
  }
  get(id: string) {
    return http.get<IUser>(`/users/${id}`);
  }

  create(data: IUser) {
    return http.post<IUser>("/users", data);
  }

  update(data: IUser, id: any) {
    // console.log('udate-----')
    return http.put<any>(`/users/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/users/${id}`);
  }
}

export default new UserDataService();