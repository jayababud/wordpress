/**
 * BLOCK: Testimonial
 */


import classnames from "classnames"
import PositionClasses from "../classes"
import TestimonialStyle from "../inline-styles"
import TestimonialImage from "./Image"
import times from "lodash/times"
import Slider from "react-slick"
import AuthorName
    from "./AuthorName";
import Company from "./Company";
import Description from "./Description";
import Style from "style-it";
import fontOptions from "../../../utils/googlefonts";
import {loadGoogleFont} from "../../../utils/font";



const { __ } = wp.i18n

const {
	AlignmentToolbar,
	BlockControls,
	ColorPalette,
	InspectorControls,
	PanelColorSettings,
	MediaUpload,
    RichText
} = wp.blockEditor

const {
	PanelBody,
	SelectControl,
	RangeControl,
	ToggleControl,
	BaseControl,
	Button,
	Dashicon,
	TabPanel
} = wp.components


const { Component, Fragment } = wp.element

class edit extends Component {

	constructor() {

		super( ...arguments )
		this.onSelectTestImage  = this.onSelectTestImage.bind( this )
		this.onRemoveTestImage  = this.onRemoveTestImage.bind(this)
		this.getImageName       = this.getImageName.bind(this)
		this.togglePauseOnHover = this.togglePauseOnHover.bind( this )
		this.toggleInfiniteLoop = this.toggleInfiniteLoop.bind( this )
		this.toggleAutoplay     = this.toggleAutoplay.bind( this )
		this.onRemoveImage 		= this.onRemoveImage.bind( this )
		this.onSelectImage 		= this.onSelectImage.bind( this )
	}

	/*
	 * Event to set Image as while adding.
	 */
	onSelectTestImage( media, index ) {
		const { test_block } = this.props.attributes
		const { setAttributes } = this.props

		let imag_url = null
		if ( ! media || ! media.url ) {
			imag_url = null
		}else{
			imag_url = media
		}

		if ( ! media.type || "image" !== media.type ) {
			imag_url = null
		}

		const newItems = test_block.map( ( item, thisIndex ) => {
			if ( index === thisIndex ) {
				item["image"] = imag_url
			}
			return item
		} )

		setAttributes( {
			test_block: newItems,
		} )

	}

	/*
	 * Event to set Image as null while removing.
	 */
	onRemoveTestImage( index ) {
		const { test_block } = this.props.attributes
		const { setAttributes } = this.props

		const newItems = test_block.map( ( item, thisIndex ) => {
			if ( index === thisIndex ) {
				item["image"] = null
			}
			return item
		} )

		setAttributes( {
			test_block: newItems,
		} )
	}

	/*
	 * Event to set Image selectot label.
	 */
	getImageName( image ){
		const { test_block } = this.props.attributes

		let image_name = __( "Select Image" )
		if(image){
			if(image.url == null || image.url == "" ){
				image_name = __( "Select Image" )
			}else{
				image_name = __( "Replace Image" )
			}
		}
		return image_name
	}

	togglePauseOnHover() {
		const { pauseOnHover } = this.props.attributes
		const { setAttributes } = this.props

		setAttributes( { pauseOnHover: ! pauseOnHover } )
	}

	toggleInfiniteLoop() {
		const { infiniteLoop } = this.props.attributes
		const { setAttributes } = this.props

		setAttributes( { infiniteLoop: ! infiniteLoop } )
	}

	toggleAutoplay() {
		const { autoplay } = this.props.attributes
		const { setAttributes } = this.props

		setAttributes( { autoplay: ! autoplay } )
	}

	/*
	 * Event to set Image as null while removing.
	 */
	onRemoveImage() {
		const { setAttributes } = this.props

		setAttributes( { backgroundImage: null } )
	}

	/*
	 * Event to set Image as while adding.
	 */
	onSelectImage( media ) {
		const { setAttributes } = this.props

		if ( ! media || ! media.url ) {
			setAttributes( { backgroundImage: null } )
			return
		}

		if ( ! media.type || "image" !== media.type ) {
			setAttributes( { backgroundImage: null } )
			return
		}

		setAttributes( { backgroundImage: media } )
	}

