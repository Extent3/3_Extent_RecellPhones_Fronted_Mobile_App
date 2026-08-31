import React from 'react';
import Svg, { Circle, Path, Rect, Text as SvgText } from 'react-native-svg';

export const AppleLogo = ({ size = 40 }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
  >
    <Path
      fill="#000000"
      d="M45.2 34.2c0-6.2 5.1-9.2 5.3-9.3-2.9-4.2-7.4-4.8-9-4.9-3.8-.4-7.4 2.2-9.3 2.2-1.9 0-4.9-2.2-8-2.1-4.1.1-7.9 2.4-10 6.1-4.3 7.5-1.1 18.5 3 24.6 2 3 4.4 6.3 7.5 6.2 3-.1 4.1-2 7.8-2 3.6 0 4.7 2 7.8 1.9 3.2-.1 5.2-3 7.1-6 2.3-3.4 3.2-6.7 3.3-6.9-.1 0-6.3-2.4-6.3-9.8ZM39.1 16c1.7-2.1 2.8-5 2.5-7.9-2.4.1-5.3 1.6-7 3.7-1.5 1.8-2.9 4.8-2.5 7.6 2.7.2 5.4-1.3 7-3.4Z"
    />
  </Svg>
);

export const SamsungLogo = ({ size = 40 }) => (
  <Svg width="80" height="40" viewBox="0 0 120 64"
  >

    <SvgText

      x="60"
      y="38"
      fontSize="14"
      textAnchor="middle"
      fontWeight="bold"
      fill="#1428A0"
    >
      SAMSUNG
    </SvgText>
  </Svg>
);

export const OnePlusLogo = ({ size = 40 }) => (
  <Svg width="100"
    height="50"
    viewBox="0 0 120 64">


    <SvgText

      x="60"
      y="38"
      fontSize="12"
      fill="#EB0029"

      textAnchor="middle"
      fontWeight="bold"
    >
      ONEPLUS
    </SvgText>
  </Svg>
);

export const XiaomiLogo = ({ size = 40 }) => (
  <Svg width={size}
    height={size}
    viewBox="0 0 64 64">
    <Rect x="4" y="4" width="56"
      height="56" rx="8" fill="#FF6900" />
    <Path
      d="M15 42V22h6v20h-6zm10 0V29c0-4 2.5-7 7-7s7 3 7 7v13h-6V30c0-1.5-.3-2-1-2s-1 .5-1 2v12h-6zm18 0V22h6v20h-6z"
      fill="#FFFFFF"
    />
  </Svg>
);
export const VivoLogo = ({ size = 44 }) => (
  <Svg
    width="100" height="50"
    viewBox="0 0 120 64"
  >
    <SvgText
      x="60"
      y="40"
      fontSize="22"
      textAnchor="middle"
      fontWeight="600"
      fill="#415FFF"
    >
      vivo
    </SvgText>
  </Svg>
);


export const OppoLogo = ({ size = 40 }) => (
  <Svg width="120" height="64" viewBox="0 0 120 64">
    <SvgText
      x="60"
      y="39"
      fontSize="16"
      fill="#1D9E45"
      textAnchor="middle"
      fontWeight="bold"
    >
      OPPO
    </SvgText>
  </Svg>
);

export const RealmeLogo = ({ size = 40 }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
  >
    <Rect
      x="4"
      y="4"
      width="56"
      height="56"
      rx="8"
      fill="#FFD500"
    />

    <SvgText
      x="32"
      y="37"
      fontSize="16"
      textAnchor="middle"
      fontWeight="bold"
      fill="#000000"
    >
      realme
    </SvgText>
  </Svg>
);

export const GoogleLogo = ({ size = 40 }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
  >
    {/* Blue */}
    <Path
      fill="#4285F4"
      d="M47.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h13.2c-.6 2.7-2.1 5-4.5 6.5v5.4h7.3c4.3-4 7.5-9.9 7.5-16.9z"
    />

    {/* Green */}
    <Path
      fill="#34A853"
      d="M24 48c6.5 0 12-2.1 16-5.6l-7.3-5.4c-2 1.3-4.6 2.1-8.7 2.1-6.7 0-12.4-4.5-14.5-10.6H2v5.6C6 42.9 14.3 48 24 48z"
    />

    {/* Yellow */}
    <Path
      fill="#fbbc05"
      d="M9.5 28.5c-.5-1.3-.8-2.8-.8-4.5s.3-3.1.8-4.5v-5.6H2C.7 16.5 0 20.1 0 24s.7 7.5 2 10.1l7.5-5.6z"
    />

    {/* Red */}
    <Path
      fill="#EA4335"
      d="M24 9.6c3.5 0 6.6 1.2 9.1 3.5l6.8-6.8C36 2.3 30.5 0 24 0 14.3 0 6 5.1 2 13.9l7.5 5.6C11.6 14.1 17.3 9.6 24 9.6z"
    />
  </Svg>
);
export const NokiaLogo = ({ width = 44, height = 28 }) => (
  <Svg
    width={80}
    height={40}
    viewBox="0 0 120 64"
  >
    <SvgText
      x="60"
      y="40"
      fontSize="22"
      textAnchor="middle"
      fontWeight="700"
      letterSpacing="1"
      fill="#124191"
    >
      NOKIA
    </SvgText>
  </Svg>
);

