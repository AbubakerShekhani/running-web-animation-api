/* Background animations */
var sceneryFrames =   [
  { transform: 'translateX(100%)' },
  { transform: 'translateX(-100%)' }
];

let animationStarted = false;

var sceneryTimingBackground = {
  duration: 6000,
  iterations: Infinity
};

var sceneryTimingForeground = {
  duration: 6000,
  iterations: Infinity
};

var background1 = document.getElementById('background1');
var background2 = document.getElementById('background2');

var background1Movement = background1.animate(
sceneryFrames, sceneryTimingBackground);
background1Movement.currentTime = background1Movement.effect.timing.duration / 2;

var background2Movement = background2.animate(
sceneryFrames, sceneryTimingBackground);

var foreground1 = document.getElementById('foreground1');
var foreground2 = document.getElementById('foreground2');

var stopsonic = document.getElementById('stopsonic');



var foreground1Movement = foreground1.animate(
sceneryFrames, sceneryTimingForeground);
foreground1Movement.currentTime = foreground1Movement.effect.timing.duration / 2;

console.log(foreground1Movement);

var foreground2Movement = foreground2.animate(
sceneryFrames, sceneryTimingForeground);

var spriteFrames = [
  { transform: 'translateX(0)' },
  { transform: 'translateX(-100%)' }
];

var sonic_sprite = document.getElementById('sonic-abubaker-sprite');

var sonic_hedgehog = sonic_sprite.animate(
spriteFrames, {
  easing: 'steps(11, end)',
  duration: 800,
  playbackRate: 1,
  iterations: Infinity
});

sonic_hedgehog.playbackRate = 0;

/* Alice tires so easily!
  Every so many seconds, reduce their playback rate so they slow a little.
*/
var sceneries = [foreground1Movement, foreground2Movement, background1Movement, background2Movement];

var adjustBackgroundPlayback = function() {
  if (sonic_hedgehog.playbackRate < .8) {
    sceneries.forEach(function(anim) {
      anim.playbackRate = sonic_hedgehog.playbackRate/2 * -1;
    });
  } else if (sonic_hedgehog.playbackRate > 1.2) {
    sceneries.forEach(function(anim) {
      anim.playbackRate = sonic_hedgehog.playbackRate/2;
    });
  } else {
    sceneries.forEach(function(anim) {
      anim.playbackRate = 0;
    });
  }
}
adjustBackgroundPlayback();


/*
setInterval( function() {

  if (sonic_hedgehog.playbackRate > .4) {
    sonic_hedgehog.playbackRate *= .9;
  }
  adjustBackgroundPlayback();
}, 5000);
*/

let audioElem = document.getElementById("sonicsound");

async function playAudio() {
  try {
    await audioElem.play();

  } catch(err) {

  }
}

async function stopAudio() {
  let sonicsound = document.getElementById("sonicsound");
  try {
    console.log("Pausing Audio");
    await sonicsound.pause();
    sonicsound.currentTime = 0;
    sonicsound.src = sonicsound.src;

  } catch(err) {
    await sonicsound.pause();
  }
}

var goFaster = function() {
  let audioElem = document.getElementById("sonicsound");


  if (audioElem.paused && sonic_hedgehog.playbackRate > 0.1) {
    playAudio();
  }

  console.log("goFaster");

  if (animationStarted && sonic_hedgehog.playbackRate === 0)
  {
    sonic_hedgehog.playbackRate = 0.5;
  } else {
    sonic_hedgehog.playbackRate *= 1.2;

    adjustBackgroundPlayback();

    console.log(sonic_hedgehog.playbackRate);

  }

  animationStarted = true;



}

document.addEventListener("click", goFaster);
document.addEventListener("touchstart", goFaster);

stopsonic.addEventListener("click", function() {
  sonic_hedgehog.playbackRate = 0;
  animationStarted = false;

  sceneries.forEach(function(anim) {
    anim.playbackRate = 0;
  });

  console.log("Stopping Audio");
  stopAudio();


});

