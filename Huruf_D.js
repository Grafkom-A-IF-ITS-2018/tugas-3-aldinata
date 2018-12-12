
function huruf_D(depth, width, height, color = new Color("0xFFA500")) {
    Geometry.call(this);

    this.type = 'geometry';
    var w = width || 4;
    var h = height || 8;
    var d = depth || 1;

    this.vertices = [
        // depan 0-13
          -2.0, 4.0, 0.5,//A
          -0.8, 4.0, 0.5,//C
          -0.8, 2.8, 0.5,//E
          1.0, 3.2, 0.5,//G
          0.4, 2.0, 0.5,//I
          2.0, 1.4, 0.5,//K
          0.8, 1.0, 0.5,//M
          2.0, -1.4, 0.5,//L
          0.8, -1.0, 0.5,//N
          1.0, -3.2, 0.5,//H
          0.4, -2.0, 0.5,//J
          -0.8, -4.0, 0.5,//D
          -0.8, -2.8, 0.5,//F
          -2.0, -4.0, 0.5,//B

          // belakang 14-27
          -2.0, 4.0, -0.5,
          -0.8, 4.0, -0.5,
          -0.8, 2.8, -0.5,
          1.0, 3.2, -0.5,
          0.4, 2.0, -0.5,
          2.0, 1.4, -0.5,
          0.8, 1.0, -0.5,
          2.0, -1.4, -0.5,
          0.8, -1.0, -0.5,
          1.0, -3.2, -0.5,
          0.4, -2.0, -0.5,
          -0.8, -4.0, -0.5,
          -0.8, -2.8, -0.5,
          -2.0, -4.0, -0.5,

          // samping luar 28-43
          -2.0, 4.0, -0.5,
          -2.0, 4.0, 0.5,
          -0.8, 4.0, -0.5,
          -0.8, 4.0, 0.5,
          1.0, 3.2, -0.5,
          1.0, 3.2, 0.5,
          2.0, 1.4, -0.5,
          2.0, 1.4, 0.5,
          2.0, -1.4, -0.5,
          2.0, -1.4, 0.5,
          1.0, -3.2, -0.5,
          1.0, -3.2, 0.5,
          -0.8, -4.0, -0.5,
          -0.8, -4.0, 0.5,
          -2.0, -4.0, -0.5,
          -2.0, -4.0, 0.5,

          // samping dalam 44-55
          -0.8, 2.8, -0.5,
          -0.8, 2.8, 0.5,
          0.4, 2.0, -0.5,
          0.4, 2.0, 0.5,
          0.8, 1.0, -0.5,
          0.8, 1.0, 0.5,
          0.8, -1.0, -0.5,
          0.8, -1.0, 0.5,
          0.4, -2.0, -0.5,
          0.4, -2.0, 0.5,
          -0.8, -2.8, -0.5,
          -0.8, -2.8, 0.5 
    ];

    this.indices = [
        //depan
            0, 1, 13,   1, 13, 11,
            1, 2, 3,    2, 3, 4,
            3, 4, 5,    4, 5, 6,
            5, 6, 7,    6, 7, 8, 
            7, 8, 9,    8, 9, 10,
            9, 10, 11,  10, 11, 12,

            //belakang
            14, 15, 27,   15, 27, 25,
            15, 16, 17,   16, 17, 18,
            17, 18, 19,   18, 19, 20,
            19, 20, 21,   20, 21, 22,
            21, 22, 23,   22, 23, 24, 
            23, 24, 25,   24, 25, 26,

            //samping luar
            28, 29, 30,     29, 30, 31,
            30, 31, 32,     31, 32, 33, 
            32, 33, 34,     33, 34, 35,
            34, 35, 36,     35, 36, 37,
            36, 37, 38,     37, 38, 39,
            38, 39, 40,     39, 40, 41,
            40, 41, 42,     41, 42, 43,
            42, 43, 28,     43, 28, 29,

            //samping dalam
            44, 45, 46,     45, 46, 47,
            46, 47, 48,     47, 48, 49, 
            48, 49, 50,     49, 50, 51,
            50, 51, 52,     51, 52, 53,
            52, 53, 54,     53, 54, 55,
            54, 55, 44,     55, 44, 45
    ];
    this.position = [
        // depan 0-13
          [-2.0, 4.0, 0.5, 1],//A
          [-0.8, 4.0, 0.5, 1],//C
          [-0.8, 2.8, 0.5, 1],//E
          [1.0, 3.2, 0.5, 1],//G
          [0.4, 2.0, 0.5, 1],//I
          [2.0, 1.4, 0.5, 1],//K
          [0.8, 1.0, 0.5, 1],//M
          [2.0, -1.4, 0.5, 1],//L
          [0.8, -1.0, 0.5, 1],//N
          [1.0, -3.2, 0.5, 1],//H
          [0.4, -2.0, 0.5, 1],//J
          [-0.8, -4.0, 0.5, 1],//D
          [-0.8, -2.8, 0.5, 1],//F
          [-2.0, -4.0, 0.5, 1],//B

          // belakang 14-27
          [-2.0, 4.0, -0.5, 1],
          [-0.8, 4.0, -0.5, 1],
          [-0.8, 2.8, -0.5, 1],
          [1.0, 3.2, -0.5, 1],
          [0.4, 2.0, -0.5, 1],
          [2.0, 1.4, -0.5, 1],
          [0.8, 1.0, -0.5, 1],
          [2.0, -1.4, -0.5, 1],
          [0.8, -1.0, -0.5, 1],
          [1.0, -3.2, -0.5, 1],
          [0.4, -2.0, -0.5, 1],
          [-0.8, -4.0, -0.5, 1],
          [-0.8, -2.8, -0.5, 1],
          [-2.0, -4.0, -0.5, 1],

          // samping luar 28-43
          [-2.0, 4.0, -0.5, 1],
          [-2.0, 4.0, 0.5, 1],
          [-0.8, 4.0, -0.5, 1],
          [-0.8, 4.0, 0.5, 1],
          [1.0, 3.2, -0.5, 1],
          [1.0, 3.2, 0.5, 1],
          [2.0, 1.4, -0.5, 1],
          [2.0, 1.4, 0.5, 1],
          [2.0, -1.4, -0.5, 1],
          [2.0, -1.4, 0.5, 1],
          [1.0, -3.2, -0.5, 1],
          [1.0, -3.2, 0.5, 1],
          [-0.8, -4.0, -0.5, 1],
          [-0.8, -4.0, 0.5, 1],
          [-2.0, -4.0, -0.5, 1],
          [-2.0, -4.0, 0.5, 1],

          // samping dalam 44-55
          [-0.8, 2.8, -0.5, 1],
          [-0.8, 2.8, 0.5, 1],
          [0.4, 2.0, -0.5, 1],
          [0.4, 2.0, 0.5, 1],
          [0.8, 1.0, -0.5, 1],
          [0.8, 1.0, 0.5, 1],
          [0.8, -1.0, -0.5, 1],
          [0.8, -1.0, 0.5, 1],
          [0.4, -2.0, -0.5, 1],
          [0.4, -2.0, 0.5, 1],
          [-0.8, -2.8, -0.5, 1],
          [-0.8, -2.8, 0.5, 1] 
    ]
    this.vertices_ = Object.assign([], this.position);
    this.normals = [];
    this.textureCoord = [];
    for(let i = 0; i < this.vertices.length / 3; i++){
        this.textureCoord.push(0.0, 0.0);
    }
    for(let i = 0; i < this.vertices.length / 6; i++){
        this.normals.push(0.0, 0.0, 1.0);
    }
    for(let i = 0; i < this.vertices.length / 6; i++){
        this.normals.push(0.0, 1.0, 0.0);
    }
    this.colors = []
    for(let i = 0; i < this.vertices.length / 3; i++){
        this.colors.push(color.r / 255, color.g / 255, color.b/ 255, 1.0);
    }

    this.textureSrc = undefined; //'Crate.jpg';
}

huruf_D.prototype.constructor = huruf_D;

huruf_D.prototype.render = function() {
    this.temporaryMatrixWorld = Object.assign({}, this.matrixWorld);
    document.addEventListener(this.id, this.action.bind(this));
}

huruf_D.prototype.findCenter = function() {
    let center = [0, 0, 0];
    for(let i = 0; i < this.position.length / 2; i++){
        center[0] += this.position[i][0];
        center[1] += this.position[i][1];
        center[2] += this.position[i][2];
    }
    center[0] /= this.position.length / 2;
    center[1] /= this.position.length / 2;
    center[2] /= this.position.length / 2;
    return center;
}

huruf_D.prototype.action = function() {

}