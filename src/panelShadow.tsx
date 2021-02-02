import { Animate } from 'react-simple-animate';
import colors from './colors';
import * as React from 'react';

type Props = {
  visible: boolean;
};

const SHADOW_LEFT_OVERRIDE = 247;

export const PanelShadow = ({ visible }: Props) => (
  <div style={{ position: 'absolute', top: 0, left: SHADOW_LEFT_OVERRIDE }}>
    <Animate
      play={visible}
      duration={0.1}
      start={{
        transform: 'translateX(8px)',
      }}
      end={{
        transform: 'translateX(0)',
      }}
      delay={0.3}
    >
      <div
        style={{
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'fixed',
            height: '100vh',
            width: 250,
            zIndex: 99998,
            background: 'black',
            top: 7,
            right: 7,
            boxShadow: 'rgba(15, 15, 29, 0.4) -3px 3px 6px 0px',
          }}
        />
        <span
          style={{
            width: 0,
            height: 0,
            position: 'fixed',
            zIndex: 99998,
            borderTop: '10px solid transparent',
            borderBottom: '10px solid transparent',
            borderRight: `10px solid black`,
            right: 247,
            top: -3,
          }}
        />

        <span
          style={{
            width: 0,
            height: 0,
            position: 'fixed',
            zIndex: 99998,
            borderTop: '10px solid transparent',
            borderBottom: '10px solid transparent',
            borderRight: `10px solid ${colors.buttonBlue}`,
            right: 247,
            top: 37,
          }}
        />
        <span
          style={{
            width: 10,
            height: 21,
            position: 'fixed',
            zIndex: 99998,
            right: 247,
            top: 47,
            background: colors.buttonBlue,
          }}
        />
        <span
          style={{
            width: 0,
            height: 0,
            position: 'fixed',
            zIndex: 99998,
            borderTop: '10px solid transparent',
            borderBottom: '10px solid transparent',
            borderLeft: `10px solid ${colors.buttonBlue}`,
            right: 247,
            top: 55,
          }}
        />
      </div>
    </Animate>
  </div>
);
