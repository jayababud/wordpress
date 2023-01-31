import fontOptions from "../../../utils/googlefonts";

/**
 * Inspector Controls
 */

// Setup the block
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;

import compact from "lodash/compact";
import map from "lodash/map";
import BoxShadowControl from "../../../utils/components/box-shadow";
import { loadGoogleFont } from "../../../utils/font";

// Import block components
const { InspectorControls, ColorPalette, PanelColorSettings } = wp.blockEditor;

// Import Inspector components
const {
  PanelBody,
  QueryControls,
  RangeControl,
  SelectControl,
  TextControl,
  ToggleControl,
  TabPanel,
  Icon,
} = wp.components;

const { addQueryArgs } = wp.url;

const { apiFetch } = wp;

const MAX_POSTS_COLUMNS = 4;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
  constructor() {
    super(...arguments);
    this.state = { categoriesList: [] };
  }

  componentDidMount() {
    this.stillMounted = true;
    this.fetchRequest = apiFetch({
      path: addQueryArgs("/wp/v2/categories", { per_page: -1 }),
    })
      .then((categoriesList) => {
        if (this.stillMounted) {
          this.setState({ categoriesList });
        }
      })
      .catch(() => {
        if (this.stillMounted) {
          this.setState({ categoriesList: [] });
        }
      });
  }

  componentWillUnmount() {
    this.stillMounted = false;
  }

  /* Get the available image sizes */
  imageSizeSelect() {
    const getSettings = wp.data.select("core/editor").getEditorSettings();

    return compact(
      map(getSettings.imageSizes, ({ name, slug }) => {
        return {
          value: slug,
          label: name,
        };
      })
    );
  }

  render() {
    // Setup the attributes
    const { attributes, setAttributes, latestPosts } = this.props;

    const { order, orderBy } = attributes;

    const { categoriesList } = this.state;

    // Post type options
    const postTypeOptions = [
      { value: "post", label: __("Post", "skt-blocks") },
      { value: "page", label: __("Page", "skt-blocks") },
    ];

    // Section title tags
    const sectionTags = [
      { value: "div", label: __("div", "skt-blocks") },
      {
        value: "header",
        label: __("header", "skt-blocks"),
      },
      {
        value: "section",
        label: __("section", "skt-blocks"),
      },
      {
        value: "article",
        label: __("article", "skt-blocks"),
      },
      { value: "main", label: __("main", "skt-blocks") },
      { value: "aside", label: __("aside", "skt-blocks") },
      {
        value: "footer",
        label: __("footer", "skt-blocks"),
      },
    ];

    // Section title tags
    const sectionTitleTags = [
      { value: "h2", label: __("H2", "skt-blocks") },
      { value: "h3", label: __("H3", "skt-blocks") },
      { value: "h4", label: __("H4", "skt-blocks") },
      { value: "h5", label: __("H5", "skt-blocks") },
      { value: "h6", label: __("H6", "skt-blocks") },
    ];

    // Font Weight Options
    const fontWeightOptions = [
      {
        value: "100",
        label: __("100", "skt-blocks"),
      },
      {
        value: "200",
        label: __("200", "skt-blocks"),
      },
      {
        value: "300",
        label: __("300", "skt-blocks"),
      },
      {
        value: "400",
        label: __("400", "skt-blocks"),
      },
      {
        value: "500",
        label: __("500", "skt-blocks"),
      },
      {
        value: "600",
        label: __("600", "skt-blocks"),
      },
      {
        value: "700",
        label: __("700", "skt-blocks"),
      },
      {
        value: "800",
        label: __("800", "skt-blocks"),
      },
      {
        value: "900",
        label: __("900", "skt-blocks"),
      },
    ];

    // Check for posts
    const hasPosts = Array.isArray(latestPosts) && latestPosts.length;

    // Check the post type
    const isPost = "post" === attributes.postType;

    // Add instruction text to the select
    const abImageSizeSelect = {
      value: "selectimage",
      label: __("Select image size"),
    };

    // Get the image size options
    const imageSizeOptions = this.imageSizeSelect();

    const imageSizeValue = () => {
      for (let i = 0; i < imageSizeOptions.length; i++) {
        if (imageSizeOptions[i].value === attributes.imageSize) {
          return attributes.imageSize;
        }
      }
      return "full";
    };

    return (
      <InspectorControls>
        <PanelBody
          title={__("Post Timeline Settings", "skt-blocks")}
          className={
            isPost ? null : "skt-blocks-hide-query"
          }
        >
          <SelectControl
            label={__("Content Type", "skt-blocks")}
            options={postTypeOptions}
            value={attributes.postType}
            onChange={(value) => this.props.setAttributes({ postType: value })}
          />

          <QueryControls
            {...{ order, orderBy }}
            numberOfItems={attributes.postsToShow}
            onNumberOfItemsChange={(value) =>
              setAttributes({ postsToShow: value })
            }
          />
          <SelectControl
            label={__("Order By")}
            value={attributes.orderBy}
            onChange={(value) => setAttributes({ orderBy: value })}
            options={[
              { value: "date", label: __("Date") },
              { value: "title", label: __("Title") },
              { value: "rand", label: __("Random") },
              { value: "menu_order", label: __("Menu Order") },
            ]}
          />
          <SelectControl
            label={__("Order")}
            value={attributes.order}
            onChange={(value) => setAttributes({ order: value })}
            options={[
              { value: "desc", label: __("Descending") },
              { value: "asc", label: __("Ascending") },
            ]}
          />

          <RangeControl
            label={__(
              "Number of items to offset",
              "skt-blocks"
            )}
            value={attributes.offset}
            onChange={(value) => setAttributes({ offset: value })}
            min={0}
            max={20}
          />
          <RangeControl
            label={__("Border Radius")}
            value={attributes.borderRadius}
            onChange={(value) =>
              setAttributes({ borderRadius: value !== undefined ? value : 0 })
            }
            min={0}
            max={100}
            allowReset
          />
          <SelectControl
            label={__("Orientation", "skt-blocks")}
            value={attributes.timelinAlignment}
            onChange={(value) => setAttributes({ timelinAlignment: value })}
            options={[
              {
                value: "left",
                label: __("Left", "skt-blocks"),
              },
              {
                value: "right",
                label: __("Right", "skt-blocks"),
              },
              {
                value: "center",
                label: __("Center", "skt-blocks"),
              },
            ]}
          />
          <SelectControl
            label={__("Arrow Alignment")}
            value={attributes.arrowlinAlignment}
            onChange={(value) => setAttributes({ arrowlinAlignment: value })}
            options={[
              {
                value: "top",
                label: __("Top", "skt-blocks"),
              },
              {
                value: "bottom",
                label: __("Bottom", "skt-blocks"),
              },
              {
                value: "center",
                label: __("Center", "skt-blocks"),
              },
            ]}
          />
          <SelectControl
            label={__("Stack on", "skt-blocks")}
            value={attributes.stack}
            options={[
              {
                value: "none",
                label: __("None", "skt-blocks"),
              },
              {
                value: "tablet",
                label: __("Tablet", "skt-blocks"),
              },
              {
                value: "mobile",
                label: __("Mobile", "skt-blocks"),
              },
            ]}
            onChange={(value) => setAttributes({ stack: value })}
            help={__(
              "Note: Choose on what breakpoint the columns will stack.",
              "skt-blocks"
            )}
          />
        </PanelBody>
        <PanelBody
          title={__("Post Timeline Content", "skt-blocks")}
          initialOpen={false}
        >
          <ToggleControl
            label={__(
              "Display Section Title",
              "skt-blocks"
            )}
            checked={attributes.displaySectionTitle}
            onChange={() =>
              this.props.setAttributes({
                displaySectionTitle: !attributes.displaySectionTitle,
              })
            }
          />
          {attributes.displaySectionTitle && (
            <TextControl
              label={__("Section Title", "skt-blocks")}
              type="text"
              value={attributes.sectionTitle}
              onChange={(value) =>
                this.props.setAttributes({
                  sectionTitle: value,
                })
              }
            />
          )}
          <ToggleControl
            label={__(
              "Display Featured Image",
              "skt-blocks"
            )}
            checked={attributes.displayPostImage}
            onChange={() =>
              this.props.setAttributes({
                displayPostImage: !attributes.displayPostImage,
              })
            }
          />
          {attributes.displayPostImage && (
            <SelectControl
              label={__("Image Size", "skt-blocks")}
              value={imageSizeValue()}
              options={imageSizeOptions}
              onChange={(value) =>
                this.props.setAttributes({
                  imageSize: value,
                })
              }
            />
          )}
          <ToggleControl
            label={__("Display Title", "skt-blocks")}
            checked={attributes.displayPostTitle}
            onChange={() =>
              this.props.setAttributes({
                displayPostTitle: !attributes.displayPostTitle,
              })
            }
          />
          {isPost && (
            <ToggleControl
              label={__("Display Author", "skt-blocks")}
              checked={attributes.displayPostAuthor}
              onChange={() =>
                this.props.setAttributes({
                  displayPostAuthor: !attributes.displayPostAuthor,
                })
              }
            />
          )}
          {isPost && (
            <ToggleControl
              label={__("Display Date", "skt-blocks")}
              checked={attributes.displayPostDate}
              onChange={() =>
                this.props.setAttributes({
                  displayPostDate: !attributes.displayPostDate,
                })
              }
            />
          )}
          <ToggleControl
            label={__("Display Excerpt", "skt-blocks")}
            checked={attributes.displayPostExcerpt}
            onChange={() =>
              this.props.setAttributes({
                displayPostExcerpt: !attributes.displayPostExcerpt,
              })
            }
          />
          {attributes.displayPostExcerpt && (
            <RangeControl
              label={__("Excerpt Length", "skt-blocks")}
              value={attributes.excerptLength}
              onChange={(value) => setAttributes({ excerptLength: value })}
              min={0}
              max={150}
            />
          )}
          <ToggleControl
            label={__(
              "Display Continue Reading Link",
              "skt-blocks"
            )}
            checked={attributes.displayPostLink}
            onChange={() =>
              this.props.setAttributes({
                displayPostLink: !attributes.displayPostLink,
              })
            }
          />
          {attributes.displayPostLink && (
            <Fragment>
              <TextControl
                label={__(
                  "Customize Continue Reading Text",
                  "skt-blocks"
                )}
                type="text"
                value={attributes.readMoreText}
                onChange={(value) =>
                  this.props.setAttributes({
                    readMoreText: value,
                  })
                }
              />
              <ToggleControl
                label={__(
                  "Open link in new tab",
                  "skt-blocks"
                )}
                checked={attributes.target}
                onChange={() => {
                  this.props.setAttributes({ target: !attributes.target });
                }}
              />
            </Fragment>
          )}
        </PanelBody>
        <PanelBody
          title={__("Post Timeline Markup", "skt-blocks")}
          initialOpen={false}
          className="skt-blocks-block-post-timeline-markup-settings"
        >
          <SelectControl
            label={__(
              "Post Timeline Section Tag",
              "skt-blocks"
            )}
            options={sectionTags}
            value={attributes.sectionTag}
            onChange={(value) =>
              this.props.setAttributes({ sectionTag: value })
            }
            help={__(
              "Change the post grid section tag to match your content hierarchy.",
              "skt-blocks"
            )}
          />
          {attributes.sectionTitle && (
            <SelectControl
              label={__(
                "Section Title Heading Tag",
                "skt-blocks"
              )}
              options={sectionTitleTags}
              value={attributes.sectionTitleTag}
              onChange={(value) =>
                this.props.setAttributes({
                  sectionTitleTag: value,
                })
              }
              help={__(
                "Change the post/page section title tag to match your content hierarchy.",
                "skt-blocks"
              )}
            />
          )}
          {attributes.displayPostTitle && (
            <SelectControl
              label={__(
                "Post Title Heading Tag",
                "skt-blocks"
              )}
              options={sectionTitleTags}
              value={attributes.postTitleTag}
              onChange={(value) =>
                this.props.setAttributes({
                  postTitleTag: value,
                })
              }
              help={__(
                "Change the post/page title tag to match your content hierarchy.",
                "skt-blocks"
              )}
            />
          )}
        </PanelBody>
        <PanelBody
          title={__("Connector Settings", "skt-blocks")}
          initialOpen={false}
        >
          <hr className="skt-blocks-editor__separator" />
          <RangeControl
            label={__("Icon Size")}
            value={attributes.iconSize}
            onChange={(value) => this.props.setAttributes({ iconSize: value })}
            min={0}
            max={500}
          />
          <hr className="skt-blocks-editor__separator" />
          <RangeControl
            label={__("Background Size")}
            value={attributes.bgSize}
            onChange={(value) =>
              this.props.setAttributes({
                bgSize: value !== undefined ? value : 35,
              })
            }
            min={25}
            max={90}
            allowReset
          />
          <RangeControl
            label={__("Border Width")}
            value={attributes.borderWidth}
            onChange={(value) =>
              this.props.setAttributes({ borderWidth: value })
            }
            min={0}
            max={10}
          />
          <RangeControl
            label={__("Connector Width")}
            value={attributes.connectorWidth}
            onChange={(value) =>
              this.props.setAttributes({ connectorWidth: value })
            }
            min={0}
            max={500}
          />
          <PanelBody title={__("Connector Color Settings")} initialOpen={true}>
            <TabPanel
              className="rbea-inspect-tabs rbea-inspect-tabs-col-2"
              activeClass="active-tab"
              tabs={[
                {
                  name: "normal",
                  title: __("Normal"),
                  className: "rbea-normal-tab",
                },
                {
                  name: "focus",
                  title: __("Focus"),
                  className: "rbea-focus-tab",
                },
              ]}
            >
              {(tabName) => {
                let tabout;
                if ("focus" === tabName.name) {
                  tabout = (
                    <PanelColorSettings
                      title={__("Hover Color Settings")}
                      initialOpen={true}
                      colorSettings={[
                        {
                          value: attributes.separatorFillColor,
                          onChange: (colorValue) =>
                            this.props.setAttributes({
                              separatorFillColor: colorValue,
                            }),
                          label: __("Line Hover Color"),
                        },
                        {
                          value: attributes.iconFocus,
                          onChange: (colorValue) =>
                            this.props.setAttributes({ iconFocus: colorValue }),
                          label: __("Icon Hover Color"),
                        },
                        {
                          value: attributes.iconBgFocus,
                          onChange: (colorValue) =>
                            this.props.setAttributes({
                              iconBgFocus: colorValue,
                            }),
                          label: __("Background Hover Color"),
                        },
                        {
                          value: attributes.borderFocus,
                          onChange: (colorValue) =>
                            this.props.setAttributes({
                              borderFocus: colorValue,
                            }),
                          label: __("Border Hover Color"),
                        },
                      ]}
                    ></PanelColorSettings>
                  );
                } else {
                  tabout = (
                    <PanelColorSettings
                      title={__("Color Settings")}
                      initialOpen={true}
                      colorSettings={[
                        {
                          value: attributes.connectorColor,
                          onChange: (colorValue) =>
                            this.props.setAttributes({
                              connectorColor: colorValue,
                            }),
                          label: __("Line Color"),
                        },
                        {
                          value: attributes.iconColor,
                          onChange: (colorValue) =>
                            this.props.setAttributes({ iconColor: colorValue }),
                          label: __("Icon Color"),
                        },
                        {
                          value: attributes.separatorBg,
                          onChange: (colorValue) =>
                            this.props.setAttributes({
                              separatorBg: colorValue,
                            }),
                          label: __("Background Color"),
                        },
                        {
                          value: attributes.separatorBorder,
                          onChange: (colorValue) =>
                            this.props.setAttributes({
                              separatorBorder: colorValue,
                            }),
                          label: __("Border Color"),
                        },
                      ]}
                    ></PanelColorSettings>
                  );
                }
                return <div>{tabout}</div>;
              }}
            </TabPanel>
          </PanelBody>
        </PanelBody>
        <PanelBody
          title={__("Colors", "skt-blocks")}
          initialOpen={false}
        >
          <p className="responsive-setting-label">
            {__("Blog Post Background Color")}
            <span className="components-base-control__label">
              <span
                className="component-color-indicator"
                style={{ backgroundColor: attributes.bgColor }}
              ></span>
            </span>
          </p>
          <ColorPalette
            value={attributes.bgColor}
            onChange={(value) =>
              this.props.setAttributes({
                bgColor: value,
              })
            }
            allowReset
          />
          <p className="responsive-setting-label">
            {__("Heading Color")}
            <span className="components-base-control__label">
              <span
                className="component-color-indicator"
                style={{
                  backgroundColor: attributes.headingColor,
                }}
              ></span>
            </span>
          </p>
          <ColorPalette
            value={attributes.headingColor}
            onChange={(value) =>
              this.props.setAttributes({
                headingColor: value,
              })
            }
            allowReset
          />
          <p className="responsive-setting-label">
            {__("Author Color")}
            <span className="components-base-control__label">
              <span
                className="component-color-indicator"
                style={{
                  backgroundColor: attributes.authorColor,
                }}
              ></span>
            </span>
          </p>
          <ColorPalette
            value={attributes.authorColor}
            onChange={(value) =>
              this.props.setAttributes({
                authorColor: value,
              })
            }
            allowReset
          />
          <p className="responsive-setting-label">
            {__("Content Color")}
            <span className="components-base-control__label">
              <span
                className="component-color-indicator"
                style={{
                  backgroundColor: attributes.textColor,
                }}
              ></span>
            </span>
          </p>
          <ColorPalette
            value={attributes.textColor}
            onChange={(value) =>
              this.props.setAttributes({
                textColor: value,
              })
            }
            allowReset
          />
          <Fragment>
            <PanelBody
              title={__("CTA Color Settings", "skt-blocks")}
              initialOpen={false}
            >
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
                        <p className="skt-blocks-setting-label">
                          {__(
                            "Continue Reading Text Color",
                            "skt-blocks"
                          )}
                          <span className="components-base-control__label">
                            <span
                              className="component-color-indicator"
                              style={{ color: attributes.continueColor }}
                            ></span>
                          </span>
                        </p>
                        <ColorPalette
                          value={attributes.continueColor}
                          onChange={(value) =>
                            this.props.setAttributes({ continueColor: value })
                          }
                          allowReset
                        />
                        <p className="skt-blocks-setting-label">
                          {__(
                            "Continue Reading Background Color",
                            "skt-blocks"
                          )}
                          <span className="components-base-control__label">
                            <span
                              className="component-color-indicator"
                              style={{ color: attributes.continuebgColor }}
                            ></span>
                          </span>
                        </p>
                        <ColorPalette
                          value={attributes.continuebgColor}
                          onChange={(value) =>
                            this.props.setAttributes({ continuebgColor: value })
                          }
                          allowReset
                        />
                        <p className="skt-blocks-setting-label">
                          {__(
                            "Continue Reading Border Color",
                            "skt-blocks"
                          )}
                          <span className="components-base-control__label">
                            <span
                              className="component-color-indicator"
                              style={{ borderColor: attributes.borderColor }}
                            ></span>
                          </span>
                        </p>
                        <ColorPalette
                          value={attributes.borderColor}
                          onChange={(value) =>
                            this.props.setAttributes({ borderColor: value })
                          }
                          allowReset
                        />
                      </Fragment>
                    );
                  } else {
                    btn_color_tab = (
                      <Fragment>
                        <p className="skt-blocks-setting-label">
                          {__(
                            "Continue Reading Text Hover Color",
                            "skt-blocks"
                          )}
                          <span className="components-base-control__label">
                            <span
                              className="component-color-indicator"
                              style={{ color: attributes.hColor }}
                            ></span>
                          </span>
                        </p>
                        <ColorPalette
                          value={attributes.hColor}
                          onChange={(value) =>
                            this.props.setAttributes({ hColor: value })
                          }
                          allowReset
                        />
                        <p className="skt-blocks-setting-label">
                          {__(
                            "Continue Reading Background Hover Color",
                            "skt-blocks"
                          )}
                          <span className="components-base-control__label">
                            <span
                              className="component-color-indicator"
                              style={{ color: attributes.continuebghColor }}
                            ></span>
                          </span>
                        </p>
                        <ColorPalette
                          value={attributes.continuebghColor}
                          onChange={(value) =>
                            this.props.setAttributes({
                              continuebghColor: value,
                            })
                          }
                          allowReset
                        />
                        <p className="skt-blocks-setting-label">
                          {__(
                            "Continue Reading Border Hover Color",
                            "skt-blocks"
                          )}
                          <span className="components-base-control__label">
                            <span
                              className="component-color-indicator"
                              style={{ borderColor: attributes.borderHColor }}
                            ></span>
                          </span>
                        </p>
                        <ColorPalette
                          value={attributes.borderHColor}
                          onChange={(value) =>
                            this.props.setAttributes({ borderHColor: value })
                          }
                          allowReset
                        />
                      </Fragment>
                    );
                  }
                  return <div>{btn_color_tab}</div>;
                }}
              </TabPanel>
            </PanelBody>
          </Fragment>
        </PanelBody>
        <PanelBody
          title={__("Typography", "skt-blocks")}
          initialOpen={false}
        >
          <PanelBody
            title={__("Date Typography", "skt-blocks")}
            initialOpen={false}
          >
            <SelectControl
              label={__("Font Family", "skt-blocks")}
              options={fontOptions}
              value={attributes.dateFontFamily}
              onChange={(value) => {
                this.props.setAttributes({
                  dateFontFamily: value,
                }),
                  loadGoogleFont(value);
              }}
            />
            <RangeControl
              label={__("Font Size", "skt-blocks")}
              value={attributes.dateFontSize}
              onChange={(value) =>
                this.props.setAttributes({
                  dateFontSize: value,
                })
              }
              min={0}
              max={50}
              step={1}
            />
            <SelectControl
              label={__("Font Weight", "skt-blocks")}
              options={fontWeightOptions}
              value={attributes.dateFontWeight}
              onChange={(value) =>
                this.props.setAttributes({
                  dateFontWeight: value,
                })
              }
            />
            <RangeControl
              label={__("Line Height", "skt-blocks")}
              value={attributes.dateLineHeight}
              onChange={(value) =>
                this.props.setAttributes({
                  dateLineHeight: value,
                })
              }
              min={0}
              max={100}
              step={1}
            />
          </PanelBody>
          <PanelBody
            title={__("Heading Typography", "skt-blocks")}
            initialOpen={false}
          >
            <SelectControl
              label={__("Font Family", "skt-blocks")}
              options={fontOptions}
              value={attributes.headingFontFamily}
              onChange={(value) => {
                this.props.setAttributes({
                  headingFontFamily: value,
                }),
                  loadGoogleFont(value);
              }}
            />
            <RangeControl
              label={__("Font Size", "skt-blocks")}
              value={attributes.headingFontSize}
              onChange={(value) =>
                this.props.setAttributes({
                  headingFontSize: value,
                })
              }
              min={0}
              max={50}
              step={1}
            />
            <SelectControl
              label={__("Font Weight", "skt-blocks")}
              options={fontWeightOptions}
              value={attributes.headingFontWeight}
              onChange={(value) =>
                this.props.setAttributes({
                  headingFontWeight: value,
                })
              }
            />
            <RangeControl
              label={__("Line Height", "skt-blocks")}
              value={attributes.headingLineHeight}
              onChange={(value) =>
                this.props.setAttributes({
                  headingLineHeight: value,
                })
              }
              min={0}
              max={100}
              step={1}
            />
          </PanelBody>
          <PanelBody
            title={__("Author Typography", "skt-blocks")}
            initialOpen={false}
          >
            <SelectControl
              label={__("Font Family", "skt-blocks")}
              options={fontOptions}
              value={attributes.authorFontFamily}
              onChange={(value) => {
                this.props.setAttributes({
                  authorFontFamily: value,
                }),
                  loadGoogleFont(value);
              }}
            />
            <RangeControl
              label={__("Font Size", "skt-blocks")}
              value={attributes.authorFontSize}
              onChange={(value) =>
                this.props.setAttributes({
                  authorFontSize: value,
                })
              }
              min={0}
              max={50}
              step={1}
            />
            <SelectControl
              label={__("Font Weight", "skt-blocks")}
              options={fontWeightOptions}
              value={attributes.authorFontWeight}
              onChange={(value) =>
                this.props.setAttributes({
                  authorFontWeight: value,
                })
              }
            />
            <RangeControl
              label={__("Line Height", "skt-blocks")}
              value={attributes.authorLineHeight}
              onChange={(value) =>
                this.props.setAttributes({
                  authorLineHeight: value,
                })
              }
              min={0}
              max={100}
              step={1}
            />
          </PanelBody>
          <PanelBody
            title={__("Content Typography", "skt-blocks")}
            initialOpen={false}
          >
            <SelectControl
              label={__("Font Family", "skt-blocks")}
              options={fontOptions}
              value={attributes.contentFontFamily}
              onChange={(value) => {
                this.props.setAttributes({
                  contentFontFamily: value,
                }),
                  loadGoogleFont(value);
              }}
            />
            <RangeControl
              label={__("Font Size", "skt-blocks")}
              value={attributes.contentFontSize}
              onChange={(value) =>
                this.props.setAttributes({
                  contentFontSize: value,
                })
              }
              min={0}
              max={50}
              step={1}
            />
            <SelectControl
              label={__("Font Weight", "skt-blocks")}
              options={fontWeightOptions}
              value={attributes.contentFontWeight}
              onChange={(value) =>
                this.props.setAttributes({
                  contentFontWeight: value,
                })
              }
            />
            <RangeControl
              label={__("Line Height", "skt-blocks")}
              value={attributes.contentLineHeight}
              onChange={(value) =>
                this.props.setAttributes({
                  contentLineHeight: value,
                })
              }
              min={0}
              max={100}
              step={1}
            />
          </PanelBody>
          <PanelBody
            title={__(
              "Continue Reading Text Typography",
              "skt-blocks"
            )}
            initialOpen={false}
          >
            <SelectControl
              label={__("Font Family", "skt-blocks")}
              options={fontOptions}
              value={attributes.continueFontFamily}
              onChange={(value) => {
                this.props.setAttributes({
                  continueFontFamily: value,
                }),
                  loadGoogleFont(value);
              }}
            />
            <RangeControl
              label={__("Font Size", "skt-blocks")}
              value={attributes.continueFontSize}
              onChange={(value) =>
                this.props.setAttributes({
                  continueFontSize: value,
                })
              }
              min={0}
              max={50}
              step={1}
            />
            <SelectControl
              label={__("Font Weight", "skt-blocks")}
              options={fontWeightOptions}
              value={attributes.continueFontWeight}
              onChange={(value) =>
                this.props.setAttributes({
                  continueFontWeight: value,
                })
              }
            />
            <RangeControl
              label={__("Line Height", "skt-blocks")}
              value={attributes.continueLineHeight}
              onChange={(value) =>
                this.props.setAttributes({
                  continueLineHeight: value,
                })
              }
              min={0}
              max={100}
              step={1}
            />
          </PanelBody>
        </PanelBody>
        <PanelBody
          title={__("Padding", "skt-blocks")}
          initialOpen={false}
        >
          <RangeControl
            label={__("Content Padding", "skt-blocks")}
            value={attributes.contentPadding}
            onChange={(value) =>
              this.props.setAttributes({
                contentPadding: value,
              })
            }
            min={0}
            max={50}
            step={1}
          />
        </PanelBody>
        <PanelBody
          title={__("Spacing", "skt-blocks")}
          initialOpen={false}
        >
          <RangeControl
            label={__("Block Bottom", "skt-blocks")}
            value={attributes.blockSpace}
            onChange={(value) =>
              this.props.setAttributes({ blockSpace: value })
            }
            min={0}
            max={50}
          />
          <RangeControl
            label={__("Heading Bottom", "skt-blocks")}
            value={attributes.headingSpace}
            onChange={(value) =>
              this.props.setAttributes({ headingSpace: value })
            }
            min={0}
            max={50}
          />
          <RangeControl
            label={__("Author Bottom", "skt-blocks")}
            value={attributes.authorSpace}
            onChange={(value) =>
              this.props.setAttributes({ authorSpace: value })
            }
            min={0}
            max={50}
          />
          <RangeControl
            label={__("Vertical Space", "skt-blocks")}
            value={attributes.verSpace}
            onChange={(value) => this.props.setAttributes({ verSpace: value })}
            min={0}
            max={100}
          />
          <RangeControl
            label={__("Horizontal Space", "skt-blocks")}
            value={attributes.horSpace}
            onChange={(value) => this.props.setAttributes({ horSpace: value })}
            min={0}
            max={50}
          />
        </PanelBody>
        <PanelBody
          title={__("Button Box Shadow", "skt-blocks")}
          initialOpen={false}
        >
          <BoxShadowControl
            setAttributes={setAttributes}
            label={__("Box Shadow")}
            boxShadowColor={{
              value: attributes.boxShadowColor,
              label: __("Color"),
            }}
            boxShadowHOffset={{
              value: attributes.boxShadowHOffset,
              label: __("Horizontal"),
            }}
            boxShadowVOffset={{
              value: attributes.boxShadowVOffset,
              label: __("Vertical"),
            }}
            boxShadowBlur={{
              value: attributes.boxShadowBlur,
              label: __("Blur"),
            }}
            boxShadowSpread={{
              value: attributes.boxShadowSpread,
              label: __("Spread"),
            }}
            boxShadowPosition={{
              value: attributes.boxShadowPosition,
              label: __("Position"),
            }}
          />
        </PanelBody>
      </InspectorControls>
    );
  }
}
