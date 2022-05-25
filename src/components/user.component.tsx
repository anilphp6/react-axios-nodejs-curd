import { Component, ChangeEvent } from "react";
import { RouteComponentProps } from 'react-router-dom';

import UserDataService from "../services/service";
import IUser from "../types/user.type";

interface RouterProps { // type for `match.params`
  id: string; // must be type `string` since value comes from the URL
}

type Props = RouteComponentProps<RouterProps>;

type State = {
  currentUser: IUser;
  message: string | null
}

export default class User extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.state = {
      currentUser: {
        name: '',
        email: '',
        password: '',
        profession: '',
      },
      message: null
    }

  }

  componentDidMount() {
    this.getUser(this.props.match.params.id);
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

  deleteUser() {
    UserDataService.delete(this.props.match.params.id)
      .then((response: any) => {
        console.log(response.data);
        this.props.history.push("/");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  updateUser = () => {
    //console.log(this.state.currentUser);
    UserDataService.update(
      this.state.currentUser, this.state.currentUser.id
    ).then((response: any) => {
      console.log('response--->', response.data);
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
        console.log('Error--->', e);
      });
  }
  updateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name1 = e.currentTarget.name as keyof typeof this.state.currentUser;
    const records = { ...this.state }

    records.currentUser[name1] = e.target.value
    console.log(records);
    this.setState({ ...records });
  }
  render() {
    return (
      <div>
        {
          this.state.message && <span className="fade alert alert-success show">{this.state.message}</span>
        }
        <div className="edit-form">
          <h4>User details</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Name</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name='name'
                defaultValue={this.state.currentUser.name}
                onChange={this.updateChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Password</label>
              <input
                type="text"
                name='password'
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
                name='email'
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
                name='profession'
                onChange={this.updateChange}
                defaultValue={this.state.currentUser.profession}
              />
            </div>
            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              Pending
            </div>
          </form>
          <button
            className="badge badge-danger mr-2"
          >
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={this.updateUser}
          >
            Update
          </button>
          <button
            type="submit"
            className="badge badge-dark ml-2"
            onClick={() => this.props.history.push('/')}
          >
            Back
          </button>

          <p>{/* this.state.message */}</p>
        </div>
      </div>
    );
  }
}
