/**Coordinates for hardcoding a cube adapted from this site - https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Creating_3D_objects_using_WebGL 

Vertices and Indices for Cube





/**Global Variables)
**/
var gl;
var rat; // scaling the model
var shaderProgram;
var squareVertexPostionBuffer;
var squareVertexColorBuffer;
var vertexIndexBuffer;
var eye = [0,-1,-0.2]
var point = [0,0,0]
var up = [0,1,0]
var scene_f = 0
var stack = [];
var rat = 10;
var sqr = []
var population = 0;  // Size of population ( additional objects apart from the cycle model )

// Randomly generated Properties of floor and population. More in function Initpop()
var pop_cor = []  // 
var pop_ang = []  //angle for each cube in the population
var pop_scl = []  //scaling for each cube
var pop_ax = []   //
var pop_col = []  //color for population

var button;  // last button pressed
var drawMap = 0 // No Map drawn on start

var World = mat4.lookAt(eye,point,up); // Camera for main window a.k.a World.
var Map = mat4.lookAt([0.2, 0, 0], [0.2, 0 ,-1], [0,-1, 0]); // Camera for top right window a.k.a Map.
var vWorld = mat4.create();
var vMap = mat4.create();
vMap = Map


//Global Translation Updates to control heirarchy
var cMatrix1 = mat4.create();
mat4.identity(cMatrix1);
var cMatrix2 = mat4.create();
mat4.identity(cMatrix2);
var cMatrix3 = mat4.create();
mat4.identity(cMatrix3);
var cMatrix4 = mat4.create();
mat4.identity(cMatrix4);
var cRed = mat4.create();
mat4.identity(cRed);


//Global Rotation Updates to control heirarchy
var rMatrix1 = mat4.create();
mat4.identity(rMatrix1);
var rMatrix2 = mat4.create();
mat4.identity(rMatrix2);
var rMatrix3 = mat4.create();
mat4.identity(rMatrix3);
var rMatrix4 = mat4.create();
mat4.identity(rMatrix4);
var rMatrix5 = mat4.create();
mat4.identity(rMatrix5);

var angle = 40; //view angle

var pMatrix = mat4.create();
mat4.perspective(angle,1,.1,10,pMatrix); //Projection Matrix
mat4.multiply(pMatrix,World,vWorld); // Clip View Transformation


