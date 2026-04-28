import CustomTextRenderer from './CustomTextRenderer';
import CustomTextPaletteProvider from './CustomTextPaletteProvider';
import CustomTextRules from './CustomTextRules';
import CustomTextLabelEditingProvider from './CustomTextLabelEditingProvider';
import CustomTextLayouter from './CustomTextLayouter';
import CustomTextBpmnRules from './CustomTextBpmnRules';
import CustomTextContextPadProvider from './CustomTextContextPadProvider';

export default {
  __init__: [
    'customTextRenderer',
    'customTextPaletteProvider',
    'customTextRules',
    'customTextBpmnRules',
    'customTextContextPadProvider'
  ],
  customTextRenderer: [ 'type', CustomTextRenderer ],
  customTextPaletteProvider: [ 'type', CustomTextPaletteProvider ],
  customTextRules: [ 'type', CustomTextRules ],
  customTextBpmnRules: [ 'type', CustomTextBpmnRules ],
  customTextContextPadProvider: [ 'type', CustomTextContextPadProvider ],
  labelEditingProvider: [ 'type', CustomTextLabelEditingProvider ],
  layouter: [ 'type', CustomTextLayouter ]
};
