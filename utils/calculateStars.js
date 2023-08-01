export const calculateStars = (score) => {
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
