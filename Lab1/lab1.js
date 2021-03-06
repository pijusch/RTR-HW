/** Hardcoding few things for now
**/


/**Global Variables)
**/
var f = [1,1,1,1];
var ise_bars = [0,0,0,0];
var ive_bars = [0,0,0,0];
var ivi_bars = [0,0,0,0];
var numOfRec = 4;
var lines = [];
var gl;
var shaderProgram;
var squareVertexPostionBuffer;
var squareVertexColorBuffer;
var vertexIndexBuffer;
var colors = [];
var vertices = [];
var vertices1 = [];
var vertices2 = [];
var vertices3 = [];
var indices = [];
var arrayMax = numOfRec*16
var bVertices = [];
var button ;
var lastButton;

/**
Functions

Their uses have been added next to the declaration.


initGL
drawScene
randomDraw
drawOne
drawAll
barColor
initBuffers
initVertices
WebGLDraw
drawScene
buttonEvent
chaos
normalize
initIndices
processCSV



**/
   function bindVertices(arg){  /**Selects the Graph to be drawn**/
	if (arg==0){
		vertices = vertices1;
	}
	else if (arg==1){
		vertices = vertices2;
	}
	else vertices = vertices3;
   }



    function initGL(canvas) { /** Gets Canvas **/
        try {
            gl = canvas.getContext("webgl");
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;
        } catch (e) {
        }
        if (!gl) {
            alert("Could not initialise WebGL, sorry :-(");
        }
    }



    function drawScene(arg) { /** Draws Scene **/ 
	        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        if (arg == 3){
		num=3;
	}
	else if (arg<3 && arg>-1){
	num = 1;
	}
	else{
          return;
	}
     for (var i= 0;i<num;i++){
        gl.viewport(0+i*gl.viewportWidth/num, 0, gl.viewportWidth/num, gl.viewportHeight);

	setBVertices();
	tempc = colors;
        colors = setBColors();
        vertices = bVertices;
	initBuffers();

        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, squareVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
	gl.drawArrays(gl.LINES,0,44);

	if (arg==3) bindVertices(i);
	else bindVertices(arg);
        colors = tempc;
	initBuffers();
	
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, squareVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
	

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, VertexIndexBuffer);
        gl.drawElements(gl.TRIANGLES, VertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
	

     }
    }
   var index = 0
   function randomDraw(){ /** Utility function for chaos. See function chaos**/
	delta = 0.2; 
	for (var j  =0; j< 100;j++){
		toss = Math.random();
		if (toss>0.5){
			del = delta;
		}	
		else{
			del = -delta;
		}
		if (index%3!=0){
		colors[index] = Math.random();
		}
		index+=1;
		index = index%(numOfRec*16);
	}
	 initBuffers();
  	 drawScene(lastButton);        
    }   
 
 function drawOne(arg){ /** Draws one of the three graphs **/
        setBVertices();
	initIndices();
	initBuffers();
	drawScene(arg);
 }


 function drawAll(){ /** Plots all three graphs **/
	drawScene(3);
 }

 function addBarColor(arg){ /**Intializes bar given a color. Adds hue effect. **/
   col = [];
   col = col.concat(arg);
   col = col.concat([1.0]);
   col = col.concat(arg);
   col = col.concat([0.8]);
   col = col.concat(arg);
   col = col.concat([0.4]);
   col = col.concat(arg);
   col = col.concat([0.2]);
   return col;
 }
 
  function barColor(){ /** Intializes all bars **/
	colors = [];
        colors = colors.concat(addBarColor([1,0,0]));
        colors = colors.concat(addBarColor([0,1,0]));
        colors = colors.concat(addBarColor([0,0,1]));
        colors = colors.concat(addBarColor([1,0.5,0]));
  }


 function setBVertices(){ /** Vertices for background lines**/
    bVertices = [];
    for (var i = 0;i<20;i++){
	bVertices = bVertices.concat([0,i,0,1,i,0]);
   }
   bVertices = bVertices.concat([0,0,0,0,i-1,0,1,0,0,1,i-1,0]);
   bVertices = normalize(bVertices);
   for (var i=0;i<bVertices.length-12;i++){
	if (i%3==0){
	   if(i%6==0){
		bVertices[i]-=0.1;
	   }
	   else{
	    bVertices[i]+=0.1;
	   }
	}
    }
   bVertices[40*3]-=0.1;
   bVertices[40*3+3]-=0.1;
   bVertices[40*3+6]+=0.1;
   bVertices[40*3+9]+=0.1;
 }
 function setBColors(){ 
  bColors = [];
  for (var i = 0;i<bVertices.length/3;i++){
	bColors = bColors.concat([0,0,0,1]);
  }
  return bColors;
 }


 function normalize(vertices){ /** Normalizes everything to viewport **/
	n  = vertices.length;
	xMin = 100000;
	xMax = -1;
	yMin = 100000;
	yMax = -1;
	for (var i = 0;i<n;i++){
		if (i%3==0){
			if (xMax < vertices[i]){
				xMax  = vertices[i];
			}
			if (xMin > vertices[i]){
				xMin = vertices[i];
			}
		}
		else if (i%3==1){
			if (yMax < vertices[i]){
				yMax  = vertices[i];
			}
			if (yMin > vertices[i]){
				yMin = vertices[i];
			}
		}
	}
	for (var i = 0; i<n; i++){
		if (i%3==0){
			vertices[i] = 1.8*(vertices[i]-xMin)/(xMax-xMin)-.9;
		}
		else if (i%3==1){
			vertices[i] = 1.96*(vertices[i]-yMin)/(yMax-yMin)-.98;			
		}
	}
	return vertices
 }

  function initVertices(vertices,arg){ /** Initializes rectangles for bars **/
	if(arg==0){
		f = ise_bars;
	}
	else if(arg==1){
		f= ive_bars;
	}
	else{
		f = ivi_bars;
	}
        vertices = [];
	b1 = [0,0];
	b2 = [1,0];
	b3 = [0,1];
	b4 = [1,1];
	dis = 1.5;
	for(var i=0;i< numOfRec; i++){
		vertices.push(b1[0]+dis*i);
		vertices.push(b1[1]*f[i%4]);
		vertices.push(0);
		vertices.push(b2[0]+dis*i);
		vertices.push(b2[1]*f[i%4]);
		vertices.push(0);
		vertices.push(b3[0]+dis*i);
		vertices.push(b3[1]*f[i%4]);
		vertices.push(0);
		vertices.push(b4[0]+dis*i);
		vertices.push(b4[1]*f[i%4]);
		vertices.push(0);
	}
	return vertices;
 }
	function initIndices(){ /** Indices for element array **/
		for (var i =0;i< numOfRec;i++){
			indices = indices.concat([i*4+0,i*4+1,i*4+2,i*4+3,i*4+1,i*4+2]);
		}
	}


    function webGLStart() { /** First Call**/
        var canvas = document.getElementById("lab1-canvas");
        initGL(canvas);
        initShaders();
        
	shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

	shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
        gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
        initBuffers();
        gl.clearColor(0.9, 0.9, 0.9, 1);
        barColor();
	initIndices();

	initBuffers();
        drawScene(-1);
    }


