import type { ReactElement } from 'react';
import type { Root } from 'react-dom/client';
import { createRoot } from 'react-dom/client';

const uniqueAttributeValue = '__h-render-add-dom-class-name__';
const dataKey = 'data-h-render';
interface ParamsType {
  wrapperProps?: any;
  /**
   * @description 回调函数，返回 true 则不执行 dom 插入
   */
  callback?: (element: Element) => boolean;
  position?: 'prepend' | 'append';
  /**
   * @description 插入模式
   * @param once 只插入一次
   * @param normal 正常插入
   */
  mode?: 'once' | 'normal';
}
export const hRender = (
  selector: string,
  Component: ReactElement,
  params?: ParamsType,
) => {
  const {
    wrapperProps,
    callback,
    position = 'append',
    mode = 'once',
  } = params || {};
  const targetElements = Array.from(document.querySelectorAll(selector));

  for (const targetElement of targetElements) {
    // 调用回调函数，如果返回 true，则跳过当前元素的渲染
    if (callback?.(targetElement)) {
      continue;
    }

    if (targetElement && targetElement?.parentNode) {
      const parentElement = targetElement?.parentNode;
      const newElement = document.createElement('div');
      let root: Root | null = null;

      if (mode === 'once') {
        const existingElement = parentElement.querySelector(
          `[${dataKey}="${uniqueAttributeValue}"]`,
        );
        // 如果已经存在相同的元素，则跳过当前元素的渲染
        if (existingElement && parentElement.contains(existingElement)) {
          continue;
        }
        newElement.setAttribute(dataKey, uniqueAttributeValue);
      }

      // 设置新的元素属性
      for (let prop in wrapperProps) {
        if (prop === 'style' && typeof wrapperProps[prop] === 'object') {
          Object.assign(newElement.style, wrapperProps[prop]);
        } else {
          (newElement as any)[prop] = wrapperProps[prop];
        }
      }

      // 根据位置将新元素添加到父元素中
      if (parentElement) {
        if (position === 'append') {
          parentElement.appendChild(newElement);
        } else {
          parentElement.prepend(newElement);
        }
        // 使用 createRoot 创建一个新的根节点，并渲染组件
        root = createRoot(newElement);
        root.render(Component);
      }
    }
  }
};
