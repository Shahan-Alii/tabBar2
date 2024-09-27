import * as React from 'react';
import Svg, { G, Path, Defs } from 'react-native-svg';

const Shape = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 503.996 214"
        width={props.width || 100}
        height={props.height || 50}
        fill="none"
        preserveAspectRatio="xMidYMid meet" // Ensures proper scaling
        {...props}
    >
        <G>
            <Path
                fill="#232323"
                d="M503.996 116.679C610 170 502.437 214 277.918 214S0 170 52.175 116.679C174.53 68.622 181.26 0 277.918 0c115.013 0 108.618 68.764 226.078 116.679z"
            />
        </G>
        <Defs></Defs>
    </Svg>
);

export default Shape;
