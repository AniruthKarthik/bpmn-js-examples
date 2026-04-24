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
    const text = element.businessObject.text;

    // Create a container for our custom rendering
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    if (!text || text === 'Text') {
      // Draw a large centered "T" for preview and empty state
      const tSymbol = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      tSymbol.setAttribute('x', element.width / 2);
      tSymbol.setAttribute('y', element.height / 2 + 10);
      tSymbol.setAttribute('font-size', '40');
      tSymbol.setAttribute('font-family', 'Arial, sans-serif');
      tSymbol.setAttribute('font-weight', 'bold');
      tSymbol.setAttribute('text-anchor', 'middle');
      tSymbol.setAttribute('fill', '#555');
      tSymbol.textContent = 'T';
      g.appendChild(tSymbol);
    } else {
      // Draw actual text if it exists
      const textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textEl.setAttribute('x', 5);
      textEl.setAttribute('y', 20);
      textEl.setAttribute('font-size', '14');
      textEl.setAttribute('fill', 'black');

      text.split('\n').forEach((line, index) => {
        const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        tspan.setAttribute('x', 5);
        tspan.setAttribute('dy', index === 0 ? 0 : 18);
        tspan.textContent = line;
        textEl.appendChild(tspan);
      });
      g.appendChild(textEl);
    }

    parentNode.appendChild(g);

    return g;
  }
}

TextRenderer.$inject = ['eventBus', 'textRenderer'];