	render() {

		const { className, setAttributes, attributes } = this.props

		// Setup the attributes.
		const {
			test_item_count,
			test_block,
			headingAlign,
			companyColor,
			descColor,
			authorColor,

			nameFontSizeType,
			nameFontSize,
			nameFontSizeTablet,
			nameFontSizeMobile,
			nameFontFamily,
			nameFontWeight,
			nameFontSubset,
			nameLineHeightType,
			nameLineHeight,
			nameLineHeightTablet,
			nameLineHeightMobile,
			nameLoadGoogleFonts,

			companyFontSizeType,
			companyFontSize,
			companyFontSizeTablet,
			companyFontSizeMobile,
			companyFontFamily,
			companyFontWeight,
			companyFontSubset,
			companyLineHeightType,
			companyLineHeight,
			companyLineHeightTablet,
			companyLineHeightMobile,
			companyLoadGoogleFonts,

			descFontSizeType,
			descFontSize,
			descFontSizeTablet,
			descFontSizeMobile,
			descFontFamily,
			descFontWeight,
			descFontSubset,
			descLineHeightType,
			descLineHeight,
			descLineHeightTablet,
			descLineHeightMobile,
			descLoadGoogleFonts,

			descSpace,
			iconimgStyle,
			imagePosition,
			imageAlignment,
			nameSpace,
			imgHrPadding,
			imgVrPadding,
			imageSize,
			imageWidth,
			columns,
			tcolumns,
			mcolumns,
			pauseOnHover,
			infiniteLoop,
			transitionSpeed,
			arrowDots,
			arrowSize,
			arrowBorderSize,
			arrowBorderRadius,
			autoplay,
			autoplaySpeed,
			arrowColor,
			rowGap,
			columnGap,
			contentPadding,
			backgroundType,
			backgroundColor,
			backgroundImage,
			backgroundPosition,
			backgroundSize,
			backgroundRepeat,
			backgroundImageColor,
			backgroundOpacity,
			borderStyle,
			borderWidth ,
			borderRadius,
			borderColor,
			stack,
            skin,
            bubbleColor,
            bubblePadding,
            bubbleBorderRadius,
			slicksettings
		} = attributes

        const fontWeightOptions = [
            {
                value: "",
                label: __("Default", "skt-blocks"),
            },
            {
                value: 100,
                label: __("100", "skt-blocks"),
            },
            {
                value: 200,
                label: __("200", "skt-blocks"),
            },
            {
                value: 300,
                label: __("300", "skt-blocks"),
            },
            {
                value: 400,
                label: __("400", "skt-blocks"),
            },
            {
                value: 500,
                label: __("500", "skt-blocks"),
            },
            {
                value: 600,
                label: __("600", "skt-blocks"),
            },
            {
                value: 700,
                label: __("700", "skt-blocks"),
            },
            {
                value: 800,
                label: __("800", "skt-blocks"),
            },
            {
                value: 900,
                label: __("900", "skt-blocks"),
            },
        ];
		// Typography settings.
		const TypographySettings = (
			<Fragment>
            <PanelBody
        title={__("Typography", "skt-blocks")}
        initialOpen={false}
            >
            <PanelBody
        title={__("Testimonial Typography", "skt-blocks")}
        initialOpen={false}
            >
            <SelectControl
        label={__("Font Family", "skt-blocks")}
        options={fontOptions}
        value={descFontFamily}
        onChange={(value) => {
            setAttributes({
                descFontFamily: value,
            }),
                loadGoogleFont(value);
        }}
        />
        <RangeControl
        label={__("Font Size", "skt-blocks")}
        value={descFontSize}
        onChange={(value) =>
        this.props.setAttributes({
            descFontSize: value,
        })
    }
        min={0}
        max={100}
        step={1}
        />
        <SelectControl
        label={__("Font Weight", "skt-blocks")}
        options={fontWeightOptions}
        value={descFontWeight}
        onChange={(value) =>
        this.props.setAttributes({
            descFontWeight: value,
        })
    }
        />
        <RangeControl
        label={__("Line Height", "skt-blocks")}
        value={descLineHeight}
        onChange={(value) =>
        this.props.setAttributes({
            descLineHeight: value,
        })
    }
        min={0}
        max={100}
        step={0.01}
        />
        </PanelBody>
        <PanelBody
        title={__("Name Typography", "skt-blocks")}
        initialOpen={false}
            >
            <SelectControl
        label={__("Font Family", "skt-blocks")}
        options={fontOptions}
        value={nameFontFamily}
        onChange={(value) => {
            setAttributes({
                nameFontFamily: value,
            }),
                loadGoogleFont(value);
        }}
        />
        <RangeControl
        label={__("Font Size", "skt-blocks")}
        value={nameFontSize}
        onChange={(value) =>
        this.props.setAttributes({
            nameFontSize: value,
        })
    }
        min={0}
        max={100}
        step={1}
        />
        <SelectControl
        label={__("Font Weight", "skt-blocks")}
        options={fontWeightOptions}
        value={nameFontWeight}
        onChange={(value) =>
        this.props.setAttributes({
            nameFontWeight: value,
        })
    }
        />
        <RangeControl
        label={__("Line Height", "skt-blocks")}
        value={nameLineHeight}
        onChange={(value) =>
        this.props.setAttributes({
            nameLineHeight: value,
        })
    }
        min={0}
        max={100}
        step={0.01}
        />
        </PanelBody>
        <PanelBody
        title={__("Company Typography", "skt-blocks")}
        initialOpen={false}
            >
            <SelectControl
        label={__("Font Family", "skt-blocks")}
        options={fontOptions}
        value={companyFontFamily}
        onChange={(value) => {
            setAttributes({
                companyFontFamily: value,
            }),
                loadGoogleFont(value);
        }}
        />
        <RangeControl
        label={__("Font Size", "skt-blocks")}
        value={companyFontSize}
        onChange={(value) =>
        this.props.setAttributes({
            companyFontSize: value,
        })
    }
        min={0}
        max={100}
        step={1}
        />
        <SelectControl
        label={__("Font Weight", "skt-blocks")}
        options={fontWeightOptions}
        value={companyFontWeight}
        onChange={(value) =>
        this.props.setAttributes({
            companyFontWeight: value,
        })
    }
        />
        <RangeControl
        label={__("Line Height", "skt-blocks")}
        value={companyLineHeight}
        onChange={(value) =>
        this.props.setAttributes({
            companyLineHeight: value,
        })
    }
        min={0}
        max={100}
        step={0.01}
        />
        </PanelBody>
        </PanelBody>

				<PanelColorSettings
					title={ __( "Color Settings" ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: descColor,
							onChange: ( colorValue ) => setAttributes( { descColor: colorValue } ),
							label: __( "Testimonial Color" ),
						},
						{
							value: authorColor,
							onChange: ( colorValue ) => setAttributes( { authorColor: colorValue } ),
							label: __( "Name Color" ),
						},
						{
							value: companyColor,
							onChange: ( colorValue ) => setAttributes( { companyColor: colorValue } ),
							label: __( "Company Color" ),
						},
						{
							value: arrowColor,
							onChange: ( colorValue ) => setAttributes( { arrowColor: colorValue } ),
							label: __( "Arrow & Dots Color" ),
						},
					] }
				>
				</PanelColorSettings>
			</Fragment>
		)

