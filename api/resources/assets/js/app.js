let languageNavigator = navigator.language || navigator.userLanguage;

// Change the language of the page
const changeLanguage = language => {
  let pageText;

  if (language === "nl" || language === "nl-BE") {
    pageText = nl_data
  } else if (language === "fr" || language === "fr-BE" || language === "fr-FR") {
    pageText = fr_data
  } else {
    pageText = en_data
  }

  // ----- Header -----
  document.getElementById("headerTitle").innerHTML = pageText.header.title
  document.getElementById("headerDescription").innerHTML = pageText.header.description
  document.getElementById("headerButtonRequestHelp").innerHTML = pageText.header.buttonRequestHelp
  document.getElementById("headerButtonProposeHelp").innerHTML = pageText.header.buttonProposeHelp
  // ----- Cards -----
  // --- senior ---
  document.getElementById("cardSeniorQuote").innerHTML = pageText.cards.senior.quote
  document.getElementById("cardSeniorTitle").innerHTML = pageText.cards.senior.title
  document.getElementById("cardsSeniorStepsStepOne").innerHTML = pageText.cards.senior.steps.stepOne
  document.getElementById("cardsSeniorStepsStepTwo").innerHTML = pageText.cards.senior.steps.stepTwo
  document.getElementById("cardsSeniorStepsStepThree").innerHTML = pageText.cards.senior.steps.stepThree
  document.getElementById("cardsSeniorButton").innerHTML = pageText.cards.senior.button
  // --- young ---
  document.getElementById("cardsYoungQuote").innerHTML = pageText.cards.young.quote
  document.getElementById("cardsYoungTitle").innerHTML = pageText.cards.young.title
  document.getElementById("cardsYoungSetpsStepOneTitle").innerHTML = pageText.cards.young.steps.stepOneTitle
  document.getElementById("cardsYoungSetpsStepOneText").innerHTML = pageText.cards.young.steps.stepOneText
  document.getElementById("cardsYoungSetpsStepTwoTitle").innerHTML = pageText.cards.young.steps.stepTwoTitle
  document.getElementById("cardsYoungSetpsStepOneText").innerHTML = pageText.cards.young.steps.stepTwoText
  document.getElementById("cardsYoungButton").innerHTML = pageText.cards.young.button

  // ----- team -----
  document.getElementById("teamTitle").innerHTML = pageText.team.title
  document.getElementById("teamDescription").innerHTML = pageText.team.description
}

changeLanguage(languageNavigator)