import { Modal } from '@cloudstudio/embed-editor';

import React, { useState } from 'react';
import Runner from './components/Runner';
import {
  defaultArticleId,
  defaultCode,
  defaultCodeContent,
  defaultCodes,
  defaultIndex,
} from './constants';
import './index.css';

export interface CodeObject {
  lang: string; // 代码语言
  code: string; // 代码内容
  key: string; // 代码块唯一索引
  count?: number; // 运行次数
}
const Index = () => {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(defaultIndex);
  const [codes, setCodes] = useState<CodeObject[]>(defaultCodes);

  const onClose = () => {
    setVisible(false);
  };

  const handleChange = (code: any, synCodes: any) => {
    setCodes(synCodes);
  };

  const getIndex = (code: CodeObject) =>
    codes?.findIndex((en) => en.key === code?.key);

  const onRun = (code: CodeObject) => {
    setVisible(true);
    setIndex(getIndex(code));
  };

  const handleDelete = (key: string) => {
    setCodes(codes?.filter((code) => code?.key !== key));
  };

  const handleAdd = () => {
    setCodes([
      ...codes,
      { code: defaultCodeContent, key: `${Date.now()}`, lang: 'python' },
    ]);
  };

  return (
    <div>
      {codes?.map((code) => (
        <Runner
          data={code}
          key={code?.key}
          onClick={() => {
            onRun(code);
          }}
          onDelete={() => handleDelete(code?.key)}
          onChange={(newCode: string) => {
            const nIndex = getIndex(code);
            const newCodes = [...codes];
            newCodes[nIndex].code = newCode;
            setCodes(newCodes);
          }}
        />
      ))}
      <button onClick={handleAdd}>新增</button>
      <Modal
        code={defaultCode}
        index={index}
        codes={codes}
        visible={visible}
        onChange={handleChange}
        articleId={defaultArticleId}
        isAuthor
        onClose={onClose}
        onVisibleChange={setVisible}
        onCount={(changedCode, changedCodes) => {
          console.log('运行次数改变回调', changedCode, changedCodes);
        }}
        onCopyLegacyLink={() => console.log('复制链接成功')}
      ></Modal>
    </div>
  );
};

export default Index;
