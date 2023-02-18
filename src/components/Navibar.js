import React,{Component} from 'react';

class Navibar extends Component {

 constructor(props) {
  super(props)
  this.state = { }
  }

  render() {

    const Nav=<nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:'#00334d'}} id="navi">
    <div className="container-fluid">
   <a href="/" className="navbar-brand" style={{color:"#FFFFFF"}}>Public Distribution System</a>
  </div>
  <ul className="navbar-nav px-3">
    <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
      <small className="text-white"><span id="account">{this.props.account}</span></small>
    </li>
    <li className="nav-item text-nowrap d-none d-sm-none d-sm-block" style={{marginTop:'5px'}}>
      <small className="text-white"><span id="name">{this.props.name}</span></small>
    </li>
    {this.props.profile!==''?<li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
      <img src={this.props.profile} height="40px" width="40px" style={{marginLeft:'10px',borderRadius:'40px'}} />
    </li>:null}
  </ul>
  </nav> ;

    return (
      <div>
        {Nav}
      </div>
    );
  }
}

export default Navibar;
