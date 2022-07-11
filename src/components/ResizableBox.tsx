import React, { FunctionComponent, ReactElement } from "react";
import { ResizableBox as ReactResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

type Props = {
  children: any;
  width?: number;
  height?: number;
  resizable?: boolean;
  style?: {};
  className?: string;
}

export const ResizableBox: FunctionComponent<Props> = ({
  children,
  width = 600,
  height = 300,
  resizable = true,
  style = {},
  className = "",
}): ReactElement => {
  return (
    <div style={{ marginLeft: 20 }}>
      {resizable ? (
        <ReactResizableBox width={width} height={height}>
          <div
            style={{
              boxShadow: "0 20px 40px rgba(0,0,0,.1)",
              ...style,
              width: "100%",
              height: "100%",
            }}
            className={className}
          >
            {children}
          </div>
        </ReactResizableBox>
      ) : (
        <div
          style={{
            width: `${width}px`,
            height: `${height}px`,
            boxShadow: "0 20px 40px rgba(0,0,0,.1)",
            ...style,
          }}
          className={className}
        >
          {children}
        </div>
      )}
    </div>
  );
}
