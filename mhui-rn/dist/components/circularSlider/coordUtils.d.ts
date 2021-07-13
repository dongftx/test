declare type Point = {
    x: number;
    y: number;
};
declare const polarToCartesian: (radian: number, radius: number, offset: number) => {
    x: number;
    y: number;
};
declare const cartesianToPolar: ({ x, y }: Point, distance: number) => number;
declare const getRadianByAngle: (angle: number) => number;
declare const getCartesianByAngle: (angle: number, radius: number, offset?: number) => {
    x: number;
    y: number;
};
declare const getArcByValue: ({ currentLeftValue, currentRightValue }: {
    currentLeftValue: number;
    currentRightValue: number;
}, isComponentHorizontal: boolean) => {
    currentLeftAngle: number;
    currentRightAngle: number;
};
declare const getValueByArc: ({ leftAngle, rightAngle }: {
    leftAngle: number;
    rightAngle: number;
}, isComponentHorizontal: boolean) => {
    leftValue: number;
    rightValue: number;
};
export { polarToCartesian, cartesianToPolar, getRadianByAngle, getCartesianByAngle, getArcByValue, getValueByArc, };
