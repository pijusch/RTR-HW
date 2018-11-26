
/**Global Variables
**/

//sphere 0.07
//objects 0.035

var object_list = [];

var use_texture = 0; 
var use_dnd = 0;
var use_line = 0;
var add_light = 0;
var add_ambient = 0;
var cubemapTexture;
var image_num = 0;
var pottex = 0;
var potdif = 0;
var potlit = 0;
var that_shape = [0];
var image_set = [0,1,2,3];
var ball_x = 0
var ball_y = 0.1


max_objects = 5;


//Cube Map (loading images)

function initCubeMap() {
    cubemapTexture = gl.createTexture();
    cubemapTexture.i1 = new Image();
cubemapTexture.i2 = new Image();
cubemapTexture.i3 = new Image();
cubemapTexture.i4 = new Image();
cubemapTexture.i5 = new Image();
cubemapTexture.i6 = new Image();
    cubemapTexture.i1.onload = function() { handleCubemapTextureLoaded(cubemapTexture,1); }
cubemapTexture.i2.onload = function() { handleCubemapTextureLoaded(cubemapTexture,2); }
cubemapTexture.i3.onload = function() { handleCubemapTextureLoaded(cubemapTexture,3); }
cubemapTexture.i4.onload = function() { handleCubemapTextureLoaded(cubemapTexture,4); }
cubemapTexture.i5.onload = function() { handleCubemapTextureLoaded(cubemapTexture,5); }
cubemapTexture.i6.onload = function() { handleCubemapTextureLoaded(cubemapTexture,6); }
    cubemapTexture.i1.src = "./images/b3.jpg";
    cubemapTexture.i2.src = "./images/b4.jpg";
    cubemapTexture.i3.src = "./images/b5.jpg";
    cubemapTexture.i4.src = "./images/b2.jpg";
    cubemapTexture.i5.src = "./images/road.jpg";
    cubemapTexture.i6.src = "./images/sky.jpg";
}    
function handleCubemapTextureLoaded(texture, num) {
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.REPEAT); 
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_R, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR); 

	switch(num){
	case 1:    gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
		  texture.i1);
	break
        case 2: gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
		  texture.i2);
	break
case 3:    gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
		  texture.i3);
break
case 4:    gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
		  texture.i4);
break
case 5:    gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
		  texture.i5);
break
case 6:    gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
		  texture.i6);
break
}    
}



//Texture variables, each for 1 specific texture

var sampleTexture0;
var sampleTexture1;
var sampleTexture2;
var sampleTexture3;
var sampleTexture4;
var sampleTexture5;
var sampleTexture6;
var sampleTexture7;

var sampleTexture8;
var sampleTexture9;
var sampleTexture10;
var sampleTexture11;
var sampleTexture12;

var sampleTexture13;
var sampleTexture14;