export const NothingLogo = ({ width = 48, height = 24 }) => (
  <Svg
    width={70}
    height={40}
    viewBox="0 0 120 50"
  >
    <SvgText
      x="60"
      y="34"
      fontSize="18"
      textAnchor="middle"
      fontWeight="600"
      fill="#000000"
    >
      NOTHING
    </SvgText>
  </Svg>
);
export const IQOOLogo = ({ width = 44, height = 24 }) => (
  <Svg
    width={100}
    height={40}
    viewBox="0 0 120 50"
  >
    <SvgText
      x="60"
      y="34"
      fontSize="22"
      textAnchor="middle"
      fontWeight="700"
      fill="#fbbc05"
    >
      iQOO
    </SvgText>
  </Svg>
);

export const MotorolaLogo = ({ width = 60, height = 20 }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 110 40"
  >
    {/* Motorola Logo Circle */}
    <Circle
      cx="18"
      cy="20"
      r="14"
      fill="#EA4335"
    />

    {/* Motorola Batwing M */}
    <Path
      d="M10 29V11h4l4 6 4-6h4v18h-4V18l-4 7-4-7v11h-4Z"
      fill="#FFFFFF"
    />

    {/* Motorola Name */}
    <SvgText
      x="70"
      y="26"
      fontSize="18"
      textAnchor="middle"
      fontWeight="bold"
      fill="#000000"
    >
      motorola
    </SvgText>
  </Svg>
);
export const LenovoLogo = () => (
  <Svg
    width={40}
    height={40}
    viewBox="0 0 64 64"
  >
    <Rect
      x="4"
      y="4"
      width="56"
      height="56"
      rx="8"
      fill="#E2231A"
    />
    <SvgText
      x="32"
      y="37"
      fontSize="16"
      textAnchor="middle"
      fontWeight="bold"
      fill="#ffffff"
    >
      Lenovo
    </SvgText>
  </Svg>
);

export const HonorLogo = () => (
  <Svg
    width={60}
    height={40}
    viewBox="0 0 120 50"
  >
    <SvgText
      x="60"
      y="35"
      fontSize="20"
      textAnchor="middle"
      fontWeight="bold"
      fill="#5B2C83"
    >
      HONOR
    </SvgText>
  </Svg>
);

export const PocoLogo = () => (
  <Svg
    width={100}
    height={40}
    viewBox="0 0 120 50"
  >

    <SvgText
      x="60"
      y="34"
      fontSize="16"
      textAnchor="middle"
      fontWeight="bold"
      fill="#FFD600"
    >
      POCO
    </SvgText>
  </Svg>
);

export const InfinixLogo = () => (
  <Svg
    width={100}
    height={40}
    viewBox="0 0 120 50"
  >
    <SvgText
      x="60"
      y="35"
      fontSize="16"
      textAnchor="middle"
      fontWeight="700"
      fill="#000000"
    >
      Infinix
    </SvgText>
  </Svg>
);

export const TecnoLogo = () => (
  <Svg
    width={80}
    height={40}
    viewBox="0 0 120 50"
  >
    <SvgText
      x="60"
      y="35"
      fontSize="20"
      textAnchor="middle"
      fontWeight="700"
      fill="#1022ec"
    >
      TECNO
    </SvgText>
  </Svg>
);

export const LGLogo = ({ width = 52, height = 32 }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 120 64"
  >
    {/* LG Logo Circle */}
    <Circle
      cx="32"
      cy="32"
      r="22"
      fill="#A50034"
    />

    {/* LG Symbol */}
    <Path
      d="M15 32a11 11 0 1 0 11-11v5a6 6 0 1 1-6 6h5v-5h-5v10h10v-5h5v10H26a11 11 0 0 1-11-10Z"
      fill="#FFFFFF"
    />

    {/* Eye */}
    <Circle
      cx="31"
      cy="28"
      r="1.8"
      fill="#A50034"
    />

    {/* LG Name */}
    <SvgText
      x="80"
      y="39"
      fontSize="32"
      textAnchor="middle"
      fontWeight="bold"
      fill="#a59fa1"
    >
      LG
    </SvgText>
  </Svg>
);

export const AsusLogo = () => (
  <Svg
    width={100}
    height={20}
    viewBox="0 0 120 40"
  >
    <SvgText
      x="60"
      y="29"
      fontSize="20"
      textAnchor="middle"
      fontWeight="bold"
      fill="#000000"
      letterSpacing="1"
    >
      ASUS
    </SvgText>
  </Svg>
);

export const HuaweiLogo = () => (
  <Svg
    width={80}
    height={40}
    viewBox="0 0 120 40"
  >
    <SvgText
      x="60"
      y="28"
      fontSize="17"
      textAnchor="middle"
      fontWeight="700"
      fill="#5e5d5c"
    >
      HUAWEI
    </SvgText>
  </Svg>
);