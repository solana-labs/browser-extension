var solanaWeb3 = (function (exports) {
  "use strict"
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function")
    }
  }
  var classCallCheck = _classCallCheck
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ("value" in descriptor) descriptor.writable = true
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps)
    if (staticProps) _defineProperties(Constructor, staticProps)
    return Constructor
  }
  var createClass = _createClass
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true,
      })
    } else {
      obj[key] = value
    }
    return obj
  }
  var defineProperty = _defineProperty
  var commonjsGlobal =
    typeof globalThis !== "undefined"
      ? globalThis
      : typeof window !== "undefined"
      ? window
      : typeof global !== "undefined"
      ? global
      : typeof self !== "undefined"
      ? self
      : {}
  function commonjsRequire() {
    throw new Error("Dynamic requires are not currently supported by rollup-plugin-commonjs")
  }
  function unwrapExports(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default")
      ? x["default"]
      : x
  }
  function createCommonjsModule(fn, module) {
    return (module = { exports: {} }), fn(module, module.exports), module.exports
  }
  var require$$0 = {}
  var naclFast = createCommonjsModule(function (module) {
    ;(function (nacl) {
      var gf = function (init) {
        var i,
          r = new Float64Array(16)
        if (init) for (i = 0; i < init.length; i++) r[i] = init[i]
        return r
      }
      var randombytes = function () {
        throw new Error("no PRNG")
      }
      var _0 = new Uint8Array(16)
      var _9 = new Uint8Array(32)
      _9[0] = 9
      var gf0 = gf(),
        gf1 = gf([1]),
        _121665 = gf([56129, 1]),
        D = gf([
          30883,
          4953,
          19914,
          30187,
          55467,
          16705,
          2637,
          112,
          59544,
          30585,
          16505,
          36039,
          65139,
          11119,
          27886,
          20995,
        ]),
        D2 = gf([
          61785,
          9906,
          39828,
          60374,
          45398,
          33411,
          5274,
          224,
          53552,
          61171,
          33010,
          6542,
          64743,
          22239,
          55772,
          9222,
        ]),
        X = gf([
          54554,
          36645,
          11616,
          51542,
          42930,
          38181,
          51040,
          26924,
          56412,
          64982,
          57905,
          49316,
          21502,
          52590,
          14035,
          8553,
        ]),
        Y = gf([
          26200,
          26214,
          26214,
          26214,
          26214,
          26214,
          26214,
          26214,
          26214,
          26214,
          26214,
          26214,
          26214,
          26214,
          26214,
          26214,
        ]),
        I = gf([
          41136,
          18958,
          6951,
          50414,
          58488,
          44335,
          6150,
          12099,
          55207,
          15867,
          153,
          11085,
          57099,
          20417,
          9344,
          11139,
        ])
      function ts64(x, i, h, l) {
        x[i] = (h >> 24) & 255
        x[i + 1] = (h >> 16) & 255
        x[i + 2] = (h >> 8) & 255
        x[i + 3] = h & 255
        x[i + 4] = (l >> 24) & 255
        x[i + 5] = (l >> 16) & 255
        x[i + 6] = (l >> 8) & 255
        x[i + 7] = l & 255
      }
      function vn(x, xi, y, yi, n) {
        var i,
          d = 0
        for (i = 0; i < n; i++) d |= x[xi + i] ^ y[yi + i]
        return (1 & ((d - 1) >>> 8)) - 1
      }
      function crypto_verify_16(x, xi, y, yi) {
        return vn(x, xi, y, yi, 16)
      }
      function crypto_verify_32(x, xi, y, yi) {
        return vn(x, xi, y, yi, 32)
      }
      function core_salsa20(o, p, k, c) {
        var j0 = (c[0] & 255) | ((c[1] & 255) << 8) | ((c[2] & 255) << 16) | ((c[3] & 255) << 24),
          j1 = (k[0] & 255) | ((k[1] & 255) << 8) | ((k[2] & 255) << 16) | ((k[3] & 255) << 24),
          j2 = (k[4] & 255) | ((k[5] & 255) << 8) | ((k[6] & 255) << 16) | ((k[7] & 255) << 24),
          j3 = (k[8] & 255) | ((k[9] & 255) << 8) | ((k[10] & 255) << 16) | ((k[11] & 255) << 24),
          j4 = (k[12] & 255) | ((k[13] & 255) << 8) | ((k[14] & 255) << 16) | ((k[15] & 255) << 24),
          j5 = (c[4] & 255) | ((c[5] & 255) << 8) | ((c[6] & 255) << 16) | ((c[7] & 255) << 24),
          j6 = (p[0] & 255) | ((p[1] & 255) << 8) | ((p[2] & 255) << 16) | ((p[3] & 255) << 24),
          j7 = (p[4] & 255) | ((p[5] & 255) << 8) | ((p[6] & 255) << 16) | ((p[7] & 255) << 24),
          j8 = (p[8] & 255) | ((p[9] & 255) << 8) | ((p[10] & 255) << 16) | ((p[11] & 255) << 24),
          j9 = (p[12] & 255) | ((p[13] & 255) << 8) | ((p[14] & 255) << 16) | ((p[15] & 255) << 24),
          j10 = (c[8] & 255) | ((c[9] & 255) << 8) | ((c[10] & 255) << 16) | ((c[11] & 255) << 24),
          j11 =
            (k[16] & 255) | ((k[17] & 255) << 8) | ((k[18] & 255) << 16) | ((k[19] & 255) << 24),
          j12 =
            (k[20] & 255) | ((k[21] & 255) << 8) | ((k[22] & 255) << 16) | ((k[23] & 255) << 24),
          j13 =
            (k[24] & 255) | ((k[25] & 255) << 8) | ((k[26] & 255) << 16) | ((k[27] & 255) << 24),
          j14 =
            (k[28] & 255) | ((k[29] & 255) << 8) | ((k[30] & 255) << 16) | ((k[31] & 255) << 24),
          j15 = (c[12] & 255) | ((c[13] & 255) << 8) | ((c[14] & 255) << 16) | ((c[15] & 255) << 24)
        var x0 = j0,
          x1 = j1,
          x2 = j2,
          x3 = j3,
          x4 = j4,
          x5 = j5,
          x6 = j6,
          x7 = j7,
          x8 = j8,
          x9 = j9,
          x10 = j10,
          x11 = j11,
          x12 = j12,
          x13 = j13,
          x14 = j14,
          x15 = j15,
          u
        for (var i = 0; i < 20; i += 2) {
          u = (x0 + x12) | 0
          x4 ^= (u << 7) | (u >>> (32 - 7))
          u = (x4 + x0) | 0
          x8 ^= (u << 9) | (u >>> (32 - 9))
          u = (x8 + x4) | 0
          x12 ^= (u << 13) | (u >>> (32 - 13))
          u = (x12 + x8) | 0
          x0 ^= (u << 18) | (u >>> (32 - 18))
          u = (x5 + x1) | 0
          x9 ^= (u << 7) | (u >>> (32 - 7))
          u = (x9 + x5) | 0
          x13 ^= (u << 9) | (u >>> (32 - 9))
          u = (x13 + x9) | 0
          x1 ^= (u << 13) | (u >>> (32 - 13))
          u = (x1 + x13) | 0
          x5 ^= (u << 18) | (u >>> (32 - 18))
          u = (x10 + x6) | 0
          x14 ^= (u << 7) | (u >>> (32 - 7))
          u = (x14 + x10) | 0
          x2 ^= (u << 9) | (u >>> (32 - 9))
          u = (x2 + x14) | 0
          x6 ^= (u << 13) | (u >>> (32 - 13))
          u = (x6 + x2) | 0
          x10 ^= (u << 18) | (u >>> (32 - 18))
          u = (x15 + x11) | 0
          x3 ^= (u << 7) | (u >>> (32 - 7))
          u = (x3 + x15) | 0
          x7 ^= (u << 9) | (u >>> (32 - 9))
          u = (x7 + x3) | 0
          x11 ^= (u << 13) | (u >>> (32 - 13))
          u = (x11 + x7) | 0
          x15 ^= (u << 18) | (u >>> (32 - 18))
          u = (x0 + x3) | 0
          x1 ^= (u << 7) | (u >>> (32 - 7))
          u = (x1 + x0) | 0
          x2 ^= (u << 9) | (u >>> (32 - 9))
          u = (x2 + x1) | 0
          x3 ^= (u << 13) | (u >>> (32 - 13))
          u = (x3 + x2) | 0
          x0 ^= (u << 18) | (u >>> (32 - 18))
          u = (x5 + x4) | 0
          x6 ^= (u << 7) | (u >>> (32 - 7))
          u = (x6 + x5) | 0
          x7 ^= (u << 9) | (u >>> (32 - 9))
          u = (x7 + x6) | 0
          x4 ^= (u << 13) | (u >>> (32 - 13))
          u = (x4 + x7) | 0
          x5 ^= (u << 18) | (u >>> (32 - 18))
          u = (x10 + x9) | 0
          x11 ^= (u << 7) | (u >>> (32 - 7))
          u = (x11 + x10) | 0
          x8 ^= (u << 9) | (u >>> (32 - 9))
          u = (x8 + x11) | 0
          x9 ^= (u << 13) | (u >>> (32 - 13))
          u = (x9 + x8) | 0
          x10 ^= (u << 18) | (u >>> (32 - 18))
          u = (x15 + x14) | 0
          x12 ^= (u << 7) | (u >>> (32 - 7))
          u = (x12 + x15) | 0
          x13 ^= (u << 9) | (u >>> (32 - 9))
          u = (x13 + x12) | 0
          x14 ^= (u << 13) | (u >>> (32 - 13))
          u = (x14 + x13) | 0
          x15 ^= (u << 18) | (u >>> (32 - 18))
        }
        x0 = (x0 + j0) | 0
        x1 = (x1 + j1) | 0
        x2 = (x2 + j2) | 0
        x3 = (x3 + j3) | 0
        x4 = (x4 + j4) | 0
        x5 = (x5 + j5) | 0
        x6 = (x6 + j6) | 0
        x7 = (x7 + j7) | 0
        x8 = (x8 + j8) | 0
        x9 = (x9 + j9) | 0
        x10 = (x10 + j10) | 0
        x11 = (x11 + j11) | 0
        x12 = (x12 + j12) | 0
        x13 = (x13 + j13) | 0
        x14 = (x14 + j14) | 0
        x15 = (x15 + j15) | 0
        o[0] = (x0 >>> 0) & 255
        o[1] = (x0 >>> 8) & 255
        o[2] = (x0 >>> 16) & 255
        o[3] = (x0 >>> 24) & 255
        o[4] = (x1 >>> 0) & 255
        o[5] = (x1 >>> 8) & 255
        o[6] = (x1 >>> 16) & 255
        o[7] = (x1 >>> 24) & 255
        o[8] = (x2 >>> 0) & 255
        o[9] = (x2 >>> 8) & 255
        o[10] = (x2 >>> 16) & 255
        o[11] = (x2 >>> 24) & 255
        o[12] = (x3 >>> 0) & 255
        o[13] = (x3 >>> 8) & 255
        o[14] = (x3 >>> 16) & 255
        o[15] = (x3 >>> 24) & 255
        o[16] = (x4 >>> 0) & 255
        o[17] = (x4 >>> 8) & 255
        o[18] = (x4 >>> 16) & 255
        o[19] = (x4 >>> 24) & 255
        o[20] = (x5 >>> 0) & 255
        o[21] = (x5 >>> 8) & 255
        o[22] = (x5 >>> 16) & 255
        o[23] = (x5 >>> 24) & 255
        o[24] = (x6 >>> 0) & 255
        o[25] = (x6 >>> 8) & 255
        o[26] = (x6 >>> 16) & 255
        o[27] = (x6 >>> 24) & 255
        o[28] = (x7 >>> 0) & 255
        o[29] = (x7 >>> 8) & 255
        o[30] = (x7 >>> 16) & 255
        o[31] = (x7 >>> 24) & 255
        o[32] = (x8 >>> 0) & 255
        o[33] = (x8 >>> 8) & 255
        o[34] = (x8 >>> 16) & 255
        o[35] = (x8 >>> 24) & 255
        o[36] = (x9 >>> 0) & 255
        o[37] = (x9 >>> 8) & 255
        o[38] = (x9 >>> 16) & 255
        o[39] = (x9 >>> 24) & 255
        o[40] = (x10 >>> 0) & 255
        o[41] = (x10 >>> 8) & 255
        o[42] = (x10 >>> 16) & 255
        o[43] = (x10 >>> 24) & 255
        o[44] = (x11 >>> 0) & 255
        o[45] = (x11 >>> 8) & 255
        o[46] = (x11 >>> 16) & 255
        o[47] = (x11 >>> 24) & 255
        o[48] = (x12 >>> 0) & 255
        o[49] = (x12 >>> 8) & 255
        o[50] = (x12 >>> 16) & 255
        o[51] = (x12 >>> 24) & 255
        o[52] = (x13 >>> 0) & 255
        o[53] = (x13 >>> 8) & 255
        o[54] = (x13 >>> 16) & 255
        o[55] = (x13 >>> 24) & 255
        o[56] = (x14 >>> 0) & 255
        o[57] = (x14 >>> 8) & 255
        o[58] = (x14 >>> 16) & 255
        o[59] = (x14 >>> 24) & 255
        o[60] = (x15 >>> 0) & 255
        o[61] = (x15 >>> 8) & 255
        o[62] = (x15 >>> 16) & 255
        o[63] = (x15 >>> 24) & 255
      }
      function core_hsalsa20(o, p, k, c) {
        var j0 = (c[0] & 255) | ((c[1] & 255) << 8) | ((c[2] & 255) << 16) | ((c[3] & 255) << 24),
          j1 = (k[0] & 255) | ((k[1] & 255) << 8) | ((k[2] & 255) << 16) | ((k[3] & 255) << 24),
          j2 = (k[4] & 255) | ((k[5] & 255) << 8) | ((k[6] & 255) << 16) | ((k[7] & 255) << 24),
          j3 = (k[8] & 255) | ((k[9] & 255) << 8) | ((k[10] & 255) << 16) | ((k[11] & 255) << 24),
          j4 = (k[12] & 255) | ((k[13] & 255) << 8) | ((k[14] & 255) << 16) | ((k[15] & 255) << 24),
          j5 = (c[4] & 255) | ((c[5] & 255) << 8) | ((c[6] & 255) << 16) | ((c[7] & 255) << 24),
          j6 = (p[0] & 255) | ((p[1] & 255) << 8) | ((p[2] & 255) << 16) | ((p[3] & 255) << 24),
          j7 = (p[4] & 255) | ((p[5] & 255) << 8) | ((p[6] & 255) << 16) | ((p[7] & 255) << 24),
          j8 = (p[8] & 255) | ((p[9] & 255) << 8) | ((p[10] & 255) << 16) | ((p[11] & 255) << 24),
          j9 = (p[12] & 255) | ((p[13] & 255) << 8) | ((p[14] & 255) << 16) | ((p[15] & 255) << 24),
          j10 = (c[8] & 255) | ((c[9] & 255) << 8) | ((c[10] & 255) << 16) | ((c[11] & 255) << 24),
          j11 =
            (k[16] & 255) | ((k[17] & 255) << 8) | ((k[18] & 255) << 16) | ((k[19] & 255) << 24),
          j12 =
            (k[20] & 255) | ((k[21] & 255) << 8) | ((k[22] & 255) << 16) | ((k[23] & 255) << 24),
          j13 =
            (k[24] & 255) | ((k[25] & 255) << 8) | ((k[26] & 255) << 16) | ((k[27] & 255) << 24),
          j14 =
            (k[28] & 255) | ((k[29] & 255) << 8) | ((k[30] & 255) << 16) | ((k[31] & 255) << 24),
          j15 = (c[12] & 255) | ((c[13] & 255) << 8) | ((c[14] & 255) << 16) | ((c[15] & 255) << 24)
        var x0 = j0,
          x1 = j1,
          x2 = j2,
          x3 = j3,
          x4 = j4,
          x5 = j5,
          x6 = j6,
          x7 = j7,
          x8 = j8,
          x9 = j9,
          x10 = j10,
          x11 = j11,
          x12 = j12,
          x13 = j13,
          x14 = j14,
          x15 = j15,
          u
        for (var i = 0; i < 20; i += 2) {
          u = (x0 + x12) | 0
          x4 ^= (u << 7) | (u >>> (32 - 7))
          u = (x4 + x0) | 0
          x8 ^= (u << 9) | (u >>> (32 - 9))
          u = (x8 + x4) | 0
          x12 ^= (u << 13) | (u >>> (32 - 13))
          u = (x12 + x8) | 0
          x0 ^= (u << 18) | (u >>> (32 - 18))
          u = (x5 + x1) | 0
          x9 ^= (u << 7) | (u >>> (32 - 7))
          u = (x9 + x5) | 0
          x13 ^= (u << 9) | (u >>> (32 - 9))
          u = (x13 + x9) | 0
          x1 ^= (u << 13) | (u >>> (32 - 13))
          u = (x1 + x13) | 0
          x5 ^= (u << 18) | (u >>> (32 - 18))
          u = (x10 + x6) | 0
          x14 ^= (u << 7) | (u >>> (32 - 7))
          u = (x14 + x10) | 0
          x2 ^= (u << 9) | (u >>> (32 - 9))
          u = (x2 + x14) | 0
          x6 ^= (u << 13) | (u >>> (32 - 13))
          u = (x6 + x2) | 0
          x10 ^= (u << 18) | (u >>> (32 - 18))
          u = (x15 + x11) | 0
          x3 ^= (u << 7) | (u >>> (32 - 7))
          u = (x3 + x15) | 0
          x7 ^= (u << 9) | (u >>> (32 - 9))
          u = (x7 + x3) | 0
          x11 ^= (u << 13) | (u >>> (32 - 13))
          u = (x11 + x7) | 0
          x15 ^= (u << 18) | (u >>> (32 - 18))
          u = (x0 + x3) | 0
          x1 ^= (u << 7) | (u >>> (32 - 7))
          u = (x1 + x0) | 0
          x2 ^= (u << 9) | (u >>> (32 - 9))
          u = (x2 + x1) | 0
          x3 ^= (u << 13) | (u >>> (32 - 13))
          u = (x3 + x2) | 0
          x0 ^= (u << 18) | (u >>> (32 - 18))
          u = (x5 + x4) | 0
          x6 ^= (u << 7) | (u >>> (32 - 7))
          u = (x6 + x5) | 0
          x7 ^= (u << 9) | (u >>> (32 - 9))
          u = (x7 + x6) | 0
          x4 ^= (u << 13) | (u >>> (32 - 13))
          u = (x4 + x7) | 0
          x5 ^= (u << 18) | (u >>> (32 - 18))
          u = (x10 + x9) | 0
          x11 ^= (u << 7) | (u >>> (32 - 7))
          u = (x11 + x10) | 0
          x8 ^= (u << 9) | (u >>> (32 - 9))
          u = (x8 + x11) | 0
          x9 ^= (u << 13) | (u >>> (32 - 13))
          u = (x9 + x8) | 0
          x10 ^= (u << 18) | (u >>> (32 - 18))
          u = (x15 + x14) | 0
          x12 ^= (u << 7) | (u >>> (32 - 7))
          u = (x12 + x15) | 0
          x13 ^= (u << 9) | (u >>> (32 - 9))
          u = (x13 + x12) | 0
          x14 ^= (u << 13) | (u >>> (32 - 13))
          u = (x14 + x13) | 0
          x15 ^= (u << 18) | (u >>> (32 - 18))
        }
        o[0] = (x0 >>> 0) & 255
        o[1] = (x0 >>> 8) & 255
        o[2] = (x0 >>> 16) & 255
        o[3] = (x0 >>> 24) & 255
        o[4] = (x5 >>> 0) & 255
        o[5] = (x5 >>> 8) & 255
        o[6] = (x5 >>> 16) & 255
        o[7] = (x5 >>> 24) & 255
        o[8] = (x10 >>> 0) & 255
        o[9] = (x10 >>> 8) & 255
        o[10] = (x10 >>> 16) & 255
        o[11] = (x10 >>> 24) & 255
        o[12] = (x15 >>> 0) & 255
        o[13] = (x15 >>> 8) & 255
        o[14] = (x15 >>> 16) & 255
        o[15] = (x15 >>> 24) & 255
        o[16] = (x6 >>> 0) & 255
        o[17] = (x6 >>> 8) & 255
        o[18] = (x6 >>> 16) & 255
        o[19] = (x6 >>> 24) & 255
        o[20] = (x7 >>> 0) & 255
        o[21] = (x7 >>> 8) & 255
        o[22] = (x7 >>> 16) & 255
        o[23] = (x7 >>> 24) & 255
        o[24] = (x8 >>> 0) & 255
        o[25] = (x8 >>> 8) & 255
        o[26] = (x8 >>> 16) & 255
        o[27] = (x8 >>> 24) & 255
        o[28] = (x9 >>> 0) & 255
        o[29] = (x9 >>> 8) & 255
        o[30] = (x9 >>> 16) & 255
        o[31] = (x9 >>> 24) & 255
      }
      function crypto_core_salsa20(out, inp, k, c) {
        core_salsa20(out, inp, k, c)
      }
      function crypto_core_hsalsa20(out, inp, k, c) {
        core_hsalsa20(out, inp, k, c)
      }
      var sigma = new Uint8Array([
        101,
        120,
        112,
        97,
        110,
        100,
        32,
        51,
        50,
        45,
        98,
        121,
        116,
        101,
        32,
        107,
      ])
      function crypto_stream_salsa20_xor(c, cpos, m, mpos, b, n, k) {
        var z = new Uint8Array(16),
          x = new Uint8Array(64)
        var u, i
        for (i = 0; i < 16; i++) z[i] = 0
        for (i = 0; i < 8; i++) z[i] = n[i]
        while (b >= 64) {
          crypto_core_salsa20(x, z, k, sigma)
          for (i = 0; i < 64; i++) c[cpos + i] = m[mpos + i] ^ x[i]
          u = 1
          for (i = 8; i < 16; i++) {
            u = (u + (z[i] & 255)) | 0
            z[i] = u & 255
            u >>>= 8
          }
          b -= 64
          cpos += 64
          mpos += 64
        }
        if (b > 0) {
          crypto_core_salsa20(x, z, k, sigma)
          for (i = 0; i < b; i++) c[cpos + i] = m[mpos + i] ^ x[i]
        }
        return 0
      }
      function crypto_stream_salsa20(c, cpos, b, n, k) {
        var z = new Uint8Array(16),
          x = new Uint8Array(64)
        var u, i
        for (i = 0; i < 16; i++) z[i] = 0
        for (i = 0; i < 8; i++) z[i] = n[i]
        while (b >= 64) {
          crypto_core_salsa20(x, z, k, sigma)
          for (i = 0; i < 64; i++) c[cpos + i] = x[i]
          u = 1
          for (i = 8; i < 16; i++) {
            u = (u + (z[i] & 255)) | 0
            z[i] = u & 255
            u >>>= 8
          }
          b -= 64
          cpos += 64
        }
        if (b > 0) {
          crypto_core_salsa20(x, z, k, sigma)
          for (i = 0; i < b; i++) c[cpos + i] = x[i]
        }
        return 0
      }
      function crypto_stream(c, cpos, d, n, k) {
        var s = new Uint8Array(32)
        crypto_core_hsalsa20(s, n, k, sigma)
        var sn = new Uint8Array(8)
        for (var i = 0; i < 8; i++) sn[i] = n[i + 16]
        return crypto_stream_salsa20(c, cpos, d, sn, s)
      }
      function crypto_stream_xor(c, cpos, m, mpos, d, n, k) {
        var s = new Uint8Array(32)
        crypto_core_hsalsa20(s, n, k, sigma)
        var sn = new Uint8Array(8)
        for (var i = 0; i < 8; i++) sn[i] = n[i + 16]
        return crypto_stream_salsa20_xor(c, cpos, m, mpos, d, sn, s)
      }
      var poly1305 = function (key) {
        this.buffer = new Uint8Array(16)
        this.r = new Uint16Array(10)
        this.h = new Uint16Array(10)
        this.pad = new Uint16Array(8)
        this.leftover = 0
        this.fin = 0
        var t0, t1, t2, t3, t4, t5, t6, t7
        t0 = (key[0] & 255) | ((key[1] & 255) << 8)
        this.r[0] = t0 & 8191
        t1 = (key[2] & 255) | ((key[3] & 255) << 8)
        this.r[1] = ((t0 >>> 13) | (t1 << 3)) & 8191
        t2 = (key[4] & 255) | ((key[5] & 255) << 8)
        this.r[2] = ((t1 >>> 10) | (t2 << 6)) & 7939
        t3 = (key[6] & 255) | ((key[7] & 255) << 8)
        this.r[3] = ((t2 >>> 7) | (t3 << 9)) & 8191
        t4 = (key[8] & 255) | ((key[9] & 255) << 8)
        this.r[4] = ((t3 >>> 4) | (t4 << 12)) & 255
        this.r[5] = (t4 >>> 1) & 8190
        t5 = (key[10] & 255) | ((key[11] & 255) << 8)
        this.r[6] = ((t4 >>> 14) | (t5 << 2)) & 8191
        t6 = (key[12] & 255) | ((key[13] & 255) << 8)
        this.r[7] = ((t5 >>> 11) | (t6 << 5)) & 8065
        t7 = (key[14] & 255) | ((key[15] & 255) << 8)
        this.r[8] = ((t6 >>> 8) | (t7 << 8)) & 8191
        this.r[9] = (t7 >>> 5) & 127
        this.pad[0] = (key[16] & 255) | ((key[17] & 255) << 8)
        this.pad[1] = (key[18] & 255) | ((key[19] & 255) << 8)
        this.pad[2] = (key[20] & 255) | ((key[21] & 255) << 8)
        this.pad[3] = (key[22] & 255) | ((key[23] & 255) << 8)
        this.pad[4] = (key[24] & 255) | ((key[25] & 255) << 8)
        this.pad[5] = (key[26] & 255) | ((key[27] & 255) << 8)
        this.pad[6] = (key[28] & 255) | ((key[29] & 255) << 8)
        this.pad[7] = (key[30] & 255) | ((key[31] & 255) << 8)
      }
      poly1305.prototype.blocks = function (m, mpos, bytes) {
        var hibit = this.fin ? 0 : 1 << 11
        var t0, t1, t2, t3, t4, t5, t6, t7, c
        var d0, d1, d2, d3, d4, d5, d6, d7, d8, d9
        var h0 = this.h[0],
          h1 = this.h[1],
          h2 = this.h[2],
          h3 = this.h[3],
          h4 = this.h[4],
          h5 = this.h[5],
          h6 = this.h[6],
          h7 = this.h[7],
          h8 = this.h[8],
          h9 = this.h[9]
        var r0 = this.r[0],
          r1 = this.r[1],
          r2 = this.r[2],
          r3 = this.r[3],
          r4 = this.r[4],
          r5 = this.r[5],
          r6 = this.r[6],
          r7 = this.r[7],
          r8 = this.r[8],
          r9 = this.r[9]
        while (bytes >= 16) {
          t0 = (m[mpos + 0] & 255) | ((m[mpos + 1] & 255) << 8)
          h0 += t0 & 8191
          t1 = (m[mpos + 2] & 255) | ((m[mpos + 3] & 255) << 8)
          h1 += ((t0 >>> 13) | (t1 << 3)) & 8191
          t2 = (m[mpos + 4] & 255) | ((m[mpos + 5] & 255) << 8)
          h2 += ((t1 >>> 10) | (t2 << 6)) & 8191
          t3 = (m[mpos + 6] & 255) | ((m[mpos + 7] & 255) << 8)
          h3 += ((t2 >>> 7) | (t3 << 9)) & 8191
          t4 = (m[mpos + 8] & 255) | ((m[mpos + 9] & 255) << 8)
          h4 += ((t3 >>> 4) | (t4 << 12)) & 8191
          h5 += (t4 >>> 1) & 8191
          t5 = (m[mpos + 10] & 255) | ((m[mpos + 11] & 255) << 8)
          h6 += ((t4 >>> 14) | (t5 << 2)) & 8191
          t6 = (m[mpos + 12] & 255) | ((m[mpos + 13] & 255) << 8)
          h7 += ((t5 >>> 11) | (t6 << 5)) & 8191
          t7 = (m[mpos + 14] & 255) | ((m[mpos + 15] & 255) << 8)
          h8 += ((t6 >>> 8) | (t7 << 8)) & 8191
          h9 += (t7 >>> 5) | hibit
          c = 0
          d0 = c
          d0 += h0 * r0
          d0 += h1 * (5 * r9)
          d0 += h2 * (5 * r8)
          d0 += h3 * (5 * r7)
          d0 += h4 * (5 * r6)
          c = d0 >>> 13
          d0 &= 8191
          d0 += h5 * (5 * r5)
          d0 += h6 * (5 * r4)
          d0 += h7 * (5 * r3)
          d0 += h8 * (5 * r2)
          d0 += h9 * (5 * r1)
          c += d0 >>> 13
          d0 &= 8191
          d1 = c
          d1 += h0 * r1
          d1 += h1 * r0
          d1 += h2 * (5 * r9)
          d1 += h3 * (5 * r8)
          d1 += h4 * (5 * r7)
          c = d1 >>> 13
          d1 &= 8191
          d1 += h5 * (5 * r6)
          d1 += h6 * (5 * r5)
          d1 += h7 * (5 * r4)
          d1 += h8 * (5 * r3)
          d1 += h9 * (5 * r2)
          c += d1 >>> 13
          d1 &= 8191
          d2 = c
          d2 += h0 * r2
          d2 += h1 * r1
          d2 += h2 * r0
          d2 += h3 * (5 * r9)
          d2 += h4 * (5 * r8)
          c = d2 >>> 13
          d2 &= 8191
          d2 += h5 * (5 * r7)
          d2 += h6 * (5 * r6)
          d2 += h7 * (5 * r5)
          d2 += h8 * (5 * r4)
          d2 += h9 * (5 * r3)
          c += d2 >>> 13
          d2 &= 8191
          d3 = c
          d3 += h0 * r3
          d3 += h1 * r2
          d3 += h2 * r1
          d3 += h3 * r0
          d3 += h4 * (5 * r9)
          c = d3 >>> 13
          d3 &= 8191
          d3 += h5 * (5 * r8)
          d3 += h6 * (5 * r7)
          d3 += h7 * (5 * r6)
          d3 += h8 * (5 * r5)
          d3 += h9 * (5 * r4)
          c += d3 >>> 13
          d3 &= 8191
          d4 = c
          d4 += h0 * r4
          d4 += h1 * r3
          d4 += h2 * r2
          d4 += h3 * r1
          d4 += h4 * r0
          c = d4 >>> 13
          d4 &= 8191
          d4 += h5 * (5 * r9)
          d4 += h6 * (5 * r8)
          d4 += h7 * (5 * r7)
          d4 += h8 * (5 * r6)
          d4 += h9 * (5 * r5)
          c += d4 >>> 13
          d4 &= 8191
          d5 = c
          d5 += h0 * r5
          d5 += h1 * r4
          d5 += h2 * r3
          d5 += h3 * r2
          d5 += h4 * r1
          c = d5 >>> 13
          d5 &= 8191
          d5 += h5 * r0
          d5 += h6 * (5 * r9)
          d5 += h7 * (5 * r8)
          d5 += h8 * (5 * r7)
          d5 += h9 * (5 * r6)
          c += d5 >>> 13
          d5 &= 8191
          d6 = c
          d6 += h0 * r6
          d6 += h1 * r5
          d6 += h2 * r4
          d6 += h3 * r3
          d6 += h4 * r2
          c = d6 >>> 13
          d6 &= 8191
          d6 += h5 * r1
          d6 += h6 * r0
          d6 += h7 * (5 * r9)
          d6 += h8 * (5 * r8)
          d6 += h9 * (5 * r7)
          c += d6 >>> 13
          d6 &= 8191
          d7 = c
          d7 += h0 * r7
          d7 += h1 * r6
          d7 += h2 * r5
          d7 += h3 * r4
          d7 += h4 * r3
          c = d7 >>> 13
          d7 &= 8191
          d7 += h5 * r2
          d7 += h6 * r1
          d7 += h7 * r0
          d7 += h8 * (5 * r9)
          d7 += h9 * (5 * r8)
          c += d7 >>> 13
          d7 &= 8191
          d8 = c
          d8 += h0 * r8
          d8 += h1 * r7
          d8 += h2 * r6
          d8 += h3 * r5
          d8 += h4 * r4
          c = d8 >>> 13
          d8 &= 8191
          d8 += h5 * r3
          d8 += h6 * r2
          d8 += h7 * r1
          d8 += h8 * r0
          d8 += h9 * (5 * r9)
          c += d8 >>> 13
          d8 &= 8191
          d9 = c
          d9 += h0 * r9
          d9 += h1 * r8
          d9 += h2 * r7
          d9 += h3 * r6
          d9 += h4 * r5
          c = d9 >>> 13
          d9 &= 8191
          d9 += h5 * r4
          d9 += h6 * r3
          d9 += h7 * r2
          d9 += h8 * r1
          d9 += h9 * r0
          c += d9 >>> 13
          d9 &= 8191
          c = ((c << 2) + c) | 0
          c = (c + d0) | 0
          d0 = c & 8191
          c = c >>> 13
          d1 += c
          h0 = d0
          h1 = d1
          h2 = d2
          h3 = d3
          h4 = d4
          h5 = d5
          h6 = d6
          h7 = d7
          h8 = d8
          h9 = d9
          mpos += 16
          bytes -= 16
        }
        this.h[0] = h0
        this.h[1] = h1
        this.h[2] = h2
        this.h[3] = h3
        this.h[4] = h4
        this.h[5] = h5
        this.h[6] = h6
        this.h[7] = h7
        this.h[8] = h8
        this.h[9] = h9
      }
      poly1305.prototype.finish = function (mac, macpos) {
        var g = new Uint16Array(10)
        var c, mask, f, i
        if (this.leftover) {
          i = this.leftover
          this.buffer[i++] = 1
          for (; i < 16; i++) this.buffer[i] = 0
          this.fin = 1
          this.blocks(this.buffer, 0, 16)
        }
        c = this.h[1] >>> 13
        this.h[1] &= 8191
        for (i = 2; i < 10; i++) {
          this.h[i] += c
          c = this.h[i] >>> 13
          this.h[i] &= 8191
        }
        this.h[0] += c * 5
        c = this.h[0] >>> 13
        this.h[0] &= 8191
        this.h[1] += c
        c = this.h[1] >>> 13
        this.h[1] &= 8191
        this.h[2] += c
        g[0] = this.h[0] + 5
        c = g[0] >>> 13
        g[0] &= 8191
        for (i = 1; i < 10; i++) {
          g[i] = this.h[i] + c
          c = g[i] >>> 13
          g[i] &= 8191
        }
        g[9] -= 1 << 13
        mask = (c ^ 1) - 1
        for (i = 0; i < 10; i++) g[i] &= mask
        mask = ~mask
        for (i = 0; i < 10; i++) this.h[i] = (this.h[i] & mask) | g[i]
        this.h[0] = (this.h[0] | (this.h[1] << 13)) & 65535
        this.h[1] = ((this.h[1] >>> 3) | (this.h[2] << 10)) & 65535
        this.h[2] = ((this.h[2] >>> 6) | (this.h[3] << 7)) & 65535
        this.h[3] = ((this.h[3] >>> 9) | (this.h[4] << 4)) & 65535
        this.h[4] = ((this.h[4] >>> 12) | (this.h[5] << 1) | (this.h[6] << 14)) & 65535
        this.h[5] = ((this.h[6] >>> 2) | (this.h[7] << 11)) & 65535
        this.h[6] = ((this.h[7] >>> 5) | (this.h[8] << 8)) & 65535
        this.h[7] = ((this.h[8] >>> 8) | (this.h[9] << 5)) & 65535
        f = this.h[0] + this.pad[0]
        this.h[0] = f & 65535
        for (i = 1; i < 8; i++) {
          f = (((this.h[i] + this.pad[i]) | 0) + (f >>> 16)) | 0
          this.h[i] = f & 65535
        }
        mac[macpos + 0] = (this.h[0] >>> 0) & 255
        mac[macpos + 1] = (this.h[0] >>> 8) & 255
        mac[macpos + 2] = (this.h[1] >>> 0) & 255
        mac[macpos + 3] = (this.h[1] >>> 8) & 255
        mac[macpos + 4] = (this.h[2] >>> 0) & 255
        mac[macpos + 5] = (this.h[2] >>> 8) & 255
        mac[macpos + 6] = (this.h[3] >>> 0) & 255
        mac[macpos + 7] = (this.h[3] >>> 8) & 255
        mac[macpos + 8] = (this.h[4] >>> 0) & 255
        mac[macpos + 9] = (this.h[4] >>> 8) & 255
        mac[macpos + 10] = (this.h[5] >>> 0) & 255
        mac[macpos + 11] = (this.h[5] >>> 8) & 255
        mac[macpos + 12] = (this.h[6] >>> 0) & 255
        mac[macpos + 13] = (this.h[6] >>> 8) & 255
        mac[macpos + 14] = (this.h[7] >>> 0) & 255
        mac[macpos + 15] = (this.h[7] >>> 8) & 255
      }
      poly1305.prototype.update = function (m, mpos, bytes) {
        var i, want
        if (this.leftover) {
          want = 16 - this.leftover
          if (want > bytes) want = bytes
          for (i = 0; i < want; i++) this.buffer[this.leftover + i] = m[mpos + i]
          bytes -= want
          mpos += want
          this.leftover += want
          if (this.leftover < 16) return
          this.blocks(this.buffer, 0, 16)
          this.leftover = 0
        }
        if (bytes >= 16) {
          want = bytes - (bytes % 16)
          this.blocks(m, mpos, want)
          mpos += want
          bytes -= want
        }
        if (bytes) {
          for (i = 0; i < bytes; i++) this.buffer[this.leftover + i] = m[mpos + i]
          this.leftover += bytes
        }
      }
      function crypto_onetimeauth(out, outpos, m, mpos, n, k) {
        var s = new poly1305(k)
        s.update(m, mpos, n)
        s.finish(out, outpos)
        return 0
      }
      function crypto_onetimeauth_verify(h, hpos, m, mpos, n, k) {
        var x = new Uint8Array(16)
        crypto_onetimeauth(x, 0, m, mpos, n, k)
        return crypto_verify_16(h, hpos, x, 0)
      }
      function crypto_secretbox(c, m, d, n, k) {
        var i
        if (d < 32) return -1
        crypto_stream_xor(c, 0, m, 0, d, n, k)
        crypto_onetimeauth(c, 16, c, 32, d - 32, c)
        for (i = 0; i < 16; i++) c[i] = 0
        return 0
      }
      function crypto_secretbox_open(m, c, d, n, k) {
        var i
        var x = new Uint8Array(32)
        if (d < 32) return -1
        crypto_stream(x, 0, 32, n, k)
        if (crypto_onetimeauth_verify(c, 16, c, 32, d - 32, x) !== 0) return -1
        crypto_stream_xor(m, 0, c, 0, d, n, k)
        for (i = 0; i < 32; i++) m[i] = 0
        return 0
      }
      function set25519(r, a) {
        var i
        for (i = 0; i < 16; i++) r[i] = a[i] | 0
      }
      function car25519(o) {
        var i,
          v,
          c = 1
        for (i = 0; i < 16; i++) {
          v = o[i] + c + 65535
          c = Math.floor(v / 65536)
          o[i] = v - c * 65536
        }
        o[0] += c - 1 + 37 * (c - 1)
      }
      function sel25519(p, q, b) {
        var t,
          c = ~(b - 1)
        for (var i = 0; i < 16; i++) {
          t = c & (p[i] ^ q[i])
          p[i] ^= t
          q[i] ^= t
        }
      }
      function pack25519(o, n) {
        var i, j, b
        var m = gf(),
          t = gf()
        for (i = 0; i < 16; i++) t[i] = n[i]
        car25519(t)
        car25519(t)
        car25519(t)
        for (j = 0; j < 2; j++) {
          m[0] = t[0] - 65517
          for (i = 1; i < 15; i++) {
            m[i] = t[i] - 65535 - ((m[i - 1] >> 16) & 1)
            m[i - 1] &= 65535
          }
          m[15] = t[15] - 32767 - ((m[14] >> 16) & 1)
          b = (m[15] >> 16) & 1
          m[14] &= 65535
          sel25519(t, m, 1 - b)
        }
        for (i = 0; i < 16; i++) {
          o[2 * i] = t[i] & 255
          o[2 * i + 1] = t[i] >> 8
        }
      }
      function neq25519(a, b) {
        var c = new Uint8Array(32),
          d = new Uint8Array(32)
        pack25519(c, a)
        pack25519(d, b)
        return crypto_verify_32(c, 0, d, 0)
      }
      function par25519(a) {
        var d = new Uint8Array(32)
        pack25519(d, a)
        return d[0] & 1
      }
      function unpack25519(o, n) {
        var i
        for (i = 0; i < 16; i++) o[i] = n[2 * i] + (n[2 * i + 1] << 8)
        o[15] &= 32767
      }
      function A(o, a, b) {
        for (var i = 0; i < 16; i++) o[i] = a[i] + b[i]
      }
      function Z(o, a, b) {
        for (var i = 0; i < 16; i++) o[i] = a[i] - b[i]
      }
      function M(o, a, b) {
        var v,
          c,
          t0 = 0,
          t1 = 0,
          t2 = 0,
          t3 = 0,
          t4 = 0,
          t5 = 0,
          t6 = 0,
          t7 = 0,
          t8 = 0,
          t9 = 0,
          t10 = 0,
          t11 = 0,
          t12 = 0,
          t13 = 0,
          t14 = 0,
          t15 = 0,
          t16 = 0,
          t17 = 0,
          t18 = 0,
          t19 = 0,
          t20 = 0,
          t21 = 0,
          t22 = 0,
          t23 = 0,
          t24 = 0,
          t25 = 0,
          t26 = 0,
          t27 = 0,
          t28 = 0,
          t29 = 0,
          t30 = 0,
          b0 = b[0],
          b1 = b[1],
          b2 = b[2],
          b3 = b[3],
          b4 = b[4],
          b5 = b[5],
          b6 = b[6],
          b7 = b[7],
          b8 = b[8],
          b9 = b[9],
          b10 = b[10],
          b11 = b[11],
          b12 = b[12],
          b13 = b[13],
          b14 = b[14],
          b15 = b[15]
        v = a[0]
        t0 += v * b0
        t1 += v * b1
        t2 += v * b2
        t3 += v * b3
        t4 += v * b4
        t5 += v * b5
        t6 += v * b6
        t7 += v * b7
        t8 += v * b8
        t9 += v * b9
        t10 += v * b10
        t11 += v * b11
        t12 += v * b12
        t13 += v * b13
        t14 += v * b14
        t15 += v * b15
        v = a[1]
        t1 += v * b0
        t2 += v * b1
        t3 += v * b2
        t4 += v * b3
        t5 += v * b4
        t6 += v * b5
        t7 += v * b6
        t8 += v * b7
        t9 += v * b8
        t10 += v * b9
        t11 += v * b10
        t12 += v * b11
        t13 += v * b12
        t14 += v * b13
        t15 += v * b14
        t16 += v * b15
        v = a[2]
        t2 += v * b0
        t3 += v * b1
        t4 += v * b2
        t5 += v * b3
        t6 += v * b4
        t7 += v * b5
        t8 += v * b6
        t9 += v * b7
        t10 += v * b8
        t11 += v * b9
        t12 += v * b10
        t13 += v * b11
        t14 += v * b12
        t15 += v * b13
        t16 += v * b14
        t17 += v * b15
        v = a[3]
        t3 += v * b0
        t4 += v * b1
        t5 += v * b2
        t6 += v * b3
        t7 += v * b4
        t8 += v * b5
        t9 += v * b6
        t10 += v * b7
        t11 += v * b8
        t12 += v * b9
        t13 += v * b10
        t14 += v * b11
        t15 += v * b12
        t16 += v * b13
        t17 += v * b14
        t18 += v * b15
        v = a[4]
        t4 += v * b0
        t5 += v * b1
        t6 += v * b2
        t7 += v * b3
        t8 += v * b4
        t9 += v * b5
        t10 += v * b6
        t11 += v * b7
        t12 += v * b8
        t13 += v * b9
        t14 += v * b10
        t15 += v * b11
        t16 += v * b12
        t17 += v * b13
        t18 += v * b14
        t19 += v * b15
        v = a[5]
        t5 += v * b0
        t6 += v * b1
        t7 += v * b2
        t8 += v * b3
        t9 += v * b4
        t10 += v * b5
        t11 += v * b6
        t12 += v * b7
        t13 += v * b8
        t14 += v * b9
        t15 += v * b10
        t16 += v * b11
        t17 += v * b12
        t18 += v * b13
        t19 += v * b14
        t20 += v * b15
        v = a[6]
        t6 += v * b0
        t7 += v * b1
        t8 += v * b2
        t9 += v * b3
        t10 += v * b4
        t11 += v * b5
        t12 += v * b6
        t13 += v * b7
        t14 += v * b8
        t15 += v * b9
        t16 += v * b10
        t17 += v * b11
        t18 += v * b12
        t19 += v * b13
        t20 += v * b14
        t21 += v * b15
        v = a[7]
        t7 += v * b0
        t8 += v * b1
        t9 += v * b2
        t10 += v * b3
        t11 += v * b4
        t12 += v * b5
        t13 += v * b6
        t14 += v * b7
        t15 += v * b8
        t16 += v * b9
        t17 += v * b10
        t18 += v * b11
        t19 += v * b12
        t20 += v * b13
        t21 += v * b14
        t22 += v * b15
        v = a[8]
        t8 += v * b0
        t9 += v * b1
        t10 += v * b2
        t11 += v * b3
        t12 += v * b4
        t13 += v * b5
        t14 += v * b6
        t15 += v * b7
        t16 += v * b8
        t17 += v * b9
        t18 += v * b10
        t19 += v * b11
        t20 += v * b12
        t21 += v * b13
        t22 += v * b14
        t23 += v * b15
        v = a[9]
        t9 += v * b0
        t10 += v * b1
        t11 += v * b2
        t12 += v * b3
        t13 += v * b4
        t14 += v * b5
        t15 += v * b6
        t16 += v * b7
        t17 += v * b8
        t18 += v * b9
        t19 += v * b10
        t20 += v * b11
        t21 += v * b12
        t22 += v * b13
        t23 += v * b14
        t24 += v * b15
        v = a[10]
        t10 += v * b0
        t11 += v * b1
        t12 += v * b2
        t13 += v * b3
        t14 += v * b4
        t15 += v * b5
        t16 += v * b6
        t17 += v * b7
        t18 += v * b8
        t19 += v * b9
        t20 += v * b10
        t21 += v * b11
        t22 += v * b12
        t23 += v * b13
        t24 += v * b14
        t25 += v * b15
        v = a[11]
        t11 += v * b0
        t12 += v * b1
        t13 += v * b2
        t14 += v * b3
        t15 += v * b4
        t16 += v * b5
        t17 += v * b6
        t18 += v * b7
        t19 += v * b8
        t20 += v * b9
        t21 += v * b10
        t22 += v * b11
        t23 += v * b12
        t24 += v * b13
        t25 += v * b14
        t26 += v * b15
        v = a[12]
        t12 += v * b0
        t13 += v * b1
        t14 += v * b2
        t15 += v * b3
        t16 += v * b4
        t17 += v * b5
        t18 += v * b6
        t19 += v * b7
        t20 += v * b8
        t21 += v * b9
        t22 += v * b10
        t23 += v * b11
        t24 += v * b12
        t25 += v * b13
        t26 += v * b14
        t27 += v * b15
        v = a[13]
        t13 += v * b0
        t14 += v * b1
        t15 += v * b2
        t16 += v * b3
        t17 += v * b4
        t18 += v * b5
        t19 += v * b6
        t20 += v * b7
        t21 += v * b8
        t22 += v * b9
        t23 += v * b10
        t24 += v * b11
        t25 += v * b12
        t26 += v * b13
        t27 += v * b14
        t28 += v * b15
        v = a[14]
        t14 += v * b0
        t15 += v * b1
        t16 += v * b2
        t17 += v * b3
        t18 += v * b4
        t19 += v * b5
        t20 += v * b6
        t21 += v * b7
        t22 += v * b8
        t23 += v * b9
        t24 += v * b10
        t25 += v * b11
        t26 += v * b12
        t27 += v * b13
        t28 += v * b14
        t29 += v * b15
        v = a[15]
        t15 += v * b0
        t16 += v * b1
        t17 += v * b2
        t18 += v * b3
        t19 += v * b4
        t20 += v * b5
        t21 += v * b6
        t22 += v * b7
        t23 += v * b8
        t24 += v * b9
        t25 += v * b10
        t26 += v * b11
        t27 += v * b12
        t28 += v * b13
        t29 += v * b14
        t30 += v * b15
        t0 += 38 * t16
        t1 += 38 * t17
        t2 += 38 * t18
        t3 += 38 * t19
        t4 += 38 * t20
        t5 += 38 * t21
        t6 += 38 * t22
        t7 += 38 * t23
        t8 += 38 * t24
        t9 += 38 * t25
        t10 += 38 * t26
        t11 += 38 * t27
        t12 += 38 * t28
        t13 += 38 * t29
        t14 += 38 * t30
        c = 1
        v = t0 + c + 65535
        c = Math.floor(v / 65536)
        t0 = v - c * 65536
        v = t1 + c + 65535
        c = Math.floor(v / 65536)
        t1 = v - c * 65536
        v = t2 + c + 65535
        c = Math.floor(v / 65536)
        t2 = v - c * 65536
        v = t3 + c + 65535
        c = Math.floor(v / 65536)
        t3 = v - c * 65536
        v = t4 + c + 65535
        c = Math.floor(v / 65536)
        t4 = v - c * 65536
        v = t5 + c + 65535
        c = Math.floor(v / 65536)
        t5 = v - c * 65536
        v = t6 + c + 65535
        c = Math.floor(v / 65536)
        t6 = v - c * 65536
        v = t7 + c + 65535
        c = Math.floor(v / 65536)
        t7 = v - c * 65536
        v = t8 + c + 65535
        c = Math.floor(v / 65536)
        t8 = v - c * 65536
        v = t9 + c + 65535
        c = Math.floor(v / 65536)
        t9 = v - c * 65536
        v = t10 + c + 65535
        c = Math.floor(v / 65536)
        t10 = v - c * 65536
        v = t11 + c + 65535
        c = Math.floor(v / 65536)
        t11 = v - c * 65536
        v = t12 + c + 65535
        c = Math.floor(v / 65536)
        t12 = v - c * 65536
        v = t13 + c + 65535
        c = Math.floor(v / 65536)
        t13 = v - c * 65536
        v = t14 + c + 65535
        c = Math.floor(v / 65536)
        t14 = v - c * 65536
        v = t15 + c + 65535
        c = Math.floor(v / 65536)
        t15 = v - c * 65536
        t0 += c - 1 + 37 * (c - 1)
        c = 1
        v = t0 + c + 65535
        c = Math.floor(v / 65536)
        t0 = v - c * 65536
        v = t1 + c + 65535
        c = Math.floor(v / 65536)
        t1 = v - c * 65536
        v = t2 + c + 65535
        c = Math.floor(v / 65536)
        t2 = v - c * 65536
        v = t3 + c + 65535
        c = Math.floor(v / 65536)
        t3 = v - c * 65536
        v = t4 + c + 65535
        c = Math.floor(v / 65536)
        t4 = v - c * 65536
        v = t5 + c + 65535
        c = Math.floor(v / 65536)
        t5 = v - c * 65536
        v = t6 + c + 65535
        c = Math.floor(v / 65536)
        t6 = v - c * 65536
        v = t7 + c + 65535
        c = Math.floor(v / 65536)
        t7 = v - c * 65536
        v = t8 + c + 65535
        c = Math.floor(v / 65536)
        t8 = v - c * 65536
        v = t9 + c + 65535
        c = Math.floor(v / 65536)
        t9 = v - c * 65536
        v = t10 + c + 65535
        c = Math.floor(v / 65536)
        t10 = v - c * 65536
        v = t11 + c + 65535
        c = Math.floor(v / 65536)
        t11 = v - c * 65536
        v = t12 + c + 65535
        c = Math.floor(v / 65536)
        t12 = v - c * 65536
        v = t13 + c + 65535
        c = Math.floor(v / 65536)
        t13 = v - c * 65536
        v = t14 + c + 65535
        c = Math.floor(v / 65536)
        t14 = v - c * 65536
        v = t15 + c + 65535
        c = Math.floor(v / 65536)
        t15 = v - c * 65536
        t0 += c - 1 + 37 * (c - 1)
        o[0] = t0
        o[1] = t1
        o[2] = t2
        o[3] = t3
        o[4] = t4
        o[5] = t5
        o[6] = t6
        o[7] = t7
        o[8] = t8
        o[9] = t9
        o[10] = t10
        o[11] = t11
        o[12] = t12
        o[13] = t13
        o[14] = t14
        o[15] = t15
      }
      function S(o, a) {
        M(o, a, a)
      }
      function inv25519(o, i) {
        var c = gf()
        var a
        for (a = 0; a < 16; a++) c[a] = i[a]
        for (a = 253; a >= 0; a--) {
          S(c, c)
          if (a !== 2 && a !== 4) M(c, c, i)
        }
        for (a = 0; a < 16; a++) o[a] = c[a]
      }
      function pow2523(o, i) {
        var c = gf()
        var a
        for (a = 0; a < 16; a++) c[a] = i[a]
        for (a = 250; a >= 0; a--) {
          S(c, c)
          if (a !== 1) M(c, c, i)
        }
        for (a = 0; a < 16; a++) o[a] = c[a]
      }
      function crypto_scalarmult(q, n, p) {
        var z = new Uint8Array(32)
        var x = new Float64Array(80),
          r,
          i
        var a = gf(),
          b = gf(),
          c = gf(),
          d = gf(),
          e = gf(),
          f = gf()
        for (i = 0; i < 31; i++) z[i] = n[i]
        z[31] = (n[31] & 127) | 64
        z[0] &= 248
        unpack25519(x, p)
        for (i = 0; i < 16; i++) {
          b[i] = x[i]
          d[i] = a[i] = c[i] = 0
        }
        a[0] = d[0] = 1
        for (i = 254; i >= 0; --i) {
          r = (z[i >>> 3] >>> (i & 7)) & 1
          sel25519(a, b, r)
          sel25519(c, d, r)
          A(e, a, c)
          Z(a, a, c)
          A(c, b, d)
          Z(b, b, d)
          S(d, e)
          S(f, a)
          M(a, c, a)
          M(c, b, e)
          A(e, a, c)
          Z(a, a, c)
          S(b, a)
          Z(c, d, f)
          M(a, c, _121665)
          A(a, a, d)
          M(c, c, a)
          M(a, d, f)
          M(d, b, x)
          S(b, e)
          sel25519(a, b, r)
          sel25519(c, d, r)
        }
        for (i = 0; i < 16; i++) {
          x[i + 16] = a[i]
          x[i + 32] = c[i]
          x[i + 48] = b[i]
          x[i + 64] = d[i]
        }
        var x32 = x.subarray(32)
        var x16 = x.subarray(16)
        inv25519(x32, x32)
        M(x16, x16, x32)
        pack25519(q, x16)
        return 0
      }
      function crypto_scalarmult_base(q, n) {
        return crypto_scalarmult(q, n, _9)
      }
      function crypto_box_keypair(y, x) {
        randombytes(x, 32)
        return crypto_scalarmult_base(y, x)
      }
      function crypto_box_beforenm(k, y, x) {
        var s = new Uint8Array(32)
        crypto_scalarmult(s, x, y)
        return crypto_core_hsalsa20(k, _0, s, sigma)
      }
      var crypto_box_afternm = crypto_secretbox
      var crypto_box_open_afternm = crypto_secretbox_open
      function crypto_box(c, m, d, n, y, x) {
        var k = new Uint8Array(32)
        crypto_box_beforenm(k, y, x)
        return crypto_box_afternm(c, m, d, n, k)
      }
      function crypto_box_open(m, c, d, n, y, x) {
        var k = new Uint8Array(32)
        crypto_box_beforenm(k, y, x)
        return crypto_box_open_afternm(m, c, d, n, k)
      }
      var K = [
        1116352408,
        3609767458,
        1899447441,
        602891725,
        3049323471,
        3964484399,
        3921009573,
        2173295548,
        961987163,
        4081628472,
        1508970993,
        3053834265,
        2453635748,
        2937671579,
        2870763221,
        3664609560,
        3624381080,
        2734883394,
        310598401,
        1164996542,
        607225278,
        1323610764,
        1426881987,
        3590304994,
        1925078388,
        4068182383,
        2162078206,
        991336113,
        2614888103,
        633803317,
        3248222580,
        3479774868,
        3835390401,
        2666613458,
        4022224774,
        944711139,
        264347078,
        2341262773,
        604807628,
        2007800933,
        770255983,
        1495990901,
        1249150122,
        1856431235,
        1555081692,
        3175218132,
        1996064986,
        2198950837,
        2554220882,
        3999719339,
        2821834349,
        766784016,
        2952996808,
        2566594879,
        3210313671,
        3203337956,
        3336571891,
        1034457026,
        3584528711,
        2466948901,
        113926993,
        3758326383,
        338241895,
        168717936,
        666307205,
        1188179964,
        773529912,
        1546045734,
        1294757372,
        1522805485,
        1396182291,
        2643833823,
        1695183700,
        2343527390,
        1986661051,
        1014477480,
        2177026350,
        1206759142,
        2456956037,
        344077627,
        2730485921,
        1290863460,
        2820302411,
        3158454273,
        3259730800,
        3505952657,
        3345764771,
        106217008,
        3516065817,
        3606008344,
        3600352804,
        1432725776,
        4094571909,
        1467031594,
        275423344,
        851169720,
        430227734,
        3100823752,
        506948616,
        1363258195,
        659060556,
        3750685593,
        883997877,
        3785050280,
        958139571,
        3318307427,
        1322822218,
        3812723403,
        1537002063,
        2003034995,
        1747873779,
        3602036899,
        1955562222,
        1575990012,
        2024104815,
        1125592928,
        2227730452,
        2716904306,
        2361852424,
        442776044,
        2428436474,
        593698344,
        2756734187,
        3733110249,
        3204031479,
        2999351573,
        3329325298,
        3815920427,
        3391569614,
        3928383900,
        3515267271,
        566280711,
        3940187606,
        3454069534,
        4118630271,
        4000239992,
        116418474,
        1914138554,
        174292421,
        2731055270,
        289380356,
        3203993006,
        460393269,
        320620315,
        685471733,
        587496836,
        852142971,
        1086792851,
        1017036298,
        365543100,
        1126000580,
        2618297676,
        1288033470,
        3409855158,
        1501505948,
        4234509866,
        1607167915,
        987167468,
        1816402316,
        1246189591,
      ]
      function crypto_hashblocks_hl(hh, hl, m, n) {
        var wh = new Int32Array(16),
          wl = new Int32Array(16),
          bh0,
          bh1,
          bh2,
          bh3,
          bh4,
          bh5,
          bh6,
          bh7,
          bl0,
          bl1,
          bl2,
          bl3,
          bl4,
          bl5,
          bl6,
          bl7,
          th,
          tl,
          i,
          j,
          h,
          l,
          a,
          b,
          c,
          d
        var ah0 = hh[0],
          ah1 = hh[1],
          ah2 = hh[2],
          ah3 = hh[3],
          ah4 = hh[4],
          ah5 = hh[5],
          ah6 = hh[6],
          ah7 = hh[7],
          al0 = hl[0],
          al1 = hl[1],
          al2 = hl[2],
          al3 = hl[3],
          al4 = hl[4],
          al5 = hl[5],
          al6 = hl[6],
          al7 = hl[7]
        var pos = 0
        while (n >= 128) {
          for (i = 0; i < 16; i++) {
            j = 8 * i + pos
            wh[i] = (m[j + 0] << 24) | (m[j + 1] << 16) | (m[j + 2] << 8) | m[j + 3]
            wl[i] = (m[j + 4] << 24) | (m[j + 5] << 16) | (m[j + 6] << 8) | m[j + 7]
          }
          for (i = 0; i < 80; i++) {
            bh0 = ah0
            bh1 = ah1
            bh2 = ah2
            bh3 = ah3
            bh4 = ah4
            bh5 = ah5
            bh6 = ah6
            bh7 = ah7
            bl0 = al0
            bl1 = al1
            bl2 = al2
            bl3 = al3
            bl4 = al4
            bl5 = al5
            bl6 = al6
            bl7 = al7
            h = ah7
            l = al7
            a = l & 65535
            b = l >>> 16
            c = h & 65535
            d = h >>> 16
            h =
              ((ah4 >>> 14) | (al4 << (32 - 14))) ^
              ((ah4 >>> 18) | (al4 << (32 - 18))) ^
              ((al4 >>> (41 - 32)) | (ah4 << (32 - (41 - 32))))
            l =
              ((al4 >>> 14) | (ah4 << (32 - 14))) ^
              ((al4 >>> 18) | (ah4 << (32 - 18))) ^
              ((ah4 >>> (41 - 32)) | (al4 << (32 - (41 - 32))))
            a += l & 65535
            b += l >>> 16
            c += h & 65535
            d += h >>> 16
            h = (ah4 & ah5) ^ (~ah4 & ah6)
            l = (al4 & al5) ^ (~al4 & al6)
            a += l & 65535
            b += l >>> 16
            c += h & 65535
            d += h >>> 16
            h = K[i * 2]
            l = K[i * 2 + 1]
            a += l & 65535
            b += l >>> 16
            c += h & 65535
            d += h >>> 16
            h = wh[i % 16]
            l = wl[i % 16]
            a += l & 65535
            b += l >>> 16
            c += h & 65535
            d += h >>> 16
            b += a >>> 16
            c += b >>> 16
            d += c >>> 16
            th = (c & 65535) | (d << 16)
            tl = (a & 65535) | (b << 16)
            h = th
            l = tl
            a = l & 65535
            b = l >>> 16
            c = h & 65535
            d = h >>> 16
            h =
              ((ah0 >>> 28) | (al0 << (32 - 28))) ^
              ((al0 >>> (34 - 32)) | (ah0 << (32 - (34 - 32)))) ^
              ((al0 >>> (39 - 32)) | (ah0 << (32 - (39 - 32))))
            l =
              ((al0 >>> 28) | (ah0 << (32 - 28))) ^
              ((ah0 >>> (34 - 32)) | (al0 << (32 - (34 - 32)))) ^
              ((ah0 >>> (39 - 32)) | (al0 << (32 - (39 - 32))))
            a += l & 65535
            b += l >>> 16
            c += h & 65535
            d += h >>> 16
            h = (ah0 & ah1) ^ (ah0 & ah2) ^ (ah1 & ah2)
            l = (al0 & al1) ^ (al0 & al2) ^ (al1 & al2)
            a += l & 65535
            b += l >>> 16
            c += h & 65535
            d += h >>> 16
            b += a >>> 16
            c += b >>> 16
            d += c >>> 16
            bh7 = (c & 65535) | (d << 16)
            bl7 = (a & 65535) | (b << 16)
            h = bh3
            l = bl3
            a = l & 65535
            b = l >>> 16
            c = h & 65535
            d = h >>> 16
            h = th
            l = tl
            a += l & 65535
            b += l >>> 16
            c += h & 65535
            d += h >>> 16
            b += a >>> 16
            c += b >>> 16
            d += c >>> 16
            bh3 = (c & 65535) | (d << 16)
            bl3 = (a & 65535) | (b << 16)
            ah1 = bh0
            ah2 = bh1
            ah3 = bh2
            ah4 = bh3
            ah5 = bh4
            ah6 = bh5
            ah7 = bh6
            ah0 = bh7
            al1 = bl0
            al2 = bl1
            al3 = bl2
            al4 = bl3
            al5 = bl4
            al6 = bl5
            al7 = bl6
            al0 = bl7
            if (i % 16 === 15) {
              for (j = 0; j < 16; j++) {
                h = wh[j]
                l = wl[j]
                a = l & 65535
                b = l >>> 16
                c = h & 65535
                d = h >>> 16
                h = wh[(j + 9) % 16]
                l = wl[(j + 9) % 16]
                a += l & 65535
                b += l >>> 16
                c += h & 65535
                d += h >>> 16
                th = wh[(j + 1) % 16]
                tl = wl[(j + 1) % 16]
                h = ((th >>> 1) | (tl << (32 - 1))) ^ ((th >>> 8) | (tl << (32 - 8))) ^ (th >>> 7)
                l =
                  ((tl >>> 1) | (th << (32 - 1))) ^
                  ((tl >>> 8) | (th << (32 - 8))) ^
                  ((tl >>> 7) | (th << (32 - 7)))
                a += l & 65535
                b += l >>> 16
                c += h & 65535
                d += h >>> 16
                th = wh[(j + 14) % 16]
                tl = wl[(j + 14) % 16]
                h =
                  ((th >>> 19) | (tl << (32 - 19))) ^
                  ((tl >>> (61 - 32)) | (th << (32 - (61 - 32)))) ^
                  (th >>> 6)
                l =
                  ((tl >>> 19) | (th << (32 - 19))) ^
                  ((th >>> (61 - 32)) | (tl << (32 - (61 - 32)))) ^
                  ((tl >>> 6) | (th << (32 - 6)))
                a += l & 65535
                b += l >>> 16
                c += h & 65535
                d += h >>> 16
                b += a >>> 16
                c += b >>> 16
                d += c >>> 16
                wh[j] = (c & 65535) | (d << 16)
                wl[j] = (a & 65535) | (b << 16)
              }
            }
          }
          h = ah0
          l = al0
          a = l & 65535
          b = l >>> 16
          c = h & 65535
          d = h >>> 16
          h = hh[0]
          l = hl[0]
          a += l & 65535
          b += l >>> 16
          c += h & 65535
          d += h >>> 16
          b += a >>> 16
          c += b >>> 16
          d += c >>> 16
          hh[0] = ah0 = (c & 65535) | (d << 16)
          hl[0] = al0 = (a & 65535) | (b << 16)
          h = ah1
          l = al1
          a = l & 65535
          b = l >>> 16
          c = h & 65535
          d = h >>> 16
          h = hh[1]
          l = hl[1]
          a += l & 65535
          b += l >>> 16
          c += h & 65535
          d += h >>> 16
          b += a >>> 16
          c += b >>> 16
          d += c >>> 16
          hh[1] = ah1 = (c & 65535) | (d << 16)
          hl[1] = al1 = (a & 65535) | (b << 16)
          h = ah2
          l = al2
          a = l & 65535
          b = l >>> 16
          c = h & 65535
          d = h >>> 16
          h = hh[2]
          l = hl[2]
          a += l & 65535
          b += l >>> 16
          c += h & 65535
          d += h >>> 16
          b += a >>> 16
          c += b >>> 16
          d += c >>> 16
          hh[2] = ah2 = (c & 65535) | (d << 16)
          hl[2] = al2 = (a & 65535) | (b << 16)
          h = ah3
          l = al3
          a = l & 65535
          b = l >>> 16
          c = h & 65535
          d = h >>> 16
          h = hh[3]
          l = hl[3]
          a += l & 65535
          b += l >>> 16
          c += h & 65535
          d += h >>> 16
          b += a >>> 16
          c += b >>> 16
          d += c >>> 16
          hh[3] = ah3 = (c & 65535) | (d << 16)
          hl[3] = al3 = (a & 65535) | (b << 16)
          h = ah4
          l = al4
          a = l & 65535
          b = l >>> 16
          c = h & 65535
          d = h >>> 16
          h = hh[4]
          l = hl[4]
          a += l & 65535
          b += l >>> 16
          c += h & 65535
          d += h >>> 16
          b += a >>> 16
          c += b >>> 16
          d += c >>> 16
          hh[4] = ah4 = (c & 65535) | (d << 16)
          hl[4] = al4 = (a & 65535) | (b << 16)
          h = ah5
          l = al5
          a = l & 65535
          b = l >>> 16
          c = h & 65535
          d = h >>> 16
          h = hh[5]
          l = hl[5]
          a += l & 65535
          b += l >>> 16
          c += h & 65535
          d += h >>> 16
          b += a >>> 16
          c += b >>> 16
          d += c >>> 16
          hh[5] = ah5 = (c & 65535) | (d << 16)
          hl[5] = al5 = (a & 65535) | (b << 16)
          h = ah6
          l = al6
          a = l & 65535
          b = l >>> 16
          c = h & 65535
          d = h >>> 16
          h = hh[6]
          l = hl[6]
          a += l & 65535
          b += l >>> 16
          c += h & 65535
          d += h >>> 16
          b += a >>> 16
          c += b >>> 16
          d += c >>> 16
          hh[6] = ah6 = (c & 65535) | (d << 16)
          hl[6] = al6 = (a & 65535) | (b << 16)
          h = ah7
          l = al7
          a = l & 65535
          b = l >>> 16
          c = h & 65535
          d = h >>> 16
          h = hh[7]
          l = hl[7]
          a += l & 65535
          b += l >>> 16
          c += h & 65535
          d += h >>> 16
          b += a >>> 16
          c += b >>> 16
          d += c >>> 16
          hh[7] = ah7 = (c & 65535) | (d << 16)
          hl[7] = al7 = (a & 65535) | (b << 16)
          pos += 128
          n -= 128
        }
        return n
      }
      function crypto_hash(out, m, n) {
        var hh = new Int32Array(8),
          hl = new Int32Array(8),
          x = new Uint8Array(256),
          i,
          b = n
        hh[0] = 1779033703
        hh[1] = 3144134277
        hh[2] = 1013904242
        hh[3] = 2773480762
        hh[4] = 1359893119
        hh[5] = 2600822924
        hh[6] = 528734635
        hh[7] = 1541459225
        hl[0] = 4089235720
        hl[1] = 2227873595
        hl[2] = 4271175723
        hl[3] = 1595750129
        hl[4] = 2917565137
        hl[5] = 725511199
        hl[6] = 4215389547
        hl[7] = 327033209
        crypto_hashblocks_hl(hh, hl, m, n)
        n %= 128
        for (i = 0; i < n; i++) x[i] = m[b - n + i]
        x[n] = 128
        n = 256 - 128 * (n < 112 ? 1 : 0)
        x[n - 9] = 0
        ts64(x, n - 8, (b / 536870912) | 0, b << 3)
        crypto_hashblocks_hl(hh, hl, x, n)
        for (i = 0; i < 8; i++) ts64(out, 8 * i, hh[i], hl[i])
        return 0
      }
      function add(p, q) {
        var a = gf(),
          b = gf(),
          c = gf(),
          d = gf(),
          e = gf(),
          f = gf(),
          g = gf(),
          h = gf(),
          t = gf()
        Z(a, p[1], p[0])
        Z(t, q[1], q[0])
        M(a, a, t)
        A(b, p[0], p[1])
        A(t, q[0], q[1])
        M(b, b, t)
        M(c, p[3], q[3])
        M(c, c, D2)
        M(d, p[2], q[2])
        A(d, d, d)
        Z(e, b, a)
        Z(f, d, c)
        A(g, d, c)
        A(h, b, a)
        M(p[0], e, f)
        M(p[1], h, g)
        M(p[2], g, f)
        M(p[3], e, h)
      }
      function cswap(p, q, b) {
        var i
        for (i = 0; i < 4; i++) {
          sel25519(p[i], q[i], b)
        }
      }
      function pack(r, p) {
        var tx = gf(),
          ty = gf(),
          zi = gf()
        inv25519(zi, p[2])
        M(tx, p[0], zi)
        M(ty, p[1], zi)
        pack25519(r, ty)
        r[31] ^= par25519(tx) << 7
      }
      function scalarmult(p, q, s) {
        var b, i
        set25519(p[0], gf0)
        set25519(p[1], gf1)
        set25519(p[2], gf1)
        set25519(p[3], gf0)
        for (i = 255; i >= 0; --i) {
          b = (s[(i / 8) | 0] >> (i & 7)) & 1
          cswap(p, q, b)
          add(q, p)
          add(p, p)
          cswap(p, q, b)
        }
      }
      function scalarbase(p, s) {
        var q = [gf(), gf(), gf(), gf()]
        set25519(q[0], X)
        set25519(q[1], Y)
        set25519(q[2], gf1)
        M(q[3], X, Y)
        scalarmult(p, q, s)
      }
      function crypto_sign_keypair(pk, sk, seeded) {
        var d = new Uint8Array(64)
        var p = [gf(), gf(), gf(), gf()]
        var i
        if (!seeded) randombytes(sk, 32)
        crypto_hash(d, sk, 32)
        d[0] &= 248
        d[31] &= 127
        d[31] |= 64
        scalarbase(p, d)
        pack(pk, p)
        for (i = 0; i < 32; i++) sk[i + 32] = pk[i]
        return 0
      }
      var L = new Float64Array([
        237,
        211,
        245,
        92,
        26,
        99,
        18,
        88,
        214,
        156,
        247,
        162,
        222,
        249,
        222,
        20,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        16,
      ])
      function modL(r, x) {
        var carry, i, j, k
        for (i = 63; i >= 32; --i) {
          carry = 0
          for (j = i - 32, k = i - 12; j < k; ++j) {
            x[j] += carry - 16 * x[i] * L[j - (i - 32)]
            carry = Math.floor((x[j] + 128) / 256)
            x[j] -= carry * 256
          }
          x[j] += carry
          x[i] = 0
        }
        carry = 0
        for (j = 0; j < 32; j++) {
          x[j] += carry - (x[31] >> 4) * L[j]
          carry = x[j] >> 8
          x[j] &= 255
        }
        for (j = 0; j < 32; j++) x[j] -= carry * L[j]
        for (i = 0; i < 32; i++) {
          x[i + 1] += x[i] >> 8
          r[i] = x[i] & 255
        }
      }
      function reduce(r) {
        var x = new Float64Array(64),
          i
        for (i = 0; i < 64; i++) x[i] = r[i]
        for (i = 0; i < 64; i++) r[i] = 0
        modL(r, x)
      }
      function crypto_sign(sm, m, n, sk) {
        var d = new Uint8Array(64),
          h = new Uint8Array(64),
          r = new Uint8Array(64)
        var i,
          j,
          x = new Float64Array(64)
        var p = [gf(), gf(), gf(), gf()]
        crypto_hash(d, sk, 32)
        d[0] &= 248
        d[31] &= 127
        d[31] |= 64
        var smlen = n + 64
        for (i = 0; i < n; i++) sm[64 + i] = m[i]
        for (i = 0; i < 32; i++) sm[32 + i] = d[32 + i]
        crypto_hash(r, sm.subarray(32), n + 32)
        reduce(r)
        scalarbase(p, r)
        pack(sm, p)
        for (i = 32; i < 64; i++) sm[i] = sk[i]
        crypto_hash(h, sm, n + 64)
        reduce(h)
        for (i = 0; i < 64; i++) x[i] = 0
        for (i = 0; i < 32; i++) x[i] = r[i]
        for (i = 0; i < 32; i++) {
          for (j = 0; j < 32; j++) {
            x[i + j] += h[i] * d[j]
          }
        }
        modL(sm.subarray(32), x)
        return smlen
      }
      function unpackneg(r, p) {
        var t = gf(),
          chk = gf(),
          num = gf(),
          den = gf(),
          den2 = gf(),
          den4 = gf(),
          den6 = gf()
        set25519(r[2], gf1)
        unpack25519(r[1], p)
        S(num, r[1])
        M(den, num, D)
        Z(num, num, r[2])
        A(den, r[2], den)
        S(den2, den)
        S(den4, den2)
        M(den6, den4, den2)
        M(t, den6, num)
        M(t, t, den)
        pow2523(t, t)
        M(t, t, num)
        M(t, t, den)
        M(t, t, den)
        M(r[0], t, den)
        S(chk, r[0])
        M(chk, chk, den)
        if (neq25519(chk, num)) M(r[0], r[0], I)
        S(chk, r[0])
        M(chk, chk, den)
        if (neq25519(chk, num)) return -1
        if (par25519(r[0]) === p[31] >> 7) Z(r[0], gf0, r[0])
        M(r[3], r[0], r[1])
        return 0
      }
      function crypto_sign_open(m, sm, n, pk) {
        var i
        var t = new Uint8Array(32),
          h = new Uint8Array(64)
        var p = [gf(), gf(), gf(), gf()],
          q = [gf(), gf(), gf(), gf()]
        if (n < 64) return -1
        if (unpackneg(q, pk)) return -1
        for (i = 0; i < n; i++) m[i] = sm[i]
        for (i = 0; i < 32; i++) m[i + 32] = pk[i]
        crypto_hash(h, m, n)
        reduce(h)
        scalarmult(p, q, h)
        scalarbase(q, sm.subarray(32))
        add(p, q)
        pack(t, p)
        n -= 64
        if (crypto_verify_32(sm, 0, t, 0)) {
          for (i = 0; i < n; i++) m[i] = 0
          return -1
        }
        for (i = 0; i < n; i++) m[i] = sm[i + 64]
        return n
      }
      var crypto_secretbox_KEYBYTES = 32,
        crypto_secretbox_NONCEBYTES = 24,
        crypto_secretbox_ZEROBYTES = 32,
        crypto_secretbox_BOXZEROBYTES = 16,
        crypto_scalarmult_BYTES = 32,
        crypto_scalarmult_SCALARBYTES = 32,
        crypto_box_PUBLICKEYBYTES = 32,
        crypto_box_SECRETKEYBYTES = 32,
        crypto_box_BEFORENMBYTES = 32,
        crypto_box_NONCEBYTES = crypto_secretbox_NONCEBYTES,
        crypto_box_ZEROBYTES = crypto_secretbox_ZEROBYTES,
        crypto_box_BOXZEROBYTES = crypto_secretbox_BOXZEROBYTES,
        crypto_sign_BYTES = 64,
        crypto_sign_PUBLICKEYBYTES = 32,
        crypto_sign_SECRETKEYBYTES = 64,
        crypto_sign_SEEDBYTES = 32,
        crypto_hash_BYTES = 64
      nacl.lowlevel = {
        crypto_core_hsalsa20: crypto_core_hsalsa20,
        crypto_stream_xor: crypto_stream_xor,
        crypto_stream: crypto_stream,
        crypto_stream_salsa20_xor: crypto_stream_salsa20_xor,
        crypto_stream_salsa20: crypto_stream_salsa20,
        crypto_onetimeauth: crypto_onetimeauth,
        crypto_onetimeauth_verify: crypto_onetimeauth_verify,
        crypto_verify_16: crypto_verify_16,
        crypto_verify_32: crypto_verify_32,
        crypto_secretbox: crypto_secretbox,
        crypto_secretbox_open: crypto_secretbox_open,
        crypto_scalarmult: crypto_scalarmult,
        crypto_scalarmult_base: crypto_scalarmult_base,
        crypto_box_beforenm: crypto_box_beforenm,
        crypto_box_afternm: crypto_box_afternm,
        crypto_box: crypto_box,
        crypto_box_open: crypto_box_open,
        crypto_box_keypair: crypto_box_keypair,
        crypto_hash: crypto_hash,
        crypto_sign: crypto_sign,
        crypto_sign_keypair: crypto_sign_keypair,
        crypto_sign_open: crypto_sign_open,
        crypto_secretbox_KEYBYTES: crypto_secretbox_KEYBYTES,
        crypto_secretbox_NONCEBYTES: crypto_secretbox_NONCEBYTES,
        crypto_secretbox_ZEROBYTES: crypto_secretbox_ZEROBYTES,
        crypto_secretbox_BOXZEROBYTES: crypto_secretbox_BOXZEROBYTES,
        crypto_scalarmult_BYTES: crypto_scalarmult_BYTES,
        crypto_scalarmult_SCALARBYTES: crypto_scalarmult_SCALARBYTES,
        crypto_box_PUBLICKEYBYTES: crypto_box_PUBLICKEYBYTES,
        crypto_box_SECRETKEYBYTES: crypto_box_SECRETKEYBYTES,
        crypto_box_BEFORENMBYTES: crypto_box_BEFORENMBYTES,
        crypto_box_NONCEBYTES: crypto_box_NONCEBYTES,
        crypto_box_ZEROBYTES: crypto_box_ZEROBYTES,
        crypto_box_BOXZEROBYTES: crypto_box_BOXZEROBYTES,
        crypto_sign_BYTES: crypto_sign_BYTES,
        crypto_sign_PUBLICKEYBYTES: crypto_sign_PUBLICKEYBYTES,
        crypto_sign_SECRETKEYBYTES: crypto_sign_SECRETKEYBYTES,
        crypto_sign_SEEDBYTES: crypto_sign_SEEDBYTES,
        crypto_hash_BYTES: crypto_hash_BYTES,
        gf: gf,
        D: D,
        L: L,
        pack25519: pack25519,
        unpack25519: unpack25519,
        M: M,
        A: A,
        S: S,
        Z: Z,
        pow2523: pow2523,
        add: add,
        set25519: set25519,
        modL: modL,
        scalarmult: scalarmult,
        scalarbase: scalarbase,
      }
      function checkLengths(k, n) {
        if (k.length !== crypto_secretbox_KEYBYTES) throw new Error("bad key size")
        if (n.length !== crypto_secretbox_NONCEBYTES) throw new Error("bad nonce size")
      }
      function checkBoxLengths(pk, sk) {
        if (pk.length !== crypto_box_PUBLICKEYBYTES) throw new Error("bad public key size")
        if (sk.length !== crypto_box_SECRETKEYBYTES) throw new Error("bad secret key size")
      }
      function checkArrayTypes() {
        for (var i = 0; i < arguments.length; i++) {
          if (!(arguments[i] instanceof Uint8Array))
            throw new TypeError("unexpected type, use Uint8Array")
        }
      }
      function cleanup(arr) {
        for (var i = 0; i < arr.length; i++) arr[i] = 0
      }
      nacl.randomBytes = function (n) {
        var b = new Uint8Array(n)
        randombytes(b, n)
        return b
      }
      nacl.secretbox = function (msg, nonce, key) {
        checkArrayTypes(msg, nonce, key)
        checkLengths(key, nonce)
        var m = new Uint8Array(crypto_secretbox_ZEROBYTES + msg.length)
        var c = new Uint8Array(m.length)
        for (var i = 0; i < msg.length; i++) m[i + crypto_secretbox_ZEROBYTES] = msg[i]
        crypto_secretbox(c, m, m.length, nonce, key)
        return c.subarray(crypto_secretbox_BOXZEROBYTES)
      }
      nacl.secretbox.open = function (box, nonce, key) {
        checkArrayTypes(box, nonce, key)
        checkLengths(key, nonce)
        var c = new Uint8Array(crypto_secretbox_BOXZEROBYTES + box.length)
        var m = new Uint8Array(c.length)
        for (var i = 0; i < box.length; i++) c[i + crypto_secretbox_BOXZEROBYTES] = box[i]
        if (c.length < 32) return null
        if (crypto_secretbox_open(m, c, c.length, nonce, key) !== 0) return null
        return m.subarray(crypto_secretbox_ZEROBYTES)
      }
      nacl.secretbox.keyLength = crypto_secretbox_KEYBYTES
      nacl.secretbox.nonceLength = crypto_secretbox_NONCEBYTES
      nacl.secretbox.overheadLength = crypto_secretbox_BOXZEROBYTES
      nacl.scalarMult = function (n, p) {
        checkArrayTypes(n, p)
        if (n.length !== crypto_scalarmult_SCALARBYTES) throw new Error("bad n size")
        if (p.length !== crypto_scalarmult_BYTES) throw new Error("bad p size")
        var q = new Uint8Array(crypto_scalarmult_BYTES)
        crypto_scalarmult(q, n, p)
        return q
      }
      nacl.scalarMult.base = function (n) {
        checkArrayTypes(n)
        if (n.length !== crypto_scalarmult_SCALARBYTES) throw new Error("bad n size")
        var q = new Uint8Array(crypto_scalarmult_BYTES)
        crypto_scalarmult_base(q, n)
        return q
      }
      nacl.scalarMult.scalarLength = crypto_scalarmult_SCALARBYTES
      nacl.scalarMult.groupElementLength = crypto_scalarmult_BYTES
      nacl.box = function (msg, nonce, publicKey, secretKey) {
        var k = nacl.box.before(publicKey, secretKey)
        return nacl.secretbox(msg, nonce, k)
      }
      nacl.box.before = function (publicKey, secretKey) {
        checkArrayTypes(publicKey, secretKey)
        checkBoxLengths(publicKey, secretKey)
        var k = new Uint8Array(crypto_box_BEFORENMBYTES)
        crypto_box_beforenm(k, publicKey, secretKey)
        return k
      }
      nacl.box.after = nacl.secretbox
      nacl.box.open = function (msg, nonce, publicKey, secretKey) {
        var k = nacl.box.before(publicKey, secretKey)
        return nacl.secretbox.open(msg, nonce, k)
      }
      nacl.box.open.after = nacl.secretbox.open
      nacl.box.keyPair = function () {
        var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES)
        var sk = new Uint8Array(crypto_box_SECRETKEYBYTES)
        crypto_box_keypair(pk, sk)
        return { publicKey: pk, secretKey: sk }
      }
      nacl.box.keyPair.fromSecretKey = function (secretKey) {
        checkArrayTypes(secretKey)
        if (secretKey.length !== crypto_box_SECRETKEYBYTES) throw new Error("bad secret key size")
        var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES)
        crypto_scalarmult_base(pk, secretKey)
        return { publicKey: pk, secretKey: new Uint8Array(secretKey) }
      }
      nacl.box.publicKeyLength = crypto_box_PUBLICKEYBYTES
      nacl.box.secretKeyLength = crypto_box_SECRETKEYBYTES
      nacl.box.sharedKeyLength = crypto_box_BEFORENMBYTES
      nacl.box.nonceLength = crypto_box_NONCEBYTES
      nacl.box.overheadLength = nacl.secretbox.overheadLength
      nacl.sign = function (msg, secretKey) {
        checkArrayTypes(msg, secretKey)
        if (secretKey.length !== crypto_sign_SECRETKEYBYTES) throw new Error("bad secret key size")
        var signedMsg = new Uint8Array(crypto_sign_BYTES + msg.length)
        crypto_sign(signedMsg, msg, msg.length, secretKey)
        return signedMsg
      }
      nacl.sign.open = function (signedMsg, publicKey) {
        checkArrayTypes(signedMsg, publicKey)
        if (publicKey.length !== crypto_sign_PUBLICKEYBYTES) throw new Error("bad public key size")
        var tmp = new Uint8Array(signedMsg.length)
        var mlen = crypto_sign_open(tmp, signedMsg, signedMsg.length, publicKey)
        if (mlen < 0) return null
        var m = new Uint8Array(mlen)
        for (var i = 0; i < m.length; i++) m[i] = tmp[i]
        return m
      }
      nacl.sign.detached = function (msg, secretKey) {
        var signedMsg = nacl.sign(msg, secretKey)
        var sig = new Uint8Array(crypto_sign_BYTES)
        for (var i = 0; i < sig.length; i++) sig[i] = signedMsg[i]
        return sig
      }
      nacl.sign.detached.verify = function (msg, sig, publicKey) {
        checkArrayTypes(msg, sig, publicKey)
        if (sig.length !== crypto_sign_BYTES) throw new Error("bad signature size")
        if (publicKey.length !== crypto_sign_PUBLICKEYBYTES) throw new Error("bad public key size")
        var sm = new Uint8Array(crypto_sign_BYTES + msg.length)
        var m = new Uint8Array(crypto_sign_BYTES + msg.length)
        var i
        for (i = 0; i < crypto_sign_BYTES; i++) sm[i] = sig[i]
        for (i = 0; i < msg.length; i++) sm[i + crypto_sign_BYTES] = msg[i]
        return crypto_sign_open(m, sm, sm.length, publicKey) >= 0
      }
      nacl.sign.keyPair = function () {
        var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES)
        var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES)
        crypto_sign_keypair(pk, sk)
        return { publicKey: pk, secretKey: sk }
      }
      nacl.sign.keyPair.fromSecretKey = function (secretKey) {
        checkArrayTypes(secretKey)
        if (secretKey.length !== crypto_sign_SECRETKEYBYTES) throw new Error("bad secret key size")
        var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES)
        for (var i = 0; i < pk.length; i++) pk[i] = secretKey[32 + i]
        return { publicKey: pk, secretKey: new Uint8Array(secretKey) }
      }
      nacl.sign.keyPair.fromSeed = function (seed) {
        checkArrayTypes(seed)
        if (seed.length !== crypto_sign_SEEDBYTES) throw new Error("bad seed size")
        var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES)
        var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES)
        for (var i = 0; i < 32; i++) sk[i] = seed[i]
        crypto_sign_keypair(pk, sk, true)
        return { publicKey: pk, secretKey: sk }
      }
      nacl.sign.publicKeyLength = crypto_sign_PUBLICKEYBYTES
      nacl.sign.secretKeyLength = crypto_sign_SECRETKEYBYTES
      nacl.sign.seedLength = crypto_sign_SEEDBYTES
      nacl.sign.signatureLength = crypto_sign_BYTES
      nacl.hash = function (msg) {
        checkArrayTypes(msg)
        var h = new Uint8Array(crypto_hash_BYTES)
        crypto_hash(h, msg, msg.length)
        return h
      }
      nacl.hash.hashLength = crypto_hash_BYTES
      nacl.verify = function (x, y) {
        checkArrayTypes(x, y)
        if (x.length === 0 || y.length === 0) return false
        if (x.length !== y.length) return false
        return vn(x, 0, y, 0, x.length) === 0 ? true : false
      }
      nacl.setPRNG = function (fn) {
        randombytes = fn
      }
      ;(function () {
        var crypto = typeof self !== "undefined" ? self.crypto || self.msCrypto : null
        if (crypto && crypto.getRandomValues) {
          var QUOTA = 65536
          nacl.setPRNG(function (x, n) {
            var i,
              v = new Uint8Array(n)
            for (i = 0; i < n; i += QUOTA) {
              crypto.getRandomValues(v.subarray(i, i + Math.min(n - i, QUOTA)))
            }
            for (i = 0; i < n; i++) x[i] = v[i]
            cleanup(v)
          })
        } else if (typeof commonjsRequire !== "undefined") {
          crypto = require$$0
          if (crypto && crypto.randomBytes) {
            nacl.setPRNG(function (x, n) {
              var i,
                v = crypto.randomBytes(n)
              for (i = 0; i < n; i++) x[i] = v[i]
              cleanup(v)
            })
          }
        }
      })()
    })(module.exports ? module.exports : (self.nacl = self.nacl || {}))
  })
  var global$1 =
    typeof global !== "undefined"
      ? global
      : typeof self !== "undefined"
      ? self
      : typeof window !== "undefined"
      ? window
      : {}
  var lookup = []
  var revLookup = []
  var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array
  var inited = false
  function init() {
    inited = true
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
    for (var i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i]
      revLookup[code.charCodeAt(i)] = i
    }
    revLookup["-".charCodeAt(0)] = 62
    revLookup["_".charCodeAt(0)] = 63
  }
  function toByteArray(b64) {
    if (!inited) {
      init()
    }
    var i, j, l, tmp, placeHolders, arr
    var len = b64.length
    if (len % 4 > 0) {
      throw new Error("Invalid string. Length must be a multiple of 4")
    }
    placeHolders = b64[len - 2] === "=" ? 2 : b64[len - 1] === "=" ? 1 : 0
    arr = new Arr((len * 3) / 4 - placeHolders)
    l = placeHolders > 0 ? len - 4 : len
    var L = 0
    for (i = 0, j = 0; i < l; i += 4, j += 3) {
      tmp =
        (revLookup[b64.charCodeAt(i)] << 18) |
        (revLookup[b64.charCodeAt(i + 1)] << 12) |
        (revLookup[b64.charCodeAt(i + 2)] << 6) |
        revLookup[b64.charCodeAt(i + 3)]
      arr[L++] = (tmp >> 16) & 255
      arr[L++] = (tmp >> 8) & 255
      arr[L++] = tmp & 255
    }
    if (placeHolders === 2) {
      tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
      arr[L++] = tmp & 255
    } else if (placeHolders === 1) {
      tmp =
        (revLookup[b64.charCodeAt(i)] << 10) |
        (revLookup[b64.charCodeAt(i + 1)] << 4) |
        (revLookup[b64.charCodeAt(i + 2)] >> 2)
      arr[L++] = (tmp >> 8) & 255
      arr[L++] = tmp & 255
    }
    return arr
  }
  function tripletToBase64(num) {
    return (
      lookup[(num >> 18) & 63] +
      lookup[(num >> 12) & 63] +
      lookup[(num >> 6) & 63] +
      lookup[num & 63]
    )
  }
  function encodeChunk(uint8, start, end) {
    var tmp
    var output = []
    for (var i = start; i < end; i += 3) {
      tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2]
      output.push(tripletToBase64(tmp))
    }
    return output.join("")
  }
  function fromByteArray(uint8) {
    if (!inited) {
      init()
    }
    var tmp
    var len = uint8.length
    var extraBytes = len % 3
    var output = ""
    var parts = []
    var maxChunkLength = 16383
    for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
      parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength))
    }
    if (extraBytes === 1) {
      tmp = uint8[len - 1]
      output += lookup[tmp >> 2]
      output += lookup[(tmp << 4) & 63]
      output += "=="
    } else if (extraBytes === 2) {
      tmp = (uint8[len - 2] << 8) + uint8[len - 1]
      output += lookup[tmp >> 10]
      output += lookup[(tmp >> 4) & 63]
      output += lookup[(tmp << 2) & 63]
      output += "="
    }
    parts.push(output)
    return parts.join("")
  }
  function read(buffer, offset, isLE, mLen, nBytes) {
    var e, m
    var eLen = nBytes * 8 - mLen - 1
    var eMax = (1 << eLen) - 1
    var eBias = eMax >> 1
    var nBits = -7
    var i = isLE ? nBytes - 1 : 0
    var d = isLE ? -1 : 1
    var s = buffer[offset + i]
    i += d
    e = s & ((1 << -nBits) - 1)
    s >>= -nBits
    nBits += eLen
    for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}
    m = e & ((1 << -nBits) - 1)
    e >>= -nBits
    nBits += mLen
    for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}
    if (e === 0) {
      e = 1 - eBias
    } else if (e === eMax) {
      return m ? NaN : (s ? -1 : 1) * Infinity
    } else {
      m = m + Math.pow(2, mLen)
      e = e - eBias
    }
    return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
  }
  function write(buffer, value, offset, isLE, mLen, nBytes) {
    var e, m, c
    var eLen = nBytes * 8 - mLen - 1
    var eMax = (1 << eLen) - 1
    var eBias = eMax >> 1
    var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0
    var i = isLE ? 0 : nBytes - 1
    var d = isLE ? 1 : -1
    var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0
    value = Math.abs(value)
    if (isNaN(value) || value === Infinity) {
      m = isNaN(value) ? 1 : 0
      e = eMax
    } else {
      e = Math.floor(Math.log(value) / Math.LN2)
      if (value * (c = Math.pow(2, -e)) < 1) {
        e--
        c *= 2
      }
      if (e + eBias >= 1) {
        value += rt / c
      } else {
        value += rt * Math.pow(2, 1 - eBias)
      }
      if (value * c >= 2) {
        e++
        c /= 2
      }
      if (e + eBias >= eMax) {
        m = 0
        e = eMax
      } else if (e + eBias >= 1) {
        m = (value * c - 1) * Math.pow(2, mLen)
        e = e + eBias
      } else {
        m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
        e = 0
      }
    }
    for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {}
    e = (e << mLen) | m
    eLen += mLen
    for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {}
    buffer[offset + i - d] |= s * 128
  }
  var toString = {}.toString
  var isArray =
    Array.isArray ||
    function (arr) {
      return toString.call(arr) == "[object Array]"
    }
  var INSPECT_MAX_BYTES = 50
  Buffer.TYPED_ARRAY_SUPPORT =
    global$1.TYPED_ARRAY_SUPPORT !== undefined ? global$1.TYPED_ARRAY_SUPPORT : true
  var _kMaxLength = kMaxLength()
  function kMaxLength() {
    return Buffer.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
  }
  function createBuffer(that, length) {
    if (kMaxLength() < length) {
      throw new RangeError("Invalid typed array length")
    }
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      that = new Uint8Array(length)
      that.__proto__ = Buffer.prototype
    } else {
      if (that === null) {
        that = new Buffer(length)
      }
      that.length = length
    }
    return that
  }
  function Buffer(arg, encodingOrOffset, length) {
    if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
      return new Buffer(arg, encodingOrOffset, length)
    }
    if (typeof arg === "number") {
      if (typeof encodingOrOffset === "string") {
        throw new Error("If encoding is specified then the first argument must be a string")
      }
      return allocUnsafe(this, arg)
    }
    return from(this, arg, encodingOrOffset, length)
  }
  Buffer.poolSize = 8192
  Buffer._augment = function (arr) {
    arr.__proto__ = Buffer.prototype
    return arr
  }
  function from(that, value, encodingOrOffset, length) {
    if (typeof value === "number") {
      throw new TypeError('"value" argument must not be a number')
    }
    if (typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer) {
      return fromArrayBuffer(that, value, encodingOrOffset, length)
    }
    if (typeof value === "string") {
      return fromString(that, value, encodingOrOffset)
    }
    return fromObject(that, value)
  }
  Buffer.from = function (value, encodingOrOffset, length) {
    return from(null, value, encodingOrOffset, length)
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    Buffer.prototype.__proto__ = Uint8Array.prototype
    Buffer.__proto__ = Uint8Array
  }
  function assertSize(size) {
    if (typeof size !== "number") {
      throw new TypeError('"size" argument must be a number')
    } else if (size < 0) {
      throw new RangeError('"size" argument must not be negative')
    }
  }
  function alloc(that, size, fill, encoding) {
    assertSize(size)
    if (size <= 0) {
      return createBuffer(that, size)
    }
    if (fill !== undefined) {
      return typeof encoding === "string"
        ? createBuffer(that, size).fill(fill, encoding)
        : createBuffer(that, size).fill(fill)
    }
    return createBuffer(that, size)
  }
  Buffer.alloc = function (size, fill, encoding) {
    return alloc(null, size, fill, encoding)
  }
  function allocUnsafe(that, size) {
    assertSize(size)
    that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
    if (!Buffer.TYPED_ARRAY_SUPPORT) {
      for (var i = 0; i < size; ++i) {
        that[i] = 0
      }
    }
    return that
  }
  Buffer.allocUnsafe = function (size) {
    return allocUnsafe(null, size)
  }
  Buffer.allocUnsafeSlow = function (size) {
    return allocUnsafe(null, size)
  }
  function fromString(that, string, encoding) {
    if (typeof encoding !== "string" || encoding === "") {
      encoding = "utf8"
    }
    if (!Buffer.isEncoding(encoding)) {
      throw new TypeError('"encoding" must be a valid string encoding')
    }
    var length = byteLength(string, encoding) | 0
    that = createBuffer(that, length)
    var actual = that.write(string, encoding)
    if (actual !== length) {
      that = that.slice(0, actual)
    }
    return that
  }
  function fromArrayLike(that, array) {
    var length = array.length < 0 ? 0 : checked(array.length) | 0
    that = createBuffer(that, length)
    for (var i = 0; i < length; i += 1) {
      that[i] = array[i] & 255
    }
    return that
  }
  function fromArrayBuffer(that, array, byteOffset, length) {
    array.byteLength
    if (byteOffset < 0 || array.byteLength < byteOffset) {
      throw new RangeError("'offset' is out of bounds")
    }
    if (array.byteLength < byteOffset + (length || 0)) {
      throw new RangeError("'length' is out of bounds")
    }
    if (byteOffset === undefined && length === undefined) {
      array = new Uint8Array(array)
    } else if (length === undefined) {
      array = new Uint8Array(array, byteOffset)
    } else {
      array = new Uint8Array(array, byteOffset, length)
    }
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      that = array
      that.__proto__ = Buffer.prototype
    } else {
      that = fromArrayLike(that, array)
    }
    return that
  }
  function fromObject(that, obj) {
    if (internalIsBuffer(obj)) {
      var len = checked(obj.length) | 0
      that = createBuffer(that, len)
      if (that.length === 0) {
        return that
      }
      obj.copy(that, 0, 0, len)
      return that
    }
    if (obj) {
      if (
        (typeof ArrayBuffer !== "undefined" && obj.buffer instanceof ArrayBuffer) ||
        "length" in obj
      ) {
        if (typeof obj.length !== "number" || isnan(obj.length)) {
          return createBuffer(that, 0)
        }
        return fromArrayLike(that, obj)
      }
      if (obj.type === "Buffer" && isArray(obj.data)) {
        return fromArrayLike(that, obj.data)
      }
    }
    throw new TypeError(
      "First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object."
    )
  }
  function checked(length) {
    if (length >= kMaxLength()) {
      throw new RangeError(
        "Attempt to allocate Buffer larger than maximum " +
          "size: 0x" +
          kMaxLength().toString(16) +
          " bytes"
      )
    }
    return length | 0
  }
  function SlowBuffer(length) {
    if (+length != length) {
      length = 0
    }
    return Buffer.alloc(+length)
  }
  Buffer.isBuffer = isBuffer
  function internalIsBuffer(b) {
    return !!(b != null && b._isBuffer)
  }
  Buffer.compare = function compare(a, b) {
    if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
      throw new TypeError("Arguments must be Buffers")
    }
    if (a === b) return 0
    var x = a.length
    var y = b.length
    for (var i = 0, len = Math.min(x, y); i < len; ++i) {
      if (a[i] !== b[i]) {
        x = a[i]
        y = b[i]
        break
      }
    }
    if (x < y) return -1
    if (y < x) return 1
    return 0
  }
  Buffer.isEncoding = function isEncoding(encoding) {
    switch (String(encoding).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return true
      default:
        return false
    }
  }
  Buffer.concat = function concat(list, length) {
    if (!isArray(list)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    if (list.length === 0) {
      return Buffer.alloc(0)
    }
    var i
    if (length === undefined) {
      length = 0
      for (i = 0; i < list.length; ++i) {
        length += list[i].length
      }
    }
    var buffer = Buffer.allocUnsafe(length)
    var pos = 0
    for (i = 0; i < list.length; ++i) {
      var buf = list[i]
      if (!internalIsBuffer(buf)) {
        throw new TypeError('"list" argument must be an Array of Buffers')
      }
      buf.copy(buffer, pos)
      pos += buf.length
    }
    return buffer
  }
  function byteLength(string, encoding) {
    if (internalIsBuffer(string)) {
      return string.length
    }
    if (
      typeof ArrayBuffer !== "undefined" &&
      typeof ArrayBuffer.isView === "function" &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)
    ) {
      return string.byteLength
    }
    if (typeof string !== "string") {
      string = "" + string
    }
    var len = string.length
    if (len === 0) return 0
    var loweredCase = false
    for (;;) {
      switch (encoding) {
        case "ascii":
        case "latin1":
        case "binary":
          return len
        case "utf8":
        case "utf-8":
        case undefined:
          return utf8ToBytes(string).length
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return len * 2
        case "hex":
          return len >>> 1
        case "base64":
          return base64ToBytes(string).length
        default:
          if (loweredCase) return utf8ToBytes(string).length
          encoding = ("" + encoding).toLowerCase()
          loweredCase = true
      }
    }
  }
  Buffer.byteLength = byteLength
  function slowToString(encoding, start, end) {
    var loweredCase = false
    if (start === undefined || start < 0) {
      start = 0
    }
    if (start > this.length) {
      return ""
    }
    if (end === undefined || end > this.length) {
      end = this.length
    }
    if (end <= 0) {
      return ""
    }
    end >>>= 0
    start >>>= 0
    if (end <= start) {
      return ""
    }
    if (!encoding) encoding = "utf8"
    while (true) {
      switch (encoding) {
        case "hex":
          return hexSlice(this, start, end)
        case "utf8":
        case "utf-8":
          return utf8Slice(this, start, end)
        case "ascii":
          return asciiSlice(this, start, end)
        case "latin1":
        case "binary":
          return latin1Slice(this, start, end)
        case "base64":
          return base64Slice(this, start, end)
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return utf16leSlice(this, start, end)
        default:
          if (loweredCase) throw new TypeError("Unknown encoding: " + encoding)
          encoding = (encoding + "").toLowerCase()
          loweredCase = true
      }
    }
  }
  Buffer.prototype._isBuffer = true
  function swap(b, n, m) {
    var i = b[n]
    b[n] = b[m]
    b[m] = i
  }
  Buffer.prototype.swap16 = function swap16() {
    var len = this.length
    if (len % 2 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 16-bits")
    }
    for (var i = 0; i < len; i += 2) {
      swap(this, i, i + 1)
    }
    return this
  }
  Buffer.prototype.swap32 = function swap32() {
    var len = this.length
    if (len % 4 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 32-bits")
    }
    for (var i = 0; i < len; i += 4) {
      swap(this, i, i + 3)
      swap(this, i + 1, i + 2)
    }
    return this
  }
  Buffer.prototype.swap64 = function swap64() {
    var len = this.length
    if (len % 8 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 64-bits")
    }
    for (var i = 0; i < len; i += 8) {
      swap(this, i, i + 7)
      swap(this, i + 1, i + 6)
      swap(this, i + 2, i + 5)
      swap(this, i + 3, i + 4)
    }
    return this
  }
  Buffer.prototype.toString = function toString() {
    var length = this.length | 0
    if (length === 0) return ""
    if (arguments.length === 0) return utf8Slice(this, 0, length)
    return slowToString.apply(this, arguments)
  }
  Buffer.prototype.equals = function equals(b) {
    if (!internalIsBuffer(b)) throw new TypeError("Argument must be a Buffer")
    if (this === b) return true
    return Buffer.compare(this, b) === 0
  }
  Buffer.prototype.inspect = function inspect() {
    var str = ""
    var max = INSPECT_MAX_BYTES
    if (this.length > 0) {
      str = this.toString("hex", 0, max).match(/.{2}/g).join(" ")
      if (this.length > max) str += " ... "
    }
    return "<Buffer " + str + ">"
  }
  Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
    if (!internalIsBuffer(target)) {
      throw new TypeError("Argument must be a Buffer")
    }
    if (start === undefined) {
      start = 0
    }
    if (end === undefined) {
      end = target ? target.length : 0
    }
    if (thisStart === undefined) {
      thisStart = 0
    }
    if (thisEnd === undefined) {
      thisEnd = this.length
    }
    if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
      throw new RangeError("out of range index")
    }
    if (thisStart >= thisEnd && start >= end) {
      return 0
    }
    if (thisStart >= thisEnd) {
      return -1
    }
    if (start >= end) {
      return 1
    }
    start >>>= 0
    end >>>= 0
    thisStart >>>= 0
    thisEnd >>>= 0
    if (this === target) return 0
    var x = thisEnd - thisStart
    var y = end - start
    var len = Math.min(x, y)
    var thisCopy = this.slice(thisStart, thisEnd)
    var targetCopy = target.slice(start, end)
    for (var i = 0; i < len; ++i) {
      if (thisCopy[i] !== targetCopy[i]) {
        x = thisCopy[i]
        y = targetCopy[i]
        break
      }
    }
    if (x < y) return -1
    if (y < x) return 1
    return 0
  }
  function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
    if (buffer.length === 0) return -1
    if (typeof byteOffset === "string") {
      encoding = byteOffset
      byteOffset = 0
    } else if (byteOffset > 2147483647) {
      byteOffset = 2147483647
    } else if (byteOffset < -2147483648) {
      byteOffset = -2147483648
    }
    byteOffset = +byteOffset
    if (isNaN(byteOffset)) {
      byteOffset = dir ? 0 : buffer.length - 1
    }
    if (byteOffset < 0) byteOffset = buffer.length + byteOffset
    if (byteOffset >= buffer.length) {
      if (dir) return -1
      else byteOffset = buffer.length - 1
    } else if (byteOffset < 0) {
      if (dir) byteOffset = 0
      else return -1
    }
    if (typeof val === "string") {
      val = Buffer.from(val, encoding)
    }
    if (internalIsBuffer(val)) {
      if (val.length === 0) {
        return -1
      }
      return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
    } else if (typeof val === "number") {
      val = val & 255
      if (Buffer.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === "function") {
        if (dir) {
          return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
        } else {
          return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
        }
      }
      return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
    }
    throw new TypeError("val must be string, number or Buffer")
  }
  function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
    var indexSize = 1
    var arrLength = arr.length
    var valLength = val.length
    if (encoding !== undefined) {
      encoding = String(encoding).toLowerCase()
      if (
        encoding === "ucs2" ||
        encoding === "ucs-2" ||
        encoding === "utf16le" ||
        encoding === "utf-16le"
      ) {
        if (arr.length < 2 || val.length < 2) {
          return -1
        }
        indexSize = 2
        arrLength /= 2
        valLength /= 2
        byteOffset /= 2
      }
    }
    function read(buf, i) {
      if (indexSize === 1) {
        return buf[i]
      } else {
        return buf.readUInt16BE(i * indexSize)
      }
    }
    var i
    if (dir) {
      var foundIndex = -1
      for (i = byteOffset; i < arrLength; i++) {
        if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
          if (foundIndex === -1) foundIndex = i
          if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
        } else {
          if (foundIndex !== -1) i -= i - foundIndex
          foundIndex = -1
        }
      }
    } else {
      if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
      for (i = byteOffset; i >= 0; i--) {
        var found = true
        for (var j = 0; j < valLength; j++) {
          if (read(arr, i + j) !== read(val, j)) {
            found = false
            break
          }
        }
        if (found) return i
      }
    }
    return -1
  }
  Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
    return this.indexOf(val, byteOffset, encoding) !== -1
  }
  Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
  }
  Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
  }
  function hexWrite(buf, string, offset, length) {
    offset = Number(offset) || 0
    var remaining = buf.length - offset
    if (!length) {
      length = remaining
    } else {
      length = Number(length)
      if (length > remaining) {
        length = remaining
      }
    }
    var strLen = string.length
    if (strLen % 2 !== 0) throw new TypeError("Invalid hex string")
    if (length > strLen / 2) {
      length = strLen / 2
    }
    for (var i = 0; i < length; ++i) {
      var parsed = parseInt(string.substr(i * 2, 2), 16)
      if (isNaN(parsed)) return i
      buf[offset + i] = parsed
    }
    return i
  }
  function utf8Write(buf, string, offset, length) {
    return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
  }
  function asciiWrite(buf, string, offset, length) {
    return blitBuffer(asciiToBytes(string), buf, offset, length)
  }
  function latin1Write(buf, string, offset, length) {
    return asciiWrite(buf, string, offset, length)
  }
  function base64Write(buf, string, offset, length) {
    return blitBuffer(base64ToBytes(string), buf, offset, length)
  }
  function ucs2Write(buf, string, offset, length) {
    return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
  }
  Buffer.prototype.write = function write(string, offset, length, encoding) {
    if (offset === undefined) {
      encoding = "utf8"
      length = this.length
      offset = 0
    } else if (length === undefined && typeof offset === "string") {
      encoding = offset
      length = this.length
      offset = 0
    } else if (isFinite(offset)) {
      offset = offset | 0
      if (isFinite(length)) {
        length = length | 0
        if (encoding === undefined) encoding = "utf8"
      } else {
        encoding = length
        length = undefined
      }
    } else {
      throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported")
    }
    var remaining = this.length - offset
    if (length === undefined || length > remaining) length = remaining
    if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
      throw new RangeError("Attempt to write outside buffer bounds")
    }
    if (!encoding) encoding = "utf8"
    var loweredCase = false
    for (;;) {
      switch (encoding) {
        case "hex":
          return hexWrite(this, string, offset, length)
        case "utf8":
        case "utf-8":
          return utf8Write(this, string, offset, length)
        case "ascii":
          return asciiWrite(this, string, offset, length)
        case "latin1":
        case "binary":
          return latin1Write(this, string, offset, length)
        case "base64":
          return base64Write(this, string, offset, length)
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ucs2Write(this, string, offset, length)
        default:
          if (loweredCase) throw new TypeError("Unknown encoding: " + encoding)
          encoding = ("" + encoding).toLowerCase()
          loweredCase = true
      }
    }
  }
  Buffer.prototype.toJSON = function toJSON() {
    return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) }
  }
  function base64Slice(buf, start, end) {
    if (start === 0 && end === buf.length) {
      return fromByteArray(buf)
    } else {
      return fromByteArray(buf.slice(start, end))
    }
  }
  function utf8Slice(buf, start, end) {
    end = Math.min(buf.length, end)
    var res = []
    var i = start
    while (i < end) {
      var firstByte = buf[i]
      var codePoint = null
      var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1
      if (i + bytesPerSequence <= end) {
        var secondByte, thirdByte, fourthByte, tempCodePoint
        switch (bytesPerSequence) {
          case 1:
            if (firstByte < 128) {
              codePoint = firstByte
            }
            break
          case 2:
            secondByte = buf[i + 1]
            if ((secondByte & 192) === 128) {
              tempCodePoint = ((firstByte & 31) << 6) | (secondByte & 63)
              if (tempCodePoint > 127) {
                codePoint = tempCodePoint
              }
            }
            break
          case 3:
            secondByte = buf[i + 1]
            thirdByte = buf[i + 2]
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
              tempCodePoint = ((firstByte & 15) << 12) | ((secondByte & 63) << 6) | (thirdByte & 63)
              if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                codePoint = tempCodePoint
              }
            }
            break
          case 4:
            secondByte = buf[i + 1]
            thirdByte = buf[i + 2]
            fourthByte = buf[i + 3]
            if (
              (secondByte & 192) === 128 &&
              (thirdByte & 192) === 128 &&
              (fourthByte & 192) === 128
            ) {
              tempCodePoint =
                ((firstByte & 15) << 18) |
                ((secondByte & 63) << 12) |
                ((thirdByte & 63) << 6) |
                (fourthByte & 63)
              if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                codePoint = tempCodePoint
              }
            }
        }
      }
      if (codePoint === null) {
        codePoint = 65533
        bytesPerSequence = 1
      } else if (codePoint > 65535) {
        codePoint -= 65536
        res.push(((codePoint >>> 10) & 1023) | 55296)
        codePoint = 56320 | (codePoint & 1023)
      }
      res.push(codePoint)
      i += bytesPerSequence
    }
    return decodeCodePointsArray(res)
  }
  var MAX_ARGUMENTS_LENGTH = 4096
  function decodeCodePointsArray(codePoints) {
    var len = codePoints.length
    if (len <= MAX_ARGUMENTS_LENGTH) {
      return String.fromCharCode.apply(String, codePoints)
    }
    var res = ""
    var i = 0
    while (i < len) {
      res += String.fromCharCode.apply(String, codePoints.slice(i, (i += MAX_ARGUMENTS_LENGTH)))
    }
    return res
  }
  function asciiSlice(buf, start, end) {
    var ret = ""
    end = Math.min(buf.length, end)
    for (var i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i] & 127)
    }
    return ret
  }
  function latin1Slice(buf, start, end) {
    var ret = ""
    end = Math.min(buf.length, end)
    for (var i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i])
    }
    return ret
  }
  function hexSlice(buf, start, end) {
    var len = buf.length
    if (!start || start < 0) start = 0
    if (!end || end < 0 || end > len) end = len
    var out = ""
    for (var i = start; i < end; ++i) {
      out += toHex(buf[i])
    }
    return out
  }
  function utf16leSlice(buf, start, end) {
    var bytes = buf.slice(start, end)
    var res = ""
    for (var i = 0; i < bytes.length; i += 2) {
      res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
    }
    return res
  }
  Buffer.prototype.slice = function slice(start, end) {
    var len = this.length
    start = ~~start
    end = end === undefined ? len : ~~end
    if (start < 0) {
      start += len
      if (start < 0) start = 0
    } else if (start > len) {
      start = len
    }
    if (end < 0) {
      end += len
      if (end < 0) end = 0
    } else if (end > len) {
      end = len
    }
    if (end < start) end = start
    var newBuf
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      newBuf = this.subarray(start, end)
      newBuf.__proto__ = Buffer.prototype
    } else {
      var sliceLen = end - start
      newBuf = new Buffer(sliceLen, undefined)
      for (var i = 0; i < sliceLen; ++i) {
        newBuf[i] = this[i + start]
      }
    }
    return newBuf
  }
  function checkOffset(offset, ext, length) {
    if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint")
    if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length")
  }
  Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
    offset = offset | 0
    byteLength = byteLength | 0
    if (!noAssert) checkOffset(offset, byteLength, this.length)
    var val = this[offset]
    var mul = 1
    var i = 0
    while (++i < byteLength && (mul *= 256)) {
      val += this[offset + i] * mul
    }
    return val
  }
  Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
    offset = offset | 0
    byteLength = byteLength | 0
    if (!noAssert) {
      checkOffset(offset, byteLength, this.length)
    }
    var val = this[offset + --byteLength]
    var mul = 1
    while (byteLength > 0 && (mul *= 256)) {
      val += this[offset + --byteLength] * mul
    }
    return val
  }
  Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 1, this.length)
    return this[offset]
  }
  Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length)
    return this[offset] | (this[offset + 1] << 8)
  }
  Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length)
    return (this[offset] << 8) | this[offset + 1]
  }
  Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length)
    return (
      (this[offset] | (this[offset + 1] << 8) | (this[offset + 2] << 16)) +
      this[offset + 3] * 16777216
    )
  }
  Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length)
    return (
      this[offset] * 16777216 +
      ((this[offset + 1] << 16) | (this[offset + 2] << 8) | this[offset + 3])
    )
  }
  Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
    offset = offset | 0
    byteLength = byteLength | 0
    if (!noAssert) checkOffset(offset, byteLength, this.length)
    var val = this[offset]
    var mul = 1
    var i = 0
    while (++i < byteLength && (mul *= 256)) {
      val += this[offset + i] * mul
    }
    mul *= 128
    if (val >= mul) val -= Math.pow(2, 8 * byteLength)
    return val
  }
  Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
    offset = offset | 0
    byteLength = byteLength | 0
    if (!noAssert) checkOffset(offset, byteLength, this.length)
    var i = byteLength
    var mul = 1
    var val = this[offset + --i]
    while (i > 0 && (mul *= 256)) {
      val += this[offset + --i] * mul
    }
    mul *= 128
    if (val >= mul) val -= Math.pow(2, 8 * byteLength)
    return val
  }
  Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 1, this.length)
    if (!(this[offset] & 128)) return this[offset]
    return (255 - this[offset] + 1) * -1
  }
  Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length)
    var val = this[offset] | (this[offset + 1] << 8)
    return val & 32768 ? val | 4294901760 : val
  }
  Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length)
    var val = this[offset + 1] | (this[offset] << 8)
    return val & 32768 ? val | 4294901760 : val
  }
  Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length)
    return (
      this[offset] | (this[offset + 1] << 8) | (this[offset + 2] << 16) | (this[offset + 3] << 24)
    )
  }
  Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length)
    return (
      (this[offset] << 24) | (this[offset + 1] << 16) | (this[offset + 2] << 8) | this[offset + 3]
    )
  }
  Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length)
    return read(this, offset, true, 23, 4)
  }
  Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length)
    return read(this, offset, false, 23, 4)
  }
  Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 8, this.length)
    return read(this, offset, true, 52, 8)
  }
  Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 8, this.length)
    return read(this, offset, false, 52, 8)
  }
  function checkInt(buf, value, offset, ext, max, min) {
    if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
    if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
    if (offset + ext > buf.length) throw new RangeError("Index out of range")
  }
  Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
    value = +value
    offset = offset | 0
    byteLength = byteLength | 0
    if (!noAssert) {
      var maxBytes = Math.pow(2, 8 * byteLength) - 1
      checkInt(this, value, offset, byteLength, maxBytes, 0)
    }
    var mul = 1
    var i = 0
    this[offset] = value & 255
    while (++i < byteLength && (mul *= 256)) {
      this[offset + i] = (value / mul) & 255
    }
    return offset + byteLength
  }
  Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
    value = +value
    offset = offset | 0
    byteLength = byteLength | 0
    if (!noAssert) {
      var maxBytes = Math.pow(2, 8 * byteLength) - 1
      checkInt(this, value, offset, byteLength, maxBytes, 0)
    }
    var i = byteLength - 1
    var mul = 1
    this[offset + i] = value & 255
    while (--i >= 0 && (mul *= 256)) {
      this[offset + i] = (value / mul) & 255
    }
    return offset + byteLength
  }
  Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
    value = +value
    offset = offset | 0
    if (!noAssert) checkInt(this, value, offset, 1, 255, 0)
    if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
    this[offset] = value & 255
    return offset + 1
  }
  function objectWriteUInt16(buf, value, offset, littleEndian) {
    if (value < 0) value = 65535 + value + 1
    for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
      buf[offset + i] =
        (value & (255 << (8 * (littleEndian ? i : 1 - i)))) >>> ((littleEndian ? i : 1 - i) * 8)
    }
  }
  Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
    value = +value
    offset = offset | 0
    if (!noAssert) checkInt(this, value, offset, 2, 65535, 0)
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = value & 255
      this[offset + 1] = value >>> 8
    } else {
      objectWriteUInt16(this, value, offset, true)
    }
    return offset + 2
  }
  Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
    value = +value
    offset = offset | 0
    if (!noAssert) checkInt(this, value, offset, 2, 65535, 0)
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = value >>> 8
      this[offset + 1] = value & 255
    } else {
      objectWriteUInt16(this, value, offset, false)
    }
    return offset + 2
  }
  function objectWriteUInt32(buf, value, offset, littleEndian) {
    if (value < 0) value = 4294967295 + value + 1
    for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
      buf[offset + i] = (value >>> ((littleEndian ? i : 3 - i) * 8)) & 255
    }
  }
  Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
    value = +value
    offset = offset | 0
    if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0)
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset + 3] = value >>> 24
      this[offset + 2] = value >>> 16
      this[offset + 1] = value >>> 8
      this[offset] = value & 255
    } else {
      objectWriteUInt32(this, value, offset, true)
    }
    return offset + 4
  }
  Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
    value = +value
    offset = offset | 0
    if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0)
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = value >>> 24
      this[offset + 1] = value >>> 16
      this[offset + 2] = value >>> 8
      this[offset + 3] = value & 255
    } else {
      objectWriteUInt32(this, value, offset, false)
    }
    return offset + 4
  }
  Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
    value = +value
    offset = offset | 0
    if (!noAssert) {
      var limit = Math.pow(2, 8 * byteLength - 1)
      checkInt(this, value, offset, byteLength, limit - 1, -limit)
    }
    var i = 0
    var mul = 1
    var sub = 0
    this[offset] = value & 255
    while (++i < byteLength && (mul *= 256)) {
      if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
        sub = 1
      }
      this[offset + i] = (((value / mul) >> 0) - sub) & 255
    }
    return offset + byteLength
  }
  Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
    value = +value
    offset = offset | 0
    if (!noAssert) {
      var limit = Math.pow(2, 8 * byteLength - 1)
      checkInt(this, value, offset, byteLength, limit - 1, -limit)
    }
    var i = byteLength - 1
    var mul = 1
    var sub = 0
    this[offset + i] = value & 255
    while (--i >= 0 && (mul *= 256)) {
      if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
        sub = 1
      }
      this[offset + i] = (((value / mul) >> 0) - sub) & 255
    }
    return offset + byteLength
  }
  Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
    value = +value
    offset = offset | 0
    if (!noAssert) checkInt(this, value, offset, 1, 127, -128)
    if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
    if (value < 0) value = 255 + value + 1
    this[offset] = value & 255
    return offset + 1
  }
  Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
    value = +value
    offset = offset | 0
    if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768)
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = value & 255
      this[offset + 1] = value >>> 8
    } else {
      objectWriteUInt16(this, value, offset, true)
    }
    return offset + 2
  }
  Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
    value = +value
    offset = offset | 0
    if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768)
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = value >>> 8
      this[offset + 1] = value & 255
    } else {
      objectWriteUInt16(this, value, offset, false)
    }
    return offset + 2
  }
  Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
    value = +value
    offset = offset | 0
    if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648)
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = value & 255
      this[offset + 1] = value >>> 8
      this[offset + 2] = value >>> 16
      this[offset + 3] = value >>> 24
    } else {
      objectWriteUInt32(this, value, offset, true)
    }
    return offset + 4
  }
  Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
    value = +value
    offset = offset | 0
    if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648)
    if (value < 0) value = 4294967295 + value + 1
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = value >>> 24
      this[offset + 1] = value >>> 16
      this[offset + 2] = value >>> 8
      this[offset + 3] = value & 255
    } else {
      objectWriteUInt32(this, value, offset, false)
    }
    return offset + 4
  }
  function checkIEEE754(buf, value, offset, ext, max, min) {
    if (offset + ext > buf.length) throw new RangeError("Index out of range")
    if (offset < 0) throw new RangeError("Index out of range")
  }
  function writeFloat(buf, value, offset, littleEndian, noAssert) {
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 4)
    }
    write(buf, value, offset, littleEndian, 23, 4)
    return offset + 4
  }
  Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
    return writeFloat(this, value, offset, true, noAssert)
  }
  Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
    return writeFloat(this, value, offset, false, noAssert)
  }
  function writeDouble(buf, value, offset, littleEndian, noAssert) {
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 8)
    }
    write(buf, value, offset, littleEndian, 52, 8)
    return offset + 8
  }
  Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
    return writeDouble(this, value, offset, true, noAssert)
  }
  Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
    return writeDouble(this, value, offset, false, noAssert)
  }
  Buffer.prototype.copy = function copy(target, targetStart, start, end) {
    if (!start) start = 0
    if (!end && end !== 0) end = this.length
    if (targetStart >= target.length) targetStart = target.length
    if (!targetStart) targetStart = 0
    if (end > 0 && end < start) end = start
    if (end === start) return 0
    if (target.length === 0 || this.length === 0) return 0
    if (targetStart < 0) {
      throw new RangeError("targetStart out of bounds")
    }
    if (start < 0 || start >= this.length) throw new RangeError("sourceStart out of bounds")
    if (end < 0) throw new RangeError("sourceEnd out of bounds")
    if (end > this.length) end = this.length
    if (target.length - targetStart < end - start) {
      end = target.length - targetStart + start
    }
    var len = end - start
    var i
    if (this === target && start < targetStart && targetStart < end) {
      for (i = len - 1; i >= 0; --i) {
        target[i + targetStart] = this[i + start]
      }
    } else if (len < 1e3 || !Buffer.TYPED_ARRAY_SUPPORT) {
      for (i = 0; i < len; ++i) {
        target[i + targetStart] = this[i + start]
      }
    } else {
      Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart)
    }
    return len
  }
  Buffer.prototype.fill = function fill(val, start, end, encoding) {
    if (typeof val === "string") {
      if (typeof start === "string") {
        encoding = start
        start = 0
        end = this.length
      } else if (typeof end === "string") {
        encoding = end
        end = this.length
      }
      if (val.length === 1) {
        var code = val.charCodeAt(0)
        if (code < 256) {
          val = code
        }
      }
      if (encoding !== undefined && typeof encoding !== "string") {
        throw new TypeError("encoding must be a string")
      }
      if (typeof encoding === "string" && !Buffer.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding)
      }
    } else if (typeof val === "number") {
      val = val & 255
    }
    if (start < 0 || this.length < start || this.length < end) {
      throw new RangeError("Out of range index")
    }
    if (end <= start) {
      return this
    }
    start = start >>> 0
    end = end === undefined ? this.length : end >>> 0
    if (!val) val = 0
    var i
    if (typeof val === "number") {
      for (i = start; i < end; ++i) {
        this[i] = val
      }
    } else {
      var bytes = internalIsBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString())
      var len = bytes.length
      for (i = 0; i < end - start; ++i) {
        this[i + start] = bytes[i % len]
      }
    }
    return this
  }
  var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g
  function base64clean(str) {
    str = stringtrim(str).replace(INVALID_BASE64_RE, "")
    if (str.length < 2) return ""
    while (str.length % 4 !== 0) {
      str = str + "="
    }
    return str
  }
  function stringtrim(str) {
    if (str.trim) return str.trim()
    return str.replace(/^\s+|\s+$/g, "")
  }
  function toHex(n) {
    if (n < 16) return "0" + n.toString(16)
    return n.toString(16)
  }
  function utf8ToBytes(string, units) {
    units = units || Infinity
    var codePoint
    var length = string.length
    var leadSurrogate = null
    var bytes = []
    for (var i = 0; i < length; ++i) {
      codePoint = string.charCodeAt(i)
      if (codePoint > 55295 && codePoint < 57344) {
        if (!leadSurrogate) {
          if (codePoint > 56319) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189)
            continue
          } else if (i + 1 === length) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189)
            continue
          }
          leadSurrogate = codePoint
          continue
        }
        if (codePoint < 56320) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189)
          leadSurrogate = codePoint
          continue
        }
        codePoint = (((leadSurrogate - 55296) << 10) | (codePoint - 56320)) + 65536
      } else if (leadSurrogate) {
        if ((units -= 3) > -1) bytes.push(239, 191, 189)
      }
      leadSurrogate = null
      if (codePoint < 128) {
        if ((units -= 1) < 0) break
        bytes.push(codePoint)
      } else if (codePoint < 2048) {
        if ((units -= 2) < 0) break
        bytes.push((codePoint >> 6) | 192, (codePoint & 63) | 128)
      } else if (codePoint < 65536) {
        if ((units -= 3) < 0) break
        bytes.push((codePoint >> 12) | 224, ((codePoint >> 6) & 63) | 128, (codePoint & 63) | 128)
      } else if (codePoint < 1114112) {
        if ((units -= 4) < 0) break
        bytes.push(
          (codePoint >> 18) | 240,
          ((codePoint >> 12) & 63) | 128,
          ((codePoint >> 6) & 63) | 128,
          (codePoint & 63) | 128
        )
      } else {
        throw new Error("Invalid code point")
      }
    }
    return bytes
  }
  function asciiToBytes(str) {
    var byteArray = []
    for (var i = 0; i < str.length; ++i) {
      byteArray.push(str.charCodeAt(i) & 255)
    }
    return byteArray
  }
  function utf16leToBytes(str, units) {
    var c, hi, lo
    var byteArray = []
    for (var i = 0; i < str.length; ++i) {
      if ((units -= 2) < 0) break
      c = str.charCodeAt(i)
      hi = c >> 8
      lo = c % 256
      byteArray.push(lo)
      byteArray.push(hi)
    }
    return byteArray
  }
  function base64ToBytes(str) {
    return toByteArray(base64clean(str))
  }
  function blitBuffer(src, dst, offset, length) {
    for (var i = 0; i < length; ++i) {
      if (i + offset >= dst.length || i >= src.length) break
      dst[i + offset] = src[i]
    }
    return i
  }
  function isnan(val) {
    return val !== val
  }
  function isBuffer(obj) {
    return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj))
  }
  function isFastBuffer(obj) {
    return (
      !!obj.constructor &&
      typeof obj.constructor.isBuffer === "function" &&
      obj.constructor.isBuffer(obj)
    )
  }
  function isSlowBuffer(obj) {
    return (
      typeof obj.readFloatLE === "function" &&
      typeof obj.slice === "function" &&
      isFastBuffer(obj.slice(0, 0))
    )
  }
  var bufferEs6 = Object.freeze({
    __proto__: null,
    INSPECT_MAX_BYTES: INSPECT_MAX_BYTES,
    kMaxLength: _kMaxLength,
    Buffer: Buffer,
    SlowBuffer: SlowBuffer,
    isBuffer: isBuffer,
  })
  var toBuffer = function toBuffer(arr) {
    if (arr instanceof Buffer) {
      return arr
    } else if (arr instanceof Uint8Array) {
      return Buffer.from(arr.buffer, arr.byteOffset, arr.byteLength)
    } else {
      return Buffer.from(arr)
    }
  }
  var runtime_1 = createCommonjsModule(function (module) {
    var runtime = (function (exports) {
      var Op = Object.prototype
      var hasOwn = Op.hasOwnProperty
      var undefined$1
      var $Symbol = typeof Symbol === "function" ? Symbol : {}
      var iteratorSymbol = $Symbol.iterator || "@@iterator"
      var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator"
      var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"
      function define(obj, key, value) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true,
        })
        return obj[key]
      }
      try {
        define({}, "")
      } catch (err) {
        define = function (obj, key, value) {
          return (obj[key] = value)
        }
      }
      function wrap(innerFn, outerFn, self, tryLocsList) {
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator
        var generator = Object.create(protoGenerator.prototype)
        var context = new Context(tryLocsList || [])
        generator._invoke = makeInvokeMethod(innerFn, self, context)
        return generator
      }
      exports.wrap = wrap
      function tryCatch(fn, obj, arg) {
        try {
          return { type: "normal", arg: fn.call(obj, arg) }
        } catch (err) {
          return { type: "throw", arg: err }
        }
      }
      var GenStateSuspendedStart = "suspendedStart"
      var GenStateSuspendedYield = "suspendedYield"
      var GenStateExecuting = "executing"
      var GenStateCompleted = "completed"
      var ContinueSentinel = {}
      function Generator() {}
      function GeneratorFunction() {}
      function GeneratorFunctionPrototype() {}
      var IteratorPrototype = {}
      IteratorPrototype[iteratorSymbol] = function () {
        return this
      }
      var getProto = Object.getPrototypeOf
      var NativeIteratorPrototype = getProto && getProto(getProto(values([])))
      if (
        NativeIteratorPrototype &&
        NativeIteratorPrototype !== Op &&
        hasOwn.call(NativeIteratorPrototype, iteratorSymbol)
      ) {
        IteratorPrototype = NativeIteratorPrototype
      }
      var Gp = (GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(
        IteratorPrototype
      ))
      GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype
      GeneratorFunctionPrototype.constructor = GeneratorFunction
      GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction")
      function defineIteratorMethods(prototype) {
        ;["next", "throw", "return"].forEach(function (method) {
          define(prototype, method, function (arg) {
            return this._invoke(method, arg)
          })
        })
      }
      exports.isGeneratorFunction = function (genFun) {
        var ctor = typeof genFun === "function" && genFun.constructor
        return ctor
          ? ctor === GeneratorFunction || (ctor.displayName || ctor.name) === "GeneratorFunction"
          : false
      }
      exports.mark = function (genFun) {
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(genFun, GeneratorFunctionPrototype)
        } else {
          genFun.__proto__ = GeneratorFunctionPrototype
          define(genFun, toStringTagSymbol, "GeneratorFunction")
        }
        genFun.prototype = Object.create(Gp)
        return genFun
      }
      exports.awrap = function (arg) {
        return { __await: arg }
      }
      function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
          var record = tryCatch(generator[method], generator, arg)
          if (record.type === "throw") {
            reject(record.arg)
          } else {
            var result = record.arg
            var value = result.value
            if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
              return PromiseImpl.resolve(value.__await).then(
                function (value) {
                  invoke("next", value, resolve, reject)
                },
                function (err) {
                  invoke("throw", err, resolve, reject)
                }
              )
            }
            return PromiseImpl.resolve(value).then(
              function (unwrapped) {
                result.value = unwrapped
                resolve(result)
              },
              function (error) {
                return invoke("throw", error, resolve, reject)
              }
            )
          }
        }
        var previousPromise
        function enqueue(method, arg) {
          function callInvokeWithMethodAndArg() {
            return new PromiseImpl(function (resolve, reject) {
              invoke(method, arg, resolve, reject)
            })
          }
          return (previousPromise = previousPromise
            ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg)
            : callInvokeWithMethodAndArg())
        }
        this._invoke = enqueue
      }
      defineIteratorMethods(AsyncIterator.prototype)
      AsyncIterator.prototype[asyncIteratorSymbol] = function () {
        return this
      }
      exports.AsyncIterator = AsyncIterator
      exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        if (PromiseImpl === void 0) PromiseImpl = Promise
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl)
        return exports.isGeneratorFunction(outerFn)
          ? iter
          : iter.next().then(function (result) {
              return result.done ? result.value : iter.next()
            })
      }
      function makeInvokeMethod(innerFn, self, context) {
        var state = GenStateSuspendedStart
        return function invoke(method, arg) {
          if (state === GenStateExecuting) {
            throw new Error("Generator is already running")
          }
          if (state === GenStateCompleted) {
            if (method === "throw") {
              throw arg
            }
            return doneResult()
          }
          context.method = method
          context.arg = arg
          while (true) {
            var delegate = context.delegate
            if (delegate) {
              var delegateResult = maybeInvokeDelegate(delegate, context)
              if (delegateResult) {
                if (delegateResult === ContinueSentinel) continue
                return delegateResult
              }
            }
            if (context.method === "next") {
              context.sent = context._sent = context.arg
            } else if (context.method === "throw") {
              if (state === GenStateSuspendedStart) {
                state = GenStateCompleted
                throw context.arg
              }
              context.dispatchException(context.arg)
            } else if (context.method === "return") {
              context.abrupt("return", context.arg)
            }
            state = GenStateExecuting
            var record = tryCatch(innerFn, self, context)
            if (record.type === "normal") {
              state = context.done ? GenStateCompleted : GenStateSuspendedYield
              if (record.arg === ContinueSentinel) {
                continue
              }
              return { value: record.arg, done: context.done }
            } else if (record.type === "throw") {
              state = GenStateCompleted
              context.method = "throw"
              context.arg = record.arg
            }
          }
        }
      }
      function maybeInvokeDelegate(delegate, context) {
        var method = delegate.iterator[context.method]
        if (method === undefined$1) {
          context.delegate = null
          if (context.method === "throw") {
            if (delegate.iterator["return"]) {
              context.method = "return"
              context.arg = undefined$1
              maybeInvokeDelegate(delegate, context)
              if (context.method === "throw") {
                return ContinueSentinel
              }
            }
            context.method = "throw"
            context.arg = new TypeError("The iterator does not provide a 'throw' method")
          }
          return ContinueSentinel
        }
        var record = tryCatch(method, delegate.iterator, context.arg)
        if (record.type === "throw") {
          context.method = "throw"
          context.arg = record.arg
          context.delegate = null
          return ContinueSentinel
        }
        var info = record.arg
        if (!info) {
          context.method = "throw"
          context.arg = new TypeError("iterator result is not an object")
          context.delegate = null
          return ContinueSentinel
        }
        if (info.done) {
          context[delegate.resultName] = info.value
          context.next = delegate.nextLoc
          if (context.method !== "return") {
            context.method = "next"
            context.arg = undefined$1
          }
        } else {
          return info
        }
        context.delegate = null
        return ContinueSentinel
      }
      defineIteratorMethods(Gp)
      define(Gp, toStringTagSymbol, "Generator")
      Gp[iteratorSymbol] = function () {
        return this
      }
      Gp.toString = function () {
        return "[object Generator]"
      }
      function pushTryEntry(locs) {
        var entry = { tryLoc: locs[0] }
        if (1 in locs) {
          entry.catchLoc = locs[1]
        }
        if (2 in locs) {
          entry.finallyLoc = locs[2]
          entry.afterLoc = locs[3]
        }
        this.tryEntries.push(entry)
      }
      function resetTryEntry(entry) {
        var record = entry.completion || {}
        record.type = "normal"
        delete record.arg
        entry.completion = record
      }
      function Context(tryLocsList) {
        this.tryEntries = [{ tryLoc: "root" }]
        tryLocsList.forEach(pushTryEntry, this)
        this.reset(true)
      }
      exports.keys = function (object) {
        var keys = []
        for (var key in object) {
          keys.push(key)
        }
        keys.reverse()
        return function next() {
          while (keys.length) {
            var key = keys.pop()
            if (key in object) {
              next.value = key
              next.done = false
              return next
            }
          }
          next.done = true
          return next
        }
      }
      function values(iterable) {
        if (iterable) {
          var iteratorMethod = iterable[iteratorSymbol]
          if (iteratorMethod) {
            return iteratorMethod.call(iterable)
          }
          if (typeof iterable.next === "function") {
            return iterable
          }
          if (!isNaN(iterable.length)) {
            var i = -1,
              next = function next() {
                while (++i < iterable.length) {
                  if (hasOwn.call(iterable, i)) {
                    next.value = iterable[i]
                    next.done = false
                    return next
                  }
                }
                next.value = undefined$1
                next.done = true
                return next
              }
            return (next.next = next)
          }
        }
        return { next: doneResult }
      }
      exports.values = values
      function doneResult() {
        return { value: undefined$1, done: true }
      }
      Context.prototype = {
        constructor: Context,
        reset: function (skipTempReset) {
          this.prev = 0
          this.next = 0
          this.sent = this._sent = undefined$1
          this.done = false
          this.delegate = null
          this.method = "next"
          this.arg = undefined$1
          this.tryEntries.forEach(resetTryEntry)
          if (!skipTempReset) {
            for (var name in this) {
              if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
                this[name] = undefined$1
              }
            }
          }
        },
        stop: function () {
          this.done = true
          var rootEntry = this.tryEntries[0]
          var rootRecord = rootEntry.completion
          if (rootRecord.type === "throw") {
            throw rootRecord.arg
          }
          return this.rval
        },
        dispatchException: function (exception) {
          if (this.done) {
            throw exception
          }
          var context = this
          function handle(loc, caught) {
            record.type = "throw"
            record.arg = exception
            context.next = loc
            if (caught) {
              context.method = "next"
              context.arg = undefined$1
            }
            return !!caught
          }
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i]
            var record = entry.completion
            if (entry.tryLoc === "root") {
              return handle("end")
            }
            if (entry.tryLoc <= this.prev) {
              var hasCatch = hasOwn.call(entry, "catchLoc")
              var hasFinally = hasOwn.call(entry, "finallyLoc")
              if (hasCatch && hasFinally) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true)
                } else if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc)
                }
              } else if (hasCatch) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true)
                }
              } else if (hasFinally) {
                if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc)
                }
              } else {
                throw new Error("try statement without catch or finally")
              }
            }
          }
        },
        abrupt: function (type, arg) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i]
            if (
              entry.tryLoc <= this.prev &&
              hasOwn.call(entry, "finallyLoc") &&
              this.prev < entry.finallyLoc
            ) {
              var finallyEntry = entry
              break
            }
          }
          if (
            finallyEntry &&
            (type === "break" || type === "continue") &&
            finallyEntry.tryLoc <= arg &&
            arg <= finallyEntry.finallyLoc
          ) {
            finallyEntry = null
          }
          var record = finallyEntry ? finallyEntry.completion : {}
          record.type = type
          record.arg = arg
          if (finallyEntry) {
            this.method = "next"
            this.next = finallyEntry.finallyLoc
            return ContinueSentinel
          }
          return this.complete(record)
        },
        complete: function (record, afterLoc) {
          if (record.type === "throw") {
            throw record.arg
          }
          if (record.type === "break" || record.type === "continue") {
            this.next = record.arg
          } else if (record.type === "return") {
            this.rval = this.arg = record.arg
            this.method = "return"
            this.next = "end"
          } else if (record.type === "normal" && afterLoc) {
            this.next = afterLoc
          }
          return ContinueSentinel
        },
        finish: function (finallyLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i]
            if (entry.finallyLoc === finallyLoc) {
              this.complete(entry.completion, entry.afterLoc)
              resetTryEntry(entry)
              return ContinueSentinel
            }
          }
        },
        catch: function (tryLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i]
            if (entry.tryLoc === tryLoc) {
              var record = entry.completion
              if (record.type === "throw") {
                var thrown = record.arg
                resetTryEntry(entry)
              }
              return thrown
            }
          }
          throw new Error("illegal catch attempt")
        },
        delegateYield: function (iterable, resultName, nextLoc) {
          this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }
          if (this.method === "next") {
            this.arg = undefined$1
          }
          return ContinueSentinel
        },
      }
      return exports
    })(module.exports)
    try {
      regeneratorRuntime = runtime
    } catch (accidentalStrictMode) {
      Function("r", "regeneratorRuntime = r")(runtime)
    }
  })
  var regenerator = runtime_1
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg)
      var value = info.value
    } catch (error) {
      reject(error)
      return
    }
    if (info.done) {
      resolve(value)
    } else {
      Promise.resolve(value).then(_next, _throw)
    }
  }
  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
        args = arguments
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args)
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value)
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err)
        }
        _next(undefined)
      })
    }
  }
  var asyncToGenerator = _asyncToGenerator
  var bn = createCommonjsModule(function (module) {
    ;(function (module, exports) {
      function assert(val, msg) {
        if (!val) throw new Error(msg || "Assertion failed")
      }
      function inherits(ctor, superCtor) {
        ctor.super_ = superCtor
        var TempCtor = function () {}
        TempCtor.prototype = superCtor.prototype
        ctor.prototype = new TempCtor()
        ctor.prototype.constructor = ctor
      }
      function BN(number, base, endian) {
        if (BN.isBN(number)) {
          return number
        }
        this.negative = 0
        this.words = null
        this.length = 0
        this.red = null
        if (number !== null) {
          if (base === "le" || base === "be") {
            endian = base
            base = 10
          }
          this._init(number || 0, base || 10, endian || "be")
        }
      }
      if (typeof module === "object") {
        module.exports = BN
      } else {
        exports.BN = BN
      }
      BN.BN = BN
      BN.wordSize = 26
      var Buffer
      try {
        Buffer = bufferEs6.Buffer
      } catch (e) {}
      BN.isBN = function isBN(num) {
        if (num instanceof BN) {
          return true
        }
        return (
          num !== null &&
          typeof num === "object" &&
          num.constructor.wordSize === BN.wordSize &&
          Array.isArray(num.words)
        )
      }
      BN.max = function max(left, right) {
        if (left.cmp(right) > 0) return left
        return right
      }
      BN.min = function min(left, right) {
        if (left.cmp(right) < 0) return left
        return right
      }
      BN.prototype._init = function init(number, base, endian) {
        if (typeof number === "number") {
          return this._initNumber(number, base, endian)
        }
        if (typeof number === "object") {
          return this._initArray(number, base, endian)
        }
        if (base === "hex") {
          base = 16
        }
        assert(base === (base | 0) && base >= 2 && base <= 36)
        number = number.toString().replace(/\s+/g, "")
        var start = 0
        if (number[0] === "-") {
          start++
        }
        if (base === 16) {
          this._parseHex(number, start)
        } else {
          this._parseBase(number, base, start)
        }
        if (number[0] === "-") {
          this.negative = 1
        }
        this._strip()
        if (endian !== "le") return
        this._initArray(this.toArray(), base, endian)
      }
      BN.prototype._initNumber = function _initNumber(number, base, endian) {
        if (number < 0) {
          this.negative = 1
          number = -number
        }
        if (number < 67108864) {
          this.words = [number & 67108863]
          this.length = 1
        } else if (number < 4503599627370496) {
          this.words = [number & 67108863, (number / 67108864) & 67108863]
          this.length = 2
        } else {
          assert(number < 9007199254740992)
          this.words = [number & 67108863, (number / 67108864) & 67108863, 1]
          this.length = 3
        }
        if (endian !== "le") return
        this._initArray(this.toArray(), base, endian)
      }
      BN.prototype._initArray = function _initArray(number, base, endian) {
        assert(typeof number.length === "number")
        if (number.length <= 0) {
          this.words = [0]
          this.length = 1
          return this
        }
        this.length = Math.ceil(number.length / 3)
        this.words = new Array(this.length)
        for (var i = 0; i < this.length; i++) {
          this.words[i] = 0
        }
        var j, w
        var off = 0
        if (endian === "be") {
          for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
            w = number[i] | (number[i - 1] << 8) | (number[i - 2] << 16)
            this.words[j] |= (w << off) & 67108863
            this.words[j + 1] = (w >>> (26 - off)) & 67108863
            off += 24
            if (off >= 26) {
              off -= 26
              j++
            }
          }
        } else if (endian === "le") {
          for (i = 0, j = 0; i < number.length; i += 3) {
            w = number[i] | (number[i + 1] << 8) | (number[i + 2] << 16)
            this.words[j] |= (w << off) & 67108863
            this.words[j + 1] = (w >>> (26 - off)) & 67108863
            off += 24
            if (off >= 26) {
              off -= 26
              j++
            }
          }
        }
        return this._strip()
      }
      function parseHex(str, start, end) {
        var r = 0
        var len = Math.min(str.length, end)
        var z = 0
        for (var i = start; i < len; i++) {
          var c = str.charCodeAt(i) - 48
          r <<= 4
          var b
          if (c >= 49 && c <= 54) {
            b = c - 49 + 10
          } else if (c >= 17 && c <= 22) {
            b = c - 17 + 10
          } else {
            b = c
          }
          r |= b
          z |= b
        }
        assert(!(z & 240), "Invalid character in " + str)
        return r
      }
      BN.prototype._parseHex = function _parseHex(number, start) {
        this.length = Math.ceil((number.length - start) / 6)
        this.words = new Array(this.length)
        for (var i = 0; i < this.length; i++) {
          this.words[i] = 0
        }
        var j, w
        var off = 0
        for (i = number.length - 6, j = 0; i >= start; i -= 6) {
          w = parseHex(number, i, i + 6)
          this.words[j] |= (w << off) & 67108863
          this.words[j + 1] |= (w >>> (26 - off)) & 4194303
          off += 24
          if (off >= 26) {
            off -= 26
            j++
          }
        }
        if (i + 6 !== start) {
          w = parseHex(number, start, i + 6)
          this.words[j] |= (w << off) & 67108863
          this.words[j + 1] |= (w >>> (26 - off)) & 4194303
        }
        this._strip()
      }
      function parseBase(str, start, end, mul) {
        var r = 0
        var b = 0
        var len = Math.min(str.length, end)
        for (var i = start; i < len; i++) {
          var c = str.charCodeAt(i) - 48
          r *= mul
          if (c >= 49) {
            b = c - 49 + 10
          } else if (c >= 17) {
            b = c - 17 + 10
          } else {
            b = c
          }
          assert(c >= 0 && b < mul, "Invalid character")
          r += b
        }
        return r
      }
      BN.prototype._parseBase = function _parseBase(number, base, start) {
        this.words = [0]
        this.length = 1
        for (var limbLen = 0, limbPow = 1; limbPow <= 67108863; limbPow *= base) {
          limbLen++
        }
        limbLen--
        limbPow = (limbPow / base) | 0
        var total = number.length - start
        var mod = total % limbLen
        var end = Math.min(total, total - mod) + start
        var word = 0
        for (var i = start; i < end; i += limbLen) {
          word = parseBase(number, i, i + limbLen, base)
          this.imuln(limbPow)
          if (this.words[0] + word < 67108864) {
            this.words[0] += word
          } else {
            this._iaddn(word)
          }
        }
        if (mod !== 0) {
          var pow = 1
          word = parseBase(number, i, number.length, base)
          for (i = 0; i < mod; i++) {
            pow *= base
          }
          this.imuln(pow)
          if (this.words[0] + word < 67108864) {
            this.words[0] += word
          } else {
            this._iaddn(word)
          }
        }
      }
      BN.prototype.copy = function copy(dest) {
        dest.words = new Array(this.length)
        for (var i = 0; i < this.length; i++) {
          dest.words[i] = this.words[i]
        }
        dest.length = this.length
        dest.negative = this.negative
        dest.red = this.red
      }
      function move(dest, src) {
        dest.words = src.words
        dest.length = src.length
        dest.negative = src.negative
        dest.red = src.red
      }
      BN.prototype._move = function _move(dest) {
        move(dest, this)
      }
      BN.prototype.clone = function clone() {
        var r = new BN(null)
        this.copy(r)
        return r
      }
      BN.prototype._expand = function _expand(size) {
        while (this.length < size) {
          this.words[this.length++] = 0
        }
        return this
      }
      BN.prototype._strip = function strip() {
        while (this.length > 1 && this.words[this.length - 1] === 0) {
          this.length--
        }
        return this._normSign()
      }
      BN.prototype._normSign = function _normSign() {
        if (this.length === 1 && this.words[0] === 0) {
          this.negative = 0
        }
        return this
      }
      if (typeof Symbol !== "undefined" && typeof Symbol.for === "function") {
        BN.prototype[Symbol.for("nodejs.util.inspect.custom")] = inspect
      } else {
        BN.prototype.inspect = inspect
      }
      function inspect() {
        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">"
      }
      var zeros = [
        "",
        "0",
        "00",
        "000",
        "0000",
        "00000",
        "000000",
        "0000000",
        "00000000",
        "000000000",
        "0000000000",
        "00000000000",
        "000000000000",
        "0000000000000",
        "00000000000000",
        "000000000000000",
        "0000000000000000",
        "00000000000000000",
        "000000000000000000",
        "0000000000000000000",
        "00000000000000000000",
        "000000000000000000000",
        "0000000000000000000000",
        "00000000000000000000000",
        "000000000000000000000000",
        "0000000000000000000000000",
      ]
      var groupSizes = [
        0,
        0,
        25,
        16,
        12,
        11,
        10,
        9,
        8,
        8,
        7,
        7,
        7,
        7,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
      ]
      var groupBases = [
        0,
        0,
        33554432,
        43046721,
        16777216,
        48828125,
        60466176,
        40353607,
        16777216,
        43046721,
        1e7,
        19487171,
        35831808,
        62748517,
        7529536,
        11390625,
        16777216,
        24137569,
        34012224,
        47045881,
        64e6,
        4084101,
        5153632,
        6436343,
        7962624,
        9765625,
        11881376,
        14348907,
        17210368,
        20511149,
        243e5,
        28629151,
        33554432,
        39135393,
        45435424,
        52521875,
        60466176,
      ]
      BN.prototype.toString = function toString(base, padding) {
        base = base || 10
        padding = padding | 0 || 1
        var out
        if (base === 16 || base === "hex") {
          out = ""
          var off = 0
          var carry = 0
          for (var i = 0; i < this.length; i++) {
            var w = this.words[i]
            var word = (((w << off) | carry) & 16777215).toString(16)
            carry = (w >>> (24 - off)) & 16777215
            if (carry !== 0 || i !== this.length - 1) {
              out = zeros[6 - word.length] + word + out
            } else {
              out = word + out
            }
            off += 2
            if (off >= 26) {
              off -= 26
              i--
            }
          }
          if (carry !== 0) {
            out = carry.toString(16) + out
          }
          while (out.length % padding !== 0) {
            out = "0" + out
          }
          if (this.negative !== 0) {
            out = "-" + out
          }
          return out
        }
        if (base === (base | 0) && base >= 2 && base <= 36) {
          var groupSize = groupSizes[base]
          var groupBase = groupBases[base]
          out = ""
          var c = this.clone()
          c.negative = 0
          while (!c.isZero()) {
            var r = c.modrn(groupBase).toString(base)
            c = c.idivn(groupBase)
            if (!c.isZero()) {
              out = zeros[groupSize - r.length] + r + out
            } else {
              out = r + out
            }
          }
          if (this.isZero()) {
            out = "0" + out
          }
          while (out.length % padding !== 0) {
            out = "0" + out
          }
          if (this.negative !== 0) {
            out = "-" + out
          }
          return out
        }
        assert(false, "Base should be between 2 and 36")
      }
      BN.prototype.toNumber = function toNumber() {
        var ret = this.words[0]
        if (this.length === 2) {
          ret += this.words[1] * 67108864
        } else if (this.length === 3 && this.words[2] === 1) {
          ret += 4503599627370496 + this.words[1] * 67108864
        } else if (this.length > 2) {
          assert(false, "Number can only safely store up to 53 bits")
        }
        return this.negative !== 0 ? -ret : ret
      }
      BN.prototype.toJSON = function toJSON() {
        return this.toString(16, 2)
      }
      if (Buffer) {
        BN.prototype.toBuffer = function toBuffer(endian, length) {
          return this.toArrayLike(Buffer, endian, length)
        }
      }
      BN.prototype.toArray = function toArray(endian, length) {
        return this.toArrayLike(Array, endian, length)
      }
      var allocate = function allocate(ArrayType, size) {
        if (ArrayType.allocUnsafe) {
          return ArrayType.allocUnsafe(size)
        }
        return new ArrayType(size)
      }
      BN.prototype.toArrayLike = function toArrayLike(ArrayType, endian, length) {
        this._strip()
        var byteLength = this.byteLength()
        var reqLength = length || Math.max(1, byteLength)
        assert(byteLength <= reqLength, "byte array longer than desired length")
        assert(reqLength > 0, "Requested array length <= 0")
        var res = allocate(ArrayType, reqLength)
        var postfix = endian === "le" ? "LE" : "BE"
        this["_toArrayLike" + postfix](res, byteLength)
        return res
      }
      BN.prototype._toArrayLikeLE = function _toArrayLikeLE(res, byteLength) {
        var position = 0
        var carry = 0
        for (var i = 0, shift = 0; i < this.length; i++) {
          var word = (this.words[i] << shift) | carry
          res[position++] = word & 255
          if (position < res.length) {
            res[position++] = (word >> 8) & 255
          }
          if (position < res.length) {
            res[position++] = (word >> 16) & 255
          }
          if (shift === 6) {
            if (position < res.length) {
              res[position++] = (word >> 24) & 255
            }
            carry = 0
            shift = 0
          } else {
            carry = word >>> 24
            shift += 2
          }
        }
        if (position < res.length) {
          res[position++] = carry
          while (position < res.length) {
            res[position++] = 0
          }
        }
      }
      BN.prototype._toArrayLikeBE = function _toArrayLikeBE(res, byteLength) {
        var position = res.length - 1
        var carry = 0
        for (var i = 0, shift = 0; i < this.length; i++) {
          var word = (this.words[i] << shift) | carry
          res[position--] = word & 255
          if (position >= 0) {
            res[position--] = (word >> 8) & 255
          }
          if (position >= 0) {
            res[position--] = (word >> 16) & 255
          }
          if (shift === 6) {
            if (position >= 0) {
              res[position--] = (word >> 24) & 255
            }
            carry = 0
            shift = 0
          } else {
            carry = word >>> 24
            shift += 2
          }
        }
        if (position >= 0) {
          res[position--] = carry
          while (position >= 0) {
            res[position--] = 0
          }
        }
      }
      if (Math.clz32) {
        BN.prototype._countBits = function _countBits(w) {
          return 32 - Math.clz32(w)
        }
      } else {
        BN.prototype._countBits = function _countBits(w) {
          var t = w
          var r = 0
          if (t >= 4096) {
            r += 13
            t >>>= 13
          }
          if (t >= 64) {
            r += 7
            t >>>= 7
          }
          if (t >= 8) {
            r += 4
            t >>>= 4
          }
          if (t >= 2) {
            r += 2
            t >>>= 2
          }
          return r + t
        }
      }
      BN.prototype._zeroBits = function _zeroBits(w) {
        if (w === 0) return 26
        var t = w
        var r = 0
        if ((t & 8191) === 0) {
          r += 13
          t >>>= 13
        }
        if ((t & 127) === 0) {
          r += 7
          t >>>= 7
        }
        if ((t & 15) === 0) {
          r += 4
          t >>>= 4
        }
        if ((t & 3) === 0) {
          r += 2
          t >>>= 2
        }
        if ((t & 1) === 0) {
          r++
        }
        return r
      }
      BN.prototype.bitLength = function bitLength() {
        var w = this.words[this.length - 1]
        var hi = this._countBits(w)
        return (this.length - 1) * 26 + hi
      }
      function toBitArray(num) {
        var w = new Array(num.bitLength())
        for (var bit = 0; bit < w.length; bit++) {
          var off = (bit / 26) | 0
          var wbit = bit % 26
          w[bit] = (num.words[off] >>> wbit) & 1
        }
        return w
      }
      BN.prototype.zeroBits = function zeroBits() {
        if (this.isZero()) return 0
        var r = 0
        for (var i = 0; i < this.length; i++) {
          var b = this._zeroBits(this.words[i])
          r += b
          if (b !== 26) break
        }
        return r
      }
      BN.prototype.byteLength = function byteLength() {
        return Math.ceil(this.bitLength() / 8)
      }
      BN.prototype.toTwos = function toTwos(width) {
        if (this.negative !== 0) {
          return this.abs().inotn(width).iaddn(1)
        }
        return this.clone()
      }
      BN.prototype.fromTwos = function fromTwos(width) {
        if (this.testn(width - 1)) {
          return this.notn(width).iaddn(1).ineg()
        }
        return this.clone()
      }
      BN.prototype.isNeg = function isNeg() {
        return this.negative !== 0
      }
      BN.prototype.neg = function neg() {
        return this.clone().ineg()
      }
      BN.prototype.ineg = function ineg() {
        if (!this.isZero()) {
          this.negative ^= 1
        }
        return this
      }
      BN.prototype.iuor = function iuor(num) {
        while (this.length < num.length) {
          this.words[this.length++] = 0
        }
        for (var i = 0; i < num.length; i++) {
          this.words[i] = this.words[i] | num.words[i]
        }
        return this._strip()
      }
      BN.prototype.ior = function ior(num) {
        assert((this.negative | num.negative) === 0)
        return this.iuor(num)
      }
      BN.prototype.or = function or(num) {
        if (this.length > num.length) return this.clone().ior(num)
        return num.clone().ior(this)
      }
      BN.prototype.uor = function uor(num) {
        if (this.length > num.length) return this.clone().iuor(num)
        return num.clone().iuor(this)
      }
      BN.prototype.iuand = function iuand(num) {
        var b
        if (this.length > num.length) {
          b = num
        } else {
          b = this
        }
        for (var i = 0; i < b.length; i++) {
          this.words[i] = this.words[i] & num.words[i]
        }
        this.length = b.length
        return this._strip()
      }
      BN.prototype.iand = function iand(num) {
        assert((this.negative | num.negative) === 0)
        return this.iuand(num)
      }
      BN.prototype.and = function and(num) {
        if (this.length > num.length) return this.clone().iand(num)
        return num.clone().iand(this)
      }
      BN.prototype.uand = function uand(num) {
        if (this.length > num.length) return this.clone().iuand(num)
        return num.clone().iuand(this)
      }
      BN.prototype.iuxor = function iuxor(num) {
        var a
        var b
        if (this.length > num.length) {
          a = this
          b = num
        } else {
          a = num
          b = this
        }
        for (var i = 0; i < b.length; i++) {
          this.words[i] = a.words[i] ^ b.words[i]
        }
        if (this !== a) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i]
          }
        }
        this.length = a.length
        return this._strip()
      }
      BN.prototype.ixor = function ixor(num) {
        assert((this.negative | num.negative) === 0)
        return this.iuxor(num)
      }
      BN.prototype.xor = function xor(num) {
        if (this.length > num.length) return this.clone().ixor(num)
        return num.clone().ixor(this)
      }
      BN.prototype.uxor = function uxor(num) {
        if (this.length > num.length) return this.clone().iuxor(num)
        return num.clone().iuxor(this)
      }
      BN.prototype.inotn = function inotn(width) {
        assert(typeof width === "number" && width >= 0)
        var bytesNeeded = Math.ceil(width / 26) | 0
        var bitsLeft = width % 26
        this._expand(bytesNeeded)
        if (bitsLeft > 0) {
          bytesNeeded--
        }
        for (var i = 0; i < bytesNeeded; i++) {
          this.words[i] = ~this.words[i] & 67108863
        }
        if (bitsLeft > 0) {
          this.words[i] = ~this.words[i] & (67108863 >> (26 - bitsLeft))
        }
        return this._strip()
      }
      BN.prototype.notn = function notn(width) {
        return this.clone().inotn(width)
      }
      BN.prototype.setn = function setn(bit, val) {
        assert(typeof bit === "number" && bit >= 0)
        var off = (bit / 26) | 0
        var wbit = bit % 26
        this._expand(off + 1)
        if (val) {
          this.words[off] = this.words[off] | (1 << wbit)
        } else {
          this.words[off] = this.words[off] & ~(1 << wbit)
        }
        return this._strip()
      }
      BN.prototype.iadd = function iadd(num) {
        var r
        if (this.negative !== 0 && num.negative === 0) {
          this.negative = 0
          r = this.isub(num)
          this.negative ^= 1
          return this._normSign()
        } else if (this.negative === 0 && num.negative !== 0) {
          num.negative = 0
          r = this.isub(num)
          num.negative = 1
          return r._normSign()
        }
        var a, b
        if (this.length > num.length) {
          a = this
          b = num
        } else {
          a = num
          b = this
        }
        var carry = 0
        for (var i = 0; i < b.length; i++) {
          r = (a.words[i] | 0) + (b.words[i] | 0) + carry
          this.words[i] = r & 67108863
          carry = r >>> 26
        }
        for (; carry !== 0 && i < a.length; i++) {
          r = (a.words[i] | 0) + carry
          this.words[i] = r & 67108863
          carry = r >>> 26
        }
        this.length = a.length
        if (carry !== 0) {
          this.words[this.length] = carry
          this.length++
        } else if (a !== this) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i]
          }
        }
        return this
      }
      BN.prototype.add = function add(num) {
        var res
        if (num.negative !== 0 && this.negative === 0) {
          num.negative = 0
          res = this.sub(num)
          num.negative ^= 1
          return res
        } else if (num.negative === 0 && this.negative !== 0) {
          this.negative = 0
          res = num.sub(this)
          this.negative = 1
          return res
        }
        if (this.length > num.length) return this.clone().iadd(num)
        return num.clone().iadd(this)
      }
      BN.prototype.isub = function isub(num) {
        if (num.negative !== 0) {
          num.negative = 0
          var r = this.iadd(num)
          num.negative = 1
          return r._normSign()
        } else if (this.negative !== 0) {
          this.negative = 0
          this.iadd(num)
          this.negative = 1
          return this._normSign()
        }
        var cmp = this.cmp(num)
        if (cmp === 0) {
          this.negative = 0
          this.length = 1
          this.words[0] = 0
          return this
        }
        var a, b
        if (cmp > 0) {
          a = this
          b = num
        } else {
          a = num
          b = this
        }
        var carry = 0
        for (var i = 0; i < b.length; i++) {
          r = (a.words[i] | 0) - (b.words[i] | 0) + carry
          carry = r >> 26
          this.words[i] = r & 67108863
        }
        for (; carry !== 0 && i < a.length; i++) {
          r = (a.words[i] | 0) + carry
          carry = r >> 26
          this.words[i] = r & 67108863
        }
        if (carry === 0 && i < a.length && a !== this) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i]
          }
        }
        this.length = Math.max(this.length, i)
        if (a !== this) {
          this.negative = 1
        }
        return this._strip()
      }
      BN.prototype.sub = function sub(num) {
        return this.clone().isub(num)
      }
      function smallMulTo(self, num, out) {
        out.negative = num.negative ^ self.negative
        var len = (self.length + num.length) | 0
        out.length = len
        len = (len - 1) | 0
        var a = self.words[0] | 0
        var b = num.words[0] | 0
        var r = a * b
        var lo = r & 67108863
        var carry = (r / 67108864) | 0
        out.words[0] = lo
        for (var k = 1; k < len; k++) {
          var ncarry = carry >>> 26
          var rword = carry & 67108863
          var maxJ = Math.min(k, num.length - 1)
          for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
            var i = (k - j) | 0
            a = self.words[i] | 0
            b = num.words[j] | 0
            r = a * b + rword
            ncarry += (r / 67108864) | 0
            rword = r & 67108863
          }
          out.words[k] = rword | 0
          carry = ncarry | 0
        }
        if (carry !== 0) {
          out.words[k] = carry | 0
        } else {
          out.length--
        }
        return out._strip()
      }
      var comb10MulTo = function comb10MulTo(self, num, out) {
        var a = self.words
        var b = num.words
        var o = out.words
        var c = 0
        var lo
        var mid
        var hi
        var a0 = a[0] | 0
        var al0 = a0 & 8191
        var ah0 = a0 >>> 13
        var a1 = a[1] | 0
        var al1 = a1 & 8191
        var ah1 = a1 >>> 13
        var a2 = a[2] | 0
        var al2 = a2 & 8191
        var ah2 = a2 >>> 13
        var a3 = a[3] | 0
        var al3 = a3 & 8191
        var ah3 = a3 >>> 13
        var a4 = a[4] | 0
        var al4 = a4 & 8191
        var ah4 = a4 >>> 13
        var a5 = a[5] | 0
        var al5 = a5 & 8191
        var ah5 = a5 >>> 13
        var a6 = a[6] | 0
        var al6 = a6 & 8191
        var ah6 = a6 >>> 13
        var a7 = a[7] | 0
        var al7 = a7 & 8191
        var ah7 = a7 >>> 13
        var a8 = a[8] | 0
        var al8 = a8 & 8191
        var ah8 = a8 >>> 13
        var a9 = a[9] | 0
        var al9 = a9 & 8191
        var ah9 = a9 >>> 13
        var b0 = b[0] | 0
        var bl0 = b0 & 8191
        var bh0 = b0 >>> 13
        var b1 = b[1] | 0
        var bl1 = b1 & 8191
        var bh1 = b1 >>> 13
        var b2 = b[2] | 0
        var bl2 = b2 & 8191
        var bh2 = b2 >>> 13
        var b3 = b[3] | 0
        var bl3 = b3 & 8191
        var bh3 = b3 >>> 13
        var b4 = b[4] | 0
        var bl4 = b4 & 8191
        var bh4 = b4 >>> 13
        var b5 = b[5] | 0
        var bl5 = b5 & 8191
        var bh5 = b5 >>> 13
        var b6 = b[6] | 0
        var bl6 = b6 & 8191
        var bh6 = b6 >>> 13
        var b7 = b[7] | 0
        var bl7 = b7 & 8191
        var bh7 = b7 >>> 13
        var b8 = b[8] | 0
        var bl8 = b8 & 8191
        var bh8 = b8 >>> 13
        var b9 = b[9] | 0
        var bl9 = b9 & 8191
        var bh9 = b9 >>> 13
        out.negative = self.negative ^ num.negative
        out.length = 19
        lo = Math.imul(al0, bl0)
        mid = Math.imul(al0, bh0)
        mid = (mid + Math.imul(ah0, bl0)) | 0
        hi = Math.imul(ah0, bh0)
        var w0 = (((c + lo) | 0) + ((mid & 8191) << 13)) | 0
        c = (((hi + (mid >>> 13)) | 0) + (w0 >>> 26)) | 0
        w0 &= 67108863
        lo = Math.imul(al1, bl0)
        mid = Math.imul(al1, bh0)
        mid = (mid + Math.imul(ah1, bl0)) | 0
        hi = Math.imul(ah1, bh0)
        lo = (lo + Math.imul(al0, bl1)) | 0
        mid = (mid + Math.imul(al0, bh1)) | 0
        mid = (mid + Math.imul(ah0, bl1)) | 0
        hi = (hi + Math.imul(ah0, bh1)) | 0
        var w1 = (((c + lo) | 0) + ((mid & 8191) << 13)) | 0
        c = (((hi + (mid >>> 13)) | 0) + (w1 >>> 26)) | 0
        w1 &= 67108863
        lo = Math.imul(al2, bl0)
        mid = Math.imul(al2, bh0)
        mid = (mid + Math.imul(ah2, bl0)) | 0
        hi = Math.imul(ah2, bh0)
        lo = (lo + Math.imul(al1, bl1)) | 0
        mid = (mid + Math.imul(al1, bh1)) | 0
        mid = (mid + Math.imul(ah1, bl1)) | 0
        hi = (hi + Math.imul(ah1, bh1)) | 0
        lo = (lo + Math.imul(al0, bl2)) | 0
        mid = (mid + Math.imul(al0, bh2)) | 0
        mid = (mid + Math.imul(ah0, bl2)) | 0
        hi = (hi + Math.imul(ah0, bh2)) | 0
        var w2 = (((c + lo) | 0) + ((mid & 8191) << 13)) | 0
        c = (((hi + (mid >>> 13)) | 0) + (w2 >>> 26)) | 0
        w2 &= 67108863
        lo = Math.imul(al3, bl0)
        mid = Math.imul(al3, bh0)
        mid = (mid + Math.imul(ah3, bl0)) | 0
        hi = Math.imul(ah3, bh0)
        lo = (lo + Math.imul(al2, bl1)) | 0
        mid = (mid + Math.imul(al2, bh1)) | 0
        mid = (mid + Math.imul(ah2, bl1)) | 0
        hi = (hi + Math.imul(ah2, bh1)) | 0
        lo = (lo + Math.imul(al1, bl2)) | 0
        mid = (mid + Math.imul(al1, bh2)) | 0
        mid = (mid + Math.imul(ah1, bl2)) | 0
        hi = (hi + Math.imul(ah1, bh2)) | 0
        lo = (lo + Math.imul(al0, bl3)) | 0
        mid = (mid + Math.imul(al0, bh3)) | 0
        mid = (mid + Math.imul(ah0, bl3)) | 0
        hi = (hi + Math.imul(ah0, bh3)) | 0
        var w3 = (((c + lo) | 0) + ((mid & 8191) << 13)) | 0
        c = (((hi + (mid >>> 13)) | 0) + (w3 >>> 26)) | 0
        w3 &= 67108863
        lo = Math.imul(al4, bl0)
        mid = Math.imul(al4, bh0)
        mid = (mid + Math.imul(ah4, bl0)) | 0
        hi = Math.imul(ah4, bh0)
        lo = (lo + Math.imul(al3, bl1)) | 0
        mid = (mid + Math.imul(al3, bh1)) | 0
        mid = (mid + Math.imul(ah3, bl1)) | 0
        hi = (hi + Math.imul(ah3, bh1)) | 0
        lo = (lo + Math.imul(al2, bl2)) | 0
        mid = (mid + Math.imul(al2, bh2)) | 0
        mid = (mid + Math.imul(ah2, bl2)) | 0
        hi = (hi + Math.imul(ah2, bh2)) | 0
        lo = (lo + Math.imul(al1, bl3)) | 0
        mid = (mid + Math.imul(al1, bh3)) | 0
        mid = (mid + Math.imul(ah1, bl3)) | 0
        hi = (hi + Math.imul(ah1, bh3)) | 0
        lo = (lo + Math.imul(al0, bl4)) | 0
        mid = (mid + Math.imul(al0, bh4)) | 0
        mid = (mid + Math.imul(ah0, bl4)) | 0
        hi = (hi + Math.imul(ah0, bh4)) | 0
        var w4 = (((c + lo) | 0) + ((mid & 8191) << 13)) | 0
        c = (((hi + (mid >>> 13)) | 0) + (w4 >>> 26)) | 0
        w4 &= 67108863
        lo = Math.imul(al5, bl0)
        mid = Math.imul(al5, bh0)
        mid = (mid + Math.imul(ah5, bl0)) | 0
        hi = Math.imul(ah5, bh0)
        lo = (lo + Math.imul(al4, bl1)) | 0
        mid = (mid + Math.imul(al4, bh1)) | 0
        mid = (mid + Math.imul(ah4, bl1)) | 0
        hi = (hi + Math.imul(ah4, bh1)) | 0
        lo = (lo + Math.imul(al3, bl2)) | 0
        mid = (mid + Math.imul(al3, bh2)) | 0
        mid = (mid + Math.imul(ah3, bl2)) | 0
        hi = (hi + Math.imul(ah3, bh2)) | 0
        lo = (lo + Math.imul(al2, bl3)) | 0
        mid = (mid + Math.imul(al2, bh3)) | 0
        mid = (mid + Math.imul(ah2, bl3)) | 0
        hi = (hi + Math.imul(ah2, bh3)) | 0
        lo = (lo + Math.imul(al1, bl4)) | 0
        mid = (mid + Math.imul(al1, bh4)) | 0
        mid = (mid + Math.imul(ah1, bl4)) | 0
        hi = (hi + Math.imul(ah1, bh4)) | 0
        lo = (lo + Math.imul(al0, bl5)) | 0
        mid = (mid + Math.imul(al0, bh5)) | 0
        mid = (mid + Math.imul(ah0, bl5)) | 0
        hi = (hi + Math.imul(ah0, bh5)) | 0
        var w5 = (((c + lo) | 0) + ((mid & 8191) << 13)) | 0
        c = (((hi + (mid >>> 13)) | 0) + (w5 >>> 26)) | 0
        w5 &= 67108863
        lo = Math.imul(al6, bl0)
        mid = Math.imul(al6, bh0)
        mid = (mid + Math.imul(ah6, bl0)) | 0
        hi = Math.imul(ah6, bh0)
        lo = (lo + Math.imul(al5, bl1)) | 0
        mid = (mid + Math.imul(al5, bh1)) | 0
        mid = (mid + Math.imul(ah5, bl1)) | 0
        hi = (hi + Math.imul(ah5, bh1)) | 0
        lo = (lo + Math.imul(al4, bl2)) | 0
        mid = (mid + Math.imul(al4, bh2)) | 0
        mid = (mid + Math.imul(ah4, bl2)) | 0
        hi = (hi + Math.imul(ah4, bh2)) | 0
        lo = (lo + Math.imul(al3, bl3)) | 0
        mid = (mid + Math.imul(al3, bh3)) | 0
        mid = (mid + Math.imul(ah3, bl3)) | 0
        hi = (hi + Math.imul(ah3, bh3)) | 0
        lo = (lo + Math.imul(al2, bl4)) | 0
        mid = (mid + Math.imul(al2, bh4)) | 0
        mid = (mid + Math.imul(ah2, bl4)) | 0
        hi = (hi + Math.imul(ah2, bh4)) | 0
        lo = (lo + Math.imul(al1, bl5)) | 0
        mid = (mid + Math.imul(al1, bh5)) | 0
        mid = (mid + Math.imul(ah1, bl5)) | 0
        hi = (hi + Math.imul(ah1, bh5)) | 0
        lo = (lo + Math.imul(al0, bl6)) | 0
        mid = (mid + Math.imul(al0, bh6)) | 0
        mid = (mid + Math.imul(ah0, bl6)) | 0
        hi = (hi + Math.imul(ah0, bh6)) | 0
        var w6 = (((c + lo) | 0) + ((mid & 8191) << 13)) | 0
        c = (((hi + (mid >>> 13)) | 0) + (w6 >>> 26)) | 0
        w6 &= 67108863
        lo = Math.imul(al7, bl0)
        mid = Math.imul(al7, bh0)
        mid = (mid + Math.imul(ah7, bl0)) | 0
        hi = Math.imul(ah7, bh0)
        lo = (lo + Math.imul(al6, bl1)) | 0
        mid = (mid + Math.imul(al6, bh1)) | 0
        mid = (mid + Math.imul(ah6, bl1)) | 0
        hi = (hi + Math.imul(ah6, bh1)) | 0
        lo = (lo + Math.imul(al5, bl2)) | 0
        mid = (mid + Math.imul(al5, bh2)) | 0
        mid = (mid + Math.imul(ah5, bl2)) | 0
        hi = (hi + Math.imul(ah5, bh2)) | 0
        lo = (lo + Math.imul(al4, bl3)) | 0
        mid = (mid + Math.imul(al4, bh3)) | 0
        mid = (mid + Math.imul(ah4, bl3)) | 0
        hi = (hi + Math.imul(ah4, bh3)) | 0
        lo = (lo + Math.imul(al3, bl4)) | 0
        mid = (mid + Math.imul(al3, bh4)) | 0
        mid = (mid + Math.imul(ah3, bl4)) | 0
        hi = (hi + Math.imul(ah3, bh4)) | 0
        lo = (lo + Math.imul(al2, bl5)) | 0
        mid = (mid + Math.imul(al2, bh5)) | 0
        mid = (mid + Math.imul(ah2, bl5)) | 0
        hi = (hi + Math.imul(ah2, bh5)) | 0
        lo = (lo + Math.imul(al1, bl6)) | 0
        mid = (mid + Math.imul(al1, bh6)) | 0
        mid = (mid + Math.imul(ah1, bl6)) | 0
        hi = (hi + Math.imul(ah1, bh6)) | 0
        lo = (lo + Math.imul(al0, bl7)) | 0
        mid = (mid + Math.imul(al0, bh7)) | 0
        mid = (mid + Math.imul(ah0, bl7)) | 0
        hi = (hi + Math.imul(ah0, bh7)) | 0
        var w7 = (((c + lo) | 0) + ((mid & 8191) << 13)) | 0
        c = (((hi + (mid >>> 13)) | 0) + (w7 >>> 26)) | 0
        w7 &= 67108863
        lo = Math.imul(al8, bl0)
        mid = Math.imul(al8, bh0)
        mid = (mid + Math.imul(ah8, bl0)) | 0
        hi = Math.imul(ah8, bh0)
        lo = (lo + Math.imul(al7, bl1)) | 0
        mid = (mid + Math.imul(al7, bh1)) | 0
        mid = (mid + Math.imul(ah7, bl1)) | 0
        hi = (hi + Math.imul(ah7, bh1)) | 0
        lo = (lo + Math.imul(al6, bl2)) | 0
        mid = (mid + Math.imul(al6, bh2)) | 0
        mid = (mid + Math.imul(ah6, bl2)) | 0
        hi = (hi + Math.imul(ah6, bh2)) | 0
        lo = (lo + Math.imul(al5, bl3)) | 0
        mid = (mid + Math.imul(al5, bh3)) | 0
        mid = (mid + Math.imul(ah5, bl3)) | 0
        hi = (hi + Math.imul(ah5, bh3)) | 0
        lo = (lo + Math.imul(al4, bl4)) | 0
        mid = (mid + Math.imul(al4, bh4)) | 0
        mid = (mid + Math.imul(ah4, bl4)) | 0
        hi = (hi + Math.imul(ah4, bh4)) | 0
        lo = (lo + Math.imul(al3, bl5)) | 0
        mid = (mid + Math.imul(al3, bh5)) | 0
        mid = (mid + Math.imul(ah3, bl5)) | 0
        hi = (hi + Math.imul(ah3, bh5)) | 0
        lo = (lo + Math.imul(al2, bl6)) | 0
        mid = (mid + Math.imul(al2, bh6)) | 0
        mid = (mid + Math.imul(ah2, bl6)) | 0
        hi = (hi + Math.imul(ah2, bh6)) | 0
        lo = (lo + Math.imul(al1, bl7)) | 0
        mid = (mid + Math.imul(al1, bh7)) | 0
        mid = (mid + Math.imul(ah1, bl7)) | 0
        hi = (hi + Math.imul(ah1, bh7)) | 0
        lo = (lo + Math.imul(al0, bl8)) | 0
        mid = (mid + Math.imul(al0, bh8)) | 0
        mid = (mid + Math.imul(ah0, bl8)) | 0
        hi = (hi + Math.imul(ah0, bh8)) | 0
        var w8 = (((c + lo) | 0) + ((mid & 8191) << 13)) | 0
        c = (((hi + (mid >>> 13)) | 0) + (w8 >>> 26)) | 0
        w8 &= 67108863
        lo = Math.imul(al9, bl0)
        mid = Math.imul(al9, bh0)
        mid = (mid + Math.imul(ah9, bl0)) | 0
        hi = Math.imul(ah9, bh0)
        lo = (lo + Math.imul(al8, bl1)) | 0
        mid = (mid + Math.imul(al8, bh1)) | 0
        mid = (mid + Math.imul(ah8, bl1)) | 0
        hi = (hi + Math.imul(ah8, bh1)) | 0
        lo = (lo + Math.imul(al7, bl2)) | 0
        mid = (mid + Math.imul(al7, bh2)) | 0
        mid = (mid + Math.imul(ah7, bl2)) | 0
        hi = (hi + Math.imul(ah7, bh2)) | 0
        lo = (lo + Math.imul(al6, bl3)) | 0
        mid = (mid + Math.imul(al6, bh3)) | 0
        mid = (mid + Math.imul(ah6, bl3)) | 0
        hi = (hi + Math.imul(ah6, bh3)) | 0
        lo = (lo + Math.imul(al5, bl4)) | 0
        mid = (mid + Math.imul(al5, bh4)) | 0
        mid = (mid + Math.imul(ah5, bl4)) | 0
        hi = (hi + Math.imul(ah5, bh4)) | 0
        lo = (lo + Math.imul(al4, bl5)) | 0
        mid = (mid + Math.imul(al4, bh5)) | 0
        mid = (mid + Math.imul(ah4, bl5)) | 0
        hi = (hi + Math.imul(ah4, bh5)) | 0
        lo = (lo + Math.imul(al3, bl6)) | 0
        mid = (mid + Math.imul(al3, bh6)) | 0
        mid = (mid + Math.imul(ah3, bl6)) | 0
        hi = (hi + Math.imul(ah3, bh6)) | 0
        lo = (lo + Math.imul(al2, bl7)) | 0
        mid = (mid + Math.imul(al2, bh7)) | 0
        mid = (mid + Math.imul(ah2, bl7)) | 0
        hi = (hi + Math.imul(ah2, bh7)) | 0
        lo = (lo + Math.imul(al1, bl8)) | 0
        mid = (mid + Math.imul(al1, bh8)) | 0
        mid = (mid + Math.imul(ah1, bl8)) | 0
        hi = (hi + Math.imul(ah1, bh8)) | 0
        lo = (lo + Math.imul(al0, bl9)) | 0
        mid = (mid + Math.imul(al0, bh9)) | 0
        mid = (mid + Math.imul(ah0, bl9)) | 0
        hi = (hi + Math.imul(ah0, bh9)) | 0
        var w9 = (((c + lo) | 0) + ((mid & 8191) << 13)) | 0
        c = (((hi + (mid >>> 13)) | 0) + (w9 >>> 26)) | 0
        w9 &= 67108863
        lo = Math.imul(al9, bl1)
        mid = Math.imul(al9, bh1)
        mid = (mid + Math.imul(ah9, bl1)) | 0
        hi = Math.imul(ah9, bh1)
        lo = (lo + Math.imul(al8, bl2)) | 0
        mid = (mid + Math.imul(al8, bh2)) | 0
        mid = (mid + Math.imul(ah8, bl2)) | 0
        hi = (hi + Math.imul(ah8, bh2)) | 0
        lo = (lo + Math.imul(al7, bl3)) | 0
        mid = (mid + Math.imul(al7, bh3)) | 0
        mid = (mid + Math.imul(ah7, bl3)) | 0
        hi = (hi + Math.imul(ah7, bh3)) | 0
        lo = (lo + Math.imul(al6, bl4)) | 0
        mid = (mid + Math.imul(al6, bh4)) | 0
        mid = (mid + Math.imul(ah6, bl4)) | 0
        hi = (hi + Math.imul(ah6, bh4)) | 0
        lo = (lo + Math.imul(al5, bl5)) | 0
        mid = (mid + Math.imul(al5, bh5)) | 0
        mid = (mid + Math.imul(ah5, bl5)) | 0
        hi = (hi + Math.imul(ah5, bh5)) | 0
        lo = (lo + Math.imul(al4, bl6)) | 0
        mid = (mid + Math.imul(al4, bh6)) | 0
        mid = (mid + Math.imul(ah4, bl6)) | 0
        hi = (hi + Math.imul(ah4, bh6)) | 0
        lo = (lo + Math.imul(al3, bl7)) | 0
        mid = (mid + Math.imul(al3, bh7)) | 0
        mid = (mid + Math.imul(ah3, bl7)) | 0
        hi = (hi + Math.imul(ah3, bh7)) | 0
        lo = (lo + Math.imul(al2, bl8)) | 0
        mid = (mid + Math.imul(al2, bh8)) | 0
        mid = (mid + Math.imul(ah2, bl8)) | 0
        hi = (hi + Math.imul(ah2, bh8)) | 0
        lo = (lo + Math.imul(al1, bl9)) | 0
        mid = (mid + Math.imul(al1, bh9)) | 0
        mid = (mid + Math.imul(ah1, bl9)) | 0
        hi = (hi + Math.imul(ah1, bh9)) | 0
        var w10 = (((c + lo) | 0) + ((mid & 8191) << 13)) | 0
        c = (((hi + (mid >>> 13)) | 0) + (w10 >>> 26)) | 0
        w10 &= 67108863
        lo = Math.imul(al9, bl2)
        mid = Math.imul(al9, bh2)
        mid = (mid + Math.imul(ah9, bl2)) | 0
        hi = Math.imul(ah9, bh2)
        lo = (lo + Math.imul(al8, bl3)) | 0
        mid = (mid + Math.imul(al8, bh3)) | 0
        mid = (mid + Math.imul(ah8, bl3)) | 0
        hi = (hi + Math.imul(ah8, bh3)) | 0
        lo = (lo + Math.imul(al7, bl4)) | 0
        mid = (mid + Math.imul(al7, bh4)) | 0
        mid = (mid + Math.imul(ah7, bl4)) | 0
        hi = (hi + Math.imul(ah7, bh4)) | 0
        lo = (lo + Math.imul(al6, bl5)) | 0
        mid = (mid + Math.imul(al6, bh5)) | 0
        mid = (mid + Math.imul(ah6, bl5)) | 0
        hi = (hi + Math.imul(ah6, bh5)) | 0
        lo = (lo + Math.imul(al5, bl6)) | 0
        mid = (mid + Math.imul(al5, bh6)) | 0
        mid = (mid + Math.imul(ah5, bl6)) | 0
        hi = (hi + Math.imul(ah5, bh6)) | 0
        lo = (lo + Math.imul(al4, bl7)) | 0
        mid = (mid + Math.imul(al4, bh7)) | 0
        mid = (mid + Math.imul(ah4, bl7)) | 0
        hi = (hi + Math.imul(ah4, bh7)) | 0
        lo = (lo + Math.imul(al3, bl8)) | 0
        mid = (mid + Math.imul(al3, bh8)) | 0
        mid = (mid + Math.imul(ah3, bl8)) | 0
        hi = (hi + Math.imul(ah3, bh8)) | 0
        lo = (lo + Math.imul(al2, bl9)) | 0
        mid = (mid + Math.imul(al2, bh9)) | 0
        mid = (mid + Math.imul(ah2, bl9)) | 0
        hi = (hi + Math.imul(ah2, bh9)) | 0
        var w11 = (((c + lo) | 0) + ((mid & 8191) << 13)) | 0
        c = (((hi + (mid >>> 13)) | 0) + (w11 >>> 26)) | 0
        w11 &= 67108863
        lo = Math.imul(al9, bl3)
        mid = Math.imul(al9, bh3)
        mid = (mid + Math.imul(ah9, bl3)) | 0
        hi = Math.imul(ah9, bh3)
        lo = (lo + Math.imul(al8, bl4)) | 0
        mid = (mid + Math.imul(al8, bh4)) | 0
        mid = (mid + Math.imul(ah8, bl4)) | 0
        hi = (hi + Math.imul(ah8, bh4)) | 0
        lo = (lo + Math.imul(al7, bl5)) | 0
        mid = (mid + Math.imul(al7, bh5)) | 0
        mid = (mid + Math.imul(ah7, bl5)) | 0
        hi = (hi + Math.imul(ah7, bh5)) | 0
        lo = (lo + Math.imul(al6, bl6)) | 0
        mid = (mid + Math.imul(al6, bh6)) | 0
        mid = (mid + Math.imul(ah6, bl6)) | 0
        hi = (hi + Math.imul(ah6, bh6)) | 0
        lo = (lo + Math.imul(al5, bl7)) | 0
        mid = (mid + Math.imul(al5, bh7)) | 0
        mid = (mid + Math.imul(ah5, bl7)) | 0
        hi = (hi + Math.imul(ah5, bh7)) | 0
        lo = (lo + Math.imul(al4, bl8)) | 0
        mid = (mid + Math.imul(al4, bh8)) | 0
        mid = (mid + Math.imul(ah4, bl8)) | 0
        hi = (hi + Math.imul(ah4, bh8)) | 0
        lo = (lo + Math.imul(al3, bl9)) | 0
        mid = (mid + Math.imul(al3, bh9)) | 0
        mid = (mid + Math.imul(ah3, bl9)) | 0
        hi = (hi + Math.imul(ah3, bh9)) | 0
        var w12 = (((c + lo) | 0) + ((mid & 8191) << 13)) | 0
        c = (((hi + (mid >>> 13)) | 0) + (w12 >>> 26)) | 0
        w12 &= 67108863
        lo = Math.imul(al9, bl4)
        mid = Math.imul(al9, bh4)
        mid = (mid + Math.imul(ah9, bl4)) | 0
        hi = Math.imul(ah9, bh4)
        lo = (lo + Math.imul(al8, bl5)) | 0
        mid = (mid + Math.imul(al8, bh5)) | 0
        mid = (mid + Math.imul(ah8, bl5)) | 0
        hi = (hi + Math.imul(ah8, bh5)) | 0
        lo = (lo + Math.imul(al7, bl6)) | 0
        mid = (mid + Math.imul(al7, bh6)) | 0
        mid = (mid + Math.imul(ah7, bl6)) | 0
        hi = (hi + Math.imul(ah7, bh6)) | 0
        lo = (lo + Math.imul(al6, bl7)) | 0
        mid = (mid + Math.imul(al6, bh7)) | 0
        mid = (mid + Math.imul(ah6, bl7)) | 0
        hi = (hi + Math.imul(ah6, bh7)) | 0
        lo = (lo + Math.imul(al5, bl8)) | 0
        mid = (mid + Math.imul(al5, bh8)) | 0
        mid = (mid + Math.imul(ah5, bl8)) | 0
        hi = (hi + Math.imul(ah5, bh8)) | 0
        lo = (lo + Math.imul(al4, bl9)) | 0
        mid = (mid + Math.imul(al4, bh9)) | 0
        mid = (mid + Math.imul(ah4, bl9)) | 0
        hi = (hi + Math.imul(ah4, bh9)) | 0
        var w13 = (((c + lo) | 0) + ((mid & 8191) << 13)) | 0
        c = (((hi + (mid >>> 13)) | 0) + (w13 >>> 26)) | 0
        w13 &= 67108863
        lo = Math.imul(al9, bl5)
        mid = Math.imul(al9, bh5)
        mid = (mid + Math.imul(ah9, bl5)) | 0
        hi = Math.imul(ah9, bh5)
        lo = (lo + Math.imul(al8, bl6)) | 0
        mid = (mid + Math.imul(al8, bh6)) | 0
        mid = (mid + Math.imul(ah8, bl6)) | 0
        hi = (hi + Math.imul(ah8, bh6)) | 0
        lo = (lo + Math.imul(al7, bl7)) | 0
        mid = (mid + Math.imul(al7, bh7)) | 0
        mid = (mid + Math.imul(ah7, bl7)) | 0
        hi = (hi + Math.imul(ah7, bh7)) | 0
        lo = (lo + Math.imul(al6, bl8)) | 0
        mid = (mid + Math.imul(al6, bh8)) | 0
        mid = (mid + Math.imul(ah6, bl8)) | 0
        hi = (hi + Math.imul(ah6, bh8)) | 0
        lo = (lo + Math.imul(al5, bl9)) | 0
        mid = (mid + Math.imul(al5, bh9)) | 0
        mid = (mid + Math.imul(ah5, bl9)) | 0
        hi = (hi + Math.imul(ah5, bh9)) | 0
        var w14 = (((c + lo) | 0) + ((mid & 8191) << 13)) | 0
        c = (((hi + (mid >>> 13)) | 0) + (w14 >>> 26)) | 0
        w14 &= 67108863
        lo = Math.imul(al9, bl6)
        mid = Math.imul(al9, bh6)
        mid = (mid + Math.imul(ah9, bl6)) | 0
        hi = Math.imul(ah9, bh6)
        lo = (lo + Math.imul(al8, bl7)) | 0
        mid = (mid + Math.imul(al8, bh7)) | 0
        mid = (mid + Math.imul(ah8, bl7)) | 0
        hi = (hi + Math.imul(ah8, bh7)) | 0
        lo = (lo + Math.imul(al7, bl8)) | 0
        mid = (mid + Math.imul(al7, bh8)) | 0
        mid = (mid + Math.imul(ah7, bl8)) | 0
        hi = (hi + Math.imul(ah7, bh8)) | 0
        lo = (lo + Math.imul(al6, bl9)) | 0
        mid = (mid + Math.imul(al6, bh9)) | 0
        mid = (mid + Math.imul(ah6, bl9)) | 0
        hi = (hi + Math.imul(ah6, bh9)) | 0
        var w15 = (((c + lo) | 0) + ((mid & 8191) << 13)) | 0
        c = (((hi + (mid >>> 13)) | 0) + (w15 >>> 26)) | 0
        w15 &= 67108863
        lo = Math.imul(al9, bl7)
        mid = Math.imul(al9, bh7)
        mid = (mid + Math.imul(ah9, bl7)) | 0
        hi = Math.imul(ah9, bh7)
        lo = (lo + Math.imul(al8, bl8)) | 0
        mid = (mid + Math.imul(al8, bh8)) | 0
        mid = (mid + Math.imul(ah8, bl8)) | 0
        hi = (hi + Math.imul(ah8, bh8)) | 0
        lo = (lo + Math.imul(al7, bl9)) | 0
        mid = (mid + Math.imul(al7, bh9)) | 0
        mid = (mid + Math.imul(ah7, bl9)) | 0
        hi = (hi + Math.imul(ah7, bh9)) | 0
        var w16 = (((c + lo) | 0) + ((mid & 8191) << 13)) | 0
        c = (((hi + (mid >>> 13)) | 0) + (w16 >>> 26)) | 0
        w16 &= 67108863
        lo = Math.imul(al9, bl8)
        mid = Math.imul(al9, bh8)
        mid = (mid + Math.imul(ah9, bl8)) | 0
        hi = Math.imul(ah9, bh8)
        lo = (lo + Math.imul(al8, bl9)) | 0
        mid = (mid + Math.imul(al8, bh9)) | 0
        mid = (mid + Math.imul(ah8, bl9)) | 0
        hi = (hi + Math.imul(ah8, bh9)) | 0
        var w17 = (((c + lo) | 0) + ((mid & 8191) << 13)) | 0
        c = (((hi + (mid >>> 13)) | 0) + (w17 >>> 26)) | 0
        w17 &= 67108863
        lo = Math.imul(al9, bl9)
        mid = Math.imul(al9, bh9)
        mid = (mid + Math.imul(ah9, bl9)) | 0
        hi = Math.imul(ah9, bh9)
        var w18 = (((c + lo) | 0) + ((mid & 8191) << 13)) | 0
        c = (((hi + (mid >>> 13)) | 0) + (w18 >>> 26)) | 0
        w18 &= 67108863
        o[0] = w0
        o[1] = w1
        o[2] = w2
        o[3] = w3
        o[4] = w4
        o[5] = w5
        o[6] = w6
        o[7] = w7
        o[8] = w8
        o[9] = w9
        o[10] = w10
        o[11] = w11
        o[12] = w12
        o[13] = w13
        o[14] = w14
        o[15] = w15
        o[16] = w16
        o[17] = w17
        o[18] = w18
        if (c !== 0) {
          o[19] = c
          out.length++
        }
        return out
      }
      if (!Math.imul) {
        comb10MulTo = smallMulTo
      }
      function bigMulTo(self, num, out) {
        out.negative = num.negative ^ self.negative
        out.length = self.length + num.length
        var carry = 0
        var hncarry = 0
        for (var k = 0; k < out.length - 1; k++) {
          var ncarry = hncarry
          hncarry = 0
          var rword = carry & 67108863
          var maxJ = Math.min(k, num.length - 1)
          for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
            var i = k - j
            var a = self.words[i] | 0
            var b = num.words[j] | 0
            var r = a * b
            var lo = r & 67108863
            ncarry = (ncarry + ((r / 67108864) | 0)) | 0
            lo = (lo + rword) | 0
            rword = lo & 67108863
            ncarry = (ncarry + (lo >>> 26)) | 0
            hncarry += ncarry >>> 26
            ncarry &= 67108863
          }
          out.words[k] = rword
          carry = ncarry
          ncarry = hncarry
        }
        if (carry !== 0) {
          out.words[k] = carry
        } else {
          out.length--
        }
        return out._strip()
      }
      function jumboMulTo(self, num, out) {
        return bigMulTo(self, num, out)
      }
      BN.prototype.mulTo = function mulTo(num, out) {
        var res
        var len = this.length + num.length
        if (this.length === 10 && num.length === 10) {
          res = comb10MulTo(this, num, out)
        } else if (len < 63) {
          res = smallMulTo(this, num, out)
        } else if (len < 1024) {
          res = bigMulTo(this, num, out)
        } else {
          res = jumboMulTo(this, num, out)
        }
        return res
      }
      BN.prototype.mul = function mul(num) {
        var out = new BN(null)
        out.words = new Array(this.length + num.length)
        return this.mulTo(num, out)
      }
      BN.prototype.mulf = function mulf(num) {
        var out = new BN(null)
        out.words = new Array(this.length + num.length)
        return jumboMulTo(this, num, out)
      }
      BN.prototype.imul = function imul(num) {
        return this.clone().mulTo(num, this)
      }
      BN.prototype.imuln = function imuln(num) {
        var isNegNum = num < 0
        if (isNegNum) num = -num
        assert(typeof num === "number")
        assert(num < 67108864)
        var carry = 0
        for (var i = 0; i < this.length; i++) {
          var w = (this.words[i] | 0) * num
          var lo = (w & 67108863) + (carry & 67108863)
          carry >>= 26
          carry += (w / 67108864) | 0
          carry += lo >>> 26
          this.words[i] = lo & 67108863
        }
        if (carry !== 0) {
          this.words[i] = carry
          this.length++
        }
        return isNegNum ? this.ineg() : this
      }
      BN.prototype.muln = function muln(num) {
        return this.clone().imuln(num)
      }
      BN.prototype.sqr = function sqr() {
        return this.mul(this)
      }
      BN.prototype.isqr = function isqr() {
        return this.imul(this.clone())
      }
      BN.prototype.pow = function pow(num) {
        var w = toBitArray(num)
        if (w.length === 0) return new BN(1)
        var res = this
        for (var i = 0; i < w.length; i++, res = res.sqr()) {
          if (w[i] !== 0) break
        }
        if (++i < w.length) {
          for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
            if (w[i] === 0) continue
            res = res.mul(q)
          }
        }
        return res
      }
      BN.prototype.iushln = function iushln(bits) {
        assert(typeof bits === "number" && bits >= 0)
        var r = bits % 26
        var s = (bits - r) / 26
        var carryMask = (67108863 >>> (26 - r)) << (26 - r)
        var i
        if (r !== 0) {
          var carry = 0
          for (i = 0; i < this.length; i++) {
            var newCarry = this.words[i] & carryMask
            var c = ((this.words[i] | 0) - newCarry) << r
            this.words[i] = c | carry
            carry = newCarry >>> (26 - r)
          }
          if (carry) {
            this.words[i] = carry
            this.length++
          }
        }
        if (s !== 0) {
          for (i = this.length - 1; i >= 0; i--) {
            this.words[i + s] = this.words[i]
          }
          for (i = 0; i < s; i++) {
            this.words[i] = 0
          }
          this.length += s
        }
        return this._strip()
      }
      BN.prototype.ishln = function ishln(bits) {
        assert(this.negative === 0)
        return this.iushln(bits)
      }
      BN.prototype.iushrn = function iushrn(bits, hint, extended) {
        assert(typeof bits === "number" && bits >= 0)
        var h
        if (hint) {
          h = (hint - (hint % 26)) / 26
        } else {
          h = 0
        }
        var r = bits % 26
        var s = Math.min((bits - r) / 26, this.length)
        var mask = 67108863 ^ ((67108863 >>> r) << r)
        var maskedWords = extended
        h -= s
        h = Math.max(0, h)
        if (maskedWords) {
          for (var i = 0; i < s; i++) {
            maskedWords.words[i] = this.words[i]
          }
          maskedWords.length = s
        }
        if (s === 0);
        else if (this.length > s) {
          this.length -= s
          for (i = 0; i < this.length; i++) {
            this.words[i] = this.words[i + s]
          }
        } else {
          this.words[0] = 0
          this.length = 1
        }
        var carry = 0
        for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
          var word = this.words[i] | 0
          this.words[i] = (carry << (26 - r)) | (word >>> r)
          carry = word & mask
        }
        if (maskedWords && carry !== 0) {
          maskedWords.words[maskedWords.length++] = carry
        }
        if (this.length === 0) {
          this.words[0] = 0
          this.length = 1
        }
        return this._strip()
      }
      BN.prototype.ishrn = function ishrn(bits, hint, extended) {
        assert(this.negative === 0)
        return this.iushrn(bits, hint, extended)
      }
      BN.prototype.shln = function shln(bits) {
        return this.clone().ishln(bits)
      }
      BN.prototype.ushln = function ushln(bits) {
        return this.clone().iushln(bits)
      }
      BN.prototype.shrn = function shrn(bits) {
        return this.clone().ishrn(bits)
      }
      BN.prototype.ushrn = function ushrn(bits) {
        return this.clone().iushrn(bits)
      }
      BN.prototype.testn = function testn(bit) {
        assert(typeof bit === "number" && bit >= 0)
        var r = bit % 26
        var s = (bit - r) / 26
        var q = 1 << r
        if (this.length <= s) return false
        var w = this.words[s]
        return !!(w & q)
      }
      BN.prototype.imaskn = function imaskn(bits) {
        assert(typeof bits === "number" && bits >= 0)
        var r = bits % 26
        var s = (bits - r) / 26
        assert(this.negative === 0, "imaskn works only with positive numbers")
        if (this.length <= s) {
          return this
        }
        if (r !== 0) {
          s++
        }
        this.length = Math.min(s, this.length)
        if (r !== 0) {
          var mask = 67108863 ^ ((67108863 >>> r) << r)
          this.words[this.length - 1] &= mask
        }
        return this._strip()
      }
      BN.prototype.maskn = function maskn(bits) {
        return this.clone().imaskn(bits)
      }
      BN.prototype.iaddn = function iaddn(num) {
        assert(typeof num === "number")
        assert(num < 67108864)
        if (num < 0) return this.isubn(-num)
        if (this.negative !== 0) {
          if (this.length === 1 && (this.words[0] | 0) <= num) {
            this.words[0] = num - (this.words[0] | 0)
            this.negative = 0
            return this
          }
          this.negative = 0
          this.isubn(num)
          this.negative = 1
          return this
        }
        return this._iaddn(num)
      }
      BN.prototype._iaddn = function _iaddn(num) {
        this.words[0] += num
        for (var i = 0; i < this.length && this.words[i] >= 67108864; i++) {
          this.words[i] -= 67108864
          if (i === this.length - 1) {
            this.words[i + 1] = 1
          } else {
            this.words[i + 1]++
          }
        }
        this.length = Math.max(this.length, i + 1)
        return this
      }
      BN.prototype.isubn = function isubn(num) {
        assert(typeof num === "number")
        assert(num < 67108864)
        if (num < 0) return this.iaddn(-num)
        if (this.negative !== 0) {
          this.negative = 0
          this.iaddn(num)
          this.negative = 1
          return this
        }
        this.words[0] -= num
        if (this.length === 1 && this.words[0] < 0) {
          this.words[0] = -this.words[0]
          this.negative = 1
        } else {
          for (var i = 0; i < this.length && this.words[i] < 0; i++) {
            this.words[i] += 67108864
            this.words[i + 1] -= 1
          }
        }
        return this._strip()
      }
      BN.prototype.addn = function addn(num) {
        return this.clone().iaddn(num)
      }
      BN.prototype.subn = function subn(num) {
        return this.clone().isubn(num)
      }
      BN.prototype.iabs = function iabs() {
        this.negative = 0
        return this
      }
      BN.prototype.abs = function abs() {
        return this.clone().iabs()
      }
      BN.prototype._ishlnsubmul = function _ishlnsubmul(num, mul, shift) {
        var len = num.length + shift
        var i
        this._expand(len)
        var w
        var carry = 0
        for (i = 0; i < num.length; i++) {
          w = (this.words[i + shift] | 0) + carry
          var right = (num.words[i] | 0) * mul
          w -= right & 67108863
          carry = (w >> 26) - ((right / 67108864) | 0)
          this.words[i + shift] = w & 67108863
        }
        for (; i < this.length - shift; i++) {
          w = (this.words[i + shift] | 0) + carry
          carry = w >> 26
          this.words[i + shift] = w & 67108863
        }
        if (carry === 0) return this._strip()
        assert(carry === -1)
        carry = 0
        for (i = 0; i < this.length; i++) {
          w = -(this.words[i] | 0) + carry
          carry = w >> 26
          this.words[i] = w & 67108863
        }
        this.negative = 1
        return this._strip()
      }
      BN.prototype._wordDiv = function _wordDiv(num, mode) {
        var shift = this.length - num.length
        var a = this.clone()
        var b = num
        var bhi = b.words[b.length - 1] | 0
        var bhiBits = this._countBits(bhi)
        shift = 26 - bhiBits
        if (shift !== 0) {
          b = b.ushln(shift)
          a.iushln(shift)
          bhi = b.words[b.length - 1] | 0
        }
        var m = a.length - b.length
        var q
        if (mode !== "mod") {
          q = new BN(null)
          q.length = m + 1
          q.words = new Array(q.length)
          for (var i = 0; i < q.length; i++) {
            q.words[i] = 0
          }
        }
        var diff = a.clone()._ishlnsubmul(b, 1, m)
        if (diff.negative === 0) {
          a = diff
          if (q) {
            q.words[m] = 1
          }
        }
        for (var j = m - 1; j >= 0; j--) {
          var qj = (a.words[b.length + j] | 0) * 67108864 + (a.words[b.length + j - 1] | 0)
          qj = Math.min((qj / bhi) | 0, 67108863)
          a._ishlnsubmul(b, qj, j)
          while (a.negative !== 0) {
            qj--
            a.negative = 0
            a._ishlnsubmul(b, 1, j)
            if (!a.isZero()) {
              a.negative ^= 1
            }
          }
          if (q) {
            q.words[j] = qj
          }
        }
        if (q) {
          q._strip()
        }
        a._strip()
        if (mode !== "div" && shift !== 0) {
          a.iushrn(shift)
        }
        return { div: q || null, mod: a }
      }
      BN.prototype.divmod = function divmod(num, mode, positive) {
        assert(!num.isZero())
        if (this.isZero()) {
          return { div: new BN(0), mod: new BN(0) }
        }
        var div, mod, res
        if (this.negative !== 0 && num.negative === 0) {
          res = this.neg().divmod(num, mode)
          if (mode !== "mod") {
            div = res.div.neg()
          }
          if (mode !== "div") {
            mod = res.mod.neg()
            if (positive && mod.negative !== 0) {
              mod.iadd(num)
            }
          }
          return { div: div, mod: mod }
        }
        if (this.negative === 0 && num.negative !== 0) {
          res = this.divmod(num.neg(), mode)
          if (mode !== "mod") {
            div = res.div.neg()
          }
          return { div: div, mod: res.mod }
        }
        if ((this.negative & num.negative) !== 0) {
          res = this.neg().divmod(num.neg(), mode)
          if (mode !== "div") {
            mod = res.mod.neg()
            if (positive && mod.negative !== 0) {
              mod.isub(num)
            }
          }
          return { div: res.div, mod: mod }
        }
        if (num.length > this.length || this.cmp(num) < 0) {
          return { div: new BN(0), mod: this }
        }
        if (num.length === 1) {
          if (mode === "div") {
            return { div: this.divn(num.words[0]), mod: null }
          }
          if (mode === "mod") {
            return { div: null, mod: new BN(this.modrn(num.words[0])) }
          }
          return { div: this.divn(num.words[0]), mod: new BN(this.modrn(num.words[0])) }
        }
        return this._wordDiv(num, mode)
      }
      BN.prototype.div = function div(num) {
        return this.divmod(num, "div", false).div
      }
      BN.prototype.mod = function mod(num) {
        return this.divmod(num, "mod", false).mod
      }
      BN.prototype.umod = function umod(num) {
        return this.divmod(num, "mod", true).mod
      }
      BN.prototype.divRound = function divRound(num) {
        var dm = this.divmod(num)
        if (dm.mod.isZero()) return dm.div
        var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod
        var half = num.ushrn(1)
        var r2 = num.andln(1)
        var cmp = mod.cmp(half)
        if (cmp < 0 || (r2 === 1 && cmp === 0)) return dm.div
        return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1)
      }
      BN.prototype.modrn = function modrn(num) {
        var isNegNum = num < 0
        if (isNegNum) num = -num
        assert(num <= 67108863)
        var p = (1 << 26) % num
        var acc = 0
        for (var i = this.length - 1; i >= 0; i--) {
          acc = (p * acc + (this.words[i] | 0)) % num
        }
        return isNegNum ? -acc : acc
      }
      BN.prototype.modn = function modn(num) {
        return this.modrn(num)
      }
      BN.prototype.idivn = function idivn(num) {
        var isNegNum = num < 0
        if (isNegNum) num = -num
        assert(num <= 67108863)
        var carry = 0
        for (var i = this.length - 1; i >= 0; i--) {
          var w = (this.words[i] | 0) + carry * 67108864
          this.words[i] = (w / num) | 0
          carry = w % num
        }
        this._strip()
        return isNegNum ? this.ineg() : this
      }
      BN.prototype.divn = function divn(num) {
        return this.clone().idivn(num)
      }
      BN.prototype.egcd = function egcd(p) {
        assert(p.negative === 0)
        assert(!p.isZero())
        var x = this
        var y = p.clone()
        if (x.negative !== 0) {
          x = x.umod(p)
        } else {
          x = x.clone()
        }
        var A = new BN(1)
        var B = new BN(0)
        var C = new BN(0)
        var D = new BN(1)
        var g = 0
        while (x.isEven() && y.isEven()) {
          x.iushrn(1)
          y.iushrn(1)
          ++g
        }
        var yp = y.clone()
        var xp = x.clone()
        while (!x.isZero()) {
          for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
          if (i > 0) {
            x.iushrn(i)
            while (i-- > 0) {
              if (A.isOdd() || B.isOdd()) {
                A.iadd(yp)
                B.isub(xp)
              }
              A.iushrn(1)
              B.iushrn(1)
            }
          }
          for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
          if (j > 0) {
            y.iushrn(j)
            while (j-- > 0) {
              if (C.isOdd() || D.isOdd()) {
                C.iadd(yp)
                D.isub(xp)
              }
              C.iushrn(1)
              D.iushrn(1)
            }
          }
          if (x.cmp(y) >= 0) {
            x.isub(y)
            A.isub(C)
            B.isub(D)
          } else {
            y.isub(x)
            C.isub(A)
            D.isub(B)
          }
        }
        return { a: C, b: D, gcd: y.iushln(g) }
      }
      BN.prototype._invmp = function _invmp(p) {
        assert(p.negative === 0)
        assert(!p.isZero())
        var a = this
        var b = p.clone()
        if (a.negative !== 0) {
          a = a.umod(p)
        } else {
          a = a.clone()
        }
        var x1 = new BN(1)
        var x2 = new BN(0)
        var delta = b.clone()
        while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
          for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
          if (i > 0) {
            a.iushrn(i)
            while (i-- > 0) {
              if (x1.isOdd()) {
                x1.iadd(delta)
              }
              x1.iushrn(1)
            }
          }
          for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
          if (j > 0) {
            b.iushrn(j)
            while (j-- > 0) {
              if (x2.isOdd()) {
                x2.iadd(delta)
              }
              x2.iushrn(1)
            }
          }
          if (a.cmp(b) >= 0) {
            a.isub(b)
            x1.isub(x2)
          } else {
            b.isub(a)
            x2.isub(x1)
          }
        }
        var res
        if (a.cmpn(1) === 0) {
          res = x1
        } else {
          res = x2
        }
        if (res.cmpn(0) < 0) {
          res.iadd(p)
        }
        return res
      }
      BN.prototype.gcd = function gcd(num) {
        if (this.isZero()) return num.abs()
        if (num.isZero()) return this.abs()
        var a = this.clone()
        var b = num.clone()
        a.negative = 0
        b.negative = 0
        for (var shift = 0; a.isEven() && b.isEven(); shift++) {
          a.iushrn(1)
          b.iushrn(1)
        }
        do {
          while (a.isEven()) {
            a.iushrn(1)
          }
          while (b.isEven()) {
            b.iushrn(1)
          }
          var r = a.cmp(b)
          if (r < 0) {
            var t = a
            a = b
            b = t
          } else if (r === 0 || b.cmpn(1) === 0) {
            break
          }
          a.isub(b)
        } while (true)
        return b.iushln(shift)
      }
      BN.prototype.invm = function invm(num) {
        return this.egcd(num).a.umod(num)
      }
      BN.prototype.isEven = function isEven() {
        return (this.words[0] & 1) === 0
      }
      BN.prototype.isOdd = function isOdd() {
        return (this.words[0] & 1) === 1
      }
      BN.prototype.andln = function andln(num) {
        return this.words[0] & num
      }
      BN.prototype.bincn = function bincn(bit) {
        assert(typeof bit === "number")
        var r = bit % 26
        var s = (bit - r) / 26
        var q = 1 << r
        if (this.length <= s) {
          this._expand(s + 1)
          this.words[s] |= q
          return this
        }
        var carry = q
        for (var i = s; carry !== 0 && i < this.length; i++) {
          var w = this.words[i] | 0
          w += carry
          carry = w >>> 26
          w &= 67108863
          this.words[i] = w
        }
        if (carry !== 0) {
          this.words[i] = carry
          this.length++
        }
        return this
      }
      BN.prototype.isZero = function isZero() {
        return this.length === 1 && this.words[0] === 0
      }
      BN.prototype.cmpn = function cmpn(num) {
        var negative = num < 0
        if (this.negative !== 0 && !negative) return -1
        if (this.negative === 0 && negative) return 1
        this._strip()
        var res
        if (this.length > 1) {
          res = 1
        } else {
          if (negative) {
            num = -num
          }
          assert(num <= 67108863, "Number is too big")
          var w = this.words[0] | 0
          res = w === num ? 0 : w < num ? -1 : 1
        }
        if (this.negative !== 0) return -res | 0
        return res
      }
      BN.prototype.cmp = function cmp(num) {
        if (this.negative !== 0 && num.negative === 0) return -1
        if (this.negative === 0 && num.negative !== 0) return 1
        var res = this.ucmp(num)
        if (this.negative !== 0) return -res | 0
        return res
      }
      BN.prototype.ucmp = function ucmp(num) {
        if (this.length > num.length) return 1
        if (this.length < num.length) return -1
        var res = 0
        for (var i = this.length - 1; i >= 0; i--) {
          var a = this.words[i] | 0
          var b = num.words[i] | 0
          if (a === b) continue
          if (a < b) {
            res = -1
          } else if (a > b) {
            res = 1
          }
          break
        }
        return res
      }
      BN.prototype.gtn = function gtn(num) {
        return this.cmpn(num) === 1
      }
      BN.prototype.gt = function gt(num) {
        return this.cmp(num) === 1
      }
      BN.prototype.gten = function gten(num) {
        return this.cmpn(num) >= 0
      }
      BN.prototype.gte = function gte(num) {
        return this.cmp(num) >= 0
      }
      BN.prototype.ltn = function ltn(num) {
        return this.cmpn(num) === -1
      }
      BN.prototype.lt = function lt(num) {
        return this.cmp(num) === -1
      }
      BN.prototype.lten = function lten(num) {
        return this.cmpn(num) <= 0
      }
      BN.prototype.lte = function lte(num) {
        return this.cmp(num) <= 0
      }
      BN.prototype.eqn = function eqn(num) {
        return this.cmpn(num) === 0
      }
      BN.prototype.eq = function eq(num) {
        return this.cmp(num) === 0
      }
      BN.red = function red(num) {
        return new Red(num)
      }
      BN.prototype.toRed = function toRed(ctx) {
        assert(!this.red, "Already a number in reduction context")
        assert(this.negative === 0, "red works only with positives")
        return ctx.convertTo(this)._forceRed(ctx)
      }
      BN.prototype.fromRed = function fromRed() {
        assert(this.red, "fromRed works only with numbers in reduction context")
        return this.red.convertFrom(this)
      }
      BN.prototype._forceRed = function _forceRed(ctx) {
        this.red = ctx
        return this
      }
      BN.prototype.forceRed = function forceRed(ctx) {
        assert(!this.red, "Already a number in reduction context")
        return this._forceRed(ctx)
      }
      BN.prototype.redAdd = function redAdd(num) {
        assert(this.red, "redAdd works only with red numbers")
        return this.red.add(this, num)
      }
      BN.prototype.redIAdd = function redIAdd(num) {
        assert(this.red, "redIAdd works only with red numbers")
        return this.red.iadd(this, num)
      }
      BN.prototype.redSub = function redSub(num) {
        assert(this.red, "redSub works only with red numbers")
        return this.red.sub(this, num)
      }
      BN.prototype.redISub = function redISub(num) {
        assert(this.red, "redISub works only with red numbers")
        return this.red.isub(this, num)
      }
      BN.prototype.redShl = function redShl(num) {
        assert(this.red, "redShl works only with red numbers")
        return this.red.shl(this, num)
      }
      BN.prototype.redMul = function redMul(num) {
        assert(this.red, "redMul works only with red numbers")
        this.red._verify2(this, num)
        return this.red.mul(this, num)
      }
      BN.prototype.redIMul = function redIMul(num) {
        assert(this.red, "redMul works only with red numbers")
        this.red._verify2(this, num)
        return this.red.imul(this, num)
      }
      BN.prototype.redSqr = function redSqr() {
        assert(this.red, "redSqr works only with red numbers")
        this.red._verify1(this)
        return this.red.sqr(this)
      }
      BN.prototype.redISqr = function redISqr() {
        assert(this.red, "redISqr works only with red numbers")
        this.red._verify1(this)
        return this.red.isqr(this)
      }
      BN.prototype.redSqrt = function redSqrt() {
        assert(this.red, "redSqrt works only with red numbers")
        this.red._verify1(this)
        return this.red.sqrt(this)
      }
      BN.prototype.redInvm = function redInvm() {
        assert(this.red, "redInvm works only with red numbers")
        this.red._verify1(this)
        return this.red.invm(this)
      }
      BN.prototype.redNeg = function redNeg() {
        assert(this.red, "redNeg works only with red numbers")
        this.red._verify1(this)
        return this.red.neg(this)
      }
      BN.prototype.redPow = function redPow(num) {
        assert(this.red && !num.red, "redPow(normalNum)")
        this.red._verify1(this)
        return this.red.pow(this, num)
      }
      var primes = { k256: null, p224: null, p192: null, p25519: null }
      function MPrime(name, p) {
        this.name = name
        this.p = new BN(p, 16)
        this.n = this.p.bitLength()
        this.k = new BN(1).iushln(this.n).isub(this.p)
        this.tmp = this._tmp()
      }
      MPrime.prototype._tmp = function _tmp() {
        var tmp = new BN(null)
        tmp.words = new Array(Math.ceil(this.n / 13))
        return tmp
      }
      MPrime.prototype.ireduce = function ireduce(num) {
        var r = num
        var rlen
        do {
          this.split(r, this.tmp)
          r = this.imulK(r)
          r = r.iadd(this.tmp)
          rlen = r.bitLength()
        } while (rlen > this.n)
        var cmp = rlen < this.n ? -1 : r.ucmp(this.p)
        if (cmp === 0) {
          r.words[0] = 0
          r.length = 1
        } else if (cmp > 0) {
          r.isub(this.p)
        } else {
          if (r.strip !== undefined) {
            r.strip()
          } else {
            r._strip()
          }
        }
        return r
      }
      MPrime.prototype.split = function split(input, out) {
        input.iushrn(this.n, 0, out)
      }
      MPrime.prototype.imulK = function imulK(num) {
        return num.imul(this.k)
      }
      function K256() {
        MPrime.call(
          this,
          "k256",
          "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
        )
      }
      inherits(K256, MPrime)
      K256.prototype.split = function split(input, output) {
        var mask = 4194303
        var outLen = Math.min(input.length, 9)
        for (var i = 0; i < outLen; i++) {
          output.words[i] = input.words[i]
        }
        output.length = outLen
        if (input.length <= 9) {
          input.words[0] = 0
          input.length = 1
          return
        }
        var prev = input.words[9]
        output.words[output.length++] = prev & mask
        for (i = 10; i < input.length; i++) {
          var next = input.words[i] | 0
          input.words[i - 10] = ((next & mask) << 4) | (prev >>> 22)
          prev = next
        }
        prev >>>= 22
        input.words[i - 10] = prev
        if (prev === 0 && input.length > 10) {
          input.length -= 10
        } else {
          input.length -= 9
        }
      }
      K256.prototype.imulK = function imulK(num) {
        num.words[num.length] = 0
        num.words[num.length + 1] = 0
        num.length += 2
        var lo = 0
        for (var i = 0; i < num.length; i++) {
          var w = num.words[i] | 0
          lo += w * 977
          num.words[i] = lo & 67108863
          lo = w * 64 + ((lo / 67108864) | 0)
        }
        if (num.words[num.length - 1] === 0) {
          num.length--
          if (num.words[num.length - 1] === 0) {
            num.length--
          }
        }
        return num
      }
      function P224() {
        MPrime.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")
      }
      inherits(P224, MPrime)
      function P192() {
        MPrime.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")
      }
      inherits(P192, MPrime)
      function P25519() {
        MPrime.call(
          this,
          "25519",
          "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
        )
      }
      inherits(P25519, MPrime)
      P25519.prototype.imulK = function imulK(num) {
        var carry = 0
        for (var i = 0; i < num.length; i++) {
          var hi = (num.words[i] | 0) * 19 + carry
          var lo = hi & 67108863
          hi >>>= 26
          num.words[i] = lo
          carry = hi
        }
        if (carry !== 0) {
          num.words[num.length++] = carry
        }
        return num
      }
      BN._prime = function prime(name) {
        if (primes[name]) return primes[name]
        var prime
        if (name === "k256") {
          prime = new K256()
        } else if (name === "p224") {
          prime = new P224()
        } else if (name === "p192") {
          prime = new P192()
        } else if (name === "p25519") {
          prime = new P25519()
        } else {
          throw new Error("Unknown prime " + name)
        }
        primes[name] = prime
        return prime
      }
      function Red(m) {
        if (typeof m === "string") {
          var prime = BN._prime(m)
          this.m = prime.p
          this.prime = prime
        } else {
          assert(m.gtn(1), "modulus must be greater than 1")
          this.m = m
          this.prime = null
        }
      }
      Red.prototype._verify1 = function _verify1(a) {
        assert(a.negative === 0, "red works only with positives")
        assert(a.red, "red works only with red numbers")
      }
      Red.prototype._verify2 = function _verify2(a, b) {
        assert((a.negative | b.negative) === 0, "red works only with positives")
        assert(a.red && a.red === b.red, "red works only with red numbers")
      }
      Red.prototype.imod = function imod(a) {
        if (this.prime) return this.prime.ireduce(a)._forceRed(this)
        move(a, a.umod(this.m)._forceRed(this))
        return a
      }
      Red.prototype.neg = function neg(a) {
        if (a.isZero()) {
          return a.clone()
        }
        return this.m.sub(a)._forceRed(this)
      }
      Red.prototype.add = function add(a, b) {
        this._verify2(a, b)
        var res = a.add(b)
        if (res.cmp(this.m) >= 0) {
          res.isub(this.m)
        }
        return res._forceRed(this)
      }
      Red.prototype.iadd = function iadd(a, b) {
        this._verify2(a, b)
        var res = a.iadd(b)
        if (res.cmp(this.m) >= 0) {
          res.isub(this.m)
        }
        return res
      }
      Red.prototype.sub = function sub(a, b) {
        this._verify2(a, b)
        var res = a.sub(b)
        if (res.cmpn(0) < 0) {
          res.iadd(this.m)
        }
        return res._forceRed(this)
      }
      Red.prototype.isub = function isub(a, b) {
        this._verify2(a, b)
        var res = a.isub(b)
        if (res.cmpn(0) < 0) {
          res.iadd(this.m)
        }
        return res
      }
      Red.prototype.shl = function shl(a, num) {
        this._verify1(a)
        return this.imod(a.ushln(num))
      }
      Red.prototype.imul = function imul(a, b) {
        this._verify2(a, b)
        return this.imod(a.imul(b))
      }
      Red.prototype.mul = function mul(a, b) {
        this._verify2(a, b)
        return this.imod(a.mul(b))
      }
      Red.prototype.isqr = function isqr(a) {
        return this.imul(a, a.clone())
      }
      Red.prototype.sqr = function sqr(a) {
        return this.mul(a, a)
      }
      Red.prototype.sqrt = function sqrt(a) {
        if (a.isZero()) return a.clone()
        var mod3 = this.m.andln(3)
        assert(mod3 % 2 === 1)
        if (mod3 === 3) {
          var pow = this.m.add(new BN(1)).iushrn(2)
          return this.pow(a, pow)
        }
        var q = this.m.subn(1)
        var s = 0
        while (!q.isZero() && q.andln(1) === 0) {
          s++
          q.iushrn(1)
        }
        assert(!q.isZero())
        var one = new BN(1).toRed(this)
        var nOne = one.redNeg()
        var lpow = this.m.subn(1).iushrn(1)
        var z = this.m.bitLength()
        z = new BN(2 * z * z).toRed(this)
        while (this.pow(z, lpow).cmp(nOne) !== 0) {
          z.redIAdd(nOne)
        }
        var c = this.pow(z, q)
        var r = this.pow(a, q.addn(1).iushrn(1))
        var t = this.pow(a, q)
        var m = s
        while (t.cmp(one) !== 0) {
          var tmp = t
          for (var i = 0; tmp.cmp(one) !== 0; i++) {
            tmp = tmp.redSqr()
          }
          assert(i < m)
          var b = this.pow(c, new BN(1).iushln(m - i - 1))
          r = r.redMul(b)
          c = b.redSqr()
          t = t.redMul(c)
          m = i
        }
        return r
      }
      Red.prototype.invm = function invm(a) {
        var inv = a._invmp(this.m)
        if (inv.negative !== 0) {
          inv.negative = 0
          return this.imod(inv).redNeg()
        } else {
          return this.imod(inv)
        }
      }
      Red.prototype.pow = function pow(a, num) {
        if (num.isZero()) return new BN(1).toRed(this)
        if (num.cmpn(1) === 0) return a.clone()
        var windowSize = 4
        var wnd = new Array(1 << windowSize)
        wnd[0] = new BN(1).toRed(this)
        wnd[1] = a
        for (var i = 2; i < wnd.length; i++) {
          wnd[i] = this.mul(wnd[i - 1], a)
        }
        var res = wnd[0]
        var current = 0
        var currentLen = 0
        var start = num.bitLength() % 26
        if (start === 0) {
          start = 26
        }
        for (i = num.length - 1; i >= 0; i--) {
          var word = num.words[i]
          for (var j = start - 1; j >= 0; j--) {
            var bit = (word >> j) & 1
            if (res !== wnd[0]) {
              res = this.sqr(res)
            }
            if (bit === 0 && current === 0) {
              currentLen = 0
              continue
            }
            current <<= 1
            current |= bit
            currentLen++
            if (currentLen !== windowSize && (i !== 0 || j !== 0)) continue
            res = this.mul(res, wnd[current])
            currentLen = 0
            current = 0
          }
          start = 26
        }
        return res
      }
      Red.prototype.convertTo = function convertTo(num) {
        var r = num.umod(this.m)
        return r === num ? r.clone() : r
      }
      Red.prototype.convertFrom = function convertFrom(num) {
        var res = num.clone()
        res.red = null
        return res
      }
      BN.mont = function mont(num) {
        return new Mont(num)
      }
      function Mont(m) {
        Red.call(this, m)
        this.shift = this.m.bitLength()
        if (this.shift % 26 !== 0) {
          this.shift += 26 - (this.shift % 26)
        }
        this.r = new BN(1).iushln(this.shift)
        this.r2 = this.imod(this.r.sqr())
        this.rinv = this.r._invmp(this.m)
        this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)
        this.minv = this.minv.umod(this.r)
        this.minv = this.r.sub(this.minv)
      }
      inherits(Mont, Red)
      Mont.prototype.convertTo = function convertTo(num) {
        return this.imod(num.ushln(this.shift))
      }
      Mont.prototype.convertFrom = function convertFrom(num) {
        var r = this.imod(num.mul(this.rinv))
        r.red = null
        return r
      }
      Mont.prototype.imul = function imul(a, b) {
        if (a.isZero() || b.isZero()) {
          a.words[0] = 0
          a.length = 1
          return a
        }
        var t = a.imul(b)
        var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m)
        var u = t.isub(c).iushrn(this.shift)
        var res = u
        if (u.cmp(this.m) >= 0) {
          res = u.isub(this.m)
        } else if (u.cmpn(0) < 0) {
          res = u.iadd(this.m)
        }
        return res._forceRed(this)
      }
      Mont.prototype.mul = function mul(a, b) {
        if (a.isZero() || b.isZero()) return new BN(0)._forceRed(this)
        var t = a.mul(b)
        var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m)
        var u = t.isub(c).iushrn(this.shift)
        var res = u
        if (u.cmp(this.m) >= 0) {
          res = u.isub(this.m)
        } else if (u.cmpn(0) < 0) {
          res = u.iadd(this.m)
        }
        return res._forceRed(this)
      }
      Mont.prototype.invm = function invm(a) {
        var res = this.imod(a._invmp(this.m).mul(this.r2))
        return res._forceRed(this)
      }
    })(module, commonjsGlobal)
  })
  var safeBuffer = createCommonjsModule(function (module, exports) {
    /*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
    var Buffer = bufferEs6.Buffer
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key]
      }
    }
    if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
      module.exports = bufferEs6
    } else {
      copyProps(bufferEs6, exports)
      exports.Buffer = SafeBuffer
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer(arg, encodingOrOffset, length)
    }
    SafeBuffer.prototype = Object.create(Buffer.prototype)
    copyProps(Buffer, SafeBuffer)
    SafeBuffer.from = function (arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number")
      }
      return Buffer(arg, encodingOrOffset, length)
    }
    SafeBuffer.alloc = function (size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number")
      }
      var buf = Buffer(size)
      if (fill !== undefined) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding)
        } else {
          buf.fill(fill)
        }
      } else {
        buf.fill(0)
      }
      return buf
    }
    SafeBuffer.allocUnsafe = function (size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number")
      }
      return Buffer(size)
    }
    SafeBuffer.allocUnsafeSlow = function (size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number")
      }
      return bufferEs6.SlowBuffer(size)
    }
  })
  var safeBuffer_1 = safeBuffer.Buffer
  var _Buffer = safeBuffer.Buffer
  function base(ALPHABET) {
    if (ALPHABET.length >= 255) {
      throw new TypeError("Alphabet too long")
    }
    var BASE_MAP = new Uint8Array(256)
    for (var j = 0; j < BASE_MAP.length; j++) {
      BASE_MAP[j] = 255
    }
    for (var i = 0; i < ALPHABET.length; i++) {
      var x = ALPHABET.charAt(i)
      var xc = x.charCodeAt(0)
      if (BASE_MAP[xc] !== 255) {
        throw new TypeError(x + " is ambiguous")
      }
      BASE_MAP[xc] = i
    }
    var BASE = ALPHABET.length
    var LEADER = ALPHABET.charAt(0)
    var FACTOR = Math.log(BASE) / Math.log(256)
    var iFACTOR = Math.log(256) / Math.log(BASE)
    function encode(source) {
      if (Array.isArray(source) || source instanceof Uint8Array) {
        source = _Buffer.from(source)
      }
      if (!_Buffer.isBuffer(source)) {
        throw new TypeError("Expected Buffer")
      }
      if (source.length === 0) {
        return ""
      }
      var zeroes = 0
      var length = 0
      var pbegin = 0
      var pend = source.length
      while (pbegin !== pend && source[pbegin] === 0) {
        pbegin++
        zeroes++
      }
      var size = ((pend - pbegin) * iFACTOR + 1) >>> 0
      var b58 = new Uint8Array(size)
      while (pbegin !== pend) {
        var carry = source[pbegin]
        var i = 0
        for (var it1 = size - 1; (carry !== 0 || i < length) && it1 !== -1; it1--, i++) {
          carry += (256 * b58[it1]) >>> 0
          b58[it1] = carry % BASE >>> 0
          carry = (carry / BASE) >>> 0
        }
        if (carry !== 0) {
          throw new Error("Non-zero carry")
        }
        length = i
        pbegin++
      }
      var it2 = size - length
      while (it2 !== size && b58[it2] === 0) {
        it2++
      }
      var str = LEADER.repeat(zeroes)
      for (; it2 < size; ++it2) {
        str += ALPHABET.charAt(b58[it2])
      }
      return str
    }
    function decodeUnsafe(source) {
      if (typeof source !== "string") {
        throw new TypeError("Expected String")
      }
      if (source.length === 0) {
        return _Buffer.alloc(0)
      }
      var psz = 0
      if (source[psz] === " ") {
        return
      }
      var zeroes = 0
      var length = 0
      while (source[psz] === LEADER) {
        zeroes++
        psz++
      }
      var size = ((source.length - psz) * FACTOR + 1) >>> 0
      var b256 = new Uint8Array(size)
      while (source[psz]) {
        var carry = BASE_MAP[source.charCodeAt(psz)]
        if (carry === 255) {
          return
        }
        var i = 0
        for (var it3 = size - 1; (carry !== 0 || i < length) && it3 !== -1; it3--, i++) {
          carry += (BASE * b256[it3]) >>> 0
          b256[it3] = carry % 256 >>> 0
          carry = (carry / 256) >>> 0
        }
        if (carry !== 0) {
          throw new Error("Non-zero carry")
        }
        length = i
        psz++
      }
      if (source[psz] === " ") {
        return
      }
      var it4 = size - length
      while (it4 !== size && b256[it4] === 0) {
        it4++
      }
      var vch = _Buffer.allocUnsafe(zeroes + (size - it4))
      vch.fill(0, 0, zeroes)
      var j = zeroes
      while (it4 !== size) {
        vch[j++] = b256[it4++]
      }
      return vch
    }
    function decode(string) {
      var buffer = decodeUnsafe(string)
      if (buffer) {
        return buffer
      }
      throw new Error("Non-base" + BASE + " character")
    }
    return { encode: encode, decodeUnsafe: decodeUnsafe, decode: decode }
  }
  var src = base
  var ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
  var bs58 = src(ALPHABET)
  const _globalThis = (() => {
    if (typeof self !== "undefined") {
      return self
    }
    if (typeof window !== "undefined") {
      return window
    }
    if (typeof commonjsGlobal !== "undefined") {
      return commonjsGlobal
    }
  })()
  const bufferToHex = (buffer) => {
    const view = new DataView(buffer)
    let hexCodes = ""
    for (let i = 0; i < view.byteLength; i += 4) {
      hexCodes += view.getUint32(i).toString(16).padStart(8, "0")
    }
    return hexCodes
  }
  const create = (algorithm) => async (buffer, options) => {
    if (typeof buffer === "string") {
      buffer = new _globalThis.TextEncoder().encode(buffer)
    }
    options = { outputFormat: "hex", ...options }
    const hash = await _globalThis.crypto.subtle.digest(algorithm, buffer)
    return options.outputFormat === "hex" ? bufferToHex(hash) : hash
  }
  var sha256 = create("SHA-256")
  var PublicKey = (function () {
    function PublicKey(value) {
      classCallCheck(this, PublicKey)
      defineProperty(this, "_bn", void 0)
      if (typeof value === "string") {
        if (value.startsWith("0x")) {
          this._bn = new bn(value.substring(2), 16)
        } else {
          var decoded = bs58.decode(value)
          if (decoded.length != 32) {
            throw new Error("Invalid public key input")
          }
          this._bn = new bn(decoded)
        }
      } else {
        this._bn = new bn(value)
      }
      if (this._bn.byteLength() > 32) {
        throw new Error("Invalid public key input")
      }
    }
    createClass(
      PublicKey,
      [
        {
          key: "equals",
          value: function equals(publicKey) {
            return this._bn.eq(publicKey._bn)
          },
        },
        {
          key: "toBase58",
          value: function toBase58() {
            return bs58.encode(this.toBuffer())
          },
        },
        {
          key: "toBuffer",
          value: function toBuffer() {
            var b = this._bn.toArrayLike(Buffer)
            if (b.length === 32) {
              return b
            }
            var zeroPad = Buffer.alloc(32)
            b.copy(zeroPad, 32 - b.length)
            return zeroPad
          },
        },
        {
          key: "toString",
          value: function toString() {
            return this.toBase58()
          },
        },
      ],
      [
        {
          key: "createWithSeed",
          value: (function () {
            var _createWithSeed = asyncToGenerator(
              regenerator.mark(function _callee(fromPublicKey, seed, programId) {
                var buffer, hash
                return regenerator.wrap(function _callee$(_context) {
                  while (1) {
                    switch ((_context.prev = _context.next)) {
                      case 0:
                        buffer = Buffer.concat([
                          fromPublicKey.toBuffer(),
                          Buffer.from(seed),
                          programId.toBuffer(),
                        ])
                        _context.next = 3
                        return sha256(new Uint8Array(buffer))
                      case 3:
                        hash = _context.sent
                        return _context.abrupt("return", new PublicKey("0x" + hash))
                      case 5:
                      case "end":
                        return _context.stop()
                    }
                  }
                }, _callee)
              })
            )
            function createWithSeed(_x, _x2, _x3) {
              return _createWithSeed.apply(this, arguments)
            }
            return createWithSeed
          })(),
        },
        {
          key: "createProgramAddress",
          value: (function () {
            var _createProgramAddress = asyncToGenerator(
              regenerator.mark(function _callee2(seeds, programId) {
                var buffer, hash
                return regenerator.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch ((_context2.prev = _context2.next)) {
                      case 0:
                        buffer = Buffer.alloc(0)
                        seeds.forEach(function (seed) {
                          buffer = Buffer.concat([buffer, Buffer.from(seed)])
                        })
                        buffer = Buffer.concat([
                          buffer,
                          programId.toBuffer(),
                          Buffer.from("ProgramDerivedAddress"),
                        ])
                        _context2.next = 5
                        return sha256(new Uint8Array(buffer))
                      case 5:
                        hash = _context2.sent
                        _context2.next = 8
                        return sha256(new Uint8Array(new bn(hash, 16).toBuffer()))
                      case 8:
                        hash = _context2.sent
                        return _context2.abrupt("return", new PublicKey("0x" + hash))
                      case 10:
                      case "end":
                        return _context2.stop()
                    }
                  }
                }, _callee2)
              })
            )
            function createProgramAddress(_x4, _x5) {
              return _createProgramAddress.apply(this, arguments)
            }
            return createProgramAddress
          })(),
        },
      ]
    )
    return PublicKey
  })()
  var Account = (function () {
    function Account(secretKey) {
      classCallCheck(this, Account)
      defineProperty(this, "_keypair", void 0)
      if (secretKey) {
        this._keypair = naclFast.sign.keyPair.fromSecretKey(toBuffer(secretKey))
      } else {
        this._keypair = naclFast.sign.keyPair()
      }
    }
    createClass(Account, [
      {
        key: "publicKey",
        get: function get() {
          return new PublicKey(this._keypair.publicKey)
        },
      },
      {
        key: "secretKey",
        get: function get() {
          return this._keypair.secretKey
        },
      },
    ])
    return Account
  })()
  function defaultSetTimout() {
    throw new Error("setTimeout has not been defined")
  }
  function defaultClearTimeout() {
    throw new Error("clearTimeout has not been defined")
  }
  var cachedSetTimeout = defaultSetTimout
  var cachedClearTimeout = defaultClearTimeout
  if (typeof global$1.setTimeout === "function") {
    cachedSetTimeout = setTimeout
  }
  if (typeof global$1.clearTimeout === "function") {
    cachedClearTimeout = clearTimeout
  }
  function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
      return setTimeout(fun, 0)
    }
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
      cachedSetTimeout = setTimeout
      return setTimeout(fun, 0)
    }
    try {
      return cachedSetTimeout(fun, 0)
    } catch (e) {
      try {
        return cachedSetTimeout.call(null, fun, 0)
      } catch (e) {
        return cachedSetTimeout.call(this, fun, 0)
      }
    }
  }
  function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
      return clearTimeout(marker)
    }
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
      cachedClearTimeout = clearTimeout
      return clearTimeout(marker)
    }
    try {
      return cachedClearTimeout(marker)
    } catch (e) {
      try {
        return cachedClearTimeout.call(null, marker)
      } catch (e) {
        return cachedClearTimeout.call(this, marker)
      }
    }
  }
  var queue = []
  var draining = false
  var currentQueue
  var queueIndex = -1
  function cleanUpNextTick() {
    if (!draining || !currentQueue) {
      return
    }
    draining = false
    if (currentQueue.length) {
      queue = currentQueue.concat(queue)
    } else {
      queueIndex = -1
    }
    if (queue.length) {
      drainQueue()
    }
  }
  function drainQueue() {
    if (draining) {
      return
    }
    var timeout = runTimeout(cleanUpNextTick)
    draining = true
    var len = queue.length
    while (len) {
      currentQueue = queue
      queue = []
      while (++queueIndex < len) {
        if (currentQueue) {
          currentQueue[queueIndex].run()
        }
      }
      queueIndex = -1
      len = queue.length
    }
    currentQueue = null
    draining = false
    runClearTimeout(timeout)
  }
  function nextTick(fun) {
    var args = new Array(arguments.length - 1)
    if (arguments.length > 1) {
      for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i]
      }
    }
    queue.push(new Item(fun, args))
    if (queue.length === 1 && !draining) {
      runTimeout(drainQueue)
    }
  }
  function Item(fun, array) {
    this.fun = fun
    this.array = array
  }
  Item.prototype.run = function () {
    this.fun.apply(null, this.array)
  }
  var title = "browser"
  var platform = "browser"
  var browser = true
  var env = {}
  var argv = []
  var version = ""
  var versions = {}
  var release = {}
  var config = {}
  function noop() {}
  var on = noop
  var addListener = noop
  var once = noop
  var off = noop
  var removeListener = noop
  var removeAllListeners = noop
  var emit = noop
  function binding(name) {
    throw new Error("process.binding is not supported")
  }
  function cwd() {
    return "/"
  }
  function chdir(dir) {
    throw new Error("process.chdir is not supported")
  }
  function umask() {
    return 0
  }
  var performance = global$1.performance || {}
  var performanceNow =
    performance.now ||
    performance.mozNow ||
    performance.msNow ||
    performance.oNow ||
    performance.webkitNow ||
    function () {
      return new Date().getTime()
    }
  function hrtime(previousTimestamp) {
    var clocktime = performanceNow.call(performance) * 0.001
    var seconds = Math.floor(clocktime)
    var nanoseconds = Math.floor((clocktime % 1) * 1e9)
    if (previousTimestamp) {
      seconds = seconds - previousTimestamp[0]
      nanoseconds = nanoseconds - previousTimestamp[1]
      if (nanoseconds < 0) {
        seconds--
        nanoseconds += 1e9
      }
    }
    return [seconds, nanoseconds]
  }
  var startTime = new Date()
  function uptime() {
    var currentTime = new Date()
    var dif = currentTime - startTime
    return dif / 1e3
  }
  var process = {
    nextTick: nextTick,
    title: title,
    browser: browser,
    env: env,
    argv: argv,
    version: version,
    versions: versions,
    on: on,
    addListener: addListener,
    once: once,
    off: off,
    removeListener: removeListener,
    removeAllListeners: removeAllListeners,
    emit: emit,
    binding: binding,
    cwd: cwd,
    chdir: chdir,
    umask: umask,
    hrtime: hrtime,
    platform: platform,
    release: release,
    config: config,
    uptime: uptime,
  }
  var inherits
  if (typeof Object.create === "function") {
    inherits = function inherits(ctor, superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: { value: ctor, enumerable: false, writable: true, configurable: true },
      })
    }
  } else {
    inherits = function inherits(ctor, superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
  var inherits$1 = inherits
  function inspect(obj, opts) {
    var ctx = { seen: [], stylize: stylizeNoColor }
    if (arguments.length >= 3) ctx.depth = arguments[2]
    if (arguments.length >= 4) ctx.colors = arguments[3]
    if (isBoolean(opts)) {
      ctx.showHidden = opts
    } else if (opts) {
      _extend(ctx, opts)
    }
    if (isUndefined(ctx.showHidden)) ctx.showHidden = false
    if (isUndefined(ctx.depth)) ctx.depth = 2
    if (isUndefined(ctx.colors)) ctx.colors = false
    if (isUndefined(ctx.customInspect)) ctx.customInspect = true
    if (ctx.colors) ctx.stylize = stylizeWithColor
    return formatValue(ctx, obj, ctx.depth)
  }
  inspect.colors = {
    bold: [1, 22],
    italic: [3, 23],
    underline: [4, 24],
    inverse: [7, 27],
    white: [37, 39],
    grey: [90, 39],
    black: [30, 39],
    blue: [34, 39],
    cyan: [36, 39],
    green: [32, 39],
    magenta: [35, 39],
    red: [31, 39],
    yellow: [33, 39],
  }
  inspect.styles = {
    special: "cyan",
    number: "yellow",
    boolean: "yellow",
    undefined: "grey",
    null: "bold",
    string: "green",
    date: "magenta",
    regexp: "red",
  }
  function stylizeWithColor(str, styleType) {
    var style = inspect.styles[styleType]
    if (style) {
      return "[" + inspect.colors[style][0] + "m" + str + "[" + inspect.colors[style][1] + "m"
    } else {
      return str
    }
  }
  function stylizeNoColor(str, styleType) {
    return str
  }
  function arrayToHash(array) {
    var hash = {}
    array.forEach(function (val, idx) {
      hash[val] = true
    })
    return hash
  }
  function formatValue(ctx, value, recurseTimes) {
    if (
      ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      value.inspect !== inspect &&
      !(value.constructor && value.constructor.prototype === value)
    ) {
      var ret = value.inspect(recurseTimes, ctx)
      if (!isString(ret)) {
        ret = formatValue(ctx, ret, recurseTimes)
      }
      return ret
    }
    var primitive = formatPrimitive(ctx, value)
    if (primitive) {
      return primitive
    }
    var keys = Object.keys(value)
    var visibleKeys = arrayToHash(keys)
    if (ctx.showHidden) {
      keys = Object.getOwnPropertyNames(value)
    }
    if (isError(value) && (keys.indexOf("message") >= 0 || keys.indexOf("description") >= 0)) {
      return formatError(value)
    }
    if (keys.length === 0) {
      if (isFunction(value)) {
        var name = value.name ? ": " + value.name : ""
        return ctx.stylize("[Function" + name + "]", "special")
      }
      if (isRegExp(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), "regexp")
      }
      if (isDate(value)) {
        return ctx.stylize(Date.prototype.toString.call(value), "date")
      }
      if (isError(value)) {
        return formatError(value)
      }
    }
    var base = "",
      array = false,
      braces = ["{", "}"]
    if (isArray$1(value)) {
      array = true
      braces = ["[", "]"]
    }
    if (isFunction(value)) {
      var n = value.name ? ": " + value.name : ""
      base = " [Function" + n + "]"
    }
    if (isRegExp(value)) {
      base = " " + RegExp.prototype.toString.call(value)
    }
    if (isDate(value)) {
      base = " " + Date.prototype.toUTCString.call(value)
    }
    if (isError(value)) {
      base = " " + formatError(value)
    }
    if (keys.length === 0 && (!array || value.length == 0)) {
      return braces[0] + base + braces[1]
    }
    if (recurseTimes < 0) {
      if (isRegExp(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), "regexp")
      } else {
        return ctx.stylize("[Object]", "special")
      }
    }
    ctx.seen.push(value)
    var output
    if (array) {
      output = formatArray(ctx, value, recurseTimes, visibleKeys, keys)
    } else {
      output = keys.map(function (key) {
        return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array)
      })
    }
    ctx.seen.pop()
    return reduceToSingleString(output, base, braces)
  }
  function formatPrimitive(ctx, value) {
    if (isUndefined(value)) return ctx.stylize("undefined", "undefined")
    if (isString(value)) {
      var simple =
        "'" +
        JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') +
        "'"
      return ctx.stylize(simple, "string")
    }
    if (isNumber(value)) return ctx.stylize("" + value, "number")
    if (isBoolean(value)) return ctx.stylize("" + value, "boolean")
    if (isNull(value)) return ctx.stylize("null", "null")
  }
  function formatError(value) {
    return "[" + Error.prototype.toString.call(value) + "]"
  }
  function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
    var output = []
    for (var i = 0, l = value.length; i < l; ++i) {
      if (hasOwnProperty(value, String(i))) {
        output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true))
      } else {
        output.push("")
      }
    }
    keys.forEach(function (key) {
      if (!key.match(/^\d+$/)) {
        output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true))
      }
    })
    return output
  }
  function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
    var name, str, desc
    desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] }
    if (desc.get) {
      if (desc.set) {
        str = ctx.stylize("[Getter/Setter]", "special")
      } else {
        str = ctx.stylize("[Getter]", "special")
      }
    } else {
      if (desc.set) {
        str = ctx.stylize("[Setter]", "special")
      }
    }
    if (!hasOwnProperty(visibleKeys, key)) {
      name = "[" + key + "]"
    }
    if (!str) {
      if (ctx.seen.indexOf(desc.value) < 0) {
        if (isNull(recurseTimes)) {
          str = formatValue(ctx, desc.value, null)
        } else {
          str = formatValue(ctx, desc.value, recurseTimes - 1)
        }
        if (str.indexOf("\n") > -1) {
          if (array) {
            str = str
              .split("\n")
              .map(function (line) {
                return "  " + line
              })
              .join("\n")
              .substr(2)
          } else {
            str =
              "\n" +
              str
                .split("\n")
                .map(function (line) {
                  return "   " + line
                })
                .join("\n")
          }
        }
      } else {
        str = ctx.stylize("[Circular]", "special")
      }
    }
    if (isUndefined(name)) {
      if (array && key.match(/^\d+$/)) {
        return str
      }
      name = JSON.stringify("" + key)
      if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
        name = name.substr(1, name.length - 2)
        name = ctx.stylize(name, "name")
      } else {
        name = name
          .replace(/'/g, "\\'")
          .replace(/\\"/g, '"')
          .replace(/(^"|"$)/g, "'")
        name = ctx.stylize(name, "string")
      }
    }
    return name + ": " + str
  }
  function reduceToSingleString(output, base, braces) {
    var length = output.reduce(function (prev, cur) {
      if (cur.indexOf("\n") >= 0);
      return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1
    }, 0)
    if (length > 60) {
      return (
        braces[0] + (base === "" ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1]
      )
    }
    return braces[0] + base + " " + output.join(", ") + " " + braces[1]
  }
  function isArray$1(ar) {
    return Array.isArray(ar)
  }
  function isBoolean(arg) {
    return typeof arg === "boolean"
  }
  function isNull(arg) {
    return arg === null
  }
  function isNullOrUndefined(arg) {
    return arg == null
  }
  function isNumber(arg) {
    return typeof arg === "number"
  }
  function isString(arg) {
    return typeof arg === "string"
  }
  function isUndefined(arg) {
    return arg === void 0
  }
  function isRegExp(re) {
    return isObject(re) && objectToString(re) === "[object RegExp]"
  }
  function isObject(arg) {
    return typeof arg === "object" && arg !== null
  }
  function isDate(d) {
    return isObject(d) && objectToString(d) === "[object Date]"
  }
  function isError(e) {
    return isObject(e) && (objectToString(e) === "[object Error]" || e instanceof Error)
  }
  function isFunction(arg) {
    return typeof arg === "function"
  }
  function isPrimitive(arg) {
    return (
      arg === null ||
      typeof arg === "boolean" ||
      typeof arg === "number" ||
      typeof arg === "string" ||
      typeof arg === "symbol" ||
      typeof arg === "undefined"
    )
  }
  function objectToString(o) {
    return Object.prototype.toString.call(o)
  }
  function _extend(origin, add) {
    if (!add || !isObject(add)) return origin
    var keys = Object.keys(add)
    var i = keys.length
    while (i--) {
      origin[keys[i]] = add[keys[i]]
    }
    return origin
  }
  function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop)
  }
  function compare(a, b) {
    if (a === b) {
      return 0
    }
    var x = a.length
    var y = b.length
    for (var i = 0, len = Math.min(x, y); i < len; ++i) {
      if (a[i] !== b[i]) {
        x = a[i]
        y = b[i]
        break
      }
    }
    if (x < y) {
      return -1
    }
    if (y < x) {
      return 1
    }
    return 0
  }
  var hasOwn = Object.prototype.hasOwnProperty
  var objectKeys =
    Object.keys ||
    function (obj) {
      var keys = []
      for (var key in obj) {
        if (hasOwn.call(obj, key)) keys.push(key)
      }
      return keys
    }
  var pSlice = Array.prototype.slice
  var _functionsHaveNames
  function functionsHaveNames() {
    if (typeof _functionsHaveNames !== "undefined") {
      return _functionsHaveNames
    }
    return (_functionsHaveNames = (function () {
      return function foo() {}.name === "foo"
    })())
  }
  function pToString(obj) {
    return Object.prototype.toString.call(obj)
  }
  function isView(arrbuf) {
    if (isBuffer(arrbuf)) {
      return false
    }
    if (typeof global$1.ArrayBuffer !== "function") {
      return false
    }
    if (typeof ArrayBuffer.isView === "function") {
      return ArrayBuffer.isView(arrbuf)
    }
    if (!arrbuf) {
      return false
    }
    if (arrbuf instanceof DataView) {
      return true
    }
    if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
      return true
    }
    return false
  }
  function assert(value, message) {
    if (!value) fail(value, true, message, "==", ok)
  }
  var regex = /\s*function\s+([^\(\s]*)\s*/
  function getName(func) {
    if (!isFunction(func)) {
      return
    }
    if (functionsHaveNames()) {
      return func.name
    }
    var str = func.toString()
    var match = str.match(regex)
    return match && match[1]
  }
  assert.AssertionError = AssertionError
  function AssertionError(options) {
    this.name = "AssertionError"
    this.actual = options.actual
    this.expected = options.expected
    this.operator = options.operator
    if (options.message) {
      this.message = options.message
      this.generatedMessage = false
    } else {
      this.message = getMessage(this)
      this.generatedMessage = true
    }
    var stackStartFunction = options.stackStartFunction || fail
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, stackStartFunction)
    } else {
      var err = new Error()
      if (err.stack) {
        var out = err.stack
        var fn_name = getName(stackStartFunction)
        var idx = out.indexOf("\n" + fn_name)
        if (idx >= 0) {
          var next_line = out.indexOf("\n", idx + 1)
          out = out.substring(next_line + 1)
        }
        this.stack = out
      }
    }
  }
  inherits$1(AssertionError, Error)
  function truncate(s, n) {
    if (typeof s === "string") {
      return s.length < n ? s : s.slice(0, n)
    } else {
      return s
    }
  }
  function inspect$1(something) {
    if (functionsHaveNames() || !isFunction(something)) {
      return inspect(something)
    }
    var rawname = getName(something)
    var name = rawname ? ": " + rawname : ""
    return "[Function" + name + "]"
  }
  function getMessage(self) {
    return (
      truncate(inspect$1(self.actual), 128) +
      " " +
      self.operator +
      " " +
      truncate(inspect$1(self.expected), 128)
    )
  }
  function fail(actual, expected, message, operator, stackStartFunction) {
    throw new AssertionError({
      message: message,
      actual: actual,
      expected: expected,
      operator: operator,
      stackStartFunction: stackStartFunction,
    })
  }
  assert.fail = fail
  function ok(value, message) {
    if (!value) fail(value, true, message, "==", ok)
  }
  assert.ok = ok
  assert.equal = equal
  function equal(actual, expected, message) {
    if (actual != expected) fail(actual, expected, message, "==", equal)
  }
  assert.notEqual = notEqual
  function notEqual(actual, expected, message) {
    if (actual == expected) {
      fail(actual, expected, message, "!=", notEqual)
    }
  }
  assert.deepEqual = deepEqual
  function deepEqual(actual, expected, message) {
    if (!_deepEqual(actual, expected, false)) {
      fail(actual, expected, message, "deepEqual", deepEqual)
    }
  }
  assert.deepStrictEqual = deepStrictEqual
  function deepStrictEqual(actual, expected, message) {
    if (!_deepEqual(actual, expected, true)) {
      fail(actual, expected, message, "deepStrictEqual", deepStrictEqual)
    }
  }
  function _deepEqual(actual, expected, strict, memos) {
    if (actual === expected) {
      return true
    } else if (isBuffer(actual) && isBuffer(expected)) {
      return compare(actual, expected) === 0
    } else if (isDate(actual) && isDate(expected)) {
      return actual.getTime() === expected.getTime()
    } else if (isRegExp(actual) && isRegExp(expected)) {
      return (
        actual.source === expected.source &&
        actual.global === expected.global &&
        actual.multiline === expected.multiline &&
        actual.lastIndex === expected.lastIndex &&
        actual.ignoreCase === expected.ignoreCase
      )
    } else if (
      (actual === null || typeof actual !== "object") &&
      (expected === null || typeof expected !== "object")
    ) {
      return strict ? actual === expected : actual == expected
    } else if (
      isView(actual) &&
      isView(expected) &&
      pToString(actual) === pToString(expected) &&
      !(actual instanceof Float32Array || actual instanceof Float64Array)
    ) {
      return compare(new Uint8Array(actual.buffer), new Uint8Array(expected.buffer)) === 0
    } else if (isBuffer(actual) !== isBuffer(expected)) {
      return false
    } else {
      memos = memos || { actual: [], expected: [] }
      var actualIndex = memos.actual.indexOf(actual)
      if (actualIndex !== -1) {
        if (actualIndex === memos.expected.indexOf(expected)) {
          return true
        }
      }
      memos.actual.push(actual)
      memos.expected.push(expected)
      return objEquiv(actual, expected, strict, memos)
    }
  }
  function isArguments(object) {
    return Object.prototype.toString.call(object) == "[object Arguments]"
  }
  function objEquiv(a, b, strict, actualVisitedObjects) {
    if (a === null || a === undefined || b === null || b === undefined) return false
    if (isPrimitive(a) || isPrimitive(b)) return a === b
    if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) return false
    var aIsArgs = isArguments(a)
    var bIsArgs = isArguments(b)
    if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs)) return false
    if (aIsArgs) {
      a = pSlice.call(a)
      b = pSlice.call(b)
      return _deepEqual(a, b, strict)
    }
    var ka = objectKeys(a)
    var kb = objectKeys(b)
    var key, i
    if (ka.length !== kb.length) return false
    ka.sort()
    kb.sort()
    for (i = ka.length - 1; i >= 0; i--) {
      if (ka[i] !== kb[i]) return false
    }
    for (i = ka.length - 1; i >= 0; i--) {
      key = ka[i]
      if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects)) return false
    }
    return true
  }
  assert.notDeepEqual = notDeepEqual
  function notDeepEqual(actual, expected, message) {
    if (_deepEqual(actual, expected, false)) {
      fail(actual, expected, message, "notDeepEqual", notDeepEqual)
    }
  }
  assert.notDeepStrictEqual = notDeepStrictEqual
  function notDeepStrictEqual(actual, expected, message) {
    if (_deepEqual(actual, expected, true)) {
      fail(actual, expected, message, "notDeepStrictEqual", notDeepStrictEqual)
    }
  }
  assert.strictEqual = strictEqual
  function strictEqual(actual, expected, message) {
    if (actual !== expected) {
      fail(actual, expected, message, "===", strictEqual)
    }
  }
  assert.notStrictEqual = notStrictEqual
  function notStrictEqual(actual, expected, message) {
    if (actual === expected) {
      fail(actual, expected, message, "!==", notStrictEqual)
    }
  }
  function expectedException(actual, expected) {
    if (!actual || !expected) {
      return false
    }
    if (Object.prototype.toString.call(expected) == "[object RegExp]") {
      return expected.test(actual)
    }
    try {
      if (actual instanceof expected) {
        return true
      }
    } catch (e) {}
    if (Error.isPrototypeOf(expected)) {
      return false
    }
    return expected.call({}, actual) === true
  }
  function _tryBlock(block) {
    var error
    try {
      block()
    } catch (e) {
      error = e
    }
    return error
  }
  function _throws(shouldThrow, block, expected, message) {
    var actual
    if (typeof block !== "function") {
      throw new TypeError('"block" argument must be a function')
    }
    if (typeof expected === "string") {
      message = expected
      expected = null
    }
    actual = _tryBlock(block)
    message =
      (expected && expected.name ? " (" + expected.name + ")." : ".") +
      (message ? " " + message : ".")
    if (shouldThrow && !actual) {
      fail(actual, expected, "Missing expected exception" + message)
    }
    var userProvidedMessage = typeof message === "string"
    var isUnwantedException = !shouldThrow && isError(actual)
    var isUnexpectedException = !shouldThrow && actual && !expected
    if (
      (isUnwantedException && userProvidedMessage && expectedException(actual, expected)) ||
      isUnexpectedException
    ) {
      fail(actual, expected, "Got unwanted exception" + message)
    }
    if (
      (shouldThrow && actual && expected && !expectedException(actual, expected)) ||
      (!shouldThrow && actual)
    ) {
      throw actual
    }
  }
  assert.throws = throws
  function throws(block, error, message) {
    _throws(true, block, error, message)
  }
  assert.doesNotThrow = doesNotThrow
  function doesNotThrow(block, error, message) {
    _throws(false, block, error, message)
  }
  assert.ifError = ifError
  function ifError(err) {
    if (err) throw err
  }
  class Layout {
    constructor(span, property) {
      if (!Number.isInteger(span)) {
        throw new TypeError("span must be an integer")
      }
      this.span = span
      this.property = property
    }
    makeDestinationObject() {
      return {}
    }
    decode(b, offset) {
      throw new Error("Layout is abstract")
    }
    encode(src, b, offset) {
      throw new Error("Layout is abstract")
    }
    getSpan(b, offset) {
      if (0 > this.span) {
        throw new RangeError("indeterminate span")
      }
      return this.span
    }
    replicate(property) {
      const rv = Object.create(this.constructor.prototype)
      Object.assign(rv, this)
      rv.property = property
      return rv
    }
    fromArray(values) {
      return undefined
    }
  }
  function nameWithProperty(name, lo) {
    if (lo.property) {
      return name + "[" + lo.property + "]"
    }
    return name
  }
  class ExternalLayout extends Layout {
    isCount() {
      throw new Error("ExternalLayout is abstract")
    }
  }
  class OffsetLayout extends ExternalLayout {
    constructor(layout, offset, property) {
      if (!(layout instanceof Layout)) {
        throw new TypeError("layout must be a Layout")
      }
      if (undefined === offset) {
        offset = 0
      } else if (!Number.isInteger(offset)) {
        throw new TypeError("offset must be integer or undefined")
      }
      super(layout.span, property || layout.property)
      this.layout = layout
      this.offset = offset
    }
    isCount() {
      return this.layout instanceof UInt || this.layout instanceof UIntBE
    }
    decode(b, offset) {
      if (undefined === offset) {
        offset = 0
      }
      return this.layout.decode(b, offset + this.offset)
    }
    encode(src, b, offset) {
      if (undefined === offset) {
        offset = 0
      }
      return this.layout.encode(src, b, offset + this.offset)
    }
  }
  class UInt extends Layout {
    constructor(span, property) {
      super(span, property)
      if (6 < this.span) {
        throw new RangeError("span must not exceed 6 bytes")
      }
    }
    decode(b, offset) {
      if (undefined === offset) {
        offset = 0
      }
      return b.readUIntLE(offset, this.span)
    }
    encode(src, b, offset) {
      if (undefined === offset) {
        offset = 0
      }
      b.writeUIntLE(src, offset, this.span)
      return this.span
    }
  }
  class UIntBE extends Layout {
    constructor(span, property) {
      super(span, property)
      if (6 < this.span) {
        throw new RangeError("span must not exceed 6 bytes")
      }
    }
    decode(b, offset) {
      if (undefined === offset) {
        offset = 0
      }
      return b.readUIntBE(offset, this.span)
    }
    encode(src, b, offset) {
      if (undefined === offset) {
        offset = 0
      }
      b.writeUIntBE(src, offset, this.span)
      return this.span
    }
  }
  const V2E32 = Math.pow(2, 32)
  function divmodInt64(src) {
    const hi32 = Math.floor(src / V2E32)
    const lo32 = src - hi32 * V2E32
    return { hi32: hi32, lo32: lo32 }
  }
  function roundedInt64(hi32, lo32) {
    return hi32 * V2E32 + lo32
  }
  class NearUInt64 extends Layout {
    constructor(property) {
      super(8, property)
    }
    decode(b, offset) {
      if (undefined === offset) {
        offset = 0
      }
      const lo32 = b.readUInt32LE(offset)
      const hi32 = b.readUInt32LE(offset + 4)
      return roundedInt64(hi32, lo32)
    }
    encode(src, b, offset) {
      if (undefined === offset) {
        offset = 0
      }
      const split = divmodInt64(src)
      b.writeUInt32LE(split.lo32, offset)
      b.writeUInt32LE(split.hi32, offset + 4)
      return 8
    }
  }
  class NearInt64 extends Layout {
    constructor(property) {
      super(8, property)
    }
    decode(b, offset) {
      if (undefined === offset) {
        offset = 0
      }
      const lo32 = b.readUInt32LE(offset)
      const hi32 = b.readInt32LE(offset + 4)
      return roundedInt64(hi32, lo32)
    }
    encode(src, b, offset) {
      if (undefined === offset) {
        offset = 0
      }
      const split = divmodInt64(src)
      b.writeUInt32LE(split.lo32, offset)
      b.writeInt32LE(split.hi32, offset + 4)
      return 8
    }
  }
  class Sequence extends Layout {
    constructor(elementLayout, count, property) {
      if (!(elementLayout instanceof Layout)) {
        throw new TypeError("elementLayout must be a Layout")
      }
      if (
        !(
          (count instanceof ExternalLayout && count.isCount()) ||
          (Number.isInteger(count) && 0 <= count)
        )
      ) {
        throw new TypeError(
          "count must be non-negative integer " + "or an unsigned integer ExternalLayout"
        )
      }
      let span = -1
      if (!(count instanceof ExternalLayout) && 0 < elementLayout.span) {
        span = count * elementLayout.span
      }
      super(span, property)
      this.elementLayout = elementLayout
      this.count = count
    }
    getSpan(b, offset) {
      if (0 <= this.span) {
        return this.span
      }
      if (undefined === offset) {
        offset = 0
      }
      let span = 0
      let count = this.count
      if (count instanceof ExternalLayout) {
        count = count.decode(b, offset)
      }
      if (0 < this.elementLayout.span) {
        span = count * this.elementLayout.span
      } else {
        let idx = 0
        while (idx < count) {
          span += this.elementLayout.getSpan(b, offset + span)
          ++idx
        }
      }
      return span
    }
    decode(b, offset) {
      if (undefined === offset) {
        offset = 0
      }
      const rv = []
      let i = 0
      let count = this.count
      if (count instanceof ExternalLayout) {
        count = count.decode(b, offset)
      }
      while (i < count) {
        rv.push(this.elementLayout.decode(b, offset))
        offset += this.elementLayout.getSpan(b, offset)
        i += 1
      }
      return rv
    }
    encode(src, b, offset) {
      if (undefined === offset) {
        offset = 0
      }
      const elo = this.elementLayout
      const span = src.reduce((span, v) => span + elo.encode(v, b, offset + span), 0)
      if (this.count instanceof ExternalLayout) {
        this.count.encode(src.length, b, offset)
      }
      return span
    }
  }
  class Structure extends Layout {
    constructor(fields, property, decodePrefixes) {
      if (!(Array.isArray(fields) && fields.reduce((acc, v) => acc && v instanceof Layout, true))) {
        throw new TypeError("fields must be array of Layout instances")
      }
      if ("boolean" === typeof property && undefined === decodePrefixes) {
        decodePrefixes = property
        property = undefined
      }
      for (const fd of fields) {
        if (0 > fd.span && undefined === fd.property) {
          throw new Error("fields cannot contain unnamed variable-length layout")
        }
      }
      let span = -1
      try {
        span = fields.reduce((span, fd) => span + fd.getSpan(), 0)
      } catch (e) {}
      super(span, property)
      this.fields = fields
      this.decodePrefixes = !!decodePrefixes
    }
    getSpan(b, offset) {
      if (0 <= this.span) {
        return this.span
      }
      if (undefined === offset) {
        offset = 0
      }
      let span = 0
      try {
        span = this.fields.reduce((span, fd) => {
          const fsp = fd.getSpan(b, offset)
          offset += fsp
          return span + fsp
        }, 0)
      } catch (e) {
        throw new RangeError("indeterminate span")
      }
      return span
    }
    decode(b, offset) {
      if (undefined === offset) {
        offset = 0
      }
      const dest = this.makeDestinationObject()
      for (const fd of this.fields) {
        if (undefined !== fd.property) {
          dest[fd.property] = fd.decode(b, offset)
        }
        offset += fd.getSpan(b, offset)
        if (this.decodePrefixes && b.length === offset) {
          break
        }
      }
      return dest
    }
    encode(src, b, offset) {
      if (undefined === offset) {
        offset = 0
      }
      const firstOffset = offset
      let lastOffset = 0
      let lastWrote = 0
      for (const fd of this.fields) {
        let span = fd.span
        lastWrote = 0 < span ? span : 0
        if (undefined === fd.property) {
          assert(0 < span)
        } else {
          const fv = src[fd.property]
          if (undefined !== fv) {
            lastWrote = fd.encode(fv, b, offset)
            if (0 > span) {
              span = fd.getSpan(b, offset)
            }
          }
        }
        lastOffset = offset
        offset += span
      }
      return lastOffset + lastWrote - firstOffset
    }
    fromArray(values) {
      const dest = this.makeDestinationObject()
      for (const fd of this.fields) {
        if (undefined !== fd.property && 0 < values.length) {
          dest[fd.property] = values.shift()
        }
      }
      return dest
    }
    layoutFor(property) {
      if ("string" !== typeof property) {
        throw new TypeError("property must be string")
      }
      for (const fd of this.fields) {
        if (fd.property === property) {
          return fd
        }
      }
    }
    offsetOf(property) {
      if ("string" !== typeof property) {
        throw new TypeError("property must be string")
      }
      let offset = 0
      for (const fd of this.fields) {
        if (fd.property === property) {
          return offset
        }
        if (0 > fd.span) {
          offset = -1
        } else if (0 <= offset) {
          offset += fd.span
        }
      }
    }
  }
  class Blob extends Layout {
    constructor(length, property) {
      if (
        !(
          (length instanceof ExternalLayout && length.isCount()) ||
          (Number.isInteger(length) && 0 <= length)
        )
      ) {
        throw new TypeError(
          "length must be positive integer " + "or an unsigned integer ExternalLayout"
        )
      }
      let span = -1
      if (!(length instanceof ExternalLayout)) {
        span = length
      }
      super(span, property)
      this.length = length
    }
    getSpan(b, offset) {
      let span = this.span
      if (0 > span) {
        span = this.length.decode(b, offset)
      }
      return span
    }
    decode(b, offset) {
      if (undefined === offset) {
        offset = 0
      }
      let span = this.span
      if (0 > span) {
        span = this.length.decode(b, offset)
      }
      return b.slice(offset, offset + span)
    }
    encode(src, b, offset) {
      let span = this.length
      if (this.length instanceof ExternalLayout) {
        span = src.length
      }
      if (!(src instanceof Buffer && span === src.length)) {
        throw new TypeError(
          nameWithProperty("Blob.encode", this) + " requires (length " + span + ") Buffer as src"
        )
      }
      if (offset + span > b.length) {
        throw new RangeError("encoding overruns Buffer")
      }
      b.write(src.toString("hex"), offset, span, "hex")
      if (this.length instanceof ExternalLayout) {
        this.length.encode(span, b, offset)
      }
      return span
    }
  }
  var offset = (layout, offset, property) => new OffsetLayout(layout, offset, property)
  var u8 = (property) => new UInt(1, property)
  var u32 = (property) => new UInt(4, property)
  var nu64 = (property) => new NearUInt64(property)
  var ns64 = (property) => new NearInt64(property)
  var struct = (fields, property, decodePrefixes) => new Structure(fields, property, decodePrefixes)
  var seq = (elementLayout, count, property) => new Sequence(elementLayout, count, property)
  var blob = (length, property) => new Blob(length, property)
  var NUM_TICKS_PER_SECOND = 160
  var DEFAULT_TICKS_PER_SLOT = 64
  var NUM_SLOTS_PER_SECOND = NUM_TICKS_PER_SECOND / DEFAULT_TICKS_PER_SLOT
  var MS_PER_SLOT = 1e3 / NUM_SLOTS_PER_SECOND
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i]
    }
    return arr2
  }
  var arrayLikeToArray = _arrayLikeToArray
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return arrayLikeToArray(arr)
  }
  var arrayWithoutHoles = _arrayWithoutHoles
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter)
  }
  var iterableToArray = _iterableToArray
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return
    if (typeof o === "string") return arrayLikeToArray(o, minLen)
    var n = Object.prototype.toString.call(o).slice(8, -1)
    if (n === "Object" && o.constructor) n = o.constructor.name
    if (n === "Map" || n === "Set") return Array.from(o)
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return arrayLikeToArray(o, minLen)
  }
  var unsupportedIterableToArray = _unsupportedIterableToArray
  function _nonIterableSpread() {
    throw new TypeError(
      "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    )
  }
  var nonIterableSpread = _nonIterableSpread
  function _toConsumableArray(arr) {
    return (
      arrayWithoutHoles(arr) ||
      iterableToArray(arr) ||
      unsupportedIterableToArray(arr) ||
      nonIterableSpread()
    )
  }
  var toConsumableArray = _toConsumableArray
  var publicKey = function publicKey() {
    var property = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "publicKey"
    return blob(32, property)
  }
  var rustString = function rustString() {
    var property = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "string"
    var rsl = struct(
      [u32("length"), u32("lengthPadding"), blob(offset(u32(), -8), "chars")],
      property
    )
    var _decode = rsl.decode.bind(rsl)
    var _encode = rsl.encode.bind(rsl)
    rsl.decode = function (buffer, offset) {
      var data = _decode(buffer, offset)
      return data.chars.toString("utf8")
    }
    rsl.encode = function (str, buffer, offset) {
      var data = { chars: Buffer.from(str, "utf8") }
      return _encode(data, buffer, offset)
    }
    rsl.alloc = function (str) {
      return u32().span + u32().span + Buffer.from(str, "utf8").length
    }
    return rsl
  }
  var authorized = function authorized() {
    var property = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "authorized"
    return struct([publicKey("staker"), publicKey("withdrawer")], property)
  }
  var lockup = function lockup() {
    var property = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "lockup"
    return struct([ns64("unixTimestamp"), ns64("epoch"), publicKey("custodian")], property)
  }
  function getAlloc(type, fields) {
    var alloc = 0
    type.layout.fields.forEach(function (item) {
      if (item.span >= 0) {
        alloc += item.span
      } else if (typeof item.alloc === "function") {
        alloc += item.alloc(fields[item.property])
      }
    })
    return alloc
  }
  function decodeLength(bytes) {
    var len = 0
    var size = 0
    for (;;) {
      var elem = bytes.shift()
      len |= (elem & 127) << (size * 7)
      size += 1
      if ((elem & 128) === 0) {
        break
      }
    }
    return len
  }
  function encodeLength(bytes, len) {
    var rem_len = len
    for (;;) {
      var elem = rem_len & 127
      rem_len >>= 7
      if (rem_len == 0) {
        bytes.push(elem)
        break
      } else {
        elem |= 128
        bytes.push(elem)
      }
    }
  }
  var Message = (function () {
    function Message(args) {
      classCallCheck(this, Message)
      defineProperty(this, "header", void 0)
      defineProperty(this, "accountKeys", void 0)
      defineProperty(this, "recentBlockhash", void 0)
      defineProperty(this, "instructions", void 0)
      this.header = args.header
      this.accountKeys = args.accountKeys.map(function (account) {
        return new PublicKey(account)
      })
      this.recentBlockhash = args.recentBlockhash
      this.instructions = args.instructions
    }
    createClass(Message, [
      {
        key: "isAccountWritable",
        value: function isAccountWritable(index) {
          return (
            index < this.header.numRequiredSignatures - this.header.numReadonlySignedAccounts ||
            (index >= this.header.numRequiredSignatures &&
              index < this.accountKeys.length - this.header.numReadonlyUnsignedAccounts)
          )
        },
      },
      {
        key: "serialize",
        value: function serialize() {
          var numKeys = this.accountKeys.length
          var keyCount = []
          encodeLength(keyCount, numKeys)
          var instructions = this.instructions.map(function (instruction) {
            var accounts = instruction.accounts,
              programIdIndex = instruction.programIdIndex
            var data = bs58.decode(instruction.data)
            var keyIndicesCount = []
            encodeLength(keyIndicesCount, accounts.length)
            var dataCount = []
            encodeLength(dataCount, data.length)
            return {
              programIdIndex: programIdIndex,
              keyIndicesCount: Buffer.from(keyIndicesCount),
              keyIndices: Buffer.from(accounts),
              dataLength: Buffer.from(dataCount),
              data: data,
            }
          })
          var instructionCount = []
          encodeLength(instructionCount, instructions.length)
          var instructionBuffer = Buffer.alloc(PACKET_DATA_SIZE)
          Buffer.from(instructionCount).copy(instructionBuffer)
          var instructionBufferLength = instructionCount.length
          instructions.forEach(function (instruction) {
            var instructionLayout = struct([
              u8("programIdIndex"),
              blob(instruction.keyIndicesCount.length, "keyIndicesCount"),
              seq(u8("keyIndex"), instruction.keyIndices.length, "keyIndices"),
              blob(instruction.dataLength.length, "dataLength"),
              seq(u8("userdatum"), instruction.data.length, "data"),
            ])
            var length = instructionLayout.encode(
              instruction,
              instructionBuffer,
              instructionBufferLength
            )
            instructionBufferLength += length
          })
          instructionBuffer = instructionBuffer.slice(0, instructionBufferLength)
          var signDataLayout = struct([
            blob(1, "numRequiredSignatures"),
            blob(1, "numReadonlySignedAccounts"),
            blob(1, "numReadonlyUnsignedAccounts"),
            blob(keyCount.length, "keyCount"),
            seq(publicKey("key"), numKeys, "keys"),
            publicKey("recentBlockhash"),
          ])
          var transaction = {
            numRequiredSignatures: Buffer.from([this.header.numRequiredSignatures]),
            numReadonlySignedAccounts: Buffer.from([this.header.numReadonlySignedAccounts]),
            numReadonlyUnsignedAccounts: Buffer.from([this.header.numReadonlyUnsignedAccounts]),
            keyCount: Buffer.from(keyCount),
            keys: this.accountKeys.map(function (key) {
              return key.toBuffer()
            }),
            recentBlockhash: bs58.decode(this.recentBlockhash),
          }
          var signData = Buffer.alloc(2048)
          var length = signDataLayout.encode(transaction, signData)
          instructionBuffer.copy(signData, length)
          return signData.slice(0, length + instructionBuffer.length)
        },
      },
    ])
    return Message
  })()
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (
        Array.isArray(o) ||
        (it = _unsupportedIterableToArray$1(o)) ||
        (allowArrayLike && o && typeof o.length === "number")
      ) {
        if (it) o = it
        var i = 0
        var F = function F() {}
        return {
          s: F,
          n: function n() {
            if (i >= o.length) return { done: true }
            return { done: false, value: o[i++] }
          },
          e: function e(_e) {
            throw _e
          },
          f: F,
        }
      }
      throw new TypeError(
        "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
      )
    }
    var normalCompletion = true,
      didErr = false,
      err
    return {
      s: function s() {
        it = o[Symbol.iterator]()
      },
      n: function n() {
        var step = it.next()
        normalCompletion = step.done
        return step
      },
      e: function e(_e2) {
        didErr = true
        err = _e2
      },
      f: function f() {
        try {
          if (!normalCompletion && it["return"] != null) it["return"]()
        } finally {
          if (didErr) throw err
        }
      },
    }
  }
  function _unsupportedIterableToArray$1(o, minLen) {
    if (!o) return
    if (typeof o === "string") return _arrayLikeToArray$1(o, minLen)
    var n = Object.prototype.toString.call(o).slice(8, -1)
    if (n === "Object" && o.constructor) n = o.constructor.name
    if (n === "Map" || n === "Set") return Array.from(o)
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray$1(o, minLen)
  }
  function _arrayLikeToArray$1(arr, len) {
    if (len == null || len > arr.length) len = arr.length
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i]
    }
    return arr2
  }
  var DEFAULT_SIGNATURE = Buffer.alloc(64).fill(0)
  var PACKET_DATA_SIZE = 1280 - 40 - 8
  var PUBKEY_LENGTH = 32
  var SIGNATURE_LENGTH = 64
  var TransactionInstruction = function TransactionInstruction(opts) {
    classCallCheck(this, TransactionInstruction)
    defineProperty(this, "keys", [])
    defineProperty(this, "programId", void 0)
    defineProperty(this, "data", Buffer.alloc(0))
    opts && Object.assign(this, opts)
  }
  var Transaction = (function () {
    createClass(Transaction, [
      {
        key: "signature",
        get: function get() {
          if (this.signatures.length > 0) {
            return this.signatures[0].signature
          }
          return null
        },
      },
    ])
    function Transaction(opts) {
      classCallCheck(this, Transaction)
      defineProperty(this, "signatures", [])
      defineProperty(this, "instructions", [])
      defineProperty(this, "recentBlockhash", void 0)
      defineProperty(this, "nonceInfo", void 0)
      opts && Object.assign(this, opts)
    }
    createClass(
      Transaction,
      [
        {
          key: "add",
          value: function add() {
            var _this = this
            for (
              var _len = arguments.length, items = new Array(_len), _key = 0;
              _key < _len;
              _key++
            ) {
              items[_key] = arguments[_key]
            }
            if (items.length === 0) {
              throw new Error("No instructions")
            }
            items.forEach(function (item) {
              if ("instructions" in item) {
                _this.instructions = _this.instructions.concat(item.instructions)
              } else if ("data" in item && "programId" in item && "keys" in item) {
                _this.instructions.push(item)
              } else {
                _this.instructions.push(new TransactionInstruction(item))
              }
            })
            return this
          },
        },
        {
          key: "compileMessage",
          value: function compileMessage() {
            var nonceInfo = this.nonceInfo
            if (nonceInfo && this.instructions[0] != nonceInfo.nonceInstruction) {
              this.recentBlockhash = nonceInfo.nonce
              this.instructions.unshift(nonceInfo.nonceInstruction)
            }
            var recentBlockhash = this.recentBlockhash
            if (!recentBlockhash) {
              throw new Error("Transaction recentBlockhash required")
            }
            if (this.instructions.length < 1) {
              throw new Error("No instructions provided")
            }
            var numReadonlySignedAccounts = 0
            var numReadonlyUnsignedAccounts = 0
            var programIds = []
            var accountMetas = []
            this.instructions.forEach(function (instruction) {
              instruction.keys.forEach(function (accountMeta) {
                accountMetas.push(accountMeta)
              })
              var programId = instruction.programId.toString()
              if (!programIds.includes(programId)) {
                programIds.push(programId)
              }
            })
            programIds.forEach(function (programId) {
              accountMetas.push({
                pubkey: new PublicKey(programId),
                isSigner: false,
                isWritable: false,
              })
            })
            accountMetas.sort(function (x, y) {
              var checkSigner = x.isSigner === y.isSigner ? 0 : x.isSigner ? -1 : 1
              var checkWritable = x.isWritable === y.isWritable ? 0 : x.isWritable ? -1 : 1
              return checkSigner || checkWritable
            })
            var uniqueMetas = []
            accountMetas.forEach(function (accountMeta) {
              var pubkeyString = accountMeta.pubkey.toString()
              var uniqueIndex = uniqueMetas.findIndex(function (x) {
                return x.pubkey.toString() === pubkeyString
              })
              if (uniqueIndex > -1) {
                uniqueMetas[uniqueIndex].isWritable =
                  uniqueMetas[uniqueIndex].isWritable || accountMeta.isWritable
              } else {
                uniqueMetas.push(accountMeta)
              }
            })
            this.signatures.forEach(function (signature) {
              var sigPubkeyString = signature.publicKey.toString()
              var uniqueIndex = uniqueMetas.findIndex(function (x) {
                return x.pubkey.toString() === sigPubkeyString
              })
              if (uniqueIndex > -1) {
                uniqueMetas[uniqueIndex].isSigner = true
              } else {
                uniqueMetas.unshift({
                  pubkey: new PublicKey(sigPubkeyString),
                  isSigner: true,
                  isWritable: true,
                })
              }
            })
            var signedKeys = []
            var unsignedKeys = []
            uniqueMetas.forEach(function (_ref) {
              var pubkey = _ref.pubkey,
                isSigner = _ref.isSigner,
                isWritable = _ref.isWritable
              if (isSigner) {
                var first = signedKeys.length === 0
                signedKeys.push(pubkey.toString())
                if (!first && !isWritable) {
                  numReadonlySignedAccounts += 1
                }
              } else {
                unsignedKeys.push(pubkey.toString())
                if (!isWritable) {
                  numReadonlyUnsignedAccounts += 1
                }
              }
            })
            if (this.signatures.length === 0) {
              var signatures = []
              signedKeys.forEach(function (pubkey) {
                signatures.push({ signature: null, publicKey: new PublicKey(pubkey) })
              })
              this.signatures = signatures
            }
            var accountKeys = signedKeys.concat(unsignedKeys)
            var instructions = this.instructions.map(function (instruction) {
              var data = instruction.data,
                programId = instruction.programId
              return {
                programIdIndex: accountKeys.indexOf(programId.toString()),
                accounts: instruction.keys.map(function (keyObj) {
                  return accountKeys.indexOf(keyObj.pubkey.toString())
                }),
                data: bs58.encode(data),
              }
            })
            instructions.forEach(function (instruction) {
              assert(instruction.programIdIndex >= 0)
              instruction.accounts.forEach(function (keyIndex) {
                return assert(keyIndex >= 0)
              })
            })
            return new Message({
              header: {
                numRequiredSignatures: this.signatures.length,
                numReadonlySignedAccounts: numReadonlySignedAccounts,
                numReadonlyUnsignedAccounts: numReadonlyUnsignedAccounts,
              },
              accountKeys: accountKeys,
              recentBlockhash: recentBlockhash,
              instructions: instructions,
            })
          },
        },
        {
          key: "serializeMessage",
          value: function serializeMessage() {
            return this.compileMessage().serialize()
          },
        },
        {
          key: "sign",
          value: function sign() {
            this.signPartial.apply(this, arguments)
          },
        },
        {
          key: "signPartial",
          value: function signPartial() {
            for (
              var _len2 = arguments.length, partialSigners = new Array(_len2), _key2 = 0;
              _key2 < _len2;
              _key2++
            ) {
              partialSigners[_key2] = arguments[_key2]
            }
            if (partialSigners.length === 0) {
              throw new Error("No signers")
            }
            function partialSignerPublicKey(accountOrPublicKey) {
              if ("publicKey" in accountOrPublicKey) {
                return accountOrPublicKey.publicKey
              }
              return accountOrPublicKey
            }
            function signerAccount(accountOrPublicKey) {
              if ("publicKey" in accountOrPublicKey && "secretKey" in accountOrPublicKey) {
                return accountOrPublicKey
              }
            }
            var signatures = partialSigners.map(function (accountOrPublicKey) {
              return { signature: null, publicKey: partialSignerPublicKey(accountOrPublicKey) }
            })
            this.signatures = signatures
            var signData = this.serializeMessage()
            partialSigners.forEach(function (accountOrPublicKey, index) {
              var account = signerAccount(accountOrPublicKey)
              if (account) {
                var signature = naclFast.sign.detached(signData, account.secretKey)
                assert(signature.length === 64)
                signatures[index].signature = Buffer.from(signature)
              }
            })
          },
        },
        {
          key: "addSigner",
          value: function addSigner(signer) {
            var signData = this.serializeMessage()
            var signature = naclFast.sign.detached(signData, signer.secretKey)
            this.addSignature(signer.publicKey, signature)
          },
        },
        {
          key: "addSignature",
          value: function addSignature(pubkey, signature) {
            assert(signature.length === 64)
            var index = this.signatures.findIndex(function (sigpair) {
              return pubkey.equals(sigpair.publicKey)
            })
            if (index < 0) {
              throw new Error("Unknown signer: ".concat(pubkey.toString()))
            }
            this.signatures[index].signature = Buffer.from(signature)
          },
        },
        {
          key: "verifySignatures",
          value: function verifySignatures() {
            var verified = true
            var signData = this.serializeMessage()
            var _iterator = _createForOfIteratorHelper(this.signatures),
              _step
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                var _step$value = _step.value,
                  signature = _step$value.signature,
                  publicKey = _step$value.publicKey
                if (!naclFast.sign.detached.verify(signData, signature, publicKey.toBuffer())) {
                  verified = false
                }
              }
            } catch (err) {
              _iterator.e(err)
            } finally {
              _iterator.f()
            }
            return verified
          },
        },
        {
          key: "serialize",
          value: function serialize() {
            var signatures = this.signatures
            if (!signatures || signatures.length === 0 || !this.verifySignatures()) {
              throw new Error("Transaction has not been signed")
            }
            var signData = this.serializeMessage()
            var signatureCount = []
            encodeLength(signatureCount, signatures.length)
            var transactionLength = signatureCount.length + signatures.length * 64 + signData.length
            var wireTransaction = Buffer.alloc(transactionLength)
            assert(signatures.length < 256)
            Buffer.from(signatureCount).copy(wireTransaction, 0)
            signatures.forEach(function (_ref2, index) {
              var signature = _ref2.signature
              if (signature !== null) {
                assert(signature.length === 64, "signature has invalid length")
                Buffer.from(signature).copy(wireTransaction, signatureCount.length + index * 64)
              }
            })
            signData.copy(wireTransaction, signatureCount.length + signatures.length * 64)
            assert(
              wireTransaction.length <= PACKET_DATA_SIZE,
              "Transaction too large: "
                .concat(wireTransaction.length, " > ")
                .concat(PACKET_DATA_SIZE)
            )
            return wireTransaction
          },
        },
        {
          key: "keys",
          get: function get() {
            assert(this.instructions.length === 1)
            return this.instructions[0].keys.map(function (keyObj) {
              return keyObj.pubkey
            })
          },
        },
        {
          key: "programId",
          get: function get() {
            assert(this.instructions.length === 1)
            return this.instructions[0].programId
          },
        },
        {
          key: "data",
          get: function get() {
            assert(this.instructions.length === 1)
            return this.instructions[0].data
          },
        },
      ],
      [
        {
          key: "from",
          value: function from(buffer) {
            var byteArray = toConsumableArray(buffer)
            var signatureCount = decodeLength(byteArray)
            var signatures = []
            for (var i = 0; i < signatureCount; i++) {
              var signature = byteArray.slice(0, SIGNATURE_LENGTH)
              byteArray = byteArray.slice(SIGNATURE_LENGTH)
              signatures.push(bs58.encode(Buffer.from(signature)))
            }
            var numRequiredSignatures = byteArray.shift()
            var numReadonlySignedAccounts = byteArray.shift()
            var numReadonlyUnsignedAccounts = byteArray.shift()
            var accountCount = decodeLength(byteArray)
            var accountKeys = []
            for (var _i = 0; _i < accountCount; _i++) {
              var account = byteArray.slice(0, PUBKEY_LENGTH)
              byteArray = byteArray.slice(PUBKEY_LENGTH)
              accountKeys.push(bs58.encode(Buffer.from(account)))
            }
            var recentBlockhash = byteArray.slice(0, PUBKEY_LENGTH)
            byteArray = byteArray.slice(PUBKEY_LENGTH)
            var instructionCount = decodeLength(byteArray)
            var instructions = []
            for (var _i2 = 0; _i2 < instructionCount; _i2++) {
              var instruction = {}
              instruction.programIdIndex = byteArray.shift()
              var _accountCount = decodeLength(byteArray)
              instruction.accounts = byteArray.slice(0, _accountCount)
              byteArray = byteArray.slice(_accountCount)
              var dataLength = decodeLength(byteArray)
              var data = byteArray.slice(0, dataLength)
              instruction.data = bs58.encode(Buffer.from(data))
              byteArray = byteArray.slice(dataLength)
              instructions.push(instruction)
            }
            var messageArgs = {
              header: {
                numRequiredSignatures: numRequiredSignatures,
                numReadonlySignedAccounts: numReadonlySignedAccounts,
                numReadonlyUnsignedAccounts: numReadonlyUnsignedAccounts,
              },
              recentBlockhash: bs58.encode(Buffer.from(recentBlockhash)),
              accountKeys: accountKeys,
              instructions: instructions,
            }
            return Transaction.populate(new Message(messageArgs), signatures)
          },
        },
        {
          key: "populate",
          value: function populate(message, signatures) {
            var transaction = new Transaction()
            transaction.recentBlockhash = message.recentBlockhash
            signatures.forEach(function (signature, index) {
              var sigPubkeyPair = {
                signature:
                  signature == bs58.encode(DEFAULT_SIGNATURE) ? null : bs58.decode(signature),
                publicKey: message.accountKeys[index],
              }
              transaction.signatures.push(sigPubkeyPair)
            })
            message.instructions.forEach(function (instruction) {
              var keys = instruction.accounts.map(function (account) {
                var pubkey = message.accountKeys[account]
                return {
                  pubkey: pubkey,
                  isSigner: transaction.signatures.some(function (keyObj) {
                    return keyObj.publicKey.toString() === pubkey.toString()
                  }),
                  isWritable: message.isAccountWritable(account),
                }
              })
              transaction.instructions.push(
                new TransactionInstruction({
                  keys: keys,
                  programId: message.accountKeys[instruction.programIdIndex],
                  data: bs58.decode(instruction.data),
                })
              )
            })
            return transaction
          },
        },
      ]
    )
    return Transaction
  })()
  var SYSVAR_CLOCK_PUBKEY = new PublicKey("SysvarC1ock11111111111111111111111111111111")
  var SYSVAR_RECENT_BLOCKHASHES_PUBKEY = new PublicKey(
    "SysvarRecentB1ockHashes11111111111111111111"
  )
  var SYSVAR_RENT_PUBKEY = new PublicKey("SysvarRent111111111111111111111111111111111")
  var SYSVAR_REWARDS_PUBKEY = new PublicKey("SysvarRewards111111111111111111111111111111")
  var SYSVAR_STAKE_HISTORY_PUBKEY = new PublicKey("SysvarStakeHistory1111111111111111111111111")
  /*! https://mths.be/punycode v1.4.1 by @mathias */ var maxInt = 2147483647
  var base$1 = 36
  var tMin = 1
  var tMax = 26
  var skew = 38
  var damp = 700
  var initialBias = 72
  var initialN = 128
  var delimiter = "-"
  var regexNonASCII = /[^\x20-\x7E]/
  var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g
  var errors = {
    overflow: "Overflow: input needs wider integers to process",
    "not-basic": "Illegal input >= 0x80 (not a basic code point)",
    "invalid-input": "Invalid input",
  }
  var baseMinusTMin = base$1 - tMin
  var floor = Math.floor
  var stringFromCharCode = String.fromCharCode
  function error(type) {
    throw new RangeError(errors[type])
  }
  function map(array, fn) {
    var length = array.length
    var result = []
    while (length--) {
      result[length] = fn(array[length])
    }
    return result
  }
  function mapDomain(string, fn) {
    var parts = string.split("@")
    var result = ""
    if (parts.length > 1) {
      result = parts[0] + "@"
      string = parts[1]
    }
    string = string.replace(regexSeparators, ".")
    var labels = string.split(".")
    var encoded = map(labels, fn).join(".")
    return result + encoded
  }
  function ucs2decode(string) {
    var output = [],
      counter = 0,
      length = string.length,
      value,
      extra
    while (counter < length) {
      value = string.charCodeAt(counter++)
      if (value >= 55296 && value <= 56319 && counter < length) {
        extra = string.charCodeAt(counter++)
        if ((extra & 64512) == 56320) {
          output.push(((value & 1023) << 10) + (extra & 1023) + 65536)
        } else {
          output.push(value)
          counter--
        }
      } else {
        output.push(value)
      }
    }
    return output
  }
  function digitToBasic(digit, flag) {
    return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5)
  }
  function adapt(delta, numPoints, firstTime) {
    var k = 0
    delta = firstTime ? floor(delta / damp) : delta >> 1
    delta += floor(delta / numPoints)
    for (; delta > (baseMinusTMin * tMax) >> 1; k += base$1) {
      delta = floor(delta / baseMinusTMin)
    }
    return floor(k + ((baseMinusTMin + 1) * delta) / (delta + skew))
  }
  function encode(input) {
    var n,
      delta,
      handledCPCount,
      basicLength,
      bias,
      j,
      m,
      q,
      k,
      t,
      currentValue,
      output = [],
      inputLength,
      handledCPCountPlusOne,
      baseMinusT,
      qMinusT
    input = ucs2decode(input)
    inputLength = input.length
    n = initialN
    delta = 0
    bias = initialBias
    for (j = 0; j < inputLength; ++j) {
      currentValue = input[j]
      if (currentValue < 128) {
        output.push(stringFromCharCode(currentValue))
      }
    }
    handledCPCount = basicLength = output.length
    if (basicLength) {
      output.push(delimiter)
    }
    while (handledCPCount < inputLength) {
      for (m = maxInt, j = 0; j < inputLength; ++j) {
        currentValue = input[j]
        if (currentValue >= n && currentValue < m) {
          m = currentValue
        }
      }
      handledCPCountPlusOne = handledCPCount + 1
      if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
        error("overflow")
      }
      delta += (m - n) * handledCPCountPlusOne
      n = m
      for (j = 0; j < inputLength; ++j) {
        currentValue = input[j]
        if (currentValue < n && ++delta > maxInt) {
          error("overflow")
        }
        if (currentValue == n) {
          for (q = delta, k = base$1; ; k += base$1) {
            t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias
            if (q < t) {
              break
            }
            qMinusT = q - t
            baseMinusT = base$1 - t
            output.push(stringFromCharCode(digitToBasic(t + (qMinusT % baseMinusT), 0)))
            q = floor(qMinusT / baseMinusT)
          }
          output.push(stringFromCharCode(digitToBasic(q, 0)))
          bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength)
          delta = 0
          ++handledCPCount
        }
      }
      ++delta
      ++n
    }
    return output.join("")
  }
  function toASCII(input) {
    return mapDomain(input, function (string) {
      return regexNonASCII.test(string) ? "xn--" + encode(string) : string
    })
  }
  function hasOwnProperty$1(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop)
  }
  var isArray$2 =
    Array.isArray ||
    function (xs) {
      return Object.prototype.toString.call(xs) === "[object Array]"
    }
  function stringifyPrimitive(v) {
    switch (typeof v) {
      case "string":
        return v
      case "boolean":
        return v ? "true" : "false"
      case "number":
        return isFinite(v) ? v : ""
      default:
        return ""
    }
  }
  function stringify(obj, sep, eq, name) {
    sep = sep || "&"
    eq = eq || "="
    if (obj === null) {
      obj = undefined
    }
    if (typeof obj === "object") {
      return map$1(objectKeys$1(obj), function (k) {
        var ks = encodeURIComponent(stringifyPrimitive(k)) + eq
        if (isArray$2(obj[k])) {
          return map$1(obj[k], function (v) {
            return ks + encodeURIComponent(stringifyPrimitive(v))
          }).join(sep)
        } else {
          return ks + encodeURIComponent(stringifyPrimitive(obj[k]))
        }
      }).join(sep)
    }
    if (!name) return ""
    return (
      encodeURIComponent(stringifyPrimitive(name)) +
      eq +
      encodeURIComponent(stringifyPrimitive(obj))
    )
  }
  function map$1(xs, f) {
    if (xs.map) return xs.map(f)
    var res = []
    for (var i = 0; i < xs.length; i++) {
      res.push(f(xs[i], i))
    }
    return res
  }
  var objectKeys$1 =
    Object.keys ||
    function (obj) {
      var res = []
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key)
      }
      return res
    }
  function parse(qs, sep, eq, options) {
    sep = sep || "&"
    eq = eq || "="
    var obj = {}
    if (typeof qs !== "string" || qs.length === 0) {
      return obj
    }
    var regexp = /\+/g
    qs = qs.split(sep)
    var maxKeys = 1e3
    if (options && typeof options.maxKeys === "number") {
      maxKeys = options.maxKeys
    }
    var len = qs.length
    if (maxKeys > 0 && len > maxKeys) {
      len = maxKeys
    }
    for (var i = 0; i < len; ++i) {
      var x = qs[i].replace(regexp, "%20"),
        idx = x.indexOf(eq),
        kstr,
        vstr,
        k,
        v
      if (idx >= 0) {
        kstr = x.substr(0, idx)
        vstr = x.substr(idx + 1)
      } else {
        kstr = x
        vstr = ""
      }
      k = decodeURIComponent(kstr)
      v = decodeURIComponent(vstr)
      if (!hasOwnProperty$1(obj, k)) {
        obj[k] = v
      } else if (isArray$2(obj[k])) {
        obj[k].push(v)
      } else {
        obj[k] = [obj[k], v]
      }
    }
    return obj
  }
  function Url() {
    this.protocol = null
    this.slashes = null
    this.auth = null
    this.host = null
    this.port = null
    this.hostname = null
    this.hash = null
    this.search = null
    this.query = null
    this.pathname = null
    this.path = null
    this.href = null
  }
  var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
    delims = ["<", ">", '"', "`", " ", "\r", "\n", "\t"],
    unwise = ["{", "}", "|", "\\", "^", "`"].concat(delims),
    autoEscape = ["'"].concat(unwise),
    nonHostChars = ["%", "/", "?", ";", "#"].concat(autoEscape),
    hostEndingChars = ["/", "?", "#"],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    unsafeProtocol = { javascript: true, "javascript:": true },
    hostlessProtocol = { javascript: true, "javascript:": true },
    slashedProtocol = {
      http: true,
      https: true,
      ftp: true,
      gopher: true,
      file: true,
      "http:": true,
      "https:": true,
      "ftp:": true,
      "gopher:": true,
      "file:": true,
    }
  function urlParse(url, parseQueryString, slashesDenoteHost) {
    if (url && isObject(url) && url instanceof Url) return url
    var u = new Url()
    u.parse(url, parseQueryString, slashesDenoteHost)
    return u
  }
  Url.prototype.parse = function (url, parseQueryString, slashesDenoteHost) {
    return parse$1(this, url, parseQueryString, slashesDenoteHost)
  }
  function parse$1(self, url, parseQueryString, slashesDenoteHost) {
    if (!isString(url)) {
      throw new TypeError("Parameter 'url' must be a string, not " + typeof url)
    }
    var queryIndex = url.indexOf("?"),
      splitter = queryIndex !== -1 && queryIndex < url.indexOf("#") ? "?" : "#",
      uSplit = url.split(splitter),
      slashRegex = /\\/g
    uSplit[0] = uSplit[0].replace(slashRegex, "/")
    url = uSplit.join(splitter)
    var rest = url
    rest = rest.trim()
    if (!slashesDenoteHost && url.split("#").length === 1) {
      var simplePath = simplePathPattern.exec(rest)
      if (simplePath) {
        self.path = rest
        self.href = rest
        self.pathname = simplePath[1]
        if (simplePath[2]) {
          self.search = simplePath[2]
          if (parseQueryString) {
            self.query = parse(self.search.substr(1))
          } else {
            self.query = self.search.substr(1)
          }
        } else if (parseQueryString) {
          self.search = ""
          self.query = {}
        }
        return self
      }
    }
    var proto = protocolPattern.exec(rest)
    if (proto) {
      proto = proto[0]
      var lowerProto = proto.toLowerCase()
      self.protocol = lowerProto
      rest = rest.substr(proto.length)
    }
    if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
      var slashes = rest.substr(0, 2) === "//"
      if (slashes && !(proto && hostlessProtocol[proto])) {
        rest = rest.substr(2)
        self.slashes = true
      }
    }
    var i, hec, l, p
    if (!hostlessProtocol[proto] && (slashes || (proto && !slashedProtocol[proto]))) {
      var hostEnd = -1
      for (i = 0; i < hostEndingChars.length; i++) {
        hec = rest.indexOf(hostEndingChars[i])
        if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec
      }
      var auth, atSign
      if (hostEnd === -1) {
        atSign = rest.lastIndexOf("@")
      } else {
        atSign = rest.lastIndexOf("@", hostEnd)
      }
      if (atSign !== -1) {
        auth = rest.slice(0, atSign)
        rest = rest.slice(atSign + 1)
        self.auth = decodeURIComponent(auth)
      }
      hostEnd = -1
      for (i = 0; i < nonHostChars.length; i++) {
        hec = rest.indexOf(nonHostChars[i])
        if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec
      }
      if (hostEnd === -1) hostEnd = rest.length
      self.host = rest.slice(0, hostEnd)
      rest = rest.slice(hostEnd)
      parseHost(self)
      self.hostname = self.hostname || ""
      var ipv6Hostname = self.hostname[0] === "[" && self.hostname[self.hostname.length - 1] === "]"
      if (!ipv6Hostname) {
        var hostparts = self.hostname.split(/\./)
        for (i = 0, l = hostparts.length; i < l; i++) {
          var part = hostparts[i]
          if (!part) continue
          if (!part.match(hostnamePartPattern)) {
            var newpart = ""
            for (var j = 0, k = part.length; j < k; j++) {
              if (part.charCodeAt(j) > 127) {
                newpart += "x"
              } else {
                newpart += part[j]
              }
            }
            if (!newpart.match(hostnamePartPattern)) {
              var validParts = hostparts.slice(0, i)
              var notHost = hostparts.slice(i + 1)
              var bit = part.match(hostnamePartStart)
              if (bit) {
                validParts.push(bit[1])
                notHost.unshift(bit[2])
              }
              if (notHost.length) {
                rest = "/" + notHost.join(".") + rest
              }
              self.hostname = validParts.join(".")
              break
            }
          }
        }
      }
      if (self.hostname.length > hostnameMaxLen) {
        self.hostname = ""
      } else {
        self.hostname = self.hostname.toLowerCase()
      }
      if (!ipv6Hostname) {
        self.hostname = toASCII(self.hostname)
      }
      p = self.port ? ":" + self.port : ""
      var h = self.hostname || ""
      self.host = h + p
      self.href += self.host
      if (ipv6Hostname) {
        self.hostname = self.hostname.substr(1, self.hostname.length - 2)
        if (rest[0] !== "/") {
          rest = "/" + rest
        }
      }
    }
    if (!unsafeProtocol[lowerProto]) {
      for (i = 0, l = autoEscape.length; i < l; i++) {
        var ae = autoEscape[i]
        if (rest.indexOf(ae) === -1) continue
        var esc = encodeURIComponent(ae)
        if (esc === ae) {
          esc = escape(ae)
        }
        rest = rest.split(ae).join(esc)
      }
    }
    var hash = rest.indexOf("#")
    if (hash !== -1) {
      self.hash = rest.substr(hash)
      rest = rest.slice(0, hash)
    }
    var qm = rest.indexOf("?")
    if (qm !== -1) {
      self.search = rest.substr(qm)
      self.query = rest.substr(qm + 1)
      if (parseQueryString) {
        self.query = parse(self.query)
      }
      rest = rest.slice(0, qm)
    } else if (parseQueryString) {
      self.search = ""
      self.query = {}
    }
    if (rest) self.pathname = rest
    if (slashedProtocol[lowerProto] && self.hostname && !self.pathname) {
      self.pathname = "/"
    }
    if (self.pathname || self.search) {
      p = self.pathname || ""
      var s = self.search || ""
      self.path = p + s
    }
    self.href = format(self)
    return self
  }
  function urlFormat(obj) {
    if (isString(obj)) obj = parse$1({}, obj)
    return format(obj)
  }
  function format(self) {
    var auth = self.auth || ""
    if (auth) {
      auth = encodeURIComponent(auth)
      auth = auth.replace(/%3A/i, ":")
      auth += "@"
    }
    var protocol = self.protocol || "",
      pathname = self.pathname || "",
      hash = self.hash || "",
      host = false,
      query = ""
    if (self.host) {
      host = auth + self.host
    } else if (self.hostname) {
      host = auth + (self.hostname.indexOf(":") === -1 ? self.hostname : "[" + this.hostname + "]")
      if (self.port) {
        host += ":" + self.port
      }
    }
    if (self.query && isObject(self.query) && Object.keys(self.query).length) {
      query = stringify(self.query)
    }
    var search = self.search || (query && "?" + query) || ""
    if (protocol && protocol.substr(-1) !== ":") protocol += ":"
    if (self.slashes || ((!protocol || slashedProtocol[protocol]) && host !== false)) {
      host = "//" + (host || "")
      if (pathname && pathname.charAt(0) !== "/") pathname = "/" + pathname
    } else if (!host) {
      host = ""
    }
    if (hash && hash.charAt(0) !== "#") hash = "#" + hash
    if (search && search.charAt(0) !== "?") search = "?" + search
    pathname = pathname.replace(/[?#]/g, function (match) {
      return encodeURIComponent(match)
    })
    search = search.replace("#", "%23")
    return protocol + host + pathname + search + hash
  }
  Url.prototype.format = function () {
    return format(this)
  }
  Url.prototype.resolve = function (relative) {
    return this.resolveObject(urlParse(relative, false, true)).format()
  }
  Url.prototype.resolveObject = function (relative) {
    if (isString(relative)) {
      var rel = new Url()
      rel.parse(relative, false, true)
      relative = rel
    }
    var result = new Url()
    var tkeys = Object.keys(this)
    for (var tk = 0; tk < tkeys.length; tk++) {
      var tkey = tkeys[tk]
      result[tkey] = this[tkey]
    }
    result.hash = relative.hash
    if (relative.href === "") {
      result.href = result.format()
      return result
    }
    if (relative.slashes && !relative.protocol) {
      var rkeys = Object.keys(relative)
      for (var rk = 0; rk < rkeys.length; rk++) {
        var rkey = rkeys[rk]
        if (rkey !== "protocol") result[rkey] = relative[rkey]
      }
      if (slashedProtocol[result.protocol] && result.hostname && !result.pathname) {
        result.path = result.pathname = "/"
      }
      result.href = result.format()
      return result
    }
    var relPath
    if (relative.protocol && relative.protocol !== result.protocol) {
      if (!slashedProtocol[relative.protocol]) {
        var keys = Object.keys(relative)
        for (var v = 0; v < keys.length; v++) {
          var k = keys[v]
          result[k] = relative[k]
        }
        result.href = result.format()
        return result
      }
      result.protocol = relative.protocol
      if (!relative.host && !hostlessProtocol[relative.protocol]) {
        relPath = (relative.pathname || "").split("/")
        while (relPath.length && !(relative.host = relPath.shift()));
        if (!relative.host) relative.host = ""
        if (!relative.hostname) relative.hostname = ""
        if (relPath[0] !== "") relPath.unshift("")
        if (relPath.length < 2) relPath.unshift("")
        result.pathname = relPath.join("/")
      } else {
        result.pathname = relative.pathname
      }
      result.search = relative.search
      result.query = relative.query
      result.host = relative.host || ""
      result.auth = relative.auth
      result.hostname = relative.hostname || relative.host
      result.port = relative.port
      if (result.pathname || result.search) {
        var p = result.pathname || ""
        var s = result.search || ""
        result.path = p + s
      }
      result.slashes = result.slashes || relative.slashes
      result.href = result.format()
      return result
    }
    var isSourceAbs = result.pathname && result.pathname.charAt(0) === "/",
      isRelAbs = relative.host || (relative.pathname && relative.pathname.charAt(0) === "/"),
      mustEndAbs = isRelAbs || isSourceAbs || (result.host && relative.pathname),
      removeAllDots = mustEndAbs,
      srcPath = (result.pathname && result.pathname.split("/")) || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol]
    relPath = (relative.pathname && relative.pathname.split("/")) || []
    if (psychotic) {
      result.hostname = ""
      result.port = null
      if (result.host) {
        if (srcPath[0] === "") srcPath[0] = result.host
        else srcPath.unshift(result.host)
      }
      result.host = ""
      if (relative.protocol) {
        relative.hostname = null
        relative.port = null
        if (relative.host) {
          if (relPath[0] === "") relPath[0] = relative.host
          else relPath.unshift(relative.host)
        }
        relative.host = null
      }
      mustEndAbs = mustEndAbs && (relPath[0] === "" || srcPath[0] === "")
    }
    var authInHost
    if (isRelAbs) {
      result.host = relative.host || relative.host === "" ? relative.host : result.host
      result.hostname =
        relative.hostname || relative.hostname === "" ? relative.hostname : result.hostname
      result.search = relative.search
      result.query = relative.query
      srcPath = relPath
    } else if (relPath.length) {
      if (!srcPath) srcPath = []
      srcPath.pop()
      srcPath = srcPath.concat(relPath)
      result.search = relative.search
      result.query = relative.query
    } else if (!isNullOrUndefined(relative.search)) {
      if (psychotic) {
        result.hostname = result.host = srcPath.shift()
        authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false
        if (authInHost) {
          result.auth = authInHost.shift()
          result.host = result.hostname = authInHost.shift()
        }
      }
      result.search = relative.search
      result.query = relative.query
      if (!isNull(result.pathname) || !isNull(result.search)) {
        result.path =
          (result.pathname ? result.pathname : "") + (result.search ? result.search : "")
      }
      result.href = result.format()
      return result
    }
    if (!srcPath.length) {
      result.pathname = null
      if (result.search) {
        result.path = "/" + result.search
      } else {
        result.path = null
      }
      result.href = result.format()
      return result
    }
    var last = srcPath.slice(-1)[0]
    var hasTrailingSlash =
      ((result.host || relative.host || srcPath.length > 1) && (last === "." || last === "..")) ||
      last === ""
    var up = 0
    for (var i = srcPath.length; i >= 0; i--) {
      last = srcPath[i]
      if (last === ".") {
        srcPath.splice(i, 1)
      } else if (last === "..") {
        srcPath.splice(i, 1)
        up++
      } else if (up) {
        srcPath.splice(i, 1)
        up--
      }
    }
    if (!mustEndAbs && !removeAllDots) {
      for (; up--; up) {
        srcPath.unshift("..")
      }
    }
    if (mustEndAbs && srcPath[0] !== "" && (!srcPath[0] || srcPath[0].charAt(0) !== "/")) {
      srcPath.unshift("")
    }
    if (hasTrailingSlash && srcPath.join("/").substr(-1) !== "/") {
      srcPath.push("")
    }
    var isAbsolute = srcPath[0] === "" || (srcPath[0] && srcPath[0].charAt(0) === "/")
    if (psychotic) {
      result.hostname = result.host = isAbsolute ? "" : srcPath.length ? srcPath.shift() : ""
      authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false
      if (authInHost) {
        result.auth = authInHost.shift()
        result.host = result.hostname = authInHost.shift()
      }
    }
    mustEndAbs = mustEndAbs || (result.host && srcPath.length)
    if (mustEndAbs && !isAbsolute) {
      srcPath.unshift("")
    }
    if (!srcPath.length) {
      result.pathname = null
      result.path = null
    } else {
      result.pathname = srcPath.join("/")
    }
    if (!isNull(result.pathname) || !isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "")
    }
    result.auth = relative.auth || result.auth
    result.slashes = result.slashes || relative.slashes
    result.href = result.format()
    return result
  }
  Url.prototype.parseHost = function () {
    return parseHost(this)
  }
  function parseHost(self) {
    var host = self.host
    var port = portPattern.exec(host)
    if (port) {
      port = port[0]
      if (port !== ":") {
        self.port = port.substr(1)
      }
      host = host.substr(0, host.length - port.length)
    }
    if (host) self.hostname = host
  }
  var browser$1 = createCommonjsModule(function (module, exports) {
    var getGlobal = function () {
      if (typeof self !== "undefined") {
        return self
      }
      if (typeof window !== "undefined") {
        return window
      }
      if (typeof global !== "undefined") {
        return global
      }
      throw new Error("unable to locate global object")
    }
    var global = getGlobal()
    module.exports = exports = global.fetch
    exports.default = global.fetch.bind(global)
    exports.Headers = global.Headers
    exports.Request = global.Request
    exports.Response = global.Response
  })
  var browser_1 = browser$1.Headers
  var browser_2 = browser$1.Request
  var browser_3 = browser$1.Response
  var rngBrowser = createCommonjsModule(function (module) {
    var getRandomValues =
      (typeof crypto != "undefined" &&
        crypto.getRandomValues &&
        crypto.getRandomValues.bind(crypto)) ||
      (typeof msCrypto != "undefined" &&
        typeof window.msCrypto.getRandomValues == "function" &&
        msCrypto.getRandomValues.bind(msCrypto))
    if (getRandomValues) {
      var rnds8 = new Uint8Array(16)
      module.exports = function whatwgRNG() {
        getRandomValues(rnds8)
        return rnds8
      }
    } else {
      var rnds = new Array(16)
      module.exports = function mathRNG() {
        for (var i = 0, r; i < 16; i++) {
          if ((i & 3) === 0) r = Math.random() * 4294967296
          rnds[i] = (r >>> ((i & 3) << 3)) & 255
        }
        return rnds
      }
    }
  })
  var byteToHex = []
  for (var i = 0; i < 256; ++i) {
    byteToHex[i] = (i + 256).toString(16).substr(1)
  }
  function bytesToUuid(buf, offset) {
    var i = offset || 0
    var bth = byteToHex
    return [
      bth[buf[i++]],
      bth[buf[i++]],
      bth[buf[i++]],
      bth[buf[i++]],
      "-",
      bth[buf[i++]],
      bth[buf[i++]],
      "-",
      bth[buf[i++]],
      bth[buf[i++]],
      "-",
      bth[buf[i++]],
      bth[buf[i++]],
      "-",
      bth[buf[i++]],
      bth[buf[i++]],
      bth[buf[i++]],
      bth[buf[i++]],
      bth[buf[i++]],
      bth[buf[i++]],
    ].join("")
  }
  var bytesToUuid_1 = bytesToUuid
  function v4(options, buf, offset) {
    var i = (buf && offset) || 0
    if (typeof options == "string") {
      buf = options === "binary" ? new Array(16) : null
      options = null
    }
    options = options || {}
    var rnds = options.random || (options.rng || rngBrowser)()
    rnds[6] = (rnds[6] & 15) | 64
    rnds[8] = (rnds[8] & 63) | 128
    if (buf) {
      for (var ii = 0; ii < 16; ++ii) {
        buf[i + ii] = rnds[ii]
      }
    }
    return buf || bytesToUuid_1(rnds)
  }
  var v4_1 = v4
  const generateRequest = function (method, params, id, options) {
    if (typeof method !== "string") {
      throw new TypeError(method + " must be a string")
    }
    options = options || {}
    const request = { method: method }
    if (typeof options.version === "undefined" || options.version !== 1) {
      request.jsonrpc = "2.0"
    }
    if (params) {
      if (typeof params !== "object" && !Array.isArray(params)) {
        throw new TypeError(params + " must be an object, array or omitted")
      }
      request.params = params
    }
    if (typeof id === "undefined") {
      const generator =
        typeof options.generator === "function"
          ? options.generator
          : function () {
              return v4_1()
            }
      request.id = generator(request, options)
    } else {
      request.id = id
    }
    return request
  }
  var generateRequest_1 = generateRequest
  const ClientBrowser = function (callServer, options) {
    if (!(this instanceof ClientBrowser)) {
      return new ClientBrowser(callServer, options)
    }
    if (!options) {
      options = {}
    }
    this.options = {
      reviver: typeof options.reviver !== "undefined" ? options.reviver : null,
      replacer: typeof options.replacer !== "undefined" ? options.replacer : null,
      generator:
        typeof options.generator !== "undefined"
          ? options.generator
          : function () {
              return v4_1()
            },
      version: typeof options.version !== "undefined" ? options.version : 2,
    }
    this.callServer = callServer
  }
  var browser$2 = ClientBrowser
  ClientBrowser.prototype.request = function (method, params, id, callback) {
    const self = this
    let request = null
    const isBatch = Array.isArray(method) && typeof params === "function"
    if (this.options.version === 1 && isBatch) {
      throw new TypeError("JSON-RPC 1.0 does not support batching")
    }
    const isRaw = !isBatch && method && typeof method === "object" && typeof params === "function"
    if (isBatch || isRaw) {
      callback = params
      request = method
    } else {
      if (typeof id === "function") {
        callback = id
        id = undefined
      }
      const hasCallback = typeof callback === "function"
      try {
        request = generateRequest_1(method, params, id, {
          generator: this.options.generator,
          version: this.options.version,
        })
      } catch (err) {
        if (hasCallback) {
          return callback(err)
        }
        throw err
      }
      if (!hasCallback) {
        return request
      }
    }
    let message
    try {
      message = JSON.stringify(request, this.options.replacer)
    } catch (err) {
      return callback(err)
    }
    this.callServer(message, function (err, response) {
      self._parseResponse(err, response, callback)
    })
    return request
  }
  ClientBrowser.prototype._parseResponse = function (err, responseText, callback) {
    if (err) {
      callback(err)
      return
    }
    if (!responseText) {
      return callback()
    }
    let response
    try {
      response = JSON.parse(responseText, this.options.reviver)
    } catch (err) {
      return callback(err)
    }
    if (callback.length === 3) {
      if (Array.isArray(response)) {
        const isError = function (res) {
          return typeof res.error !== "undefined"
        }
        const isNotError = function (res) {
          return !isError(res)
        }
        return callback(null, response.filter(isError), response.filter(isNotError))
      } else {
        return callback(null, response.error, response.result)
      }
    }
    callback(null, response)
  }
  function _defineProperty$1(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true,
      })
    } else {
      obj[key] = value
    }
    return obj
  }
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object)
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object)
      if (enumerableOnly)
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable
        })
      keys.push.apply(keys, symbols)
    }
    return keys
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {}
      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty$1(target, key, source[key])
        })
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key))
        })
      }
    }
    return target
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype)
    subClass.prototype.constructor = subClass
    subClass.__proto__ = superClass
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function _getPrototypeOf(o) {
          return o.__proto__ || Object.getPrototypeOf(o)
        }
    return _getPrototypeOf(o)
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf =
      Object.setPrototypeOf ||
      function _setPrototypeOf(o, p) {
        o.__proto__ = p
        return o
      }
    return _setPrototypeOf(o, p)
  }
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false
    if (Reflect.construct.sham) return false
    if (typeof Proxy === "function") return true
    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}))
      return true
    } catch (e) {
      return false
    }
  }
  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null]
        a.push.apply(a, args)
        var Constructor = Function.bind.apply(Parent, a)
        var instance = new Constructor()
        if (Class) _setPrototypeOf(instance, Class.prototype)
        return instance
      }
    }
    return _construct.apply(null, arguments)
  }
  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1
  }
  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined
    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class
      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function")
      }
      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class)
        _cache.set(Class, Wrapper)
      }
      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor)
      }
      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true },
      })
      return _setPrototypeOf(Wrapper, Class)
    }
    return _wrapNativeSuper(Class)
  }
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {}
    var target = {}
    var sourceKeys = Object.keys(source)
    var key, i
    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i]
      if (excluded.indexOf(key) >= 0) continue
      target[key] = source[key]
    }
    return target
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
    }
    return self
  }
  function _unsupportedIterableToArray$2(o, minLen) {
    if (!o) return
    if (typeof o === "string") return _arrayLikeToArray$2(o, minLen)
    var n = Object.prototype.toString.call(o).slice(8, -1)
    if (n === "Object" && o.constructor) n = o.constructor.name
    if (n === "Map" || n === "Set") return Array.from(o)
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray$2(o, minLen)
  }
  function _arrayLikeToArray$2(arr, len) {
    if (len == null || len > arr.length) len = arr.length
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]
    return arr2
  }
  function _createForOfIteratorHelperLoose(o, allowArrayLike) {
    var it
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (
        Array.isArray(o) ||
        (it = _unsupportedIterableToArray$2(o)) ||
        (allowArrayLike && o && typeof o.length === "number")
      ) {
        if (it) o = it
        var i = 0
        return function () {
          if (i >= o.length) return { done: true }
          return { done: false, value: o[i++] }
        }
      }
      throw new TypeError(
        "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
      )
    }
    it = o[Symbol.iterator]()
    return it.next.bind(it)
  }
  var toString$1 = Object.prototype.toString
  var kindOf = function kindOf(val) {
    if (val === void 0) return "undefined"
    if (val === null) return "null"
    var type = typeof val
    if (type === "boolean") return "boolean"
    if (type === "string") return "string"
    if (type === "number") return "number"
    if (type === "symbol") return "symbol"
    if (type === "function") {
      return isGeneratorFn(val) ? "generatorfunction" : "function"
    }
    if (isArray$3(val)) return "array"
    if (isBuffer$1(val)) return "buffer"
    if (isArguments$1(val)) return "arguments"
    if (isDate$1(val)) return "date"
    if (isError$1(val)) return "error"
    if (isRegexp(val)) return "regexp"
    switch (ctorName(val)) {
      case "Symbol":
        return "symbol"
      case "Promise":
        return "promise"
      case "WeakMap":
        return "weakmap"
      case "WeakSet":
        return "weakset"
      case "Map":
        return "map"
      case "Set":
        return "set"
      case "Int8Array":
        return "int8array"
      case "Uint8Array":
        return "uint8array"
      case "Uint8ClampedArray":
        return "uint8clampedarray"
      case "Int16Array":
        return "int16array"
      case "Uint16Array":
        return "uint16array"
      case "Int32Array":
        return "int32array"
      case "Uint32Array":
        return "uint32array"
      case "Float32Array":
        return "float32array"
      case "Float64Array":
        return "float64array"
    }
    if (isGeneratorObj(val)) {
      return "generator"
    }
    type = toString$1.call(val)
    switch (type) {
      case "[object Object]":
        return "object"
      case "[object Map Iterator]":
        return "mapiterator"
      case "[object Set Iterator]":
        return "setiterator"
      case "[object String Iterator]":
        return "stringiterator"
      case "[object Array Iterator]":
        return "arrayiterator"
    }
    return type.slice(8, -1).toLowerCase().replace(/\s/g, "")
  }
  function ctorName(val) {
    return typeof val.constructor === "function" ? val.constructor.name : null
  }
  function isArray$3(val) {
    if (Array.isArray) return Array.isArray(val)
    return val instanceof Array
  }
  function isError$1(val) {
    return (
      val instanceof Error ||
      (typeof val.message === "string" &&
        val.constructor &&
        typeof val.constructor.stackTraceLimit === "number")
    )
  }
  function isDate$1(val) {
    if (val instanceof Date) return true
    return (
      typeof val.toDateString === "function" &&
      typeof val.getDate === "function" &&
      typeof val.setDate === "function"
    )
  }
  function isRegexp(val) {
    if (val instanceof RegExp) return true
    return (
      typeof val.flags === "string" &&
      typeof val.ignoreCase === "boolean" &&
      typeof val.multiline === "boolean" &&
      typeof val.global === "boolean"
    )
  }
  function isGeneratorFn(name, val) {
    return ctorName(name) === "GeneratorFunction"
  }
  function isGeneratorObj(val) {
    return (
      typeof val.throw === "function" &&
      typeof val.return === "function" &&
      typeof val.next === "function"
    )
  }
  function isArguments$1(val) {
    try {
      if (typeof val.length === "number" && typeof val.callee === "function") {
        return true
      }
    } catch (err) {
      if (err.message.indexOf("callee") !== -1) {
        return true
      }
    }
    return false
  }
  function isBuffer$1(val) {
    if (val.constructor && typeof val.constructor.isBuffer === "function") {
      return val.constructor.isBuffer(val)
    }
    return false
  }
  var Types = {
    any: function any(value) {
      return value !== undefined
    },
    arguments: function _arguments(value) {
      return kindOf(value) === "arguments"
    },
    array: function array(value) {
      return kindOf(value) === "array"
    },
    boolean: function boolean(value) {
      return kindOf(value) === "boolean"
    },
    buffer: function buffer(value) {
      return kindOf(value) === "buffer"
    },
    date: function date(value) {
      return kindOf(value) === "date" && !isNaN(value)
    },
    error: function error(value) {
      return kindOf(value) === "error"
    },
    float32array: function float32array(value) {
      return kindOf(value) === "float32array"
    },
    float64array: function float64array(value) {
      return kindOf(value) === "float64array"
    },
    function: function _function(value) {
      return kindOf(value) === "function"
    },
    generatorfunction: function generatorfunction(value) {
      return kindOf(value) === "generatorfunction"
    },
    int16array: function int16array(value) {
      return kindOf(value) === "int16array"
    },
    int32array: function int32array(value) {
      return kindOf(value) === "int32array"
    },
    int8array: function int8array(value) {
      return kindOf(value) === "int8array"
    },
    map: function map(value) {
      return kindOf(value) === "map"
    },
    null: function _null(value) {
      return kindOf(value) === "null"
    },
    number: function number(value) {
      return kindOf(value) === "number"
    },
    object: function object(value) {
      return kindOf(value) === "object"
    },
    promise: function promise(value) {
      return kindOf(value) === "promise"
    },
    regexp: function regexp(value) {
      return kindOf(value) === "regexp"
    },
    set: function set(value) {
      return kindOf(value) === "set"
    },
    string: function string(value) {
      return kindOf(value) === "string"
    },
    symbol: function symbol(value) {
      return kindOf(value) === "symbol"
    },
    uint16array: function uint16array(value) {
      return kindOf(value) === "uint16array"
    },
    uint32array: function uint32array(value) {
      return kindOf(value) === "uint32array"
    },
    uint8array: function uint8array(value) {
      return kindOf(value) === "uint8array"
    },
    uint8clampedarray: function uint8clampedarray(value) {
      return kindOf(value) === "uint8clampedarray"
    },
    undefined: function undefined$1(value) {
      return kindOf(value) === "undefined"
    },
    weakmap: function weakmap(value) {
      return kindOf(value) === "weakmap"
    },
    weakset: function weakset(value) {
      return kindOf(value) === "weakset"
    },
  }
  var prefix = "Invariant failed"
  function invariant(condition, message) {
    if (condition) {
      return
    }
    {
      throw new Error(prefix)
    }
  }
  var StructError = (function (_TypeError) {
    _inheritsLoose(StructError, _TypeError)
    function StructError(failures) {
      var _this
      invariant(failures.length > 0)
      var first = failures[0]
      var path = first.path,
        value = first.value,
        type = first.type,
        branch = first.branch,
        rest = _objectWithoutPropertiesLoose(first, ["path", "value", "type", "branch"])
      var message =
        "Expected a value of type `" +
        type +
        "`" +
        (path.length ? " for `" + path.join(".") + "`" : "") +
        " but received `" +
        JSON.stringify(value) +
        "`."
      _this = _TypeError.call(this, message) || this
      _this.type = type
      _this.value = value
      Object.assign(_assertThisInitialized(_this), rest)
      _this.path = path
      _this.branch = branch
      _this.failures = failures
      _this.stack = new Error().stack
      _this.__proto__ = StructError.prototype
      return _this
    }
    return StructError
  })(_wrapNativeSuper(TypeError))
  var STRUCT = Symbol("STRUCT")
  var isStruct = function isStruct(value) {
    return typeof value === "function" && value[STRUCT]
  }
  var createStruct = function createStruct(props) {
    var struct = props.struct
    var Error = struct.Error
    var Struct = function Struct(value) {
      return Struct.assert(value)
    }
    Object.defineProperty(Struct, STRUCT, { value: true })
    Struct.kind = props.kind
    Struct.type = props.type
    Struct.default = function () {
      return typeof props.defaults === "function" ? props.defaults() : props.defaults
    }
    Struct.test = function (value) {
      var _Struct$check = Struct.check(value, [value], []),
        failures = _Struct$check[0]
      return !failures
    }
    Struct.assert = function (value) {
      var _Struct$check2 = Struct.check(value, [value], []),
        failures = _Struct$check2[0],
        result = _Struct$check2[1]
      if (failures) {
        throw new Error(failures)
      } else {
        return result
      }
    }
    Struct.validate = function (value) {
      var _Struct$check3 = Struct.check(value, [value], []),
        failures = _Struct$check3[0],
        result = _Struct$check3[1]
      if (failures) {
        return [new Error(failures)]
      } else {
        return [undefined, result]
      }
    }
    Struct.check = function (value, branch, path) {
      if (value === void 0) {
        value = Struct.default()
      }
      var failures = [Struct.fail({ value: value, branch: branch, path: path })]
      return [failures]
    }
    Struct.fail = function (obj) {
      return _objectSpread2(
        _objectSpread2({}, obj),
        {},
        { type: "type" in obj ? obj.type : Struct.type }
      )
    }
    return Struct
  }
  var createArray = function createArray(schema, defaults, struct) {
    invariant(Array.isArray(schema) && schema.length === 1)
    var Element = struct(schema[0], undefined)
    var Struct = createStruct({
      kind: "array",
      type: Element.type + "[]",
      defaults: defaults,
      struct: struct,
    })
    Struct.check = function (value, branch, path) {
      if (value === void 0) {
        value = Struct.default()
      }
      if (!Array.isArray(value)) {
        return [[Struct.fail({ value: value, branch: branch, path: path })]]
      }
      var result = []
      var failures = []
      for (var i = 0; i < value.length; i++) {
        var v = value[i]
        var _Element$check = Element.check(v, branch.concat(v), path.concat(i)),
          efs = _Element$check[0],
          er = _Element$check[1]
        if (efs) {
          failures.push.apply(failures, efs)
          continue
        }
        result[i] = er
      }
      return failures.length ? [failures] : [undefined, result]
    }
    return Struct
  }
  var createDynamic = function createDynamic(schema, defaults, struct) {
    invariant(typeof schema === "function")
    var Dynamic = createStruct({
      kind: "dynamic",
      type: "dynamic<…>",
      defaults: defaults,
      struct: struct,
    })
    Dynamic.check = function (value, branch, path) {
      if (value === void 0) {
        value = Dynamic.default()
      }
      var Struct = schema(value, branch, path)
      return Struct.check(value, branch, path)
    }
    return Dynamic
  }
  var createEnum = function createEnum(schema, defaults, struct) {
    invariant(Array.isArray(schema))
    var validator = function validator(value) {
      return schema.includes(value)
    }
    var Struct = struct(validator, defaults)
    Struct.kind = "enum"
    Struct.type = schema
      .map(function (s) {
        return typeof s === "string" ? '"' + s + '"' : "" + s
      })
      .join(" | ")
    return Struct
  }
  var createFunction = function createFunction(schema, defaults, struct) {
    var Struct = createStruct({
      kind: "function",
      type: "function<…>",
      defaults: defaults,
      struct: struct,
    })
    Struct.check = function (value, branch, path) {
      if (value === void 0) {
        value = Struct.default()
      }
      var result = schema(value, branch, path)
      if (result === true) {
        return [undefined, value]
      }
      var failures = []
      if (result === false) {
        failures.push(Struct.fail({ value: value, branch: branch, path: path }))
      } else if (Array.isArray(result) && result.length > 0) {
        for (
          var _iterator = _createForOfIteratorHelperLoose(result), _step;
          !(_step = _iterator()).done;

        ) {
          var r = _step.value
          failures.push(
            Struct.fail(_objectSpread2({ value: value, branch: branch, path: path }, r))
          )
        }
      } else if (typeof result === "object") {
        failures.push(
          Struct.fail(_objectSpread2({ value: value, branch: branch, path: path }, result))
        )
      } else {
        invariant(false)
      }
      return [failures]
    }
    return Struct
  }
  var createInstance = function createInstance(schema, defaults, struct) {
    invariant(typeof schema === "function")
    var validator = function validator(value) {
      return value instanceof schema
    }
    var Struct = struct(validator, defaults)
    Struct.kind = "instance"
    Struct.type = "instance<" + schema.name + ">"
    return Struct
  }
  var createInterface = function createInterface(schema, defaults, struct) {
    invariant(typeof schema === "object")
    var Props = {}
    for (var key in schema) {
      Props[key] = struct(schema[key])
    }
    var Struct = createStruct({
      kind: "interface",
      type: "interface<{" + Object.keys(schema).join() + "}>",
      defaults: defaults,
      struct: struct,
    })
    Struct.check = function (value, branch, path) {
      if (value === void 0) {
        value = Struct.default()
      }
      if (typeof value !== "object" && typeof value !== "function") {
        return [[Struct.fail({ value: value, branch: branch, path: path })]]
      }
      var failures = []
      for (var k in Props) {
        var Prop = Props[k]
        var v = value[k]
        var _Prop$check = Prop.check(v, branch.concat(v), path.concat(k)),
          pfs = _Prop$check[0]
        if (pfs) {
          failures.push.apply(failures, pfs)
        }
      }
      return failures.length ? [failures] : [undefined, value]
    }
    return Struct
  }
  var createIntersection = function createIntersection(schema, defaults, struct) {
    invariant(Array.isArray(schema) && schema.length !== 0)
    var Structs = schema.map(function (sch) {
      return struct(sch)
    })
    var type = Structs.map(function (s) {
      return s.type
    }).join(" & ")
    var Struct = createStruct({
      kind: "intersection",
      type: type,
      defaults: defaults,
      struct: struct,
    })
    Struct.check = function (value, branch, path) {
      if (value === void 0) {
        value = Struct.default()
      }
      var result = value
      for (
        var _iterator = _createForOfIteratorHelperLoose(Structs), _step;
        !(_step = _iterator()).done;

      ) {
        var _struct = _step.value
        var _struct$check = _struct.check(value, branch, path),
          fs = _struct$check[0],
          v = _struct$check[1]
        if (fs) {
          return [[Struct.fail({ value: value, branch: branch, path: path })]]
        } else {
          result = v
        }
      }
      return [undefined, result]
    }
    return Struct
  }
  var createLazy = function createLazy(schema, defaults, struct) {
    invariant(typeof schema === "function")
    var Lazy = createStruct({ kind: "lazy", type: "lazy<…>", defaults: defaults, struct: struct })
    Lazy.check = function () {
      Object.assign(Lazy, schema())
      return Lazy.check.apply(Lazy, arguments)
    }
    return Lazy
  }
  var createSize = function createSize(schema, defaults, struct) {
    invariant(
      Array.isArray(schema) &&
        schema.length === 2 &&
        schema.every(function (n) {
          return typeof n === "number"
        })
    )
    var min = schema[0],
      max = schema[1]
    var validator = function validator(value) {
      return (
        value != null &&
        typeof value.length === "number" &&
        value.length >= min &&
        value.length <= max
      )
    }
    var Struct = struct(validator, defaults)
    Struct.kind = "size"
    Struct.type = "size<" + min + "," + max + ">"
    return Struct
  }
  var createLiteral = function createLiteral(schema, defaults, struct) {
    var validator = function validator(value) {
      return value === schema
    }
    var Struct = struct(validator, defaults)
    Struct.kind = "literal"
    Struct.type = typeof schema === "string" ? '"' + schema + '"' : "" + schema
    return Struct
  }
  var createObject = function createObject(schema, defaults, struct) {
    invariant(typeof schema === "object")
    var Props = {}
    for (var key in schema) {
      Props[key] = struct(schema[key])
    }
    var Struct = createStruct({
      kind: "object",
      type: "{" + Object.keys(schema).join() + "}",
      defaults: defaults,
      struct: struct,
    })
    Struct.check = function (value, branch, path) {
      if (value === void 0) {
        value = Struct.default()
      }
      var d = Struct.default()
      if (value === undefined) {
        value = d
      }
      if (kindOf(value) !== "object") {
        return [[Struct.fail({ value: value, branch: branch, path: path })]]
      }
      var result = {}
      var failures = []
      var keys = new Set(Object.keys(Props).concat(Object.keys(value)))
      for (
        var _iterator = _createForOfIteratorHelperLoose(keys), _step;
        !(_step = _iterator()).done;

      ) {
        var k = _step.value
        var v = value[k]
        var p = path.concat(k)
        var b = branch.concat(v)
        var Prop = Props[k]
        if (v === undefined && d != null && k in d) {
          v = typeof d[k] === "function" ? d[k](value, branch, path) : d[k]
        }
        if (!(k in Props)) {
          failures.push(Struct.fail({ type: undefined, value: v, path: p, branch: value }))
          continue
        }
        var _Prop$check = Prop.check(v, b, p),
          pfs = _Prop$check[0],
          pr = _Prop$check[1]
        if (pfs) {
          failures.push.apply(failures, pfs)
        } else if (pr !== undefined && k in Props) {
          result[k] = pr
        }
      }
      return failures.length ? [failures] : [undefined, result]
    }
    return Struct
  }
  var createPartial = function createPartial(schema, defaults, struct) {
    invariant(typeof schema === "object")
    var Props = {}
    for (var key in schema) {
      Props[key] = struct.union([schema[key], "undefined"])
    }
    var Struct = createStruct({
      kind: "object",
      type: "{" + Object.keys(schema).join() + "}",
      defaults: defaults,
      struct: struct,
    })
    Struct.check = function (value, branch, path) {
      if (value === void 0) {
        value = Struct.default()
      }
      var d = Struct.default()
      if (value === undefined) {
        value = d
      }
      if (kindOf(value) !== "object") {
        return [[Struct.fail({ value: value, branch: branch, path: path })]]
      }
      var result = {}
      var failures = []
      for (
        var _iterator = _createForOfIteratorHelperLoose(value), _step;
        !(_step = _iterator()).done;

      ) {
        var k = _step.value
        var v = value[k]
        var p = path.concat(k)
        var b = branch.concat(v)
        var Prop = Props[k]
        if (v === undefined && d != null && k in d) {
          v = typeof d[k] === "function" ? d[k](value, branch, path) : d[k]
        }
        if (!(k in Props)) {
          failures.push(Struct.fail({ type: undefined, value: v, path: p, branch: value }))
          continue
        }
        var _Prop$check = Prop.check(v, b, p),
          pfs = _Prop$check[0],
          pr = _Prop$check[1]
        if (pfs) {
          failures.push.apply(failures, pfs)
        } else if (pr !== undefined && k in Props) {
          result[k] = pr
        }
      }
      return failures.length ? [failures] : [undefined, result]
    }
    return Struct
  }
  var createPick = function createPick(schema, defaults, struct) {
    invariant(typeof schema === "object")
    var Props = {}
    for (var key in schema) {
      Props[key] = struct(schema[key])
    }
    var Struct = createStruct({
      kind: "pick",
      type: "pick<{" + Object.keys(schema).join() + "}>",
      defaults: defaults,
      struct: struct,
    })
    Struct.check = function (value, branch, path) {
      if (value === void 0) {
        value = Struct.default()
      }
      var d = Struct.default()
      if (value === undefined) {
        value = d
      }
      if (kindOf(value) !== "object") {
        return [[Struct.fail({ value: value, branch: branch, path: path })]]
      }
      var result = {}
      var failures = []
      for (var k in Props) {
        var v = value[k]
        var p = path.concat(k)
        var b = branch.concat(v)
        var Prop = Props[k]
        if (v === undefined && d != null && k in d) {
          v = typeof d[k] === "function" ? d[k](value, branch, path) : d[k]
        }
        var _Prop$check = Prop.check(v, b, p),
          pfs = _Prop$check[0],
          pr = _Prop$check[1]
        if (pfs) {
          failures.push.apply(failures, pfs)
        } else if (pr !== undefined && k in Props) {
          result[k] = pr
        }
      }
      return failures.length ? [failures] : [undefined, result]
    }
    return Struct
  }
  var createRecord = function createRecord(schema, defaults, struct) {
    invariant(Array.isArray(schema) && schema.length === 2)
    var Key = struct(schema[0])
    var Value = struct(schema[1])
    var Struct = createStruct({
      kind: "record",
      type: "record<" + Key.type + "," + Value.type + ">",
      defaults: defaults,
      struct: struct,
    })
    Struct.check = function (value, branch, path) {
      var defs = Struct.default()
      value = defs ? _objectSpread2(_objectSpread2({}, defs), value) : value
      if (kindOf(value) !== "object") {
        return [[Struct.fail({ value: value, branch: branch, path: path })]]
      }
      var result = {}
      var failures = []
      for (var k in value) {
        var v = value[k]
        var p = path.concat(k)
        var b = branch.concat(v)
        var _Key$check = Key.check(k, b, p),
          kfs = _Key$check[0],
          kr = _Key$check[1]
        if (kfs) {
          failures.push.apply(failures, kfs)
        } else {
          var _Value$check = Value.check(v, b, p),
            vfs = _Value$check[0],
            vr = _Value$check[1]
          if (vfs) {
            failures.push.apply(failures, vfs)
          } else {
            result[kr] = vr
          }
        }
      }
      return failures.length ? [failures] : [undefined, result]
    }
    return Struct
  }
  var createScalar = function createScalar(schema, defaults, struct) {
    invariant(typeof schema === "string")
    var Types = struct.Types
    invariant(schema in Types)
    var Struct = struct(Types[schema], defaults)
    Struct.kind = "scalar"
    Struct.type = schema
    return Struct
  }
  var createShorthand = function createShorthand(schema, defaults, struct) {
    if (isStruct(schema)) {
      return schema
    }
    if (Array.isArray(schema)) {
      if (schema.length === 1) {
        var _schema = schema,
          first = _schema[0]
        return struct.array([first], defaults)
      } else if (schema.length > 1) {
        return struct.tuple(schema, defaults)
      }
    }
    if (typeof schema === "function") {
      return struct.function(schema, defaults)
    }
    if (typeof schema === "object") {
      return struct.object(schema, defaults)
    }
    if (typeof schema === "string") {
      var optional = false
      var Struct
      if (schema.endsWith("?")) {
        optional = true
        schema = schema.slice(0, -1)
      }
      if (schema.includes("|")) {
        var scalars = schema.split(/\s*\|\s*/g)
        Struct = struct.union(scalars, defaults)
      } else if (schema.includes("&")) {
        var _scalars = schema.split(/\s*&\s*/g)
        Struct = struct.intersection(_scalars, defaults)
      } else {
        Struct = struct.scalar(schema, defaults)
      }
      if (optional) {
        Struct = struct.union([Struct, "undefined"], undefined)
      }
      return Struct
    }
    throw new Error(
      "A schema definition must be an object, array, string or function, but you passed: " + schema
    )
  }
  var createTuple = function createTuple(schema, defaults, struct) {
    invariant(Array.isArray(schema))
    var Elements = schema.map(function (s) {
      return struct(s)
    })
    var Struct = createStruct({
      kind: "tuple",
      type:
        "[" +
        Elements.map(function (S) {
          return S.type
        }).join() +
        "]",
      defaults: defaults,
      struct: struct,
    })
    Struct.check = function (value, branch, path) {
      if (value === void 0) {
        value = Struct.default()
      }
      if (!Array.isArray(value)) {
        return [[Struct.fail({ value: value, branch: branch, path: path })]]
      }
      var result = []
      var failures = []
      var length = Math.max(value.length, Elements.length)
      for (var i = 0; i < length; i++) {
        var Element = Elements[i]
        var v = value[i]
        var p = path.concat(i)
        var b = branch.concat(v)
        if (!Element) {
          failures.push(Struct.fail({ type: undefined, value: v, path: p, branch: b }))
        } else {
          var _Element$check = Element.check(v, b, p),
            efs = _Element$check[0],
            er = _Element$check[1]
          if (efs) {
            failures.push.apply(failures, efs)
          } else {
            result[i] = er
          }
        }
      }
      return failures.length ? [failures] : [undefined, result]
    }
    return Struct
  }
  var createUnion = function createUnion(schema, defaults, struct) {
    invariant(Array.isArray(schema) && schema.length !== 0)
    var Structs = schema.map(function (sch) {
      return struct(sch)
    })
    var type = Structs.map(function (s) {
      return s.type
    }).join(" | ")
    var Struct = createStruct({ kind: "union", type: type, defaults: defaults, struct: struct })
    Struct.check = function (value, branch, path) {
      if (value === void 0) {
        value = Struct.default()
      }
      for (
        var _iterator = _createForOfIteratorHelperLoose(Structs), _step;
        !(_step = _iterator()).done;

      ) {
        var _struct = _step.value
        var _struct$check = _struct.check(value, branch, path),
          fs = _struct$check[0],
          v = _struct$check[1]
        if (!fs) {
          return [undefined, v]
        }
      }
      return [[Struct.fail({ value: value, branch: branch, path: path })]]
    }
    return Struct
  }
  var superstruct = function superstruct(settings) {
    if (settings === void 0) {
      settings = {}
    }
    var struct = function struct(schema, defaults) {
      return createShorthand(schema, defaults, struct)
    }
    struct.array = function (schema, defaults) {
      return createArray(schema, defaults, struct)
    }
    struct.dynamic = function (schema, defaults) {
      return createDynamic(schema, defaults, struct)
    }
    struct.enum = function (schema, defaults) {
      return createEnum(schema, defaults, struct)
    }
    struct.function = function (schema, defaults) {
      return createFunction(schema, defaults, struct)
    }
    struct.instance = function (schema, defaults) {
      return createInstance(schema, defaults, struct)
    }
    struct.interface = function (schema, defaults) {
      return createInterface(schema, defaults, struct)
    }
    struct.intersection = function (schema, defaults) {
      return createIntersection(schema, defaults, struct)
    }
    struct.lazy = function (schema, defaults) {
      return createLazy(schema, defaults, struct)
    }
    struct.literal = function (schema, defaults) {
      return createLiteral(schema, defaults, struct)
    }
    struct.object = function (schema, defaults) {
      return createObject(schema, defaults, struct)
    }
    struct.optional = function (schema, defaults) {
      return createUnion([schema, "undefined"], defaults, struct)
    }
    struct.partial = function (schema, defaults) {
      return createPartial(schema, defaults, struct)
    }
    struct.pick = function (schema, defaults) {
      return createPick(schema, defaults, struct)
    }
    struct.record = function (schema, defaults) {
      return createRecord(schema, defaults, struct)
    }
    struct.scalar = function (schema, defaults) {
      return createScalar(schema, defaults, struct)
    }
    struct.size = function (schema, defaults) {
      return createSize(schema, defaults, struct)
    }
    struct.tuple = function (schema, defaults) {
      return createTuple(schema, defaults, struct)
    }
    struct.union = function (schema, defaults) {
      return createUnion(schema, defaults, struct)
    }
    struct.Error = settings.error || StructError
    struct.Types = _objectSpread2(_objectSpread2({}, Types), settings.types)
    return struct
  }
  var struct$1 = superstruct()
  var interopRequireDefault = createCommonjsModule(function (module) {
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj }
    }
    module.exports = _interopRequireDefault
  })
  unwrapExports(interopRequireDefault)
  var setPrototypeOf = createCommonjsModule(function (module) {
    function _setPrototypeOf(o, p) {
      module.exports = _setPrototypeOf =
        Object.setPrototypeOf ||
        function _setPrototypeOf(o, p) {
          o.__proto__ = p
          return o
        }
      return _setPrototypeOf(o, p)
    }
    module.exports = _setPrototypeOf
  })
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function")
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: { value: subClass, writable: true, configurable: true },
    })
    if (superClass) setPrototypeOf(subClass, superClass)
  }
  var inherits$2 = _inherits
  var _typeof_1 = createCommonjsModule(function (module) {
    function _typeof(obj) {
      "@babel/helpers - typeof"
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        module.exports = _typeof = function _typeof(obj) {
          return typeof obj
        }
      } else {
        module.exports = _typeof = function _typeof(obj) {
          return obj &&
            typeof Symbol === "function" &&
            obj.constructor === Symbol &&
            obj !== Symbol.prototype
            ? "symbol"
            : typeof obj
        }
      }
      return _typeof(obj)
    }
    module.exports = _typeof
  })
  function _assertThisInitialized$1(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
    }
    return self
  }
  var assertThisInitialized = _assertThisInitialized$1
  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
      return call
    }
    return assertThisInitialized(self)
  }
  var possibleConstructorReturn = _possibleConstructorReturn
  var getPrototypeOf = createCommonjsModule(function (module) {
    function _getPrototypeOf(o) {
      module.exports = _getPrototypeOf = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o)
          }
      return _getPrototypeOf(o)
    }
    module.exports = _getPrototypeOf
  })
  var eventemitter3 = createCommonjsModule(function (module) {
    var has = Object.prototype.hasOwnProperty,
      prefix = "~"
    function Events() {}
    if (Object.create) {
      Events.prototype = Object.create(null)
      if (!new Events().__proto__) prefix = false
    }
    function EE(fn, context, once) {
      this.fn = fn
      this.context = context
      this.once = once || false
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function")
      }
      var listener = new EE(fn, context || emitter, once),
        evt = prefix ? prefix + event : event
      if (!emitter._events[evt]) (emitter._events[evt] = listener), emitter._eventsCount++
      else if (!emitter._events[evt].fn) emitter._events[evt].push(listener)
      else emitter._events[evt] = [emitter._events[evt], listener]
      return emitter
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0) emitter._events = new Events()
      else delete emitter._events[evt]
    }
    function EventEmitter() {
      this._events = new Events()
      this._eventsCount = 0
    }
    EventEmitter.prototype.eventNames = function eventNames() {
      var names = [],
        events,
        name
      if (this._eventsCount === 0) return names
      for (name in (events = this._events)) {
        if (has.call(events, name)) names.push(prefix ? name.slice(1) : name)
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events))
      }
      return names
    }
    EventEmitter.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event,
        handlers = this._events[evt]
      if (!handlers) return []
      if (handlers.fn) return [handlers.fn]
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn
      }
      return ee
    }
    EventEmitter.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event,
        listeners = this._events[evt]
      if (!listeners) return 0
      if (listeners.fn) return 1
      return listeners.length
    }
    EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event
      if (!this._events[evt]) return false
      var listeners = this._events[evt],
        len = arguments.length,
        args,
        i
      if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, undefined, true)
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true
          case 2:
            return listeners.fn.call(listeners.context, a1), true
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i]
        }
        listeners.fn.apply(listeners.context, args)
      } else {
        var length = listeners.length,
          j
        for (i = 0; i < length; i++) {
          if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true)
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context)
              break
            case 2:
              listeners[i].fn.call(listeners[i].context, a1)
              break
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2)
              break
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3)
              break
            default:
              if (!args)
                for (j = 1, args = new Array(len - 1); j < len; j++) {
                  args[j - 1] = arguments[j]
                }
              listeners[i].fn.apply(listeners[i].context, args)
          }
        }
      }
      return true
    }
    EventEmitter.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false)
    }
    EventEmitter.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true)
    }
    EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event
      if (!this._events[evt]) return this
      if (!fn) {
        clearEvent(this, evt)
        return this
      }
      var listeners = this._events[evt]
      if (listeners.fn) {
        if (
          listeners.fn === fn &&
          (!once || listeners.once) &&
          (!context || listeners.context === context)
        ) {
          clearEvent(this, evt)
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (
            listeners[i].fn !== fn ||
            (once && !listeners[i].once) ||
            (context && listeners[i].context !== context)
          ) {
            events.push(listeners[i])
          }
        }
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events
        else clearEvent(this, evt)
      }
      return this
    }
    EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt
      if (event) {
        evt = prefix ? prefix + event : event
        if (this._events[evt]) clearEvent(this, evt)
      } else {
        this._events = new Events()
        this._eventsCount = 0
      }
      return this
    }
    EventEmitter.prototype.off = EventEmitter.prototype.removeListener
    EventEmitter.prototype.addListener = EventEmitter.prototype.on
    EventEmitter.prefixed = prefix
    EventEmitter.EventEmitter = EventEmitter
    {
      module.exports = EventEmitter
    }
  })
  var websocket_browser = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true })
    exports["default"] = _default
    var _classCallCheck2 = interopRequireDefault(classCallCheck)
    var _createClass2 = interopRequireDefault(createClass)
    var _inherits2 = interopRequireDefault(inherits$2)
    var _possibleConstructorReturn2 = interopRequireDefault(possibleConstructorReturn)
    var _getPrototypeOf2 = interopRequireDefault(getPrototypeOf)
    function _createSuper(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct()
      return function _createSuperInternal() {
        var Super = (0, _getPrototypeOf2["default"])(Derived),
          result
        if (hasNativeReflectConstruct) {
          var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor
          result = Reflect.construct(Super, arguments, NewTarget)
        } else {
          result = Super.apply(this, arguments)
        }
        return (0, _possibleConstructorReturn2["default"])(this, result)
      }
    }
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false
      if (Reflect.construct.sham) return false
      if (typeof Proxy === "function") return true
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function () {}))
        return true
      } catch (e) {
        return false
      }
    }
    var WebSocketBrowserImpl = (function (_EventEmitter) {
      ;(0, _inherits2["default"])(WebSocketBrowserImpl, _EventEmitter)
      var _super = _createSuper(WebSocketBrowserImpl)
      function WebSocketBrowserImpl(address, options, protocols) {
        var _this
        ;(0, _classCallCheck2["default"])(this, WebSocketBrowserImpl)
        _this = _super.call(this)
        _this.socket = new window.WebSocket(address, protocols)
        _this.socket.onopen = function () {
          return _this.emit("open")
        }
        _this.socket.onmessage = function (event) {
          return _this.emit("message", event.data)
        }
        _this.socket.onerror = function (error) {
          return _this.emit("error", error)
        }
        _this.socket.onclose = function (event) {
          _this.emit("close", event.code, event.reason)
        }
        return _this
      }
      ;(0, _createClass2["default"])(WebSocketBrowserImpl, [
        {
          key: "send",
          value: function send(data, optionsOrCallback, callback) {
            var cb = callback || optionsOrCallback
            try {
              this.socket.send(data)
              cb()
            } catch (error) {
              cb(error)
            }
          },
        },
        {
          key: "close",
          value: function close(code, reason) {
            this.socket.close(code, reason)
          },
        },
        {
          key: "addEventListener",
          value: function addEventListener(type, listener, options) {
            this.socket.addEventListener(type, listener, options)
          },
        },
      ])
      return WebSocketBrowserImpl
    })(eventemitter3.EventEmitter)
    function _default(address, options) {
      return new WebSocketBrowserImpl(address, options)
    }
  })
  unwrapExports(websocket_browser)
  var s = 1e3
  var m = s * 60
  var h = m * 60
  var d = h * 24
  var y = d * 365.25
  var ms = function (val, options) {
    options = options || {}
    var type = typeof val
    if (type === "string" && val.length > 0) {
      return parse$2(val)
    } else if (type === "number" && isNaN(val) === false) {
      return options.long ? fmtLong(val) : fmtShort(val)
    }
    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val))
  }
  function parse$2(str) {
    str = String(str)
    if (str.length > 100) {
      return
    }
    var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
      str
    )
    if (!match) {
      return
    }
    var n = parseFloat(match[1])
    var type = (match[2] || "ms").toLowerCase()
    switch (type) {
      case "years":
      case "year":
      case "yrs":
      case "yr":
      case "y":
        return n * y
      case "days":
      case "day":
      case "d":
        return n * d
      case "hours":
      case "hour":
      case "hrs":
      case "hr":
      case "h":
        return n * h
      case "minutes":
      case "minute":
      case "mins":
      case "min":
      case "m":
        return n * m
      case "seconds":
      case "second":
      case "secs":
      case "sec":
      case "s":
        return n * s
      case "milliseconds":
      case "millisecond":
      case "msecs":
      case "msec":
      case "ms":
        return n
      default:
        return undefined
    }
  }
  function fmtShort(ms) {
    if (ms >= d) {
      return Math.round(ms / d) + "d"
    }
    if (ms >= h) {
      return Math.round(ms / h) + "h"
    }
    if (ms >= m) {
      return Math.round(ms / m) + "m"
    }
    if (ms >= s) {
      return Math.round(ms / s) + "s"
    }
    return ms + "ms"
  }
  function fmtLong(ms) {
    return (
      plural(ms, d, "day") ||
      plural(ms, h, "hour") ||
      plural(ms, m, "minute") ||
      plural(ms, s, "second") ||
      ms + " ms"
    )
  }
  function plural(ms, n, name) {
    if (ms < n) {
      return
    }
    if (ms < n * 1.5) {
      return Math.floor(ms / n) + " " + name
    }
    return Math.ceil(ms / n) + " " + name + "s"
  }
  var debug = createCommonjsModule(function (module, exports) {
    exports = module.exports = createDebug.debug = createDebug["default"] = createDebug
    exports.coerce = coerce
    exports.disable = disable
    exports.enable = enable
    exports.enabled = enabled
    exports.humanize = ms
    exports.names = []
    exports.skips = []
    exports.formatters = {}
    var prevTime
    function selectColor(namespace) {
      var hash = 0,
        i
      for (i in namespace) {
        hash = (hash << 5) - hash + namespace.charCodeAt(i)
        hash |= 0
      }
      return exports.colors[Math.abs(hash) % exports.colors.length]
    }
    function createDebug(namespace) {
      function debug() {
        if (!debug.enabled) return
        var self = debug
        var curr = +new Date()
        var ms = curr - (prevTime || curr)
        self.diff = ms
        self.prev = prevTime
        self.curr = curr
        prevTime = curr
        var args = new Array(arguments.length)
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i]
        }
        args[0] = exports.coerce(args[0])
        if ("string" !== typeof args[0]) {
          args.unshift("%O")
        }
        var index = 0
        args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
          if (match === "%%") return match
          index++
          var formatter = exports.formatters[format]
          if ("function" === typeof formatter) {
            var val = args[index]
            match = formatter.call(self, val)
            args.splice(index, 1)
            index--
          }
          return match
        })
        exports.formatArgs.call(self, args)
        var logFn = debug.log || exports.log || console.log.bind(console)
        logFn.apply(self, args)
      }
      debug.namespace = namespace
      debug.enabled = exports.enabled(namespace)
      debug.useColors = exports.useColors()
      debug.color = selectColor(namespace)
      if ("function" === typeof exports.init) {
        exports.init(debug)
      }
      return debug
    }
    function enable(namespaces) {
      exports.save(namespaces)
      exports.names = []
      exports.skips = []
      var split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/)
      var len = split.length
      for (var i = 0; i < len; i++) {
        if (!split[i]) continue
        namespaces = split[i].replace(/\*/g, ".*?")
        if (namespaces[0] === "-") {
          exports.skips.push(new RegExp("^" + namespaces.substr(1) + "$"))
        } else {
          exports.names.push(new RegExp("^" + namespaces + "$"))
        }
      }
    }
    function disable() {
      exports.enable("")
    }
    function enabled(name) {
      var i, len
      for (i = 0, len = exports.skips.length; i < len; i++) {
        if (exports.skips[i].test(name)) {
          return false
        }
      }
      for (i = 0, len = exports.names.length; i < len; i++) {
        if (exports.names[i].test(name)) {
          return true
        }
      }
      return false
    }
    function coerce(val) {
      if (val instanceof Error) return val.stack || val.message
      return val
    }
  })
  var debug_1 = debug.coerce
  var debug_2 = debug.disable
  var debug_3 = debug.enable
  var debug_4 = debug.enabled
  var debug_5 = debug.humanize
  var debug_6 = debug.names
  var debug_7 = debug.skips
  var debug_8 = debug.formatters
  var browser$3 = createCommonjsModule(function (module, exports) {
    exports = module.exports = debug
    exports.log = log
    exports.formatArgs = formatArgs
    exports.save = save
    exports.load = load
    exports.useColors = useColors
    exports.storage =
      "undefined" != typeof chrome && "undefined" != typeof chrome.storage
        ? chrome.storage.local
        : localstorage()
    exports.colors = [
      "lightseagreen",
      "forestgreen",
      "goldenrod",
      "dodgerblue",
      "darkorchid",
      "crimson",
    ]
    function useColors() {
      if (typeof window !== "undefined" && window.process && window.process.type === "renderer") {
        return true
      }
      return (
        (typeof document !== "undefined" &&
          document.documentElement &&
          document.documentElement.style &&
          document.documentElement.style.WebkitAppearance) ||
        (typeof window !== "undefined" &&
          window.console &&
          (window.console.firebug || (window.console.exception && window.console.table))) ||
        (typeof navigator !== "undefined" &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
          parseInt(RegExp.$1, 10) >= 31) ||
        (typeof navigator !== "undefined" &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
      )
    }
    exports.formatters.j = function (v) {
      try {
        return JSON.stringify(v)
      } catch (err) {
        return "[UnexpectedJSONParseError]: " + err.message
      }
    }
    function formatArgs(args) {
      var useColors = this.useColors
      args[0] =
        (useColors ? "%c" : "") +
        this.namespace +
        (useColors ? " %c" : " ") +
        args[0] +
        (useColors ? "%c " : " ") +
        "+" +
        exports.humanize(this.diff)
      if (!useColors) return
      var c = "color: " + this.color
      args.splice(1, 0, c, "color: inherit")
      var index = 0
      var lastC = 0
      args[0].replace(/%[a-zA-Z%]/g, function (match) {
        if ("%%" === match) return
        index++
        if ("%c" === match) {
          lastC = index
        }
      })
      args.splice(lastC, 0, c)
    }
    function log() {
      return (
        "object" === typeof console &&
        console.log &&
        Function.prototype.apply.call(console.log, console, arguments)
      )
    }
    function save(namespaces) {
      try {
        if (null == namespaces) {
          exports.storage.removeItem("debug")
        } else {
          exports.storage.debug = namespaces
        }
      } catch (e) {}
    }
    function load() {
      var r
      try {
        r = exports.storage.debug
      } catch (e) {}
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG
      }
      return r
    }
    exports.enable(load())
    function localstorage() {
      try {
        return window.localStorage
      } catch (e) {}
    }
  })
  var browser_1$1 = browser$3.log
  var browser_2$1 = browser$3.formatArgs
  var browser_3$1 = browser$3.save
  var browser_4 = browser$3.load
  var browser_5 = browser$3.useColors
  var browser_6 = browser$3.storage
  var browser_7 = browser$3.colors
  var exists_1 = exists
  function exists(val) {
    return val !== undefined && val !== null
  }
  var isObject_1 = isObject$1
  function isObject$1(val) {
    return (
      typeof val === "object" &&
      exists_1(val) &&
      !Array.isArray(val) &&
      !(val instanceof RegExp) &&
      !(val instanceof String) &&
      !(val instanceof Number)
    )
  }
  var isFunction_1 = isFunction$1
  function isFunction$1(v) {
    return typeof v === "function"
  }
  var not_1 = not
  function not(val) {
    if (isFunction_1(val)) {
      return function () {
        return not(val.apply(this, arguments))
      }
    } else {
      return !val
    }
  }
  var isOptionalKey_1 = isOptionalKey
  function isOptionalKey(key) {
    return /^\[.+\]$/.test(key)
  }
  var isSpreadKey_1 = isSpreadKey
  function isSpreadKey(key) {
    return /^[.]{3}.+/.test(key) || /^\[[.]{3}[^\]]+\]$/.test(key)
  }
  var isInteger_1 = isInteger
  function isInteger(val) {
    return typeof val === "number" && isFinite(val) && Math.floor(val) === val
  }
  var isString_1 = isString$1
  function isString$1(val) {
    return typeof val === "string" || val instanceof String
  }
  var assertType_1 = assertType
  function assertType(bool, message) {
    if (!bool) {
      throw new TypeError(message)
    }
  }
  var capitalized = /^[A-Z]/
  var strictCapitalilized = /^[A-Z]([a-z]|$)/
  var isCapitalized_1 = isCapitalized
  function isCapitalized(str, strict) {
    return strict ? strictCapitalilized.test(str) : capitalized.test(str)
  }
  var isClass = createCommonjsModule(function (module, exports) {
    ;(function (root) {
      var toString = Function.prototype.toString
      function fnBody(fn) {
        return toString
          .call(fn)
          .replace(/^[^{]*{\s*/, "")
          .replace(/\s*}[^}]*$/, "")
      }
      function isClass(fn) {
        return (
          typeof fn === "function" &&
          (/^class\s/.test(toString.call(fn)) || /^.*classCallCheck\(/.test(fnBody(fn)))
        )
      }
      {
        if (module.exports) {
          exports = module.exports = isClass
        }
        exports.isClass = isClass
      }
    })()
  })
  var isClass_1 = isClass.isClass
  var isClass_1$1 = isClass$1
  function isClass$1(fn) {
    return isClass(fn) || (isFunction_1(fn) && isCapitalized_1(fn.name))
  }
  var startsWithVowel_1 = startsWithVowel
  function startsWithVowel(str) {
    return /^[aeiou]/i.test(str)
  }
  var compoundSubject = createCommonjsModule(function (module) {
    ;(function () {
      var compoundSubject = function (arrayOfStrings) {
        var wrapperObject = {},
          endWith = "and",
          delimitAll = false,
          delimitWith = ","
        wrapperObject.endWith = function (newEndWith) {
          if (typeof newEndWith !== "string") {
            return wrapperObject
          }
          endWith = newEndWith
          return wrapperObject
        }
        wrapperObject.delimitAll = function () {
          var newDelimitAll = arguments[0]
          if (typeof newDelimitAll === "boolean") {
            delimitAll = newDelimitAll
          } else {
            delimitAll = true
          }
          return wrapperObject
        }
        wrapperObject.delimitWith = function (newDelimitWith) {
          if (typeof newDelimitWith !== "string") {
            return wrapperObject
          }
          delimitWith = newDelimitWith
          return wrapperObject
        }
        wrapperObject.make = function () {
          var combinedEndWith = delimitAll
              ? delimitWith + " " + endWith + " "
              : " " + endWith + " ",
            upToLastTwo,
            lastTwo
          if (typeof arrayOfStrings === "undefined" || !arrayOfStrings instanceof Array) {
            return ""
          }
          upToLastTwo = arrayOfStrings.slice(0, -2).join(delimitWith + " ")
          lastTwo = arrayOfStrings.slice(arrayOfStrings.length - 2).join(combinedEndWith)
          if (!upToLastTwo.length) {
            return lastTwo
          }
          return upToLastTwo + delimitWith + " " + lastTwo
        }
        return wrapperObject
      }
      {
        module.exports = compoundSubject
      }
    })()
  })
  var isArray$4 = Array.isArray
  var isEmpty_1 = isEmpty
  function isEmpty(val) {
    if (isString_1(val) || isArray$4(val)) {
      return val.length === 0
    } else if (isObject_1(val)) {
      for (var name in val) {
        return false
      }
      return true
    } else {
      throw new TypeError("Val must be a string, array or object")
    }
  }
  var multiValidate_1 = multiValidate
  function multiValidate(key, arg, validators) {
    var errMessage = '"' + key + '" must be '
    assertType_1(!isEmpty_1(validators), '"validators" cannot be empty')
    var typeArr = validators.map(function (validator) {
      if (isString_1(validator)) {
        return validator
      } else if (isClass_1$1(validator)) {
        return '"' + validator.name + '"'
      } else if (isFunction_1(validator)) {
        return 'pass "' + (validator.name || "anonymous") + '"'
      } else {
        throw new TypeError(
          '"validators" must be an array containing only strings, classes, or functions'
        )
      }
    })
    var typeStr = compoundSubject(typeArr).endWith("or").make()
    var article = startsWithVowel_1(typeStr) ? "an" : "a"
    errMessage += article + " " + typeStr
    var passedAnyValidator = validators.some(function (validator) {
      try {
        validate_1(key, arg, validator)
        return true
      } catch (e) {
        return false
      }
    })
    if (!passedAnyValidator) {
      throw new TypeError(errMessage)
    }
  }
  var NoClass = function () {}
  var classes = { string: String, number: Number, array: Array, regexp: RegExp }
  var validate_1 = validate
  function validate(key, arg, validator, _plural) {
    if (validator === "*") {
      return
    }
    var keyStr = '"' + key + '"'
    var typeStr
    var article
    var Class
    var errMessage
    var assertion
    if (Array.isArray(validator)) {
      return multiValidate_1(key, arg, validator)
    } else if (isString_1(validator)) {
      typeStr = validator
      Class = classes[typeStr] || NoClass
      article = startsWithVowel_1(typeStr) ? "an" : "a"
      errMessage = _plural
        ? keyStr + " must be " + typeStr + "s"
        : keyStr + " must be " + article + " " + typeStr
      if (typeStr === "integer") {
        assertion = isInteger_1(arg)
      } else if (typeStr === "object") {
        assertion = isObject_1(arg)
      } else {
        assertion = arg instanceof Class || typeof arg === validator
      }
      assertType_1(assertion, errMessage)
    } else if (isClass_1$1(validator)) {
      typeStr = validator.name
      Class = validator
      errMessage = _plural
        ? keyStr + ' must be instances of "' + typeStr + '"'
        : keyStr + ' must be an instance of "' + typeStr + '"'
      assertType_1(arg instanceof Class, errMessage)
    } else if (isFunction_1(validator)) {
      try {
        validator(arg)
      } catch (e) {
        e.message = keyStr += ": " + e.message
        throw e
      }
    } else {
      throw new TypeError('"validator" must be a string, class or function')
    }
  }
  var debug$1 = browser$3("assert-args")
  var isRequiredKey = not_1(isOptionalKey_1)
  var assertArgs_1 = assertArgs
  function assertArgs(args, validation) {
    if (typeof args !== "object" || !exists_1(args.length)) {
      throw new TypeError('"args" must be an array or array-like object (arguments)')
    }
    if (!isObject_1(validation)) {
      throw new TypeError('"validation" must be an object')
    }
    var argsLeft = Array.prototype.slice.call(args)
    var firstOptionalErr
    var ret = {}
    var argKeys = Object.keys(validation)
    var outKey
    if (argKeys.filter(isSpreadKey_1).length > 1) {
      throw new Error("assert-args only supports a single spread argument")
    }
    argKeys.forEach(function (key, i) {
      var spreadArgs
      var validator = validation[key]
      var arg = argsLeft[0]
      if (isSpreadKey_1(key)) {
        debug$1("is spread key: " + key)
        debug$1("argKeys.length", argKeys.length)
        debug$1("argsLeft.length", argsLeft.length)
        var requiredKeysLeft = argKeys.slice(i + 1).filter(isRequiredKey)
        debug$1("requiredKeysLeft", requiredKeysLeft)
        spreadArgs = argsLeft.slice(0, argsLeft.length - requiredKeysLeft.length)
        debug$1("spreadArgs", spreadArgs)
        debug$1("spreadArgs.length", spreadArgs.length)
        if (isOptionalKey_1(key)) {
          debug$1("is optional spread key: " + key)
          outKey = key.slice(4, -1)
          ret[outKey] = []
          spreadArgs.forEach(function (arg) {
            if (!exists_1(arg)) {
              firstOptionalErr = null
              argsLeft.shift()
              return
            }
            try {
              validate_1(key.slice(1, -1), arg, validator, true)
              firstOptionalErr = null
              ret[outKey].push(arg)
              argsLeft.shift()
            } catch (err) {
              debug$1("spread validate err: " + err.message)
              debug$1("spread validate argsLeft: " + argsLeft)
              if (firstOptionalErr) {
                throw firstOptionalErr
              } else {
                firstOptionalErr = err
              }
            }
          })
        } else {
          debug$1("is required spread key: " + key)
          outKey = key.slice(3)
          ret[outKey] = []
          if (spreadArgs.length === 0) {
            throw new TypeError('"' + key + '" is required')
          }
          spreadArgs.forEach(function (arg) {
            try {
              validate_1(key, arg, validator, true)
              firstOptionalErr = null
              ret[outKey].push(arg)
              argsLeft.shift()
            } catch (err) {
              debug$1("spread validate err: " + err.message)
              debug$1("spread validate argsLeft: " + argsLeft)
              debug$1("spread validate argKeys: " + argKeys)
              if (i === argKeys.length - 1) {
                if (firstOptionalErr) {
                  if (argsLeft.length - 1 > requiredKeysLeft.length) {
                    throw firstOptionalErr
                  } else {
                    throw err
                  }
                } else {
                  throw err
                }
              } else {
                if (firstOptionalErr) {
                  throw firstOptionalErr
                } else {
                  firstOptionalErr = err
                }
              }
            }
          })
        }
        return
      } else if (isOptionalKey_1(key)) {
        debug$1("is optional key: " + key)
        key = key.slice(1, -1)
        if (argsLeft.length === 0) {
          ret[key] = undefined
          return
        } else if (!exists_1(arg)) {
          firstOptionalErr = null
          ret[key] = argsLeft.shift()
          return
        }
        try {
          validate_1(key, arg, validator)
          firstOptionalErr = null
          ret[key] = argsLeft.shift()
          return
        } catch (err) {
          firstOptionalErr = firstOptionalErr || err
          ret[key] = undefined
          return
        }
      } else {
        debug$1("is required key: " + key)
        if (argsLeft.length === 0) {
          throw new TypeError('"' + key + '" is required')
        }
        try {
          validate_1(key, arg, validator)
          firstOptionalErr = null
          ret[key] = argsLeft.shift()
        } catch (err) {
          if (firstOptionalErr && argsLeft.length > 1) {
            throw firstOptionalErr
          }
          throw err
        }
        return
      }
    })
    if (firstOptionalErr) {
      throw firstOptionalErr
    }
    return ret
  }
  /*!
  Copyright (C) 2013-2017 by Andrea Giammarchi - @WebReflection

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.

  */ var specialChar =
      "~",
    safeSpecialChar = "\\x" + ("0" + specialChar.charCodeAt(0).toString(16)).slice(-2),
    escapedSafeSpecialChar = "\\" + safeSpecialChar,
    specialCharRG = new RegExp(safeSpecialChar, "g"),
    safeSpecialCharRG = new RegExp(escapedSafeSpecialChar, "g"),
    safeStartWithSpecialCharRG = new RegExp("(?:^|([^\\\\]))" + escapedSafeSpecialChar),
    indexOf =
      [].indexOf ||
      function (v) {
        for (var i = this.length; i-- && this[i] !== v; );
        return i
      },
    $String = String
  function generateReplacer(value, replacer, resolve) {
    var doNotIgnore = false,
      inspect = !!replacer,
      path = [],
      all = [value],
      seen = [value],
      mapp = [resolve ? specialChar : "[Circular]"],
      last = value,
      lvl = 1,
      i,
      fn
    if (inspect) {
      fn =
        typeof replacer === "object"
          ? function (key, value) {
              return key !== "" && replacer.indexOf(key) < 0 ? void 0 : value
            }
          : replacer
    }
    return function (key, value) {
      if (inspect) value = fn.call(this, key, value)
      if (doNotIgnore) {
        if (last !== this) {
          i = lvl - indexOf.call(all, this) - 1
          lvl -= i
          all.splice(lvl, all.length)
          path.splice(lvl - 1, path.length)
          last = this
        }
        if (typeof value === "object" && value) {
          if (indexOf.call(all, value) < 0) {
            all.push((last = value))
          }
          lvl = all.length
          i = indexOf.call(seen, value)
          if (i < 0) {
            i = seen.push(value) - 1
            if (resolve) {
              path.push(("" + key).replace(specialCharRG, safeSpecialChar))
              mapp[i] = specialChar + path.join(specialChar)
            } else {
              mapp[i] = mapp[0]
            }
          } else {
            value = mapp[i]
          }
        } else {
          if (typeof value === "string" && resolve) {
            value = value
              .replace(safeSpecialChar, escapedSafeSpecialChar)
              .replace(specialChar, safeSpecialChar)
          }
        }
      } else {
        doNotIgnore = true
      }
      return value
    }
  }
  function retrieveFromPath(current, keys) {
    for (
      var i = 0, length = keys.length;
      i < length;
      current = current[keys[i++].replace(safeSpecialCharRG, specialChar)]
    );
    return current
  }
  function generateReviver(reviver) {
    return function (key, value) {
      var isString = typeof value === "string"
      if (isString && value.charAt(0) === specialChar) {
        return new $String(value.slice(1))
      }
      if (key === "") value = regenerate(value, value, {})
      if (isString)
        value = value
          .replace(safeStartWithSpecialCharRG, "$1" + specialChar)
          .replace(escapedSafeSpecialChar, safeSpecialChar)
      return reviver ? reviver.call(this, key, value) : value
    }
  }
  function regenerateArray(root, current, retrieve) {
    for (var i = 0, length = current.length; i < length; i++) {
      current[i] = regenerate(root, current[i], retrieve)
    }
    return current
  }
  function regenerateObject(root, current, retrieve) {
    for (var key in current) {
      if (current.hasOwnProperty(key)) {
        current[key] = regenerate(root, current[key], retrieve)
      }
    }
    return current
  }
  function regenerate(root, current, retrieve) {
    return current instanceof Array
      ? regenerateArray(root, current, retrieve)
      : current instanceof $String
      ? current.length
        ? retrieve.hasOwnProperty(current)
          ? retrieve[current]
          : (retrieve[current] = retrieveFromPath(root, current.split(specialChar)))
        : root
      : current instanceof Object
      ? regenerateObject(root, current, retrieve)
      : current
  }
  var CircularJSON = {
    stringify: function stringify(value, replacer, space, doNotResolve) {
      return CircularJSON.parser.stringify(
        value,
        generateReplacer(value, replacer, !doNotResolve),
        space
      )
    },
    parse: function parse(text, reviver) {
      return CircularJSON.parser.parse(text, generateReviver(reviver))
    },
    parser: JSON,
  }
  var circularJson_node = CircularJSON
  var client = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true })
    exports["default"] = void 0
    var _regenerator = interopRequireDefault(regenerator)
    var _asyncToGenerator2 = interopRequireDefault(asyncToGenerator)
    var _typeof2 = interopRequireDefault(_typeof_1)
    var _classCallCheck2 = interopRequireDefault(classCallCheck)
    var _createClass2 = interopRequireDefault(createClass)
    var _inherits2 = interopRequireDefault(inherits$2)
    var _possibleConstructorReturn2 = interopRequireDefault(possibleConstructorReturn)
    var _getPrototypeOf2 = interopRequireDefault(getPrototypeOf)
    var _assertArgs = interopRequireDefault(assertArgs_1)
    var _circularJson = interopRequireDefault(circularJson_node)
    function _createSuper(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct()
      return function _createSuperInternal() {
        var Super = (0, _getPrototypeOf2["default"])(Derived),
          result
        if (hasNativeReflectConstruct) {
          var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor
          result = Reflect.construct(Super, arguments, NewTarget)
        } else {
          result = Super.apply(this, arguments)
        }
        return (0, _possibleConstructorReturn2["default"])(this, result)
      }
    }
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false
      if (Reflect.construct.sham) return false
      if (typeof Proxy === "function") return true
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function () {}))
        return true
      } catch (e) {
        return false
      }
    }
    var CommonClient = (function (_EventEmitter) {
      ;(0, _inherits2["default"])(CommonClient, _EventEmitter)
      var _super = _createSuper(CommonClient)
      function CommonClient(webSocketFactory) {
        var _this
        var address =
          arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "ws://localhost:8080"
        var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          _ref$autoconnect = _ref.autoconnect,
          autoconnect = _ref$autoconnect === void 0 ? true : _ref$autoconnect,
          _ref$reconnect = _ref.reconnect,
          reconnect = _ref$reconnect === void 0 ? true : _ref$reconnect,
          _ref$reconnect_interv = _ref.reconnect_interval,
          reconnect_interval = _ref$reconnect_interv === void 0 ? 1e3 : _ref$reconnect_interv,
          _ref$max_reconnects = _ref.max_reconnects,
          max_reconnects = _ref$max_reconnects === void 0 ? 5 : _ref$max_reconnects
        var generate_request_id = arguments.length > 3 ? arguments[3] : undefined
        ;(0, _classCallCheck2["default"])(this, CommonClient)
        _this = _super.call(this)
        _this.webSocketFactory = webSocketFactory
        _this.queue = {}
        _this.rpc_id = 0
        _this.address = address
        _this.options = arguments[2]
        _this.autoconnect = autoconnect
        _this.ready = false
        _this.reconnect = reconnect
        _this.reconnect_interval = reconnect_interval
        _this.max_reconnects = max_reconnects
        _this.current_reconnects = 0
        _this.generate_request_id =
          generate_request_id ||
          function () {
            return ++_this.rpc_id
          }
        if (_this.autoconnect) _this._connect(_this.address, _this.options)
        return _this
      }
      ;(0, _createClass2["default"])(CommonClient, [
        {
          key: "connect",
          value: function connect() {
            if (this.socket) return
            this._connect(this.address, this.options)
          },
        },
        {
          key: "call",
          value: function call(method, params, timeout, ws_opts) {
            var _this2 = this
            ;(0, _assertArgs["default"])(arguments, {
              method: "string",
              "[params]": ["object", Array],
              "[timeout]": "number",
              "[ws_opts]": "object",
            })
            if (!ws_opts && "object" === (0, _typeof2["default"])(timeout)) {
              ws_opts = timeout
              timeout = null
            }
            return new Promise(function (resolve, reject) {
              if (!_this2.ready) return reject(new Error("socket not ready"))
              var rpc_id = _this2.generate_request_id(method, params)
              var message = { jsonrpc: "2.0", method: method, params: params || null, id: rpc_id }
              _this2.socket.send(JSON.stringify(message), ws_opts, function (error) {
                if (error) return reject(error)
                _this2.queue[rpc_id] = { promise: [resolve, reject] }
                if (timeout) {
                  _this2.queue[rpc_id].timeout = setTimeout(function () {
                    _this2.queue[rpc_id] = null
                    reject(new Error("reply timeout"))
                  }, timeout)
                }
              })
            })
          },
        },
        {
          key: "login",
          value: (function () {
            var _login = (0, _asyncToGenerator2["default"])(
              _regenerator["default"].mark(function _callee(params) {
                return _regenerator["default"].wrap(
                  function _callee$(_context) {
                    while (1) {
                      switch ((_context.prev = _context.next)) {
                        case 0:
                          _context.next = 2
                          return this.call("rpc.login", params)
                        case 2:
                          return _context.abrupt("return", _context.sent)
                        case 3:
                        case "end":
                          return _context.stop()
                      }
                    }
                  },
                  _callee,
                  this
                )
              })
            )
            function login(_x) {
              return _login.apply(this, arguments)
            }
            return login
          })(),
        },
        {
          key: "listMethods",
          value: (function () {
            var _listMethods = (0, _asyncToGenerator2["default"])(
              _regenerator["default"].mark(function _callee2() {
                return _regenerator["default"].wrap(
                  function _callee2$(_context2) {
                    while (1) {
                      switch ((_context2.prev = _context2.next)) {
                        case 0:
                          _context2.next = 2
                          return this.call("__listMethods")
                        case 2:
                          return _context2.abrupt("return", _context2.sent)
                        case 3:
                        case "end":
                          return _context2.stop()
                      }
                    }
                  },
                  _callee2,
                  this
                )
              })
            )
            function listMethods() {
              return _listMethods.apply(this, arguments)
            }
            return listMethods
          })(),
        },
        {
          key: "notify",
          value: function notify(method, params) {
            var _this3 = this
            ;(0, _assertArgs["default"])(arguments, {
              method: "string",
              "[params]": ["object", Array],
            })
            return new Promise(function (resolve, reject) {
              if (!_this3.ready) return reject(new Error("socket not ready"))
              var message = { jsonrpc: "2.0", method: method, params: params || null }
              _this3.socket.send(JSON.stringify(message), function (error) {
                if (error) return reject(error)
                resolve()
              })
            })
          },
        },
        {
          key: "subscribe",
          value: (function () {
            var _subscribe = (0, _asyncToGenerator2["default"])(
              _regenerator["default"].mark(function _callee3(event) {
                var result,
                  _args3 = arguments
                return _regenerator["default"].wrap(
                  function _callee3$(_context3) {
                    while (1) {
                      switch ((_context3.prev = _context3.next)) {
                        case 0:
                          ;(0, _assertArgs["default"])(_args3, { event: ["string", Array] })
                          if (typeof event === "string") event = [event]
                          _context3.next = 4
                          return this.call("rpc.on", event)
                        case 4:
                          result = _context3.sent
                          if (!(typeof event === "string" && result[event] !== "ok")) {
                            _context3.next = 7
                            break
                          }
                          throw new Error(
                            "Failed subscribing to an event '" + event + "' with: " + result[event]
                          )
                        case 7:
                          return _context3.abrupt("return", result)
                        case 8:
                        case "end":
                          return _context3.stop()
                      }
                    }
                  },
                  _callee3,
                  this
                )
              })
            )
            function subscribe(_x2) {
              return _subscribe.apply(this, arguments)
            }
            return subscribe
          })(),
        },
        {
          key: "unsubscribe",
          value: (function () {
            var _unsubscribe = (0, _asyncToGenerator2["default"])(
              _regenerator["default"].mark(function _callee4(event) {
                var result,
                  _args4 = arguments
                return _regenerator["default"].wrap(
                  function _callee4$(_context4) {
                    while (1) {
                      switch ((_context4.prev = _context4.next)) {
                        case 0:
                          ;(0, _assertArgs["default"])(_args4, { event: ["string", Array] })
                          if (typeof event === "string") event = [event]
                          _context4.next = 4
                          return this.call("rpc.off", event)
                        case 4:
                          result = _context4.sent
                          if (!(typeof event === "string" && result[event] !== "ok")) {
                            _context4.next = 7
                            break
                          }
                          throw new Error("Failed unsubscribing from an event with: " + result)
                        case 7:
                          return _context4.abrupt("return", result)
                        case 8:
                        case "end":
                          return _context4.stop()
                      }
                    }
                  },
                  _callee4,
                  this
                )
              })
            )
            function unsubscribe(_x3) {
              return _unsubscribe.apply(this, arguments)
            }
            return unsubscribe
          })(),
        },
        {
          key: "close",
          value: function close(code, data) {
            this.socket.close(code || 1e3, data)
          },
        },
        {
          key: "_connect",
          value: function _connect(address, options) {
            var _this4 = this
            this.socket = this.webSocketFactory(address, options)
            this.socket.addEventListener("open", function () {
              _this4.ready = true
              _this4.emit("open")
              _this4.current_reconnects = 0
            })
            this.socket.addEventListener("message", function (_ref2) {
              var message = _ref2.data
              if (message instanceof ArrayBuffer) message = Buffer.from(message).toString()
              try {
                message = _circularJson["default"].parse(message)
              } catch (error) {
                return
              }
              if (message.notification && _this4.listeners(message.notification).length) {
                if (!Object.keys(message.params).length) return _this4.emit(message.notification)
                var args = [message.notification]
                if (message.params.constructor === Object) args.push(message.params)
                else
                  for (var i = 0; i < message.params.length; i++) {
                    args.push(message.params[i])
                  }
                return _this4.emit.apply(_this4, args)
              }
              if (!_this4.queue[message.id]) {
                if (message.method && message.params)
                  return _this4.emit(message.method, message.params)
                else return
              }
              if (_this4.queue[message.id].timeout) clearTimeout(_this4.queue[message.id].timeout)
              if (message.error) _this4.queue[message.id].promise[1](message.error)
              else _this4.queue[message.id].promise[0](message.result)
              _this4.queue[message.id] = null
            })
            this.socket.addEventListener("error", function (error) {
              return _this4.emit("error", error)
            })
            this.socket.addEventListener("close", function (_ref3) {
              var code = _ref3.code,
                reason = _ref3.reason
              if (_this4.ready) _this4.emit("close", code, reason)
              _this4.ready = false
              if (code === 1e3) return
              _this4.current_reconnects++
              if (
                _this4.reconnect &&
                (_this4.max_reconnects > _this4.current_reconnects || _this4.max_reconnects === 0)
              )
                setTimeout(function () {
                  return _this4._connect(address, options)
                }, _this4.reconnect_interval)
            })
          },
        },
      ])
      return CommonClient
    })(eventemitter3.EventEmitter)
    exports["default"] = CommonClient
  })
  unwrapExports(client)
  var index_browser = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true })
    exports.Client = void 0
    var _classCallCheck2 = interopRequireDefault(classCallCheck)
    var _inherits2 = interopRequireDefault(inherits$2)
    var _possibleConstructorReturn2 = interopRequireDefault(possibleConstructorReturn)
    var _getPrototypeOf2 = interopRequireDefault(getPrototypeOf)
    var _websocket = interopRequireDefault(websocket_browser)
    var _client = interopRequireDefault(client)
    function _createSuper(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct()
      return function _createSuperInternal() {
        var Super = (0, _getPrototypeOf2["default"])(Derived),
          result
        if (hasNativeReflectConstruct) {
          var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor
          result = Reflect.construct(Super, arguments, NewTarget)
        } else {
          result = Super.apply(this, arguments)
        }
        return (0, _possibleConstructorReturn2["default"])(this, result)
      }
    }
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false
      if (Reflect.construct.sham) return false
      if (typeof Proxy === "function") return true
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function () {}))
        return true
      } catch (e) {
        return false
      }
    }
    var Client = (function (_CommonClient) {
      ;(0, _inherits2["default"])(Client, _CommonClient)
      var _super = _createSuper(Client)
      function Client() {
        var address =
          arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "ws://localhost:8080"
        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$autoconnect = _ref.autoconnect,
          autoconnect = _ref$autoconnect === void 0 ? true : _ref$autoconnect,
          _ref$reconnect = _ref.reconnect,
          reconnect = _ref$reconnect === void 0 ? true : _ref$reconnect,
          _ref$reconnect_interv = _ref.reconnect_interval,
          reconnect_interval = _ref$reconnect_interv === void 0 ? 1e3 : _ref$reconnect_interv,
          _ref$max_reconnects = _ref.max_reconnects,
          max_reconnects = _ref$max_reconnects === void 0 ? 5 : _ref$max_reconnects
        var generate_request_id = arguments.length > 2 ? arguments[2] : undefined
        ;(0, _classCallCheck2["default"])(this, Client)
        return _super.call(
          this,
          _websocket["default"],
          address,
          {
            autoconnect: autoconnect,
            reconnect: reconnect,
            reconnect_interval: reconnect_interval,
            max_reconnects: max_reconnects,
          },
          generate_request_id
        )
      }
      return Client
    })(_client["default"])
    exports.Client = Client
  })
  unwrapExports(index_browser)
  var index_browser_1 = index_browser.Client
  var FeeCalculatorLayout = nu64("lamportsPerSignature")
  var NonceAccountLayout = struct([
    u32("version"),
    u32("state"),
    publicKey("authorizedPubkey"),
    publicKey("nonce"),
    struct([FeeCalculatorLayout], "feeCalculator"),
  ])
  var NONCE_ACCOUNT_LENGTH = NonceAccountLayout.span
  var NonceAccount = (function () {
    function NonceAccount() {
      classCallCheck(this, NonceAccount)
      defineProperty(this, "authorizedPubkey", void 0)
      defineProperty(this, "nonce", void 0)
      defineProperty(this, "feeCalculator", void 0)
    }
    createClass(NonceAccount, null, [
      {
        key: "fromAccountData",
        value: function fromAccountData(buffer) {
          var nonceAccount = NonceAccountLayout.decode(toBuffer(buffer), 0)
          nonceAccount.authorizedPubkey = new PublicKey(nonceAccount.authorizedPubkey)
          nonceAccount.nonce = new PublicKey(nonceAccount.nonce).toString()
          return nonceAccount
        },
      },
    ])
    return NonceAccount
  })()
  function sleep(ms) {
    return new Promise(function (resolve) {
      return setTimeout(resolve, ms)
    })
  }
  function _createForOfIteratorHelper$1(o, allowArrayLike) {
    var it
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (
        Array.isArray(o) ||
        (it = _unsupportedIterableToArray$3(o)) ||
        (allowArrayLike && o && typeof o.length === "number")
      ) {
        if (it) o = it
        var i = 0
        var F = function F() {}
        return {
          s: F,
          n: function n() {
            if (i >= o.length) return { done: true }
            return { done: false, value: o[i++] }
          },
          e: function e(_e) {
            throw _e
          },
          f: F,
        }
      }
      throw new TypeError(
        "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
      )
    }
    var normalCompletion = true,
      didErr = false,
      err
    return {
      s: function s() {
        it = o[Symbol.iterator]()
      },
      n: function n() {
        var step = it.next()
        normalCompletion = step.done
        return step
      },
      e: function e(_e2) {
        didErr = true
        err = _e2
      },
      f: function f() {
        try {
          if (!normalCompletion && it["return"] != null) it["return"]()
        } finally {
          if (didErr) throw err
        }
      },
    }
  }
  function _unsupportedIterableToArray$3(o, minLen) {
    if (!o) return
    if (typeof o === "string") return _arrayLikeToArray$3(o, minLen)
    var n = Object.prototype.toString.call(o).slice(8, -1)
    if (n === "Object" && o.constructor) n = o.constructor.name
    if (n === "Map" || n === "Set") return Array.from(o)
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray$3(o, minLen)
  }
  function _arrayLikeToArray$3(arr, len) {
    if (len == null || len > arr.length) len = arr.length
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i]
    }
    return arr2
  }
  function ownKeys$1(object, enumerableOnly) {
    var keys = Object.keys(object)
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object)
      if (enumerableOnly)
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable
        })
      keys.push.apply(keys, symbols)
    }
    return keys
  }
  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {}
      if (i % 2) {
        ownKeys$1(Object(source), true).forEach(function (key) {
          defineProperty(target, key, source[key])
        })
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
      } else {
        ownKeys$1(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key))
        })
      }
    }
    return target
  }
  var BLOCKHASH_CACHE_TIMEOUT_MS = 30 * 1e3
  function jsonRpcResultAndContext(resultDescription) {
    return jsonRpcResult({ context: struct$1({ slot: "number" }), value: resultDescription })
  }
  function jsonRpcResult(resultDescription) {
    var jsonRpcVersion = struct$1.literal("2.0")
    return struct$1.union([
      struct$1({ jsonrpc: jsonRpcVersion, id: "string", error: "any" }),
      struct$1({
        jsonrpc: jsonRpcVersion,
        id: "string",
        error: "null?",
        result: resultDescription,
      }),
    ])
  }
  function notificationResultAndContext(resultDescription) {
    return struct$1({ context: struct$1({ slot: "number" }), value: resultDescription })
  }
  var GetInflationGovernorResult = struct$1({
    foundation: "number",
    foundationTerm: "number",
    initial: "number",
    taper: "number",
    terminal: "number",
  })
  var GetEpochInfoResult = struct$1({
    epoch: "number",
    slotIndex: "number",
    slotsInEpoch: "number",
    absoluteSlot: "number",
    blockHeight: "number?",
  })
  var GetEpochScheduleResult = struct$1({
    slotsPerEpoch: "number",
    leaderScheduleSlotOffset: "number",
    warmup: "boolean",
    firstNormalEpoch: "number",
    firstNormalSlot: "number",
  })
  var GetLeaderScheduleResult = struct$1.record(["string", struct$1.array(["number"])])
  var TransactionErrorResult = struct$1.union(["null", "object"])
  var SignatureStatusResult = struct$1({ err: TransactionErrorResult })
  var Version = struct$1({ "solana-core": "string" })
  function createRpcRequest(url) {
    var server = browser$2(
      (function () {
        var _ref = asyncToGenerator(
          regenerator.mark(function _callee(request, callback) {
            var options, res, text
            return regenerator.wrap(
              function _callee$(_context) {
                while (1) {
                  switch ((_context.prev = _context.next)) {
                    case 0:
                      options = {
                        method: "POST",
                        body: request,
                        headers: { "Content-Type": "application/json" },
                      }
                      _context.prev = 1
                      _context.next = 4
                      return browser$1(url, options)
                    case 4:
                      res = _context.sent
                      _context.next = 7
                      return res.text()
                    case 7:
                      text = _context.sent
                      callback(null, text)
                      _context.next = 14
                      break
                    case 11:
                      _context.prev = 11
                      _context.t0 = _context["catch"](1)
                      callback(_context.t0)
                    case 14:
                    case "end":
                      return _context.stop()
                  }
                }
              },
              _callee,
              null,
              [[1, 11]]
            )
          })
        )
        return function (_x, _x2) {
          return _ref.apply(this, arguments)
        }
      })()
    )
    return function (method, args) {
      return new Promise(function (resolve, reject) {
        server.request(method, args, function (err, response) {
          if (err) {
            reject(err)
            return
          }
          resolve(response)
        })
      })
    }
  }
  var GetInflationGovernorRpcResult = struct$1({
    jsonrpc: struct$1.literal("2.0"),
    id: "string",
    error: "any?",
    result: GetInflationGovernorResult,
  })
  var GetEpochInfoRpcResult = struct$1({
    jsonrpc: struct$1.literal("2.0"),
    id: "string",
    error: "any?",
    result: GetEpochInfoResult,
  })
  var GetEpochScheduleRpcResult = struct$1({
    jsonrpc: struct$1.literal("2.0"),
    id: "string",
    error: "any?",
    result: GetEpochScheduleResult,
  })
  var GetLeaderScheduleRpcResult = jsonRpcResult(GetLeaderScheduleResult)
  var GetBalanceAndContextRpcResult = jsonRpcResultAndContext("number?")
  var GetBlockTimeRpcResult = struct$1({
    jsonrpc: struct$1.literal("2.0"),
    id: "string",
    error: "any?",
    result: struct$1.union(["null", "number"]),
  })
  var SlotRpcResult = struct$1({
    jsonrpc: struct$1.literal("2.0"),
    id: "string",
    error: "any?",
    result: "number",
  })
  var GetSupplyRpcResult = jsonRpcResultAndContext(
    struct$1({
      total: "number",
      circulating: "number",
      nonCirculating: "number",
      nonCirculatingAccounts: struct$1.array(["string"]),
    })
  )
  var TokenAccountResult = struct$1({
    token: struct$1({
      account: struct$1({
        mint: "string",
        owner: "string",
        amount: "number",
        delegate: struct$1.union(["string", "null"]),
        delegatedAmount: "number",
        isInitialized: "boolean",
        isNative: "boolean",
      }),
    }),
  })
  var GetTokenAccountBalance = jsonRpcResultAndContext("number")
  var GetTokenSupplyRpcResult = jsonRpcResultAndContext("number")
  var GetTokenAccountsByOwner = jsonRpcResultAndContext(
    struct$1.array([
      struct$1({
        pubkey: "string",
        account: struct$1({
          executable: "boolean",
          owner: "string",
          lamports: "number",
          data: TokenAccountResult,
          rentEpoch: "number?",
        }),
      }),
    ])
  )
  var GetLargestAccountsRpcResult = jsonRpcResultAndContext(
    struct$1.array([struct$1({ lamports: "number", address: "string" })])
  )
  var GetVersionRpcResult = struct$1({
    jsonrpc: struct$1.literal("2.0"),
    id: "string",
    error: "any?",
    result: Version,
  })
  var AccountInfoResult = struct$1({
    executable: "boolean",
    owner: "string",
    lamports: "number",
    data: "any",
    rentEpoch: "number?",
  })
  var GetAccountInfoAndContextRpcResult = jsonRpcResultAndContext(
    struct$1.union(["null", AccountInfoResult])
  )
  var GetConfirmedSignaturesForAddressRpcResult = jsonRpcResult(struct$1.array(["string"]))
  var AccountNotificationResult = struct$1({
    subscription: "number",
    result: notificationResultAndContext(AccountInfoResult),
  })
  var ProgramAccountInfoResult = struct$1({ pubkey: "string", account: AccountInfoResult })
  var ProgramAccountNotificationResult = struct$1({
    subscription: "number",
    result: notificationResultAndContext(ProgramAccountInfoResult),
  })
  var SlotInfoResult = struct$1({ parent: "number", slot: "number", root: "number" })
  var SlotNotificationResult = struct$1({ subscription: "number", result: SlotInfoResult })
  var SignatureNotificationResult = struct$1({
    subscription: "number",
    result: notificationResultAndContext(SignatureStatusResult),
  })
  var RootNotificationResult = struct$1({ subscription: "number", result: "number" })
  var GetProgramAccountsRpcResult = jsonRpcResult(struct$1.array([ProgramAccountInfoResult]))
  var GetSlot = jsonRpcResult("number")
  var GetSlotLeader = jsonRpcResult("string")
  var GetClusterNodes = jsonRpcResult(
    struct$1.array([
      struct$1.pick({
        pubkey: "string",
        gossip: struct$1.union(["null", "string"]),
        tpu: struct$1.union(["null", "string"]),
        rpc: struct$1.union(["null", "string"]),
        version: struct$1.union(["null", "string"]),
      }),
    ])
  )
  var GetVoteAccounts = jsonRpcResult(
    struct$1({
      current: struct$1.array([
        struct$1.pick({
          votePubkey: "string",
          nodePubkey: "string",
          activatedStake: "number",
          epochVoteAccount: "boolean",
          epochCredits: struct$1.array([struct$1.tuple(["number", "number", "number"])]),
          commission: "number",
          lastVote: "number",
          rootSlot: "number?",
        }),
      ]),
      delinquent: struct$1.array([
        struct$1.pick({
          votePubkey: "string",
          nodePubkey: "string",
          activatedStake: "number",
          epochVoteAccount: "boolean",
          epochCredits: struct$1.array([struct$1.tuple(["number", "number", "number"])]),
          commission: "number",
          lastVote: "number",
          rootSlot: "number?",
        }),
      ]),
    })
  )
  var GetSignatureStatusesRpcResult = jsonRpcResultAndContext(
    struct$1.array([
      struct$1.union([
        "null",
        struct$1.pick({
          slot: "number",
          confirmations: struct$1.union(["number", "null"]),
          err: TransactionErrorResult,
        }),
      ]),
    ])
  )
  var GetTransactionCountRpcResult = jsonRpcResult("number")
  var GetTotalSupplyRpcResult = jsonRpcResult("number")
  var GetMinimumBalanceForRentExemptionRpcResult = jsonRpcResult("number")
  var ConfirmedTransactionResult = struct$1({
    signatures: struct$1.array(["string"]),
    message: struct$1({
      accountKeys: struct$1.array(["string"]),
      header: struct$1({
        numRequiredSignatures: "number",
        numReadonlySignedAccounts: "number",
        numReadonlyUnsignedAccounts: "number",
      }),
      instructions: struct$1.array([
        struct$1.union([
          struct$1.array(["number"]),
          struct$1({
            accounts: struct$1.array(["number"]),
            data: "string",
            programIdIndex: "number",
          }),
        ]),
      ]),
      recentBlockhash: "string",
    }),
  })
  var ConfirmedTransactionMetaResult = struct$1.union([
    "null",
    struct$1.pick({
      err: TransactionErrorResult,
      fee: "number",
      preBalances: struct$1.array(["number"]),
      postBalances: struct$1.array(["number"]),
    }),
  ])
  var GetConfirmedBlockRpcResult = jsonRpcResult(
    struct$1.union([
      "null",
      struct$1.pick({
        blockhash: "string",
        previousBlockhash: "string",
        parentSlot: "number",
        transactions: struct$1.array([
          struct$1({
            transaction: ConfirmedTransactionResult,
            meta: ConfirmedTransactionMetaResult,
          }),
        ]),
        rewards: struct$1.union([
          "undefined",
          struct$1.array([struct$1({ pubkey: "string", lamports: "number" })]),
        ]),
      }),
    ])
  )
  var GetConfirmedTransactionRpcResult = jsonRpcResult(
    struct$1.union([
      "null",
      struct$1.pick({
        slot: "number",
        transaction: ConfirmedTransactionResult,
        meta: ConfirmedTransactionMetaResult,
      }),
    ])
  )
  var GetRecentBlockhashAndContextRpcResult = jsonRpcResultAndContext(
    struct$1({ blockhash: "string", feeCalculator: struct$1({ lamportsPerSignature: "number" }) })
  )
  var GetFeeCalculatorRpcResult = jsonRpcResultAndContext(
    struct$1.union([
      "null",
      struct$1({ feeCalculator: struct$1({ lamportsPerSignature: "number" }) }),
    ])
  )
  var RequestAirdropRpcResult = jsonRpcResult("string")
  var SendTransactionRpcResult = jsonRpcResult("string")
  var Connection = (function () {
    function Connection(endpoint, commitment) {
      classCallCheck(this, Connection)
      defineProperty(this, "_rpcRequest", void 0)
      defineProperty(this, "_rpcWebSocket", void 0)
      defineProperty(this, "_rpcWebSocketConnected", false)
      defineProperty(this, "_commitment", void 0)
      defineProperty(this, "_blockhashInfo", void 0)
      defineProperty(this, "_disableBlockhashCaching", false)
      defineProperty(this, "_accountChangeSubscriptions", {})
      defineProperty(this, "_accountChangeSubscriptionCounter", 0)
      defineProperty(this, "_programAccountChangeSubscriptions", {})
      defineProperty(this, "_programAccountChangeSubscriptionCounter", 0)
      defineProperty(this, "_slotSubscriptions", {})
      defineProperty(this, "_slotSubscriptionCounter", 0)
      defineProperty(this, "_signatureSubscriptions", {})
      defineProperty(this, "_signatureSubscriptionCounter", 0)
      defineProperty(this, "_rootSubscriptions", {})
      defineProperty(this, "_rootSubscriptionCounter", 0)
      var url = urlParse(endpoint)
      this._rpcRequest = createRpcRequest(url.href)
      this._commitment = commitment
      this._blockhashInfo = {
        recentBlockhash: null,
        lastFetch: new Date(0),
        transactionSignatures: [],
      }
      url.protocol = url.protocol === "https:" ? "wss:" : "ws:"
      url.host = ""
      if (url.port !== null) {
        url.port = String(Number(url.port) + 1)
      }
      this._rpcWebSocket = new index_browser_1(urlFormat(url), {
        autoconnect: false,
        max_reconnects: Infinity,
      })
      this._rpcWebSocket.on("open", this._wsOnOpen.bind(this))
      this._rpcWebSocket.on("error", this._wsOnError.bind(this))
      this._rpcWebSocket.on("close", this._wsOnClose.bind(this))
      this._rpcWebSocket.on("accountNotification", this._wsOnAccountNotification.bind(this))
      this._rpcWebSocket.on("programNotification", this._wsOnProgramAccountNotification.bind(this))
      this._rpcWebSocket.on("slotNotification", this._wsOnSlotNotification.bind(this))
      this._rpcWebSocket.on("signatureNotification", this._wsOnSignatureNotification.bind(this))
      this._rpcWebSocket.on("rootNotification", this._wsOnRootNotification.bind(this))
    }
    createClass(Connection, [
      {
        key: "getBalanceAndContext",
        value: (function () {
          var _getBalanceAndContext = asyncToGenerator(
            regenerator.mark(function _callee2(publicKey, commitment) {
              var args, unsafeRes, res
              return regenerator.wrap(
                function _callee2$(_context2) {
                  while (1) {
                    switch ((_context2.prev = _context2.next)) {
                      case 0:
                        args = this._argsWithCommitment([publicKey.toBase58()], commitment)
                        _context2.next = 3
                        return this._rpcRequest("getBalance", args)
                      case 3:
                        unsafeRes = _context2.sent
                        res = GetBalanceAndContextRpcResult(unsafeRes)
                        if (!res.error) {
                          _context2.next = 7
                          break
                        }
                        throw new Error(
                          "failed to get balance for " +
                            publicKey.toBase58() +
                            ": " +
                            res.error.message
                        )
                      case 7:
                        assert(typeof res.result !== "undefined")
                        return _context2.abrupt("return", res.result)
                      case 9:
                      case "end":
                        return _context2.stop()
                    }
                  }
                },
                _callee2,
                this
              )
            })
          )
          function getBalanceAndContext(_x3, _x4) {
            return _getBalanceAndContext.apply(this, arguments)
          }
          return getBalanceAndContext
        })(),
      },
      {
        key: "getBalance",
        value: (function () {
          var _getBalance = asyncToGenerator(
            regenerator.mark(function _callee3(publicKey, commitment) {
              return regenerator.wrap(
                function _callee3$(_context3) {
                  while (1) {
                    switch ((_context3.prev = _context3.next)) {
                      case 0:
                        _context3.next = 2
                        return this.getBalanceAndContext(publicKey, commitment)
                          .then(function (x) {
                            return x.value
                          })
                          ["catch"](function (e) {
                            throw new Error(
                              "failed to get balance of account " + publicKey.toBase58() + ": " + e
                            )
                          })
                      case 2:
                        return _context3.abrupt("return", _context3.sent)
                      case 3:
                      case "end":
                        return _context3.stop()
                    }
                  }
                },
                _callee3,
                this
              )
            })
          )
          function getBalance(_x5, _x6) {
            return _getBalance.apply(this, arguments)
          }
          return getBalance
        })(),
      },
      {
        key: "getBlockTime",
        value: (function () {
          var _getBlockTime = asyncToGenerator(
            regenerator.mark(function _callee4(slot) {
              var unsafeRes, res
              return regenerator.wrap(
                function _callee4$(_context4) {
                  while (1) {
                    switch ((_context4.prev = _context4.next)) {
                      case 0:
                        _context4.next = 2
                        return this._rpcRequest("getBlockTime", [slot])
                      case 2:
                        unsafeRes = _context4.sent
                        res = GetBlockTimeRpcResult(unsafeRes)
                        if (!res.error) {
                          _context4.next = 6
                          break
                        }
                        throw new Error(
                          "failed to get block time for slot " + slot + ": " + res.error.message
                        )
                      case 6:
                        assert(typeof res.result !== "undefined")
                        return _context4.abrupt("return", res.result)
                      case 8:
                      case "end":
                        return _context4.stop()
                    }
                  }
                },
                _callee4,
                this
              )
            })
          )
          function getBlockTime(_x7) {
            return _getBlockTime.apply(this, arguments)
          }
          return getBlockTime
        })(),
      },
      {
        key: "getMinimumLedgerSlot",
        value: (function () {
          var _getMinimumLedgerSlot = asyncToGenerator(
            regenerator.mark(function _callee5() {
              var unsafeRes, res
              return regenerator.wrap(
                function _callee5$(_context5) {
                  while (1) {
                    switch ((_context5.prev = _context5.next)) {
                      case 0:
                        _context5.next = 2
                        return this._rpcRequest("minimumLedgerSlot", [])
                      case 2:
                        unsafeRes = _context5.sent
                        res = SlotRpcResult(unsafeRes)
                        if (!res.error) {
                          _context5.next = 6
                          break
                        }
                        throw new Error("failed to get minimum ledger slot: " + res.error.message)
                      case 6:
                        assert(typeof res.result !== "undefined")
                        return _context5.abrupt("return", res.result)
                      case 8:
                      case "end":
                        return _context5.stop()
                    }
                  }
                },
                _callee5,
                this
              )
            })
          )
          function getMinimumLedgerSlot() {
            return _getMinimumLedgerSlot.apply(this, arguments)
          }
          return getMinimumLedgerSlot
        })(),
      },
      {
        key: "getFirstAvailableBlock",
        value: (function () {
          var _getFirstAvailableBlock = asyncToGenerator(
            regenerator.mark(function _callee6() {
              var unsafeRes, res
              return regenerator.wrap(
                function _callee6$(_context6) {
                  while (1) {
                    switch ((_context6.prev = _context6.next)) {
                      case 0:
                        _context6.next = 2
                        return this._rpcRequest("getFirstAvailableBlock", [])
                      case 2:
                        unsafeRes = _context6.sent
                        res = SlotRpcResult(unsafeRes)
                        if (!res.error) {
                          _context6.next = 6
                          break
                        }
                        throw new Error("failed to get first available block: " + res.error.message)
                      case 6:
                        assert(typeof res.result !== "undefined")
                        return _context6.abrupt("return", res.result)
                      case 8:
                      case "end":
                        return _context6.stop()
                    }
                  }
                },
                _callee6,
                this
              )
            })
          )
          function getFirstAvailableBlock() {
            return _getFirstAvailableBlock.apply(this, arguments)
          }
          return getFirstAvailableBlock
        })(),
      },
      {
        key: "getSupply",
        value: (function () {
          var _getSupply = asyncToGenerator(
            regenerator.mark(function _callee7(commitment) {
              var args, unsafeRes, res
              return regenerator.wrap(
                function _callee7$(_context7) {
                  while (1) {
                    switch ((_context7.prev = _context7.next)) {
                      case 0:
                        args = this._argsWithCommitment([], commitment)
                        _context7.next = 3
                        return this._rpcRequest("getSupply", args)
                      case 3:
                        unsafeRes = _context7.sent
                        res = GetSupplyRpcResult(unsafeRes)
                        if (!res.error) {
                          _context7.next = 7
                          break
                        }
                        throw new Error("failed to get supply: " + res.error.message)
                      case 7:
                        assert(typeof res.result !== "undefined")
                        res.result.value.nonCirculatingAccounts = res.result.value.nonCirculatingAccounts.map(
                          function (account) {
                            return new PublicKey(account)
                          }
                        )
                        return _context7.abrupt("return", res.result)
                      case 10:
                      case "end":
                        return _context7.stop()
                    }
                  }
                },
                _callee7,
                this
              )
            })
          )
          function getSupply(_x8) {
            return _getSupply.apply(this, arguments)
          }
          return getSupply
        })(),
      },
      {
        key: "getTokenSupply",
        value: (function () {
          var _getTokenSupply = asyncToGenerator(
            regenerator.mark(function _callee8(tokenMintAddress, commitment) {
              var args, unsafeRes, res
              return regenerator.wrap(
                function _callee8$(_context8) {
                  while (1) {
                    switch ((_context8.prev = _context8.next)) {
                      case 0:
                        args = this._argsWithCommitment([tokenMintAddress.toBase58()], commitment)
                        _context8.next = 3
                        return this._rpcRequest("getTokenSupply", args)
                      case 3:
                        unsafeRes = _context8.sent
                        res = GetTokenSupplyRpcResult(unsafeRes)
                        if (!res.error) {
                          _context8.next = 7
                          break
                        }
                        throw new Error("failed to get token supply: " + res.error.message)
                      case 7:
                        assert(typeof res.result !== "undefined")
                        return _context8.abrupt("return", res.result)
                      case 9:
                      case "end":
                        return _context8.stop()
                    }
                  }
                },
                _callee8,
                this
              )
            })
          )
          function getTokenSupply(_x9, _x10) {
            return _getTokenSupply.apply(this, arguments)
          }
          return getTokenSupply
        })(),
      },
      {
        key: "getTokenAccountBalance",
        value: (function () {
          var _getTokenAccountBalance = asyncToGenerator(
            regenerator.mark(function _callee9(tokenAddress, commitment) {
              var args, unsafeRes, res
              return regenerator.wrap(
                function _callee9$(_context9) {
                  while (1) {
                    switch ((_context9.prev = _context9.next)) {
                      case 0:
                        args = this._argsWithCommitment([tokenAddress.toBase58()], commitment)
                        _context9.next = 3
                        return this._rpcRequest("getTokenAccountBalance", args)
                      case 3:
                        unsafeRes = _context9.sent
                        res = GetTokenAccountBalance(unsafeRes)
                        if (!res.error) {
                          _context9.next = 7
                          break
                        }
                        throw new Error("failed to get token account balance: " + res.error.message)
                      case 7:
                        assert(typeof res.result !== "undefined")
                        return _context9.abrupt("return", res.result)
                      case 9:
                      case "end":
                        return _context9.stop()
                    }
                  }
                },
                _callee9,
                this
              )
            })
          )
          function getTokenAccountBalance(_x11, _x12) {
            return _getTokenAccountBalance.apply(this, arguments)
          }
          return getTokenAccountBalance
        })(),
      },
      {
        key: "getTokenAccountsByOwner",
        value: (function () {
          var _getTokenAccountsByOwner = asyncToGenerator(
            regenerator.mark(function _callee10(ownerAddress, filter, commitment) {
              var _args, args, unsafeRes, res, result, context, value
              return regenerator.wrap(
                function _callee10$(_context10) {
                  while (1) {
                    switch ((_context10.prev = _context10.next)) {
                      case 0:
                        _args = [ownerAddress.toBase58()]
                        ;(function (filter) {
                          if ("mint" in filter) {
                            _args.push({ mint: filter.mint.toBase58() })
                          } else {
                            _args.push({ programId: filter.programId.toBase58() })
                          }
                        })(filter)
                        args = this._argsWithCommitment(_args, commitment)
                        _context10.next = 5
                        return this._rpcRequest("getTokenAccountsByOwner", args)
                      case 5:
                        unsafeRes = _context10.sent
                        res = GetTokenAccountsByOwner(unsafeRes)
                        if (!res.error) {
                          _context10.next = 9
                          break
                        }
                        throw new Error(
                          "failed to get token accounts owned by account " +
                            ownerAddress.toBase58() +
                            ": " +
                            res.error.message
                        )
                      case 9:
                        result = res.result
                        ;(context = result.context), (value = result.value)
                        assert(typeof result !== "undefined")
                        return _context10.abrupt("return", {
                          context: context,
                          value: value.map(function (result) {
                            var data = result.account.data.token.account
                            return {
                              pubkey: new PublicKey(result.pubkey),
                              account: {
                                executable: result.account.executable,
                                owner: new PublicKey(result.account.owner),
                                lamports: result.account.lamports,
                                data: _objectSpread(
                                  _objectSpread({}, data),
                                  {},
                                  {
                                    mint: new PublicKey(data.mint),
                                    owner: new PublicKey(data.owner),
                                    delegate: data.delegate ? new PublicKey(data.delegate) : null,
                                  }
                                ),
                              },
                            }
                          }),
                        })
                      case 13:
                      case "end":
                        return _context10.stop()
                    }
                  }
                },
                _callee10,
                this
              )
            })
          )
          function getTokenAccountsByOwner(_x13, _x14, _x15) {
            return _getTokenAccountsByOwner.apply(this, arguments)
          }
          return getTokenAccountsByOwner
        })(),
      },
      {
        key: "getLargestAccounts",
        value: (function () {
          var _getLargestAccounts = asyncToGenerator(
            regenerator.mark(function _callee11(config) {
              var arg, args, unsafeRes, res
              return regenerator.wrap(
                function _callee11$(_context11) {
                  while (1) {
                    switch ((_context11.prev = _context11.next)) {
                      case 0:
                        arg = _objectSpread(
                          _objectSpread({}, config),
                          {},
                          { commitment: (config && config.commitment) || this.commitment }
                        )
                        args = arg.filter || arg.commitment ? [arg] : []
                        _context11.next = 4
                        return this._rpcRequest("getLargestAccounts", args)
                      case 4:
                        unsafeRes = _context11.sent
                        res = GetLargestAccountsRpcResult(unsafeRes)
                        if (!res.error) {
                          _context11.next = 8
                          break
                        }
                        throw new Error("failed to get largest accounts: " + res.error.message)
                      case 8:
                        assert(typeof res.result !== "undefined")
                        res.result.value = res.result.value.map(function (_ref2) {
                          var address = _ref2.address,
                            lamports = _ref2.lamports
                          return { address: new PublicKey(address), lamports: lamports }
                        })
                        return _context11.abrupt("return", res.result)
                      case 11:
                      case "end":
                        return _context11.stop()
                    }
                  }
                },
                _callee11,
                this
              )
            })
          )
          function getLargestAccounts(_x16) {
            return _getLargestAccounts.apply(this, arguments)
          }
          return getLargestAccounts
        })(),
      },
      {
        key: "getAccountInfoAndContext",
        value: (function () {
          var _getAccountInfoAndContext = asyncToGenerator(
            regenerator.mark(function _callee12(publicKey, commitment) {
              var args, unsafeRes, res, value, _res$result$value, executable, owner, lamports, data
              return regenerator.wrap(
                function _callee12$(_context12) {
                  while (1) {
                    switch ((_context12.prev = _context12.next)) {
                      case 0:
                        args = this._argsWithCommitment([publicKey.toBase58()], commitment)
                        _context12.next = 3
                        return this._rpcRequest("getAccountInfo", args)
                      case 3:
                        unsafeRes = _context12.sent
                        res = GetAccountInfoAndContextRpcResult(unsafeRes)
                        if (!res.error) {
                          _context12.next = 7
                          break
                        }
                        throw new Error(
                          "failed to get info about account " +
                            publicKey.toBase58() +
                            ": " +
                            res.error.message
                        )
                      case 7:
                        assert(typeof res.result !== "undefined")
                        value = null
                        if (res.result.value) {
                          ;(_res$result$value = res.result.value),
                            (executable = _res$result$value.executable),
                            (owner = _res$result$value.owner),
                            (lamports = _res$result$value.lamports),
                            (data = _res$result$value.data)
                          value = {
                            executable: executable,
                            owner: new PublicKey(owner),
                            lamports: lamports,
                            data: bs58.decode(data),
                          }
                        }
                        return _context12.abrupt("return", {
                          context: { slot: res.result.context.slot },
                          value: value,
                        })
                      case 11:
                      case "end":
                        return _context12.stop()
                    }
                  }
                },
                _callee12,
                this
              )
            })
          )
          function getAccountInfoAndContext(_x17, _x18) {
            return _getAccountInfoAndContext.apply(this, arguments)
          }
          return getAccountInfoAndContext
        })(),
      },
      {
        key: "getAccountInfo",
        value: (function () {
          var _getAccountInfo = asyncToGenerator(
            regenerator.mark(function _callee13(publicKey, commitment) {
              return regenerator.wrap(
                function _callee13$(_context13) {
                  while (1) {
                    switch ((_context13.prev = _context13.next)) {
                      case 0:
                        _context13.next = 2
                        return this.getAccountInfoAndContext(publicKey, commitment)
                          .then(function (x) {
                            return x.value
                          })
                          ["catch"](function (e) {
                            throw new Error(
                              "failed to get info about account " + publicKey.toBase58() + ": " + e
                            )
                          })
                      case 2:
                        return _context13.abrupt("return", _context13.sent)
                      case 3:
                      case "end":
                        return _context13.stop()
                    }
                  }
                },
                _callee13,
                this
              )
            })
          )
          function getAccountInfo(_x19, _x20) {
            return _getAccountInfo.apply(this, arguments)
          }
          return getAccountInfo
        })(),
      },
      {
        key: "getProgramAccounts",
        value: (function () {
          var _getProgramAccounts = asyncToGenerator(
            regenerator.mark(function _callee14(programId, commitment) {
              var args, unsafeRes, res, result
              return regenerator.wrap(
                function _callee14$(_context14) {
                  while (1) {
                    switch ((_context14.prev = _context14.next)) {
                      case 0:
                        args = this._argsWithCommitment([programId.toBase58()], commitment)
                        _context14.next = 3
                        return this._rpcRequest("getProgramAccounts", args)
                      case 3:
                        unsafeRes = _context14.sent
                        res = GetProgramAccountsRpcResult(unsafeRes)
                        if (!res.error) {
                          _context14.next = 7
                          break
                        }
                        throw new Error(
                          "failed to get accounts owned by program " +
                            programId.toBase58() +
                            ": " +
                            res.error.message
                        )
                      case 7:
                        result = res.result
                        assert(typeof result !== "undefined")
                        return _context14.abrupt(
                          "return",
                          result.map(function (result) {
                            return {
                              pubkey: result.pubkey,
                              account: {
                                executable: result.account.executable,
                                owner: new PublicKey(result.account.owner),
                                lamports: result.account.lamports,
                                data: bs58.decode(result.account.data),
                              },
                            }
                          })
                        )
                      case 10:
                      case "end":
                        return _context14.stop()
                    }
                  }
                },
                _callee14,
                this
              )
            })
          )
          function getProgramAccounts(_x21, _x22) {
            return _getProgramAccounts.apply(this, arguments)
          }
          return getProgramAccounts
        })(),
      },
      {
        key: "confirmTransaction",
        value: (function () {
          var _confirmTransaction = asyncToGenerator(
            regenerator.mark(function _callee15(signature, confirmations) {
              var start, WAIT_TIMEOUT_MS, statusResponse, status
              return regenerator.wrap(
                function _callee15$(_context15) {
                  while (1) {
                    switch ((_context15.prev = _context15.next)) {
                      case 0:
                        start = Date.now()
                        WAIT_TIMEOUT_MS = 60 * 1e3
                        _context15.next = 4
                        return this.getSignatureStatus(signature)
                      case 4:
                        statusResponse = _context15.sent
                      case 5:
                        status = statusResponse.value
                        if (!status) {
                          _context15.next = 11
                          break
                        }
                        if (
                          !(
                            status.err ||
                            status.confirmations === null ||
                            (typeof confirmations === "number" &&
                              status.confirmations >= confirmations)
                          )
                        ) {
                          _context15.next = 9
                          break
                        }
                        return _context15.abrupt("break", 20)
                      case 9:
                        _context15.next = 13
                        break
                      case 11:
                        if (!(Date.now() - start >= WAIT_TIMEOUT_MS)) {
                          _context15.next = 13
                          break
                        }
                        return _context15.abrupt("break", 20)
                      case 13:
                        _context15.next = 15
                        return sleep(MS_PER_SLOT)
                      case 15:
                        _context15.next = 17
                        return this.getSignatureStatus(signature)
                      case 17:
                        statusResponse = _context15.sent
                      case 18:
                        _context15.next = 5
                        break
                      case 20:
                        return _context15.abrupt("return", statusResponse)
                      case 21:
                      case "end":
                        return _context15.stop()
                    }
                  }
                },
                _callee15,
                this
              )
            })
          )
          function confirmTransaction(_x23, _x24) {
            return _confirmTransaction.apply(this, arguments)
          }
          return confirmTransaction
        })(),
      },
      {
        key: "getClusterNodes",
        value: (function () {
          var _getClusterNodes = asyncToGenerator(
            regenerator.mark(function _callee16() {
              var unsafeRes, res
              return regenerator.wrap(
                function _callee16$(_context16) {
                  while (1) {
                    switch ((_context16.prev = _context16.next)) {
                      case 0:
                        _context16.next = 2
                        return this._rpcRequest("getClusterNodes", [])
                      case 2:
                        unsafeRes = _context16.sent
                        res = GetClusterNodes(unsafeRes)
                        if (!res.error) {
                          _context16.next = 6
                          break
                        }
                        throw new Error("failed to get cluster nodes: " + res.error.message)
                      case 6:
                        assert(typeof res.result !== "undefined")
                        return _context16.abrupt("return", res.result)
                      case 8:
                      case "end":
                        return _context16.stop()
                    }
                  }
                },
                _callee16,
                this
              )
            })
          )
          function getClusterNodes() {
            return _getClusterNodes.apply(this, arguments)
          }
          return getClusterNodes
        })(),
      },
      {
        key: "getVoteAccounts",
        value: (function () {
          var _getVoteAccounts = asyncToGenerator(
            regenerator.mark(function _callee17(commitment) {
              var args, unsafeRes, res
              return regenerator.wrap(
                function _callee17$(_context17) {
                  while (1) {
                    switch ((_context17.prev = _context17.next)) {
                      case 0:
                        args = this._argsWithCommitment([], commitment)
                        _context17.next = 3
                        return this._rpcRequest("getVoteAccounts", args)
                      case 3:
                        unsafeRes = _context17.sent
                        res = GetVoteAccounts(unsafeRes)
                        if (!res.error) {
                          _context17.next = 7
                          break
                        }
                        throw new Error("failed to get vote accounts: " + res.error.message)
                      case 7:
                        assert(typeof res.result !== "undefined")
                        return _context17.abrupt("return", res.result)
                      case 9:
                      case "end":
                        return _context17.stop()
                    }
                  }
                },
                _callee17,
                this
              )
            })
          )
          function getVoteAccounts(_x25) {
            return _getVoteAccounts.apply(this, arguments)
          }
          return getVoteAccounts
        })(),
      },
      {
        key: "getSlot",
        value: (function () {
          var _getSlot = asyncToGenerator(
            regenerator.mark(function _callee18(commitment) {
              var args, unsafeRes, res
              return regenerator.wrap(
                function _callee18$(_context18) {
                  while (1) {
                    switch ((_context18.prev = _context18.next)) {
                      case 0:
                        args = this._argsWithCommitment([], commitment)
                        _context18.next = 3
                        return this._rpcRequest("getSlot", args)
                      case 3:
                        unsafeRes = _context18.sent
                        res = GetSlot(unsafeRes)
                        if (!res.error) {
                          _context18.next = 7
                          break
                        }
                        throw new Error("failed to get slot: " + res.error.message)
                      case 7:
                        assert(typeof res.result !== "undefined")
                        return _context18.abrupt("return", res.result)
                      case 9:
                      case "end":
                        return _context18.stop()
                    }
                  }
                },
                _callee18,
                this
              )
            })
          )
          function getSlot(_x26) {
            return _getSlot.apply(this, arguments)
          }
          return getSlot
        })(),
      },
      {
        key: "getSlotLeader",
        value: (function () {
          var _getSlotLeader = asyncToGenerator(
            regenerator.mark(function _callee19(commitment) {
              var args, unsafeRes, res
              return regenerator.wrap(
                function _callee19$(_context19) {
                  while (1) {
                    switch ((_context19.prev = _context19.next)) {
                      case 0:
                        args = this._argsWithCommitment([], commitment)
                        _context19.next = 3
                        return this._rpcRequest("getSlotLeader", args)
                      case 3:
                        unsafeRes = _context19.sent
                        res = GetSlotLeader(unsafeRes)
                        if (!res.error) {
                          _context19.next = 7
                          break
                        }
                        throw new Error("failed to get slot leader: " + res.error.message)
                      case 7:
                        assert(typeof res.result !== "undefined")
                        return _context19.abrupt("return", res.result)
                      case 9:
                      case "end":
                        return _context19.stop()
                    }
                  }
                },
                _callee19,
                this
              )
            })
          )
          function getSlotLeader(_x27) {
            return _getSlotLeader.apply(this, arguments)
          }
          return getSlotLeader
        })(),
      },
      {
        key: "getSignatureStatus",
        value: (function () {
          var _getSignatureStatus = asyncToGenerator(
            regenerator.mark(function _callee20(signature, config) {
              var _yield$this$getSignat, context, value
              return regenerator.wrap(
                function _callee20$(_context20) {
                  while (1) {
                    switch ((_context20.prev = _context20.next)) {
                      case 0:
                        _context20.next = 2
                        return this.getSignatureStatuses([signature], config)
                      case 2:
                        _yield$this$getSignat = _context20.sent
                        context = _yield$this$getSignat.context
                        value = _yield$this$getSignat.value
                        assert(value.length === 1)
                        return _context20.abrupt("return", { context: context, value: value[0] })
                      case 7:
                      case "end":
                        return _context20.stop()
                    }
                  }
                },
                _callee20,
                this
              )
            })
          )
          function getSignatureStatus(_x28, _x29) {
            return _getSignatureStatus.apply(this, arguments)
          }
          return getSignatureStatus
        })(),
      },
      {
        key: "getSignatureStatuses",
        value: (function () {
          var _getSignatureStatuses = asyncToGenerator(
            regenerator.mark(function _callee21(signatures, config) {
              var params, unsafeRes, res
              return regenerator.wrap(
                function _callee21$(_context21) {
                  while (1) {
                    switch ((_context21.prev = _context21.next)) {
                      case 0:
                        params = [signatures]
                        if (config) {
                          params.push(config)
                        }
                        _context21.next = 4
                        return this._rpcRequest("getSignatureStatuses", params)
                      case 4:
                        unsafeRes = _context21.sent
                        res = GetSignatureStatusesRpcResult(unsafeRes)
                        if (!res.error) {
                          _context21.next = 8
                          break
                        }
                        throw new Error("failed to get signature status: " + res.error.message)
                      case 8:
                        assert(typeof res.result !== "undefined")
                        return _context21.abrupt("return", res.result)
                      case 10:
                      case "end":
                        return _context21.stop()
                    }
                  }
                },
                _callee21,
                this
              )
            })
          )
          function getSignatureStatuses(_x30, _x31) {
            return _getSignatureStatuses.apply(this, arguments)
          }
          return getSignatureStatuses
        })(),
      },
      {
        key: "getTransactionCount",
        value: (function () {
          var _getTransactionCount = asyncToGenerator(
            regenerator.mark(function _callee22(commitment) {
              var args, unsafeRes, res
              return regenerator.wrap(
                function _callee22$(_context22) {
                  while (1) {
                    switch ((_context22.prev = _context22.next)) {
                      case 0:
                        args = this._argsWithCommitment([], commitment)
                        _context22.next = 3
                        return this._rpcRequest("getTransactionCount", args)
                      case 3:
                        unsafeRes = _context22.sent
                        res = GetTransactionCountRpcResult(unsafeRes)
                        if (!res.error) {
                          _context22.next = 7
                          break
                        }
                        throw new Error("failed to get transaction count: " + res.error.message)
                      case 7:
                        assert(typeof res.result !== "undefined")
                        return _context22.abrupt("return", Number(res.result))
                      case 9:
                      case "end":
                        return _context22.stop()
                    }
                  }
                },
                _callee22,
                this
              )
            })
          )
          function getTransactionCount(_x32) {
            return _getTransactionCount.apply(this, arguments)
          }
          return getTransactionCount
        })(),
      },
      {
        key: "getTotalSupply",
        value: (function () {
          var _getTotalSupply = asyncToGenerator(
            regenerator.mark(function _callee23(commitment) {
              var args, unsafeRes, res
              return regenerator.wrap(
                function _callee23$(_context23) {
                  while (1) {
                    switch ((_context23.prev = _context23.next)) {
                      case 0:
                        args = this._argsWithCommitment([], commitment)
                        _context23.next = 3
                        return this._rpcRequest("getTotalSupply", args)
                      case 3:
                        unsafeRes = _context23.sent
                        res = GetTotalSupplyRpcResult(unsafeRes)
                        if (!res.error) {
                          _context23.next = 7
                          break
                        }
                        throw new Error("faied to get total supply: " + res.error.message)
                      case 7:
                        assert(typeof res.result !== "undefined")
                        return _context23.abrupt("return", Number(res.result))
                      case 9:
                      case "end":
                        return _context23.stop()
                    }
                  }
                },
                _callee23,
                this
              )
            })
          )
          function getTotalSupply(_x33) {
            return _getTotalSupply.apply(this, arguments)
          }
          return getTotalSupply
        })(),
      },
      {
        key: "getInflationGovernor",
        value: (function () {
          var _getInflationGovernor = asyncToGenerator(
            regenerator.mark(function _callee24(commitment) {
              var args, unsafeRes, res
              return regenerator.wrap(
                function _callee24$(_context24) {
                  while (1) {
                    switch ((_context24.prev = _context24.next)) {
                      case 0:
                        args = this._argsWithCommitment([], commitment)
                        _context24.next = 3
                        return this._rpcRequest("getInflationGovernor", args)
                      case 3:
                        unsafeRes = _context24.sent
                        res = GetInflationGovernorRpcResult(unsafeRes)
                        if (!res.error) {
                          _context24.next = 7
                          break
                        }
                        throw new Error("failed to get inflation: " + res.error.message)
                      case 7:
                        assert(typeof res.result !== "undefined")
                        return _context24.abrupt("return", GetInflationGovernorResult(res.result))
                      case 9:
                      case "end":
                        return _context24.stop()
                    }
                  }
                },
                _callee24,
                this
              )
            })
          )
          function getInflationGovernor(_x34) {
            return _getInflationGovernor.apply(this, arguments)
          }
          return getInflationGovernor
        })(),
      },
      {
        key: "getEpochInfo",
        value: (function () {
          var _getEpochInfo = asyncToGenerator(
            regenerator.mark(function _callee25(commitment) {
              var args, unsafeRes, res
              return regenerator.wrap(
                function _callee25$(_context25) {
                  while (1) {
                    switch ((_context25.prev = _context25.next)) {
                      case 0:
                        args = this._argsWithCommitment([], commitment)
                        _context25.next = 3
                        return this._rpcRequest("getEpochInfo", args)
                      case 3:
                        unsafeRes = _context25.sent
                        res = GetEpochInfoRpcResult(unsafeRes)
                        if (!res.error) {
                          _context25.next = 7
                          break
                        }
                        throw new Error("failed to get epoch info: " + res.error.message)
                      case 7:
                        assert(typeof res.result !== "undefined")
                        return _context25.abrupt("return", GetEpochInfoResult(res.result))
                      case 9:
                      case "end":
                        return _context25.stop()
                    }
                  }
                },
                _callee25,
                this
              )
            })
          )
          function getEpochInfo(_x35) {
            return _getEpochInfo.apply(this, arguments)
          }
          return getEpochInfo
        })(),
      },
      {
        key: "getEpochSchedule",
        value: (function () {
          var _getEpochSchedule = asyncToGenerator(
            regenerator.mark(function _callee26() {
              var unsafeRes, res
              return regenerator.wrap(
                function _callee26$(_context26) {
                  while (1) {
                    switch ((_context26.prev = _context26.next)) {
                      case 0:
                        _context26.next = 2
                        return this._rpcRequest("getEpochSchedule", [])
                      case 2:
                        unsafeRes = _context26.sent
                        res = GetEpochScheduleRpcResult(unsafeRes)
                        if (!res.error) {
                          _context26.next = 6
                          break
                        }
                        throw new Error("failed to get epoch schedule: " + res.error.message)
                      case 6:
                        assert(typeof res.result !== "undefined")
                        return _context26.abrupt("return", GetEpochScheduleResult(res.result))
                      case 8:
                      case "end":
                        return _context26.stop()
                    }
                  }
                },
                _callee26,
                this
              )
            })
          )
          function getEpochSchedule() {
            return _getEpochSchedule.apply(this, arguments)
          }
          return getEpochSchedule
        })(),
      },
      {
        key: "getLeaderSchedule",
        value: (function () {
          var _getLeaderSchedule = asyncToGenerator(
            regenerator.mark(function _callee27() {
              var unsafeRes, res
              return regenerator.wrap(
                function _callee27$(_context27) {
                  while (1) {
                    switch ((_context27.prev = _context27.next)) {
                      case 0:
                        _context27.next = 2
                        return this._rpcRequest("getLeaderSchedule", [])
                      case 2:
                        unsafeRes = _context27.sent
                        res = GetLeaderScheduleRpcResult(unsafeRes)
                        if (!res.error) {
                          _context27.next = 6
                          break
                        }
                        throw new Error("failed to get leader schedule: " + res.error.message)
                      case 6:
                        assert(typeof res.result !== "undefined")
                        return _context27.abrupt("return", res.result)
                      case 8:
                      case "end":
                        return _context27.stop()
                    }
                  }
                },
                _callee27,
                this
              )
            })
          )
          function getLeaderSchedule() {
            return _getLeaderSchedule.apply(this, arguments)
          }
          return getLeaderSchedule
        })(),
      },
      {
        key: "getMinimumBalanceForRentExemption",
        value: (function () {
          var _getMinimumBalanceForRentExemption = asyncToGenerator(
            regenerator.mark(function _callee28(dataLength, commitment) {
              var args, unsafeRes, res
              return regenerator.wrap(
                function _callee28$(_context28) {
                  while (1) {
                    switch ((_context28.prev = _context28.next)) {
                      case 0:
                        args = this._argsWithCommitment([dataLength], commitment)
                        _context28.next = 3
                        return this._rpcRequest("getMinimumBalanceForRentExemption", args)
                      case 3:
                        unsafeRes = _context28.sent
                        res = GetMinimumBalanceForRentExemptionRpcResult(unsafeRes)
                        if (!res.error) {
                          _context28.next = 8
                          break
                        }
                        console.warn("Unable to fetch minimum balance for rent exemption")
                        return _context28.abrupt("return", 0)
                      case 8:
                        assert(typeof res.result !== "undefined")
                        return _context28.abrupt("return", Number(res.result))
                      case 10:
                      case "end":
                        return _context28.stop()
                    }
                  }
                },
                _callee28,
                this
              )
            })
          )
          function getMinimumBalanceForRentExemption(_x36, _x37) {
            return _getMinimumBalanceForRentExemption.apply(this, arguments)
          }
          return getMinimumBalanceForRentExemption
        })(),
      },
      {
        key: "getRecentBlockhashAndContext",
        value: (function () {
          var _getRecentBlockhashAndContext = asyncToGenerator(
            regenerator.mark(function _callee29(commitment) {
              var args, unsafeRes, res
              return regenerator.wrap(
                function _callee29$(_context29) {
                  while (1) {
                    switch ((_context29.prev = _context29.next)) {
                      case 0:
                        args = this._argsWithCommitment([], commitment)
                        _context29.next = 3
                        return this._rpcRequest("getRecentBlockhash", args)
                      case 3:
                        unsafeRes = _context29.sent
                        res = GetRecentBlockhashAndContextRpcResult(unsafeRes)
                        if (!res.error) {
                          _context29.next = 7
                          break
                        }
                        throw new Error("failed to get recent blockhash: " + res.error.message)
                      case 7:
                        assert(typeof res.result !== "undefined")
                        return _context29.abrupt("return", res.result)
                      case 9:
                      case "end":
                        return _context29.stop()
                    }
                  }
                },
                _callee29,
                this
              )
            })
          )
          function getRecentBlockhashAndContext(_x38) {
            return _getRecentBlockhashAndContext.apply(this, arguments)
          }
          return getRecentBlockhashAndContext
        })(),
      },
      {
        key: "getFeeCalculatorForBlockhash",
        value: (function () {
          var _getFeeCalculatorForBlockhash = asyncToGenerator(
            regenerator.mark(function _callee30(blockhash, commitment) {
              var args, unsafeRes, res, _res$result, context, value
              return regenerator.wrap(
                function _callee30$(_context30) {
                  while (1) {
                    switch ((_context30.prev = _context30.next)) {
                      case 0:
                        args = this._argsWithCommitment([blockhash], commitment)
                        _context30.next = 3
                        return this._rpcRequest("getFeeCalculatorForBlockhash", args)
                      case 3:
                        unsafeRes = _context30.sent
                        res = GetFeeCalculatorRpcResult(unsafeRes)
                        if (!res.error) {
                          _context30.next = 7
                          break
                        }
                        throw new Error("failed to get fee calculator: " + res.error.message)
                      case 7:
                        assert(typeof res.result !== "undefined")
                        ;(_res$result = res.result),
                          (context = _res$result.context),
                          (value = _res$result.value)
                        return _context30.abrupt("return", {
                          context: context,
                          value: value && value.feeCalculator,
                        })
                      case 10:
                      case "end":
                        return _context30.stop()
                    }
                  }
                },
                _callee30,
                this
              )
            })
          )
          function getFeeCalculatorForBlockhash(_x39, _x40) {
            return _getFeeCalculatorForBlockhash.apply(this, arguments)
          }
          return getFeeCalculatorForBlockhash
        })(),
      },
      {
        key: "getRecentBlockhash",
        value: (function () {
          var _getRecentBlockhash = asyncToGenerator(
            regenerator.mark(function _callee31(commitment) {
              return regenerator.wrap(
                function _callee31$(_context31) {
                  while (1) {
                    switch ((_context31.prev = _context31.next)) {
                      case 0:
                        _context31.next = 2
                        return this.getRecentBlockhashAndContext(commitment)
                          .then(function (x) {
                            return x.value
                          })
                          ["catch"](function (e) {
                            throw new Error("failed to get recent blockhash: " + e)
                          })
                      case 2:
                        return _context31.abrupt("return", _context31.sent)
                      case 3:
                      case "end":
                        return _context31.stop()
                    }
                  }
                },
                _callee31,
                this
              )
            })
          )
          function getRecentBlockhash(_x41) {
            return _getRecentBlockhash.apply(this, arguments)
          }
          return getRecentBlockhash
        })(),
      },
      {
        key: "getVersion",
        value: (function () {
          var _getVersion = asyncToGenerator(
            regenerator.mark(function _callee32() {
              var unsafeRes, res
              return regenerator.wrap(
                function _callee32$(_context32) {
                  while (1) {
                    switch ((_context32.prev = _context32.next)) {
                      case 0:
                        _context32.next = 2
                        return this._rpcRequest("getVersion", [])
                      case 2:
                        unsafeRes = _context32.sent
                        res = GetVersionRpcResult(unsafeRes)
                        if (!res.error) {
                          _context32.next = 6
                          break
                        }
                        throw new Error("failed to get version: " + res.error.message)
                      case 6:
                        assert(typeof res.result !== "undefined")
                        return _context32.abrupt("return", res.result)
                      case 8:
                      case "end":
                        return _context32.stop()
                    }
                  }
                },
                _callee32,
                this
              )
            })
          )
          function getVersion() {
            return _getVersion.apply(this, arguments)
          }
          return getVersion
        })(),
      },
      {
        key: "getConfirmedBlock",
        value: (function () {
          var _getConfirmedBlock = asyncToGenerator(
            regenerator.mark(function _callee33(slot) {
              var unsafeRes, _GetConfirmedBlockRpc, result, error
              return regenerator.wrap(
                function _callee33$(_context33) {
                  while (1) {
                    switch ((_context33.prev = _context33.next)) {
                      case 0:
                        _context33.next = 2
                        return this._rpcRequest("getConfirmedBlock", [slot])
                      case 2:
                        unsafeRes = _context33.sent
                        ;(_GetConfirmedBlockRpc = GetConfirmedBlockRpcResult(unsafeRes)),
                          (result = _GetConfirmedBlockRpc.result),
                          (error = _GetConfirmedBlockRpc.error)
                        if (!error) {
                          _context33.next = 6
                          break
                        }
                        throw new Error("failed to get confirmed block: " + result.error.message)
                      case 6:
                        assert(typeof result !== "undefined")
                        if (result) {
                          _context33.next = 9
                          break
                        }
                        throw new Error("Confirmed block " + slot + " not found")
                      case 9:
                        return _context33.abrupt("return", {
                          blockhash: new PublicKey(result.blockhash).toString(),
                          previousBlockhash: new PublicKey(result.previousBlockhash).toString(),
                          parentSlot: result.parentSlot,
                          transactions: result.transactions.map(function (result) {
                            var _result$transaction = result.transaction,
                              message = _result$transaction.message,
                              signatures = _result$transaction.signatures
                            return {
                              transaction: Transaction.populate(new Message(message), signatures),
                              meta: result.meta,
                            }
                          }),
                          rewards: result.rewards || [],
                        })
                      case 10:
                      case "end":
                        return _context33.stop()
                    }
                  }
                },
                _callee33,
                this
              )
            })
          )
          function getConfirmedBlock(_x42) {
            return _getConfirmedBlock.apply(this, arguments)
          }
          return getConfirmedBlock
        })(),
      },
      {
        key: "getConfirmedTransaction",
        value: (function () {
          var _getConfirmedTransaction = asyncToGenerator(
            regenerator.mark(function _callee34(signature) {
              var unsafeRes,
                _GetConfirmedTransact,
                result,
                error,
                _result$transaction2,
                message,
                signatures
              return regenerator.wrap(
                function _callee34$(_context34) {
                  while (1) {
                    switch ((_context34.prev = _context34.next)) {
                      case 0:
                        _context34.next = 2
                        return this._rpcRequest("getConfirmedTransaction", [signature])
                      case 2:
                        unsafeRes = _context34.sent
                        ;(_GetConfirmedTransact = GetConfirmedTransactionRpcResult(unsafeRes)),
                          (result = _GetConfirmedTransact.result),
                          (error = _GetConfirmedTransact.error)
                        if (!error) {
                          _context34.next = 6
                          break
                        }
                        throw new Error("failed to get confirmed transaction: " + error.message)
                      case 6:
                        assert(typeof result !== "undefined")
                        if (!(result === null)) {
                          _context34.next = 9
                          break
                        }
                        return _context34.abrupt("return", result)
                      case 9:
                        ;(_result$transaction2 = result.transaction),
                          (message = _result$transaction2.message),
                          (signatures = _result$transaction2.signatures)
                        return _context34.abrupt("return", {
                          slot: result.slot,
                          transaction: Transaction.populate(new Message(message), signatures),
                          meta: result.meta,
                        })
                      case 11:
                      case "end":
                        return _context34.stop()
                    }
                  }
                },
                _callee34,
                this
              )
            })
          )
          function getConfirmedTransaction(_x43) {
            return _getConfirmedTransaction.apply(this, arguments)
          }
          return getConfirmedTransaction
        })(),
      },
      {
        key: "getConfirmedSignaturesForAddress",
        value: (function () {
          var _getConfirmedSignaturesForAddress = asyncToGenerator(
            regenerator.mark(function _callee35(address, startSlot, endSlot) {
              var unsafeRes, result
              return regenerator.wrap(
                function _callee35$(_context35) {
                  while (1) {
                    switch ((_context35.prev = _context35.next)) {
                      case 0:
                        _context35.next = 2
                        return this._rpcRequest("getConfirmedSignaturesForAddress", [
                          address.toBase58(),
                          startSlot,
                          endSlot,
                        ])
                      case 2:
                        unsafeRes = _context35.sent
                        result = GetConfirmedSignaturesForAddressRpcResult(unsafeRes)
                        if (!result.error) {
                          _context35.next = 6
                          break
                        }
                        throw new Error(
                          "failed to get confirmed signatures for address: " + result.error.message
                        )
                      case 6:
                        assert(typeof result.result !== "undefined")
                        return _context35.abrupt("return", result.result)
                      case 8:
                      case "end":
                        return _context35.stop()
                    }
                  }
                },
                _callee35,
                this
              )
            })
          )
          function getConfirmedSignaturesForAddress(_x44, _x45, _x46) {
            return _getConfirmedSignaturesForAddress.apply(this, arguments)
          }
          return getConfirmedSignaturesForAddress
        })(),
      },
      {
        key: "getNonceAndContext",
        value: (function () {
          var _getNonceAndContext = asyncToGenerator(
            regenerator.mark(function _callee36(nonceAccount, commitment) {
              var _yield$this$getAccoun, context, accountInfo, value
              return regenerator.wrap(
                function _callee36$(_context36) {
                  while (1) {
                    switch ((_context36.prev = _context36.next)) {
                      case 0:
                        _context36.next = 2
                        return this.getAccountInfoAndContext(nonceAccount, commitment)
                      case 2:
                        _yield$this$getAccoun = _context36.sent
                        context = _yield$this$getAccoun.context
                        accountInfo = _yield$this$getAccoun.value
                        value = null
                        if (accountInfo !== null) {
                          value = NonceAccount.fromAccountData(accountInfo.data)
                        }
                        return _context36.abrupt("return", { context: context, value: value })
                      case 8:
                      case "end":
                        return _context36.stop()
                    }
                  }
                },
                _callee36,
                this
              )
            })
          )
          function getNonceAndContext(_x47, _x48) {
            return _getNonceAndContext.apply(this, arguments)
          }
          return getNonceAndContext
        })(),
      },
      {
        key: "getNonce",
        value: (function () {
          var _getNonce = asyncToGenerator(
            regenerator.mark(function _callee37(nonceAccount, commitment) {
              return regenerator.wrap(
                function _callee37$(_context37) {
                  while (1) {
                    switch ((_context37.prev = _context37.next)) {
                      case 0:
                        _context37.next = 2
                        return this.getNonceAndContext(nonceAccount, commitment)
                          .then(function (x) {
                            return x.value
                          })
                          ["catch"](function (e) {
                            throw new Error(
                              "failed to get nonce for account " +
                                nonceAccount.toBase58() +
                                ": " +
                                e
                            )
                          })
                      case 2:
                        return _context37.abrupt("return", _context37.sent)
                      case 3:
                      case "end":
                        return _context37.stop()
                    }
                  }
                },
                _callee37,
                this
              )
            })
          )
          function getNonce(_x49, _x50) {
            return _getNonce.apply(this, arguments)
          }
          return getNonce
        })(),
      },
      {
        key: "requestAirdrop",
        value: (function () {
          var _requestAirdrop = asyncToGenerator(
            regenerator.mark(function _callee38(to, amount) {
              var unsafeRes, res
              return regenerator.wrap(
                function _callee38$(_context38) {
                  while (1) {
                    switch ((_context38.prev = _context38.next)) {
                      case 0:
                        _context38.next = 2
                        return this._rpcRequest("requestAirdrop", [to.toBase58(), amount])
                      case 2:
                        unsafeRes = _context38.sent
                        res = RequestAirdropRpcResult(unsafeRes)
                        if (!res.error) {
                          _context38.next = 6
                          break
                        }
                        throw new Error(
                          "airdrop to " + to.toBase58() + " failed: " + res.error.message
                        )
                      case 6:
                        assert(typeof res.result !== "undefined")
                        return _context38.abrupt("return", res.result)
                      case 8:
                      case "end":
                        return _context38.stop()
                    }
                  }
                },
                _callee38,
                this
              )
            })
          )
          function requestAirdrop(_x51, _x52) {
            return _requestAirdrop.apply(this, arguments)
          }
          return requestAirdrop
        })(),
      },
      {
        key: "sendTransaction",
        value: (function () {
          var _sendTransaction = asyncToGenerator(
            regenerator.mark(function _callee39(transaction, signers, options) {
              var signature, attempts, startTime, _yield$this$getRecent, blockhash, wireTransaction
              return regenerator.wrap(
                function _callee39$(_context39) {
                  while (1) {
                    switch ((_context39.prev = _context39.next)) {
                      case 0:
                        if (!transaction.nonceInfo) {
                          _context39.next = 4
                          break
                        }
                        transaction.sign.apply(transaction, toConsumableArray(signers))
                        _context39.next = 32
                        break
                      case 4:
                        if (
                          !(
                            this._blockhashInfo.recentBlockhash != null &&
                            Date.now() - this._blockhashInfo.lastFetch < BLOCKHASH_CACHE_TIMEOUT_MS
                          )
                        ) {
                          _context39.next = 14
                          break
                        }
                        transaction.recentBlockhash = this._blockhashInfo.recentBlockhash
                        transaction.sign.apply(transaction, toConsumableArray(signers))
                        if (transaction.signature) {
                          _context39.next = 9
                          break
                        }
                        throw new Error("!signature")
                      case 9:
                        signature = transaction.signature.toString()
                        if (this._blockhashInfo.transactionSignatures.includes(signature)) {
                          _context39.next = 14
                          break
                        }
                        this._blockhashInfo.transactionSignatures.push(signature)
                        if (this._disableBlockhashCaching) {
                          this._blockhashInfo.lastFetch = new Date(0)
                        }
                        return _context39.abrupt("break", 32)
                      case 14:
                        attempts = 0
                        startTime = Date.now()
                      case 16:
                        _context39.next = 18
                        return this.getRecentBlockhash("max")
                      case 18:
                        _yield$this$getRecent = _context39.sent
                        blockhash = _yield$this$getRecent.blockhash
                        if (!(this._blockhashInfo.recentBlockhash != blockhash)) {
                          _context39.next = 23
                          break
                        }
                        this._blockhashInfo = {
                          recentBlockhash: blockhash,
                          lastFetch: new Date(),
                          transactionSignatures: [],
                        }
                        return _context39.abrupt("break", 30)
                      case 23:
                        if (!(attempts === 50)) {
                          _context39.next = 25
                          break
                        }
                        throw new Error(
                          "Unable to obtain a new blockhash after ".concat(
                            Date.now() - startTime,
                            "ms"
                          )
                        )
                      case 25:
                        _context39.next = 27
                        return sleep(MS_PER_SLOT / 2)
                      case 27:
                        ++attempts
                      case 28:
                        _context39.next = 16
                        break
                      case 30:
                        _context39.next = 4
                        break
                      case 32:
                        wireTransaction = transaction.serialize()
                        _context39.next = 35
                        return this.sendRawTransaction(wireTransaction, options)
                      case 35:
                        return _context39.abrupt("return", _context39.sent)
                      case 36:
                      case "end":
                        return _context39.stop()
                    }
                  }
                },
                _callee39,
                this
              )
            })
          )
          function sendTransaction(_x53, _x54, _x55) {
            return _sendTransaction.apply(this, arguments)
          }
          return sendTransaction
        })(),
      },
      {
        key: "validatorExit",
        value: (function () {
          var _validatorExit = asyncToGenerator(
            regenerator.mark(function _callee40() {
              var unsafeRes, res
              return regenerator.wrap(
                function _callee40$(_context40) {
                  while (1) {
                    switch ((_context40.prev = _context40.next)) {
                      case 0:
                        _context40.next = 2
                        return this._rpcRequest("validatorExit", [])
                      case 2:
                        unsafeRes = _context40.sent
                        res = jsonRpcResult("boolean")(unsafeRes)
                        if (!res.error) {
                          _context40.next = 6
                          break
                        }
                        throw new Error("validator exit failed: " + res.error.message)
                      case 6:
                        assert(typeof res.result !== "undefined")
                        return _context40.abrupt("return", res.result)
                      case 8:
                      case "end":
                        return _context40.stop()
                    }
                  }
                },
                _callee40,
                this
              )
            })
          )
          function validatorExit() {
            return _validatorExit.apply(this, arguments)
          }
          return validatorExit
        })(),
      },
      {
        key: "sendRawTransaction",
        value: (function () {
          var _sendRawTransaction = asyncToGenerator(
            regenerator.mark(function _callee41(rawTransaction, options) {
              var encodedTransaction, result
              return regenerator.wrap(
                function _callee41$(_context41) {
                  while (1) {
                    switch ((_context41.prev = _context41.next)) {
                      case 0:
                        encodedTransaction = bs58.encode(toBuffer(rawTransaction))
                        _context41.next = 3
                        return this.sendEncodedTransaction(encodedTransaction, options)
                      case 3:
                        result = _context41.sent
                        return _context41.abrupt("return", result)
                      case 5:
                      case "end":
                        return _context41.stop()
                    }
                  }
                },
                _callee41,
                this
              )
            })
          )
          function sendRawTransaction(_x56, _x57) {
            return _sendRawTransaction.apply(this, arguments)
          }
          return sendRawTransaction
        })(),
      },
      {
        key: "sendEncodedTransaction",
        value: (function () {
          var _sendEncodedTransaction = asyncToGenerator(
            regenerator.mark(function _callee42(encodedTransaction, options) {
              var args, skipPreflight, unsafeRes, res
              return regenerator.wrap(
                function _callee42$(_context42) {
                  while (1) {
                    switch ((_context42.prev = _context42.next)) {
                      case 0:
                        args = [encodedTransaction]
                        skipPreflight = options && options.skipPreflight
                        if (skipPreflight) args.push({ skipPreflight: skipPreflight })
                        _context42.next = 5
                        return this._rpcRequest("sendTransaction", args)
                      case 5:
                        unsafeRes = _context42.sent
                        res = SendTransactionRpcResult(unsafeRes)
                        if (!res.error) {
                          _context42.next = 9
                          break
                        }
                        throw new Error("failed to send transaction: " + res.error.message)
                      case 9:
                        assert(typeof res.result !== "undefined")
                        assert(res.result)
                        return _context42.abrupt("return", res.result)
                      case 12:
                      case "end":
                        return _context42.stop()
                    }
                  }
                },
                _callee42,
                this
              )
            })
          )
          function sendEncodedTransaction(_x58, _x59) {
            return _sendEncodedTransaction.apply(this, arguments)
          }
          return sendEncodedTransaction
        })(),
      },
      {
        key: "_wsOnOpen",
        value: function _wsOnOpen() {
          this._rpcWebSocketConnected = true
          this._updateSubscriptions()
        },
      },
      {
        key: "_wsOnError",
        value: function _wsOnError(err) {
          console.error("ws error:", err.message)
        },
      },
      {
        key: "_wsOnClose",
        value: function _wsOnClose() {
          this._rpcWebSocketConnected = false
          this._resetSubscriptions()
        },
      },
      {
        key: "_subscribe",
        value: (function () {
          var _subscribe2 = asyncToGenerator(
            regenerator.mark(function _callee43(sub, rpcMethod, rpcArgs) {
              var id
              return regenerator.wrap(
                function _callee43$(_context43) {
                  while (1) {
                    switch ((_context43.prev = _context43.next)) {
                      case 0:
                        if (!(sub.subscriptionId == null)) {
                          _context43.next = 13
                          break
                        }
                        sub.subscriptionId = "subscribing"
                        _context43.prev = 2
                        _context43.next = 5
                        return this._rpcWebSocket.call(rpcMethod, rpcArgs)
                      case 5:
                        id = _context43.sent
                        if (sub.subscriptionId === "subscribing") {
                          sub.subscriptionId = id
                        }
                        _context43.next = 13
                        break
                      case 9:
                        _context43.prev = 9
                        _context43.t0 = _context43["catch"](2)
                        if (sub.subscriptionId === "subscribing") {
                          sub.subscriptionId = null
                        }
                        console.error(
                          "".concat(rpcMethod, " error for argument"),
                          rpcArgs,
                          _context43.t0.message
                        )
                      case 13:
                      case "end":
                        return _context43.stop()
                    }
                  }
                },
                _callee43,
                this,
                [[2, 9]]
              )
            })
          )
          function _subscribe(_x60, _x61, _x62) {
            return _subscribe2.apply(this, arguments)
          }
          return _subscribe
        })(),
      },
      {
        key: "_unsubscribe",
        value: (function () {
          var _unsubscribe2 = asyncToGenerator(
            regenerator.mark(function _callee44(sub, rpcMethod) {
              var subscriptionId, unsubscribeId
              return regenerator.wrap(
                function _callee44$(_context44) {
                  while (1) {
                    switch ((_context44.prev = _context44.next)) {
                      case 0:
                        subscriptionId = sub.subscriptionId
                        if (!(subscriptionId != null && typeof subscriptionId != "string")) {
                          _context44.next = 11
                          break
                        }
                        unsubscribeId = subscriptionId
                        _context44.prev = 3
                        _context44.next = 6
                        return this._rpcWebSocket.call(rpcMethod, [unsubscribeId])
                      case 6:
                        _context44.next = 11
                        break
                      case 8:
                        _context44.prev = 8
                        _context44.t0 = _context44["catch"](3)
                        console.error("".concat(rpcMethod, " error:"), _context44.t0.message)
                      case 11:
                      case "end":
                        return _context44.stop()
                    }
                  }
                },
                _callee44,
                this,
                [[3, 8]]
              )
            })
          )
          function _unsubscribe(_x63, _x64) {
            return _unsubscribe2.apply(this, arguments)
          }
          return _unsubscribe
        })(),
      },
      {
        key: "_resetSubscriptions",
        value: function _resetSubscriptions() {
          Object.values(this._accountChangeSubscriptions).forEach(function (s) {
            return (s.subscriptionId = null)
          })
          Object.values(this._programAccountChangeSubscriptions).forEach(function (s) {
            return (s.subscriptionId = null)
          })
          Object.values(this._signatureSubscriptions).forEach(function (s) {
            return (s.subscriptionId = null)
          })
          Object.values(this._slotSubscriptions).forEach(function (s) {
            return (s.subscriptionId = null)
          })
          Object.values(this._rootSubscriptions).forEach(function (s) {
            return (s.subscriptionId = null)
          })
        },
      },
      {
        key: "_updateSubscriptions",
        value: function _updateSubscriptions() {
          var accountKeys = Object.keys(this._accountChangeSubscriptions).map(Number)
          var programKeys = Object.keys(this._programAccountChangeSubscriptions).map(Number)
          var slotKeys = Object.keys(this._slotSubscriptions).map(Number)
          var signatureKeys = Object.keys(this._signatureSubscriptions).map(Number)
          var rootKeys = Object.keys(this._rootSubscriptions).map(Number)
          if (
            accountKeys.length === 0 &&
            programKeys.length === 0 &&
            slotKeys.length === 0 &&
            signatureKeys.length === 0 &&
            rootKeys.length === 0
          ) {
            this._rpcWebSocket.close()
            return
          }
          if (!this._rpcWebSocketConnected) {
            this._resetSubscriptions()
            this._rpcWebSocket.connect()
            return
          }
          var _iterator = _createForOfIteratorHelper$1(accountKeys),
            _step
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done; ) {
              var id = _step.value
              var sub = this._accountChangeSubscriptions[id]
              this._subscribe(
                sub,
                "accountSubscribe",
                this._argsWithCommitment([sub.publicKey], sub.commitment)
              )
            }
          } catch (err) {
            _iterator.e(err)
          } finally {
            _iterator.f()
          }
          var _iterator2 = _createForOfIteratorHelper$1(programKeys),
            _step2
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
              var _id = _step2.value
              var _sub = this._programAccountChangeSubscriptions[_id]
              this._subscribe(
                _sub,
                "programSubscribe",
                this._argsWithCommitment([_sub.programId], _sub.commitment)
              )
            }
          } catch (err) {
            _iterator2.e(err)
          } finally {
            _iterator2.f()
          }
          var _iterator3 = _createForOfIteratorHelper$1(slotKeys),
            _step3
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
              var _id2 = _step3.value
              var _sub2 = this._slotSubscriptions[_id2]
              this._subscribe(_sub2, "slotSubscribe", [])
            }
          } catch (err) {
            _iterator3.e(err)
          } finally {
            _iterator3.f()
          }
          var _iterator4 = _createForOfIteratorHelper$1(signatureKeys),
            _step4
          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
              var _id3 = _step4.value
              var _sub3 = this._signatureSubscriptions[_id3]
              this._subscribe(
                _sub3,
                "signatureSubscribe",
                this._argsWithCommitment([_sub3.signature], _sub3.commitment)
              )
            }
          } catch (err) {
            _iterator4.e(err)
          } finally {
            _iterator4.f()
          }
          var _iterator5 = _createForOfIteratorHelper$1(rootKeys),
            _step5
          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
              var _id4 = _step5.value
              var _sub4 = this._rootSubscriptions[_id4]
              this._subscribe(_sub4, "rootSubscribe", [])
            }
          } catch (err) {
            _iterator5.e(err)
          } finally {
            _iterator5.f()
          }
        },
      },
      {
        key: "_wsOnAccountNotification",
        value: function _wsOnAccountNotification(notification) {
          var res = AccountNotificationResult(notification)
          if (res.error) {
            throw new Error("account notification failed: " + res.error.message)
          }
          assert(typeof res.result !== "undefined")
          var keys = Object.keys(this._accountChangeSubscriptions).map(Number)
          var _iterator6 = _createForOfIteratorHelper$1(keys),
            _step6
          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done; ) {
              var id = _step6.value
              var sub = this._accountChangeSubscriptions[id]
              if (sub.subscriptionId === res.subscription) {
                var result = res.result
                var value = result.value,
                  _context45 = result.context
                sub.callback(
                  {
                    executable: value.executable,
                    owner: new PublicKey(value.owner),
                    lamports: value.lamports,
                    data: bs58.decode(value.data),
                  },
                  _context45
                )
                return true
              }
            }
          } catch (err) {
            _iterator6.e(err)
          } finally {
            _iterator6.f()
          }
        },
      },
      {
        key: "onAccountChange",
        value: function onAccountChange(publicKey, callback, commitment) {
          var id = ++this._accountChangeSubscriptionCounter
          this._accountChangeSubscriptions[id] = {
            publicKey: publicKey.toBase58(),
            callback: callback,
            commitment: commitment,
            subscriptionId: null,
          }
          this._updateSubscriptions()
          return id
        },
      },
      {
        key: "removeAccountChangeListener",
        value: (function () {
          var _removeAccountChangeListener = asyncToGenerator(
            regenerator.mark(function _callee45(id) {
              var subInfo
              return regenerator.wrap(
                function _callee45$(_context46) {
                  while (1) {
                    switch ((_context46.prev = _context46.next)) {
                      case 0:
                        if (!this._accountChangeSubscriptions[id]) {
                          _context46.next = 8
                          break
                        }
                        subInfo = this._accountChangeSubscriptions[id]
                        delete this._accountChangeSubscriptions[id]
                        _context46.next = 5
                        return this._unsubscribe(subInfo, "accountUnsubscribe")
                      case 5:
                        this._updateSubscriptions()
                        _context46.next = 9
                        break
                      case 8:
                        throw new Error("Unknown account change id: ".concat(id))
                      case 9:
                      case "end":
                        return _context46.stop()
                    }
                  }
                },
                _callee45,
                this
              )
            })
          )
          function removeAccountChangeListener(_x65) {
            return _removeAccountChangeListener.apply(this, arguments)
          }
          return removeAccountChangeListener
        })(),
      },
      {
        key: "_wsOnProgramAccountNotification",
        value: function _wsOnProgramAccountNotification(notification) {
          var res = ProgramAccountNotificationResult(notification)
          if (res.error) {
            throw new Error("program account notification failed: " + res.error.message)
          }
          assert(typeof res.result !== "undefined")
          var keys = Object.keys(this._programAccountChangeSubscriptions).map(Number)
          var _iterator7 = _createForOfIteratorHelper$1(keys),
            _step7
          try {
            for (_iterator7.s(); !(_step7 = _iterator7.n()).done; ) {
              var id = _step7.value
              var sub = this._programAccountChangeSubscriptions[id]
              if (sub.subscriptionId === res.subscription) {
                var result = res.result
                var value = result.value,
                  _context47 = result.context
                sub.callback(
                  {
                    accountId: value.pubkey,
                    accountInfo: {
                      executable: value.account.executable,
                      owner: new PublicKey(value.account.owner),
                      lamports: value.account.lamports,
                      data: bs58.decode(value.account.data),
                    },
                  },
                  _context47
                )
                return true
              }
            }
          } catch (err) {
            _iterator7.e(err)
          } finally {
            _iterator7.f()
          }
        },
      },
      {
        key: "onProgramAccountChange",
        value: function onProgramAccountChange(programId, callback, commitment) {
          var id = ++this._programAccountChangeSubscriptionCounter
          this._programAccountChangeSubscriptions[id] = {
            programId: programId.toBase58(),
            callback: callback,
            commitment: commitment,
            subscriptionId: null,
          }
          this._updateSubscriptions()
          return id
        },
      },
      {
        key: "removeProgramAccountChangeListener",
        value: (function () {
          var _removeProgramAccountChangeListener = asyncToGenerator(
            regenerator.mark(function _callee46(id) {
              var subInfo
              return regenerator.wrap(
                function _callee46$(_context48) {
                  while (1) {
                    switch ((_context48.prev = _context48.next)) {
                      case 0:
                        if (!this._programAccountChangeSubscriptions[id]) {
                          _context48.next = 8
                          break
                        }
                        subInfo = this._programAccountChangeSubscriptions[id]
                        delete this._programAccountChangeSubscriptions[id]
                        _context48.next = 5
                        return this._unsubscribe(subInfo, "programUnsubscribe")
                      case 5:
                        this._updateSubscriptions()
                        _context48.next = 9
                        break
                      case 8:
                        throw new Error("Unknown program account change id: ".concat(id))
                      case 9:
                      case "end":
                        return _context48.stop()
                    }
                  }
                },
                _callee46,
                this
              )
            })
          )
          function removeProgramAccountChangeListener(_x66) {
            return _removeProgramAccountChangeListener.apply(this, arguments)
          }
          return removeProgramAccountChangeListener
        })(),
      },
      {
        key: "_wsOnSlotNotification",
        value: function _wsOnSlotNotification(notification) {
          var res = SlotNotificationResult(notification)
          if (res.error) {
            throw new Error("slot notification failed: " + res.error.message)
          }
          assert(typeof res.result !== "undefined")
          var _res$result2 = res.result,
            parent = _res$result2.parent,
            slot = _res$result2.slot,
            root = _res$result2.root
          var keys = Object.keys(this._slotSubscriptions).map(Number)
          var _iterator8 = _createForOfIteratorHelper$1(keys),
            _step8
          try {
            for (_iterator8.s(); !(_step8 = _iterator8.n()).done; ) {
              var id = _step8.value
              var sub = this._slotSubscriptions[id]
              if (sub.subscriptionId === res.subscription) {
                sub.callback({ parent: parent, slot: slot, root: root })
                return true
              }
            }
          } catch (err) {
            _iterator8.e(err)
          } finally {
            _iterator8.f()
          }
        },
      },
      {
        key: "onSlotChange",
        value: function onSlotChange(callback) {
          var id = ++this._slotSubscriptionCounter
          this._slotSubscriptions[id] = { callback: callback, subscriptionId: null }
          this._updateSubscriptions()
          return id
        },
      },
      {
        key: "removeSlotChangeListener",
        value: (function () {
          var _removeSlotChangeListener = asyncToGenerator(
            regenerator.mark(function _callee47(id) {
              var subInfo
              return regenerator.wrap(
                function _callee47$(_context49) {
                  while (1) {
                    switch ((_context49.prev = _context49.next)) {
                      case 0:
                        if (!this._slotSubscriptions[id]) {
                          _context49.next = 8
                          break
                        }
                        subInfo = this._slotSubscriptions[id]
                        delete this._slotSubscriptions[id]
                        _context49.next = 5
                        return this._unsubscribe(subInfo, "slotUnsubscribe")
                      case 5:
                        this._updateSubscriptions()
                        _context49.next = 9
                        break
                      case 8:
                        throw new Error("Unknown slot change id: ".concat(id))
                      case 9:
                      case "end":
                        return _context49.stop()
                    }
                  }
                },
                _callee47,
                this
              )
            })
          )
          function removeSlotChangeListener(_x67) {
            return _removeSlotChangeListener.apply(this, arguments)
          }
          return removeSlotChangeListener
        })(),
      },
      {
        key: "_argsWithCommitment",
        value: function _argsWithCommitment(args, override) {
          var commitment = override || this._commitment
          if (commitment) {
            args.push({ commitment: commitment })
          }
          return args
        },
      },
      {
        key: "_wsOnSignatureNotification",
        value: function _wsOnSignatureNotification(notification) {
          var res = SignatureNotificationResult(notification)
          if (res.error) {
            throw new Error("signature notification failed: " + res.error.message)
          }
          assert(typeof res.result !== "undefined")
          var keys = Object.keys(this._signatureSubscriptions).map(Number)
          var _iterator9 = _createForOfIteratorHelper$1(keys),
            _step9
          try {
            for (_iterator9.s(); !(_step9 = _iterator9.n()).done; ) {
              var id = _step9.value
              var sub = this._signatureSubscriptions[id]
              if (sub.subscriptionId === res.subscription) {
                delete this._signatureSubscriptions[id]
                this._updateSubscriptions()
                sub.callback(res.result.value, res.result.context)
                return
              }
            }
          } catch (err) {
            _iterator9.e(err)
          } finally {
            _iterator9.f()
          }
        },
      },
      {
        key: "onSignature",
        value: function onSignature(signature, callback, commitment) {
          var id = ++this._signatureSubscriptionCounter
          this._signatureSubscriptions[id] = {
            signature: signature,
            callback: callback,
            commitment: commitment,
            subscriptionId: null,
          }
          this._updateSubscriptions()
          return id
        },
      },
      {
        key: "removeSignatureListener",
        value: (function () {
          var _removeSignatureListener = asyncToGenerator(
            regenerator.mark(function _callee48(id) {
              var subInfo
              return regenerator.wrap(
                function _callee48$(_context50) {
                  while (1) {
                    switch ((_context50.prev = _context50.next)) {
                      case 0:
                        if (!this._signatureSubscriptions[id]) {
                          _context50.next = 8
                          break
                        }
                        subInfo = this._signatureSubscriptions[id]
                        delete this._signatureSubscriptions[id]
                        _context50.next = 5
                        return this._unsubscribe(subInfo, "signatureUnsubscribe")
                      case 5:
                        this._updateSubscriptions()
                        _context50.next = 9
                        break
                      case 8:
                        throw new Error("Unknown signature result id: ".concat(id))
                      case 9:
                      case "end":
                        return _context50.stop()
                    }
                  }
                },
                _callee48,
                this
              )
            })
          )
          function removeSignatureListener(_x68) {
            return _removeSignatureListener.apply(this, arguments)
          }
          return removeSignatureListener
        })(),
      },
      {
        key: "_wsOnRootNotification",
        value: function _wsOnRootNotification(notification) {
          var res = RootNotificationResult(notification)
          if (res.error) {
            throw new Error("root notification failed: " + res.error.message)
          }
          assert(typeof res.result !== "undefined")
          var root = res.result
          var keys = Object.keys(this._rootSubscriptions).map(Number)
          var _iterator10 = _createForOfIteratorHelper$1(keys),
            _step10
          try {
            for (_iterator10.s(); !(_step10 = _iterator10.n()).done; ) {
              var id = _step10.value
              var sub = this._rootSubscriptions[id]
              if (sub.subscriptionId === res.subscription) {
                sub.callback(root)
                return true
              }
            }
          } catch (err) {
            _iterator10.e(err)
          } finally {
            _iterator10.f()
          }
        },
      },
      {
        key: "onRootChange",
        value: function onRootChange(callback) {
          var id = ++this._rootSubscriptionCounter
          this._rootSubscriptions[id] = { callback: callback, subscriptionId: null }
          this._updateSubscriptions()
          return id
        },
      },
      {
        key: "removeRootChangeListener",
        value: (function () {
          var _removeRootChangeListener = asyncToGenerator(
            regenerator.mark(function _callee49(id) {
              var subInfo
              return regenerator.wrap(
                function _callee49$(_context51) {
                  while (1) {
                    switch ((_context51.prev = _context51.next)) {
                      case 0:
                        if (!this._rootSubscriptions[id]) {
                          _context51.next = 8
                          break
                        }
                        subInfo = this._rootSubscriptions[id]
                        delete this._rootSubscriptions[id]
                        _context51.next = 5
                        return this._unsubscribe(subInfo, "rootUnsubscribe")
                      case 5:
                        this._updateSubscriptions()
                        _context51.next = 9
                        break
                      case 8:
                        throw new Error("Unknown root change id: ".concat(id))
                      case 9:
                      case "end":
                        return _context51.stop()
                    }
                  }
                },
                _callee49,
                this
              )
            })
          )
          function removeRootChangeListener(_x69) {
            return _removeRootChangeListener.apply(this, arguments)
          }
          return removeRootChangeListener
        })(),
      },
      {
        key: "commitment",
        get: function get() {
          return this._commitment
        },
      },
    ])
    return Connection
  })()
  function sendAndConfirmTransaction(_x, _x2, _x3, _x4) {
    return _sendAndConfirmTransaction.apply(this, arguments)
  }
  function _sendAndConfirmTransaction() {
    _sendAndConfirmTransaction = asyncToGenerator(
      regenerator.mark(function _callee(connection, transaction, signers, options) {
        var start, signature, status, duration
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                start = Date.now()
                _context.next = 3
                return connection.sendTransaction(transaction, signers, options)
              case 3:
                signature = _context.sent
                _context.next = 6
                return connection.confirmTransaction(signature, options && options.confirmations)
              case 6:
                status = _context.sent.value
                if (!status) {
                  _context.next = 11
                  break
                }
                if (!status.err) {
                  _context.next = 10
                  break
                }
                throw new Error(
                  "Transaction ".concat(signature, " failed (").concat(JSON.stringify(status), ")")
                )
              case 10:
                return _context.abrupt("return", signature)
              case 11:
                duration = (Date.now() - start) / 1e3
                throw new Error(
                  "Transaction was not confirmed in "
                    .concat(duration.toFixed(2), " seconds (")
                    .concat(JSON.stringify(status), ")")
                )
              case 13:
              case "end":
                return _context.stop()
            }
          }
        }, _callee)
      })
    )
    return _sendAndConfirmTransaction.apply(this, arguments)
  }
  function encodeData(type, fields) {
    var allocLength = type.layout.span >= 0 ? type.layout.span : getAlloc(type, fields)
    var data = Buffer.alloc(allocLength)
    var layoutFields = Object.assign({ instruction: type.index }, fields)
    type.layout.encode(layoutFields, data)
    return data
  }
  function decodeData(type, buffer) {
    var data
    try {
      data = type.layout.decode(buffer)
    } catch (err) {
      throw new Error("invalid instruction; " + err)
    }
    if (data.instruction !== type.index) {
      throw new Error(
        "invalid instruction; instruction index mismatch "
          .concat(data.instruction, " != ")
          .concat(type.index)
      )
    }
    return data
  }
  var SystemInstruction = (function () {
    function SystemInstruction() {
      classCallCheck(this, SystemInstruction)
    }
    createClass(SystemInstruction, null, [
      {
        key: "decodeInstructionType",
        value: function decodeInstructionType(instruction) {
          this.checkProgramId(instruction.programId)
          var instructionTypeLayout = u32("instruction")
          var typeIndex = instructionTypeLayout.decode(instruction.data)
          var type
          for (
            var _i = 0, _Object$keys = Object.keys(SYSTEM_INSTRUCTION_LAYOUTS);
            _i < _Object$keys.length;
            _i++
          ) {
            var t = _Object$keys[_i]
            if (SYSTEM_INSTRUCTION_LAYOUTS[t].index == typeIndex) {
              type = t
            }
          }
          if (!type) {
            throw new Error("Instruction type incorrect; not a SystemInstruction")
          }
          return type
        },
      },
      {
        key: "decodeCreateAccount",
        value: function decodeCreateAccount(instruction) {
          this.checkProgramId(instruction.programId)
          this.checkKeyLength(instruction.keys, 2)
          var _decodeData = decodeData(SYSTEM_INSTRUCTION_LAYOUTS.Create, instruction.data),
            lamports = _decodeData.lamports,
            space = _decodeData.space,
            programId = _decodeData.programId
          return {
            fromPubkey: instruction.keys[0].pubkey,
            newAccountPubkey: instruction.keys[1].pubkey,
            lamports: lamports,
            space: space,
            programId: new PublicKey(programId),
          }
        },
      },
      {
        key: "decodeTransfer",
        value: function decodeTransfer(instruction) {
          this.checkProgramId(instruction.programId)
          this.checkKeyLength(instruction.keys, 2)
          var _decodeData2 = decodeData(SYSTEM_INSTRUCTION_LAYOUTS.Transfer, instruction.data),
            lamports = _decodeData2.lamports
          return {
            fromPubkey: instruction.keys[0].pubkey,
            toPubkey: instruction.keys[1].pubkey,
            lamports: lamports,
          }
        },
      },
      {
        key: "decodeAllocate",
        value: function decodeAllocate(instruction) {
          this.checkProgramId(instruction.programId)
          this.checkKeyLength(instruction.keys, 1)
          var _decodeData3 = decodeData(SYSTEM_INSTRUCTION_LAYOUTS.Allocate, instruction.data),
            space = _decodeData3.space
          return { accountPubkey: instruction.keys[0].pubkey, space: space }
        },
      },
      {
        key: "decodeAllocateWithSeed",
        value: function decodeAllocateWithSeed(instruction) {
          this.checkProgramId(instruction.programId)
          this.checkKeyLength(instruction.keys, 1)
          var _decodeData4 = decodeData(
              SYSTEM_INSTRUCTION_LAYOUTS.AllocateWithSeed,
              instruction.data
            ),
            base = _decodeData4.base,
            seed = _decodeData4.seed,
            space = _decodeData4.space,
            programId = _decodeData4.programId
          return {
            accountPubkey: instruction.keys[0].pubkey,
            basePubkey: new PublicKey(base),
            seed: seed,
            space: space,
            programId: new PublicKey(programId),
          }
        },
      },
      {
        key: "decodeAssign",
        value: function decodeAssign(instruction) {
          this.checkProgramId(instruction.programId)
          this.checkKeyLength(instruction.keys, 1)
          var _decodeData5 = decodeData(SYSTEM_INSTRUCTION_LAYOUTS.Assign, instruction.data),
            programId = _decodeData5.programId
          return { accountPubkey: instruction.keys[0].pubkey, programId: new PublicKey(programId) }
        },
      },
      {
        key: "decodeAssignWithSeed",
        value: function decodeAssignWithSeed(instruction) {
          this.checkProgramId(instruction.programId)
          this.checkKeyLength(instruction.keys, 1)
          var _decodeData6 = decodeData(
              SYSTEM_INSTRUCTION_LAYOUTS.AssignWithSeed,
              instruction.data
            ),
            base = _decodeData6.base,
            seed = _decodeData6.seed,
            programId = _decodeData6.programId
          return {
            accountPubkey: instruction.keys[0].pubkey,
            basePubkey: new PublicKey(base),
            seed: seed,
            programId: new PublicKey(programId),
          }
        },
      },
      {
        key: "decodeCreateWithSeed",
        value: function decodeCreateWithSeed(instruction) {
          this.checkProgramId(instruction.programId)
          this.checkKeyLength(instruction.keys, 2)
          var _decodeData7 = decodeData(
              SYSTEM_INSTRUCTION_LAYOUTS.CreateWithSeed,
              instruction.data
            ),
            base = _decodeData7.base,
            seed = _decodeData7.seed,
            lamports = _decodeData7.lamports,
            space = _decodeData7.space,
            programId = _decodeData7.programId
          return {
            fromPubkey: instruction.keys[0].pubkey,
            newAccountPubkey: instruction.keys[1].pubkey,
            basePubkey: new PublicKey(base),
            seed: seed,
            lamports: lamports,
            space: space,
            programId: new PublicKey(programId),
          }
        },
      },
      {
        key: "decodeNonceInitialize",
        value: function decodeNonceInitialize(instruction) {
          this.checkProgramId(instruction.programId)
          this.checkKeyLength(instruction.keys, 3)
          var _decodeData8 = decodeData(
              SYSTEM_INSTRUCTION_LAYOUTS.InitializeNonceAccount,
              instruction.data
            ),
            authorized = _decodeData8.authorized
          return {
            noncePubkey: instruction.keys[0].pubkey,
            authorizedPubkey: new PublicKey(authorized),
          }
        },
      },
      {
        key: "decodeNonceAdvance",
        value: function decodeNonceAdvance(instruction) {
          this.checkProgramId(instruction.programId)
          this.checkKeyLength(instruction.keys, 3)
          decodeData(SYSTEM_INSTRUCTION_LAYOUTS.AdvanceNonceAccount, instruction.data)
          return {
            noncePubkey: instruction.keys[0].pubkey,
            authorizedPubkey: instruction.keys[2].pubkey,
          }
        },
      },
      {
        key: "decodeNonceWithdraw",
        value: function decodeNonceWithdraw(instruction) {
          this.checkProgramId(instruction.programId)
          this.checkKeyLength(instruction.keys, 5)
          var _decodeData9 = decodeData(
              SYSTEM_INSTRUCTION_LAYOUTS.WithdrawNonceAccount,
              instruction.data
            ),
            lamports = _decodeData9.lamports
          return {
            noncePubkey: instruction.keys[0].pubkey,
            toPubkey: instruction.keys[1].pubkey,
            authorizedPubkey: instruction.keys[4].pubkey,
            lamports: lamports,
          }
        },
      },
      {
        key: "decodeNonceAuthorize",
        value: function decodeNonceAuthorize(instruction) {
          this.checkProgramId(instruction.programId)
          this.checkKeyLength(instruction.keys, 2)
          var _decodeData10 = decodeData(
              SYSTEM_INSTRUCTION_LAYOUTS.AuthorizeNonceAccount,
              instruction.data
            ),
            authorized = _decodeData10.authorized
          return {
            noncePubkey: instruction.keys[0].pubkey,
            authorizedPubkey: instruction.keys[1].pubkey,
            newAuthorizedPubkey: new PublicKey(authorized),
          }
        },
      },
      {
        key: "checkProgramId",
        value: function checkProgramId(programId) {
          if (!programId.equals(SystemProgram.programId)) {
            throw new Error("invalid instruction; programId is not SystemProgram")
          }
        },
      },
      {
        key: "checkKeyLength",
        value: function checkKeyLength(keys, expectedLength) {
          if (keys.length < expectedLength) {
            throw new Error(
              "invalid instruction; found "
                .concat(keys.length, " keys, expected at least ")
                .concat(expectedLength)
            )
          }
        },
      },
    ])
    return SystemInstruction
  })()
  var SYSTEM_INSTRUCTION_LAYOUTS = Object.freeze({
    Create: {
      index: 0,
      layout: struct([u32("instruction"), ns64("lamports"), ns64("space"), publicKey("programId")]),
    },
    Assign: { index: 1, layout: struct([u32("instruction"), publicKey("programId")]) },
    Transfer: { index: 2, layout: struct([u32("instruction"), ns64("lamports")]) },
    CreateWithSeed: {
      index: 3,
      layout: struct([
        u32("instruction"),
        publicKey("base"),
        rustString("seed"),
        ns64("lamports"),
        ns64("space"),
        publicKey("programId"),
      ]),
    },
    AdvanceNonceAccount: { index: 4, layout: struct([u32("instruction")]) },
    WithdrawNonceAccount: { index: 5, layout: struct([u32("instruction"), ns64("lamports")]) },
    InitializeNonceAccount: {
      index: 6,
      layout: struct([u32("instruction"), publicKey("authorized")]),
    },
    AuthorizeNonceAccount: {
      index: 7,
      layout: struct([u32("instruction"), publicKey("authorized")]),
    },
    Allocate: { index: 8, layout: struct([u32("instruction"), ns64("space")]) },
    AllocateWithSeed: {
      index: 9,
      layout: struct([
        u32("instruction"),
        publicKey("base"),
        rustString("seed"),
        ns64("space"),
        publicKey("programId"),
      ]),
    },
    AssignWithSeed: {
      index: 10,
      layout: struct([
        u32("instruction"),
        publicKey("base"),
        rustString("seed"),
        publicKey("programId"),
      ]),
    },
  })
  var SystemProgram = (function () {
    function SystemProgram() {
      classCallCheck(this, SystemProgram)
    }
    createClass(SystemProgram, null, [
      {
        key: "createAccount",
        value: function createAccount(params) {
          var type = SYSTEM_INSTRUCTION_LAYOUTS.Create
          var data = encodeData(type, {
            lamports: params.lamports,
            space: params.space,
            programId: params.programId.toBuffer(),
          })
          return new Transaction().add({
            keys: [
              { pubkey: params.fromPubkey, isSigner: true, isWritable: true },
              { pubkey: params.newAccountPubkey, isSigner: true, isWritable: true },
            ],
            programId: this.programId,
            data: data,
          })
        },
      },
      {
        key: "transfer",
        value: function transfer(params) {
          var type = SYSTEM_INSTRUCTION_LAYOUTS.Transfer
          var data = encodeData(type, { lamports: params.lamports })
          return new Transaction().add({
            keys: [
              { pubkey: params.fromPubkey, isSigner: true, isWritable: true },
              { pubkey: params.toPubkey, isSigner: false, isWritable: true },
            ],
            programId: this.programId,
            data: data,
          })
        },
      },
      {
        key: "assign",
        value: function assign(params) {
          var data
          if (params.basePubkey) {
            var type = SYSTEM_INSTRUCTION_LAYOUTS.AssignWithSeed
            data = encodeData(type, {
              base: params.basePubkey.toBuffer(),
              seed: params.seed,
              programId: params.programId.toBuffer(),
            })
          } else {
            var _type = SYSTEM_INSTRUCTION_LAYOUTS.Assign
            data = encodeData(_type, { programId: params.programId.toBuffer() })
          }
          return new Transaction().add({
            keys: [{ pubkey: params.accountPubkey, isSigner: true, isWritable: true }],
            programId: this.programId,
            data: data,
          })
        },
      },
      {
        key: "createAccountWithSeed",
        value: function createAccountWithSeed(params) {
          var type = SYSTEM_INSTRUCTION_LAYOUTS.CreateWithSeed
          var data = encodeData(type, {
            base: params.basePubkey.toBuffer(),
            seed: params.seed,
            lamports: params.lamports,
            space: params.space,
            programId: params.programId.toBuffer(),
          })
          return new Transaction().add({
            keys: [
              { pubkey: params.fromPubkey, isSigner: true, isWritable: true },
              { pubkey: params.newAccountPubkey, isSigner: false, isWritable: true },
            ],
            programId: this.programId,
            data: data,
          })
        },
      },
      {
        key: "createNonceAccount",
        value: function createNonceAccount(params) {
          var transaction
          if (params.basePubkey && params.seed) {
            transaction = SystemProgram.createAccountWithSeed({
              fromPubkey: params.fromPubkey,
              newAccountPubkey: params.noncePubkey,
              basePubkey: params.basePubkey,
              seed: params.seed,
              lamports: params.lamports,
              space: NONCE_ACCOUNT_LENGTH,
              programId: this.programId,
            })
          } else {
            transaction = SystemProgram.createAccount({
              fromPubkey: params.fromPubkey,
              newAccountPubkey: params.noncePubkey,
              lamports: params.lamports,
              space: NONCE_ACCOUNT_LENGTH,
              programId: this.programId,
            })
          }
          var initParams = {
            noncePubkey: params.noncePubkey,
            authorizedPubkey: params.authorizedPubkey,
          }
          transaction.add(this.nonceInitialize(initParams))
          return transaction
        },
      },
      {
        key: "nonceInitialize",
        value: function nonceInitialize(params) {
          var type = SYSTEM_INSTRUCTION_LAYOUTS.InitializeNonceAccount
          var data = encodeData(type, { authorized: params.authorizedPubkey.toBuffer() })
          var instructionData = {
            keys: [
              { pubkey: params.noncePubkey, isSigner: false, isWritable: true },
              { pubkey: SYSVAR_RECENT_BLOCKHASHES_PUBKEY, isSigner: false, isWritable: false },
              { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
            ],
            programId: this.programId,
            data: data,
          }
          return new TransactionInstruction(instructionData)
        },
      },
      {
        key: "nonceAdvance",
        value: function nonceAdvance(params) {
          var type = SYSTEM_INSTRUCTION_LAYOUTS.AdvanceNonceAccount
          var data = encodeData(type)
          var instructionData = {
            keys: [
              { pubkey: params.noncePubkey, isSigner: false, isWritable: true },
              { pubkey: SYSVAR_RECENT_BLOCKHASHES_PUBKEY, isSigner: false, isWritable: false },
              { pubkey: params.authorizedPubkey, isSigner: true, isWritable: false },
            ],
            programId: this.programId,
            data: data,
          }
          return new TransactionInstruction(instructionData)
        },
      },
      {
        key: "nonceWithdraw",
        value: function nonceWithdraw(params) {
          var type = SYSTEM_INSTRUCTION_LAYOUTS.WithdrawNonceAccount
          var data = encodeData(type, { lamports: params.lamports })
          return new Transaction().add({
            keys: [
              { pubkey: params.noncePubkey, isSigner: false, isWritable: true },
              { pubkey: params.toPubkey, isSigner: false, isWritable: true },
              { pubkey: SYSVAR_RECENT_BLOCKHASHES_PUBKEY, isSigner: false, isWritable: false },
              { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
              { pubkey: params.authorizedPubkey, isSigner: true, isWritable: false },
            ],
            programId: this.programId,
            data: data,
          })
        },
      },
      {
        key: "nonceAuthorize",
        value: function nonceAuthorize(params) {
          var type = SYSTEM_INSTRUCTION_LAYOUTS.AuthorizeNonceAccount
          var data = encodeData(type, { authorized: params.newAuthorizedPubkey.toBuffer() })
          return new Transaction().add({
            keys: [
              { pubkey: params.noncePubkey, isSigner: false, isWritable: true },
              { pubkey: params.authorizedPubkey, isSigner: true, isWritable: false },
            ],
            programId: this.programId,
            data: data,
          })
        },
      },
      {
        key: "allocate",
        value: function allocate(params) {
          var data
          if (params.basePubkey) {
            var type = SYSTEM_INSTRUCTION_LAYOUTS.AllocateWithSeed
            data = encodeData(type, {
              base: params.basePubkey.toBuffer(),
              seed: params.seed,
              space: params.space,
              programId: params.programId.toBuffer(),
            })
          } else {
            var _type2 = SYSTEM_INSTRUCTION_LAYOUTS.Allocate
            data = encodeData(_type2, { space: params.space })
          }
          return new Transaction().add({
            keys: [{ pubkey: params.accountPubkey, isSigner: true, isWritable: true }],
            programId: this.programId,
            data: data,
          })
        },
      },
      {
        key: "programId",
        get: function get() {
          return new PublicKey("11111111111111111111111111111111")
        },
      },
    ])
    return SystemProgram
  })()
  var Loader = (function () {
    function Loader() {
      classCallCheck(this, Loader)
    }
    createClass(Loader, null, [
      {
        key: "getMinNumSignatures",
        value: function getMinNumSignatures(dataLength) {
          return Math.ceil(dataLength / Loader.chunkSize)
        },
      },
      {
        key: "load",
        value: (function () {
          var _load = asyncToGenerator(
            regenerator.mark(function _callee(connection, payer, program, programId, data) {
              var balanceNeeded,
                transaction,
                dataLayout,
                chunkSize,
                offset$1,
                array,
                transactions,
                bytes,
                _data,
                _transaction,
                _dataLayout,
                _data2,
                _transaction2
              return regenerator.wrap(function _callee$(_context) {
                while (1) {
                  switch ((_context.prev = _context.next)) {
                    case 0:
                      _context.next = 2
                      return connection.getMinimumBalanceForRentExemption(data.length)
                    case 2:
                      balanceNeeded = _context.sent
                      transaction = SystemProgram.createAccount({
                        fromPubkey: payer.publicKey,
                        newAccountPubkey: program.publicKey,
                        lamports: balanceNeeded > 0 ? balanceNeeded : 1,
                        space: data.length,
                        programId: programId,
                      })
                      _context.next = 6
                      return sendAndConfirmTransaction(connection, transaction, [payer, program], {
                        confirmations: 1,
                        skipPreflight: true,
                      })
                    case 6:
                      dataLayout = struct([
                        u32("instruction"),
                        u32("offset"),
                        u32("bytesLength"),
                        u32("bytesLengthPadding"),
                        seq(u8("byte"), offset(u32(), -8), "bytes"),
                      ])
                      chunkSize = Loader.chunkSize
                      offset$1 = 0
                      array = data
                      transactions = []
                    case 11:
                      if (!(array.length > 0)) {
                        _context.next = 27
                        break
                      }
                      bytes = array.slice(0, chunkSize)
                      _data = Buffer.alloc(chunkSize + 16)
                      dataLayout.encode({ instruction: 0, offset: offset$1, bytes: bytes }, _data)
                      _transaction = new Transaction().add({
                        keys: [{ pubkey: program.publicKey, isSigner: true, isWritable: true }],
                        programId: programId,
                        data: _data,
                      })
                      transactions.push(
                        sendAndConfirmTransaction(connection, _transaction, [payer, program], {
                          confirmations: 1,
                          skipPreflight: true,
                        })
                      )
                      _context.next = 19
                      return sleep(1e3 / NUM_TICKS_PER_SECOND)
                    case 19:
                      if (!(transactions.length === 8)) {
                        _context.next = 23
                        break
                      }
                      _context.next = 22
                      return Promise.all(transactions)
                    case 22:
                      transactions = []
                    case 23:
                      offset$1 += chunkSize
                      array = array.slice(chunkSize)
                      _context.next = 11
                      break
                    case 27:
                      _context.next = 29
                      return Promise.all(transactions)
                    case 29:
                      _dataLayout = struct([u32("instruction")])
                      _data2 = Buffer.alloc(_dataLayout.span)
                      _dataLayout.encode({ instruction: 1 }, _data2)
                      _transaction2 = new Transaction().add({
                        keys: [
                          { pubkey: program.publicKey, isSigner: true, isWritable: true },
                          { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
                        ],
                        programId: programId,
                        data: _data2,
                      })
                      _context.next = 35
                      return sendAndConfirmTransaction(
                        connection,
                        _transaction2,
                        [payer, program],
                        { confirmations: 1, skipPreflight: true }
                      )
                    case 35:
                    case "end":
                      return _context.stop()
                  }
                }
              }, _callee)
            })
          )
          function load(_x, _x2, _x3, _x4, _x5) {
            return _load.apply(this, arguments)
          }
          return load
        })(),
      },
      {
        key: "chunkSize",
        get: function get() {
          return PACKET_DATA_SIZE - 300
        },
      },
    ])
    return Loader
  })()
  var BpfLoader = (function () {
    function BpfLoader() {
      classCallCheck(this, BpfLoader)
    }
    createClass(BpfLoader, null, [
      {
        key: "getMinNumSignatures",
        value: function getMinNumSignatures(dataLength) {
          return Loader.getMinNumSignatures(dataLength)
        },
      },
      {
        key: "load",
        value: function load(connection, payer, program, elf) {
          return Loader.load(connection, payer, program, BpfLoader.programId, elf)
        },
      },
      {
        key: "programId",
        get: function get() {
          return new PublicKey("BPFLoader1111111111111111111111111111111111")
        },
      },
    ])
    return BpfLoader
  })()
  function _createForOfIteratorHelper$2(o, allowArrayLike) {
    var it
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (
        Array.isArray(o) ||
        (it = _unsupportedIterableToArray$4(o)) ||
        (allowArrayLike && o && typeof o.length === "number")
      ) {
        if (it) o = it
        var i = 0
        var F = function F() {}
        return {
          s: F,
          n: function n() {
            if (i >= o.length) return { done: true }
            return { done: false, value: o[i++] }
          },
          e: function e(_e) {
            throw _e
          },
          f: F,
        }
      }
      throw new TypeError(
        "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
      )
    }
    var normalCompletion = true,
      didErr = false,
      err
    return {
      s: function s() {
        it = o[Symbol.iterator]()
      },
      n: function n() {
        var step = it.next()
        normalCompletion = step.done
        return step
      },
      e: function e(_e2) {
        didErr = true
        err = _e2
      },
      f: function f() {
        try {
          if (!normalCompletion && it["return"] != null) it["return"]()
        } finally {
          if (didErr) throw err
        }
      },
    }
  }
  function _unsupportedIterableToArray$4(o, minLen) {
    if (!o) return
    if (typeof o === "string") return _arrayLikeToArray$4(o, minLen)
    var n = Object.prototype.toString.call(o).slice(8, -1)
    if (n === "Object" && o.constructor) n = o.constructor.name
    if (n === "Map" || n === "Set") return Array.from(o)
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray$4(o, minLen)
  }
  function _arrayLikeToArray$4(arr, len) {
    if (len == null || len > arr.length) len = arr.length
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i]
    }
    return arr2
  }
  function serializePayment(payment) {
    var toData = payment.to.toBuffer()
    var data = Buffer.alloc(8 + toData.length)
    data.writeUInt32LE(payment.amount, 0)
    toData.copy(data, 8)
    return data
  }
  function serializeDate(when) {
    var data = Buffer.alloc(8 + 20)
    data.writeUInt32LE(20, 0)
    function iso(date) {
      function pad(number) {
        if (number < 10) {
          return "0" + number
        }
        return number
      }
      return (
        date.getUTCFullYear() +
        "-" +
        pad(date.getUTCMonth() + 1) +
        "-" +
        pad(date.getUTCDate()) +
        "T" +
        pad(date.getUTCHours()) +
        ":" +
        pad(date.getUTCMinutes()) +
        ":" +
        pad(date.getUTCSeconds()) +
        "Z"
      )
    }
    data.write(iso(when), 8)
    return data
  }
  function serializeCondition(condition) {
    switch (condition.type) {
      case "timestamp": {
        var date = serializeDate(condition.when)
        var from = condition.from.toBuffer()
        var data = Buffer.alloc(4 + date.length + from.length)
        data.writeUInt32LE(0, 0)
        date.copy(data, 4)
        from.copy(data, 4 + date.length)
        return data
      }
      case "signature": {
        var _from = condition.from.toBuffer()
        var _data = Buffer.alloc(4 + _from.length)
        _data.writeUInt32LE(1, 0)
        _from.copy(_data, 4)
        return _data
      }
      default:
        throw new Error("Unknown condition type: ".concat(condition.type))
    }
  }
  var BudgetProgram = (function () {
    function BudgetProgram() {
      classCallCheck(this, BudgetProgram)
    }
    createClass(BudgetProgram, null, [
      {
        key: "timestampCondition",
        value: function timestampCondition(from, when) {
          return { type: "timestamp", from: from, when: when }
        },
      },
      {
        key: "signatureCondition",
        value: function signatureCondition(from) {
          return { type: "signature", from: from }
        },
      },
      {
        key: "pay",
        value: function pay(from, program, to, amount) {
          var data = Buffer.alloc(1024)
          var pos = 0
          data.writeUInt32LE(0, pos)
          pos += 4
          for (
            var _len = arguments.length, conditions = new Array(_len > 4 ? _len - 4 : 0), _key = 4;
            _key < _len;
            _key++
          ) {
            conditions[_key - 4] = arguments[_key]
          }
          switch (conditions.length) {
            case 0: {
              data.writeUInt32LE(0, pos)
              pos += 4
              {
                var payment = serializePayment({ amount: amount, to: to })
                payment.copy(data, pos)
                pos += payment.length
              }
              var trimmedData = data.slice(0, pos)
              var transaction = SystemProgram.createAccount({
                fromPubkey: from,
                newAccountPubkey: program,
                lamports: amount,
                space: trimmedData.length,
                programId: this.programId,
              })
              return transaction.add({
                keys: [
                  { pubkey: to, isSigner: false, isWritable: true },
                  { pubkey: program, isSigner: false, isWritable: true },
                ],
                programId: this.programId,
                data: trimmedData,
              })
            }
            case 1: {
              data.writeUInt32LE(1, pos)
              pos += 4
              {
                var condition = conditions[0]
                var conditionData = serializeCondition(condition)
                conditionData.copy(data, pos)
                pos += conditionData.length
                data.writeUInt32LE(0, pos)
                pos += 4
                var paymentData = serializePayment({ amount: amount, to: to })
                paymentData.copy(data, pos)
                pos += paymentData.length
              }
              var _trimmedData = data.slice(0, pos)
              var _transaction = SystemProgram.createAccount({
                fromPubkey: from,
                newAccountPubkey: program,
                lamports: amount,
                space: _trimmedData.length,
                programId: this.programId,
              })
              return _transaction.add({
                keys: [{ pubkey: program, isSigner: false, isWritable: true }],
                programId: this.programId,
                data: _trimmedData,
              })
            }
            case 2: {
              data.writeUInt32LE(2, pos)
              pos += 4
              var _iterator = _createForOfIteratorHelper$2(conditions),
                _step
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                  var _condition = _step.value
                  var _conditionData = serializeCondition(_condition)
                  _conditionData.copy(data, pos)
                  pos += _conditionData.length
                  data.writeUInt32LE(0, pos)
                  pos += 4
                  var _paymentData = serializePayment({ amount: amount, to: to })
                  _paymentData.copy(data, pos)
                  pos += _paymentData.length
                }
              } catch (err) {
                _iterator.e(err)
              } finally {
                _iterator.f()
              }
              var _trimmedData2 = data.slice(0, pos)
              var _transaction2 = SystemProgram.createAccount({
                fromPubkey: from,
                newAccountPubkey: program,
                lamports: amount,
                space: _trimmedData2.length,
                programId: this.programId,
              })
              return _transaction2.add({
                keys: [{ pubkey: program, isSigner: false, isWritable: true }],
                programId: this.programId,
                data: _trimmedData2,
              })
            }
            default:
              throw new Error(
                "A maximum of two conditions are supported: ".concat(conditions.length, " provided")
              )
          }
        },
      },
      {
        key: "payOnBoth",
        value: function payOnBoth(from, program, to, amount, condition1, condition2) {
          var data = Buffer.alloc(1024)
          var pos = 0
          data.writeUInt32LE(0, pos)
          pos += 4
          data.writeUInt32LE(3, pos)
          pos += 4
          for (var _i = 0, _arr = [condition1, condition2]; _i < _arr.length; _i++) {
            var condition = _arr[_i]
            var conditionData = serializeCondition(condition)
            conditionData.copy(data, pos)
            pos += conditionData.length
          }
          data.writeUInt32LE(0, pos)
          pos += 4
          var paymentData = serializePayment({ amount: amount, to: to })
          paymentData.copy(data, pos)
          pos += paymentData.length
          var trimmedData = data.slice(0, pos)
          var transaction = SystemProgram.createAccount({
            fromPubkey: from,
            newAccountPubkey: program,
            lamports: amount,
            space: trimmedData.length,
            programId: this.programId,
          })
          return transaction.add({
            keys: [{ pubkey: program, isSigner: false, isWritable: true }],
            programId: this.programId,
            data: trimmedData,
          })
        },
      },
      {
        key: "applyTimestamp",
        value: function applyTimestamp(from, program, to, when) {
          var whenData = serializeDate(when)
          var data = Buffer.alloc(4 + whenData.length)
          data.writeUInt32LE(1, 0)
          whenData.copy(data, 4)
          return new Transaction().add({
            keys: [
              { pubkey: from, isSigner: true, isWritable: true },
              { pubkey: program, isSigner: false, isWritable: true },
              { pubkey: to, isSigner: false, isWritable: true },
            ],
            programId: this.programId,
            data: data,
          })
        },
      },
      {
        key: "applySignature",
        value: function applySignature(from, program, to) {
          var dataLayout = struct([u32("instruction")])
          var data = Buffer.alloc(dataLayout.span)
          dataLayout.encode({ instruction: 2 }, data)
          return new Transaction().add({
            keys: [
              { pubkey: from, isSigner: true, isWritable: true },
              { pubkey: program, isSigner: false, isWritable: true },
              { pubkey: to, isSigner: false, isWritable: true },
            ],
            programId: this.programId,
            data: data,
          })
        },
      },
      {
        key: "programId",
        get: function get() {
          return new PublicKey("Budget1111111111111111111111111111111111111")
        },
      },
      {
        key: "space",
        get: function get() {
          return 128
        },
      },
    ])
    return BudgetProgram
  })()
  var STAKE_CONFIG_ID = new PublicKey("StakeConfig11111111111111111111111111111111")
  var Authorized = function Authorized(staker, withdrawer) {
    classCallCheck(this, Authorized)
    defineProperty(this, "staker", void 0)
    defineProperty(this, "withdrawer", void 0)
    this.staker = staker
    this.withdrawer = withdrawer
  }
  var Lockup = function Lockup(unixTimestamp, epoch, custodian) {
    classCallCheck(this, Lockup)
    defineProperty(this, "unixTimestamp", void 0)
    defineProperty(this, "epoch", void 0)
    defineProperty(this, "custodian", void 0)
    this.unixTimestamp = unixTimestamp
    this.epoch = epoch
    this.custodian = custodian
  }
  var StakeInstruction = (function () {
    function StakeInstruction() {
      classCallCheck(this, StakeInstruction)
    }
    createClass(StakeInstruction, null, [
      {
        key: "decodeInstructionType",
        value: function decodeInstructionType(instruction) {
          this.checkProgramId(instruction.programId)
          var instructionTypeLayout = u32("instruction")
          var typeIndex = instructionTypeLayout.decode(instruction.data)
          var type
          for (
            var _i = 0, _Object$keys = Object.keys(STAKE_INSTRUCTION_LAYOUTS);
            _i < _Object$keys.length;
            _i++
          ) {
            var t = _Object$keys[_i]
            if (STAKE_INSTRUCTION_LAYOUTS[t].index == typeIndex) {
              type = t
            }
          }
          if (!type) {
            throw new Error("Instruction type incorrect; not a StakeInstruction")
          }
          return type
        },
      },
      {
        key: "decodeInitialize",
        value: function decodeInitialize(instruction) {
          this.checkProgramId(instruction.programId)
          this.checkKeyLength(instruction.keys, 2)
          var _decodeData = decodeData(STAKE_INSTRUCTION_LAYOUTS.Initialize, instruction.data),
            authorized = _decodeData.authorized,
            lockup = _decodeData.lockup
          return {
            stakePubkey: instruction.keys[0].pubkey,
            authorized: new Authorized(
              new PublicKey(authorized.staker),
              new PublicKey(authorized.withdrawer)
            ),
            lockup: new Lockup(lockup.unixTimestamp, lockup.epoch, new PublicKey(lockup.custodian)),
          }
        },
      },
      {
        key: "decodeDelegate",
        value: function decodeDelegate(instruction) {
          this.checkProgramId(instruction.programId)
          this.checkKeyLength(instruction.keys, 6)
          decodeData(STAKE_INSTRUCTION_LAYOUTS.Delegate, instruction.data)
          return {
            stakePubkey: instruction.keys[0].pubkey,
            votePubkey: instruction.keys[1].pubkey,
            authorizedPubkey: instruction.keys[5].pubkey,
          }
        },
      },
      {
        key: "decodeAuthorize",
        value: function decodeAuthorize(instruction) {
          this.checkProgramId(instruction.programId)
          this.checkKeyLength(instruction.keys, 3)
          var _decodeData2 = decodeData(STAKE_INSTRUCTION_LAYOUTS.Authorize, instruction.data),
            newAuthorized = _decodeData2.newAuthorized,
            stakeAuthorizationType = _decodeData2.stakeAuthorizationType
          return {
            stakePubkey: instruction.keys[0].pubkey,
            authorizedPubkey: instruction.keys[2].pubkey,
            newAuthorizedPubkey: new PublicKey(newAuthorized),
            stakeAuthorizationType: { index: stakeAuthorizationType },
          }
        },
      },
      {
        key: "decodeSplit",
        value: function decodeSplit(instruction) {
          this.checkProgramId(instruction.programId)
          this.checkKeyLength(instruction.keys, 3)
          var _decodeData3 = decodeData(STAKE_INSTRUCTION_LAYOUTS.Split, instruction.data),
            lamports = _decodeData3.lamports
          return {
            stakePubkey: instruction.keys[0].pubkey,
            splitStakePubkey: instruction.keys[1].pubkey,
            authorizedPubkey: instruction.keys[2].pubkey,
            lamports: lamports,
          }
        },
      },
      {
        key: "decodeWithdraw",
        value: function decodeWithdraw(instruction) {
          this.checkProgramId(instruction.programId)
          this.checkKeyLength(instruction.keys, 5)
          var _decodeData4 = decodeData(STAKE_INSTRUCTION_LAYOUTS.Withdraw, instruction.data),
            lamports = _decodeData4.lamports
          return {
            stakePubkey: instruction.keys[0].pubkey,
            toPubkey: instruction.keys[1].pubkey,
            authorizedPubkey: instruction.keys[4].pubkey,
            lamports: lamports,
          }
        },
      },
      {
        key: "decodeDeactivate",
        value: function decodeDeactivate(instruction) {
          this.checkProgramId(instruction.programId)
          this.checkKeyLength(instruction.keys, 3)
          decodeData(STAKE_INSTRUCTION_LAYOUTS.Deactivate, instruction.data)
          return {
            stakePubkey: instruction.keys[0].pubkey,
            authorizedPubkey: instruction.keys[2].pubkey,
          }
        },
      },
      {
        key: "checkProgramId",
        value: function checkProgramId(programId) {
          if (!programId.equals(StakeProgram.programId)) {
            throw new Error("invalid instruction; programId is not StakeProgram")
          }
        },
      },
      {
        key: "checkKeyLength",
        value: function checkKeyLength(keys, expectedLength) {
          if (keys.length < expectedLength) {
            throw new Error(
              "invalid instruction; found "
                .concat(keys.length, " keys, expected at least ")
                .concat(expectedLength)
            )
          }
        },
      },
    ])
    return StakeInstruction
  })()
  var STAKE_INSTRUCTION_LAYOUTS = Object.freeze({
    Initialize: { index: 0, layout: struct([u32("instruction"), authorized(), lockup()]) },
    Authorize: {
      index: 1,
      layout: struct([
        u32("instruction"),
        publicKey("newAuthorized"),
        u32("stakeAuthorizationType"),
      ]),
    },
    Delegate: { index: 2, layout: struct([u32("instruction")]) },
    Split: { index: 3, layout: struct([u32("instruction"), ns64("lamports")]) },
    Withdraw: { index: 4, layout: struct([u32("instruction"), ns64("lamports")]) },
    Deactivate: { index: 5, layout: struct([u32("instruction")]) },
  })
  var StakeAuthorizationLayout = Object.freeze({ Staker: { index: 0 }, Withdrawer: { index: 1 } })
  var StakeProgram = (function () {
    function StakeProgram() {
      classCallCheck(this, StakeProgram)
    }
    createClass(StakeProgram, null, [
      {
        key: "initialize",
        value: function initialize(params) {
          var stakePubkey = params.stakePubkey,
            authorized = params.authorized,
            lockup = params.lockup
          var type = STAKE_INSTRUCTION_LAYOUTS.Initialize
          var data = encodeData(type, {
            authorized: {
              staker: authorized.staker.toBuffer(),
              withdrawer: authorized.withdrawer.toBuffer(),
            },
            lockup: {
              unixTimestamp: lockup.unixTimestamp,
              epoch: lockup.epoch,
              custodian: lockup.custodian.toBuffer(),
            },
          })
          var instructionData = {
            keys: [
              { pubkey: stakePubkey, isSigner: false, isWritable: true },
              { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
            ],
            programId: this.programId,
            data: data,
          }
          return new TransactionInstruction(instructionData)
        },
      },
      {
        key: "createAccountWithSeed",
        value: function createAccountWithSeed(params) {
          var transaction = SystemProgram.createAccountWithSeed({
            fromPubkey: params.fromPubkey,
            newAccountPubkey: params.stakePubkey,
            basePubkey: params.basePubkey,
            seed: params.seed,
            lamports: params.lamports,
            space: this.space,
            programId: this.programId,
          })
          var stakePubkey = params.stakePubkey,
            authorized = params.authorized,
            lockup = params.lockup
          return transaction.add(
            this.initialize({ stakePubkey: stakePubkey, authorized: authorized, lockup: lockup })
          )
        },
      },
      {
        key: "createAccount",
        value: function createAccount(params) {
          var transaction = SystemProgram.createAccount({
            fromPubkey: params.fromPubkey,
            newAccountPubkey: params.stakePubkey,
            lamports: params.lamports,
            space: this.space,
            programId: this.programId,
          })
          var stakePubkey = params.stakePubkey,
            authorized = params.authorized,
            lockup = params.lockup
          return transaction.add(
            this.initialize({ stakePubkey: stakePubkey, authorized: authorized, lockup: lockup })
          )
        },
      },
      {
        key: "delegate",
        value: function delegate(params) {
          var stakePubkey = params.stakePubkey,
            authorizedPubkey = params.authorizedPubkey,
            votePubkey = params.votePubkey
          var type = STAKE_INSTRUCTION_LAYOUTS.Delegate
          var data = encodeData(type)
          return new Transaction().add({
            keys: [
              { pubkey: stakePubkey, isSigner: false, isWritable: true },
              { pubkey: votePubkey, isSigner: false, isWritable: false },
              { pubkey: SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false },
              { pubkey: SYSVAR_STAKE_HISTORY_PUBKEY, isSigner: false, isWritable: false },
              { pubkey: STAKE_CONFIG_ID, isSigner: false, isWritable: false },
              { pubkey: authorizedPubkey, isSigner: true, isWritable: false },
            ],
            programId: this.programId,
            data: data,
          })
        },
      },
      {
        key: "authorize",
        value: function authorize(params) {
          var stakePubkey = params.stakePubkey,
            authorizedPubkey = params.authorizedPubkey,
            newAuthorizedPubkey = params.newAuthorizedPubkey,
            stakeAuthorizationType = params.stakeAuthorizationType
          var type = STAKE_INSTRUCTION_LAYOUTS.Authorize
          var data = encodeData(type, {
            newAuthorized: newAuthorizedPubkey.toBuffer(),
            stakeAuthorizationType: stakeAuthorizationType.index,
          })
          return new Transaction().add({
            keys: [
              { pubkey: stakePubkey, isSigner: false, isWritable: true },
              { pubkey: SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: true },
              { pubkey: authorizedPubkey, isSigner: true, isWritable: false },
            ],
            programId: this.programId,
            data: data,
          })
        },
      },
      {
        key: "split",
        value: function split(params) {
          var stakePubkey = params.stakePubkey,
            authorizedPubkey = params.authorizedPubkey,
            splitStakePubkey = params.splitStakePubkey,
            lamports = params.lamports
          var transaction = SystemProgram.createAccount({
            fromPubkey: authorizedPubkey,
            newAccountPubkey: splitStakePubkey,
            lamports: 0,
            space: this.space,
            programId: this.programId,
          })
          var type = STAKE_INSTRUCTION_LAYOUTS.Split
          var data = encodeData(type, { lamports: lamports })
          return transaction.add({
            keys: [
              { pubkey: stakePubkey, isSigner: false, isWritable: true },
              { pubkey: splitStakePubkey, isSigner: false, isWritable: true },
              { pubkey: authorizedPubkey, isSigner: true, isWritable: false },
            ],
            programId: this.programId,
            data: data,
          })
        },
      },
      {
        key: "withdraw",
        value: function withdraw(params) {
          var stakePubkey = params.stakePubkey,
            authorizedPubkey = params.authorizedPubkey,
            toPubkey = params.toPubkey,
            lamports = params.lamports
          var type = STAKE_INSTRUCTION_LAYOUTS.Withdraw
          var data = encodeData(type, { lamports: lamports })
          return new Transaction().add({
            keys: [
              { pubkey: stakePubkey, isSigner: false, isWritable: true },
              { pubkey: toPubkey, isSigner: false, isWritable: true },
              { pubkey: SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false },
              { pubkey: SYSVAR_STAKE_HISTORY_PUBKEY, isSigner: false, isWritable: false },
              { pubkey: authorizedPubkey, isSigner: true, isWritable: false },
            ],
            programId: this.programId,
            data: data,
          })
        },
      },
      {
        key: "deactivate",
        value: function deactivate(params) {
          var stakePubkey = params.stakePubkey,
            authorizedPubkey = params.authorizedPubkey
          var type = STAKE_INSTRUCTION_LAYOUTS.Deactivate
          var data = encodeData(type)
          return new Transaction().add({
            keys: [
              { pubkey: stakePubkey, isSigner: false, isWritable: true },
              { pubkey: SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false },
              { pubkey: authorizedPubkey, isSigner: true, isWritable: false },
            ],
            programId: this.programId,
            data: data,
          })
        },
      },
      {
        key: "programId",
        get: function get() {
          return new PublicKey("Stake11111111111111111111111111111111111111")
        },
      },
      {
        key: "space",
        get: function get() {
          return 4008
        },
      },
    ])
    return StakeProgram
  })()
  var VALIDATOR_INFO_KEY = new PublicKey("Va1idator1nfo111111111111111111111111111111")
  var InfoString = struct$1({
    name: "string",
    website: "string?",
    details: "string?",
    keybaseUsername: "string?",
  })
  var ValidatorInfo = (function () {
    function ValidatorInfo(key, info) {
      classCallCheck(this, ValidatorInfo)
      defineProperty(this, "key", void 0)
      defineProperty(this, "info", void 0)
      this.key = key
      this.info = info
    }
    createClass(ValidatorInfo, null, [
      {
        key: "fromConfigData",
        value: function fromConfigData(buffer) {
          var PUBKEY_LENGTH = 32
          var byteArray = toConsumableArray(buffer)
          var configKeyCount = decodeLength(byteArray)
          if (configKeyCount !== 2) return null
          var configKeys = []
          for (var i = 0; i < 2; i++) {
            var publicKey = new PublicKey(byteArray.slice(0, PUBKEY_LENGTH))
            byteArray = byteArray.slice(PUBKEY_LENGTH)
            var isSigner = byteArray.slice(0, 1)[0] === 1
            byteArray = byteArray.slice(1)
            configKeys.push({ publicKey: publicKey, isSigner: isSigner })
          }
          if (configKeys[0].publicKey.equals(VALIDATOR_INFO_KEY)) {
            if (configKeys[1].isSigner) {
              var rawInfo = rustString().decode(Buffer.from(byteArray))
              var info = InfoString(JSON.parse(rawInfo))
              return new ValidatorInfo(configKeys[1].publicKey, info)
            }
          }
          return null
        },
      },
    ])
    return ValidatorInfo
  })()
  var VOTE_PROGRAM_ID = new PublicKey("Vote111111111111111111111111111111111111111")
  var VoteAccountLayout = struct([
    publicKey("nodePubkey"),
    publicKey("authorizedVoterPubkey"),
    publicKey("authorizedWithdrawerPubkey"),
    u8("commission"),
    nu64(),
    seq(struct([nu64("slot"), u32("confirmationCount")]), offset(u32(), -8), "votes"),
    u8("rootSlotValid"),
    nu64("rootSlot"),
    nu64("epoch"),
    nu64("credits"),
    nu64("lastEpochCredits"),
    nu64(),
    seq(
      struct([nu64("epoch"), nu64("credits"), nu64("prevCredits")]),
      offset(u32(), -8),
      "epochCredits"
    ),
  ])
  var VoteAccount = (function () {
    function VoteAccount() {
      classCallCheck(this, VoteAccount)
      defineProperty(this, "nodePubkey", void 0)
      defineProperty(this, "authorizedVoterPubkey", void 0)
      defineProperty(this, "authorizedWithdrawerPubkey", void 0)
      defineProperty(this, "commission", void 0)
      defineProperty(this, "votes", void 0)
      defineProperty(this, "rootSlot", void 0)
      defineProperty(this, "epoch", void 0)
      defineProperty(this, "credits", void 0)
      defineProperty(this, "lastEpochCredits", void 0)
      defineProperty(this, "epochCredits", void 0)
    }
    createClass(VoteAccount, null, [
      {
        key: "fromAccountData",
        value: function fromAccountData(buffer) {
          var va = VoteAccountLayout.decode(toBuffer(buffer), 0)
          va.nodePubkey = new PublicKey(va.nodePubkey)
          va.authorizedVoterPubkey = new PublicKey(va.authorizedVoterPubkey)
          va.authorizedWithdrawerPubkey = new PublicKey(va.authorizedWithdrawerPubkey)
          if (!va.rootSlotValid) {
            va.rootSlot = null
          }
          return va
        },
      },
    ])
    return VoteAccount
  })()
  function sendAndConfirmRawTransaction(_x, _x2, _x3) {
    return _sendAndConfirmRawTransaction.apply(this, arguments)
  }
  function _sendAndConfirmRawTransaction() {
    _sendAndConfirmRawTransaction = asyncToGenerator(
      regenerator.mark(function _callee(connection, rawTransaction, options) {
        var start, signature, status, duration
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                start = Date.now()
                _context.next = 3
                return connection.sendRawTransaction(rawTransaction, options)
              case 3:
                signature = _context.sent
                _context.next = 6
                return connection.confirmTransaction(signature, options && options.confirmations)
              case 6:
                status = _context.sent.value
                if (!status) {
                  _context.next = 11
                  break
                }
                if (!status.err) {
                  _context.next = 10
                  break
                }
                throw new Error(
                  "Raw transaction "
                    .concat(signature, " failed (")
                    .concat(JSON.stringify(status), ")")
                )
              case 10:
                return _context.abrupt("return", signature)
              case 11:
                duration = (Date.now() - start) / 1e3
                throw new Error(
                  "Raw transaction '"
                    .concat(signature, "' was not confirmed in ")
                    .concat(duration.toFixed(2), " seconds")
                )
              case 13:
              case "end":
                return _context.stop()
            }
          }
        }, _callee)
      })
    )
    return _sendAndConfirmRawTransaction.apply(this, arguments)
  }
  var endpoint = {
    http: {
      devnet: "http://devnet.solana.com",
      testnet: "http://testnet.solana.com",
      "mainnet-beta": "http://api.mainnet-beta.solana.com",
    },
    https: {
      devnet: "https://devnet.solana.com",
      testnet: "https://testnet.solana.com",
      "mainnet-beta": "https://api.mainnet-beta.solana.com",
    },
  }
  function clusterApiUrl(cluster, tls) {
    var key = tls === false ? "http" : "https"
    if (!cluster) {
      return endpoint[key]["devnet"]
    }
    var url = endpoint[key][cluster]
    if (!url) {
      throw new Error("Unknown ".concat(key, " cluster: ").concat(cluster))
    }
    return url
  }
  var LAMPORTS_PER_SOL = 1e9
  exports.Account = Account
  exports.Authorized = Authorized
  exports.BpfLoader = BpfLoader
  exports.BudgetProgram = BudgetProgram
  exports.Connection = Connection
  exports.LAMPORTS_PER_SOL = LAMPORTS_PER_SOL
  exports.Loader = Loader
  exports.Lockup = Lockup
  exports.Message = Message
  exports.NONCE_ACCOUNT_LENGTH = NONCE_ACCOUNT_LENGTH
  exports.NonceAccount = NonceAccount
  exports.PublicKey = PublicKey
  exports.STAKE_CONFIG_ID = STAKE_CONFIG_ID
  exports.STAKE_INSTRUCTION_LAYOUTS = STAKE_INSTRUCTION_LAYOUTS
  exports.SYSTEM_INSTRUCTION_LAYOUTS = SYSTEM_INSTRUCTION_LAYOUTS
  exports.SYSVAR_CLOCK_PUBKEY = SYSVAR_CLOCK_PUBKEY
  exports.SYSVAR_RENT_PUBKEY = SYSVAR_RENT_PUBKEY
  exports.SYSVAR_REWARDS_PUBKEY = SYSVAR_REWARDS_PUBKEY
  exports.SYSVAR_STAKE_HISTORY_PUBKEY = SYSVAR_STAKE_HISTORY_PUBKEY
  exports.StakeAuthorizationLayout = StakeAuthorizationLayout
  exports.StakeInstruction = StakeInstruction
  exports.StakeProgram = StakeProgram
  exports.SystemInstruction = SystemInstruction
  exports.SystemProgram = SystemProgram
  exports.Transaction = Transaction
  exports.TransactionInstruction = TransactionInstruction
  exports.VALIDATOR_INFO_KEY = VALIDATOR_INFO_KEY
  exports.VOTE_PROGRAM_ID = VOTE_PROGRAM_ID
  exports.ValidatorInfo = ValidatorInfo
  exports.VoteAccount = VoteAccount
  exports.clusterApiUrl = clusterApiUrl
  exports.sendAndConfirmRawTransaction = sendAndConfirmRawTransaction
  exports.sendAndConfirmTransaction = sendAndConfirmTransaction
  return exports
})({})
//# sourceMappingURL=index.iife.js.map
