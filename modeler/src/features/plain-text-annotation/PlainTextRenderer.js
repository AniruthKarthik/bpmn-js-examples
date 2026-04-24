import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';

import {
  append as svgAppend
} from 'tiny-svg';

import {
  getBusinessObject
} from 'bpmn-js/lib/util/ModelUtil';

const HIGH_PRIORITY = 1500;

/**
 * A renderer that renders bpmn:TextAnnotation as plain text.
 */
export default class PlainTextRenderer extends BaseRenderer {
  constructor(eventBus, bpmnRenderer, textRenderer) {
    super(eventBus, HIGH_PRIORITY);

    this.bpmnRenderer = bpmnRenderer;
    this.textRenderer = textRenderer;
  }

  canRender(element) {
    return element.type === 'bpmn:TextAnnotation';
  }

  drawShape(parentGfx, element) {
    const text = getBusinessObject(element).text || '';

    const textElement = this.textRenderer.createText(text, {
      box: element,
      align: 'left-top',
      padding: 5
    });

    svgAppend(parentGfx, textElement);

    return textElement;
  }

  getShapePath(element) {
    return this.bpmnRenderer.getShapePath(element);
  }
}

PlainTextRenderer.$inject = [
  'eventBus',
  'bpmnRenderer',
  'textRenderer'
];
