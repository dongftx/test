import React, { PureComponent } from 'react';
import { PanResponderInstance, ViewStyle } from 'react-native';
import { ConfigContext } from '../configProvider';
declare type OneSlideValue = {
    value: number;
};
declare type BothSlidesValue = {
    currentLeftValue: number;
    currentRightValue: number;
};
declare type Point = {
    x: number;
    y: number;
};
export interface CircularSliderProps {
    align?: 'center' | 'origin';
    useMoveValueList?: boolean;
    valueList?: Array<number>;
    synSliding: boolean;
    step: number;
    radius: number;
    strokeWidth: number;
    backgroundPaddingTrackColor: string;
    backgroundRangeTrackColor: string;
    buttonRadius: number;
    buttonFillColor: string | number;
    buttonBorderColor: string | number;
    buttonStrokeWidth: number;
    initLeftValue: number;
    initRightValue: number;
    minLeftValue: number;
    minRightValue: number;
    maxLeftValue: number;
    maxRightValue: number;
    horizontalDirection: boolean;
    verticalDirection: boolean;
    children: React.ReactNode;
    style?: ViewStyle;
    contentContainerStyle?: ViewStyle;
    dialNumStyle: object;
    disabled: boolean;
    onChange?: (value: OneSlideValue | BothSlidesValue) => void;
    onComplete?: (value: OneSlideValue | BothSlidesValue) => void;
}
export interface CircularSliderState {
    currentLeftValue: number;
    currentRightValue: number;
}
export default class CircularSlider extends PureComponent<CircularSliderProps, CircularSliderState> {
    static contextType: React.Context<Partial<Pick<import("../configProvider").ConfigContextProps, "language" | "colorScheme" | "environment"> & {
        theme: import("../../styles/themes").ITheme;
    }>>;
    context: React.ContextType<typeof ConfigContext>;
    static defaultProps: {
        align: string;
        useMoveValueList: boolean;
        valueList: number[];
        synSliding: boolean;
        step: number;
        radius: number;
        strokeWidth: number;
        backgroundPaddingTrackColor: string;
        backgroundRangeTrackColor: string;
        linearGradient: {
            stop: string;
            color: string;
        }[];
        buttonRadius: number;
        buttonFillColor: string;
        buttonBorderColor: string;
        buttonStrokeWidth: number;
        initLeftValue: number;
        initRightValue: number;
        minLeftValue: number;
        minRightValue: number;
        maxLeftValue: number;
        maxRightValue: number;
        horizontalDirection: boolean;
        verticalDirection: boolean;
        dialNumStyle: {
            fill: string;
            textAnchor: string;
        };
        disabled: boolean;
        onChange: () => void;
        onComplete: () => void;
    };
    isComponentHorizontal: boolean;
    _extraSize: number;
    _panRespondBeforeLeftValue: number;
    _panRespondMovingLeftValue: number;
    isCheckOverlap: boolean;
    offsetOverlap: number;
    _leftPanResponder: PanResponderInstance;
    _rightPanResponder: PanResponderInstance;
    maxRightPoint: Point;
    maxLeftPoint: Point;
    maxLeftAngle: number;
    maxRightAngle: number;
    currentLeftCartesian: Point;
    currentRightCartesian: Point;
    constructor(props: Readonly<CircularSliderProps>);
    _parseLogical: (value: number) => number;
    _parseValue: (value: number, minValue?: number, maxValue?: number) => number;
    findPointByMinValue: (target: number, valueList: number[]) => number;
    createPanResponder: (elementKey: "leftPoint" | "rightPoint") => PanResponderInstance;
    _handlePanResponderGrant: () => void;
    _handlePanResponderMove: (elementKey: string, gestureState: {
        dy: number;
        dx: number;
    }) => void;
    _handlePanResponderEnd: () => void;
    _fireChangeEvent: (event: "onChange" | "onComplete", params?: OneSlideValue | BothSlidesValue | undefined) => void;
    createDialByValueList: () => JSX.Element[];
    componentDidUpdate(prevProps: CircularSliderProps): void;
    createCircleButtonStyle: ({ x, y }: Point) => {
        position: string;
        left: number;
        top: number;
        width: number;
        height: number;
        borderRadius: number;
        backgroundColor: string | number | import("../../styles/DynamicColor").default;
        borderColor: string | number | import("../../styles/DynamicColor").default;
        borderWidth: number;
    };
    calculateVisualSvgSize: (maxLeftPoint: Point, maxRightPoint: Point) => {
        svgWidth: number;
        svgHeight: number;
    };
    render(): JSX.Element;
}
export {};
