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
  login: Ilogin
};

export default class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      login: {
        email: '',
        password: ''
      },
      message: null,
    };
  }
  updateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name1 = e.currentTarget.name as keyof typeof this.state.login;
    const records = { ...this.state };

    records.login[name1] = e.target.value;
    this.setState({ ...records });
  };
  login = (): boolean => {
    if (this.state.login.email.trim() === '' || this.state.login.password.trim() === '') {
      this.setState({
        message: 'Login Fail.'
      }, () => {
        setTimeout(() => {
          this.setState({
            message: null
          })
        }, 1000);
      })
      return false
    }
    return true
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
          <h4>User Login</h4>
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
      </div>
    );
  }
}
