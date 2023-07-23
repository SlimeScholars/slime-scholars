const lesson = {
  lessonName: "Algebra",
  // Allgebra badge will be stored on cloudinary and accessed via some API_URL + "algebra-badge.png"
  lessonBadge: "algebra-badge.png", 
  sections: [
    {
      // Type 0 = text
      // Type 1 = image
      // Type 2 = multiple choice question
      // Type 3 = fill in the blank question
      type: 0,
      content: "Finding the x-intercept.",
      sectionNumber: 1,
    },
    {
      type: 0,
      content: "Look at the following picture",
      sectionNumber: 2,
    },
    {
      type: 1,
      content: "function.png",
      sectionNumber: 2,
    },
    {
      type: 2,
      content: "What is the x-intercept of f(x)",
      sectionNumber: 3,
      options: ["1", "2", "3", "4"],
      answer: "3",
    },
    {
      type: 3,
      content: "3 + **blank** = 7",
      sectionNumber: 4,
      answer: "4",
    },
  ],
  quizSections: [
    {
      // Type 0 = text
      // Type 1 = image
      // Type 2 = multiple choice question
      // Type 3 = fill in the blank question
      type: 0,
      content: "Finding the x-intercept.",
      sectionNumber: 1,
    },
    {
      type: 0,
      content: "Look at the following picture",
      sectionNumber: 2,
    },
    {
      type: 1,
      content: "function.png",
      sectionNumber: 2,
    },
    {
      type: 2,
      content: "What is the x-intercept of f(x)",
      sectionNumber: 3,
      options: ["1", "2", "3", "4"],
      answer: "3",
    },
    {
      type: 3,
      content: "3 + **blank** = 7",
      sectionNumber: 4,
      answer: "4",
    },
  ],
}