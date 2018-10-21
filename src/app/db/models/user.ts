
export interface User {
  /** id */
  id?: number;
  /** 名称 */
  name: string;
  /** 密码 */
  password: string;
  /** 权限 */
  authority: number;
  /** 头像 */
  avatar?: any;
}
/** 管理员索引 */
export const userIndex = '&id,&name,authority';
