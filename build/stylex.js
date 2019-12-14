'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var invariant = _interopDefault(require('invariant'));

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
  "flex": flex,
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
  "c": function c(iter) {
    return {
      color: "hsl(var(--".concat(iter.token(), "))")
    };
  },
  // FIXME: Warn if there’s no token?
  "b": function b(iter) {
    return {
      background: "hsl(var(--".concat(iter.token(), "))")
    };
  },
  // FIXME: Warn if there’s no token?
  "br": borderRadius,
  "br-l": borderRadius,
  "br-r": borderRadius,
  "br-t": borderRadius,
  "br-b": borderRadius,
  "overflow": overflow,
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
} // NOTE: Use `if`s instead of a `switch`; multiple
// subclasses are allowed.


function position(iter) {
  var position = iter.key();
  var positionL = iter.nextClassName("-l");
  var positionR = iter.nextClassName("-r");
  var positionX = iter.nextClassName("-x"); // Order matters.

  var positionT = iter.nextClassName("-t");
  var positionB = iter.nextClassName("-b");
  var positionY = iter.nextClassName("-y"); // Order matters.

  var style = {
    position: position
  };

  if (positionX) {
    style = _objectSpread2({}, style, {
      left: 0,
      right: 0
    });
  }

  if (positionY) {
    style = _objectSpread2({}, style, {
      top: 0,
      bottom: 0
    });
  }

  if (positionL) {
    style = _objectSpread2({}, style, {
      left: 0
    });
  }

  if (positionR) {
    style = _objectSpread2({}, style, {
      right: 0
    });
  }

  if (positionT) {
    style = _objectSpread2({}, style, {
      top: 0
    });
  }

  if (positionB) {
    style = _objectSpread2({}, style, {
      bottom: 0
    });
  }

  return style;
} // NOTE: Use `if`s instead of a `switch`; multiple
// subclasses are allowed.


