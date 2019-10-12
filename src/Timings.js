import React from 'react';

class Timings extends React.Component{
    

    render(){
         console.log(this.props);
         const generateKey = (pre) => {
            return `departuretime_${pre}`;
        }
        return <ul>
            {this.props.stopPairs.map(i=><li key={generateKey(i.trip)}>{i.departureTime} - towards {i.tripHeadSign}</li>)}
        </ul>
    }
}

export default Timings;