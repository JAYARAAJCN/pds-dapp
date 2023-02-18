import React, { Component } from 'react';
import {Container,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import smartrat from './smartrat';
import Navibar from './Navibar';

class Home extends Component {

  onLoad=async ()=>{
    const admin=await smartrat.methods.admin().call()
    const lAdmin=await smartrat.methods.lAdmins(this.props.account).call()
    const shop=await smartrat.methods.shops(this.props.account).call()
    const farmer=await smartrat.methods.farmers(this.props.account).call()
    const miller=await smartrat.methods.millers(this.props.account).call()
    const distributor=await smartrat.methods.distributors(this.props.account).call()
    const url=window.location.href.split('/')
    if(admin===this.props.account)
    window.location.href=url[0]+'admin'
    else if(lAdmin.name!=='')
    window.location.href=url[0]+'localadmin'
    else if(shop.pincode.toNumber()!==0)
    window.location.href=url[0]+'shop'
    else if(farmer.name!=='')
    window.location.href=url[0]+'farmer'
    else if(miller.name!=='')
    window.location.href=url[0]+'miller'
    else if(distributor.name!=='')
    window.location.href=url[0]+'distributor'
    else
    window.location.href=url[0]+'user'
 }

 constructor(props) {
  super(props)
  this.state = {}
  }

  render() {
    return (
      <div style={{backgroundColor:"#fafae4"}}>

      <Navibar overlay="true" name={this.props.name} profile={this.props.profile}></Navibar>
      <div className="App">
      <p>&nbsp;</p>
  <header className="head" id="About">
      <div className="intro-text">
      <Container fluid>
      <h1>Decentralized Public Distribution System</h1>
      <img src="https://cdn.telanganatoday.com/wp-content/uploads/2020/04/Kerala-PDS-coronavirus.jpg"/><br/>
      <Button variant='primary' onClick={this.onLoad}>Click Here to Proceed</Button>
    </Container>
      </div>
  </header>
  </div>
  <p>&nbsp;</p>
<div className="App">
<h2>About our Project</h2>
<p className="aboutproject">Decentralized PDS focuses on revamping the current Public Distribution System in which we don't know where the food grains have been wasted or if there is any flaws in the system.
Our aim is to make the Digital India more secure at the same time more aware of what's happening around them.
Using blockchain in PDS will make the system decentralized and food traceability will also not be an issue hereafter.
With few more inclusions like payment methods using blockchain, the whole system will get automated and when the cryptowallets become a standard Decentralized PDS is the way to go.</p>
</div>
<p>&nbsp;</p>
<div className="App-header">
<h2>Our Team</h2>
<p><ul>
<li>Anantha Narayanan V (Team Member)</li>
<li>Ahath Khan T (Team Member)</li>
</ul></p>
</div>
<div className="App-header">
<h2>Guided by</h2>
<p><ul>
<li>Dr. D. Muruga Radha Devi M.E., Ph.D (Information Technology)</li>
</ul></p>
</div>
    </div>
    );
  }
}

export default Home;
