import React from "react";
import Svg, {
  Rect,
  Path,
  Polyline,
  Line,
  Circle,
} from "react-native-svg";
export function PhoneCracked() {
  return (
    <Svg width={44} height={74} viewBox="0 0 44 74" fill="none">
      <Rect x={1.5} y={1.5} width={41} height={71} rx={7} fill="white" fillOpacity={0.15} stroke="#374151" strokeWidth={2} />
      <Rect x={15} y={4} width={14} height={3} rx={1.5} fill="#374151" opacity={0.5} />
      <Rect x={6} y={12} width={32} height={46} rx={3} fill="white" fillOpacity={0.2} stroke="#374151" strokeWidth={1.5} />
      <Polyline points="20,14 16,26 24,30 18,44 26,48 22,58" stroke="#374151" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      <Line x1={24} y1={30} x2={32} y2={36} stroke="#374151" strokeWidth={1.5} strokeLinecap="round" />
      <Line x1={18} y1={44} x2={10} y2={50} stroke="#374151" strokeWidth={1.5} strokeLinecap="round" />
      <Circle cx={22} cy={66} r={3} stroke="#374151" strokeWidth={1.5} />
    </Svg>
  );
}

export function PhoneNoDent() {
  return (
    <Svg width={44} height={74} viewBox="0 0 44 74" fill="none">
      <Rect x={1.5} y={1.5} width={41} height={71} rx={7} fill="white" fillOpacity={0.15} stroke="#374151" strokeWidth={2} />
      <Rect x={15} y={4} width={14} height={3} rx={1.5} fill="#374151" opacity={0.5} />
      <Rect x={6} y={12} width={32} height={46} rx={3} fill="white" fillOpacity={0.2} stroke="#374151" strokeWidth={1.5} />
      <Circle cx={22} cy={35} r={8} stroke="#374151" strokeWidth={1.5} fillOpacity={0} />
      <Polyline points="17,35 21,39 28,31" stroke="#374151" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx={22} cy={66} r={3} stroke="#374151" strokeWidth={1.5} />
    </Svg>
  );
}

export function PhoneMinorDent() {
  return (
    <Svg width={44} height={74} viewBox="0 0 44 74" fill="none">
      <Path d="M8.5 1.5 H35.5 Q42.5 1.5 42.5 8.5 V65.5 Q42.5 72.5 35.5 72.5 H8.5 Q1.5 72.5 1.5 65.5 V8.5 Q1.5 1.5 8.5 1.5Z" fill="white" fillOpacity={0.15} stroke="#374151" strokeWidth={2} />
      <Path d="M34 1.5 Q42.5 1.5 42.5 10 L42.5 16 Q38 10 34 10 Q30 10 30 6 Q30 1.5 34 1.5Z" fill="#374151" opacity={0.3} />
      <Rect x={15} y={4} width={14} height={3} rx={1.5} fill="#374151" opacity={0.5} />
      <Rect x={6} y={12} width={32} height={46} rx={3} fill="white" fillOpacity={0.2} stroke="#374151" strokeWidth={1.5} />
      <Circle cx={22} cy={66} r={3} stroke="#374151" strokeWidth={1.5} />
    </Svg>
  );
}

export function PhoneBent() {
  return (
    <Svg width={44} height={74} viewBox="0 0 44 74" fill="none">
      <Path
        d="M2 10 Q2 2 10 2 L34 2 Q42 2 42 10 L43 37 Q43.5 42 38 43 L6 47 Q1 48 1 54 L2 66 Q2 72 8 72 L36 72 Q42 72 42 66"
        stroke="#374151"
        strokeWidth={2}
        fill="white"
        fillOpacity={0.15}
        strokeLinecap="round"
      />
      <Rect x={8} y={12} width={28} height={30} rx={3} fill="white" fillOpacity={0.2} stroke="#374151" strokeWidth={1.5} />
      <Line x1={10} y1={54} x2={34} y2={58} stroke="#374151" strokeWidth={1.5} strokeLinecap="round" strokeDasharray="3 2" />
    </Svg>
  );
}
export function PhoneChipped() {
  return (
    <Svg width={44} height={74} viewBox="0 0 44 74" fill="none">
      <Rect
        x={1.5}
        y={1.5}
        width={41}
        height={71}
        rx={7}
        fill="white"
        fillOpacity={0.15}
        stroke="currentColor"
        strokeWidth={2}
      />
      <Rect
        x={15}
        y={4}
        width={14}
        height={3}
        rx={1.5}
        fill="currentColor"
        opacity={0.5}
      />
      <Rect
        x={6}
        y={12}
        width={32}
        height={46}
        rx={3}
        fill="white"
        fillOpacity={0.2}
        stroke="currentColor"
        strokeWidth={1.5}
      />
      {/* chip on outer edge/frame, not the display */}
      <Polyline
        points="2,20 6,24 3,28"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Polyline
        points="42,44 38,48 41,52"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={22} cy={66} r={3} stroke="currentColor" strokeWidth={1.5} />
    </Svg>
  );
}

