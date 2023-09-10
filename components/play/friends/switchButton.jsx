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
    rightText,
    colorPalette,
}) {

    const activeStyle = {
        backgroundColor: colorPalette ? colorPalette.primary1 : "",
    }

    const inactiveStyle = {
        backgroundColor: 'none',
    }

    return (
        <div className="grid grid-cols-2">
            <div
                onClick={() => {
                    changeType(leftType);
                }}
                style={currentType === leftType ? activeStyle : inactiveStyle}
                className="p-2 rounded-full"
            >
                {leftText}
            </div>
            <div
                onClick={() => {
                    changeType(rightType);
                }}
                style={currentType === rightType ? activeStyle : inactiveStyle}
                className="p-1 rounded-full"
            >
                {rightText}
            </div>
        </div >
    );
}