function chaos(ms) { /** Button 'Do Not Press' **/
  interval  = setInterval(randomDraw, ms);
}

 function buttonEvent(arg){ /** Handles Button Events **/
   lastButton = button;
   button = arg;
   if(arg ==3 ){
	document.getElementById("all-text").style.display = 'block';
	document.getElementById("one-text").style.display = 'none';
	drawAll();
    }
   else if(arg ==4){
	document.getElementById("all-text").style.display = 'none';
	document.getElementById("one-text").style.display = 'none';
	document.getElementById("ise").style.display = 'none';
	document.getElementById("ive").style.display = 'none';
	document.getElementById("ivi").style.display = 'none';
	document.getElementById("chaos").style.display = 'none';
	document.getElementById("all").style.display = 'none';
	document.getElementById("chaos_msg").style.display = 'block';
        chaos(100);
   }
	else{
	document.getElementById("all-text").style.display = 'none';
	document.getElementById("one-text").style.display = 'block';
	drawOne(arg);
	}
}

   function initBuffers(){ /** Sets Buffers **/

	squareVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	squareVertexPositionBuffer.itemSize = 3;
	squareVertexPositionBuffer.numItems = numOfRec*2;

	squareVertexColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
	squareVertexColorBuffer.itemSize = 4;
	squareVertexColorBuffer.numItems = numOfRec*2;

	VertexIndexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, VertexIndexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
	VertexIndexBuffer.itemsize = 1;
	VertexIndexBuffer.numItems = numOfRec*6;
   }






