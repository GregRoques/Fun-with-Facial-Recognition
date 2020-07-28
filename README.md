# Description

Experimenting with facial-detection and facial-recognition APIs...simply out of curiousity.

I am using the below tutorials as a guide to get started:

- [Smashing Magazine](https://www.smashingmagazine.com/2020/06/facial-recognition-web-application-react/)

# Technologies

- HTML/CSS/JavaScript
- React

# Packages

## Style Guide

- npm install eslint install-peerdeps eslint-plugin-react prettier --save-dev
  - ./node_modules/.bin/eslint --init (selected AirBnB style/eslint.json)

See .prettierrc and .eslintrc.json files for more specifics

## Front End

- npx i create-react-app
- npm install tachyons (this is a CSS interface library...more info here: [tachyons.io](https://tachyons.io/) )
- npm i clarifai
- npm i sweetalerts2

## APIs

- Test 1: https://www.clarifai.com/
- Test 2: face-api.js: https://github.com/justadudewhohacks/face-api.js

## Omitted Files/Folders Needed

In the "src" folder, I use my ".gitignore" file to hide a folder called "keys", as it contains some personal information. If you decide to test out this exercise for yourself, you will want to add a folder with this name to your "src" folder, and include the following files:

- **clarifaiKey.js:** exports your Clarifia API key (**const cKey**) and custom Clarifai workflow ID (**const workflowId**).
- **faceArray.js:** exports a variable containing the 512-count array coordinates for a specific face ( or faces) you will try to detect when you submit an image url.

# Logic

## Face Calculation in App.js

```
clarifaiFaces.map((face, i) => {
    const faceInfo = face.region_info.bounding_box;
    box[i] = {
      stats: face.data.concepts ? formatStats(Object.values(face.data.concepts)) : 'N/A',
      leftCol: faceInfo.left_col * width,
      topRow: faceInfo.top_row * height,
      rightCol: width - faceInfo.right_col * width,
      bottomRow: height - faceInfo.bottom_row * height,
    };
  });

  this.setState({
    box,
  });
};
```

The calculateFaceLocation function recieves the response we get from the API when we call it in the onSubmit method. Inside the calculateFaceLocation method, we assign image to the element object we get from calling document.getElementById("inputimage") which we use to perform some calculation.

- **leftCol:** clarifaiFace.left_col is the % of the width multiply with the width of the image then we would get the actual width of the image and where the left_col should be.
- **topRow:** clarifaiFace.top_row is the % of the height multiply with the height of the image then we would get the actual height of the image and where the top_row should be.
- **rightCol:** This subtracts the width from (clarifaiFace.right_col width) to know where the right_Col should be.
- **bottomRow:** This subtract the height from (clarifaiFace.right_col height) to know where the bottom_Row should be.

# Images

You can see the detection at work below.

![Squad at Jazz Fest](/readMe/1.JPG)

![Squad on hike in Colorado](/readMe/2.JPG)
