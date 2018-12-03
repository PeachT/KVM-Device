export interface Device  {
  /** id */
  id: number;
  /** 名称 */
  name: string;
  /** 顶型号 */
  jackModel: string;
  /** 泵型号 */
  pumpModel: string;
  /** 工作模式 */
  workMode: Array<number>;
  /** 设备 */
  mode: Array<string>;
  /** 方程式 */
  equation: boolean;
  /** 设备详情 */
  // detail: Array<Detail>;
  // {
  //   a1?: Detail;
  //   a2?: Detail;
  //   b1?: Detail;
  //   b2?: Detail;
  // };
  a1?: Detail;
  a2?: Detail;
  b1?: Detail;
  b2?: Detail;
}

export interface Detail {
  /** 标定日期 */
  calibrationDate?: Date;
  /** 千斤顶编号 */
  jackNumber?: string;
  /** 油泵编号 */
  pumpNumber?: string;
  /** a系数 */
  a: number;
  /** b系数 */
  b: number;
  /** 位移校正系数 */
  mm: MM;
}
interface MM {
  0: number;
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

/** 构建索引 */
export const deviceIndex = '&id,&name';

export const deviceInit: Device = {
  id: null,
  name: null,
  jackModel: null,
  pumpModel: null,
  workMode: null,
  mode: null,
  equation: null,
  a1: {
    calibrationDate: null,
    jackNumber: null,
    pumpNumber: null,
    a: 1,
    b: 1,
    mm: { 0: 1, 1: 1, 2: 1, 3: 1, 4: 1, 5: 1},
  },
  a2: {
    calibrationDate: null,
    jackNumber: null,
    pumpNumber: null,
    a: 1,
    b: 1,
    mm: { 0: 1, 1: 1, 2: 1, 3: 1, 4: 1, 5: 1},
  },
  b1: {
    calibrationDate: null,
    jackNumber: null,
    pumpNumber: null,
    a: 1,
    b: 1,
    mm: { 0: 1, 1: 1, 2: 1, 3: 1, 4: 1, 5: 1},
  },
  b2: {
    calibrationDate: null,
    jackNumber: null,
    pumpNumber: null,
    a: 1,
    b: 1,
    mm: { 0: 1, 1: 1, 2: 1, 3: 1, 4: 1, 5: 1},
  }
};
