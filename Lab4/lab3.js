/** Mouse code adapted from Prof. Shen's code

/**Global Variables
**/


var sampleTexture; 

function initTextures() {
    sampleTexture = gl.createTexture();
    sampleTexture.image = new Image();
    sampleTexture.image.onload = function() { handleTextureLoaded(sampleTexture); }
    sampleTexture.image.src = "brick.png";    
    console.log("loading texture....") 
}

function handleTextureLoaded(texture) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.bindTexture(gl.TEXTURE_2D, null);
}



var restrict = []
var danger = []



var prev_ndc = 1
var line_switch = 0
var back_color = [0/255, 255/255, 255/255, 1]

 var mMatrix = mat4.create();  // model matrix
 var vMatrix = mat4.create(); // view matrix
 var pMatrix = mat4.create();  //projection matrix
 var nMatrix = mat4.create();  // normal matrix

// set up the parameters for lighting 
  var light_ambient = [0,1,0,1]; 
  var light_diffuse = [.8,.8,.8,1];
  var light_specular = [1,1,1,1]; 
  var light_pos = [0,0,0,1];   // eye space position 

  var mat_ambient = [0, 0, 0, 1]; 
  var mat_diffuse= [1, 0, 0, 1]; 
  var mat_specular = [.9, .9, .9,1]; 
  var mat_shine = [50]; 

var y_ndc= 1

var gl;
var shaderProgram;
var vertexPostionBuffer;
var vertexColorBuffer;
var vertexIndexBuffer;
var vertexNormalBuffer;
var eye = [0,-1,-0.2]
var point = [0,0,0]
var up = [0,1,0]

//Tree variables: init_tree generates random variables for trees
var tree_num = 4;
var tree_cd = [];
var tree_sh = [];
var tree_3dsh = [];



var World = mat4.lookAt(eye,point,up);
vMatrix = World
var vWorld = mat4.create();



//Global Translation Updates to control heirarchy
var cMatrix1 = mat4.create();
mat4.identity(cMatrix1);

var cMatrixS = mat4.create();
mat4.identity(cMatrixS);


//Global Rotation Updates to control heirarchy
var rMatrix1 = mat4.create();
mat4.identity(rMatrix1);

var rMatrixS = mat4.create();
mat4.identity(rMatrixS);

var smRotate = mat4.create();
mat4.identity(smRotate);

var angle = 50; //view angle

var pMatrix = mat4.create();
mat4.perspective(angle,1,.1,10,pMatrix); //Projection Matrix
mat4.multiply(pMatrix,World,vWorld); // Clip View Transformation


function keyboardEvent(event){
	rat = 10
  if (event.keyCode == 87){	//Move Forward
	mat4.translate(cMatrix1,[0,-0.5/rat,0])

  }
  else if (event.keyCode == 83){ //Move Backward
	mat4.translate(cMatrix1,[0,0.5/rat,0])
  }
  else if( event.keyCode == 53||event.keyCode == 54){ //Zoom in and out
	if(event.keyCode == 53) angle+=5;
	else angle-=5;
	mat4.perspective(angle,1,.1,10,pMatrix);
	mat4.multiply(pMatrix,World,vWorld);
  }
  else if (event.keyCode == 68){ //Move Right
	mat4.translate(cMatrix1,[.5/rat,0,0]);
  }
  else if (event.keyCode == 65){	//Move left
	mat4.translate(cMatrix1,[-.5/rat,0,0]);

  }
  else if (event.keyCode == 55){  // Rotate
		mat4.rotate(rMatrix1,3.14/10,[0,0,1])
  }
else if (event.keyCode == 56){    // Rotate Opposite
	mat4.rotate(rMatrix1,-3.14/10,[0,0,1])
  }
else if (event.keyCode == 50){  // Camera Down
	mat4.translate(cMatrix1,[0,0,.5/rat]);
  }
else if (event.keyCode ==49){   // Camera Up
	mat4.translate(cMatrix1,[0,0,-.5/rat]);
  }
else if (event.keyCode ==75){   // Sphere front
	mat4.translate(cMatrixS,[0,-0.5/rat,0]);
	mat4.rotate(rMatrixS,3.14/3,[1,0,0]);
  }
else if (event.keyCode ==73){   // Sphere Back
	mat4.translate(cMatrixS,[0,0.5/rat,0]);
	mat4.rotate(rMatrixS,-3.14/3,[1,0,0]);
  }
else if (event.keyCode ==74){   // Sphere front
	mat4.translate(cMatrixS,[.5/rat,0,0]);
	mat4.rotate(rMatrixS,3.14/3,[0,1,0]);
  }
else if (event.keyCode ==76){   // Sphere Back
	mat4.translate(cMatrixS,[-0.5/rat,0,0]);
	mat4.rotate(rMatrixS,-3.14/3,[0,1,0]);
  }
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
   if( arg==0)	//
	{	
	 init_tree(-.3,.3)
	init_tree(-.3,-.3)
	init_tree(.3,.3)
	init_tree(.3,-.3)
	}
   else if(arg==1){
	line_switch = 1 - line_switch
	}
   drawScene();
}