function initTextures() {
	sampleTexture0 = gl.createTexture();
	sampleTexture0.image = new Image();
	sampleTexture0.image.onload = function() {handleTextureLoaded(sampleTexture0);}
	sampleTexture0.image.src = './images/1.jpg';

	sampleTexture1 = gl.createTexture();
	sampleTexture1.image = new Image();
	sampleTexture1.image.onload = function() {handleTextureLoaded(sampleTexture1);}
	sampleTexture1.image.src = './images/2.jpg';

	sampleTexture2 = gl.createTexture();
	sampleTexture2.image = new Image();
	sampleTexture2.image.onload = function() {handleTextureLoaded(sampleTexture2);}
	sampleTexture2.image.src = './images/3.jpg';

	sampleTexture3 = gl.createTexture();
	sampleTexture3.image = new Image();
	sampleTexture3.image.onload = function() {handleTextureLoaded(sampleTexture3);}
	sampleTexture3.image.src = './images/4.jpeg';

	sampleTexture4 = gl.createTexture();
	sampleTexture4.image = new Image();
	sampleTexture4.image.onload = function() {handleTextureLoaded(sampleTexture4);}
	sampleTexture4.image.src = './images/5.jpg';

	sampleTexture5 = gl.createTexture();
	sampleTexture5.image = new Image();
	sampleTexture5.image.onload = function() {handleTextureLoaded(sampleTexture5);}
	sampleTexture5.image.src = './images/6.jpg';

	sampleTexture6 = gl.createTexture();
	sampleTexture6.image = new Image();
	sampleTexture6.image.onload = function() {handleTextureLoaded(sampleTexture6);}
	sampleTexture6.image.src = './images/6.jpeg';

	sampleTexture7 = gl.createTexture();
	sampleTexture7.image = new Image();
	sampleTexture7.image.onload = function() {handleTextureLoaded(sampleTexture7);}
	sampleTexture7.image.src = './images/7.jpeg';

	sampleTexture8 = gl.createTexture();
	sampleTexture8.image = new Image();
	sampleTexture8.image.onload = function() {handleTextureLoaded(sampleTexture8);}
	sampleTexture8.image.src = './images/ob1.png';

	sampleTexture9 = gl.createTexture();
	sampleTexture9.image = new Image();
	sampleTexture9.image.onload = function() {handleTextureLoaded(sampleTexture9);}
	sampleTexture9.image.src = './images/ob2.png';

	sampleTexture10 = gl.createTexture();
	sampleTexture10.image = new Image();
	sampleTexture10.image.onload = function() {handleTextureLoaded(sampleTexture10);}
	sampleTexture10.image.src = './images/ob3.png';

	sampleTexture11 = gl.createTexture();
	sampleTexture11.image = new Image();
	sampleTexture11.image.onload = function() {handleTextureLoaded(sampleTexture11);}
	sampleTexture11.image.src = './images/ob4.png';

	sampleTexture12 = gl.createTexture();
	sampleTexture12.image = new Image();
	sampleTexture12.image.onload = function() {handleTextureLoaded(sampleTexture12);}
	sampleTexture12.image.src = './images/ob5.png';

	sampleTexture13 = gl.createTexture();
	sampleTexture13.image = new Image();
	sampleTexture13.image.onload = function() {handleTextureLoaded(sampleTexture13);}
	sampleTexture13.image.src = './images/floor.jpg';

	sampleTexture14 = gl.createTexture();
	sampleTexture14.image = new Image();
	sampleTexture14.image.onload = function() {handleTextureLoaded(sampleTexture14);}
	sampleTexture14.image.src = './images/top.jpg';
}

function handleTextureLoaded(texture) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.bindTexture(gl.TEXTURE_2D, null);
}




function rand(min,max){
	return Math.random() * (max - min) + min;
	}






var line_switch = 0
var back_color = [1,1,1,1]

 var mMatrix = mat4.create();  // model matrix
 var vMatrix = mat4.create(); // view matrix
 var pMatrix = mat4.create();  //projection matrix
 var nMatrix = mat4.create();  // normal matrix
 var v2wMatrix = mat4.create();

// set up the parameters for lighting 
  var light_ambient = [0,1,0,1]; 
  var light_diffuse = [.8,.8,.8,1];
  var light_specular = [1,1,1,1]; 
  var light_pos = [0,-1,0,1];   // eye space position 

  var mat_ambient = [0, 0, 0, 1]; 
  var mat_diffuse= [1, 0, 0, .1]; 
  var mat_specular = [.9, .9, .9,1]; 
  var mat_shine = [50]; 


var gl;
var shaderProgram;
var vertexPostionBuffer;
var vertexColorBuffer;
var vertexIndexBuffer;
var vertexNormalBuffer;
var vertexTextureCoordBuffer;
var eye = [-0.25,-1+.9,-0.2]
var point = [-0.25,0.6+.9,0]
var up = [0,1,0]




var World = mat4.lookAt(eye,point,up);
vMatrix = World
var vWorld = mat4.create();



//Global Translation Updates to control heirarchy
var cMatrix1 = mat4.create();
mat4.identity(cMatrix1);

