export default function SwitchButton({
    currentType,
    changeType,
    leftType,
    rightType,
    leftText,
    rightText,
    colorPalette,
}) {

    return (
        <div
            className="shrink rounded-full"
            style={{
                border: `3px solid ${colorPalette ? colorPalette.primary2 : ""}`,
            }}
        >
            <div className="flex flex-row cursor-pointer">
                <div
                    onClick={() => {
                        changeType(leftType);
                    }}
                    style={{
                        background: currentType === leftType && colorPalette ? colorPalette.primary1 : "none",
                    }}
                    className={`py-2 pl-3 rounded-full text-center ${currentType === leftType ? 'pr-4' : 'pr-2'}`}
                >
                    {leftText}
                </div>
                <div
                    onClick={() => {
                        changeType(rightType);
                    }}
                    style={{
                        background: currentType === rightType && colorPalette ? colorPalette.primary1 : "none",
                    }}
                    className={`py-2 pr-3 rounded-full text-center ${currentType === rightType ? 'pl-4' : 'pl-2'}`}
                >
                    {rightText}
                </div>
            </div >
        </div >
    );
}