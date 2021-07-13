import PropTypes from 'prop-types';
export declare const AccessibilityRoles: {};
declare type AccessibilityRole = 'none' | 'button' | 'link' | 'search' | 'image' | 'keyboardkey' | 'text' | 'adjustable' | 'imagebutton' | 'header' | 'summary' | 'alert' | 'checkbox' | 'combobox' | 'menu' | 'menubar' | 'menuitem' | 'progressbar' | 'radio' | 'radiogroup' | 'scrollbar' | 'spinbutton' | 'switch' | 'tab' | 'tablist' | 'timer' | 'toolbar';
export interface IAccessibilityPropTypes {
    accessible: boolean;
    accessibilityRole: AccessibilityRole;
    accessibilityLabel: string | number;
    accessibilityHint: string | number;
    accessibilityState: {
        disabled: boolean;
        selected: boolean;
        checked: boolean;
        busy: boolean;
        expanded: boolean;
    };
    accessibilityValue: {
        min: number;
        max: number;
        now: number;
        text: string | number;
    };
}
export declare const AccessibilityPropTypes: {
    accessible: PropTypes.Requireable<boolean>;
    accessibilityRole: PropTypes.Requireable<string>;
    accessibilityLabel: PropTypes.Requireable<string | number>;
    accessibilityHint: PropTypes.Requireable<string | number>;
    accessibilityState: PropTypes.Requireable<PropTypes.InferProps<{
        disabled: PropTypes.Requireable<boolean>;
        selected: PropTypes.Requireable<boolean>;
        checked: PropTypes.Requireable<boolean>;
        busy: PropTypes.Requireable<boolean>;
        expanded: PropTypes.Requireable<boolean>;
    }>>;
    accessibilityValue: PropTypes.Requireable<PropTypes.InferProps<{
        min: PropTypes.Requireable<number>;
        max: PropTypes.Requireable<number>;
        now: PropTypes.Requireable<number>;
        text: PropTypes.Requireable<string | number>;
    }>>;
};
export declare function getAccessibilityConfig({ accessible, accessibilityRole, accessibilityLabel, accessibilityHint, accessibilityState, accessibilityValue, }?: {
    accessible: any;
    accessibilityRole: any;
    accessibilityLabel: any;
    accessibilityHint: any;
    accessibilityState: any;
    accessibilityValue: any;
}): {
    accessible: boolean;
};
export {};
