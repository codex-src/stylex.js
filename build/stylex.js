'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var invariant = _interopDefault(require('invariant'));
var nullable = _interopDefault(require('nullable'));
var React = _interopDefault(require('react'));

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

var Styleable = function Styleable(render) {
  return function (props) {
    invariant(typeof render === "function" && nullable.isNonNullableObject(props), "stylex: Sstylable` expected a JSX component.");
    return _Styleable(render)(props);
  };
}; // `Styleable` is a higher-order component that extends a
// component’s styles.

var _Styleable = function _Styleable(render) {
  return function (_ref) {
    var extendedStyles = _ref.style,
        extendedProps = _objectWithoutProperties(_ref, ["style"]);

    var element = render(extendedProps);
    invariant(nullable.isNonNullableObject(element) && element.$$typeof === Symbol.for("react.element"), "stylex: `Styleable` expected a JSX component.");

    var _element$props = element.props,
        style = _element$props.style,
        props = _objectWithoutProperties(_element$props, ["style"]);

    var newRender = React.cloneElement(element, _objectSpread2({
      style: _objectSpread2({}, style, {}, extendedStyles)
    }, props));
    return newRender;
  };
};

var Unstyleable = function Unstyleable(render) {
  return function (props) {
    invariant(typeof render === "function" && nullable.isNonNullableObject(props), "stylex: `Unstylable` expected a JSX component.");
    return _Unstyleable(render)(props);
  };
}; // `Unstyleable` is a higher-order component that prevents a
// component’s styles from being extended.

var _Unstyleable = function _Unstyleable(render) {
  return function (_ref2) {
    var extendedStyles = _ref2.style,
        extendedProps = _objectWithoutProperties(_ref2, ["style"]);

    var element = render(extendedProps);
    invariant(nullable.isNonNullableObject(element) && element.$$typeof === Symbol.for("react.element"), "stylex: `Unstylable` expected a JSX component."); // The following `if` statements are longhand for:
    //
    // const margins = {
    //   ...(margin       || {}),
    //   ...(marginLeft   || {}),
    //   ...(marginRight  || {}),
    //   ...(marginTop    || {}),
    //   ...(marginBottom || {}),
    // }
    //
    // This pattern is used throughout `parse.js`. The reason
    // we need to do this is because spreading `undefined`
    // leads to unexpected behavior.

    var marginStyles = {};

    if (extendedStyles !== undefined) {
      var margin = extendedStyles.margin,
          marginLeft = extendedStyles.marginLeft,
          marginRight = extendedStyles.marginRight,
          marginTop = extendedStyles.marginTop,
          marginBottom = extendedStyles.marginBottom;

      if (margin !== undefined) {
        marginStyles = _objectSpread2({}, marginStyles, {
          margin: margin
        });
      }

      if (marginLeft !== undefined) {
        marginStyles = _objectSpread2({}, marginStyles, {
          marginLeft: marginLeft
        });
      }

      if (marginRight !== undefined) {
        marginStyles = _objectSpread2({}, marginStyles, {
          marginRight: marginRight
        });
      }

      if (marginTop !== undefined) {
        marginStyles = _objectSpread2({}, marginStyles, {
          marginTop: marginTop
        });
      }

      if (marginBottom !== undefined) {
        marginStyles = _objectSpread2({}, marginStyles, {
          marginBottom: marginBottom
        });
      }
    }

    var _element$props2 = element.props,
        style = _element$props2.style,
        props = _objectWithoutProperties(_element$props2, ["style"]);

    var newRender = React.cloneElement(element, _objectSpread2({
      style: _objectSpread2({}, style, {}, marginStyles)
    }, props));
    return newRender;
  };
};

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Styleable: Styleable,
  Unstyleable: Unstyleable
});

var Stylable = function Stylable(render) {
  return function (props) {
    invariant(false, "stylex: `Stylable` is not exported. " + "Did you mean `Styleable`?");
    return render(props);
  };
};
var Unstylable = function Unstylable(render) {
  return function (props) {
    invariant(false, "stylex: `Unstylable` is not exported. " + "Did you mean `Unstyleable`?");
    return render(props);
  };
};

var componentsTypos = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Stylable: Stylable,
  Unstylable: Unstylable
});

