import * as React from 'react';
import { Animate } from 'react-simple-animate';
import isUndefined from 'lodash/isUndefined';
import colors from './colors';
import defaultStyles from './defaultStyles';

type Props = {
  isNative: boolean;
  errorMessage: string | undefined;
  errorType: string | undefined;
  hasError: boolean;
  type: string | undefined;
  isTouched: boolean;
  isDirty: boolean;
  readFormStateRef: React.MutableRefObject<{
    touched: boolean;
  }>;
  index: number;
  fieldsValues: any;
  name: string;
  collapseAll: boolean;
  refObject: any;
};

const PanelTable = ({
  refObject,
  hasError,
  isDirty,
  fieldsValues,
  readFormStateRef,
  isNative,
  errorMessage,
  errorType,
  type,
  isTouched,
  name,
  collapseAll,
  index,
}: Props) => {
  const [collapse, setCollapse] = React.useState(false);

  React.useEffect(() => {
    setCollapse(!collapseAll);
  }, [collapseAll]);

  return (
    <Animate
      play
      start={{ opacity: 0, transform: 'translateY(10px)' }}
      end={{ opacity: 1 }}
      easeType="ease-in"
      delay={index * 0.1}
    >
      <table
        style={{
          padding: '10px 10px 10px',
          width: '100%',
          transition: '.3s all',
          borderLeft: `2px solid ${
            hasError ? colors.secondary : colors.buttonBlue
          }`,
        }}
      >
        <thead>
          <tr>
            <td style={{ width: 100 }}>
              <button
                onClick={() => setCollapse(!collapse)}
                style={{
                  ...defaultStyles.button,
                  border: `1px solid ${colors.lightBlue}`,
                  borderRadius: 2,
                  padding: '3px 5px',
                  display: 'inline-block',
                  fontSize: 14,
                  lineHeight: '12px',
                  width: 20,
                  textAlign: 'center',
                  marginRight: 10,
                  background: colors.blue,
                }}
              >
                {collapse ? '+' : '-'}
              </button>
              <button
                onClick={() => {
                  if (refObject.scrollIntoView) {
                    refObject.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                title="Scroll into view"
                style={{
                  ...defaultStyles.button,
                  border: `1px solid ${colors.lightBlue}`,
                  borderRadius: 2,
                  padding: '3px 10px',
                  display: 'inline-block',
                  fontSize: 10,
                  margin: 0,
                  textAlign: 'center',
                  ...(isNative
                    ? { background: colors.lightBlue, color: 'white' }
                    : { cursor: 'not-allowed'}),
                }}
              >
                {isNative ? 'Native' : 'Custom'}
              </button>
            </td>
            <td>
              <p
                style={{
                  margin: 0,
                  padding: 0,
                }}
              >
                {name}
              </p>
            </td>
          </tr>
        </thead>
        {!collapse && (
          <tbody>
            {type && (
              <tr>
                <td align="right" style={{ paddingRight: 5, fontWeight: 500 }}>
                  Type:
                </td>
                <td>{type}</td>
              </tr>
            )}
            {errorType && (
              <tr>
                <td align="right" style={{ paddingRight: 5, fontWeight: 500 }}>
                  ERROR Type:
                </td>
                <td>{errorType}</td>
              </tr>
            )}
            {errorMessage && (
              <tr>
                <td align="right" style={{ paddingRight: 5, fontWeight: 500 }}>
                  MESSAGE:
                </td>
                <td>{errorMessage.trim()}</td>
              </tr>
            )}
            {!isUndefined(fieldsValues[name]) && (
              <tr>
                <td align="right" style={{ paddingRight: 5, fontWeight: 500 }}>
                  Value:
                </td>
                <td>{fieldsValues[name]}</td>
              </tr>
            )}
            {readFormStateRef.current.touched && (
              <tr>
                <td align="right" style={{ paddingRight: 5, fontWeight: 500 }}>
                  Touched:
                </td>
                <td>
                  <code
                    style={{
                      fontSize: 12,
                      color: isTouched ? colors.green : colors.lightPink,
                    }}
                  >
                    {isTouched ? 'true' : 'false'}
                  </code>
                </td>
              </tr>
            )}
            {(readFormStateRef.current as any).dirtyFields && (
              <tr>
                <td align="right" style={{ paddingRight: 5, fontWeight: 500 }}>
                  Dirty:
                </td>
                <td>
                  <code
                    style={{
                      fontSize: 12,
                      color: isDirty ? colors.green : colors.lightPink,
                    }}
                  >
                    {isDirty ? 'true' : 'false'}
                  </code>
                </td>
              </tr>
            )}
          </tbody>
        )}
      </table>
    </Animate>
  );
};

export default PanelTable;
