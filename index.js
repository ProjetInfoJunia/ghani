class Question{
  constructor(text,choices,answer,difficulty){
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.difficulty = difficulty;
  }
  isCorrectAnswer(choice){
    return choice == this.answer
  }
}



const questions = [
  new Question(
    "Quelle méthode Javascript permet de filtrer les éléments d'un tableau",
    ["indexOf()", "map()", "filter()", "reduce()"],
    "filter()"
  ),
  new Question(
    "Quelle méthode Javascript permet de vérifier si un élément figure dans un tableau",
    ["isNaN()", "includes()", "findIndex()", "isOdd()"],
    "includes()"
  ),
  new Question(
    "Quelle méthode transforme du JSON en un objet Javascript ?",
    ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.toJS"],
    "JSON.parse()"
  ),
  new Question(
    "Quel objet Javascript permet d'arrondir à l'entier le plus proche",
    ["Math.ceil()", "Math.floor()", "Math.round()", "Math.random()"],
    "Math.round()"
  ),
];

class Quizz{
  constructor(questions){
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
  }
  getCurrentQuestion(){
    return this.questions[this.currentQuestionIndex]
  }
  guess(answer){
    if(this.getCurrentQuestion().isCorrectAnswer(answer)){
      this.score++
    }
    this.currentQuestionIndex++
  }
  hasEnded(){
    return this.currentQuestionIndex >= this.questions.length
  }
}

const utils = {
  createQuestions: function(){
    
  }




}



const display = {
  elementShown: function(id,text){
    let element = document.getElementById(id)
    element.innerHTML = text
  },
  question: function(){
    this.elementShown("question",quiz.getCurrentQuestion().text)
  },
  choices: function(){
    guessHandler=(id,guess)=>{
      document.getElementById(id).onclick=function(){
        quiz.guess(guess)
        quizApp()
      }
    }


    for(let i = 0; i < quiz.getCurrentQuestion().choices.length;i++){
      this.elementShown(`choice${i}`,quiz.getCurrentQuestion().choices[i])
        guessHandler(`guess${i}`,`choice${i}`)
    }
  },
  progress: function(){
    this.elementShown("progress",`${quiz.currentQuestionIndex + 1}/${quiz.questions.length}`)
  },
  endQuiz: function(){
    let endQuizHTML = `
    <h1>Quiz terminé !</h1>
    <h3>Votre score est de : ${quiz.score}/${quiz.questions.length}</h3>
    `
    this.elementShown("quiz",endQuizHTML)
  }
}

quizApp = ()=>{
  if(quiz.hasEnded()){
    display.endQuiz()
  }else{
    display.question()
    display.choices()
    display.progress()
  }
}

let quiz = new Quizz(questions)
quizApp()