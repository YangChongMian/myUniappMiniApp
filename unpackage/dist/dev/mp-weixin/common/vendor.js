(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),
/* 2 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!***************************************!*\
  !*** D:/uniapp/douyinapp1/pages.json ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */
/*!***************************************************!*\
  !*** D:/uniapp/douyinapp1/static/imgs/index6.jpg ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),
/* 36 */
/*!***********************************************************************!*\
  !*** D:/uniapp/douyinapp1/static/icons/musics/usual/danquxunhuan.png ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIEAYAAAD9yHLdAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAOoNJREFUeNrt3WdAVNfWMOC1DlUUoyaWiA17BaaA8EKMUXMFe8GuSNRr16sg+tprNBbQaNQE1KgXG0qiUQF7I4rCDMWGGsRewrWBisDMWd+P4+G7Sd4kFubsYWY//7xl1tpbZM05e++1ATiO4ziO4ziO4ziO4ziO4ziO4ywPsk6A45SQHpoemh5apYq4Vdwqbm3bVlwlrhJX1ahBdagO1Xn+XHglvBJeJSerfFW+Kl+dDhERkYh13hxnzngB4SzSuernqp+r/uGHNn1t+tr0XbIEV+EqXBUUREmUREm2tn/6f5wG02DaxYvQETpCx/HjNeM14zXjjx5lPR6OM0e8gHAWJcM/wz/Dv0aNIkORochw5AgshsWwuGHDt/0cHINjcIzRKD2phIRoPbWeWs+VK1mPj+PMCS8gnEWIiYmJiYmxsak/qv6o+qN+/pkO0kE62LJliQWIh3iIX75cM0MzQzMjJIT1eDnOHAisE+C4klD/Rv0b9W/06lXihUMWAAEQMHGiboFugW5BRATr8XKcOeAFhLMIVItqUa3+/U0eSC4k13XXddeXL2c9bo5jiRcQzjK0h/bQ3t1dsXhP4Ak8mTBB11jXWNc4PJz18DmOBV5AOMvwJXwJXzo6Kh53C2yBLSEhvJBw1ogXEM4i4Pf4PX6fnc0sAV5IOCvECwhnEcQD4gHxwP79rPMoLiR8sZ2zAryAcBbBbpvdNrtt332HnbATdnr0iHU+8mK7fqN+o37jsmWs0+E4U+AFhLMI7uHu4e7hv/6KHbADdhg6FOzADuyKiljnRS2oBbUIDeWFhLNEvIBwFkW1XrVetX7PHoiCKIjq04cXEo4zHX4SnbNoKdVTqqdU79ABu2E37PbDDzAUhsJQBwfWefGT7Zwl4AWEswq8kHBcyeMFhLMqvJBwXMnhBYSzSryQcNz744vonFXS3tPe096Li6MhNISG9OwJ62E9rC8oYJ0Xb9rIlSa8gHBWTavVarXa/fvNtpDwk+2cGeOvsDjuv6SkpKSkpHTsiBtwA26IjTWbV1sDYAAMiIjQZGoyNZmhoazT4TgAXkA47v/ECwnH/T3b9/8IjjM/KckpySnJH3xAl+kyXa5ZU7gl3BJuubiQP/mTf7VqwqfCp8KnNWrQVJpKUz/8ENfhOlxXrhy0gBbQokIFukSX6JKzMz7CR/jo6VMCAoKqVVmPq7jXlovORediNGqqaappqk2ezDotzjrxJxCuVEjMScxJzHF2dlrktMhpkUoF+2E/7NdooAAKoKBJE9KSlrQNG2IKpmBKo0YUS7EUW60a67xNzgVcwGXpUl5IOBZ4AeHMQnpoemh6qKurYYRhhGFE69bQFtpC29atYQSMgBFaLdyG23C7cWMYDsNhuMA3f/zeUTgKR5cs0YRpwjRhU6awToezDryAcIqQCkTZska1UW1U+/tTbapNtTt2hARIgITPPoPu0B2616nDOs9SjxcSTkG8gHAl6ozLGZczLpUq2e222223u0cPYZwwThjXrRs4gAM4tG1LERRBEQxuDrQ2vJBwCuAFhHsn18ZeG3ttrIND3r68fXn7/vEP6kydqXOvXtKupcBAOkkn6WSZMqzztHZ4Hs/j+fBwdbA6WB08aRLrfDjLwgsI90akba316glThanC1JEjwQmcwGnIEJpFs2hWpUqs8+P+GsZjPMb/7/+qZ6hnqGcsXsw6H84y8G283G8QEREh6r/Uf6n/8h//wEIsxMLx4ymKoijK35++oq/oK76IXVrgEByCQ65flzYlbN/OOh/OsvAnECsnFQxBSHVNdU117dhRuvho5kyYA3Ngjqcn6/y4dzQFpsCUq1ftbO1s7WzbtnVLcEtwS7hzh3VanGXhBcTKFBeMwtTC1MKBA6kjdaSO06fDYlgMixs2ZJ0f957iIR7iL12SDky2ayf1+rp/n3VanGXiBcRKpJZPLZ9avl070U/0E/2WLoX5MB/me3iwzosrIbxwcAzwAmKhpEVvtRrLY3ksv2IF5EEe5H3yCeu8OFPQ6YydjZ2Nndu397rndc/r3qNHrDPirANfDLUQGRkZGRkZFSvql+uX65d//bUwVhgrjD13jhcOC3UcjsPxlJTCLoVdCrv84x+8cHAs8CeQUkreLZUalBqUGvTFF3AYDsPhJUtoH+2jfR9+yDo/c4c9sSf2fPCAttJW2vrrrxABERDx5Ak+xsf4+MkTqXmiuzsshaWw1NWVdb7FnMEZnE+dyq+YXzG/YseOfpX9KvtVzstjndb7yvDP8M/wr1HDkGnINGSqVFiABVhQrhz0hb7Q9+ZNY39jf2P/5GStp9ZT61lUxDpfTsILSCmT7JjsmOxYs6ZwQ7gh3IiKgrtwF+62b886L2YqQAWo8OwZHISDcDA9XfqFf+kSVsEqWOXiRbyEl/BSZiYmYRIm3br1pMmTJk+a3Lr1GX6Gn+GrV7//OH2IPkQfMmgQnIbTcPr772k1rabVNjashwkfwUfw0dGjtittV9qu7NLFPdw93D38xQvWab0rfYG+QF/g7k6DaTANXrYM2kAbaNO2LWhAAxr8w+8lXIJLcMnDh5AGaZC2eLFNJ5tONp0iI0v7PJR2vICUEvosfZY+a+hQ6ZtxeDg8hafw9IMPWOdlar89x3D0KI2kkTTy9GlhiDBEGHL2rMcpj1MepzIzERERRfFd40jt34cNk9q6f/ed2TRtdAEXcDlwoFBTqCnUdO/uc9fnrs/d/HzWab0r3TjdON247t3BCEYwbtv2zvesPIbH8PiXX8RaYi2x1oABno08G3k2OneO9fisDS8gZkpe0yhaWbSyaGVUFIyCUTCqZ0/WeZU0DMEQDHn1ilzJlVwPHsSH+BAfxsUZ0YhGPHTIM84zzjPu+nVTxde117XXtR89GnpCT+j5zTd/9g1YcdfgGlzbu7d8YvnE8om9ejX4psE3Db4xg6t231EqpVIqeXhQa2pNrc+cKbGeaHZgB3ZFRdKTyZw5WY5ZjlmOixf37t27d+/eRiPrcVs69v9QuN9InZg6MXXi//yP+Ln4ufj51q1QFapC1dq1Wef13uS7xj+Hz+Hz/fuhA3SADjEx+bn5ufm5cXFKv8vXN9I30jeaOJFCKZRCw8PNpnCshbWwNjbW8anjU8en/fs329VsV7NdhYWs03pfur66vrq+hw5BGIRBWLt2Jgu0CBbBohMnxH3iPnHfoEGerzxfeb66fZv1+C0V+38wHAAA6Nfq1+rXhoTAeBgP4xcvpiRKoiTbUttqBlthK2yl18Mm2ASbNm40jDeMN4zfupX1biH9Av0C/YIpUyiAAijgq69Yz1OxKIiCqO3bc9fmrs1dO2iQtEZjMLBO633pE/WJ+sTq1aUbHu/cUaxQZ0M2ZOfkCCuEFcKKXr1UiapEVeKJE6znw9Kwf8drpY7RMTpGjo7SO+HNm8mLvMgrPLy0FQ70Rm/0NhjQEz3RMyZGiBaihWhfX/UL9Qv1C41GHagOVAeuWsW6cOi0Oq1OO2uWuRUO/Ba/xW83bcpqk9Umq83AgZZSOH5Lq1X8Cc8VXMG1cmVxjbhGXHPoUPGrSq5E8ScQhaWtSVuTtsbFxRhvjDfG//hjqes55QRO4PTyJX6BX+AXUVHGNGOaMS083FxfFejydHm6vC+/hKtwFa5Om8Y6H5m0jTgqSpWtylZljxz5vpsAzJV0oLV/f2l8W7awzkcSGem4yHGR46Jx4yzlFSEr/AlEIcmbkzcnb27eXPxa/Fr8+syZUlM4LsJFuPjihXz3dtHcorlFc+vWVSepk9RJEyaYa+EofiVoZoUD9sAe2PPNN1LhGDHCUguHTEgWkoXk7GzWefzW8OGv2r5q+6rtoUPS4n6FCqwzKq34E4iJpfql+qX6ffqpOEYcI47ZvRsaQkNoaL4/sDgGx+AYo5Ee0AN6sHEjRmM0Rs+apfZT+6n97t1jnd/fkb7xDh6MGZiBGZGR4A7u4G5vzzov+WIn1WDVYNXgsDCpcBCxzsvU5Fe15W+Xv13+9u3bkAM5kPPRR6zzKnYYDsPh9HRjHWMdYx1/f68+Xn28+jx4wDqt0oI/gZiIfot+i35Lz56im+gmuh04YPaFow/2wT7HjhlHG0cbR3t4aG5obmhuDBtWWgqHvHtNauGyfr25FA7p733hQvlGQGspHLLiA5sJkAAJ33zDOp8/aAftoJ27u00lm0o2lU6dSg9ND00PNaPOA2aOF5ASpl+iX6Jf0rcvBEMwBG/f/s4HpUxMbuUBy2E5LB84UP2L+hf1L23aeAZ5BnkGXbjAOr+3JV4Rr4hXVq82m5PjI2AEjJg9W+OscdY4T5/OOh3WSEUqUi1cCAtgASw4fZp1Pn9QCSpBpfr1DZ8YPjF8kpgov3JmnZa54wWkhOge6B7oHgwcCD/AD/BDdLTZ7qbKh3zI//57cae4U9zZuLEmWhOtiTaXxc23J7fEMJf29PLVsZoUTYomZd481vmYC7mHlaONo42jTfv2sApWwaqffmKd1x/UhJpQs3p1wUlwEpyOHpVeQTdtyjotc8XXQN6TXDiwG3bDbhs3ms034NeKnzQAAGD4cPUN9Q31jb17WedVUuTeVTSABtCAzZsVT0AHOtARQQ2oATVCQjQdNB00HVasYD0v5k6+2Ezvo/fR+0yZApEQCZFz50IRFEGRnR3r/Iq5gAu43L8v/ftu1UraPPLLL6zTMhf8CeQdSQekunTBmlgTa5pR073XcA/uwT1xcdKTRosWllY4ZGI/sZ/Yr2JFxQO/LhykJjWpx4zhhePtyLvPNEmaJE3SokWig+ggOvj5yT2uWOdX7C7chbsff0zxFE/xR45IPdNq1WKdlrngTyBvSdrl89lnQqgQKoTGxZVYT5/3JB/ok7q2Tp+uuqe6p7q3dKmlL9pKfx/duknj/PFHkweMhEiIFEWcjJNx8vDh6nrqeup669ezngdLkZiTmJOY4+zsVMepjlOdtWvpJJ2kkwMGsM6r2OsCRxWpIlVs1crab37kTyBvKPl48vHk4yqVMF2YLkzfs8dcCgdsg22w7ddfaT2tp/Vt2qjvq++r7y9ZYumFoxgBAR07JjdlNFUYeXszzIW5MHfwYF44TEPuiSZ1Mhg4UHrVNWlS8fyz9nqxHU/gCTzx00/SFxgnJ9ZpscILyN+Qe/kIs4XZwuyffqKFtJAWOjuzzkvev44iiih6eWmCNEGaoFOnWKelNGlx9tkzKIACKPjuuxIP8LrbKzWn5tS8f39NNU01TbXoaNbjthbSN/zwcOpEnahTx44QDdEQ/eQJ67ygNbSG1lqt1Ipm82Z5TYd1WkqzugG/KWk/eNmyVIbKUJmffpJurKtRg3VeUA/qQb19+xyTHZMdk/381BHqCHXEzZus02Lt5d6Xe1/unTlTLqzv/YGvuwfjXJyLcwMCNOs06zTrYmJYj9NaaWZoZmhmHDgg1BZqC7Vbtiy+J4a119cspAamBqYGLljAOh2l8TWQ35GvitXv1u/W7961C2pBLajVowfrvOTtt7m+ub65vsOHW2bTvfcnFf4qVQx3DXcNd7dsedv24fKuNfGx+Fh8HBSkzdXmanMPHWI9Lu63pFdHH38seAvegveBA3SWztLZFi1Y5yX9/ggOlp6cNm1inY+p8QLyO7pdul26XWFhUjfPJUtY5wODYTAMXrxYfV59Xn1+6lSrWdt4T8VfBKbqp+qnduwIm2EzbO7fH2thLaylVsMTeAJPnJzoIB2kg9euUQ7lUE5cnL29vb29/YYNbm5ubm5uZvCqhPtLxRevzS6aXTR73z6YATNgxv/8D6t8itfiDsJBOOjtrXZQO6gdSuCJ2EzxAvKa3LNK+iZz+DDrg4CYj/mYP3++1Epk1izW88Nx5kxezMZluAyX7dlj8our/oa06H/likMNhxoONbRaqevv8+es56mkWf0ayLkd53ac21GtGt2hO3Rn+3bmhWM1rsbV8+bxwsFxb056ZfTyJU2iSTSpa1dwBmdwZrepRDoX1qhRQXxBfEH8t9+ynh9TsdoCIr/isNlrs9dm74YNFEuxFFutGrOEjsJROLpkiXqDeoN6w+zZrOeH40ojuZAYAgwBhoBOnXAhLsSF586xykc+x6LP0mfps4YOZT0/Jc1qX2FJj7yjRklrCmvWMEukJ/SEnuvXq7PV2ersf/6Tr3FwXMk543LG5YxLpUoODx0eOjw8fpzZYvvre3WoKTWlpu7uUqHLymI9P+/L6p5A0i6lXUq71LAhlsWyWHbZMlZ5YBiGYdju3VlLspZkLZEvFuKFg+NKks9dn7s+dx8/NtoabY22HTvKva0UT6QZNINmZcsKfYW+Qt+oKPkNCOv5eV9WU0Dkgz7G6cbpxunffw8v4SW8VP4EKbbCVthKr7dR2ahsVAMH9u7du3fv3mZwwpbjLJh8c6ZwVjgrnO3aVfp3mJ+vdB60g3bQjs8+S/059efUn0eMYD0v76vUV8A3xfqVlXy+wPjA+MD4wMvLXK+C5ThrIF/4Jq1RxMTAcBgOw5U7SY6f4+f4eW6ueEA8IB5o0ULqqHDrFut5eVsW/wQityLBilgRKy5apHgC6ZAO6YWFtIbW0Jru3Xnh4Dj21APUA9QDYmOlV0vK/16gQ3SIDpUvL4wTxgnjGK7BvieLLyDQClpBq+XL4Sk8hacffKB4/GiIhujJk6V230lJrKeD47j/L3dc7rjccXPmwDk4B+dOnlQ6vrTdt2NH/T39Pf29gADW8/G2LLaA6DbrNus2f/IJJVMyJffurXgCa2EtrI2NVR9RH1EfWbmS9XxwHPdHcksgG7IhG+rfH7IhG7JzcpTOg67SVboaHi7dN2JGF2r9DYsrIMVdMXMgB3IiIhRPIARCIOTOHSFKiBKihg3ju6s4zvx5jPYY7TH67l3pJHtQUPFNk0pxBmdwbtJE+sOoUazn401ZXAHR6XQ6nW7QILndsnKBpR84LMACLPjnP1WoQhU+fcp6PjiOe3PSlbUJCaABDWiiopSOj1txK26dM0d6EvnoI9bz8XcspoBcG3tt7LWxDg5YD+thvXnzFE/AF3zBd82a4h9AjuNKLRJJJHHyZPmNgmKBB8JAGFixIh7H43g8LIz1PPwdiykguddyr+VeGzoUrsN1uK7cncXYH/tj/9u386vkV8mvMnUq63ngOO79yReV4TbchtuGD1c8gapQFaqOGSM1ea1cmfV8/JlSX0DkJw94Ba/glfK/wMUt4hZxy/jx8lWcrOeD47iSo66urq6uHh8vrY1s3apY4Ncn16kqVaWqEyeynoc/U+oLSF5KXkpeyj//qfiNgQEQAAF79kg9bXbvZj0PHMeZju0T2ye2T6ZMkXtaKRb4OTyH52PHyj29WM/D75XaAhITExMTE2NjQ+2oHbULDVUs8OuDgVgX62LdSZNYzwPHcabnluCW4JZw5w6shJWwUrmL5mghLaSFzs4OOxx2OOyYMIH1PPxeqS0gdV3rutZ17dEDukN36F6njmKB78E9uLd6tbRY/ssvrOeB4zjlFN4vvF94f+lSeAgP4eHNm0rFpVpUi2qNGnWMjtExcnRkPQ+yUltApD7/ClbkaIiG6CdPCtcWri1cu2AB6/FzHKc8qbtvfj62xbbYVsEL33IgB3I++shZ56xz1vXpw3oeZMxu3ntXyVeSryRf8fKS3g0qePfxKTgFp1askNtDs54Hji15d4xxuXG5cXm/fpiLuZjr6QnbYBtsK1MGpsE0mHb7ttS2f98+daw6Vh175AjrvLmS8cz+mf0z+61byz8u/7j845kzoRJUgkr165s6Ls7FuTh3zBjpT5s2sZ6HUteNV1dHV0dXZ906iIVYiFXghq+rcBWuPn1K9ak+1a9TR97ex3oeOGWdrXe23tl65cvbjrQdaTty+nS4Bbfg1ujREAzBEFyu3N9+gD3Yg31SEhVQARUMHGgpFwpZO12gLlAXGBwMU2EqTP3+e6XiSudUvL2l30dnz7Iaf6l5hZWYk5iTmOPsDJ2hM3RW8BEuD/Igb8UKXjisk9zkzs7WztbO9sIFaANtoM3kyW9cOGSFUAiF3t5YBatglaQk+WIz1uPj3k/uztyduTujo3EIDsEh168rFRd7YA/sMXo06/GXmgLieMPxhuONPn3e+h/uu3ICJ3B6+dI4xzjHOOebb1iPn1OGvF1SV1NXU1dz0ya6T/fpflwcbaWttLVmzfcO8Ppdthgqhoqh27fLuwlZj5t7N3IzRnG9uF5cr+ANp92gG3Tr0UO650j5i/FkpaaA4Bk8g2eGDFEs4Et4CS+jo73ued3zuvfoEevxc6YlrWkEBjr4Ofg5+F26BLthN+wOCjJVPFpAC2iBStVgZYOVDVZ27856/Nz7KfNVma/KfPXvf0MFqAAVFHhT8fqLtHBUOCoc7dKF1bjNvoBITcVq1QJHcARHb2+TB3zdFFH4l/Av4V9ff816/JxpnNtxbse5HdWq6YbphumG7dolfi1+LX69cydNpsk0uWpVpfKgVEql1G7dWM8H936a7Wq2q9mu588BAQEVXAtZRstoWd++rMZt9gVESBFShJTAQKk7pukvoUcd6lB34oQqUZWoSrx0ifX4uZKlL9AX6AuCgmy32m613XrxIoyCUTCqZ09W+dA8mkfzGjViPS9cyRB+En4SflqzBiIhEiJF0eQBv4Kv4KuAgIyMjIyMjIoVFR+v0gHfFvmRH/n16qVYwLJQFspu2MB63FzJkJ9gpQvG4uPpAl2gC5s20SyaRbPMoDVEa2gNrU3/xYhThmqCaoJqwrVrWBbLYlkFtm27gzu429sbyhrKGsr26KH0eM22gGT4Z/hn+NeoAWfgDJxp2dLkAV+/uyzYUbCjYMeuXazHz70b6UIxRGlxcdQoYYYwQ5hx4YLUnM7fn3V+nHWgW3SLbinXfJFqUA2q0bGj0uM02wJSOL9wfuF8f3/FXl2txtW4eudO+aQp6/Fzb0fvrffWe9evr/9W/63+2+PHpZsg16yRewmxzo+zLjSFptCUH3/EEAzBkFevTB0PP8aP8eO2bZW+EtdsCwh2xs7YuX17peKJ/cR+Yr+dO1mPm3sz8tXF0g2Uw4fTaBpNo9PSwAu8wKtVK9b5cdZNPjdGDagBNdi/39Tx6BAdokPly9tMtJloM1G5Dh1mV0CkZmG2trAclsPydu1MHQ/n4TycJ7cmOXaM9fi5v5a8OXlz8ubmzVMDUwNTA8+ckf7T776T709gnR/H/TchU8gUMrdvVyqe+FR8Kj4NCFBsfEoFelMffPvBtx986+kJDaEhNKxQweQBT8NpOP3TT9I3hqIi1uPnfuti4MXAi4H29rpIXaQucvZswSAYBINOR9NoGk3z8mKdH8f9Fal778GDYAd2YKfA75daUAtqKffmxuwKCMyDeTDvk0+UCifGiXFiXFwc62FzvyVtt3V3L4gviC+IP3NGWgubM0fedcI6P457Ey2zWma1zMrNlX6vnT5t8oA1oSbUdHOTe7eZOpz5FZAm0ASa+PiYOgyOwTE4xmgs6lbUragb75LKmnzPgY50pKM5c+gKXaErycl0kk7SSbWadX4c9z7QAz3QIz7e5IGGw3AYLgh2HnYedh6enqYOZ34FpDJUhsqmLyAURVEUlZzM27OzJbdF/6DmBzU/qHnoEOhBD/rZs6EIiqBIud0kHGdKNIyG0TAFCogsARIgwfSdO8ymgCR3SO6Q3KFuXcVaSfSDftDvxAnW47ZW6aHpoemhZcuKx8Xj4vGTJ2kP7aE9fn6s8+I4U1BXVVdVVz1/Xr6YztTx6C7dpbtWVEBsTticsDnh4aFUPKGl0FJoKe/i4ZRm+Mnwk+GnRYukO+YbN2adD8eZknQuiQimwBSYcu6cyQMehsNw2PQHsM2mgNBzek7P3dyUilfwouBFwYukJNbjtjbSrqpy5cAf/MH/iy9Y58NxiqoKVaGqAr93XMEVXCtXTuqb1Depr+ne6JhNAYGP4WP4uFkzk8cJgzAIy8723u693Xv7w4esh21tClYWrCxY+cknit3r8pawP/bH/rdvYyRGYuTx46zz4SwL+qAP+ij3xdXhjsMdhzume8I3nwLSHJpDcwWeQC7ABbiQkcF6uFZrCkyBKR9/zDqNYq/b90Mv6AW9vv22yFBkKDI0b04/08/0M7urQjnLhLZoi7Y6nVLxyJmcydmCC0jxjWwREAERrq4mD1gdqkP18+dZj9ta0TpaR+tevGCdh3wFKR7AA3jg88811zXXNddHjSret89xJiBdE5GTg52wE3Yy/UV15Eu+5Gu66wKYF5C6rnVd67q6uCi1bVN6RXHxIutxWys6T+fpfEqK0nHlcz94Hs/j+fBw6QrSFi3UsepYdSw/B8QprB20g3aZmSaPkwmZkGnBTyB4GS/j5dq1lYonthHbiG2uXmU9bmul1Wq1Wm1WFiyCRbBIgW3U02AaTLt4UVwlrhJX+fqqg9XB6uBJk6Q8Xr5kPR+cdaJTdIpOKVBANsJG2Gi6NzvsC0gapmFanTpKxRO7iF3ELjdvsh63tRN2CjuFnRMmlHi769c9hzAf8zF//nxHZ0dnR2e1Wup1xtc0ODOxDJbBsitXTB4nDMIgzIJ3YYn9xf5ifxcXU8fBaTgNp+Xled3zuud1z/TvHrm/pkIVqjAtDetjfazfty84gRM4ve8TgU4HVaAKVNFq1X5qP7XfrFnSXdWFhazHy3H/jepQHapz967JAzWBJtCkQoVrY6+NvTbWwaGkP555ARGmClOFqR9+aOo49Al9Qp/cvs16vNxvqdar1qvW79mDWtSiVquFAAiAgD175DWLP/0/5kEe5F2+jEfwCB7p1y9XnavOVXt7a6ppqmmq8V12nHnD03gaTz94YPJAry/kezb42eBng0v+ScTW5AP4GzSbZtNs0xcQSIM0SMvJYT1e7v+mfqF+oX5x+TK8gBfwolu31IepD1MfVqhgBCMYwcMDXdAFXZychL5CX6HvxYvqCHWEOuK/XkVOhskwmfUoOO7NCDFCjBDz4IHoK/qKvqaPR+WpPJWvVk36061bJfW5zAsIrIN1sO7DD2EcjINxJowzAAbAgEePYBfsAn7judmTXnE9fSr96b8O9EVABESwzo7j3s+r7FfZr7IfPLAHe1DibgLMwzzMq1y5pD+X+SssaZdMxYqmDoMTcSJO5GsfHMex533H+473nSdPIBIiIVIUTR3PZoLNBJsJZcqU9OcyLyA4Fafi1JJf3PmDOTAH5vADYhzHsSc3V8RojMboggJTxxN3ibvEXY6OJf25zAsIeZEXeZm+gFBP6kk9Tf8XxXEc96ZoOA2n4SW4jf3P4tym23TbAgsItISW0FKBK0rLQTkox+885zjOjEyBKTDF9AVEGCeME8ZZYgFRqoVJOSyHvIBwHGdO+kN/6K/AE4gt2ZKtBRYQnIkzceZf7PcvIdSEmlATGxvW4+U4jisWC7EQa/rfS5iDOZhT8r9nmRcQ6k7dqbvpKzAcg2NwTIHFeo7juDeEI3EkjlRgDfg7+o6+K/mODMwLCC7BJbjE9AUEYzEWY3kB4TjOfFA36kbdFCggZakslS35TUTMCwh9Rp/RZwq8A/QkT/Is+XeAHMdx7wqH4TAcZvoCIrgJboJbyT+BMD+JjlfxKl4tKCAgIFPGaY2tsXXZsqzHy3Ecd4yO0TFydCQ96Ulf8gf8/mAX7IJdJX+RG/snkF/pV/rV9Af8qD21p/ama2vMcRz3pj4M+DDgw4CPPlIqnrG/sb+xf8l34mBeQGA4DIfhpu9KiY/wET6Sm4lxHMexY4w3xhvjlSsgdoPtBtsNLvlmsswLCD7H5/j84UNTx6ERNIJG8CcQjuPYM6YYU4wpVaooFc8w3jDeMP7x45L+XOZrIHSNrtE10xcQ7IW9sFeVKkRERIIg9aIxfRMzjuO430MBBRQUuIlVBzrQEZU5WOZgmYMW+AoLz+N5PG/6V1iUREmUZGubBmmQBrVqsR43x3HWC+/gHbxjurvKi1WBKlDl/n1T3czJvIBQLMVS7L17isXzIR/yadyY9bg5jrNeFE/xFK/AE8gm2ASbbtww1cczLyCG3obeht7XrsmPWqaOR07kRE6NGrEeN8dxVswVXMG1SRNTh8GDeBAPZmeb6vOZF5CWWS2zWmbl5sqPWiYPeANuwA3+BMJxnPJSklOSU5Lt7OAm3ISbpv89RItoES2y4CcQGU7CSTjpyhWTB0qABEho1oz1eDmOsz62q2xX2a5q2BCGwlAYqkBrpd7QG3pnZprq482mgMBAGAgDTTfQYkYwglGjKf4mwHEcpxCjaBSNooeHUvGwIlbEiufPm+rzzaaAiB3FjmJHBQrIS3gJL52cpG10bm6sx81xnBWZClNhqo+PyePYgR3YFRU5DHAY4DDg8mVThTGbAkJ1qS7V1ekUC5gHeZDn7c163BzHWZFn8AyeffKJyeM8h+fw/PJlU23flZlNATG4GdwMbnq9XDlNHQ87YkfsqMA3AY7jrJ70yvyDDzAEQzBEgTXYPtAH+qSlmTqM2RQQn7s+d33u5ufDITgEh9LTTR6wMlSGym3bSifTEVmPn+M4yyX0EnoJvVq1otW0mlYrcDPqbtgNu3/+2eTjMvlA3tYzeAbPkpJMHUY6wFitWsqJlBMpJ5Rb1OI4zgoFQzAEBwQoFQ5bYStsdeqUqeOYXwEZDaNh9NmzSoUTbgm3hFvK/cVyHGeFfoQf4cf27U0dBufhPJz3+LHqueq56rnpNyUxb6b4ezY/2Pxg88OxY0Zbo63Rlgg0oAGNCV8xeYM3ePv7S39YuJD1+DmOsxwpKSkpKSmNGxMSEtata+p4VJEqUsXERKlZrOk7e5jdE4jHaI/RHqPv3sXROBpHX7hg8oDhEA7hvr76RH2iPrF6ddbj5zjO0vTqpVQkGktjaWxCglLxzK6AFE/EHbpDdxSYiOEwHIYLAs2iWTRLub9ojuMsH07H6Ti9Tx+l4km/xw4cUCqe2RYQiIEYiFGukmI6pmN6v36sh81xXOmXFpQWlBbUrBkshIWwUIFtu+7gDu6ZmZ5xnnGecdevKzVOsy0gjicdTzqeTEyEjbARNj5/bup4UtMxLy/pnWW9eqzHz3Fc6WVsYWxhbBEUpFjA5tAcmsfFKT1Osy0gxScoAyAAAvbvN3nA14v1OAyH4bDgYNbj5ziu9JF77GEKpmDK4MGKBY6ACIjYuVPp8ZptASlOMFaIFWK3bVMs4AyYATNGjLg29trYa2MV6JbJcZzFEK4KV4WrXbrQZJpMk6tWNXnAulAX6t66pQ5QB6gDlDv+UDxepQO+Lftn9s/sn8XHQzREQ/STJyYP6Aqu4Fq58rPgZ8HPgnv2ZD1+juNKD9pLe2nvyJGKBVwH62Dd9u1Kbdv9PbMvIPKrLGmCYmOVioun8TSeHjuW9fg5jjN/qZRKqeThAWEQBmHt2ikVV/QUPUXP7dtZjdvsC4iM6lAdqqPgqyxf8AVfHx/pnWbLlqzHz3Gc+RKPikfFo6GhSsXDGTgDZ6Smerb2bO3ZOjWV1bhLTQFRj1OPU487fhwaQ2NonJWlVFxhr7BX2DtrFuvxcxxnfvQh+hB9SO3aUnNWBc97iCSSuG4d6/GXmgIivcISRbpMl+ny2rVKxaWu1JW6duiQuid1T+oeT0/W88BxnLmZMQOKoAiKTH/DqdQkMT/fbqndUrulCr6R+ROlpoDIiroWdS3q+v338kQqFVfMF/PF/JkzWY+fsyzSqwih1P07tHbyeTEKpmAKVnC7rhM4gdOOHW5ubm5ubgpsKvobpe4HV7o35PFjGkEjaISCFTgXciG3UyddnC5OF8dvMuRKBn1NX9PXpj8oy5Us3ISbcNPs2Uo9eYAOdKAjEuPEODEuIoL1+GWlroDIqD/1p/6rVysWUO4KXBNqQs3ly/lFVJYNy2E5LHfnjsnjqFCFqlu3WI+XezNS01WtFgqhEAoHDFAscBfoAl0OHtR6aj21nufPs54HWaktIFqtVqvV6vX4BX6BXxw8qFjgQiiEQm9vnU6n0+l47yxLJWwQNggbFPi5GgEjYIRyze+4d1P8hfE7+A6+W7FCbsKqVHyhodBQaLhsGet5+ENerBN4X+J6cb24fv58peMKA4QBwoCvvpLehTo5sZ4HrmR5NPVo6tH06lUMwzAM2727xAP8CD/CjzduONxyuOVwa8cO1uPl/lpa9bTqadX79qUJNIEm+PoqFvg4HIfjKSmqXFWuKvfwYdbz8HulvoBIj3SJifARfAQfHT2qVFzaSltpa82awl3hrnCXL65bKiFQCBQCx46FEAiBkBJ4pZUO6ZBeWCjt7hs0qLjnG2eWMjIyMjIyKlYkB3IgB+XXHrAf9sN+5nuMoNQXEJlYS6wl1lL+SQQCIRACJ02SXmlpNKzngStZ8gVnFE7hFN66NcyEmTAzLe1tPwd7Yk/s+eABuZEbufn7F3/x4cyaYaNho2HjkiUUS7EUW62aYoEXwAJYcPq0urq6urp6fDzrefgzFlNAPNETPfH4ceyDfbDPsWNKxaUkSqIkW1s4DIfh8Pr1cjdO1vPBlSxpzS0rKys4KzgrWKuF5bAclg8cKHWL3rMH9sJe2HvtmvykIv8c4jk8h+dCQ18mv0x+mdywofQ5yv18cu8mmZIpmVq3psbUmBoPHap0fBRQQMF8nzyK82SdQElLPp58PPm4SiVsE7YJ21JSlF7skhZFZ8/WpGhSNCnz5rGeD47j3pzU06pCBTFejBfj09KgKlSFqrVrK5aAC7iAy4EDmmqaappq/v6s5+PvWMwTiKy4N0xZKAtlN25UOr50s+HMmcmPkh8lP1JwsY3juPcmuoguosuaNUoXDvRGb/Q2GMSD4kHx4KRJrOfhTVlcAZFJ50RmzFDqRsPiuK9faQmCIAjC1q1nXM64nHGpVIn1fHAc9+ek3ZSDB0uvIhlsz18CS2DJmjWeQZ5BnkEXLrCejzdlsQVEetd8/z5uwA244auvFE/gOlyH67Vq2Yfbh9uHb9zIDx5ynPnRF+gL9AXu7lgWy2LZNWsUT6AyVIbK//mPbVvbtrZt58xhPR9vy2ILiMz5C+cvnL9YtgzyIA/yLl9WPIEG0AAadO6c+mXql6lfTp7Mej44jvuv7bkGMpAhNhZewkt4yeA8lz3Yg/3EiebS2+ptWXwBafBNg28afFNQgJfxMl4eOhQiIRIiRVHpPOg23abbCxemDk0dmjq0a1fW88Jx1igmJiYmJsbGpmhJ0ZKiJVu2QCZkQma9eoon8pvF8uho1vPyriy+gMjUo9Sj1KPOnJEWuVetUjyB17vBaDttp+3btvH28BynvHoX6l2od2HFCpgIE2FiQIDiCTiBEzi9fCkOEYeIQ0aPZj0f78tqCojMxtfG18Z3+nTp6snsbKXj00k6SSfLlBEjxAgx4ocf0takrUlb4+LCel44zpLp/HR+Or9Jk6ArdIWuDK+qfggP4eHkyZ5xnnGecdevs56X92V1BcQ93D3cPfzFC/GIeEQ8MmQIjsExOMZoVDyRCIiAiBo1jI+Nj42PDx5M9Uv1S/WrXJn1/HCcJZEWyYOCoBk0g2aLF7PKQ/o9s3+/+lP1p+pPGSzWm4jVFRCZfHIdmkJTaPrll8wSCYAACGjaVOwsdhY7HzrEt/1y3PuTtuV26wbloByUW79e8QPFsm2wDbb9+qthomGiYeKwYdLNqkSs56ekWG0Bkf3i/4v/L/7z5sEiWASLTpxglkg7aAft3N3tp9hPsZ+yb9/FwIuBFwPLlWM9PxxXmqRUT6meUr1DB8zADMzYsaO41ZDSXm/WwURMxMTBg736ePXx6vPgAev5KWlWX0B69+7du3dvo9GmjU0bmzYDBsj7spkl5Au+4OvjU0AFVEBHjpyrfq76ueoffsh6njjOnEkXPXXpIjQQGggNYmPBHdzB3d6eWUIa0IBm3jx1kjpJnZSQwHp+TIUfbPsdvbfeW+8t96DZt49W02pabWPDLKECKICCjAzjbeNt4+327S31mwzHvYviNY5P4VP4dMMG1v9ecQ/uwT1xcaq5qrmquZ07S6+slD82oBSrfwL5veJvDINhMAw2g4N/DuAADm5uNp1sOtl0SkxM7pDcIblD3bqs0+I4lnS7dLt0u8LCaDyNp/Hff8+6cEBjaAyNs7JsA20DbQMHDrT0wiHjTyB/Q19HX0dfJzJSug/gn/9knY98rwR2x+7YvWdP1XLVctXy06dZ58VxpnSMjtExsrUtX698vfL1Vq2CnbATdo4cyToviIZoiH7yBCMxEiN9fdUv1C/ULxh0vGCEP4H8DXGnuFPcOWaM0veM/Bn5YhuxQCwQC44e1Q/SD9IPGjKEdV4cZwpyy5Hy/y7/7/L/3rvXbAqHfLPkABpAA3r2tLbCIeNPIG9I3l5rv8V+i/2WxERwBmdwbtKEdV4yaZ/5118/O/PszLMzkyZ9hp/hZ2gwsM6L496F3OQQvMALvH74gTbQBtpgBq9udaADHREOxsE4ODhY7aB2UDts3sw6LVb4E8gb8rnrc9fn7uPHNpdsLtlc+vxzVifZ/4z0Dvhf/yrfo3yP8j1OnJAuxqlTh3VeHPc2dIG6QF1gcDBdp+t0/fRpsykcskpQCSpNmWLthUPGn0DekXR1ba1aWB/rY/1Tp+T27azzkuHn+Dl+nptLHagDdRg9WhOtidZEb9nCOi+O+29n652td7Ze+fJ2D+we2D1Ys0Zq9TNgAOu8/kANalDPnatBDWqw9LVdNxVeQN6Tvqy+rL5skya0iTbRphMnwBVcwdX8WpKgP/qj/8aNLy+9vPTy0vjxfpX9KvtVzstjnRdnnaST4p99hvWwHtbbuNHcvoAVi4d4iF++XDNDM0MzIySEdTrmhheQElL8zjYIgiDowAGaTJNpctWqrPP6g9fbDekSXaJLAwZoPbWeWs+zZ1mnxVk2eTG8aGPRxqKNy5ZJP4dffCEduDPDi9ZeFw71dPV09fTQUEtrQVJSzO8vrpRLu5R2Ke1Sw4bGG8YbxhsHDyp9t/Kbku9gpmbUjJp99VVuam5qbuqXX0qL769esc6PK93kGzilXYL9+0stPZYtk3cRss7vz+BqXI2r581Tb1BvUG+YPZt1PuaOFxATyfDP8M/wr1GjaF/RvqJ9hw5J2/4aN2ad15/aC3th77VrQoQQIUSMHq3KVeWqcg8fZp0WV7rI99yIN8Wb4s2vv5Zb87DO60+93lUFm2EzbJ48WZOoSdQkLlvGOq3SghcQE5PbtIvdxe5i97g4aA2tobVWyzqvv3ULbsGtH36waWTTyKbR1KkeTT2aejS9epV1Wpx5kVr/1K8P5+E8nJ8zhwbSQBrYrx+z7rdv6vU5DryAF/DCsGHqCHWEOuLf/2adVmnDC4hC0kPTQ9NDy5Y1bDFsMWzZuBH2w37YHxjIOq+/ZQd2YFdUhP2wH/aLirLxt/G38Z87V7pX5ddfWafHKUveHi6GiqFi6MyZuApX4aqgIGZdb9/W65Pj0oVuPXoUX+vAvRNeQBRW/G7YU++p95w5U/qmNmeO2S4m/t5FuAgXX7zAR/gIH61fD7fhNtyOiJC+wd28yTo9rmRJu6XUauyCXbDLpEmYgzmY06tXqSkYstebR7AKVsEqnTtb68nxkmb+v7AsnLQNuEcPGkJDaMimTRAMwRBceu4BkRfjwR7swX7HDngMj+Hx0qXSQav0dNb5cW9Gun/G3j5/Sv6U/Cldu0q/aEeOhP/Af+A/bdqwzu9dyTcB2kbaRtpGDhrk5ubm5ub25AnrvCwFLyBmInlz8ubkzc2b22yw2WCzYds2CqdwCm/enHVeb01u9XAKT+Gp06dpAk2gCZs3C2pBLahjYlSoQhU+fco6TWune6B7oHvg5oaDcBAOGjSIRtAIGjF4sLmeY3pjry9ygm/hW/h2/nw1qEEN8+ZZS3dcpfECYmaknltlyjhUcKjgUGHZMtpMm2nz6NGs83pfGIIhGPLqFTWhJtRk926chbNw1ubNzz5+9vGzjw8d4r27TCMtKC0oLahZM6Of0c/oFxgIDaEhNOzTx9x6ub0vuUs1DaNhNCw4WDr4d+AA67wsHS8gZi51aOrQ1KFdu4qzxdni7HXrIAdyIOejj1jnVWIqQAWo8OwZ1IAaUOPoUTpP5+n8oUPSf3nwoFar1Wq1WVms0zRXxQf0ooqiiqJat5Zegfr7Q12oC3X9/c32hHdJqQf1oN6+fbbzbefbzh86lG/uUBYvIKVE2pq0NWlrXFyMHY0djR03by7t76bf2OvFT2gBLaDFoUMUQzEUk5QEBASk1+dp87R52suXLe0JRl6TKNxZuLNwZ9OmVEiFVOjmJj3B+fhAA2gADT75BOpAHajTpInZb5stsYmRNnHAFtgCWyZPVieoE9QJa9fyk+Js8AJSyki7uARB76P30ftMmYI61KFu3rxStyumhBS/GltEi2jR1avSbrasLHgCT+DJL79AJmRC5s2bEAuxEHvvnmAr2Aq2Dx8arhiuGK48eGBIN6Qb0u/fl7ot5+eXVF5SAShXrqBWQa2CWh9+CD2gB/SoXFl0FB1Fx6pVcTpOx+m1a6OIIoqurlSbalNtV1f8BX/BXxo1opW0klY2agRFUARFdnas55m5i3ARLiYkCIOEQcKgUaOktbQbN1inZe14ASnldHG6OF2ctzfoQQ/69eshAAIgoGlT1nmVNjgNp+G0vDxqSk2p6R+fZDAO4zDu+XNwBEdwLCqiAAqgAAcH6c56J6fi/2ETaAJNKlQoNduyzVU2ZEN2Tg7sht2we+JE3k3aPPEfcAshtZe3sxMOCAeEAyEhcAgOwaE5cyiCIijC0ZF1fhz3V4p7syVREiVt2EAiiSROny41+/zPf1jnx/3feAGxUMVNHRcaFxoXrlgBE2EiTAwIYJ0Xx/3G61dT0pPfxInSponMTNZpcW+GFxAroe+p76nv2bYtJEACJCxZIl3co1azzouzMj/Dz/DzmTPCDGGGMGPWLN60s3TjBcTKyIvwqYWphamFAwfSETpCR+bNM9e281wpNwfmwJzkZKkFyqxZ6iR1kjopIYF1WlzJ4AXEyhWvnbgJboJbv37QHtpD+7CwUnsSnmMKV+AKXPHzz3AKTsGpxYtV2apsVfa+fXybrWXiBYT7DbnZo06n0+l0HTpgMiZj8uTJ4AVe4NWqFev8ODPhBE7g9PIlREEURG3fLnqIHqLH8uWeQZ5BnkEXLrBOj1MGLyDcG5GeVFq2FLYJ24Rtw4bRGBpDY3r1gqfwFJ5+8AHr/DjTwlbYClvp9XAADsCBqCjRQXQQHbZtk3ZJPXvGOj+ODV5AuHci9+yy22O3x25P9+5YA2tgjaAg7IbdsFu7drSaVtNqGxvWeXJvKQzCICw7G/+F/8J/7dgB/uAP/tu38+7K3P+FFxCuRMktV8T54nxx/oABpCUtaQMDoTpUh+oajdW03DB38RAP8ZcuwTAYBsP27xefic/EZ7t2eTbybOTZ6Nw51ulxpQMvIJwizu04t+PcjmrVbLW2Wlttx47kS77k6+8P38A38M2nn5b6NuLmpjJUhsr/+Q8GYzAGJyaCAziAQ0KCdFI+IYFfAMaVBF5AOKbkRfv0wemD0wc3bWocYhxiHNK6tdS7qmVLPI/n8bxKJZ0faNzYWnt+FXt9lzfsgl2w69IlaZNDWhokQRIkJSaCG7iB2+nTqueq56rnmZl89xNnSryAcKWCvObiuMZxjeOa5s3FlmJLsWWjRtL5lfr14SgchaP16klPNHXr4iW8hJdq1qS21JbaVqkCQ2EoDHVwYD2OYvLFR5mQCZn37mEWZmHWjRvUnbpT9+xsfIEv8EV2NsZjPMZnZhoWGxYbFp8/j02wCTa5ckVavC4qYj0MzrrxAsJZBfneDIOPwcfgU60aqlCFqipVxCPiEfFItWpwAS7Ahb/YTRYGYRBWpgy2wTbYxtGRjtJROvrqFSyFpbD0v7r4roW1sPbpUxpJI2lkYaFUyB49EiKFSCHy0aOCGgU1Cmo8epS/LX9b/rZHjyytDT3HcRzHcdzf+n9uh5AlDugemwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMC0wNC0xMlQxNjowMTo0NCswODowMIJr0qMAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjAtMDQtMTJUMTY6MDE6NDQrMDg6MDDzNmofAAAATnRFWHRzdmc6YmFzZS11cmkAZmlsZTovLy9ob21lL2FkbWluL2ljb24tZm9udC90bXAvaWNvbl83bWs4d3lqZnM4L2RhbnF1eHVuaHVhbi5zdmc+CJNWAAAAAElFTkSuQmCC"

/***/ }),
/* 37 */
/*!******************************************************************!*\
  !*** D:/uniapp/douyinapp1/static/icons/musics/usual/kuaitui.png ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 38 */
