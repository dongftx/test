import React, { Component } from 'react';
declare class IndependentCard extends Component {
    static contextType: React.Context<Partial<Pick<import("../configProvider").ConfigContextProps, "language" | "colorScheme" | "environment"> & {
        theme: import("../../styles/themes").ITheme;
    }>>;
    constructor(props: any);
    componentDidMount(): void;
    changeSwitchValue: () => void;
    onAccessibilityAction: ({ nativeEvent: { actionName } }: {
        nativeEvent: {
            actionName: any;
        };
    }) => void;
    render(): JSX.Element;
}
export default IndependentCard;
