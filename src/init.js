$(document).ready(function(){
  window.absent = [];
  window.seated = [];
  window.unseated = [];
  window.names = [
    ["lauraw", "amyc", "ryanw", "allant", "jordano", "zachc"],
    ["garyy", "nirajv", "benv", "aaronn", "rodrigod", "michaels"],
    ["naomij", "livviel", "alexm", "johnk"],
    ["christianl", "alexh", "cynthiac", "laurak"],
    ["phongp", "cameronm", "derrickc", "danielo"],
    ["juanab", "michaelj", "natew", "taylorl"],
    ["michaelw", "kylec", "benh", "benh", "briang", "antons"],
    ["andrewn", "brandonb", "brianl", "sebc", "robertf", "yilinx"],
  ];

  $('body').append($('<div class="longComputerTable computerTable1"></div>'));
  $('body').append($('<div class="shortComputerTable computerTable2"></div>'));
  $('body').append($('<div class="shortComputerTable computerTable3"></div>'));
  $('body').append($('<div class="longComputerTable computerTable4"></div>'));

  for (var i = 0; i < names.length; i++) {
    for (var j = 0; j < names[i].length; j++) {
      var coder = new Coder($('body').height(), $('body').width()/2, (Math.random()*1000 + 300), names[i][j], i, j);
      absent.push(coder);
    }
  }

  var addCoder = function(array) {
    var randomIndex = Math.floor(array.length * Math.random());
    var currentCoder = array.splice(randomIndex, 1)[0];
    $('body').append(currentCoder.$node);
    currentCoder.step();
    currentCoder.moveToInitialChair();
    seated.push(currentCoder);
  }

  $(".addCoderButton").on("click", function(event){
    $('.music').get(0).load();
    // Make a coder with a random position
    if (absent.length > 0) {
      addCoder(absent);
    }
  });

  $(".addAllCodersButton").on("click", function(event){
    $('.music').get(0).load();
    // Make a coder with a random position
    if (absent.length > 0) {
      var addAbsentInterval = setInterval(function() {
        addCoder(absent);
        if (absent.length === 0) {
          clearInterval(addAbsentInterval);
        }
      }, 100);
    }
    if (unseated.length > 0) {
      var addUnseatedInterval = setInterval(function() {
        addCoder(unseated);
        if (unseated.length === 0) {
          clearInterval(addUnseatedInterval);
        }
      }, 100);
    }
  });

  $(".lineUpButton").on("click", function(event){
    $('.music').get(0).load();
    var present = seated.concat(unseated);
    present.forEach(function(coder, i){
      coder.lineUp(i, present.length);
    });
    seated.forEach(function(coder){
      unseated.push(coder);
    });
    seated = [];
  });

  $(".crazyButton").on("click", function(event){
    $('.music').get(0).play();
    // Do crazy things
  });

  var removeCoder = function(array){
    var randomIndex = Math.floor(array.length * Math.random());
    var currentCoder = array.splice(randomIndex, 1)[0];
    currentCoder.remove();
    absent.push(currentCoder);
    var isInUnseated = unseated.indexOf(currentCoder);
    if (isInUnseated !== -1) {
      unseated.splice(isInUnseated, 1);
    }
    var isInSeated = seated.indexOf(currentCoder);
    if (isInSeated !== -1) {
      seated.splice(isInSeated, 1);
    }
  }

  $(".removeCoderButton").on("click", function(event){
    $('.music').get(0).load();
    var present = seated.concat(unseated);
    if (present.length > 0) {
      removeCoder(present);
    }
  });

  $(".removeAllCodersButton").on("click", function(event){
    $('.music').get(0).load();
    if (seated.length > 0) {
      var removeSeatedInterval = setInterval(function() {
        removeCoder(seated);
        if (seated.length === 0) {
          clearInterval(removeSeatedInterval);
        }
      }, 100);
    }
    if (unseated.length > 0) {
      var removeUnseatedInterval = setInterval(function() {
        removeCoder(unseated);
        if (unseated.length === 0) {
          clearInterval(removeUnseatedInterval);
        }
      }, 100);
    }
  });

  // $(document).on("mouseover", ".coder", function(event){
  //   var id = $(this).attr('id');
  //   $(this).append('<div class="coderName">' + id + '</div>');
  // });

  // $(document).on("mouseout", ".coder", function(event){
  //   var id = $(this).attr('id');
  //   $(this).append('<span class="coderName">' + id + '</span>');
  // });

});

