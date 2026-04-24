/**
 * A context pad provider to manage hover actions for elements.
 */
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

    this._modeling = modeling;
    this._elementFactory = elementFactory;
    this._connect = connect;
    this._create = create;
    this._translate = translate;
    this._autoPlace = autoPlace;
    this._popupMenu = popupMenu;
  }

  getContextPadEntries(element) {
    const {
      _modeling,
      _elementFactory,
      _connect,
      _create,
      _translate,
      _autoPlace,
      _popupMenu
    } = this;

    if (element.type !== 'bpmn:TextAnnotation') {
      return {};
    }

    function appendAction(type, className, title, options) {
      function append(event, element) {
        var shape = _elementFactory.createShape(Object.assign({ type: type }, options));
        
        if (_autoPlace) {
          _autoPlace.append(element, shape);
        } else {
          _create.start(event, shape, { source: element });
        }
      }

      function appendDrag(event, element) {
        var shape = _elementFactory.createShape(Object.assign({ type: type }, options));
        _create.start(event, shape, { source: element });
      }

      return {
        group: 'model',
        className: className,
        title: _translate(title),
        action: {
          dragstart: appendDrag,
          click: append
        }
      };
    }

    function startConnect(event, element) {
      _connect.start(event, element);
    }

    function removeElement(event, element) {
      _modeling.removeElements([element]);
    }

    return {
      'append.end-event': appendAction('bpmn:EndEvent', 'bpmn-icon-end-event-none', 'Append EndEvent'),
      'append.gateway': appendAction('bpmn:ExclusiveGateway', 'bpmn-icon-gateway-xor', 'Append Gateway'),
      'append.task': appendAction('bpmn:Task', 'bpmn-icon-task', 'Append Task'),
      'append.intermediate-event': appendAction('bpmn:IntermediateThrowEvent', 'bpmn-icon-intermediate-event-none', 'Append Intermediate/Boundary Event'),
      'append.text-annotation': appendAction('bpmn:TextAnnotation', 'bpmn-icon-text-annotation', 'Append Text Annotation'),
      
      'connect': {
        group: 'connect',
        className: 'bpmn-icon-connection',
        title: _translate('Connect'),
        action: {
          click: startConnect,
          dragstart: startConnect
        }
      },
      'replace': {
        group: 'edit',
        className: 'bpmn-icon-screw-wrench',
        title: _translate('Change type'),
        action: {
          click: function(event, element) {
            _popupMenu.open(element, 'bpmn-replace', {
              cursor: { x: event.x, y: event.y }
            });
          }
        }
      },
      'delete': {
        group: 'edit',
        className: 'bpmn-icon-trash',
        title: _translate('Delete'),
        action: {
          click: removeElement
        }
      }
    };
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
