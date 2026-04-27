import CustomTextRenderer from './CustomTextRenderer';
import CustomTextPaletteProvider from './CustomTextPaletteProvider';
import CustomTextRules from './CustomTextRules';
import CustomTextLabelEditingProvider from './CustomTextLabelEditingProvider';

export default {
  __init__: [
    'customTextRenderer',
    'customTextPaletteProvider',
    'customTextRules'
  ],
  customTextRenderer: [ 'type', CustomTextRenderer ],
  customTextPaletteProvider: [ 'type', CustomTextPaletteProvider ],
  customTextRules: [ 'type', CustomTextRules ],
  labelEditingProvider: [ 'type', CustomTextLabelEditingProvider ]
};
