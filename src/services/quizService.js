let content = '```question\ntype : mcq\nquestion : For what value of parameter $m$ does the line intersect the point?\noptions : -1, -2, -3, -4\ncorrect : -1\nexplanation : demo $x$\nhint: a simple hint\n```\n\n\n```question\n\ntype : short_question\nquestion : For what value of parameter $m$ does the line intersect the point? -1\ncorrect : -1\nexplanation : demo $x$\nhint: a simple hint\n```\n\n\n```question\n\ntype : mcq\nquestion : For what value of parameter $m$ does the line intersect the point? 3\noptions : 1, 2, 3, 4\ncorrect : 3\nexplanation : demo $x$\nhint: a simple hint\n```\n\n\n```question\n\ntype : short_question\nquestion : For what value of parameter $m$ does the line intersect the point? abc\ncorrect : abc\nexplanation : demo $x$\nhint: a simple hint\n\n```'

export async function getQuizes (quizId) {
  await fakeNetwork()
  return content
}

export async function submitResult (quizId, score, xp) {
  await fakeNetwork()
  // { score: score, xp: xp}
  return {
    status: 'success'
  }
}

export async function editQuiz (quizId, quiz) {
  // quiz = { name, score, xp, content}
  console.log(quizId, quiz)
  content = quiz.content
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