var styleParsers = {
  "m": margin,
  "m-l": margin,
  "m-r": margin,
  "m-x": margin,
  "m-t": margin,
  "m-b": margin,
  "m-y": margin,
  "p": padding,
  "p-l": padding,
  "p-r": padding,
  "p-x": padding,
  "p-t": padding,
  "p-b": padding,
  "p-y": padding,
  "relative": position,
  "absolute": position,
  "fixed": position,
  "sticky": position,
  "block": function block() {
    return {
      display: "block"
    };
  },
  "inline-block": function inlineBlock() {
    return {
      display: "inline-block"
    };
  },
  "inline": function inline() {
    return {
      display: "inline"
    };
  },
  flex: flex,
  "inline-flex": flex,
  "grid": function grid() {
    return {
      display: "grid"
    };
  },
  "inline-grid": function inlineGrid() {
    return {
      display: "inline-grid"
    };
  },
  "no-flex-shrink": function noFlexShrink() {
    return {
      flexShrink: 0
    };
  },
  "wh": widthHeight,
  "w": widthHeight,
  "h": widthHeight,
  "no-min-w": function noMinW() {
    return {
      minWidth: 0
    };
  },
  "center": function center() {
    return {
      textAlign: "center"
    };
  },
  "middle": function middle() {
    return {
      verticalAlign: "middle"
    };
  },
  "pre": function pre() {
    return {
      whiteSpace: "pre"
    };
  },
  "pre-wrap": function preWrap() {
    return {
      whiteSpace: "pre-wrap"
    };
  },
  "tnum": function tnum() {
    return {
      fontFeatureSettings: "'tnum'"
    };
  },
  "square": function square() {
    return {
      strokeLinecap: "square"
    };
  },
  "sw": strokeWidth,
  "fw": fontWeight,
  "fs": fontSize,
  "ls": letterSpacing,
  "lh": lineHeight,
  "c": color,
  "b": background,
  "br": borderRadius,
  "br-l": borderRadius,
  "br-r": borderRadius,
  "br-t": borderRadius,
  "br-b": borderRadius,
  overflow: overflow,
  "text-overflow": textOverflow,
  "z": zIndex,
  "pointer-events": function pointerEvents() {
    return {
      pointerEvents: "auto"
    };
  },
  "no-pointer-events": function noPointerEvents() {
    return {
      pointerEvents: "none"
    };
  },
  "pointer": function pointer() {
    return {
      cursor: "pointer"
    };
  },
  "no-pointer": function noPointer() {
    return {
      cursor: "auto"
    };
  },
  "translate-z": function translateZ() {
    return {
      transform: "translateZ(0px)"
    };
  },
  "no-translate-z": function noTranslateZ() {
    return {
      transform: "none"
    };
  }
};

function margin(iter) {
  invariant(iter.classNameMatches(/^m(-(x|y|l|r|t|b))?:-?\d+(\.\d+)?$/), "stylex: Cannot parse class `".concat(iter.className(), "` from class string `").concat(iter.classString(), "`. ") + "Please refer to https://git.io/JeQtB for documentation.");
  var value = Number(iter.token());
  var style = {};

  switch (iter.key()) {
    case "m":
      style = {
        margin: value
      };
      break;

    case "m-l":
      style = {
        marginLeft: value
      };
      break;

    case "m-r":
      style = {
        marginRight: value
      };
      break;

    case "m-x":
      style = {
        marginLeft: value,
        marginRight: value
      };
      break;

    case "m-t":
      style = {
        marginTop: value
      };
      break;

    case "m-b":
      style = {
        marginBottom: value
      };
      break;

    case "m-y":
      style = {
        marginTop: value,
        marginBottom: value
      };
      break;
  }

  return style;
}

function padding(iter) {
  invariant(iter.classNameMatches(/^p(-(x|y|l|r|t|b))?:\d+(\.\d+)?$/), "stylex: Cannot parse class `".concat(iter.className(), "` from class string `").concat(iter.classString(), "`. ") + "Please refer to https://git.io/JeQtB for documentation.");
  var value = Number(iter.token());
  var style = {};

  switch (iter.key()) {
    case "p":
      style = {
        padding: value
      };
      break;

    case "p-l":
      style = {
        paddingLeft: value
      };
      break;

    case "p-r":
      style = {
        paddingRight: value
      };
      break;

    case "p-x":
      style = {
        paddingLeft: value,
        paddingRight: value
      };
      break;

    case "p-t":
      style = {
        paddingTop: value
      };
      break;

    case "p-b":
      style = {
        paddingBottom: value
      };
      break;

    case "p-y":
      style = {
        paddingTop: value,
        paddingBottom: value
      };
      break;
  }

  return style;
}

