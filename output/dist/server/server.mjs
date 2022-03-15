var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a2, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b2)) {
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a2, prop, b2[prop]);
    }
  return a2;
};
var __spreadProps = (a2, b2) => __defProps(a2, __getOwnPropDescs(b2));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
import { reactive, getCurrentInstance, onBeforeMount, onUnmounted, ref, onServerPrefetch, computed, defineComponent, h, Suspense, Transition, defineAsyncComponent, isRef, useSSRContext, unref, getCurrentScope, onScopeDispose, watch, shallowRef, watchEffect, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment as Fragment$1, renderList, createTextVNode, toDisplayString as toDisplayString$1, onMounted, createElementBlock, resolveComponent, createCommentVNode, createApp, provide, inject, withAsyncContext } from "vue";
import { RouterView, useRoute, RouterLink, createMemoryHistory, createRouter } from "vue-router";
import { ssrRenderAttrs, ssrRenderSuspense, ssrRenderAttr, ssrInterpolate, ssrRenderStyle, ssrRenderComponent, ssrRenderList, ssrRenderSlot, ssrRenderClass } from "vue/server-renderer";
import { defineStore, createPinia, setActivePinia } from "pinia";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/grid";
import NUXT_CONFIG from "#config";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
const entry$1 = (ctx) => Promise.resolve().then(function() {
  return bootstrap$1;
}).then((m) => m.default(ctx));
function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
function serialCaller(hooks, args) {
  return hooks.reduce((promise, hookFn) => promise.then(() => hookFn.apply(void 0, args)), Promise.resolve(null));
}
function parallelCaller(hooks, args) {
  return Promise.all(hooks.map((hook) => hook.apply(void 0, args)));
}
class Hookable {
  constructor() {
    this._hooks = {};
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, fn) {
    if (!name || typeof fn !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let deprecatedHookObj;
    while (this._deprecatedHooks[name]) {
      const deprecatedHook = this._deprecatedHooks[name];
      if (typeof deprecatedHook === "string") {
        deprecatedHookObj = { to: deprecatedHook };
      } else {
        deprecatedHookObj = deprecatedHook;
      }
      name = deprecatedHookObj.to;
    }
    if (deprecatedHookObj) {
      if (!deprecatedHookObj.message) {
        console.warn(`${originalName} hook has been deprecated` + (deprecatedHookObj.to ? `, please use ${deprecatedHookObj.to}` : ""));
      } else {
        console.warn(deprecatedHookObj.message);
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(fn);
    return () => {
      if (fn) {
        this.removeHook(name, fn);
        fn = null;
      }
    };
  }
  hookOnce(name, fn) {
    let _unreg;
    let _fn = (...args) => {
      _unreg();
      _unreg = null;
      _fn = null;
      return fn(...args);
    };
    _unreg = this.hook(name, _fn);
    return _unreg;
  }
  removeHook(name, fn) {
    if (this._hooks[name]) {
      const idx = this._hooks[name].indexOf(fn);
      if (idx !== -1) {
        this._hooks[name].splice(idx, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = deprecated;
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map((key) => this.hook(key, hooks[key]));
    return () => {
      removeFns.splice(0, removeFns.length).forEach((unreg) => unreg());
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  callHook(name, ...args) {
    return serialCaller(this._hooks[name] || [], args);
  }
  callHookParallel(name, ...args) {
    return parallelCaller(this._hooks[name] || [], args);
  }
  callHookWith(caller, name, ...args) {
    return caller(this._hooks[name] || [], args);
  }
}
function createHooks() {
  return new Hookable();
}
function createMock(name, overrides = {}) {
  const fn = function() {
  };
  fn.prototype.name = name;
  const props = {};
  return new Proxy(fn, {
    get(_target, prop) {
      if (prop === "caller") {
        return null;
      }
      if (prop === "__createMock__") {
        return createMock;
      }
      if (prop in overrides) {
        return overrides[prop];
      }
      return props[prop] = props[prop] || createMock(`${name}.${prop.toString()}`);
    },
    apply(_target, _this, _args) {
      return createMock(`${name}()`);
    },
    construct(_target, _args, _newT) {
      return createMock(`[${name}]`);
    },
    enumerate(_target) {
      return [];
    }
  });
}
const mockContext = createMock("mock");
function mock(warning2) {
  console.warn(warning2);
  return mockContext;
}
const unsupported = /* @__PURE__ */ new Set([
  "store",
  "spa",
  "fetchCounters"
]);
const todo = /* @__PURE__ */ new Set([
  "isHMR",
  "base",
  "payload",
  "from",
  "next",
  "error",
  "redirect",
  "redirected",
  "enablePreview",
  "$preview",
  "beforeNuxtRender",
  "beforeSerialize"
]);
const routerKeys = ["route", "params", "query"];
const staticFlags = {
  isClient: false,
  isServer: true,
  isDev: false,
  isStatic: void 0,
  target: "server",
  modern: false
};
const legacyPlugin = (nuxtApp) => {
  nuxtApp._legacyContext = new Proxy(nuxtApp, {
    get(nuxt, p) {
      if (unsupported.has(p)) {
        return mock(`Accessing ${p} is not supported in Nuxt 3.`);
      }
      if (todo.has(p)) {
        return mock(`Accessing ${p} is not yet supported in Nuxt 3.`);
      }
      if (routerKeys.includes(p)) {
        if (!("$router" in nuxtApp)) {
          return mock("vue-router is not being used in this project.");
        }
        switch (p) {
          case "route":
            return nuxt.$router.currentRoute.value;
          case "params":
          case "query":
            return nuxt.$router.currentRoute.value[p];
        }
      }
      if (p === "$config" || p === "env") {
        return useRuntimeConfig();
      }
      if (p in staticFlags) {
        return staticFlags[p];
      }
      if (p === "ssrContext") {
        return nuxt._legacyContext;
      }
      if (nuxt.ssrContext && p in nuxt.ssrContext) {
        return nuxt.ssrContext[p];
      }
      if (p === "nuxt") {
        return nuxt.payload;
      }
      if (p === "nuxtState") {
        return nuxt.payload.data;
      }
      if (p in nuxtApp.vueApp) {
        return nuxtApp.vueApp[p];
      }
      if (p in nuxtApp) {
        return nuxtApp[p];
      }
      return mock(`Accessing ${p} is not supported in Nuxt3.`);
    }
  });
};
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options2) {
  const nuxtApp = __spreadValues({
    provide: void 0,
    globalName: "nuxt",
    payload: reactive(__spreadValues({
      data: {},
      state: {},
      _errors: {}
    }, { serverRendered: true })),
    isHydrating: false,
    _asyncDataPromises: {}
  }, options2);
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  if (nuxtApp.ssrContext) {
    nuxtApp.ssrContext.nuxt = nuxtApp;
  }
  {
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    nuxtApp.ssrContext.payload = nuxtApp.payload;
  }
  {
    nuxtApp.provide("config", options2.ssrContext.runtimeConfig.private);
    nuxtApp.payload.config = options2.ssrContext.runtimeConfig.public;
  }
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin) {
  if (typeof plugin !== "function") {
    return;
  }
  const { provide: provide2 } = await callWithNuxt(nuxtApp, plugin, [nuxtApp]) || {};
  if (provide2 && typeof provide2 === "object") {
    for (const key in provide2) {
      nuxtApp.provide(key, provide2[key]);
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  for (const plugin of plugins2) {
    await applyPlugin(nuxtApp, plugin);
  }
}
function normalizePlugins(_plugins2) {
  let needsLegacyContext = false;
  const plugins2 = _plugins2.map((plugin) => {
    if (typeof plugin !== "function") {
      return () => {
      };
    }
    if (isLegacyPlugin(plugin)) {
      needsLegacyContext = true;
      return (nuxtApp) => plugin(nuxtApp._legacyContext, nuxtApp.provide);
    }
    return plugin;
  });
  if (needsLegacyContext) {
    plugins2.unshift(legacyPlugin);
  }
  return plugins2;
}
function defineNuxtPlugin(plugin) {
  plugin[NuxtPluginIndicator] = true;
  return plugin;
}
function isLegacyPlugin(plugin) {
  return !plugin[NuxtPluginIndicator];
}
let currentNuxtAppInstance;
const setNuxtAppInstance = (nuxt) => {
  currentNuxtAppInstance = nuxt;
};
function callWithNuxt(nuxt, setup, args) {
  setNuxtAppInstance(nuxt);
  const p = args ? setup(...args) : setup();
  {
    setNuxtAppInstance(null);
  }
  return p;
}
function useNuxtApp() {
  const vm = getCurrentInstance();
  if (!vm) {
    if (!currentNuxtAppInstance) {
      throw new Error("nuxt instance unavailable");
    }
    return currentNuxtAppInstance;
  }
  return vm.appContext.app.$nuxt;
}
function useRuntimeConfig() {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const getDefault = () => null;
function useAsyncData(key, handler, options2 = {}) {
  var _a, _b, _c, _d;
  if (typeof key !== "string") {
    throw new TypeError("asyncData key must be a string");
  }
  if (typeof handler !== "function") {
    throw new TypeError("asyncData handler must be a function");
  }
  options2 = __spreadValues({ server: true, default: getDefault }, options2);
  if (options2.defer) {
    console.warn("[useAsyncData] `defer` has been renamed to `lazy`. Support for `defer` will be removed in RC.");
  }
  options2.lazy = (_b = (_a = options2.lazy) != null ? _a : options2.defer) != null ? _b : false;
  const nuxt = useNuxtApp();
  const instance = getCurrentInstance();
  if (instance && !instance._nuxtOnBeforeMountCbs) {
    const cbs = instance._nuxtOnBeforeMountCbs = [];
    if (instance && false) {
      onBeforeMount(() => {
        cbs.forEach((cb2) => {
          cb2();
        });
        cbs.splice(0, cbs.length);
      });
      onUnmounted(() => cbs.splice(0, cbs.length));
    }
  }
  const asyncData = {
    data: ref((_c = nuxt.payload.data[key]) != null ? _c : options2.default()),
    pending: ref(true),
    error: ref((_d = nuxt.payload._errors[key]) != null ? _d : null)
  };
  asyncData.refresh = (force) => {
    if (nuxt._asyncDataPromises[key] && !force) {
      return nuxt._asyncDataPromises[key];
    }
    asyncData.pending.value = true;
    nuxt._asyncDataPromises[key] = Promise.resolve(handler(nuxt)).then((result) => {
      if (options2.transform) {
        result = options2.transform(result);
      }
      if (options2.pick) {
        result = pick(result, options2.pick);
      }
      asyncData.data.value = result;
      asyncData.error.value = null;
    }).catch((error) => {
      asyncData.error.value = error;
      asyncData.data.value = options2.default();
    }).finally(() => {
      asyncData.pending.value = false;
      nuxt.payload.data[key] = asyncData.data.value;
      if (asyncData.error.value) {
        nuxt.payload._errors[key] = true;
      }
      delete nuxt._asyncDataPromises[key];
    });
    return nuxt._asyncDataPromises[key];
  };
  const fetchOnServer = options2.server !== false && nuxt.payload.serverRendered;
  if (fetchOnServer) {
    const promise = asyncData.refresh();
    onServerPrefetch(() => promise);
  }
  const asyncDataPromise = Promise.resolve(nuxt._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
typeof setImmediate !== "undefined" ? setImmediate : (fn) => fn();
class H3Error extends Error {
  constructor() {
    super(...arguments);
    this.statusCode = 500;
    this.statusMessage = "H3Error";
  }
}
function createError(input) {
  var _a;
  if (input instanceof H3Error) {
    return input;
  }
  const err = new H3Error((_a = input.message) != null ? _a : input.statusMessage);
  if (input.statusCode) {
    err.statusCode = input.statusCode;
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  }
  if (input.data) {
    err.data = input.data;
  }
  return err;
}
const suspectProtoRx = /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^["{[]|^-?[0-9][0-9.]{0,14}$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor") {
    return;
  }
  return value;
}
function destr(val) {
  if (typeof val !== "string") {
    return val;
  }
  const _lval = val.toLowerCase();
  if (_lval === "true") {
    return true;
  }
  if (_lval === "false") {
    return false;
  }
  if (_lval === "null") {
    return null;
  }
  if (_lval === "nan") {
    return NaN;
  }
  if (_lval === "infinity") {
    return Infinity;
  }
  if (_lval === "undefined") {
    return void 0;
  }
  if (!JsonSigRx.test(val)) {
    return val;
  }
  try {
    if (suspectProtoRx.test(val) || suspectConstructorRx.test(val)) {
      return JSON.parse(val, jsonParseTransform);
    }
    return JSON.parse(val);
  } catch (_e) {
    return val;
  }
}
const windi = "";
const preload = defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.mixin({
    beforeCreate() {
      const { _registeredComponents } = this.$nuxt.ssrContext;
      const { __moduleIdentifier } = this.$options;
      _registeredComponents.add(__moduleIdentifier);
    }
  });
});
var __defProp2 = Object.defineProperty;
var __defProps2 = Object.defineProperties;
var __getOwnPropDescs2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues2 = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp2.call(b2, prop))
      __defNormalProp2(a2, prop, b2[prop]);
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b2)) {
      if (__propIsEnum2.call(b2, prop))
        __defNormalProp2(a2, prop, b2[prop]);
    }
  return a2;
};
var __spreadProps2 = (a2, b2) => __defProps2(a2, __getOwnPropDescs2(b2));
var PROVIDE_KEY = `usehead`;
var HEAD_COUNT_KEY = `head:count`;
var HEAD_ATTRS_KEY = `data-head-attrs`;
var SELF_CLOSING_TAGS = ["meta", "link", "base"];
var createElement = (tag, attrs, document) => {
  const el = document.createElement(tag);
  for (const key of Object.keys(attrs)) {
    let value = attrs[key];
    if (key === "key" || value === false) {
      continue;
    }
    if (key === "children") {
      el.textContent = value;
    } else {
      el.setAttribute(key, value);
    }
  }
  return el;
};
var htmlEscape = (str) => str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
var stringifyAttrs = (attributes) => {
  const handledAttributes = [];
  for (let [key, value] of Object.entries(attributes)) {
    if (key === "children" || key === "key") {
      continue;
    }
    if (value === false || value == null) {
      continue;
    }
    let attribute = htmlEscape(key);
    if (value !== true) {
      attribute += `="${htmlEscape(String(value))}"`;
    }
    handledAttributes.push(attribute);
  }
  return handledAttributes.length > 0 ? " " + handledAttributes.join(" ") : "";
};
function isEqualNode(oldTag, newTag) {
  if (oldTag instanceof HTMLElement && newTag instanceof HTMLElement) {
    const nonce = newTag.getAttribute("nonce");
    if (nonce && !oldTag.getAttribute("nonce")) {
      const cloneTag = newTag.cloneNode(true);
      cloneTag.setAttribute("nonce", "");
      cloneTag.nonce = nonce;
      return nonce === oldTag.nonce && oldTag.isEqualNode(cloneTag);
    }
  }
  return oldTag.isEqualNode(newTag);
}
var getTagKey = (props) => {
  const names = ["key", "id", "name", "property"];
  for (const n of names) {
    const value = typeof props.getAttribute === "function" ? props.hasAttribute(n) ? props.getAttribute(n) : void 0 : props[n];
    if (value !== void 0) {
      return { name: n, value };
    }
  }
};
var acceptFields = [
  "title",
  "meta",
  "link",
  "base",
  "style",
  "script",
  "htmlAttrs",
  "bodyAttrs"
];
var headObjToTags = (obj) => {
  const tags = [];
  for (const key of Object.keys(obj)) {
    if (obj[key] == null)
      continue;
    if (key === "title") {
      tags.push({ tag: key, props: { children: obj[key] } });
    } else if (key === "base") {
      tags.push({ tag: key, props: __spreadValues2({ key: "default" }, obj[key]) });
    } else if (acceptFields.includes(key)) {
      const value = obj[key];
      if (Array.isArray(value)) {
        value.forEach((item) => {
          tags.push({ tag: key, props: item });
        });
      } else if (value) {
        tags.push({ tag: key, props: value });
      }
    }
  }
  return tags;
};
var setAttrs = (el, attrs) => {
  const existingAttrs = el.getAttribute(HEAD_ATTRS_KEY);
  if (existingAttrs) {
    for (const key of existingAttrs.split(",")) {
      if (!(key in attrs)) {
        el.removeAttribute(key);
      }
    }
  }
  const keys = [];
  for (const key in attrs) {
    const value = attrs[key];
    if (value == null)
      continue;
    if (value === false) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
    keys.push(key);
  }
  if (keys.length) {
    el.setAttribute(HEAD_ATTRS_KEY, keys.join(","));
  } else {
    el.removeAttribute(HEAD_ATTRS_KEY);
  }
};
var updateElements = (document = window.document, type, tags) => {
  var _a;
  const head = document.head;
  let headCountEl = head.querySelector(`meta[name="${HEAD_COUNT_KEY}"]`);
  const headCount = headCountEl ? Number(headCountEl.getAttribute("content")) : 0;
  const oldElements = [];
  if (headCountEl) {
    for (let i = 0, j = headCountEl.previousElementSibling; i < headCount; i++, j = (j == null ? void 0 : j.previousElementSibling) || null) {
      if (((_a = j == null ? void 0 : j.tagName) == null ? void 0 : _a.toLowerCase()) === type) {
        oldElements.push(j);
      }
    }
  } else {
    headCountEl = document.createElement("meta");
    headCountEl.setAttribute("name", HEAD_COUNT_KEY);
    headCountEl.setAttribute("content", "0");
    head.append(headCountEl);
  }
  let newElements = tags.map((tag) => createElement(tag.tag, tag.props, document));
  newElements = newElements.filter((newEl) => {
    for (let i = 0; i < oldElements.length; i++) {
      const oldEl = oldElements[i];
      if (isEqualNode(oldEl, newEl)) {
        oldElements.splice(i, 1);
        return false;
      }
    }
    return true;
  });
  oldElements.forEach((t) => {
    var _a2;
    return (_a2 = t.parentNode) == null ? void 0 : _a2.removeChild(t);
  });
  newElements.forEach((t) => {
    head.insertBefore(t, headCountEl);
  });
  headCountEl.setAttribute("content", "" + (headCount - oldElements.length + newElements.length));
};
var createHead = () => {
  let allHeadObjs = [];
  const head = {
    install(app) {
      app.config.globalProperties.$head = head;
      app.provide(PROVIDE_KEY, head);
    },
    get headTags() {
      const deduped = [];
      allHeadObjs.forEach((objs) => {
        const tags = headObjToTags(objs.value);
        tags.forEach((tag) => {
          if (tag.tag === "meta" || tag.tag === "base" || tag.tag === "script") {
            const key = getTagKey(tag.props);
            if (key) {
              let index2 = -1;
              for (let i = 0; i < deduped.length; i++) {
                const prev = deduped[i];
                const prevValue = prev.props[key.name];
                const nextValue = tag.props[key.name];
                if (prev.tag === tag.tag && prevValue === nextValue) {
                  index2 = i;
                  break;
                }
              }
              if (index2 !== -1) {
                deduped.splice(index2, 1);
              }
            }
          }
          deduped.push(tag);
        });
      });
      return deduped;
    },
    addHeadObjs(objs) {
      allHeadObjs.push(objs);
    },
    removeHeadObjs(objs) {
      allHeadObjs = allHeadObjs.filter((_objs) => _objs !== objs);
    },
    updateDOM(document = window.document) {
      let title;
      let htmlAttrs = {};
      let bodyAttrs = {};
      const actualTags = {};
      for (const tag of head.headTags) {
        if (tag.tag === "title") {
          title = tag.props.children;
          continue;
        }
        if (tag.tag === "htmlAttrs") {
          Object.assign(htmlAttrs, tag.props);
          continue;
        }
        if (tag.tag === "bodyAttrs") {
          Object.assign(bodyAttrs, tag.props);
          continue;
        }
        actualTags[tag.tag] = actualTags[tag.tag] || [];
        actualTags[tag.tag].push(tag);
      }
      if (title !== void 0) {
        document.title = title;
      }
      setAttrs(document.documentElement, htmlAttrs);
      setAttrs(document.body, bodyAttrs);
      for (const name of Object.keys(actualTags)) {
        updateElements(document, name, actualTags[name]);
      }
    }
  };
  return head;
};
var tagToString = (tag) => {
  let attrs = stringifyAttrs(tag.props);
  if (SELF_CLOSING_TAGS.includes(tag.tag)) {
    return `<${tag.tag}${attrs}>`;
  }
  return `<${tag.tag}${attrs}>${tag.props.children || ""}</${tag.tag}>`;
};
var renderHeadToString = (head) => {
  const tags = [];
  let titleTag = "";
  let htmlAttrs = {};
  let bodyAttrs = {};
  for (const tag of head.headTags) {
    if (tag.tag === "title") {
      titleTag = tagToString(tag);
    } else if (tag.tag === "htmlAttrs") {
      Object.assign(htmlAttrs, tag.props);
    } else if (tag.tag === "bodyAttrs") {
      Object.assign(bodyAttrs, tag.props);
    } else {
      tags.push(tagToString(tag));
    }
  }
  tags.push(`<meta name="${HEAD_COUNT_KEY}" content="${tags.length}">`);
  return {
    get headTags() {
      return titleTag + tags.join("");
    },
    get htmlAttrs() {
      return stringifyAttrs(__spreadProps2(__spreadValues2({}, htmlAttrs), {
        [HEAD_ATTRS_KEY]: Object.keys(htmlAttrs).join(",")
      }));
    },
    get bodyAttrs() {
      return stringifyAttrs(__spreadProps2(__spreadValues2({}, bodyAttrs), {
        [HEAD_ATTRS_KEY]: Object.keys(bodyAttrs).join(",")
      }));
    }
  };
};
const vueuseHead_0222a304 = defineNuxtPlugin((nuxtApp) => {
  const head = createHead();
  nuxtApp.vueApp.use(head);
  nuxtApp._useMeta = (meta2) => {
    const headObj = ref(meta2);
    head.addHeadObjs(headObj);
    {
      return;
    }
  };
  {
    nuxtApp.ssrContext.renderMeta = () => renderHeadToString(head);
  }
});
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var shared_cjs_prod = {};
Object.defineProperty(shared_cjs_prod, "__esModule", { value: true });
function makeMap(str, expectsLowerCase) {
  const map = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}
const PatchFlagNames = {
  [1]: `TEXT`,
  [2]: `CLASS`,
  [4]: `STYLE`,
  [8]: `PROPS`,
  [16]: `FULL_PROPS`,
  [32]: `HYDRATE_EVENTS`,
  [64]: `STABLE_FRAGMENT`,
  [128]: `KEYED_FRAGMENT`,
  [256]: `UNKEYED_FRAGMENT`,
  [512]: `NEED_PATCH`,
  [1024]: `DYNAMIC_SLOTS`,
  [2048]: `DEV_ROOT_FRAGMENT`,
  [-1]: `HOISTED`,
  [-2]: `BAIL`
};
const slotFlagsText = {
  [1]: "STABLE",
  [2]: "DYNAMIC",
  [3]: "FORWARDED"
};
const GLOBALS_WHITE_LISTED = "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt";
const isGloballyWhitelisted = /* @__PURE__ */ makeMap(GLOBALS_WHITE_LISTED);
const range = 2;
function generateCodeFrame(source, start = 0, end = source.length) {
  let lines = source.split(/(\r?\n)/);
  const newlineSequences = lines.filter((_, idx) => idx % 2 === 1);
  lines = lines.filter((_, idx) => idx % 2 === 0);
  let count = 0;
  const res = [];
  for (let i = 0; i < lines.length; i++) {
    count += lines[i].length + (newlineSequences[i] && newlineSequences[i].length || 0);
    if (count >= start) {
      for (let j = i - range; j <= i + range || end > count; j++) {
        if (j < 0 || j >= lines.length)
          continue;
        const line = j + 1;
        res.push(`${line}${" ".repeat(Math.max(3 - String(line).length, 0))}|  ${lines[j]}`);
        const lineLength = lines[j].length;
        const newLineSeqLength = newlineSequences[j] && newlineSequences[j].length || 0;
        if (j === i) {
          const pad = start - (count - (lineLength + newLineSeqLength));
          const length = Math.max(1, end > count ? lineLength - pad : end - start);
          res.push(`   |  ` + " ".repeat(pad) + "^".repeat(length));
        } else if (j > i) {
          if (end > count) {
            const length = Math.max(Math.min(end - count, lineLength), 1);
            res.push(`   |  ` + "^".repeat(length));
          }
          count += lineLength + newLineSeqLength;
        }
      }
      break;
    }
  }
  return res.join("\n");
}
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
const isBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
const unsafeAttrCharRE = /[>/="'\u0009\u000a\u000c\u0020]/;
const attrValidationCache = {};
function isSSRSafeAttrName(name) {
  if (attrValidationCache.hasOwnProperty(name)) {
    return attrValidationCache[name];
  }
  const isUnsafe = unsafeAttrCharRE.test(name);
  if (isUnsafe) {
    console.error(`unsafe attribute name: ${name}`);
  }
  return attrValidationCache[name] = !isUnsafe;
}
const propsToAttrMap = {
  acceptCharset: "accept-charset",
  className: "class",
  htmlFor: "for",
  httpEquiv: "http-equiv"
};
const isNoUnitNumericStyleProp = /* @__PURE__ */ makeMap(`animation-iteration-count,border-image-outset,border-image-slice,border-image-width,box-flex,box-flex-group,box-ordinal-group,column-count,columns,flex,flex-grow,flex-positive,flex-shrink,flex-negative,flex-order,grid-row,grid-row-end,grid-row-span,grid-row-start,grid-column,grid-column-end,grid-column-span,grid-column-start,font-weight,line-clamp,line-height,opacity,order,orphans,tab-size,widows,z-index,zoom,fill-opacity,flood-opacity,stop-opacity,stroke-dasharray,stroke-dashoffset,stroke-miterlimit,stroke-opacity,stroke-width`);
const isKnownHtmlAttr = /* @__PURE__ */ makeMap(`accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap`);
const isKnownSvgAttr = /* @__PURE__ */ makeMap(`xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,color-interpolation-filters,color-profile,color-rendering,contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,font-family,font-size,font-size-adjust,font-stretch,font-style,font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,overflow,overline-position,overline-thickness,panose-1,paint-order,path,pathLength,patternContentUnits,patternTransform,patternUnits,ping,pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,specularConstant,specularExponent,speed,spreadMethod,startOffset,stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,string,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,text-decoration,text-rendering,textLength,to,transform,transform-origin,type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan`);
function normalizeStyle(value) {
  if (isArray$1(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString$3(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString$3(value)) {
    return value;
  } else if (isObject$3(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:(.+)/;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function stringifyStyle(styles) {
  let ret = "";
  if (!styles || isString$3(styles)) {
    return ret;
  }
  for (const key in styles) {
    const value = styles[key];
    const normalizedKey = key.startsWith(`--`) ? key : hyphenate(key);
    if (isString$3(value) || typeof value === "number" && isNoUnitNumericStyleProp(normalizedKey)) {
      ret += `${normalizedKey}:${value};`;
    }
  }
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString$3(value)) {
    res = value;
  } else if (isArray$1(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$3(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
function normalizeProps(props) {
  if (!props)
    return null;
  let { class: klass, style } = props;
  if (klass && !isString$3(klass)) {
    props.class = normalizeClass(klass);
  }
  if (style) {
    props.style = normalizeStyle(style);
  }
  return props;
}
const HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
const SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
const VOID_TAGS = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr";
const isHTMLTag = /* @__PURE__ */ makeMap(HTML_TAGS);
const isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS);
const isVoidTag = /* @__PURE__ */ makeMap(VOID_TAGS);
const escapeRE = /["'&<>]/;
function escapeHtml(string) {
  const str = "" + string;
  const match = escapeRE.exec(str);
  if (!match) {
    return str;
  }
  let html = "";
  let escaped;
  let index2;
  let lastIndex = 0;
  for (index2 = match.index; index2 < str.length; index2++) {
    switch (str.charCodeAt(index2)) {
      case 34:
        escaped = "&quot;";
        break;
      case 38:
        escaped = "&amp;";
        break;
      case 39:
        escaped = "&#39;";
        break;
      case 60:
        escaped = "&lt;";
        break;
      case 62:
        escaped = "&gt;";
        break;
      default:
        continue;
    }
    if (lastIndex !== index2) {
      html += str.slice(lastIndex, index2);
    }
    lastIndex = index2 + 1;
    html += escaped;
  }
  return lastIndex !== index2 ? html + str.slice(lastIndex, index2) : html;
}
const commentStripRE = /^-?>|<!--|-->|--!>|<!-$/g;
function escapeHtmlComment(src) {
  return src.replace(commentStripRE, "");
}
function looseCompareArrays(a2, b2) {
  if (a2.length !== b2.length)
    return false;
  let equal = true;
  for (let i = 0; equal && i < a2.length; i++) {
    equal = looseEqual(a2[i], b2[i]);
  }
  return equal;
}
function looseEqual(a2, b2) {
  if (a2 === b2)
    return true;
  let aValidType = isDate(a2);
  let bValidType = isDate(b2);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? a2.getTime() === b2.getTime() : false;
  }
  aValidType = isArray$1(a2);
  bValidType = isArray$1(b2);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? looseCompareArrays(a2, b2) : false;
  }
  aValidType = isObject$3(a2);
  bValidType = isObject$3(b2);
  if (aValidType || bValidType) {
    if (!aValidType || !bValidType) {
      return false;
    }
    const aKeysCount = Object.keys(a2).length;
    const bKeysCount = Object.keys(b2).length;
    if (aKeysCount !== bKeysCount) {
      return false;
    }
    for (const key in a2) {
      const aHasKey = a2.hasOwnProperty(key);
      const bHasKey = b2.hasOwnProperty(key);
      if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a2[key], b2[key])) {
        return false;
      }
    }
  }
  return String(a2) === String(b2);
}
function looseIndexOf(arr, val) {
  return arr.findIndex((item) => looseEqual(item, val));
}
const toDisplayString = (val) => {
  return isString$3(val) ? val : val == null ? "" : isArray$1(val) || isObject$3(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject$3(val) && !isArray$1(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
const EMPTY_OBJ = {};
const EMPTY_ARR = [];
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend$1 = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const isArray$1 = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isDate = (val) => val instanceof Date;
const isFunction = (val) => typeof val === "function";
const isString$3 = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$3 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject$3(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString$3(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
const isBuiltInDirective = /* @__PURE__ */ makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c2) => c2 ? c2.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const toNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
let _globalThis$1;
const getGlobalThis = () => {
  return _globalThis$1 || (_globalThis$1 = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof commonjsGlobal !== "undefined" ? commonjsGlobal : {});
};
shared_cjs_prod.EMPTY_ARR = EMPTY_ARR;
shared_cjs_prod.EMPTY_OBJ = EMPTY_OBJ;
shared_cjs_prod.NO = NO;
shared_cjs_prod.NOOP = NOOP;
shared_cjs_prod.PatchFlagNames = PatchFlagNames;
shared_cjs_prod.camelize = camelize;
shared_cjs_prod.capitalize = capitalize;
shared_cjs_prod.def = def;
shared_cjs_prod.escapeHtml = escapeHtml;
shared_cjs_prod.escapeHtmlComment = escapeHtmlComment;
shared_cjs_prod.extend = extend$1;
shared_cjs_prod.generateCodeFrame = generateCodeFrame;
shared_cjs_prod.getGlobalThis = getGlobalThis;
shared_cjs_prod.hasChanged = hasChanged;
shared_cjs_prod.hasOwn = hasOwn;
shared_cjs_prod.hyphenate = hyphenate;
shared_cjs_prod.includeBooleanAttr = includeBooleanAttr;
shared_cjs_prod.invokeArrayFns = invokeArrayFns;
shared_cjs_prod.isArray = isArray$1;
shared_cjs_prod.isBooleanAttr = isBooleanAttr;
shared_cjs_prod.isBuiltInDirective = isBuiltInDirective;
shared_cjs_prod.isDate = isDate;
var isFunction_1 = shared_cjs_prod.isFunction = isFunction;
shared_cjs_prod.isGloballyWhitelisted = isGloballyWhitelisted;
shared_cjs_prod.isHTMLTag = isHTMLTag;
shared_cjs_prod.isIntegerKey = isIntegerKey;
shared_cjs_prod.isKnownHtmlAttr = isKnownHtmlAttr;
shared_cjs_prod.isKnownSvgAttr = isKnownSvgAttr;
shared_cjs_prod.isMap = isMap;
shared_cjs_prod.isModelListener = isModelListener;
shared_cjs_prod.isNoUnitNumericStyleProp = isNoUnitNumericStyleProp;
shared_cjs_prod.isObject = isObject$3;
shared_cjs_prod.isOn = isOn;
shared_cjs_prod.isPlainObject = isPlainObject;
shared_cjs_prod.isPromise = isPromise;
shared_cjs_prod.isReservedProp = isReservedProp;
shared_cjs_prod.isSSRSafeAttrName = isSSRSafeAttrName;
shared_cjs_prod.isSVGTag = isSVGTag;
shared_cjs_prod.isSet = isSet;
shared_cjs_prod.isSpecialBooleanAttr = isSpecialBooleanAttr;
shared_cjs_prod.isString = isString$3;
shared_cjs_prod.isSymbol = isSymbol;
shared_cjs_prod.isVoidTag = isVoidTag;
shared_cjs_prod.looseEqual = looseEqual;
shared_cjs_prod.looseIndexOf = looseIndexOf;
shared_cjs_prod.makeMap = makeMap;
shared_cjs_prod.normalizeClass = normalizeClass;
shared_cjs_prod.normalizeProps = normalizeProps;
shared_cjs_prod.normalizeStyle = normalizeStyle;
shared_cjs_prod.objectToString = objectToString;
shared_cjs_prod.parseStringStyle = parseStringStyle;
shared_cjs_prod.propsToAttrMap = propsToAttrMap;
shared_cjs_prod.remove = remove;
shared_cjs_prod.slotFlagsText = slotFlagsText;
shared_cjs_prod.stringifyStyle = stringifyStyle;
shared_cjs_prod.toDisplayString = toDisplayString;
shared_cjs_prod.toHandlerKey = toHandlerKey;
shared_cjs_prod.toNumber = toNumber;
shared_cjs_prod.toRawType = toRawType;
shared_cjs_prod.toTypeString = toTypeString;
function useMeta(meta2) {
  const resolvedMeta = isFunction_1(meta2) ? computed(meta2) : meta2;
  useNuxtApp()._useMeta(resolvedMeta);
}
const removeUndefinedProps = (props) => Object.fromEntries(Object.entries(props).filter(([, value]) => value !== void 0));
const setupForUseMeta = (metaFactory, renderChild) => (props, ctx) => {
  useMeta(() => metaFactory(__spreadValues(__spreadValues({}, removeUndefinedProps(props)), ctx.attrs), ctx));
  return () => {
    var _a, _b;
    return renderChild ? (_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a) : null;
  };
};
const globalProps = {
  accesskey: String,
  autocapitalize: String,
  autofocus: {
    type: Boolean,
    default: void 0
  },
  class: String,
  contenteditable: {
    type: Boolean,
    default: void 0
  },
  contextmenu: String,
  dir: String,
  draggable: {
    type: Boolean,
    default: void 0
  },
  enterkeyhint: String,
  exportparts: String,
  hidden: {
    type: Boolean,
    default: void 0
  },
  id: String,
  inputmode: String,
  is: String,
  itemid: String,
  itemprop: String,
  itemref: String,
  itemscope: String,
  itemtype: String,
  lang: String,
  nonce: String,
  part: String,
  slot: String,
  spellcheck: {
    type: Boolean,
    default: void 0
  },
  style: String,
  tabindex: String,
  title: String,
  translate: String
};
const Script = defineComponent({
  name: "Script",
  props: __spreadProps(__spreadValues({}, globalProps), {
    async: Boolean,
    crossorigin: {
      type: [Boolean, String],
      default: void 0
    },
    defer: Boolean,
    integrity: String,
    nomodule: Boolean,
    nonce: String,
    referrerpolicy: String,
    src: String,
    type: String,
    charset: String,
    language: String
  }),
  setup: setupForUseMeta((script) => ({
    script: [script]
  }))
});
const Link = defineComponent({
  name: "Link",
  props: __spreadProps(__spreadValues({}, globalProps), {
    as: String,
    crossorigin: String,
    disabled: Boolean,
    href: String,
    hreflang: String,
    imagesizes: String,
    imagesrcset: String,
    integrity: String,
    media: String,
    prefetch: {
      type: Boolean,
      default: void 0
    },
    referrerpolicy: String,
    rel: String,
    sizes: String,
    title: String,
    type: String,
    methods: String,
    target: String
  }),
  setup: setupForUseMeta((link) => ({
    link: [link]
  }))
});
const Base = defineComponent({
  name: "Base",
  props: __spreadProps(__spreadValues({}, globalProps), {
    href: String,
    target: String
  }),
  setup: setupForUseMeta((base) => ({
    base
  }))
});
const Title = defineComponent({
  name: "Title",
  setup: setupForUseMeta((_, { slots }) => {
    var _a, _b;
    const title = ((_b = (_a = slots.default()) == null ? void 0 : _a[0]) == null ? void 0 : _b.children) || null;
    return {
      title
    };
  })
});
const Meta = defineComponent({
  name: "Meta",
  props: __spreadProps(__spreadValues({}, globalProps), {
    charset: String,
    content: String,
    httpEquiv: String,
    key: String,
    name: String
  }),
  setup: setupForUseMeta((meta2) => ({
    meta: [meta2]
  }))
});
const Style = defineComponent({
  name: "Style",
  props: __spreadProps(__spreadValues({}, globalProps), {
    type: String,
    media: String,
    nonce: String,
    title: String,
    scoped: {
      type: Boolean,
      default: void 0
    }
  }),
  setup: setupForUseMeta((props, { slots }) => {
    var _a, _b, _c;
    const style = __spreadValues({}, props);
    const textContent = (_c = (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) == null ? void 0 : _b[0]) == null ? void 0 : _c.children;
    if (textContent) {
      style.children = textContent;
    }
    return {
      style: [style]
    };
  })
});
const Head = defineComponent({
  name: "Head",
  setup: (_props, ctx) => () => {
    var _a, _b;
    return (_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a);
  }
});
const Html = defineComponent({
  name: "Html",
  props: __spreadProps(__spreadValues({}, globalProps), {
    manifest: String,
    version: String,
    xmlns: String
  }),
  setup: setupForUseMeta((htmlAttrs) => ({ htmlAttrs }), true)
});
const Body = defineComponent({
  name: "Body",
  props: globalProps,
  setup: setupForUseMeta((bodyAttrs) => ({ bodyAttrs }), true)
});
const Components = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  Script,
  Link,
  Base,
  Title,
  Meta,
  Style,
  Head,
  Html,
  Body
});
const metaConfig = { "globalMeta": { "meta": [{ "charset": "utf-8" }, { "name": "viewport", "content": "width=device-width, initial-scale=1" }], "link": [{ "rel": "stylesheet", "href": "https://pro.fontawesome.com/releases/v5.15.3/css/all.css" }], "style": [], "script": [] }, "mixinKey": "created" };
const plugin_89c5bb1c = defineNuxtPlugin((nuxtApp) => {
  useMeta(metaConfig.globalMeta);
  nuxtApp.vueApp.mixin({
    [metaConfig.mixinKey]() {
      var _a;
      const instance = getCurrentInstance();
      const options2 = (instance == null ? void 0 : instance.type) || ((_a = instance == null ? void 0 : instance.proxy) == null ? void 0 : _a.$options);
      if (!options2 || !("head" in options2)) {
        return;
      }
      const source = typeof options2.head === "function" ? computed(() => options2.head(nuxtApp)) : options2.head;
      useMeta(source);
    }
  });
  for (const name in Components) {
    nuxtApp.vueApp.component(name, Components[name]);
  }
});
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey = (override, routeProps) => {
  var _a;
  const matchedRoute = routeProps.route.matched.find((m) => m.components.default === routeProps.Component.type);
  const source = (_a = override != null ? override : matchedRoute == null ? void 0 : matchedRoute.meta.key) != null ? _a : interpolatePath(routeProps.route, matchedRoute);
  return typeof source === "function" ? source(routeProps.route) : source;
};
const Fragment = {
  setup(_props, { slots }) {
    return () => slots.default();
  }
};
const wrapIf = (component, props, slots) => {
  return { default: () => props ? h(component, props === true ? {} : props, slots) : h(Fragment, {}, slots) };
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
const NuxtPage = defineComponent({
  name: "NuxtPage",
  props: {
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props) {
    const nuxtApp = useNuxtApp();
    return () => {
      return h(RouterView, {}, {
        default: (routeProps) => {
          var _a;
          return routeProps.Component && wrapIf(Transition, (_a = routeProps.route.meta.pageTransition) != null ? _a : defaultPageTransition, wrapInKeepAlive(routeProps.route.meta.keepalive, h(Suspense, {
            onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
            onResolve: () => nuxtApp.callHook("page:finish", routeProps.Component)
          }, { default: () => h(routeProps.Component, { key: generateRouteKey(props.pageKey, routeProps) }) }))).default();
        }
      });
    };
  }
});
const defaultPageTransition = { name: "page", mode: "out-in" };
const layouts = {
  default: defineAsyncComponent({ suspensible: false, loader: () => Promise.resolve().then(function() {
    return _default;
  }) })
};
const defaultLayoutTransition = { name: "layout", mode: "out-in" };
const NuxtLayout = defineComponent({
  props: {
    name: {
      type: [String, Boolean, Object],
      default: null
    }
  },
  setup(props, context) {
    const route = useRoute();
    return () => {
      var _a, _b, _c;
      const layout = (_b = (_a = isRef(props.name) ? props.name.value : props.name) != null ? _a : route.meta.layout) != null ? _b : "default";
      const hasLayout = layout && layout in layouts;
      return wrapIf(Transition, hasLayout && ((_c = route.meta.layoutTransition) != null ? _c : defaultLayoutTransition), wrapIf(layouts[layout], hasLayout, context.slots)).default();
    };
  }
});
const _sfc_main$x = {
  __ssrInlineRender: true,
  props: {
    message: {
      type: String
    },
    messageData: {
      type: Object
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><header class="container aspect-video grid place-items-center pt-16">`);
      ssrRenderSuspense(_push, {
        default: () => {
          _push(`<iframe class="w-full aspect-video"${ssrRenderAttr("src", `https://www.youtube.com/embed/${__props.message}?modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&theme=light&color=white&controls=1`)} frameborder="0" color="green" allowfullscreen>
				</iframe>`);
        },
        _: 1
      });
      _push(`</header><div>${ssrInterpolate(__props.messageData.title)}<br> ${ssrInterpolate(__props.messageData.pastor)}<br> ${ssrInterpolate(__props.messageData.date)}<br> ${ssrInterpolate(__props.messageData.description)}<br></div></div>`);
    };
  }
};
const _sfc_setup$x = _sfc_main$x.setup;
_sfc_main$x.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Watch.vue");
  return _sfc_setup$x ? _sfc_setup$x(props, ctx) : void 0;
};
const Watch = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _sfc_main$x
});
const _sfc_main$w = {
  __ssrInlineRender: true,
  props: {
    series: {
      type: Object
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><header class="aspect-video grid place-items-center bg-cover bg-center px-4" style="${ssrRenderStyle({
        backgroundImage: "linear-gradient(to left, rgba(000, 000, 000, 0.00), rgba(000, 000, 000, 0.73)), url(" + __props.series.image + ")"
      })}"></header><div class="container"><h1>${ssrInterpolate(__props.series.title)}</h1><p>${ssrInterpolate(__props.series.description)}</p></div></div>`);
    };
  }
};
const _sfc_setup$w = _sfc_main$w.setup;
_sfc_main$w.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Sermon.vue");
  return _sfc_setup$w ? _sfc_setup$w(props, ctx) : void 0;
};
const Sermon = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _sfc_main$w
});
function set(target, key, val) {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }
  target[key] = val;
  return val;
}
function del(target, key) {
  if (Array.isArray(target)) {
    target.splice(key, 1);
    return;
  }
  delete target[key];
}
function createEventHook() {
  const fns = [];
  const off = (fn) => {
    const index2 = fns.indexOf(fn);
    if (index2 !== -1)
      fns.splice(index2, 1);
  };
  const on = (fn) => {
    fns.push(fn);
    return {
      off: () => off(fn)
    };
  };
  const trigger = (param) => {
    fns.forEach((fn) => fn(param));
  };
  return {
    on,
    off,
    trigger
  };
}
function tryOnScopeDispose$1(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
const toString$1 = Object.prototype.toString;
const isNumber$1 = (val) => typeof val === "number";
const isString$2 = (val) => typeof val === "string";
const isObject$2 = (val) => toString$1.call(val) === "[object Object]";
const noop$1 = () => {
};
function createFilterWrapper(filter2, fn) {
  function wrapper(...args) {
    filter2(() => fn.apply(this, args), { fn, thisArg: this, args });
  }
  return wrapper;
}
const bypassFilter = (invoke) => {
  return invoke();
};
function promiseTimeout(ms, throwOnTimeout = false, reason = "Timeout") {
  return new Promise((resolve, reject) => {
    if (throwOnTimeout)
      setTimeout(() => reject(reason), ms);
    else
      setTimeout(resolve, ms);
  });
}
function containsProp(obj, ...props) {
  return props.some((k) => k in obj);
}
var __defProp$6 = Object.defineProperty;
var __defProps$3 = Object.defineProperties;
var __getOwnPropDescs$3 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$7 = Object.getOwnPropertySymbols;
var __hasOwnProp$7 = Object.prototype.hasOwnProperty;
var __propIsEnum$7 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$6 = (obj, key, value) => key in obj ? __defProp$6(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$6 = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp$7.call(b2, prop))
      __defNormalProp$6(a2, prop, b2[prop]);
  if (__getOwnPropSymbols$7)
    for (var prop of __getOwnPropSymbols$7(b2)) {
      if (__propIsEnum$7.call(b2, prop))
        __defNormalProp$6(a2, prop, b2[prop]);
    }
  return a2;
};
var __spreadProps$3 = (a2, b2) => __defProps$3(a2, __getOwnPropDescs$3(b2));
var __objRest$3 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$7.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$7)
    for (var prop of __getOwnPropSymbols$7(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$7.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function ignorableWatch(source, cb2, options2 = {}) {
  const _a = options2, {
    eventFilter = bypassFilter
  } = _a, watchOptions = __objRest$3(_a, [
    "eventFilter"
  ]);
  const filteredCb = createFilterWrapper(eventFilter, cb2);
  let ignoreUpdates;
  let ignorePrevAsyncUpdates;
  let stop;
  if (watchOptions.flush === "sync") {
    const ignore = ref(false);
    ignorePrevAsyncUpdates = () => {
    };
    ignoreUpdates = (updater) => {
      ignore.value = true;
      updater();
      ignore.value = false;
    };
    stop = watch(source, (...args) => {
      if (!ignore.value)
        filteredCb(...args);
    }, watchOptions);
  } else {
    const disposables = [];
    const ignoreCounter = ref(0);
    const syncCounter = ref(0);
    ignorePrevAsyncUpdates = () => {
      ignoreCounter.value = syncCounter.value;
    };
    disposables.push(watch(source, () => {
      syncCounter.value++;
    }, __spreadProps$3(__spreadValues$6({}, watchOptions), { flush: "sync" })));
    ignoreUpdates = (updater) => {
      const syncCounterPrev = syncCounter.value;
      updater();
      ignoreCounter.value += syncCounter.value - syncCounterPrev;
    };
    disposables.push(watch(source, (...args) => {
      const ignore = ignoreCounter.value > 0 && ignoreCounter.value === syncCounter.value;
      ignoreCounter.value = 0;
      syncCounter.value = 0;
      if (ignore)
        return;
      filteredCb(...args);
    }, watchOptions));
    stop = () => {
      disposables.forEach((fn) => fn());
    };
  }
  return { stop, ignoreUpdates, ignorePrevAsyncUpdates };
}
function until(r) {
  let isNot = false;
  function toMatch(condition, { flush = "sync", deep = false, timeout, throwOnTimeout } = {}) {
    let stop = null;
    const watcher = new Promise((resolve) => {
      stop = watch(r, (v) => {
        if (condition(v) === !isNot) {
          stop == null ? void 0 : stop();
          resolve();
        }
      }, {
        flush,
        deep,
        immediate: true
      });
    });
    const promises = [watcher];
    if (timeout) {
      promises.push(promiseTimeout(timeout, throwOnTimeout).finally(() => {
        stop == null ? void 0 : stop();
      }));
    }
    return Promise.race(promises);
  }
  function toBe(value, options2) {
    return toMatch((v) => v === unref(value), options2);
  }
  function toBeTruthy(options2) {
    return toMatch((v) => Boolean(v), options2);
  }
  function toBeNull(options2) {
    return toBe(null, options2);
  }
  function toBeUndefined(options2) {
    return toBe(void 0, options2);
  }
  function toBeNaN(options2) {
    return toMatch(Number.isNaN, options2);
  }
  function toContains(value, options2) {
    return toMatch((v) => {
      const array = Array.from(v);
      return array.includes(value) || array.includes(unref(value));
    }, options2);
  }
  function changed(options2) {
    return changedTimes(1, options2);
  }
  function changedTimes(n = 1, options2) {
    let count = -1;
    return toMatch(() => {
      count += 1;
      return count >= n;
    }, options2);
  }
  if (Array.isArray(unref(r))) {
    const instance = {
      toMatch,
      toContains,
      changed,
      changedTimes,
      get not() {
        isNot = !isNot;
        return this;
      }
    };
    return instance;
  } else {
    const instance = {
      toMatch,
      toBe,
      toBeTruthy,
      toBeNull,
      toBeNaN,
      toBeUndefined,
      changed,
      changedTimes,
      get not() {
        isNot = !isNot;
        return this;
      }
    };
    return instance;
  }
}
function useTimeoutFn(cb2, interval, options2 = {}) {
  const {
    immediate = true
  } = options2;
  const isPending = ref(false);
  let timer = null;
  function clear() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function stop() {
    isPending.value = false;
    clear();
  }
  function start(...args) {
    clear();
    isPending.value = true;
    timer = setTimeout(() => {
      isPending.value = false;
      timer = null;
      cb2(...args);
    }, unref(interval));
  }
  if (immediate) {
    isPending.value = true;
  }
  tryOnScopeDispose$1(stop);
  return {
    isPending,
    start,
    stop
  };
}
const defaultWindow$1 = void 0;
const defaultDocument = void 0;
function useEventListener$1(...args) {
  let target;
  let event;
  let listener;
  let options2;
  if (isString$2(args[0])) {
    [event, listener, options2] = args;
    target = defaultWindow$1;
  } else {
    [target, event, listener, options2] = args;
  }
  if (!target)
    return noop$1;
  let cleanup = noop$1;
  const stopWatch = watch(() => unref(target), (el) => {
    cleanup();
    if (!el)
      return;
    el.addEventListener(event, listener, options2);
    cleanup = () => {
      el.removeEventListener(event, listener, options2);
      cleanup = noop$1;
    };
  }, { immediate: true, flush: "post" });
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose$1(stop);
  return stop;
}
const _global = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey = "__vueuse_ssr_handlers__";
_global[globalKey] = _global[globalKey] || {};
_global[globalKey];
function useElementHover(el) {
  const isHovered = ref(false);
  useEventListener$1(el, "mouseenter", () => isHovered.value = true);
  useEventListener$1(el, "mouseleave", () => isHovered.value = false);
  return isHovered;
}
var __defProp$9 = Object.defineProperty;
var __defProps$4 = Object.defineProperties;
var __getOwnPropDescs$4 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$a = Object.getOwnPropertySymbols;
var __hasOwnProp$a = Object.prototype.hasOwnProperty;
var __propIsEnum$a = Object.prototype.propertyIsEnumerable;
var __defNormalProp$9 = (obj, key, value) => key in obj ? __defProp$9(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$9 = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp$a.call(b2, prop))
      __defNormalProp$9(a2, prop, b2[prop]);
  if (__getOwnPropSymbols$a)
    for (var prop of __getOwnPropSymbols$a(b2)) {
      if (__propIsEnum$a.call(b2, prop))
        __defNormalProp$9(a2, prop, b2[prop]);
    }
  return a2;
};
var __spreadProps$4 = (a2, b2) => __defProps$4(a2, __getOwnPropDescs$4(b2));
const payloadMapping = {
  json: "application/json",
  text: "text/plain",
  formData: "multipart/form-data"
};
function isFetchOptions(obj) {
  return containsProp(obj, "immediate", "refetch", "initialData", "timeout", "beforeFetch", "afterFetch", "onFetchError");
}
function headersToObject(headers) {
  if (headers instanceof Headers)
    return Object.fromEntries([...headers.entries()]);
  return headers;
}
function useFetch(url, ...args) {
  var _a;
  const supportsAbort = typeof AbortController === "function";
  let fetchOptions = {};
  let options2 = { immediate: true, refetch: false, timeout: 0 };
  const config = {
    method: "get",
    type: "text",
    payload: void 0
  };
  if (args.length > 0) {
    if (isFetchOptions(args[0]))
      options2 = __spreadValues$9(__spreadValues$9({}, options2), args[0]);
    else
      fetchOptions = args[0];
  }
  if (args.length > 1) {
    if (isFetchOptions(args[1]))
      options2 = __spreadValues$9(__spreadValues$9({}, options2), args[1]);
  }
  const {
    fetch: fetch2 = (_a = defaultWindow$1) == null ? void 0 : _a.fetch,
    initialData,
    timeout
  } = options2;
  const responseEvent = createEventHook();
  const errorEvent = createEventHook();
  const finallyEvent = createEventHook();
  const isFinished = ref(false);
  const isFetching = ref(false);
  const aborted = ref(false);
  const statusCode = ref(null);
  const response = shallowRef(null);
  const error = ref(null);
  const data = shallowRef(initialData);
  const canAbort = computed(() => supportsAbort && isFetching.value);
  let controller;
  let timer;
  const abort = () => {
    if (supportsAbort && controller)
      controller.abort();
  };
  const loading = (isLoading) => {
    isFetching.value = isLoading;
    isFinished.value = !isLoading;
  };
  if (timeout)
    timer = useTimeoutFn(abort, timeout, { immediate: false });
  const execute = async (throwOnFailed = false) => {
    var _a2;
    loading(true);
    error.value = null;
    statusCode.value = null;
    aborted.value = false;
    controller = void 0;
    if (supportsAbort) {
      controller = new AbortController();
      controller.signal.onabort = () => aborted.value = true;
      fetchOptions = __spreadProps$4(__spreadValues$9({}, fetchOptions), {
        signal: controller.signal
      });
    }
    const defaultFetchOptions = {
      method: config.method,
      headers: {}
    };
    if (config.payload) {
      const headers = headersToObject(defaultFetchOptions.headers);
      if (config.payloadType)
        headers["Content-Type"] = (_a2 = payloadMapping[config.payloadType]) != null ? _a2 : config.payloadType;
      defaultFetchOptions.body = config.payloadType === "json" ? JSON.stringify(unref(config.payload)) : unref(config.payload);
    }
    let isCanceled = false;
    const context = { url: unref(url), options: fetchOptions, cancel: () => {
      isCanceled = true;
    } };
    if (options2.beforeFetch)
      Object.assign(context, await options2.beforeFetch(context));
    if (isCanceled || !fetch2) {
      loading(false);
      return Promise.resolve(null);
    }
    let responseData = null;
    if (timer)
      timer.start();
    return new Promise((resolve, reject) => {
      var _a3;
      fetch2(context.url, __spreadProps$4(__spreadValues$9(__spreadValues$9({}, defaultFetchOptions), context.options), {
        headers: __spreadValues$9(__spreadValues$9({}, headersToObject(defaultFetchOptions.headers)), headersToObject((_a3 = context.options) == null ? void 0 : _a3.headers))
      })).then(async (fetchResponse) => {
        response.value = fetchResponse;
        statusCode.value = fetchResponse.status;
        responseData = await fetchResponse[config.type]();
        if (options2.afterFetch)
          ({ data: responseData } = await options2.afterFetch({ data: responseData, response: fetchResponse }));
        data.value = responseData;
        if (!fetchResponse.ok)
          throw new Error(fetchResponse.statusText);
        responseEvent.trigger(fetchResponse);
        return resolve(fetchResponse);
      }).catch(async (fetchError) => {
        let errorData = fetchError.message || fetchError.name;
        if (options2.onFetchError)
          ({ data: responseData, error: errorData } = await options2.onFetchError({ data: responseData, error: fetchError }));
        data.value = responseData;
        error.value = errorData;
        errorEvent.trigger(fetchError);
        if (throwOnFailed)
          return reject(fetchError);
        return resolve(null);
      }).finally(() => {
        loading(false);
        if (timer)
          timer.stop();
        finallyEvent.trigger(null);
      });
    });
  };
  watch(() => [
    unref(url),
    unref(options2.refetch)
  ], () => unref(options2.refetch) && execute(), { deep: true });
  const shell = {
    isFinished,
    statusCode,
    response,
    error,
    data,
    isFetching,
    canAbort,
    aborted,
    abort,
    execute,
    onFetchResponse: responseEvent.on,
    onFetchError: errorEvent.on,
    onFetchFinally: finallyEvent.on,
    get: setMethod("get"),
    put: setMethod("put"),
    post: setMethod("post"),
    delete: setMethod("delete"),
    patch: setMethod("patch"),
    head: setMethod("head"),
    options: setMethod("options"),
    json: setType("json"),
    text: setType("text"),
    blob: setType("blob"),
    arrayBuffer: setType("arrayBuffer"),
    formData: setType("formData")
  };
  function setMethod(method) {
    return (payload, payloadType) => {
      if (!isFetching.value) {
        config.method = method;
        config.payload = payload;
        config.payloadType = payloadType;
        if (isRef(config.payload)) {
          watch(() => [
            unref(config.payload),
            unref(options2.refetch)
          ], () => unref(options2.refetch) && execute(), { deep: true });
        }
        if (!payloadType && unref(payload) && Object.getPrototypeOf(unref(payload)) === Object.prototype)
          config.payloadType = "json";
        return shell;
      }
      return void 0;
    };
  }
  function waitUntilFinished() {
    return new Promise((resolve, reject) => {
      until(isFinished).toBe(true).then(() => resolve(shell)).catch((error2) => reject(error2));
    });
  }
  function setType(type) {
    return () => {
      if (!isFetching.value) {
        config.type = type;
        return __spreadProps$4(__spreadValues$9({}, shell), {
          then(onFulfilled, onRejected) {
            return waitUntilFinished().then(onFulfilled, onRejected);
          }
        });
      }
      return void 0;
    };
  }
  if (options2.immediate)
    setTimeout(execute, 0);
  return __spreadProps$4(__spreadValues$9({}, shell), {
    then(onFulfilled, onRejected) {
      return waitUntilFinished().then(onFulfilled, onRejected);
    }
  });
}
var __defProp$7 = Object.defineProperty;
var __getOwnPropSymbols$8 = Object.getOwnPropertySymbols;
var __hasOwnProp$8 = Object.prototype.hasOwnProperty;
var __propIsEnum$8 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$7 = (obj, key, value) => key in obj ? __defProp$7(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$7 = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp$8.call(b2, prop))
      __defNormalProp$7(a2, prop, b2[prop]);
  if (__getOwnPropSymbols$8)
    for (var prop of __getOwnPropSymbols$8(b2)) {
      if (__propIsEnum$8.call(b2, prop))
        __defNormalProp$7(a2, prop, b2[prop]);
    }
  return a2;
};
function usingElRef(source, cb2) {
  if (unref(source))
    cb2(unref(source));
}
function timeRangeToArray(timeRanges) {
  let ranges = [];
  for (let i = 0; i < timeRanges.length; ++i)
    ranges = [...ranges, [timeRanges.start(i), timeRanges.end(i)]];
  return ranges;
}
function tracksToArray(tracks) {
  return Array.from(tracks).map(({ label, kind, language, mode, activeCues, cues, inBandMetadataTrackDispatchType }, id) => ({ id, label, kind, language, mode, activeCues, cues, inBandMetadataTrackDispatchType }));
}
const defaultOptions = {
  src: "",
  tracks: []
};
function useMediaControls(target, options2 = {}) {
  options2 = __spreadValues$7(__spreadValues$7({}, defaultOptions), options2);
  const {
    document = defaultDocument
  } = options2;
  const currentTime = ref(0);
  const duration = ref(0);
  const seeking = ref(false);
  const volume = ref(1);
  const waiting = ref(false);
  const ended = ref(false);
  const playing = ref(false);
  const rate = ref(1);
  const stalled = ref(false);
  const buffered = ref([]);
  const tracks = ref([]);
  const selectedTrack = ref(-1);
  const isPictureInPicture = ref(false);
  const muted = ref(false);
  const supportsPictureInPicture = document && "pictureInPictureEnabled" in document;
  const sourceErrorEvent = createEventHook();
  const disableTrack = (track) => {
    usingElRef(target, (el) => {
      if (track) {
        const id = isNumber$1(track) ? track : track.id;
        el.textTracks[id].mode = "disabled";
      } else {
        for (let i = 0; i < el.textTracks.length; ++i)
          el.textTracks[i].mode = "disabled";
      }
      selectedTrack.value = -1;
    });
  };
  const enableTrack = (track, disableTracks = true) => {
    usingElRef(target, (el) => {
      const id = isNumber$1(track) ? track : track.id;
      if (disableTracks)
        disableTrack();
      el.textTracks[id].mode = "showing";
      selectedTrack.value = id;
    });
  };
  const togglePictureInPicture = () => {
    return new Promise((resolve, reject) => {
      usingElRef(target, async (el) => {
        if (supportsPictureInPicture) {
          if (!isPictureInPicture.value) {
            el.requestPictureInPicture().then(resolve).catch(reject);
          } else {
            document.exitPictureInPicture().then(resolve).catch(reject);
          }
        }
      });
    });
  };
  watchEffect(() => {
    if (!document)
      return;
    const el = unref(target);
    if (!el)
      return;
    const src = unref(options2.src);
    let sources = [];
    if (!src)
      return;
    if (isString$2(src))
      sources = [{ src }];
    else if (Array.isArray(src))
      sources = src;
    else if (isObject$2(src))
      sources = [src];
    el.querySelectorAll("source").forEach((e) => {
      e.removeEventListener("error", sourceErrorEvent.trigger);
      e.remove();
    });
    sources.forEach(({ src: src2, type }) => {
      const source = document.createElement("source");
      source.setAttribute("src", src2);
      source.setAttribute("type", type || "");
      source.addEventListener("error", sourceErrorEvent.trigger);
      el.appendChild(source);
    });
    el.load();
  });
  tryOnScopeDispose$1(() => {
    const el = unref(target);
    if (!el)
      return;
    el.querySelectorAll("source").forEach((e) => e.removeEventListener("error", sourceErrorEvent.trigger));
  });
  watch(volume, (vol) => {
    const el = unref(target);
    if (!el)
      return;
    el.volume = vol;
  });
  watch(muted, (mute) => {
    const el = unref(target);
    if (!el)
      return;
    el.muted = mute;
  });
  watch(rate, (rate2) => {
    const el = unref(target);
    if (!el)
      return;
    el.playbackRate = rate2;
  });
  watchEffect(() => {
    if (!document)
      return;
    const textTracks = unref(options2.tracks);
    const el = unref(target);
    if (!textTracks || !textTracks.length || !el)
      return;
    el.querySelectorAll("track").forEach((e) => e.remove());
    textTracks.forEach(({ default: isDefault, kind, label, src, srcLang }, i) => {
      const track = document.createElement("track");
      track.default = isDefault || false;
      track.kind = kind;
      track.label = label;
      track.src = src;
      track.srclang = srcLang;
      if (track.default)
        selectedTrack.value = i;
      el.appendChild(track);
    });
  });
  const { ignoreUpdates: ignoreCurrentTimeUpdates } = ignorableWatch(currentTime, (time) => {
    const el = unref(target);
    if (!el)
      return;
    el.currentTime = time;
  });
  const { ignoreUpdates: ignorePlayingUpdates } = ignorableWatch(playing, (isPlaying) => {
    const el = unref(target);
    if (!el)
      return;
    isPlaying ? el.play() : el.pause();
  });
  useEventListener$1(target, "timeupdate", () => ignoreCurrentTimeUpdates(() => currentTime.value = unref(target).currentTime));
  useEventListener$1(target, "durationchange", () => duration.value = unref(target).duration);
  useEventListener$1(target, "progress", () => buffered.value = timeRangeToArray(unref(target).buffered));
  useEventListener$1(target, "seeking", () => seeking.value = true);
  useEventListener$1(target, "seeked", () => seeking.value = false);
  useEventListener$1(target, "waiting", () => waiting.value = true);
  useEventListener$1(target, "playing", () => waiting.value = false);
  useEventListener$1(target, "ratechange", () => rate.value = unref(target).playbackRate);
  useEventListener$1(target, "stalled", () => stalled.value = true);
  useEventListener$1(target, "ended", () => ended.value = true);
  useEventListener$1(target, "pause", () => ignorePlayingUpdates(() => playing.value = false));
  useEventListener$1(target, "play", () => ignorePlayingUpdates(() => playing.value = true));
  useEventListener$1(target, "enterpictureinpicture", () => isPictureInPicture.value = true);
  useEventListener$1(target, "leavepictureinpicture", () => isPictureInPicture.value = false);
  useEventListener$1(target, "volumechange", () => {
    const el = unref(target);
    if (!el)
      return;
    volume.value = el.volume;
    muted.value = el.muted;
  });
  const listeners = [];
  const stop = watch([target], () => {
    const el = unref(target);
    if (!el)
      return;
    stop();
    listeners[0] = useEventListener$1(el.textTracks, "addtrack", () => tracks.value = tracksToArray(el.textTracks));
    listeners[1] = useEventListener$1(el.textTracks, "removetrack", () => tracks.value = tracksToArray(el.textTracks));
    listeners[2] = useEventListener$1(el.textTracks, "change", () => tracks.value = tracksToArray(el.textTracks));
  });
  tryOnScopeDispose$1(() => listeners.forEach((listener) => listener()));
  return {
    currentTime,
    duration,
    waiting,
    seeking,
    ended,
    stalled,
    buffered,
    playing,
    rate,
    volume,
    muted,
    tracks,
    selectedTrack,
    enableTrack,
    disableTrack,
    supportsPictureInPicture,
    togglePictureInPicture,
    isPictureInPicture,
    onSourceError: sourceErrorEvent.on
  };
}
var __defProp$3 = Object.defineProperty;
var __getOwnPropSymbols$3 = Object.getOwnPropertySymbols;
var __hasOwnProp$3 = Object.prototype.hasOwnProperty;
var __propIsEnum$3 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$3 = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp$3.call(b2, prop))
      __defNormalProp$3(a2, prop, b2[prop]);
  if (__getOwnPropSymbols$3)
    for (var prop of __getOwnPropSymbols$3(b2)) {
      if (__propIsEnum$3.call(b2, prop))
        __defNormalProp$3(a2, prop, b2[prop]);
    }
  return a2;
};
const initialRect = {
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  height: 0,
  width: 0
};
__spreadValues$3({
  text: ""
}, initialRect);
const SermonSlider_vue_vue_type_style_index_0_scoped_true_lang = "";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$v = {
  __ssrInlineRender: true,
  props: {
    series: {
      required: true,
      type: Array
    }
  },
  setup(__props) {
    ref(null);
    ref(null);
    ref([Navigation, Pagination, Scrollbar, A11y]);
    ref({
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative h-xl" }, _attrs))} data-v-e92adcf6><div class="absolute top-1/2 left-10 z-10" data-v-e92adcf6>prev</div><div class="absolute top-1/2 right-10 z-10" data-v-e92adcf6>next</div>`);
      _push(ssrRenderComponent(unref(Swiper), {
        slidesPerView: "1",
        instanceName: "sermon"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(__props.series, (sermon2, index2) => {
              _push2(ssrRenderComponent(unref(SwiperSlide), {
                key: "index",
                class: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="bg-red-400 bg-center bg-cover h-xl" style="${ssrRenderStyle({ backgroundImage: `url(/images/${sermon2.id}.jpg)` })}" data-v-e92adcf6${_scopeId2}> wevkwepknvpwknepvknwpeknvpnp </div>`);
                  } else {
                    return [
                      createVNode("div", {
                        class: "bg-red-400 bg-center bg-cover h-xl",
                        style: { backgroundImage: `url(/images/${sermon2.id}.jpg)` }
                      }, " wevkwepknvpwknepvknwpeknvpnp ", 4)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment$1, null, renderList(__props.series, (sermon2, index2) => {
                return openBlock(), createBlock(unref(SwiperSlide), {
                  key: "index",
                  class: ""
                }, {
                  default: withCtx(() => [
                    createVNode("div", {
                      class: "bg-red-400 bg-center bg-cover h-xl",
                      style: { backgroundImage: `url(/images/${sermon2.id}.jpg)` }
                    }, " wevkwepknvpwknepvknwpeknvpnp ", 4)
                  ]),
                  _: 2
                }, 1024);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$v = _sfc_main$v.setup;
_sfc_main$v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SermonSlider.vue");
  return _sfc_setup$v ? _sfc_setup$v(props, ctx) : void 0;
};
const SeriesSlider = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["__scopeId", "data-v-e92adcf6"]]);
const SermonSlider = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": SeriesSlider
});
const mediaScroller_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$u = {
  __ssrInlineRender: true,
  setup(__props) {
    ref();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-07e967fe><div class="media-scroller snaps-inline" data-v-07e967fe>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div><button data-v-07e967fe>Slide left</button><button data-v-07e967fe>Slide right</button></div>`);
    };
  }
};
const _sfc_setup$u = _sfc_main$u.setup;
_sfc_main$u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/mediaScroller.vue");
  return _sfc_setup$u ? _sfc_setup$u(props, ctx) : void 0;
};
const mediaScroller = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["__scopeId", "data-v-07e967fe"]]);
const mediaScroller$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": mediaScroller
});
const meta$a = void 0;
const NUXT_BASE$2 = NUXT_CONFIG.app.cdnURL || NUXT_CONFIG.app.baseURL;
const _imports_0$2 = `${NUXT_BASE$2}images/icons/sprite.svg`;
const VisionSlider_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$4 = _imports_0$2 + "#triangle";
const _sfc_main$t = {
  __ssrInlineRender: true,
  setup(__props) {
    ref();
    const end = ref(true);
    const start = ref(false);
    ref(true);
    ref(false);
    const activeSlide = ref(0);
    const slides = ref([
      {
        title: "Local Vision",
        text: "Our local churches are destinations where people experience and learn to access an overflow of peace, prosperity, security, stability health, healing and truth through Christ. God has led us to plant churches in several cities. In this season, God is calling us to expand and plant once again in Lakeland, Florida, and Riverview, Florida."
      },
      {
        title: "Community Outreach",
        text: "God has made a promise to us that we will build leaders and impact nations around the world on the value of long term relationships. God has spoken to us that Greg Powe Ministries, which our founding Pastor formed over 20 years ago, is to become Living Legacy in honor of his commitment to building strong leaders who would create and inspire change from generation to generation."
      },
      {
        title: "Body of Christ Vision",
        text: "God has spoken great things to us that require great provision. We believe God will provide and exceed our $1 million goal to achieve these accomplishments. We are believing God to bring increase and overflow into the life of every person seeking to sow and partner with us in this great work that will touch and heal many lives and bring glory to God\u2019s kingdom."
      },
      {
        title: "Embracing Legacy (Our Youth)",
        text: "Innovation and Arts Center The goal of Embracing Legacy (EL) is to positively impact 1,000 Tampa Bay area youth weekly through the arts and academics in order to leave a legacy of character, hope and prosperity for generations to come."
      }
    ]);
    const backText = computed(() => {
      if (activeSlide.value - 1 < 0)
        return;
      const str = slides.value[activeSlide.value - 1].title;
      return str.slice(0, 13) + "...";
    });
    const nextText = computed(() => {
      if (activeSlide.value + 1 === slides.value.length)
        return;
      const str = slides.value[activeSlide.value + 1].title;
      return str.slice(0, 13) + "...";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-76cd5e1e>`);
      _push(ssrRenderComponent(unref(Swiper), { breakpoints: {
        640: { slidesPerView: 1, spaceBetween: 20 },
        768: {
          slidesPerView: 1,
          spaceBetween: 40
        },
        1024: {
          slidesPerView: 1,
          spaceBetween: 100
        }
      } }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(slides.value, (slide, index2) => {
              _push2(ssrRenderComponent(unref(SwiperSlide), { key: index2 }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="grid place-content-center border-accent" data-v-76cd5e1e${_scopeId2}>${ssrInterpolate(slide.title)}<br data-v-76cd5e1e${_scopeId2}> ${ssrInterpolate(slide.text)}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "grid place-content-center border-accent" }, [
                        createTextVNode(toDisplayString$1(slide.title), 1),
                        createVNode("br"),
                        createTextVNode(" " + toDisplayString$1(slide.text), 1)
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment$1, null, renderList(slides.value, (slide, index2) => {
                return openBlock(), createBlock(unref(SwiperSlide), { key: index2 }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "grid place-content-center border-accent" }, [
                      createTextVNode(toDisplayString$1(slide.title), 1),
                      createVNode("br"),
                      createTextVNode(" " + toDisplayString$1(slide.text), 1)
                    ])
                  ]),
                  _: 2
                }, 1024);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="w-full flex" data-v-76cd5e1e><div class="btn mr-auto flex items-center" style="${ssrRenderStyle(start.value ? null : { display: "none" })}" data-v-76cd5e1e><div data-v-76cd5e1e><svg class="prev" data-v-76cd5e1e><use${ssrRenderAttr("xlink:href", _hoisted_1$4)} data-v-76cd5e1e></use></svg></div> ${ssrInterpolate(unref(backText))}</div><div class="btn ml-auto flex items-center" style="${ssrRenderStyle(end.value ? null : { display: "none" })}" data-v-76cd5e1e>${ssrInterpolate(unref(nextText))} <div data-v-76cd5e1e><svg class="next" data-v-76cd5e1e><use${ssrRenderAttr("xlink:href", _hoisted_1$4)} data-v-76cd5e1e></use></svg></div></div></div></div>`);
    };
  }
};
const _sfc_setup$t = _sfc_main$t.setup;
_sfc_main$t.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/VisionSlider.vue");
  return _sfc_setup$t ? _sfc_setup$t(props, ctx) : void 0;
};
const VisionSlider = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["__scopeId", "data-v-76cd5e1e"]]);
const VisionSlider$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": VisionSlider
});
const useStore = defineStore("storeId", {
  state: () => {
    return {
      counter: 10,
      name: "Eduardo",
      isAdmin: true
    };
  },
  actions: {
    hit() {
      this.counter++;
    }
  },
  getters: {
    getCount: (state) => state.counter,
    getUser: (state) => {
      state.name;
    }
  }
});
const about_vue_vue_type_style_index_0_scoped_true_lang = "";
const meta$9 = void 0;
const meta$8 = void 0;
const meta$7 = void 0;
const meta$6 = void 0;
const _sfc_main$s = {};
function _sfc_ssrRender$g(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-screen-lg mx-auto" }, _attrs))}><div class="grid grid-cols-3 gap-4"><div class="col-span-full md:col-span-2 space-y-4">`);
  ssrRenderSlot(_ctx.$slots, "left", {}, null, _push, _parent);
  _push(`</div><div class="col-span-full md:col-span-1">`);
  ssrRenderSlot(_ctx.$slots, "right", {}, null, _push, _parent);
  _push(`</div></div></div>`);
}
const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layoutUtils/threeCol.vue");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
const ThreeCol = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["ssrRender", _sfc_ssrRender$g]]);
const threeCol = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": ThreeCol
});
const __nuxt_component_0$2 = defineComponent({
  name: "ClientOnly",
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_, { slots }) {
    const mounted = ref(false);
    onMounted(() => {
      mounted.value = true;
    });
    return (props) => {
      var _a;
      if (mounted.value) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, null, fallbackStr);
    };
  }
});
const MainTile_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$r = {
  name: "MainTile",
  props: {
    title: {
      type: String,
      required: false
    },
    subtitle: {
      type: String,
      required: false
    },
    subtext: {
      type: String,
      required: false
    },
    bgImg: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: false
    }
  }
};
function _sfc_ssrRender$f(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = __nuxt_component_0$2;
  _push(ssrRenderComponent(_component_ClientOnly, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="main aspect-video grid w-full relative rounded-md p-6 mb-4 dropshadow" style="${ssrRenderStyle({
          backgroundImage: `url(${$props.bgImg})`
        })}" data-v-c9df2258${_scopeId}><div class="text-white absolute bottom-7 left-6" data-v-c9df2258${_scopeId}><div class="text-2xl font-extrabold title mb-2" data-v-c9df2258${_scopeId}>${ssrInterpolate($props.title)}<br class="md:hidden" data-v-c9df2258${_scopeId}><span class="font-light whitespace-normal md:whitespace-nowrap md:ml-2" data-v-c9df2258${_scopeId}>${ssrInterpolate($props.subtitle)}</span></div><div class="subttext text-lg my-sm" data-v-c9df2258${_scopeId}>${ssrInterpolate($props.subtext)}</div><div class="actions mt-4" data-v-c9df2258${_scopeId}><a class="btn btn-white"${ssrRenderAttr("href", $props.link)} data-v-c9df2258${_scopeId}>Learn More</a></div></div></div>`);
      } else {
        return [
          createVNode("div", {
            class: "main aspect-video grid w-full relative rounded-md p-6 mb-4 dropshadow",
            style: {
              backgroundImage: `url(${$props.bgImg})`
            }
          }, [
            createVNode("div", { class: "text-white absolute bottom-7 left-6" }, [
              createVNode("div", { class: "text-2xl font-extrabold title mb-2" }, [
                createTextVNode(toDisplayString$1($props.title), 1),
                createVNode("br", { class: "md:hidden" }),
                createVNode("span", { class: "font-light whitespace-normal md:whitespace-nowrap md:ml-2" }, toDisplayString$1($props.subtitle), 1)
              ]),
              createVNode("div", { class: "subttext text-lg my-sm" }, toDisplayString$1($props.subtext), 1),
              createVNode("div", { class: "actions mt-4" }, [
                createVNode("a", {
                  class: "btn btn-white",
                  href: $props.link
                }, "Learn More", 8, ["href"])
              ])
            ])
          ], 4)
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MainTile.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
const MainTile = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["ssrRender", _sfc_ssrRender$f], ["__scopeId", "data-v-c9df2258"]]);
const MainTile$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": MainTile
});
const NUXT_BASE$1 = NUXT_CONFIG.app.cdnURL || NUXT_CONFIG.app.baseURL;
const _imports_0$1 = `${NUXT_BASE$1}images/externalLinkIcon.svg`;
const _sfc_main$q = {
  props: {
    icon: {
      type: String,
      default: null
    },
    text: {
      type: String,
      default: null
    },
    externallink: {
      type: Boolean,
      default: false
    },
    to: {
      type: String,
      default: null
    }
  },
  computed: {
    svg() {
      return "/images/icons/sprite.svg#" + this.icon;
    }
  }
};
function _sfc_ssrRender$e(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_nuxt_link = resolveComponent("nuxt-link");
  if ($props.externallink) {
    _push(`<a${ssrRenderAttrs(mergeProps({
      href: $props.to,
      rel: "noopener noreferrer",
      target: "_blank",
      class: "flex gap-2 py-4 items-center hover:bg-light-500"
    }, _attrs))}><svg class="h-10 w-10 pl-4"><use${ssrRenderAttr("xlink:href", $options.svg)}></use></svg><h4 class="mr-2 flex-grow">${ssrInterpolate($props.text)}</h4>`);
    if ($props.externallink) {
      _push(`<div class="pr-4"><img${ssrRenderAttr("src", _imports_0$1)} alt=""></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</a>`);
  } else {
    _push(ssrRenderComponent(_component_nuxt_link, mergeProps({
      to: $props.to,
      class: "flex gap-2 py-4 items-center hover:bg-light-500"
    }, _attrs), {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<svg class="h-10 w-10 pl-4"${_scopeId}><use${ssrRenderAttr("xlink:href", $options.svg)}${_scopeId}></use></svg><h4 class="mr-2 flex-grow"${_scopeId}>${ssrInterpolate($props.text)}</h4>`);
          if ($props.externallink) {
            _push2(`<div class="pr-4"${_scopeId}><img${ssrRenderAttr("src", _imports_0$1)} alt=""${_scopeId}></div>`);
          } else {
            _push2(`<!---->`);
          }
        } else {
          return [
            (openBlock(), createBlock("svg", { class: "h-10 w-10 pl-4" }, [
              createVNode("use", { "xlink:href": $options.svg }, null, 8, ["xlink:href"])
            ])),
            createVNode("h4", { class: "mr-2 flex-grow" }, toDisplayString$1($props.text), 1),
            $props.externallink ? (openBlock(), createBlock("div", {
              key: 0,
              class: "pr-4"
            }, [
              createVNode("img", {
                src: _imports_0$1,
                alt: ""
              })
            ])) : createCommentVNode("", true)
          ];
        }
      }),
      _: 1
    }, _parent));
  }
}
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sidemenu/SideMenuLink.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const SideMenuLink = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["ssrRender", _sfc_ssrRender$e]]);
const SideMenuLink$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": SideMenuLink
});
const _sfc_main$p = {
  props: {
    head: {
      type: String,
      required: false
    },
    subhead: {
      type: String,
      default: null
    },
    image: {
      type: String,
      default: null
    }
  }
};
function _sfc_ssrRender$d(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "divide-y dropshadow rounded-md overflow-hidden" }, _attrs))}>`);
  if ($props.image) {
    _push(`<img${ssrRenderAttr("src", $props.image)} alt="" class="mb-2 px-4 mt-4">`);
  } else {
    _push(`<!---->`);
  }
  if (!$props.image) {
    _push(`<div class="p-4 tracking-wider"><h3 class="text-2xl font-bold text-secondary">${ssrInterpolate($props.head)}</h3><h4 class="text-sm font-normal text-secondaryLight">${ssrInterpolate($props.subhead)}</h4></div>`);
  } else {
    _push(`<!---->`);
  }
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sidemenu/SideMenuTile.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const SideMenuTile = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["ssrRender", _sfc_ssrRender$d]]);
const SideMenuTile$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": SideMenuTile
});
const _sfc_main$o = {
  components: {
    SideMenuTile,
    SideMenuLink
  }
};
function _sfc_ssrRender$c(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_SideMenuTile = resolveComponent("SideMenuTile");
  const _component_SideMenuLink = resolveComponent("SideMenuLink");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_SideMenuTile, {
    head: "Get Involved",
    subhead: "See what God can do through you."
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_SideMenuLink, {
          icon: "icon-Truth-Connections",
          text: "Truth Connections",
          externallink: false,
          to: "/getinvolved"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_SideMenuLink, {
          icon: "icon-volunteer",
          text: "Volunteer",
          externallink: false,
          to: "/getinvolved"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_SideMenuLink, {
          icon: "icon-heart-moniter",
          text: "Outreach",
          externallink: false,
          to: "/getinvolved"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_SideMenuLink, {
          icon: "icon-ministry-groups",
          text: "Ministry Groups",
          externallink: false,
          to: "/getinvolved"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_SideMenuLink, {
          icon: "icon-heart",
          text: "Giving",
          externallink: true,
          to: "https://pushpay.com/g/revealingtruth?appVersion=&clickOrigin=&itemId=&utm_medium=social&utm_source=linktree&utm_campaign=giving&ltclid=6bff1693-6209-48cf-92f2-4ad8dc377d3c"
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_SideMenuLink, {
            icon: "icon-Truth-Connections",
            text: "Truth Connections",
            externallink: false,
            to: "/getinvolved"
          }),
          createVNode(_component_SideMenuLink, {
            icon: "icon-volunteer",
            text: "Volunteer",
            externallink: false,
            to: "/getinvolved"
          }),
          createVNode(_component_SideMenuLink, {
            icon: "icon-heart-moniter",
            text: "Outreach",
            externallink: false,
            to: "/getinvolved"
          }),
          createVNode(_component_SideMenuLink, {
            icon: "icon-ministry-groups",
            text: "Ministry Groups",
            externallink: false,
            to: "/getinvolved"
          }),
          createVNode(_component_SideMenuLink, {
            icon: "icon-heart",
            text: "Giving",
            externallink: true,
            to: "https://pushpay.com/g/revealingtruth?appVersion=&clickOrigin=&itemId=&utm_medium=social&utm_source=linktree&utm_campaign=giving&ltclid=6bff1693-6209-48cf-92f2-4ad8dc377d3c"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_SideMenuTile, { head: "Watch Online" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="p-4"${_scopeId}><a href="https://revealingtruth.online.church/" rel="noopener noreferrer" target="_blank" class="btn btn-blue w-full text-center inline-block"${_scopeId}>Watch us live</a></div>`);
      } else {
        return [
          createVNode("div", { class: "p-4" }, [
            createVNode("a", {
              href: "https://revealingtruth.online.church/",
              rel: "noopener noreferrer",
              target: "_blank",
              class: "btn btn-blue w-full text-center inline-block"
            }, "Watch us live")
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_SideMenuTile, {
    head: "RTM Mobile App",
    subhead: "Wherever you go, take us with you!"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="flex space-x-2 p-4"${_scopeId}><a href="https://apps.apple.com/us/app/revealing-truth/id1445042097?mt=8" target="_blank" rel="noopener noreferrer"${_scopeId}><img class="w-full" src="https://i.ibb.co/znhc102/app-store.png" alt=""${_scopeId}></a><a href="https://play.google.com/store/apps/details?id=io.pushpay.revealingtruth&amp;pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1" target="_blank" rel="noopener noreferrer"${_scopeId}><img class="w-full" src="https://i.ibb.co/FYnwFYQ/google-play.png" alt=""${_scopeId}></a></div>`);
      } else {
        return [
          createVNode("div", { class: "flex space-x-2 p-4" }, [
            createVNode("a", {
              href: "https://apps.apple.com/us/app/revealing-truth/id1445042097?mt=8",
              target: "_blank",
              rel: "noopener noreferrer"
            }, [
              createVNode("img", {
                class: "w-full",
                src: "https://i.ibb.co/znhc102/app-store.png",
                alt: ""
              })
            ]),
            createVNode("a", {
              href: "https://play.google.com/store/apps/details?id=io.pushpay.revealingtruth&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1",
              target: "_blank",
              rel: "noopener noreferrer"
            }, [
              createVNode("img", {
                class: "w-full",
                src: "https://i.ibb.co/FYnwFYQ/google-play.png",
                alt: ""
              })
            ])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_SideMenuTile, { image: "/PushpayLogo.jpeg" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="p-4"${_scopeId}><a href="https://pushpay.com/login?ReturnUrl=%2fpushpay%2fredirect" class="btn btn-yellow w-full text-center inline-block" rel="noopener noreferrer" target="_blank"${_scopeId}>Sign In</a></div>`);
      } else {
        return [
          createVNode("div", { class: "p-4" }, [
            createVNode("a", {
              href: "https://pushpay.com/login?ReturnUrl=%2fpushpay%2fredirect",
              class: "btn btn-yellow w-full text-center inline-block",
              rel: "noopener noreferrer",
              target: "_blank"
            }, "Sign In")
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_SideMenuTile, { head: "Planning Center" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="p-4"${_scopeId}><a href="https://revealingtruthdepartments.churchcenter.com/home" class="btn btn-yellow w-full text-center inline-block" rel="noopener noreferrer" target="_blank"${_scopeId}>Sign In</a></div>`);
      } else {
        return [
          createVNode("div", { class: "p-4" }, [
            createVNode("a", {
              href: "https://revealingtruthdepartments.churchcenter.com/home",
              class: "btn btn-yellow w-full text-center inline-block",
              rel: "noopener noreferrer",
              target: "_blank"
            }, "Sign In")
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_SideMenuTile, { head: "Stay Connected to RTM" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_SideMenuLink, {
          icon: "icon-facebook",
          text: "Facebook",
          externallink: true,
          to: "https://www.facebook.com/revealingtruth/"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_SideMenuLink, {
          icon: "icon-instagram",
          text: "Instagram",
          externallink: true,
          to: "https://www.instagram.com/revealingtruth/?hl=en"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_SideMenuLink, {
          icon: "icon-youTube",
          text: "Youtube",
          externallink: true,
          to: "https://www.youtube.com/user/RevealingTruthOnline"
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_SideMenuLink, {
            icon: "icon-facebook",
            text: "Facebook",
            externallink: true,
            to: "https://www.facebook.com/revealingtruth/"
          }),
          createVNode(_component_SideMenuLink, {
            icon: "icon-instagram",
            text: "Instagram",
            externallink: true,
            to: "https://www.instagram.com/revealingtruth/?hl=en"
          }),
          createVNode(_component_SideMenuLink, {
            icon: "icon-youTube",
            text: "Youtube",
            externallink: true,
            to: "https://www.youtube.com/user/RevealingTruthOnline"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sidemenu/SideMenu.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const SideMenu = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["ssrRender", _sfc_ssrRender$c]]);
const SideMenu$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": SideMenu
});
const meta$5 = void 0;
const meta$4 = void 0;
const live_vue_vue_type_style_index_0_scoped_true_lang = "";
const meta$3 = void 0;
const locations_vue_vue_type_style_index_0_scoped_true_lang = "";
const meta$2 = void 0;
const meta$1 = void 0;
const sermon_vue_vue_type_style_index_0_scoped_true_lang = "";
const meta = void 0;
const routes = [
  {
    name: "series",
    path: "/:series",
    file: "/Users/chrispowe/Documents/WebsiteRTM/pages/[series].vue",
    children: [],
    meta: meta$a,
    component: () => Promise.resolve().then(function() {
      return _series_;
    })
  },
  {
    name: "about",
    path: "/about",
    file: "/Users/chrispowe/Documents/WebsiteRTM/pages/about.vue",
    children: [],
    meta: meta$9,
    component: () => Promise.resolve().then(function() {
      return about$1;
    })
  },
  {
    name: "campus-campus",
    path: "/campus/:campus",
    file: "/Users/chrispowe/Documents/WebsiteRTM/pages/campus/[campus].vue",
    children: [],
    meta: meta$8,
    component: () => Promise.resolve().then(function() {
      return _campus_;
    })
  },
  {
    name: "getinvolved",
    path: "/getinvolved",
    file: "/Users/chrispowe/Documents/WebsiteRTM/pages/getinvolved.vue",
    children: [],
    meta: meta$7,
    component: () => Promise.resolve().then(function() {
      return getinvolved$1;
    })
  },
  {
    name: "giving",
    path: "/giving",
    file: "/Users/chrispowe/Documents/WebsiteRTM/pages/giving.vue",
    children: [],
    meta: meta$6,
    component: () => Promise.resolve().then(function() {
      return giving$1;
    })
  },
  {
    name: "index",
    path: "/",
    file: "/Users/chrispowe/Documents/WebsiteRTM/pages/index.vue",
    children: [],
    meta: meta$5,
    component: () => Promise.resolve().then(function() {
      return index;
    })
  },
  {
    name: "leadership",
    path: "/leadership",
    file: "/Users/chrispowe/Documents/WebsiteRTM/pages/leadership.vue",
    children: [],
    meta: meta$4,
    component: () => Promise.resolve().then(function() {
      return leadership$1;
    })
  },
  {
    name: "live",
    path: "/live",
    file: "/Users/chrispowe/Documents/WebsiteRTM/pages/live.vue",
    children: [],
    meta: meta$3,
    component: () => Promise.resolve().then(function() {
      return live$1;
    })
  },
  {
    name: "locations",
    path: "/locations",
    file: "/Users/chrispowe/Documents/WebsiteRTM/pages/locations.vue",
    children: [],
    meta: meta$2,
    component: () => Promise.resolve().then(function() {
      return locations$1;
    })
  },
  {
    name: "ourbeliefs",
    path: "/ourbeliefs",
    file: "/Users/chrispowe/Documents/WebsiteRTM/pages/ourbeliefs.vue",
    children: [],
    meta: meta$1,
    component: () => Promise.resolve().then(function() {
      return ourbeliefs;
    })
  },
  {
    name: "sermon",
    path: "/sermon",
    file: "/Users/chrispowe/Documents/WebsiteRTM/pages/sermon.vue",
    children: [],
    meta,
    component: () => Promise.resolve().then(function() {
      return sermon$1;
    })
  }
];
const globalMiddleware = [];
const namedMiddleware = {};
const router_43f10eed = defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("NuxtPage", NuxtPage);
  nuxtApp.vueApp.component("NuxtLayout", NuxtLayout);
  nuxtApp.vueApp.component("NuxtLink", RouterLink);
  nuxtApp.vueApp.component("NuxtNestedPage", NuxtPage);
  nuxtApp.vueApp.component("NuxtChild", NuxtPage);
  const { baseURL } = useRuntimeConfig().app;
  const routerHistory = createMemoryHistory(baseURL);
  const router = createRouter({
    history: routerHistory,
    routes
  });
  nuxtApp.vueApp.use(router);
  const previousRoute = shallowRef(router.currentRoute.value);
  router.afterEach((_to, from) => {
    previousRoute.value = from;
  });
  Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
    get: () => previousRoute.value
  });
  const route = {};
  for (const key in router.currentRoute.value) {
    route[key] = computed(() => router.currentRoute.value[key]);
  }
  nuxtApp._route = reactive(route);
  nuxtApp._middleware = nuxtApp._middleware || {
    global: [],
    named: {}
  };
  router.beforeEach(async (to, from) => {
    var _a;
    to.meta = reactive(to.meta);
    nuxtApp._processingMiddleware = true;
    const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
    for (const component of to.matched) {
      const componentMiddleware = component.meta.middleware;
      if (!componentMiddleware) {
        continue;
      }
      if (Array.isArray(componentMiddleware)) {
        for (const entry2 of componentMiddleware) {
          middlewareEntries.add(entry2);
        }
      } else {
        middlewareEntries.add(componentMiddleware);
      }
    }
    for (const entry2 of middlewareEntries) {
      const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_a = namedMiddleware[entry2]) == null ? void 0 : _a.call(namedMiddleware).then((r) => r.default || r)) : entry2;
      const result = await callWithNuxt(nuxtApp, middleware, [to, from]);
      {
        if (result === false || result instanceof Error) {
          const error = result || createError({
            statusMessage: `Route navigation aborted: ${nuxtApp.ssrContext.url}`
          });
          nuxtApp.ssrContext.error = error;
          throw error;
        }
      }
      if (result || result === false) {
        return result;
      }
    }
  });
  router.afterEach(() => {
    delete nuxtApp._processingMiddleware;
  });
  nuxtApp.hook("app:created", async () => {
    {
      router.push(nuxtApp.ssrContext.url);
      router.afterEach((to) => {
        if (to.fullPath !== nuxtApp.ssrContext.url) {
          nuxtApp.ssrContext.res.setHeader("Location", to.fullPath);
        }
      });
    }
    try {
      await router.isReady();
      const is404 = router.currentRoute.value.matched.length === 0;
      if (is404) {
        throw createError({
          statusCode: 404,
          statusMessage: `Page not found: ${nuxtApp.ssrContext.url}`
        });
      }
    } catch (error) {
      nuxtApp.ssrContext.error = error;
    }
  });
  return { provide: { router } };
});
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
const toString = Object.prototype.toString;
const isNumber = (val) => typeof val === "number";
const isString$1 = (val) => typeof val === "string";
const isObject$1 = (val) => toString.call(val) === "[object Object]";
const noop = () => {
};
function tryOnUnmounted(fn) {
  if (getCurrentInstance())
    onUnmounted(fn);
}
function unrefElement(elRef) {
  var _a;
  const plain = unref(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}
const defaultWindow = void 0;
function useEventListener(...args) {
  let target;
  let event;
  let listener;
  let options2;
  if (isString$1(args[0])) {
    [event, listener, options2] = args;
    target = defaultWindow;
  } else {
    [target, event, listener, options2] = args;
  }
  if (!target)
    return noop;
  let cleanup = noop;
  const stopWatch = watch(() => unref(target), (el) => {
    cleanup();
    if (!el)
      return;
    el.addEventListener(event, listener, options2);
    cleanup = () => {
      el.removeEventListener(event, listener, options2);
      cleanup = noop;
    };
  }, { immediate: true, flush: "post" });
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}
function useIntersectionObserver(target, callback, options2 = {}) {
  const {
    root,
    rootMargin = "0px",
    threshold = 0.1,
    window: window2 = defaultWindow
  } = options2;
  const isSupported = window2 && "IntersectionObserver" in window2;
  let cleanup = noop;
  const stopWatch = isSupported ? watch(() => ({
    el: unrefElement(target),
    root: unrefElement(root)
  }), ({ el, root: root2 }) => {
    cleanup();
    if (!el)
      return;
    const observer = new window2.IntersectionObserver(callback, {
      root: root2,
      rootMargin,
      threshold
    });
    observer.observe(el);
    cleanup = () => {
      observer.disconnect();
      cleanup = noop;
    };
  }, { immediate: true, flush: "post" }) : noop;
  const stop = () => {
    cleanup();
    stopWatch();
  };
  tryOnScopeDispose(stop);
  return {
    isSupported,
    stop
  };
}
var SwipeDirection;
(function(SwipeDirection2) {
  SwipeDirection2["UP"] = "UP";
  SwipeDirection2["RIGHT"] = "RIGHT";
  SwipeDirection2["DOWN"] = "DOWN";
  SwipeDirection2["LEFT"] = "LEFT";
  SwipeDirection2["NONE"] = "NONE";
})(SwipeDirection || (SwipeDirection = {}));
const defaultTimestep = 1 / 60 * 1e3;
const getCurrentTime = typeof performance !== "undefined" ? () => performance.now() : () => Date.now();
const onNextFrame = (callback) => setTimeout(() => callback(getCurrentTime()), defaultTimestep);
function createRenderStep(runNextFrame2) {
  let toRun = [];
  let toRunNextFrame = [];
  let numToRun = 0;
  let isProcessing2 = false;
  let flushNextFrame = false;
  const toKeepAlive = /* @__PURE__ */ new WeakSet();
  const step = {
    schedule: (callback, keepAlive = false, immediate = false) => {
      const addToCurrentFrame = immediate && isProcessing2;
      const buffer = addToCurrentFrame ? toRun : toRunNextFrame;
      if (keepAlive)
        toKeepAlive.add(callback);
      if (buffer.indexOf(callback) === -1) {
        buffer.push(callback);
        if (addToCurrentFrame && isProcessing2)
          numToRun = toRun.length;
      }
      return callback;
    },
    cancel: (callback) => {
      const index2 = toRunNextFrame.indexOf(callback);
      if (index2 !== -1)
        toRunNextFrame.splice(index2, 1);
      toKeepAlive.delete(callback);
    },
    process: (frameData) => {
      if (isProcessing2) {
        flushNextFrame = true;
        return;
      }
      isProcessing2 = true;
      [toRun, toRunNextFrame] = [toRunNextFrame, toRun];
      toRunNextFrame.length = 0;
      numToRun = toRun.length;
      if (numToRun) {
        for (let i = 0; i < numToRun; i++) {
          const callback = toRun[i];
          callback(frameData);
          if (toKeepAlive.has(callback)) {
            step.schedule(callback);
            runNextFrame2();
          }
        }
      }
      isProcessing2 = false;
      if (flushNextFrame) {
        flushNextFrame = false;
        step.process(frameData);
      }
    }
  };
  return step;
}
const maxElapsed = 40;
let useDefaultElapsed = true;
let runNextFrame = false;
let isProcessing = false;
const frame = {
  delta: 0,
  timestamp: 0
};
const stepsOrder = [
  "read",
  "update",
  "preRender",
  "render",
  "postRender"
];
const steps = stepsOrder.reduce((acc, key) => {
  acc[key] = createRenderStep(() => runNextFrame = true);
  return acc;
}, {});
const sync = stepsOrder.reduce((acc, key) => {
  const step = steps[key];
  acc[key] = (process, keepAlive = false, immediate = false) => {
    if (!runNextFrame)
      startLoop();
    return step.schedule(process, keepAlive, immediate);
  };
  return acc;
}, {});
const cancelSync = stepsOrder.reduce((acc, key) => {
  acc[key] = steps[key].cancel;
  return acc;
}, {});
stepsOrder.reduce((acc, key) => {
  acc[key] = () => steps[key].process(frame);
  return acc;
}, {});
const processStep = (stepId) => steps[stepId].process(frame);
const processFrame = (timestamp) => {
  runNextFrame = false;
  frame.delta = useDefaultElapsed ? defaultTimestep : Math.max(Math.min(timestamp - frame.timestamp, maxElapsed), 1);
  frame.timestamp = timestamp;
  isProcessing = true;
  stepsOrder.forEach(processStep);
  isProcessing = false;
  if (runNextFrame) {
    useDefaultElapsed = false;
    onNextFrame(processFrame);
  }
};
const startLoop = () => {
  runNextFrame = true;
  useDefaultElapsed = true;
  if (!isProcessing)
    onNextFrame(processFrame);
};
const getFrameData = () => frame;
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function __rest(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
var warning = function() {
};
var invariant = function() {
};
const clamp$1 = (min, max, v) => Math.min(Math.max(v, min), max);
const safeMin = 1e-3;
const minDuration = 0.01;
const maxDuration = 10;
const minDamping = 0.05;
const maxDamping = 1;
function findSpring({ duration = 800, bounce = 0.25, velocity = 0, mass = 1 }) {
  let envelope;
  let derivative;
  warning(duration <= maxDuration * 1e3);
  let dampingRatio = 1 - bounce;
  dampingRatio = clamp$1(minDamping, maxDamping, dampingRatio);
  duration = clamp$1(minDuration, maxDuration, duration / 1e3);
  if (dampingRatio < 1) {
    envelope = (undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta = exponentialDecay * duration;
      const a2 = exponentialDecay - velocity;
      const b2 = calcAngularFreq(undampedFreq2, dampingRatio);
      const c2 = Math.exp(-delta);
      return safeMin - a2 / b2 * c2;
    };
    derivative = (undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta = exponentialDecay * duration;
      const d = delta * velocity + velocity;
      const e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq2, 2) * duration;
      const f = Math.exp(-delta);
      const g = calcAngularFreq(Math.pow(undampedFreq2, 2), dampingRatio);
      const factor = -envelope(undampedFreq2) + safeMin > 0 ? -1 : 1;
      return factor * ((d - e) * f) / g;
    };
  } else {
    envelope = (undampedFreq2) => {
      const a2 = Math.exp(-undampedFreq2 * duration);
      const b2 = (undampedFreq2 - velocity) * duration + 1;
      return -safeMin + a2 * b2;
    };
    derivative = (undampedFreq2) => {
      const a2 = Math.exp(-undampedFreq2 * duration);
      const b2 = (velocity - undampedFreq2) * (duration * duration);
      return a2 * b2;
    };
  }
  const initialGuess = 5 / duration;
  const undampedFreq = approximateRoot(envelope, derivative, initialGuess);
  duration = duration * 1e3;
  if (isNaN(undampedFreq)) {
    return {
      stiffness: 100,
      damping: 10,
      duration
    };
  } else {
    const stiffness = Math.pow(undampedFreq, 2) * mass;
    return {
      stiffness,
      damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
      duration
    };
  }
}
const rootIterations = 12;
function approximateRoot(envelope, derivative, initialGuess) {
  let result = initialGuess;
  for (let i = 1; i < rootIterations; i++) {
    result = result - envelope(result) / derivative(result);
  }
  return result;
}
function calcAngularFreq(undampedFreq, dampingRatio) {
  return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}
const durationKeys = ["duration", "bounce"];
const physicsKeys = ["stiffness", "damping", "mass"];
function isSpringType(options2, keys) {
  return keys.some((key) => options2[key] !== void 0);
}
function getSpringOptions(options2) {
  let springOptions = Object.assign({ velocity: 0, stiffness: 100, damping: 10, mass: 1, isResolvedFromDuration: false }, options2);
  if (!isSpringType(options2, physicsKeys) && isSpringType(options2, durationKeys)) {
    const derived = findSpring(options2);
    springOptions = Object.assign(Object.assign(Object.assign({}, springOptions), derived), { velocity: 0, mass: 1 });
    springOptions.isResolvedFromDuration = true;
  }
  return springOptions;
}
function spring(_a) {
  var { from = 0, to = 1, restSpeed = 2, restDelta } = _a, options2 = __rest(_a, ["from", "to", "restSpeed", "restDelta"]);
  const state = { done: false, value: from };
  let { stiffness, damping, mass, velocity, duration, isResolvedFromDuration } = getSpringOptions(options2);
  let resolveSpring = zero;
  let resolveVelocity = zero;
  function createSpring() {
    const initialVelocity = velocity ? -(velocity / 1e3) : 0;
    const initialDelta = to - from;
    const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
    const undampedAngularFreq = Math.sqrt(stiffness / mass) / 1e3;
    restDelta !== null && restDelta !== void 0 ? restDelta : restDelta = Math.abs(to - from) <= 1 ? 0.01 : 0.4;
    if (dampingRatio < 1) {
      const angularFreq = calcAngularFreq(undampedAngularFreq, dampingRatio);
      resolveSpring = (t) => {
        const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
        return to - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq * Math.sin(angularFreq * t) + initialDelta * Math.cos(angularFreq * t));
      };
      resolveVelocity = (t) => {
        const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
        return dampingRatio * undampedAngularFreq * envelope * (Math.sin(angularFreq * t) * (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq + initialDelta * Math.cos(angularFreq * t)) - envelope * (Math.cos(angularFreq * t) * (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) - angularFreq * initialDelta * Math.sin(angularFreq * t));
      };
    } else if (dampingRatio === 1) {
      resolveSpring = (t) => to - Math.exp(-undampedAngularFreq * t) * (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t);
    } else {
      const dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
      resolveSpring = (t) => {
        const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
        const freqForT = Math.min(dampedAngularFreq * t, 300);
        return to - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) * Math.sinh(freqForT) + dampedAngularFreq * initialDelta * Math.cosh(freqForT)) / dampedAngularFreq;
      };
    }
  }
  createSpring();
  return {
    next: (t) => {
      const current = resolveSpring(t);
      if (!isResolvedFromDuration) {
        const currentVelocity = resolveVelocity(t) * 1e3;
        const isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
        const isBelowDisplacementThreshold = Math.abs(to - current) <= restDelta;
        state.done = isBelowVelocityThreshold && isBelowDisplacementThreshold;
      } else {
        state.done = t >= duration;
      }
      state.value = state.done ? to : current;
      return state;
    },
    flipTarget: () => {
      velocity = -velocity;
      [from, to] = [to, from];
      createSpring();
    }
  };
}
spring.needsInterpolation = (a2, b2) => typeof a2 === "string" || typeof b2 === "string";
const zero = (_t) => 0;
const progress = (from, to, value) => {
  const toFromDifference = to - from;
  return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
};
const mix = (from, to, progress2) => -progress2 * from + progress2 * to + from;
const clamp = (min, max) => (v) => Math.max(Math.min(v, max), min);
const sanitize = (v) => v % 1 ? Number(v.toFixed(5)) : v;
const floatRegex = /(-)?([\d]*\.?[\d])+/g;
const colorRegex = /(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))/gi;
const singleColorRegex = /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))$/i;
function isString(v) {
  return typeof v === "string";
}
const number = {
  test: (v) => typeof v === "number",
  parse: parseFloat,
  transform: (v) => v
};
const alpha = Object.assign(Object.assign({}, number), { transform: clamp(0, 1) });
const scale = Object.assign(Object.assign({}, number), { default: 1 });
const createUnitType = (unit) => ({
  test: (v) => isString(v) && v.endsWith(unit) && v.split(" ").length === 1,
  parse: parseFloat,
  transform: (v) => `${v}${unit}`
});
const degrees = createUnitType("deg");
const percent = createUnitType("%");
const px = createUnitType("px");
const progressPercentage = Object.assign(Object.assign({}, percent), { parse: (v) => percent.parse(v) / 100, transform: (v) => percent.transform(v * 100) });
const isColorString = (type, testProp) => (v) => {
  return Boolean(isString(v) && singleColorRegex.test(v) && v.startsWith(type) || testProp && Object.prototype.hasOwnProperty.call(v, testProp));
};
const splitColor = (aName, bName, cName) => (v) => {
  if (!isString(v))
    return v;
  const [a2, b2, c2, alpha2] = v.match(floatRegex);
  return {
    [aName]: parseFloat(a2),
    [bName]: parseFloat(b2),
    [cName]: parseFloat(c2),
    alpha: alpha2 !== void 0 ? parseFloat(alpha2) : 1
  };
};
const hsla = {
  test: isColorString("hsl", "hue"),
  parse: splitColor("hue", "saturation", "lightness"),
  transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 }) => {
    return "hsla(" + Math.round(hue) + ", " + percent.transform(sanitize(saturation)) + ", " + percent.transform(sanitize(lightness)) + ", " + sanitize(alpha.transform(alpha$1)) + ")";
  }
};
const clampRgbUnit = clamp(0, 255);
const rgbUnit = Object.assign(Object.assign({}, number), { transform: (v) => Math.round(clampRgbUnit(v)) });
const rgba = {
  test: isColorString("rgb", "red"),
  parse: splitColor("red", "green", "blue"),
  transform: ({ red, green, blue, alpha: alpha$1 = 1 }) => "rgba(" + rgbUnit.transform(red) + ", " + rgbUnit.transform(green) + ", " + rgbUnit.transform(blue) + ", " + sanitize(alpha.transform(alpha$1)) + ")"
};
function parseHex(v) {
  let r = "";
  let g = "";
  let b2 = "";
  let a2 = "";
  if (v.length > 5) {
    r = v.substr(1, 2);
    g = v.substr(3, 2);
    b2 = v.substr(5, 2);
    a2 = v.substr(7, 2);
  } else {
    r = v.substr(1, 1);
    g = v.substr(2, 1);
    b2 = v.substr(3, 1);
    a2 = v.substr(4, 1);
    r += r;
    g += g;
    b2 += b2;
    a2 += a2;
  }
  return {
    red: parseInt(r, 16),
    green: parseInt(g, 16),
    blue: parseInt(b2, 16),
    alpha: a2 ? parseInt(a2, 16) / 255 : 1
  };
}
const hex = {
  test: isColorString("#"),
  parse: parseHex,
  transform: rgba.transform
};
const color = {
  test: (v) => rgba.test(v) || hex.test(v) || hsla.test(v),
  parse: (v) => {
    if (rgba.test(v)) {
      return rgba.parse(v);
    } else if (hsla.test(v)) {
      return hsla.parse(v);
    } else {
      return hex.parse(v);
    }
  },
  transform: (v) => {
    return isString(v) ? v : v.hasOwnProperty("red") ? rgba.transform(v) : hsla.transform(v);
  }
};
const colorToken = "${c}";
const numberToken = "${n}";
function test(v) {
  var _a, _b, _c, _d;
  return isNaN(v) && isString(v) && ((_b = (_a = v.match(floatRegex)) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) + ((_d = (_c = v.match(colorRegex)) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) > 0;
}
function analyse$1(v) {
  if (typeof v === "number")
    v = `${v}`;
  const values = [];
  let numColors = 0;
  const colors = v.match(colorRegex);
  if (colors) {
    numColors = colors.length;
    v = v.replace(colorRegex, colorToken);
    values.push(...colors.map(color.parse));
  }
  const numbers = v.match(floatRegex);
  if (numbers) {
    v = v.replace(floatRegex, numberToken);
    values.push(...numbers.map(number.parse));
  }
  return { values, numColors, tokenised: v };
}
function parse(v) {
  return analyse$1(v).values;
}
function createTransformer(v) {
  const { values, numColors, tokenised } = analyse$1(v);
  const numValues = values.length;
  return (v2) => {
    let output = tokenised;
    for (let i = 0; i < numValues; i++) {
      output = output.replace(i < numColors ? colorToken : numberToken, i < numColors ? color.transform(v2[i]) : sanitize(v2[i]));
    }
    return output;
  };
}
const convertNumbersToZero = (v) => typeof v === "number" ? 0 : v;
function getAnimatableNone$1(v) {
  const parsed = parse(v);
  const transformer = createTransformer(v);
  return transformer(parsed.map(convertNumbersToZero));
}
const complex = { test, parse, createTransformer, getAnimatableNone: getAnimatableNone$1 };
const maxDefaults = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function applyDefaultFilter(v) {
  let [name, value] = v.slice(0, -1).split("(");
  if (name === "drop-shadow")
    return v;
  const [number2] = value.match(floatRegex) || [];
  if (!number2)
    return v;
  const unit = value.replace(number2, "");
  let defaultValue = maxDefaults.has(name) ? 1 : 0;
  if (number2 !== value)
    defaultValue *= 100;
  return name + "(" + defaultValue + unit + ")";
}
const functionRegex = /([a-z-]*)\(.*?\)/g;
const filter = Object.assign(Object.assign({}, complex), { getAnimatableNone: (v) => {
  const functions = v.match(functionRegex);
  return functions ? functions.map(applyDefaultFilter).join(" ") : v;
} });
const mixLinearColor = (from, to, v) => {
  const fromExpo = from * from;
  const toExpo = to * to;
  return Math.sqrt(Math.max(0, v * (toExpo - fromExpo) + fromExpo));
};
const colorTypes = [hex, rgba, hsla];
const getColorType = (v) => colorTypes.find((type) => type.test(v));
const mixColor = (from, to) => {
  const fromColorType = getColorType(from);
  const toColorType = getColorType(to);
  invariant(fromColorType.transform === toColorType.transform);
  if (!fromColorType || !toColorType || fromColorType.transform !== toColorType.transform) {
    return (p) => `${p > 0 ? to : from}`;
  }
  const fromColor = fromColorType.parse(from);
  const toColor = toColorType.parse(to);
  const blended = Object.assign({}, fromColor);
  const mixFunc = fromColorType === hsla ? mix : mixLinearColor;
  return (v) => {
    for (const key in blended) {
      if (key !== "alpha") {
        blended[key] = mixFunc(fromColor[key], toColor[key], v);
      }
    }
    blended.alpha = mix(fromColor.alpha, toColor.alpha, v);
    return fromColorType.transform(blended);
  };
};
const isNum = (v) => typeof v === "number";
const combineFunctions = (a2, b2) => (v) => b2(a2(v));
const pipe = (...transformers) => transformers.reduce(combineFunctions);
function getMixer(origin, target) {
  if (isNum(origin)) {
    return (v) => mix(origin, target, v);
  } else if (color.test(origin)) {
    return mixColor(origin, target);
  } else {
    return mixComplex(origin, target);
  }
}
const mixArray = (from, to) => {
  const output = [...from];
  const numValues = output.length;
  const blendValue = from.map((fromThis, i) => getMixer(fromThis, to[i]));
  return (v) => {
    for (let i = 0; i < numValues; i++) {
      output[i] = blendValue[i](v);
    }
    return output;
  };
};
const mixObject = (origin, target) => {
  const output = Object.assign(Object.assign({}, origin), target);
  const blendValue = {};
  for (const key in output) {
    if (origin[key] !== void 0 && target[key] !== void 0) {
      blendValue[key] = getMixer(origin[key], target[key]);
    }
  }
  return (v) => {
    for (const key in blendValue) {
      output[key] = blendValue[key](v);
    }
    return output;
  };
};
function analyse(value) {
  const parsed = complex.parse(value);
  const numValues = parsed.length;
  let numNumbers = 0;
  let numRGB = 0;
  let numHSL = 0;
  for (let i = 0; i < numValues; i++) {
    if (numNumbers || typeof parsed[i] === "number") {
      numNumbers++;
    } else {
      if (parsed[i].hue !== void 0) {
        numHSL++;
      } else {
        numRGB++;
      }
    }
  }
  return { parsed, numNumbers, numRGB, numHSL };
}
const mixComplex = (origin, target) => {
  const template = complex.createTransformer(target);
  const originStats = analyse(origin);
  const targetStats = analyse(target);
  const canInterpolate = originStats.numHSL === targetStats.numHSL && originStats.numRGB === targetStats.numRGB && originStats.numNumbers >= targetStats.numNumbers;
  if (canInterpolate) {
    return pipe(mixArray(originStats.parsed, targetStats.parsed), template);
  } else {
    return (p) => `${p > 0 ? target : origin}`;
  }
};
const mixNumber = (from, to) => (p) => mix(from, to, p);
function detectMixerFactory(v) {
  if (typeof v === "number") {
    return mixNumber;
  } else if (typeof v === "string") {
    if (color.test(v)) {
      return mixColor;
    } else {
      return mixComplex;
    }
  } else if (Array.isArray(v)) {
    return mixArray;
  } else if (typeof v === "object") {
    return mixObject;
  }
}
function createMixers(output, ease, customMixer) {
  const mixers = [];
  const mixerFactory = customMixer || detectMixerFactory(output[0]);
  const numMixers = output.length - 1;
  for (let i = 0; i < numMixers; i++) {
    let mixer = mixerFactory(output[i], output[i + 1]);
    if (ease) {
      const easingFunction = Array.isArray(ease) ? ease[i] : ease;
      mixer = pipe(easingFunction, mixer);
    }
    mixers.push(mixer);
  }
  return mixers;
}
function fastInterpolate([from, to], [mixer]) {
  return (v) => mixer(progress(from, to, v));
}
function slowInterpolate(input, mixers) {
  const inputLength = input.length;
  const lastInputIndex = inputLength - 1;
  return (v) => {
    let mixerIndex = 0;
    let foundMixerIndex = false;
    if (v <= input[0]) {
      foundMixerIndex = true;
    } else if (v >= input[lastInputIndex]) {
      mixerIndex = lastInputIndex - 1;
      foundMixerIndex = true;
    }
    if (!foundMixerIndex) {
      let i = 1;
      for (; i < inputLength; i++) {
        if (input[i] > v || i === lastInputIndex) {
          break;
        }
      }
      mixerIndex = i - 1;
    }
    const progressInRange = progress(input[mixerIndex], input[mixerIndex + 1], v);
    return mixers[mixerIndex](progressInRange);
  };
}
function interpolate(input, output, { clamp: isClamp = true, ease, mixer } = {}) {
  const inputLength = input.length;
  invariant(inputLength === output.length);
  invariant(!ease || !Array.isArray(ease) || ease.length === inputLength - 1);
  if (input[0] > input[inputLength - 1]) {
    input = [].concat(input);
    output = [].concat(output);
    input.reverse();
    output.reverse();
  }
  const mixers = createMixers(output, ease, mixer);
  const interpolator = inputLength === 2 ? fastInterpolate(input, mixers) : slowInterpolate(input, mixers);
  return isClamp ? (v) => interpolator(clamp$1(input[0], input[inputLength - 1], v)) : interpolator;
}
const reverseEasing = (easing) => (p) => 1 - easing(1 - p);
const mirrorEasing = (easing) => (p) => p <= 0.5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;
const createExpoIn = (power) => (p) => Math.pow(p, power);
const createBackIn = (power) => (p) => p * p * ((power + 1) * p - power);
const createAnticipate = (power) => {
  const backEasing = createBackIn(power);
  return (p) => (p *= 2) < 1 ? 0.5 * backEasing(p) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
};
const DEFAULT_OVERSHOOT_STRENGTH = 1.525;
const BOUNCE_FIRST_THRESHOLD = 4 / 11;
const BOUNCE_SECOND_THRESHOLD = 8 / 11;
const BOUNCE_THIRD_THRESHOLD = 9 / 10;
const linear = (p) => p;
const easeIn = createExpoIn(2);
const easeOut = reverseEasing(easeIn);
const easeInOut = mirrorEasing(easeIn);
const circIn = (p) => 1 - Math.sin(Math.acos(p));
const circOut = reverseEasing(circIn);
const circInOut = mirrorEasing(circOut);
const backIn = createBackIn(DEFAULT_OVERSHOOT_STRENGTH);
const backOut = reverseEasing(backIn);
const backInOut = mirrorEasing(backIn);
const anticipate = createAnticipate(DEFAULT_OVERSHOOT_STRENGTH);
const ca = 4356 / 361;
const cb = 35442 / 1805;
const cc = 16061 / 1805;
const bounceOut = (p) => {
  if (p === 1 || p === 0)
    return p;
  const p2 = p * p;
  return p < BOUNCE_FIRST_THRESHOLD ? 7.5625 * p2 : p < BOUNCE_SECOND_THRESHOLD ? 9.075 * p2 - 9.9 * p + 3.4 : p < BOUNCE_THIRD_THRESHOLD ? ca * p2 - cb * p + cc : 10.8 * p * p - 20.52 * p + 10.72;
};
const bounceIn = reverseEasing(bounceOut);
const bounceInOut = (p) => p < 0.5 ? 0.5 * (1 - bounceOut(1 - p * 2)) : 0.5 * bounceOut(p * 2 - 1) + 0.5;
function defaultEasing(values, easing) {
  return values.map(() => easing || easeInOut).splice(0, values.length - 1);
}
function defaultOffset(values) {
  const numValues = values.length;
  return values.map((_value, i) => i !== 0 ? i / (numValues - 1) : 0);
}
function convertOffsetToTimes(offset, duration) {
  return offset.map((o) => o * duration);
}
function keyframes$1({ from = 0, to = 1, ease, offset, duration = 300 }) {
  const state = { done: false, value: from };
  const values = Array.isArray(to) ? to : [from, to];
  const times = convertOffsetToTimes(offset && offset.length === values.length ? offset : defaultOffset(values), duration);
  function createInterpolator() {
    return interpolate(times, values, {
      ease: Array.isArray(ease) ? ease : defaultEasing(values, ease)
    });
  }
  let interpolator = createInterpolator();
  return {
    next: (t) => {
      state.value = interpolator(t);
      state.done = t >= duration;
      return state;
    },
    flipTarget: () => {
      values.reverse();
      interpolator = createInterpolator();
    }
  };
}
function decay({ velocity = 0, from = 0, power = 0.8, timeConstant = 350, restDelta = 0.5, modifyTarget }) {
  const state = { done: false, value: from };
  let amplitude = power * velocity;
  const ideal = from + amplitude;
  const target = modifyTarget === void 0 ? ideal : modifyTarget(ideal);
  if (target !== ideal)
    amplitude = target - from;
  return {
    next: (t) => {
      const delta = -amplitude * Math.exp(-t / timeConstant);
      state.done = !(delta > restDelta || delta < -restDelta);
      state.value = state.done ? target : target + delta;
      return state;
    },
    flipTarget: () => {
    }
  };
}
const types = { keyframes: keyframes$1, spring, decay };
function detectAnimationFromOptions(config) {
  if (Array.isArray(config.to)) {
    return keyframes$1;
  } else if (types[config.type]) {
    return types[config.type];
  }
  const keys = new Set(Object.keys(config));
  if (keys.has("ease") || keys.has("duration") && !keys.has("dampingRatio")) {
    return keyframes$1;
  } else if (keys.has("dampingRatio") || keys.has("stiffness") || keys.has("mass") || keys.has("damping") || keys.has("restSpeed") || keys.has("restDelta")) {
    return spring;
  }
  return keyframes$1;
}
function loopElapsed(elapsed, duration, delay = 0) {
  return elapsed - duration - delay;
}
function reverseElapsed(elapsed, duration, delay = 0, isForwardPlayback = true) {
  return isForwardPlayback ? loopElapsed(duration + -elapsed, duration, delay) : duration - (elapsed - duration) + delay;
}
function hasRepeatDelayElapsed(elapsed, duration, delay, isForwardPlayback) {
  return isForwardPlayback ? elapsed >= duration + delay : elapsed <= -delay;
}
const framesync = (update) => {
  const passTimestamp = ({ delta }) => update(delta);
  return {
    start: () => sync.update(passTimestamp, true),
    stop: () => cancelSync.update(passTimestamp)
  };
};
function animate(_a) {
  var _b, _c;
  var { from, autoplay = true, driver = framesync, elapsed = 0, repeat: repeatMax = 0, repeatType = "loop", repeatDelay = 0, onPlay, onStop, onComplete, onRepeat, onUpdate } = _a, options2 = __rest(_a, ["from", "autoplay", "driver", "elapsed", "repeat", "repeatType", "repeatDelay", "onPlay", "onStop", "onComplete", "onRepeat", "onUpdate"]);
  let { to } = options2;
  let driverControls;
  let repeatCount = 0;
  let computedDuration = options2.duration;
  let latest;
  let isComplete = false;
  let isForwardPlayback = true;
  let interpolateFromNumber;
  const animator = detectAnimationFromOptions(options2);
  if ((_c = (_b = animator).needsInterpolation) === null || _c === void 0 ? void 0 : _c.call(_b, from, to)) {
    interpolateFromNumber = interpolate([0, 100], [from, to], {
      clamp: false
    });
    from = 0;
    to = 100;
  }
  const animation = animator(Object.assign(Object.assign({}, options2), { from, to }));
  function repeat() {
    repeatCount++;
    if (repeatType === "reverse") {
      isForwardPlayback = repeatCount % 2 === 0;
      elapsed = reverseElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback);
    } else {
      elapsed = loopElapsed(elapsed, computedDuration, repeatDelay);
      if (repeatType === "mirror")
        animation.flipTarget();
    }
    isComplete = false;
    onRepeat && onRepeat();
  }
  function complete() {
    driverControls.stop();
    onComplete && onComplete();
  }
  function update(delta) {
    if (!isForwardPlayback)
      delta = -delta;
    elapsed += delta;
    if (!isComplete) {
      const state = animation.next(Math.max(0, elapsed));
      latest = state.value;
      if (interpolateFromNumber)
        latest = interpolateFromNumber(latest);
      isComplete = isForwardPlayback ? state.done : elapsed <= 0;
    }
    onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(latest);
    if (isComplete) {
      if (repeatCount === 0)
        computedDuration !== null && computedDuration !== void 0 ? computedDuration : computedDuration = elapsed;
      if (repeatCount < repeatMax) {
        hasRepeatDelayElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback) && repeat();
      } else {
        complete();
      }
    }
  }
  function play() {
    onPlay === null || onPlay === void 0 ? void 0 : onPlay();
    driverControls = driver(update);
    driverControls.start();
  }
  autoplay && play();
  return {
    stop: () => {
      onStop === null || onStop === void 0 ? void 0 : onStop();
      driverControls.stop();
    }
  };
}
function velocityPerSecond(velocity, frameDuration) {
  return frameDuration ? velocity * (1e3 / frameDuration) : 0;
}
function inertia({ from = 0, velocity = 0, min, max, power = 0.8, timeConstant = 750, bounceStiffness = 500, bounceDamping = 10, restDelta = 1, modifyTarget, driver, onUpdate, onComplete, onStop }) {
  let currentAnimation;
  function isOutOfBounds(v) {
    return min !== void 0 && v < min || max !== void 0 && v > max;
  }
  function boundaryNearest(v) {
    if (min === void 0)
      return max;
    if (max === void 0)
      return min;
    return Math.abs(min - v) < Math.abs(max - v) ? min : max;
  }
  function startAnimation(options2) {
    currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop();
    currentAnimation = animate(Object.assign(Object.assign({}, options2), {
      driver,
      onUpdate: (v) => {
        var _a;
        onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(v);
        (_a = options2.onUpdate) === null || _a === void 0 ? void 0 : _a.call(options2, v);
      },
      onComplete,
      onStop
    }));
  }
  function startSpring(options2) {
    startAnimation(Object.assign({ type: "spring", stiffness: bounceStiffness, damping: bounceDamping, restDelta }, options2));
  }
  if (isOutOfBounds(from)) {
    startSpring({ from, velocity, to: boundaryNearest(from) });
  } else {
    let target = power * velocity + from;
    if (typeof modifyTarget !== "undefined")
      target = modifyTarget(target);
    const boundary = boundaryNearest(target);
    const heading = boundary === min ? -1 : 1;
    let prev;
    let current;
    const checkBoundary = (v) => {
      prev = current;
      current = v;
      velocity = velocityPerSecond(v - prev, getFrameData().delta);
      if (heading === 1 && v > boundary || heading === -1 && v < boundary) {
        startSpring({ from: v, to: boundary, velocity });
      }
    };
    startAnimation({
      type: "decay",
      from,
      velocity,
      timeConstant,
      power,
      restDelta,
      modifyTarget,
      onUpdate: isOutOfBounds(target) ? checkBoundary : void 0
    });
  }
  return {
    stop: () => currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop()
  };
}
const a = (a1, a2) => 1 - 3 * a2 + 3 * a1;
const b = (a1, a2) => 3 * a2 - 6 * a1;
const c = (a1) => 3 * a1;
const calcBezier = (t, a1, a2) => ((a(a1, a2) * t + b(a1, a2)) * t + c(a1)) * t;
const getSlope = (t, a1, a2) => 3 * a(a1, a2) * t * t + 2 * b(a1, a2) * t + c(a1);
const subdivisionPrecision = 1e-7;
const subdivisionMaxIterations = 10;
function binarySubdivide(aX, aA, aB, mX1, mX2) {
  let currentX;
  let currentT;
  let i = 0;
  do {
    currentT = aA + (aB - aA) / 2;
    currentX = calcBezier(currentT, mX1, mX2) - aX;
    if (currentX > 0) {
      aB = currentT;
    } else {
      aA = currentT;
    }
  } while (Math.abs(currentX) > subdivisionPrecision && ++i < subdivisionMaxIterations);
  return currentT;
}
const newtonIterations = 8;
const newtonMinSlope = 1e-3;
function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
  for (let i = 0; i < newtonIterations; ++i) {
    const currentSlope = getSlope(aGuessT, mX1, mX2);
    if (currentSlope === 0) {
      return aGuessT;
    }
    const currentX = calcBezier(aGuessT, mX1, mX2) - aX;
    aGuessT -= currentX / currentSlope;
  }
  return aGuessT;
}
const kSplineTableSize = 11;
const kSampleStepSize = 1 / (kSplineTableSize - 1);
function cubicBezier(mX1, mY1, mX2, mY2) {
  if (mX1 === mY1 && mX2 === mY2)
    return linear;
  const sampleValues = new Float32Array(kSplineTableSize);
  for (let i = 0; i < kSplineTableSize; ++i) {
    sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
  }
  function getTForX(aX) {
    let intervalStart = 0;
    let currentSample = 1;
    const lastSample = kSplineTableSize - 1;
    for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
      intervalStart += kSampleStepSize;
    }
    --currentSample;
    const dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    const guessForT = intervalStart + dist * kSampleStepSize;
    const initialSlope = getSlope(guessForT, mX1, mX2);
    if (initialSlope >= newtonMinSlope) {
      return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
    } else if (initialSlope === 0) {
      return guessForT;
    } else {
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
    }
  }
  return (t) => t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
}
const motionState = {};
class SubscriptionManager {
  constructor() {
    this.subscriptions = /* @__PURE__ */ new Set();
  }
  add(handler) {
    this.subscriptions.add(handler);
    return () => void this.subscriptions.delete(handler);
  }
  notify(a2, b2, c2) {
    if (!this.subscriptions.size)
      return;
    for (const handler of this.subscriptions) {
      handler(a2, b2, c2);
    }
  }
  clear() {
    this.subscriptions.clear();
  }
}
const isFloat = (value) => {
  return !isNaN(parseFloat(value));
};
class MotionValue {
  constructor(init) {
    this.timeDelta = 0;
    this.lastUpdated = 0;
    this.updateSubscribers = new SubscriptionManager();
    this.canTrackVelocity = false;
    this.updateAndNotify = (v) => {
      this.prev = this.current;
      this.current = v;
      const { delta, timestamp } = getFrameData();
      if (this.lastUpdated !== timestamp) {
        this.timeDelta = delta;
        this.lastUpdated = timestamp;
      }
      sync.postRender(this.scheduleVelocityCheck);
      this.updateSubscribers.notify(this.current);
    };
    this.scheduleVelocityCheck = () => sync.postRender(this.velocityCheck);
    this.velocityCheck = ({ timestamp }) => {
      if (!this.canTrackVelocity)
        this.canTrackVelocity = isFloat(this.current);
      if (timestamp !== this.lastUpdated) {
        this.prev = this.current;
      }
    };
    this.prev = this.current = init;
    this.canTrackVelocity = isFloat(this.current);
  }
  onChange(subscription) {
    return this.updateSubscribers.add(subscription);
  }
  clearListeners() {
    this.updateSubscribers.clear();
  }
  set(v) {
    this.updateAndNotify(v);
  }
  get() {
    return this.current;
  }
  getPrevious() {
    return this.prev;
  }
  getVelocity() {
    return this.canTrackVelocity ? velocityPerSecond(parseFloat(this.current) - parseFloat(this.prev), this.timeDelta) : 0;
  }
  start(animation) {
    this.stop();
    return new Promise((resolve) => {
      const { stop } = animation(resolve);
      this.stopAnimation = stop;
    }).then(() => this.clearAnimation());
  }
  stop() {
    if (this.stopAnimation)
      this.stopAnimation();
    this.clearAnimation();
  }
  isAnimating() {
    return !!this.stopAnimation;
  }
  clearAnimation() {
    this.stopAnimation = null;
  }
  destroy() {
    this.updateSubscribers.clear();
    this.stop();
  }
}
function getMotionValue(init) {
  return new MotionValue(init);
}
const { isArray } = Array;
function useMotionValues() {
  const motionValues = ref({});
  const stop = (keys) => {
    const destroyKey = (key) => {
      if (!motionValues.value[key])
        return;
      motionValues.value[key].stop();
      motionValues.value[key].destroy();
      del(motionValues.value, key);
    };
    if (keys) {
      if (isArray(keys)) {
        keys.forEach(destroyKey);
      } else {
        destroyKey(keys);
      }
    } else {
      Object.keys(motionValues.value).forEach(destroyKey);
    }
  };
  const get = (key, from, target) => {
    if (motionValues.value[key])
      return motionValues.value[key];
    const motionValue = getMotionValue(from);
    motionValue.onChange((v) => {
      set(target, key, v);
    });
    set(motionValues.value, key, motionValue);
    return motionValue;
  };
  tryOnUnmounted(stop);
  return {
    motionValues,
    get,
    stop
  };
}
const isKeyframesTarget = (v) => {
  return Array.isArray(v);
};
const underDampedSpring = () => ({
  type: "spring",
  stiffness: 500,
  damping: 25,
  restDelta: 0.5,
  restSpeed: 10
});
const criticallyDampedSpring = (to) => ({
  type: "spring",
  stiffness: 550,
  damping: to === 0 ? 2 * Math.sqrt(550) : 30,
  restDelta: 0.01,
  restSpeed: 10
});
const overDampedSpring = (to) => ({
  type: "spring",
  stiffness: 550,
  damping: to === 0 ? 100 : 30,
  restDelta: 0.01,
  restSpeed: 10
});
const linearTween = () => ({
  type: "keyframes",
  ease: "linear",
  duration: 300
});
const keyframes = (values) => ({
  type: "keyframes",
  duration: 800,
  values
});
const defaultTransitions = {
  default: overDampedSpring,
  x: underDampedSpring,
  y: underDampedSpring,
  z: underDampedSpring,
  rotate: underDampedSpring,
  rotateX: underDampedSpring,
  rotateY: underDampedSpring,
  rotateZ: underDampedSpring,
  scaleX: criticallyDampedSpring,
  scaleY: criticallyDampedSpring,
  scale: criticallyDampedSpring,
  backgroundColor: linearTween,
  color: linearTween,
  opacity: linearTween
};
const getDefaultTransition = (valueKey, to) => {
  let transitionFactory;
  if (isKeyframesTarget(to)) {
    transitionFactory = keyframes;
  } else {
    transitionFactory = defaultTransitions[valueKey] || defaultTransitions.default;
  }
  return __spreadValues({ to }, transitionFactory(to));
};
const int = __spreadProps(__spreadValues({}, number), {
  transform: Math.round
});
const valueTypes = {
  color,
  backgroundColor: color,
  outlineColor: color,
  fill: color,
  stroke: color,
  borderColor: color,
  borderTopColor: color,
  borderRightColor: color,
  borderBottomColor: color,
  borderLeftColor: color,
  borderWidth: px,
  borderTopWidth: px,
  borderRightWidth: px,
  borderBottomWidth: px,
  borderLeftWidth: px,
  borderRadius: px,
  radius: px,
  borderTopLeftRadius: px,
  borderTopRightRadius: px,
  borderBottomRightRadius: px,
  borderBottomLeftRadius: px,
  width: px,
  maxWidth: px,
  height: px,
  maxHeight: px,
  size: px,
  top: px,
  right: px,
  bottom: px,
  left: px,
  padding: px,
  paddingTop: px,
  paddingRight: px,
  paddingBottom: px,
  paddingLeft: px,
  margin: px,
  marginTop: px,
  marginRight: px,
  marginBottom: px,
  marginLeft: px,
  rotate: degrees,
  rotateX: degrees,
  rotateY: degrees,
  rotateZ: degrees,
  scale,
  scaleX: scale,
  scaleY: scale,
  scaleZ: scale,
  skew: degrees,
  skewX: degrees,
  skewY: degrees,
  distance: px,
  translateX: px,
  translateY: px,
  translateZ: px,
  x: px,
  y: px,
  z: px,
  perspective: px,
  transformPerspective: px,
  opacity: alpha,
  originX: progressPercentage,
  originY: progressPercentage,
  originZ: px,
  zIndex: int,
  filter,
  WebkitFilter: filter,
  fillOpacity: alpha,
  strokeOpacity: alpha,
  numOctaves: int
};
const getValueType = (key) => valueTypes[key];
const getValueAsType = (value, type) => {
  return type && typeof value === "number" && type.transform ? type.transform(value) : value;
};
function getAnimatableNone(key, value) {
  let defaultValueType = getValueType(key);
  if (defaultValueType !== filter)
    defaultValueType = complex;
  return defaultValueType.getAnimatableNone ? defaultValueType.getAnimatableNone(value) : void 0;
}
const easingLookup = {
  linear,
  easeIn,
  easeInOut,
  easeOut,
  circIn,
  circInOut,
  circOut,
  backIn,
  backInOut,
  backOut,
  anticipate,
  bounceIn,
  bounceInOut,
  bounceOut
};
const easingDefinitionToFunction = (definition) => {
  if (Array.isArray(definition)) {
    const [x1, y1, x2, y2] = definition;
    return cubicBezier(x1, y1, x2, y2);
  } else if (typeof definition === "string") {
    return easingLookup[definition];
  }
  return definition;
};
const isEasingArray = (ease) => {
  return Array.isArray(ease) && typeof ease[0] !== "number";
};
const isAnimatable = (key, value) => {
  if (key === "zIndex")
    return false;
  if (typeof value === "number" || Array.isArray(value))
    return true;
  if (typeof value === "string" && complex.test(value) && !value.startsWith("url(")) {
    return true;
  }
  return false;
};
function hydrateKeyframes(options2) {
  if (Array.isArray(options2.to) && options2.to[0] === null) {
    options2.to = [...options2.to];
    options2.to[0] = options2.from;
  }
  return options2;
}
function convertTransitionToAnimationOptions(_a) {
  var _b = _a, {
    ease,
    times,
    delay
  } = _b, transition = __objRest(_b, [
    "ease",
    "times",
    "delay"
  ]);
  const options2 = __spreadValues({}, transition);
  if (times)
    options2["offset"] = times;
  if (ease) {
    options2["ease"] = isEasingArray(ease) ? ease.map(easingDefinitionToFunction) : easingDefinitionToFunction(ease);
  }
  if (delay) {
    options2["elapsed"] = -delay;
  }
  return options2;
}
function getPopmotionAnimationOptions(transition, options2, key) {
  if (Array.isArray(options2.to)) {
    if (!transition.duration)
      transition.duration = 800;
  }
  hydrateKeyframes(options2);
  if (!isTransitionDefined(transition)) {
    transition = __spreadValues(__spreadValues({}, transition), getDefaultTransition(key, options2.to));
  }
  return __spreadValues(__spreadValues({}, options2), convertTransitionToAnimationOptions(transition));
}
function isTransitionDefined(_c) {
  var _d = _c, {
    delay,
    repeat,
    repeatType,
    repeatDelay,
    from
  } = _d, transition = __objRest(_d, [
    "delay",
    "repeat",
    "repeatType",
    "repeatDelay",
    "from"
  ]);
  return !!Object.keys(transition).length;
}
function getValueTransition(transition, key) {
  return transition[key] || transition["default"] || transition;
}
function getAnimation(key, value, target, transition, onComplete) {
  const valueTransition = getValueTransition(transition, key);
  let origin = valueTransition.from === null || valueTransition.from === void 0 ? value.get() : valueTransition.from;
  const isTargetAnimatable = isAnimatable(key, target);
  if (origin === "none" && isTargetAnimatable && typeof target === "string") {
    origin = getAnimatableNone(key, target);
  }
  const isOriginAnimatable = isAnimatable(key, origin);
  function start(complete) {
    const options2 = {
      from: origin,
      to: target,
      velocity: transition.velocity ? transition.velocity : value.getVelocity(),
      onUpdate: (v) => value.set(v)
    };
    return valueTransition.type === "inertia" || valueTransition.type === "decay" ? inertia(__spreadValues(__spreadValues({}, options2), valueTransition)) : animate(__spreadProps(__spreadValues({}, getPopmotionAnimationOptions(valueTransition, options2, key)), {
      onUpdate: (v) => {
        options2.onUpdate(v);
        if (valueTransition.onUpdate)
          valueTransition.onUpdate(v);
      },
      onComplete: () => {
        if (transition.onComplete)
          transition.onComplete();
        if (onComplete)
          onComplete();
        if (complete)
          complete();
      }
    }));
  }
  function set2(complete) {
    value.set(target);
    if (transition.onComplete)
      transition.onComplete();
    if (onComplete)
      onComplete();
    if (complete)
      complete();
    return { stop: () => {
    } };
  }
  return !isOriginAnimatable || !isTargetAnimatable || valueTransition.type === false ? set2 : start;
}
function useMotionTransitions() {
  const { motionValues, stop, get } = useMotionValues();
  const push = (key, value, target, transition = {}, onComplete) => {
    const from = target[key];
    const motionValue = get(key, from, target);
    if (transition && transition.immediate) {
      motionValue.set(value);
      return;
    }
    const animation = getAnimation(key, motionValue, value, transition, onComplete);
    motionValue.start(animation);
  };
  return { motionValues, stop, push };
}
function useMotionControls(motionProperties, variants = {}, { motionValues, push, stop } = useMotionTransitions()) {
  const _variants = unref(variants);
  const isAnimating = ref(false);
  const _stopWatchAnimating = watch(motionValues, (newVal) => {
    isAnimating.value = Object.values(newVal).filter((value) => value.isAnimating()).length > 0;
  }, {
    immediate: true,
    deep: true
  });
  const getVariantFromKey = (variant) => {
    if (!_variants || !_variants[variant]) {
      throw new Error(`The variant ${variant} does not exist.`);
    }
    return _variants[variant];
  };
  const apply = (variant) => {
    if (typeof variant === "string") {
      variant = getVariantFromKey(variant);
    }
    return Promise.all(Object.entries(variant).map(([key, value]) => {
      if (key === "transition")
        return;
      return new Promise((resolve) => {
        push(key, value, motionProperties, variant.transition || getDefaultTransition(key, variant[key]), resolve);
      });
    }));
  };
  const set2 = (variant) => {
    let variantData = isObject$1(variant) ? variant : getVariantFromKey(variant);
    Object.entries(variantData).forEach(([key, value]) => {
      if (key === "transition")
        return;
      push(key, value, motionProperties, {
        immediate: true
      });
    });
  };
  const leave = async (done) => {
    let leaveVariant;
    if (_variants) {
      if (_variants.leave) {
        leaveVariant = _variants.leave;
      }
      if (!_variants.leave && _variants.initial) {
        leaveVariant = _variants.initial;
      }
    }
    if (!leaveVariant) {
      done();
      return;
    }
    await apply(leaveVariant);
    done();
  };
  return {
    isAnimating,
    apply,
    set: set2,
    stopTransitions: () => {
      _stopWatchAnimating();
      stop();
    },
    leave
  };
}
function registerEventListeners({
  target,
  state,
  variants,
  apply
}) {
  const _variants = unref(variants);
  const _eventListeners = [];
  const _useEventListener = (...args) => {
    const _stop = useEventListener.apply(null, args);
    _eventListeners.push(_stop);
    return _stop;
  };
  const hovered = ref(false);
  const tapped = ref(false);
  const focused = ref(false);
  const mutableKeys = computed(() => {
    let result = [];
    if (!_variants)
      return result;
    if (_variants.hovered) {
      result = [...result, ...Object.keys(_variants.hovered)];
    }
    if (_variants.tapped) {
      result = [...result, ...Object.keys(_variants.tapped)];
    }
    if (_variants.focused) {
      result = [...result, ...Object.keys(_variants.focused)];
    }
    return result;
  });
  const computedProperties = computed(() => {
    const result = {};
    Object.assign(result, state.value);
    if (hovered.value && _variants.hovered) {
      Object.assign(result, _variants.hovered);
    }
    if (tapped.value && _variants.tapped) {
      Object.assign(result, _variants.tapped);
    }
    if (focused.value && _variants.focused) {
      Object.assign(result, _variants.focused);
    }
    for (const key in result) {
      if (!mutableKeys.value.includes(key))
        delete result[key];
    }
    return result;
  });
  if (_variants.hovered) {
    _useEventListener(target, "mouseenter", () => {
      hovered.value = true;
    });
    _useEventListener(target, "mouseleave", () => {
      hovered.value = false;
      tapped.value = false;
    });
    _useEventListener(target, "mouseout", () => {
      hovered.value = false;
      tapped.value = false;
    });
  }
  if (_variants.tapped)
    ;
  if (_variants.focused) {
    _useEventListener(target, "focus", () => {
      focused.value = true;
    });
    _useEventListener(target, "blur", () => {
      focused.value = false;
    });
  }
  const _stopSync = watch(computedProperties, apply);
  const stop = () => {
    _eventListeners.forEach((stopFn) => stopFn());
    _stopSync();
  };
  return { stop };
}
function registerLifeCycleHooks({
  set: set2,
  target,
  variants,
  variant
}) {
  const _variants = unref(variants);
  const stop = watch(() => target, () => {
    if (!_variants)
      return;
    if (_variants.initial)
      set2("initial");
    if (_variants.enter)
      variant.value = "enter";
  }, {
    immediate: true,
    flush: "pre"
  });
  return { stop };
}
function registerVariantsSync({
  state,
  apply
}) {
  const stop = watch(state, (newVal) => {
    if (newVal)
      apply(newVal);
  }, {
    immediate: true
  });
  return { stop };
}
function registerVisibilityHooks({
  target,
  variants,
  variant
}) {
  const _variants = unref(variants);
  let stop = noop;
  if (_variants && _variants.visible) {
    const { stop: stopObserver } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        variant.value = "visible";
      } else {
        variant.value = "initial";
      }
    });
    stop = stopObserver;
  }
  return {
    stop
  };
}
function useMotionFeatures(instance, options2 = {
  syncVariants: true,
  lifeCycleHooks: true,
  visibilityHooks: true,
  eventListeners: true
}) {
  const toStop = ref([]);
  if (options2.lifeCycleHooks) {
    const { stop: stopLifeCycleHooks } = registerLifeCycleHooks(instance);
    toStop.value.push(stopLifeCycleHooks);
  }
  if (options2.syncVariants) {
    const { stop: stopVariantSync } = registerVariantsSync(instance);
    toStop.value.push(stopVariantSync);
  }
  if (options2.visibilityHooks) {
    const { stop: stopVisibilityHooks } = registerVisibilityHooks(instance);
    toStop.value.push(stopVisibilityHooks);
  }
  if (options2.eventListeners) {
    const { stop: stopEventListeners } = registerEventListeners(instance);
    toStop.value.push(stopEventListeners);
  }
  const stop = () => toStop.value.forEach((_stop) => _stop());
  tryOnUnmounted(stop);
  return { stop };
}
function reactiveStyle(props = {}) {
  const state = reactive(__spreadValues({}, props));
  const style = ref({});
  watch(state, () => {
    const result = {};
    for (const [key, value] of Object.entries(state)) {
      const valueType = getValueType(key);
      const valueAsType = getValueAsType(value, valueType);
      result[key] = valueAsType;
    }
    style.value = result;
  }, {
    immediate: true,
    deep: true
  });
  return {
    state,
    style
  };
}
const transformAxes = ["", "X", "Y", "Z"];
const order = ["perspective", "translate", "scale", "rotate", "skew"];
const transformProps = ["transformPerspective", "x", "y", "z"];
order.forEach((operationKey) => {
  transformAxes.forEach((axesKey) => {
    const key = operationKey + axesKey;
    transformProps.push(key);
  });
});
const transformPropSet = new Set(transformProps);
function isTransformProp(key) {
  return transformPropSet.has(key);
}
const transformOriginProps = /* @__PURE__ */ new Set(["originX", "originY", "originZ"]);
function isTransformOriginProp(key) {
  return transformOriginProps.has(key);
}
function useElementStyle(target, onInit) {
  let _cache;
  let _target = void 0;
  const { state, style } = reactiveStyle();
  const stopInitWatch = watch(() => unrefElement(target), (el) => {
    if (!el)
      return;
    _target = el;
    for (const key of Object.keys(valueTypes)) {
      if (el.style[key] === null || el.style[key] === "" || isTransformProp(key) || isTransformOriginProp(key))
        continue;
      set(state, key, el.style[key]);
    }
    if (_cache) {
      Object.entries(_cache).forEach(([key, value]) => set(el.style, key, value));
    }
    if (onInit)
      onInit(state);
  }, {
    immediate: true
  });
  const stopSyncWatch = watch(style, (newVal) => {
    if (!_target) {
      _cache = newVal;
      return;
    }
    for (const key in newVal)
      set(_target.style, key, newVal[key]);
  }, {
    immediate: true
  });
  const stop = () => {
    _target = void 0;
    _cache = void 0;
    stopInitWatch();
    stopSyncWatch();
  };
  return {
    style: state,
    stop
  };
}
const translateAlias = {
  x: "translateX",
  y: "translateY",
  z: "translateZ"
};
function reactiveTransform(props = {}, enableHardwareAcceleration = true) {
  const state = reactive(__spreadValues({}, props));
  const transform = ref("");
  watch(state, (newVal) => {
    let result = "";
    let hasHardwareAcceleration = false;
    if (enableHardwareAcceleration && (newVal.x || newVal.y || newVal.z)) {
      const str = [newVal.x || 0, newVal.y || 0, newVal.z || 0].map(px.transform).join(",");
      result += `translate3d(${str}) `;
      hasHardwareAcceleration = true;
    }
    for (const [key, value] of Object.entries(newVal)) {
      if (enableHardwareAcceleration && (key === "x" || key === "y" || key === "z"))
        continue;
      const valueType = getValueType(key);
      const valueAsType = getValueAsType(value, valueType);
      result += `${translateAlias[key] || key}(${valueAsType}) `;
    }
    if (enableHardwareAcceleration && !hasHardwareAcceleration) {
      result += `translateZ(0px) `;
    }
    transform.value = result.trim();
  }, {
    immediate: true,
    deep: true
  });
  return {
    state,
    transform
  };
}
function parseTransform(transform) {
  const transforms = transform.trim().split(/\) |\)/);
  if (transforms.length === 1) {
    return {};
  }
  const parseValues = (value) => {
    if (value.endsWith("px") || value.endsWith("deg"))
      return parseFloat(value);
    if (isNaN(Number(value)))
      return Number(value);
    return value;
  };
  return transforms.reduce((acc, transform2) => {
    if (!transform2)
      return acc;
    const [name, transformValue] = transform2.split("(");
    const valueArray = transformValue.split(",");
    const values = valueArray.map((val) => {
      return parseValues(val.endsWith(")") ? val.replace(")", "") : val.trim());
    });
    const value = values.length === 1 ? values[0] : values;
    return __spreadProps(__spreadValues({}, acc), {
      [name]: value
    });
  }, {});
}
function stateFromTransform(state, transform) {
  Object.entries(parseTransform(transform)).forEach(([key, value]) => {
    value = parseFloat(value);
    const axes = ["x", "y", "z"];
    if (key === "translate3d") {
      value.forEach((axisValue, index2) => {
        set(state, axes[index2], axisValue);
      });
      return;
    }
    if (key === "translateX") {
      set(state, "x", value);
      return;
    }
    if (key === "translateY") {
      set(state, "y", value);
      return;
    }
    if (key === "translateZ") {
      set(state, "z", value);
      return;
    }
    set(state, key, value);
  });
}
function useElementTransform(target, onInit) {
  let _cache;
  let _target = void 0;
  const { state, transform } = reactiveTransform();
  const stopInitWatch = watch(() => unrefElement(target), (el) => {
    if (!el)
      return;
    _target = el;
    if (el.style.transform)
      stateFromTransform(state, el.style.transform);
    if (_cache) {
      el.style.transform = _cache;
    }
    if (onInit)
      onInit(state);
  }, {
    immediate: true
  });
  const stopSyncWatch = watch(transform, (newValue) => {
    if (!_target) {
      _cache = newValue;
      return;
    }
    _target.style.transform = newValue;
  }, {
    immediate: true
  });
  const stop = () => {
    _cache = void 0;
    _target = void 0;
    stopInitWatch();
    stopSyncWatch();
  };
  return {
    transform: state,
    stop
  };
}
function useMotionProperties(target, defaultValues) {
  const motionProperties = reactive({});
  const apply = (values) => {
    Object.entries(values).forEach(([key, value]) => {
      set(motionProperties, key, value);
    });
  };
  const { style, stop: stopStyleWatchers } = useElementStyle(target, apply);
  const { transform, stop: stopTransformWatchers } = useElementTransform(target, apply);
  const stopPropertiesWatch = watch(motionProperties, (newVal) => {
    Object.entries(newVal).forEach(([key, value]) => {
      const target2 = isTransformProp(key) ? transform : style;
      if (target2[key] && target2[key] === value)
        return;
      set(target2, key, value);
    });
  }, {
    immediate: true,
    deep: true
  });
  const stopInitWatch = watch(() => unrefElement(target), (el) => {
    if (!el)
      return;
    if (defaultValues)
      apply(defaultValues);
  }, {
    immediate: true
  });
  const stop = () => {
    stopStyleWatchers();
    stopTransformWatchers();
    stopPropertiesWatch();
    stopInitWatch();
  };
  return {
    motionProperties,
    style,
    transform,
    stop
  };
}
function useMotionVariants(variants = {}) {
  const _variants = unref(variants);
  const variant = ref();
  const state = computed(() => {
    if (!variant.value)
      return;
    return _variants[variant.value];
  });
  return {
    state,
    variant
  };
}
function useMotion(target, variants = {}, options2) {
  const { motionProperties, stop: stopMotionProperties } = useMotionProperties(target);
  const { variant, state } = useMotionVariants(variants);
  const controls = useMotionControls(motionProperties, variants);
  const instance = __spreadProps(__spreadValues({
    target,
    variant,
    variants,
    state,
    motionProperties
  }, controls), {
    stop: (force = false) => {
    }
  });
  const { stop: stopMotionFeatures } = useMotionFeatures(instance, options2);
  instance.stop = (force = false) => {
    const _stop = () => {
      instance.stopTransitions();
      stopMotionProperties();
      stopMotionFeatures();
    };
    if (!force && variants.value && variants.value["leave"]) {
      const _stopWatch = watch(instance.isAnimating, (newVal) => {
        if (!newVal) {
          _stopWatch();
          _stop();
        }
      });
    } else {
      _stop();
    }
  };
  tryOnUnmounted(() => instance.stop());
  return instance;
}
const directivePropsKeys = [
  "initial",
  "enter",
  "leave",
  "visible",
  "hovered",
  "tapped",
  "focused",
  "delay"
];
const resolveVariants = (node, variantsRef) => {
  const target = node.props ? node.props : node.data && node.data.attrs ? node.data.attrs : {};
  if (target) {
    if (target["variants"] && isObject$1(target["variants"])) {
      variantsRef.value = __spreadValues(__spreadValues({}, variantsRef.value), target["variants"]);
    }
    directivePropsKeys.forEach((key) => {
      if (key === "delay") {
        if (target && target[key] && isNumber(target[key])) {
          const delay = target[key];
          if (variantsRef && variantsRef.value) {
            if (variantsRef.value.enter) {
              if (!variantsRef.value.enter.transition) {
                variantsRef.value.enter.transition = {};
              }
              variantsRef.value.enter.transition = __spreadProps(__spreadValues({}, variantsRef.value.enter.transition), {
                delay
              });
            }
            if (variantsRef.value.visible) {
              if (!variantsRef.value.visible.transition) {
                variantsRef.value.visible.transition = {};
              }
              variantsRef.value.visible.transition = __spreadProps(__spreadValues({}, variantsRef.value.visible.transition), {
                delay
              });
            }
          }
        }
        return;
      }
      if (target && target[key] && isObject$1(target[key])) {
        variantsRef.value[key] = target[key];
      }
    });
  }
};
const directive = (variants) => {
  const register = (el, binding, node) => {
    const key = binding.value || node.key;
    if (key && motionState[key])
      motionState[key].stop();
    const variantsRef = ref(variants || {});
    resolveVariants(node, variantsRef);
    const motionInstance = useMotion(el, variantsRef);
    el.motionInstance = motionInstance;
    if (key)
      set(motionState, key, motionInstance);
  };
  const unregister = (el, _, __) => {
    if (el.motionInstance)
      el.motionInstance.stop();
  };
  return {
    created: register,
    unmounted: unregister,
    bind: register,
    unbind: unregister
  };
};
const fade = {
  initial: {
    opacity: 0
  },
  enter: {
    opacity: 1
  }
};
const fadeVisible = {
  initial: {
    opacity: 0
  },
  visible: {
    opacity: 1
  }
};
const pop = {
  initial: {
    scale: 0,
    opacity: 0
  },
  enter: {
    scale: 1,
    opacity: 1
  }
};
const popVisible = {
  initial: {
    scale: 0,
    opacity: 0
  },
  visible: {
    scale: 1,
    opacity: 1
  }
};
const rollLeft = {
  initial: {
    x: -100,
    rotate: 90,
    opacity: 0
  },
  enter: {
    x: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollVisibleLeft = {
  initial: {
    x: -100,
    rotate: 90,
    opacity: 0
  },
  visible: {
    x: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollRight = {
  initial: {
    x: 100,
    rotate: -90,
    opacity: 0
  },
  enter: {
    x: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollVisibleRight = {
  initial: {
    x: 100,
    rotate: -90,
    opacity: 0
  },
  visible: {
    x: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollTop = {
  initial: {
    y: -100,
    rotate: -90,
    opacity: 0
  },
  enter: {
    y: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollVisibleTop = {
  initial: {
    y: -100,
    rotate: -90,
    opacity: 0
  },
  visible: {
    y: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollBottom = {
  initial: {
    y: 100,
    rotate: 90,
    opacity: 0
  },
  enter: {
    y: 0,
    rotate: 0,
    opacity: 1
  }
};
const rollVisibleBottom = {
  initial: {
    y: 100,
    rotate: 90,
    opacity: 0
  },
  visible: {
    y: 0,
    rotate: 0,
    opacity: 1
  }
};
const slideLeft = {
  initial: {
    x: -100,
    opacity: 0
  },
  enter: {
    x: 0,
    opacity: 1
  }
};
const slideVisibleLeft = {
  initial: {
    x: -100,
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1
  }
};
const slideRight = {
  initial: {
    x: 100,
    opacity: 0
  },
  enter: {
    x: 0,
    opacity: 1
  }
};
const slideVisibleRight = {
  initial: {
    x: 100,
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1
  }
};
const slideTop = {
  initial: {
    y: -100,
    opacity: 0
  },
  enter: {
    y: 0,
    opacity: 1
  }
};
const slideVisibleTop = {
  initial: {
    y: -100,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1
  }
};
const slideBottom = {
  initial: {
    y: 100,
    opacity: 0
  },
  enter: {
    y: 0,
    opacity: 1
  }
};
const slideVisibleBottom = {
  initial: {
    y: 100,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1
  }
};
const presets = {
  __proto__: null,
  fade,
  fadeVisible,
  pop,
  popVisible,
  rollBottom,
  rollLeft,
  rollRight,
  rollTop,
  rollVisibleBottom,
  rollVisibleLeft,
  rollVisibleRight,
  rollVisibleTop,
  slideBottom,
  slideLeft,
  slideRight,
  slideTop,
  slideVisibleBottom,
  slideVisibleLeft,
  slideVisibleRight,
  slideVisibleTop
};
function slugify(string) {
  const a2 = "\xE0\xE1\xE2\xE4\xE6\xE3\xE5\u0101\u0103\u0105\xE7\u0107\u010D\u0111\u010F\xE8\xE9\xEA\xEB\u0113\u0117\u0119\u011B\u011F\u01F5\u1E27\xEE\xEF\xED\u012B\u012F\xEC\u0142\u1E3F\xF1\u0144\u01F9\u0148\xF4\xF6\xF2\xF3\u0153\xF8\u014D\xF5\u0151\u1E55\u0155\u0159\xDF\u015B\u0161\u015F\u0219\u0165\u021B\xFB\xFC\xF9\xFA\u016B\u01D8\u016F\u0171\u0173\u1E83\u1E8D\xFF\xFD\u017E\u017A\u017C\xB7/_,:;";
  const b2 = "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a2.split("").join("|"), "g");
  return string.toString().replace(/[A-Z]/g, (s) => "-" + s).toLowerCase().replace(/\s+/g, "-").replace(p, (c2) => b2.charAt(a2.indexOf(c2))).replace(/&/g, "-and-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
}
const MotionPlugin = {
  install(app, options2) {
    app.directive("motion", directive());
    if (!options2 || options2 && !options2.excludePresets) {
      for (const key in presets) {
        const preset = presets[key];
        app.directive(`motion-${slugify(key)}`, directive(preset));
      }
    }
    if (options2 && options2.directives) {
      for (const key in options2.directives) {
        const variants = options2.directives[key];
        if (!variants.initial && __DEV__) {
          console.warn(`Your directive v-motion-${key} is missing initial variant!`);
        }
        app.directive(`motion-${key}`, directive(variants));
      }
    }
  }
};
function isObject(val) {
  return val !== null && typeof val === "object";
}
function _defu(baseObj, defaults, namespace = ".", merger) {
  if (!isObject(defaults)) {
    return _defu(baseObj, {}, namespace, merger);
  }
  const obj = Object.assign({}, defaults);
  for (const key in baseObj) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const val = baseObj[key];
    if (val === null || val === void 0) {
      continue;
    }
    if (merger && merger(obj, key, val, namespace)) {
      continue;
    }
    if (Array.isArray(val) && Array.isArray(obj[key])) {
      obj[key] = obj[key].concat(val);
    } else if (isObject(val) && isObject(obj[key])) {
      obj[key] = _defu(val, obj[key], (namespace ? `${namespace}.` : "") + key.toString(), merger);
    } else {
      obj[key] = val;
    }
  }
  return obj;
}
function extend(merger) {
  return (...args) => args.reduce((p, c2) => _defu(p, c2, "", merger), {});
}
const defu = extend();
defu.fn = extend((obj, key, currentValue, _namespace) => {
  if (typeof obj[key] !== "undefined" && typeof currentValue === "function") {
    obj[key] = currentValue(obj[key]);
    return true;
  }
});
defu.arrayFn = extend((obj, key, currentValue, _namespace) => {
  if (Array.isArray(obj[key]) && typeof currentValue === "function") {
    obj[key] = currentValue(obj[key]);
    return true;
  }
});
defu.extend = extend;
const appOptions = {};
const options = defu(appOptions, {});
const motion_c37701e0 = defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(MotionPlugin, options);
});
const PiniaNuxtPlugin = (context, inject2) => {
  const pinia = createPinia();
  {
    context.vueApp.use(pinia);
  }
  inject2("pinia", pinia);
  context.pinia = pinia;
  setActivePinia(pinia);
  pinia._p.push(({ store }) => {
    Object.defineProperty(store, "$nuxt", { value: context });
  });
  {
    {
      context.nuxtState.pinia = pinia.state.value;
    }
  }
};
const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const EQUAL_RE = /=/g;
const PLUS_RE = /\+/g;
const ENC_BRACKET_OPEN_RE = /%5B/gi;
const ENC_BRACKET_CLOSE_RE = /%5D/gi;
const ENC_CARET_RE = /%5E/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_CURLY_OPEN_RE = /%7B/gi;
const ENC_PIPE_RE = /%7C/gi;
const ENC_CURLY_CLOSE_RE = /%7D/gi;
const ENC_SPACE_RE = /%20/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]");
}
function encodeQueryValue(text) {
  return encode(text).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch (_err) {
    return "" + text;
  }
}
function decodeQueryValue(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function parseQuery(paramsStr = "") {
  const obj = {};
  if (paramsStr[0] === "?") {
    paramsStr = paramsStr.substr(1);
  }
  for (const param of paramsStr.split("&")) {
    const s = param.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decode(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (obj[key]) {
      if (Array.isArray(obj[key])) {
        obj[key].push(value);
      } else {
        obj[key] = [obj[key], value];
      }
    } else {
      obj[key] = value;
    }
  }
  return obj;
}
function encodeQueryItem(key, val) {
  if (!val) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(val)) {
    return val.map((_val) => `${encodeQueryKey(key)}=${encodeQueryValue(_val)}`).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(val)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).map((k) => encodeQueryItem(k, query[k])).join("&");
}
function hasProtocol(inputStr, acceptProtocolRelative = false) {
  return /^\w+:\/\/.+/.test(inputStr) || acceptProtocolRelative && /^\/\/[^/]+/.test(inputStr);
}
const TRAILING_SLASH_RE = /\/$|\/\?/;
function hasTrailingSlash(input = "", queryParams = false) {
  if (!queryParams) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", queryParams = false) {
  if (!queryParams) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  const [s0, ...s] = input.split("?");
  return (s0.slice(0, -1) || "/") + (s.length ? `?${s.join("?")}` : "");
}
function withTrailingSlash(input = "", queryParams = false) {
  if (!queryParams) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  const [s0, ...s] = input.split("?");
  return s0 + "/" + (s.length ? `?${s.join("?")}` : "");
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withoutLeadingSlash(input = "") {
  return (hasLeadingSlash(input) ? input.substr(1) : input) || "/";
}
function withBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    return input;
  }
  return joinURL(_base, input);
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = __spreadValues(__spreadValues({}, parseQuery(parsed.search)), query);
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const i of input.filter(isNonEmptyURL)) {
    url = url ? withTrailingSlash(url) + withoutLeadingSlash(i) : i;
  }
  return url;
}
function parseURL(input = "", defaultProto) {
  if (!hasProtocol(input, true)) {
    return defaultProto ? parseURL(defaultProto + input) : parsePath(input);
  }
  const [protocol = "", auth, hostAndPath] = (input.replace(/\\/g, "/").match(/([^:/]+:)?\/\/([^/@]+@)?(.*)/) || []).splice(1);
  const [host = "", path = ""] = (hostAndPath.match(/([^/?]*)(.*)?/) || []).splice(1);
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol,
    auth: auth ? auth.substr(0, auth.length - 1) : "",
    host,
    pathname,
    search,
    hash
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const fullpath = parsed.pathname + (parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "") + parsed.hash;
  if (!parsed.protocol) {
    return fullpath;
  }
  return parsed.protocol + "//" + (parsed.auth ? parsed.auth + "@" : "") + parsed.host + fullpath;
}
class FetchError extends Error {
  constructor() {
    super(...arguments);
    this.name = "FetchError";
  }
}
function createFetchError(request, error, response) {
  let message = "";
  if (request && response) {
    message = `${response.status} ${response.statusText} (${request.toString()})`;
  }
  if (error) {
    message = `${error.message} (${message})`;
  }
  const fetchError = new FetchError(message);
  Object.defineProperty(fetchError, "request", { get() {
    return request;
  } });
  Object.defineProperty(fetchError, "response", { get() {
    return response;
  } });
  Object.defineProperty(fetchError, "data", { get() {
    return response && response._data;
  } });
  return fetchError;
}
const payloadMethods = new Set(Object.freeze(["PATCH", "POST", "PUT", "DELETE"]));
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(val) {
  if (val === void 0) {
    return false;
  }
  const t = typeof val;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(val)) {
    return true;
  }
  return val.constructor && val.constructor.name === "Object" || typeof val.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const jsonTypes = /* @__PURE__ */ new Set(["application/json", "application/ld+json"]);
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift();
  if (jsonTypes.has(contentType)) {
    return "json";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  409,
  425,
  429,
  500,
  502,
  503,
  504
]);
function createFetch(globalOptions) {
  const { fetch: fetch2, Headers: Headers2 } = globalOptions;
  function onError(ctx) {
    if (ctx.options.retry !== false) {
      const retries = typeof ctx.options.retry === "number" ? ctx.options.retry : isPayloadMethod(ctx.options.method) ? 0 : 1;
      const responseCode = ctx.response && ctx.response.status || 500;
      if (retries > 0 && retryStatusCodes.has(responseCode)) {
        return $fetchRaw(ctx.request, __spreadProps(__spreadValues({}, ctx.options), {
          retry: retries - 1
        }));
      }
    }
    const err = createFetchError(ctx.request, ctx.error, ctx.response);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(err, $fetchRaw);
    }
    throw err;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _opts = {}) {
    const ctx = {
      request: _request,
      options: __spreadValues(__spreadValues({}, globalOptions.defaults), _opts),
      response: void 0,
      error: void 0
    };
    if (ctx.options.onRequest) {
      await ctx.options.onRequest(ctx);
    }
    if (typeof ctx.request === "string") {
      if (ctx.options.baseURL) {
        ctx.request = withBase(ctx.request, ctx.options.baseURL);
      }
      if (ctx.options.params) {
        ctx.request = withQuery(ctx.request, ctx.options.params);
      }
      if (ctx.options.body && isPayloadMethod(ctx.options.method)) {
        if (isJSONSerializable(ctx.options.body)) {
          ctx.options.body = JSON.stringify(ctx.options.body);
          ctx.options.headers = new Headers2(ctx.options.headers);
          if (!ctx.options.headers.has("content-type")) {
            ctx.options.headers.set("content-type", "application/json");
          }
          if (!ctx.options.headers.has("accept")) {
            ctx.options.headers.set("accept", "application/json");
          }
        }
      }
    }
    ctx.response = await fetch2(ctx.request, ctx.options).catch(async (error) => {
      ctx.error = error;
      if (ctx.options.onRequestError) {
        await ctx.options.onRequestError(ctx);
      }
      return onError(ctx);
    });
    const responseType = (ctx.options.parseResponse ? "json" : ctx.options.responseType) || detectResponseType(ctx.response.headers.get("content-type") || "");
    if (responseType === "json") {
      const data = await ctx.response.text();
      const parseFn = ctx.options.parseResponse || destr;
      ctx.response._data = parseFn(data);
    } else {
      ctx.response._data = await ctx.response[responseType]();
    }
    if (ctx.options.onResponse) {
      await ctx.options.onResponse(ctx);
    }
    if (!ctx.response.ok) {
      if (ctx.options.onResponseError) {
        await ctx.options.onResponseError(ctx);
      }
    }
    return ctx.response.ok ? ctx.response : onError(ctx);
  };
  const $fetch2 = function $fetch22(request, opts) {
    return $fetchRaw(request, opts).then((r) => r._data);
  };
  $fetch2.raw = $fetchRaw;
  $fetch2.create = (defaultOptions2 = {}) => createFetch(__spreadProps(__spreadValues({}, globalOptions), {
    defaults: __spreadValues(__spreadValues({}, globalOptions.defaults), defaultOptions2)
  }));
  return $fetch2;
}
const _globalThis = function() {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw new Error("unable to locate global object");
}();
const fetch = _globalThis.fetch || (() => Promise.reject(new Error("[ohmyfetch] global.fetch is not supported!")));
const Headers$1 = _globalThis.Headers;
const $fetch$1 = createFetch({ fetch, Headers: Headers$1 });
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch$1;
}
const nitroClient_ad988668 = () => {
};
const components = {
  BeliefSlider: defineAsyncComponent(() => Promise.resolve().then(function() {
    return BeliefSlider$1;
  }).then((c2) => c2.default || c2)),
  Footer: defineAsyncComponent(() => Promise.resolve().then(function() {
    return Footer$1;
  }).then((c2) => c2.default || c2)),
  Header: defineAsyncComponent(() => Promise.resolve().then(function() {
    return Header;
  }).then((c2) => c2.default || c2)),
  MainCard: defineAsyncComponent(() => Promise.resolve().then(function() {
    return MainCard;
  }).then((c2) => c2.default || c2)),
  MainTile: defineAsyncComponent(() => Promise.resolve().then(function() {
    return MainTile$1;
  }).then((c2) => c2.default || c2)),
  NavigationBar: defineAsyncComponent(() => Promise.resolve().then(function() {
    return NavigationBar;
  }).then((c2) => c2.default || c2)),
  NavigationDrawer: defineAsyncComponent(() => Promise.resolve().then(function() {
    return NavigationDrawer$1;
  }).then((c2) => c2.default || c2)),
  Sermon: defineAsyncComponent(() => Promise.resolve().then(function() {
    return Sermon;
  }).then((c2) => c2.default || c2)),
  SermonSlider: defineAsyncComponent(() => Promise.resolve().then(function() {
    return SermonSlider;
  }).then((c2) => c2.default || c2)),
  SvgIcon: defineAsyncComponent(() => Promise.resolve().then(function() {
    return SvgIcon$1;
  }).then((c2) => c2.default || c2)),
  Video: defineAsyncComponent(() => Promise.resolve().then(function() {
    return Video;
  }).then((c2) => c2.default || c2)),
  VisionSlider: defineAsyncComponent(() => Promise.resolve().then(function() {
    return VisionSlider$1;
  }).then((c2) => c2.default || c2)),
  Watch: defineAsyncComponent(() => Promise.resolve().then(function() {
    return Watch;
  }).then((c2) => c2.default || c2)),
  SeriesSlider: defineAsyncComponent(() => Promise.resolve().then(function() {
    return seriesSlider$1;
  }).then((c2) => c2.default || c2)),
  LayoutUtilsInfoComponent: defineAsyncComponent(() => Promise.resolve().then(function() {
    return InfoComponent$1;
  }).then((c2) => c2.default || c2)),
  LayoutUtilsThreeCol: defineAsyncComponent(() => Promise.resolve().then(function() {
    return threeCol;
  }).then((c2) => c2.default || c2)),
  SidemenuSideMenu: defineAsyncComponent(() => Promise.resolve().then(function() {
    return SideMenu$1;
  }).then((c2) => c2.default || c2)),
  SidemenuSideMenuLink: defineAsyncComponent(() => Promise.resolve().then(function() {
    return SideMenuLink$1;
  }).then((c2) => c2.default || c2)),
  SidemenuSideMenuTile: defineAsyncComponent(() => Promise.resolve().then(function() {
    return SideMenuTile$1;
  }).then((c2) => c2.default || c2)),
  UiMediaScroller: defineAsyncComponent(() => Promise.resolve().then(function() {
    return mediaScroller$1;
  }).then((c2) => c2.default || c2))
};
function components_515c5644(nuxtApp) {
  for (const name in components) {
    nuxtApp.vueApp.component(name, components[name]);
    nuxtApp.vueApp.component("Lazy" + name, components[name]);
  }
}
const _plugins = [
  preload,
  vueuseHead_0222a304,
  plugin_89c5bb1c,
  router_43f10eed,
  motion_c37701e0,
  PiniaNuxtPlugin,
  nitroClient_ad988668,
  components_515c5644
];
const _sfc_main$n = {
  setup() {
    const nuxtApp = useNuxtApp();
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    return {
      onResolve: () => nuxtApp.callHook("app:suspense:resolve")
    };
  }
};
function _sfc_ssrRender$b(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_App = resolveComponent("App");
  ssrRenderSuspense(_push, {
    default: () => {
      _push(ssrRenderComponent(_component_App, null, null, _parent));
    },
    _: 1
  });
}
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt3/dist/app/components/nuxt-root.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const RootComponent = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["ssrRender", _sfc_ssrRender$b]]);
const _sfc_main$m = {};
function _sfc_ssrRender$a(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLayout = resolveComponent("NuxtLayout");
  const _component_NuxtPage = resolveComponent("NuxtPage");
  _push(ssrRenderComponent(_component_NuxtLayout, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_NuxtPage)
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt3/dist/pages/runtime/app.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["ssrRender", _sfc_ssrRender$a]]);
let entry;
const plugins = normalizePlugins(_plugins);
{
  entry = async function createNuxtAppServer(ssrContext = {}) {
    const vueApp = createApp(RootComponent);
    vueApp.component("App", AppComponent);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    await applyPlugins(nuxt, plugins);
    await nuxt.hooks.callHook("app:created", vueApp);
    return vueApp;
  };
}
const bootstrap = (ctx) => entry(ctx);
const bootstrap$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": bootstrap
});
const NavigationBar_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$3 = _imports_0$2 + "#icon-facebook";
const _hoisted_2$2 = _imports_0$2 + "#icon-youTube";
const _hoisted_3$2 = _imports_0$2 + "#icon-instagram";
const __default__ = {
  props: {
    navigationLinks: {
      type: Array,
      required: true
    }
  }
};
const _sfc_main$l = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const scrolledNav = ref(null);
    const mobile = ref(false);
    const mobileNav = ref(false);
    const windowWidth = ref(null);
    onMounted(() => {
      const checkScreen = () => {
        windowWidth.value = window.innerWidth;
        if (windowWidth.value <= 1050) {
          mobile.value = true;
          return;
        }
        mobile.value = false;
        mobileNav.value = false;
        return;
      };
      const updateScroll = () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition > 50) {
          scrolledNav.value = true;
          return;
        }
        scrolledNav.value = false;
      };
      window.addEventListener("scroll", updateScroll);
      window.addEventListener("resize", checkScreen);
      checkScreen();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = resolveComponent("nuxt-link");
      _push(`<header${ssrRenderAttrs(mergeProps({
        class: { "scrolled-nav": scrolledNav.value }
      }, _attrs))} data-v-442e94af><nav data-v-442e94af>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: { name: "index" },
        class: "branding"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="logo" data-v-442e94af${_scopeId}><use${ssrRenderAttr("xlink:href", "/images/icons/sprite.svg#icon-logo")} data-v-442e94af${_scopeId}></use></svg><div class="text-blue-gray-50 text-4xl font-black ml-2" data-v-442e94af${_scopeId}>RTM</div>`);
          } else {
            return [
              (openBlock(), createBlock("svg", { class: "logo" }, [
                createVNode("use", { "xlink:href": "/images/icons/sprite.svg#icon-logo" }, null, 8, ["xlink:href"])
              ])),
              createVNode("div", { class: "text-blue-gray-50 text-4xl font-black ml-2" }, "RTM")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<ul style="${ssrRenderStyle(!mobile.value ? null : { display: "none" })}" class="navigation text-blue-gray-50" data-v-442e94af><!--[-->`);
      ssrRenderList(__props.navigationLinks, (link, index2) => {
        _push(`<li data-v-442e94af>`);
        if (link.external) {
          _push(`<a${ssrRenderAttr("href", link.destination)} data-v-442e94af>${ssrInterpolate(link.name)}</a>`);
        } else {
          _push(ssrRenderComponent(_component_nuxt_link, {
            to: link.destination,
            class: "link"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(link.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString$1(link.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul><div class="icon" data-v-442e94af><i style="${ssrRenderStyle(mobile.value ? null : { display: "none" })}" class="${ssrRenderClass([{ "icon-active": mobileNav.value }, "far fa-bars"])}" data-v-442e94af></i></div><div${ssrRenderAttrs(mergeProps({
        style: mobileNav.value ? null : { display: "none" },
        class: "dropdown-nav"
      }, _attrs))} data-v-442e94af><button class="" data-v-442e94af>Close</button><button class="" href="/" data-v-442e94af>Watch Now</button><div class="" data-v-442e94af><!--[-->`);
      ssrRenderList(__props.navigationLinks, (link, index2) => {
        _push(`<div data-v-442e94af>`);
        if (link.external) {
          _push(`<a${ssrRenderAttr("href", link.destination)} data-v-442e94af>${ssrInterpolate(link.name)}</a>`);
        } else {
          _push(ssrRenderComponent(_component_nuxt_link, {
            to: link.destination,
            class: "link"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(link.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString$1(link.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div><div data-v-442e94af><h2 data-v-442e94af>Connect</h2><div class="flex space-x-2" data-v-442e94af><svg class="w-6 h-6" data-v-442e94af><use${ssrRenderAttr("xlink:href", _hoisted_1$3)} data-v-442e94af></use></svg><svg class="w-6 h-6" data-v-442e94af><use${ssrRenderAttr("xlink:href", _hoisted_2$2)} data-v-442e94af></use></svg><svg class="w-6 h-6" data-v-442e94af><use${ssrRenderAttr("xlink:href", _hoisted_3$2)} data-v-442e94af></use></svg></div></div></div></nav></header>`);
    };
  }
});
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/NavigationBar.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__scopeId", "data-v-442e94af"]]);
const NavigationBar = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": __nuxt_component_0$1
});
const default_vue_vue_type_style_index_0_lang = "";
const _sfc_main$k = {
  __ssrInlineRender: true,
  setup(__props) {
    const navigationLinks = ref([
      {
        name: "about",
        destination: "/about",
        icon: "",
        external: false
      },
      {
        name: "get involved",
        destination: "/getinvolved",
        icon: "man",
        external: false
      },
      {
        name: "locations",
        destination: "/locations",
        icon: "place",
        external: false
      },
      {
        name: "sermons",
        destination: "/sermon",
        icon: "play",
        external: false
      },
      {
        name: "giving",
        destination: "https://pushpay.com/g/revealingtruth?appVersion=&clickOrigin=&itemId=&utm_medium=social&utm_source=linktree&utm_campaign=giving&ltclid=6bff1693-6209-48cf-92f2-4ad8dc377d3c",
        icon: "heart-two",
        external: true
      }
    ]);
    const series = ref([
      {
        id: "PLnoMLl1eIRc5iPhyX6NqVPFXPCpz7WyUP",
        description: `There are things that will ONLY happen IF you forgive." - Pastor Bryan Powe

Welcome to the INSTITUTE of FORGIVENESS!  During the course of this series, we will explore and come to learn:
- The NATURE of forgiveness
- What is RELEASED when we forgive
- The role of RESTORATION in forgiveness

Everyone has a thought about forgiveness - what it is; what it isn\u2019t; who it\u2019s for; who benefits from it; how to do it; if it\u2019s healthy; if it\u2019s not.  A discussion about forgiveness can get complex fast because of how we each see it, which is often not like Jesus sees it.  We look at people and their track record instead of at Jesus and His!  But, if we are to be built to last, we must know that we are built to FORGIVE like Jesus.`,
        image: "/images/PLnoMLl1eIRc5iPhyX6NqVPFXPCpz7WyUP.jpg",
        title: "Only If",
        slug: "only-if"
      },
      {
        id: "PLnoMLl1eIRc4xLt5yalXQVGiybznE9xn-",
        description: `It is impossible to be built to last if you've been programmed to quit." - Pastor Bryan Powe
This series is about commitment - our commitment to:
- People
- Purpose

Many people come to God looking for a particular solution to a particular problem.  They want a better marriage or their children to be saved or healing.  They want a better relationship with people or they want to know and understand their purpose.  What happens when you get your answer?  What happens when you don't?  Oftentimes, people quit!  They quit on God because they don't get their solution - still sick or get divorced - or they quit because they DID - I'm good now; I got what I came for.

What makes a person not quit on God when they haven't gotten their answer yet?  What makes them stick with Him when it takes longer than they thought?  What makes her stay with God after EVERYTHING she asked for is received and more?`,
        image: "/images/PLnoMLl1eIRc4xLt5yalXQVGiybznE9xn-.jpg",
        title: "Till Death do us part",
        slug: "till-death-do-us-part"
      },
      {
        id: "PLnoMLl1eIRc7DGl_foqDLYb3Twly4ITFf",
        description: `How are you going to be built to last if you don\u2019t know what you\u2019ve been built to do." - Pastor Bryan Powe

This series is about responding to the call of Jesus on our lives.  But, before we can respond, we have to know HOW He calls.  We have to understand WHAT we have been built to do.

Once we identify that we have been called, we will build our confidence to answer by understanding:

- We have been EQUIPPED.
- We have been ASSIGNED.
- We have been RELEASED`,
        image: "/images/PLnoMLl1eIRc7DGl_foqDLYb3Twly4ITFf.jpg",
        title: "Roll Call",
        slug: "roll-call"
      },
      {
        id: "PLnoMLl1eIRc7b1lV_s-10W3Enl1q1GuoY",
        description: `Truth is\u2026 Just because we don't see God moving doesn\u2019t mean He isn\u2019t active. - Pastor Bryan Powe

Although our emotions may be up and down, God never wavers about how He sees things. He is constant. He is a firm foundation. He has built us to last and endure all things in relentless obedience to Him.

So why do we worry?  How do we know what to do when we don't know what to do?  How can we be okay when we're not okay?  

Don't Worry Stay Ready will reveal those answers and more!`,
        image: "/images/PLnoMLl1eIRc7b1lV_s-10W3Enl1q1GuoY.jpg",
        title: "Don'	 Worry Stay Ready! Description",
        slug: "dont-worry-stay-ready"
      },
      {
        id: "PLnoMLl1eIRc7M2q48ZyGlwJQ4fn1FsRzr",
        description: `Our theme for 2021 is Built to Last.

These messages from our Senior Pastor, Overseeing Pastor and Campus Pastors will help us connect with, confirm what God has been sharing with us personally and give clarity to some of the most common questions we all face:

- What are we building?
- Who are we building for?
- Who are we building with?
- Where are we building?
- What does building something to last feel like and look like?

These messages are full of practical, personal and powerful words to change the trajectory of your family and those you come in contact with.`,
        image: "/images/PLnoMLl1eIRc7M2q48ZyGlwJQ4fn1FsRzr.jpg",
        title: "Built to last",
        slug: "built-to-last"
      },
      {
        id: "PLnoMLl1eIRc4493JoX452LtupLdHRBH_P",
        description: `What would Jesus do.  No, really, what would Jesus do?  It\u2019s not just a trendy question to wear around your wrist or put on the back of your car.  It\u2019s a very real question that we need a very real answer for.  How will we perceive that God is doing a new thing?   How will we move from \u2018I think it was God\u2019 to \u2018I know it was God\u2019?  How can we get involved in what God is doing if we don\u2019t know what He would do - what\u2019s in His nature to do?  If we are to be built to last, we must know what we are built to do - which is to be like Christ.  And to be like Him, we must think like Him and see things like Him.  We must take a deeper dive into the Master\u2019s Mind!`,
        image: "/images/PLnoMLl1eIRc4493JoX452LtupLdHRBH_P.jpg",
        title: "Mastermind Intensive",
        slug: "mastermind-intensive"
      },
      {
        id: "PLnoMLl1eIRc6mzQQn5PbsvobR6-Xl02oE",
        description: `\u201CEverything that God has promised will manifest... SOON ENOUGH.\u201D - Pastor Bryan Powe

Sitting on the bench.  Knowing you are full of promise.  Knowing what you are built for. Knowing you heard from God.  But waiting.  Waiting to be used in a way that matches what you saw. Just waiting.  Ready to get to work.  Anxious to get to work.  Willing to get to work.  But waiting.  

What do you do while you wait?  What if your willingness to wait must be transformed into a willingness to be...ANYTHING.  A willingness to do\u2026 ANYTHING.`,
        image: "/images/PLnoMLl1eIRc6mzQQn5PbsvobR6-Xl02oE.jpg",
        title: "Soon Enough",
        slug: "soon-enough"
      },
      {
        id: "PLnoMLl1eIRc6mMrN3Tq5BbVREowKsiP2e",
        description: `Is there one who is willing to respond to the call to Contend for the Faith?  Are you the one? 

"Beloved, although I was very eager to write to you about our common salvation, I found it necessary to write appealing to you to contend for the faith that was once for all delivered to the saints." (Jude 1:3 ESV)

#2022 #Contend #RTMNation`,
        image: "/images/PLnoMLl1eIRc6mMrN3Tq5BbVREowKsiP2e.jpg",
        title: "Contend 22",
        slug: "contend-22"
      }
    ]);
    const locations2 = ref([
      {
        campus: "Tampa, FL Campus",
        times: [
          {
            day: "Sunday",
            time: "9:00 AM"
          },
          {
            day: "Sunday",
            time: "11:00 AM"
          }
        ],
        pastors: "Bryan and Rashida Powe",
        image: "",
        video: ""
      }
    ]);
    const hometiles = ref([
      {
        title: "",
        subtitle: "",
        smalltitle: "",
        bgimg: "https://ik.imagekit.io/cpds/Copy_of_RTM_Announcements___Backgrounds__64__r8Q6887yu.png",
        link: "https://revealingtruthdepartments.churchcenter.com/people/forms/148441",
        view: "true"
      },
      {
        title: "",
        subtitle: "",
        smalltitle: "",
        bgimg: "/churchonline.jpg",
        link: "/about",
        view: "true"
      },
      {
        title: "",
        subtitle: "",
        smalltitle: "",
        bgimg: "/embracinglegacytile.png",
        link: "/about",
        view: "true"
      },
      {
        title: "",
        subtitle: "",
        smalltitle: "",
        bgimg: "/founderdday2022-tile.jpg",
        link: "/about",
        view: "true"
      },
      {
        title: "The Blueprint:",
        subtitle: "",
        smalltitle: "Empowering Leaders Forward",
        bgimg: "/blueprint.jpg",
        link: "https://www.facebook.com/groups/theblueprintleadership",
        view: "true"
      },
      {
        title: "Truth Connections:",
        subtitle: "",
        smalltitle: "We\u2019re Better Together",
        bgimg: "/TruthConnections.jpg",
        link: "https://revealingtruthdepartments.churchcenter.com/groups",
        view: "true"
      }
    ]);
    provide("hometiles", hometiles.value);
    provide("sermons", series.value);
    provide("locations", locations2.value);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NavigationBar = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mainlayout" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NavigationBar, { "navigation-links": navigationLinks.value }, null, _parent));
      _push(`<div style="${ssrRenderStyle({ marginTop: 5 + "rem" })}" class="">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _sfc_main$k
});
const _sfc_main$j = {
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const playlist = ref();
    const messages = ref();
    const series = inject("sermons");
    const currentMessage = ref(null);
    const currentMessageData = ref(null);
    const currentSeries = series.filter((series2) => series2.id === route.params.series);
    const config = useRuntimeConfig();
    const KEY = config.GOOGLE_KEY;
    const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=${route.params.series}&key=${KEY}`;
    try {
      const { data } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("videos", () => $fetch(url))), __temp = await __temp, __restore(), __temp);
      playlist.value = data.value;
      messages.value = data.value.items.map((item) => {
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ];
        return {
          id: item.id,
          resourceId: item.snippet.resourceId.videoId,
          image: item.snippet.thumbnails.high.url,
          title: item.snippet.title.split("|")[0],
          description: item.snippet.description,
          pastor: item.snippet.title.split("|")[2],
          date: new Date(item.contentDetails.videoPublishedAt).toLocaleDateString("en-gb", { year: "numeric", month: "long", day: "numeric" })
        };
      });
    } catch (err) {
      console.log(err);
    }
    const handleClick = (message) => {
      currentMessage.value = message.resourceId;
      currentMessageData.value = message;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><button>Back Button</button><div>`);
      if (currentMessage.value) {
        _push(ssrRenderComponent(_sfc_main$x, {
          message: currentMessage.value,
          messageData: currentMessageData.value
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(_sfc_main$w, {
          series: unref(currentSeries)[0]
        }, null, _parent));
      }
      _push(`<div class="bg-dark-900 h-full text-white"><div class="container">`);
      _push(ssrRenderComponent(mediaScroller, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(messages.value, (message) => {
              _push2(`<div${_scopeId}><img${ssrRenderAttr("src", message.image)}${_scopeId}></div>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment$1, null, renderList(messages.value, (message) => {
                return openBlock(), createBlock("div", {
                  key: "message.id",
                  onClick: ($event) => handleClick(message)
                }, [
                  createVNode("img", {
                    src: message.image
                  }, null, 8, ["src"])
                ], 8, ["onClick"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[series].vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const _series_ = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _sfc_main$j
});
const _sfc_main$i = {
  props: {
    title: {
      type: String,
      default: null
    },
    subtitle: {
      type: String,
      default: null
    },
    img: {
      type: String,
      default: null
    }
  }
};
function _sfc_ssrRender$9(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<header${ssrRenderAttrs(mergeProps({
    class: "h-xl grid place-items-end bg-cover bg-center px-4",
    style: {
      backgroundImage: "linear-gradient(to bottom, rgba(000, 000, 000, 0.00), rgba(000, 000, 000, 0.73)), url(" + $props.img + ")"
    }
  }, _attrs))}><div class="text-center container mx-auto text-white mb-16"><h1 class="text-6xl font-bold">${ssrInterpolate($props.title)}</h1><p class="text-2xl font-light font-extralight tracking-wider">${ssrInterpolate($props.subtitle)}</p><button class="btn btn-yellow mt-4">Our Leadership</button></div></header>`);
}
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Header.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["ssrRender", _sfc_ssrRender$9]]);
const Header = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": __nuxt_component_0
});
const _sfc_main$h = {
  __ssrInlineRender: true,
  setup(__props) {
    useStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Header = __nuxt_component_0;
      const _component_nuxtLink = resolveComponent("nuxtLink");
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-0e5776f2>`);
      _push(ssrRenderComponent(_component_Header, {
        title: "We Believe In Simple Truth:",
        subtitle: "We believe that truth makes a mark in people\u2019s lives that can never be erased.",
        img: "/about.jpg"
      }, null, _parent));
      _push(`<section class="bg-cool-gray-100" data-v-0e5776f2><div class="container grid grid-cols-1 px-4 md:grid-cols-3 md:mx-auto py-20 gap-4" data-v-0e5776f2><div data-v-0e5776f2><h3 data-v-0e5776f2>Our Beliefs</h3><p data-v-0e5776f2> We believ in Simple Truth. Truth - In everyday language, it\u2019s defined as being in one accord with fact or reality. Reality can change. Facts are temporal. For Believers, Truth is much more than that. Truth does not change. Truth just is - regardless of what the world deems as fact or reality today. Why? Because we believe that Truth is only found in the Word of God - it does not change and it just is. </p>`);
      _push(ssrRenderComponent(_component_nuxtLink, { to: "/ourbeliefs" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Our Beliefs`);
          } else {
            return [
              createTextVNode("Our Beliefs")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div data-v-0e5776f2><h3 data-v-0e5776f2>Our Values</h3><p data-v-0e5776f2> We affectionately Value: Peace which is our reward because we accept Christ in our hearts; Prosperity which is our privilege because giving is our attitude; Security which is our stance because we reside in His presence; Stability which is our posture because we believe in the finished work of Jesus Christ; Health which is our divine right because the Word is our medication. Healing which is our culture because love is our resource; Truth which is our message and Jesus, who is our way. </p></div><div data-v-0e5776f2><h3 data-v-0e5776f2>Our Leadership</h3><p data-v-0e5776f2> Revealing Truth Ministries believes that truth, which is the Word of God, causes people to experience God\u2019s abundance in every area of their lives. We believe truth transforms people into who God destined them to be. </p></div></div></section>`);
      _push(ssrRenderComponent(VisionSlider, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const about = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-0e5776f2"]]);
const about$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": about
});
const _sfc_main$g = {
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    reactive({
      tampa: {},
      wesleychapel: {}
    });
    const place = ref("");
    place.value = route.params.campus;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="h-md bg-primary">${ssrInterpolate(place.value)}</div><div class="container mx-auto grid grid-cols-2"><div><div> Times<br> Choose a time and add it to your calendar<br></div><div>Location Info<br></div><div>Campus Pastors<br></div></div><div><div>Video</div><div>Campus Pastors<br></div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/campus/[campus].vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const _campus_ = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _sfc_main$g
});
const _sfc_main$f = {};
function _sfc_ssrRender$8(_ctx, _push, _parent, _attrs) {
  const _component_Header = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_Header, {
    title: "Get Involved Page",
    subtitle: "Get Involved Page Subtitle"
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/getinvolved.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const getinvolved = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["ssrRender", _sfc_ssrRender$8]]);
const getinvolved$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": getinvolved
});
const _sfc_main$e = {};
function _sfc_ssrRender$7(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Header = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_Header, {
    title: "Giving Page",
    subtitle: "Giving Page Subtitle"
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/giving.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const giving = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["ssrRender", _sfc_ssrRender$7]]);
const giving$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": giving
});
const NUXT_BASE = NUXT_CONFIG.app.cdnURL || NUXT_CONFIG.app.baseURL;
const _imports_0 = `${NUXT_BASE}HeroPastors.jpeg`;
const Video_vue_vue_type_style_index_0_lang = "";
const _sfc_main$d = {
  __ssrInlineRender: true,
  props: {
    poster: { type: String },
    vid: { type: String }
  },
  setup(__props) {
    const props = __props;
    const el = ref(null);
    useElementHover(el);
    useMediaControls(el, {
      src: props.vid
    });
    const hover = ref(false);
    if (el.value)
      ;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid place-items-center relative" }, _attrs))}><img${ssrRenderAttr("src", _imports_0)} alt="" class="${ssrRenderClass([{ fade: hover.value }, "absolute object-cover h-full z-10"])}"><video class="aspect-video max-h-2xl w-full" style="${ssrRenderStyle({ "object-fit": "cover" })}" preload="auto"> Your browser does not support HTML5 video. </video></div>`);
    };
  }
};
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Video.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const Video = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _sfc_main$d
});
const MainCard_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$c = {
  props: {
    title: {
      type: String,
      default: null
    },
    subtitle: {
      type: String,
      default: null
    },
    bgImg: {
      type: String,
      required: true,
      default: null
    },
    link: {
      type: Object,
      default: null
    }
  }
};
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "hero grid min-h-xl w-full relative rounded-md p-4 content-end bg-center dropshadow",
    style: {
      backgroundImage: `url(${$props.bgImg})`
    }
  }, _attrs))} data-v-15048036><div class="hero-content" data-v-15048036>`);
  if ($props.title) {
    _push(`<div class="hero-title font-black font-sofia hero-title-container text-blue-gray-50" data-v-15048036>${ssrInterpolate($props.title)}<br class="md:hidden" data-v-15048036><span class="font-thin font-proxy text-blue-gray-50 md:ml-2 md:whitespace-normal md:whitespace-nowrap" data-v-15048036>${ssrInterpolate($props.subtitle)}</span></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="space-x-0 sm:space-y-4 md:space-x-4" data-v-15048036><button class="btn btn-yellow" data-v-15048036>Watch Sermons</button><button class="btn btn-outline mt-4 md:mt-0" data-v-15048036>Watch More Sermons</button></div></div></div>`);
}
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MainCard.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["ssrRender", _sfc_ssrRender$6], ["__scopeId", "data-v-15048036"]]);
const MainCard = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": __nuxt_component_1
});
const _sfc_main$b = {
  __ssrInlineRender: true,
  setup(__props) {
    const tiles = inject("hometiles");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Video = _sfc_main$d;
      const _component_MainCard = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      ssrRenderSuspense(_push, {
        fallback: () => {
          _push(` Loading... `);
        },
        default: () => {
          _push(ssrRenderComponent(_component_Video, { vid: "https://firebasestorage.googleapis.com/v0/b/revealing-truth-website.appspot.com/o/video%2FJan30.mp4?alt=media&token=4222ac50-4bef-4f91-8bfb-d0954fcd3c86" }, null, _parent));
        },
        _: 1
      });
      _push(`<div class="max-w-screen-lg mx-auto mt-4 px-4">`);
      _push(ssrRenderComponent(_component_MainCard, { "bg-img": "/HeroPastors.jpeg" }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(ThreeCol, { class: "mt-4 px-4" }, {
        left: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(tiles), (tile) => {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(MainTile, {
                "bg-img": tile.bgimg,
                title: tile.title,
                subtitle: tile.subtitle,
                subtext: tile.smalltitle,
                link: tile.link
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment$1, null, renderList(unref(tiles), (tile) => {
                return openBlock(), createBlock("div", null, [
                  createVNode(MainTile, {
                    "bg-img": tile.bgimg,
                    title: tile.title,
                    subtitle: tile.subtitle,
                    subtext: tile.smalltitle,
                    link: tile.link
                  }, null, 8, ["bg-img", "title", "subtitle", "subtext", "link"])
                ]);
              }), 256))
            ];
          }
        }),
        right: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SideMenu, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(SideMenu)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _sfc_main$b
});
const _sfc_main$a = {};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Header = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_Header, {
    title: "Leadership Page",
    subtitle: "Leadership Page Subtitle"
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/leadership.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const leadership = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["ssrRender", _sfc_ssrRender$5]]);
const leadership$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": leadership
});
const _sfc_main$9 = {};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs) {
  _push(`<header${ssrRenderAttrs(mergeProps({ class: "container h-md grid place-items-center mt-4" }, _attrs))} data-v-17b70316>hello</header>`);
}
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/live.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const live = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["ssrRender", _sfc_ssrRender$4], ["__scopeId", "data-v-17b70316"]]);
const live$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": live
});
const _sfc_main$8 = {
  __ssrInlineRender: true,
  setup(__props) {
    const { $maps } = useNuxtApp();
    const map = ref(null);
    onMounted(() => {
      $maps(map.value, 27.964157, -82.452606);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = resolveComponent("nuxt-link");
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-9852d7ea><div class="absolute h-full bg-gray-50 z-10 flex flex-col p-4" data-v-9852d7ea>`);
      _push(ssrRenderComponent(_component_nuxt_link, { to: "/campus/tampa" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Tampas`);
          } else {
            return [
              createTextVNode("Tampas")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_nuxt_link, { to: "/campus/wesleychapel" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Wesley Chapel`);
          } else {
            return [
              createTextVNode("Wesley Chapel")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      ssrRenderSuspense(_push, {
        fallback: () => {
          _push(` Loading... `);
        },
        default: () => {
          _push(`<div class="min-h-screen w-full" data-v-9852d7ea></div>`);
        },
        _: 1
      });
      _push(`</div>`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/locations.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const locations = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-9852d7ea"]]);
const locations$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": locations
});
const _sfc_main$7 = {
  __ssrInlineRender: true,
  setup(__props) {
    const slides = ref([
      "After death, eternal life continues either in heaven or hell, based on your decision to make Jesus Christ your Lord and Savior. When the Rapture occurs, the dead in Christ will rise first, and then those who are alive and remain (those who have accepted Jesus as their Lord and Savior) will be caught up to meet Him in the air.",
      "That Jesus Christ is the Son of God, was crucified, died, and buried. On the third day, He rose from the dead, and later ascended into heaven, where He remains at the right hand of God Almighty.",
      "The Bible was written and inspired by God.",
      "Faith is a practical response to the Word of God.",
      "In water baptism in the name of the Father, Son, and Holy Spirit.",
      "In the authority of Jesus\u2019 name.",
      "In the indwelling and baptism of the Holy Spirit with the evidence of speaking in tongues.",
      "In tithes and offerings as a form of Worship unto God; as a gift that is freely given.",
      "In divine healing\u2014the restoration of health to those who believe and act on the truths written in God\u2019s Word. We further believe that Jesus is our Healer, and that by His stripes, we are already healed.",
      "The local church is the place of membership where God has called you to receive His Word on a consistent basis and to grow spiritually.",
      "In giving alms to the poor, sick, homeless, and others in despair."
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_dir = resolveComponent("dir");
      _push(`<!--[-->`);
      ssrRenderList(slides.value, (slide) => {
        _push(ssrRenderComponent(_component_dir, { key: "slide" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<p${_scopeId}>${ssrInterpolate(slide)}</p>`);
            } else {
              return [
                createVNode("p", null, toDisplayString$1(slide), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/ourbeliefs.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const ourbeliefs = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _sfc_main$7
});
const _sfc_main$6 = {
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const series = inject("sermons");
    const config = useRuntimeConfig();
    const KEY = config.GOOGLE_KEY;
    const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=PLnoMLl1eIRc6mMrN3Tq5BbVREowKsiP2e&key=${KEY}`;
    const { isFetching, error, data } = ([__temp, __restore] = withAsyncContext(() => useFetch(url)), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = resolveComponent("nuxt-link");
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-540f54e4>${ssrInterpolate(unref(isFetching))} `);
      _push(ssrRenderComponent(SeriesSlider, { series: unref(series) }, null, _parent));
      _push(ssrRenderComponent(mediaScroller, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(series), (msg) => {
              _push2(`<div class="media-element" data-v-540f54e4${_scopeId}>`);
              _push2(ssrRenderComponent(_component_nuxt_link, {
                to: `/${msg.id}`
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div data-v-540f54e4${_scopeId2}><div class="main grid w-full aspect-video relative rounded-md content-end p-4 mb-4" style="${ssrRenderStyle({
                      backgroundImage: `url(${msg.image})`
                    })}" data-v-540f54e4${_scopeId2}></div></div>`);
                  } else {
                    return [
                      createVNode("div", null, [
                        createVNode("div", {
                          class: "main grid w-full aspect-video relative rounded-md content-end p-4 mb-4",
                          style: {
                            backgroundImage: `url(${msg.image})`
                          }
                        }, null, 4)
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment$1, null, renderList(unref(series), (msg) => {
                return openBlock(), createBlock("div", {
                  key: msg.id,
                  class: "media-element"
                }, [
                  createVNode(_component_nuxt_link, {
                    to: `/${msg.id}`
                  }, {
                    default: withCtx(() => [
                      createVNode("div", null, [
                        createVNode("div", {
                          class: "main grid w-full aspect-video relative rounded-md content-end p-4 mb-4",
                          style: {
                            backgroundImage: `url(${msg.image})`
                          }
                        }, null, 4)
                      ])
                    ]),
                    _: 2
                  }, 1032, ["to"])
                ]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sermon.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const sermon = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-540f54e4"]]);
const sermon$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": sermon
});
const BeliefSlider_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$2 = _imports_0$2 + "#triangle";
const _sfc_main$5 = {
  __ssrInlineRender: true,
  setup(__props) {
    ref();
    const end = ref(true);
    const start = ref(false);
    ref(true);
    ref(false);
    const activeSlide = ref(0);
    const slides = ref([
      "After death, eternal life continues either in heaven or hell, based on your decision to make Jesus Christ your Lord and Savior. When the Rapture occurs, the dead in Christ will rise first, and then those who are alive and remain (those who have accepted Jesus as their Lord and Savior) will be caught up to meet Him in the air.",
      "That Jesus Christ is the Son of God, was crucified, died, and buried. On the third day, He rose from the dead, and later ascended into heaven, where He remains at the right hand of God Almighty.",
      "The Bible was written and inspired by God.",
      "Faith is a practical response to the Word of God.",
      "In water baptism in the name of the Father, Son, and Holy Spirit.",
      "In the authority of Jesus\u2019 name.",
      "In the indwelling and baptism of the Holy Spirit with the evidence of speaking in tongues.",
      "In tithes and offerings as a form of Worship unto God; as a gift that is freely given.",
      "In divine healing\u2014the restoration of health to those who believe and act on the truths written in God\u2019s Word. We further believe that Jesus is our Healer, and that by His stripes, we are already healed.",
      "The local church is the place of membership where God has called you to receive His Word on a consistent basis and to grow spiritually.",
      "In giving alms to the poor, sick, homeless, and others in despair."
    ]);
    computed(() => {
      const str = slides.value[activeSlide.value - 1];
      if (!str)
        return "";
      return str.slice(0, 10);
    });
    computed(() => {
      const str = slides.value[activeSlide.value + 1];
      if (!str)
        return "";
      return str.slice(0, 10);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-38c751de>`);
      _push(ssrRenderComponent(unref(Swiper), { breakpoints: {
        640: { slidesPerView: 1, spaceBetween: 20 },
        768: {
          slidesPerView: 2,
          spaceBetween: 40
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 100
        }
      } }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(slides.value, (slide, index2) => {
              _push2(ssrRenderComponent(unref(SwiperSlide), {
                key: index2,
                class: "flex grid place-content-center"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="border-accent text-white font-extralight h-auto" data-v-38c751de${_scopeId2}>${ssrInterpolate(slide)}</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "border-accent text-white font-extralight h-auto" }, toDisplayString$1(slide), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment$1, null, renderList(slides.value, (slide, index2) => {
                return openBlock(), createBlock(unref(SwiperSlide), {
                  key: index2,
                  class: "flex grid place-content-center"
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "border-accent text-white font-extralight h-auto" }, toDisplayString$1(slide), 1)
                  ]),
                  _: 2
                }, 1024);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="w-full inline-flex" data-v-38c751de><div class="btn mr-auto flex items-center" style="${ssrRenderStyle(start.value ? null : { display: "none" })}" data-v-38c751de><div class="bg-primary rounded-1/2 p-2" data-v-38c751de><svg class="prev" data-v-38c751de><use${ssrRenderAttr("xlink:href", _hoisted_1$2)} data-v-38c751de></use></svg></div><p class="text-white ml-2" data-v-38c751de>Back</p></div><div class="btn ml-auto flex items-center" style="${ssrRenderStyle(end.value ? null : { display: "none" })}" data-v-38c751de><p class="text-white mr-2" data-v-38c751de>More</p><div class="bg-primary rounded-1/2 p-2" data-v-38c751de><svg class="next" data-v-38c751de><use${ssrRenderAttr("xlink:href", _hoisted_1$2)} data-v-38c751de></use></svg></div></div></div></div>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BeliefSlider.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const BeliefSlider = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-38c751de"]]);
const BeliefSlider$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": BeliefSlider
});
const Footer_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$4 = {
  props: {
    navigationLinks: {
      type: Array,
      required: true
    }
  }
};
const _hoisted_1$1 = _imports_0$2 + "#icon-facebook";
const _hoisted_2$1 = _imports_0$2 + "#icon-instagram";
const _hoisted_3$1 = _imports_0$2 + "#icon-youTube";
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_nuxt_link = resolveComponent("nuxt-link");
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "hidden sm:block bg-secondary" }, _attrs))} data-v-dd8add4e><div class="container mx-auto px-8 py-4" data-v-dd8add4e><div class="grid grid-cols-6 text-warm-gray-50" data-v-dd8add4e><div class="col-span-2 p-2" data-v-dd8add4e><h4 class="head" data-v-dd8add4e>PHYSICAL AND MAILING ADDRESS:</h4><p class="" data-v-dd8add4e><span data-v-dd8add4e>Tampa Campus:</span><br data-v-dd8add4e> 5201 N. Armenia Ave. Tampa, FL 33603 </p><p class="mb-2" data-v-dd8add4e><span data-v-dd8add4e>P:</span> 813-354-1135<br data-v-dd8add4e><span data-v-dd8add4e>E:</span> inquiries@revealingtruth.org </p><h4 class="head" data-v-dd8add4e>Connect with Us</h4><div class="flex space-x-4" data-v-dd8add4e><svg class="icon" data-v-dd8add4e><use${ssrRenderAttr("xlink:href", _hoisted_1$1)} data-v-dd8add4e></use></svg><svg class="icon" data-v-dd8add4e><use${ssrRenderAttr("xlink:href", _hoisted_2$1)} data-v-dd8add4e></use></svg><svg class="icon" data-v-dd8add4e><use${ssrRenderAttr("xlink:href", _hoisted_3$1)} data-v-dd8add4e></use></svg></div></div><div class="col-span-3 p-2" data-v-dd8add4e><h4 class="head" data-v-dd8add4e>Revealing Truth Ministries</h4><p class="" data-v-dd8add4e> We are Revealing Truth Ministries - Where lives are changed, communities are impacted and Christ is put on display through the Simple Truth of God\u2019s Word. </p></div><div class="p-2" data-v-dd8add4e><h4 class="head" data-v-dd8add4e>Upcoming Events</h4><a href="https://revealingtruthdepartments.churchcenter.com/registrations" class="btn btn-white" rel="noopener noreferrer" target="_blank" data-v-dd8add4e>Events</a></div></div></div><div class="bg-secondaryDark" data-v-dd8add4e><div class="container mx-auto p-4" data-v-dd8add4e><div class="text-center pb-2" data-v-dd8add4e><p class="text-sm text-center text-secondaryLight" data-v-dd8add4e> Revealing Truth Ministries Christian Center | RTM Nation | Embracing Legacy | Copyright All Rights Reserved \xA9 2022 </p></div><div class="flex uppercase text-xs divide-x text-secondaryLight divide-secondaryLight justify-center" data-v-dd8add4e><!--[-->`);
  ssrRenderList($props.navigationLinks, (link, index2) => {
    _push(ssrRenderComponent(_component_nuxt_link, {
      class: "px-2 hover:text-accent",
      key: index2,
      to: link.destination
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`${ssrInterpolate(link.name)}`);
        } else {
          return [
            createTextVNode(toDisplayString$1(link.name), 1)
          ];
        }
      }),
      _: 2
    }, _parent));
  });
  _push(`<!--]--></div></div></div></footer>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const Footer = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$3], ["__scopeId", "data-v-dd8add4e"]]);
const Footer$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Footer
});
const NavigationDrawer_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$3 = {
  emits: [],
  props: {
    navigationLinks: {
      type: Array,
      required: true
    }
  },
  computed: {
    iconNavigation() {
      return this.navigationLinks.filter((link) => link.icon);
    }
  },
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
const _hoisted_1 = _imports_0$2 + "#icon-facebook";
const _hoisted_2 = _imports_0$2 + "#icon-youTube";
const _hoisted_3 = _imports_0$2 + "#icon-instagram";
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_nuxt_link = resolveComponent("nuxt-link");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "drawer" }, _attrs))} data-v-cd04249c><button class="" data-v-cd04249c>Close</button><button class="" href="/" data-v-cd04249c>Watch Now</button><div class="flex justify-between space-x-3" data-v-cd04249c><!--[-->`);
  ssrRenderList($options.iconNavigation, (link, index2) => {
    _push(`<div class="" data-v-cd04249c>`);
    _push(ssrRenderComponent(_component_nuxt_link, {
      to: link.destination,
      class: "text-center"
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<svg class="w-8 h-8" data-v-cd04249c${_scopeId}><use${ssrRenderAttr("xlink:href", `/images/icons/sprite.svg#icon-${link.icon}`)} data-v-cd04249c${_scopeId}></use></svg><div class="__text" data-v-cd04249c${_scopeId}>${ssrInterpolate(link.name)}</div>`);
        } else {
          return [
            (openBlock(), createBlock("svg", { class: "w-8 h-8" }, [
              createVNode("use", {
                "xlink:href": `/images/icons/sprite.svg#icon-${link.icon}`
              }, null, 8, ["xlink:href"])
            ])),
            createVNode("div", { class: "__text" }, toDisplayString$1(link.name), 1)
          ];
        }
      }),
      _: 2
    }, _parent));
    _push(`</div>`);
  });
  _push(`<!--]--></div><div class="" data-v-cd04249c><!--[-->`);
  ssrRenderList($props.navigationLinks, (link, index2) => {
    _push(`<div data-v-cd04249c>`);
    _push(ssrRenderComponent(_component_nuxt_link, {
      to: link.destination
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`${ssrInterpolate(link.name)}`);
        } else {
          return [
            createTextVNode(toDisplayString$1(link.name), 1)
          ];
        }
      }),
      _: 2
    }, _parent));
    _push(`</div>`);
  });
  _push(`<!--]--></div><div data-v-cd04249c><h2 data-v-cd04249c>Connect</h2><div class="flex space-x-2" data-v-cd04249c><svg class="w-6 h-6" data-v-cd04249c><use${ssrRenderAttr("xlink:href", _hoisted_1)} data-v-cd04249c></use></svg><svg class="w-6 h-6" data-v-cd04249c><use${ssrRenderAttr("xlink:href", _hoisted_2)} data-v-cd04249c></use></svg><svg class="w-6 h-6" data-v-cd04249c><use${ssrRenderAttr("xlink:href", _hoisted_3)} data-v-cd04249c></use></svg></div></div></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/NavigationDrawer.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const NavigationDrawer = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-cd04249c"]]);
const NavigationDrawer$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": NavigationDrawer
});
const _sfc_main$2 = defineComponent({
  name: "SvgIcon",
  props: {
    prefix: {
      type: String,
      default: "icon"
    },
    name: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: "#333"
    }
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`);
    return { symbolId };
  }
});
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<svg${ssrRenderAttrs(mergeProps({ "aria-hidden": "true" }, _attrs))}><use${ssrRenderAttr("href", _ctx.symbolId)}${ssrRenderAttr("fill", _ctx.color)}></use></svg>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SvgIcon.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const SvgIcon = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]);
const SvgIcon$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": SvgIcon
});
const seriesSlider_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$1 = {
  __ssrInlineRender: true,
  props: {
    series: {
      required: true,
      type: Array
    }
  },
  setup(__props) {
    ref(null);
    ref(null);
    ref([Navigation, Pagination, Scrollbar, A11y]);
    ref({
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Swiper), {
        spaceBetween: 20,
        breakpoints: {
          640: { slidesPerView: 4 },
          768: {
            slidesPerView: 4
          },
          1024: {
            slidesPerView: 4
          }
        }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(__props.series, (sermon2, index2) => {
              _push2(ssrRenderComponent(unref(SwiperSlide), { key: "index" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div data-v-68ca6132${_scopeId2}><div class="main grid w-full relative rounded-md content-end p-4 mb-4" style="${ssrRenderStyle({
                      backgroundImage: `url(${sermon2.image})`
                    })}" data-v-68ca6132${_scopeId2}>${ssrInterpolate(sermon2.title)}</div></div>`);
                  } else {
                    return [
                      createVNode("div", null, [
                        createVNode("div", {
                          class: "main grid w-full relative rounded-md content-end p-4 mb-4",
                          style: {
                            backgroundImage: `url(${sermon2.image})`
                          }
                        }, toDisplayString$1(sermon2.title), 5)
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment$1, null, renderList(__props.series, (sermon2, index2) => {
                return openBlock(), createBlock(unref(SwiperSlide), { key: "index" }, {
                  default: withCtx(() => [
                    createVNode("div", null, [
                      createVNode("div", {
                        class: "main grid w-full relative rounded-md content-end p-4 mb-4",
                        style: {
                          backgroundImage: `url(${sermon2.image})`
                        }
                      }, toDisplayString$1(sermon2.title), 5)
                    ])
                  ]),
                  _: 2
                }, 1024);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div data-v-68ca6132>prev</div><div data-v-68ca6132>next</div><!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/seriesSlider.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const seriesSlider = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-68ca6132"]]);
const seriesSlider$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": seriesSlider
});
const _sfc_main = {
  props: {
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h3>${ssrInterpolate($props.title)}</h3><p>${ssrInterpolate($props.body)}</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layoutUtils/InfoComponent.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const InfoComponent = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
const InfoComponent$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": InfoComponent
});
export { entry$1 as default };
