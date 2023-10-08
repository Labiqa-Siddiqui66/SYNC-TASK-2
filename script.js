//Making an object for storing all the questions name "Question"
alert("This is a quiz application.It consists of 5 question, if you score 3 or more than 3 then declared as pass otherwise loss and only win when scored 5/5.")
let name=prompt("Enter your name:")
const Question = [
    {
        question: "Which animal has 3 hearts",
        answers: [
            { option: "Star fish", check: false },
            { option: "Octopuses", check: true },
            { option: "hag fish", check: false },
            { option: "whale", check: false },
        ]
    },
    {
        question: "How many noble gases in the periodic table",
        answers: [
            { option: "7", check: true },
            { option: "6", check: false },
            { option: "5", check: false },
            { option: "8", check: false },
        ]
    },
    {
        question: "What this symbol represent Sb",
        answers: [
            { option: "Sibium", check: false },
            { option: "Antimony", check: true },
            { option: "Tungsten", check: false },
            { option: "Tin", check: false },
        ]
    },
    {
        question: "Which planet has ring around it",
        answers: [
            { option: "Uranus", check: false },
            { option: "Neptune", check: false },
            { option: "Saturn", check: true },
            { option: "Venus", check: false },
        ]
    },
    {
        question: "The great Ibn al-Haytham was a Scientist and?",
        answers: [
            { option: "Physician and Mathematician", check: false },
            { option: "Chemist and Philosopher", check: false },
            { option: "Philosopher and Physician", check: false },
            { option: "Mathematician and Astronomer", check: true },
    ]
    }

]
const question = document.getElementById("q");
const button_to_answer = document.getElementById("ans_button");
const button_to_next = document.getElementById("next");

let current_question_index = 0;
let scoring = 0;
function play() {
    current_question_index = 0;
    scoring = 0;
    button_to_next.innerHTML = "Next";
    startQuiz();
}

function startQuiz() {
    ResetQuestion();
    let currentQuestion = Question[current_question_index];// contain entire first question and answer
    let question_no = current_question_index + 1;
    question.innerHTML = "Q" + question_no + ". " + currentQuestion.question;// contain only question using dot operator
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button"); //create a button tag and store it with the varible button
        button.innerHTML = answer.option; //button's text equals to option of the question
        button.classList.add("btn");// we give the class to button which is "btn" so now  itcontain the same styling
        button_to_answer.appendChild(button);// now we append the created button tag in to anwser_to_button
        if (answer.check){ // goes inside if the check is "true" from the answer
            button.dataset.check = answer.check;
        }
        button.addEventListener("click", checkAnswer)
    });
}
function ResetQuestion() {
    button_to_next.style.display = "none"; // style none of next buttob
    while (button_to_answer.firstChild) { // removing the above child starting named ans buttons
        button_to_answer.removeChild(button_to_answer.firstChild);
    }
}
function checkAnswer(e){
    const selectbtn = e.target;// contain the click button
    const Is_correct = selectbtn.dataset.check === "true"; // checking whether this button key means option is correct
    if (Is_correct) {
        selectbtn.classList.add("correct");// assigning the class correct
        scoring ++
    }
    else {
        selectbtn.classList.add("Incorrect");//assigning the class incorrect
    }
    // now we are identifying that which answer button is true
    Array.from(button_to_answer.children).forEach(button=>{
        if(button.dataset.check=="true"){ //looping through the options
            button.classList.add("correct"); //assigning the green color to  the correct answers after the user clicked it's option
        }
        button.disabled="true"; //disabling the button after one button is pressed
    });
    button_to_next.style.display="block";//showing the next button when user press his option to move to next question
}
function DisplayScore(){ //display the score
    ResetQuestion();  // reset the score and index
    if (scoring<=4 && scoring>=3){
        question.innerHTML= `Good ${name} you passed this quiz, scored ${scoring}/${Question.length}.`;  
        
    }
    else if( scoring==5){
        question.innerHTML=`Congrats ${name} ! you won , scored ${scoring}/${Question.length}.`;
    }
    else{
        question.innerHTML= `Unfortunately ${name} You loss thiis quiz, scored ${scoring}/${Question.length}.`;
    }
    button_to_next.innerHTML= "Play Again"; //next button text change to play Again
    button_to_next.style.display="block"; //showing the next button
}
function NextButton(){
    current_question_index++; //increment the index
    if(current_question_index<Question.length){
        startQuiz(); //displaying the question according to index
    }
    else{
        DisplayScore(); //if question end then display the score
    }
}
button_to_next.addEventListener("click",()=>{ // function when user click the next button
    if(current_question_index<Question.length){ //checking if the question remain to ask from index
        NextButton(); // calling the NextButton function if question remains
    }
    else{
        play(); //other reseting index and score to zero
    }
})
play();// calling the function "play"