//Global Rotation Updates to control heirarchy
var rMatrix1 = mat4.create();
mat4.identity(rMatrix1);


//Global Translation Updates to control heirarchy
var cMatrixb = mat4.create();
mat4.identity(cMatrixb);
mat4.translate(cMatrixb,[ball_x,ball_y,0])

//Global Rotation Updates to control heirarchy
var rMatrixb = mat4.create();
mat4.identity(rMatrixb);

var smRotate = mat4.create();
mat4.identity(smRotate);

var angle = 50; //view angle

var pMatrix = mat4.create();
mat4.perspective(angle,1,.1,10,pMatrix); //Projection Matrix
mat4.multiply(pMatrix,World,vWorld); // Clip View Transformation


function keyboardEvent(event){
	rat = 10
  if (event.keyCode == 87){	//Move Forward
	//eye[1]+=.1;
	//point[1]+=.1;
	if (ball_x<=1.85)
	ball_x+=0.5/rat
	mat4.identity(cMatrixb)
	mat4.translate(cMatrixb,[ball_x,ball_y,0])

  }
  else if (event.keyCode == 83){ //Move Backward
	//eye[1]-=.1;
	//point[1]-=.1;
	if (ball_x>=-.05)
	ball_x-=0.5/rat
	mat4.identity(cMatrixb)
	mat4.translate(cMatrixb,[ball_x,ball_y,0])
  }
  else if( event.keyCode == 53||event.keyCode == 54){ //Zoom in and out
	if(event.keyCode == 53) angle+=5;
	else angle-=5;
	mat4.perspective(angle,1,.1,10,pMatrix);
	mat4.multiply(pMatrix,World,vWorld);
  }
  else if (event.keyCode == 68){ //Move Right
		//eye[0]-=.1;
	//point[0]-=.1;
	if(ball_y<=.4)
	ball_y+=0.5/rat
		mat4.identity(cMatrixb)
	mat4.translate(cMatrixb,[ball_x,ball_y,0])
  }
  else if (event.keyCode == 65){	//Move left
	//eye[0]+=.1;
	//point[0]+=.1;
	if(ball_y>=.1)
	ball_y-=0.5/rat
	mat4.identity(cMatrixb)
	mat4.translate(cMatrixb,[ball_x,ball_y,0])

  }
  else if (event.keyCode == 55){  // Rotate
		mat4.rotate(rMatrix1,3.14/10,[0,0,1])
  }
else if (event.keyCode == 56){    // Rotate Opposite
	mat4.rotate(rMatrix1,-3.14/10,[0,0,1])
  }
  else if (event.keyCode == 57){  // Rotate
		mat4.rotate(rMatrix1,3.14/10,[0,1,0])
  }
else if (event.keyCode == 48){    // Rotate Opposite
	mat4.rotate(rMatrix1,-3.14/10,[1,0,0])
  }
else if (event.keyCode == 50){  // Camera Down
	eye[2]-=.1;
	point[2]-=.1;
  }
else if (event.keyCode ==49){   // Camera Up
	eye[2]+=.1;
	point[2]+=.1;
  }
else if (event.keyCode ==51){   // Sphere Back
	
  }
else if (event.keyCode ==52){   // Sphere Back
	
  }

  vMatrix = mat4.lookAt(eye,point,up);
  drawScene();
 }

 function initGL(canvas) { /** Gets Canvas **/
        try {
            gl = canvas.getContext("experimental-webgl");
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;
        } catch (e) {
        }
        if (!gl) {
            alert("Could not initialise WebGL, sorry :-(");
        }
    }



//HTML buttons

