import React from 'react';

class Timings extends React.Component{
    

    render(){
         console.log(this.props);
        return <ul>
            {this.props.departureTimes.map(i=><li>{i}</li>)}
        </ul>
    }
}

export default Timings;