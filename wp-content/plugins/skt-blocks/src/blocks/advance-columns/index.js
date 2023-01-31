/**
 * BLOCK: SKT Blocks Advance Columns
 */

// Import block dependencies and components
import Edit from "./components/edit";
import Save from "./components/save";

// Import CSS
import "./styles/style.scss";
import "./styles/styles.editor.scss";

// Internationalization
const { __ } = wp.i18n;

// Register block
const { registerBlockType } = wp.blocks;

// Register the block
registerBlockType("skt-blocks/advance-columns", {
  title: __("Advanced Columns", "skt-blocks"),
  description: __(
    "This block gives you advanced options to insert a number of columns within a single row.",
    "skt-blocks"
  ),
  icon: "layout",
  category: "skt_blocks",
  keywords: [
    __("calendar", "skt-blocks"),
    __("date", "skt-blocks"),
    __("responsive", "skt-blocks"),
  ],
  example: {},
  supports: {
    align: ["wide", "full"],
  },
  attributes: {
    columns: {
      type: "number",
      default: 2,
    },
    columnGap: {
      type: "string",
      default: "default",
    },
    width: {
      type: "number",
      default: 900,
    },
    widthType: {
      type: "string",
      default: "px",
    },
    contentWidth: {
      type: "string",
      default: "theme",
    },
    stack: {
      type: "string",
      default: "mobile",
    },
    topPadding: {
      type: "number",
      default: 10,
    },
    bottomPadding: {
      type: "number",
      default: 10,
    },
    leftPadding: {
      type: "number",
      default: 10,
    },
    rightPadding: {
      type: "number",
      default: 10,
    },
    topPaddingTablet: {
      type: "number",
    },
    bottomPaddingTablet: {
      type: "number",
    },
    leftPaddingTablet: {
      type: "number",
    },
    rightPaddingTablet: {
      type: "number",
    },
    topPaddingMobile: {
      type: "number",
    },
    bottomPaddingMobile: {
      type: "number",
    },
    leftPaddingMobile: {
      type: "number",
    },
    rightPaddingMobile: {
      type: "number",
    },
    topMargin: {
      type: "number",
      default: 0,
    },
    bottomMargin: {
      type: "number",
      default: 0,
    },
    topMarginTablet: {
      type: "number",
    },
    bottomMarginTablet: {
      type: "number",
    },
    topMarginMobile: {
      type: "number",
    },
    bottomMarginMobile: {
      type: "number",
    },
    blockBorderStyle: {
      type: "string",
      default: "none",
    },
    blockBorderWidth: {
      type: "number",
      default: 1,
    },
    blockBorderRadius: {
      type: "number",
    },
    blockBorderColor: {
      type: "string",
    },
    boxShadowColor: {
      type: "string",
    },
    boxShadowHOffset: {
      type: "number",
      default: 0,
    },
    boxShadowVOffset: {
      type: "number",
      default: 0,
    },
    boxShadowBlur: {
      type: "number",
      default: 0,
    },
    boxShadowSpread: {
      type: "number",
      default: 0,
    },
    boxShadowPosition: {
      type: "string",
      default: "outset",
    },
    opacity: {
      type: "number",
      default: 20,
    },
    colorLocation1: {
      type: "number",
      default: 0,
    },
    colorLocation2: {
      type: "number",
      default: 100,
    },
    gradientDirection: {
      type: "number",
      default: 90,
    },
    backgroundType: {
      type: "string",
    },
    backgroundColor: {
      type: "string",
    },
    backgroundColor1: {
      type: "string",
    },
    backgroundColor2: {
      type: "string",
      default: "#fff",
    },
    backgroundImage: {
      type: "string",
    },
    backgroundPosition: {
      type: "string",
      default: "center-center",
    },
    backgroundSize: {
      type: "string",
      default: "cover",
    },
    backgroundRepeat: {
      type: "string",
      default: "no-repeat",
    },
    backgroundAttachment: {
      type: "string",
      default: "scroll",
    },
    backgroundImageColor: {
      type: "string",
    },
    overlayType: {
      type: "string",
      default: "color",
    },
    gradientOverlayColor1: {
      type: "string",
    },
    gradientOverlayColor2: {
      type: "string",
    },
    gradientOverlayType: {
      type: "string",
      default: "linear",
    },
    gradientOverlayLocation1: {
      type: "number",
      default: 0,
    },
    gradientOverlayLocation2: {
      type: "number",
      default: 100,
    },
    gradientOverlayAngle: {
      type: "number",
      default: 0,
    },
    gradientOverlayPosition: {
      type: "string",
      default: "center center",
    },
    blockAlign: {
      type: "string",
      default: "left",
    },
    verticalAlign: {
      type: "string",
      default: "flex-start",
    },
    blockId: {
      type: "string",
    },
    height: {
      type: "string",
      default: "normal",
    },
    customHeight: {
      type: "number",
      default: 50,
    },
    z_index: {
      type: "number",
      default: 1,
    },
  },

  /* Render the block in the editor. */
  edit: (props) => {
    return <Edit {...props} />;
  },

  /* Save the block markup. */
  save: (props) => {
    return <Save {...props} />;
  },
});
