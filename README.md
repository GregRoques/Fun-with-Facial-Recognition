# Description

Experimenting with facial-detection and facial-recognition APIs...simply out of curiousity.

I am using the below tutorials as a guide to get started:

- [Smashing Magazine](https://www.smashingmagazine.com/2020/06/facial-recognition-web-application-react/)

# Technologies

- HTML/CSS/JavaScript
- React

# Packages

## Styling

- npm install eslint install-peerdeps eslint-plugin-react prettier --save-dev
  - ./node_modules/.bin/eslint --init (selected AirBnB style/eslint.json)

## Front End

- npx i create-react-app
- npm install tachyons (this is a CSS interface library...more info here: [tachyons.io](https://tachyons.io/) )
- npm i clarifai

## APIs

- https://www.clarifai.com/
- https://aws.amazon.com/rekognition/

# Logic

## Face Calculation in App.js

```
calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };
```

The calculateFaceLocation function recieves the response we get from the API when we call it in the onSubmit method. Inside the calculateFaceLocation method, we assign image to the element object we get from calling document.getElementById("inputimage") which we use to perform some calculation.

- **leftCol:** clarifaiFace.left_col is the % of the width multiply with the width of the image then we would get the actual width of the image and where the left_col should be.
- **topRow:** clarifaiFace.top_row is the % of the height multiply with the height of the image then we would get the actual height of the image and where the top_row should be.
- **rightCol:** This subtracts the width from (clarifaiFace.right_col width) to know where the right_Col should be.
- **bottomRow:** This subtract the height from (clarifaiFace.right_col height) to know where the bottom_Row should be.
