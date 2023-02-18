import React, { Component } from 'react';
import {Form,Container,Button,Nav} from 'react-bootstrap';
import smartrat from './smartrat';
import Navibar from './Navibar';
import Collapsibletable from './Collapsibletable';
import ShopDetails from './ShopDetails';

class Distributor extends Component{

  onAddressChange=(event)=>{
      this.setState({address:event.target.value})
    }

  onToAddressChange=(event)=>{
   this.setState({toAddress:event.target.value})
  }

  onRiceChange=(event)=>{
   this.setState({rice:event.target.value})
  }

  onSugarChange=(event)=>{
   this.setState({sugar:event.target.value})
  }

  onWheatChange=(event)=>{
   this.setState({wheat:event.target.value})
  }

  onKeroseneChange=(event)=>{
   this.setState({kerosene:event.target.value})
  }


  getTransaction=async (event)=>{
    event.preventDefault()
    this.setState({getTransactionForm:'none'})
    let lad=await smartrat.methods.getLAdminDetails(this.state.address).call()
    let far=await smartrat.methods.getFarmersById(this.state.address).call()
    let mil=await smartrat.methods.getMillersById(this.state.address).call()
    let dis=await smartrat.methods.getDistributorsById(this.state.address).call()
    let shop=await smartrat.methods.getShopsByAddress(this.state.address).call()
    let user={name:'user',ipfsHash:''}
    if(far.name!==''){
    this.setState({user:far})
    }
    else if(mil.name!==''){
    this.setState({user:mil})
  }
    else if(dis.name!==''){
    this.setState({user:dis})
    }
    else if(shop.phone!==''){
    shop['ipfsHash']=''
    shop['name']='Shop'
    this.setState({user:shop})
    }
    else if(lad.name!==''){
    this.setState({user:lad})
    }
    else{
      this.setState({user:user})
    }
    let arr=await smartrat.methods.getTransactionByAddress(this.state.address).call()
    let arr1=[]
    for(var i=arr.length-1;i>=0;i--){
      arr1.push([arr[i][0],arr[i][1],arr[i][2].toNumber(),arr[i][3].toNumber(),arr[i][4].toNumber(),arr[i][5].toNumber(),arr[i][6].toNumber()])
    }
    console.log(user)
    console.log(this.state.address)
    this.setState({arr:arr1})
      this.setState({transaction:'block'})
  }

  setTransaction=async (event)=>{
    event.preventDefault()
    await smartrat.methods.updateTransaction(this.state.toAddress,(new Date()).getTime(),this.state.rice,this.state.sugar,this.state.wheat,this.state.kerosene).send({from:this.props.account})
    this.setState({toAddress:''})
    this.setState({rice:0})
    this.setState({sugar:0})
    this.setState({wheat:0})
    this.setState({kerosene:0})
  }

  getShopInfo=async (event)=>{
    event.preventDefault()
    this.setState({shopInfoForm:'none'})
    let arr=await smartrat.methods.getShopsByAddress(this.state.address).call()
    let arr1=[]
    arr1.push([arr[0].toNumber(),arr[1],arr[5].toNumber(),arr[6].toNumber(),arr[7].toNumber(),arr[8].toNumber()])
    console.log(this.state.address)
    this.setState({arr:arr1})
      this.setState({showShopInfo:'block'})
}

  tabSwitch=(eventKey)=>{
    if(eventKey=='getTransaction'){
        this.setState({getTransactionForm:'block'})
        this.setState({setTransactionForm:'none'})
        this.setState({transaction:'none'})
        this.setState({shopInfoForm:'none'})
        this.setState({showShopInfo:'none'})
        }
        else if(eventKey=='setTransaction'){
          this.setState({getTransactionForm:'none'})
          this.setState({setTransactionForm:'block'})
          this.setState({transaction:'none'})
          this.setState({shopInfoForm:'none'})
          this.setState({showShopInfo:'none'})
          }
          else if(eventKey=='shop'){
            this.setState({getTransactionForm:'none'})
            this.setState({setTransactionForm:'none'})
            this.setState({transaction:'none'})
            this.setState({shopInfoForm:'none'})
            this.setState({showShopInfo:'none'})
            }
            else if(eventKey=='shopInfo'){
              this.setState({getTransactionForm:'none'})
              this.setState({setTransactionForm:'none'})
              this.setState({transaction:'none'})
              this.setState({shopInfoForm:'block'})
              this.setState({showShopInfo:'none'})
            }
   }

  constructor(props) {
      super(props)
      this.state ={
        address:'',
        toAddress:'',
        rice:0,
        sugar:0,
        wheat:0,
        kerosene:0,
        getTransactionForm:'none',
        setTransactionForm:'block',
        shopInfoForm:'none',
        transaction:'none',
        showShopInfo:'none',
        arr:[[1,2,3,4,5,6]],
        user:[],
        lad:[],
        mil:[],
        far:[],
        shop:[],
        dis:[],
        flag:''
      }
  }

  render() {
    return (
          <div>
          <Navibar name={this.props.name} profile={this.props.profile}/>
          <Nav variant="pills" defaultActiveKey="setTransaction" onSelect={this.tabSwitch} >
          <Nav.Item>
            <Nav.Link eventKey="setTransaction">Update Transaction</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="getTransaction">Get Transaction Details</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="shopInfo">Get Shop Info</Nav.Link>
          </Nav.Item>
          </Nav>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <Container className="cusform">
          <Form onSubmit={this.getTransaction} style={{display:this.state.getTransactionForm}}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Address:</Form.Label>
            <Form.Control type="text" placeholder="Enter the Address" onChange={this.onAddressChange} />
          </Form.Group>
          <Button variant="primary" type="submit" >
          Get Transaction
          </Button>
          </Form>
          {this.state.transaction==='block'?<Collapsibletable arr={this.state.arr} user={this.state.user}/>:null}
          <Form onSubmit={this.setTransaction} style={{display:this.state.setTransactionForm}}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>To Address:</Form.Label>
            <Form.Control type="text" placeholder="Enter the To Address" onChange={this.onToAddressChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Rice:</Form.Label>
            <Form.Control type="number" placeholder="Enter the weight(in kgs)" onChange={this.onRiceChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Sugar:</Form.Label>
            <Form.Control type="number" placeholder="Enter the weight(in kgs)" onChange={this.onSugarChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Wheat:</Form.Label>
            <Form.Control type="number" placeholder="Enter the weight(in kgs)" onChange={this.onWheatChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Kerosene:</Form.Label>
            <Form.Control type="number" placeholder="Enter the weight(in kgs)" onChange={this.onKeroseneChange} />
          </Form.Group>
          <Button variant="primary" type="submit" >
          Update Transaction
          </Button>
        </Form>
        <Form onSubmit={this.getShopInfo} style={{display:this.state.shopInfoForm}}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Enter the shop's Address:</Form.Label>
          <Form.Control type="text" placeholder="Enter the Shop's Address" onChange={this.onAddressChange} />
        </Form.Group>
        <Button variant="primary" type="submit" >
        Get Shop Details
        </Button>
        </Form>
        {this.state.showShopInfo==='block'?<ShopDetails arr={this.state.arr}/>:null}
        </Container>
        </div>)}
}
export default Distributor;