function position(iter) {
  var position = iter.key();
  var opts = {
    positionL: iter.nextClassName("-l"),
    positionR: iter.nextClassName("-r"),
    positionX: iter.nextClassName("-x"),
    positionT: iter.nextClassName("-t"),
    positionB: iter.nextClassName("-b"),
    positionY: iter.nextClassName("-y")
  };
  var style = {
    position: position
  };

  if (opts.positionL) {
    style = _objectSpread2({}, style, {
      left: 0
    });
  }

  if (opts.positionR) {
    style = _objectSpread2({}, style, {
      right: 0
    });
  }

  if (opts.positionX) {
    style = _objectSpread2({}, style, {
      left: 0,
      right: 0
    });
  }

  if (opts.positionT) {
    style = _objectSpread2({}, style, {
      top: 0
    });
  }

  if (opts.positionB) {
    style = _objectSpread2({}, style, {
      bottom: 0
    });
  }

  if (opts.positionY) {
    style = _objectSpread2({}, style, {
      top: 0,
      bottom: 0
    });
  }

  return style;
}

function flex(iter) {
  var flex = iter.key();
  var opts = {
    flexRow: iter.nextClassName("-r"),
    flexColumn: iter.nextClassName("-c"),
    flexStretch: iter.nextClassName(":stretch"),
    flexStart: iter.nextClassName(":start"),
    flexCenter: iter.nextClassName(":center"),
    flexEnd: iter.nextClassName(":end"),
    flexBetween: iter.nextClassName(":between"),
    flexAround: iter.nextClassName(":around"),
    flexEvenly: iter.nextClassName(":evenly"),
    flexXStretch: iter.nextClassName("-x:stretch"),
    flexXStart: iter.nextClassName("-x:start"),
    flexXCenter: iter.nextClassName("-x:center"),
    flexXEnd: iter.nextClassName("-x:end"),
    flexXBetween: iter.nextClassName("-x:between"),
    flexXAround: iter.nextClassName("-x:around"),
    flexXEvenly: iter.nextClassName("-x:evenly"),
    flexYStretch: iter.nextClassName("-y:stretch"),
    flexYStart: iter.nextClassName("-y:start"),
    flexYCenter: iter.nextClassName("-y:center"),
    flexYEnd: iter.nextClassName("-y:end"),
    flexYBetween: iter.nextClassName("-y:between"),
    flexYAround: iter.nextClassName("-y:around"),
    flexYEvenly: iter.nextClassName("-y:evenly")
  };
  invariant(opts.flexRow || opts.flexColumn, "stylex: `".concat(iter.className(), "` expects `-r` or `-c`."));
  var style = {
    display: flex,
    flexDirection: opts.flexRow ? "row" : "column" // Assumes `-r` or `-c`.

  }; // .flex.-r.\:stretch, .flex.-c.\:stretch { ... }
  // .flex.-r.\:start,   .flex.-c.\:start   { ... }
  // .flex.-r.\:center,  .flex.-c.\:center  { ... }
  // .flex.-r.\:end,     .flex.-c.\:end     { ... }
  // .flex.-r.\:between, .flex.-c.\:between { ... }
  // .flex.-r.\:around,  .flex.-c.\:around  { ... }
  // .flex.-r.\:evenly,  .flex.-c.\:evenly  { ... }

  if (opts.flexStretch) {
    style = _objectSpread2({}, style, {
      justifyContent: "stretch",
      alignItems: "stretch"
    });
  }

  if (opts.flexStart) {
    style = _objectSpread2({}, style, {
      justifyContent: "flex-start",
      alignItems: "flex-start"
    });
  }

  if (opts.flexCenter) {
    style = _objectSpread2({}, style, {
      justifyContent: "center",
      alignItems: "center"
    });
  }

  if (opts.flexEnd) {
    style = _objectSpread2({}, style, {
      justifyContent: "flex-end",
      alignItems: "flex-end"
    });
  }

  if (opts.flexBetween) {
    style = _objectSpread2({}, style, {
      justifyContent: "space-between",
      alignItems: "space-between"
    });
  }

  if (opts.flexAround) {
    style = _objectSpread2({}, style, {
      justifyContent: "space-around",
      alignItems: "space-around"
    });
  }

  if (opts.flexEvenly) {
    style = _objectSpread2({}, style, {
      justifyContent: "space-evenly",
      alignItems: "space-evenly"
    });
  } // .flex.-r.-x\:stretch { justify-content: ... }
  // .flex.-r.-x\:start   { justify-content: ... }
  // .flex.-r.-x\:center  { justify-content: ... }
  // .flex.-r.-x\:end     { justify-content: ... }
  // .flex.-r.-x\:between { justify-content: ... }
  // .flex.-r.-x\:around  { justify-content: ... }
  // .flex.-r.-x\:evenly  { justify-content: ... }


  if (opts.flexRow && opts.flexXStretch) {
    style = _objectSpread2({}, style, {
      justifyContent: "stretch"
    });
  }

  if (opts.flexRow && opts.flexXStart) {
    style = _objectSpread2({}, style, {
      justifyContent: "flex-start"
    });
  }

  if (opts.flexRow && opts.flexXCenter) {
    style = _objectSpread2({}, style, {
      justifyContent: "center"
    });
  }

  if (opts.flexRow && opts.flexXEnd) {
    style = _objectSpread2({}, style, {
      justifyContent: "flex-end"
    });
  }

  if (opts.flexRow && opts.flexXBetween) {
    style = _objectSpread2({}, style, {
      justifyContent: "space-between"
    });
  }

  if (opts.flexRow && opts.flexXAround) {
    style = _objectSpread2({}, style, {
      justifyContent: "space-around"
    });
  }

  if (opts.flexRow && opts.flexXEvenly) {
    style = _objectSpread2({}, style, {
      justifyContent: "space-evenly"
    });
  } // .flex.-r.-y\:stretch { align-items: ... }
  // .flex.-r.-y\:start   { align-items: ... }
  // .flex.-r.-y\:center  { align-items: ... }
  // .flex.-r.-y\:end     { align-items: ... }
  // .flex.-r.-y\:between { align-items: ... }
  // .flex.-r.-y\:around  { align-items: ... }
  // .flex.-r.-y\:evenly  { align-items: ... }


  if (opts.flexRow && opts.flexYStretch) {
    style = _objectSpread2({}, style, {
      alignItems: "stretch"
    });
  }

  if (opts.flexRow && opts.flexYStart) {
    style = _objectSpread2({}, style, {
      alignItems: "flex-start"
    });
  }

  if (opts.flexRow && opts.flexYCenter) {
    style = _objectSpread2({}, style, {
      alignItems: "center"
    });
  }

  if (opts.flexRow && opts.flexYEnd) {
    style = _objectSpread2({}, style, {
      alignItems: "flex-end"
    });
  }

  if (opts.flexRow && opts.flexYBetween) {
    style = _objectSpread2({}, style, {
      alignItems: "space-between"
    });
  }

  if (opts.flexRow && opts.flexYAround) {
    style = _objectSpread2({}, style, {
      alignItems: "space-around"
    });
  }

  if (opts.flexRow && opts.flexYEvenly) {
    style = _objectSpread2({}, style, {
      alignItems: "space-evenly"
    });
  } // .flex.-c.-x\:stretch { align-items: ... }
  // .flex.-c.-x\:start   { align-items: ... }
  // .flex.-c.-x\:center  { align-items: ... }
  // .flex.-c.-x\:end     { align-items: ... }
  // .flex.-c.-x\:between { align-items: ... }
  // .flex.-c.-x\:around  { align-items: ... }
  // .flex.-c.-x\:evenly  { align-items: ... }


  if (opts.flexColumn && opts.flexXStretch) {
    style = _objectSpread2({}, style, {
      alignItems: "stretch"
    });
  }

  if (opts.flexColumn && opts.flexXStart) {
    style = _objectSpread2({}, style, {
      alignItems: "flex-start"
    });
  }

  if (opts.flexColumn && opts.flexXCenter) {
    style = _objectSpread2({}, style, {
      alignItems: "center"
    });
  }

  if (opts.flexColumn && opts.flexXEnd) {
    style = _objectSpread2({}, style, {
      alignItems: "flex-end"
    });
  }

  if (opts.flexColumn && opts.flexXBetween) {
    style = _objectSpread2({}, style, {
      alignItems: "space-between"
    });
  }

  if (opts.flexColumn && opts.flexXAround) {
    style = _objectSpread2({}, style, {
      alignItems: "space-around"
    });
  }

  if (opts.flexColumn && opts.flexXEvenly) {
    style = _objectSpread2({}, style, {
      alignItems: "space-evenly"
    });
  } // .flex.-c.-y\:stretch { justify-content: ... }
  // .flex.-c.-y\:start   { justify-content: ... }
  // .flex.-c.-y\:center  { justify-content: ... }
  // .flex.-c.-y\:end     { justify-content: ... }
  // .flex.-c.-y\:between { justify-content: ... }
  // .flex.-c.-y\:around  { justify-content: ... }
  // .flex.-c.-y\:evenly  { justify-content: ... }


  if (opts.flexColumn && opts.flexYStretch) {
    style = _objectSpread2({}, style, {
      justifyContent: "stretch"
    });
  }

  if (opts.flexColumn && opts.flexYStart) {
    style = _objectSpread2({}, style, {
      justifyContent: "flex-start"
    });
  }

  if (opts.flexColumn && opts.flexYCenter) {
    style = _objectSpread2({}, style, {
      justifyContent: "center"
    });
  }

  if (opts.flexColumn && opts.flexYEnd) {
    style = _objectSpread2({}, style, {
      justifyContent: "flex-end"
    });
  }

  if (opts.flexColumn && opts.flexYBetween) {
    style = _objectSpread2({}, style, {
      justifyContent: "space-between"
    });
  }

  if (opts.flexColumn && opts.flexYAround) {
    style = _objectSpread2({}, style, {
      justifyContent: "space-around"
    });
  }

  if (opts.flexColumn && opts.flexYEvenly) {
    style = _objectSpread2({}, style, {
      justifyContent: "space-evenly"
    });
  }

  return style;
}

