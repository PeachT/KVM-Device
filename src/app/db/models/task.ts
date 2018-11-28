import { Project } from './project';
import { Device } from './device';
import { Comp } from './component';

export interface Task {
  /** id */
  id: number;
  /** 梁名称 */
  name?: string;
  /** 在项目ID */
  project: Project;
  /** 使用钢绞线ID */
  steelStrandId?: string;
  /** 使用设备 */
  device?: Device;
  /** 构建 */
  component?: Comp;

  /** 张拉组名称 */
  tensionGroup?: Array<Tension>;
  /** 梁信息 */
  bridge: Bridge;
}
interface Bridge {
  /** 试块编号 */
  skNumber: string;
  /** 试块强度 */
  skIntensity: string;
  /** 设计强度 */
  designIntensity: string;
  /** 张拉强度 */
  tensionIntensity: string;
  /** 浇筑日期 */
  concretingDate: Date;
  /** 摩擦系数 */
  friction: string;
}

export interface Tension {
  /** 孔名称 */
  name: string;
  /** 张拉模式 */
  mode: number;
  // float SuperTensionStageValue
  /** 张拉力 */
  tensionKn: number;
  /** /张拉长度 */
  tensionLength: number;
  /** 钢绞线数量 */
  steelStrandNumber: number;
  /** 张拉段数 */
  tensionStage: string;
  /** 张拉阶段 */
  tensionStageValue: number[];
  /** 保压时间 */
  time: number[];
  /** 超张拉 */
  super: boolean;
  /** 二次张拉 */
  twice: boolean;
  /** A1数据 */
  a1?: TensionJack;
  /** A2数据 */
  a2?: TensionJack;
  /** B1数据 */
  b1?: TensionJack;
  /** B2数据 */
  b2?: TensionJack;
}

export interface TensionJack {
  /** 工作端伸长量 */
  workMm: number;
  /** 回缩量 */
  retractionMm: number;
  /** 理论伸长量 */
  theoryMm: number;
}

export interface Record {
  /** 已张拉阶段 */
  stage: number;
  /** 张拉状态 0:未张拉  1:张拉完成  2:二次张拉  3:张拉中断  4:二次张拉第一次中断 */
  state: number;
  /** 保压时间 */
  time: Array<number>;
  /** 张拉模式 */
  mode: number;
  /** 压力 */
  mpa?: RecordJack;
  /** 位移 */
  mm?: RecordJack;
  /** 曲线 */
  cvsData?: Cvs;
  /** 回油至初张拉 */
  returnStart?: ReturnStart;
}

export interface RecordJack {
  a1?: Array<number>;
  a2?: Array<number>;
  b1?: Array<number>;
  b2?: Array<number>;
}

export interface Cvs {
  time: Array<number>;
  mpa: RecordJack;
  mm: RecordJack;
  timeMark: TimeMark;
}

export class TimeMark {
  index: Array<number>;
  doc: Array<string>;
}

export interface ReturnStart {
  a1?: ReturnStartItem;
  a2?: ReturnStartItem;
  b1?: ReturnStartItem;
  b2?: ReturnStartItem;
}
/**
 *
 *
 * @export
 * @class ReturnStartItem
 */
export interface ReturnStartItem {
  mpa: number;
  mm: number;
}

/** 项目索引 */
export const tskIndex = '&id,&name';
