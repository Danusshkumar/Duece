//audio files
let winnerAudio = new Audio("winner.mp3");
let backgroundAudio = new Audio("background.mp3");
let snakeAudio = new Audio("snake.mp3");
let ladderAudio = new Audio("ladder.mp3");
let isOneEncounteredForFirstPlayer = false;
let isOneEncounteredForSecondPlayer = false;

// Script for layout designing

//required variables
let prevInner;
let leftVar = 100;


let boxNumber = 100;
let rowType = "even";

//required functions and scripts

function rowElementGenerator(){

  var rowElement = "";

  for(let i = 1;i<=10;i++){
  rowElement += "<div class = 'box' left : '" + leftVar + "px' top : '100px' >" + boxNumber + "</div>";
  leftVar+=100;

  if(rowType === "odd"){
    boxNumber++;
  }
  else if(rowType === "even"){
    boxNumber--;
  }

  }

  return rowElement;

}

function layoutDesigner(){

    for(let i = 10;i>=1;i--){
      
      prevInner = document.getElementsByClassName("gridLayout")[0].innerHTML;

      document.getElementsByClassName("gridLayout")[0].innerHTML = prevInner + rowElementGenerator() + "<br>";

      if(i%2 === 0){

        rowType = "odd";
        //if the current value is even then change it to odd
        
        boxNumber -=9;
        // it'll decreased by one already which is equated here. The original difference between two rows are 10.
      
      }
      else {
      
      rowType = "even";
      // if the current value is odd then change it to even

      boxNumber -=11;
      // it'll increased by one already which is equated here. The original difference between two rows are 10.
      
      }

    }
}

//variables for naming
let firstName = "player 1";
let secondName = "player 2";

//Script for snake and ladders

//required variables

let snakeEncounters = [98,64,66,33,86,73];
let snakesData = [
  {
    size : "long",
    step : 8,
    tailConfig : {
      rowType : "backward",
      boxNumber : 17,
      leftPosition : 1368,
      topPosition : 996
    }
  },
  {
    size : "medium",
    step : 4,
    tailConfig : {
      rowType : "forward",
      boxNumber : 27,
      leftPosition : 1710,
      topPosition : 882
    }
  },
  {
    size : "medium",
    step : 6,
    tailConfig : {
      rowType : "forward",
      boxNumber : 4,
      leftPosition : 1368,
      topPosition : 1110
    }
  },
  {
    size : "small",
    step : 3,
    tailConfig : {
      rowType : "forward",
      boxNumber : 6,
      leftPosition : 1596,
      topPosition : 1110
    }
  },
  {
    size : "small",
    step : 3,
    tailConfig : {
      rowType : "backward",
      boxNumber : 59,
      leftPosition : 1140,
      topPosition : 540
    }
  },
  {
    size : "small",
    step : 3,
    tailConfig : {
      rowType : "forward",
      boxNumber : 50,
      leftPosition : 2052,
      topPosition : 654
    }
  }
];

let ladderEncounters = [25,46,40,54,85,48];
let laddersData = [
  {
    size : "long",
    step : 6,
    topConfig : {
      rowType : "forward",
      boxNumber : 82,
      leftPosition : 1140,
      topPosition : 198
    }
  },
  {
    size : "medium",
    step : 3,
    topConfig : {
      rowType : "backward",
      boxNumber : 72,
      leftPosition : 1938,
      topPosition : 312
    }
  },
  {
    size : "medium",
    step : 3,
    topConfig : {
      rowType : "forward",
      boxNumber : 61,
      leftPosition : 1026,
      topPosition : 426
    }
  },
  {
    size : "small",
    step : 1,
    topConfig : {
      rowType : "forward",
      boxNumber : 65,
      leftPosition : 1482,
      topPosition : 426
    }
  },
  {
    size : "small",
    step : 1,
    topConfig : {
      rowType : "backward",
      boxNumber : 97,
      leftPosition : 1368,
      topPosition : 84
    }
  },
  {
    size : "small",
    step : 1,
    topConfig : {
      rowType : "backward",
      boxNumber : 51,
      leftPosition : 2056,
      topPosition : 540
    }
  }

];

//required scripts and functions 

function moveDownDueToSnake(tempCoinSelector,tempCurrentCoinPosition){

  let snakesDataIndexNumber = snakeEncounters.indexOf(tempCurrentCoinPosition);

  coinAttributes[tempCoinSelector].coinRowType = snakesData[snakesDataIndexNumber]["tailConfig"].rowType;
  coinAttributes[tempCoinSelector].currentCoinBoxNumber = snakesData[snakesDataIndexNumber]["tailConfig"].boxNumber;
  coinAttributes[tempCoinSelector].leftPosition = snakesData[snakesDataIndexNumber]["tailConfig"].leftPosition;
  coinAttributes[tempCoinSelector].topPosition = snakesData[snakesDataIndexNumber]["tailConfig"].topPosition;

  $(coinAttributes[tempCoinSelector].coinAccessClass).animate(
    {
      left : coinAttributes[tempCoinSelector].leftPosition,
      top : coinAttributes[tempCoinSelector].topPosition
    },1000);

}

