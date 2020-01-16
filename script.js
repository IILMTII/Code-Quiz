const startButton = document.getElementById('start-btn');
const questionElement = document.getElementById('question');
const description = document.getElementById('description');
const answersElement = document.getElementById('answers');
startButton.addEventListener('click', startQuiz);
let shuffledQuestion, currentQuestionIndex;

function startQuiz(){
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

function selectAnswer(e){
    const selectedButton= e.target;
    const correct = selectedButton.dataset.correct;
    
}
