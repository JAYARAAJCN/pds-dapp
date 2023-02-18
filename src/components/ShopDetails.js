import React, { Component } from 'react';
import {Form,Container,Button,Nav} from 'react-bootstrap';
import Collapsible from 'react-collapsible';
import './App.css';
class ShopDetails extends Component{

  constructor(props) {
      super(props)
      this.state ={
      }
  }
  render() {
    return (<div>
      {
        <table class="center">
        <tr><th class="thtd">Shop ID</th><td class="thtd">{this.props.arr[0][1]}</td></tr>
        <tr><th class="thtd">Pincode</th><td class="thtd">{this.props.arr[0][0]}</td></tr>
        <tr><th class="thtd">Rice</th><td class="thtd">{this.props.arr[0][2]}</td></tr>
        <tr><th class="thtd">Sugar</th><td class="thtd">{this.props.arr[0][3]}</td></tr>
        <tr><th class="thtd">Wheat</th><td class="thtd">{this.props.arr[0][4]}</td></tr>
        <tr><th class="thtd">Kerosene</th><td class="thtd">{this.props.arr[0][5]}</td></tr>
        </table>
      }
      </div>)
  }
}

export default ShopDetails;
