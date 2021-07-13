import { PureComponent } from 'react';
export interface CircularDialSVGProps {
    rightAngle: number;
    midAngle: number;
    leftAngle: number;
    radius: number;
    offset: number;
    strokeWidth: number;
    stroke?: string;
    fill: string;
    strokeLinecap: 'butt' | 'round' | 'square' | undefined;
}
export default class CircularDialSVG extends PureComponent<CircularDialSVGProps, {}> {
    static defaultProps: {
        leftAngle: number;
        midAngle: number;
        rightAngle: number;
        radius: number;
        offset: number;
        strokeLinecap: string;
        strokeWidth: number;
        stroke: string;
        fill: string;
    };
    createMidPathDefine: () => {
        ld: string;
        rd: string;
    };
    createSmallArc: () => JSX.Element;
    render(): JSX.Element;
}
