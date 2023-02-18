import React, { Component } from 'react';
import {Form,Container,Button,Nav} from 'react-bootstrap';
class Details extends Component{

  constructor(props) {
      super(props)
      this.state ={

      }
  }
  render() {
    return (<div>
      {console.log(this.props.arr1[0])}
      <pre style={{fontFamily:"Calibri",fontSize:"40px"}}>Name      :     {this.props.arr1[0][0]}  {this.props.arr1[0][1]!==''?<img height="100px" width="100px" src={this.props.arr1[0][1]} style={{borderRadius:'50px'}}/>:null}</pre>
      {
        <table>
        <tr><th class="thtd">Address</th><td class="thtd">{this.props.arr1[0][2]}</td></tr>
        <tr><th class="thtd">Pincode</th><td class="thtd">{this.props.arr1[0][3].toNumber()}</td></tr>
        <tr><th class="thtd">Aadhaar ID</th><td class="thtd">{this.props.arr1[0][4].toNumber()}</td></tr>
        <tr><th class="thtd">E-mail ID</th><td class="thtd">{this.props.arr1[0][5].toString()}</td></tr>
        <tr><th class="thtd">Phone</th><td class="thtd">{this.props.arr1[0][6].toString()}</td></tr>
        </table>
      }
      </div>)
  }
}

export default Details;
