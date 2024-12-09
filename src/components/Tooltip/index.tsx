import { FunctionComponent } from 'preact';
import css from './style.module.scss';

export const Tooltip: FunctionComponent<{ position: [number, number] }> = ({
  children,
  position,
}) => {
  return (
    <div
      class={css.tooltip}
      style={{
        '--x': `${position[0]}px`,
        '--y': `${position[1]}px`,
      }}
    >
      {children}
    </div>
  );
};
