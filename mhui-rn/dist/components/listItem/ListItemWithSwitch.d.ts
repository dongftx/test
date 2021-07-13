import PropTypes from 'prop-types';
import React from 'react';
import { ConfigContext } from '../configProvider';
declare class ListItemWithSwitch extends React.Component {
    static contextType: React.Context<Partial<Pick<import("../configProvider").ConfigContextProps, "language" | "colorScheme" | "environment"> & {
        theme: import("../../styles/themes").ITheme;
    }>>;
    context: React.ContextType<typeof ConfigContext>;
    static propTypes: {
        type: PropTypes.Requireable<string>;
        title: PropTypes.Validator<string>;
        subtitle: PropTypes.Requireable<string>;
        valueText: PropTypes.Requireable<string>;
        value: PropTypes.Requireable<boolean>;
        disabled: PropTypes.Requireable<boolean>;
        onPress: PropTypes.Requireable<(...args: any[]) => any>;
        onValueChange: PropTypes.Validator<(...args: any[]) => any>;
        showSeparator: PropTypes.Requireable<boolean>;
        separator: PropTypes.Requireable<PropTypes.ReactElementLike>;
        containerStyle: PropTypes.Requireable<object>;
        titleStyle: PropTypes.Requireable<object>;
        subtitleStyle: PropTypes.Requireable<object>;
        valueTextStyle: PropTypes.Requireable<object>;
        switchStyle: PropTypes.Requireable<object>;
        tintColor: PropTypes.Requireable<string>;
        onTintColor: PropTypes.Requireable<string>;
        allowFontScaling: PropTypes.Requireable<boolean>;
        unlimitedHeightEnable: PropTypes.Requireable<boolean>;
        titleNumberOfLines: PropTypes.Requireable<number>;
        subtitleNumberOfLines: PropTypes.Requireable<number>;
        valueNumberOfLines: PropTypes.Requireable<number>;
        accessible: PropTypes.Requireable<boolean>;
        accessibilityLabel: PropTypes.Requireable<string | number>;
        accessibilityHint: PropTypes.Requireable<string | number>;
        buttonOption: PropTypes.Requireable<object>;
        choiceOption: PropTypes.Requireable<object>;
        sortOption: PropTypes.Requireable<object>;
        showVerticalLine: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        type: string;
        title: string;
        subtitle: string;
        valueText: string;
        value: boolean;
        disabled: boolean;
        showSeparator: boolean;
        containerStyle: {};
        titleStyle: {};
        subtitleStyle: {};
        valueTextStyle: {};
        switchStyle: {};
        unlimitedHeightEnable: boolean;
        allowFontScaling: boolean;
        leftIcon: null;
        useNewType: boolean;
        showVerticalLine: boolean;
    };
    static TYPE: {
        SWITCH: string;
        CHOICE: string;
        BUTTON: string;
        SORT: string;
    };
    static contextType: React.Context<Partial<Pick<import("../configProvider").ConfigContextProps, "language" | "colorScheme" | "environment"> & {
        theme: import("../../styles/themes").ITheme;
    }>>;
    constructor(props: any, context: any);
    private colorForVerticalLine;
    renderRight(): JSX.Element | null | undefined;
    render(): JSX.Element;
    renderSeparator(): any;
    _onValueChange(value: any): void;
    onAccessibilityAction: ({ nativeEvent: { actionName } }: {
        nativeEvent: {
            actionName: any;
        };
    }) => void;
}
export default ListItemWithSwitch;
