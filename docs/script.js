const startButton = document.querySelector(".startButton");
const submitButton = document.querySelector(".submitButton")
const timeDropdown = document.querySelector("#timeDropdown");
const partZero = document.querySelector(".gallery");
const partOne = document.querySelector(".partOne");
const partTwo = document.querySelector(".partTwo");
const partThree = document.querySelector(".partThree");
const leftColumn = document.querySelector(".helper");
const inputField = document.querySelector("#idea");
const multipleResponses = document.querySelector("#multiResponse");

let time = 0;
let timeLeft = time;
let responseLimit = 0;
let submitCount = 0;

function progressTimer(i) {
  document.getElementById("progressBar").value = time - timeLeft;
  if (timeLeft <= 0) {
    i();
    timeLeft = time;
  }
  timeLeft--;
};

startButton.addEventListener("click", () => {
  window.timerOne = setInterval(progressTimer, 1000, stepTwo);
  time = timeDropdown.value;
  timeLeft = time;
  responseLimit = multipleResponses.value;
  leftColumn.innerHTML =
    `<p class="subtitle">Jot down as many ideas as you can in <b>${time}</b> seconds!</p>`;
  if (responseLimit > 0) {
    leftColumn.innerHTML += `<p class="responseCount subtitle">Remaining responses: ${submitCount} / ${responseLimit}`;
  }
  leftColumn.innerHTML += `<progress value="0" max="${time}" id="progressBar"></progress>`;
  partZero.classList.add('hidden');
  partOne.classList.remove('hidden');
});

let ideaArray = [];
function submitIdea() {
  let e = window.event;
  if (responseLimit > 0) {
    document.querySelector('.responseCount').innerHTML = `<p class="subtitle">Remaining responses: ${submitCount} / ${responseLimit}`;
  }
  if (inputField.value.length > 0 && (e.key === "Enter" && !e.shiftKey || e.type === "click")) {
    submitCount++;
    if (responseLimit > 0) {
      document.querySelector('.responseCount').innerHTML = `<p class="subtitle">Remaining responses: ${submitCount} / ${responseLimit}`;
      if (submitCount >= responseLimit) {
        stepTwo();
      }
    }
    e.preventDefault();
    let idea = inputField.value;
    ideaArray.push(idea)
    inputField.value = "";
  }
}

submitButton.addEventListener("click", submitIdea);
inputField.addEventListener("keypress", submitIdea);

let winningIdeas = [];
function stepTwo() {
  clearInterval(window.timerOne);
  partOne.classList.add('hidden');
  partTwo.classList.remove('hidden');
  ideaArray.forEach((e) => {
    const node = document.querySelector(".idea");
    const clone = node.cloneNode(true);
    clone.classList.remove('hidden');
    clone.querySelector(".ideaText").innerHTML = e;
    const ideaText = clone.querySelector(".ideaText").innerHTML;
    const likeButton = clone.querySelector(".likeButton");
    likeButton.addEventListener("click", () => {
      const currentState = likeButton.querySelector(".material-symbols-outlined");
      if (currentState.innerHTML === "heart_plus") {
        currentState.innerHTML = "favorite";
        winningIdeas.push(e);
      }
      else {
        currentState.innerHTML = "heart_plus";
        const removeIndex = winningIdeas.findIndex((element) => element === ideaText);
        winningIdeas.splice(removeIndex, 1);
      }
    });
    document.querySelector(".partTwo").appendChild(clone);
  });
  leftColumn.innerHTML =
    `<p class="subtitle">Heart your favorite ideas in <b>${time}</b> seconds!</p>
    <progress value="0" max="${time}" id="progressBar"></progress>`;
  window.timerTwo = setInterval(progressTimer, 1000, stepThree);
}

function stepThree() {
  clearInterval(window.timerTwo);
  partTwo.classList.add('hidden');
  partThree.classList.remove('hidden');
  for (let i = 0; i < 3; i++) {
    if (winningIdeas[i] == null) {
      winningIdeas[i] = "?????";
    }
  }
  partThree.querySelector('.number1').innerHTML = `🥇 ${winningIdeas[0]}`;
  partThree.querySelector('.number2').innerHTML = `🥈 ${winningIdeas[1]}`;
  partThree.querySelector('.number3').innerHTML = `🥉 ${winningIdeas[2]}`;
  leftColumn.innerHTML =
    `<p class="subtitle">These ideas got the most votes!</p>
    <p class="subtitle">We feel more inspired already!</p>`
}