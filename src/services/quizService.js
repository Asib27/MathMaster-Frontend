const quiz1 = `type : mcq
question : For what value of parameter $m$ does the line intersect the point?
options : -1, -2, -3, -4
correct : -1
explanation : demo $x$
hint: a simple hint
`

const quiz3 = `type : mcq
question : For what value of parameter $m$ does the line intersect the point? 3
options : 1, 2, 3, 4
correct : 3
explanation : demo $x$
hint: a simple hint
`

const quiz2 = `type : short_question
question : For what value of parameter $m$ does the line intersect the point? -1
correct : -1
explanation : demo $x$
hint: a simple hint
`

const quiz4 = `type : short_question
question : For what value of parameter $m$ does the line intersect the point? abc
correct : abc
explanation : demo $x$
hint: a simple hint
`

const quizes = [
  {
    id: 1,
    quiz: quiz1
  },
  {
    id: 2,
    quiz: quiz2
  },
  {
    id: 3,
    quiz: quiz3
  },
  {
    id: 4,
    quiz: quiz4
  }
]

export async function getQuizes (quizId) {
  await fakeNetwork()
  return quizes
}

export async function submitResult (quizId, score, xp) {
  await fakeNetwork()
  // { score: score, xp: xp}
  return {
    status: 'success'
  }
}

export async function getQuizStat (quizId) {
  await fakeNetwork()
  return {
    name: 'Quiz 1',
    score: 50,
    xp: 20,
    highest_score: 40,
    my_highest_score: 40
  }
}

async function fakeNetwork () {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() * 800)
  })
}
