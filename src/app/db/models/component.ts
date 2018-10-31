export interface Component {
  /** id */
  id: number;
  /** 构建名称 */
  conponentName: string;
  /** 孔名称 */
  holeName: string;
  /** 孔明细 */
  holes: Array<string>;
}
/** 构建索引 */
export const componentIndex = '&id,conponentName,holeName';
