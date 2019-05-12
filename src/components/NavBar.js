import React from "react";
import logo from "../logo.svg";
import { logOutAsync } from "../backend/api";
import { Navbar, Nav, Form, Button } from "react-bootstrap";

export class NavBar extends React.PureComponent {
  logOut() {
    logOutAsync(this.props.sessionToken);
    this.props.onClick(false);
  }
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#">
          <img src={logo} className="App-logo" alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#">
              <h1>Technical Test</h1>
            </Nav.Link>
          </Nav>
          {this.props.displayList && (
            <Form inline>
              <Button variant="primary" onClick={e => this.logOut()}>
                LogOut
              </Button>
            </Form>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
