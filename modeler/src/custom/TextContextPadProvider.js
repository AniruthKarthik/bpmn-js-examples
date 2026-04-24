export default class TextContextPadProvider {
  constructor(
    contextPad,
    modeling,
    elementFactory,
    connect,
    create,
    translate,
    autoPlace,
    popupMenu
  ) {
    contextPad.registerProvider(this);

    this.modeling = modeling;
    this.elementFactory = elementFactory;
    this.connect = connect;
    this.create = create;
    this.translate = translate;
    this.autoPlace = autoPlace;
    this.popupMenu = popupMenu;
  }

  getContextPadEntries(element) {
    const {
      modeling,
      elementFactory,
      connect,
      create,
      translate,
      autoPlace,
      popupMenu
    } = this;

    if (element.type !== 'bpmn:TextAnnotation') {
      return {};
    }

    function appendAction(type, className, title, options) {
      function append(event, element) {
        var shape = elementFactory.createShape(Object.assign({ type: type }, options));
        
        if (autoPlace) {
          autoPlace.append(element, shape);
        } else {
          create.start(event, shape, { source: element });
        }
      }

      function appendDrag(event, element) {
        var shape = elementFactory.createShape(Object.assign({ type: type }, options));
        create.start(event, shape, { source: element });
      }

      return {
        group: 'model',
        className: className,
        title: translate(title),
        action: {
          dragstart: appendDrag,
          click: append
        }
      };
    }

    function startConnect(event, element) {
      connect.start(event, element);
    }

    function removeElement(event, element) {
      modeling.removeElements([element]);
    }

    const entries = {
      'append.end-event': appendAction('bpmn:EndEvent', 'bpmn-icon-end-event-none', 'Append EndEvent'),
      'append.gateway': appendAction('bpmn:ExclusiveGateway', 'bpmn-icon-gateway-xor', 'Append Gateway'),
      'append.task': appendAction('bpmn:Task', 'bpmn-icon-task', 'Append Task'),
      'append.intermediate-event': appendAction('bpmn:IntermediateThrowEvent', 'bpmn-icon-intermediate-event-none', 'Append Intermediate/Boundary Event'),
      'append.text-annotation': appendAction('bpmn:TextAnnotation', 'bpmn-icon-text-annotation', 'Append Text Annotation'),
      
      'connect': {
        group: 'connect',
        className: 'bpmn-icon-connection',
        title: translate('Connect'),
        action: {
          click: startConnect,
          dragstart: startConnect
        }
      },
      'replace': {
        group: 'edit',
        className: 'bpmn-icon-screw-wrench',
        title: translate('Change type'),
        action: {
          click: function(event, element) {
            popupMenu.open(element, 'bpmn-replace', {
              cursor: { x: event.x, y: event.y }
            });
          }
        }
      },
      'delete': {
        group: 'edit',
        className: 'bpmn-icon-trash',
        title: translate('Delete'),
        action: {
          click: removeElement
        }
      }
    };

    return entries;
  }
}

TextContextPadProvider.$inject = [
  'contextPad',
  'modeling',
  'elementFactory',
  'connect',
  'create',
  'translate',
  'autoPlace',
  'popupMenu'
];
