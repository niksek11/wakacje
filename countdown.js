const weeks = document.getElementById("weeks");
const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

const waitTime = new Date("July 19, 2023 07:00:00");

let first = true; let isPlaying = false

function updateCountdownTime() {
  const currentTime = new Date();
  const diffTime = waitTime - currentTime;

  let d = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const h = Math.floor((diffTime / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diffTime / (1000 * 60)) % 60);
  const s = Math.floor((diffTime / 1000) % 60);

  days.innerHTML = d;
  hours.innerHTML = h;
  minutes.innerHTML = m;
  seconds.innerHTML = s;

  if (diffTime <= 0) {
    if (first) {
      const h2 = document.createElement("h2");
      const playButton = document.createElement("button");

      first = false;

    document.querySelectorAll("small, time, h1, h2").forEach(element => {
        element.remove();
      });

      h2.textContent = "Już lecimy!";
      h2.id = "endH2";

      playButton.id = "playButton";
      playButton.textContent = "Odpal radio!";
      
      document.body.appendChild(playButton);
      document.body.appendChild(h2);

      const audio = new Audio("wakacje.mp3");
      audio.loop = true;

      playButton.addEventListener("click", function() {
        if (isPlaying) {
          audio.pause();
          playButton.textContent = "Odpal muzyke!";
        } else {
          audio.play();
          playButton.textContent = "Wyłącz muzyke!";
        }
        
        isPlaying = !isPlaying;
      });
    }
  }
}

setInterval(updateCountdownTime, 1000);
