/**
 * Inspector Controls
 */
import BoxShadowControl from "../../../../utils/components/box-shadow";
import BoxShadowControlHelper from "../../../../utils/components/box-shadow-helper";

// Setup the block
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { ColorPalette, MediaUpload } = wp.blockEditor;

// Import block components
const { InspectorControls } = wp.editor;

// Import Inspector components
const {
  PanelBody,
  RangeControl,
  SelectControl,
  ButtonGroup,
  Button,
  BaseControl,
  TabPanel,
  Dashicon,
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
  constructor(props) {
    super(...arguments);
    this.onRemoveImage = this.onRemoveImage.bind(this);
    this.onSelectImage = this.onSelectImage.bind(this);
  }
  /*
   * Event to set Image as null while removing.
   */
  onRemoveImage() {
    const { setAttributes } = this.props;

    setAttributes({ backgroundImage: null });
  }

  /*
   * Event to set Image as while adding.
   */
  onSelectImage(media) {
    const { setAttributes } = this.props;
    const { backgroundImage } = this.props.attributes;

    if (!media || !media.url) {
      setAttributes({ backgroundImage: null });
      return;
    }

    if (!media.type || "image" != media.type) {
      return;
    }

    setAttributes({ backgroundImage: media.url });
  }
  render() {
    // Setup the attributes
    const {
      attributes: {
        width,
        boxShadowColor,
        boxShadowHOffset,
        boxShadowVOffset,
        boxShadowBlur,
        boxShadowSpread,
        boxShadowPosition,
        hoverboxShadowColor,
        hoverboxShadowHOffset,
        hoverboxShadowVOffset,
        hoverboxShadowBlur,
        hoverboxShadowSpread,
        hoverboxShadowPosition,

        columnGap,
        contentWidth,
        widthType,
        stack,
        backgroundColor,
        backgroundColor1,
        backgroundColor2,
        colorLocation1,
        colorLocation2,
        gradientDirection,
        hoverbackgroundColor1,
        hoverbackgroundColor2,
        hovercolorLocation1,
        hovercolorLocation2,
        hovergradientDirection,
        backgroundType,
        backgroundImage,
        backgroundPosition,
        backgroundAttachment,
        backgroundRepeat,
        backgroundSize,
        overlayType,
        backgroundImageColor,
        gradientOverlayColor1,
        gradientOverlayLocation1,
        gradientOverlayColor2,
        gradientOverlayLocation2,
        gradientOverlayType,
        gradientOverlayAngle,
        gradientOverlayPosition,
        opacity,
        blockBorderStyle,
        blockBorderWidth,
        blockBorderRadius,
        blockBorderColor,
        topMargin,
        topMarginTablet,
        topMarginMobile,
        bottomMargin,
        bottomMarginTablet,
        bottomMarginMobile,
        leftMargin,
        leftMarginTablet,
        leftMarginMobile,
        rightMargin,
        rightMarginTablet,
        rightMarginMobile,
        topPadding,
        topPaddingTablet,
        topPaddingMobile,
        bottomPadding,
        bottomPaddingTablet,
        bottomPaddingMobile,
        leftPadding,
        leftPaddingTablet,
        leftPaddingMobile,
        rightPadding,
        rightPaddingTablet,
        rightPaddingMobile,
      },
      setAttributes,
    } = this.props;

    // Background Type Options
    const backgroundTypeOptions = [
      { value: "none", label: __("None", "skt-blocks") },
      { value: "color", label: __("Color", "skt-blocks") },
      {
        value: "gradient",
        label: __("Gradient", "skt-blocks"),
      },
      { value: "image", label: __("Image", "skt-blocks") },
    ];
    return (
      <InspectorControls key="inspector">
        <PanelBody
          title={__("Layout", "skt-blocks")}
          initialOpen={false}
        >
          <RangeControl
            label={__("Content Width(%)", "skt-blocks")}
            value={width}
            min={0}
            max={100}
            onChange={(value) =>
              setAttributes({ width: value !== undefined ? value : 50 })
            }
            allowReset
          />
        </PanelBody>
        <PanelBody
          title={__("Background", "skt-blocks")}
          initialOpen={false}
        >
          <SelectControl
            label={__("Background Type", "skt-blocks")}
            value={backgroundType}
            onChange={(value) => setAttributes({ backgroundType: value })}
            options={backgroundTypeOptions}
          />
          {"color" == backgroundType && (
            <Fragment>
              <p className="responsive-setting-label">
                {__("Background Color", "skt-blocks")}
                <span className="components-base-control__label">
                  <span
                    className="component-color-indicator"
                    style={{ backgroundColor: backgroundColor }}
                  ></span>
                </span>
              </p>
              <ColorPalette
                value={backgroundColor}
                onChange={(colorValue) =>
                  setAttributes({ backgroundColor: colorValue })
                }
                allowReset
              />
            </Fragment>
          )}
          {"gradient" == backgroundType && (
            <TabPanel
              className="skt-blocks-inspect-tabs skt-blocks-inspect-tabs-col-2"
              activeClass="active-tab"
              tabs={[
                {
                  name: "normal",
                  title: __("Normal"),
                  className: "skt-blocks-normal-tab",
                },
                {
                  name: "hover",
                  title: __("Hover"),
                  className: "skt-blocks-hover-tab",
                },
              ]}
            >
              {(tabName) => {
                let btn_color_tab;
                if ("normal" === tabName.name) {
                  btn_color_tab = (
                    <Fragment>
                      <p className="responsive-setting-label">
                        {__("Color 1", "skt-blocks")}
                        <span className="components-base-control__label">
                          <span
                            className="component-color-indicator"
                            style={{ backgroundColor: backgroundColor1 }}
                          ></span>
                        </span>
                      </p>
                      <ColorPalette
                        value={backgroundColor1}
                        onChange={(colorValue) =>
                          setAttributes({ backgroundColor1: colorValue })
                        }
                        allowReset
                      />

                      <p className="responsive-setting-label">
                        {__("Color 2", "skt-blocks")}
                        <span className="components-base-control__label">
                          <span
                            className="component-color-indicator"
                            style={{ backgroundColor: backgroundColor2 }}
                          ></span>
                        </span>
                      </p>
                      <ColorPalette
                        value={backgroundColor2}
                        onChange={(colorValue) =>
                          setAttributes({ backgroundColor2: colorValue })
                        }
                        allowReset
                      />
                      <RangeControl
                        label={__(
                          "Color Location 1",
                          "skt-blocks"
                        )}
                        value={colorLocation1}
                        min={0}
                        max={100}
                        onChange={(value) =>
                          setAttributes({
                            colorLocation1: value !== undefined ? value : 0,
                          })
                        }
                      />
                      <RangeControl
                        label={__(
                          "Color Location 2",
                          "skt-blocks"
                        )}
                        value={colorLocation2}
                        min={0}
                        max={100}
                        onChange={(value) =>
                          setAttributes({
                            colorLocation2: value !== undefined ? value : 100,
                          })
                        }
                      />
                      <RangeControl
                        label={__(
                          "Gradient Direction",
                          "skt-blocks"
                        )}
                        value={gradientDirection}
                        min={0}
                        max={100}
                        onChange={(value) =>
                          setAttributes({
                            gradientDirection: value !== undefined ? value : 90,
                          })
                        }
                      />
                    </Fragment>
                  );
                } else {
                  btn_color_tab = (
                    <Fragment>
                      <p className="responsive-setting-label">
                        {__("Color 1", "skt-blocks")}
                        <span className="components-base-control__label">
                          <span
                            className="component-color-indicator"
                            style={{ backgroundColor: hoverbackgroundColor1 }}
                          ></span>
                        </span>
                      </p>
                      <ColorPalette
                        value={hoverbackgroundColor1}
                        onChange={(colorValue) =>
                          setAttributes({ hoverbackgroundColor1: colorValue })
                        }
                        allowReset
                      />

                      <p className="responsive-setting-label">
                        {__("Color 2", "skt-blocks")}
                        <span className="components-base-control__label">
                          <span
                            className="component-color-indicator"
                            style={{ backgroundColor: hoverbackgroundColor2 }}
                          ></span>
                        </span>
                      </p>
                      <ColorPalette
                        value={hoverbackgroundColor2}
                        onChange={(colorValue) =>
                          setAttributes({ hoverbackgroundColor2: colorValue })
                        }
                        allowReset
                      />
                      <RangeControl
                        label={__(
                          "Color Location 1",
                          "skt-blocks"
                        )}
                        value={hovercolorLocation1}
                        min={0}
                        max={100}
                        onChange={(value) =>
                          setAttributes({
                            hovercolorLocation1:
                              value !== undefined ? value : 0,
                          })
                        }
                      />
                      <RangeControl
                        label={__(
                          "Color Location 2",
                          "skt-blocks"
                        )}
                        value={hovercolorLocation2}
                        min={0}
                        max={100}
                        onChange={(value) =>
                          setAttributes({
                            hovercolorLocation2:
                              value !== undefined ? value : 100,
                          })
                        }
                      />
                      <RangeControl
                        label={__(
                          "Gradient Direction",
                          "skt-blocks"
                        )}
                        value={hovergradientDirection}
                        min={0}
                        max={100}
                        onChange={(value) =>
                          setAttributes({
                            hovergradientDirection:
                              value !== undefined ? value : 90,
                          })
                        }
                      />
                    </Fragment>
                  );
                }
                return <div>{btn_color_tab}</div>;
              }}
            </TabPanel>
          )}
          {"image" == backgroundType && (
            <Fragment>
              <BaseControl
                className="editor-bg-image-control"
                label={__("Background Image", "skt-blocks")}
              >
                <MediaUpload
                  title={__(
                    "Select Background Image",
                    "skt-blocks"
                  )}
                  onSelect={this.onSelectImage}
                  allowedTypes={["image"]}
                  value={backgroundImage}
                  render={({ open }) => (
                    <Button isDefault onClick={open}>
                      {!backgroundImage
                        ? __(
                            "Select Background Image",
                            "skt-blocks"
                          )
                        : __("Replace image", "skt-blocks")}
                    </Button>
                  )}
                />
                {backgroundImage && (
                  <Button
                    className="rbea-rm-btn"
                    onClick={this.onRemoveImage}
                    isLink
                    isDestructive
                  >
                    {__("Remove Image", "skt-blocks")}
                  </Button>
                )}
              </BaseControl>
              {backgroundImage && (
                <Fragment>
                  <SelectControl
                    label={__("Image Position")}
                    value={backgroundPosition}
                    onChange={(value) =>
                      setAttributes({ backgroundPosition: value })
                    }
                    options={[
                      { value: "top-left", label: __("Top Left") },
                      { value: "top center", label: __("Top Center") },
                      { value: "top right", label: __("Top Right") },
                      { value: "center left", label: __("Center Left") },
                      { value: "center center", label: __("Center Center") },
                      { value: "center right", label: __("Center Right") },
                      { value: "bottom left", label: __("Bottom Left") },
                      { value: "bottom center", label: __("Bottom Center") },
                      { value: "bottom right", label: __("Bottom Right") },
                    ]}
                  />
                  <SelectControl
                    label={__("Attachment")}
                    value={backgroundAttachment}
                    onChange={(value) =>
                      setAttributes({ backgroundAttachment: value })
                    }
                    options={[
                      { value: "fixed", label: __("Fixed") },
                      { value: "scroll", label: __("Scroll") },
                    ]}
                  />
                  <SelectControl
                    label={__("Repeat")}
                    value={backgroundRepeat}
                    onChange={(value) =>
                      setAttributes({ backgroundRepeat: value })
                    }
                    options={[
                      { value: "no-repeat", label: __("No Repeat") },
                      { value: "repeat", label: __("Repeat") },
                      { value: "repeat-x", label: __("Repeat-x") },
                      { value: "repeat-y", label: __("Repeat-y") },
                    ]}
                  />
                  <SelectControl
                    label={__("Size")}
                    value={backgroundSize}
                    onChange={(value) =>
                      setAttributes({ backgroundSize: value })
                    }
                    options={[
                      { value: "auto", label: __("Auto") },
                      { value: "cover", label: __("Cover") },
                      { value: "contain", label: __("Contain") },
                    ]}
                  />
                  <SelectControl
                    label={__("Image Overlay Type")}
                    value={overlayType}
                    onChange={(value) => setAttributes({ overlayType: value })}
                    options={[
                      { value: "color", label: __("Color") },
                      { value: "gradient", label: __("Gradient") },
                    ]}
                  />
                  {overlayType == "color" && (
                    <Fragment>
                      <p className="responsive-setting-label">
                        {__("Image Overlay Color")}
                        <span className="components-base-control__label">
                          <span
                            className="component-color-indicator"
                            style={{ backgroundColor: backgroundImageColor }}
                          ></span>
                        </span>
                      </p>
                      <ColorPalette
                        value={backgroundImageColor}
                        onChange={(colorValue) =>
                          setAttributes({ backgroundImageColor: colorValue })
                        }
                        allowReset
                      />
                    </Fragment>
                  )}

                  {"gradient" == overlayType && (
                    <Fragment>
                      <p className="responsive-setting-label">
                        {__("Color 1")}
                        <span className="components-base-control__label">
                          <span
                            className="component-color-indicator"
                            style={{ backgroundColor: gradientOverlayColor1 }}
                          ></span>
                        </span>
                      </p>
                      <ColorPalette
                        value={gradientOverlayColor1}
                        onChange={(colorValue) =>
                          setAttributes({ gradientOverlayColor1: colorValue })
                        }
                        allowReset
                      />
                      <RangeControl
                        label={__("Location 1")}
                        value={gradientOverlayLocation1}
                        onChange={(value) =>
                          setAttributes({ gradientOverlayLocation1: value })
                        }
                        min={0}
                        max={100}
                        allowReset
                      />
                      <p className="responsive-setting-label">
                        {__("Color 2")}
                        <span className="components-base-control__label">
                          <span
                            className="component-color-indicator"
                            style={{ backgroundColor: gradientOverlayColor2 }}
                          ></span>
                        </span>
                      </p>
                      <ColorPalette
                        value={gradientOverlayColor2}
                        onChange={(colorValue) =>
                          setAttributes({ gradientOverlayColor2: colorValue })
                        }
                        allowReset
                      />
                      <RangeControl
                        label={__("Location 2")}
                        value={gradientOverlayLocation2}
                        onChange={(value) =>
                          setAttributes({ gradientOverlayLocation2: value })
                        }
                        min={0}
                        max={100}
                        allowReset
                      />
                      <SelectControl
                        label={__("Type")}
                        value={gradientOverlayType}
                        onChange={(value) =>
                          setAttributes({ gradientOverlayType: value })
                        }
                        options={[
                          { value: "linear", label: __("Linear") },
                          { value: "radial", label: __("Radial") },
                        ]}
                      />
                      {"linear" == gradientOverlayType && (
                        <RangeControl
                          label={__("Angle")}
                          value={gradientOverlayAngle}
                          onChange={(value) =>
                            setAttributes({ gradientOverlayAngle: value })
                          }
                          min={0}
                          max={360}
                          allowReset
                        />
                      )}
                      {"radial" == gradientOverlayType && (
                        <SelectControl
                          label={__("Type")}
                          value={gradientOverlayPosition}
                          onChange={(value) =>
                            setAttributes({ gradientOverlayPosition: value })
                          }
                          options={[
                            {
                              value: "center center",
                              label: __("Center Center"),
                            },
                            { value: "center left", label: __("Center Left") },
                            {
                              value: "center right",
                              label: __("Center Right"),
                            },
                            { value: "top center", label: __("Top Center") },
                            { value: "top left", label: __("Top Left") },
                            { value: "top right", label: __("Top Right") },
                            {
                              value: "bottom center",
                              label: __("Bottom Center"),
                            },
                            { value: "bottom left", label: __("Bottom Left") },
                            {
                              value: "bottom right",
                              label: __("Bottom Right"),
                            },
                          ]}
                        />
                      )}
                    </Fragment>
                  )}
                </Fragment>
              )}
            </Fragment>
          )}
          <RangeControl
            label={__("Opacity", "skt-blocks")}
            value={opacity}
            onChange={(value) =>
              setAttributes({ opacity: value !== undefined ? value : 20 })
            }
            min={0}
            max={100}
            allowReset
          />
        </PanelBody>
        <PanelBody
          title={__("Spacing", "skt-blocks")}
          initialOpen={false}
        >
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
                  <Fragment>
                    <RangeControl
                      label={__(
                        "Top Padding Mobile",
                        "skt-blocks"
                      )}
                      min={0}
                      max={2000}
                      value={topPaddingMobile}
                      onChange={(value) =>
                        setAttributes({
                          topPaddingMobile: value,
                        })
                      }
                    />
                  </Fragment>
                );
              } else if ("tablet" === tab.name) {
                tabout = (
                  <Fragment>
                    <RangeControl
                      label={__(
                        "Top Padding Tablet",
                        "skt-blocks"
                      )}
                      min={0}
                      max={2000}
                      value={topPaddingTablet}
                      onChange={(value) =>
                        setAttributes({
                          topPaddingTablet: value,
                        })
                      }
                    />
                  </Fragment>
                );
              } else {
                tabout = (
                  <Fragment>
                    <RangeControl
                      label={__(
                        "Top Padding",
                        "skt-blocks"
                      )}
                      min={0}
                      max={2000}
                      value={topPadding}
                      onChange={(value) =>
                        setAttributes({
                          topPadding: value,
                        })
                      }
                    />
                  </Fragment>
                );
              }

              return <div>{tabout}</div>;
            }}
          </TabPanel>
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
                  <Fragment>
                    <RangeControl
                      label={__(
                        "Bottom Padding Mobile",
                        "skt-blocks"
                      )}
                      min={0}
                      max={2000}
                      value={bottomPaddingMobile}
                      onChange={(value) =>
                        setAttributes({
                          bottomPaddingMobile: value,
                        })
                      }
                    />
                  </Fragment>
                );
              } else if ("tablet" === tab.name) {
                tabout = (
                  <Fragment>
                    <RangeControl
                      label={__(
                        "Bottom Padding Tablet",
                        "skt-blocks"
                      )}
                      min={0}
                      max={2000}
                      value={bottomPaddingTablet}
                      onChange={(value) =>
                        setAttributes({
                          bottomPaddingTablet: value,
                        })
                      }
                    />
                  </Fragment>
                );
              } else {
                tabout = (
                  <Fragment>
                    <RangeControl
                      label={__(
                        "Bottom Padding",
                        "skt-blocks"
                      )}
                      min={0}
                      max={2000}
                      value={bottomPadding}
                      onChange={(value) =>
                        setAttributes({
                          bottomPadding: value,
                        })
                      }
                    />
                  </Fragment>
                );
              }

              return <div>{tabout}</div>;
            }}
          </TabPanel>
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
                  <Fragment>
                    <RangeControl
                      label={__(
                        "Left Padding Mobile",
                        "skt-blocks"
                      )}
                      min={0}
                      max={2000}
                      value={leftPaddingMobile}
                      onChange={(value) =>
                        setAttributes({
                          leftPaddingMobile: value,
                        })
                      }
                    />
                  </Fragment>
                );
              } else if ("tablet" === tab.name) {
                tabout = (
                  <Fragment>
                    <RangeControl
                      label={__(
                        "Left Padding Tablet",
                        "skt-blocks"
                      )}
                      min={0}
                      max={2000}
                      value={leftPaddingTablet}
                      onChange={(value) =>
                        setAttributes({
                          leftPaddingTablet: value,
                        })
                      }
                    />
                  </Fragment>
                );
              } else {
                tabout = (
                  <Fragment>
                    <RangeControl
                      label={__(
                        "Left Padding",
                        "skt-blocks"
                      )}
                      min={0}
                      max={2000}
                      value={leftPadding}
                      onChange={(value) =>
                        setAttributes({
                          leftPadding: value,
                        })
                      }
                    />
                  </Fragment>
                );
              }

              return <div>{tabout}</div>;
            }}
          </TabPanel>
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
                  <Fragment>
                    <RangeControl
                      label={__(
                        "Right Padding Mobile",
                        "skt-blocks"
                      )}
                      min={0}
                      max={2000}
                      value={rightPaddingMobile}
                      onChange={(value) =>
                        setAttributes({
                          rightPaddingMobile: value,
                        })
                      }
                    />
                  </Fragment>
                );
              } else if ("tablet" === tab.name) {
                tabout = (
                  <Fragment>
                    <RangeControl
                      label={__(
                        "Right Padding Tablet",
                        "skt-blocks"
                      )}
                      min={0}
                      max={2000}
                      value={rightPaddingTablet}
                      onChange={(value) =>
                        setAttributes({
                          rightPaddingTablet: value,
                        })
                      }
                    />
                  </Fragment>
                );
              } else {
                tabout = (
                  <Fragment>
                    <RangeControl
                      label={__(
                        "Right Padding",
                        "skt-blocks"
                      )}
                      min={0}
                      max={2000}
                      value={rightPadding}
                      onChange={(value) =>
                        setAttributes({
                          rightPadding: value,
                        })
                      }
                    />
                  </Fragment>
                );
              }

              return <div>{tabout}</div>;
            }}
          </TabPanel>
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
                  <Fragment>
                    <RangeControl
                      label={__(
                        "Top Margin Mobile",
                        "skt-blocks"
                      )}
                      min={-2000}
                      max={2000}
                      value={topMarginMobile}
                      onChange={(value) =>
                        setAttributes({
                          topMarginMobile: value,
                        })
                      }
                    />
                  </Fragment>
                );
              } else if ("tablet" === tab.name) {
                tabout = (
                  <Fragment>
                    <RangeControl
                      label={__(
                        "Top Margin Tablet",
                        "skt-blocks"
                      )}
                      min={-2000}
                      max={2000}
                      value={topMarginTablet}
                      onChange={(value) =>
                        setAttributes({
                          topMarginTablet: value,
                        })
                      }
                    />
                  </Fragment>
                );
              } else {
                tabout = (
                  <Fragment>
                    <RangeControl
                      label={__("Top Margin", "skt-blocks")}
                      min={-2000}
                      max={2000}
                      value={topMargin}
                      onChange={(value) =>
                        setAttributes({
                          topMargin: value,
                        })
                      }
                    />
                  </Fragment>
                );
              }

              return <div>{tabout}</div>;
            }}
          </TabPanel>
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
                  <Fragment>
                    <RangeControl
                      label={__(
                        "Bottom Margin Mobile",
                        "skt-blocks"
                      )}
                      min={-2000}
                      max={2000}
                      value={bottomMarginMobile}
                      onChange={(value) =>
                        setAttributes({
                          bottomMarginMobile: value,
                        })
                      }
                    />
                  </Fragment>
                );
              } else if ("tablet" === tab.name) {
                tabout = (
                  <Fragment>
                    <RangeControl
                      label={__(
                        "Bottom Margin Tablet",
                        "skt-blocks"
                      )}
                      min={-2000}
                      max={2000}
                      value={bottomMarginTablet}
                      onChange={(value) =>
                        setAttributes({
                          bottomMarginTablet: value,
                        })
                      }
                    />
                  </Fragment>
                );
              } else {
                tabout = (
                  <Fragment>
                    <RangeControl
                      label={__(
                        "Bottom Margin",
                        "skt-blocks"
                      )}
                      min={-2000}
                      max={2000}
                      value={bottomMargin}
                      onChange={(value) =>
                        setAttributes({
                          bottomMargin: value,
                        })
                      }
                    />
                  </Fragment>
                );
              }

              return <div>{tabout}</div>;
            }}
          </TabPanel>
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
                  <Fragment>
                    <RangeControl
                      label={__(
                        "Left Margin Mobile",
                        "skt-blocks"
                      )}
                      min={-2000}
                      max={2000}
                      value={leftMarginMobile}
                      onChange={(value) =>
                        setAttributes({
                          leftMarginMobile: value,
                        })
                      }
                    />
                  </Fragment>
                );
              } else if ("tablet" === tab.name) {
                tabout = (
                  <Fragment>
                    <RangeControl
                      label={__(
                        "Left Margin Tablet",
                        "skt-blocks"
                      )}
                      min={-2000}
                      max={2000}
                      value={leftMarginTablet}
                      onChange={(value) =>
                        setAttributes({
                          leftMarginTablet: value,
                        })
                      }
                    />
                  </Fragment>
                );
              } else {
                tabout = (
                  <Fragment>
                    <RangeControl
                      label={__(
                        "Left Margin",
                        "skt-blocks"
                      )}
                      min={-2000}
                      max={2000}
                      value={leftMargin}
                      onChange={(value) =>
                        setAttributes({
                          leftMargin: value,
                        })
                      }
                    />
                  </Fragment>
                );
              }

              return <div>{tabout}</div>;
            }}
          </TabPanel>
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
                  <Fragment>
                    <RangeControl
                      label={__(
                        "Right Margin Mobile",
                        "skt-blocks"
                      )}
                      min={-2000}
                      max={2000}
                      value={rightMarginMobile}
                      onChange={(value) =>
                        setAttributes({
                          rightMarginMobile: value,
                        })
                      }
                    />
                  </Fragment>
                );
              } else if ("tablet" === tab.name) {
                tabout = (
                  <Fragment>
                    <RangeControl
                      label={__(
                        "Right Margin Tablet",
                        "skt-blocks"
                      )}
                      min={-2000}
                      max={2000}
                      value={rightMarginTablet}
                      onChange={(value) =>
                        setAttributes({
                          rightMarginTablet: value,
                        })
                      }
                    />
                  </Fragment>
                );
              } else {
                tabout = (
                  <Fragment>
                    <RangeControl
                      label={__(
                        "Right Margin",
                        "skt-blocks"
                      )}
                      min={-2000}
                      max={2000}
                      value={rightMargin}
                      onChange={(value) =>
                        setAttributes({
                          rightMargin: value,
                        })
                      }
                    />
                  </Fragment>
                );
              }

              return <div>{tabout}</div>;
            }}
          </TabPanel>
        </PanelBody>
        <PanelBody
          title={__("Border", "skt-blocks")}
          initialOpen={false}
        >
          <SelectControl
            label={__("Border Style")}
            value={blockBorderStyle}
            onChange={(value) => setAttributes({ blockBorderStyle: value })}
            options={[
              { value: "none", label: __("None") },
              { value: "solid", label: __("Solid") },
              { value: "dotted", label: __("Dotted") },
              { value: "dashed", label: __("Dashed") },
              { value: "double", label: __("Double") },
              { value: "groove", label: __("Groove") },
              { value: "inset", label: __("Inset") },
              { value: "outset", label: __("Outset") },
              { value: "ridge", label: __("Ridge") },
            ]}
          />
          {"none" != blockBorderStyle && (
            <RangeControl
              label={__("Border Width")}
              value={blockBorderWidth}
              onChange={(value) =>
                setAttributes({
                  blockBorderWidth: value !== undefined ? value : 1,
                })
              }
              min={0}
              max={50}
              allowReset
            />
          )}
          <RangeControl
            label={__("Border Radius")}
            value={blockBorderRadius}
            onChange={(value) =>
              setAttributes({
                blockBorderRadius: value !== undefined ? value : "",
              })
            }
            min={0}
            max={1000}
            allowReset
          />
          {"none" != blockBorderStyle && (
            <Fragment>
              <p className="responsive-setting-label">
                {__("Border Color")}
                <span className="components-base-control__label">
                  <span
                    className="component-color-indicator"
                    style={{ backgroundColor: blockBorderColor }}
                  ></span>
                </span>
              </p>
              <ColorPalette
                value={blockBorderColor}
                onChange={(colorValue) =>
                  setAttributes({ blockBorderColor: colorValue })
                }
                allowReset
              />
            </Fragment>
          )}
          <BoxShadowControl
            setAttributes={setAttributes}
            label={__("Box Shadow", "skt-blocks")}
            boxShadowColor={{ value: boxShadowColor, label: __("Color") }}
            boxShadowHOffset={{
              value: boxShadowHOffset,
              label: __("Horizontal", "skt-blocks"),
            }}
            boxShadowVOffset={{
              value: boxShadowVOffset,
              label: __("Vertical", "skt-blocks"),
            }}
            boxShadowBlur={{
              value: boxShadowBlur,
              label: __("Blur", "skt-blocks"),
            }}
            boxShadowSpread={{
              value: boxShadowSpread,
              label: __("Spread", "skt-blocks"),
            }}
            boxShadowPosition={{
              value: boxShadowPosition,
              label: __("Position", "skt-blocks"),
            }}
          />
          <BoxShadowControlHelper
            setAttributes={setAttributes}
      boxShadowColor={{ value: hoverboxShadowColor }}
            label={__("Hover Box Shadow")}
            attrNameTemplate="hover%s"
          />
        </PanelBody>
      </InspectorControls>
    );
  }
}
