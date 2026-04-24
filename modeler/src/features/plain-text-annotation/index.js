import PlainTextRenderer from './PlainTextRenderer';
import PlainTextContextPadProvider from './PlainTextContextPadProvider';
import PlainTextPaletteProvider from './PlainTextPaletteProvider';

export default {
  __init__: [
    'plainTextRenderer',
    'plainTextContextPadProvider',
    'plainTextPaletteProvider'
  ],
  plainTextRenderer: [ 'type', PlainTextRenderer ],
  plainTextContextPadProvider: [ 'type', PlainTextContextPadProvider ],
  plainTextPaletteProvider: [ 'type', PlainTextPaletteProvider ]
};
