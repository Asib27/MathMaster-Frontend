export async function getTopic (topicId) {
  return {
    id: 1,
    name: 'untitled',
    description: 'lores ipsum'
  }
}

export async function editTopic (topicId, topic) {
  return {
    status: 'success'
  }
}

export async function createTopic () {
  // name: untitiled, description: lores ipsum
  console.log('ekhaneo')
  return {
    status: 'success'
  }
}
