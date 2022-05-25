import { Component, ChangeEvent } from "react";
import UserDataService from "../services/service";
import { Link } from "react-router-dom";
import IUser from "../types/user.type";

type Props = {};

type State = {
  users: Array<IUser>;
  currentUsers: IUser | null;
  currentIndex: number | null;
};

export default class UsersList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.retrieveUsers = this.retrieveUsers.bind(this);
    this.state = {
      users: [],
      currentUsers: null,
      currentIndex: null,
    };
  }

  componentDidMount() {
    this.retrieveUsers();
  }

  retrieveUsers() {
    UserDataService.getAll()
      .then((response: any) => {
        this.setState({
          users: response.data,
        });
        console.log(response);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  setActiveUser(userDetails: IUser, index: number) {
    this.setState({
      currentUsers: userDetails,
      currentIndex: index,
    });
  }

  render() {
    const { users, currentUsers } = this.state;
    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by email"
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button">
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Users List</h4>

          <ul className="list-group">
            {users &&
              users.map((users: IUser, index: number) => (
                <li
                  className={"list-group-item text-justify text-capitalize row"}
                  onClick={() => this.setActiveUser(users, index)}
                  key={index}
                  title={users.name}
                >
                  {`${users.name}     ${users.email}`}
                </li>
              ))}
            {
              users.length === 0 && (<li className={"list-group-item text-justify text-capitalize row"}>No Records.</li>)
            }
          </ul>
        </div>
        <div className="col-md-6">
          {currentUsers && (
            <div>
              <h4>Users Details</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentUsers.name}
              </div>
              <div>
                <label>
                  <strong>Email:</strong>
                </label>{" "}
                {currentUsers.email}
              </div>
              <div>
                <label>
                  <strong>Profession:</strong>
                </label>{" "}
                {currentUsers.profession}
              </div>

              <Link
                to={"/users/" + currentUsers.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }
}
