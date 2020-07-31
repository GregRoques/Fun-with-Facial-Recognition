import React, { Component } from 'react';
import './FaceDetect.css';

class FaceDetect extends Component {
  state = {};

  componentDidMount() {
    //detectBox} profile={demoBox}
  }

  render() {
    const array = Object.values(box).length > 0 ? Object.values(box) : '';
    const ArrayTwo = Object.values(profile).length > 0 ? Object.values(profile) : '';
    console.log(array);
    console.log(ArrayTwo);

    const { imageUrl } = this.props;
    return (
      <div>
        <div className="center ma">
          <div className="absolute mt2">
            <img id="inputimage" alt="" src={imageUrl} width="500px" height="auto" />
            {ArrayTwo
              ? ArrayTwo.map((boxes, i) => {
                  const bBoxes = boxes.bounding_box[0];
                  let bdemo = ''; //${Object.keys(boxes.demographics[i])}:
                  Object.values(boxes.demographics).map((stat, i) => {
                    bdemo += `${stat.name}— ${stat.value.toFixed(2) * 100}%; `;
                  });
                  return (
                    <div
                      key={`Demographics_${i}`}
                      title={bdemo}
                      className="bounding-box2"
                      style={{
                        top: bBoxes.topRow,
                        right: bBoxes.rightCol,
                        bottom: bBoxes.bottomRow,
                        left: bBoxes.leftCol,
                      }}
                    ></div>
                  );
                })
              : null}
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
                          ? 'This dude definitely owns two cats named Callie and Midnight!'
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
          </div>
        </div>
      </div>
    );
  }
}
export default FaceDetect;