export function PhoneManyScratches() {
  return (
    <Svg width={44} height={74} viewBox="0 0 44 74" fill="none">
      <Rect
        x={1.5}
        y={1.5}
        width={41}
        height={71}
        rx={7}
        fill="white"
        fillOpacity={0.15}
        stroke="currentColor"
        strokeWidth={2}
      />
      <Rect
        x={15}
        y={4}
        width={14}
        height={3}
        rx={1.5}
        fill="currentColor"
        opacity={0.5}
      />
      <Rect
        x={6}
        y={12}
        width={32}
        height={46}
        rx={3}
        fill="white"
        fillOpacity={0.2}
        stroke="currentColor"
        strokeWidth={1.5}
      />
      <Line x1={11} y1={16} x2={16} y2={30} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      <Line x1={17} y1={18} x2={21} y2={32} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      <Line x1={23} y1={20} x2={27} y2={34} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      <Line x1={29} y1={22} x2={33} y2={36} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      <Line x1={14} y1={38} x2={18} y2={50} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      <Line x1={22} y1={40} x2={26} y2={52} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      <Circle cx={22} cy={66} r={3} stroke="currentColor" strokeWidth={1.5} />
    </Svg>
  );
}
export function PhoneMinorScratch() {
  return (
    <Svg width={44} height={74} viewBox="0 0 44 74" fill="none">
      <Rect
        x={1.5}
        y={1.5}
        width={41}
        height={71}
        rx={7}
        fill="white"
        fillOpacity={0.15}
        stroke="currentColor"
        strokeWidth={2}
      />
      <Rect
        x={15}
        y={4}
        width={14}
        height={3}
        rx={1.5}
        fill="currentColor"
        opacity={0.5}
      />
      <Rect
        x={6}
        y={12}
        width={32}
        height={46}
        rx={3}
        fill="white"
        fillOpacity={0.2}
        stroke="currentColor"
        strokeWidth={1.5}
      />
      <Line x1={13} y1={18} x2={19} y2={32} stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
      <Line x1={25} y1={22} x2={29} y2={34} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      <Circle cx={22} cy={66} r={3} stroke="currentColor" strokeWidth={1.5} />
    </Svg>
  );
}
export function PhoneClean() {
  return (
    <Svg width={44} height={74} viewBox="0 0 44 74" fill="none">
      <Rect
        x={1.5}
        y={1.5}
        width={41}
        height={71}
        rx={7}
        fill="white"
        fillOpacity={0.15}
        stroke="currentColor"
        strokeWidth={2}
      />
      <Rect
        x={15}
        y={4}
        width={14}
        height={3}
        rx={1.5}
        fill="currentColor"
        opacity={0.5}
      />
      <Rect
        x={6}
        y={12}
        width={32}
        height={46}
        rx={3}
        fill="white"
        fillOpacity={0.2}
        stroke="currentColor"
        strokeWidth={1.5}
      />
      <Polyline
        points="14,35 20,41 30,29"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={22} cy={66} r={3} stroke="currentColor" strokeWidth={1.5} />
    </Svg>
  );
}

export function PhoneNoSpots() {
  return (
    <Svg width={44} height={74} viewBox="0 0 44 74" fill="none">
      <Rect
        x={1.5} y={1.5} width={41} height={71} rx={7}
        fill="white" fillOpacity={0.15}
        stroke="currentColor" strokeWidth={2}
      />

      <Rect
        x={15} y={4} width={14} height={3} rx={1.5}
        fill="currentColor" opacity={0.5}
      />

      <Rect
        x={6} y={12} width={32} height={46} rx={3}
        fill="white" fillOpacity={0.2}
        stroke="currentColor" strokeWidth={1.5}
      />

      <Polyline
        points="14,35 20,41 30,29"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Circle
        cx={22} cy={66} r={3}
        stroke="currentColor" strokeWidth={1.5}
      />
    </Svg>
  );
}

