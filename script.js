const startButton = document.getElementById('start-btn');
const questionElement = document.getElementById('question');
const description = document.getElementById('description');
const answersElement = document.getElementById('answers');
const statusElement = document.getElementById('status');
const lineElement =  document.getElementById('line');
const scoreElement = document.getElementById('scores');

let shuffledQuestion, currentQuestionIndex, flag; 

startButton.addEventListener('click', startQuiz);
var scoreCount;

function startQuiz(){
 scoreCount=0;
//  console.log('here');
 description.classList.add('hide'); // remove description
 startButton.classList.add('hide'); //remove start button
 shuffledQuestion = questions.sort(() => Math.random() - .5);
 currentQuestionIndex=0;
 answersElement.classList.remove('hide');//shows the answer choice
 setNextQuestion();   
}

function setNextQuestion(){
    resetState();
    showQuestion(shuffledQuestion[currentQuestionIndex]);
}

function showQuestion(question){
    questionElement.innerText = question.title;
    question.choices.forEach( choice =>{
        const button = document.createElement('button');
        button.innerText = choice;
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
        console.log(scoreCount);
    }else{
        statusElement.classList.remove('hide');
        lineElement.classList.remove('hide');
        statusElement.innerText = 'Wrong !';
        if (scoreCount==0) scoreCount=0;
        else scoreCount-=5;
        console.log(scoreCount);
    }
    scoreElement.innerText = 'Score: '+scoreCount;

    if (shuffledQuestion.length < currentQuestionIndex +1){
        startButton.innerText = 'Restart';
        questionElement.innerText = 'Coding Quiz Challenge';
        startButton.classList.remove('hide');
        description.classList.remove('hide');
        lineElement.classList.add('hide');
        statusElement.classList.add('hide');
    }

    setNextQuestion();
}
