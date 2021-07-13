export declare type UserStatisticsDataType = 'week' | 'month' | 'day';
declare type ParamsPropType = {
    did?: string;
    data_type?: string;
    key?: string;
    time_start?: number;
    time_end?: number;
    limit?: number;
};
declare type SingleDataTypeParamsPropType = {
    id?: number;
    type: UserStatisticsDataType;
    value: string | number;
    params: ParamsPropType;
};
declare type MultiDataTypeParamsPropType = Array<SingleDataTypeParamsPropType>;
export declare type SingleTabParamsPropType = {
    key?: string | number;
    value: string | number;
    items: MultiDataTypeParamsPropType;
};
export declare type MultiTabParamsPropType = Array<{
    key?: string | number;
    value: string | number;
    items: Array<{
        id?: number;
        type: UserStatisticsDataType;
        value: string | number;
        params: ParamsPropType;
    }>;
}>;
export interface FormattedUserStatisticsDataPropType {
    timestamp: number;
    value: number;
    formatTime: string;
}
export declare type SingleDataTypeUserStatisticsDataPropType = Array<FormattedUserStatisticsDataPropType>;
export declare type SingleTabUserStatisticsDataPropType = Array<SingleDataTypeUserStatisticsDataPropType>;
export declare type MultiTabUserStatisticsDataPropType = Array<SingleTabUserStatisticsDataPropType>;
declare const getUserStatistics: (params: SingleTabParamsPropType | MultiTabParamsPropType) => Promise<SingleTabUserStatisticsDataPropType | MultiTabUserStatisticsDataPropType>;
export default getUserStatistics;