function setMatrixUniforms() {
        gl.uniformMatrix4fv(shaderProgram.mMatrixUniform, false, mMatrix);
        gl.uniformMatrix4fv(shaderProgram.vMatrixUniform, false, vMatrix);
        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
        gl.uniformMatrix4fv(shaderProgram.nMatrixUniform, false, nMatrix);	
	
    }



function drawMoon(){

shape = [0]
c  = draw3D(shape,radius = 10, n = 20);
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.multiply(mMatrix,smRotate,mMatrix)
mat4.translate(mMatrix,[0,5,1.5])
mat4.scale(mMatrix,[.4,.4,.4])
light_ambient = [1,1,1,1]
mat_ambient = [1,1,1,1]
redraw();
mat_ambient = [0,0,0,1]


}


function drawSun(){

shape = [0]
c  = draw3D(shape,radius = 10, n = 20);
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.multiply(mMatrix,smRotate,mMatrix)
mat4.translate(mMatrix,[0,5,-1.5])
mat4.scale(mMatrix,[.4,.4,.4])
mat_diffuse = [255/255,100/255,0,1]
mat_ambient = mat_diffuse
light_ambient = [1,1,1,1]
mat_specular = [0,0,0,1]
redraw();
mat_specular = [0.9,0.9,0.9,1]
mat_ambient = [0,0,0,1]



}


function drawFloor(){

shape = [1,2]
c  = draw3D(shape,radius = 2, n = 4);
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.translate(mMatrix,[0,0,.06])
mat4.rotate(mMatrix,3.14/2,[1,0,0])
mat4.scale(mMatrix,[10,.1,10])
mat_ambient = [0,.2,0,1]
ligth_ambient = [.1,.1,.1,1]
mat_diffuse = [90/255,200/255,50/255,1]
redraw();
light_ambient = [0,0,0,1]


}


function drawTree(pos,shp,dshape){	//Draws one tree using random variables generated by init_tree()

light_specular = [0,1,0,1]

shape = [2,2]
c  = draw3D(shape,radius = 2, n = 4);
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.translate(mMatrix,[0,.1,.03])
mat4.translate(mMatrix,pos)
mat4.scale(mMatrix,[2,2,2])
mat4.scale(mMatrix,[0.01,0.01,0.06])
mat_diffuse = [120/255,100/255,100/255,1]
redraw();

shape = dshape
c  = draw3D(shape,radius = 4, n = 8);
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.translate(mMatrix,[0,.1,.025])
mat4.translate(mMatrix,[0,0,-.02])
mat4.translate(mMatrix,pos)
mat4.scale(mMatrix,[5,5,5])
mat4.scale(mMatrix,[0.01,0.01,0.01])
mat4.scale(mMatrix,shp)
if (dshape[0]==2)
 mat4.scale(mMatrix,[3,3,1])
mat_diffuse = [90/255,200/255,50/255,1]
redraw();

light_specular =[1,1,1,1]

}


