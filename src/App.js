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
        "stopPairs":[]
       
     };
     this.handleStopClick = this.handleStopClick.bind(this);
  }
  
  componentDidMount() {
    axios.get("https://transit.land/api/v1/stops?served_by=o-dr4e-portauthoritytransitcorporation")
      .then(res => {
      
        this.setState((prevState)=>{
          
          return {"stops":res.data.stops,"stopPairs":[]};

        });
      });
  }

  handleStopClick(id){
    console.log("clicked", id);
    let today = new Date();
    let hh = today.getHours();
    let mm = today.getMinutes();
    let ss = today.getSeconds();
    let fromTime = `${hh}:${mm}:${ss}`;
    today.setMinutes(today.getMinutes()+25);
    let maxHH = today.getHours();
    let maxMM = today.getMinutes();
    let maxSS = today.getSeconds();
    let maxTime = `${maxHH}:${maxMM}:${maxSS}`;

    const timingsGetUrl = `https://transit.land/api/v1/schedule_stop_pairs?feed_onestop_id=f-dr4e-patco&origin_onestop_id=${id}&origin_departure_between=${fromTime},${maxTime}&date=today`;
    axios.get(timingsGetUrl)
         .then(
           res => {
            this.setState((prevState)=>{
          
              return {
                      "stops":prevState.stops,
                      "stopPairs":res.data.schedule_stop_pairs.map(function(s){

                        return {
                                  "trip":s.trip,
                                  "departureTime" : s.origin_departure_time,
                                  "tripHeadSign" : s.trip_headsign
                               }
                      })
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
          <Timings stopPairs={this.state.stopPairs} />
      </div>
    </div>
  );
 }
}

export default App;
