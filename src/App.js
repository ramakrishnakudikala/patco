import React from 'react';
import Stop from "./Stop";
import './App.css';
import axios from 'axios';
import Timings from "./Timings";

class App extends React.Component {

  constructor()
  {
    super();
     this.state =   {
       
       "stops" : [
          ],
        "timings":[]
       
     };
     this.handleStopClick = this.handleStopClick.bind(this);
  }
  
  componentDidMount() {
    axios.get("https://transit.land/api/v1/stops?served_by=o-dr4e-portauthoritytransitcorporation")
      .then(res => {
      
        this.setState((prevState)=>{
          
          return {"stops":res.data.stops,"timings":[]};

        });
      });
  }

  handleStopClick(id){
    console.log("clicked", id);
    const timingsGetUrl = "https://transit.land/api/v1/schedule_stop_pairs?feed_onestop_id=f-dr4e-patco&origin_onestop_id="+id+"&origin_departure_between=08:00:00,08:20:00&date=today";
    axios.get(timingsGetUrl)
         .then(
           res => {
            this.setState((prevState)=>{
          
              return {
                      "stops":prevState.stops,
                      "timings":res.data.schedule_stop_pairs.map(t=>t.origin_departure_time)
                    };
    
            });
           }
         );
  }
  
 render(){
    const stopItems = this.state.stops.map(
      item=> <Stop key={item.onestop_id} stopItem={item} handleStopClick={this.handleStopClick} />
    );
  
  return (
    <div>
      <div className="stopsList">
        {stopItems}
      </div>
      <div>
          <Timings departureTimes={this.state.timings} />
      </div>
    </div>
  );
 }
}

export default App;
