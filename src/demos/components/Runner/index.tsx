import { CodeObject } from '@tencent/embed-editor/Modal/type';
import React from 'react';

interface RunnerProps {
  data: CodeObject;
  onClick: () => void;
  onDelete: () => void;
  onChange: (newCode: string) => void;
}
const Runner = (props: RunnerProps) => {
  const { data, onClick, onChange, onDelete } = props;
  const { code } = data;

  return (
    <div>
      <textarea
        style={{ width: '100%' }}
        rows={24}
        value={code}
        onChange={(e) => onChange(e.target.value)}
      />
      <button onClick={onClick}>运行</button>
      <button onClick={onDelete}>删除</button>
    </div>
  );
};

export default Runner;
