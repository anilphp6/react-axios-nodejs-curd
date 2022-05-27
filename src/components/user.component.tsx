import { Component, ChangeEvent } from "react";
import { RouteComponentProps } from "react-router-dom";

import UserDataService from "../services/service";
import IUser from "../types/user.type";

interface RouterProps {
  id: string;
}
type Props = RouteComponentProps<RouterProps>;

type State = {
  currentUser: IUser;
  message: string | null;
};

export default class User extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.state = {
      currentUser: {
        name: "",
        email: "",
        password: "",
        profession: "",
      },
      message: null,
    };
  }
  validateExitUser = () => {
    return this.props.match.params.id ? true : false;
  };
  componentDidMount() {
    if (this.validateExitUser()) {
      this.getUser(this.props.match.params.id);
    }
  }

  onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    const title = e.target.value;
  }

  onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    const description = e.target.value;
  }

  getUser(id: string) {
    UserDataService.get(id)
      .then((response: any) => {
        this.setState({
          currentUser: response.data[0],
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  deleteUser = () => {
    UserDataService.delete(this.state.currentUser.id)
      .then((response: any) => {
        console.log("response--->", response.data);
        this.setState({
          message: "Deleted successfully!",
        });
        setTimeout(() => {
          this.setState({
            message: null,
          }, () => this.props.history.push("/users"));
        }, 1000);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  updatSaveUser = () => {
    //update
    if (this.state.currentUser.id) {
      UserDataService.update(this.state.currentUser, this.state.currentUser.id)
        .then((response: any) => {
          console.log("response--->", response.data);
          this.setState({
            message: "The User was updated successfully!",
          });
          setTimeout(() => {
            this.setState({
              message: null,
            });
          }, 1000);
        })
        .catch((e: Error) => {
          console.log("Error--->", e);
        });
    } else {
      //Save
      UserDataService.create(this.state.currentUser)
        .then((response: any) => {
          console.log("response--->", response.data);
          this.setState({
            message: "The User was save successfully!",
          });
          setTimeout(() => {
            this.setState({
              message: null,
            }, () => this.props.history.push("/users"));
          }, 1000);
        })
        .catch((e: Error) => {
          console.log("Error--->", e);
        });
    }
  }
  updateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name1 = e.currentTarget.name as keyof typeof this.state.currentUser;
    const records = { ...this.state };

    records.currentUser[name1] = e.target.value;
    console.log(records);
    this.setState({ ...records });
  };
  render() {
    return (
      <div>
        {this.state.message && (
          <span className="fade alert alert-success show">
            {this.state.message}
          </span>
        )}
        <div className="edit-form">
          <h4>User details</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Name</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="name"
                defaultValue={this.state.currentUser.name}
                onChange={this.updateChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="title"
                onChange={this.updateChange}
                defaultValue={this.state.currentUser.password}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Email</label>
              <input
                type="text"
                className="form-control"
                name="email"
                id="email"
                onChange={this.updateChange}
                defaultValue={this.state.currentUser.email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Profession</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="profession"
                onChange={this.updateChange}
                defaultValue={this.state.currentUser.profession}
              />
            </div>
          </form>
          {this.validateExitUser() && (
            <button className="badge badge-danger mr-2" onClick={this.deleteUser}>Delete</button>
          )}

          <button
            type="submit"
            className="badge badge-success"
            onClick={this.updatSaveUser}
          >
            {this.validateExitUser() ? "Update" : "Save"}
          </button>
          <button
            type="button"
            className="badge badge-dark ml-2"
            onClick={() => this.props.history.push("/users")}
          >
            Back
          </button>
        </div>
      </div>
    );
  }
}