export function PhoneMinorSpot() {
  return (
    <Svg width={44} height={74} viewBox="0 0 44 74" fill="none">
      <Rect
        x={1.5} y={1.5} width={41} height={71} rx={7}
        fill="white" fillOpacity={0.15}
        stroke="currentColor" strokeWidth={2}
      />

      <Rect
        x={15} y={4} width={14} height={3} rx={1.5}
        fill="currentColor" opacity={0.5}
      />

      <Rect
        x={6} y={12} width={32} height={46} rx={3}
        fill="white" fillOpacity={0.2}
        stroke="currentColor" strokeWidth={1.5}
      />

      <Circle cx={17} cy={28} r={2} fill="currentColor" />
      <Circle cx={27} cy={40} r={2} fill="currentColor" />

      <Circle
        cx={22} cy={66} r={3}
        stroke="currentColor" strokeWidth={1.5}
      />
    </Svg>
  );
}

export function PhoneManySpots() {
  return (
    <Svg width={44} height={74} viewBox="0 0 44 74" fill="none">
      <Rect
        x={1.5}
        y={1.5}
        width={41}
        height={71}
        rx={7}
        fill="white"
        fillOpacity={0.15}
        stroke="currentColor"
        strokeWidth={2}
      />

      <Rect
        x={15}
        y={4}
        width={14}
        height={3}
        rx={1.5}
        fill="currentColor"
        opacity={0.5}
      />

      <Rect
        x={6}
        y={12}
        width={32}
        height={46}
        rx={3}
        fill="white"
        fillOpacity={0.2}
        stroke="currentColor"
        strokeWidth={1.5}
      />

      <Circle cx={13} cy={22} r={2} fill="currentColor" />
      <Circle cx={22} cy={27} r={2} fill="currentColor" />
      <Circle cx={31} cy={22} r={2} fill="currentColor" />
      <Circle cx={16} cy={38} r={2} fill="currentColor" />
      <Circle cx={27} cy={42} r={2} fill="currentColor" />
      <Circle cx={22} cy={50} r={2} fill="currentColor" />

      <Circle
        cx={22}
        cy={66}
        r={3}
        stroke="currentColor"
        strokeWidth={1.5}
      />
    </Svg>
  );
}

export function PhoneLargeSpot() {
  return (
    <Svg width={44} height={74} viewBox="0 0 44 74" fill="none">
      <Rect
        x={1.5}
        y={1.5}
        width={41}
        height={71}
        rx={7}
        fill="white"
        fillOpacity={0.15}
        stroke="currentColor"
        strokeWidth={2}
      />

      <Rect
        x={15}
        y={4}
        width={14}
        height={3}
        rx={1.5}
        fill="currentColor"
        opacity={0.5}
      />

      <Rect
        x={6}
        y={12}
        width={32}
        height={46}
        rx={3}
        fill="white"
        fillOpacity={0.2}
        stroke="currentColor"
        strokeWidth={1.5}
      />

      <Circle
        cx={22}
        cy={35}
        r={10}
        fill="currentColor"
        opacity={0.25}
      />

      <Circle
        cx={22}
        cy={35}
        r={6}
        fill="currentColor"
        opacity={0.35}
      />

      <Circle
        cx={22}
        cy={66}
        r={3}
        stroke="currentColor"
        strokeWidth={1.5}
      />
    </Svg>
  );
}



