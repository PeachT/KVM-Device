export interface Comp {
  /** id */
  id: number;
  /** 构建名称 */
  componentName: string;
  /** 孔名称 */
  holeName: string;
  /** 孔明细 */
  holes: Array<string>;
}
/** 构建索引 */
export const compIndex = '&id,componentName,&holeName';

export const compInit: Comp = {
  id: null,
  componentName: null,
  holeName: null,
  holes: [],
};
