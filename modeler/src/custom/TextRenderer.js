import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';

const HIGH_PRIORITY = 2000;

/**
 * A renderer for custom "Text" shapes that removes the default BPMN bracket.
 */
export default class TextRenderer extends BaseRenderer {
  constructor(eventBus) {
    super(eventBus, HIGH_PRIORITY);
  }

  canRender(element) {
    // Only render if it's a TextAnnotation AND marked as custom text
    return element.type === 'bpmn:TextAnnotation' && element.isCustomText;
  }

  drawShape(parentNode, element) {
    const text = element.businessObject.text;
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    // Default dimensions if missing
    const width = element.width || 100;
    const height = element.height || 30;

    if (!text || text === 'Text') {
      // Draw a centered placeholder "T" for preview and initial state
      const tSymbol = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      tSymbol.setAttribute('x', width / 2);
      tSymbol.setAttribute('y', height / 2 + 10);
      tSymbol.setAttribute('font-size', '40');
      tSymbol.setAttribute('font-family', 'Arial, sans-serif');
      tSymbol.setAttribute('font-weight', 'bold');
      tSymbol.setAttribute('text-anchor', 'middle');
      tSymbol.setAttribute('fill', '#555');
      tSymbol.textContent = 'T';
      g.appendChild(tSymbol);
    } else {
      // Render the actual user-provided text as plain text
      const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textElement.setAttribute('x', 5);
      textElement.setAttribute('y', 20);
      textElement.setAttribute('font-size', '14');
      textElement.setAttribute('fill', 'black');

      text.split('\n').forEach((line, index) => {
        const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        tspan.setAttribute('x', 5);
        tspan.setAttribute('dy', index === 0 ? 0 : 18);
        tspan.textContent = line;
        textElement.appendChild(tspan);
      });
      g.appendChild(textElement);
    }

    parentNode.appendChild(g);

    return g;
  }
}

TextRenderer.$inject = ['eventBus'];