/*!*****************************************************************!*\
  !*** D:/uniapp/douyinapp1/static/icons/musics/usual/bofang.png ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 39 */
/*!******************************************************************!*\
  !*** D:/uniapp/douyinapp1/static/icons/musics/usual/kuaijin.png ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIEAYAAAD9yHLdAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAATvRJREFUeNrtnXlcTvn7/6/r3G2iQpYhWymMaDl3qUZDBmNtMJQ9+56tGGNPGHuDsY01jbUFIyOMXYi6z12RsctQGJOhaL/P+/fH6fT5fcenj6Jzn/uu9/Mfj3R3X6/zrvtc5/2+NgAKhUKhUCgUCoVC0RYotwAK5VNICkwKTAqsUyd/bP7Y/LFNmii6KLooutStS1yIC3GxtCTfk+/J95aWTBqTxqTVqkUakAakQc2asA22wTZzc0zDNExTKEg8iSfxiOAFXuBVvfp7hnpDb+idk4N7cS/uzc0V/5vcIDfIjcxMOAtn4WxWFm7ADbghIwO+hW/h27//hsfwGB6/fImbcTNu/vvvQvNC80LzJ09wES7CRU+euLi6uLq4FhTIvY4UysdAHQhFJzhHzpFzxMTEnDPnzDl7ezADMzBzcIBwCIfw1q3BH/zB384O+kN/6G9tDWthLay1toZsyIZsU1O59ZcVnISTcJJGQxaQBWTB06ewE3bCztRUaASNoNGDB2iHdmiXkoKzcBbOSk5mxjBjmDHJyY5rHNc4rvnrL7n1UygA1IFQJIYQQghhmKRhScOShn3+uWaqZqpmatu2whN927bwC/wCv7i6YmfsjJ3t7EgciSNxBgZy69ZVcCWuxJUvXpAepAfpoVaTlqQlaXnlivDd2FjD/Yb7Dfdfvy44mnfv5NZLqdhQB0IpF9Rr1WvVa+3sNG01bTVtu3VjJjOTmclff008iAfx+OILGAJDYEiNGnLrrOigO7qje2EhWU6Wk+WJicADD/zZs6QD6UA6nDgBBAiQ2Fh6dEYpD6gDoZQK4YjJwMAswSzBLOGrrzAaozHa2xu+hC/hy65doSbUhJq2tnLrpPxvcA7OwTlZWeQoOUqOnj4N/aAf9IuJEY7SDh8WHMvff8utk6IfUAdC+T+IR06qBFWCKuGLL5hYJpaJ9fGBOIiDuP79yXfkO/Jd3bpy66SUL2JMBuzADuzi4kgaSSNpEREGzgbOBs7799PYC+W/QR1IJUc8euIL+AK+YPRo3IgbcaOfH4kiUSTqs8/k1keRmSRIgqT8fNyDe3DP8eP8Sn4lv3L79ocPHz58+PDECV9fX19fX41GbpkUeaAOpJJwz/+e/z1/Y+O3UW+j3kZ9+y2pSqqSqmPGCDsKLy9QghKUSP8eKKUCB+EgHPTkCblNbpPbO3fyVfgqfJUdO1xzXXNdc588kVsfRTvQG0YFJSE+IT4h3sJCSAMdPhzaQBtoM3Mm+IAP+FhZya2PUsHYClthK8/DClgBK44fx/24H/f/8AM7gZ3ATrh6VW55FGmgDqSCwLlz7py7rS1kQRZkTZ9OIkkkiRw+XF/rJCgVhOtwHa5fvIgrcAWuWL3a+ZHzI+dHx44hIiISIrc8yqdBHYieIuwwGjVCBhlk5s4V0jdHjqR1FBRdBgMxEANv3uRX8av4VcHBSheli9IlMpI6FP2EOhA9Iblrctfkrg0aFHYp7FLYZeZMco/cI/fGjYNRMApGGRvLrY9C+RjwB/wBf7h+HVSgAtWSJWwqm8qmRkfLrYtSOqgD0VGEHk9VqxaeKTxTeOb77/Ee3sN7gYHkIrlILlapIrc+fQWDMRiDX72CVEiF1NevoQpUgSoFBWQj2Ug2vn1b/MLrcB2uv3tXfAToBV7ghQh5kAd5hoY4ASfghGrVyElykpysUgWOw3E4bmkJjuAIjkZGcl+n3rIKVsGq06f57nx3vvv06a5+rn6ufjdvyi2L8t+hDkRHEOovENWB6kB14JAhxIgYEaNly2jQu4hQCIXQt29xH+7DfSkpZBAZRAbdvQuX4BJcevwYozAKo1JT4Tv4Dr5LTYUTcAJOpKcrxivGK8ZnZNxxu+N2xy0jQ+q009iXsS9jX5qZVa1VtVbVWpaWZAvZQrbUq0dGkpFkZKNGuApX4aomTchOspPsbNIErsAVuGJtLfT4sreHEAiBkAYN5F5uuREr6qEZNINmW7cW/lP4T+E/Cxa0SW+T3iY9I0NufRQB6kBkhsvj8rg8R0eoD/Wh/s8/k1PkFDnl5ia3Lq1R5BjgJbyEl3FxaIqmaHrlChyEg3AwKYm/wF/gLyQlKZVKpVL56JFwVs7zcsuWiqtWV62uWtWsafDU4KnBUwcHTMAETHBwYLwYL8arTRsSQSJIhKcn1IW6ULdxY7n1ao09sAf2/PMPGUwGk8Fz5wp/Dz//XNH/HnQd6kC0THHX2Z/MfzL/ad484Wjku++gAAqgwNBQbn3ljimYgml2tpDWef487817894nT5J35B15d+nSo78e/fXor+RkWpBWNhI3JW5K3GRlpRmlGaUZ5emJzbE5Nu/YEYzBGIy7diX7yD6yr2FDuXVKhhmYgdmlS/xufje/e8wY16WuS12X3rkjt6zKBnUgWkLImvL0FJoMbt8unLk3by63rnIjAiIgIi0NoiAKog4dgmEwDIb99lv+5vzN+ZsvXvRI80jzSMvJkVtmZSE+LD4sPqxVK8aUMWVMu3WDdEiH9D59wARMwMTdvaIUjmIABmBAbi4kQAIkLFnCn+fP8+dXrqTNIrWD3v8B6Sop/VL6pfQzMsp1y3XLdVu8GO7Dfbg/YwaMhbEwlmHk1vexFLcTX0AWkAWRkbgDd+CO8HDnNc5rnNfExtIjBd1GTP8GBAT08REGW/XvD0EQBEGurnLr+2SCIAiC4uOZjkxHpuPgwc7TnKc5T7t3T25ZFRXqQMqZhISEhISEFi2Y9kx7pv3evULWFMvKravMiJXFb+ANvDl7lgSSQBK4davwzSNH6BNexSJ+bvzc+LnNmzO/Mr8yv44YIWSVjRolxKZq1ZJbX1nBdtgO2+XkEDfiRtxmz1aeVZ5Vnl23Tm5dFQ3qQMoJlbfKW+U9ZgyshJWwcu1afasAx57YE3tmZJC75C65+/PPuBAX4sKtW9kQNoQNefxYbn0U7VIcqxtqPtR8aN++4AzO4DxtmhCzc3GRW1+Z+RP+hD8PHWJ6M72Z3qNGOaMzOuPr13LL0neoA/lIxA+YRaBFoEXgTz8J2SGjR8utq7TgSByJIx8+JJbEkliuXy+07d6+nU6yo/wvimN5wUwwEzxlirBD+fZbIaanUMit74O8glfw6v59aA2toXXfvsrPlJ8pP0tOlluWvkIdSBlREzVRkyZNSDVSjVSLitKXIyph3sOdO/gYH+PjRYuc0p3SndIPHqQxC8qnkOiX6JfoZ2/P/8P/w/+zcCHxJt7Eu18/nQ/SF2UHCtmAY8a4uLi4uLjs2ye3LH1Dd3/BOoZqvWq9av1XX+EyXIbLwsPJMXKMHLO0lFtXSYg7DH4Hv4PfERwszG/Ys4emy1KkRKxrIuPIODIuOBi+gC/gC29vnXcoNaAG1Fi79kHCg4QHCTNm0M9J6dDdX6iOoOqn6qfqN3w4dIfu0P3nn3W2VcVduAt3X7/GB/gAHyxfbvbc7LnZ87Vr7TbYbbDbkJcntzxK5UT9q/pX9a+urvxj/jH/eN06aAttoa2Hh9y6SsQKrMDq5MkcRY4iR+Hj41nbs7Zn7awsuWXpKtSB/AuxpQgHHHCwcCFsg22wbcECnXuCErOkjMAIjPbuLXhZ8LLg5cyZ7gfcD7gfePFCbnkUyv+P+LkSRiX364e2aIu2q1fDQ3gIDxs1klvfe+RBHuQlJxsGGwYbBvfo4XDC4YTDiadP5Zala+jODVFmhOCgoSGGYRiG7dgBw2E4DB86VG5d7zEf5sP8xEQSTIJJ8KhRwtktx8kti0IpC9eaXmt6ram5uaGJoYmhybJlxJN4Es/x43WuTuoFvIAXjx+jD/qgT7du7Dv2Hfvujz/klqUr6M4vSibEgj98ik/x6YEDuuY4iittWWCBXbTIxNTE1MTUzY06Doo+4/bA7YHbg8xMNoVNYVMmTRIq5r/8EmIgBmJu3ZJbXzFiz7FO0Ak6xcbG34m/E3+nTRu5ZekKlXYHIhT8mZpiA2yADQ4dgjRIg7QuXeTWJSLOSWAWM4uZxUOHOrV0aunU8u5duXVRKFJyz/+e/z1/Y+PMxpmNMxsHB+tcB4eipo7QGTpD5+7dld2V3ZXd4+LkliUXlc6BiO22q0yoMqHKhOhomA2zYXb79nLrEtJsNRryO/md/L5iBblNbpPbQUG04ptSmRGzH4Uea7t360y7+6Iu0vx6fj2/3tvbFV3RFc+fl1uWtqk0DqR4x7Ecl+Py48d1xnEMwkE46MkTMpfMJXMHD1b6Kf2Ufpcuya2LQtElxDb3Rg+NHho93L4dbsJNuNmnj9y6IAVSIOXdO74H34Pv0aWLq6Wrpavl5ctyy9IWFd6BiDGOvKd5T/OeHjokVMz26CG3LmHi3cWLmpqampqa/fu36d+mf5v+z5/LLYtC0WWKsyQ7ch25jlOmwFpYC2tXrZJ7HAJ2xs7YOTMTjsJRONqxI+vJerKeCQlyr5fUyH+mKBHh4eHh4eEKRV5eXl5e3p49OuM4AABg61biQlyIS6dO1HFQKKVH6JxAiNgcEUMxFEM7dRK7RMulSzh6NjcnjUgj0igmRmynL/d6SU2F24EUP6E04hpxjUJD4QgcgSN+frIJ2gE7YEdenjDSdORI2jKBQil/uAAugAto3Bg44IA7doysIWvIGhlv4FZgBVbPnpEn5Al54u4uxDL//FPudSpvKtwOpLgAUG7HUZStwSQzyUxyly7UcVAo0iF2jc6OyI7IjvjiC/gRfoQfY2JkE5QGaZBWrx6exJN4MiZG6KFXvbrc61TeVBgHIvTg8fMrrhyXieIeVKa8KW/q4eEc6xzrHHvhgtzrQ6FUBsTWI2QqmUqm9uoFOZADObt2ySaoG3SDbi1b8gP5gfzAiAixYFnudSov9P4IS8iu6tABkzEZk0+ckK1XVVEBFOlKupKunToJO45nz+ReHwqlMiMeaat3q3erd69aRVqT1qR1YKBsgvbCXti7c6cyRBmiDBk1Su71+VT0dgcSbxJvEm/SsCGmYiqmHjwol+PAeTgP56nVzAnmBHPCy4s6DgpFdxCD7uxwdjg7fMYMjMEYjPn+e9kEDYbBMHjkSM6dc+fc/f3lXp9PRe92IMWT0kLMQ8xDLl2Sa0KaWClusNBgocHCrl0dHBwcHBz++Ufu9aFQKB+Gq8fV4+p9950wlmHFCq0LMARDMCwo4K14K96qQwd9rR/Rux2IubW5tbn1hg2yjdYs6tKZF5cXlxfXrRt1HBSK/sE+Y5+xz1auhHEwDsYtXKh1AUV1KwqlQqlQRkYmbkrclLjJykrudSkreuNAuKHcUG7oyJFCSwMZzg6LYhzMd8x3zHedOnmkeaR5pL16Jfe6UCiUj0eZoExQJgQHw1k4C2dXrtS2fRJFokjUZ59pUIMa3LdPrF+Te11Ki847EPVa9Vr1Wjs7Up1UJ9XXrdO2fTGrCr3QC706dxayql6+lHtdKBRK+aGcqZypnDlrFkZjNEZv3qx1AW2gDbRp1842zjbONm72bLnXo7TobAxEiHUYGFjUsqhlUSs2lpwip8gpNzetLUwwBmPwq1f8fH4+P79tWyE4fvu23OtCoVCkQ8jaYhh1R3VHdceoKLKKrCKrevfWln10R3d0LyyE9bAe1rdrx05gJ7ATrl6Ve11KQmd3IOZvzd+av120SNuOQwxugQEYgIGvL3UcFErlQcja4vm8O3l38u4MGoRf49f49bVr2rJP4kgciTMwgC2wBbbs2SMO3pJ7XUpC5xyI6rjquOq4u7vQnGzWLK0LqAN1oM7IkWwUG8VGnTkj93pQKBTtI8Q4c3IKNxVuKtzUuzfYgA3YaK8VCdlJdpKdNjaGGkONoWb1arnXoyR05ghL7Jqbm5WblZvFcfAD/AA/2NtrbSFu4A28sWaNmC8u93pQKBTdQWhF4uREqpFqpNqVK+QiuUguVqkiuWEVqEBFiNASpXNnXXuw1ZkdSG5EbkRuxJw5Wncc/bE/9j937s2wN8PeDJOxwIhCoegszuiMzpiYKKT9jhunNcNKUIISUaig37xZmIuiBcdVSmTfgST6Jfol+tnba7w0XhovjtNaRXkABEDA06cGLgYuBi5KpeMaxzWOa/76S+71oFAoug/XhGvCNdm6VUjDHTNGW3bxKT7Fp8uXs73YXmwv+bO1ZNuBiD1qNPM08zTzNm/WmuPYClthK88zGkbDaIYMoY6DQqGUlbyCvIK8gqlTYQ7MgTkpKVoz3A/6Qb8ZM9Seak+1Z8uWcq+DbA6Ey+fyuXxfX8iCLMj68ktt2cW/8W/8e8UK2iWXQqF8LGKQXVFXUVdRt39/bIftsF1OjtR2xSwtfgQ/gh+xfr3c66B1B1J8hrcYFsPi5cu1ZVf4BXOcMRqjMQYFafu6KRRKxcMpzCnMKSwlBRpAA2gwd672DIMTOHXsKByleXvLdf1adyCGvxr+avjrjBnQB/pAnyZNJDdYNBGQv8Bf4C8MHmwfaR9pH5mfr+3rplAoFRfn2863nW+vXSsm5WjLLrEltsR29Woxi1Xb1601BxI3IG5A3IC6dfEW3sJb2qvvQBM0QZMlS2hBIIVCkQqxbTz6oz/6jxunrSMtWAErYEWzZrmvcl/lvpowQdvXrTUHYpRqlGqUOns22IM92FetKrU9dEM3dLtxQ5gEJkO7ZgqFUulwnuY8zXnavXvCiUdwsNYMT4SJMHHuXGEnUq2atsxK7kCSuyZ3Te7aoAEYgzEYayF/uijLCqMwCqNGjRKG2RcUSG6XQqFQishSZimzlKtXw3yYD/MTEyU3aA3WYF27dp5TnlOe06RJ2rpOyR1Iwd2CuwV3584lISSEhJiYSG0Pq2JVrLpzp3Mv517OveLjpbZHoVAo/6YDdsAOWFjINGeaM80nTRIryiU3vBE2wsaZM7XVQ0syByIMj2/UCObBPJg3cqTUFyL0zsrMzE/PT89PnzdPansUCoXyIZx/dP7R+ccrV3A8jsfxERFS2xMmLFpaGj43fG74fPJkqe1J5kBwKA7FoVOnaqtAkGwlW8nWJUvcD7gfcD/w4oXU9igUCqW0aIw0RhqjGTPAFEzBNDtbantkAplAJkyZInXrk3J3IOLWCf/Cv/Cv0aOlXSYAsUum+Xnz8+bn5S+soVAolH/jmuua65r75Anexbt4Vwv3qYEwEAbWqWPEGrFG7JAhUpkpdwdiUM+gnkG9sWPJ7+R38rv0Z3DkPrlP7i9ebLfBboPdhrw8qe1RKBTKx1I4oXBC4YTVq8Ujd6nt4Ut8iS8DA8VBWeX9/uX2huIEQUHwlClSLwy0gBbQ4sED4YvduyW3R6FQKJ9Im/Q26W3SMzKgN/SG3mvXSm2PbCQbycbmzdXWamu1dY8e5f3+BuX1RmYqM5WZqmdPso/sI/saNpR6YdAADdAgOFjpqnRVVuA0XbHpJDebm83N7tEDMzADM/r1g1fwCl59/jnJJ/kkHxGCIAiC1GriTbyJ96+/KtOUacq0EyfECWtyX4eukpCQkJCQUK8ecsghN3YsqlCFKi8vMowMI8Nq1oQ/4U/48/Fj2AW7YNeJEyZmJmYmZmFhQkeDt2/l1k/RT/gJ/AR+QkgI7sE9uGfyZBgCQ2BIjRpS2SOexJN4TpgAqZAKqdHR5fW+5dbOnVvALeAW/PYb6UV6kV7du0u1EPACXsCLx48zu2V2y+xmayumy0lmTyaEbpu1a/OD+cH84MhIaANtoE27dqX9eRyJI3Hkw4cwHsbD+I0beRfehXfZsUOoi3nzRu7rkxsugAvgAoYOJU7EiTht3lzaAlcMwAAMyM0lGSSDZKxbR3aRXWTXsmV0XSkfg2q9ar1q/ZIl0BbaQlvpemnhJJyEkzQa/if+J/4nGxvh7/XTJyx+8hFWvEm8SbxJw4ZwCk7BqS5dpFqA4oWYjtNx+rp1FdVxJAUmBSYFVq3KL+GX8EsuXCir4xARR2KSNqQNabNmDYZhGIY9fcrZc/ac/caNwpN3ixZyX6+2UddT11PXGziQtCAtSIvdu8vaGaG4nmk37Ibds2bhY3yMj+/dU3VRdVF1mThRPMqV+zop+oGmrqaupu6GDWLPPqnsCEdZCgW6oAu6lF9ZxSc7ECaHyWFyRo0SBUq1AFAdqkP1N2+yY7Njs2O3b5fMjsxoWmtaa1ovWgRmYAZmn39ebm88HIbD8GrVSBgJI2ETJwpHNrduqZ6rnquenziRUD+hfkL97t2lCrbJjZDOWLMmH8KH8CGbNomT3j75jYsqgIVJmhs3mmvMNeaaGzfk7pJK0Q/a9G/Tv03/58/hOByH43v2SG0PW2ALbDFyZHh4eHh4+Kffrz/6RiGezQul+sOGSX7h43E8jt+2zbO2Z23P2llZUtvTNsKTq4kJSSJJJEn6wsviG2gapEFaly4YjdEY/dtv3CJuEbfo9m0ukovkIidPjn0Z+zL2pZmZ3OvzqRg3NG5o3HDQIGgGzaBZ9eqSGUqCJEhq0UKYVHf0qOqx6rHq8Zkz8efjz8efd3aWex0ougnTgGnANAgJkbpiXYxR24y2GW0z+quvPln3x/4gF8PFcDFubpK3ZRcXNAuyIOvnnyWzIzPVoTpUhxYtpA6mfRBv8AZvOztiTayJ9fr1ps1Nm5s2f/qUc+fcOfe1a4V/bW3lXq+yIsQ62rbVuuG/4W/4+6uvmP3MfmZ/QgJXm6vN1d61K3FT4qbETVZWcq8LRTcQBtzduiWEAi5elNoe1sSaWLN//099n48/quCAA87XV+oLhS7QBbqcO8fGsXFs3P37ktuTCY2VxkpjVb++3Dr+jVjPIxxRTp1KHIkjcbxzR3Akx44JLWu+/rp4R6qrvIbX8LpWLdnsj4WxMJZhyAlygpwYPlzTQdNB0+HuXS6Wi+Vig4O13UWVoqNsgA2wQfojenRER3Ts0+dT54iU2YEUn5G/hbfwVnoHggfxIB7ctk1qO3LDGDFGjJGEMaTyQrwRbiQbycYePZBBBpmTJ4Wjrzt3VF+pvlJ9NXWqzt0QV8AKWKFDsZ1syIZsU1NShVQhVebPzw3JDckNefRIXL/yOqOm6BeZdTPrZtaNjMRgDMbgV6+kskMWkAVkQc2aOVdyruRc6dTpY9+nzB8oVYIqQZXwxRfgAz7gI90WXFxAsz/N/jT78/BhqexQyomioy9YBatg1dq1uX1z++b2ffKEC+VCudDVq4XsMmtruWXqLC/hJbysVUtcP9tBtoNsB6nVqiWqJaol0mc3UnQDIbs0N1fY6e/bJ7U9pgfTg+nx8RuBMjsQPI/n8bwWskuaQlNoeugQbVGipxQFq0lr0pq0DgwsfFv4tvDt/fuqAaoBqgG//y5mKen80ZdMkGvkGrnWujV0g27Q7cSJ4nXL4/K4PEdHufVRpIWfyk/lpx44ILUdMp/MJ/N79PjY7MuyO5DZOBtnd+sm9YXhdtyO2w8elNoORUsUHX3BTJgJMzt1ErOU1B5qD7XHH3+IRzdCfYqpqdxydQ5x3aaQKWQKx6kmqyarJoeFiZX0csujlC8uNV1qutS8ckUsnJbMUNHON/Fo4tHEo0plWX+81A5ECPbVr082kU1kU6tWkl1QbagNtf/++/Wb129evzl/XjI7FJ1A7NUjHt1gDayBNdLTuR+5H7kf160TKsYbN5Zbp84gOuLhMByGDx2Kt/AW3rp3T9VK1UrVavnyipJ2XdkRZ6xDAARAQFSU1Pb4xfxifnHZNwal34HUg3pQr1u3civAKgFhGP3hwxW10pzyAV7Da3htYUHakXak3ZQp8BP8BD/dv895c96cd3i4KkwVpgr78ku5ZeoMYiV9UWV8lX5V+lXpd+uWcNTl51dRC0MrCzgVp+LUyEjJDe2CXbBLSgdiB3Zg9/XXUl8HH8lH8pHHj0tth6IfkDgSR+IMDEgQCSJBPj7CDfPiRa4b143rxnGqfqp+qn7Dh9/zv+d/z9/YWG69shMCIRDSoAG5SW6Sm7t3q6upq6mrxccLR10dOsgtj1I27lvet7xvef069sSe2DMjQyo7OAbH4BhXVzVREzUpfaFtqR0I+Y58R76TsBArCZIgKT8/t3Fu49zGZ85IZodSISBLyBKyxNkZZsNsmL1rV6ZXplem15Mn4lFOcY+2Sg65SC6SiywrHImcPSsG4+PD4sPiwyQ8iqaUC76+vr6+vhqN0KT299+lsiO2oiLPyDPyzMOjtD/3QQcieKQmTaRO24WO0BE6xsZW1FYluoLYlVNuHeWO2JOq6CiHuc5cZ64/eKCqr6qvqr9vHzyCR/CIBpvFYDzjxDgxThynSlGlqFI2bBAKQmUstKT8T3AdrsN1MTFS2yGRJJJEln6j8EEHwg/lh/JDpW8Bgb/gL/jLqVNS26n0WIEVWHXpImyJZ82SPMtDLgqgAAoMDSEaoiF64MByb06p74jrkwu5kDtpktDa4v59rh5Xj6v33Xdibza5ZVIECo8UHik8cuqU1L2y4CJchIuenqV9+QcdCNqiLdpK70A0EzQTNBNiY6W2U9nhZ/Oz+dn//MM+Y5+xz1aufPD2wdsHb5s2xdt4G2/36wfLYBksu3BBbp16x2W4DJevXi12zEXdo+WWVWrE5IVj5Bg5tmKF+Xzz+ebz//iDW8mt5FYOGEDrdeSluGtvOIRD+L17khlaDIthsatraVucfNCBEDNiRsxcXSUTXNQHv/rC6gurL0xIkMwO5b8inrGyg9nB7OCoKGWkMlIZ6eWFrbAVtnJygr2wF/bu3CkOUpJbr66CKZiCKXl5omMmr8gr8srWFkzABEw2bgRDMARDPZqcWdQklXQkHUnH/fvVtdS11LWuXo3PiM+Iz5ChKSVFIAiCIOjyZcnev6jFTrZ/tn+2v739h15eogMp7sXTHbpD95YtpdKLR/EoHo2PpxXnugVrzBqzxklJyhBliDJk1CihA0G9esIZ+rRpYAM2YPPpE80qKsLEt7//Vtor7ZX2/v4KA4WBwqBVKwzCIAyKiJBbX1khp8gpcsrNjUllUpnU2FjVa9Vr1evoaH3tzqyvYD2sh/UkdCCinWpYDas5OHzodSU6EOsk6yTrJFtb0SNJpvRz+Bw+j4uTekEon4YzOqMzvn6tPKs8qzy7bh25T+6T+7a20ApaQasBA2AJLIElV67IrVNXcWrp1NKp5d27bDQbzUb7+vIsz/Jshw5C3RPHya2vzDyAB/CgZ08ylowlY1NShJ5dISHi4C655VVYHMABHKT/nDE3mZvMzdatP/i6Er/xgnnBvJC+5w6/jF/GL1OrpbZDKV+EJ+yCAqWx0lhpfPCg8rDysPJw27Z8Fp/FZ7Gs8KqtW4UbZE6O3Hp1DVd0RVc8f975rfNb57cuLoQnPOF9feEwHIbDqaly6ys1juAIjkZGQs+u6dONfI18jXzv3+eWcEu4JbNm0fqc8uX+rvu77u+6exdMwRRMs7MlMxQCIRDyCQ4Eh+NwHK6FPHECBMiNG5LboWgFVy9XL1cvtVqpVCqVynHj8r3zvfO9ra1hHIyDcQsXYl/si32fP5dbp64gtqwQHHJEBOlNepPe9vaC4503D0IhFELfvpVbZ6kpGohGupFupNvy5Zm9Mntl9rp5k9vL7eX29u0rtzx9R4xZCiNwb92SzFAmZELmJxxhkUySSTKbNZNMYFHhYJUVVVZUWXHnjmR2KLLifsD9gPuBFy+UCcoEZUJwsLGLsYuxS+PG4hM3rsW1uFb6M119wcXFxcXFJTubfce+Y98tXUr8iB/xs7bGi3gRL65fj+7oju561OKnJtSEmra2pAVpQVpERnKWnCVnGRdHg/GfSBqkQVpyslRvLzQ7/eyzD/VWK3kHMhSH4lAJR9W2gBbQ4vZt+0j7SPvI/HzJ7FB0CvH3LT5xs7+wv7C/eHoK9SgeHsJckf379S5rSSLEYDw7nZ3OTp86VbNDs0Ozw9kZUiAFUk6ckFtfWSkOxkcxUUzUpUtioSdtmllGOkEn6CT9yY1JqkmqSWrJfqDkHcgIMoKMkHAA0At4AS8q7ohaStlQdld2V3aPi1OmK9OV6YMGaf7Q/KH5o1EjjMEYjPn+e4iACIhIS5Nbp9y4+rn6ufrdvKn0U/op/bp1YzowHZgOnTvDaTgNp5OS5NZXasSmrEWFnqQVaUVa3b0rdmEWKuMtLOSWqavgRJyIEx88kNoO48P4MD5lcCBCFkWVKsJAoNq1JVuAN/gG3zx6JPUCUPQTsXCKncfOY+etWGFy3+S+yX0bm+JgsxEYgRHN3nPOdM50zjx9mv2O/Y79jmWF+p1hw4SOA8+eya2v1BQF48UuzMw3zDfMNw8eiMH4T53dXdHgI/gIPkL6ZAvBTskbifcciPFr49fGr5s0kbptO1SDalCtArbQoEjCv4++lK2VrZWtPTyEo5x27aAH9IAekZF6FyMoJ4RgPM8L9TthYSb+Jv4m/s2aYQ7mYM7ixZJn7ZQzQkW8paUYjM89kHsg90BSkjjJUm59ciPEjqV/AMeTeBJPlmEHwl/gL/AXPvtM8hWYATNghh6lK1J0EuEo59Il5XPlc+VzHx/+Kn+Vv9qoEbDAArtokTigTG6d2kZwuG/fsp6sJ+u5YAFmYAZm2NkJ3926Ve+aaiZBEiS1aCFOsuRsOVvO9uzZ+PPx5+PPOzvLLU/biL9fqf++hQ4LdeuW9P33HAhzh7nD3NFCIdAe2AN79GiLTdELhCymZ8+UqEQlBgXle+R75Hs0aqS3BXvlhOBI0tPF9GrNcs1yzXJXV6gFtaDW2bNy6ysr5CA5SA526MDsZ/Yz+xMSuDHcGG5MaGhy1+SuyV0bNJBbn9Z4Ck/haXq6ZO+fAimQUnKX5veD6I2hMTSWLvZRzCE4BIdevpTcDqVS45HmkeaRlpNDbpFb5Nbr13Lr0RWK63UaKxsrG3fsKAbj0Q3d0E2P6rKKRvyS8WQ8GT9sWMGPBT8W/HjnjjgX5lrTa02vNTU3l1umZFiBFVhJtwMhu8gussvSsqTvv+9ADsEhOCT9XAAFKlCBle9ogULRRcRg/JuCNwVvCsROAuPG4UpciStfvJBbX6kRWy8VzYUxOGdwzuDcgweqr1Rfqb6aOrW4x18FAf3RH/2lm1QoZMuWYQdCjpPj5HiNGpIJKuq+67jGcY3jmnfvJLNDoVDKTAfsgB2wsFA46tq6tSChIKEgoVkzGAbDYNiKFXrXlfklvISXtWrBKlgFq9autT1je8b2zOnTcQPiBsQNKPlsX18gKSSFpEg46nYdrsN1JYc03nMgOAAH4IAqVSQTlIEZmEGPEigUfcDtgdsDtweZmcqbypvKm99/L2RntmiBq3E1rt63T/IBR+WM0PzRy8twreFaw7Vqtb4XMKIzOqPzP/9IZuANvIE3JTfTfX8HEkpCSah0+dZkC9lCttC27RSKPsKGsCFsyOPH7H52P7t/8GC+Pd+eb+/uLkx8vHRJbn2lJg3SIK1ePXKP3CP3IiL0dWAW6UK6kC7S3U/FWeklHf29HwPxBm/wlrBgZx2sg3XUgVAoFQHX5q7NXZtfv65spmymbNaundAs85tv4BW8gld60GkiCIIgyNWVW8ot5ZZ+/bXccsrMTtgJO6VvBdVwesPpDae/7xfeP8LaiBtxo4Ttl6/CVbhKe19RKBURNpVNZVOjo0l1Up1UFwfRjRsHj+ARPNLdrEusilWxavfucusos+5hOAyHSf9AbvLU5KnJ0/f9wvtHWDkkh+QYGkqmRAEKUNAmeRRKRaZ4XkxRMN6wmWEzw2bNm8MyWAbLLlyQW9+/EXr/2djIraPMuj8nn5PPpXcgzAxmBjOjNDuQftgP+0nXCgJP4Sk8VXHS6CgUSsnEz42fGz+3efPCuYVzC+f+/DPMhtkwu317uXW9hxM4gZMepSuLZEM2ZEv4wC+aOZB9IPvA+37h/RjIWTgLZ6U7YiJexIt40QllFEpFRO2p9lR71q7N2XP2nP3GjYqVipWKlTdvkiASRIJ8fOTWVyKtoTW0vnZNbhllBUfhKBwlfZNJcw9zD3OP9/2Cwb//g5wkJ8lJCWMU7uAO7kZGQvtpqS+bQqFIyTlyjpwjJiYWSy2WWiydOpUfyA/kB86eDa/hNbzWg3bsRb2kDJoZNDNotm+f3HLKCh/NR/PRxsYICFKmkOXMypmVMysvDyIhEiL/8//v70COwTE4JqEDcQEXcKFtmSkUfURMdxXmdfj4WDhZOFk4paSIXXP1xnFsha2wleeJO3En7sOG6WthM17BK3hFwhOdonUSY1r//vb7MZC6WBfrShiUOQNn4EwF7k1DoVRABIfh6anup+6n7hcXhwwyyISHk51kJ9mpR8HnomwwMoaMIWO++cYl3SXdJf34cbllfSyoQQ1qSh45+8nvvwf34J6S/cH7WVjTyDQyTcLKxuEwHIZXq3bP/57/PX8aC6FQdBHOnXPn3G1tVYdVh1WHo6IEh3HpEplD5pA5bdrIra+s4EyciTOPHCFNSBPSxMND6Nr8229y6/pk5sE8mFdys8NPhewle8nekv3B+zsQD/RAD+mbHGYNyBqQNUC6C6dQKKUnOTk5OTm5Rg2xiy1hCUvYmzehETSCRt9+K7e+j0OlYqYyU5mpXl7sWfYse7ZPH8FxSD8KVms0habQVMLu6XWgDtQp2R+8F0THx/gYH2dkECAgZYMbYktsia3Y5VHCfvYUCuU9hCMpQ0NhZzFiRMHdgrsFd5csEbrYamGcQ3kTAAEQ8PQphEAIhCxezLIsy7Lbt2MsxmIsz8stTyo+1G79k/lAu/j3diCad5p3mnfS70BIM9KMNNP/bpgU3UQ8s+e8OW/OOzwcbdEWbdu1k1uXXIjBbyHNtl8/bIktseUffwjf/flnsAZrsNYfx4GdsTN2zsyESTAJJs2Zk38//37+/WbNxMJFccSv3DolX4dBOAgH1akjmQE3cAO3V69K+vZ7DkTxRvFG8UYLLQfOwBk4o79dMCm6gRhLS0hISEhIGDaMq8pV5aqqVMVn9kX1BySOxJE4A4NPt6hfCI7UzU3tp/ZT+126xK/j1/HrIiLgNtyG202byq2vtBTPuvcBH/DZskUxQjFCMcLOThmnjFPGLVsmDg6TW6e2SOmX0i+ln5ER1IAaUKN+fans4Hgcj+NL9gfvfaByG+Q2yG3w559GR42OGh2VbgFwDI7BMdSBUMqGOMfBqJVRK6NWw4dnvs18m/l28mThidPKilwkF8lFuVXKR7xJvEm8ScOGzBhmDDNm6VJQgxrUQ4YIyTH6121WmONx+jR5Qp6QJ4GBys+Unyk/S06GNbAG1sgtTj7ynuY9zXvaqJHYLVcyQwZgAAaPH5f07fd2IIInf/UKqkN1qP7mjVS68B7ew3vW1pJdOKVCoFKpVCqVUin8+/PPRs+Mnhk9S00trjvwAR/wsbKSW6dcCE+i1aqpiIqoSFCQwk3hpnC7e1fIdhw6VJjfoUeOIwZiIObWLeHIrWdP5QHlAeWBzp2LHQcFAADwFt7CW02aSG2HpJJUkvroUUnfL3lLHwmREJmaCp2gE3RydCx3YcvIMrLMxgamwBSYIvUyUHQdcUuea5Jrkmvi44M5mIM5U6YIyRz/SRslISSEhMitVj7E4DczmZnMTB43LjckNyQ3ZOFC4IADrlYtvVufJ/AEnqSnYxRGYdT8+c5hzmHOYaGhlSWG8bEIc1ikfwDnZ/Iz+ZmpqbAdtsP2979fsgNZA2tgjXQOBH/D3/C3Vq3E4J6A/kw2o3waSYFJgUmBdepoamhqaGqMGJH3S94veb9MmgT7YB/sa9hQ6ixAfUNtrjZXm3fqRGaSmWTmjz8KRxetWgkjW+VWVwZMwRRMs7OFneNPP+WcyzmXc27pUs/enr09e2dlwS/wC/wit0g94DbchtutW0ttxmCUwSiDUR+zA6kJNaGmdPnS5AfyA/nBzCwREiERxFhIaqrUC0KRB/EoCnpDb+g9ZUphTmFOYU7//jAIBsEgY2PoBt2gm9wqdQchKYBlmW3MNmbbmjX8WH4sP9bLS25dZaaoFQZUhapQNTQUv8Vv8dv589mb7E32Znq60ItKbpH6BxIkSFq1kupBC+fgHJyTleUc6xzrHFuGIHrxG7iiK7qmpEheD3KZXCaXHRyEr6gD0XeEHSXDqK3V1mrrHj2EXkNTig4pO3WCI3AEjsitUvdI3JS4KXGTlZXGTeOmcVuwACfhJJw0apTkQVLJLggSIfHMGWYLs4XZMmOGMzqjMyYmCnUacourALyDd/BOvG+WP8SUmBLTGzc+9LqSdyDjYByM00LQ6hAcgkPiQhyVMO+LIgXCmXytWvgH/oF/jB3LeXFenNeECRAFURDVoIHc+nSV2JexL2NfmplV2V9lf5X9s2YJZ80BAXARLsLFKlUExyG3yjIgBr83kU1k08yZxT2mRsEoGCW3uIrD/33QkLCAsDk0h+af4EDy+uf1z+ufkmLc0LihcUONRrInoStwBa64u0u2EJRyRU3URE2cnHiO53huwgThTHvIELAHe7A3NaVPmP+d4p1ZvjpfnT9kiPABXbGCRJEoEvXZZ/qWfow9sSf2zMgQJuItXpx5JvNM5pmNGzvM6zCvwzzpBtJVdsg+so/s8/AQCvwkNKQGNag/vIEo0YGIhTmqx6rHqsf37kESJEFSixblviAexIN4fPEFuUqukqsMQ7MvdIOSjqL4bfw2flvHjsXpodmQDdlyq9VdxOA3d5W7yl1dswaMwRiMHRyEHZrc6spAEiRBUn4+vsE3+GbLFv4of5Q/umCB0Ob7zRuQeiAFBQAA+DA+jA9r2xb+gX9Aupa3AINhMAy+cQNOwkk4WfLLPlyZ2wgaQSO1GqIhGqLL34HAEBgCQ2rUSPwy8cvEL8X3v3VLwqWh/BeuWl21umpVs6Yxb8wb86NHczFcDBczcaJwo6MFn6VF9Vz1XPXcwQG/xq/x61Wr+F38Ln7X11/LravsFwIqUBEiNOvbu5efyE/kJ86Z45rrmuua++SJ3PIqK0JX4S++ELoiS2BAnJMymowmoz9hB1LMPtgH+y5fFr4YOFCqheFr8DX4Gm3bCl9RByI1iX6Jfol+9vaaqZqpmqlTpohHUSSbZJNsU1O59ekbxIgYESMXF+yNvbE3xwlN7vQw+L0MlsGyCxdwGk7DaTNmsJ6sJ+uZkCC3rMqOkJVnair8nTk7QwEUQMGnv+972IAN2Ny4Ubyz/ADMB1/QnmnPtBcdiHQIdSGdOkltp7LDuDPujHtoqMZT46nxFINkY8cKR1EV0HHsh/2w/6+/xEFCktkpmnOjd1lTs2AWzLp7Vziy7NNHGamMVEZ6eVHHoWN8A9/AN15eguMwNJTKDIZhGIaV/n7/QQdyL+JexL2IGzekbm1CppKpZGrnzsKM5crX9E5bkGvkGrnWurXetbgoJTgP5+E8tVr4aty4/P35+/P3N2mCv+Pv+HtKitz65AaDMRiDX73CGIzBmO+/N29h3sK8hYODMCfjyBG59VH+OzgaR+PobpJXSuErfIWvYmNL+/oP3qh9fX19fX01Gi6AC+ACrl8ng8lgMrhz53JXXhQLMUswSzBLELOySn8hlMpFcXfWrtAVuh4+zC/gF/AL1q9XxihjlDGxsUJa6X9ezwEHnNyi5WAH7IAdeXlC77mffsJTeApPLV0q1GW8fi23PEopYYABpksXqc2QgWQgGXjlSmmzKT+4AymmJtSEmmfOSH0B2AJbYAvpPS1FvxDTRvEpPsWny5drFBqFRmFjw0az0Wy0r69wZksfOMTgt1AIHB7Op/KpfGrLluzv7O/s7zNnUsehX4ijhcEbvMHbzk4yQ6/gFby6f58NYUPYkJK77/6b0h8VzYSZMPPECbgJN+Hm8uVSXYcwKKZvX+GruXMlWzCKTiNUYt+5I1TEbt7MR/PRfPS2bcJRSzZNHP43QRAEQfHxQo+pwECWZ3mWv3QJjsNxOC63OMpH0xN6Qk/xfighE2EiTIyJKeuPldqBOBs5GzkbJSdzEVwEF5GWJlUbbSEI2bx5Ap/AJ/CtWwtPlh+uiKToKWKvpDfwBt6cPYtxGIdx69c7P3J+5Pzo2LHiJpsu4AIucovVHYRJdE+eQDIkQ/K8ec5HnY86H/3lF9qUtIKxDJbBMl9fqXvF4QW8gBdiYqA+1IcyjKcq9RFW8R9mPuRD/smTpf25j76gq3gVr/bvL7UdinYRR5HiRbyIF9evF3olNW0qzn1gU9lUNjU6mt4I/8VduAt3X78Wg99vbr+5/eZ2s2asMWvMGoeF0fWqWAhpu02bCh0KWFYqOxiAARiQm8un8+l8+oULZf350sdARIM/48/482+/SXVBxbyCV/DK11dyOxRpKeqRJMz3mDBBGEVavz47nZ3OTp86VTiTp00038MQDMGwoEB0tJpATaAm0NaWncfOY+etWNEBO2AHzM2VWyZFGoTyiQEDpLZDGpKGpOG5cx97NFzmdFn+An+Bv3DiBIZiKIa+fSvmv5f7lRUFjeInx0+On9y2raulq6WrpfT1KJSPpLRHUZT/TdEIV4WRwkhhNG2aU5hTmFMYTT+uLIjzkbhF3CJu0bBhkhvMhVzIDQ//2B8vswMRPZWqvqq+qn50tOBApKtQZ5wYJ8Zp7FjhK+pAdAXxKAqaQTNotmuX8L8bNrBxbBwbd//+f15IeyT9T87DeTifkMAcZg4zh2fMEOYvlP0ogVIxSIAESID27RlvxpuRMuuqqLeZ4QLDBYYLfv1VmEBb9rcp8xGWCDlKjpKjH++5SotQ2OLjk5ycnJycXKOG1PbkAvtgH+yTkSG3jhJpAS2gxYMH4hk8ZmAGZjRuLDiMadPecxw6BllP1pP1/0jZfq50BEAABDx9KnwxbhwbwAawAW5u1HFQAAAUgxSDFIPGjJHc0LfwLXx76pSDg4ODg8PHfy4+2oFkKbOUWcoTJ4qfRCVCCCJVqVJ4t/Bu4d0hQ6SyIzcFBwsOFhy8c6e4QE4uxCZ6VmAFVidPEm/iTbx79GBNWVPWtFkz8Qxe3+oJMB7jMf7mTa3bFT8fk2ASTJozJ/9+/v38+82aKZVKpVK5dSvtPk0BALhe/3r96/UtLSEd0iH922+ltid0JPj0DcBHOxAxiEfMiTkxj4iQ+oLJTXKT3Jw8WWwzLrU9bdMmvU16m/SMDPgSvoQvjx3TmuFQCIXQt2/RD/3Qb9MmwhKWsC1bKj9Tfqb8rGtXcTCQ3t/oukAX6LJ/v1BfotFIZab4AcAHfMBnyxYhacDOThmnjFPGLVsmjkmQezkouoXBAIMBBgMmTCAhJISEmJhIZqjo8549O3t29uxPb13zyTdiEkEiSMS2bZJdsEhRUJ2bwk3hpvTqJbk9uciGbMieOVP8RZf32+NIHIkjHz7E63gdrwcGEj/iR/waNGBT2BQ2ZdIkIcZ1+7bcy1DesO/Yd+y7P/6A/tAf+m8s91l/+Cv+ir8eP45u6IZujo7Kh8qHyocTJjiucVzjuOavv+S+fopuIvT+MzGBNEiDNH9/qe2hIRqi4YEDnrU9a3vWzsr61Pf7ZAciFPpduwZ5kAd50o/Axdf4Gl8HBkptRy7EWAKmYzqm9+4t5v9/9BuKs6k3MZuYTb17Oyc6Jzon2tmxE9gJ7ISQkNK2ba4o8J68J+85Y4bwQLJ//0e/0Wk4DaeTkpgOTAemQ+fObDAbzAb36CHEMug4AkrpMP/G/Bvzb4YOJd+R78h3detKbY8fyA/kB27fXl7vV275MULPFn9/oZL8p58kX4gmfBO+iadnRU/vFWaON2qE/bE/9p89G1bCSljZty9YgzVY165d/MIIiICItDQ0QRM0OXpUY6Ox0dhs2uTq5+rn6qf9s39dR0yXVK9Sr1Kv6t8frsE1uDZ9OulCupAurq7F3YqLslXAAAzA4OxZ5gJzgbmwZYvTdqftTtvFgkc9PtqjyEJ4eHh4eLhCYRtiG2IbkpIiduCQzGDRA77yC+UXyi8cHcvrbcvNgYhZUgWJBYkFiU+eCDOyq1aVbEFqQS2odfassrGysbJxx46S2dFRrh+8fvD6wc8+M/nc5HOTz/PyPjWbgiIgDu4BAgRIrVpZLlkuWS7p6ULMj876ppQPXB6Xx+X5+Qmx3d27JTeYBVmQ5e+v9FJ6Kb3K7wi33DP0VQtUC1QLfvoJekEv6CX9mZ7wJPnVV8LZ/blzUtujUCiUj0XceTTd2nRr0623bsEKWAErmjWTyp44/8XY0NjQ2LBxY/tI+0j7yPKLrZZ7NpPBO4N3Bu9CQqTOdim+gHXMOmbd4sVS26FQKJRPxcbaxtrGesQIqR2HCHlMHpPHmzaVt+MQKXcHImSdPHpEWpFWpJX0E87INDKNTGvblovlYrnYb76R2h6FQqGUlaTApMCkwKpVcQbOwBkLF0pusGiQmGa2ZrZmdvlnHYpIVk+BSlSics0aqd7/35DT5DQ5vXp1Sr+Ufin9jIy0ZZdCoVA+hKaPpo+mz6xZwqS/Bg0kN3gcjsPxPXva9G/Tv03/58+lMiOZAxHSRK9eFZvDSWWnmKI6kdznuc9zn0+ZIrk9CoVC+QDxJvEm8SYNGxJLYkkstVB+UNTFmUSSSBK5bJnU5qSv6PYDP/CbP19yOyK7YTfsnjcvbkDcgLgB0udVUygUSkkoOis6KzqvWSMUCJuaSm0Pv8Fv8JvQUCGp6MEDye1JbUBEqBM5dkzId+7RQ/ILK5oJLYz2pIOpKBSK9uDSuXQuvVs38ow8I8+OSz9UuKheiRnBjGBGNG+urTk7WuspxW/gN/AbFiwobtYnMSSexJN4X18hr793b21dJ4VCqbyIwXIyhAwhQ6QLXr9HKqRC6tat2h7QpjUHImypOA7P4Tk89wktJMoINsAG2GDTJjVREzWpXl1bdikUSuWjsGph1cKqy5cLsV9ra6nt4Rycg3OysjT2GnuN/dKl2r5erXe11RzWHNYc/v57MAVTMC37CMUykwZpkFavHqlD6pA6P/6o7eulUCgVH+Gko0MHeAEv4MXEidqyS8aQMWTM4sVSZ1uVhNYdiGuua65r7pMncAkuwaWVK7Vll5wgJ8iJ4cO5ldxKbqX0s4YpFErFRzzZwKbYFJuGhsJYGAtjtTBuomjAm/l58/Pm59evl+v6ZZurkb8of1H+opUrBY/9+LG27ApD5DdvFpsUynX9FApF/+Fj+Bg+ZssWeAgP4aH27idoj/ZoP3263Qa7DXYb8vLkun7ZHIg4WAd90Ad9AgK0ZrgZNINm1avjClyBK8LChH78BmWeDU+hUCovKm+Vt8p7zBioC3WhrvayPIUWUb/9xqayqWxqdLTc6yD7ZD9h0M+hQ/An/Al/HjqkNcOzYTbMbt/eYrfFbovdy5fLvQ4UCkX3iT8ffz7+vLMznsWzeHbdOq0ZToEUSHn3TtFW0VbRdvJkuddBRHYHIqLJ1+Rr8idNgj2wB/Zory05aU1ak9aBgarRqtGq0b6+cq8DhULRPa5aXbW6alWzJhPMBDPBUVHkIrlILlapoi37uAk34abvvxd7Dcq9HsW65Bbwb4TYxOjRyCCDjBZG5YoUjZDlXXlX3tXDgw5iolAo4hG3+U7zneY7T5wAJ3ACJy3OH7oMl+Hy1avsZHYyO9nTU9cGmOnMDkRE6aJ0Ubrs2AE/wo/wY0yM1gwPh+EwvFo1xpvxZrx/+01Iy6tXT+71oFAo8mFhbWFtYb1pk9YdR9GRFf+Cf8G/GDFC1xyHiM45EGGhCDGoa1DXoO7w4bgSV+LKFy+0JqAom4Jpz7Rn2h87JnT3rVZN7nWhUCjaQ+Wucle5z55NokgUiRozRusCIiACIqZPd13qutR16Z07cq9HSejcEda/4ZpwTbgm3t5kDplD5vz6a/Gsam3RFJpC02PHMi0yLTIt+vSho00plIqLup66nrrewIH8In4Rv2jvXq3fb1pBK2h1+LDSWGmsNP72W7nX40Po3A7k34jpapiO6Zi+ZYvWBTyAB/CgZ0+LahbVLKqFhgojdLVQKEShULSGcGTdowe/lF/KLw0N1brjiIAIiEhL01hrrDXWMux4PhK9uRG+Wfhm4ZuFAQEQBEEQFB+vbftC1sXgwdxl7jJ3eft2wZFo8Q+MQqGUO/EZ8RnxGW3b4i28hbcOHgRHcARHLQ6kK5rfAS2hJbQcOLBNepv0NukZGXKvS2nRGwciHB3l5qId2qGdjw/UhtpQ+++/tS6kClSBKiNGcI+4R9yjkBDqSCgU/UM9XT1dPf2LL5ggJogJOnEC7MEe7KtW1bYOvIt38W5goNJP6af0u3RJ7nUps365BXwsXF+uL9e3Y0ehWeLJk8KcEYVC60IiIAIifv6ZXcYuY5dNnKir2RIUCgVA7an2VHu2b0+qkqqkanQ0+YH8QH4wM9O2DlyNq3H1vn3sfnY/u3/wYLnX5WPRmx3Iv2Gj2Cg26swZeAyP4fGcObIJ8QEf8Bk3Tj1WPVY9dufO8PDw8PBwGRwZhUIpETHGQRREQRQnTsjlOGA+zIf5iYl8IB/IB+pPrKMk9NaBiLDP2Gfss5UrcS/uxb3bt8ulg4wn48n4YcOanmp6qumpgweFAiQTE7nXh0KpzAiOY9AgNEIjNDp8mISQEBIiw+cyAAIg4OlTRU9FT0XPnj2F+UhaGGchMXp7hPVvhAp2Q0NmFDOKGXXsGNlFdpFdX38tmyAjMAKjuDiDUINQg9BevYQWBH/9Jfc6USiVAdVXqq9UX02dCnZgB3YhIVprs/4vxIFPeAJP4Il27YSJgYmJcq9PuV2f3ALKm9iXsS9jX5qZVdlZZWeVnZcuQSfoBJ0cHeXSgyNxJI58+FDTU9NT07N7d10vDKJQ9JHiliNNzZuaN/3pJyE2OX68XHqErrkaDTyH5/C8Tx9d6Z5b3uj9Eda/8aztWduzdlaWwkxhpjDr0UO8gculh+wkO8lOGxvFTsVOxc7Ll4Wdkow7IwqlAiEExWvXtrCzsLOwO3VKbscBW2ErbOV5uAAX4MLIkRXVcYhUuB3IvxEHR+FLfIkvL14U+vc3biybIBWoQEUIrIf1sH7lSvYGe4O9MWcOzd6iUEqPENtgWTyCR/BIVBT0gT7Qp0kTuXXhIByEgwIC2DvsHfZOxR+hXeEdiIjwB9eiBR7AA3jgwgUYCANhYJ06cuuCbtANuv36q+Fpw9OGp0eMcHBwcHBw0F47ewpFn+BiuVgudvx4so/sI/vWroVRMApGGRvLrQt7Yk/sOWuWmNQjtx6tXbfcArQNl8flcXmOjiSaRJPo338Ha7AG69q15dYlPLk8eYK1sTbWHjrUOdY51jn2wgW5dVEociKcINSqxcxiZjGztm0jq8gqsqp3b7l1FaMCFaiCgpRjlWOVYxctkluOtql0DkSkeEcSiZEYefq0UM9hZSW3LvGIC9/hO3z300/Gl40vG1+eOdM+0j7SPjI/X255FIo2EAuFiR2xI3a7d+vM57MIoQPFggVCOu7ixXLrkYtK60BE1ERN1KRJEz6bz+azT5+G23AbbjdtKrcuEXRDN3S7cUOToknRpIwe7drctblr8+vX5dZFoZQn15pea3qtqbm5ob+hv6H/4sXkNrlNbvv7y5V++x5i7PIAHIAD06crzyrPKrU50lZHqfQORCTeJN4k3qRhQ4WTwknh9PvvQmuU5s3l1iUipgWS1+Q1eb1uHdlD9pA98+dXlIIkSuVEPUo9Sj2qVy++Nl+br71xo67tNNAd3dG9sBDewlt4O2oUa8was8ZhYXLr0hWoA/kX1+tfr3+9vqWl4rzivOL84cOQBVmQ9eWXcut6j5kwE2Y+eoTX8BpemzGDfce+Y98dOiS3LArlfxHfPb57fHcbG0WuIleRu2aNzsU0isDO2Bk7Z2byJ/mT/EkfHxdXF1cX11On5Nala1AHUgL3/O/53/M3Ns7sk9kns8/27VAdqkP1IUPk1lUSuBW34tbz54X04GnThCelpCS5dVEqN0mBSYFJgVWrFq4uXF24euZM9EIv9Jo1S7aWIh/iCTyBJ+npfHW+Ol+9Z09XL1cvVy+1Wm5Zugp1IB9AbNfOveXecm+XLIH9sB/2z56t9YEzpaS4AvYL+AK+2LWLH8gP5AcuXiw8Qf35p9z6KBUbYQS0kVFuVm5Wbtbo0bAbdsPuefOErtn16smtrySwHbbDdhwHJ+EknPT2Zj1ZT9YzPV1uXbqOzt0AdR0hD/2bb0g9Uo/UCwuD1/AaXltYyK2rRMSBNQVQAAW7dimuKa4prgUHO010mug0MS1NbnkU/aa4B50D48A4DBxICkkhKVywQNeSUUpCcBx79/IX+Av8hbFjaUyxbFAH8pEILRRathQ+MIcO6VrQvSSED0xODqlL6pK6u3czU5gpzJSQEOdpztOcp927J7c+im4jpL+bmuJbfItvR4zAqTgVpwYEiC175Nb3QZIgCZLy88EGbMAmIEDppfRSem3cKLcsfUX+9Dg9RSj0u3Wr4GXBy4KXbdrAZtgMm6Oi5Nb1IYTRvFWqiD2D+D/4P/g/bt9W5anyVHmHDglPlJ6ecuuk6AZxA+IGxA2oW1fYeQcHM96MN+P9559gBmZgtmGDvjiO4kLdPMzDPC8v6jjKB7oDKWeESnc/PzKDzCAzNm6E4TAchlerJreuMuMIjuB4+zYux+W4PDSU78J34bvs2CHEUmQYJUyRFCHWxzCJFokWiRZffUXak/ak/dixpA/pQ/r06qX1WeHlxZ/wJ/x56JBmkmaSZtLYsfo2c1zXoQ5EIuLnxs+Nn9u8OfMt8y3z7d69wv8qlXLr+lgwAAMwIDcXEiABEqKiyGQymUw+cMDkvsl9k/unTtFKef0iPiw+LD6sVSuFjcJGYePrSzJJJsn085O92einEgqhEPr2Lb7G1/h66lT2F/YX9pedO+WWVVGhDkRiirNS7ufez70/fz6EQRiEzZolBLUNDeXW98nsgT2w559/oC/0hb5HjqAN2qBNRESea55rnuv58x5pHmkeaTk5csusrAhHkq1b4wScgBP69AFLsARLX1/4AX6AH+zt5dZXbpiBGZhdusQcZ44zx0eNojE97UAdiJZRPVc9Vz13cBDSbbdtI3PIHDKnTRu5dZU3xcH6PqQP6XP+PPbG3tg7Jkaj1qg16lOn6GCt8kFoxVO9OqlGqpFqX30F42AcjOvWjaiIiqi6doUQCIGQBg3k1lnuVIfqUP3NG3yGz/DZ9987t3Vu69z255+FsQiEyC2vskAdiEyEh4eHh4crFLbzbefbzp8yhcwlc8ncxYvBHuzBvmpVufVJDa7ElbjyxQsSRsJI2JUruBN34s7YWNKYNCaNr1whdUgdUic5ubKmVYoxCbWH2kPtYWNDjpAj5Ii7u1Df07YtNsJG2MjTkzQnzUnzli11pmeUxOBMnIkzjxxh+jH9mH7+/jQdXV6oA9ERkrsmd03u2qBBwcyCmQUzly2DB/AAHgwerKsFi5IjTnarB/Wg3oMHsAW2wJakJGgADaDBjRtkC9lCtty/r9ir2KvYm5qqGawZrBn86JHgcJ49k1v+vxFHLZukmqSapDZpwuQxeUyetbUQe7CxwYk4ESe2bCn8vh0dSS/Si/Syt68sDxQlIiZz/IV/4V8BAWx9tj5bPyZGblkUgcp3Y9ITVMdVx1XH3d1xB+7AHevWVdSjrvJGDPYTBVEQxbNnUBWqQtW//wYLsACLv/+GETACRmRk4BScglMyMwkSJJiVVfzzj/ARPsrKgtkwG2YXFor/T6aSqWSquTl4gAd4KBQwAAbAACMjeAWv4JWFhRALsrREIzRCI0tLodmlpSUOxIE4sE4dcowcI8csLeVeH51HjKklQRIkLVpEVpAVZMWmTUL2X0GB3PIo/xfqQHQcsZWKSqVSqVQDB+IxPIbHgoLAG7zB285Obn0UyqdQHCtrSBqShps3k1/IL+SXZctourh+QB2IniGejasSVAmqhL59hXTFH36AmlATatrayq2PQvmfiJXgjuAIjqGhtLWOfkMdiJ4jpgnnvct7l/duxAjiRtyIW2Ag3aFQdAJTMAXT7Gzsh/2wX2goH8qH8qErVtDmnhUD6kAqGMXZO9Zqa7V1jx7EnbgT9ylThPkhnTrJrY9SwXkEj+DRy5dCXdCmTSSBJJCEDRvokVTFhDqQSgK3mdvMbfbwILfILXJrwgRMxmRM9vHR2bkMFP0gCIIgKD6eLCALyIKtW7NcslyyXPbs6YAdsAPm5sotjyIt1IFUUoQKZQsLZJBBpn9/nIfzcN748WQJWUKWODvLrY+iYxQV7gnjCw4e5LP4LD5ryxY6cKlyQx0I5f8gZHsplWAFVmDVvz9wwAHn66v3PZIopaI4K8qMmBGz335jbBlbxvbgwdxHuY9yH/32G21NQ/n/oQ6E8j8pnsgYw8VwMW5uxQ7FDdzAzdubZn/pJ+LMb7KD7CA7Tp9mJjITmYmRkUZtjdoatY2OFppjvn0rt06KbkMdCOWT4Nw5d87d1hZmwAyY0a2b0HKjWzeYC3Nhbvv2kA3ZkG1qKrfOSkse5EFecrLQ6iQmhr/B3+BvnDiBCZiACZcv0wI9yqdAHQhFEs6Rc+QcMTAw58w5c87RUcgC8/TEqlgVq7ZtK/Rwat8eBsJAGFinjtx69Q10R3d0LywkcSSOxCUl4UW8iBcvX+Y9eU/eMzZWMV0xXTH9/Hlh8NnLl3LrpVRMqAOhyEpSYFJgUqC1taaPpo+mT+vW0AW6QJfWrSEHciDHwYHkk3yS7+AAt+AW3GratMK0wS8JK7ACq2fPYBpMg2kpKZAIiZCYnAytoBW0unGDfE++J98nJ1uEWoRahKak2G2w22C3IS9PbtmUygl1IBS9QOxebGNtY21jbWXF7Gf2M/ubNIFlsAyWNWlCdpPdZLe1Na7DdbiuTh34A/6AP2rVEmZf164tdP21tIS/4C/4q1YtuAAX4EKVKuAP/uDPMEJ2kYXFh3QU99piCUvYnByYDtNhukaDvuiLvhkZpB6pR+plZBT33hoNo2F0RgZchatw9eVLjMIojHryhN/Ab+A3PHqkmKaYppj26JEQpH70iAapKRQKRc8RjuBofQyFQqFQKBQKhUKhUCi6wf8Dy8SHxD2UcowAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjAtMDQtMTJUMTY6MDE6NDQrMDg6MDCCa9KjAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIwLTA0LTEyVDE2OjAxOjQ0KzA4OjAw8zZqHwAAAEl0RVh0c3ZnOmJhc2UtdXJpAGZpbGU6Ly8vaG9tZS9hZG1pbi9pY29uLWZvbnQvdG1wL2ljb25fN21rOHd5amZzOC9rdWFpamluLnN2Z/9lVlMAAAAASUVORK5CYII="

/***/ }),
/* 40 */
/*!******************************************************************!*\
  !*** D:/uniapp/douyinapp1/static/icons/musics/usual/liebiao.png ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 41 */
/*!******************************************************************!*\
  !*** D:/uniapp/douyinapp1/static/icons/musics/usual/zanting.png ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map