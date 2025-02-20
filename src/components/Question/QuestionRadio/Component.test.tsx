import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Component from './Component';

test('默认属性', () => {
  render(<Component />);
  const p = screen.getByText('单选标题');
  expect(p).toBeInTheDocument();

  for (let i = 1; i <= 3; i++) {
    const radio = screen.getByDisplayValue(`item${i}`);
    expect(radio).toBeInTheDocument();

    const label = screen.getByText(`选项${i}`);
    expect(label).toBeInTheDocument();
  }
});

test('传入属性', () => {
  const opts = [
    { value: 'v1', text: 't1' },
    { value: 'v2', text: 't2' },
    { value: 'v3', text: 't3' },
  ];
  render(<Component title='hello' options={opts} value='v1' />);
  const p = screen.getByText('hello');
  expect(p).toBeInTheDocument();

  for (let i = 1; i <= 3; i++) {
    const currentValue = `v${i}`;
    const radio = screen.getByDisplayValue(currentValue);
    expect(radio).toBeInTheDocument();
    const label = screen.getByText(`t${i}`);
    expect(label).toBeInTheDocument();

    // 测试选中状态
    if (currentValue === 'v1') {
      expect(radio.getAttribute('checked')).not.toBeNull();
    }
  }
});