function widthHeight(iter) {
  invariant(iter.classNameMatches(/^(wh|w|h):(\d+(\.\d+)?|auto|max)?$/), "stylex: Cannot parse class `".concat(iter.className(), "` from class string `").concat(iter.classString(), "`. ") + "Please refer to https://git.io/JeQtB for documentation.");
  var value = 0;

  if (iter.token() !== "auto" && iter.token() !== "max") {
    value = Number(iter.token());
  } else if (iter.token() === "auto") {
    value = "auto";
  } else {
    value = "100%";
  }

  var style = {};

  switch (iter.key()) {
    case "wh":
      style = {
        width: value,
        height: value
      };
      break;

    case "w":
      style = {
        width: value
      };
      break;

    case "h":
      style = {
        height: value
      };
      break;
  }

  return style;
}

function strokeWidth(iter) {
  invariant(iter.classNameMatches(/^sw:([1-8]\d{2}(\.\d+)?|900)$/), "stylex: Cannot parse class `".concat(iter.className(), "` from class string `").concat(iter.classString(), "`. ") + "Please refer to https://git.io/JeQtB for documentation.");
  var value = Number(iter.token());
  return {
    strokeWidth: value * 0.005
  };
}

function fontWeight(iter) {
  invariant(iter.classNameMatches(/^fw:([1-8]\d{2}(\.\d+)?|900)$/), "stylex: Cannot parse class `".concat(iter.className(), "` from class string `").concat(iter.classString(), "`. ") + "Please refer to https://git.io/JeQtB for documentation.");
  var value = Number(iter.token());
  return {
    fontWeight: value
  };
}

