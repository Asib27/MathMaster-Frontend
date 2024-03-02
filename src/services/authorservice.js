export async function editCourseOutline (course) {
  // name, type, estimatedTime, description
  console.log(course)
  return {
    status: 'success',
    msg: 'successful'
  }
}

export async function createLesson (courseId, topicId) {
  return {
    status: 'success',
    msg: 'successful'
  }
}

export async function createQuiz (courseId, topicId) {
  return {
    status: 'success',
    msg: 'successful'
  }
}
