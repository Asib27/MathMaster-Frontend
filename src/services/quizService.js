const quiz1 = `\`\`\`question
type : mcq
question : For what value of parameter $m$ does the line intersect the point?
options : -1, -2, -3, -4
correct : -1
explanation : demo $x$
hint: a simple hint
\`\`\``

const quiz2 = `\`\`\`question
type : short_question
question : For what value of parameter $m$ does the line intersect the point?
correct : -1
explanation : demo $x$
hint: a simple hint
\`\`\``



const quizes = [
  {
    id: 1,
    quiz: quiz1
  },
  {
    id: 2,
    quiz: quiz2
  }
]

export async function getQuizes (quizId) {
  await fakeNetwork()
  return quizes
}

async function fakeNetwork () {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() * 800)
  })
}