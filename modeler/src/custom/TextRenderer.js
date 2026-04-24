import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';

const HIGH_PRIORITY = 2000;

export default class TextRenderer extends BaseRenderer {
  constructor(eventBus, textRenderer) {
    super(eventBus, HIGH_PRIORITY);

    this.textRenderer = textRenderer;
  }

  canRender(element) {
    return element.type === 'bpmn:TextAnnotation';
  }

  drawShape(parentNode, element) {
    const text = element.businessObject.text || 'Text';

    const textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');

    textEl.setAttribute('x', 0);
    textEl.setAttribute('y', 20);
    textEl.setAttribute('font-size', '14');
    textEl.setAttribute('fill', 'black');

    text.split('\n').forEach((line, index) => {
      const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
      tspan.setAttribute('x', 0);
      tspan.setAttribute('dy', index === 0 ? 0 : 18);
      tspan.textContent = line;
      textEl.appendChild(tspan);
    });

    parentNode.appendChild(textEl);

    return textEl;
  }
}

TextRenderer.$inject = ['eventBus', 'textRenderer'];
