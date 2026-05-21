import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';

import {
  append as svgAppend,
  attr as svgAttr,
  create as svgCreate
} from 'tiny-svg';

import {
  getRectPath
} from 'bpmn-js/lib/draw/BpmnRenderUtil';

import {
  getImageUrl,
  isCustomImage
} from './CustomImageUtil';

var HIGH_PRIORITY = 1500;

export default function CustomImageRenderer(eventBus) {
  BaseRenderer.call(this, eventBus, HIGH_PRIORITY);
}

CustomImageRenderer.$inject = [
  'eventBus'
];

CustomImageRenderer.prototype = Object.create(BaseRenderer.prototype);
CustomImageRenderer.prototype.constructor = CustomImageRenderer;

CustomImageRenderer.prototype.canRender = function(element) {
  return isCustomImage(element);
};

CustomImageRenderer.prototype.drawShape = function(parentGfx, element) {
  var url = getImageUrl(element);

  var image = svgCreate('image');

  svgAttr(image, {
    x: 0,
    y: 0,
    width: element.width,
    height: element.height
  });

  if (url) {
    svgAttr(image, 'href', url);
  } else {
    // Show a visible placeholder for better feedback during drag-and-drop
    var rect = svgCreate('rect');

    svgAttr(rect, {
      x: 0,
      y: 0,
      width: element.width,
      height: element.height,
      fill: '#f0f0f0',
      stroke: '#ccc',
      strokeWidth: 2,
      strokeDasharray: '5,5'
    });

    svgAppend(parentGfx, rect);
  }

  svgAppend(parentGfx, image);

  return image;
};

CustomImageRenderer.prototype.getShapePath = function(shape) {
  return getRectPath(shape);
};
