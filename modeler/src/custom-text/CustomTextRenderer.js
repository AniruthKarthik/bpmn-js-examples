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
  getCustomText,
  isCustomText
} from './CustomTextUtil';

var HIGH_PRIORITY = 1500;

export default function CustomTextRenderer(eventBus, textRenderer) {
  BaseRenderer.call(this, eventBus, HIGH_PRIORITY);

  this._textRenderer = textRenderer;
}

CustomTextRenderer.$inject = [
  'eventBus',
  'textRenderer'
];

CustomTextRenderer.prototype = Object.create(BaseRenderer.prototype);
CustomTextRenderer.prototype.constructor = CustomTextRenderer;

CustomTextRenderer.prototype.canRender = function(element) {
  return isCustomText(element);
};

CustomTextRenderer.prototype.drawShape = function(parentGfx, element) {
  var hit = svgCreate('rect');

  svgAttr(hit, {
    x: 0,
    y: 0,
    width: element.width,
    height: element.height,
    fill: '#fff',
    fillOpacity: 0,
    stroke: 'none'
  });

  svgAppend(parentGfx, hit);

  var text = this._textRenderer.createText(getCustomText(element), {
    box: {
      x: 0,
      y: 0,
      width: element.width,
      height: element.height
    },
    align: 'center-middle',
    padding: 0,
    style: {
      fontSize: 16,
      fontWeight: 'normal'
    }
  });

  svgAppend(parentGfx, text);

  return hit;
};

CustomTextRenderer.prototype.getShapePath = function(shape) {
  return getRectPath(shape);
};
