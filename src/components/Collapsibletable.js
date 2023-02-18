import React, { Component } from 'react';
import {Form,Container,Button,Nav} from 'react-bootstrap';
import Collapsible from 'react-collapsible';
class Collapsibletable extends Component{

  constructor(props) {
      super(props)
      this.state ={

      }
  }
  render() {
    return (<div>
      {console.log(this.props.user)}
      <pre style={{fontFamily:"Calibri",fontSize:"40px"}}>Name      :     {this.props.user.name}  {this.props.user.ipfsHash!==''?<img height="100px" width="100px" src={this.props.user.ipfsHash} style={{borderRadius:'50px'}}/>:null}</pre>
      {
        this.props.arr.map((yeah,kay)=>{
          return(
            <div style={{margin:'10px',borderBottom:'5px solid #001a33',borderRadius:'40px',backgroundColor:'lightgrey',width:'100%',padding:'10px'}}>
            <Collapsible trigger={(new Date(yeah[2])).toString().split(" GMT")[0]} key={kay}>
            <div style={{margin:'10px',backgroundColor:'white',padding:'10px'}}>
              <table border="5" style={{textAlign:'center'}} >
                    <tr><th>From</th><th>To</th><th>Time</th><th>Rice</th><th>Sugar</th><th>Wheat</th><th>Kerosene</th></tr>
                    <tr><td>{yeah[0]}</td><td>{yeah[1]}</td><td>{(new Date(yeah[2])).toString().split(" GMT")[0]}</td><td>{yeah[3]}</td><td>{yeah[4]}</td><td>{yeah[5]}</td><td>{yeah[6]}</td></tr>
              </table>
              </div>
            </Collapsible>
            </div>
          )
        })
      }
      </div>)
  }
}

export default Collapsibletable;
