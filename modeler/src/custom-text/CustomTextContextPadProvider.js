import {
  assign
} from 'min-dash';

import {
  is
} from 'bpmn-js/lib/util/ModelUtil';

export default function CustomTextContextPadProvider(
    config, injector, contextPad, modeling, elementFactory, connect, create,
    popupMenu, canvas, rules, translate, appendPreview) {

  config = config || {};

  this._contextPad = contextPad;
  this._modeling = modeling;
  this._elementFactory = elementFactory;
  this._connect = connect;
  this._create = create;
  this._popupMenu = popupMenu;
  this._canvas = canvas;
  this._rules = rules;
  this._translate = translate;
  this._appendPreview = appendPreview;

  if (config.autoPlace !== false) {
    this._autoPlace = injector.get('autoPlace', false);
  }

  contextPad.registerProvider(2000, this);
}

CustomTextContextPadProvider.$inject = [
  'config.contextPad',
  'injector',
  'contextPad',
  'modeling',
  'elementFactory',
  'connect',
  'create',
  'popupMenu',
  'canvas',
  'rules',
  'translate',
  'appendPreview'
];

CustomTextContextPadProvider.prototype.getContextPadEntries = function(element) {
  if (!is(element, 'bpmn:TextAnnotation')) {
    return;
  }

  var contextPad = this._contextPad,
      modeling = this._modeling,
      elementFactory = this._elementFactory,
      connect = this._connect,
      create = this._create,
      popupMenu = this._popupMenu,
      autoPlace = this._autoPlace,
      translate = this._translate,
      appendPreview = this._appendPreview,
      rules = this._rules;

  function startConnect(event, source) {
    connect.start(event, source);
  }

  function removeElement(event, shape) {
    modeling.removeElements([ shape ]);
  }

  function appendAction(type, className, title, options) {

    function appendStart(event, source) {
      var shape = elementFactory.createShape(assign({ type: type }, options));

      create.start(event, shape, {
        source: source
      });
    }

    var append = autoPlace ? function(event, source) {
      var shape = elementFactory.createShape(assign({ type: type }, options));

      autoPlace.append(source, shape);
    } : appendStart;

    var previewAppend = autoPlace ? function(event, source) {
      appendPreview.create(source, type, options);

      return function() {
        appendPreview.cleanUp();
      };
    } : null;

    return {
      group: 'model',
      className: className,
      title: title,
      action: {
        dragstart: appendStart,
        click: append,
        hover: previewAppend
      }
    };
  }

  return function(entries) {
    entries.connect = {
      group: 'connect',
      className: 'bpmn-icon-connection-multi',
      title: translate('Connect to other element'),
      action: {
        click: startConnect,
        dragstart: startConnect
      }
    };

    entries['append.end-event'] = appendAction(
      'bpmn:EndEvent',
      'bpmn-icon-end-event-none',
      translate('Append end event')
    );

    entries['append.gateway'] = appendAction(
      'bpmn:ExclusiveGateway',
      'bpmn-icon-gateway-none',
      translate('Append gateway')
    );

    entries['append.append-task'] = appendAction(
      'bpmn:Task',
      'bpmn-icon-task',
      translate('Append task')
    );

    entries['append.intermediate-event'] = appendAction(
      'bpmn:IntermediateThrowEvent',
      'bpmn-icon-intermediate-event-none',
      translate('Append intermediate/boundary event')
    );

    if (!popupMenu.isEmpty(element, 'bpmn-replace')) {
      entries.replace = {
        group: 'edit',
        className: 'bpmn-icon-screw-wrench',
        title: translate('Change element'),
        action: {
          click: function(event, shape) {
            var pad = contextPad.getPad(shape).html,
                padRect = pad.getBoundingClientRect();

            popupMenu.open(shape, 'bpmn-replace', {
              x: padRect.left,
              y: padRect.bottom + 5,
              cursor: { x: event.x, y: event.y }
            }, {
              title: translate('Change element'),
              width: 300,
              search: true
            });
          }
        }
      };
    }

    if (rules.allowed('elements.delete', { elements: [ element ] })) {
      entries.delete = {
        group: 'edit',
        className: 'bpmn-icon-trash',
        title: translate('Delete'),
        action: {
          click: removeElement
        }
      };
    }

    return entries;
  };
};
