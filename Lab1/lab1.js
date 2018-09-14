/** Hardcoding few things for now
**/


/**Global Variables (Bad Implementation, works though :) )
**/
var f = [0,0,0,0];
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
var indices = [];
var arrayMax = numOfRec*16

/**
Functions

initGL
drawScene
randomDraw
drawOne
drawAll
barColor
initColors
drawChart ??
initBuffers
initVertices
WebGLDraw
drawScene
buttonEvent
chaos
normalize
initIndices
processCSV

Note: Excluding File Handling

**/




    function initGL(canvas) {
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



    function drawScene() {
        //gl.PolygonMode(gl.FRONT_AND_BACK, gl.LINE);
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, squareVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

        //gl.drawArrays(gl.TRIANGLES, 0, squareVertexPositionBuffer.numItems);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, VertexIndexBuffer);
        gl.drawElements(gl.TRIANGLES, VertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
 				
    }
   var index = 0
   function randomDraw(){
	delta = 0.2;
	for (var j  =0; j< 100;j++){
		toss = Math.random();
		if (toss>0.5){
			del = delta;
		}	
		else{
			del = -delta;
		}
		//ind = Math.floor(Math.random()*15);
		if (index%3!=0){
		colors[index] = Math.random();
		}
		index+=1;
		index = index%(numOfRec*16);
	}
	/*for (var k 
        for (var j = 0; j < arrayMax; j++){
          if (j%3==0){
		colors.push(1.0);
	  }
	  else{
          colors.push(Math.random());
          }*/
	 initBuffers();
  	 drawScene();        
    }   
 
 function drawOne(arg){
   f = arg;
     initVertices();
 initIndices();
 initBuffers();
 drawScene();
 }


 function drawAll(){

 }

 function addBarColor(arg){
   col = [];
   col = col.concat(arg);
   col = col.concat([1.0]);
   col = col.concat(arg);
   col = col.concat([0.8]);
   col = col.concat(arg);
   col = col.concat([0.5]);
   col = col.concat(arg);
   col = col.concat([0.2]);
   return col;
 }
 
  function barColor(){
	colors = [];
        colors = colors.concat(addBarColor([1,0,0]));
        colors = colors.concat(addBarColor([0,1,0]));
        colors = colors.concat(addBarColor([0,0,1]));
        colors = colors.concat(addBarColor([1,0.5,0]));
        /*for (var j = 0; j < arrayMax; j++){
        if(j%4==3){
		if (j%16==3){ colors.push(1.0);}
		else if (j%16==7){ colors.push(1.0*.8);}
		else if (j%16==11){ colors.push(1.0*.5);}
		else if (j%16==15){ colors.push(1.0*.2);}	
        }
        else if (j%4==0){
		colors.push(1.0);
	  }
	else{
		colors.push(0.0)
        }
       }*/
  }

   function initColors(){
    colors = [];
        for (var j = 0; j < arrayMax; j++){
          if (j%3==0){
		colors.push(1.0);
	  }
	  else{
          colors.push(0+Math.random()/10);
          }
       }
   
   }


 function drawChart(){
  
 }
 
 function normalize(vertices){
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
			vertices[i] = 1.6*(vertices[i]-xMin)/(xMax-xMin)-0.8;
		}
		else if (i%3==1){
			vertices[i] = 1.6*(vertices[i]-yMin)/(yMax-yMin)-0.8;			
		}
	}
	return vertices
 }

  function initVertices(){
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
	vertices = normalize(vertices);
 }
	function initIndices(){
		for (var i =0;i< numOfRec;i++){
			indices = indices.concat([i*4+0,i*4+1,i*4+2,i*4+3,i*4+1,i*4+2]);
		}
	}

    function webGLStart() {
        var canvas = document.getElementById("lab1-canvas");
        initGL(canvas);
        initShaders();
        
	shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

	shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
        gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
        initBuffers();


        gl.clearColor(0, 1, 1, 1);
	//initColors();
        barColor();
	initVertices();
	initIndices();
        //for(var i = 0;i<10 ;i++ ){
		//chaos(100);
        //}

	initBuffers();
        drawScene();
    }


function chaos(ms) {
  interval  = setInterval(randomDraw, ms);
}

 function buttonEvent(arg){
   if(arg ==0){
     drawOne(ise_bars);
   }
   else if(arg ==1){
     drawOne(ive_bars);
   }
   else if(arg ==2){
    drawOne(ivi_bars);
   }
   else if(arg ==3){
    drawAll();
   }
   else if(arg ==4){
	document.getElementById("ise").style.display = 'none';
	document.getElementById("ive").style.display = 'none';
	document.getElementById("ivi").style.display = 'none';
	document.getElementById("chaos").style.display = 'none';
	document.getElementById("all").style.display = 'none';
	document.getElementById("chaos_msg").style.display = 'block';
        chaos(100);
   }
}

   function initBuffers(){
    squareVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
    /*vertices = [
             -0.1,  -0.1,  0.0,
            0.1,  -0.1,  0.0,
             -0.1, 0.1,  0.0,
            0.1, 0.1, 0.0,
	0.2,  -0.1,  0.0,
            0.4,  -0.1,  0.0,
             0.2, 0.1,  0.0,
            0.4, 0.1, 0.0
        ];*/
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    squareVertexPositionBuffer.itemSize = 3;
    squareVertexPositionBuffer.numItems = numOfRec*2;

     squareVertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
    /*colors = [
	1.0, 0.0, 0.0, 1.0,
	0.0, 1.0, 0.0, 1.0,
	0.0, 0.0, 1.0, 1.0,
	1.0, 0.0, 0.0, 1.0,
	];*/
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    squareVertexColorBuffer.itemSize = 4;
    squareVertexColorBuffer.numItems = numOfRec*2;

    //var indices = [0,1,2,3,1,2,4,5,6,7,5,6];
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
		alert("Canno't read file !");
	}
}

function processCSV(lines){
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
 document.getElementById("csv_input").style.display = 'none';
 document.getElementById("ise").style.display = 'block';
 document.getElementById("ive").style.display = 'block';
 document.getElementById("ivi").style.display = 'block';
 document.getElementById("all").style.display = 'block';
 document.getElementById("chaos").style.display = 'block';
 alert('File loaded :)');
}