function drawCastle(){


//Top Dome
shape = [2,5]
c  = draw3D(shape,radius = 5, n = 10);
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.translate(mMatrix,[0,.1,-.12])
mat4.scale(mMatrix,[1.7,1.7,.1])
mat_diffuse = [243/255,161/255,38/255,1]
redraw();


//Front Gate Top
shape = [1,1]
c  = draw3D(shape,radius = 2, n = 4);
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.translate(mMatrix,[0,0,-.06])
mat4.scale(mMatrix,[.1,.1,.1])
mat4.scale(mMatrix,[7,0.3,1.5])
mat_diffuse = [150/255,100/255,10/255,1]
redraw();


//Spikes
for (var i=1;i<4;i++){
shape = [2,3]
c  = draw3D(shape,radius = 4, n = 8);
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.translate(mMatrix,[i*.02,0,-.105])
mat4.scale(mMatrix,[.1,.1,.1])
mat4.scale(mMatrix,[1,.5,.5])
mat_diffuse = [250/255,0,10/255,1]
redraw();
}

for (var i=0;i<4;i++){
shape = [2,3]
c  = draw3D(shape,radius = 4, n = 8);
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.translate(mMatrix,[-i*.02,0,-.105])
mat4.scale(mMatrix,[.1,.1,.1])
mat4.scale(mMatrix,[1,.5,.5])
mat_diffuse = [250/255,0,10/255,1]
redraw();
}



//Front Gate Left
shape = [1,1]
c  = draw3D(shape,radius = 2, n = 4);
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.translate(mMatrix,[-.075,0,0])
mat4.scale(mMatrix,[.1,.1,.1])
mat4.scale(mMatrix,[3,0.3,4])
mat_diffuse = [150/255,100/255,10/255,1]
redraw();


//Front Gate Right
shape = [1,1]
c  = draw3D(shape,radius = 2, n = 4);
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.translate(mMatrix,[.075,0,0])
mat4.scale(mMatrix,[.1,.1,.1])
mat4.scale(mMatrix,[3,0.3,4])
redraw();



//Spikes
for (var i=1;i<4;i++){
shape = [2,3]
c  = draw3D(shape,radius = 4, n = 8);
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.translate(mMatrix,[i*.02,0.2,-.095])
mat4.scale(mMatrix,[.1,.1,.1])
mat4.scale(mMatrix,[1,.5,.5])
mat_diffuse = [250/255,0,10/255,1]
redraw();
}

for (var i=0;i<4;i++){
shape = [2,3]
c  = draw3D(shape,radius = 4, n = 8);
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.translate(mMatrix,[-i*.02,0.2,-.095])
mat4.scale(mMatrix,[.1,.1,.1])
mat4.scale(mMatrix,[1,.5,.5])
mat_diffuse = [250/255,0,10/255,1]
redraw();
}







//Wall
c  = draw3D(shape,radius = 2, n = 4);
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.translate(mMatrix,[-.075,0,0])
mat4.scale(mMatrix,[.1,.1,.1])
mat4.scale(mMatrix,[3,0.3,4])
mat_diffuse = [250/255,150/255,10/255,1]
redraw();


//Spikes
for (var i=1;i<4;i++){
shape = [2,3]
c  = draw3D(shape,radius = 4, n = 8);
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.translate(mMatrix,[-.1,0.1+0.02*i,-.095])
mat4.scale(mMatrix,[.1,.1,.1])
mat4.scale(mMatrix,[1,.5,.5])
mat_diffuse = [250/255,0,10/255,1]
redraw();
}

for (var i=0;i<4;i++){
shape = [2,3]
c  = draw3D(shape,radius = 4, n = 8);
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.translate(mMatrix,[-.1,0.1-0.02*i,-.095])
mat4.scale(mMatrix,[.1,.1,.1])
mat4.scale(mMatrix,[1,.5,.5])
mat_diffuse = [250/255,0,10/255,1]
redraw();
}




//Wall
shape = [1,1]
c  = draw3D(shape,radius = 2, n = 4);
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.translate(mMatrix,[0,.2,0])
mat4.scale(mMatrix,[.1,.1,.1])
mat4.scale(mMatrix,[7,0.3,4])
mat_diffuse = [250/255,150/255,10/255,1]
redraw();




//Wall
shape = [1,1]
c  = draw3D(shape,radius = 2, n = 4);
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.rotate(mMatrix,3.14/2,[0,0,1])
mat4.translate(mMatrix,[.1,.1,0])
mat4.scale(mMatrix,[.1,.1,.1])
mat4.scale(mMatrix,[7,.3,4])
redraw();

//Wall
shape = [1,1]
c  = draw3D(shape,radius = 2, n = 4);
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.rotate(mMatrix,3.14/2,[0,0,1])
mat4.translate(mMatrix,[.1,-.1,0])
mat4.scale(mMatrix,[.1,.1,.1])
mat4.scale(mMatrix,[7,.3,4])
redraw();


//Spikes
for (var i=1;i<4;i++){
shape = [2,3]
c  = draw3D(shape,radius = 4, n = 8);
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.translate(mMatrix,[.1,0.1+0.02*i,-.095])
mat4.scale(mMatrix,[.1,.1,.1])
mat4.scale(mMatrix,[1,.5,.5])
mat_diffuse = [250/255,0,10/255,1]
redraw();
}

for (var i=0;i<4;i++){
shape = [2,3]
c  = draw3D(shape,radius = 4, n = 8);
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.translate(mMatrix,[.1,0.1-0.02*i,-.095])
mat4.scale(mMatrix,[.1,.1,.1])
mat4.scale(mMatrix,[1,.5,.5])
mat_diffuse = [250/255,0,10/255,1]
redraw();
}




//Pillars

shape = [2,2]
c  = draw3D(shape,radius = 4, n = 8);
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.translate(mMatrix,[.1,0,-.15])
mat4.scale(mMatrix,[.1,.1,.1])
mat4.scale(mMatrix,[7,7,2])
mat_diffuse = [190/255,130/255,30/255,1]
redraw();


shape = [2,2]
c  = draw3D(shape,radius = 4, n = 8);
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.translate(mMatrix,[-.1,0,-.15])
mat4.scale(mMatrix,[.1,.1,.1])
mat4.scale(mMatrix,[7,7,2])
redraw();

shape = [2,2]
c  = draw3D(shape,radius = 4, n = 8);
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.translate(mMatrix,[.1,0.2,-.15])
mat4.scale(mMatrix,[.1,.1,.1])
mat4.scale(mMatrix,[7,7,2])
redraw();

shape = [2,2]
c  = draw3D(shape,radius = 4, n = 8);
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.translate(mMatrix,[-.1,.2,-.15])
mat4.scale(mMatrix,[.1,.1,.1])
mat4.scale(mMatrix,[7,7,2])
redraw();


shape = [1,1]
c  = draw3D(shape,radius = 4, n = 8);
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.translate(mMatrix,[.1,0,-.02])
mat4.scale(mMatrix,[.1,.1,.1])
mat4.scale(mMatrix,[1,1,2])
mat_diffuse = [120/255,80/255,10/255,1]
redraw();



shape = [1,1]
c  = draw3D(shape,radius = 4, n = 8);
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.translate(mMatrix,[-.1,0,-.02])
mat4.scale(mMatrix,[.1,.1,.1])
mat4.scale(mMatrix,[1,1,2])
redraw();




shape = [1,1]
c  = draw3D(shape,radius = 4, n = 8);
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.translate(mMatrix,[.1,0.2,-.02])
mat4.scale(mMatrix,[.1,.1,.1])
mat4.scale(mMatrix,[1,1,2])
redraw();


shape = [1,1]
c  = draw3D(shape,radius = 4, n = 8);
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.translate(mMatrix,[-.1,.2,-.02])
mat4.scale(mMatrix,[.1,.1,.1])
mat4.scale(mMatrix,[1,1,2])
redraw();

}