function keyboardEvent(event){
  if (event.keyCode == 87){	//Move Left
	mat4.translate(cMatrix1,[0,.5/rat,0]);
	mat4.translate(cRed,[0,.5/rat,0]);
	mat4.translate(cMatrix2,[0,.5/rat,0]);
	mat4.translate(cMatrix3,[0,.5/rat,0]);
	mat4.translate(cMatrix4,[0,.5/rat,0]);

  }
  else if (event.keyCode == 83){ //Move Right
	mat4.translate(cMatrix1,[0,-.5/rat,0]);
	mat4.translate(cRed,[0,-.5/rat,0]);
	mat4.translate(cMatrix2,[0,-.5/rat,0]);
	mat4.translate(cMatrix3,[0,-.5/rat,0]);
	mat4.translate(cMatrix4,[0,-.5/rat,0]);
  }
  else if( event.keyCode == 53||event.keyCode == 54){ //Zoom in and out
	if(event.keyCode == 53) angle+=5;
	else angle-=5;
	mat4.perspective(angle,1,.1,10,pMatrix);
	mat4.multiply(pMatrix,World,vWorld);
  }
  else if (event.keyCode == 68){ //Move Backward
	mat4.translate(cMatrix1,[-.5/rat,0,0]);
	mat4.translate(cRed,[-.5/rat,0,0]);
	mat4.translate(cMatrix2,[-.5/rat,0,0]);
	mat4.translate(cMatrix3,[-.5/rat,0,0]);
	mat4.rotate(rMatrix3,3.14/5,[1,0,0]);
	mat4.rotate(rMatrix4,3.14/5,[0,1,0]);
	mat4.rotate(rMatrix5,-3.14/5,[0,1,0]);
	mat4.translate(cMatrix4,[-.5/rat,0,0]);
  }
  else if (event.keyCode == 65){	//Move Forward
	mat4.translate(cMatrix1,[.5/rat,0,0]);
	mat4.translate(cRed,[.5/rat,0,0]);
	mat4.translate(cMatrix2,[.5/rat,0,0]);
	mat4.translate(cMatrix3,[.5/rat,0,0]);
	mat4.rotate(rMatrix3,-3.14/5,[1,0,0]);
	mat4.rotate(rMatrix4,-3.14/5,[0,1,0]);
	mat4.rotate(rMatrix5,3.14/5,[0,1,0]);
	mat4.translate(cMatrix4,[.5/rat,0,0]);

  }
  else if (event.keyCode == 55){  // Rotate Arms
	mat4.rotate(rMatrix4,3.14/5,[0,1,0]);
  }
else if (event.keyCode == 56){    // Rotate Pedals
	mat4.rotate(rMatrix5,3.14/5,[0,1,0]);
  }
else if (event.keyCode == 57){ // Rotate Wheels
	mat4.rotate(rMatrix1,3.14/5,[1,0,0]);
  }
else if (event.keyCode == 50){  // Camera Down
	eye[2]+=0.1;
	point[2]+=0.1;
	World = mat4.lookAt(eye,point,up);
	mat4.perspective(angle,1,.1,10,pMatrix);
	mat4.multiply(pMatrix,World,vWorld);
  }
else if (event.keyCode ==49){   // Camera Up
	eye[2]-=0.1;
	point[2]-=0.1;
	World = mat4.lookAt(eye,point,up);
	mat4.perspective(angle,1,.1,10,pMatrix);
	mat4.multiply(pMatrix,World,vWorld);
  }
else if (event.keyCode == 51){ // Camera Left
	eye[0]+=0.1;
	point[0]+=0.1;
	World = mat4.lookAt(eye,point,up);
	mat4.perspective(angle,1,.1,10,pMatrix);
	mat4.multiply(pMatrix,World,vWorld);
  }
else if (event.keyCode == 52){ // Camera Right
	eye[0]-=0.1;
	point[0]-=0.1;
	World = mat4.lookAt(eye,point,up);
	mat4.perspective(angle,1,.1,10,pMatrix);
	mat4.multiply(pMatrix,World,vWorld);
  }
  scene_f = 1;
  drawScene();
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


 function populate(vMatrix){  // Initialize the population (happends in each drawScene call)
     for (var i=0;i<population;i++){
	c  = cube(col = pop_col[i]);
	mMatrix = mat4.create();
	mat4.identity(mMatrix);
	mat4.translate(mMatrix,[pop_cor[i*2+0],pop_cor[i*2+1],-0.1]);
	mat4.rotate(mMatrix,3.14/pop_ang[i],[pop_ax[i][0],pop_ax[i][1],pop_ax[i][2]]);
	mat4.scale(mMatrix,[pop_scl[i][0],pop_scl[i][1],pop_scl[i][2]])
	mvMatrix = mat4.create();
	mat4.multiply(vMatrix,mMatrix,mvMatrix);
	redraw(mvMatrix);
     }

}

function buttonEvent(arg){ /** Handles Button Events **/
   button = arg;
   if( arg==0)
	{population+=5;
         initPop();
	}
    else if (arg==1) population = 10
     else if (arg==2) drawMap = !drawMap
   drawScene();
}

   function drawFloor(n,vMatrix){ // Draw the floor. Can be switched off in drawScene
	rec_size = 10;
	for (var t = 0;t<4;t++){
	for ( var i=0;i<n;i++){
		for ( var j = 0;j<n;j++){
		c  = square(col = [i*1.2%4,0.23*(i*j)%3.3,0.6-j*0.2%4]);
		mMatrix = mat4.create();
		mat4.identity(mMatrix);
		if (t==0){
		mat4.translate(mMatrix,[rec_size*i/rat,rec_size*j/rat,-.002])
		}
		else if (t==1) mat4.translate(mMatrix,[-rec_size*i/rat,-rec_size*j/rat,-.002])
		else if (t==2) mat4.translate(mMatrix,[-rec_size*i/rat,rec_size*j/rat,-.002])
		else mat4.translate(mMatrix,[rec_size*i/rat,-rec_size*j/rat,-0.002])
		mvMatrix = mat4.create();
		mat4.multiply(vMatrix,mMatrix,mvMatrix);


		redraw(mvMatrix);
	}}
	}
	
   }
	

   function drawScope(vMatrix){ // Red square on the map
	c  = square(col = [1,0,0,1]);
	mMatrix = mat4.create();
	mat4.identity(mMatrix);
	mat4.translate(mMatrix,[0,0,-0.1]);
	mat4.multiply(mMatrix,cRed,mMatrix);
	mat4.scale(mMatrix,[1.2,1.2,1]);
	mvMatrix = mat4.create();
	mat4.multiply(vMatrix,mMatrix,mvMatrix);
	gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);

	indices = [0,1,1,2,2,3,3,0]
	colors = []
	for (var i=0;i<4;i++) colors = colors.concat([1,0,0,1])
	initBuffers()
	gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
	gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, squareVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, VertexIndexBuffer);
	gl.drawElements(gl.LINES, VertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0); 					

   }