		// Margin Settings.
		const marginSettings = (
			<PanelBody title={ __( "Spacing" ) } initialOpen={ false } >
				<RangeControl
					label={ __( "Gap Between Content & Dots" ) }
					value={ rowGap }
					onChange={ ( value ) => setAttributes( { rowGap: value } ) }
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				<RangeControl
					label={ __( "Row Gap" ) }
					value={ columnGap }
					onChange={ ( value ) => setAttributes( { columnGap: value } ) }
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				<RangeControl
					label={ __( "Content Padding" ) }
					value={ contentPadding }
					onChange={ ( value ) => setAttributes( { contentPadding: value } ) }
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				<RangeControl
					label={ __( "Testimonial Bottom Margin" ) }
					value={ descSpace }
					onChange={ ( value ) => setAttributes( { descSpace: value } ) }
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				<RangeControl
					label={ __( "Name Bottom Margin" ) }
					value={ nameSpace }
					onChange={ ( value ) => setAttributes( { nameSpace: value } ) }
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				<RangeControl
					label={ __( "Image Horizontal Padding" ) }
					value={ imgHrPadding }
					onChange={ ( value ) => setAttributes( { imgHrPadding: value } ) }
					min={ 0 }
					max={ 50 }
					allowReset
				/>
				<RangeControl
					label={ __( "Image Vertical Padding" ) }
					value={ imgVrPadding }
					onChange={ ( value ) => setAttributes( { imgVrPadding: value } ) }
					min={ 0 }
					max={ 50 }
					allowReset
				/>
			</PanelBody>
		)

