/// <reference types="react" />
import { IAccessibilityPropTypes } from '@utils/accessibility-helper';
export interface ProgressButtonProps extends IAccessibilityPropTypes {
    sizeLevel?: 'regular' | 'medium' | 'small';
    disabled?: boolean;
    animated?: boolean;
    progress: number;
    style?: {
        width: number;
        height: number;
        borderRadius: number;
    };
}
declare function ProgressButton(props: ProgressButtonProps): JSX.Element;
declare namespace ProgressButton {
    var defaultProps: {
        sizeLevel: string;
        animated: boolean;
        disabled: boolean;
        progress: number;
    };
}
export default ProgressButton;
