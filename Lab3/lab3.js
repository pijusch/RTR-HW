/**Coordinates for hardcoding a cube adapted from this site - https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Creating_3D_objects_using_WebGL 

Vertices and Indices for Cube







/**Global Variables)
**/


 var mMatrix = mat4.create();  // model matrix
    var vMatrix = mat4.create(); // view matrix
    var pMatrix = mat4.create();  //projection matrix
    var nMatrix = mat4.create();  // normal matrix

// set up the parameters for lighting 
  var light_ambient = [1,0,0,1]; 
  var light_diffuse = [.8,.8,.8,1];
  var light_specular = [1,1,1,1]; 
  var light_pos = [0,0,0,1];   // eye space position 

  var mat_ambient = [0, 0, 0, 1]; 
  var mat_diffuse= [1, 1, 0, 1]; 
  var mat_specular = [.9, .9, .9,1]; 
  var mat_shine = [50]; 


var gl;
var rat; // scaling the model
var shaderProgram;
var vertexPostionBuffer;
var vertexColorBuffer;
var vertexIndexBuffer;
var vertexNormalBuffer;
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
vMatrix = World
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
		mat4.rotate(rMatrix1,3.14/100,[0,0,1])
  }
else if (event.keyCode == 56){    // Rotate Pedals
	mat4.rotate(rMatrix5,3.14/5,[0,1,0]);
  }
else if (event.keyCode == 57){ // Rotate Wheels
	mat4.rotate(rMatrix1,3.14/5,[1,0,0]);
  }
else if (event.keyCode == 50){  // Camera Down
		mat4.translate(cMatrix1,[0,0,.5/rat]);
	eye[2]+=0.1;
	point[2]+=0.1;
	World = mat4.lookAt(eye,point,up);
	mat4.perspective(angle,1,.1,10,pMatrix);
	mat4.multiply(pMatrix,World,vWorld);
  }
else if (event.keyCode ==49){   // Camera Up
		mat4.translate(cMatrix1,[0,0,-.5/rat]);
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
	


function setMatrixUniforms() {
        gl.uniformMatrix4fv(shaderProgram.mMatrixUniform, false, mMatrix);
        gl.uniformMatrix4fv(shaderProgram.vMatrixUniform, false, vMatrix);
        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
        gl.uniformMatrix4fv(shaderProgram.nMatrixUniform, false, nMatrix);	
	
    }


function drawWorld(vmatrix){ // Cycle Model (not using stack for this assignment, since not asked in the question)

shape = [1,4]
c  = draw3D(shape,radius = 5, n = 10);

mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.scale(mMatrix,[0.2,0.2,0.2])
redraw();


}


function redraw(){ //Buffer initiallization when objects are drawn

mat4.identity(nMatrix); 
nMatrix = mat4.multiply(nMatrix, vMatrix);
nMatrix = mat4.multiply(nMatrix, mMatrix); 	
nMatrix = mat4.inverse(nMatrix);
nMatrix = mat4.transpose(nMatrix);

shaderProgram.light_posUniform = gl.getUniformLocation(shaderProgram, "light_pos");
gl.uniform4f(shaderProgram.light_posUniform,light_pos[0], light_pos[1], light_pos[2], light_pos[3]); 	
gl.uniform4f(shaderProgram.ambient_coefUniform, mat_ambient[0], mat_ambient[1], mat_ambient[2], 1.0); 
gl.uniform4f(shaderProgram.diffuse_coefUniform, mat_diffuse[0], mat_diffuse[1], mat_diffuse[2], 1.0); 
gl.uniform4f(shaderProgram.specular_coefUniform, mat_specular[0], mat_specular[1], mat_specular[2],1.0); 
gl.uniform1f(shaderProgram.shininess_coefUniform, mat_shine[0]); 

gl.uniform4f(shaderProgram.light_ambientUniform, light_ambient[0], light_ambient[1], light_ambient[2], 1.0); 
gl.uniform4f(shaderProgram.light_diffuseUniform, light_diffuse[0], light_diffuse[1], light_diffuse[2], 1.0); 
gl.uniform4f(shaderProgram.light_specularUniform, light_specular[0], light_specular[1], light_specular[2],1.0); 

setMatrixUniforms();

initBuffers()
gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, vertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuffer);
gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, vertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer);
gl.drawElements(gl.TRIANGLES, vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0); 					



/*indices = lindices
colors = lcolors
//rat = 1
initBuffers()
gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, vertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer);
gl.drawElements(gl.LINES, vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
//rat = 10

*/
}





    function drawScene() { /** Draws Scene **/
	gl.enable(gl.DEPTH_TEST);
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	drawWorld(vWorld);
    }



	 function rand(min,max){
	return Math.random() * (max - min) + min;
	}

    function webGLStart() {  // First Call
        var canvas = document.getElementById("lab3-canvas");
        initGL(canvas);
        initShaders();
        
	shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

	shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
        gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);

	shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
        gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);
	
	document.addEventListener('keydown', keyboardEvent, false);
	shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");

	shaderProgram.mMatrixUniform = gl.getUniformLocation(shaderProgram, "uMMatrix");
        shaderProgram.vMatrixUniform = gl.getUniformLocation(shaderProgram, "uVMatrix");
	shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
	shaderProgram.nMatrixUniform = gl.getUniformLocation(shaderProgram, "uNMatrix");	

        shaderProgram.light_posUniform = gl.getUniformLocation(shaderProgram, "light_pos");
        shaderProgram.ambient_coefUniform = gl.getUniformLocation(shaderProgram, "ambient_coef");	
        shaderProgram.diffuse_coefUniform = gl.getUniformLocation(shaderProgram, "diffuse_coef");
        shaderProgram.specular_coefUniform = gl.getUniformLocation(shaderProgram, "specular_coef");
        shaderProgram.shininess_coefUniform = gl.getUniformLocation(shaderProgram, "mat_shininess");

        shaderProgram.light_ambientUniform = gl.getUniformLocation(shaderProgram, "light_ambient");	
        shaderProgram.light_diffuseUniform = gl.getUniformLocation(shaderProgram, "light_diffuse");
        shaderProgram.light_specularUniform = gl.getUniformLocation(shaderProgram, "light_specular");
	

        gl.clearColor(70/255, 243/255, 243/255, 1);

        drawScene();
    }

   function initBuffers(){
    vertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    vertexPositionBuffer.itemSize = 3;
    vertexPositionBuffer.numItems = vertices.length/3;
    
    vertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    vertexColorBuffer.itemSize = 4;
    vertexColorBuffer.numItems = colors.length/4;

   vertexIndexBuffer = gl.createBuffer();
   gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer);
   gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
   vertexIndexBuffer.itemsize = 1;
   vertexIndexBuffer.numItems = indices.length;

   vertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
    vertexNormalBuffer.itemSize = 3;
    vertexNormalBuffer.numItems = normals.length/3;
   }