function fontSize(iter) {
  invariant(iter.classNameMatches(/^fs:\d+(\.\d+)?$/), "stylex: Cannot parse class `".concat(iter.className(), "` from class string `").concat(iter.classString(), "`. ") + "Please refer to https://git.io/JeQtB for documentation.");
  var value = Number(iter.token());
  return {
    fontSize: value
  };
}

function letterSpacing(iter) {
  invariant(iter.classNameMatches(/^ls:-?\d+(\.\d+)?%$/), "stylex: Cannot parse class `".concat(iter.className(), "` from class string `").concat(iter.classString(), "`. ") + "Please refer to https://git.io/JeQtB for documentation.");
  var value = Number(iter.token().slice(0, -1));
  return {
    letterSpacing: "".concat(value * 0.01, "em")
  };
}

function lineHeight(iter) {
  invariant(iter.classNameMatches(/^lh:-?\d+(\.\d+)?%$/), "stylex: Cannot parse class `".concat(iter.className(), "` from class string `").concat(iter.classString(), "`. ") + "Please refer to https://git.io/JeQtB for documentation.");
  var value = Number(iter.token().slice(0, -1));
  return {
    lineHeight: value * 0.01
  };
}

function color(iter) {
  var color = iter.token();
  var opts = {
    alpha: iter.nextClassNameRegex(/^-a:(\d{1,2}(\.\d+)?|100)%$/) // Optional.

  };
  var alpha = 1;

  if (opts.alpha) {
    alpha = Number(iter.token().slice(0, -1) * 0.01);
  }

  return {
    color: "hsla(var(--".concat(color, "), ").concat(alpha, ")")
  };
}

