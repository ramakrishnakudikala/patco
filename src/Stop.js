import React, {Component} from 'react';
import axios from 'axios';

class Stop extends React.Component {

  constructor()
  {
    super();
     this.state =   {
       "data":{
       "stops" : []
       }
     }
  }

  componentDidMount() {
    axios.get("https://transit.land/api/v1/stops?served_by=o-dr4e-portauthoritytransitcorporation")
      .then(res => {
        this.setState(res);
      });
  }

  render(){
    const stops = this.state.data.stops.map(m=>m);
    return (
        <ul className="stopsList">
            {
                stops.map(m=><li> 
                                <button id={m.osm_way_id}>{m.name}</button>
                            </li>)}
        </ul>
    );
  }
}

export default Stop;
