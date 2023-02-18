pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;
contract smartrat {

address public admin;

struct farmer{
    address payable farmerID;
    string name;
    uint pincode;
    uint aadhaarID;
    string ipfsHash;
    bool active;
    string mailID;
    string phone;
}

struct shop{
    uint pincode;
    address id;
    bool active;
    string mailID;
    string phone;
    uint rice;
    uint sugar;
    uint wheat;
    uint kerosene;
}

struct localAdmin{
    address payable localID;
    string name;
    uint aadhaarID;
    string mailID;
    string phone;
    uint pincode;
    string ipfsHash;
}


struct miller{
    address payable miller_id;
    string name;
    uint pincode;
    uint aadhaarID;
    string ipfsHash;
    bool active;
    string mailID;
    string phone;
    uint storage_cap;
    uint hulling_cap;
}

struct distributor{
    address id;
    string name;
    uint pincode;
    uint aadhaarID;
    string ipfsHash;
    bool active;
    string mailID;
    string phone;
}

struct goods{
    address fromId;
    address toId;
    uint time;
    uint rice;
    uint sugar;
    uint wheat;
    uint kerosene;
}

mapping(address=>shop) public shops;
mapping(address=>goods[]) public mygoods;
mapping(uint=>address[]) public shopsByPin;
mapping(address=>localAdmin) public lAdmins;
mapping(address=>farmer) public farmers;
mapping(uint=>address[]) public farmersByPin;
mapping(address=>miller) public millers;
mapping(uint=>address[]) public millersByPin;
mapping(address=>distributor) public distributors;
mapping(uint=>address[]) public distributorsByPin;

constructor() public{
    admin=msg.sender;
}

function string_check(string memory str1, string memory str2) pure internal returns (bool) {
    return (keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2)));
}


function createLAdmin(address payable _address,string memory _name,uint _aadhaar,string memory _mail,string memory _phone,string memory _ipfshash,uint _pincode) public{
     require(msg.sender==admin,"Forbidden");
     require(lAdmins[_address].localID!=_address,'Local Admin already exist');
     lAdmins[_address]=localAdmin(_address,_name,_aadhaar,_mail,_phone,_pincode,_ipfshash);
}


function createShop(uint _pincode,address payable _address,string memory _mail,string memory _phone) public{
    require(msg.sender==admin || msg.sender==lAdmins[msg.sender].localID,'Forbidden');
    require(shops[_address].id==address(0),"Shop already exist");
    shops[_address]=shop(_pincode,_address,true,_mail,_phone,0,0,0,0);
    shopsByPin[_pincode].push(_address);
}

function getShopsByPin(uint _pincode) public returns(address[] memory){
    return(shopsByPin[_pincode]);
}

function getShopsByAddress(address _address) public returns(shop memory){
    return(shops[_address]);
}

function getLAdminDetails(address payable _address) public returns(localAdmin memory){
    return(lAdmins[_address]);
}

function updateTransaction(address _to,uint _time,uint _rice,uint _sugar,uint _wheat,uint _kerosene) public{
	  mygoods[msg.sender].push(goods(msg.sender,_to,_time,_rice,_sugar,_wheat,_kerosene));
    mygoods[_to].push(goods(msg.sender,_to,_time,_rice,_sugar,_wheat,_kerosene));
    if(shops[msg.sender].id==msg.sender){
      shops[msg.sender].rice-=_rice;
      shops[msg.sender].sugar-=_sugar;
      shops[msg.sender].wheat-=_wheat;
      shops[msg.sender].kerosene-=_kerosene;
    }
    if(shops[_to].id==_to){
      shops[_to].rice+=_rice;
      shops[_to].sugar+=_sugar;
      shops[_to].wheat+=_wheat;
      shops[_to].kerosene+=_kerosene;
    }
}

function getTransactionByAddress(address _address) public returns(goods[] memory){
    return(mygoods[_address]);
}

function createFarmer(address payable _address,string memory _name,uint _pincode,uint _aadharID,string memory _ipfsHash,string memory _mail,string memory _phone) public{
    require(msg.sender==admin || lAdmins[msg.sender].localID==msg.sender,'Forbidden');
    require(farmers[_address].farmerID!=_address,"Farmer already registered");
    farmers[_address]=farmer(_address,_name,_pincode,_aadharID,_ipfsHash,true,_mail,_phone);
    farmersByPin[_pincode].push(_address);
}

function getFarmersByPin(uint _pincode) public returns(address[] memory){
    return(farmersByPin[_pincode]);
}

function getFarmersById(address _address) public returns(farmer memory){
    return(farmers[_address]);
}

function createMiller(address payable _address,string memory _name,uint _pincode,uint _aadharID,string memory _ipfsHash,string memory _mail,string memory _phone,uint s_cap,uint h_cap) public{
    require(msg.sender==admin || msg.sender==lAdmins[msg.sender].localID,'Forbidden');
    require(millers[_address].miller_id!=_address,"Miller already registered");
    millers[_address]=miller(_address,_name,_pincode,_aadharID,_ipfsHash,true,_mail,_phone,s_cap,h_cap);
    millersByPin[_pincode].push(_address);
}

function getMillersByPin(uint _pincode) public returns(address[] memory){
    return(millersByPin[_pincode]);
}

function getMillersById(address _address) public returns(miller memory){
    return(millers[_address]);
}

function createDistributor(address _address,string memory _name,uint _pincode,uint _aadharID,string memory _ipfsHash,bool _active,string memory _mail,string memory _phone) public{
    require(msg.sender==admin || msg.sender==lAdmins[msg.sender].localID,'Forbidden');
    require(distributors[_address].id!=_address,"Distributor already registered");
    distributors[_address]=distributor(_address,_name,_pincode,_aadharID,_ipfsHash,true,_mail,_phone);
    distributorsByPin[_pincode].push(_address);
}

function getDistributorsByPin(uint _pincode) public returns(address[] memory){
    return(distributorsByPin[_pincode]);
}

function getDistributorsById(address _address) public returns(distributor memory){
    return(distributors[_address]);
}

}
