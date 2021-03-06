import { Platform } from 'react-native';
export const FontKmedium = 'KMedium';
export const FontLantingLight = 'MI-LANTING--GBK1-Light';
export const FontLantingProMedium = 'MILanPro_MEDIUM--GB1-4';
export const FontLantingProNormal = 'MILanPro_NORMAL--GB1-4';
export const FontDsDigital = 'DS-Digital';
export const FontDefault = Platform.OS === 'ios' ? null : FontKmedium;