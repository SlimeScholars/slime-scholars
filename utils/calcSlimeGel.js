const SLIME_UPDATE_INTERVAL = 60 * 60 * 24 * 1000 //1 day
const MIN_TIME_DETERMINE = 60 * 60 * 24 * 1000 + 1 //1 minute, 1 second

export const calcSlimeGel = (last, roster) => {
    if(last && roster && roster.length > 0){
        const time = Date.now() - new Date(last)
        if(time < MIN_TIME_DETERMINE){
            return null
        }
        const intervals = Math.floor(time/SLIME_UPDATE_INTERVAL)
        let gain = 0
        for(const slime of roster){
            if(slime){
                gain += slime.baseProduction + slime.bonusProduction
            }
        }
        return {rewards: gain * intervals, 
            intervals: intervals,
            oldDate: new Date(last).toISOString(),
            newDate: new Date(new Date(last).getTime() + intervals * SLIME_UPDATE_INTERVAL).toISOString()}
    }
    else{
        return null
    }
}