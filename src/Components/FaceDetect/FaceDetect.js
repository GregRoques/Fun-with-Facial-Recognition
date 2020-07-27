import React, { Component } from 'react';
import './FaceDetect.css';
// import StatsModal from './StatsModal'

class FaceDetect extends Component {
  state = {
    stats: '',
    isOpen: false,
  };

  isModal = (stats) => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
      stats,
    }));
  };

  render() {
    const { imageUrl, box } = this.props;
    const array = Object.values(box).length > 0 ? Object.values(box) : '';
    //console.log(array);
    return (
      <div>
        {/* <StatsModal isOpen={this.state.isOpen} stats={this.state.stats} close={this.isModal} /> */}
        <div className="center ma">
          <div className="absolute mt2">
            <img id="inputimage" alt="" src={imageUrl} width="500px" heigh="auto" />
            {array
              ? array.map((boxes) => {
                  return (
                    <div
                      className="bounding-box"
                      onClick={() => this.isModal(boxes.stats)}
                      style={{
                        top: boxes.topRow,
                        right: boxes.rightCol,
                        bottom: boxes.bottomRow,
                        left: boxes.leftCol,
                      }}
                    ></div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    );
  }
}

export default FaceDetect;
