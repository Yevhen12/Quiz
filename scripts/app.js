const overlay = document.querySelector('.overlay')
const body = document.querySelector('body')

const indexQuestion = document.getElementById('ur-answer');
const amountQuestions = document.getElementById('all-questions');

const question = document.getElementById('question');

const answer1 = document.getElementById('op1');
      answer2 = document.getElementById('op2');
      answer3 = document.getElementById('op3');
      answer4 = document.getElementById('op4');

const answersAll = document.querySelectorAll('.option');

const btnNext = document.querySelector('.next');
const btnTryAgain = document.getElementById('try-again');

const modal = document.getElementById('modal');
const modalText = document.querySelector('.modal-text');

const circleList = document.getElementById('answer-list');


const DATA__ARRAY = [
    {
        question: "Who was first discovered America?",
        answers:
            [
                "Lys Yevhen",
                "Kolymb",
                "Una Matina",
                "Chao Chao"
            ],
        indexCorrectAnswer: 0,
        status: true,
    },
    {
        question: "When is my bth?",
        answers:
            [
                "2 September",
                "27 June",
                "1 April",
                "3 July"
            ],
        indexCorrectAnswer: 2,
        status: true,
    },
    {
        question: "My favourite country?",
        answers:
            [
                "America",
                "Russia",
                "Poland",
                "Ukraine"
            ],
        indexCorrectAnswer: 3,
        status: true,
    },
    {
        question: "My favourite dish?",
        answers:
            [
                "hot chocolate",
                "turkish pelmeni",
                "varenuku",
                "pelmeni"
            ],
        indexCorrectAnswer: 3,
        status: true,
    },
    {
        question: "My favourite town?",
        answers:
            [
                "Valorant",
                "Urkaine",
                "Lviv",
                "Odessa"
            ],
        indexCorrectAnswer: 2,
        status: true,
    },
]

const fillArray = () => {
    let arr = []
    for (let i = 0; i < DATA__ARRAY.length; i++) {
        if (DATA__ARRAY[i].status) {
            arr.push(i)
        }
    }
    return arr;
}

let arrayOfIndexes = fillArray();
let indexCurrentQuestion = 0;
let counterQuestions = 1;
let counterRigthQuestions = 0;

amountQuestions.textContent = DATA__ARRAY.length;
indexQuestion.textContent = counterQuestions;

const findQuestion = () => {
    let num = arrayOfIndexes[Math.floor(Math.random() * (arrayOfIndexes.length))];
    DATA__ARRAY[num].status = false;
    arrayOfIndexes = fillArray();

    return num;
}

const fillQuiz = () => {
    let currentIndex = findQuestion();
    indexCurrentQuestion = currentIndex;
    question.textContent = DATA__ARRAY[currentIndex].question;

    answer1.textContent = DATA__ARRAY[currentIndex].answers[0];
    answer2.textContent = DATA__ARRAY[currentIndex].answers[1];
    answer3.textContent = DATA__ARRAY[currentIndex].answers[2];
    answer4.textContent = DATA__ARRAY[currentIndex].answers[3];
}

window.addEventListener('load', () => {
    fillQuiz();
})


const checkAnswer2 = (el) => {
    console.log(el.target)
    const answer = el.target;
    let rigthAnswer = answersAll[DATA__ARRAY[indexCurrentQuestion].indexCorrectAnswer];
    let id = answer.id;
    let arrId = id.split('');
    let resultArray = [];
    arrId.forEach(elem => {
        elem = Number(elem) || undefined;
        if(typeof elem == "number"){
            resultArray.push(elem);
        }
    });
    let resultNum = resultArray.join() - 1;

    if(resultNum == DATA__ARRAY[indexCurrentQuestion].indexCorrectAnswer){
        answer.style.backgroundColor = 'rgba(0, 75, 75, 69)';
        answer.style.color = 'rgb(243, 219, 182)';
        answer.style.transition = ".5s";
        fillCircleGreen(counterQuestions - 1);
        counterRigthQuestions = counterRigthQuestions + 1;
    } else {
        answer.style.backgroundColor = 'rgb(79, 21, 21)';
        answer.style.color = 'rgb(243, 219, 182)';
        rigthAnswer.style.color = 'rgb(243, 219, 182)';
        rigthAnswer.style.backgroundColor = 'rgba(0, 75, 75, 69)';
        rigthAnswer.style.transition = ".5s";
        answer.style.transition = ".5s";
        fillCircleRed(counterQuestions - 1);
    }

    excludedAnswers();
}

const excludedAnswers = () => {
    answersAll.forEach((elem) => {
        elem.classList.toggle('excluded')
    })
}

for(let answer of answersAll){
    answer.addEventListener('click', (e) => {
        checkAnswer2(e);
    })
}

btnNext.addEventListener('click', () => {
    if(counterQuestions === DATA__ARRAY.length){
        tryAgain();
        return;
    }
    answersAll.forEach((elem) => {
        elem.style.backgroundColor = '';
        elem.style.color = '';
    })
    counterQuestions = counterQuestions + 1;
    indexQuestion.textContent = counterQuestions;

    fillQuiz();
    excludedAnswers()
  
})


const tryAgain = () => {
    overlay.style.display = 'block';
    modal.classList.add('active');
    let percentRigthAnswers = counterRigthQuestions / DATA__ARRAY.length * 100;
    if(percentRigthAnswers  < 25){
        modalText.textContent = `Oh fucking piece of shit, u answer rigth only ${counterRigthQuestions} / ${DATA__ARRAY.length}`;

    } else if (percentRigthAnswers >= 25 && percentRigthAnswers <= 50){
        modalText.textContent = `U so trash, but its not the worst accident: ${counterRigthQuestions} / ${DATA__ARRAY.length}`;

    } else if (percentRigthAnswers > 50 && percentRigthAnswers <= 75){
        modalText.textContent = `Not bad, fc idiot, but u can better: ${counterRigthQuestions} / ${DATA__ARRAY.length}`;
    } else {
        modalText.textContent = `Good job son of the bitch:  ${counterRigthQuestions} / ${DATA__ARRAY.length}`;
    }
    btnTryAgain.addEventListener('click', () => {
        window.location.reload();
    })
}

let arrayCircle = []

const createCircle = () => {
    for(let i = 0; i < DATA__ARRAY.length; i++){
        const smCircle = document.createElement('div');
        smCircle.classList.add('defaultCircle');
        circleList.appendChild(smCircle);
        arrayCircle.push(smCircle);
    }
}

const fillCircleGreen = (index) => {
    arrayCircle[index].style.backgroundColor = 'green';
    arrayCircle[index].style.transition = '.5s';
}
const fillCircleRed = (index) => {
    arrayCircle[index].style.backgroundColor = 'red';
    arrayCircle[index].style.transition = '.5s';
}

createCircle();




