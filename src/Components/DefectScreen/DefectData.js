
import {
  PhoneCracked,
  PhoneClean,
  PhoneMinorDent,
  PhoneBent,
  PhoneNoDent,
  PhoneMinorScratch,
  PhoneManyScratches,
  PhoneChipped,
  PhoneNoSpots,
  PhoneMinorSpot,
  PhoneManySpots,
  PhoneLargeSpot,
  PhoneFrontCamera,
  PhoneBackCamera,
  PhoneVolumeButton,
  PhoneWifi,
  PhoneFingerprint,
  PhoneBatteryWarning,
  PhoneBatteryMedium,
  PhoneBatteryFaulty,
  PhoneSpeaker,
  PhoneChargingPort,
  PhonePowerButton,
  PhoneFaceSensor,
  PhoneSilentButton,
  PhoneAudioReceiver,
  PhoneCameraGlassBroken,
  PhoneBluetooth,
  PhoneVibrator,
  PhoneProximitySensor,
  PhoneMicrophone,
  PhoneCharger,
  PhoneBox,
  PhoneSPen,
} from "./PhoneIcons";

export const DEFECT_ICONS = {
  // Body Defects
  "Broken/scratch on device screen": PhoneCracked,
  "Dead Spot/Visible line and Discoloration on screen": PhoneMinorDent,
  "Scratch/Dent on device body": PhoneBent,
  "Device panel missing/broken": PhoneNoDent,

  // Broken Scratch
  "Screen cracked/ glass broken": PhoneCracked,
  "Chipped/cracked outside display area": PhoneChipped,
  "More than 2 scratches on screen": PhoneManyScratches,
  "1-2 scratches on screen": PhoneMinorScratch,

  // Scratches Body Defect
  "No scratches": PhoneClean,
  "1-2 scratches": PhoneMinorScratch,
  "More than 2 scratches": PhoneManyScratches,
  "No dents": PhoneClean,
  "1-2 minor dents": PhoneMinorDent,
  "Major dent(s) or more than 2": PhoneBent,

  // Device Panel Missing
  "No defect on side or back panel": PhoneClean,
  "Cracked/ broken side or back panel": PhoneCracked,
  "Missing side or back panel": PhoneNoDent,
  "Phone not bent": PhoneClean,
  "Bent/ curved panel": PhoneBent,
  "Loose screen (Gap in screen and body)": PhoneMinorScratch,

  // Defective Screen
  "No spots on screen": PhoneNoSpots,
  "1-2 minor spots on screen": PhoneMinorSpot,
  "3 or more minor spots on screen": PhoneManySpots,
  "Large/ heavy visible spots on screen": PhoneLargeSpot,

  "No line(s) on Display": PhoneNoSpots,
  "Display faded along edges": PhoneMinorSpot,
  "Visible line(s) on display": PhoneManyScratches,

  "No Discoloration": PhoneNoSpots,
  "Minor Discoloration": PhoneMinorSpot,
  "Major Discoloration": PhoneLargeSpot,

  // Functional Defects
  "Font Camera not working": PhoneFrontCamera,
  "Back Camera not Working": PhoneBackCamera,
  "Volume Button not working": PhoneVolumeButton,
  "WiFi not working": PhoneWifi,
  "Finger Touch not working": PhoneFingerprint,
  "Battery in Service (Health is less than 80%)": PhoneBatteryWarning,
  "Battery Health 80-85%": PhoneBatteryMedium,
  "Battery Faulty": PhoneBatteryFaulty,
  "Speaker Faulty": PhoneSpeaker,
  "Charging port not working": PhoneChargingPort,
  "Power Button not working": PhonePowerButton,
  "Face Sensor not working": PhoneFaceSensor,
  "Silent Button not working": PhoneSilentButton,
  "Audio Receiver not working": PhoneAudioReceiver,
  "Camera Glass Broken": PhoneCameraGlassBroken,
  "Bluetooth not working": PhoneBluetooth,
  "Vibrator is not  working": PhoneVibrator,
  "Microphone not working": PhoneMicrophone,
  "Proximity Sensor not working": PhoneProximitySensor,

  // Available Accessories
  "Original Charger of Device": PhoneCharger,
  "Original Box with same IMEI": PhoneBox,
  "Original S Pen": PhoneSPen,
};



export const DEFECT_DATA = {
  //  BODY DEFECT
  bodyDefect: {
    title: "Body Defects",
    subtitle: "Select screen / body defects that are applicable!",
    nextScreen: "DefectSelection",
    nextType: "brokenScratch",
  },

  //  BROKEN SCRATCH
  brokenScratch: {
    title: "Broken Scratch",
    subtitle: "Tell us more about your device screen defects?",

    nextScreen: "DefectSelection",
    nextType: "scratchesBodyDefect",
  },

  //  SCRATCHES BODY DEFECT
  scratchesBodyDefect: {
    title: "Scratches Body Defect",
    subtitle: "Tell us more about scratches and dents on your device?",

    nextScreen: "DefectSelection",
    nextType: "devicePanelMissing",
  },

  //  DEVICE PANEL MISSING
  devicePanelMissing: {
    title: "Device Panel Missing",
    subtitle: "Tell us about the side and back panel of your device?",

    nextScreen: "DefectSelection",
    nextType: "defectiveScreen",
  },
  defectiveScreen: {
    title: "Defective Screen",
    subtitle: "Check your device's screen for visible spots ?",

    nextScreen: "DefectSelection",
    nextType: "functionalDefect",
  },
  functionalDefect: {
    title: "Functional Defects",
    subtitle: "Tell us about the functional defects of your device?",

    nextScreen: "DefectSelection",
    nextType: "availableAccessories",
  },
  availableAccessories: {
    title: "Available Accessories",
    subtitle: "Select the accessories available with your device?",
  },


};