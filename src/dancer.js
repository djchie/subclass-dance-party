var Dancer = function(top, left, timeBetweenSteps){
  // this.$node = $('<span class="coder"></span>');
  this.$node = $('<div class="coder"></div>');
  this.top = top;
  this.left = left;
  this.timeBetweenSteps = timeBetweenSteps;
  this.setPosition();
  // this.step();
};

Dancer.prototype.setPosition = function() {
  var styleSettings = {
    top: this.top,
    left: this.left
  };
  this.$node.css(styleSettings);
};

Dancer.prototype.step = function() {
  setTimeout(this.step.bind(this), this.timeBetweenSteps);
};

Dancer.prototype.crazy = function() {
  setTimeout(this.crazy.bind(this), this.timeBetweenSteps);
};