function flex(iter) {
  var flexRow = iter.nextClassName("-r");
  var flexColumn = iter.nextClassName("-c");
  var flexStretch = iter.nextClassName(":stretch");
  var flexStart = iter.nextClassName(":start");
  var flexCenter = iter.nextClassName(":center");
  var flexEnd = iter.nextClassName(":end");
  var flexBetween = iter.nextClassName(":between");
  var flexAround = iter.nextClassName(":around");
  var flexEvenly = iter.nextClassName(":evenly");
  var flexXStretch = iter.nextClassName("-x:stretch");
  var flexXStart = iter.nextClassName("-x:start");
  var flexXCenter = iter.nextClassName("-x:center");
  var flexXEnd = iter.nextClassName("-x:end");
  var flexXBetween = iter.nextClassName("-x:between");
  var flexXAround = iter.nextClassName("-x:around");
  var flexXEvenly = iter.nextClassName("-x:evenly");
  var flexYStretch = iter.nextClassName("-y:stretch");
  var flexYStart = iter.nextClassName("-y:start");
  var flexYCenter = iter.nextClassName("-y:center");
  var flexYEnd = iter.nextClassName("-y:end");
  var flexYBetween = iter.nextClassName("-y:between");
  var flexYAround = iter.nextClassName("-y:around");
  var flexYEvenly = iter.nextClassName("-y:evenly");
  invariant(flexRow || flexColumn, "stylex: `".concat(iter.className(), "` expects `-r` or `-c`."));
  var style = {
    display: "flex",
    flexDirection: flexRow && "row" || flexColumn && "column"
  }; // .flex.-r.\:stretch, .flex.-c.\:stretch { ... }
  // .flex.-r.\:start,   .flex.-c.\:start   { ... }
  // .flex.-r.\:center,  .flex.-c.\:center  { ... }
  // .flex.-r.\:end,     .flex.-c.\:end     { ... }
  // .flex.-r.\:between, .flex.-c.\:between { ... }
  // .flex.-r.\:around,  .flex.-c.\:around  { ... }
  // .flex.-r.\:evenly,  .flex.-c.\:evenly  { ... }

  if (flexStretch) {
    style = _objectSpread2({}, style, {
      justifyContent: "stretch",
      alignItems: "stretch"
    });
  }

  if (flexStart) {
    style = _objectSpread2({}, style, {
      justifyContent: "flex-start",
      alignItems: "flex-start"
    });
  }

  if (flexCenter) {
    style = _objectSpread2({}, style, {
      justifyContent: "center",
      alignItems: "center"
    });
  }

  if (flexEnd) {
    style = _objectSpread2({}, style, {
      justifyContent: "flex-end",
      alignItems: "flex-end"
    });
  }

  if (flexBetween) {
    style = _objectSpread2({}, style, {
      justifyContent: "space-between",
      alignItems: "space-between"
    });
  }

  if (flexAround) {
    style = _objectSpread2({}, style, {
      justifyContent: "space-around",
      alignItems: "space-around"
    });
  }

  if (flexEvenly) {
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


  if (flexRow && flexXStretch) {
    style = _objectSpread2({}, style, {
      justifyContent: "stretch"
    });
  }

  if (flexRow && flexXStart) {
    style = _objectSpread2({}, style, {
      justifyContent: "flex-start"
    });
  }

  if (flexRow && flexXCenter) {
    style = _objectSpread2({}, style, {
      justifyContent: "center"
    });
  }

  if (flexRow && flexXEnd) {
    style = _objectSpread2({}, style, {
      justifyContent: "flex-end"
    });
  }

  if (flexRow && flexXBetween) {
    style = _objectSpread2({}, style, {
      justifyContent: "space-between"
    });
  }

  if (flexRow && flexXAround) {
    style = _objectSpread2({}, style, {
      justifyContent: "space-around"
    });
  }

  if (flexRow && flexXEvenly) {
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


  if (flexRow && flexYStretch) {
    style = _objectSpread2({}, style, {
      alignItems: "stretch"
    });
  }

  if (flexRow && flexYStart) {
    style = _objectSpread2({}, style, {
      alignItems: "flex-start"
    });
  }

  if (flexRow && flexYCenter) {
    style = _objectSpread2({}, style, {
      alignItems: "center"
    });
  }

  if (flexRow && flexYEnd) {
    style = _objectSpread2({}, style, {
      alignItems: "flex-end"
    });
  }

  if (flexRow && flexYBetween) {
    style = _objectSpread2({}, style, {
      alignItems: "space-between"
    });
  }

  if (flexRow && flexYAround) {
    style = _objectSpread2({}, style, {
      alignItems: "space-around"
    });
  }

  if (flexRow && flexYEvenly) {
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


  if (flexColumn && flexXStretch) {
    style = _objectSpread2({}, style, {
      alignItems: "stretch"
    });
  }

  if (flexColumn && flexXStart) {
    style = _objectSpread2({}, style, {
      alignItems: "flex-start"
    });
  }

  if (flexColumn && flexXCenter) {
    style = _objectSpread2({}, style, {
      alignItems: "center"
    });
  }

  if (flexColumn && flexXEnd) {
    style = _objectSpread2({}, style, {
      alignItems: "flex-end"
    });
  }

  if (flexColumn && flexXBetween) {
    style = _objectSpread2({}, style, {
      alignItems: "space-between"
    });
  }

  if (flexColumn && flexXAround) {
    style = _objectSpread2({}, style, {
      alignItems: "space-around"
    });
  }

  if (flexColumn && flexXEvenly) {
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


  if (flexColumn && flexYStretch) {
    style = _objectSpread2({}, style, {
      justifyContent: "stretch"
    });
  }

  if (flexColumn && flexYStart) {
    style = _objectSpread2({}, style, {
      justifyContent: "flex-start"
    });
  }

  if (flexColumn && flexYCenter) {
    style = _objectSpread2({}, style, {
      justifyContent: "center"
    });
  }

  if (flexColumn && flexYEnd) {
    style = _objectSpread2({}, style, {
      justifyContent: "flex-end"
    });
  }

  if (flexColumn && flexYBetween) {
    style = _objectSpread2({}, style, {
      justifyContent: "space-between"
    });
  }

  if (flexColumn && flexYAround) {
    style = _objectSpread2({}, style, {
      justifyContent: "space-around"
    });
  }

  if (flexColumn && flexYEvenly) {
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
  invariant(iter.classNameMatches(/^ls:-?\d+(\.\d+)?%$/), "stylex: Cannot parse class `".concat(iter.className(), "` from class string `").concat(iter.classString(), "`. ") + "Please refer to https://git.io/JeQtB for documentation."); // Convert percent to decimal:

  var value = Number(iter.token().slice(0, -1));
  return {
    letterSpacing: value * 0.01 + "em"
  };
} // FIXME: `^(1\d{2}(\.\d+)?|200)$`?


function lineHeight(iter) {
  invariant(iter.classNameMatches(/^lh:\d+(\.\d+)?%$/), "stylex: Cannot parse class `".concat(iter.className(), "` from class string `").concat(iter.classString(), "`. ") + "Please refer to https://git.io/JeQtB for documentation."); // Convert percent to decimal:

  var value = Number(iter.token().slice(0, -1));
  return {
    lineHeight: value * 0.01
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
} // NOTE: Use `if`s instead of a `switch`; multiple
// subclasses are allowed.


function overflow(iter) {
  var overflowScroll = iter.nextClassName(":scroll");
  var overflowXScroll = iter.nextClassName("-x:scroll");
  var overflowYScroll = iter.nextClassName("-y:scroll");
  var overflowHidden = iter.nextClassName(":hidden");
  var overflowXHidden = iter.nextClassName("-x:hidden");
  var overflowYHidden = iter.nextClassName("-y:hidden");
  invariant(overflowScroll || overflowHidden || overflowXScroll || overflowYScroll || overflowXHidden || overflowYHidden, "stylex: `".concat(iter.className(), "` expects `(-(x|y))?:scroll` or `(-(x|y))?:hidden`."));
  var style = {};

  if (overflowScroll) {
    style = {
      WebkitOverflowScrolling: "touch",
      overflow: "scroll"
    };
  }

  if (overflowXScroll) {
    style = {
      WebkitOverflowScrolling: "touch",
      overflowX: "scroll"
    };
  }

  if (overflowYScroll) {
    style = {
      WebkitOverflowScrolling: "touch",
      overflowY: "scroll"
    };
  }

  if (overflowHidden) {
    style = {
      overflow: "hidden"
    };
  }

  if (overflowXHidden) {
    style = {
      overflowX: "hidden"
    };
  }

  if (overflowYHidden) {
    style = {
      overflowY: "hidden"
    };
  }

  return style;
} // https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow
// https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp
//
// NOTE: Use `if`s instead of a `switch`; multiple
// subclasses are allowed.


function textOverflow(iter) {
  /*eslint-disable no-useless-escape*/
  var textOverflowX = iter.nextClassName("-x");
  var textOverflowY = iter.nextClassNameRegex(/^-y\:\d+$/);
  invariant(textOverflowX || textOverflowY, "stylex: `".concat(iter.className(), "` expects `-x` or `-y:\\d+`."));
  var yValue = Number(iter.token());
  var style = {};

  if (textOverflowX) {
    style = {
      whiteSpace: "nowrap",
      overflowX: "hidden",
      textOverflow: "ellipsis"
    };
  }

  if (textOverflowY) {
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
      started: false,
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
      var matches = this.state.index + 1 < this.state.classes.length && this.state.classes[this.state.index + 1] === className;

      if (matches) {
        this.next();
      }

      return matches;
    } // `nextClassNameRegex` returns whether the next class
    // matches a regex (calls `next` if true).

  }, {
    key: "nextClassNameRegex",
    value: function nextClassNameRegex(regex) {
      var matches = this.state.index + 1 < this.state.classes.length && regex.test(this.state.classes[this.state.index + 1]);

      if (matches) {
        this.next();
      }

      return matches;
    } // `next` iterates the iterator.

  }, {
    key: "next",
    value: function next() {
      if (!this.state.started) {
        this.state.started = true;
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

function stylex(classString) {
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

module.exports = stylex;
