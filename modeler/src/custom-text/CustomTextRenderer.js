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

  var foreignObject = svgCreate('foreignObject');

  svgAttr(foreignObject, {
    x: 0,
    y: 0,
    width: element.width,
    height: element.height
  });

  var textContainer = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');

  textContainer.style.width = element.width + 'px';
  textContainer.style.height = element.height + 'px';
  textContainer.style.display = 'flex';
  textContainer.style.alignItems = 'stretch';
  textContainer.style.justifyContent = 'stretch';
  textContainer.style.fontFamily = this._textRenderer.getDefaultStyle().fontFamily;
  textContainer.style.fontSize = '16px';
  textContainer.style.fontWeight = '400';
  textContainer.style.lineHeight = '1.35';
  textContainer.style.color = '#222';
  textContainer.style.whiteSpace = 'pre-wrap';
  textContainer.style.wordBreak = 'break-word';
  textContainer.style.overflowWrap = 'anywhere';
  textContainer.style.textAlign = 'left';
  textContainer.style.padding = '0';
  textContainer.style.margin = '0';
  textContainer.textContent = getCustomText(element);

  foreignObject.appendChild(textContainer);

  svgAppend(parentGfx, foreignObject);

  return hit;
};

CustomTextRenderer.prototype.getShapePath = function(shape) {
  return getRectPath(shape);
};