function buttonEvent(arg){ /** Handles Button Events **/
   button = arg;
   if( arg==0)	//
	{	if (pottex !=1)
		pottex = 1
		else
		pottex = 0
		image_set = [Math.ceil(Math.random()*10)%7,Math.ceil(Math.random()*10)%7,Math.ceil(Math.random()*10)%7,Math.ceil(Math.random()*10)%7]
	}
   else if(arg==1){
		if(pottex !=2)
	 	pottex = 2
		else pottex =0
	}
    else if (arg==2){
		potdif = !potdif
	}
    else if (arg == 3){
		potlit = !potlit
	}
    else if(arg == 4){
		alert(ball_x)
		alert(ball_y)
		alert(object_list[0][1][0])
		alert(object_list[0][1][1])
		use_dnd = !use_dnd
		use_line = !use_line
	}
    else if(arg == 5){
		that_shape = [Math.ceil(Math.random()*100)%3, Math.ceil(Math.random()*100)%10+1];
	}
   drawScene();
}


function setMatrixUniforms() {
        gl.uniformMatrix4fv(shaderProgram.mMatrixUniform, false, mMatrix);
        gl.uniformMatrix4fv(shaderProgram.vMatrixUniform, false, vMatrix);
        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
        gl.uniformMatrix4fv(shaderProgram.nMatrixUniform, false, nMatrix);
	gl.uniformMatrix4fv(shaderProgram.v2wMatrixUniform, false, v2wMatrix);
	
    }





//Calls all the drawing function with arguments


function drawfloor(trans,img){
	c = square()
	mat4.identity(mMatrix);
	mat4.multiply(mMatrix,cMatrix1,mMatrix)
	mat4.multiply(mMatrix,rMatrix1,mMatrix)
	mat4.translate(mMatrix,trans)
	mat4.translate(mMatrix,[.87,.25,.15])
	mat4.scale(mMatrix,[.2,.05,.1])
	use_texture = 1
	image_num = img
	redraw()
}

function drawWorld(){

for (var i=0;i<object_list.length;i++){
	drawobject(object_list[i][0],object_list[i][1],0,object_list[i][2])
}

drawfloor([0,0,0],13)
//drawfloor([0,0,-.55],14)

line_switch = 0
drawball([.3,.3,.3],[0,0,.065],0,1);
line_switch = 0


drawbuildings()

}

function drawobject(scal,trans,rotat,img){
c = draw3D([1],2,4)
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.translate(mMatrix,trans)
mat4.rotate(mMatrix,rotat,[0,0,1])
mat4.scale(mMatrix,scal)
mat4.scale(mMatrix,[.3,.3,.3])
use_texture = 1;
add_ambient = 0;
mat_diffuse = [1,1,0,1]
image_num = img;
add_light = 0;
redraw()
add_ambient = 0;
mat_diffuse= [1,0,0,.1]
}

function drawbuildings(){

drawbuilding([5.8,.4,7],[-.11,.24,0],3.14/2,1);
drawbuilding([5.8,.4,7],[-.11+2,.24,0],3.14/2,1);


drawbuilding([3,.4,7],[0,0,0],0,1);
drawbuilding([3,.4,7],[.25,0,0],0,2);
drawbuilding([3,.4,7],[.50,0,0],0,3);
drawbuilding([3,.4,7],[.75,0,0],0,4);
drawbuilding([3,.4,7],[1,0,0],0,5);
drawbuilding([3,.4,7],[1.25,0,0],0,6);
drawbuilding([3,.4,7],[1.50,0,0],0,7);
drawbuilding([3,.4,7],[1.75,0,0],0,0);


drawbuilding([3,.4,7],[0,0.5,0],0,1);
drawbuilding([3,.4,7],[.25,0.5,0],0,2);
drawbuilding([3,.4,7],[.50,0.5,0],0,3);
drawbuilding([3,.4,7],[.75,0.5,0],0,4);
drawbuilding([3,.4,7],[1,0.5,0],0,5);
drawbuilding([3,.4,7],[1.25,0.5,0],0,6);
drawbuilding([3,.4,7],[1.50,0.5,0],0,7);
drawbuilding([3,.4,7],[1.75,0.5,0],0,0);

}