function moveUpDueToLadder(tempCoinSelector,tempCurrentCoinPosition){

  let laddersDataIndexNumber = ladderEncounters.indexOf(tempCurrentCoinPosition);


  coinAttributes[tempCoinSelector].coinRowType = laddersData[laddersDataIndexNumber]["topConfig"].rowType;
  coinAttributes[tempCoinSelector].currentCoinBoxNumber = laddersData[laddersDataIndexNumber]["topConfig"].boxNumber;
  coinAttributes[tempCoinSelector].leftPosition = laddersData[laddersDataIndexNumber]["topConfig"].leftPosition;
  coinAttributes[tempCoinSelector].topPosition = laddersData[laddersDataIndexNumber]["topConfig"].topPosition;


  $(coinAttributes[tempCoinSelector].coinAccessClass).animate(
    {
      left : coinAttributes[tempCoinSelector].leftPosition,
      top : coinAttributes[tempCoinSelector].topPosition
    },1000
    );
}

function checkForSnakeAndLadders(tempCurrentCoinPosition,tempCoinSelector) {


  let isSnakeEncountered = snakeEncounters.includes(tempCurrentCoinPosition);
  let isLadderEncountered = ladderEncounters.includes(tempCurrentCoinPosition);

  // isSnakeEncountered = true;
  // tempCurrentCoinPosition = 86;
  // isLadderEncountered = true;


  if(isSnakeEncountered){
    
    snakeAudio.play();

    setTimeout(() => {
      moveDownDueToSnake(tempCoinSelector,tempCurrentCoinPosition);
    },1000);

  }
  else if(isLadderEncountered){

    
    ladderAudio.play();

    setTimeout(() => {
      moveUpDueToLadder(tempCoinSelector,tempCurrentCoinPosition);
    },1000);
  }
}


//Script for Turn and execution controller 

//required variables
let globalOutcome;
let changeTheTurnForcefully = false;
let isMatchCompleted = false;
let coinSelector = 0;
let backwardCornerEncounter = false;
let forwardCornerEncounter = false;

//required functions and scripts

function changeTheTurn(){
  
  if(globalOutcome !== 6 || changeTheTurnForcefully ){

    if(coinSelector === coinAttributes.length - 1){
      coinSelector = 0;
    }
    else {
      coinSelector++;
    }

    statusDisplayAnimation();
  }

  //returning the flag changingTheTurnForceFully to false
  changeTheTurnForcefully = false;

}


//Script for Coins and movements


//required variables
let rightSideMovement = 0;
let leftSideMovement = 0;
let topMovement = 0;

//variables belongs to coins



var coinAttributes = [
  {
    coinRowType : "forward",
    currentCoinBoxNumber : 1,
    coinAccessClass : ".coin1",
    leftPosition :1026,
    topPosition : 1110
  },
  {
    coinRowType : "forward",
    currentCoinBoxNumber : 1,
    coinAccessClass : ".coin2",
    leftPosition :1026,
    topPosition : 1110
  }
];

//required functions and scripts

function forwardCornerCaseTypeMovement(stepsToBeMoved){
  coinAttributes[coinSelector].coinRowType = "backward";
  forwardCornerEncounter = true;

  // the important part goes here

  let finalStep = coinAttributes[coinSelector].leftPosition + stepsToBeMoved;

  let extraSteps = finalStep - coinMovement.cornerCoinPosition.lastBoxCoinPosition;
  // extra step of the outcome
  let extraStepToBeReversed = extraSteps - coinMovement.singleStepMovementDistance; // one step will be reduced
  // for upward movement

  //setting up the variables
  rightSideMovement = stepsToBeMoved - extraSteps;
  topMovement = coinMovement.singleStepMovementDistance;
  leftSideMovement = extraStepToBeReversed;
}

function backwardCornerCaseTypeMovement(stepsToBeMoved){
  coinAttributes[coinSelector].coinRowType = "forward";

  backwardCornerEncounter = true;

  // the important part goes here

  // extra step calculation

  let leftSideMovementCalculated = coinAttributes[coinSelector].leftPosition - coinMovement.cornerCoinPosition.firstBoxCoinPosition;
  let extraSteps = stepsToBeMoved - leftSideMovementCalculated;
  // let extraSteps =  coinAttributes[coinSelector].leftPosition - stepsToBeMoved;

  let extraStepToBeReversed = extraSteps - coinMovement.singleStepMovementDistance;


  leftSideMovement = leftSideMovementCalculated;
  topMovement = coinMovement.singleStepMovementDistance;
  rightSideMovement = extraStepToBeReversed;

}

