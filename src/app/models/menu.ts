export interface Menus {
  /** 菜单名称 */
  title: string;
  /** 状态 */
  state?: boolean;
  /** 菜单图标 */
  icon?: string;
  /** 菜单连接 */
  link?: string;
  /** 子菜单 */
  children?: Array<Menus>;
  /** 点击菜单是否隐藏同级菜单 true隐藏 忽略不隐藏 */
  childrenHidden?: boolean;
}
