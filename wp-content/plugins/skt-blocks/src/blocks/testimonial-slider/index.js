/**
 * BLOCK: Testimonial
 */

import classnames from "classnames"
import edit from "./components/edit"
import save from "./components/save"
import "./styles/style.scss"
import "./styles/styles.editor.scss"
const { __ } = wp.i18n

const {
	registerBlockType,
} = wp.blocks

const ITEM_COUNT = 3

const testimonial_block = []

for (var i = 1; i <= ITEM_COUNT; i++) {
    var desc_text = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."
    var author_text    = "John Doe "
    var company_text    = "Company"+i
    testimonial_block.push(
        {
            "description": desc_text,
            "name": author_text,
            "company": company_text,
            "image": "",
        }
    )
}

registerBlockType( "skt-blocks/testimonial-slider", {
	title:  __("Testimonial Slider", "skt-blocks"),
    description: __(
        "Add a testimonial slider.",
        "skt-blocks"
    ),
    icon: "format-quote",
    category: "skt_blocks",
    keywords: [
        __("testimonial slider", "skt-blocks"),
        __("testimonial", "skt-blocks"),
        __("slider", "skt-blocks"),
        __("responsive", "skt-blocks"),
    ],
    example: {},
	supports: {
		anchor: true,
	},
	attributes: {
        test_item_count: {
            type: "number",
            default: ITEM_COUNT
        },
        classMigrate: {
            type: "boolean",
            default: false
        },
        test_block: {
            type: "array",
            default : testimonial_block,
        },
        skin: {
            type: "string",
            default: "default",
        },
        bubblePadding :{
            type: "number",
            default: 20,
        },
        bubbleBorderRadius :{
            type: "number",
            default: 0,
        },
        bubbleColor: {
            type: "string",
            default: "center",
        },
        headingAlign: {
            type: "string",
            default: "center",
        },
        descColor: {
            type: "string",
            default: "#333"
        },
        companyColor: {
            type: "string",
            default: "#888888"
        },
        authorColor: {
            type: "string",
            default: "#333"
        },
        iconimgStyle: {
            type: "string",
            default: "circle"
        },
        imagePosition:{
            type: "string",
            default: "bottom"
        },
        imageAlignment:{
            type: "string",
            default: "top"
        },

        nameFontSizeType: {
            type: "string",
            default: "px"
        },
        nameFontSize: {
            type: "number",
        },
        nameFontSizeTablet: {
            type: "number",
        },
        nameFontSizeMobile: {
            type: "number",
        },
        nameFontFamily: {
            type: "string",
            default: "Default",
        },
        nameFontWeight: {
            type: "string",
        },
        nameFontSubset: {
            type: "string",
        },
        nameLineHeightType: {
            type: "string",
            default: "em"
        },
        nameLineHeight: {
            type: "number",
        },
        nameLineHeightTablet: {
            type: "number",
        },
        nameLineHeightMobile: {
            type: "number",
        },
        nameLoadGoogleFonts: {
            type: "boolean",
            default: false
        },

        companyFontSizeType: {
            type: "string",
            default: "px"
        },
        companyFontSize: {
            type: "number",
        },
        companyFontSizeTablet: {
            type: "number",
        },
        companyFontSizeMobile: {
            type: "number",
        },
        companyFontFamily: {
            type: "string",
            default: "Default",
        },
        companyFontWeight: {
            type: "string",
        },
        companyFontSubset: {
            type: "string",
        },
        companyLineHeightType: {
            type: "string",
            default: "em"
        },
        companyLineHeight: {
            type: "number",
        },
        companyLineHeightTablet: {
            type: "number",
        },
        companyLineHeightMobile: {
            type: "number",
        },
        companyLoadGoogleFonts: {
            type: "boolean",
            default: false
        },

        descFontSizeType: {
            type: "string",
            default: "px"
        },
        descFontSize: {
            type: "number",
        },
        descFontSizeTablet: {
            type: "number",
        },
        descFontSizeMobile: {
            type: "number",
        },
        descFontFamily: {
            type: "string",
            default: "Default",
        },
        descFontWeight: {
            type: "string",
        },
        descFontSubset: {
            type: "string",
        },
        descLineHeightType: {
            type: "string",
            default: "em"
        },
        descLineHeight: {
            type: "number",
        },
        descLineHeightTablet: {
            type: "number",
        },
        descLineHeightMobile: {
            type: "number",
        },
        descLoadGoogleFonts: {
            type: "boolean",
            default: false
        },

        nameSpace: {
            type: "number",
            default : 5
        },
        descSpace: {
            type: "number",
            default : 15
        },
        block_id :{
            type : "string",
            default : "not_set"
        },
        authorSpace :{
            type: "number",
            default: 5,
        },
        imgVrPadding :{
            type: "number",
            default: 10,
        },
        imgHrPadding :{
            type: "number",
            default: 10,
        },
        imgTopPadding :{
            type: "number",
            default: 10,
        },
        imgBottomPadding :{
            type: "number",
            default: 10,
        },
        iconImage: {
            type: "object",
            default:{
                "url": "",
                "alt": "InfoBox placeholder img",
            }
        },
        imageSize:{
            type: "string",
            default: "thumbnail",
        },
        imageWidth :{
            type: "number",
            default: 60,
        },
        columns :{
            type: "number",
            default: 1,
        },
        tcolumns :{
            type: "number",
            default: 1,
        },
        mcolumns :{
            type: "number",
            default: 1,
        },
        pauseOnHover: {
            type: "boolean",
            default: true,
        },
        infiniteLoop: {
            type: "boolean",
            default: true,
        },
        transitionSpeed :{
            type: "number",
            default: 500,
        },
        autoplay: {
            type: "boolean",
            default: true,
        },
        autoplaySpeed :{
            type: "number",
            default: 2000,
        },
        arrowDots : {
            type : "string",
            default : "arrows_dots"
        },
        arrowSize :{
            type: "number",
            default: 20,
        },
        arrowBorderSize : {
            type: "number",
            default : 1,
        },
        arrowBorderRadius : {
            type: "number",
            default : 0,
        },
        rowGap: {
            type: "number",
            default : 10
        },
        columnGap: {
            type: "number",
            default : 10
        },
        contentPadding: {
            type: "number",
            default : 5
        },
        backgroundType: {
            type: "string",
        },
        backgroundImage: {
            type: "object",
        },
        backgroundPosition: {
            type: "string",
            default: "center-center"
        },
        backgroundSize: {
            type: "string",
            default: "cover"
        },
        backgroundRepeat: {
            type: "string",
            default: "no-repeat"
        },
        backgroundColor:{
            type: "string"
        },
        backgroundImageColor: {
            type: "string"
        },
        borderStyle : {
            type: "string",
            default: "none"
        },
        borderWidth : {
            type: "number",
            default: "1"
        },
        borderRadius : {
            type: "number"
        },
        borderColor : {
            type: "string"
        },
        backgroundOpacity:{
            type: "number",
            default: 50
        },
        arrowColor:{
            type: "string",
            default: "#333"
        },
        stack: {
            type: "string",
            default: "tablet"
        }
    },
	edit,
	save,
	example: {},
} )
