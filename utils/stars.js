export const calculateStars = (score) => {
  if(score < 2) {
    return 0
  }
  if(score < 3) {
    return 1
  }
  if(score < 4) {
    return 2
  }
  if(score === 4) {
    return 3
  }
  throw new Error('Invalid score')
}

export const getQuizRewards = (newStars, oldStars) => {
  const rewards = [
    150,
    250,
    350,
    450,
  ]

  // Always flowers as currency
  if(oldStars === undefined) {
    return rewards[newStars]
  }

  return rewards[newStars] - rewards[oldStars]
}