/** Hardcoding few things for now
**/


/**Global Variables)
**/
var gl;
var rat;
var shaderProgram;
var squareVertexPostionBuffer;
var squareVertexColorBuffer;
var vertexIndexBuffer;
var colors = [];
var vertices = [];
var indices = [];

var stack = [];


//var vWorld = mat4.lookAt([0, 0 , 0], [0, 0 ,-1], [0,1,0 ]);
//var vWorld = mat4.lookAt([-0.5, -1 , 0], [0, 0 ,-1], [0,0,-1 ]);


//var World = mat4.lookAt([0.1, -1 , -0.2], [0, 0,0], [0,1,0 ]);
var World = mat4.lookAt([0, -1 , -0.2], [0, 0,0], [0,1,0 ]);



//var vWorld = mat4.lookAt([0, 0 , 0], [0, 0 ,-1], [0,1,0 ]);
//var vWorld = mat4.lookAt([0, -0.5 , -0.5], [-1, 0 ,0], [0,0,-1 ]);
var Map = mat4.lookAt([0.2, 0, 0], [0.2, 0 ,-1], [0,1, 0]);
var vWorld = mat4.create();
var vMap = mat4.create();
vMap = Map

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

var angle = 40;

var pMatrix = mat4.create();
mat4.perspective(angle,1,.1,10,pMatrix);
mat4.multiply(pMatrix,World,vWorld);


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
  else if( event.keyCode == 90){
	if(event.shiftKey) angle+=5;
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
  else if (event.keyCode == 72){
	mat4.rotate(rMatrix4,3.14/5,[0,1,0]);
  }
else if (event.keyCode == 80){
	mat4.rotate(rMatrix5,3.14/5,[0,1,0]);
  }
else if (event.keyCode == 82){
	mat4.rotate(rMatrix1,3.14/5,[0,0,1]);
  }
  drawScene();
 }
	

function cube(col){
vertices = [
// Front face
  -1.0, 1.0,  -1.0,
   1.0, 1.0,  -1.0,
   1.0,  1.0,  1.0,
  -1.0,  1.0,  1.0,
  
  // Back face
  -1.0, -1.0, -1.0,
  -1.0,  -1.0, 1.0,
   1.0,  -1.0, 1.0,
   1.0, -1.0, -1.0,
  
  // Top face
  -1.0,  -1.0, 1.0,
  -1.0,  1.0,  1.0,
   1.0,  1.0,  1.0,
   1.0,  -1.0, 1.0,
  
  // Bottom face
  -1.0, -1.0, -1.0,
   1.0, -1.0, -1.0,
   1.0, 1.0,  -1.0,
  -1.0, 1.0,  -1.0,
  
  // Right face
   1.0, -1.0, -1.0,
   1.0,  -1.0, 1.0,
   1.0,  1.0,  1.0,
   1.0, 1.0,  -1.0,
  
  // Left face
  -1.0, -1.0, -1.0,
  -1.0, 1.0, -1.0,
  -1.0,  1.0,  1.0,
  -1.0,  -1.0, 1.0,
];

colors = []
for (var i=0;i<4;i++) colors = colors.concat([1,1,0,1])
for (var i=0;i<4;i++) colors = colors.concat([1,0,0,1])
for (var i=0;i<4;i++) colors = colors.concat([0,0,1,1])
for (var i=0;i<4;i++) colors = colors.concat([0,1,0,1])
for (var i=0;i<4;i++) colors = colors.concat([0,0,1,1])
for (var i=0;i<4;i++) colors = colors.concat([1,1,0,1])


indices = [0,  1,  2,      0,  2,  3,    // front
    4,  5,  6,      4,  6,  7,    // back
    8,  9,  10,     8,  10, 11,   // top
    12, 13, 14,     12, 14, 15,   // bottom
    16, 17, 18,     16, 18, 19,   // right
    20, 21, 22,     20, 22, 23,   // left
  ];


}

 function square(col){
vertices = [
   -5.0,  -5.0, 0,
   -5.0,  5.0,  0,
    5.0,  5.0,  0,
    5.0,  -5.0, 0,
  
];	


colors = []
	for (i=0;i<24;i++){
		colors = colors.concat(col);
	}

indices = [
    0,  1,  2,      0,  2,  3,
  ];

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


   function drawFloor(n,vMatrix){
	rec_size = 10;
	for (var t = 0;t<4;t++){
	for ( var i=0;i<n;i++){
		for ( var j = 0;j<n;j++){
		c  = square(col = [i%2,(i+j)%2,j%2,0.2]);
		mMatrix = mat4.create();
		mat4.identity(mMatrix);
		if (t==0){
		mat4.translate(mMatrix,[rec_size*i/rat,rec_size*j/rat,-.01])
		}
		else if (t==1) mat4.translate(mMatrix,[-rec_size*i/rat,-rec_size*j/rat,-.01])
		else if (t==2) mat4.translate(mMatrix,[-rec_size*i/rat,rec_size*j/rat,-.01])
		else mat4.translate(mMatrix,[rec_size*i/rat,-rec_size*j/rat,-0.01])
		mvMatrix = mat4.create();
		mat4.multiply(vMatrix,mMatrix,mvMatrix);


		redraw(mvMatrix);
	}}
	}
	
   }

   function drawScope(vMatrix){
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
	initBuffers()
	gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
	gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, squareVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, VertexIndexBuffer);
	gl.drawElements(gl.LINES, VertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0); 					

   }

