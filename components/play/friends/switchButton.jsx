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
        <div className="flex flex-row cursor-pointer">
            <div
                onClick={() => {
                    changeType(leftType);
                }}
                style={{
                    backgroundColor: currentType === leftType ? colorPalette ? colorPalette.primary1 : "" : "",
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
                    backgroundColor: currentType === rightType ? colorPalette ? colorPalette.primary1 : "" : "",
                }}
                className={`py-2 pr-3 rounded-full text-center ${currentType === rightType ? 'pl-4' : 'pl-2'}`}
            >
                {rightText}
            </div>
        </div >
    );
}