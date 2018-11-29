
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

export const userInit: User = {
  id: null,
  name: null,
  password: null,
  authority: 0,
  avatar: null
};