/**File Loading adapted from program 05 (Prof. Shen)
**/

function handleFiles(files) {
	// Check for the various File API support.
	if (window.FileReader) {
		// FileReader are supported.
		getAsText(files[0]);
	} else {
		alert('FileReader are not supported in this browser.');
	}
}

function getAsText(fileToRead) {
	var reader = new FileReader();
	// Handle errors load
	reader.onload = loadHandler;
	reader.onerror = errorHandler;
	// Read file into memory as UTF-8      
	reader.readAsText(fileToRead);
}

function loadHandler(event) {
	var csv = event.target.result;
	processData(csv);             
}

function processData(csv) {
    var allTextLines = csv.split(/\r\n|\n/);
    lines = [];
    while (allTextLines.length) {
        lines.push(allTextLines.shift().split(','));
    }
	console.log(lines);
     
    processCSV(lines);
}

function errorHandler(evt) {
	if(evt.target.error.name == "NotReadableError") {
		alert("Cannot read file !");
	}
}

function processCSV(lines){  /** Evaluates Averages for all the flowers **/
c1 = 0
c2 = 0
c3 = 0
 for (var i = 1;i<lines.length;i++){
   if(lines[i][5]=='Iris-setosa'){
        c1+=1;
	for (var j =1;j<5;j++){
            ise_bars[j-1] = ise_bars[j-1] + parseFloat(lines[i][j]);
         }
   }
  else if(lines[i][5]=='Iris-versicolor'){
        c2+=1;
	for (var j =1;j<5;j++){
            ive_bars[j-1] = ive_bars[j-1] + parseFloat(lines[i][j]);
         }
   }
 else if(lines[i][5]=='Iris-virginica'){
        c3+=1;
	for (var j =1;j<5;j++){
            ivi_bars[j-1] = ivi_bars[j-1] + parseFloat(lines[i][j]);
         }
   }
 } 
 for (var j =0;j<4;j++){
   ise_bars[j] = ise_bars[j]/(c1*1.0);
   ive_bars[j] = ive_bars[j]/(c2*1.0);
   ivi_bars[j] = ivi_bars[j]/(c3*1.0);
 }
 vertices1 = initVertices(vertices1,0);
 vertices2 = initVertices(vertices2,1);
 vertices3 = initVertices(vertices3,2);
 temp = normalize(vertices1.concat(vertices2.concat(vertices3)));
 vertices1 = temp.slice(0,48);
 vertices2 = temp.slice(48,96);
 vertices3 = temp.slice(96,144);
 document.getElementById("csv_input").style.display = 'none';
 document.getElementById("ise").style.display = 'block';
 document.getElementById("ive").style.display = 'block';
 document.getElementById("ivi").style.display = 'block';
 document.getElementById("all").style.display = 'block';
 document.getElementById("chaos").style.display = 'block';
 alert('File loaded :)');
}
