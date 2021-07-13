import React, { PureComponent } from 'react';
import DynamicColor from '../../styles/DynamicColor';
declare type RadioItem = {
    id: number;
    value: string | number;
    type?: string;
};
export declare type radioOptionsPropType = Array<RadioItem>;
export interface RadioGroupWithSeparatorPropType {
    checkedId?: number;
    radioOptions?: Array<RadioItem>;
    onChangeCheck?: (checkedId: number) => void;
    separatorLineColor?: DynamicColor | string;
    radioRawTextColor?: DynamicColor | string;
    radioCheckedTextColor?: DynamicColor | string;
    radioRawBackgroundColor?: DynamicColor | string;
    radioCheckedBackgroundColor?: DynamicColor | string;
}
interface RadioGroupWithSeparatorState {
    checkedId: number;
}
export default class RadioGroupWithSeparator extends PureComponent<RadioGroupWithSeparatorPropType, RadioGroupWithSeparatorState> {
    static contextType: React.Context<Partial<Pick<import("../../components/configProvider").ConfigContextProps, "language" | "colorScheme" | "environment"> & {
        theme: import("../../styles/themes").ITheme;
    }>>;
    static defaultProps: {
        radioOptions: {
            id: number;
            value: string;
        }[];
        separatorLineColor: DynamicColor;
        radioRawTextColor: DynamicColor;
        radioCheckedTextColor: DynamicColor;
        radioRawBackgroundColor: DynamicColor;
        radioCheckedBackgroundColor: DynamicColor;
    };
    constructor(props: RadioGroupWithSeparatorPropType);
    componentDidUpdate(prevProps: RadioGroupWithSeparatorPropType): void;
    onChangeCheck: (checkedId: number) => void;
    createRadioGroup: () => JSX.Element[];
    render(): JSX.Element;
}
export {};
