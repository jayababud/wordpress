/**
 * External dependencies
 */
import { urlIsVideo, __getValue } from "../index.js";
import { camelCase } from "lodash";
import classnames from "classnames";

/**
 * WordPress dependencies
 */
import { Fragment } from "@wordpress/element";
import { sprintf } from "@wordpress/i18n";

export const createVideoBackground = (attrNameTemplate, blockProps) => {
  const getAttrName = (attrName) =>
    camelCase(sprintf(attrNameTemplate, attrName));
  const getValue = __getValue(blockProps.attributes, getAttrName, "");

  const mediaUrl = getValue("BackgroundMediaUrl");
  const tabletMediaUrl = getValue("TabletBackgroundMediaUrl");
  const mobileMediaUrl = getValue("MobileBackgroundMediaUrl");

  const desktopClassNames = classnames(
    ["skt-blocks-video-background"],
    {
      "skt-blocks--video-hide-tablet": tabletMediaUrl,
      "skt-blocks--video-hide-mobile": mobileMediaUrl,
    }
  );
  const tabletClassNames = classnames(
    ["skt-blocks-video-background"],
    {
      "skt-blocks--video-hide-desktop": true,
      "skt-blocks--video-hide-mobile": mobileMediaUrl,
    }
  );
  const mobileClassNames = classnames(
    ["skt-blocks-video-background"],
    {
      "skt-blocks--video-hide-desktop": true,
      "skt-blocks--video-hide-tablet": true,
    }
  );

  return (
    <Fragment>
      {urlIsVideo(mediaUrl) && (
        <video
          className={desktopClassNames}
          autoPlay
          muted
          loop
          playsinline
          src={mediaUrl}
        />
      )}
      {urlIsVideo(tabletMediaUrl) && (
        <video
          className={tabletClassNames}
          autoPlay
          muted
          loop
          playsinline
          src={tabletMediaUrl}
        />
      )}
      {urlIsVideo(mobileMediaUrl) && (
        <video
          className={mobileClassNames}
          autoPlay
          muted
          loop
          playsinline
          src={mobileMediaUrl}
        />
      )}
    </Fragment>
  );
};