function forwardTypeMovement(stepsToBeMoved){

  rightSideMovement = stepsToBeMoved;
  leftSideMovement = 0;
  topMovement = 0;

}

function backwardTypeMovement(stepsToBeMoved){

  rightSideMovement = 0;
  leftSideMovement = stepsToBeMoved;
  topMovement = 0;

}

function rowTypeDependentMovement(stepsToBeMoved){

  if(coinAttributes[coinSelector].coinRowType === "forward"){
    
    //evaluating corner cases
    let finalStep =  coinAttributes[coinSelector].leftPosition + stepsToBeMoved;
    let cornerCase = finalStep > coinMovement.cornerCoinPosition.lastBoxCoinPosition;

    if(cornerCase){

      forwardCornerCaseTypeMovement(stepsToBeMoved);
    }
    else {

      forwardTypeMovement(stepsToBeMoved);
    }

  }

  else if(coinAttributes[coinSelector].coinRowType === "backward"){

    //evaluating corner cases
    let finalStep = coinAttributes[coinSelector].leftPosition - stepsToBeMoved;
    let cornerCase = finalStep < coinMovement.cornerCoinPosition.firstBoxCoinPosition;
    if(cornerCase){

      backwardCornerCaseTypeMovement(stepsToBeMoved);
    }
    else {
      
      backwardTypeMovement(stepsToBeMoved);
    }

  }
  
}

function redrawCoins(outcome) {

  coinAttributes[coinSelector].currentCoinBoxNumber += outcome;

  // ( (totalWidth)/2 ==> 50 + padding => 4 + border => 1 + margin => 2 ) ==> 57
  // 57 * 2 ==> 114

  rowTypeDependentMovement(coinMovement.singleStepMovementDistance * outcome);
  //this will set the left, right and top movement to correnponding numbers
  

  //all the coins movement related functionalities get integrated with layout and css here and 
  // the animation goes here with jquery

  let updatedLeftPosition = coinAttributes[coinSelector].leftPosition + rightSideMovement;
  coinAttributes[coinSelector].leftPosition = updatedLeftPosition;

  let updatedTopPosition = coinAttributes[coinSelector].topPosition - topMovement;
  coinAttributes[coinSelector].topPosition = updatedTopPosition;

  let updatedLeftPositionLeftDir = coinAttributes[coinSelector].leftPosition - leftSideMovement;
  coinAttributes[coinSelector].leftPosition = updatedLeftPositionLeftDir;

  
  let tempCurrentCoinPosition = coinAttributes[coinSelector].currentCoinBoxNumber;
  let tempCoinSelector = coinSelector;

  $("#diceRoll").attr("disabled",true);
  $(coinAttributes[coinSelector].coinAccessClass).animate(
    {left : updatedLeftPositionLeftDir, top : updatedTopPosition},
    () => {
      $("#diceRoll").attr("disabled",false);
      checkForSnakeAndLadders(tempCurrentCoinPosition,tempCoinSelector);
    }
    );
}

let coinMovement = {

  singleStepMovementDistance : 114,

  cornerCoinPosition : {
    // total travel = 1026 + travel
    //travel = singleStepMovement * 9 ==> 1026
    lastBoxCoinPosition : 2052,
    firstBoxCoinPosition : 1026
  },

  coinsPosition : {
    /* leftPosition : 1000 + 26, top position : 104 * 10 + 50 + (10 * 2)*/
    leftPosition :1026,
    topPosition : 1110
  },
};


//Script for end animation

//required variables


//required functions and scripts 

function endAnimation(){

  let winner;

  if(coinSelector === 0){
    winner = firstName;
  }
  else if(coinSelector === 1){
    winner = secondName;
  }

  winnerAudio.play();
  $(".winner").text(winner + " won the match");
  $("body > :not(.winner)").css("filter","blur(20px)");
  $(".winner").css("animation","winnerDisplacement 1s forwards, winnerDance 1s 1s infinite linear");

}

//Script for diceRollAnimation


//required variables
let isFirstTimeRollingDice = true;

//required scripts and functions

