import * as React from 'react';
import { Animate } from 'react-simple-animate';
import isUndefined from 'lodash/isUndefined';
import isObject from 'lodash/isObject';
import get from 'lodash/get';
import colors from './colors';
import { Button, Table, paraGraphDefaultStyle, Label, Value } from './styled';

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

  let value = fieldsValues ? get(fieldsValues, name) : '';

  if (!isUndefined(value)) {
    if (isObject(value)) {
      try {
        value = (
          <pre style={{ margin: 0 }}>
            <code style={{ fontSize: 12 }}>
              {JSON.stringify(value, null, 2)}
            </code>
          </pre>
        );
      } catch {
        value = <span>[Nested Object]</span>;
      }
    } else if (typeof value !== 'string') {
      value = String(value);
    }
  }

  return (
    <Animate
      play
      start={{ opacity: 0, transform: 'translateY(10px)' }}
      end={{ opacity: 1 }}
      easeType="ease-in"
      delay={index * 0.1}
    >
      <Table hasError={hasError}>
        <Label>
          <Button
            onClick={() => setCollapse(!collapse)}
            title="Toggle field table"
            style={{
              border: `1px solid ${colors.lightBlue}`,
              borderRadius: 2,
              padding: '3px 5px',
              display: 'inline-block',
              fontSize: 10,
              lineHeight: '12px',
              width: 20,
              textAlign: 'center',
              marginRight: 10,
            }}
          >
            {collapse ? '+' : '-'}
          </Button>
          <Button
            onClick={() => {
              if (refObject.scrollIntoView) {
                refObject.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            title="Scroll into view"
            style={{
              border: `1px solid ${colors.lightBlue}`,
              borderRadius: 2,
              padding: '3px 5px',
              display: 'inline-block',
              fontSize: 10,
              lineHeight: '12px',
              textAlign: 'center',
              marginRight: 10,
              ...(isNative
                ? {}
                : { cursor: 'not-allowed', background: colors.lightBlue }),
            }}
          >
            {isNative ? 'Native' : 'Custom'}
          </Button>
        </Label>
        <Value>{name}</Value>
        {!collapse && (
          <>
            {type && (
              <>
                <Label right style={paraGraphDefaultStyle}>
                  Type:
                </Label>
                <Value
                  style={{
                    ...paraGraphDefaultStyle,
                  }}
                >
                  {type}
                </Value>
              </>
            )}
            {errorType && (
              <>
                <Label right style={paraGraphDefaultStyle}>
                  ERROR Type:
                </Label>
                <Value>{errorType}</Value>
              </>
            )}
            {errorMessage && (
              <>
                <Label
                  style={{
                    fontWeight: 500,
                    ...paraGraphDefaultStyle,
                  }}
                >
                  MESSAGE:
                </Label>
                <Value
                  style={{
                    ...paraGraphDefaultStyle,
                  }}
                >
                  {errorMessage.trim()}
                </Value>
              </>
            )}
            {!isUndefined(value) && (
              <>
                <Label right style={paraGraphDefaultStyle}>
                  Value:
                </Label>
                <Value
                  data-testid={`${name}-field-value`}
                  style={{
                    ...paraGraphDefaultStyle,
                  }}
                >
                  {value}
                </Value>
              </>
            )}
            {readFormStateRef.current.touched && (
              <>
                <Label right style={paraGraphDefaultStyle}>
                  Touched:
                </Label>
                <Value>
                  <code
                    style={{
                      color: isTouched ? colors.green : colors.lightPink,
                      ...paraGraphDefaultStyle,
                      fontSize: 12,
                    }}
                  >
                    {isTouched ? 'true' : 'false'}
                  </code>
                </Value>
              </>
            )}
            {(readFormStateRef.current as any).dirtyFields && (
              <>
                <Label right style={paraGraphDefaultStyle}>
                  Dirty:
                </Label>
                <Value>
                  <code
                    style={{
                      color: isDirty ? colors.green : colors.lightPink,
                      ...paraGraphDefaultStyle,
                      fontSize: 12,
                    }}
                  >
                    {isDirty ? 'true' : 'false'}
                  </code>
                </Value>
              </>
            )}
          </>
        )}
      </Table>
    </Animate>
  );
};

export default PanelTable;
