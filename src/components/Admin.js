import React, { Component } from 'react';
import {Form,Container,Button,Nav,NavDropdown} from 'react-bootstrap';
import smartrat from './smartrat';
import Navibar from './Navibar';
import Collapsibletable from './Collapsibletable';
import ShopDetails from './ShopDetails';
import Details from './Details';
class Admin extends Component{

  upload=(event)=>{
    event.preventDefault()
    const IPFS=require('ipfs-http-client')
    const ipfsInstance= IPFS({host:'ipfs.infura.io',port:5001,protocol:'https'})
    const file = event.target.files[0]
    const input = new window.FileReader()
    input.readAsArrayBuffer(file)
    input.onloadend = () => {
        this.setState({flag:'Uploading...'})
        const uload=Buffer(input.result)
        ipfsInstance.add(uload,(error,result)=>{
        if(error){
            console.error(error)
            this.setState({flag:'Upload Failed. Try Again'})
        }
        else{
            this.setState({ipfs:'https://ipfs.infura.io/ipfs/'+result[0].hash})
            this.setState({flag:'Uploaded successfully'})
        }
            })
    }
    }

    onAddressChange=(event)=>{
        this.setState({address:event.target.value})
      }

    onAadhaarChange=(event)=>{
        this.setState({aadhaar:event.target.value})
      }

     onNameChange=(event)=>{
        this.setState({name:event.target.value})
      }

    onMailChange=(event)=>{
     this.setState({mail:event.target.value})
    }

    onPhoneChange=(event)=>{
     this.setState({phone:event.target.value})
    }

    onPincodeChange=(event)=>{
     this.setState({pincode:event.target.value})
    }

    onSCapChange=(event)=>{
     this.setState({scap:event.target.value})
    }

