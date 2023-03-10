/**
 * Internal dependencies
 */
import Buttons from "./buttons";

/**
 * WordPress dependencies
 */
const { Component } = wp.element;
const { InnerBlocks } = wp.editor;

export default class Save extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    // Setup the attributes
    const { buttonAlignment, buttons } = this.props.attributes;

    return (
      <Buttons {...this.props}>
        <div
          className={
            "skt-blocks-buttons__wrap skt-blocks-buttons-layout-wrap"
          }
        >
          <InnerBlocks.Content />
        </div>
      </Buttons>
    );
  }
}
