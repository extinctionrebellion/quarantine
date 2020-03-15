/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/assets/js/app.js":
/*!************************************!*\
  !*** ./resources/assets/js/app.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var languageNavigator = navigator.language || navigator.userLanguage; // Change the language of the page

var changeLanguage = function changeLanguage(language) {
  var pageText;

  if (language === "nl" || language === "nl-BE") {
    pageText = nl_data;
  } else if (language === "fr" || language === "fr-BE" || language === "fr-FR") {
    pageText = fr_data;
  } else {
    pageText = en_data;
  } // ----- Header -----


  document.getElementById("headerTitle").innerHTML = pageText.header.title;
  document.getElementById("headerDescription").innerHTML = pageText.header.description;
  document.getElementById("headerButtonRequestHelp").innerHTML = pageText.header.buttonRequestHelp;
  document.getElementById("headerButtonProposeHelp").innerHTML = pageText.header.buttonProposeHelp; // ----- Cards -----
  // --- senior ---

  document.getElementById("cardSeniorQuote").innerHTML = pageText.cards.senior.quote;
  document.getElementById("cardSeniorTitle").innerHTML = pageText.cards.senior.title;
  document.getElementById("cardsSeniorStepsStepOne").innerHTML = pageText.cards.senior.steps.stepOne;
  document.getElementById("cardsSeniorStepsStepTwo").innerHTML = pageText.cards.senior.steps.stepTwo;
  document.getElementById("cardsSeniorStepsStepThree").innerHTML = pageText.cards.senior.steps.stepThree;
  document.getElementById("cardsSeniorButton").innerHTML = pageText.cards.senior.button; // --- young ---

  document.getElementById("cardsYoungQuote").innerHTML = pageText.cards.young.quote;
  document.getElementById("cardsYoungTitle").innerHTML = pageText.cards.young.title;
  document.getElementById("cardsYoungSetpsStepOneTitle").innerHTML = pageText.cards.young.steps.stepOneTitle;
  document.getElementById("cardsYoungSetpsStepOneText").innerHTML = pageText.cards.young.steps.stepOneText;
  document.getElementById("cardsYoungSetpsStepTwoTitle").innerHTML = pageText.cards.young.steps.stepTwoTitle;
  document.getElementById("cardsYoungSetpsStepOneText").innerHTML = pageText.cards.young.steps.stepTwoText;
  document.getElementById("cardsYoungButton").innerHTML = pageText.cards.young.button; // ----- team -----

  document.getElementById("teamTitle").innerHTML = pageText.team.title;
  document.getElementById("teamDescription").innerHTML = pageText.team.description;
};

changeLanguage(languageNavigator);

/***/ }),

/***/ "./resources/assets/sass/app.scss":
/*!****************************************!*\
  !*** ./resources/assets/sass/app.scss ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!***************************************************************************!*\
  !*** multi ./resources/assets/js/app.js ./resources/assets/sass/app.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/monkeymonk/Works/quarantine/api/resources/assets/js/app.js */"./resources/assets/js/app.js");
module.exports = __webpack_require__(/*! /Users/monkeymonk/Works/quarantine/api/resources/assets/sass/app.scss */"./resources/assets/sass/app.scss");


/***/ })

/******/ });