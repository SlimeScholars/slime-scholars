import { useState } from "react";

/*
* @param {string} currentType - default state of variable initialized in upper level
* @param {function} changeType - setState function of the var above
*/

export default function SwitchButton({ 
    currentType, 
    changeType, 
    leftType, 
    rightType,
    leftText,
    rightText }) {

    const leftOnClick = {
        leftClassName: "bg-red-200 rounded-full p-2",
        rightClassName: "rounded-full p-2"
    };
    const rightOnClick = {
        leftClassName: "rounded-full p-2",
        rightClassName: "bg-red-200 rounded-full p-2"
    };

    const [switchBtn, setSwitchBtn] = useState(leftOnClick);

    return (
        <button className="grid grid-cols-2"
            onClick={() => {

                if (currentType === leftType) {
                    // Change bg
                    setSwitchBtn(rightOnClick);

                    // Defer currentType change to upper level (Leaderboard)
                    changeType(rightType);

                } else {
                    setSwitchBtn(leftOnClick);
                    changeType(leftType);
                }
            }}>
            <div className={switchBtn.leftClassName}>{ leftText }</div>
            <div className={switchBtn.rightClassName}>{ rightText }</div>
        </button>
    );
}