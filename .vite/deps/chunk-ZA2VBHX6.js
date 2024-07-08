import {
  Tablelvl2Context_default
} from "./chunk-FWBSS7LO.js";
import {
  init_DefaultPropsProvider,
  init_zero_styled,
  useDefaultProps
} from "./chunk-F2WAIS2I.js";
import {
  clsx_default,
  init_clsx,
  require_jsx_runtime,
  styled_default
} from "./chunk-EP2QKMSJ.js";
import {
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  init_composeClasses,
  init_generateUtilityClass,
  init_generateUtilityClasses
} from "./chunk-R2GDWVBN.js";
import {
  require_prop_types
} from "./chunk-EZSJO6EY.js";
import {
  require_react
} from "./chunk-W4EHDCLL.js";
import {
  __toESM
} from "./chunk-EWTE5DHJ.js";

// node_modules/@mui/material/TableHead/TableHead.js
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_clsx();
init_composeClasses();
init_zero_styled();
init_DefaultPropsProvider();

// node_modules/@mui/material/TableHead/tableHeadClasses.js
init_generateUtilityClasses();
init_generateUtilityClass();
function getTableHeadUtilityClass(slot) {
  return generateUtilityClass("MuiTableHead", slot);
}
var tableHeadClasses = generateUtilityClasses("MuiTableHead", ["root"]);
var tableHeadClasses_default = tableHeadClasses;

// node_modules/@mui/material/TableHead/TableHead.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var useUtilityClasses = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getTableHeadUtilityClass, classes);
};
var TableHeadRoot = styled_default("thead", {
  name: "MuiTableHead",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root
})({
  display: "table-header-group"
});
var tablelvl2 = {
  variant: "head"
};
var defaultComponent = "thead";
var TableHead = React.forwardRef(function TableHead2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiTableHead"
  });
  const {
    className,
    component = defaultComponent,
    ...other
  } = props;
  const ownerState = {
    ...props,
    component
  };
  const classes = useUtilityClasses(ownerState);
  return (0, import_jsx_runtime.jsx)(Tablelvl2Context_default.Provider, {
    value: tablelvl2,
    children: (0, import_jsx_runtime.jsx)(TableHeadRoot, {
      as: component,
      className: clsx_default(classes.root, className),
      ref,
      role: component === defaultComponent ? null : "rowgroup",
      ownerState,
      ...other
    })
  });
});
true ? TableHead.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component, normally `TableRow`.
   */
  children: import_prop_types.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * @ignore
   */
  className: import_prop_types.default.string,
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
var TableHead_default = TableHead;

export {
  getTableHeadUtilityClass,
  tableHeadClasses_default,
  TableHead_default
};
//# sourceMappingURL=chunk-ZA2VBHX6.js.map
