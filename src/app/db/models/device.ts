export interface Device  {
  /** id */
  id: number;
  /** 名称 */
  name: string;
  /** 顶型号 */
  jackModel: string;
  /** 泵型号 */
  pumpModel: string;
  /** 标定日期 */
  calibrationDate: Date;
  /** 工作模式 */
  workMode: Array<number>;
  /** 方程式 */
  equation: boolean;
  a1: Detail;
  a2: Detail;
  b1: Detail;
  b2: Detail;
}

export interface Detail {
  jackNumber: string;
  pumpNumber: string;
  a: number;
  b: number;
  mm: Array<number>;
}

/** 构建索引 */
export const deviceIndex = '&id,&name';
