var Coder = function(top, left, timeBetweenSteps, id, row, position){
  Dancer.call(this, top, left, timeBetweenSteps);
  this.$node.attr('id', id);
  this.$node.append(id);
  this.row = row;
  this.position = position;
  this.positionIncrement = this.getPositionIncrement();
  this.loc = this.locationCalc(this.row, this.position);
};

Coder.prototype = Object.create(Dancer.prototype);
Coder.prototype.constructor = Coder;

// Coder.prototype.init(id, position) = function() {
//   Dancer.prototype.step.call(this);
//   // this.$node.toggle();
// };

Coder.prototype.locationCalc = function(row, position) {
  var top = ((position*this.positionIncrement) + 10).toString()+'%';
  var left = ((row*10) + 15).toString()+'%';
  return {
    top:top,
    left:left
  };
};

Coder.prototype.getPositionIncrement = function() {
  return (($('.computerTable1').height() / $('body').height()) / 6) * 100;
}

Coder.prototype.moveToInitialChair = function() {
  this.$node.animate({
    top: '95%'
  }).animate({
    left: this.loc.left
  }).animate({
    top: this.loc.top
  });
}

Coder.prototype.lineUp = function(index, n) {
  var left = ((index/n)*80+10).toString()+'%';
  this.$node.animate({
    top: '90%'
  }).animate({
    left: left
  });
};

Coder.prototype.remove = function() {
  this.$node.animate({
    top: '90%'
  }).animate({
    left: '50%'
  }).animate({
    top: '110%'
  });
};