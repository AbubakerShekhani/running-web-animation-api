/* Background animations */
var sceneryFrames =   [
  { transform: 'translateX(100%)' },
  { transform: 'translateX(-100%)' }
];

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

var foreground1Movement = foreground1.animate(
sceneryFrames, sceneryTimingForeground);
foreground1Movement.currentTime = foreground1Movement.effect.timing.duration / 2;

var foreground2Movement = foreground2.animate(
sceneryFrames, sceneryTimingForeground);

var spriteFrames = [
  { transform: 'translateX(0)' },
  { transform: 'translateX(-100%)' }
];

var sonic_sprite = document.getElementById('red-queen_and_alice_sprite');

var sonic_hedgehog = sonic_sprite.animate(
spriteFrames, {
  easing: 'steps(11, end)',
  /*direction: "reverse",*/
  duration: 500,
  playbackRate: 1,
  iterations: Infinity
});

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


/* If Alice and the Red Queen are running at a speed of 1, the background doesn't move. */
/* But if they fall under 1, the background slides backwards */

setInterval( function() {

  if (sonic_hedgehog.playbackRate > .4) {
    sonic_hedgehog.playbackRate *= .9;
  }
  adjustBackgroundPlayback();
}, 4000);


var goFaster = function() {
  sonic_hedgehog.playbackRate *= 1.2;
  adjustBackgroundPlayback();

  console.log(sonic_hedgehog.playbackRate);
}

document.addEventListener("click", goFaster);
document.addEventListener("touchstart", goFaster);