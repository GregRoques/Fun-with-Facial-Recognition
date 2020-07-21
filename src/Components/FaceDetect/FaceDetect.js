import React from 'react';
import './FaceDetect.css';

const FaceDetect = ({ imageUrl, box }) => {
  const array = Object.values(box).length > 0 ? Object.values(box) : '';
  console.log(array);
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="inputimage" alt="" src={imageUrl} width="500px" heigh="auto" />
        {array
          ? array.map((boxes) => {
              return (
                <div
                  className="bounding-box"
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
  );
};

export default FaceDetect;
