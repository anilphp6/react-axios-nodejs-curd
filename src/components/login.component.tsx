import { Component, ChangeEvent } from "react";
import { RouteComponentProps } from "react-router-dom";

import UserDataService from "../services/service";
import { Ilogin } from "../types/user.type";

interface RouterProps {
  id: string;
}
type Props = RouteComponentProps<RouterProps>;
type State = {
  message: string | null;
  isAuthenticated: boolean;
  login: Ilogin
  userData?: any
};

export default class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      login: {
        email: '',
        password: ''
      },
      isAuthenticated: false,
      message: null,
    };
  }
  updateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name1 = e.currentTarget.name as keyof typeof this.state.login;
    const records = { ...this.state };

    records.login[name1] = e.target.value;
    this.setState({ ...records });
  };
  login = () => {
    if (this.state.login.email.trim() === '' || this.state.login.password.trim() === '') {
      this.setState({
        message: 'Email and password required!'
      }, () => {
        setTimeout(() => {
          this.setState({
            message: null
          })
        }, 1000);
      })
    }
    UserDataService.login(this.state.login).then((res: any) => {
      if (res.data.status == 'Fail') {
        this.setState({
          message: res.data.message
        })
      }
      if (res.data.status == 'success') {
        this.setState({
          message: null,
          isAuthenticated: true,
          userData: res.data.data
        })
      }
    }).catch((e: Error) => {
      this.setState({
        message: e.message
      })
    });
  }
  render() {
    return (
      <div>
        {this.state.message && (
          <span className="alert alert-danger">
            {this.state.message}
          </span>
        )}
        <div className="edit-form">
          <h4>User Login JWT token</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                onChange={this.updateChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="password"
                onChange={this.updateChange}
              />
            </div>
            <button
              type="button"
              className="badge badge-success" onClick={this.login}>
              Submit
            </button>
          </form>

        </div>
        {
          this.state.isAuthenticated && <pre>{JSON.stringify(this.state.userData)}</pre>
        }
      </div>
    );
  }
}