function drawbuilding(scal,trans,rotat,img){
c = draw3D([1],2,4)
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.translate(mMatrix,trans)
mat4.rotate(mMatrix,rotat,[0,0,1])
mat4.scale(mMatrix,scal)
mat4.scale(mMatrix,[.3,.3,.3])
use_texture = 1;
add_ambient = 0;
mat_diffuse = [1,1,0,1]
image_num = img;
add_light = 0;
redraw()
add_ambient = 0;
mat_diffuse= [1,0,0,.1]
}


function drawball(scal,trans,rotat,img){
c = draw3D([0],4,8)
mat4.identity(mMatrix);
mat4.multiply(mMatrix,cMatrix1,mMatrix)
mat4.multiply(mMatrix,rMatrix1,mMatrix)
mat4.multiply(mMatrix,cMatrixb,mMatrix)
mat4.multiply(mMatrix,rMatrixb,mMatrix)
mat4.translate(mMatrix,trans)
mat4.rotate(mMatrix,rotat,[0,0,1])
mat4.scale(mMatrix,scal)
mat4.scale(mMatrix,[.3,.3,.3])
use_texture = 0;
add_ambient = 0;
mat_diffuse = [1,1,0,1]
image_num = img;
add_light = 0;
redraw()
add_ambient = 0;
mat_diffuse= [1,0,0,.1]
}



function redraw(){ //Buffer initiallization when objects are drawn
gl.uniform1i(shaderProgram.use_textureUniform, use_texture);
gl.uniform1i(shaderProgram.use_dndUniform, use_dnd);
gl.uniform1i(shaderProgram.add_ambientUniform, add_ambient);
gl.uniform1i(shaderProgram.add_lightUniform, add_light);

mat4.identity(nMatrix); 
nMatrix = mat4.multiply(nMatrix, vMatrix);
nMatrix = mat4.multiply(nMatrix, mMatrix); 	
nMatrix = mat4.inverse(nMatrix);
nMatrix = mat4.transpose(nMatrix);


mat4.identity(v2wMatrix);
v2wMatrix = mat4.multiply(v2wMatrix, vMatrix);     
v2wMatrix = mat4.transpose(v2wMatrix)

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

gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuffer);
gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, vertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

gl.bindBuffer(gl.ARRAY_BUFFER, vertexTextureCoordBuffer);
gl.vertexAttribPointer(shaderProgram.vertexTexCoordsAttribute, vertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

switch(image_num){
	case 0: texture2use = sampleTexture0;
	break
	case 1:texture2use = sampleTexture1;
	break
	case 2:texture2use = sampleTexture2;
	break
	case 3:texture2use = sampleTexture3;
	break
	case 4:texture2use = sampleTexture4;
	break
	case 5:texture2use = sampleTexture5;
	break
	case 6:texture2use = sampleTexture6;
	break
	case 7:texture2use = sampleTexture7;
	break
	case 8:texture2use = sampleTexture8;
	break
	case 9:texture2use = sampleTexture9;
	break
	case 10:texture2use = sampleTexture10;
	break
	case 11:texture2use = sampleTexture11;
	break
	case 12:texture2use = sampleTexture12;
	break
	case 13:texture2use = sampleTexture13;
	break
	case 14:texture2use = sampleTexture14;
	break
}
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer);
gl.activeTexture(gl.TEXTURE0);   // set texture unit 0 to use 
gl.bindTexture(gl.TEXTURE_2D, texture2use);    // bind the texture object to the texture unit 
gl.uniform1i(shaderProgram.textureUniform, 0);

gl.activeTexture(gl.TEXTURE1);   // set texture unit 1 to use 
gl.bindTexture(gl.TEXTURE_CUBE_MAP, cubemapTexture);    // bind the texture object to the texture unit 
gl.uniform1i(shaderProgram.cube_map_textureUniform, 1);   // pass the texture unit to the shader


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

	
	drawWorld();
    }


