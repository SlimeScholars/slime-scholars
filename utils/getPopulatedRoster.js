import Slime from '../models/slimeModel'

export const getPopulatedRoster = async(roster) => {
  for(let i in roster) {
    if(roster[i]) {
      const slime = await Slime.findById(roster[i], {
        user: 0, createdAt:0, updatedAt: 0, __v: 0,
      })
      roster[i] = slime
    }
  }

  return roster
}