    onHCapChange=(event)=>{
     this.setState({hcap:event.target.value})
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

  onCreateLAdmin=async(event)=>{
    event.preventDefault()
    await smartrat.methods.createLAdmin(this.state.address,this.state.name,this.state.aadhaar,this.state.mail,this.state.phone,this.state.ipfs,this.state.pincode).send({from:this.props.account})
    this.setState({name:''})
    this.setState({aadhaar:0})
    this.setState({address:''})
    this.setState({mail:''})
    this.setState({phone:''})
    this.setState({ipfs:''})
    this.setState({pincode:0})
    }
    onCreateFarmer=async(event)=>{
      event.preventDefault()
      await smartrat.methods.createFarmer(this.state.address,this.state.name,this.state.pincode,this.state.aadhaar,this.state.ipfs,this.state.mail,this.state.phone).send({from:this.props.account})
      this.setState({name:''})
      this.setState({aadhar:0})
      this.setState({address:''})
      this.setState({mail:''})
      this.setState({phone:''})
      this.setState({ipfs:''})
      this.setState({pincode:0})
      }
      onCreateMiller=async(event)=>{
        event.preventDefault()
        await smartrat.methods.createMiller(this.state.address,this.state.name,this.state.pincode,this.state.aadhaar,this.state.ipfs,this.state.mail,this.state.phone,this.state.scap,this.state.hcap).send({from:this.props.account})
        this.setState({name:''})
        this.setState({aadhaar:0})
        this.setState({address:''})
        this.setState({mail:''})
        this.setState({phone:''})
        this.setState({ipfs:''})
        this.setState({pincode:0})
        this.setState({scap:0})
        this.setState({hcap:0})
        }
        onCreateDistributor=async(event)=>{
          event.preventDefault()
          await smartrat.methods.createDistributor(this.state.address,this.state.name,this.state.pincode,this.state.aadhaar,this.state.ipfs,true,this.state.mail,this.state.phone).send({from:this.props.account})
          this.setState({name:''})
          this.setState({aadhar:0})
          this.setState({address:''})
          this.setState({mail:''})
          this.setState({phone:''})
          this.setState({ipfs:''})
          this.setState({pincode:0})
          }
          onCreateShop=async(event)=>{
            event.preventDefault()
            await smartrat.methods.createShop(this.state.pincode,this.state.address,this.state.mail,this.state.phone).send({from:this.props.account})
            this.setState({address:''})
            this.setState({mail:''})
            this.setState({phone:''})
            this.setState({pincode:0})
            }
        getTransaction=async (event)=>{
          event.preventDefault()
          this.setState({getTransactionForm:'none'})
          let lad=await smartrat.methods.getLAdminDetails(this.state.address).call()
          let far=await smartrat.methods.getFarmersById(this.state.address).call()
          let mil=await smartrat.methods.getMillersById(this.state.address).call()
          let dis=await smartrat.methods.getDistributorsById(this.state.address).call()
          let shop=await smartrat.methods.getShopsByAddress(this.state.address).call()
          let user={name:'User',ipfsHash:''}
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
          await smartrat.methods.updateTransaction(this.state.toAddress,this.state.time,this.state.rice,this.state.sugar,this.state.wheat,this.state.kerosene).send({from:this.props.account})
          this.setState({toAddress:''})
          this.setState({time:0})
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
          console.log(arr)
          arr1.push([arr[0].toNumber(),arr[1],arr[5].toNumber(),arr[6].toNumber(),arr[7].toNumber(),arr[8].toNumber()])
          console.log(this.state.address)
          this.setState({arr:arr1})
            this.setState({showShopInfo:'block'})
      }

      getDetails=async (event)=>{
        event.preventDefault()
        this.setState({getDetailsForm:'none'})
        let lad=await smartrat.methods.getLAdminDetails(this.state.address).call()
        let far=await smartrat.methods.getFarmersById(this.state.address).call()
        let mil=await smartrat.methods.getMillersById(this.state.address).call()
        let dis=await smartrat.methods.getDistributorsById(this.state.address).call()
        let arr1=[]
        if(far.name!==''){
          arr1.push([far.name,far.ipfsHash,far.farmerID,far.pincode,far.aadhaarID,far.mailID,far.phone])
        }
        else if(mil.name!==''){
        arr1.push([mil.name,mil.ipfsHash,mil.miller_id,mil.pincode,mil.aadhaarID,mil.mailID,mil.phone])
      }
        else if(dis.name!==''){
          arr1.push([dis.name,dis.ipfsHash,dis.id,dis.pincode,dis.aadhaarID,dis.mailID,dis.phone])
        }
        else if(lad.name!==''){
          arr1.push([lad.name,lad.ipfsHash,lad.localID,lad.pincode,lad.aadhaarID,lad.mailID,lad.phone])
        }
        this.setState({arr1:arr1})
        console.log(lad)
          this.setState({details:'block'})
      }

  tabSwitch=(eventKey)=>{
    if(eventKey==='lAdmin'){
       this.setState({lAdminForm:'block'})
       this.setState({farmerForm:'none'})
       this.setState({millerForm:'none'})
       this.setState({distributorForm:'none'})
       this.setState({getTransactionForm:'none'})
       this.setState({setTransactionForm:'none'})
       this.setState({transaction:'none'})
       this.setState({shopForm:'none'})
       this.setState({shopInfoForm:'none'})
       this.setState({showShopInfo:'none'})
       this.setState({getDetailsForm:'none'})
       this.setState({details:'none'})
       this.setState({activeKey:true})
     }
     else if(eventKey==='farmer'){
       this.setState({lAdminForm:'none'})
        this.setState({farmerForm:'block'})
        this.setState({millerForm:'none'})
        this.setState({distributorForm:'none'})
        this.setState({getTransactionForm:'none'})
        this.setState({setTransactionForm:'none'})
        this.setState({transaction:'none'})
        this.setState({shopForm:'none'})
        this.setState({shopInfoForm:'none'})
        this.setState({showShopInfo:'none'})
        this.setState({getDetailsForm:'none'})
        this.setState({details:'none'})
        this.setState({activeKey:true})
       }
       else if(eventKey==='miller'){
          this.setState({lAdminForm:'none'})
         this.setState({farmerForm:'none'})
         this.setState({millerForm:'block'})
         this.setState({distributorForm:'none'})
         this.setState({getTransactionForm:'none'})
         this.setState({setTransactionForm:'none'})
         this.setState({transaction:'none'})
         this.setState({shopForm:'none'})
         this.setState({shopInfoForm:'none'})
         this.setState({showShopInfo:'none'})
         this.setState({getDetailsForm:'none'})
         this.setState({details:'none'})
         this.setState({activeKey:true})
        }
        else if(eventKey==='distributor'){
           this.setState({lAdminForm:'none'})
          this.setState({farmerForm:'none'})
          this.setState({millerForm:'none'})
          this.setState({distributorForm:'block'})
          this.setState({getTransactionForm:'none'})
          this.setState({setTransactionForm:'none'})
          this.setState({transaction:'none'})
          this.setState({shopForm:'none'})
          this.setState({shopInfoForm:'none'})
          this.setState({showShopInfo:'none'})
          this.setState({getDetailsForm:'none'})
          this.setState({details:'none'})
          this.setState({activeKey:true})
        }
       else if(eventKey=='getTransaction'){
          this.setState({lAdminForm:'none'})
         this.setState({farmerForm:'none'})
         this.setState({millerForm:'none'})
         this.setState({distributorForm:'none'})
         this.setState({getTransactionForm:'block'})
         this.setState({setTransactionForm:'none'})
         this.setState({transaction:'none'})
         this.setState({shopForm:'none'})
         this.setState({shopInfoForm:'none'})
         this.setState({showShopInfo:'none'})
         this.setState({getDetailsForm:'none'})
         this.setState({details:'none'})
         this.setState({activeKey:false})
         }
         else if(eventKey=='setTransaction'){
            this.setState({lAdminForm:'none'})
           this.setState({farmerForm:'none'})
           this.setState({millerForm:'none'})
           this.setState({distributorForm:'none'})
           this.setState({getTransactionForm:'none'})
           this.setState({setTransactionForm:'block'})
           this.setState({transaction:'none'})
           this.setState({shopForm:'none'})
           this.setState({shopInfoForm:'none'})
           this.setState({showShopInfo:'none'})
           this.setState({getDetailsForm:'none'})
           this.setState({details:'none'})
           this.setState({activeKey:false})
           }
           else if(eventKey=='shop'){
              this.setState({lAdminForm:'none'})
             this.setState({farmerForm:'none'})
             this.setState({millerForm:'none'})
             this.setState({distributorForm:'none'})
             this.setState({getTransactionForm:'none'})
             this.setState({setTransactionForm:'none'})
             this.setState({transaction:'none'})
             this.setState({shopForm:'block'})
             this.setState({shopInfoForm:'none'})
             this.setState({showShopInfo:'none'})
             this.setState({getDetailsForm:'none'})
             this.setState({details:'none'})
             this.setState({activeKey:true})
             }
             else if(eventKey=='shopInfo'){
               this.setState({lAdminForm:'none'})
               this.setState({farmerForm:'none'})
               this.setState({millerForm:'none'})
               this.setState({distributorForm:'none'})
               this.setState({getTransactionForm:'none'})
               this.setState({setTransactionForm:'none'})
               this.setState({transaction:'none'})
               this.setState({shopForm:'none'})
               this.setState({shopInfoForm:'block'})
               this.setState({showShopInfo:'none'})
               this.setState({getDetailsForm:'none'})
               this.setState({details:'none'})
               this.setState({activeKey:false})
             }
             else if(eventKey=='getInfo'){
               this.setState({lAdminForm:'none'})
               this.setState({farmerForm:'none'})
               this.setState({millerForm:'none'})
               this.setState({distributorForm:'none'})
               this.setState({getTransactionForm:'none'})
               this.setState({setTransactionForm:'none'})
               this.setState({transaction:'none'})
               this.setState({shopForm:'none'})
               this.setState({shopInfoForm:'none'})
               this.setState({showShopInfo:'none'})
               this.setState({getDetailsForm:'block'})
               this.setState({details:'none'})
               this.setState({activeKey:false})
             }
   }

  constructor(props) {
      super(props)
      this.state ={
        aadhaar:0,
        name:'',
        address:'',
        mail:'',
        phone:'',
        ipfs:'',
        pincode:0,
        scap:0,
        hcap:0,
        toAddress:'',
        rice:0,
        sugar:0,
        wheat:0,
        kerosene:0,
        farmerForm:'none',
        millerForm:'none',
        distributorForm:'none',
        getTransactionForm:'none',
        setTransactionForm:'block',
        shopForm:'none',
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
        arr1:[],
        flag:'',
        lAdminForm:'none',
        getDetailsForm:'none',
        details:'none',
        activeKey:false
      }
  }


  render() {
    return (
          <div>
          <Navibar name={this.props.name} profile={this.props.profile}/>
          <Nav variant="pills" defaultActiveKey="setTransaction" onSelect={this.tabSwitch}>
          <Nav.Item>
            <Nav.Link eventKey="setTransaction">Update Transaction</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="getTransaction">Get Transaction Details</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="shopInfo">Get Shop Info</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="getInfo">Get User Info</Nav.Link>
          </Nav.Item>
          <NavDropdown title="Create User" active={this.state.activeKey}>
            <NavDropdown.Item eventKey="lAdmin">Local Admin</NavDropdown.Item>
            <NavDropdown.Item eventKey="farmer">Farmer</NavDropdown.Item>
            <NavDropdown.Item eventKey="miller">Miller</NavDropdown.Item>
            <NavDropdown.Item eventKey="distributor">Distributor</NavDropdown.Item>
            <NavDropdown.Item eventKey="shop">Shop</NavDropdown.Item>
          </NavDropdown>
          </Nav>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <Container className="cusform">
          <Form onSubmit={this.onCreateLAdmin} style={{display:this.state.lAdminForm}}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Address:</Form.Label>
            <Form.Control type="text" placeholder="Local Admin Address" onChange={this.onAddressChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" placeholder="Local Admin Name" onChange={this.onNameChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Aadhaar ID:</Form.Label>
            <Form.Control type="number" placeholder="Aadhaar ID" onChange={this.onAadhaarChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Pincode:</Form.Label>
            <Form.Control type="number" placeholder="Pincode" onChange={this.onPincodeChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email ID:</Form.Label>
            <Form.Control type="text" placeholder="Email ID" onChange={this.onMailChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Phone Number:</Form.Label>
            <Form.Control type="text" placeholder="Phone Number" onChange={this.onPhoneChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control type="file" onChange={this.upload}/>
          <Form.Label>{this.state.flag}</Form.Label>
          </Form.Group>
            <Button variant="primary" type="submit" >
            Create Local Admin
            </Button>
          </Form>
          <Form onSubmit={this.onCreateFarmer} style={{display:this.state.farmerForm}}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Address:</Form.Label>
            <Form.Control type="text" placeholder="Farmer Address" onChange={this.onAddressChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" placeholder="Farmer Name" onChange={this.onNameChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Pincode:</Form.Label>
            <Form.Control type="number" placeholder="Pincode" onChange={this.onPincodeChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Aadhaar Id:</Form.Label>
            <Form.Control type="number" placeholder="Aadhaar ID" onChange={this.onAadhaarChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email ID:</Form.Label>
            <Form.Control type="text" placeholder="Email ID" onChange={this.onMailChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Phone Number:</Form.Label>
            <Form.Control type="text" placeholder="Phone Number" onChange={this.onPhoneChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control type="file" onChange={this.upload}/>
          <Form.Label>{this.state.flag}</Form.Label>
          </Form.Group>
            <Button variant="primary" type="submit" >
            Create Farmer
            </Button>
          </Form>
          <Form onSubmit={this.onCreateMiller} style={{display:this.state.millerForm}}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Address:</Form.Label>
            <Form.Control type="text" placeholder="Miller Address" onChange={this.onAddressChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" placeholder="Miller Name" onChange={this.onNameChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Pincode:</Form.Label>
            <Form.Control type="number" placeholder="Pincode" onChange={this.onPincodeChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Aadhaar ID:</Form.Label>
            <Form.Control type="number" placeholder="Aadhaar ID" onChange={this.onAadhaarChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email ID:</Form.Label>
            <Form.Control type="text" placeholder="Email ID" onChange={this.onMailChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Phone Number:</Form.Label>
            <Form.Control type="text" placeholder="Phone Number" onChange={this.onPhoneChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control type="file" onChange={this.upload}/>
          <Form.Label>{this.state.flag}</Form.Label>
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Storage Capacity:</Form.Label>
            <Form.Control type="number" placeholder="Enter Storage Capacity(in kgs)" onChange={this.onSCapChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Hulling Capacity:</Form.Label>
            <Form.Control type="number" placeholder="Enter Hulling Capacity(in kgs)" onChange={this.onHCapChange} />
          </Form.Group>
            <Button variant="primary" type="submit" >
            Create Miller
            </Button>
          </Form>
          <Form onSubmit={this.onCreateDistributor} style={{display:this.state.distributorForm}}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Address:</Form.Label>
            <Form.Control type="text" placeholder="Distributor Address" onChange={this.onAddressChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" placeholder="Distributor Name" onChange={this.onNameChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Pincode:</Form.Label>
            <Form.Control type="number" placeholder="Pincode" onChange={this.onPincodeChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Aadhaar ID:</Form.Label>
            <Form.Control type="number" placeholder="Aadhaar ID" onChange={this.onAadhaarChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>EmailI D:</Form.Label>
            <Form.Control type="text" placeholder="Email ID" onChange={this.onMailChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Phone Number:</Form.Label>
            <Form.Control type="text" placeholder="Phone Number" onChange={this.onPhoneChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control type="file" onChange={this.upload}/>
          <Form.Label>{this.state.flag}</Form.Label>
          </Form.Group>
            <Button variant="primary" type="submit" >
            Create Distributor
            </Button>
          </Form>
          <Form onSubmit={this.onCreateShop} style={{display:this.state.shopForm}}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Address:</Form.Label>
            <Form.Control type="text" placeholder="Shop Address" onChange={this.onAddressChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Pincode:</Form.Label>
            <Form.Control type="number" placeholder="Pincode" onChange={this.onPincodeChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email ID:</Form.Label>
            <Form.Control type="text" placeholder="Email ID" onChange={this.onMailChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Phone Number:</Form.Label>
            <Form.Control type="text" placeholder="Phone Number" onChange={this.onPhoneChange} />
          </Form.Group>
            <Button variant="primary" type="submit" >
            Create Shop
            </Button>
          </Form>
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
        <Form onSubmit={this.getDetails} style={{display:this.state.getDetailsForm}}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Address:</Form.Label>
          <Form.Control type="text" placeholder="Enter the Address" onChange={this.onAddressChange} />
        </Form.Group>
        <Button variant="primary" type="submit" >
        Get Details
        </Button>
        </Form>
        {this.state.details==='block'?<Details arr1={this.state.arr1}/>:null}
          </Container>
           </div>
           );
           }
}
export default Admin;
