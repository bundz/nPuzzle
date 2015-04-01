var State = function (size) {
  this.size = size;
  this.initialize(size);
};

State.prototype.initialize = function () {
  
  this.matrix = new Array(this.size);
  var value = 1;
  
  for(var i = 0; i < this.size; i++) {
    
    this.matrix[i] = new Array(this.size);
    
    for(var j = 0; j < this.size; j++) {
     
      
      this.matrix[i][j] = value;
      
      if (j == this.size - 1 && i == this.size - 1) {
        this.matrix[i][j] = null; 
      }
      
      value++;
      
    }
    
  }
  
  this.empty = { x: this.size - 1, y: this.size - 1 }; 
  
};

State.prototype.swap = function (p1, p2) {
  
  var aux = this.matrix[p1.x][p1.y];
  
  this.matrix[p1.x][p1.y] = this.matrix[p2.x][p2.y];
  
  this.matrix[p2.x][p2.y] = aux;
  
  if (this.matrix[p1.x][p1.y] == null) {
    this.empty = { x: p1.x, y: p1.y };
  }
  
  if (this.matrix[p2.x][p2.y] == null) {
    this.empty = { x: p2.x, y: p2.y }; 
  }
  
};

State.prototype.clone = function () {
  var clone = new State(this.size);
  
  this.matrix.forEach(function (array, i) {
    
    array.forEach(function (item, j) {
      
      clone.matrix[i][j] = item;
      
    });
    
  });
  
  clone.empty = this.empty;
  
  return clone;
};

module.exports = State;