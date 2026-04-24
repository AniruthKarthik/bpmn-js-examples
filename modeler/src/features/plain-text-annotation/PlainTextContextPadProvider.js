/**
 * A context pad provider that adds standard editing actions to bpmn:TextAnnotation.
 */
export default class PlainTextContextPadProvider {
  constructor(
      contextPad, modeling, elementFactory,
      connect, create, translate) {

    contextPad.registerProvider(this);

    this.modeling = modeling;
    this.elementFactory = elementFactory;
    this.connect = connect;
    this.create = create;
    this.translate = translate;
  }

  getContextPadEntries(element) {
    const {
      modeling,
      elementFactory,
      connect,
      create,
      translate
    } = this;

    if (element.type !== 'bpmn:TextAnnotation') {
      return {};
    }

    function appendTask(event, element) {
      const shape = elementFactory.createShape({ type: 'bpmn:Task' });

      create.start(event, shape, {
        source: element
      });
    }

    function startConnect(event, element) {
      connect.start(event, element);
    }

    return {
      'append.append-task': {
        group: 'model',
        className: 'bpmn-icon-task',
        title: translate('Append Task'),
        action: {
          click: appendTask,
          dragstart: appendTask
        }
      },
      'connect': {
        group: 'connect',
        className: 'bpmn-icon-connection',
        title: translate('Connect using Association'),
        action: {
          click: startConnect,
          dragstart: startConnect
        }
      },
      'delete': {
        group: 'edit',
        className: 'bpmn-icon-trash',
        title: translate('Delete'),
        action: {
          click: function(event, element) {
            modeling.removeElements([ element ]);
          }
        }
      }
    };
  }
}

PlainTextContextPadProvider.$inject = [
  'contextPad',
  'modeling',
  'elementFactory',
  'connect',
  'create',
  'translate'
];