function background(iter) {
  var background = iter.token();
  var opts = {
    alpha: iter.nextClassNameRegex(/^-a:(\d{1,2}(\.\d+)?|100)%$/) // Optional.

  };
  var alpha = 1;

  if (opts.alpha) {
    alpha = Number(iter.token().slice(0, -1) * 0.01);
  }

  return {
    background: "hsla(var(--".concat(background, "), ").concat(alpha, ")")
  };
}

function borderRadius(iter) {
  invariant(iter.classNameMatches(/^br(-(l|r|t|b))?:(\d+(\.\d+)?|max)?$/), "stylex: Cannot parse class `".concat(iter.className(), "` from class string `").concat(iter.classString(), "`. ") + "Please refer to https://git.io/JeQtB for documentation.");
  var value = 0;

  if (iter.token() !== "max") {
    value = Number(iter.token());
  } else {
    value = 9999;
  }

  var style = {};

  switch (iter.key()) {
    case "br":
      style = {
        borderRadius: value
      };
      break;

    case "br-l":
      style = {
        borderTopLeftRadius: value,
        borderBottomLeftRadius: value
      };
      break;

    case "br-r":
      style = {
        borderTopRightRadius: value,
        borderBottomRightRadius: value
      };
      break;

    case "br-t":
      style = {
        borderTopLeftRadius: value,
        borderTopRightRadius: value
      };
      break;

    case "br-b":
      style = {
        borderBottomLeftRadius: value,
        borderBottomRightRadius: value
      };
      break;
  }

  return style;
}

function overflow(iter) {
  var opts = {
    overflowScroll: iter.nextClassName(":scroll"),
    overflowXScroll: iter.nextClassName("-x:scroll"),
    overflowYScroll: iter.nextClassName("-y:scroll"),
    overflowHidden: iter.nextClassName(":hidden"),
    overflowXHidden: iter.nextClassName("-x:hidden"),
    overflowYHidden: iter.nextClassName("-y:hidden")
  };
  invariant(opts.overflowScroll || opts.overflowHidden || opts.overflowXScroll || opts.overflowYScroll || opts.overflowXHidden || opts.overflowYHidden, "stylex: `".concat(iter.className(), "` expects `-(x|y)?:scroll` or `-(x|y)?:hidden`."));
  var style = {};

  if (opts.overflowScroll) {
    style = {
      WebkitOverflowScrolling: "touch",
      overflow: "scroll"
    };
  }

  if (opts.overflowXScroll) {
    style = {
      WebkitOverflowScrolling: "touch",
      overflowX: "scroll"
    };
  }

  if (opts.overflowYScroll) {
    style = {
      WebkitOverflowScrolling: "touch",
      overflowY: "scroll"
    };
  }

  if (opts.overflowHidden) {
    style = {
      overflow: "hidden"
    };
  }

  if (opts.overflowXHidden) {
    style = {
      overflowX: "hidden"
    };
  }

  if (opts.overflowYHidden) {
    style = {
      overflowY: "hidden"
    };
  }

  return style;
}

function textOverflow(iter) {
  var opts = {
    textOverflowX: iter.nextClassName("-x"),
    textOverflowY: iter.nextClassNameRegex(/^-y:\d+$/)
  };
  invariant(opts.textOverflowX || opts.textOverflowY, "stylex: `".concat(iter.className(), "` expects `-x` or `-y:\\d+`."));
  var yValue = Number(iter.token());
  var style = {}; // https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow

  if (opts.textOverflowX) {
    style = {
      whiteSpace: "nowrap",
      overflowX: "hidden",
      textOverflow: "ellipsis"
    };
  } // https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp


  if (opts.textOverflowY) {
    style = {
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: yValue,
      overflowY: "hidden"
    };
  }

  return style;
}

