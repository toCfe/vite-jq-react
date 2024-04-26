import { hRender } from './utils/hRender';
import Com from './demos/index';

export const renderEditor = () => {
  hRender('body', <Com />);
};
