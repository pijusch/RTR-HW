/* Hardcoding few things for now*/

var f = [.1,.2,.1,.3];
var numOfRec = 1;
var numOfCharts = 1;

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
 var limit = 1.0
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
 
  function barColor(){
	colors = [];
        for (var j = 0; j < arrayMax; j++){
          if (j%4==3 || j%4==0){
		colors.push(1.0);
	  }
	else{
		colors.push(0)
        }
       }
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
        var canvas = document.getElementById("yellow-canvas");
        initGL(canvas);
        initShaders();
        
	shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

	shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
        gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
        //initBuffers();


        gl.clearColor(.5, 1, .2, .7);
	//initColors();
        //barColor();
	//initVertices();
	//initIndices();
        //for(var i = 0;i<10 ;i++ ){
		//chaos(100);
        //}

	initBuffers();
        drawScene();
    }


function chaos(ms) {
  interval  = setInterval(randomDraw, ms);
}

 function button(val){
   if (val==0){
    chaos(100); 
    }
   else if(val ==1){
    clearInterval(interval);
    barColor();
    initBuffers();
    drawScene();
   }
  //initColors();
  //drawScene();
}

   function initBuffers(){
    squareVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
    vertices = [
             -0.1,  -0.1,  0.0,
            0.1,  -0.1,  0.0,
             -0.1, 0.1,  0.0,
            0.1, 0.1, 0.0
        ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    squareVertexPositionBuffer.itemSize = 3;
    squareVertexPositionBuffer.numItems = 4;

     squareVertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
    colors = [
	1.0, 0.0, 0.0, 1.0,
	0.0, 1.0, 0.0, 1.0,
	0.0, 0.0, 1.0, 1.0,
	1.0, 0.0, 0.0, 1.0,
	];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    squareVertexColorBuffer.itemSize = 4;
    squareVertexColorBuffer.numItems = 4;

    var indices = [0,1,2,3,1,2];
 VertexIndexBuffer = gl.createBuffer();
 gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, VertexIndexBuffer);
 gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
 VertexIndexBuffer.itemsize = 1;
 VertexIndexBuffer.numItems = 6;
   }









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
    //set_data(lines);
}

function errorHandler(evt) {
	if(evt.target.error.name == "NotReadableError") {
		alert("Canno't read file !");
	}
}

function processCSV(lines){
avg = [0,0,0,0];
c = 0;
 for (var i = 1;i<lines.length;i++){
   if(lines[i][5]=='Iris-versicolor'){
        c+=1;
	for (var j =1;j<5;j++){
            avg[j-1] = avg[j-1] + parseInt(lines[i][j]);
         }
   }
 } 
 for (var j =0;j<4;j++){
   f[j] = avg[j]/(c*1.0);
 }
 //f = avg;
  //initBuffers();
  //drawScene();
        initVertices();
	initIndices();
        //for(var i = 0;i<10 ;i++ ){
		//chaos(100);
        //}

	initBuffers();
        drawScene();
}

function drawOutput(lines){
	//Clear previous data
	document.getElementById("output").innerHTML = "";
	var table = document.createElement("table");
	for (var i = 0; i < lines.length; i++) {
		var row = table.insertRow(-1);
		for (var j = 0; j < lines[i].length; j++) {
			var firstNameCell = row.insertCell(-1);
			firstNameCell.appendChild(document.createTextNode(lines[i][j]));
		}
	}
	document.getElementById("output").appendChild(table);
}
