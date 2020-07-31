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
    const { imageUrl, box, profile } = this.props;
    const array = Object.values(box).length > 0 ? Object.values(box) : '';
    const arrayTwo = Object.values(profile).length > 0 ? Object.values(profile) : '';
    console.log(arrayTwo);
    return (
      <div>
        {/* <StatsModal isOpen={this.state.isOpen} stats={this.state.stats} close={this.isModal} /> */}
        <div className="center ma">
          <div className="absolute mt2">
            <img id="inputimage" alt="" src={imageUrl} width="500px" height="auto" />
            {array
              ? array.map((boxes, i) => {
                  return (
                    <div
                      key={`Face_Detect_${i}`}
                      className="bounding-box"
                      title={
                        boxes.isGreg >= 90 && boxes.isGreg < 100
                          ? `${boxes.isGreg}% chance this guy owns 2 cats.`
                          : boxes.isGreg === 100
                          ? 'The GOAT!'
                          : 'No one important'
                      }
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
            {ArrayTwo
              ? ArrayTwo.map((boxes, i) => {
                  return (
                    <div
                      // className="bounding-box"
                      onClick={() => this.isModal(boxes.demographics)}
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
