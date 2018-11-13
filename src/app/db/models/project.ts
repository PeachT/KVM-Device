export interface Project  {
  /** id */
  id: number;
  /** 项目名称 */
  name: string;
  /** 分布工程 */
  divisionProject: string;
  /** 施工单位 */
  constructionUnit: string;
  /** 分项工程 */
  subProject: string;
  /** 单位工程 */
  unitProject: string;
  /** 工程部位 */
  engineeringSite: string;
  /** 合同段 */
  contractSection: string;
  /** 桩号范围 */
  stationRange: string;
  /** 监理 */
  supervisions: Array<Supervision>;
  /** 钢绞线 */
  // steelStrands: Array<SteelStrand>;
}
export interface Supervision {
  /** id */
  id: number;
  /** 名称 */
  name: string;
  /** 联系方式 */
  phone: string;
  /** 公司名称 */
  unit: string;
  /** 头像 */
  imgbase64: any;
}

export interface SteelStrand {
  /** id */
  id: number;
  /** 型号 */
  model: string;
  /** 摩擦系数 */
  frictionCoefficient: string;
  /** 报告编号 */
  reportNo: string;
  /** 标定日期 */
  calibrationDate: Date;
  /** 报告图片 */
  imgbase64: any;
}
/** 项目索引 */
export const projectIndex = '&id,&name';

export const projectInit: Project = {
  id: null,
  name: null,
  divisionProject: null,
  constructionUnit: null,
  subProject: null,
  unitProject: null,
  engineeringSite: null,
  contractSection: null,
  stationRange: null,
  supervisions: [],
  // steelStrands: [],
};
