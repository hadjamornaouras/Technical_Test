import React, { Fragment } from "react";
import { Button, Form } from "react-bootstrap";
import { fetchAsync } from "../backend/api";
import Oders from "./Oders";
import NavBar from "./NavBar";

export class Main extends React.PureComponent {
  state = {
    username: "",
    password: "",
    displayList: false,
    sessionToken: {}
  };
  handleSubmit = async e => {
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    if (username && password) {
      let result = await fetchAsync({
        username: username,
        password: password
      });
      result &&
        result.data.sessionToken &&
        this.setState({
          displayList: true,
          sessionToken: {
            sessionToken: result.data.sessionToken
          }
        });
    }
  };

  handleUsername = event => {
    event.preventDefault();
    this.setState({ username: event.target.value });
  };

  handlePassword = event => {
    event.preventDefault();
    this.setState({ password: event.target.value });
  };

  render() {
    let { displayList, sessionToken } = this.state;
    return (
      <Fragment>
        <NavBar
          displayList={displayList}
          sessionToken={sessionToken}
          onClick={e => this.setState({ displayList: e })}
        />
        <div className="container" style={{ padding: 23 }}>
          {displayList ? (
            <Oders sessionToken={sessionToken} />
          ) : (
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter login"
                  onChange={this.handleUsername}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={this.handlePassword}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
            </Form>
          )}
        </div>
      </Fragment>
    );
  }
}

export default Main;
