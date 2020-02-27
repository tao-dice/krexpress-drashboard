import React, { memo } from 'react';
import { ImageControl } from 'react-draft-wysiwyg/dist/react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {
  Icon, Button,
} from 'antd';


const ImageUploader = (props) => {
  const { expanded } = props;
  const onExpandEvent = (e) => {
    console.log('e', e);
  };
  return (
    <div
      aria-haspopup="true"
      aria-expanded={expanded}
      className="rdw-emoji-wrapper"
      aria-label="rdw-option-wrapper"
    >
      <ImageControl />
      <div
        className="rdw-option-wrapper"
        onClick={onExpandEvent}
      >
        <Icon type="file-image" />
      </div>
    </div>
  );
};
export default memo(ImageUploader);
