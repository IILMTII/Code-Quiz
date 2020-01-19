const startButton = document.getElementById('start-btn');
const questionElement = document.getElementById('question');
const description = document.getElementById('description');
const answersElement = document.getElementById('answers');
const statusElement = document.getElementById('status');
const lineElement =  document.getElementById('line');
const scoreElement = document.getElementById('scores');
const timerElement = document.getElementById('timer');
const mainBody = document.getElementById('main');
const enterName = document.getElementsByClassName('form-group');
const nameButton = document.getElementById('name-btn');
const clearButton = document.getElementById('clear-btn');
const name = document.getElementById('name');
const newScoreList = document.getElementById('scoreList');
const highScoresButton = document.getElementById('highscores')

let shuffledQuestion, currentQuestionIndex, flag, qNumber; 

startButton.addEventListener('click', startQuiz);
nameButton.addEventListener('click', generateHighscores);
name.addEventListener('keyup', () => {console.log(name.value)});
clearButton.addEventListener('click', clearHighscores);
highScoresButton.addEventListener('click', generateHighscores);

var scoreCount, secondsLeft, score=0, timer, highScore;

function startQuiz(){
 scoreCount=0;
 secondsLeft=75;
//  console.log('here');
 description.classList.add('hide'); // remove description
 startButton.classList.add('hide'); //remove start button
 enterName[0].classList.add('hide');
 nameButton.classList.add('hide');
 clearButton.classList.add('hide');
 newScoreList.classList.add('hide');
 shuffledQuestion = questions.sort(() => Math.random() - .5);
 currentQuestionIndex=0;
 answersElement.classList.remove('hide');//shows the answer choice
 //mainBody.remove(mainBody.childNodes[1]);
 setTime();
 setNextQuestion();   
}

function setTime() {
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timerElement.textContent = 'Timer: '+secondsLeft;
  
      if(secondsLeft === 0 || (shuffledQuestion.length < currentQuestionIndex +1)) {   // resetting the time if the time reaches 0 or the question list is completed. 
        clearInterval(timerInterval);
      }

      if(secondsLeft === 0){
        resetFormat();
      }
  
    }, 1000);
  }

function setNextQuestion(){
    resetState();
    showQuestion(shuffledQuestion[currentQuestionIndex]);
}

function showQuestion(question){
    questionElement.innerText = question.title;
    qNumber=0;
    question.choices.forEach( choice =>{
        qNumber++;
        const button = document.createElement('button');
        button.innerText = qNumber+'. ' +choice;
        button.classList.add('choice');
        if (choice == question.answer){
            button.dataset.correct = true;
        }
        button.addEventListener('click', selectAnswer);
        answersElement.appendChild(button);
    });
    // console.log(question.title);
}

function resetState(){
    while(answersElement.firstChild){
        answersElement.removeChild(answersElement.firstChild);
    }
    lineElement.classList.add('hide');
    statusElement.classList.add('hide');
}

function setStatusClass( element, correct){
    clearStatusClass(element);
    if(correct){
        element.classList.add('correct');
        flag=true;
    }else{
        element.classList.add('wrong');
        flag=false;
    }
}

function clearStatusClass(element){
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function selectAnswer(event){
    const selectedButton= event.target;
    const correct = selectedButton.dataset.correct;
    currentQuestionIndex++;
     // setStatusClass()
     Array.from(answersElement.children).forEach(button =>{
        setStatusClass(button, correct);
    })

    if (flag){
        statusElement.classList.remove('hide');
        lineElement.classList.remove('hide');
        statusElement.innerText = 'Correct !';
        scoreCount+=5;
        //console.log(scoreCount);
    }else{
        statusElement.classList.remove('hide');
        lineElement.classList.remove('hide');
        statusElement.innerText = 'Wrong !';
        secondsLeft-=5;
        if (scoreCount==0) scoreCount=0;
        else scoreCount-=5;
        //console.log(scoreCount);
    }
    scoreElement.innerText = 'Score: '+scoreCount;

    if (shuffledQuestion.length >= currentQuestionIndex +1){
        setTimeout(setNextQuestion, 1000);
        score = scoreCount;                                         //capture score data
        //console.log(score);
    }else{
        score = scoreCount;                                        //capture score data
        //console.log(score);
        lineElement.classList.remove('hide');
        statusElement.classList.remove('hide');
        setTimeout(resetFormat, 1000);
    }
}

function resetFormat(){
    // secondsLeft = 75;
    startButton.innerText = 'Restart';
    scoreElement.innerText = 'Score: 0';
    timerElement.innerText = 'Timer: 75';
    questionElement.innerText = 'All Done !';
    startButton.classList.remove('hide');
    description.classList.remove('hide');
    lineElement.classList.add('hide');
    statusElement.classList.add('hide');
    enterName[0].classList.remove('hide');
    nameButton.classList.remove('hide');
    timer=secondsLeft;                                                //capture timer data
    console.log(timer);
    console.log(score);
    console.log(timer+score);                                         //capture high score
    highScore = timer+score;
    description.innerText = 'Your final score is: '+highScore;
    
    //displayHighscores(highScore);
    resetState();
}




const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
console.log(highScores);

function generateHighscores(){
    resetState();
    console.log('WIN !');
    questionElement.innerText = 'Top 5 Scores:';
    description.classList.add('hide');
    enterName[0].classList.add('hide');
    nameButton.classList.add('hide');
    clearButton.classList.remove('hide');
    newScoreList.classList.remove('hide');
    player=0;
    while (newScoreList.hasChildNodes()) {
        newScoreList.removeChild(newScoreList.lastChild);
    }
    const scores={
        score: highScore,
        name: name.value
    };
    console.log(scores);
    if(secondsLeft === 0 || (questions.length < currentQuestionIndex +1)) {   // resetting the time if the time reaches 0 or the question list is completed. 
        highScores.push(scores);
      }
    console.log(highScores);
    highScores.sort((a,b) => b.score-a.score);
    highScores.splice(5);
    localStorage.setItem('highScores',JSON.stringify(highScores));
    for (var player=0; player<=highScores.length-1; player++){
        var newH2 = document.createElement("li");
        var h2Text = document.createTextNode(highScores[player].name+": "+highScores[player].score);
        newH2.append(h2Text);
        // newScoreList.innerText = highScores[player].name+": "+highScores[player].score; 
        // mainBody.insertBefore(newH2,mainBody.childNodes[2]);
        newScoreList.appendChild(newH2);
    }
}

function clearHighscores(){
    var choose = confirm('Clear highscores on page refresh ?');
    if(choose){
    highScores.length=0;
    localStorage.clear();
    alert('Highscores list lost !');
    }
}
