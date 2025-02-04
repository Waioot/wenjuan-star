import { render, screen } from '@testing-library/react';
import Component from './Component';

test('默认属性', () => {
  render(<Component />);
  const span = screen.getByText('一行段落');
  expect(span).toBeInTheDocument();
});

test('传入属性', () => {
  render(<Component text='hello' isCenter={true} />);
  const span = screen.getByText('hello');
  const p = span.parentElement;
  expect(p).not.toBeNull();

  const style = p!.style;
  expect(style.textAlign).toBe('center');
});

test('多行段落', () => {
  render(<Component text={'hello\nworld\nyou'} />);
  const span = screen.getByText('hello');
  expect(span).toBeInTheDocument();

  expect(span).toHaveTextContent('hello');
  expect(span).not.toHaveTextContent('helloworld');
});
