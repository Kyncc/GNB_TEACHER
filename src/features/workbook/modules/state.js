let state = {
  options: {
    textbookId: '',
    editionId: '',
    subject: '',
    grade: '',
    textbookList: []
  },
  workbook: {
    scroll: 0,
    list: []
  },
  chapter: {
    list: [],
    classList: [],
    scroll: 0
  },
  exercise: {
    list: [],
    classCode: '',
    isReset: false,
    errorList: [],
    notPost: [],
    cameraList: []
  }
}

export default state
