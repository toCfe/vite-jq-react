export const defaultCodeContent =
  "print('2222 Hello, World python!2222 Hello, World python!');";

export const defaultCodes = [
  {
    lang: 'python',
    code: `# 图形输出测试

import matplotlib
import matplotlib.pyplot as plt

matplotlib.use('Agg')


x = [1, 2, 3, 4, 5]
y = [1, 4, 9, 16, 25]

plt.plot(x, y)

plt.title('Line Graph Example')
plt.xlabel('X Axis')
plt.ylabel('Y Axis')

plt.savefig('plot3.jpg')

print('hello Could not load the Qt platform plugin');`,
    key: 'code_key_1',
    count: 10,
  },
  {
    lang: 'python',
    code: defaultCodeContent,
    key: 'code_key_2',
  },
];

export const defaultIndex = -1;

export const defaultCode = 'qaz';

export const defaultArticleId = 'dddsss';
