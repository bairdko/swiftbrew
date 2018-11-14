import React, { Component } from 'react';
import API from '../utils/API';
import Header from "../components/Header";
import QRCode from 'qrcode';

import {Container, Row, Col, Card, CardBody, CardTitle, Table, Button, Form, Input, Label } from 'reactstrap';

class Cart extends Component {

  state = {
    cart: [],
    checkoutClicked: false,
    qrUrl:'',
    orderName: ''
  }

  componentDidMount() {
    this.loadCart()
  }

  loadCart = () => {
    
    API.getCart()
      .then(res => {
        this.setState({
          cart: res.data})
       }
      )
      .catch(err => console.log(err));
  };

  removeFromCart = (e) => {
    e.preventDefault();

    API.removeFromCart(e.target.id)
      .then(this.loadCart)
      .catch(err => console.log(err));
  };

  getOrderName = (e) => {
    e.preventDefault();

    this.setState({orderName: e.target.value})

  }

  renderQR = (e) => {
    e.preventDefault();
    
    const opts = {
      errorCorrectionLevel: 'H',
      type: 'image/jpeg',
      rendererOpts: {
        quality: 0.3
      }
    }

    const qrURL = "https://swiftbrew.herokuapp.com/checkout";

    const that = this;

    QRCode.toDataURL(qrURL, opts, function (err, url) {
      if (err) throw err

      that.setState({
        qrUrl:url,
        checkoutClicked: true
      });
    });

    if(this.state.orderName !== ''){
      let items = this.state.cart.map(items => ({product_name:items.product_name, size:items.size, price:items.price}))

      let orderData = {
        order_name: this.state.orderName,
        items: items
      };

      API.saveOrder(orderData)
        .catch(err => console.log(err));

    }
  }

  render(){
    return(
      <div>
        <Header />
        <Container>
          
          <Row>
              <Col sm="12">
                <Card>
                  <CardBody>
                      <CardTitle>Your Order</CardTitle>
                      <Table>
                        <thead>
                          <tr>
                              <th>Product</th>
                              <th>Size</th>
                              <th>Cost</th>
                              <th></th>
                          </tr>
                        </thead>
                        <tbody>
                        {this.state.cart.map(cart =>(
                          <tr key = {cart._id}>
                              <td>{cart.product_name}</td>
                              <td>{cart.size}</td>
                              <td>${cart.price.toFixed(2)}</td>
                              <td><Button id = {cart._id} onClick = {this.removeFromCart}>X</Button></td>
                          </tr>
                        ))}
                        </tbody>
                      </Table>
                  </CardBody>
                </Card>
            </Col>
          </Row>
          <Row>
              <Col md = "12" className = "justify-content-center">
                <Form>
                  <Label for="orderName">Save your order for easy checkout next time!</Label>
                  <br/>
                  <br/>
                  <Input type = "text" name="orderName" id="orderName" 
                    placeholder="Enter an order name (optional)" onBlur = {this.getOrderName}></Input>
                </Form>
              </Col>
          </Row>
          <Row>
            <Col md="6" className = "text-center">
              <Button onClick = {this.renderQR}>Checkout!</Button>
            </Col>
            <Col md="6" id = "QRlocation" className = "justify-content-center">
              { this.state.checkoutClicked ? 
              <div>
                <h4>Save this QR Code and show to the cashier at checkout!</h4>
                <img src = {this.state.qrUrl} 
                alt = "QR Code"/>
              </div> : ''}
              
            </Col>
          </Row>
          
        </Container>
      </div>
    )
  }
};

export default Cart;
