import {
  createBox,
  createTheme_default,
  identifier_default,
  init_identifier,
  init_system
} from "./chunk-EP2QKMSJ.js";
import {
  ClassNameGenerator_default,
  generateUtilityClasses,
  init_generateUtilityClasses,
  init_utils
} from "./chunk-R2GDWVBN.js";
import {
  require_prop_types
} from "./chunk-EZSJO6EY.js";
import {
  __toESM
} from "./chunk-EWTE5DHJ.js";

// node_modules/@mui/material/Box/Box.js
init_system();
var import_prop_types = __toESM(require_prop_types());

// node_modules/@mui/material/className/index.js
init_utils();

// node_modules/@mui/material/Box/Box.js
init_identifier();

// node_modules/@mui/material/Box/boxClasses.js
init_generateUtilityClasses();
var boxClasses = generateUtilityClasses("MuiBox", ["root"]);
var boxClasses_default = boxClasses;

// node_modules/@mui/material/Box/Box.js
var defaultTheme = createTheme_default();
var Box = createBox({
  themeId: identifier_default,
  defaultTheme,
  defaultClassName: boxClasses_default.root,
  generateClassName: ClassNameGenerator_default.generate
});
true ? Box.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: import_prop_types.default.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types.default.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var Box_default = Box;

export {
  boxClasses_default,
  Box_default
};
//# sourceMappingURL=chunk-43KKHKL2.js.map
