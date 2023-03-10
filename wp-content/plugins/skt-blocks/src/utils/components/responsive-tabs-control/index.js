/**
 * Internal dependencies
 */
import icons from "./icons";

/**
 * WordPress dependencies
 */
import { __, sprintf } from "@wordpress/i18n";
import { Component, Fragment } from "@wordpress/element";
import { RangeControl, TabPanel } from "@wordpress/components";

class ResponsiveTabsControl extends Component {
  constructor() {
    super(...arguments);
    this.setGutterTo = this.setGutterTo.bind(this);
    this.setGutterMobileTo = this.setGutterMobileTo.bind(this);
  }

  setGutterTo(value) {
    this.props.setAttributes({ gutter: value });
  }

  setGutterMobileTo(value) {
    this.props.setAttributes({ gutterMobile: value });
  }

  render() {
    const {
      attributes,
      label = __("Gutter", "skt-blocks"),
      max = 50,
      min = 0,
      onChange = this.setGutterTo,
      onChangeMobile = this.setGutterMobileTo,
      step = 5,
    } = this.props;

    return (
      <Fragment>
        <TabPanel
          className="components-base-control components-skt-blocks-responsive__tabs"
          activeClass="is-primary"
          initialTabName="desk"
          tabs={[
            {
              name: "desk",
              title: icons.desktopChrome,
              className:
                "components-skt-blocks-responsive__tabs-item components-skt-blocks-responsive__tabs-item--desktop components-button is-button is-default is-secondary",
            },
            {
              name: "mobile",
              title: icons.mobile,
              className:
                "components-skt-blocks-responsive__tabs-item components-skt-blocks-responsive__tabs-item--mobile components-button is-button is-default is-secondary",
            },
          ]}
        >
          {(tab) => {
            if ("mobile" === tab.name) {
              return (
                <RangeControl
                  label={sprintf(
                    /* translators: %s: values associated with CSS syntax, 'Width', 'Gutter', 'Height in pixels', 'Width' */
                    __("Mobile %s", "skt-blocks"),
                    label
                  )}
                  value={attributes.gutterMobile}
                  onChange={(valueMobile) => onChangeMobile(valueMobile)}
                  min={min}
                  max={max}
                  step={step}
                />
              );
            }
            return (
              <RangeControl
                label={label}
                value={attributes.gutter}
                onChange={(value) => onChange(value)}
                min={min}
                max={max}
                step={step}
              />
            );
          }}
        </TabPanel>
      </Fragment>
    );
  }
}

export default ResponsiveTabsControl;