function zIndex(iter) {
  invariant(iter.classNameMatches(/^z:(-?\d+|min|max)?$/), "stylex: Cannot parse class `".concat(iter.className(), "` from class string `").concat(iter.classString(), "`. ") + "Please refer to https://git.io/JeQtB for documentation.");
  var value = 0;

  if (iter.token() !== "min" && iter.token() !== "max") {
    value = Number(iter.token());
  } else {
    value = iter.token() === "min" ? -9999 : 9999;
  }

  return {
    zIndex: value
  };
}

var Iterator =
/*#__PURE__*/
function () {
  function Iterator(classString) {
    _classCallCheck(this, Iterator);

    _defineProperty(this, "state", {
      classString: "",
      classes: [],
      didStart: false,
      index: 0,
      keyToken: [] // Cache of the current key-token.

    });

    this.state.classString = classString;
    this.state.classes = classString.split(/[ \t\n]+/).filter(function (each) {
      return each !== "";
    });
  } // `classString` returns the current class string.


  _createClass(Iterator, [{
    key: "classString",
    value: function classString() {
      return this.state.classString;
    } // `className` returns the current class name.

  }, {
    key: "className",
    value: function className() {
      return this.state.classes[this.state.index];
    } // `classNameMatches` returns whether the current class
    // name matches a regex.

  }, {
    key: "classNameMatches",
    value: function classNameMatches(regex) {
      return regex.test(this.state.classes[this.state.index]);
    } // `keyToken` returns the current key-token.

  }, {
    key: "keyToken",
    value: function keyToken() {
      // Reuse the cache:
      if (this.state.keyToken.length === 2) {
        return this.state.keyToken;
      }

      var arr = this.className().split(":");

      if (arr.length !== 2) {
        this.state.keyToken = [arr[0], ""];
        return this.keyToken();
      }

      this.state.keyToken = [arr[0], arr[1]];
      return this.keyToken();
    } // `key` returns the current key.

  }, {
    key: "key",
    value: function key() {
      var cache = this.keyToken();

      if (cache.length < 1) {
        return "";
      }

      return cache[0];
    } // `token` returns the current token.

  }, {
    key: "token",
    value: function token() {
      var cache = this.keyToken();

      if (cache.length < 2) {
        return "";
      }

      return cache[1];
    } // `nextClassName` returns whether the next class name
    // matches (calls `next` if true).

  }, {
    key: "nextClassName",
    value: function nextClassName(className) {
      var ok = this.state.index + 1 < this.state.classes.length && this.state.classes[this.state.index + 1] === className;

      if (ok) {
        this.next();
      }

      return ok;
    } // `nextClassNameRegex` returns whether the next class
    // matches a regex (calls `next` if true).

  }, {
    key: "nextClassNameRegex",
    value: function nextClassNameRegex(regex) {
      var ok = this.state.index + 1 < this.state.classes.length && regex.test(this.state.classes[this.state.index + 1]);

      if (ok) {
        this.next();
      }

      return ok;
    } // `next` iterates the iterator.

  }, {
    key: "next",
    value: function next() {
      if (!this.state.didStart) {
        this.state.didStart = true;
        return true;
      } else if (this.state.index + 1 === this.state.classes.length) {
        return false;
      } // Empty the key-token cache:


      this.state.keyToken = [];
      this.state.index++;
      return true;
    }
  }]);

  return Iterator;
}();

function parse(classString) {
  var styles = {};
  var iter = new Iterator(classString);

  while (iter.next()) {
    var key = iter.key();
    var parseStyle = styleParsers[key];
    invariant(parseStyle, "stylex: Cannot parse class `".concat(iter.className(), "` from class string `").concat(iter.classString(), "`. ") + "Please refer to https://git.io/JeQtB for documentation.");
    styles = _objectSpread2({}, styles, {}, parseStyle(iter));
  }

  return styles;
}

var exports$1 = _objectSpread2({}, components, {}, componentsTypos, {
  parse: parse
});

module.exports = exports$1;