function drawBackground(){
	
	c = square([0,0,0,1])
	
	colors = c[1];
	vertices = normalize(c[0]);
	indices = c[2];

	initBuffers();

	Matrix = mat4.create();
	mat4.identity(Matrix);

	gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, Matrix);

	gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
	gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, squareVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, VertexIndexBuffer);
	gl.drawElements(gl.TRIANGLES, VertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0); 				

}


function drawWorld(vmatrix){

//Frame

c  = cube(col = [1,0,0,0.8]);
mMatrix = mat4.create();
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.translate(mMatrix,[0,0,-2/rat]);
mat4.scale(mMatrix,[1,0.1,0.1]);
mvMatrix = mat4.create();
nmvMatrix = mat4.create();
mat4.multiply(vmatrix,mMatrix,mvMatrix);
redraw(mvMatrix);


c  = cube(col = [1,0,0,0.8]);
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


c  = cube(col = [1,0,0,0.8]);
mMatrix = mat4.create();
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.translate(mMatrix,[0.0,0,-2/rat]);
//mat4.translate(mMatrix,[0,-0.29/rat,0]);
mat4.rotate(mMatrix,-3.14/2,[0,1,0]);
//mat4.translate(mMatrix,[0.1,0,0]);
mat4.translate(mMatrix,[0.0,0,-1/rat]);
mat4.translate(mMatrix,[0.58/rat,0,0]);
mat4.scale(mMatrix,[0.58,0.1,0.1]);
mat4.multiply(vmatrix,mMatrix,mvMatrix);
redraw(mvMatrix);


c  = cube(col = [1,0,0,0.8]);
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

c  = cube(col = [1,0,0,0.8]);
mMatrix = mat4.create();
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.translate(mMatrix,[0.0,0,-2/rat]);
mat4.translate(mMatrix,[2/rat,0,1.15/rat]);
mat4.scale(mMatrix,[1,0.1,0.1]);
mat4.multiply(vmatrix,mMatrix,mvMatrix);
redraw(mvMatrix);

//Handle

c  = cube(col = [1,0,0,0.8]);
mMatrix = mat4.create();
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix2,mMatrix)
mat4.translate(mMatrix,[0.0,0,-2/rat]);
mat4.rotate(mMatrix,3.14/2.5,[0,1,0]);
mat4.translate(mMatrix,[-0.7/rat,0,-0.9/rat]);
mat4.scale(mMatrix,[0.9,0.1,0.1]);
mat4.multiply(vmatrix,mMatrix,mvMatrix);
redraw(mvMatrix);


c  = cube(col = [1,0,0,0.8]);
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


for( var i=1;i<=6;i++){
c  = cube(col = [1,0,0,0.8]);
mMatrix = mat4.create();
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix3,mMatrix)
mat4.translate(mMatrix,[0.0,0,-2/rat]);
mat4.rotate(mMatrix,3.14/2,[0,0,1]);
mat4.translate(mMatrix,[0.1/rat,1.4/rat,1.15/rat]);
mat4.rotate(mMatrix,3.14/6,[1,0,0]);
mat4.multiply(mMatrix,rMatrix3,mMatrix);
mat4.rotate(mMatrix,0+i*3.14/6,[1,0,0])
mat4.scale(mMatrix,[0.1,0.5,0.5]);
mat4.multiply(vmatrix,mMatrix,mvMatrix);
redraw(mvMatrix);
}


for( var i=1;i<=6;i++){
c  = cube(col = [1,0,0,0.8]);
mMatrix = mat4.create();
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix3,mMatrix)
mat4.translate(mMatrix,[0.0,0,-2/rat]);
mat4.rotate(mMatrix,3.14/2,[0,0,1]);
mat4.translate(mMatrix,[0.1/rat,-2.9/rat,1.15/rat]);
mat4.rotate(mMatrix,3.14/6,[1,0,0]);
mat4.multiply(mMatrix,rMatrix3,mMatrix);
mat4.rotate(mMatrix,0+i*3.14/6,[1,0,0])
mat4.scale(mMatrix,[0.1,0.5,0.5]);
mat4.multiply(vmatrix,mMatrix,mvMatrix);
redraw(mvMatrix);
}

//Pedals

c  = cube(col = [1,0,0,0.8]);
mMatrix = mat4.create();
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.translate(mMatrix,[0.0,0,-2/rat]);
mat4.translate(mMatrix,[1/rat,0,1.2/rat]);
mat4.multiply(mMatrix,rMatrix4,mMatrix);
mat4.scale(mMatrix,[0.04,0.6,0.04]);
mat4.multiply(vmatrix,mMatrix,mvMatrix);
redraw(mvMatrix);


c  = cube(col = [1,0,0,0.8]);
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


c  = cube(col = [1,0,0,0.8]);
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

c  = cube(col = [1,0,0,0.8]);
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


c  = cube(col = [1,0,0,0.8]);
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


function redraw(mvMatrix){
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
	var n = 5;
	gl.enable(gl.DEPTH_TEST);
	rat =20;
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	drawFloor(n,vWorld);
	drawWorld(vWorld);
	rat =30;
	gl.viewport(gl.viewportWidth*0.7, gl.viewportHeight*0.7,gl.viewportWidth*.3, gl.viewportHeight*.3);
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


    function webGLStart() {
        var canvas = document.getElementById("lab2-canvas");
        initGL(canvas);
        initShaders();
        
	shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

	shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
        gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
	
	document.addEventListener('keydown', keyboardEvent, false);
	shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");


        gl.clearColor(1, 1, 1, 1);

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