function drawMountains(){ //Uses Cones for Mountains (Three)

shape = [2,1]
c  = draw3D(shape,radius = 4, n = 8);
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.translate(mMatrix,[0,1,-.2])
mat4.translate(mMatrix,[-.1,.2,-.02])
mat4.scale(mMatrix,[10,5,1])
mat_specular = [.1,.1,.1,1]
mat_diffuse = [44/255,112/255,29/255,1]
redraw();


shape = [2,1]
c  = draw3D(shape,radius = 4, n = 8);
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.translate(mMatrix,[1,1,-.2])
mat4.translate(mMatrix,[-.1,.2,-.02])
mat4.scale(mMatrix,[8,5,1])
redraw();

shape = [2,1]
c  = draw3D(shape,radius = 4, n = 8);
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.translate(mMatrix,[-1,.7,-.2])
mat4.translate(mMatrix,[-.1,.2,-.02])
mat4.scale(mMatrix,[8,5,1])
redraw();

mat_specular  = [.9,.9,.9,1]
}


function drawWorld(){

//drawCastle()

//for (var i=0;i<tree_cd.length;i++){
//	drawTree([tree_cd[i*3+0],tree_cd[i*3+1],0],[tree_sh[i*3+0],tree_sh[i*3+1],tree_sh[i*3+2]],[tree_3dsh[i*2+0],tree_3dsh[i*2+1]])
//}

//drawMountains()
//if (y_ndc<0)
//	drawMoon()
//else
//	drawSun()



//drawFloor()


//shape =[0]

//c = draw3D(shape,radius=3,n = 6)
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.scale(mMatrix,[.1,.1,.1])
square()
redraw()
}