		const background_settings = (
			<Fragment>
				<PanelBody title={ __( "Background" ) } initialOpen={ false }>
					<SelectControl
						label={ __( "Background Type" ) }
						value={ backgroundType }
						onChange={ ( value ) => setAttributes( { backgroundType: value } ) }
						options={ [
							{ value: "none", label: __( "None" ) },
							{ value: "color", label: __( "Color" ) },
							{ value: "image", label: __( "Image" ) },
						] }
					/>
					{ "color" == backgroundType &&
							<Fragment>
								<p className="skt-blocks-setting-label">{ __( "Background Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: backgroundColor }} ></span></span></p>
								<ColorPalette
									value={ backgroundColor }
									onChange={ ( colorValue ) => setAttributes( { backgroundColor: colorValue } ) }
									allowReset
								/>
							</Fragment>
					}
					{ "image" == backgroundType &&
							<Fragment>
								<BaseControl
									className="editor-bg-image-control"
									label={ __( "Background Image" ) }>
									<MediaUpload
										title={ __( "Select Background Image" ) }
										onSelect={ this.onSelectImage }
										allowedTypes= { [ "image" ] }
										value={ backgroundImage }
										render={ ( { open } ) => (
											<Button isDefault onClick={ open }>
												{ ! backgroundImage ? __( "Select Background Image" ) : __( "Replace image" ) }
											</Button>
										) }
									/>
									{ backgroundImage &&
										<Button className="skt-blocks-rm-btn" onClick={ this.onRemoveImage } isLink isDestructive>
											{ __( "Remove Image" ) }
										</Button>
									}
								</BaseControl>
								{ backgroundImage &&
									<Fragment>
										<SelectControl
											label={ __( "Image Position" ) }
											value={ backgroundPosition }
											onChange={ ( value ) => setAttributes( { backgroundPosition: value } ) }
											options={ [
												{ value: "top-left", label: __( "Top Left" ) },
												{ value: "top-center", label: __( "Top Center" ) },
												{ value: "top-right", label: __( "Top Right" ) },
												{ value: "center-left", label: __( "Center Left" ) },
												{ value: "center-center", label: __( "Center Center" ) },
												{ value: "center-right", label: __( "Center Right" ) },
												{ value: "bottom-left", label: __( "Bottom Left" ) },
												{ value: "bottom-center", label: __( "Bottom Center" ) },
												{ value: "bottom-right", label: __( "Bottom Right" ) },
											] }
										/>
										<SelectControl
											label={ __( "Repeat" ) }
											value={ backgroundRepeat }
											onChange={ ( value ) => setAttributes( { backgroundRepeat: value } ) }
											options={ [
												{ value: "no-repeat", label: __( "No Repeat" ) },
												{ value: "repeat", label: __( "Repeat" ) },
												{ value: "repeat-x", label: __( "Repeat-x" ) },
												{ value: "repeat-y", label: __( "Repeat-y" ) }
											] }
										/>
										<SelectControl
											label={ __( "Size" ) }
											value={ backgroundSize }
											onChange={ ( value ) => setAttributes( { backgroundSize: value } ) }
											options={ [
												{ value: "auto", label: __( "Auto" ) },
												{ value: "cover", label: __( "Cover" ) },
												{ value: "contain", label: __( "Contain" ) }
											] }
										/>
										<Fragment>
											<p className="skt-blocks-setting-label">{ __( "Image Overlay Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: backgroundImageColor }} ></span></span></p>
											<ColorPalette
												value={ backgroundImageColor }
												onChange={ ( colorValue ) => setAttributes( { backgroundImageColor: colorValue } ) }
												allowReset
											/>
										</Fragment>
									</Fragment>
								}
							</Fragment>
					}
					{ ( "image" == backgroundType && backgroundImage )  &&
							<RangeControl
								label={ __( "Opacity" ) }
								value={ backgroundOpacity }
								onChange={ ( value ) => setAttributes( { backgroundOpacity: value } ) }
								min={ 0 }
								max={ 100 }
								allowReset
								initialPosition={0}
							/>
					}
				</PanelBody>
				<PanelBody title={ __( "Border" ) } initialOpen={ false }>
					<SelectControl
						label={ __( "Border Style" ) }
						value={ borderStyle }
						onChange={ ( value ) => setAttributes( { borderStyle: value } ) }
						options={ [
							{ value: "none", label: __( "None" ) },
							{ value: "solid", label: __( "Solid" ) },
							{ value: "dotted", label: __( "Dotted" ) },
							{ value: "dashed", label: __( "Dashed" ) },
							{ value: "double", label: __( "Double" ) },
							{ value: "groove", label: __( "Groove" ) },
							{ value: "inset", label: __( "Inset" ) },
							{ value: "outset", label: __( "Outset" ) },
							{ value: "ridge", label: __( "Ridge" ) },
						] }
					/>
					{ "none" != borderStyle &&
							<Fragment>
								<RangeControl
									label={ __( "Border Width" ) }
									value={ borderWidth }
									onChange={ ( value ) => setAttributes( { borderWidth: value } ) }
									min={ 0 }
									max={ 50 }
									allowReset
								/>
								<Fragment>
									<p className="skt-blocks-setting-label">{ __( "Border Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: borderColor }} ></span></span></p>
									<ColorPalette
										value={ borderColor }
										onChange={ ( colorValue ) => setAttributes( { borderColor: colorValue } ) }
										allowReset
									/>
								</Fragment>
							</Fragment>
					}
					<RangeControl
						label={ __( "Border Radius" ) }
						value={ borderRadius }
						onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
						min={ 0 }
						max={ 50 }
						allowReset
					/>
				</PanelBody>
			</Fragment>
		)

		// Image sizes.
		const imageSizeOptions = [
			{ value: "thumbnail", label: __( "Thumbnail" ) },
			{ value: "medium", label: __( "Medium" ) },
			{ value: "full", label: __( "Large" ) }
		]

		function NextArrow( props ) {
			return (
				<button type="button" data-role="none" className="slick-next slick-arrow" aria-label="Next" tabIndex="0" role="button" style={{ "borderColor" : arrowColor, "borderRadius" : arrowBorderRadius, "borderWidth" : arrowBorderSize }}>
        <Dashicon
            icon="arrow-right-alt2"
            height={arrowSize}
            width={arrowSize}
            /></button>
			)
		}

		function PrevArrow( props ) {
			return (
				<button type="button" data-role="none" className="slick-prev slick-arrow" aria-label="Previous" tabIndex="0" role="button" style={{ "borderColor" : arrowColor, "borderRadius" : arrowBorderRadius, "borderWidth" : arrowBorderSize }}>
        <Dashicon
            icon="arrow-left-alt2"
            height={arrowSize}
            width={arrowSize}
            /></button>
			)
		}

		let dots = ( "dots" == arrowDots || "arrows_dots" == arrowDots ) ? true : false
		let arrows = ( "arrows" == arrowDots || "arrows_dots" == arrowDots ) ? true : false

		const settings = {
			slidesToShow : columns,
			slidesToScroll : 1,
			autoplaySpeed : autoplaySpeed,
			autoplay : autoplay,
			infinite : infiniteLoop,
			pauseOnHover : pauseOnHover,
			speed : transitionSpeed,
			arrows : arrows,
			dots : dots,
			rtl : false,
			draggable: false,
			nextArrow: <NextArrow arrowSize={arrowSize}/>,
			prevArrow: <PrevArrow arrowSize={arrowSize}/>,
			responsive : [
				{
					breakpoint : 1024,
					settings : {
						slidesToShow : tcolumns,
						slidesToScroll : 1,
					}
				},
				{
					breakpoint : 767,
					settings : {
						slidesToShow : mcolumns,
						slidesToScroll : 1,
					}
				}
			]
		}

		let image_enable = false
		// Set testinomial image panel
		const tmControls = ( index ) => {
			let image_val = null
			if( test_block[index] && typeof test_block[index] !== "undefined"){
				image_val = test_block[index]["image"]
			}
			return (
				<PanelBody key={index}
					title={ __( "Image" ) + " " + ( index + 1 ) + " " + __( "Settings" ) }
					initialOpen={ true }
					className= {"skt-blocks-repeater-panel"}
				>

					<BaseControl
						className="editor-bg-image-control"
						label={ __( "" ) }
					>
						<MediaUpload
							title={ __( "Select Image"+ ( index + 1 ) ) }
							onSelect={ ( media ) => {
								this.onSelectTestImage( media, index )
							} }
							allowedTypes= { [ "image" ] }
							value={ image_val }
							render={ ( { open } ) => (
								<Button isDefault onClick={ open }>
									{  this.getImageName( test_block[index]["image"] ) }
								</Button>
							) }
						/>
						{ ( image_val && test_block[index]["image"].url !== null && test_block[index]["image"].url !=="" ) &&
							<Button className="skt-blocks-rm-btn" key= { index} onClick={ (value) => {
								this.onRemoveTestImage(index)
							} } isLink isDestructive>
								{ __( "Remove Image" ) }
							</Button>
						}
					</BaseControl>
				</PanelBody>
			)
		}

		const carousal_settings = (
			<PanelBody title={ __( "Carousel" ) } initialOpen={ false }>
				<ToggleControl
					label={ __( "Pause On Hover" ) }
					checked={ pauseOnHover }
					onChange={ this.togglePauseOnHover }
				/>
				<ToggleControl
					label={ __( "Autoplay" ) }
					checked={ autoplay }
					onChange={ this.toggleAutoplay }
				/>
				{ autoplay == true &&
					<RangeControl
						label={ __( "Autoplay Speed (ms)" ) }
						value={ autoplaySpeed }
						onChange={ ( value ) => setAttributes( { autoplaySpeed: value } ) }
						min={ 100 }
						max={ 10000 }
					/>
				}
				<ToggleControl
					label={ __( "Infinite Loop" ) }
					checked={ infiniteLoop }
					onChange={ this.toggleInfiniteLoop }
				/>
				<RangeControl
					label={ __( "Transition Speed (ms)" ) }
					value={ transitionSpeed }
					onChange={ ( value ) => setAttributes( { transitionSpeed: value } ) }
					min={ 100 }
					max={ 5000 }
				/>
				<SelectControl
					label={ __( "Show Arrows & Dots" ) }
					value={ arrowDots }
					onChange={ ( value ) => setAttributes( { arrowDots: value } ) }
					options={ [
						{ value: "arrows", label: __( "Only Arrows" ) },
						{ value: "dots", label: __( "Only Dots" ) },
						{ value: "arrows_dots", label: __( "Both Arrows & Dots" ) },
					] }
				/>
				{ "dots" != arrowDots &&
					<Fragment>
						<RangeControl
							label={ __( "Arrow Size" ) }
							value={ arrowSize }
							onChange={ ( value ) => setAttributes( { arrowSize: value } ) }
							min={ 0 }
							max={ 50 }
						/>
						<RangeControl
							label={ __( "Arrow Border Size" ) }
							value={ arrowBorderSize }
							onChange={ ( value ) => setAttributes( { arrowBorderSize: value } ) }
							min={ 0 }
							max={ 50 }
						/>
						<RangeControl
							label={ __( "Arrow Border Radius" ) }
							value={ arrowBorderRadius }
							onChange={ ( value ) => setAttributes( { arrowBorderRadius: value } ) }
							min={ 0 }
							max={ 50 }
						/>
					</Fragment>
				}
			</PanelBody>
		)

		let cnt = 0
		test_block.map( ( item, thisIndex ) => {
			let image_arr = test_block[thisIndex]
			if( image_arr && typeof image_arr !== "undefined"){
	            const image = image_arr["image"]
	            if( typeof image !== "undefined" && image !== null && image !=="" ){
	            	cnt++
	            }
	        }
		} )

		// Global Controls.
		const inspect_control = (
			<InspectorControls>
			 	<PanelBody title={ __( "General" ) } initialOpen={ true } >
					<RangeControl
						label={ __( "Number of Testimonials" ) }
						value={ test_item_count }
						onChange={ ( newCount ) => {
							let cloneTest_block = [ ...test_block ]
							if ( cloneTest_block.length < newCount ) {
								const incAmount = Math.abs( newCount - cloneTest_block.length )

								{ times( incAmount, n => {

									cloneTest_block.push( {
										description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." ,
										name: "John Doe",
										company: "Company"+ ( cloneTest_block.length + 1 ),
										image: "",
									} )
								} ) }
								setAttributes( { test_block: cloneTest_block } )
							}else{
								const incAmount = Math.abs( newCount - cloneTest_block.length )
								let data_new = cloneTest_block
				            for( var i= 0; i < incAmount; i++ ){
				                data_new.pop()
				            }
				            setAttributes({test_block:data_new})

							}
							setAttributes( { test_item_count: newCount } )
						} }
						min={ 0 }
						max={ 50 }
						allowReset
					/>
                        <TabPanel
        className=" responsive-size-type-field-tabs  responsive-size-type-field__common-tabs  responsive-inline-margin"
        activeClass="active-tab"
        tabs={[
            {
                name: "desktop",
                title: <Dashicon icon="desktop" />,
            className:
                " responsive-desktop-tab  responsive-responsive-tabs",
        },
        {
            name: "tablet",
            title: <Dashicon icon="tablet" />,
            className: " responsive-tablet-tab  responsive-responsive-tabs",
    },
        {
            name: "mobile",
                title: <Dashicon icon="smartphone" />,
            className: " responsive-mobile-tab  responsive-responsive-tabs",
        },
    ]}
    >
        {(tab) => {
            let tabout;

            if ("mobile" === tab.name) {
                tabout = (
                    <RangeControl
                label={ __( "Columns" ) }
                value={ mcolumns }
                onChange={ ( value ) => setAttributes( { mcolumns: value } ) }
                min={ 1 }
                max={ test_item_count }
                />
            );
            } else if ("tablet" === tab.name) {
                tabout = (
                    <RangeControl
                label={ __( "Columns" ) }
                value={ tcolumns }
                onChange={ ( value ) => setAttributes( { tcolumns: value } ) }
                min={ 1 }
                max={ test_item_count }
                />
            );
            } else {
                tabout = (
                    <RangeControl
                label={ __( "Columns" ) }
                value={ columns }
                onChange={ ( value ) => setAttributes( { columns: value } ) }
                min={ 1 }
                max={ test_item_count }
                />
            );
            }

            return <div>{tabout}</div>;
        }}
    </TabPanel>

        <SelectControl
        label={ __( "Skin" ) }
        value={ skin }
        onChange={ ( value ) => setAttributes( { skin: value } ) }
        options={ [
                { value: "default", label: __( "Default" ) },
        { value: "bubble", label: __( "Bubble" ) },
    ] }
        />

        </PanelBody>
		{ skin === "bubble" && (
        <PanelBody
            title={ __( "Bubble Settings" ) }
            initialOpen={ false }
                >
                <Fragment>
                <p className="responsive-setting-label">
            {__("Background Color", "skt-blocks")}
        <span className="components-base-control__label">
            <span
            className="component-color-indicator"
            style={{ backgroundColor: bubbleColor }}
        ></span>
        </span>
        </p>
        <ColorPalette
            value={bubbleColor}
            onChange={(colorValue) =>
            setAttributes({ bubbleColor: colorValue })
        }
            allowReset
            />
            </Fragment>
                <RangeControl
            label={ __( "Padding" ) }
            value={ bubblePadding }
            onChange={ ( value ) => setAttributes( { bubblePadding: value } ) }
            min={ 0 }
            max={ 50 }
            allowReset
            />
            <RangeControl
            label={ __( "Border Radius" ) }
            value={ bubbleBorderRadius }
            onChange={ ( value ) => setAttributes( { bubbleBorderRadius: value } ) }
            min={ 0 }
            max={ 50 }
            allowReset
            />
            </PanelBody>
		)}

				{ carousal_settings }

				<PanelBody
					title={ __( "Image" ) }
					initialOpen={ false }
				>
					{ times( test_item_count, n => tmControls( n ) ) }

					{  cnt > 0 && <Fragment>
						<hr className="skt-blocks-editor__separator" />
						<SelectControl
							label={ __( "Image Position" ) }
							value={ imagePosition }
							onChange={ ( value ) => setAttributes( { imagePosition: value } ) }
							options={ [
								{ value: "top", label: __( "Top" ) },
								{ value: "bottom", label: __( "Bottom" ) },
								{ value: "left", label: __( "Left" ) },
								{ value: "right", label: __( "Right" ) },
								{ value: "stacked", label: __( "Stacked" ) },
							] }
						/>
						{ (imagePosition == "left" || imagePosition == "right") &&
						<Fragment>
							<SelectControl
								label={ __( "Vertical ALignment" ) }
								value={ imageAlignment }
								onChange={ ( value ) => setAttributes( { imageAlignment: value } ) }
								options={ [
									{ value: "top", label: __( "Top" ) },
									{ value: "middle", label: __( "Middle" ) },
								] }
							/>
							<SelectControl
								label={ __( "Stack on" ) }
								value={ stack }
								options={ [
									{ value: "none", label: __( "None" ) },
									{ value: "tablet", label: __( "Tablet" ) },
									{ value: "mobile", label: __( "Mobile" ) },
								] }
								help={ __( "Note: Choose on what breakpoint the Info Box will stack." ) }
								onChange={ ( value ) => setAttributes( { stack: value } ) }
							/>
						</Fragment>
						}
						<SelectControl
							label={ __( "Image Style" ) }
							value={ iconimgStyle }
							onChange={ ( value ) => setAttributes( { iconimgStyle: value } ) }
							options={ [
								{ value: "normal", label: __( "Normal" ) },
								{ value: "circle", label: __( "Circle" ) },
								{ value: "square", label: __( "Square" ) },
							] }
						/>
						<SelectControl
							label={ __( "Image Size" ) }
							options={ imageSizeOptions }
							value={ imageSize }
							onChange={ ( value ) => setAttributes( { imageSize: value } ) }
						/>
					 <RangeControl
							label={ __( "Width" ) }
							value={ imageWidth }
							onChange={ ( value ) => setAttributes( { imageWidth: value } ) }
							min={ 0 }
							max={ 500 }
							allowReset
						/>
					</Fragment>
					}


				</PanelBody>
				{ TypographySettings }

				{ marginSettings }
				{ background_settings }
			</InspectorControls>
		)

		return (
			<Fragment>
            <Style>
            {`
             .skt-blocks-slick-carousel.skt-blocks-block-${ this.props.clientId.substr( 0, 8 ) } ul.slick-dots li button:before, ul.slick-dots li.slick-active button:before, .slick-arrow span {
             color: ${arrowColor};
            }
            .slick-arrow svg {
             fill: ${arrowColor};
            }
            .skt-blocks-tm__content.skin-type-bubble .skt-blocks-tm__desc {
            padding: ${bubblePadding}px;
            }
            .skt-blocks-tm__content.skin-type-bubble .skt-blocks-testinomial-text-wrap:before {
            border-top: 10px solid ${bubbleColor};
            }
            .skt-blocks-tm__content.skin-type-bubble .skt-blocks-testinomial-text-wrap {
            background-color: ${bubbleColor};
            border-radius: ${bubbleBorderRadius}px;
            }
            `}
    </Style>
				<BlockControls key='controls'>
					<AlignmentToolbar
						value={ headingAlign }
						onChange={ ( value ) => setAttributes( { headingAlign: value } ) }
					/>
				</BlockControls>
				{inspect_control}
				<div className={ classnames(
					className,
					"skt-blocks-testomonial__outer-wrap skt-blocks-slick-carousel skt-blocks-tm__arrow-outside",
					`skt-blocks-block-${ this.props.clientId.substr( 0, 8 ) }`
				) }
				>
					<Slider
						className={ classnames(
							"is-carousel",
							`skt-blocks-tm__columns-${ columns }`,
							"skt-blocks-tm__items",
						) }
						{...settings}
					>

						{ test_block.map( ( test, index ) =>

							<div className = { classnames(
								"skt-blocks-testimonial__wrap",
								...PositionClasses( attributes ),
							) } key ={ "wrap-"+index } >
								<div className = { classnames("skt-blocks-tm__content", `skin-type-${skin}`, `${headingAlign}-aligned`) } key ={ "tm_content-"+index }>
									<div className = "skt-blocks-tm__overlay"></div>
									{ (imagePosition == "top" || imagePosition == "left" ) && <TestimonialImage  attributes={attributes}  index_value = {index} /> }

									<div className ="skt-blocks-tm__text-wrap">
										{  // Get description.
											<Fragment>
												<div className = "skt-blocks-testinomial-text-wrap" key={"text-wrap-"+index}>
                                        <Description attributes={attributes} setAttributes = { setAttributes } props = { this.props }  index_value = {index}/>
												</div>
											</Fragment>
										}
										<div className ="skt-blocks-tm__meta">
											<div className ="skt-blocks-tm__meta-inner">

												{ (imagePosition == "bottom" ) && <TestimonialImage  attributes={attributes} index_value = {index} /> }

												{ //title_text
													<Fragment>
														<div className = "skt-blocks-testimonial-details" key={"tm_wraps-"+index}>
                                                    { ( imagePosition == "stacked" ) && <TestimonialImage  attributes={attributes}  index_value = {index} /> }
                                                    <AuthorName attributes={attributes} setAttributes = { setAttributes } props = { this.props } index_value = {index}/>
													<Company attributes={attributes} setAttributes = { setAttributes }  props = { this.props }  index_value = {index}/>
														</div>
													</Fragment>
												}
											</div>
										</div>
									</div>
									{ ( imagePosition == "right" ) && <TestimonialImage  attributes={attributes}  index_value = {index} /> }
								</div>
							</div>
						)}
					</Slider>
				</div>
        {descFontFamily && loadGoogleFont(descFontFamily)}
        {nameFontFamily && loadGoogleFont(nameFontFamily)}
        {companyFontFamily && loadGoogleFont(companyFontFamily)}
			</Fragment>
		)
	}

	componentDidUpdate(prevProps, prevState) {
		var element = document.getElementById( "skt-blocks-testinomial-style-" + this.props.clientId.substr( 0, 8 ) )

		if( null !== element && undefined !== element ) {
			element.innerHTML = TestimonialStyle( this.props )
		}
	}

	componentDidMount() {

		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } )

		this.props.setAttributes( { classMigrate: true } )

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "skt-blocks-testinomial-style-" + this.props.clientId.substr( 0, 8 ) )
		document.head.appendChild( $style )
	}
}

export default edit