/* Common Phone Frame */
const PhoneFrame = ({ children, color = "#374151" }) => {
  return (
    <Svg width={44} height={74} viewBox="0 0 44 74" fill="none">
      {/* Phone Body */}
      <Rect
        x={1.5}
        y={1.5}
        width={41}
        height={71}
        rx={7}
        fill="white"
        fillOpacity={0.15}
        stroke={color}
        strokeWidth={2}
      />

      {/* Speaker */}
      <Rect
        x={15}
        y={4}
        width={14}
        height={3}
        rx={1.5}
        fill={color}
        opacity={0.5}
      />

      {/* Screen */}
      <Rect
        x={6}
        y={12}
        width={32}
        height={46}
        rx={3}
        fill="white"
        fillOpacity={0.2}
        stroke={color}
        strokeWidth={1.5}
      />

      {/* Functional Defect Icon */}
      {children}

      {/* Home Button */}
      <Circle
        cx={22}
        cy={66}
        r={3}
        stroke={color}
        strokeWidth={1.5}
      />
    </Svg>
  );
};


/* 1. Front Camera */
export function PhoneFrontCamera() {
  return (
    <PhoneFrame>
      <Circle
        cx={22}
        cy={35}
        r={7}
        stroke="#374151"
        strokeWidth={1.8}
      />
      <Circle
        cx={22}
        cy={35}
        r={3}
        stroke="#374151"
        strokeWidth={1.5}
      />
      <Circle
        cx={22}
        cy={35}
        r={1}
        fill="#374151"
      />
    </PhoneFrame>
  );
}


/* 2. Back Camera */
export function PhoneBackCamera() {
  return (
    <PhoneFrame>
      <Rect
        x={14}
        y={27}
        width={16}
        height={16}
        rx={4}
        stroke="#374151"
        strokeWidth={1.8}
      />
      <Circle
        cx={22}
        cy={35}
        r={4}
        stroke="#374151"
        strokeWidth={1.5}
      />
    </PhoneFrame>
  );
}


/* 3. Volume Button */
export function PhoneVolumeButton() {
  return (
    <PhoneFrame>
      <Line
        x1={14}
        y1={29}
        x2={30}
        y2={29}
        stroke="#374151"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Line
        x1={14}
        y1={35}
        x2={30}
        y2={35}
        stroke="#374151"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Line
        x1={14}
        y1={41}
        x2={30}
        y2={41}
        stroke="#374151"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </PhoneFrame>
  );
}


/* 4. WiFi */
export function PhoneWifi() {
  return (
    <PhoneFrame>
      <Path
        d="M13 30 Q22 22 31 30"
        stroke="#374151"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M16 35 Q22 29 28 35"
        stroke="#374151"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M19 40 Q22 37 25 40"
        stroke="#374151"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Circle
        cx={22}
        cy={44}
        r={1.5}
        fill="#374151"
      />
    </PhoneFrame>
  );
}


/* 5. Finger Touch */
export function PhoneFingerprint() {
  return (
    <PhoneFrame>
      <Path
        d="M22 27 C17 27 14 31 14 36"
        stroke="#374151"
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <Path
        d="M22 30 C18 30 16 33 16 37"
        stroke="#374151"
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <Path
        d="M22 33 C20 33 19 35 19 38"
        stroke="#374151"
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <Path
        d="M22 27 C27 27 30 31 30 36"
        stroke="#374151"
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <Path
        d="M22 30 C26 30 28 33 28 37"
        stroke="#374151"
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </PhoneFrame>
  );
}


/* 6. Battery Warning */
export function PhoneBatteryWarning() {
  return (
    <PhoneFrame>
      <Rect
        x={16}
        y={27}
        width={12}
        height={16}
        rx={2}
        stroke="#374151"
        strokeWidth={1.8}
      />
      <Rect
        x={20}
        y={24}
        width={4}
        height={3}
        rx={1}
        fill="#374151"
      />
      <Line
        x1={22}
        y1={30}
        x2={22}
        y2={37}
        stroke="#374151"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Circle
        cx={22}
        cy={40}
        r={1}
        fill="#374151"
      />
    </PhoneFrame>
  );
}


/* 7. Battery 80-85 */
export function PhoneBatteryMedium() {
  return (
    <PhoneFrame>
      <Rect
        x={15}
        y={27}
        width={14}
        height={16}
        rx={2}
        stroke="#374151"
        strokeWidth={1.8}
      />
      <Rect
        x={19}
        y={24}
        width={6}
        height={3}
        rx={1}
        fill="#374151"
      />
      <Rect
        x={18}
        y={36}
        width={8}
        height={5}
        rx={1}
        fill="#374151"
      />
    </PhoneFrame>
  );
}


