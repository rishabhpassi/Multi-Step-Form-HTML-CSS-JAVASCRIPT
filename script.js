// Define the color variables for light and dark theme
var lightBackground = '#FFFFFF';
var lightErrorColor = '#B00020';
var darkBackground = '#121212';
var darkErrorColor = '#CF6679';

// Get the dark mode switch element and a flag to track its state
var darkModeSwitch = document.querySelector('#Dark-Mode-Switch');
var darkModetoggleIsOn = false;

// Function to toggle the dark mode colors
function toggleDarkModeColors() {
  document.body.style.transition = 'color 1s, background-color 1s';

  // If dark mode is on, apply dark theme colors
  if (darkModetoggleIsOn) {
    document.documentElement.style.setProperty('--light-theme-background', darkBackground);
    document.getElementsByClassName("toggle-contents-wrapper")[0].style = "color:white;";

  // If dark mode is off, apply light theme colors
  } else {
    document.documentElement.style.setProperty('--light-theme-background', lightBackground);
    document.getElementsByClassName("toggle-contents-wrapper")[0].style = "color:hsl(213, 96%, 18%);";
  }
}

// Get all the card elements
var cards = document.querySelectorAll('.card');

// Store the selected user plan and its duration (monthly or yearly)
let userplan = "";
let userplanDurations = "Monthly plan";

// Get the yearly plan price elements and its unit (yr or mo)
var yearlyPlanPrice = document.getElementsByClassName("yearly-description");
var Yearlyoffer = document.querySelectorAll('.yearly-offer');
var yrunit = document.querySelectorAll('.yr');
let PlanPrice = "";

// Add click event listeners to all the card elements
for (var i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', function () {
    // Remove the selected class from the current selected card
    var currentCard = document.querySelector('.card.selected');
    if (currentCard) {
      currentCard.classList.remove('selected');
    }

    // Add the selected class to the clicked card
    this.classList.add('selected');

    // Store the selected plan name
    var cardName = this.dataset.name;
    userplan = cardName;

    // Store the selected plan price based on the duration (monthly or yearly)
    var planPrice = this.querySelector('.plan-description').textContent;
    if (userplanDurations == "Monthly plan") {
      var newNumber = planPrice.toString().replace(/0/g, '');
      PlanPrice = newNumber;
    } else {
      PlanPrice = planPrice;
    }
  });
}

// DARK MODE TOGGLE FUNCTIONALITY
darkModeSwitch.addEventListener('click', function () {
  if (darkModetoggleIsOn === false) {
    darkModeSwitch.style.justifyContent = 'flex-end';
    darkModetoggleIsOn = true;
    userplanDurations = "Yearly plan";
    for (var i = 0; i < Yearlyoffer.length; i++) {
      Yearlyoffer[i].style.visibility = "visible";
    }
    for (var i = 0; i < yearlyPlanPrice.length; i++) {
      yearlyPlanPrice[i].style.display = 'contents';
    }
    for (var i = 0; i < yrunit.length; i++) {
      yrunit[i].innerHTML = "yr";
    }

  } else {
    darkModeSwitch.style.justifyContent = 'flex-start';
    darkModetoggleIsOn = false;
    userplanDurations = "Monthly plan";
    for (var i = 0; i < Yearlyoffer.length; i++) {
      Yearlyoffer[i].style.visibility = "hidden";
    }
    for (var i = 0; i < yearlyPlanPrice.length; i++) {
      yearlyPlanPrice[i].style.display = 'none';
    }
    for (var i = 0; i < yrunit.length; i++) {
      yrunit[i].innerHTML = "mo";
    }
  }
  turnOnDarkModeColors();
  return darkModetoggleIsOn;
});

const formSteps = document.querySelectorAll('.form-step');

for (let i = 0; i < formSteps.length; i++) {
  formSteps[i].style.display = 'none';
}

let currentStep = 0;
formSteps[currentStep].style.display = 'block';

const stepIndicators = document.querySelectorAll('.step-indicator');
stepIndicators[currentStep].classList.add('active');
const nextBtn = document.querySelector('.next-step');
nextBtn.addEventListener('click', () => {
  if (currentStep === 2) {
    nextBtn.innerHTML = "Confirm";
  }
  if(currentStep == 3){
    nextBtn.style.display = "none";
    backBtn.style.display = "none"; 
    

  }
  if (currentStep === 0 && userplan == "") {
    nextBtn.disabled ? true : false;
    }

  var UserPlanSelected = document.getElementsByClassName('plan-selected')[0];
  UserPlanSelected.innerHTML = userplan ? `${userplan.charAt(0).toUpperCase() + userplan.slice(1)} (${userplanDurations})` : '';
  finalPlanPrice.innerHTML = PlanPrice;
  


  backBtn.style.visibility = 'visible';
  let valid = true;
  const inputs = form.querySelectorAll('input[required]');
  inputs.forEach(function (input) {
    if (!input.checkValidity()) {
      valid = false;
      input.style.border = '1px solid red';
    } else {
      input.style.border = '';
    }
  });

  if (valid) {

  } else {
    alert('Please fill out all required fields.');
    if (currentStep === 0) return;
  }
  if (currentStep === formSteps.length - 1) return;
  formSteps[currentStep].style.display = 'none';
  stepIndicators[currentStep].classList.remove('active');
  currentStep++;
  formSteps[currentStep].style.display = 'block';
  stepIndicators[currentStep].classList.add('active');
});

const backBtn = document.querySelector('.go-back-button');
backBtn.addEventListener('click', () => {
  if (currentStep === 0) return;
  nextBtn.innerHTML = "Next Step";
  formSteps[currentStep].style.display = 'none';
  stepIndicators[currentStep].classList.remove('active');
  currentStep--;
  formSteps[currentStep].style.display = 'block';
  stepIndicators[currentStep].classList.add('active');
});

const form = document.querySelector('.user-input');
var finalPlanPrice = document.getElementsByClassName('final-plan-price')[0];
var addfinal = document.getElementsByClassName('user-selected-add-ons')[0];

function checkAddOns() {
  let addOns = new Set();
  let addOnOptions = document.querySelectorAll('.opts');

  for (let option of addOnOptions) {
    let addOnInput = option.querySelector('input[type="checkbox"]');
    if (addOnInput.checked) {
      option.style.border = "1px solid blue";
      addOns.add(`${option.querySelector('h3').textContent} (${option.querySelector('.option-price').textContent})`);


    } else {
      option.style.border = "";
    }
  }

  if (addOns.size) {
    addfinal.innerHTML = "";
    let newDiv = document.createElement("div");
    addOns.forEach(addon => {
      let addonDiv = document.createElement("div");
      addonDiv.innerHTML = addon;
      addfinal.appendChild(addonDiv);
    });
  } else {
    addfinal.innerHTML = "No Addon Selected";
  }


  
}











