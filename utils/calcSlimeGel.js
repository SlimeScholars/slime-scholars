const SLIME_UPDATE_INTERVAL = 10 * 1000 //10 seconds

export const calcSlimeGel = (last, roster) => {
    if(last && roster && roster.length > 0){
        const time = Date.now() - new Date(last)
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