/* 8. Battery Faulty */
export function PhoneBatteryFaulty() {
  return (
    <PhoneFrame>
      <Rect
        x={15}
        y={27}
        width={14}
        height={16}
        rx={2}
        stroke="#374151"
        strokeWidth={1.8}
      />
      <Rect
        x={19}
        y={24}
        width={6}
        height={3}
        rx={1}
        fill="#374151"
      />
      <Line
        x1={19}
        y1={35}
        x2={25}
        y2={41}
        stroke="#374151"
        strokeWidth={2}
      />
      <Line
        x1={25}
        y1={35}
        x2={19}
        y2={41}
        stroke="#374151"
        strokeWidth={2}
      />
    </PhoneFrame>
  );
}


/* 9. Speaker */
export function PhoneSpeaker() {
  return (
    <PhoneFrame>
      <Path
        d="M15 31 L20 31 L26 27 V43 L20 39 H15 Z"
        stroke="#374151"
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      <Path
        d="M28 32 Q32 35 28 38"
        stroke="#374151"
        strokeWidth={1.8}
        fill="none"
      />
    </PhoneFrame>
  );
}


/* 10. Charging Port */
export function PhoneChargingPort() {
  return (
    <PhoneFrame>
      <Rect
        x={16}
        y={32}
        width={12}
        height={7}
        rx={2}
        stroke="#374151"
        strokeWidth={1.8}
      />
      <Line
        x1={22}
        y1={27}
        x2={22}
        y2={32}
        stroke="#374151"
        strokeWidth={2}
      />
      <Polyline
        points="19,28 22,24 25,28"
        stroke="#374151"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </PhoneFrame>
  );
}

/* Microphone Not Working */
export function PhoneMicrophone() {
  return (
    <PhoneFrame>
      {/* Microphone Body */}
      <Rect
        x={18}
        y={27}
        width={8}
        height={14}
        rx={4}
        stroke="#374151"
        strokeWidth={1.8}
      />

      {/* Mic Stand */}
      <Line
        x1={22}
        y1={41}
        x2={22}
        y2={46}
        stroke="#374151"
        strokeWidth={1.8}
        strokeLinecap="round"
      />

      {/* Base */}
      <Path
        d="M17 46 H27"
        stroke="#374151"
        strokeWidth={1.8}
        strokeLinecap="round"
      />

      {/* Cross mark (Not Working) */}
      <Line
        x1={15}
        y1={28}
        x2={29}
        y2={42}
        stroke="#374151"
        strokeWidth={2}
        strokeLinecap="round"
      />

      <Line
        x1={29}
        y1={28}
        x2={15}
        y2={42}
        stroke="#374151"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </PhoneFrame>
  );
}


/* 11. Power Button */
export function PhonePowerButton() {
  return (
    <PhoneFrame>
      <Path
        d="M22 27 V35"
        stroke="#374151"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M17 30 A7 7 0 1 0 27 30"
        stroke="#374151"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
      />
    </PhoneFrame>
  );
}


/* 12. Face Sensor */
export function PhoneFaceSensor() {
  return (
    <PhoneFrame>
      <Rect
        x={14}
        y={28}
        width={16}
        height={14}
        rx={4}
        stroke="#374151"
        strokeWidth={1.8}
      />
      <Circle
        cx={19}
        cy={34}
        r={1}
        fill="#374151"
      />
      <Circle
        cx={25}
        cy={34}
        r={1}
        fill="#374151"
      />
      <Path
        d="M18 38 Q22 41 26 38"
        stroke="#374151"
        strokeWidth={1.5}
        fill="none"
      />
    </PhoneFrame>
  );
}


/* 13. Silent Button */
export function PhoneSilentButton() {
  return (
    <PhoneFrame>
      <Path
        d="M17 32 H20 L24 28 V42 L20 38 H17 Z"
        stroke="#374151"
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      <Line
        x1={26}
        y1={30}
        x2={30}
        y2={40}
        stroke="#374151"
        strokeWidth={2}
      />
      <Line
        x1={30}
        y1={30}
        x2={26}
        y2={40}
        stroke="#374151"
        strokeWidth={2}
      />
    </PhoneFrame>
  );
}