function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}


    function webGLStart() {  // First Call
        var canvas = document.getElementById("lab4-canvas");
        initGL(canvas);
        initShaders();
        
	shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

	shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
        gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

	shaderProgram.vertexTexCoordsAttribute = gl.getAttribLocation(shaderProgram, "aVertexTexCoords");
        gl.enableVertexAttribArray(shaderProgram.vertexTexCoordsAttribute);
	
	document.addEventListener('keydown', keyboardEvent, false);
	shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
	shaderProgram.mMatrixUniform = gl.getUniformLocation(shaderProgram, "uMMatrix");
        shaderProgram.vMatrixUniform = gl.getUniformLocation(shaderProgram, "uVMatrix");
	shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
	shaderProgram.nMatrixUniform = gl.getUniformLocation(shaderProgram, "uNMatrix");
	shaderProgram.v2wMatrixUniform = gl.getUniformLocation(shaderProgram, "uV2WMatrix");	

        shaderProgram.light_posUniform = gl.getUniformLocation(shaderProgram, "light_pos");
        shaderProgram.ambient_coefUniform = gl.getUniformLocation(shaderProgram, "ambient_coef");	
        shaderProgram.diffuse_coefUniform = gl.getUniformLocation(shaderProgram, "diffuse_coef");
        shaderProgram.specular_coefUniform = gl.getUniformLocation(shaderProgram, "specular_coef");
        shaderProgram.shininess_coefUniform = gl.getUniformLocation(shaderProgram, "mat_shininess");

        shaderProgram.light_ambientUniform = gl.getUniformLocation(shaderProgram, "light_ambient");	
        shaderProgram.light_diffuseUniform = gl.getUniformLocation(shaderProgram, "light_diffuse");
        shaderProgram.light_specularUniform = gl.getUniformLocation(shaderProgram, "light_specular");

	shaderProgram.textureUniform = gl.getUniformLocation(shaderProgram, "myTexture");
	shaderProgram.cube_map_textureUniform = gl.getUniformLocation(shaderProgram, "cubeMap");
	shaderProgram.use_textureUniform = gl.getUniformLocation(shaderProgram, "use_texture");
	shaderProgram.use_dndUniform = gl.getUniformLocation(shaderProgram, "use_dnd");
	shaderProgram.add_lightUniform = gl.getUniformLocation(shaderProgram, "add_light");
	shaderProgram.add_ambientUniform = gl.getUniformLocation(shaderProgram, "add_ambient");
	initTextures();
	alert('loaded the images');

	mat4.rotate(rMatrix1,3.14/1.8,[0,0,1])
	c = 0
	while(1){
	c+=1
	sleep(1).then(() => {
	continous()
	drawScene()
	})
		if(c==10000)
		break
	}
    }


    function continous(){
for(var i=0;i<object_list.length;i++){
		object_list[i][1][2]+=.001
	}

check();
add();
remove();
 }


function check(){
	for (var i=0;i<object_list.length;i++){
		if(object_list[i][1][2] >= 0){
			if (intersection(ball_x,ball_y,object_list[i][1][0],object_list[i][1][1],object_list[i][0]))
				alert('game over')
		}
	}
}

function intersection(bx,by,ox,oy,size){
return !( (bx+0.03 < ox-0.035*size[0]) || (bx-0.03 > ox+0.035*size[0]) ||  (by+0.03 < oy-0.035*size[1]) || (by-0.03 > oy+0.035*size[1]))


}

function add(){
	while(object_list.length < max_objects){
		object_list.push([[1,1,1],[rand(0,1.2),rand(.05,.4),rand(-.4,-.2)],8+Math.ceil(Math.random()*100)%5])
	}
}

function remove(){
	for (var i=0;i<object_list.length;i++){
		if (object_list[i][1][2] > 0.06){//0+.06){
			object_list = object_list.splice(0,i).concat(object_list.splice(i+1,object_list.length))
			remove()
		}
	}	
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
    vertexTextureCoordBuffer.itemSize = 2;
    vertexTextureCoordBuffer.numItems = textureCoords.length/2;
   }
