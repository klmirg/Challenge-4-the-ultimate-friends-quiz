var counter = 60
var countdown = function() {
  console.log(counter);
  counter--;
  if(counter === 0) {
    alert("Times up!");
    clearInterval(startCountdown);
    return countdown;
  };
};

var startCountdown = setInterval(countdown, 1000);