/* 14. Audio Receiver */
export function PhoneAudioReceiver() {
  return (
    <PhoneFrame>
      <Path
        d="M15 30 Q22 24 29 30"
        stroke="#374151"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
      />
      <Path
        d="M18 34 Q22 30 26 34"
        stroke="#374151"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
      />
      <Circle
        cx={22}
        cy={39}
        r={2}
        fill="#374151"
      />
    </PhoneFrame>
  );
}


/* 15. Camera Glass Broken */
export function PhoneCameraGlassBroken() {
  return (
    <PhoneFrame>
      <Circle
        cx={22}
        cy={35}
        r={8}
        stroke="#374151"
        strokeWidth={1.8}
      />
      <Polyline
        points="18,28 21,34 18,39 24,36 27,42"
        stroke="#374151"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </PhoneFrame>
  );
}


/* 16. Bluetooth */
export function PhoneBluetooth() {
  return (
    <PhoneFrame>
      <Path
        d="M22 26 V44 L28 38 L16 30 L28 22 L22 26"
        stroke="#374151"
        strokeWidth={1.8}
        fill="none"
        strokeLinejoin="round"
      />
    </PhoneFrame>
  );
}


/* 17. Vibrator */
export function PhoneVibrator() {
  return (
    <PhoneFrame>
      <Rect
        x={18}
        y={28}
        width={8}
        height={14}
        rx={2}
        stroke="#374151"
        strokeWidth={1.8}
      />
      <Line
        x1={15}
        y1={30}
        x2={15}
        y2={40}
        stroke="#374151"
        strokeWidth={1.8}
      />
      <Line
        x1={29}
        y1={30}
        x2={29}
        y2={40}
        stroke="#374151"
        strokeWidth={1.8}
      />
    </PhoneFrame>
  );
}


/* 18. Proximity Sensor */
export function PhoneProximitySensor() {
  return (
    <PhoneFrame>
      <Circle
        cx={22}
        cy={35}
        r={7}
        stroke="#374151"
        strokeWidth={1.8}
      />
      <Circle
        cx={22}
        cy={35}
        r={2}
        fill="#374151"
      />
      <Path
        d="M12 35 H15 M29 35 H32"
        stroke="#374151"
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </PhoneFrame>
  );
}

/* 19. Original Charger */
export function PhoneCharger() {
  return (
    <PhoneFrame>
      {/* Charger */}
      <Rect
        x={17}
        y={27}
        width={10}
        height={12}
        rx={2}
        stroke="#374151"
        strokeWidth={1.8}
      />

      {/* Charger cable */}
      <Path
        d="M22 39 V44 Q22 47 19 47 H16"
        stroke="#374151"
        strokeWidth={1.8}
        fill="none"
        strokeLinecap="round"
      />

      {/* Plug pins */}
      <Line
        x1={19}
        y1={27}
        x2={19}
        y2={24}
        stroke="#374151"
        strokeWidth={1.8}
        strokeLinecap="round"
      />

      <Line
        x1={25}
        y1={27}
        x2={25}
        y2={24}
        stroke="#374151"
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </PhoneFrame>
  );
}


/* 20. Original Box */
export function PhoneBox() {
  return (
    <PhoneFrame>
      {/* Box */}
      <Rect
        x={14}
        y={28}
        width={16}
        height={14}
        rx={2}
        stroke="#374151"
        strokeWidth={1.8}
      />

      {/* Box lid */}
      <Line
        x1={14}
        y1={33}
        x2={30}
        y2={33}
        stroke="#374151"
        strokeWidth={1.5}
      />

      {/* Box logo */}
      <Circle
        cx={22}
        cy={37}
        r={2.5}
        stroke="#374151"
        strokeWidth={1.5}
      />
    </PhoneFrame>
  );
}


/* 21. Original S Pen */
export function PhoneSPen() {
  return (
    <PhoneFrame>
      {/* S Pen body */}
      <Path
        d="M17 40 L27 30"
        stroke="#374151"
        strokeWidth={3}
        strokeLinecap="round"
      />

      {/* Pen tip */}
      <Path
        d="M16 41 L17 37"
        stroke="#374151"
        strokeWidth={1.8}
        strokeLinecap="round"
      />

      {/* Pen top */}
      <Circle
        cx={28}
        cy={29}
        r={2}
        stroke="#374151"
        strokeWidth={1.5}
      />
    </PhoneFrame>
  );
}


