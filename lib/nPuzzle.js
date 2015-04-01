var State = require("./state");

var nPuzzle = function (size) {
  this.state = new State(size);
};

nPuzzle.prototype.randomize = function (times) {
  
  var states;
  
  for(var i = 0; i < times; i++) {
    
    states = this.generatePossibleStates(this.state);
    
    this.state = states[Math.floor(Math.random() * states.length)];
    
  }
  
};

nPuzzle.prototype.isEndState = function (state) {
  var value = 1;
  
  for (var i = 0; i < state.size; i++) {
   
    for(var j = 0; j < state.size; j++) {
     
      if(i == state.size - 1 && j == state.size - 1) {
        return true;
      }
      
      if(state.matrix[i][j] != value) {
        return false; 
      }
      
      value++;
      
    }
    
  }
  
  return true;
  
};

nPuzzle.prototype.generatePossibleStates = function (state) {
    
  var possibleState = state.clone();
  
  var x = state.empty.x;
  var y = state.empty.y;
  var states = [];
  
  //left
  if (state.empty.y > 0) {
    possibleState.swap({ x: x, y: y }, { x: x, y: y - 1 });
    possibleState.movement = "l";
    states.push(possibleState);
    possibleState = state.clone();
  }
  
  //up
  if (state.empty.x > 0) {
    possibleState.swap({ x: x,  y: y }, { x: x - 1, y: y });
    possibleState.movement = "u";
    states.push(possibleState);
    possibleState = state.clone();
  }
  
  //right
  if (state.empty.y < state.size - 1) {
    possibleState.swap({ x: x,  y: y }, { x: x, y: y + 1 });
    possibleState.movement = "r";
    states.push(possibleState);
    possibleState = state.clone();
  }
  
  //down
  if (state.empty.x < state.size - 1) {
    possibleState.swap({ x: x,  y: y }, { x: x + 1, y: y });
    possibleState.movement = "d";
    states.push(possibleState);
  }
  
  return states;
  
};

nPuzzle.prototype.toString = function () {
  
  var str = "";
  var value;
  
  
  this.state.matrix.forEach(function (array) {
    
    str += "|"
    
    array.forEach(function (item) {
      
      value = item || " ";
            
      str += " " + value;
      
    });
    
    str += " |\n";
    
  });
  
  return str;
  
};

nPuzzle.prototype.hash = function (state) {
  
  var str = "";
  
  state.matrix.forEach(function (array) {
    
    array.forEach(function (item) {
      
      str += item;
      
    });
    
  });
  
  return str;
  
};

module.exports = nPuzzle;
