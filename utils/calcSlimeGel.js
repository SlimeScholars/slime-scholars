export const calcSlimeGel = (last, roster) => {
    if(last && roster && roster.length > 0){
        const currentMidnight = new Date();
        currentMidnight.setHours(0, 0, 0, 0);

        const intervals = Math.floor((new Date().getTime() - last.getTime()) / (24 * 60 * 60 * 1000));
        let gain = 0
        for(const slime of roster){
            if(slime){
                gain += slime.baseProduction + slime.bonusProduction
            }
        } 
        const payload = {rewards: gain * intervals, 
            intervals: intervals,
            oldDate: new Date(last).toISOString(),
            newDate: intervals > 0 ? currentMidnight.toISOString() : new Date(last).toISOString()}
        return payload
    }
    else{
        return null
    }
}