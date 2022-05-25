import { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import User from "./components/user.component";
import Login from "./components/login.component";
import UsersList from "./components/users-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Home
          </Link>
          <Link to={"/users"} className="navbar-brand">
            Users
          </Link>
          <Link to={"/addUser"} className="navbar-brand">
            Add User
          </Link>
          <Link to={"/login"} className="navbar-brand">
            Login
          </Link>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path="/" component={() => {
              return (
                <div>
                  <div className="centered">
                    <h1>Demo Axios Method with NodeJs Server:&nbsp;&nbsp;&nbsp;
                      <button type="button" className="btn btn-primary">
                        <Link to={"/users"} className="navbar-brand">
                          Start
                        </Link> <span className="badge bg-secondary">1</span>
                      </button>
                    </h1>
                    <p>This is React axios nodeJs curd application.</p>
                  </div>
                </div>
              )
            }} />
            <Route exact path="/users" component={UsersList} />
            <Route path="/users/:id" component={User} />
            {/*  <Route path="/login" component={() => <>Coming...</>} /> */}
            <Route path="/login" component={Login} />
            <Route path="/addUser" component={User} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
