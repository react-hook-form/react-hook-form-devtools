import * as React from 'react';
import { Control } from 'react-hook-form';
import { Animate } from 'react-simple-animate';
import Header from './header';
import Panel from './panel';
import colors from './colors';
import Logo from './logo';
import { PanelShadow } from './panelShadow';
import { Button } from './styled';
import { useStateMachine } from 'little-state-machine';
import { setVisible } from './settingAction';
import { Resizable } from 're-resizable';

const DEFAULT_PANEL_WIDTH = 400;
const SHADOW_OVERHANG = 7;

export const DevToolUI = ({ control }: { control: Control }) => {
  const { state, action } = useStateMachine(setVisible);

  const [panelWidth, setPanelWidth] = React.useState(
    DEFAULT_PANEL_WIDTH + SHADOW_OVERHANG,
  );

  return (
    <>
      <Animate
        play={!state.visible}
        duration={0.2}
        start={{
          position: 'fixed',
          top: 0,
          right: 0,
          transform: 'translateX(0)',
          zIndex: 99999,
        }}
        end={{
          top: 0,
          right: 0,
          position: 'fixed',
          transform: `translateX(${panelWidth}px)`,
          zIndex: 99999,
        }}
      >
        <Resizable
          defaultSize={{ width: DEFAULT_PANEL_WIDTH, height: '' }}
          onResizeStop={(_, __, ___, d) => setPanelWidth(panelWidth + d.width)}
          enable={{
            top: false,
            right: false,
            bottom: false,
            left: true,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false,
          }}
          minWidth={200}
          style={{
            position: 'fixed',
            right: 0,
            top: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <PanelShadow visible={state.visible} />

          <div
            style={{
              height: '100vh',
              zIndex: 99999,
              background: colors.buttonBlue,
              top: 0,
              right: 0,
              display: 'grid',
              textAlign: 'left',
              color: 'white',
              fontSize: 14,
              gridTemplateRows: '40px auto',
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
            }}
          >
            <Header setVisible={action} control={control} />
            <Panel control={control} />
          </div>
        </Resizable>
      </Animate>

      {!state.visible && (
        <Button
          title="Show dev panel"
          hideBackground
          style={{
            position: 'fixed',
            zIndex: 99999,
            top: 3,
            right: 3,
            padding: 3,
            margin: 0,
            background: 'none',
          }}
        >
          <Logo setVisible={action} />
        </Button>
      )}
    </>
  );
};
