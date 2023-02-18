import React, { Component } from 'react';
import {BrowserRouter,Route, Switch} from 'react-router-dom';
import Home from './Home';
import Admin from './Admin';
import LAdmin from './LAdmin';
import Shop from './Shop';
import Farmer from './Farmer';
import Miller from './Miller';
import Distributor from './Distributor';
import User from './User';
import web3 from './web3';
import smartrat from './smartrat';

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
  }

  async loadWeb3() {
    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0]})
    const admin=await smartrat.methods.admin().call()
    const ladmin=await smartrat.methods.lAdmins(accounts[0]).call()
    const farmer=await smartrat.methods.farmers(accounts[0]).call()
    const miller=await smartrat.methods.millers(accounts[0]).call()
    const distributor=await smartrat.methods.distributors(accounts[0]).call()
    const shop=await smartrat.methods.shops(accounts[0]).call()
    if(admin===accounts[0]){
    this.setState({name:'Admin'})
    this.setState({profilehash:'https://www.beautymentor.in/admin/uploads/profile/admin.png'})
  }
    else if(farmer.name!==''){
    this.setState({name:farmer.name})
    this.setState({profilehash:farmer.ipfsHash})
  }
    else if(ladmin.name!==''){
    this.setState({name:ladmin.name})
    this.setState({profilehash:ladmin.ipfsHash})
  }
    else if(miller.name!==''){
    this.setState({name:miller.name})
    this.setState({profilehash:miller.ipfsHash})
  }
    else if(distributor.name!==''){
    this.setState({name:distributor.name})
    this.setState({profilehash:distributor.ipfsHash})
  }
  else if(shop.pincode.toNumber()!==0){
  this.setState({name:'Shop'})
  }
}
  constructor(props) {
    super(props)
    this.state = {
		account:'',
    name:'User',
    profilehash:''
	}
    }

  render() {
    return (
      <BrowserRouter>
        <Switch>
        <Route path="/" exact>
          <Home account={this.state.account} name={this.state.name} profile={this.state.profilehash}/>
        </Route>
        <Route path="/admin">
          <Admin account={this.state.account} name={this.state.name} profile={this.state.profilehash}/>
        </Route>
        <Route path="/localadmin">
          <LAdmin account={this.state.account} name={this.state.name} profile={this.state.profilehash}/>
        </Route>
        <Route path="/shop">
          <Shop account={this.state.account} name={this.state.name} profile={this.state.profilehash}/>
        </Route>
        <Route path="/farmer">
          <Farmer account={this.state.account} name={this.state.name} profile={this.state.profilehash}/>
        </Route>
        <Route path="/miller">
          <Miller account={this.state.account} name={this.state.name} profile={this.state.profilehash}/>
        </Route>
        <Route path="/distributor">
          <Distributor account={this.state.account} name={this.state.name} profile={this.state.profilehash}/>
        </Route>
        <Route path="/user">
          <User account={this.state.account} name={this.state.name} profile={this.state.profilehash}/>
        </Route>
        </Switch>
        </BrowserRouter>
    );
  }
}
export default App;
