import RuleProvider from 'diagram-js/lib/features/rules/RuleProvider';

export default class TextRules extends RuleProvider {
  constructor(eventBus) {
    super(eventBus);
  }

  init() {
    this.addRule('connection.create', function(context) {
      const source = context.source,
            target = context.target;

      if (source && source.type === 'bpmn:TextAnnotation') {
        return true;
      }

      if (target && target.type === 'bpmn:TextAnnotation') {
        return true;
      }
    });

    this.addRule('connection.reconnect', function(context) {
      const source = context.source,
            target = context.target;

      if (source && source.type === 'bpmn:TextAnnotation') {
        return true;
      }

      if (target && target.type === 'bpmn:TextAnnotation') {
        return true;
      }
    });

    this.addRule('shape.append', function(context) {
      const source = context.source;

      if (source && source.type === 'bpmn:TextAnnotation') {
        return true;
      }
    });
  }
}

TextRules.$inject = ['eventBus'];
