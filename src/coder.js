var Coder = function(top, left, timeBetweenSteps, id, row, position){
  Dancer.call(this, top, left, timeBetweenSteps);
  this.$node.attr('id', id);
  this.$node.append('<img src="assets/' + id + '.png">');
  this.row = row;
  this.position = position;
  this.positionIncrement = this.getPositionIncrement();
  this.loc = this.locationCalc(this.row, this.position);
  this.rotationValue = 20;
  this.isNormal = true;
};

Coder.prototype = Object.create(Dancer.prototype);
Coder.prototype.constructor = Coder;

// Define dance step
Coder.prototype.step = function() {
  // if crazy, reset values to normal (have everyone sit) and rotationValues to 20
  Dancer.prototype.step.call(this);
  if (this.isNormal) {
    // this.$node.toggle();
    if (this.rotationValue > 0) {
      this.rotationValue -= 40;
    } else {
      this.rotationValue += 40;
    }
    this.$node.rotate({
      animateTo: this.rotationValue
    });
  } else {
    // make the dance for when going crazy
  }
};

Coder.prototype.toggle = function() {
  if (this.isNormal) {

  }
};

Coder.prototype.locationCalc = function(row, position) {
  var top = ((position*this.positionIncrement) + 4).toString()+'%';
  var left = ((row*10) + 13).toString()+'%';
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
    top: '85%'
  }).animate({
    left: this.loc.left
  }).animate({
    top: this.loc.top
  });
}

Coder.prototype.lineUp = function(index, n) {
  var left = ((index/n)*80+10).toString()+'%';
  this.$node.animate({
    top: '75%'
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