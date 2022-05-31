import { Component, ChangeEvent } from "react";
import { RouteComponentProps } from "react-router-dom";
import IUser, { IUserProps } from "../types/user.type";
import UserDataService from "../services/service";
import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as UserAction from '../Action/userCalls'
import * as actionType from '../ActionType/user'
interface RouterProps {
  id: string;
}
type Props = IUserProps & RouteComponentProps<RouterProps>;

interface userDispatch {
  deleteUser: () => {}
}

type State = {
  currentUser: IUser;
  message: string | null;
};

class User extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
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

  getUser(id: string) {
    const { users, loading } = this.props.userState
    const currentUser: IUser | undefined = users.find((i: IUser) => i.id == id)
    currentUser && this.setState({ currentUser: currentUser })
  }

  deleteUser = () => {
    this.props.dispatch.deleteUser(this.state.currentUser.id);
  }
  updatSaveUser = () => {
    //update
    if (this.state.currentUser.id) {
      this.props.dispatch.updateUser(this.state.currentUser);
      this.setState({
        message: "Update successfully!",
      });
    } else {
      this.props.dispatch.addUser(this.state.currentUser);
      this.setState({
        message: "save successfully!",
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

function mapStateToProps(redux: any) {
  return { userState: redux.usersState }
}
function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    dispatch: bindActionCreators(UserAction, dispatch),
  }
}

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps
)(User)