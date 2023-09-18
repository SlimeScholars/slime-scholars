export const calcSlimeGel = (last, roster) => {
    if(last && roster && roster.length > 0){
        const currentDate = new Date();
        const currentMidnight = new Date(currentDate);
        currentMidnight.setHours(0, 0, 0, 0);

        const intervals = Math.floor((currentDate.getMilliseconds() - currentMidnight.getMilliseconds()) / (24 * 60 * 60 * 1000));
        let gain = 0
        for(const slime of roster){
            if(slime){
                gain += slime.baseProduction + slime.bonusProduction
            }
        } 
        return {rewards: gain * intervals, 
            intervals: intervals,
            oldDate: new Date(last).toISOString(),
            newDate: intervals > 0 ? currentMidnight.toISOString() : new Date(last).toISOString()}
    }
    else{
        return null
    }
}