function zfunction(arg){
	
if (arg>0)
	return 1
else if(arg<0)
	return -1
else return 0

}

function ndc(x,min,max){

	return 2*(x-min)/(max-min)-1
}



function onDocumentMouseMove( event ) {

	
          var mouseX = event.clientX;
          var mouseY = event.clientY; 
	
/*	if(mouseX>gl.viewportWidth ||mouseY>gl.viewportHeight) return

	light_pos[0] = ndc(mouseX,0,gl.viewportWidth)
	y_ndc = -1*ndc(mouseY,0,gl.viewportHeight)
	light_pos[1] =  y_ndc
	back_color[1] = back_color[2] = (y_ndc+1.2)
	if (prev_ndc!=Math.floor(y_ndc*10)/10){
		prev_ndc = Math.floor(y_ndc*10)/10
		mat4.identity(smRotate)
	        mat4.rotate(smRotate,3.14*(prev_ndc-1)/2,[0,1,0])
	}


	  
          drawScene();*/
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

if (line_switch)
 indices = lindices

initBuffers()
gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuffer);
gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, vertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

//gl.bindBuffer(gl.ARRAY_BUFFER, teapotVertexTextureCoordBuffer);
//gl.vertexAttribPointer(shaderProgram.vertexTexCoordsAttribute, teapotVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer);

if (line_switch)
 gl.drawElements(gl.LINES, vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0); 					
else
gl.drawElements(gl.TRIANGLES, vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0); 					

}





    function drawScene() { /** Draws Scene **/
	gl.enable(gl.DEPTH_TEST);
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
	gl.clearColor(back_color[0],back_color[1],back_color[2],back_color[3])  //SKY
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	drawWorld(vWorld);
    }



	 function rand(min,max){
	return Math.random() * (max - min) + min;
	}

    function init_tree(x,y){
	for (var i=0;i<tree_num;i++){
		tree_cd = tree_cd.concat([x+rand(-2,2)/10,y+rand(-2,2)/10,0])
		tree_sh = tree_sh.concat([1,1,Math.random()+1])
		temp = Math.random()
		if (temp>0.5) temp = 0
		else	temp = 2
		temp2 = Math.abs(Math.random()*4)
		tree_3dsh = tree_3dsh.concat([temp,temp2])
        }
    }


    function webGLStart() {  // First Call
        var canvas = document.getElementById("lab3-canvas");
        initGL(canvas);
        init_tree(.3,.3);
	init_tree(-.3,-.3);
	init_tree(.3,-.3);
	init_tree(-.3,.3);
        initShaders();
        
	shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

	shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
        gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);
	
	document.addEventListener('keydown', keyboardEvent, false);
	document.addEventListener('mousemove', onDocumentMouseMove, false);
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

	shaderProgram.textureUniform = gl.getUniformLocation(shaderProgram, "myTexture");
        shaderProgram.use_textureUniform = gl.getUniformLocation(shaderProgram, "use_texture");

        drawScene();
    }

   function initBuffers(){
    vertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    vertexPositionBuffer.itemSize = 3;
    vertexPositionBuffer.numItems = vertices.length/3;
    

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

   vertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexTextureCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    vertexNormalBuffer.itemSize = 2;
    vertexNormalBuffer.numItems = normals.length/2;
   }
