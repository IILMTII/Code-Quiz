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
    showQuestion(shuffledQuestion[currentQuestionIndex]);
}

function showQuestion(question){
    questionElement.innerText = question.title;
    console.log(question.title);
}

function selectAnswer(){

}
