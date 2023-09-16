export const calculateStars = (score) => {
  if (score < 2) {
    return 0
  }
  if (score < 3) {
    return 1
  }
  if (score < 4) {
    return 2
  }
  if (score === 4) {
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
  if (oldStars === undefined) {
    return rewards[newStars]
  }

  return Math.max(rewards[newStars] - rewards[oldStars], 0)
}

export const calculateTestStars = (score) => {
  if (score < 4) {
    return 0
  }
  if (score < 6) {
    return 1
  }
  if (score < 8) {
    return 2
  }
  if (score <= 10) {
    return 3
  }
  throw new Error('Invalid score')
}

export const getTestRewards = (newStars, oldStars) => {
  // TODO: Adjust rewards
  const rewards = [
    150,
    250,
    350,
    450,
  ]

  // Always flowers as currency
  if (oldStars === undefined) {
    return rewards[newStars]
  }

  return Math.max(rewards[newStars] - rewards[oldStars], 0)
}