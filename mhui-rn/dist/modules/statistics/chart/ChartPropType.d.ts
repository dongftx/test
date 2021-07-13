import { ViewStyle } from 'react-native';
import { FormattedUserStatisticsDataPropType, UserStatisticsDataType } from '../requestConfig';
export interface ChartPropType {
    style?: ViewStyle;
    dataType: UserStatisticsDataType;
    chartData: Array<FormattedUserStatisticsDataPropType>;
    selectedIndex: number;
    onPress: (index: number, value?: number | string) => void;
}