function diceRollAnimation(){

  if(isFirstTimeRollingDice){
    $(".diceSide1").css("transform","rotateY(90deg)");
  }
  isFirstTimeRollingDice = false;

  //clearing the final dice animation via the value stored in global outcome
  $(".diceSide"+globalOutcome).css("transition","0s");
  $(".diceSide"+globalOutcome).css("transform","rotateY(90deg)");

  //diceRollAnimation 

  let noOfRolls = Math.ceil(Math.random() * (10)) + 5;
  // returns the number between 5 and 15 (max-min) + min

  for(let i = 0;i<noOfRolls;i++){
    let animationNumberTemp = Math.ceil(Math.random() * 27);
    let diceNumberTemp = Math.ceil(Math.random() * 6);
    setTimeout(() => {
      $(".diceSide" + diceNumberTemp).css("animation","roll" + animationNumberTemp + " 0.2s");
    },i * 200);
  }

  //diceRollFinal
  let diceNumber = Math.ceil(Math.random() * 6);

  //check for one encountered
  if(coinSelector === 0 && diceNumber === 1){
    isOneEncounteredForFirstPlayer = true;
  }
  else if(coinSelector === 1 && diceNumber === 1){
    isOneEncounteredForSecondPlayer = true;
  }

  setTimeout(
    () => {
      $(".diceSide" + diceNumber).css("transform","rotateX(0deg) rotateY(0deg) rotateZ(0deg)");
      $(".diceSide" + diceNumber).css("transition","1.5s ease-out");
      setTimeout(() => {
        diceRollFunction(diceNumber);
      },1500);
    },
    noOfRolls*200
    );

    
    //disabling button for animation
    $("#diceRoll").attr("disabled",true);
    setTimeout(() => {
      $("#diceRoll").attr("disabled",false);
    },noOfRolls*200 + 1600);

    return diceNumber;

}



//Script for rolling dice

function diceRollFunction(diceNumber){

  // backgroundAudio.volume = 0.1;
  // backgroundAudio.play();

  //if one of the person wons the match then coins won't work further
  if(isMatchCompleted){
    return;
  }

  globalOutcome = diceNumber;

  //before redrawing coins we have to do some validation
  // the validation is that if the coin is at end with 2 steps balance the number 3 won't work
  if(diceNumber + coinAttributes[coinSelector].currentCoinBoxNumber <= 100){

      //redrawing coins based on the outcomes with checking whether one is encountered or not
      if(coinSelector === 0){
        if(isOneEncounteredForFirstPlayer){
          redrawCoins(diceNumber);
        }
      }
      else {
        if(isOneEncounteredForSecondPlayer){
          redrawCoins(diceNumber);
        }
      }

      

  }
  else {
    changeTheTurnForcefully = true;
  }


  if(coinAttributes[coinSelector].currentCoinBoxNumber === 100){
    isMatchCompleted = true;
    endAnimation();
  }


  //for changing the turn
  changeTheTurn();
}

//Script for status display animation

function statusDisplayAnimation(){

  $(".statusDisplay").animate({opacity : 0}, 500,() => {

    if(coinSelector === 0){
      $(".statusDisplay").text(firstName +" 's turn");
    }
    else {
    $(".statusDisplay").text(secondName + " 's turn");
    }

    $(".statusDisplay").animate({opacity : 1});
  });

  
}

//Calling required functions

function viewportCheck(){

  let msg = 
  "<body style = 'height : 100%; width : 100% ;'><div style = 'color : black; height : 100%; width : 100% ; font-family : consolas; margin : auto; " + 
   "line-height: 5rem; font-size: 3rem;"+ 
   "font- weight: 900;'>" +
    "Make sure that your view port is greater" + 
    "<br> than 2200px × 1100px in order to render the game." +
    "<br> Full screen mode is prefered." +
    "<br> Press ( Fn + F11 key ) or ( F11 key ) to enter into full screen mode" + 
    "<br> Best configuration : 2304px × 1294px with chrome zoom in 67% " +
    "<br> Refresh the page after resizing the browser" +
    "</div></body>";


  let height = $(window).height();
  let width = $(window).width();

  if(height < 1000 || width < 2000){
    $("body").css("backgroundColor","white");
    $("html").html(msg);
  }
  else {
      layoutDesigner();
  }
}

function closeNameAskingPopUp(name1,name2){
  $(".nameAskingPopUp").css("animation","popUpBoxReverse 3s");
  firstName = name1;
  secondName = name2;
  $(".statusDisplay").text(firstName +" 's turn");
}

// calling required functions

$(".closeMark").click(() => {
  
  backgroundAudio.volume = 0.2;
  for(let i = 0;i<10;i++){
    setTimeout(() => {
      backgroundAudio.play();
    },128000 * i);
  }

  closeNameAskingPopUp("player 1","player 2");
});

$(".nameSubmit").click(() => {

  backgroundAudio.volume = 0.2;
  for(let i = 0;i<10;i++){
    setTimeout(() => {
      backgroundAudio.play();
    },128000 * i);
  }

  let name1 =document.getElementsByTagName("input")[0].value;
  let name2 =document.getElementsByTagName("input")[1].value;
  if(name1 === ""){
    name1 = "player 1";
  }
  if(name2 === ""){
    name2 = "player 2";
  }

  closeNameAskingPopUp(name1,name2);

});

viewportCheck();
