import React from 'react';

class Stops extends React.Component {
 
  render(){
    
    return (
      <div className="stopItem">
          <button  id={this.props.stopItem.onestop_id} onClick={()=>this.props.handleStopClick(this.props.stopItem.onestop_id)}>
            {this.props.stopItem.name}
          </button>
      </div>
    );
  }
}

export default Stops;
