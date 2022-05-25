import http from "../http-common";
import IUser from "../types/user.type"

class UserDataService {
  getAll() {
    return http.get<Array<IUser>>("/users");
  }

  get(id: string) {
    return http.get<IUser>(`/users/${id}`);
  }

  create(data: IUser) {
    return http.post<IUser>("/users", data);
  }

  update(data: IUser, id: any) {
    console.log('udate-----')
    return http.put<any>(`/users/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/users/${id}`);
  }

  deleteAll() {
    return http.delete<any>(`/users`);
  }

  findByTitle(title: string) {
    return http.get<Array<IUser>>(`/users?title=${title}`);
  }
}

export default new UserDataService();