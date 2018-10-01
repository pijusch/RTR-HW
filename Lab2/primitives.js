var vertices = []
var indices = []
var colors = []

function cube(col){ // Generates a cube at origin with given color
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
for (var i=0;i<24;i++) colors = colors.concat(col)


indices = [0,  1,  2,      0,  2,  3,  
    4,  5,  6,      4,  6,  7,    
    8,  9,  10,     8,  10, 11,   
    12, 13, 14,     12, 14, 15,   
    16, 17, 18,     16, 18, 19,   
    20, 21, 22,     20, 22, 23,
  ];


}

 function square(col){  // genrates a square at origin (no z component (0)) with given color
			// Plus added lighting effect
vertices = [
   -5.0,  -5.0, 0,
   -5.0,  5.0,  0,
    5.0,  5.0,  0,
    5.0,  -5.0, 0,
  
];	


colors = []


if (button!=1){
colors = colors.concat(col); colors = colors.concat(sqr[0]*0.7); //lighting effect using different transparency values
colors = colors.concat(col); colors = colors.concat(sqr[1]*.7);
colors = colors.concat(col); colors = colors.concat(sqr[2]*.7);
colors = colors.concat(col); colors = colors.concat(sqr[3]*.7);
}

else{
colors = colors.concat(col); colors = colors.concat(0.5+Math.random());
colors = colors.concat(col); colors = colors.concat(0.5+Math.random());
colors = colors.concat(col); colors = colors.concat(0.5+Math.random());
colors = colors.concat(col); colors = colors.concat(0.5+Math.random());
}

indices = [
    0,  1,  2, 0,  2,  3,
  ];

 }
