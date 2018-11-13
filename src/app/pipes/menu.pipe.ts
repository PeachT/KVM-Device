import { Pipe, PipeTransform } from '@angular/core';
import { Injectable, Inject } from '@angular/core';
import { Menus } from 'app/models/menu';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({ name: 'menuActive' })
export class MenuActivePipe implements PipeTransform {
  transform(menu: Menus, active: string): boolean {
    return (menu.link === active) && menu.childrenHidden;
  }
}
