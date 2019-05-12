import React from "react";
import { fetchOrderStatusAsync, fetchOrderAsync } from "../backend/api";
import {
  Table,
  CardGroup,
  Card,
  DropdownButton,
  Dropdown,
  Pagination,
  Button,
  Modal,
  ListGroup
} from "react-bootstrap";
import moment from "moment/moment.js";

export class Orders extends React.PureComponent {
  state = {
    title: "paid",
    limit: 20
  };
  async componentDidMount() {
    let OrderStatus = await fetchOrderStatusAsync();
    let Orders = await fetchOrderAsync(this.props.sessionToken);
    this.setState({ OrderStatus, Orders });
  }
  handleNext = async () => {
    let offsetOrderId = this.state.Orders.data[
      this.state.Orders.data.length - 1
    ].orderId;
    let Orders = await fetchOrderAsync(
      this.props.sessionToken,
      this.state.title,
      this.state.limit,
      offsetOrderId
    );
    this.setState({ Orders });
  };
  handleLimitPagination = item => {
    this.setState({ limit: item }, async () => {
      let Orders = await fetchOrderAsync(
        this.props.sessionToken,
        this.state.title,
        this.state.limit
      );
      this.setState({ Orders });
    });
  };
  handleOrderStatus = item => {
    this.setState({ title: item }, async () => {
      let Orders = await fetchOrderAsync(
        this.props.sessionToken,
        this.state.title,
        this.state.limit
      );
      this.setState({ Orders });
    });
  };
  paidTime(date) {
    let d = new Date(date);
    let result = moment(d).format("MMMM Do YYYY, h:mm:ss a");
    return result;
  }
  handleShow = item => {
    this.setState({ show: true, item: item });
  };
  handleClose = () => {
    this.setState({ show: false });
  };
  moreDetails(item) {
    this.handleShow(item);
  }
  render() {
    let { Orders, OrderStatus } = this.state;
    let limitPagination = [5, 10, 20];
    return (
      <>
        <CardGroup>
          <Card>
            <Card.Header>
              <DropdownButton
                id="dropdown-basic-button"
                title={this.state.title}
                style={{ float: "right" }}
              >
                {OrderStatus &&
                  OrderStatus.data.map((item, key) => (
                    <Dropdown.Item href="#" key={key}>
                      <span onClick={e => this.handleOrderStatus(item)}>
                        {item}
                      </span>
                    </Dropdown.Item>
                  ))}
              </DropdownButton>
            </Card.Header>
            <Card.Body className="CarBody">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Price Products</th>
                    <th>Payment Time</th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                  {Orders &&
                    Orders.data.map((item, key) => (
                      <tr key={key}>
                        <td>
                          {item.address.firstname} {item.address.lastname}
                        </td>
                        <td>{item.address.email}</td>
                        <td>{item.priceProducts}</td>
                        <td>{this.paidTime(item.paidTime)}</td>
                        <td>
                          <Button
                            variant="primary"
                            onClick={e => this.moreDetails(item)}
                          >
                            More Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Card.Body>
            <Card.Footer className="cardFooter">
              <Pagination>
                <Pagination.Next onClick={e => this.handleNext()}>
                  Next>>
                </Pagination.Next>
              </Pagination>
              <DropdownButton
                id="dropdown-basic-button"
                title={this.state.limit}
                style={{ float: "right" }}
              >
                {limitPagination &&
                  limitPagination.map((item, key) => (
                    <Dropdown.Item href="#" key={key}>
                      <span onClick={e => this.handleLimitPagination(item)}>
                        {item}
                      </span>
                    </Dropdown.Item>
                  ))}
              </DropdownButton>
            </Card.Footer>
          </Card>
        </CardGroup>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {this.state.item && this.state.item.address.firstname}
              {this.state.item && this.state.item.address.lastname}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup>
              <ListGroup.Item>
                <font face="verdana" color="blue">
                  Address:
                </font>{" "}
                {this.state.item && this.state.item.address.addressCity},
                {this.state.item && this.state.item.address.addressLine1},
                {this.state.item && this.state.item.address.addressCountry}
                {this.state.item && this.state.item.address.addressZip}{" "}
              </ListGroup.Item>
              <ListGroup.Item>
                <font face="verdana" color="blue">
                  Payment Method:
                </font>
                {this.state.item && this.state.item.metaData.paymentMethod}
              </ListGroup.Item>
              <ListGroup.Item>
                <font face="verdana" color="blue">
                  Max Shipment Days:
                </font>
                {this.state.item && this.state.item.metaData.maxShipmentDays}
              </ListGroup.Item>
              <ListGroup.Item>
                <font face="verdana" color="blue">
                  Coupon Discount:
                </font>
                {this.state.item && this.state.item.couponDiscount}
              </ListGroup.Item>
              <ListGroup.Item>
                <font face="verdana" color="blue">
                  {" "}
                  Currency:{" "}
                </font>
                {this.state.item && this.state.item.currency}
              </ListGroup.Item>
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Orders;