function drawWorld(vmatrix){ // Cycle Model (not using stack for this assignment, since not asked in the question)

//Frame

c  = cube(col = [23/255,73/255,148/255,0]);
mMatrix = mat4.create();
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.translate(mMatrix,[0,0,-2/rat]);
mat4.scale(mMatrix,[1,0.1,0.1]);
mvMatrix = mat4.create();
nmvMatrix = mat4.create();
mat4.multiply(vmatrix,mMatrix,mvMatrix);
redraw(mvMatrix);


c  = cube(col = [23/255,73/255,148/255,0]);
mMatrix = mat4.create();
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.translate(mMatrix,[0.0,0,-2/rat]);
mat4.translate(mMatrix,[-0.58/rat,0,0]);
mat4.rotate(mMatrix,-3.14/6,[0,1,0]);
mat4.translate(mMatrix,[.8/rat,0,0.3/rat]);
mat4.scale(mMatrix,[1.155,0.1,0.1]);
mat4.multiply(vmatrix,mMatrix,mvMatrix);
mat4.translate(mvMatrix,[0,0,0]);
redraw(mvMatrix);


c  = cube(col = [23/255,73/255,148/255,0]);
mMatrix = mat4.create();
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.translate(mMatrix,[0.0,0,-2/rat]);
mat4.rotate(mMatrix,-3.14/2,[0,1,0]);
mat4.translate(mMatrix,[0.0,0,-1/rat]);
mat4.translate(mMatrix,[0.58/rat,0,0]);
mat4.scale(mMatrix,[0.58,0.1,0.1]);
mat4.multiply(vmatrix,mMatrix,mvMatrix);
redraw(mvMatrix);


c  = cube(col = [23/255,73/255,148/255,0]);
mMatrix = mat4.create();
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.translate(mMatrix,[0.0,0,-2/rat]);
mat4.translate(mMatrix,[-0.58/rat,0,0]);
mat4.rotate(mMatrix,-3.14/6,[0,1,0]);
mat4.translate(mMatrix,[2.5/rat,0,-0.8/rat]);
mat4.scale(mMatrix,[1.155,0.1,0.1]);
mat4.multiply(vmatrix,mMatrix,mvMatrix);
redraw(mvMatrix);

c  = cube(col = [23/255,73/255,148/255,0]);
mMatrix = mat4.create();
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.translate(mMatrix,[0.0,0,-2/rat]);
mat4.translate(mMatrix,[2/rat,0,1.15/rat]);
mat4.scale(mMatrix,[1,0.1,0.1]);
mat4.multiply(vmatrix,mMatrix,mvMatrix);
redraw(mvMatrix);

//Handle

c  = cube(col = [23/255,73/255,148/255,0]);
mMatrix = mat4.create();
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix2,mMatrix)
mat4.translate(mMatrix,[0.0,0,-2/rat]);
mat4.rotate(mMatrix,3.14/2.5,[0,1,0]);
mat4.translate(mMatrix,[-0.7/rat,0,-0.9/rat]);
mat4.scale(mMatrix,[0.9,0.1,0.1]);
mat4.multiply(vmatrix,mMatrix,mvMatrix);
redraw(mvMatrix);


