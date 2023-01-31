/**
 * BLOCK: SKT Blocks Pricing Table
 */

// Import block dependencies and components
import Edit from "./components/edit";
import Save from "./components/save";

// Import CSS
import "./styles/style.scss";
import "./styles/styles.editor.scss";

// Internationalization
const { __ } = wp.i18n;
const ITEM_COUNT = 2;

const cardsArray = [];

for (var i = 1; i <= ITEM_COUNT; i++) {
  cardsArray.push({
    title: "Title",
    subtitle: "Subtitle",
    button: "Button" + i,
    buttonURL: "",
    image: "",
    content:
      "Description for this block. Use this space for describing your block. Any text will do. Description for this block. You can use this space for describing your block.",
  });
}

// Register block
const { registerBlockType } = wp.blocks;

// Register the block
registerBlockType("skt-blocks/card", {
  title: __("Card", "skt-blocks"),
  description: __(
    "This block allows you to add cards to describe your product, service or a person.",
    "skt-blocks"
  ),
  icon: "feedback",
  category: "skt_blocks",
  keywords: [
    __("card", "skt-blocks"),
    __("responsive", "skt-blocks"),
  ],
  example: {},
  attributes: {
    cardsArray: {
      type: "array",
      default: cardsArray,
    },
    count: {
      type: "number",
      default: ITEM_COUNT,
    },
    gutter: {
      type: "string",
      default: "medium",
    },
    stack: {
      type: "string",
      default: "mobile",
    },
    contentAlign: {
      type: "string",
      default: "center",
    },
    textColor: {
      type: "string",
    },
    itemBackgroundColor: {
      type: "string",
    },
    buttonColor: {
      type: "string",
    },
    buttonTextColor: {
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
    titleSpace: {
      type: "number",
      default: 8,
    },
    subtitleSpace: {
      type: "number",
      default: 16,
    },
    contentSpace: {
      type: "number",
      default: 16,
    },
    buttonSpace: {
      type: "number",
      default: 20,
    },
    borderWidth: {
      type: "number",
      default: 0,
    },
    borderRadius: {
      type: "number",
      default: 12,
    },
    opacity: {
      type: "number",
      default: 100,
    },
    resshowImage: {
      type: "boolean",
      default: true,
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
    backgroundImage: {
      type: "object",
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
    backgroundType: {
      type: "string",
      default: "none",
    },
    imageopacity: {
      type: "number",
      default: 20,
    },
    imageSize: {
      type: "string",
      default: "full",
    },
    imagePosition: {
      type: "string",
      default: "center center",
    },
    imageRepeat: {
      type: "string",
      default: "no-repeat",
    },
    thumbsize: {
      type: "string",
      default: "cover",
    },
    imageheight: {
      type: "number",
      default: 200,
    },
    blockmargin: {
      type: "number",
      default: 2,
    },
    blockzindex: {
      type: "number",
      default: 1,
    },
    icon: {
      type: "string",
      default: "",
    },
    iconPosition: {
      type: "string",
      default: "after",
    },
    icon_color: {
      type: "string",
      default: "#3a3a3a",
    },
    counterId: {
      type: "string",
      default: 1,
    },
    buttonhColor: {
      type: "string",
    },
    buttonhTextColor: {
      type: "string",
    },
    butopacity: {
      type: "number",
      default: 100,
    },
    vPadding: {
      type: "number",
      default: 10,
    },
    hPadding: {
      type: "number",
      default: 14,
    },
    vMargin: {
      type: "number",
      default: 10,
    },
    hMargin: {
      type: "number",
      default: 0,
    },
    butborderWidth: {
      type: "number",
      default: 1,
    },
    butborderRadius: {
      type: "number",
      default: 2,
    },
    butborderStyle: {
      type: "string",
      default: "none",
    },
    buttonSize: {
      type: "string",
      default: "skt-blocks-button-size-medium",
    },
    buttoncolorLocation1: {
      type: "number",
      default: 0,
    },
    buttoncolorLocation2: {
      type: "number",
      default: 100,
    },
    buttongradientDirection: {
      type: "number",
      default: 90,
    },
    buttonbackgroundColor1: {
      type: "string",
    },
    buttonbackgroundColor2: {
      type: "string",
      default: "#fff",
    },
    buttonbackgroundType: {
      type: "string",
      default: "none",
    },
    icon_hcolor: {
      type: "string",
      default: "#3a3a3a",
    },
    headingFontFamily: {
      type: "string",
    },
    subFontFamily: {
      type: "string",
    },
    contentFontFamily: {
      type: "string",
    },
    subLineHeight: {
      type: "number",
      default: 1,
    },
    subFontWeight: {
      type: "string",
      default: 400,
    },
    subFontSize: {
      type: "number",
      default: 16,
    },
    headingLineHeight: {
      type: "number",
      default: 1,
    },
    headingFontWeight: {
      type: "string",
      default: 900,
    },
    headingFontSize: {
      type: "number",
      default: 20,
    },
    contentLineHeight: {
      type: "number",
      default: 2,
    },
    contentFontSize: {
      type: "number",
      default: 16,
    },
    contentFontWeight: {
      type: "string",
      default: 400,
    },
    blockbotmargin: {
      type: "number",
      default: 2,
    },
    blockleftmargin: {
      type: "number",
      default: 0,
    },
    blockrightmargin: {
      type: "number",
      default: 0,
    },
    contenttopSpace: {
      type: "number",
      default: 16,
    },
    bgimageSize: {
      type: "string",
      default: "full",
    },
    bgimagePosition: {
      type: "string",
      default: "center center",
    },
    bgimageRepeat: {
      type: "string",
      default: "no-repeat",
    },
    bgthumbsize: {
      type: "string",
      default: "cover",
    },
    borderStyle: {
      type: "string",
      default: "none",
    },
    buttonTarget: {
      type: "boolean",
      default: "false",
    },
    contentAlignment: {
      type: "string",
      default: "left",
    },
    borderColor: {
      type: "string",
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
