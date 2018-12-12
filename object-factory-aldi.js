
function ObjectFactory(GL,shader){
  var gl = GL
  this.gl = gl

  this.shaderProgram = shader.getShaderProgram()
  var shaderProgram = this.shaderProgram
  var hurufVertexPositionBuffer
  var hurufVertexColorBuffer
  var cubeVertexPositionBuffer
  var cubeVertexNormalBuffer
  var cubeTextureCoordBuffer
  var cubeVertexIndexBuffer
  
  function do2dRotation(matrix,degree,xCenter,yCenter,xColumnIndex,yColumnIndex,x_speed,y_speed){
    var cos_t = Math.cos(degree)
    var sin_t = Math.sin(degree)
    for(var i = 0; i < matrix.length; i+=3){
      var x = matrix[i+xColumnIndex] - xCenter
      var y = matrix[i+yColumnIndex] - yCenter
      matrix[i+xColumnIndex] = x*cos_t - y*sin_t + xCenter
      matrix[i+yColumnIndex] = x*sin_t + y*cos_t + yCenter
    }
    var sx = x_speed
    var sy = y_speed
    x_speed = sx*cos_t - sy*sin_t
    y_speed = sx*sin_t + sy*cos_t
  }
  
  function do3dTranslation(object){
    
    object.x+=object.x_speed
    object.y+=object.y_speed
    object.z+=object.z_speed
    for(var i=0;i<object.positions.length;i+=3){
      object.positions[i]+=object.x_speed
      object.positions[i+1]+=object.y_speed
      object.positions[i+2]+=object.z_speed
    }
  }
  
  function getRandomRangeNumber(lower,upper){
    return (Math.random() * (upper - lower) + lower)
  }

  function handleLoadedTexture(textures) {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
    // Sampler 1
    gl.bindTexture(gl.TEXTURE_2D, textures[0])
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textures[0].image)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
    // Sampler 2
    gl.bindTexture(gl.TEXTURE_2D, textures[1])
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textures[1].image)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    // Sampler 3
    gl.bindTexture(gl.TEXTURE_2D, textures[2])
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textures[2].image)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST)
    gl.generateMipmap(gl.TEXTURE_2D)

    gl.bindTexture(gl.TEXTURE_2D, null)
  }

  var crateTextures = Array()
  this.crateTextures = crateTextures
  function initTexture () {
    var crateImage = new Image()
    for (var i = 0; i < 3; i++) {
      var texture = gl.createTexture()
      texture.image = crateImage
      crateTextures.push(texture)
    }
    crateImage.onload = function () {
      handleLoadedTexture(crateTextures)
    }
    crateImage.src = 'Crate.jpg'
  }
  initTexture()

  function MakePosition(vertices, faces) {
    var result = []
    for (var i=0;i<faces.length;i++) {
        for(var j=0;j<faces[i].length;j++){
            result = result.concat(vertices[faces[i][j]])
        }
    }
    return result
  }

  var attrs = this
  var huruf = {
    positions:[],colors:[],
    x:0.0,y:0.0,z:0.0,
    x_speed:0.0,y_speed:0.0,z_speed:0.0,
    isClockWiseRotation:true,
    vec:[1,1,0]
  }
  var hurufVertices = [
    [-0.5,1.0,0.125],//A-0
    [-0.2,1.0,0.125],//C-1
    [-0.2,0.7,0.125],//E-2
    [0.25,0.8,0.125],//G-3
    [0.1,0.5,0.125],//I-4
    [0.5,0.35,0.125],//K-5
    [0.2,0.25,0.125],//M-6
    [0.5,-0.35,0.125],//L-7
    [0.2,-0.25,0.125],//N-8
    [0.25,-0.8,0.125],//H-9
    [0.1,-0.5,0.125],//J-10
    [-0.2,-1,0.125],//D-11
    [-0.2,-0.7,0.125],//F-12
    [-0.5,-1,0.125],//B-13 

    [-0.5,1.0,-0.125],//-A-14
    [-0.2,1.0,-0.125],//-C-15
    [-0.2,0.7,-0.125],//-E-16
    [0.25,0.8,-0.125],//-G-17
    [0.1,0.5,-0.125],//-I-18
    [0.5,0.35,-0.125],//-K-19
    [0.2,0.25,-0.125],//-M-20
    [0.5,-0.35,-0.125],//-L-21
    [0.2,-0.25,-0.125],//-N-22
    [0.25,-0.8,-0.125],//-H-23
    [0.1,-0.5,-0.125],//-J-24
    [-0.2,-1,-0.125],//-D-25
    [-0.2,-0.7,-0.125],//-F-26
    [-0.5,-1,-0.125],//-B-27  
  ]
  var hurufFaces = [
    //depan
    [0,1,11],
    [0,11,13],
    [1,2,4],
    [1,3,4],
    [3,4,6],
    [3,5,6],
    [5,6,7],
    [6,7,8],
    [7,8,9],
    [8,9,10],
    [9,10,11],
    [10,11,12],
    //belakang
    [14,15,25],
    [14,25,27],
    [15,16,18],
    [15,17,18],
    [17,18,20],
    [17,19,20],
    [19,20,21],
    [20,21,22],
    [21,22,23],
    [22,23,24],
    [23,24,25],
    [24,25,26],
    //samping luar
    [0,1,14],
    [1,14,15],
    [1,3,15],
    [3,15,17],
    [3,5,17],
    [5,17,19],
    [5,7,19],
    [7,19,21],
    [7,9,21],
    [9,21,23],
    [9,11,23],
    [11,23,25],
    [11,13,25],
    [13,25,27],
    [13,27,0],
    [27,0,14],
    //samping dalam
    //2,4,6,8,10,12|||16,18,20,22,24,26
    [2,4,16],
    [4,16,18],
    [4,6,18],
    [6,18,20],
    [6,8,20],
    [8,20,22],
    [8,10,22],
    [10,22,24],
    [10,12,24],
    [12,24,26],
    [12,26,2],
    [26,2,16]
  ]
  huruf.positions = MakePosition(hurufVertices,hurufFaces)
  huruf.x =-0.375       
  huruf.y = -0.125
  huruf.z = -1.1
  huruf.yRotation = 0

  huruf.updatePosition = function(){
    this.x+=this.x_speed
    this.y+=this.y_speed
    this.z+=this.z_speed
  }

  huruf.checkCollision = function(){
    var positions = this.positions
    for(var i=0;i<positions.length;i+=3){
      if(positions[i] <= -1.5 && this.x_speed < 0.0){
        this.isClockWiseRotation = !this.isClockWiseRotation
        return {collide:"left"}
      }
      else if(positions[i] >= 1.5 && this.x_speed > 0.0){
        this.isClockWiseRotation = !this.isClockWiseRotation
        return {collide:"right"}
      }
      else if(positions[i+1] <= -1.5 && this.y_speed < 0.0){
        this.isClockWiseRotation = !this.isClockWiseRotation
        return {collide:"bottom"}
      }
      else if(positions[i+1] >= 1.5 && this.y_speed > 0.0){
        this.isClockWiseRotation = !this.isClockWiseRotation
        return {collide:"top"}
      }
      else if(positions[i+2] <= -1.5 && this.z_speed < 0.0){
        this.isClockWiseRotation = !this.isClockWiseRotation
        return {collide:"back"}
      }
      else if(positions[i+2] >= 1.5 && this.z_speed > 0){
        this.isClockWiseRotation = !this.isClockWiseRotation
        return {collide:"front"}
      }
    }
    return {collide:"none"}
  }
  
  var cube = {positions:[],colors:[],x:0.0,y:0.0,z:0.0,x_speed:0.0,y_speed:0.0,z_speed:0.0,vec:[1.0,0.0,1.0]}

  huruf.x_speed = getRandomRangeNumber(-0.008,0.008)
  huruf.y_speed = getRandomRangeNumber(-0.008,0.008)
  huruf.z_speed = getRandomRangeNumber(-0.008,0.008)
  
  cube.positions = [
    //back
    -1.5,-1.5,-1.5,
    1.5,-1.5,-1.5,
    1.5,1.5,-1.5,
    -1.5,1.5,-1.5,
    //left
    -1.5,-1.5,1.5,
    -1.5,-1.5,-1.5,
    -1.5,1.5,-1.5,
    -1.5,1.5,1.5,
    //bottom
    1.5,-1.5,-1.5,
    1.5,-1.5,1.5,
    -1.5,-1.5,1.5,
    -1.5,-1.5,-1.5,
  ]
  cube.z = 0

  
  this.initBuffers = function() {
    hurufVertexPositionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, hurufVertexPositionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(huruf.positions), gl.STATIC_DRAW)
    hurufVertexPositionBuffer.itemSize = 3
    hurufVertexPositionBuffer.numItems = huruf.positions.length/3
    hurufVertexColorBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, hurufVertexColorBuffer)
    var warna = [
      [1.0, 0.9, 0.0, 0.8], // depan
      [1.0, 0.9, 0.0, 0.8], // belakang
      [1.0, 0.65, 0.0, 0.9], // samping luar
      [1.0, 0.5, 0.0, 1.0], // samping dalam
    ]
    // huruf.colors = [];
    // var color = warna[0];
    // for (var j=0; j < 12; j++) {
    //   huruf.colors = huruf.colors.concat(color);
    // }
    // var color = warna[1];
    // for (var j=0; j < 12; j++) {
    //     huruf.colors = huruf.colors.concat(color);
    // }
    // var color = warna[2];
    // for (var j=0; j < 16; j++) {
    //     huruf.colors = huruf.colors.concat(color);
    // }
    // var color = warna[3];
    // for (var j=0; j < 12; j++) {
    //     huruf.colors = huruf.colors.concat(color);
    // }
    huruf.colors = []
    for (var i=0; i < hurufVertexPositionBuffer.numItems; i++) {
      huruf.colors = huruf.colors.concat([1.0, 0.9, 0.0, 1.0])
    }
    hurufVertexColorBuffer.itemSize = 4
    hurufVertexColorBuffer.numItems = 18
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(huruf.colors), gl.STATIC_DRAW)
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, hurufVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0)


    // shaderManager = this.shaderManager.getAndSwitchShader('texture-shader')

    cubeVertexPositionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube.positions), gl.STATIC_DRAW)
    cubeVertexPositionBuffer.itemSize = 3
    cubeVertexPositionBuffer.numItems = cube.positions.length/3
    
    cubeTextureCoordBuffer = gl.createBuffer()

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeTextureCoordBuffer)
    var textureCoords = [
      // Front face
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      // Bottom face
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,
      1.0, 0.0,
      // Left face
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0
    ]
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW)
    cubeTextureCoordBuffer.itemSize = 2
    cubeTextureCoordBuffer.numItems = 12

    // Cube Indices
    cubeVertexIndexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer)
    var cubeVertexIndices = [
      0, 1, 2, 0, 2, 3,    // Front face
      4, 5, 6, 4, 6, 7,    // Back face
      8, 9, 10, 8, 10, 11  // Top face
    ]
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW)
    cubeVertexIndexBuffer.itemSize = 1
    cubeVertexIndexBuffer.numItems = 18


    // Cube Normals
    cubeVertexNormalBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexNormalBuffer)
    var vertexNormals = [
      // Left face
      -1.0, 0.0, 0.0,
      -1.0, 0.0, 0.0,
      -1.0, 0.0, 0.0,
      -1.0, 0.0, 0.0,
      
      // Bottom face
      0.0, -1.0, 0.0,
      0.0, -1.0, 0.0,
      0.0, -1.0, 0.0,
      0.0, -1.0, 0.0,
      
      // Back face
      0.0, 0.0, -1.0,
      0.0, 0.0, -1.0,
      0.0, 0.0, -1.0,
      0.0, 0.0, -1.0
    ]
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW)
    cubeVertexNormalBuffer.itemSize = 3
    cubeVertexNormalBuffer.numItems = vertexNormals.length/3

    attrs.hurufVertexPositionBuffer = hurufVertexPositionBuffer
    attrs.hurufVertexColorBuffer = hurufVertexColorBuffer

    attrs.cubeVertexPositionBuffer = cubeVertexPositionBuffer
    attrs.cubeTextureCoordBuffer = cubeTextureCoordBuffer
    attrs.cubeVertexIndexBuffer = cubeVertexIndexBuffer
    attrs.cubeVertexNormalBuffer = cubeVertexNormalBuffer

    attrs.huruf = huruf
    attrs.cube = cube
  }

  this.update = function(){

    var collision = huruf.checkCollision().collide
    if(collision != "none"){
      switch(collision){
        case "left":
        case "right":
          huruf.x_speed*=-1       
          break
        case "top":
        case "bottom":
          huruf.y_speed*=-1       
          break
        case "front":
        case "back":
          huruf.z_speed*=-1       
          break
      }
    }

    do3dTranslation(huruf)
    do2dRotation(huruf.positions,toRadians(
      huruf.isClockWiseRotation?1:-1
    ),huruf.x,huruf.z,0,2,huruf.x_speed,huruf.y_speed)
    huruf.yRotation+=huruf.isClockWiseRotation?1:-1
  }
}