c  = cube(col = [68/255,112/255,24/255,1]);
mMatrix = mat4.create();
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix2,mMatrix)
mat4.translate(mMatrix,[0.0,0,-2/rat]);
mat4.rotate(mMatrix,3.14/2,[0,0,1]);
mat4.translate(mMatrix,[0,0.8/rat,-0.4/rat]);
mat4.scale(mMatrix,[0.5,0.1,0.1]);
mat4.multiply(vmatrix,mMatrix,mvMatrix);
redraw(mvMatrix);


//Wheels


for( var i=1;i<=2;i++){
c  = cube(col = [0,0,0,1]);
mMatrix = mat4.create();
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix3,mMatrix)
mat4.translate(mMatrix,[0.0,0,-2/rat]);
mat4.rotate(mMatrix,3.14/2,[0,0,1]);
mat4.translate(mMatrix,[0.1/rat,1.4/rat,1.15/rat]);
mat4.rotate(mMatrix,3.14/6,[1,0,0]);
mat4.multiply(mMatrix,rMatrix3,mMatrix);
mat4.rotate(mMatrix,0+i*3.14/6,[1,0,0])
mat4.multiply(mMatrix,rMatrix1,mMatrix);
mat4.scale(mMatrix,[0.1,0.5,0.5]);
mat4.multiply(vmatrix,mMatrix,mvMatrix);
redraw(mvMatrix);
}


for( var i=1;i<=2;i++){
c  = cube(col = [0,0,0,1]);
mMatrix = mat4.create();
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix3,mMatrix)
mat4.translate(mMatrix,[0.0,0,-2/rat]);
mat4.rotate(mMatrix,3.14/2,[0,0,1]);
mat4.translate(mMatrix,[0.1/rat,-2.9/rat,1.15/rat]);
mat4.rotate(mMatrix,3.14/8,[1,0,0]);
mat4.multiply(mMatrix,rMatrix3,mMatrix);
mat4.rotate(mMatrix,0+i*3.14/6,[1,0,0])
mat4.multiply(mMatrix,rMatrix1,mMatrix);
mat4.scale(mMatrix,[0.1,0.5,0.5]);
mat4.multiply(vmatrix,mMatrix,mvMatrix);
redraw(mvMatrix);
}

//Pedals

c  = cube(col = [0,0,0,0.8]);
mMatrix = mat4.create();
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.translate(mMatrix,[0.0,0,-2/rat]);
mat4.translate(mMatrix,[1/rat,0,1.2/rat]);
mat4.multiply(mMatrix,rMatrix4,mMatrix);
mat4.scale(mMatrix,[0.04,0.6,0.04]);
mat4.multiply(vmatrix,mMatrix,mvMatrix);
redraw(mvMatrix);


c  = cube(col = [118/255,17/255,74/255,1]);
mMatrix = mat4.create();
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.translate(mMatrix,[0.0,0,-2/rat]);
mat4.translate(mMatrix,[1/rat,0,0]);
mat4.translate(mMatrix,[0,0,1.2/rat]);
mat4.multiply(mMatrix,rMatrix4,mMatrix);
mat4.translate(mMatrix,[0,0,-0.2/rat]);
mat4.translate(mMatrix,[0,-0.6/rat,0]);
mat4.scale(mMatrix,[0.02,0.02,0.2]);
mat4.multiply(vmatrix,mMatrix,mvMatrix);
redraw(mvMatrix);


c  = cube(col = [118/255,17/255,74/255,1]);
mMatrix = mat4.create();
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.translate(mMatrix,[0.0,0,-2/rat]);
mat4.translate(mMatrix,[1/rat,0,0]);
mat4.translate(mMatrix,[0,0,1.2/rat]);
mat4.multiply(mMatrix,rMatrix4,mMatrix);
mat4.translate(mMatrix,[0,0,0.2/rat]);
mat4.translate(mMatrix,[0,0.6/rat,0]);
mat4.scale(mMatrix,[0.02,0.02,0.2]);
mat4.multiply(vmatrix,mMatrix,mvMatrix);
redraw(mvMatrix);

