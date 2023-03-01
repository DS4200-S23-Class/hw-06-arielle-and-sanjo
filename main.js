
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
    const myCircle2= FRAME2.selectAll("circle")  
      .data(data) // passed from .then  
      .enter()       
      .append("circle")  
        .attr("cx", (d) => { return (X_SCALE_WIDTH(d.Sepal_Width) + MARGINS.left); }) 
        .attr("cy", (d) => { return (Y_SCALE_WIDTH(d.Petal_Width) + MARGINS.top); }) 
        .attr("id", (d) => {return (d.id);})
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

  //avoiding the error Cannot read properties of undefined (reading 'selection')
  //declare variable to store brush selection
let brushSelection = null;
brushedPoints2 = []
  // Function that is triggered when brushing is performed
function updateChart(event) {

  // Get the selection coordinate
  console.log("updateChart called");
  const extent = event.selection;  
  
  if (extent){
    myCircle2.classed("selected", function(d){
      const cx = parseFloat(d3.select(this).attr("cx"));
      const cy = parseFloat(d3.select(this).attr("cy"));
      const id = parseFloat(d3.select(this).attr("id"));
      // adding an if statement that checks if the current point is selected by brushing
      // if it is, then its ID is pushed to the brushedPoints array
      if (extent[0][0] <= cx && cx <= extent[1][0] && extent[0][1] <= cy && cy <= extent[1][1]) {
        brushedPoints2.push(id);
        selectOthers(brushedPoints2)
      }
      return extent[0][0] <= cx && cx <= extent[1][0] && extent[0][1] <= cy && cy <= extent[1][1]; })
     
    
  }  
  
  }

 
  

  const brush = d3.brush() // Create the brush behavior
  .extent([[MARGINS.left, MARGINS.top], [FRAME_WIDTH - MARGINS.right, FRAME_HEIGHT - MARGINS.bottom]]) // Define the brush area
  .on("start brush", updateChart); // Call the updateChart function when the brush starts or changes


    // A function that return TRUE or FALSE according if a dot is in the selection or not
  function isBrushed(brush_coords, cx, cy) {
    if (brush_coords === null) {
      return false;
    }
    const x0 = brush_coords[0][0],
          x1 = brush_coords[1][0],
          y0 = brush_coords[0][1],
          y1 = brush_coords[1][1];
    return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
  }


  FRAME2.append("g")
  .attr("class", "brush")
  .call(brush); // Attach the brush behavior to the 'g' element inside FRAME2




});

/////////////////////////////////////////////////////////////////////////////////////////////////////////;

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
    const myCircle1 = FRAME1.selectAll("circle")  
      .data(data) // passed from .then  
      .enter()       
      .append("circle")  
      .attr("cx", (d) => { return (X_SCALE_LENGTH(d.Sepal_Length) + MARGINS.left); }) 
      .attr("cy", (d) => { return (Y_SCALE_LENGTH(d.Petal_Length) + MARGINS.top); }) 
      .attr("id", (d) => {return (d.id);})
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
  const myBars = FRAME3.selectAll("bars")
    .data(data)//this is passed from .then()
    .enter()
    .append("rect") //appending attributes below to rect
            .attr("class", "rect") //add class
            .attr("x", (d) => { return X_SCALE_BAR(d.Species) + MARGINS.left })
            .attr("y", (d) => { return Y_SCALE_BAR(MAX_Y_BAR) + MARGINS.top }) 
            .attr("id", (d) => {return (d.id);})
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////;


function selectOthers(brushedPoints2){

  const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
  const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

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

    //plot points
    const myCircle1 = FRAME1.selectAll("circle")  
      .data(data) // passed from .then  
      .enter() 
      .append("circle")       
        .attr("class", "circle") //add class
        .attr("cx", (d) => { return (X_SCALE_LENGTH(d.Sepal_Length) + MARGINS.left); }) 
        .attr("cy", (d) => { return (Y_SCALE_LENGTH(d.Petal_Length) + MARGINS.top); }) 
        .attr("id", (d) => {return (d.id)})
        .attr("r", 3)
        .attr("fill", (d) => {return (COLOR_SPECIES(d.Species));})
        .attr("class", "point")
        .style("opacity", 0.5); 

          
   
    
          myCircle1.filter(function(d) {
            return brushedPoints2.includes(parseFloat(d.id));
          }).style("opacity", ".1")
            .style("stroke", "orange")
            .style("stroke-width", "2");


    });



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
              const myBars = FRAME3.selectAll("bars")
                .data(data)//this is passed from .then()
                .enter()
                .append("rect") //appending attributes below to rect
                        .attr("class", "rect") //add class
                        .attr("x", (d) => { return X_SCALE_BAR(d.Species) + MARGINS.left })
                        .attr("y", (d) => { return Y_SCALE_BAR(MAX_Y_BAR) + MARGINS.top }) 
                        .attr("id", (d) => {return (d.id);})
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
                
                myBars.filter(function(d) {
                  return brushedPoints2.includes(parseFloat(d.id));
                  }).style("opacity", ".1")
                    .style("stroke", "orange")
                    .style("stroke-width", "3");

              
              
});


}

selectOthers()


