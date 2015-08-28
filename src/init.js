$(document).ready(function(){
  window.absent = [];
  window.seated = [];
  window.unseated = [];
  window.names = [
    ["lauraw", "amyc", "ryanw", "allant", "jordano", "zachs"],
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
      coder.step();
      absent.push(coder);
    }
  }

  var addCoder = function(array) {
    var randomIndex = Math.floor(array.length * Math.random());
    var currentCoder = array.splice(randomIndex, 1)[0];
    $('body').append(currentCoder.$node);

    // // Check if current state of the floor is crazy
    // var isNormal = true;
    // if (unseated.length > 0 && !unsteated[0].isNormal) {
    //   // isNormal = unsteated[0].isNormal;
    //   currentCoder.toggle();
    // }
    // if (!isNormal) {
    //   currentCoder.toggle();
    // }

    currentCoder.moveToInitialChair();
    seated.push(currentCoder);
  }

  $(".addCoderButton").on("click", function(event){
    $('.music').get(0).load();
    $(document).off("click", ".coder");
    // Make a coder with a random position
    if (absent.length > 0) {
      addCoder(absent);
    }
  });

  $(".addAllCodersButton").on("click", function(event){
    $('.music').get(0).load();
    $(document).off("click", ".coder");
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
    $(document).off("click", ".coder");
    var present = seated.concat(unseated);
    present.forEach(function(coder, i){
      coder.lineUp(i, present.length);
      // coder.toggle();
    });
    seated.forEach(function(coder){
      unseated.push(coder);
    });
    seated = [];

    // Animate Fred
    $('.fred').animate({left:'110%'}, 7000, function(){
      $('.fred').css({left:'-10%'});
    });
      
  });

  $(".crazyButton").on("click", function(event){
    $('.music').get(0).play();
    // Do crazy things
    var moveCoder = function(array, top, left) {
      var randomIndex = Math.floor(array.length * Math.random());
      var currentCoder = array.splice(randomIndex, 1)[0];
      currentCoder.moveToPosition(top, left, function() {
        // When everything is done, make everyone dies into absence
        var styleSettings = {
          top: '110%',
          left: '50%'
        };
        currentCoder.$node.css(styleSettings);
      });
      // Checks for undefined, for some reason, this is happening
      if(currentCoder){
        absent.push(currentCoder);
      }
    }

    $(document).on("click", ".coder", function(event){
      var id = $(this).attr('id');
      var present = seated.concat(unseated);
      var buggedCoderIndex = -1;
      present.forEach(function(coder, i) {
        if (coder.id === id) {
          buggedCoderIndex = i;
        }
      });
      var buggedCoder = present.splice(buggedCoderIndex, 1)[0];
      absent.push(buggedCoder);


      // Bring bugged head to the front
      $(this).css({
        'z-index':'9'
      });

      // Make bugged head bigger and then explode
      $(this).velocity({
        scale: '1000%',
        rotateZ: '360'
      }, 5000).velocity({
        scale: '10000%',
        opacity: 0
      }, 200).velocity({
        scale: '100%'
      }, 1, function() {
        $(this).css({
          opacity: 1,
          top: '110%',
          left: '50%'
        })
      }.bind(this));

      // Change the bugged coder back
        // Scale back down to original size
        // Set opacity to 1
        // Put it to the position top 110% and left 50%
        
      // Make other present heads go towards bugged head
      
      // Moves everyone to bugged head position
      if (present.length > 0) {
        var movePresentInterval = setInterval(function() {
          moveCoder(present, $(this).css('top'), $(this).css('left'));
          if (present.length === 0) {
            clearInterval(movePresentInterval);
          }
        }.bind(this), 100);
      }

      unseated = [];
      seated = [];

    });
  });


  var removeCoder = function(array){
    var randomIndex = Math.floor(array.length * Math.random());
    var currentCoder = array.splice(randomIndex, 1)[0];
    // if (currentCoder.isNormal === false) {
    //   currentCoder.toggle();
    // }
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
    $(document).off("click", ".coder");
    var present = seated.concat(unseated);
    if (present.length > 0) {
      removeCoder(present);
    }
  });

  $(".removeAllCodersButton").on("click", function(event){
    $('.music').get(0).load();
    $(document).off("click", ".coder");
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

  $(document).on("mouseover", ".coder", function(event){
    $(this).children('.coderName').show();
  });

  $(document).on("mouseout", ".coder", function(event){
    $(this).children('.coderName').hide();
  });

});