c  = cube(col = [255/255,109/255,18/255,1]);
mMatrix = mat4.create();
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.translate(mMatrix,[0.0,0,-2/rat]);
mat4.translate(mMatrix,[1/rat,0,1.2/rat]);
mat4.multiply(mMatrix,rMatrix4,mMatrix);
mat4.translate(mMatrix,[0,-0.8/rat,-.39/rat]);
mat4.multiply(mMatrix,rMatrix5,mMatrix);
mat4.scale(mMatrix,[0.2,0.2,0.02]);
mat4.multiply(vmatrix,mMatrix,mvMatrix);
redraw(mvMatrix);


c  = cube(col = [255/255,109/255,18/255,1]);
mMatrix = mat4.create();
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.translate(mMatrix,[0.0,0,-2/rat]);
mat4.translate(mMatrix,[1/rat,0,1.2/rat]);
mat4.multiply(mMatrix,rMatrix4,mMatrix);
mat4.translate(mMatrix,[0,0.8/rat,.39/rat]);
mat4.multiply(mMatrix,rMatrix5,mMatrix);
mat4.scale(mMatrix,[0.2,0.2,0.02]);
mat4.multiply(vmatrix,mMatrix,mvMatrix);
redraw(mvMatrix);

}


function redraw(mvMatrix){ //Buffer initiallization when objects are drawn
 initBuffers()
gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, squareVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, VertexIndexBuffer);
gl.drawElements(gl.TRIANGLES, VertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0); 					
}





    function drawScene() { /** Draws Scene **/
	if (button == 1) initPop();
	var n = 5;
	gl.enable(gl.DEPTH_TEST);
	rat =50;
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	populate(vWorld);
	drawFloor(n,vWorld);
	drawWorld(vWorld);
	rat =50;
	if (!drawMap) return
	gl.viewport(gl.viewportWidth*0.7, gl.viewportHeight*0.7,gl.viewportWidth*.3, gl.viewportHeight*.3);
	populate(vMap);
	drawFloor(n,vMap);
	drawWorld(vMap);
	drawScope(vMap);
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
			vertices[i] = 20*(vertices[i]-xMin)/(xMax-xMin)-10;
		}
		else if (i%3==1){
			vertices[i] = 20*(vertices[i]-yMin)/(yMax-yMin)-10;			
		}
	}
	return vertices
 }

 function rand(min,max){
return Math.random() * (max - min) + min;
}

  function initPop(){ //Population  Properties Initialization
  pop_cor = []
 pop_ang = []
 pop_scl = [] 
 pop_ax = []
 pop_col = []
for (var i=0;i<population;i++){
 		pop_cor=pop_cor.concat([rand(-40,40)/rat,rand(-40,40)/rat]);
		pop_ang.push([Math.random()*10]);
		pop_ax.push([Math.random(),Math.random(),Math.random()]);
		pop_scl.push([Math.random()*1,Math.random()*5,Math.random()*5]);
		pop_col.push([Math.random(),Math.random(),Math.random(),1])
	}

 }

    function webGLStart() {  // First Call
	initPop();
       for (var i=0;i<4;i++) sqr.push(Math.random()+0.5)
        var canvas = document.getElementById("lab2-canvas");
        initGL(canvas);
        initShaders();
        
	shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

	shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
        gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
	
	document.addEventListener('keydown', keyboardEvent, false);
	shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
	

        gl.clearColor(70/255, 243/255, 243/255, 1);

        drawScene();
    }

   function initBuffers(){
    squareVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
    for (var i= 0;i<vertices.length;i++){
	vertices[i]/=rat;
    }
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    squareVertexPositionBuffer.itemSize = 3;
    squareVertexPositionBuffer.numItems = vertices.length/3;
     squareVertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
    
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    squareVertexColorBuffer.itemSize = 4;
    squareVertexColorBuffer.numItems = colors.length/4;

   VertexIndexBuffer = gl.createBuffer();
   gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, VertexIndexBuffer);
   gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
   VertexIndexBuffer.itemsize = 1;
   VertexIndexBuffer.numItems = indices.length;
   }
