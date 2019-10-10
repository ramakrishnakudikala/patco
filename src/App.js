import React from 'react';
import Stop from "./Stop";
import './App.css';
import axios from 'axios';

class App extends React.Component {

  constructor()
  {
    super();
     this.state =   {
       "data":{
       "stops" : [
          ]
       }
     };
     this.handleStopClick = this.handleStopClick.bind(this);
  }
  
  componentDidMount() {
    axios.get("https://transit.land/api/v1/stops?served_by=o-dr4e-portauthoritytransitcorporation")
      .then(res => {
        this.setState(res);
      });
  }

  handleStopClick(id){
    console.log("clicked", id);
  }
  
 render(){
    const stopItems = this.state.data.stops.map(
      item=> <Stop key={item.onestop_id} stopItem={item} handleStopClick={this.handleStopClick} />
    );
  
  return (
    <div className="stopsList">
      {stopItems}
    </div>
  );
 }
}

export default App;
