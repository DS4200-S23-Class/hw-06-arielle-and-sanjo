//build frame

const FRAME_HEIGHT = 400;
const FRAME_WIDTH = 400;
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50}
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

function build_scatterplot_length(){
  //append svg object to page's body
  const FRAME1 = d3.select("#vis1")
    .append("svg")
    .attr("height", FRAME_HEIGHT)
    .attr("width", FRAME_WIDTH)
    .attr("class", "frame");

  //read in data
    d3.csv("data/iris.csv").then((data) => {
    //find max X
    const MAX_X = d3.max(data, (d) => {return parseInt(d.Petal_Length); });

    //find max Y
    const MAX_Y = d3.max(data, (d) => {return parseInt(d.Sepal_Length); });

    //define scale functions to map data values: (domain) to pixel values (range)

    //using scaleLinear() because Petal_Length is numeric
    const X_SCALE = d3.scaleLinear()
                      .domain([0, (MAX_X)]) //adding padding
                      .range([0, VIS_WIDTH + 100]);


    //using scaleLinear() because Sepal_Length is numeric
    const Y_SCALE = d3.scaleLinear()
                      .domain([0, (MAX_Y)]) //adding padding
                      .range([VIS_HEIGHT, 0]);

    //add x axis to vis1
    FRAME1.append("g")
    .attr("transform", "translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.top) + ")")
    .call(d3.axisBottom(X_SCALE).ticks(10))
    .attr("font-size", '20px');


    //add y axis to vis1
    FRAME1.append("g")
    .attr("transform","translate(" + MARGINS.left + "," + MARGINS.top + ")")
    .call(d3.axisLeft(Y_SCALE).ticks(10))
    .attr("font-size", '20px');

  });
}

build_scatterplot_length()

function build_scatterplot_width(){
//append svg object to page's body
const FRAME2 = d3.select("#vis2")
  .append("svg")
  .attr("height", FRAME_HEIGHT)
  .attr("width", FRAME_WIDTH)
  .attr("class", "frame");

//read in data
  d3.csv("data/iris.csv").then((data) => {
  //find max X
  const MAX_X2 = d3.max(data, (d) => {return parseInt(d.Petal_Width); });

  //find max Y
  const MAX_Y2 = d3.max(data, (d) => {return parseInt(d.Sepal_Width); });

  //define scale functions to map data values: (domain) to pixel values (range)

  //using scaleLinear() because Petal_Width is numeric
  const X_SCALE2 = d3.scaleLinear()
                    .domain([0, (MAX_X2)]) //adding padding
                    .range([0, VIS_WIDTH + 100]);

  //using scaleLinear() because Sepal_Width is numeric
  const Y_SCALE2 = d3.scaleLinear()
                    .domain([0, (MAX_Y2)]) //adding padding
                    .range([VIS_HEIGHT, 0]);

  //add x axis to vis1
  FRAME2.append("g")
  .attr("transform", "translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.top) + ")")
  .call(d3.axisBottom(X_SCALE2).ticks(10))
  .attr("font-size", '20px');

  //add y axis to vis1
  FRAME2.append("g")
  .attr("transform","translate(" + MARGINS.left + "," + MARGINS.top + ")")
  .call(d3.axisLeft(Y_SCALE2).ticks(10))
  .attr("font-size", '20px');

  });
}

build_scatterplot_width()


function build_barchart_species(){
//append svg object to page's body
const FRAME3 = d3.select("#vis3")
  .append("svg")
  .attr("height", FRAME_HEIGHT)
  .attr("width", FRAME_WIDTH)
  .attr("class", "frame");

//read in data
  d3.csv("data/iris.csv").then((data) => {
  //find max X
  const MAX_X3 = d3.max(data, (d) => {return parseInt(d.Species); });

  //find max Y
  const MAX_Y3 = d3.max(data, (d) => {return parseInt(d.Sepal_Width); });

  //define scale functions to map data values: (domain) to pixel values (range)

  //using scaleBand() because Species is categorical
  const X_SCALE3 = d3.scaleBand()
                    .domain([0, (MAX_X3 + 10)]) //adding padding
                    .range([0, VIS_WIDTH]);

  //using scaleLinear() because count of species is numeric
  const Y_SCALE3 = d3.scaleLinear()
                    .domain([0, (MAX_Y3 + 10)]) //adding padding
                    .range([VIS_HEIGHT, 0]);

  //add x axis to vis1
  FRAME3.append("g")
  .attr("transform", "translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.top) + ")")
  .call(d3.axisBottom(X_SCALE3).ticks(10))
  .attr("font-size", '20px');

  //add y axis to vis1
  FRAME3.append("g")
  .attr("transform","translate(" + MARGINS.left + "," + MARGINS.top + ")")
  .call(d3.axisLeft(Y_SCALE3).ticks(10))
  .attr("font-size", '20px');

  });
}

build_barchart_species()

