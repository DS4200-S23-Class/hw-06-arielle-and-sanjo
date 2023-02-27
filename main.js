//dimensions for each plot
const FRAME_HEIGHT = 400;
const FRAME_WIDTH = 400;
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

//using scaleOrdinal to map discrete domain (species) to a discrete range (assigned color)
var COLOR_SPECIES = d3.scaleOrdinal()
.domain(["virginica", "versicolor", "setosa"])
.range(["blue", "red", "green"]);

//append first frame object to page's body 
const FRAME1 = d3.select("#vis1")
.append("svg")
.attr("height", FRAME_HEIGHT)
.attr("width", FRAME_WIDTH)
.attr("class", "frame");

//read in data
d3.csv("data/iris.csv").then((data) => {
  //find max X, for Sepal_Length
  const MAX_X_LENGTH = d3.max(data, (d) => {return parseInt(d.Sepal_Length); });

  //find max Y, for Petal_Length
  const MAX_Y_LENGTH = d3.max(data, (d) => {return parseInt(d.Petal_Length); });

  //define scale functions to map data values: (domain) to pixel values (range)
  //using scaleLinear() because Petal_Length is numeric
  const X_SCALE_LENGTH = d3.scaleLinear()
    .domain([0, (MAX_X_LENGTH + 1)]) //adding padding
    .range([0, VIS_WIDTH]);


  //using scaleLinear() because Sepal_Length is numeric
  const Y_SCALE_LENGTH = d3.scaleLinear()
    .domain([0, (MAX_Y_LENGTH + 1)]) //adding padding
    .range([VIS_HEIGHT, 0]);


    //plot points
     FRAME1.selectAll("points")  
      .data(data) // passed from .then  
      .enter()       
      .append("circle")  
      .attr("cx", (d) => { return (X_SCALE_LENGTH(d.Sepal_Length) + MARGINS.left); }) 
      .attr("cy", (d) => { return (Y_SCALE_LENGTH(d.Petal_Length) + MARGINS.top); }) 
      .attr("r", 3)
      .attr("fill", (d) => {return (COLOR_SPECIES(d.Species));})
      .attr("class", "point")
      .style("opacity", 0.5); 


    //add x axis to vis1
    FRAME1.append("g")
      .attr("transform", "translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.top) + ")")
      .call(d3.axisBottom(X_SCALE_LENGTH).ticks(8))
      .attr("font-size", '10px');


    //add y axis to vis1
    FRAME1.append("g")
      .attr("transform","translate(" + MARGINS.left + "," + MARGINS.top + ")")
      .call(d3.axisLeft(Y_SCALE_LENGTH).ticks(14))
      .attr("font-size", '10px');

});


//append second frame object to page's body 
const FRAME2 = d3.select("#vis2")
.append("svg")
.attr("height", FRAME_HEIGHT)
.attr("width", FRAME_WIDTH)
.attr("class", "frame");

//read in data
d3.csv("data/iris.csv").then((data) => {
  //find max X
  const MAX_X_WIDTH = d3.max(data, (d) => {return parseInt(d.Sepal_Width); });

  //find max Y
  const MAX_Y_WIDTH = d3.max(data, (d) => {return parseInt(d.Petal_Width); });

  //define scale functions to map data values: (domain) to pixel values (range)
  //using scaleLinear() because Petal_Length is numeric
  const X_SCALE_WIDTH = d3.scaleLinear()
    .domain([0, (MAX_X_WIDTH + 1)]) //adding padding
    .range([0, VIS_WIDTH]);


    //using scaleLinear() because Sepal_Length is numeric
    const Y_SCALE_WIDTH = d3.scaleLinear()
      .domain([0, (MAX_Y_WIDTH + 1)]) //adding padding
      .range([VIS_HEIGHT, 0]);


    //plot points
    FRAME2.selectAll("points")  
      .data(data) // passed from .then  
      .enter()       
      .append("circle")  
        .attr("cx", (d) => { return (X_SCALE_WIDTH(d.Sepal_Width) + MARGINS.left); }) 
        .attr("cy", (d) => { return (Y_SCALE_WIDTH(d.Petal_Width) + MARGINS.top); }) 
        .attr("r", 3)
        .attr("fill", (d) => {return (COLOR_SPECIES(d.Species));})
        .attr("class", "point")
        .style("opacity", 0.5); 


    //add x axis to vis2
    FRAME2.append("g")
      .attr("transform", "translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.top) + ")")
      .call(d3.axisBottom(X_SCALE_WIDTH).ticks(8))
      .attr("font-size", '10px');


    //add y axis to vis2
    FRAME2.append("g")
      .attr("transform","translate(" + MARGINS.left + "," + MARGINS.top + ")")
      .call(d3.axisLeft(Y_SCALE_WIDTH).ticks(16))
      .attr("font-size", '10px');

});  


//build frame for bar chart
const FRAME3 = d3.select("#vis3") 
.append("svg") 
.attr("height", FRAME_HEIGHT)   
.attr("width", FRAME_WIDTH)
.attr("class", "frame"); 

  //build bar plot inside of .then
  d3.csv("data/iris.csv").then((data) => {

    //Y = 50 because there's 50 flowers of each species
    const MAX_Y_BAR = 50;

    //domain and range

    //use scaleBand() because Species is nominal  
    const X_SCALE_BAR = d3.scaleBand()
    .domain(data.map(function(d) {return d.Species;})) //return category names for each bar
    .range([0, VIS_WIDTH]).padding(0.25);

    //use scaleLinear() because count of flower is quantitative 
    const Y_SCALE_BAR = d3.scaleLinear()
    .domain([0, 50])
    .range([VIS_HEIGHT,0]);

    //bars with styling
    FRAME3.selectAll("bars")
      .data(data)//this is passed from .then()
      .enter()
      .append("rect") //appending attributes below to rect
              .attr("class", "rect") //add class
              .attr("x", (d) => { return X_SCALE_BAR(d.Species) + MARGINS.left })
              .attr("y", (d) => { return Y_SCALE_BAR(MAX_Y_BAR) + MARGINS.top }) 
              .attr("width", X_SCALE_BAR.bandwidth())
              .attr("height", (d) => { return VIS_HEIGHT - Y_SCALE_BAR(MAX_Y_BAR) })
              .attr("fill", (d) => {return (COLOR_SPECIES(d.Species));});

    // Add an x axis to the vis. 
    FRAME3.append("g") 
      .attr("transform", "translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.top) + ")") 
      .call(d3.axisBottom(X_SCALE_BAR).ticks(3)) 
      .attr("font-size", '10px'); 

    // add a y axis to the vis.
    FRAME3.append("g") 
      .attr("transform", "translate(" + MARGINS.top + "," + MARGINS.left + ")") 
      .call(d3.axisLeft(Y_SCALE_BAR).ticks(10)) 
      .attr("font-size", '10px');   

});
