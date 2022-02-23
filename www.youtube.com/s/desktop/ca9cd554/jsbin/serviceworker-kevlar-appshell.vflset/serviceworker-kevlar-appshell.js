/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
'use strict';
var q, aa = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
    if (a == Array.prototype || a == Object.prototype) return a;
    a[b] = c.value;
    return a
};

function ba(a) {
    a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
    for (var b = 0; b < a.length; ++b) {
        var c = a[b];
        if (c && c.Math == Math) return c
    }
    throw Error("Cannot find global object");
}
var ca = ba(this);

function da(a, b) {
    if (b) a: {
        var c = ca;a = a.split(".");
        for (var d = 0; d < a.length - 1; d++) {
            var e = a[d];
            if (!(e in c)) break a;
            c = c[e]
        }
        a = a[a.length - 1];d = c[a];b = b(d);b != d && null != b && aa(c, a, {
            configurable: !0,
            writable: !0,
            value: b
        })
    }
}

function ea(a) {
    function b(d) {
        return a.next(d)
    }

    function c(d) {
        return a.throw(d)
    }
    return new Promise(function(d, e) {
        function f(g) {
            g.done ? d(g.value) : Promise.resolve(g.value).then(b, c).then(f, e)
        }
        f(a.next())
    })
}

function t(a) {
    return ea(a())
}
da("Object.entries", function(a) {
    return a ? a : function(b) {
        var c = [],
            d;
        for (d in b) Object.prototype.hasOwnProperty.call(b, d) && c.push([d, b[d]]);
        return c
    }
});

function fa(a, b) {
    a instanceof String && (a += "");
    var c = 0,
        d = !1,
        e = {
            next: function() {
                if (!d && c < a.length) {
                    var f = c++;
                    return {
                        value: b(f, a[f]),
                        done: !1
                    }
                }
                d = !0;
                return {
                    done: !0,
                    value: void 0
                }
            }
        };
    e[Symbol.iterator] = function() {
        return e
    };
    return e
}
da("Array.prototype.values", function(a) {
    return a ? a : function() {
        return fa(this, function(b, c) {
            return c
        })
    }
});
da("Array.prototype.includes", function(a) {
    return a ? a : function(b, c) {
        var d = this;
        d instanceof String && (d = String(d));
        var e = d.length;
        c = c || 0;
        for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
            var f = d[c];
            if (f === b || Object.is(f, b)) return !0
        }
        return !1
    }
});
da("Object.values", function(a) {
    return a ? a : function(b) {
        var c = [],
            d;
        for (d in b) Object.prototype.hasOwnProperty.call(b, d) && c.push(b[d]);
        return c
    }
});
da("String.prototype.matchAll", function(a) {
    return a ? a : function(b) {
        if (b instanceof RegExp && !b.global) throw new TypeError("RegExp passed into String.prototype.matchAll() must have global tag.");
        var c = new RegExp(b, b instanceof RegExp ? void 0 : "g"),
            d = this,
            e = !1,
            f = {
                next: function() {
                    if (e) return {
                        value: void 0,
                        done: !0
                    };
                    var g = c.exec(d);
                    if (!g) return e = !0, {
                        value: void 0,
                        done: !0
                    };
                    "" === g[0] && (c.lastIndex += 1);
                    return {
                        value: g,
                        done: !1
                    }
                }
            };
        f[Symbol.iterator] = function() {
            return f
        };
        return f
    }
});
da("Promise.prototype.finally", function(a) {
    return a ? a : function(b) {
        return this.then(function(c) {
            return Promise.resolve(b()).then(function() {
                return c
            })
        }, function(c) {
            return Promise.resolve(b()).then(function() {
                throw c;
            })
        })
    }
});
var u = this || self;

function v(a, b) {
    a = a.split(".");
    b = b || u;
    for (var c = 0; c < a.length; c++)
        if (b = b[a[c]], null == b) return null;
    return b
}

function ha() {}

function ia(a, b, c) {
    return a.call.apply(a.bind, arguments)
}

function ja(a, b, c) {
    if (!a) throw Error();
    if (2 < arguments.length) {
        var d = Array.prototype.slice.call(arguments, 2);
        return function() {
            var e = Array.prototype.slice.call(arguments);
            Array.prototype.unshift.apply(e, d);
            return a.apply(b, e)
        }
    }
    return function() {
        return a.apply(b, arguments)
    }
}

function ka(a, b, c) {
    Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ka = ia : ka = ja;
    return ka.apply(null, arguments)
}

function w(a, b) {
    a = a.split(".");
    var c = u;
    a[0] in c || "undefined" == typeof c.execScript || c.execScript("var " + a[0]);
    for (var d; a.length && (d = a.shift());) a.length || void 0 === b ? c[d] && c[d] !== Object.prototype[d] ? c = c[d] : c = c[d] = {} : c[d] = b
}

function ma(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.Ea = b.prototype;
    a.prototype = new c;
    a.prototype.constructor = a;
    a.mb = function(d, e, f) {
        for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++) g[h - 2] = arguments[h];
        return b.prototype[e].apply(d, g)
    }
};

function na(a, b) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, na);
    else {
        const c = Error().stack;
        c && (this.stack = c)
    }
    a && (this.message = String(a));
    void 0 !== b && (this.qa = b)
}
ma(na, Error);
na.prototype.name = "CustomError";

function oa(a, b) {
    Array.prototype.forEach.call(a, b, void 0)
}

function pa(a, b) {
    return Array.prototype.map.call(a, b, void 0)
}

function qa(a, b) {
    for (let d = 1; d < arguments.length; d++) {
        const e = arguments[d];
        var c = typeof e;
        c = "object" != c ? c : e ? Array.isArray(e) ? "array" : c : "null";
        if ("array" == c || "object" == c && "number" == typeof e.length) {
            c = a.length || 0;
            const f = e.length || 0;
            a.length = c + f;
            for (let g = 0; g < f; g++) a[c + g] = e[g]
        } else a.push(e)
    }
};

function ra(a) {
    for (const b in a) return !1;
    return !0
}

function sa(a) {
    if (!a || "object" !== typeof a) return a;
    if ("function" === typeof a.clone) return a.clone();
    if ("undefined" !== typeof Map && a instanceof Map) return new Map(a);
    if ("undefined" !== typeof Set && a instanceof Set) return new Set(a);
    const b = Array.isArray(a) ? [] : "function" !== typeof ArrayBuffer || "function" !== typeof ArrayBuffer.isView || !ArrayBuffer.isView(a) || a instanceof DataView ? {} : new a.constructor(a.length);
    for (const c in a) b[c] = sa(a[c]);
    return b
}
const ta = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

function ua(a, b) {
    let c, d;
    for (let e = 1; e < arguments.length; e++) {
        d = arguments[e];
        for (c in d) a[c] = d[c];
        for (let f = 0; f < ta.length; f++) c = ta[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
};

function va() {}

function wa(a) {
    return new va(xa, a)
}
var xa = {};
wa("");
var ya = String.prototype.trim ? function(a) {
    return a.trim()
} : function(a) {
    return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]
};

function za() {
    var a = u.navigator;
    return a && (a = a.userAgent) ? a : ""
}

function y(a) {
    return -1 != za().indexOf(a)
};

function Aa() {
    return (y("Chrome") || y("CriOS")) && !y("Edge") || y("Silk")
};
var z = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");

function Ba(a) {
    return a ? decodeURI(a) : a
}

function Ca(a, b, c) {
    if (Array.isArray(b))
        for (var d = 0; d < b.length; d++) Ca(a, String(b[d]), c);
    else null != b && c.push(a + ("" === b ? "" : "=" + encodeURIComponent(String(b))))
}

function Da(a) {
    var b = [],
        c;
    for (c in a) Ca(c, a[c], b);
    return b.join("&")
};

function Ea(a, b) {
    return Error(`Invalid wire type: ${a} (at position ${b})`)
}

function Fa() {
    return Error("Failed to read varint, encoding is invalid.")
};

function Ga(a, b) {
    b = String.fromCharCode.apply(null, b);
    return null == a ? b : a + b
}
let Ha;
const Ia = "undefined" !== typeof TextDecoder;
!y("Android") || Aa();
Aa();
var Ja = y("Safari") && !(Aa() || y("Coast") || y("Opera") || y("Edge") || y("Edg/") || y("OPR") || y("Firefox") || y("FxiOS") || y("Silk") || y("Android")) && !(y("iPhone") && !y("iPod") && !y("iPad") || y("iPad") || y("iPod"));
var Ka = {},
    La = null;

function Ma(a, b) {
    void 0 === b && (b = 0);
    Na();
    b = Ka[b];
    const c = Array(Math.floor(a.length / 3)),
        d = b[64] || "";
    let e = 0,
        f = 0;
    for (; e < a.length - 2; e += 3) {
        var g = a[e],
            h = a[e + 1],
            k = a[e + 2],
            l = b[g >> 2];
        g = b[(g & 3) << 4 | h >> 4];
        h = b[(h & 15) << 2 | k >> 6];
        k = b[k & 63];
        c[f++] = "" + l + g + h + k
    }
    l = 0;
    k = d;
    switch (a.length - e) {
        case 2:
            l = a[e + 1], k = b[(l & 15) << 2] || d;
        case 1:
            a = a[e], c[f] = "" + b[a >> 2] + b[(a & 3) << 4 | l >> 4] + k + d
    }
    return c.join("")
}

function Oa(a) {
    var b = a.length,
        c = 3 * b / 4;
    c % 3 ? c = Math.floor(c) : -1 != "=.".indexOf(a[b - 1]) && (c = -1 != "=.".indexOf(a[b - 2]) ? c - 2 : c - 1);
    var d = new Uint8Array(c),
        e = 0;
    Pa(a, function(f) {
        d[e++] = f
    });
    return e !== c ? d.subarray(0, e) : d
}

function Pa(a, b) {
    function c(k) {
        for (; d < a.length;) {
            var l = a.charAt(d++),
                m = La[l];
            if (null != m) return m;
            if (!/^[\s\xa0]*$/.test(l)) throw Error("Unknown base64 encoding at char: " + l);
        }
        return k
    }
    Na();
    for (var d = 0;;) {
        var e = c(-1),
            f = c(0),
            g = c(64),
            h = c(64);
        if (64 === h && -1 === e) break;
        b(e << 2 | f >> 4);
        64 != g && (b(f << 4 & 240 | g >> 2), 64 != h && b(g << 6 & 192 | h))
    }
}

function Na() {
    if (!La) {
        La = {};
        for (var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), b = ["+/=", "+/", "-_=", "-_.", "-_"], c = 0; 5 > c; c++) {
            var d = a.concat(b[c].split(""));
            Ka[c] = d;
            for (var e = 0; e < d.length; e++) {
                var f = d[e];
                void 0 === La[f] && (La[f] = e)
            }
        }
    }
};
var Qa = "function" === typeof Uint8Array;

function Ra(a) {
    return Qa && null != a && a instanceof Uint8Array
}
let Sa;
var Ta = class {
    constructor(a) {
        this.h = a;
        if (null !== a && 0 === a.length) throw Error("ByteString should be constructed with non-empty values");
    }
    isEmpty() {
        return null == this.h
    }
};
const Ua = "function" === typeof Uint8Array.prototype.slice;

function Va(a, b) {
    if (a.constructor === Uint8Array) return a;
    if (a.constructor === ArrayBuffer) return new Uint8Array(a);
    if (a.constructor === Array) return new Uint8Array(a);
    if (a.constructor === String) return Oa(a);
    if (a.constructor === Ta) {
        if (!b && (b = a.h) && b.constructor === Uint8Array) return b;
        if (a.isEmpty()) a = Sa || (Sa = new Uint8Array(0));
        else {
            b = Uint8Array;
            var c = a.h;
            c = null == c || Ra(c) ? c : "string" === typeof c ? Oa(c) : null;
            a = new b(a.h = c)
        }
        return a
    }
    if (a instanceof Uint8Array) return new Uint8Array(a.buffer, a.byteOffset, a.byteLength);
    throw Error("Type not convertible to a Uint8Array, expected a Uint8Array, an ArrayBuffer, a base64 encoded string, or Array of numbers");
};

function Wa(a, b) {
    a.j = Va(b, a.J);
    a.l = 0;
    a.i = a.j.length;
    a.h = a.l
}

function Xa(a) {
    if (a.h > a.i) throw Error(`Tried to read past the end of the data ${a.h} > ${a.i}`);
}

function Ya(a) {
    const b = a.j;
    let c = b[a.h + 0],
        d = c & 127;
    if (128 > c) return a.h += 1, Xa(a), d;
    c = b[a.h + 1];
    d |= (c & 127) << 7;
    if (128 > c) return a.h += 2, Xa(a), d;
    c = b[a.h + 2];
    d |= (c & 127) << 14;
    if (128 > c) return a.h += 3, Xa(a), d;
    c = b[a.h + 3];
    d |= (c & 127) << 21;
    if (128 > c) return a.h += 4, Xa(a), d;
    c = b[a.h + 4];
    d |= (c & 15) << 28;
    if (128 > c) return a.h += 5, Xa(a), d >>> 0;
    a.h += 5;
    if (128 <= b[a.h++] && 128 <= b[a.h++] && 128 <= b[a.h++] && 128 <= b[a.h++] && 128 <= b[a.h++]) throw Fa();
    Xa(a);
    return d
}
var Za = class {
        constructor(a, {
            J: b = !1
        } = {}) {
            this.j = null;
            this.h = this.i = this.l = 0;
            this.J = b;
            a && Wa(this, a)
        }
        clear() {
            this.j = null;
            this.h = this.i = this.l = 0;
            this.J = !1
        }
        reset() {
            this.h = this.l
        }
        advance(a) {
            this.h += a;
            Xa(this)
        }
    },
    $a = [];

function ab(a) {
    var b = a.h;
    if (b.h == b.i) return !1;
    a.l = a.h.h;
    var c = Ya(a.h);
    b = c >>> 3;
    c &= 7;
    if (!(0 <= c && 5 >= c)) throw Ea(c, a.l);
    if (1 > b) throw Error(`Invalid field number: ${b} (at position ${a.l})`);
    a.j = b;
    a.i = c;
    return !0
}

function bb(a) {
    switch (a.i) {
        case 0:
            if (0 != a.i) bb(a);
            else a: {
                a = a.h;
                var b = a.h;
                for (let c = 0; 10 > c; c++) {
                    if (0 === (a.j[b] & 128)) {
                        a.h = b + 1;
                        Xa(a);
                        break a
                    }
                    b++
                }
                throw Fa();
            }
            break;
        case 1:
            a.h.advance(8);
            break;
        case 2:
            2 != a.i ? bb(a) : (b = Ya(a.h), a.h.advance(b));
            break;
        case 5:
            a.h.advance(4);
            break;
        case 3:
            b = a.j;
            do {
                if (!ab(a)) throw Error("Unmatched start-group tag: stream EOF");
                if (4 == a.i) {
                    if (a.j != b) throw Error("Unmatched end-group tag");
                    break
                }
                bb(a)
            } while (1);
            break;
        default:
            throw Ea(a.i, a.l);
    }
}
var cb = class {
        constructor(a) {
            var {
                J: b = !1,
                ga: c = !1
            } = {};
            this.m = {
                J: b
            };
            this.ga = c;
            var d = this.m;
            if ($a.length) {
                const e = $a.pop();
                d && (e.J = d.J);
                a && Wa(e, a);
                a = e
            } else a = new Za(a, d);
            this.h = a;
            this.l = this.h.h;
            this.i = this.j = -1
        }
        reset() {
            this.h.reset();
            this.l = this.h.h;
            this.i = this.j = -1
        }
        advance(a) {
            this.h.advance(a)
        }
    },
    db = [];
const eb = "function" === typeof Symbol && "symbol" === typeof Symbol() ? Symbol(void 0) : void 0;

function fb(a) {
    if (Array.isArray(a)) {
        let b;
        eb ? b = a[eb] : b = a.h;
        a = !!((null == b ? 0 : b) & 1)
    } else a = !1;
    return a
}

function gb(a) {
    Object.isFrozen(a) || (eb ? a[eb] |= 1 : void 0 !== a.h ? a.h |= 1 : Object.defineProperties(a, {
        h: {
            value: 1,
            configurable: !0,
            writable: !0,
            enumerable: !1
        }
    }));
    return a
};

function hb(a) {
    return null !== a && "object" === typeof a && !Array.isArray(a) && a.constructor === Object
}
let ib;
var jb = Object.freeze(gb([])),
    kb = "undefined" != typeof Symbol && "undefined" != typeof Symbol.hasInstance;

function A(a, b, c = !1) {
    return -1 === b ? null : b >= a.l ? a.i ? a.i[b] : void 0 : c && a.i && (c = a.i[b], null != c) ? c : a.u[b + a.j]
}

function B(a, b, c, d = !1) {
    b < a.l && !d ? a.u[b + a.j] = c : (a.i || (a.i = a.u[a.l + a.j] = {}))[b] = c;
    return a
}

function lb(a, b, c = !1) {
    let d = A(a, b, c);
    null == d && (d = jb);
    d === jb && (d = gb(d.slice()), B(a, b, d, c));
    return d
}

function mb(a, b, c, d) {
    (c = nb(a, c)) && c !== b && null != d && (a.h && c in a.h && (a.h[c] = void 0), B(a, c, void 0));
    return B(a, b, d)
}

function nb(a, b) {
    let c = 0;
    for (let d = 0; d < b.length; d++) {
        const e = b[d];
        null != A(a, e) && (0 !== c && B(a, c, void 0, !1), c = e)
    }
    return c
}

function ob(a, b, c, d, e = !1) {
    if (-1 === c) return null;
    a.h || (a.h = {});
    const f = a.h[c];
    if (f) return f;
    e = A(a, c, e);
    if (null == e && !d) return f;
    b = new b(e);
    return a.h[c] = b
}

function pb(a, b, c, d = !1) {
    a.h || (a.h = {});
    let e = a.h[c];
    if (!e) {
        d = lb(a, c, d);
        e = [];
        for (let f = 0; f < d.length; f++) e[f] = new b(d[f]);
        a.h[c] = e
    }
    return e
}

function C(a, b, c, d = !1) {
    a.h || (a.h = {});
    let e = c ? c.u : c;
    a.h[b] = c;
    return B(a, b, e, d)
}

function qb(a, b, c) {
    var d = rb;
    a.h || (a.h = {});
    let e = c ? c.u : c;
    a.h[b] = c;
    mb(a, b, d, e)
}

function sb(a, b, c, d, e) {
    const f = pb(a, c, b, !1);
    c = d ? d : new c;
    a = lb(a, b);
    void 0 != e ? (f.splice(e, 0, c), a.splice(e, 0, c.u)) : (f.push(c), a.push(c.u));
    return c
};
class tb {
    constructor(a, b, c, d) {
        var e = ub;
        this.i = a;
        this.fieldName = b;
        this.h = c;
        this.isRepeated = d;
        this.j = e
    }
};

function vb(a) {
    switch (typeof a) {
        case "number":
            return isFinite(a) ? a : String(a);
        case "object":
            if (a && !Array.isArray(a)) {
                if (Ra(a)) return Ma(a);
                if (a instanceof Ta) {
                    if (a.isEmpty()) a = "";
                    else {
                        var b = a.h;
                        b = null == b || "string" === typeof b ? b : Qa && b instanceof Uint8Array ? Ma(b) : null;
                        a = a.h = b
                    }
                    return a
                }
            }
    }
    return a
};

function wb(a, b) {
    if (null != a) {
        if (Array.isArray(a)) a = xb(a, b);
        else if (hb(a)) {
            const c = {};
            for (let d in a) c[d] = wb(a[d], b);
            a = c
        } else a = b(a);
        return a
    }
}

function xb(a, b) {
    const c = a.slice();
    for (let d = 0; d < c.length; d++) c[d] = wb(c[d], b);
    fb(a) && gb(c);
    return c
}

function yb(a) {
    if (a && "object" == typeof a && a.toJSON) return a.toJSON();
    a = vb(a);
    return Array.isArray(a) ? xb(a, yb) : a
}

function zb(a) {
    return Ra(a) ? new Uint8Array(a) : a
};
let Ab;

function Bb(a, b, c) {
    var d = Ab;
    Ab = null;
    a || (a = d);
    d = this.constructor.ma;
    a || (a = d ? [d] : []);
    this.j = (d ? 0 : -1) - (this.constructor.tb || 0);
    this.h = void 0;
    this.u = a;
    a: {
        d = this.u.length;a = d - 1;
        if (d && (d = this.u[a], hb(d))) {
            this.l = a - this.j;
            this.i = d;
            break a
        }
        void 0 !== b && -1 < b ? (this.l = Math.max(b, a + 1 - this.j), this.i = void 0) : this.l = Number.MAX_VALUE
    }
    if (c)
        for (b = 0; b < c.length; b++)
            if (a = c[b], a < this.l) a += this.j, (d = this.u[a]) ? Array.isArray(d) && gb(d) : this.u[a] = jb;
            else {
                d = this.i || (this.i = this.u[this.l + this.j] = {});
                let e = d[a];
                e ? Array.isArray(e) &&
                    gb(e) : d[a] = jb
            }
}
Bb.prototype.toJSON = function() {
    const a = Cb(this.u);
    return ib ? a : xb(a, yb)
};

function Db(a) {
    ib = !0;
    try {
        return JSON.stringify(a.toJSON(), Eb)
    } finally {
        ib = !1
    }
}
Bb.prototype.clone = function() {
    var a = this.constructor,
        b = xb(this.u, zb);
    Ab = b;
    a = new a(b);
    Ab = null;
    Fb(a, this);
    return a
};

function Eb(a, b) {
    return vb(b)
}

function Cb(a) {
    let b, c = a.length,
        d = !1;
    for (let g = a.length; g--;) {
        let h = a[g];
        if (Array.isArray(h)) {
            var e = h;
            Array.isArray(h) && fb(h) && !h.length ? h = null : h = Cb(h);
            h != e && (d = !0)
        } else if (g === a.length - 1 && hb(h)) {
            a: {
                var f = h;e = {};
                let k = !1;
                for (let l in f) {
                    let m = f[l];
                    if (Array.isArray(m)) {
                        let p = m;
                        Array.isArray(m) && fb(m) && !m.length ? m = null : m = Cb(m);
                        m != p && (k = !0)
                    }
                    null != m ? e[l] = m : k = !0
                }
                if (k) {
                    for (let l in e) {
                        f = e;
                        break a
                    }
                    f = null
                }
            }
            f != h && (d = !0);c--;
            continue
        }
        null == h && c == g + 1 ? (d = !0, c--) : d && (b || (b = a.slice(0, c)), b[g] = h)
    }
    if (!d) return a;
    b || (b = a.slice(0, c));
    f && b.push(f);
    return b
}

function Fb(a, b) {
    b.m && (a.m = b.m.slice());
    const c = b.h;
    if (c) {
        b = b.i;
        for (let f in c) {
            const g = c[f];
            if (g) {
                var d = !(!b || !b[f]),
                    e = +f;
                if (Array.isArray(g)) {
                    if (g.length)
                        for (d = pb(a, g[0].constructor, e, d), e = 0; e < Math.min(d.length, g.length); e++) Fb(d[e], g[e])
                } else(d = ob(a, g.constructor, e, void 0, d)) && Fb(d, g)
            }
        }
    }
};
const Gb = Symbol();

function Hb(a, b, c) {
    return a[Gb] || (a[Gb] = (d, e) => b(d, e, c))
}

function Ib(a) {
    let b = a[Gb];
    if (!b) {
        const c = Jb(a);
        b = (d, e) => Kb(d, e, c);
        a[Gb] = b
    }
    return b
}

function Lb(a) {
    var b = a.nb;
    if (b) return Ib(b);
    if (b = a.vb) return Hb(a.ta.h, b, a.ub)
}

function Mb(a) {
    const b = Lb(a),
        c = a.ta,
        d = a.Ab.T;
    return b ? (e, f) => d(e, f, c, b) : (e, f) => d(e, f, c)
}
const Nb = Symbol();

function Ob(a, b) {
    a[0] = b
}

function Pb(a, b, c, d) {
    const e = c.T;
    a[b] = d ? (f, g, h) => e(f, g, h, d) : e
}

function Qb(a, b, c, d, e, f) {
    const g = c.T,
        h = Ib(e);
    a[b] = (k, l, m) => g(k, l, m, d, h, f)
}

function Rb(a, b, c, d, e, f, g) {
    const h = c.T,
        k = Hb(d, e, f);
    a[b] = (l, m, p) => h(l, m, p, d, k, g)
}

function Jb(a) {
    var b = a[Nb];
    if (!b) {
        b = a[Nb] = {};
        var c = Ob,
            d = Pb,
            e = Qb,
            f = Rb;
        a = a();
        let h = 0;
        a.length && "number" !== typeof a[0] && (c(b, a[0]), h++);
        for (; h < a.length;) {
            c = a[h++];
            for (var g = h + 1; g < a.length && "number" !== typeof a[g];) g++;
            const k = a[h++];
            g -= h;
            switch (g) {
                case 0:
                    d(b, c, k);
                    break;
                case 1:
                    d(b, c, k, a[h++]);
                    break;
                case 2:
                    e(b, c, k, a[h++], a[h++]);
                    break;
                case 3:
                    g = a[h++];
                    const l = a[h++],
                        m = a[h++];
                    Array.isArray(m) ? e(b, c, k, g, l, m) : f(b, c, k, g, l, m);
                    break;
                case 4:
                    f(b, c, k, a[h++], a[h++], a[h++], a[h++]);
                    break;
                default:
                    throw Error("unexpected number of binary field arguments: " +
                        g);
            }
        }
    }
    return b
}

function Kb(a, b, c) {
    for (; ab(b) && 4 != b.i;) {
        var d = b.j,
            e = c[d];
        if (!e) {
            var f = c[0];
            f && (f = f[d]) && (e = c[d] = Mb(f))
        }
        if (!e || !e(b, a, d)) {
            e = b;
            d = a;
            var g = e.l;
            bb(e);
            e.ga || (f = e.h.j, e = e.h.h, e = g === e ? Sa || (Sa = new Uint8Array(0)) : Ua ? f.slice(g, e) : new Uint8Array(f.subarray(g, e)), (f = d.m) ? f.push(e) : d.m = [e])
        }
    }
    return a
}
var Ub = a => {
    var b = Sb,
        c = Tb;
    if (db.length) {
        const e = db.pop();
        if (a) {
            var d = e;
            Wa(d.h, a);
            d.j = -1;
            d.i = -1
        }
        a = e
    } else a = new cb(a);
    try {
        return Kb(new b, a, Jb(c))
    } finally {
        a.h.clear(), a.j = -1, a.i = -1, 100 > db.length && db.push(a)
    }
};

function Vb(a, b) {
    return {
        T: a,
        Gb: b
    }
}
var Wb = Vb(function(a, b, c) {
        if (2 !== a.i) return !1;
        var d = Ya(a.h);
        a = a.h;
        var e = a.h;
        a.h += d;
        Xa(a);
        a = a.j;
        var f;
        if (Ia)(f = Ha) || (f = Ha = new TextDecoder("utf-8", {
            fatal: !1
        })), f = f.decode(a.subarray(e, e + d));
        else {
            d = e + d;
            const h = [];
            let k = null;
            let l, m;
            for (; e < d;) {
                var g = a[e++];
                128 > g ? h.push(g) : 224 > g ? e >= d ? h.push(65533) : (l = a[e++], 194 > g || 128 !== (l & 192) ? (e--, h.push(65533)) : h.push((g & 31) << 6 | l & 63)) : 240 > g ? e >= d - 1 ? h.push(65533) : (l = a[e++], 128 !== (l & 192) || 224 === g && 160 > l || 237 === g && 160 <= l || 128 !== ((f = a[e++]) & 192) ? (e--, h.push(65533)) : h.push((g &
                    15) << 12 | (l & 63) << 6 | f & 63)) : 244 >= g ? e >= d - 2 ? h.push(65533) : (l = a[e++], 128 !== (l & 192) || 0 !== (g << 28) + (l - 144) >> 30 || 128 !== ((f = a[e++]) & 192) || 128 !== ((m = a[e++]) & 192) ? (e--, h.push(65533)) : (g = (g & 7) << 18 | (l & 63) << 12 | (f & 63) << 6 | m & 63, g -= 65536, h.push((g >> 10 & 1023) + 55296, (g & 1023) + 56320))) : h.push(65533);
                8192 <= h.length && (k = Ga(k, h), h.length = 0)
            }
            f = Ga(k, h)
        }
        B(b, c, f);
        return !0
    }, function(a, b, c) {
        a.i(c, A(b, c))
    }),
    Xb = Vb(function(a, b, c, d, e) {
        if (2 !== a.i) return !1;
        var f = sb(b, c, d);
        b = a.h.i;
        c = Ya(a.h);
        d = a.h.h + c;
        a.h.i = d;
        e(f, a);
        e = d - a.h.h;
        if (0 !== e) throw Error("Message parsing ended unexpectedly. Expected to read " + `${c} bytes, instead read ${c-e} bytes, either the ` + "data ended unexpectedly or the message misreported its own length");
        a.h.h = d;
        a.h.i = b;
        return !0
    }, function(a, b, c, d, e) {
        a.h(c, pb(b, d, c), e)
    });

function ub(a, b) {
    const c = this.i;
    if (this.isRepeated) {
        let d;
        if (b) {
            d = gb([]);
            for (let e = 0; e < b.length; e++) d[e] = b[e].u;
            a.h || (a.h = {});
            a.h[c] = b
        } else a.h && (a.h[c] = void 0), d = jb;
        a = B(a, c, d, !0)
    } else a = C(a, c, b, !0);
    return a
};
var Yb = class extends Bb {};
const Zb = () => {
    Object.defineProperties(Yb, {
        [Symbol.hasInstance]: {
            value: () => {
                throw Error("Cannot perform instanceof checks for MutableMessage");
            },
            configurable: !1,
            writable: !1,
            enumerable: !1
        }
    })
};
kb && Zb();
class D extends Yb {}
const $b = () => {
    Object.defineProperties(D, {
        [Symbol.hasInstance]: {
            value: Object[Symbol.hasInstance],
            configurable: !1,
            writable: !1,
            enumerable: !1
        }
    })
};
kb && $b();
wa("csi.gstatic.com");
wa("googleads.g.doubleclick.net");
wa("partner.googleadservices.com");
wa("pubads.g.doubleclick.net");
wa("securepubads.g.doubleclick.net");
wa("tpc.googlesyndication.com");
/*

 SPDX-License-Identifier: Apache-2.0
*/
function ac(a) {
    if (!a) return "";
    if (/^about:(?:blank|srcdoc)$/.test(a)) return window.origin || "";
    a = a.split("#")[0].split("?")[0];
    a = a.toLowerCase();
    0 == a.indexOf("//") && (a = window.location.protocol + a);
    /^[\w\-]*:\/\//.test(a) || (a = window.location.href);
    var b = a.substring(a.indexOf("://") + 3),
        c = b.indexOf("/"); - 1 != c && (b = b.substring(0, c));
    c = a.substring(0, a.indexOf("://"));
    if (!c) throw Error("URI is missing protocol: " + a);
    if ("http" !== c && "https" !== c && "chrome-extension" !== c && "moz-extension" !== c && "file" !== c && "android-app" !==
        c && "chrome-search" !== c && "chrome-untrusted" !== c && "chrome" !== c && "app" !== c && "devtools" !== c) throw Error("Invalid URI scheme in origin: " + c);
    a = "";
    var d = b.indexOf(":");
    if (-1 != d) {
        var e = b.substring(d + 1);
        b = b.substring(0, d);
        if ("http" === c && "80" !== e || "https" === c && "443" !== e) a = ":" + e
    }
    return c + "://" + b + a
};
var bc = "client_dev_mss_url client_dev_regex_map client_dev_root_url client_rollout_override expflag jsfeat jsmode mods".split(" ");

function cc() {
    function a() {
        e[0] = 1732584193;
        e[1] = 4023233417;
        e[2] = 2562383102;
        e[3] = 271733878;
        e[4] = 3285377520;
        m = l = 0
    }

    function b(p) {
        for (var r = g, n = 0; 64 > n; n += 4) r[n / 4] = p[n] << 24 | p[n + 1] << 16 | p[n + 2] << 8 | p[n + 3];
        for (n = 16; 80 > n; n++) p = r[n - 3] ^ r[n - 8] ^ r[n - 14] ^ r[n - 16], r[n] = (p << 1 | p >>> 31) & 4294967295;
        p = e[0];
        var x = e[1],
            G = e[2],
            H = e[3],
            P = e[4];
        for (n = 0; 80 > n; n++) {
            if (40 > n)
                if (20 > n) {
                    var Q = H ^ x & (G ^ H);
                    var la = 1518500249
                } else Q = x ^ G ^ H, la = 1859775393;
            else 60 > n ? (Q = x & G | H & (x | G), la = 2400959708) : (Q = x ^ G ^ H, la = 3395469782);
            Q = ((p << 5 | p >>> 27) & 4294967295) + Q + P + la + r[n] & 4294967295;
            P = H;
            H = G;
            G = (x << 30 | x >>> 2) & 4294967295;
            x = p;
            p = Q
        }
        e[0] = e[0] + p & 4294967295;
        e[1] = e[1] + x & 4294967295;
        e[2] = e[2] + G & 4294967295;
        e[3] = e[3] + H & 4294967295;
        e[4] = e[4] + P & 4294967295
    }

    function c(p, r) {
        if ("string" === typeof p) {
            p = unescape(encodeURIComponent(p));
            for (var n = [], x = 0, G = p.length; x < G; ++x) n.push(p.charCodeAt(x));
            p = n
        }
        r || (r = p.length);
        n = 0;
        if (0 == l)
            for (; n + 64 < r;) b(p.slice(n, n + 64)), n += 64, m += 64;
        for (; n < r;)
            if (f[l++] = p[n++], m++, 64 == l)
                for (l = 0, b(f); n + 64 < r;) b(p.slice(n, n + 64)), n += 64, m += 64
    }

    function d() {
        var p = [],
            r = 8 * m;
        56 > l ? c(h, 56 - l) : c(h, 64 - (l - 56));
        for (var n = 63; 56 <= n; n--) f[n] = r & 255, r >>>= 8;
        b(f);
        for (n = r = 0; 5 > n; n++)
            for (var x = 24; 0 <= x; x -= 8) p[r++] = e[n] >> x & 255;
        return p
    }
    for (var e = [], f = [], g = [], h = [128], k = 1; 64 > k; ++k) h[k] = 0;
    var l, m;
    a();
    return {
        reset: a,
        update: c,
        digest: d,
        ra: function() {
            for (var p = d(), r = "", n = 0; n < p.length; n++) r += "0123456789ABCDEF".charAt(Math.floor(p[n] / 16)) + "0123456789ABCDEF".charAt(p[n] % 16);
            return r
        }
    }
};

function dc(a, b, c) {
    var d = String(u.location.href);
    return d && a && b ? [b, ec(ac(d), a, c || null)].join(" ") : null
}

function ec(a, b, c) {
    var d = [],
        e = [];
    if (1 == (Array.isArray(c) ? 2 : 1)) return e = [b, a], oa(d, function(h) {
        e.push(h)
    }), fc(e.join(" "));
    var f = [],
        g = [];
    oa(c, function(h) {
        g.push(h.key);
        f.push(h.value)
    });
    c = Math.floor((new Date).getTime() / 1E3);
    e = 0 == f.length ? [c, b, a] : [f.join(":"), c, b, a];
    oa(d, function(h) {
        e.push(h)
    });
    a = fc(e.join(" "));
    a = [c, a];
    0 == g.length || a.push(g.join(""));
    return a.join("_")
}

function fc(a) {
    var b = cc();
    b.update(a);
    return b.ra().toLowerCase()
};
const gc = {};

function hc() {
    this.h = document || {
        cookie: ""
    }
}
q = hc.prototype;
q.isEnabled = function() {
    if (!u.navigator.cookieEnabled) return !1;
    if (!this.isEmpty()) return !0;
    this.set("TESTCOOKIESENABLED", "1", {
        la: 60
    });
    if ("1" !== this.get("TESTCOOKIESENABLED")) return !1;
    this.remove("TESTCOOKIESENABLED");
    return !0
};
q.set = function(a, b, c) {
    let d;
    var e = !1;
    let f;
    if ("object" === typeof c) {
        f = c.Eb;
        e = c.Fb || !1;
        d = c.domain || void 0;
        var g = c.path || void 0;
        var h = c.la
    }
    if (/[;=\s]/.test(a)) throw Error('Invalid cookie name "' + a + '"');
    if (/[;\r\n]/.test(b)) throw Error('Invalid cookie value "' + b + '"');
    void 0 === h && (h = -1);
    c = d ? ";domain=" + d : "";
    g = g ? ";path=" + g : "";
    e = e ? ";secure" : "";
    h = 0 > h ? "" : 0 == h ? ";expires=" + (new Date(1970, 1, 1)).toUTCString() : ";expires=" + (new Date(Date.now() + 1E3 * h)).toUTCString();
    this.h.cookie = a + "=" + b + c + g + h + e + (null != f ? ";samesite=" +
        f : "")
};
q.get = function(a, b) {
    const c = a + "=",
        d = (this.h.cookie || "").split(";");
    for (let e = 0, f; e < d.length; e++) {
        f = ya(d[e]);
        if (0 == f.lastIndexOf(c, 0)) return f.substr(c.length);
        if (f == a) return ""
    }
    return b
};
q.remove = function(a, b, c) {
    const d = void 0 !== this.get(a);
    this.set(a, "", {
        la: 0,
        path: b,
        domain: c
    });
    return d
};
q.isEmpty = function() {
    return !this.h.cookie
};
q.clear = function() {
    var a = (this.h.cookie || "").split(";");
    const b = [],
        c = [];
    let d, e;
    for (let f = 0; f < a.length; f++) e = ya(a[f]), d = e.indexOf("="), -1 == d ? (b.push(""), c.push(e)) : (b.push(e.substring(0, d)), c.push(e.substring(d + 1)));
    for (a = b.length - 1; 0 <= a; a--) this.remove(b[a])
};

function ic() {
    return !!gc.FPA_SAMESITE_PHASE2_MOD || !1
}

function jc(a, b, c, d) {
    (a = u[a]) || (a = (new hc).get(b));
    return a ? dc(a, c, d) : null
}

function kc() {
    var a = [],
        b = ac(String(u.location.href));
    const c = [];
    var d = u.__SAPISID || u.__APISID || u.__3PSAPISID || u.__OVERRIDE_SID;
    ic() && (d = d || u.__1PSAPISID);
    if (d) var e = !0;
    else e = new hc, d = e.get("SAPISID") || e.get("APISID") || e.get("__Secure-3PAPISID") || e.get("SID"), ic() && (d = d || e.get("__Secure-1PAPISID")), e = !!d;
    e && (d = (e = b = 0 == b.indexOf("https:") || 0 == b.indexOf("chrome-extension:") || 0 == b.indexOf("moz-extension:")) ? u.__SAPISID : u.__APISID, d || (d = new hc, d = d.get(e ? "SAPISID" : "APISID") || d.get("__Secure-3PAPISID")),
        (e = d ? dc(d, e ? "SAPISIDHASH" : "APISIDHASH", a) : null) && c.push(e), b && ic() && ((b = jc("__1PSAPISID", "__Secure-1PAPISID", "SAPISID1PHASH", a)) && c.push(b), (a = jc("__3PSAPISID", "__Secure-3PAPISID", "SAPISID3PHASH", a)) && c.push(a)));
    return 0 == c.length ? null : c.join(" ")
};

function lc() {
    this.j = this.j;
    this.l = this.l
}
lc.prototype.j = !1;
lc.prototype.dispose = function() {
    this.j || (this.j = !0, this.V())
};
lc.prototype.V = function() {
    if (this.l)
        for (; this.l.length;) this.l.shift()()
};

function mc(a) {
    var b = v("window.location.href");
    null == a && (a = 'Unknown Error of type "null/undefined"');
    if ("string" === typeof a) return {
        message: a,
        name: "Unknown error",
        lineNumber: "Not available",
        fileName: b,
        stack: "Not available"
    };
    var c = !1;
    try {
        var d = a.lineNumber || a.line || "Not available"
    } catch (g) {
        d = "Not available", c = !0
    }
    try {
        var e = a.fileName || a.filename || a.sourceURL || u.$googDebugFname || b
    } catch (g) {
        e = "Not available", c = !0
    }
    b = nc(a);
    if (!(!c && a.lineNumber && a.fileName && a.stack && a.message && a.name)) {
        c = a.message;
        if (null ==
            c) {
            if (a.constructor && a.constructor instanceof Function) {
                if (a.constructor.name) c = a.constructor.name;
                else if (c = a.constructor, oc[c]) c = oc[c];
                else {
                    c = String(c);
                    if (!oc[c]) {
                        var f = /function\s+([^\(]+)/m.exec(c);
                        oc[c] = f ? f[1] : "[Anonymous]"
                    }
                    c = oc[c]
                }
                c = 'Unknown Error of type "' + c + '"'
            } else c = "Unknown Error of unknown type";
            "function" === typeof a.toString && Object.prototype.toString !== a.toString && (c += ": " + a.toString())
        }
        return {
            message: c,
            name: a.name || "UnknownError",
            lineNumber: d,
            fileName: e,
            stack: b || "Not available"
        }
    }
    a.stack =
        b;
    return {
        message: a.message,
        name: a.name,
        lineNumber: a.lineNumber,
        fileName: a.fileName,
        stack: a.stack
    }
}

function nc(a, b) {
    b || (b = {});
    b[pc(a)] = !0;
    var c = a.stack || "";
    (a = a.qa) && !b[pc(a)] && (c += "\nCaused by: ", a.stack && 0 == a.stack.indexOf(a.toString()) || (c += "string" === typeof a ? a : a.message + "\n"), c += nc(a, b));
    return c
}

function pc(a) {
    var b = "";
    "function" === typeof a.toString && (b = "" + a);
    return b + a.stack
}
var oc = {};

function qc(a, b) {
    a.l(b);
    100 > a.i && (a.i++, b.next = a.h, a.h = b)
}
var rc = class {
    constructor(a, b) {
        this.j = a;
        this.l = b;
        this.i = 0;
        this.h = null
    }
    get() {
        let a;
        0 < this.i ? (this.i--, a = this.h, this.h = a.next, a.next = null) : a = this.j();
        return a
    }
};

function sc(a) {
    u.setTimeout(() => {
        throw a;
    }, 0)
};
class tc {
    constructor() {
        this.i = this.h = null
    }
    add(a, b) {
        const c = uc.get();
        c.set(a, b);
        this.i ? this.i.next = c : this.h = c;
        this.i = c
    }
    remove() {
        let a = null;
        this.h && (a = this.h, this.h = this.h.next, this.h || (this.i = null), a.next = null);
        return a
    }
}
var uc = new rc(() => new vc, a => a.reset());
class vc {
    constructor() {
        this.next = this.scope = this.h = null
    }
    set(a, b) {
        this.h = a;
        this.scope = b;
        this.next = null
    }
    reset() {
        this.next = this.scope = this.h = null
    }
};

function wc(a, b) {
    xc || yc();
    zc || (xc(), zc = !0);
    Ac.add(a, b)
}
var xc;

function yc() {
    var a = u.Promise.resolve(void 0);
    xc = function() {
        a.then(Bc)
    }
}
var zc = !1,
    Ac = new tc;

function Bc() {
    for (var a; a = Ac.remove();) {
        try {
            a.h.call(a.scope)
        } catch (b) {
            sc(b)
        }
        qc(uc, a)
    }
    zc = !1
};
class Cc {
    constructor() {
        this.promise = new Promise((a, b) => {
            this.reject = b
        })
    }
};

function E(a) {
    this.h = 0;
    this.C = void 0;
    this.l = this.i = this.j = null;
    this.m = this.o = !1;
    if (a != ha) try {
        var b = this;
        a.call(void 0, function(c) {
            Dc(b, 2, c)
        }, function(c) {
            Dc(b, 3, c)
        })
    } catch (c) {
        Dc(this, 3, c)
    }
}

function Ec() {
    this.next = this.context = this.onRejected = this.i = this.h = null;
    this.j = !1
}
Ec.prototype.reset = function() {
    this.context = this.onRejected = this.i = this.h = null;
    this.j = !1
};
var Fc = new rc(function() {
    return new Ec
}, function(a) {
    a.reset()
});

function Gc(a, b, c) {
    var d = Fc.get();
    d.i = a;
    d.onRejected = b;
    d.context = c;
    return d
}

function Hc(a) {
    if (a instanceof E) return a;
    var b = new E(ha);
    Dc(b, 2, a);
    return b
}
E.prototype.then = function(a, b, c) {
    return Ic(this, "function" === typeof a ? a : null, "function" === typeof b ? b : null, c)
};
E.prototype.$goog_Thenable = !0;
q = E.prototype;
q.Ha = function(a, b) {
    return Ic(this, null, a, b)
};
q.catch = E.prototype.Ha;
q.cancel = function(a) {
    if (0 == this.h) {
        var b = new Jc(a);
        wc(function() {
            Kc(this, b)
        }, this)
    }
};

function Kc(a, b) {
    if (0 == a.h)
        if (a.j) {
            var c = a.j;
            if (c.i) {
                for (var d = 0, e = null, f = null, g = c.i; g && (g.j || (d++, g.h == a && (e = g), !(e && 1 < d))); g = g.next) e || (f = g);
                e && (0 == c.h && 1 == d ? Kc(c, b) : (f ? (d = f, d.next == c.l && (c.l = d), d.next = d.next.next) : Lc(c), Mc(c, e, 3, b)))
            }
            a.j = null
        } else Dc(a, 3, b)
}

function Nc(a, b) {
    a.i || 2 != a.h && 3 != a.h || Oc(a);
    a.l ? a.l.next = b : a.i = b;
    a.l = b
}

function Ic(a, b, c, d) {
    var e = Gc(null, null, null);
    e.h = new E(function(f, g) {
        e.i = b ? function(h) {
            try {
                var k = b.call(d, h);
                f(k)
            } catch (l) {
                g(l)
            }
        } : f;
        e.onRejected = c ? function(h) {
            try {
                var k = c.call(d, h);
                void 0 === k && h instanceof Jc ? g(h) : f(k)
            } catch (l) {
                g(l)
            }
        } : g
    });
    e.h.j = a;
    Nc(a, e);
    return e.h
}
q.Ia = function(a) {
    this.h = 0;
    Dc(this, 2, a)
};
q.Ja = function(a) {
    this.h = 0;
    Dc(this, 3, a)
};

function Dc(a, b, c) {
    if (0 == a.h) {
        a === c && (b = 3, c = new TypeError("Promise cannot resolve to itself"));
        a.h = 1;
        a: {
            var d = c,
                e = a.Ia,
                f = a.Ja;
            if (d instanceof E) {
                Nc(d, Gc(e || ha, f || null, a));
                var g = !0
            } else {
                if (d) try {
                    var h = !!d.$goog_Thenable
                } catch (l) {
                    h = !1
                } else h = !1;
                if (h) d.then(e, f, a), g = !0;
                else {
                    h = typeof d;
                    if ("object" == h && null != d || "function" == h) try {
                        var k = d.then;
                        if ("function" === typeof k) {
                            Pc(d, k, e, f, a);
                            g = !0;
                            break a
                        }
                    } catch (l) {
                        f.call(a, l);
                        g = !0;
                        break a
                    }
                    g = !1
                }
            }
        }
        g || (a.C = c, a.h = b, a.j = null, Oc(a), 3 != b || c instanceof Jc || Qc(a, c))
    }
}

function Pc(a, b, c, d, e) {
    function f(k) {
        h || (h = !0, d.call(e, k))
    }

    function g(k) {
        h || (h = !0, c.call(e, k))
    }
    var h = !1;
    try {
        b.call(a, g, f)
    } catch (k) {
        f(k)
    }
}

function Oc(a) {
    a.o || (a.o = !0, wc(a.sa, a))
}

function Lc(a) {
    var b = null;
    a.i && (b = a.i, a.i = b.next, b.next = null);
    a.i || (a.l = null);
    return b
}
q.sa = function() {
    for (var a; a = Lc(this);) Mc(this, a, this.h, this.C);
    this.o = !1
};

function Mc(a, b, c, d) {
    if (3 == c && b.onRejected && !b.j)
        for (; a && a.m; a = a.j) a.m = !1;
    if (b.h) b.h.j = null, Rc(b, c, d);
    else try {
        b.j ? b.i.call(b.context) : Rc(b, c, d)
    } catch (e) {
        Sc.call(null, e)
    }
    qc(Fc, b)
}

function Rc(a, b, c) {
    2 == b ? a.i.call(a.context, c) : a.onRejected && a.onRejected.call(a.context, c)
}

function Qc(a, b) {
    a.m = !0;
    wc(function() {
        a.m && Sc.call(null, b)
    })
}
var Sc = sc;

function Jc(a) {
    na.call(this, a)
}
ma(Jc, na);
Jc.prototype.name = "cancel";

function F(a) {
    lc.call(this);
    this.C = 1;
    this.m = [];
    this.o = 0;
    this.h = [];
    this.i = {};
    this.M = !!a
}
ma(F, lc);
q = F.prototype;
q.subscribe = function(a, b, c) {
    var d = this.i[a];
    d || (d = this.i[a] = []);
    var e = this.C;
    this.h[e] = a;
    this.h[e + 1] = b;
    this.h[e + 2] = c;
    this.C = e + 3;
    d.push(e);
    return e
};
q.ca = function(a) {
    var b = this.h[a];
    if (b) {
        var c = this.i[b];
        if (0 != this.o) this.m.push(a), this.h[a + 1] = ha;
        else {
            if (c) {
                var d = Array.prototype.indexOf.call(c, a, void 0);
                0 <= d && Array.prototype.splice.call(c, d, 1)
            }
            delete this.h[a];
            delete this.h[a + 1];
            delete this.h[a + 2]
        }
    }
    return !!b
};
q.Z = function(a, b) {
    var c = this.i[a];
    if (c) {
        for (var d = Array(arguments.length - 1), e = 1, f = arguments.length; e < f; e++) d[e - 1] = arguments[e];
        if (this.M)
            for (e = 0; e < c.length; e++) {
                var g = c[e];
                Tc(this.h[g + 1], this.h[g + 2], d)
            } else {
                this.o++;
                try {
                    for (e = 0, f = c.length; e < f && !this.j; e++) g = c[e], this.h[g + 1].apply(this.h[g + 2], d)
                } finally {
                    if (this.o--, 0 < this.m.length && 0 == this.o)
                        for (; c = this.m.pop();) this.ca(c)
                }
            }
        return 0 != e
    }
    return !1
};

function Tc(a, b, c) {
    wc(function() {
        a.apply(b, c)
    })
}
q.clear = function(a) {
    if (a) {
        var b = this.i[a];
        b && (b.forEach(this.ca, this), delete this.i[a])
    } else this.h.length = 0, this.i = {}
};
q.V = function() {
    F.Ea.V.call(this);
    this.clear();
    this.m.length = 0
};
/*

Math.uuid.js (v1.4)
http://www.broofa.com
mailto:robert@broofa.com
Copyright (c) 2010 Robert Kieffer
Dual licensed under the MIT and GPL licenses.
*/
var Uc = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
var Wc = class extends D {
        constructor(a) {
            super(a)
        }
        getKey() {
            return A(this, 1)
        }
        ia() {
            return A(this, 2 === nb(this, Vc) ? 2 : -1)
        }
        setValue(a) {
            return mb(this, 2, Vc, a)
        }
    },
    Vc = [2, 3, 4, 5, 6];
var Xc = class extends D {
    constructor(a) {
        super(a)
    }
};
var Zc = class extends D {
        constructor() {
            super(void 0, -1, Yc)
        }
        getPlayerType() {
            return A(this, 36)
        }
        setHomeGroupInfo(a) {
            return C(this, 81, a)
        }
    },
    Yc = [9, 66, 24, 32, 86, 100, 101];
var ad = class extends D {
        constructor() {
            super(void 0, -1, $c)
        }
    },
    $c = [15, 26, 28];
var bd = class extends D {
    constructor(a) {
        super(a)
    }
    setToken(a) {
        return B(this, 2, a)
    }
};
var dd = class extends D {
        constructor(a) {
            super(a, -1, cd)
        }
        setSafetyMode(a) {
            return B(this, 5, a)
        }
    },
    cd = [12];
var fd = class extends D {
        constructor(a) {
            super(a, -1, ed)
        }
    },
    ed = [12];
var gd = class extends D {
    constructor(a) {
        super(a)
    }
};
var hd = {
    eb: 0,
    Oa: 1,
    Ua: 2,
    Va: 4,
    ab: 8,
    Wa: 16,
    Xa: 32,
    cb: 64,
    bb: 128,
    Qa: 256,
    Sa: 512,
    Za: 1024,
    Ra: 2048,
    Ta: 4096,
    Pa: 8192,
    Ya: 16384
};

function id(a, b) {
    C(a, 1, b)
}
var jd = class extends D {
    constructor() {
        super(void 0)
    }
    B(a) {
        B(this, 2, a)
    }
};

function kd(a, b) {
    C(a, 1, b)
}
var ld = class extends D {
    constructor() {
        super(void 0)
    }
};

function md(a, b) {
    C(a, 2, b)
}
var od = class extends D {
        constructor() {
            super(void 0, -1, nd)
        }
        B(a) {
            B(this, 1, a)
        }
    },
    nd = [3];
var pd = class extends D {
    constructor() {
        super(void 0)
    }
    B(a) {
        B(this, 1, a)
    }
};
var qd = class extends D {
    constructor() {
        super(void 0)
    }
    B(a) {
        B(this, 1, a)
    }
};
var rd = class extends D {
    constructor() {
        super(void 0)
    }
    B(a) {
        B(this, 1, a)
    }
};
var sd = class extends D {
    constructor() {
        super(void 0)
    }
};
var td = class extends D {
    constructor() {
        super(void 0)
    }
};
var ud = class extends D {
        constructor(a) {
            super(a, 421)
        }
    },
    rb = [23, 24, 11, 6, 7, 5, 2, 3, 20, 21, 28, 32, 37, 229, 241, 45, 59, 225, 288, 72, 73, 78, 208, 156, 202, 215, 74, 76, 79, 80, 111, 85, 91, 97, 100, 102, 105, 119, 126, 127, 136, 146, 157, 158, 159, 163, 164, 168, 176, 222, 383, 177, 178, 179, 411, 184, 188, 189, 190, 191, 193, 194, 195, 196, 198, 199, 200, 201, 203, 204, 205, 206, 258, 259, 260, 261, 209, 226, 227, 232, 233, 234, 240, 247, 248, 251, 254, 255, 270, 278, 291, 293, 300, 304, 308, 309, 310, 311, 313, 314, 319, 321, 323, 324, 328, 330, 331, 332, 337, 338, 340, 344, 348, 350, 351, 352, 353, 354, 355,
        356, 357, 358, 361, 363, 364, 368, 369, 370, 373, 374, 375, 378, 380, 381, 388, 389, 403, 412, 413, 414, 415, 416, 417, 418, 419, 420, 117
    ];
var vd = class extends D {
    constructor() {
        super(void 0)
    }
};
var xd = class extends D {
        constructor() {
            super(void 0)
        }
        setVideoId(a) {
            return mb(this, 1, wd, a)
        }
        getPlaylistId() {
            return A(this, 2 === nb(this, wd) ? 2 : -1)
        }
    },
    wd = [1, 2];
var zd = class extends D {
        constructor() {
            super(void 0, -1, yd)
        }
    },
    yd = [3];
var Ad = ["notification/convert_endpoint_to_url"],
    Bd = ["notification/record_interactions"],
    Cd = ["notification_registration/set_registration"];
var Dd = class extends D {
    constructor(a) {
        super(a, 1)
    }
};
var Ed = class extends D {
        constructor(a) {
            super(a)
        }
    },
    Fd = function(a, b, c, d, e = 0) {
        return new tb(a, b, c, e)
    }(406606992, {
        rb: 0
    }, Ed, void 0);
var Gd = class extends Ed {};
var Hd, Id, Jd;
const Kd = u.window,
    I = (null === (Hd = null === Kd || void 0 === Kd ? void 0 : Kd.yt) || void 0 === Hd ? void 0 : Hd.config_) || (null === (Id = null === Kd || void 0 === Kd ? void 0 : Kd.ytcfg) || void 0 === Id ? void 0 : Id.data_) || {},
    Ld = (null === (Jd = null === Kd || void 0 === Kd ? void 0 : Kd.ytcfg) || void 0 === Jd ? void 0 : Jd.obfuscatedData_) || [];
let Md = new class extends Dd {}(Ld);
const Nd = I.EXPERIMENT_FLAGS;
if (!Nd || !Nd.jspb_i18n_extension) {
    var Od = new Gd;
    Fd.j(Md, Od)
}
w("yt.config_", I);
w("yt.configJspb_", Ld);

function J(...a) {
    a = arguments;
    1 < a.length ? I[a[0]] = a[1] : 1 === a.length && Object.assign(I, a[0])
}

function K(a, b) {
    return a in I ? I[a] : b
};

function L(a) {
    a = Pd(a);
    return "string" === typeof a && "false" === a ? !1 : !!a
}

function Qd(a, b) {
    a = Pd(a);
    return void 0 === a && void 0 !== b ? b : Number(a || 0)
}

function Rd() {
    return K("EXPERIMENTS_TOKEN", "")
}

function Pd(a) {
    const b = K("EXPERIMENTS_FORCED_FLAGS", {});
    return void 0 !== b[a] ? b[a] : K("EXPERIMENT_FLAGS", {})[a]
}

function Sd() {
    const a = [],
        b = K("EXPERIMENTS_FORCED_FLAGS", {});
    for (var c in b) a.push({
        key: c,
        value: String(b[c])
    });
    c = K("EXPERIMENT_FLAGS", {});
    for (let d in c) d.startsWith("force_") && void 0 === b[d] && a.push({
        key: d,
        value: String(c[d])
    });
    return a
};
let Td = 0;
w("ytDomDomGetNextId", v("ytDomDomGetNextId") || (() => ++Td));
const Ud = [];

function Vd(a) {
    Ud.forEach(b => b(a))
}

function Wd(a) {
    return a && window.yterr ? function() {
        try {
            return a.apply(this, arguments)
        } catch (b) {
            Xd(b)
        }
    } : a
}

function Xd(a) {
    var b = v("yt.logging.errors.log");
    b ? b(a, "ERROR", void 0, void 0, void 0) : (b = K("ERRORS", []), b.push([a, "ERROR", void 0, void 0, void 0]), J("ERRORS", b));
    Vd(a)
}

function Yd(a) {
    var b = v("yt.logging.errors.log");
    b ? b(a, "WARNING", void 0, void 0, void 0) : (b = K("ERRORS", []), b.push([a, "WARNING", void 0, void 0, void 0]), J("ERRORS", b))
};
w("ytEventsEventsListeners", u.ytEventsEventsListeners || {});
w("ytEventsEventsCounter", u.ytEventsEventsCounter || {
    count: 0
});

function Zd(a, b) {
    "function" === typeof a && (a = Wd(a));
    return window.setTimeout(a, b)
};

function $d(a, b) {
    ae(a, 2, b)
}
var be = class {
    h(a) {
        ae(a, 1, void 0)
    }
};

function ae(a, b, c) {
    void 0 !== c && Number.isNaN(Number(c)) && (c = void 0);
    const d = v("yt.scheduler.instance.addJob");
    d ? d(a, b, c) : void 0 === c ? a() : Zd(a, c || 0)
}
var ce = class extends be {
    start() {
        const a = v("yt.scheduler.instance.start");
        a && a()
    }
};
ce.h || (ce.h = new ce);
var de = ce.h;

function ee() {
    const a = v("_lact", window);
    var b;
    null == a ? b = -1 : b = Math.max(Date.now() - a, 0);
    return b
};
const fe = /^[\w.]*$/,
    ge = {
        q: !0,
        search_query: !0
    };

function he(a, b) {
    b = a.split(b);
    const c = {};
    for (let f = 0, g = b.length; f < g; f++) {
        const h = b[f].split("=");
        if (1 == h.length && h[0] || 2 == h.length) try {
            const k = ie(h[0] || ""),
                l = ie(h[1] || "");
            k in c ? Array.isArray(c[k]) ? qa(c[k], l) : c[k] = [c[k], l] : c[k] = l
        } catch (k) {
            var d = k,
                e = h[0];
            const l = String(he);
            d.args = [{
                key: e,
                value: h[1],
                query: a,
                method: je == l ? "unchanged" : l
            }];
            ge.hasOwnProperty(e) || Yd(d)
        }
    }
    return c
}
const je = String(he);

function ke(a) {
    "?" == a.charAt(0) && (a = a.substr(1));
    return he(a, "&")
}

function le(a, b, c) {
    var d = a.split("#", 2);
    a = d[0];
    d = 1 < d.length ? "#" + d[1] : "";
    var e = a.split("?", 2);
    a = e[0];
    e = ke(e[1] || "");
    for (var f in b) !c && null !== e && f in e || (e[f] = b[f]);
    b = a;
    a = Da(e);
    a ? (c = b.indexOf("#"), 0 > c && (c = b.length), f = b.indexOf("?"), 0 > f || f > c ? (f = c, e = "") : e = b.substring(f + 1, c), b = [b.substr(0, f), e, b.substr(c)], c = b[1], b[1] = a ? c ? c + "&" + a : a : c, a = b[0] + (b[1] ? "?" + b[1] : "") + b[2]) : a = b;
    return a + d
}

function me(a) {
    if (!b) var b = window.location.href;
    const c = a.match(z)[1] || null,
        d = Ba(a.match(z)[3] || null);
    c && d ? (a = a.match(z), b = b.match(z), a = a[3] == b[3] && a[1] == b[1] && a[4] == b[4]) : a = d ? Ba(b.match(z)[3] || null) == d && (Number(b.match(z)[4] || null) || null) == (Number(a.match(z)[4] || null) || null) : !0;
    return a
}

function ie(a) {
    return a && a.match(fe) ? a : decodeURIComponent(a.replace(/\+/g, " "))
};
Date.now();
[...bc];
let ne = !1;

function oe(a, b) {
    const c = {
        method: b.method || "GET",
        credentials: "same-origin"
    };
    b.headers && (c.headers = b.headers);
    a = pe(a, b);
    const d = qe(a, b);
    d && (c.body = d);
    b.withCredentials && (c.credentials = "include");
    const e = b.context || u;
    let f = !1,
        g;
    fetch(a, c).then(h => {
        if (!f) {
            f = !0;
            g && window.clearTimeout(g);
            var k = h.ok,
                l = m => {
                    m = m || {};
                    k ? b.onSuccess && b.onSuccess.call(e, m, h) : b.onError && b.onError.call(e, m, h);
                    b.onFinish && b.onFinish.call(e, m, h)
                };
            "JSON" == (b.format || "JSON") && (k || 400 <= h.status && 500 > h.status) ? h.json().then(l, function() {
                l(null)
            }): l(null)
        }
    }).catch(() => {
        b.onError && b.onError.call(e, {}, {})
    });
    b.onFetchTimeout && 0 < b.timeout && (g = Zd(() => {
        f || (f = !0, window.clearTimeout(g), b.onFetchTimeout.call(b.context || u))
    }, b.timeout))
}

function pe(a, b) {
    b.includeDomain && (a = document.location.protocol + "//" + document.location.hostname + (document.location.port ? ":" + document.location.port : "") + a);
    const c = K("XSRF_FIELD_NAME", void 0);
    if (b = b.urlParams) b[c] && delete b[c], a = le(a, b || {}, !0);
    return a
}

function qe(a, b) {
    const c = K("XSRF_FIELD_NAME", void 0),
        d = K("XSRF_TOKEN", void 0);
    var e = b.postBody || "",
        f = b.postParams;
    const g = K("XSRF_FIELD_NAME", void 0);
    let h;
    b.headers && (h = b.headers["Content-Type"]);
    b.excludeXsrf || Ba(a.match(z)[3] || null) && !b.withCredentials && Ba(a.match(z)[3] || null) != document.location.hostname || "POST" != b.method || h && "application/x-www-form-urlencoded" != h || b.postParams && b.postParams[g] || (f || (f = {}), f[c] = d);
    f && "string" === typeof e && (e = ke(e), ua(e, f), e = b.postBodyFormat && "JSON" == b.postBodyFormat ?
        JSON.stringify(e) : Da(e));
    f = e || f && !ra(f);
    !ne && f && "POST" != b.method && (ne = !0, Xd(Error("AJAX request with postData should use POST")));
    return e
};
u.ytPubsubPubsubInstance || new F;
const re = window;
var M = re.ytcsi && re.ytcsi.now ? re.ytcsi.now : re.performance && re.performance.timing && re.performance.now && re.performance.timing.navigationStart ? () => re.performance.timing.navigationStart + re.performance.now() : () => (new Date).getTime();
const se = Qd("initial_gel_batch_timeout", 2E3),
    te = Math.pow(2, 16) - 1;
let N = void 0;
class ue {
    constructor() {
        this.j = this.h = this.i = 0
    }
}
const ve = new ue,
    we = new ue;
let xe = !0;
const ye = u.ytLoggingTransportGELQueue_ || new Map,
    ze = u.ytLoggingTransportGELProtoQueue_ || new Map,
    Ae = u.ytLoggingTransportTokensToCttTargetIds_ || {},
    Be = u.ytLoggingTransportTokensToJspbCttTargetIds_ || {};

function Ce(a, b) {
    if ("log_event" === a.endpoint) {
        var c = De(a),
            d = ye.get(c) || [];
        ye.set(c, d);
        d.push(a.payload);
        Ee(b, d, c)
    }
}

function Fe(a, b) {
    if ("log_event" === a.endpoint) {
        var c = De(a, !0),
            d = ze.get(c) || [];
        ze.set(c, d);
        d.push(a.payload);
        Ee(b, d, c, !0)
    }
}

function Ee(a, b, c, d = !1) {
    a && (N = new a);
    a = Qd("tvhtml5_logging_max_batch") || Qd("web_logging_max_batch") || 100;
    const e = M(),
        f = d ? we.j : ve.j;
    b.length >= a ? Ge({
        writeThenSend: !0
    }, L("flush_only_full_queue") ? c : void 0, d) : 10 <= e - f && (He(d), d ? we.j = e : ve.j = e)
}

function Ie(a, b) {
    if ("log_event" === a.endpoint) {
        var c = De(a),
            d = new Map;
        d.set(c, [a.payload]);
        b && (N = new b);
        return new E(e => {
            N && N.isReady() ? Je(d, e, {
                bypassNetworkless: !0
            }, !0) : e()
        })
    }
}

function Ke(a, b) {
    if ("log_event" === a.endpoint) {
        var c = De(a, !0),
            d = new Map;
        d.set(c, [a.payload]);
        b && (N = new b);
        return new E(e => {
            N && N.isReady() ? Le(d, e, {
                bypassNetworkless: !0
            }, !0) : e()
        })
    }
}

function De(a, b = !1) {
    var c = "";
    if (a.K) c = "visitorOnlyApprovedKey";
    else if (a.cttAuthInfo) {
        if (b) {
            b = a.cttAuthInfo.token;
            c = a.cttAuthInfo;
            const d = new xd;
            c.videoId ? d.setVideoId(c.videoId) : c.playlistId && mb(d, 2, wd, c.playlistId);
            Be[b] = d
        } else b = a.cttAuthInfo, c = {}, b.videoId ? c.videoId = b.videoId : b.playlistId && (c.playlistId = b.playlistId), Ae[a.cttAuthInfo.token] = c;
        c = a.cttAuthInfo.token
    }
    return c
}

function Ge(a = {}, b, c = !1) {
    new E(d => {
        c ? (window.clearTimeout(we.i), window.clearTimeout(we.h), we.h = 0) : (window.clearTimeout(ve.i), window.clearTimeout(ve.h), ve.h = 0);
        if (N && N.isReady())
            if (void 0 !== b)
                if (c) {
                    var e = new Map,
                        f = ze.get(b) || [];
                    e.set(b, f);
                    Le(e, d, a);
                    ze.delete(b)
                } else e = new Map, f = ye.get(b) || [], e.set(b, f), Je(e, d, a), ye.delete(b);
        else c ? (Le(ze, d, a), ze.clear()) : (Je(ye, d, a), ye.clear());
        else He(c), d()
    })
}

function He(a = !1) {
    if (L("web_gel_timeout_cap") && (!a && !ve.h || a && !we.h)) {
        var b = Zd(() => {
            Ge({
                writeThenSend: !0
            }, void 0, a)
        }, 6E4);
        a ? we.h = b : ve.h = b
    }
    window.clearTimeout(a ? we.i : ve.i);
    b = K("LOGGING_BATCH_TIMEOUT", Qd("web_gel_debounce_ms", 1E4));
    L("shorten_initial_gel_batch_timeout") && xe && (b = se);
    b = Zd(() => {
        Ge({
            writeThenSend: !0
        }, void 0, a)
    }, b);
    a ? we.i = b : ve.i = b
}

function Je(a, b, c = {}, d) {
    var e = N;
    const f = Math.round(M());
    let g = a.size;
    for (const [l, m] of a) {
        var h = l,
            k = m;
        a = sa({
            context: Me(e.config_ || Ne())
        });
        a.events = k;
        (k = Ae[h]) && Oe(a, h, k);
        delete Ae[h];
        h = "visitorOnlyApprovedKey" === h;
        Pe(a, f, h);
        Qe(c);
        Re(e, a, Se(c, h, () => {
            g--;
            g || b()
        }, () => {
            g--;
            g || b()
        }, d));
        xe = !1
    }
}

function Le(a, b, c = {}, d) {
    var e = N;
    const f = Math.round(M());
    let g = a.size;
    for (const [m, p] of a) {
        var h = m,
            k = p;
        a = new zd;
        var l = Te(e.config_ || Ne());
        C(a, 1, l);
        for (l = 0; l < k.length; l++) sb(a, 3, ud, k[l], void 0);
        (k = Be[h]) && Ue(a, h, k);
        delete Be[h];
        h = "visitorOnlyApprovedKey" === h;
        Ve(a, f, h);
        Qe(c);
        a = Db(a);
        h = Se(c, h, () => {
            g--;
            g || b()
        }, () => {
            g--;
            g || b()
        }, d);
        h.headers = {
            "Content-Type": "application/json+protobuf"
        };
        h.postBodyFormat = "JSPB";
        h.postBody = a;
        Re(e, "", h);
        xe = !1
    }
}

function Qe(a) {
    L("always_send_and_write") && (a.writeThenSend = !1)
}

function Se(a, b, c, d, e) {
    return {
        retry: !0,
        onSuccess: c,
        onError: d,
        wb: a,
        K: b,
        ob: !!e,
        headers: {},
        postBodyFormat: "",
        postBody: ""
    }
}

function Pe(a, b, c) {
    a.requestTimeMs = String(b);
    L("unsplit_gel_payloads_in_logs") && (a.unsplitGelPayloadsInLogs = !0);
    !c && (b = K("EVENT_ID", void 0)) && (c = We(), a.serializedClientEventId = {
        serializedEventId: b,
        clientCounter: String(c)
    })
}

function Ve(a, b, c) {
    B(a, 2, b);
    if (!c && (b = K("EVENT_ID", void 0))) {
        c = We();
        const d = new vd;
        B(d, 1, b);
        B(d, 2, c);
        C(a, 5, d)
    }
}

function We() {
    let a = K("BATCH_CLIENT_COUNTER", void 0) || 0;
    a || (a = Math.floor(Math.random() * te / 2));
    a++;
    a > te && (a = 1);
    J("BATCH_CLIENT_COUNTER", a);
    return a
}

function Oe(a, b, c) {
    let d;
    if (c.videoId) d = "VIDEO";
    else if (c.playlistId) d = "PLAYLIST";
    else return;
    a.credentialTransferTokenTargetId = c;
    a.context = a.context || {};
    a.context.user = a.context.user || {};
    a.context.user.credentialTransferTokens = [{
        token: b,
        scope: d
    }]
}

function Ue(a, b, c) {
    let d;
    if (A(c, 1 === nb(c, wd) ? 1 : -1)) d = 1;
    else if (c.getPlaylistId()) d = 2;
    else return;
    C(a, 4, c);
    a = ob(a, fd, 1) || new fd;
    c = ob(a, dd, 3) || new dd;
    const e = new bd;
    e.setToken(b);
    B(e, 1, d);
    sb(c, 12, bd, e, void 0);
    C(a, 3, c)
};
const Xe = u.ytLoggingGelSequenceIdObj_ || {};

function O(a, b, c, d = {}) {
    const e = {},
        f = Math.round(d.timestamp || M());
    e.eventTimeMs = f < Number.MAX_SAFE_INTEGER ? f : 0;
    e[a] = b;
    a = ee();
    e.context = {
        lastActivityMs: String(d.timestamp || !isFinite(a) ? -1 : a)
    };
    L("log_sequence_info_on_gel_web") && d.A && (a = e.context, b = d.A, b = {
        index: Ye(b),
        groupKey: b
    }, a.sequence = b, d.ha && delete Xe[d.A]);
    (d.Da ? Ie : Ce)({
        endpoint: "log_event",
        payload: e,
        cttAuthInfo: d.cttAuthInfo,
        K: d.K
    }, c)
}

function Ye(a) {
    Xe[a] = a in Xe ? Xe[a] + 1 : 0;
    return Xe[a]
};
w("ytglobal.prefsUserPrefsPrefs_", v("ytglobal.prefsUserPrefsPrefs_") || {});

function Ze() {
    return "INNERTUBE_API_KEY" in I && "INNERTUBE_API_VERSION" in I
}

function Ne() {
    return {
        innertubeApiKey: K("INNERTUBE_API_KEY", void 0),
        innertubeApiVersion: K("INNERTUBE_API_VERSION", void 0),
        W: K("INNERTUBE_CONTEXT_CLIENT_CONFIG_INFO"),
        wa: K("INNERTUBE_CONTEXT_CLIENT_NAME", "WEB"),
        xa: K("INNERTUBE_CONTEXT_CLIENT_NAME", 1),
        innertubeContextClientVersion: K("INNERTUBE_CONTEXT_CLIENT_VERSION", void 0),
        ka: K("INNERTUBE_CONTEXT_HL", void 0),
        ja: K("INNERTUBE_CONTEXT_GL", void 0),
        ya: K("INNERTUBE_HOST_OVERRIDE", void 0) || "",
        Aa: !!K("INNERTUBE_USE_THIRD_PARTY_AUTH", !1),
        za: !!K("INNERTUBE_OMIT_API_KEY_WHEN_AUTH_HEADER_IS_PRESENT", !1),
        appInstallData: K("SERIALIZED_CLIENT_CONFIG_DATA", void 0)
    }
}

function Me(a) {
    const b = {
        client: {
            hl: a.ka,
            gl: a.ja,
            clientName: a.wa,
            clientVersion: a.innertubeContextClientVersion,
            configInfo: a.W
        }
    };
    navigator.userAgent && (b.client.userAgent = String(navigator.userAgent));
    var c = u.devicePixelRatio;
    c && 1 != c && (b.client.screenDensityFloat = String(c));
    c = Rd();
    "" !== c && (b.client.experimentsToken = c);
    c = Sd();
    0 < c.length && (b.request = {
        internalExperimentFlags: c
    });
    $e(a, void 0, b);
    K("DELEGATED_SESSION_ID") && !L("pageid_as_header_web") && (b.user = {
        onBehalfOfUser: K("DELEGATED_SESSION_ID")
    });
    a = Object;
    c = a.assign;
    var d = b.client,
        e = K("DEVICE", "");
    const f = {};
    for (const [g, h] of Object.entries(ke(e))) {
        e = g;
        const k = h;
        "cbrand" === e ? f.deviceMake = k : "cmodel" === e ? f.deviceModel = k : "cbr" === e ? f.browserName = k : "cbrver" === e ? f.browserVersion = k : "cos" === e ? f.osName = k : "cosver" === e ? f.osVersion = k : "cplatform" === e && (f.platform = k)
    }
    b.client = c.call(a, d, f);
    return b
}

function Te(a) {
    const b = new fd,
        c = new Zc;
    B(c, 1, a.ka);
    B(c, 2, a.ja);
    B(c, 16, a.xa);
    B(c, 17, a.innertubeContextClientVersion);
    if (a.W) {
        var d = a.W,
            e = new Xc;
        d.coldConfigData && B(e, 1, d.coldConfigData);
        d.appInstallData && B(e, 6, d.appInstallData);
        d.coldHashData && B(e, 3, d.coldHashData);
        d.hotHashData && B(e, 5, d.hotHashData);
        C(c, 62, e)
    }(d = u.devicePixelRatio) && 1 != d && B(c, 65, d);
    d = Rd();
    "" !== d && B(c, 54, d);
    d = Sd();
    if (0 < d.length) {
        e = new ad;
        for (let f = 0; f < d.length; f++) {
            const g = new Wc;
            B(g, 1, d[f].key);
            g.setValue(d[f].value);
            sb(e, 15, Wc, g,
                void 0)
        }
        C(b, 5, e)
    }
    $e(a, c);
    K("DELEGATED_SESSION_ID") && !L("pageid_as_header_web") && (a = new dd, B(a, 3, K("DELEGATED_SESSION_ID")));
    a = K("DEVICE", "");
    for (const [f, g] of Object.entries(ke(a))) a = f, d = g, "cbrand" === a ? B(c, 12, d) : "cmodel" === a ? B(c, 13, d) : "cbr" === a ? B(c, 87, d) : "cbrver" === a ? B(c, 88, d) : "cos" === a ? B(c, 18, d) : "cosver" === a ? B(c, 19, d) : "cplatform" === a && B(c, 42, d);
    C(b, 1, c);
    return b
}

function $e(a, b, c) {
    if (a.appInstallData)
        if (b) {
            let d;
            c = null != (d = ob(b, Xc, 62)) ? d : new Xc;
            B(c, 6, a.appInstallData);
            C(b, 62, c)
        } else c && (c.client.configInfo = c.client.configInfo || {}, c.client.configInfo.appInstallData = a.appInstallData)
}

function af(a, b, c = {}) {
    const d = {
        "X-Goog-Visitor-Id": c.visitorData || K("VISITOR_DATA", "")
    };
    if (b && b.includes("www.youtube-nocookie.com")) return d;
    (b = c.lb || K("AUTHORIZATION")) || (a ? b = `Bearer ${v("gapi.auth.getToken")().kb}` : b = kc());
    b && (d.Authorization = b, d["X-Goog-AuthUser"] = K("SESSION_INDEX", 0), L("pageid_as_header_web") && (d["X-Goog-PageId"] = K("DELEGATED_SESSION_ID")));
    return d
};
const bf = [];
let cf, df = !1;

function ef(a) {
    df || (cf ? cf.handleError(a) : (bf.push({
        type: "ERROR",
        payload: a
    }), 10 < bf.length && bf.shift()))
}

function ff(a, b) {
    df || (cf ? cf.O(a, b) : (bf.push({
        type: "EVENT",
        eventType: a,
        payload: b
    }), 10 < bf.length && bf.shift()))
};
var R = class extends Error {
    constructor(a, ...b) {
        super(a);
        this.args = [...b]
    }
};

function gf() {
    if (void 0 !== K("DATASYNC_ID", void 0)) return K("DATASYNC_ID", void 0);
    throw new R("Datasync ID not set", "unknown");
};

function hf(a) {
    if (0 <= a.indexOf(":")) throw Error("Database name cannot contain ':'");
}

function jf(a) {
    return a.substr(0, a.indexOf(":")) || a
};
const kf = {
        AUTH_INVALID: "No user identifier specified.",
        EXPLICIT_ABORT: "Transaction was explicitly aborted.",
        IDB_NOT_SUPPORTED: "IndexedDB is not supported.",
        MISSING_INDEX: "Index not created.",
        MISSING_OBJECT_STORES: "Object stores not created.",
        DB_DELETED_BY_MISSING_OBJECT_STORES: "Database is deleted because expected object stores were not created.",
        DB_REOPENED_BY_MISSING_OBJECT_STORES: "Database is reopened because expected object stores were not created.",
        UNKNOWN_ABORT: "Transaction was aborted for unknown reasons.",
        QUOTA_EXCEEDED: "The current transaction exceeded its quota limitations.",
        QUOTA_MAYBE_EXCEEDED: "The current transaction may have failed because of exceeding quota limitations.",
        EXECUTE_TRANSACTION_ON_CLOSED_DB: "Can't start a transaction on a closed database",
        INCOMPATIBLE_DB_VERSION: "The binary is incompatible with the database version"
    },
    lf = {
        AUTH_INVALID: "ERROR",
        EXECUTE_TRANSACTION_ON_CLOSED_DB: "WARNING",
        EXPLICIT_ABORT: "IGNORED",
        IDB_NOT_SUPPORTED: "ERROR",
        MISSING_INDEX: "WARNING",
        MISSING_OBJECT_STORES: "ERROR",
        DB_DELETED_BY_MISSING_OBJECT_STORES: "WARNING",
        DB_REOPENED_BY_MISSING_OBJECT_STORES: "WARNING",
        QUOTA_EXCEEDED: "WARNING",
        QUOTA_MAYBE_EXCEEDED: "WARNING",
        UNKNOWN_ABORT: "WARNING",
        INCOMPATIBLE_DB_VERSION: "WARNING"
    },
    mf = {
        AUTH_INVALID: !1,
        EXECUTE_TRANSACTION_ON_CLOSED_DB: !1,
        EXPLICIT_ABORT: !1,
        IDB_NOT_SUPPORTED: !1,
        MISSING_INDEX: !1,
        MISSING_OBJECT_STORES: !1,
        DB_DELETED_BY_MISSING_OBJECT_STORES: !1,
        DB_REOPENED_BY_MISSING_OBJECT_STORES: !1,
        QUOTA_EXCEEDED: !1,
        QUOTA_MAYBE_EXCEEDED: !0,
        UNKNOWN_ABORT: !0,
        INCOMPATIBLE_DB_VERSION: !1
    };
var S = class extends R {
        constructor(a, b = {}, c = kf[a], d = lf[a], e = mf[a]) {
            super(c, Object.assign({
                name: "YtIdbKnownError",
                isSw: void 0 === self.document,
                isIframe: self !== self.top,
                type: a
            }, b));
            this.type = a;
            this.message = c;
            this.level = d;
            this.h = e;
            Object.setPrototypeOf(this, S.prototype)
        }
    },
    nf = class extends S {
        constructor(a, b) {
            super("MISSING_OBJECT_STORES", {
                expectedObjectStores: b,
                foundObjectStores: a
            }, kf.MISSING_OBJECT_STORES);
            Object.setPrototypeOf(this, nf.prototype)
        }
    },
    of = class extends Error {
        constructor(a, b) {
            super();
            this.index =
                a;
            this.objectStore = b;
            Object.setPrototypeOf(this, of .prototype)
        }
    };
const pf = ["The database connection is closing", "Can't start a transaction on a closed database", "A mutation operation was attempted on a database that did not allow mutations"];

function qf(a, b, c, d) {
    b = jf(b);
    let e;
    e = a instanceof Error ? a : Error(`Unexpected error: ${a}`);
    if (e instanceof S) return e;
    a = {
        objectStoreNames: c,
        dbName: b,
        dbVersion: d
    };
    if ("QuotaExceededError" === e.name) return new S("QUOTA_EXCEEDED", a);
    if (Ja && "UnknownError" === e.name) return new S("QUOTA_MAYBE_EXCEEDED", a);
    if (e instanceof of ) return new S("MISSING_INDEX", Object.assign(Object.assign({}, a), {
        objectStore: e.objectStore,
        index: e.index
    }));
    if ("InvalidStateError" === e.name && pf.some(f => e.message.includes(f))) return new S("EXECUTE_TRANSACTION_ON_CLOSED_DB",
        a);
    if ("AbortError" === e.name) return new S("UNKNOWN_ABORT", a, e.message);
    e.args = [Object.assign(Object.assign({}, a), {
        name: "IdbError",
        xb: e.name
    })];
    e.level = "WARNING";
    return e
}

function rf(a, b, c) {
    return new S("IDB_NOT_SUPPORTED", {
        context: {
            caller: a,
            publicName: b,
            version: c,
            hasSucceededOnce: void 0
        }
    })
};

function tf(a) {
    if (!a) throw Error();
    throw a;
}

function uf(a) {
    return a
}
var vf = class {
    constructor(a) {
        this.h = a
    }
};

function wf(a) {
    return new T(new vf((b, c) => {
        a instanceof T ? a.then(b, c) : b(a)
    }))
}

function xf(a, b, c, d, e) {
    try {
        if ("FULFILLED" !== a.state.status) throw Error("calling handleResolve before the promise is fulfilled.");
        const f = c(a.state.value);
        f instanceof T ? yf(a, b, f, d, e) : d(f)
    } catch (f) {
        e(f)
    }
}

function zf(a, b, c, d, e) {
    try {
        if ("REJECTED" !== a.state.status) throw Error("calling handleReject before the promise is rejected.");
        const f = c(a.state.reason);
        f instanceof T ? yf(a, b, f, d, e) : d(f)
    } catch (f) {
        e(f)
    }
}

function yf(a, b, c, d, e) {
    b === c ? e(new TypeError("Circular promise chain detected.")) : c.then(f => {
        f instanceof T ? yf(a, b, f, d, e) : d(f)
    }, f => {
        e(f)
    })
}
var T = class {
    constructor(a) {
        this.state = {
            status: "PENDING"
        };
        this.h = [];
        this.onRejected = [];
        a = a.h;
        const b = d => {
                if ("PENDING" === this.state.status) {
                    this.state = {
                        status: "FULFILLED",
                        value: d
                    };
                    for (const e of this.h) e()
                }
            },
            c = d => {
                if ("PENDING" === this.state.status) {
                    this.state = {
                        status: "REJECTED",
                        reason: d
                    };
                    for (const e of this.onRejected) e()
                }
            };
        try {
            a(b, c)
        } catch (d) {
            c(d)
        }
    }
    static all(a) {
        return new T(new vf((b, c) => {
            const d = [];
            let e = a.length;
            0 === e && b(d);
            for (let f = 0; f < a.length; ++f) wf(a[f]).then(g => {
                d[f] = g;
                e--;
                0 === e && b(d)
            }).catch(g => {
                c(g)
            })
        }))
    }
    static reject(a) {
        return new T(new vf((b, c) => {
            c(a)
        }))
    }
    then(a, b) {
        const c = null !== a && void 0 !== a ? a : uf,
            d = null !== b && void 0 !== b ? b : tf;
        return new T(new vf((e, f) => {
            "PENDING" === this.state.status ? (this.h.push(() => {
                xf(this, this, c, e, f)
            }), this.onRejected.push(() => {
                zf(this, this, d, e, f)
            })) : "FULFILLED" === this.state.status ? xf(this, this, c, e, f) : "REJECTED" === this.state.status && zf(this, this, d, e, f)
        }))
    } catch (a) {
        return this.then(void 0, a)
    }
};

function Af(a, b, c) {
    const d = () => {
            try {
                a.removeEventListener("success", e), a.removeEventListener("error", f)
            } catch (g) {}
        },
        e = () => {
            b(a.result);
            d()
        },
        f = () => {
            c(a.error);
            d()
        };
    a.addEventListener("success", e);
    a.addEventListener("error", f)
}

function Bf(a) {
    return new Promise((b, c) => {
        Af(a, b, c)
    })
}

function U(a) {
    return new T(new vf((b, c) => {
        Af(a, b, c)
    }))
};

function Cf(a, b) {
    return new T(new vf((c, d) => {
        const e = () => {
            const f = a ? b(a) : null;
            f ? f.then(g => {
                a = g;
                e()
            }, d) : c()
        };
        e()
    }))
};

function V(a, b, c, d) {
    return t(function*() {
        const e = {
            mode: "readonly",
            H: !1,
            tag: "IDB_TRANSACTION_TAG_UNKNOWN"
        };
        "string" === typeof c ? e.mode = c : Object.assign(e, c);
        a.transactionCount++;
        const f = e.H ? 3 : 1;
        let g = 0,
            h;
        for (; !h;) {
            g++;
            const l = Math.round(M());
            try {
                const m = a.h.transaction(b, e.mode);
                var k = d;
                const p = new Df(m),
                    r = yield Ef(p, k), n = Math.round(M());
                Ff(a, l, n, g, void 0, b.join(), e);
                return r
            } catch (m) {
                k = Math.round(M());
                const p = qf(m, a.h.name, b.join(), a.h.version);
                if (p instanceof S && !p.h || g >= f) Ff(a, l, k, g, p, b.join(), e),
                    h = p
            }
        }
        return Promise.reject(h)
    })
}

function Gf(a, b, c) {
    a = a.h.createObjectStore(b, c);
    return new Hf(a)
}

function If(a, b, c, d) {
    return V(a, [b], {
        mode: "readwrite",
        H: !0
    }, e => {
        e = e.objectStore(b);
        return U(e.h.put(c, d))
    })
}

function Ff(a, b, c, d, e, f, g) {
    b = c - b;
    e ? (e instanceof S && ("QUOTA_EXCEEDED" === e.type || "QUOTA_MAYBE_EXCEEDED" === e.type) && ff("QUOTA_EXCEEDED", {
        dbName: jf(a.h.name),
        objectStoreNames: f,
        transactionCount: a.transactionCount,
        transactionMode: g.mode
    }), e instanceof S && "UNKNOWN_ABORT" === e.type && (c -= a.j, 0 > c && c >= Math.pow(2, 31) && (c = 0), ff("TRANSACTION_UNEXPECTEDLY_ABORTED", {
        objectStoreNames: f,
        transactionDuration: b,
        transactionCount: a.transactionCount,
        dbDuration: c
    }), a.i = !0), Jf(a, !1, d, f, b, g.tag), ef(e)) : Jf(a, !0, d, f, b, g.tag)
}

function Jf(a, b, c, d, e, f = "IDB_TRANSACTION_TAG_UNKNOWN") {
    ff("TRANSACTION_ENDED", {
        objectStoreNames: d,
        connectionHasUnknownAbortedTransaction: a.i,
        duration: e,
        isSuccessful: b,
        tryCount: c,
        tag: f
    })
}
var Kf = class {
    constructor(a, b) {
        this.h = a;
        this.options = b;
        this.transactionCount = 0;
        this.j = Math.round(M());
        this.i = !1
    }
    add(a, b, c) {
        return V(this, [a], {
            mode: "readwrite",
            H: !0
        }, d => d.objectStore(a).add(b, c))
    }
    clear(a) {
        return V(this, [a], {
            mode: "readwrite",
            H: !0
        }, b => b.objectStore(a).clear())
    }
    close() {
        var a;
        this.h.close();
        (null === (a = this.options) || void 0 === a ? 0 : a.closed) && this.options.closed()
    }
    count(a, b) {
        return V(this, [a], {
            mode: "readonly",
            H: !0
        }, c => c.objectStore(a).count(b))
    }
    delete(a, b) {
        return V(this, [a], {
            mode: "readwrite",
            H: !0
        }, c => c.objectStore(a).delete(b))
    }
    get(a, b) {
        return V(this, [a], {
            mode: "readonly",
            H: !0
        }, c => c.objectStore(a).get(b))
    }
    objectStoreNames() {
        return Array.from(this.h.objectStoreNames)
    }
    getName() {
        return this.h.name
    }
};

function Lf(a, b, c) {
    a = a.h.openCursor(b.query, b.direction);
    return Mf(a).then(d => Cf(d, c))
}

function Nf(a, b) {
    return Lf(a, {
        query: b
    }, c => c.delete().then(() => c.continue())).then(() => {})
}
var Hf = class {
    constructor(a) {
        this.h = a
    }
    add(a, b) {
        return U(this.h.add(a, b))
    }
    autoIncrement() {
        return this.h.autoIncrement
    }
    clear() {
        return U(this.h.clear()).then(() => {})
    }
    count(a) {
        return U(this.h.count(a))
    }
    delete(a) {
        return a instanceof IDBKeyRange ? Nf(this, a) : U(this.h.delete(a))
    }
    get(a) {
        return U(this.h.get(a))
    }
    index(a) {
        try {
            return new Of(this.h.index(a))
        } catch (b) {
            if (b instanceof Error && "NotFoundError" === b.name) throw new of (a, this.h.name);
            throw b;
        }
    }
    getName() {
        return this.h.name
    }
    keyPath() {
        return this.h.keyPath
    }
};

function Ef(a, b) {
    const c = new Promise((d, e) => {
        try {
            b(a).then(f => {
                d(f)
            }).catch(e)
        } catch (f) {
            e(f), a.abort()
        }
    });
    return Promise.all([c, a.done]).then(([d]) => d)
}
var Df = class {
    constructor(a) {
        this.h = a;
        this.j = new Map;
        this.i = !1;
        this.done = new Promise((b, c) => {
            this.h.addEventListener("complete", () => {
                b()
            });
            this.h.addEventListener("error", d => {
                d.currentTarget === d.target && c(this.h.error)
            });
            this.h.addEventListener("abort", () => {
                var d = this.h.error;
                if (d) c(d);
                else if (!this.i) {
                    d = S;
                    var e = this.h.objectStoreNames;
                    const f = [];
                    for (let g = 0; g < e.length; g++) {
                        const h = e.item(g);
                        if (null === h) throw Error("Invariant: item in DOMStringList is null");
                        f.push(h)
                    }
                    d = new d("UNKNOWN_ABORT", {
                        objectStoreNames: f.join(),
                        dbName: this.h.db.name,
                        mode: this.h.mode
                    });
                    c(d)
                }
            })
        })
    }
    abort() {
        this.h.abort();
        this.i = !0;
        throw new S("EXPLICIT_ABORT");
    }
    objectStore(a) {
        a = this.h.objectStore(a);
        let b = this.j.get(a);
        b || (b = new Hf(a), this.j.set(a, b));
        return b
    }
};

function Pf(a, b, c) {
    const {
        query: d = null,
        direction: e = "next"
    } = b;
    a = a.h.openCursor(d, e);
    return Mf(a).then(f => Cf(f, c))
}
var Of = class {
    constructor(a) {
        this.h = a
    }
    count(a) {
        return U(this.h.count(a))
    }
    delete(a) {
        return Pf(this, {
            query: a
        }, b => b.delete().then(() => b.continue()))
    }
    get(a) {
        return U(this.h.get(a))
    }
    getKey(a) {
        return U(this.h.getKey(a))
    }
    keyPath() {
        return this.h.keyPath
    }
    unique() {
        return this.h.unique
    }
};

function Mf(a) {
    return U(a).then(b => b ? new Qf(a, b) : null)
}
var Qf = class {
    constructor(a, b) {
        this.request = a;
        this.cursor = b
    }
    advance(a) {
        this.cursor.advance(a);
        return Mf(this.request)
    }
    continue (a) {
        this.cursor.continue(a);
        return Mf(this.request)
    }
    delete() {
        return U(this.cursor.delete()).then(() => {})
    }
    getKey() {
        return this.cursor.key
    }
    ia() {
        return this.cursor.value
    }
    update(a) {
        return U(this.cursor.update(a))
    }
};

function Rf(a, b, c) {
    return new Promise((d, e) => {
        let f;
        f = void 0 !== b ? self.indexedDB.open(a, b) : self.indexedDB.open(a);
        const g = c.blocked,
            h = c.blocking,
            k = c.Ga,
            l = c.upgrade,
            m = c.closed;
        let p;
        const r = () => {
            p || (p = new Kf(f.result, {
                closed: m
            }));
            return p
        };
        f.addEventListener("upgradeneeded", n => {
            try {
                if (null === n.newVersion) throw Error("Invariant: newVersion on IDbVersionChangeEvent is null");
                if (null === f.transaction) throw Error("Invariant: transaction on IDbOpenDbRequest is null");
                n.dataLoss && "none" !== n.dataLoss && ff("IDB_DATA_CORRUPTED", {
                    reason: n.dataLossMessage || "unknown reason",
                    dbName: jf(a)
                });
                const x = r(),
                    G = new Df(f.transaction);
                l && l(x, H => n.oldVersion < H && n.newVersion >= H, G);
                G.done.catch(H => {
                    e(H)
                })
            } catch (x) {
                e(x)
            }
        });
        f.addEventListener("success", () => {
            const n = f.result;
            h && n.addEventListener("versionchange", () => {
                h(r())
            });
            n.addEventListener("close", () => {
                ff("IDB_UNEXPECTEDLY_CLOSED", {
                    dbName: jf(a),
                    dbVersion: n.version
                });
                k && k()
            });
            d(r())
        });
        f.addEventListener("error", () => {
            e(f.error)
        });
        g && f.addEventListener("blocked", () => {
            g()
        })
    })
}

function Sf(a, b, c = {}) {
    return Rf(a, b, c)
}

function Tf(a, b = {}) {
    return t(function*() {
        try {
            const c = self.indexedDB.deleteDatabase(a),
                d = b.blocked;
            d && c.addEventListener("blocked", () => {
                d()
            });
            yield Bf(c)
        } catch (c) {
            throw qf(c, a, "", -1);
        }
    })
};

function Uf(a) {
    return new Promise(b => {
        $d(() => {
            b()
        }, a)
    })
}

function Vf(a, b) {
    return new S("INCOMPATIBLE_DB_VERSION", {
        dbName: a.name,
        oldVersion: a.options.version,
        newVersion: b
    })
}

function Wf(a) {
    if (!a.l) throw Vf(a);
    if (a.h) return a.h;
    let b;
    const c = () => {
            a.h === b && (a.h = void 0)
        },
        d = {
            blocking: f => {
                f.close()
            },
            closed: c,
            Ga: c,
            upgrade: a.options.upgrade
        },
        e = () => t(function*() {
            var f, g, h = null !== (f = Error().stack) && void 0 !== f ? f : "";
            try {
                const m = yield a.j(a.name, a.options.version, d);
                var k = m,
                    l = a.options;
                const p = [];
                for (const r of Object.keys(l.L)) {
                    const {
                        N: n,
                        Bb: x = Number.MAX_VALUE
                    } = l.L[r];
                    !(k.h.version >= n) || k.h.version >= x || k.h.objectStoreNames.contains(r) || p.push(r)
                }
                if (0 !== p.length) {
                    const r = Object.keys(a.options.L),
                        n = m.objectStoreNames();
                    if (a.o < Qd("ytidb_reopen_db_retries", 0)) return a.o++, m.close(), ef(new S("DB_REOPENED_BY_MISSING_OBJECT_STORES", {
                        dbName: a.name,
                        expectedObjectStores: r,
                        foundObjectStores: n
                    })), e();
                    if (a.m < Qd("ytidb_remake_db_retries", 1)) return a.m++, L("ytidb_remake_db_enable_backoff_delay") && (yield Uf(a.i), a.i *= 2), yield a.delete(), ef(new S("DB_DELETED_BY_MISSING_OBJECT_STORES", {
                        dbName: a.name,
                        expectedObjectStores: r,
                        foundObjectStores: n
                    })), e();
                    throw new nf(n, r);
                }
                return m
            } catch (m) {
                if (m instanceof DOMException ? "VersionError" === m.name : "DOMError" in self && m instanceof DOMError ? "VersionError" === m.name : m instanceof Object && "message" in m &&
                    "An attempt was made to open a database using a lower version than the existing version." === m.message) {
                    h = yield a.j(a.name, void 0, Object.assign(Object.assign({}, d), {
                        upgrade: void 0
                    }));
                    k = h.h.version;
                    if (void 0 !== a.options.version && k > a.options.version + 1) throw h.close(), a.l = !1, Vf(a, k);
                    return h
                }
                c();
                m instanceof Error && !L("ytidb_async_stack_killswitch") && (m.stack = `${m.stack}\n${h.substring(h.indexOf("\n")+1)}`);
                throw qf(m, a.name, "", null !== (g = a.options.version) && void 0 !== g ? g : -1);
            }
        });
    b = e();
    a.h = b;
    return a.h
}

function Xf(a, b) {
    if (!b) throw rf("openWithToken", jf(a.name));
    return Wf(a)
}
var Yf = class {
    constructor(a, b) {
        this.name = a;
        this.options = b;
        this.l = !0;
        this.o = this.m = 0;
        this.i = 500
    }
    j(a, b, c = {}) {
        return Sf(a, b, c)
    }
    delete(a = {}) {
        return Tf(this.name, a)
    }
};
const Zf = new Yf("YtIdbMeta", {
    L: {
        databases: {
            N: 1
        }
    },
    upgrade(a, b) {
        b(1) && Gf(a, "databases", {
            keyPath: "actualName"
        })
    }
});

function $f(a, b) {
    return t(function*() {
        return V(yield Xf(Zf, b), ["databases"], {
            H: !0,
            mode: "readwrite"
        }, c => {
            const d = c.objectStore("databases");
            return d.get(a.actualName).then(e => {
                if (e ? a.actualName !== e.actualName || a.publicName !== e.publicName || a.userIdentifier !== e.userIdentifier : 1) return U(d.h.put(a, void 0)).then(() => {})
            })
        })
    })
}

function ag(a, b) {
    return t(function*() {
        if (a) return (yield Xf(Zf, b)).delete("databases", a)
    })
};
let bg;
const cg = new class {
    constructor() {}
}(new class {
    constructor() {}
});

function dg() {
    return t(function*() {
        return !0
    })
}

function eg() {
    if (void 0 !== bg) return bg;
    df = !0;
    return bg = dg().then(a => {
        df = !1;
        return a
    })
}

function fg() {
    const a = v("ytglobal.idbToken_") || void 0;
    return a ? Promise.resolve(a) : eg().then(b => {
        (b = b ? cg : void 0) && w("ytglobal.idbToken_", b);
        return b
    })
};
new Cc;

function gg(a) {
    try {
        gf();
        var b = !0
    } catch (c) {
        b = !1
    }
    if (!b) throw a = new S("AUTH_INVALID", {
        dbName: a
    }), ef(a), a;
    b = gf();
    return {
        actualName: `${a}:${b}`,
        publicName: a,
        userIdentifier: b
    }
}

function hg(a, b, c, d) {
    return t(function*() {
        var e, f = null !== (e = Error().stack) && void 0 !== e ? e : "",
            g = yield fg();
        if (!g) throw g = rf("openDbImpl", a, b), L("ytidb_async_stack_killswitch") || (g.stack = `${g.stack}\n${f.substring(f.indexOf("\n")+1)}`), ef(g), g;
        hf(a);
        f = c ? {
            actualName: a,
            publicName: a,
            userIdentifier: void 0
        } : gg(a);
        try {
            return yield $f(f, g), yield Sf(f.actualName, b, d)
        } catch (h) {
            try {
                yield ag(f.actualName, g)
            } catch (k) {}
            throw h;
        }
    })
}

function ig(a, b, c = {}) {
    return hg(a, b, !1, c)
}

function jg(a, b, c = {}) {
    return hg(a, b, !0, c)
}

function kg(a, b = {}) {
    return t(function*() {
        const c = yield fg();
        if (c) {
            hf(a);
            var d = gg(a);
            yield Tf(d.actualName, b);
            yield ag(d.actualName, c)
        }
    })
}

function lg(a, b = {}) {
    return t(function*() {
        const c = yield fg();
        c && (hf(a), yield Tf(a, b), yield ag(a, c))
    })
};

function mg(a) {
    this.version = 1;
    this.args = a
};

function ng() {
    var a = og;
    this.topic = "screen-created";
    this.h = a
}
ng.prototype.toString = function() {
    return this.topic
};
const pg = v("ytPubsub2Pubsub2Instance") || new F;
F.prototype.subscribe = F.prototype.subscribe;
F.prototype.unsubscribeByKey = F.prototype.ca;
F.prototype.publish = F.prototype.Z;
F.prototype.clear = F.prototype.clear;
w("ytPubsub2Pubsub2Instance", pg);
const qg = v("ytPubsub2Pubsub2SubscribedKeys") || {};
w("ytPubsub2Pubsub2SubscribedKeys", qg);
const rg = v("ytPubsub2Pubsub2TopicToKeys") || {};
w("ytPubsub2Pubsub2TopicToKeys", rg);
const sg = v("ytPubsub2Pubsub2IsAsync") || {};
w("ytPubsub2Pubsub2IsAsync", sg);
w("ytPubsub2Pubsub2SkipSubKey", null);

function tg(a) {
    var b = ug;
    const c = vg();
    c && c.publish.call(c, b.toString(), b, a)
}

function wg(a) {
    var b = ug;
    const c = vg();
    if (!c) return 0;
    const d = c.subscribe(b.toString(), (e, f) => {
        var g = v("ytPubsub2Pubsub2SkipSubKey");
        g && g == d || (g = () => {
            if (qg[d]) try {
                if (f && b instanceof ng && b != e) try {
                    var h = b.h,
                        k = f;
                    if (!k.args || !k.version) throw Error("yt.pubsub2.Data.deserialize(): serializedData is incomplete.");
                    try {
                        if (!h.oa) {
                            const n = new h;
                            h.oa = n.version
                        }
                        var l = h.oa
                    } catch (n) {}
                    if (!l || k.version != l) throw Error("yt.pubsub2.Data.deserialize(): serializedData version is incompatible.");
                    try {
                        l = Reflect;
                        var m = l.construct; {
                            var p = k.args;
                            const n = p.length;
                            if (0 < n) {
                                const x = Array(n);
                                for (k = 0; k < n; k++) x[k] = p[k];
                                var r = x
                            } else r = []
                        }
                        f = m.call(l, h, r)
                    } catch (n) {
                        throw n.message = "yt.pubsub2.Data.deserialize(): " + n.message, n;
                    }
                } catch (n) {
                    throw n.message = "yt.pubsub2.pubsub2 cross-binary conversion error for " + b.toString() + ": " + n.message, n;
                }
                a.call(window, f)
            } catch (n) {
                Xd(n)
            }
        }, sg[b.toString()] ? v("yt.scheduler.instance") ? de.h(g) : Zd(g, 0) : g())
    });
    qg[d] = !0;
    rg[b.toString()] || (rg[b.toString()] = []);
    rg[b.toString()].push(d);
    return d
}

function xg() {
    var a = yg;
    const b = wg(function(c) {
        a.apply(void 0, arguments);
        zg(b)
    });
    return b
}

function zg(a) {
    const b = vg();
    b && ("number" === typeof a && (a = [a]), oa(a, c => {
        b.unsubscribeByKey(c);
        delete qg[c]
    }))
}

function vg() {
    return v("ytPubsub2Pubsub2Instance")
};

function Ag(a, b) {
    let c;
    return () => {
        c || (c = new Bg(a, b));
        return c
    }
}
var Bg = class extends Yf {
    constructor(a, b) {
        super(a, b);
        this.options = b;
        hf(a)
    }
    j(a, b, c = {}) {
        return (this.options.aa ? jg : ig)(a, b, Object.assign({}, c))
    }
    delete(a = {}) {
        return (this.options.aa ? lg : kg)(this.name, a)
    }
};
const Cg = ["client.name", "client.version"];

function Dg(a) {
    if (!a.errorMetadata || !a.errorMetadata.kvPairs) return a;
    a.errorMetadata.kvPairs = a.errorMetadata.kvPairs.filter(b => b.key ? Cg.includes(b.key) : !1);
    return a
};
var Eg;
Eg = Ag("ServiceWorkerLogsDatabase", {
    L: {
        SWHealthLog: {
            N: 1
        }
    },
    aa: !0,
    upgrade: (a, b) => {
        b(1) && Gf(a, "SWHealthLog", {
            keyPath: "id",
            autoIncrement: !0
        }).h.createIndex("swHealthNewRequest", ["interface", "timestamp"], {
            unique: !1
        })
    },
    version: 1
});

function Fg(a, b) {
    return t(function*() {
        var c = yield Xf(Eg(), b), d = K("INNERTUBE_CONTEXT_CLIENT_NAME", 0);
        const e = Object.assign({}, a);
        e.clientError && (e.clientError = Dg(e.clientError));
        e.interface = d;
        return If(c, "SWHealthLog", e)
    })
};
const Gg = u.ytNetworklessLoggingInitializationOptions || {
    isNwlInitialized: !1,
    potentialEsfErrorCounter: 0
};
w("ytNetworklessLoggingInitializationOptions", Gg);

function Re(a, b, c) {
    !K("VISITOR_DATA") && .01 > Math.random() && Yd(new R("Missing VISITOR_DATA when sending innertube request.", "log_event", b, c));
    if (!a.isReady()) throw a = new R("innertube xhrclient not ready", "log_event", b, c), Xd(a), a;
    const d = {
        headers: c.headers || {},
        method: "POST",
        postParams: b,
        postBody: c.postBody,
        postBodyFormat: c.postBodyFormat || "JSON",
        onTimeout: () => {
            c.onTimeout()
        },
        onFetchTimeout: c.onTimeout,
        onSuccess: (m, p) => {
            if (c.onSuccess) c.onSuccess(p)
        },
        onFetchSuccess: m => {
            if (c.onSuccess) c.onSuccess(m)
        },
        onError: (m, p) => {
            if (c.onError) c.onError(p)
        },
        onFetchError: m => {
            if (c.onError) c.onError(m)
        },
        timeout: c.timeout,
        withCredentials: !0
    };
    d.headers["Content-Type"] || (d.headers["Content-Type"] = "application/json");
    b = "";
    var e = a.config_.ya;
    e && (b = e);
    e = af(a.config_.Aa || !1, b, c);
    Object.assign(d.headers, e);
    (e = d.headers.Authorization) && !b && (d.headers["x-origin"] = window.location.origin);
    const f = `/${"youtubei"}/${a.config_.innertubeApiVersion}/${"log_event"}`;
    let g = {
            alt: "json"
        },
        h = a.config_.za && e;
    h = h && e.startsWith("Bearer");
    h || (g.key = a.config_.innertubeApiKey);
    const k = le(`${b}${f}`, g || {}, !0),
        l = () => {
            try {
                oe(k,
                    d)
            } catch (m) {
                if ("InvalidAccessError" == m.name) Yd(Error("An extension is blocking network request."));
                else throw m;
            }
        };
    !L("use_new_nwl") && v("ytNetworklessLoggingInitializationOptions") && Gg.isNwlInitialized ? eg().then(m => {
        l(m)
    }) : l(!1)
}
class Hg {
    constructor(a) {
        this.config_ = null;
        a ? this.config_ = a : Ze() && (this.config_ = Ne())
    }
    isReady() {
        !this.config_ && Ze() && (this.config_ = Ne());
        return !!this.config_
    }
};
let Ig = Hg;

function W(a, b, c = {}) {
    let d = Ig;
    K("ytLoggingEventsDefaultDisabled", !1) && Ig == Hg && (d = null);
    O(a, b, d, c)
};
let Jg = Date.now().toString();
var Kg;
let Lg = u.ytLoggingDocDocumentNonce_;
if (!Lg) {
    var Mg;
    a: {
        if (window.crypto && window.crypto.getRandomValues) try {
            const d = Array(16),
                e = new Uint8Array(16);
            window.crypto.getRandomValues(e);
            for (let f = 0; f < d.length; f++) d[f] = e[f];
            Mg = d;
            break a
        } catch (d) {}
        const c = Array(16);
        for (let d = 0; 16 > d; d++) {
            const e = Date.now();
            for (let f = 0; f < e % 23; f++) c[d] = Math.random();
            c[d] = Math.floor(256 * Math.random())
        }
        if (Jg) {
            let d = 1;
            for (let e = 0; e < Jg.length; e++) c[d % 16] = c[d % 16] ^ c[(d - 1) % 16] / 4 ^ Jg.charCodeAt(e), d++
        }
        Mg = c
    }
    const a = Mg,
        b = [];
    for (let c = 0; c < a.length; c++) b.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(a[c] &
        63));
    Lg = b.join("")
}
Kg = Lg;
let Ng = Hg;
var Og = {
    Ma: 0,
    Ka: 1,
    La: 2,
    fb: 3,
    Na: 4,
    jb: 5,
    gb: 6,
    ib: 7,
    hb: 8,
    0: "DEFAULT",
    1: "CHAT",
    2: "CONVERSATIONS",
    3: "MINIPLAYER",
    4: "DIALOG",
    5: "VOZ",
    6: "MUSIC_WATCH_TABS",
    7: "SHARE",
    8: "PUSH_NOTIFICATIONS"
};
let Pg = 1;

function Qg(a) {
    const b = Pg++;
    return new Rg({
        veType: a,
        veCounter: b,
        elementIndex: void 0,
        dataElement: void 0,
        youtubeData: void 0,
        jspbYoutubeData: void 0
    })
}
var Rg = class {
    constructor(a) {
        this.h = a
    }
    getAsJson() {
        const a = {};
        void 0 !== this.h.trackingParams ? a.trackingParams = this.h.trackingParams : (a.veType = this.h.veType, void 0 !== this.h.veCounter && (a.veCounter = this.h.veCounter), void 0 !== this.h.elementIndex && (a.elementIndex = this.h.elementIndex));
        void 0 !== this.h.dataElement && (a.dataElement = this.h.dataElement.getAsJson());
        void 0 !== this.h.youtubeData && (a.youtubeData = this.h.youtubeData);
        return a
    }
    getAsJspb() {
        const a = new gd;
        void 0 !== this.h.trackingParams ? B(a, 1, this.h.trackingParams) :
            (void 0 !== this.h.veType && B(a, 2, this.h.veType), void 0 !== this.h.veCounter && B(a, 6, this.h.veCounter), void 0 !== this.h.elementIndex && B(a, 3, this.h.elementIndex));
        if (void 0 !== this.h.dataElement) {
            var b = this.h.dataElement.getAsJspb();
            C(a, 7, b)
        }
        void 0 !== this.h.youtubeData && C(a, 8, this.h.jspbYoutubeData);
        return a
    }
    toString() {
        return JSON.stringify(this.getAsJson())
    }
    isClientVe() {
        return !this.h.trackingParams && !!this.h.veType
    }
};

function Sg(a = 0) {
    return 0 == a ? "client-screen-nonce" : `${"client-screen-nonce"}.${a}`
}

function Tg(a = 0) {
    return 0 == a ? "ROOT_VE_TYPE" : `${"ROOT_VE_TYPE"}.${a}`
}

function Ug(a = 0) {
    return K(Tg(a), void 0)
}

function Vg(a = 0) {
    return (a = Ug(a)) ? new Rg({
        veType: a,
        youtubeData: void 0,
        jspbYoutubeData: void 0
    }) : null
}

function Wg() {
    let a = K("csn-to-ctt-auth-info");
    a || (a = {}, J("csn-to-ctt-auth-info", a));
    return a
}

function X(a = 0) {
    let b = K(Sg(a));
    if (!b && !K("USE_CSN_FALLBACK", !0)) return null;
    b || !L("use_undefined_csn_any_layer") && 0 != a || (b = "UNDEFINED_CSN");
    return b ? b : null
}

function Xg(a, b, c) {
    const d = Wg();
    (c = X(c)) && delete d[c];
    b && (d[a] = b)
}

function Yg(a) {
    return Wg()[a]
}

function Zg(a, b, c = 0, d) {
    if (a !== K(Sg(c)) || b !== K(Tg(c))) Xg(a, d, c), J(Sg(c), a), J(Tg(c), b), b = () => {
        setTimeout(() => {
            if (a) {
                const e = {
                    clientDocumentNonce: Kg,
                    clientScreenNonce: a
                };
                L("use_default_heartbeat_client") ? W("foregroundHeartbeatScreenAssociated", e) : O("foregroundHeartbeatScreenAssociated", e, Ng)
            }
        }, 0)
    }, "requestAnimationFrame" in window ? window.requestAnimationFrame(b) : b()
};
const $g = [{
    Y: a => `Cannot read property '${a.key}'`,
    S: {
        Error: [{
            v: /(Permission denied) to access property "([^']+)"/,
            groups: ["reason", "key"]
        }],
        TypeError: [{
            v: /Cannot read property '([^']+)' of (null|undefined)/,
            groups: ["key", "value"]
        }, {
            v: /\u65e0\u6cd5\u83b7\u53d6\u672a\u5b9a\u4e49\u6216 (null|undefined) \u5f15\u7528\u7684\u5c5e\u6027\u201c([^\u201d]+)\u201d/,
            groups: ["value", "key"]
        }, {
            v: /\uc815\uc758\ub418\uc9c0 \uc54a\uc74c \ub610\ub294 (null|undefined) \ucc38\uc870\uc778 '([^']+)' \uc18d\uc131\uc744 \uac00\uc838\uc62c \uc218 \uc5c6\uc2b5\ub2c8\ub2e4./,
            groups: ["value", "key"]
        }, {
            v: /No se puede obtener la propiedad '([^']+)' de referencia nula o sin definir/,
            groups: ["key"]
        }, {
            v: /Unable to get property '([^']+)' of (undefined or null) reference/,
            groups: ["key", "value"]
        }, {
            v: /(null) is not an object \(evaluating '(?:([^.]+)\.)?([^']+)'\)/,
            groups: ["value", "base", "key"]
        }]
    }
}, {
    Y: a => `Cannot call '${a.key}'`,
    S: {
        TypeError: [{
            v: /(?:([^ ]+)?\.)?([^ ]+) is not a function/,
            groups: ["base", "key"]
        }, {
            v: /([^ ]+) called on (null or undefined)/,
            groups: ["key", "value"]
        }, {
            v: /Object (.*) has no method '([^ ]+)'/,
            groups: ["base", "key"]
        }, {
            v: /Object doesn't support property or method '([^ ]+)'/,
            groups: ["key"]
        }, {
            v: /\u30aa\u30d6\u30b8\u30a7\u30af\u30c8\u306f '([^']+)' \u30d7\u30ed\u30d1\u30c6\u30a3\u307e\u305f\u306f\u30e1\u30bd\u30c3\u30c9\u3092\u30b5\u30dd\u30fc\u30c8\u3057\u3066\u3044\u307e\u305b\u3093/,
            groups: ["key"]
        }, {
            v: /\uac1c\uccb4\uac00 '([^']+)' \uc18d\uc131\uc774\ub098 \uba54\uc11c\ub4dc\ub97c \uc9c0\uc6d0\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4./,
            groups: ["key"]
        }]
    }
}, {
    Y: a => `${a.key} is not defined`,
    S: {
        ReferenceError: [{
            v: /(.*) is not defined/,
            groups: ["key"]
        }, {
            v: /Can't find variable: (.*)/,
            groups: ["key"]
        }]
    }
}];
var bh = {
    G: [],
    D: [{
        pa: ah,
        weight: 500
    }]
};

function ah(a) {
    if ("JavaException" === a.name) return !0;
    a = a.stack;
    return a.includes("chrome://") || a.includes("chrome-extension://") || a.includes("moz-extension://")
};

function ch() {
    if (!dh) {
        var a = dh = new eh;
        a.G.length = 0;
        a.D.length = 0;
        fh(a, bh)
    }
    return dh
}

function fh(a, b) {
    b.G && a.G.push.apply(a.G, b.G);
    b.D && a.D.push.apply(a.D, b.D)
}
var eh = class {
        constructor() {
            this.D = [];
            this.G = []
        }
    },
    dh;
const gh = new F;

function hh(a) {
    const b = a.length;
    let c = 0;
    const d = () => a.charCodeAt(c++);
    do {
        var e = ih(d);
        if (Infinity === e) break;
        const f = e >> 3;
        switch (e & 7) {
            case 0:
                e = ih(d);
                if (2 === f) return e;
                break;
            case 1:
                if (2 === f) return;
                c += 8;
                break;
            case 2:
                e = ih(d);
                if (2 === f) return a.substr(c, e);
                c += e;
                break;
            case 5:
                if (2 === f) return;
                c += 4;
                break;
            default:
                return
        }
    } while (c < b)
}

function ih(a) {
    let b = a(),
        c = b & 127;
    if (128 > b) return c;
    b = a();
    c |= (b & 127) << 7;
    if (128 > b) return c;
    b = a();
    c |= (b & 127) << 14;
    if (128 > b) return c;
    b = a();
    return 128 > b ? c | (b & 127) << 21 : Infinity
};

function jh(a, b, c, d) {
    if (a)
        if (Array.isArray(a)) {
            var e = d;
            for (d = 0; d < a.length && !(a[d] && (e += kh(d, a[d], b, c), 500 < e)); d++);
            d = e
        } else if ("object" === typeof a)
        for (e in a) {
            if (a[e]) {
                var f = e;
                var g = a[e],
                    h = b,
                    k = c;
                f = "string" !== typeof g || "clickTrackingParams" !== f && "trackingParams" !== f ? 0 : (g = hh(atob(g.replace(/-/g, "+").replace(/_/g, "/")))) ? kh(`${f}.ve`, g, h, k) : 0;
                d += f;
                d += kh(e, a[e], b, c);
                if (500 < d) break
            }
        } else c[b] = lh(a), d += c[b].length;
    else c[b] = lh(a), d += c[b].length;
    return d
}

function kh(a, b, c, d) {
    c += `.${a}`;
    a = lh(b);
    d[c] = a;
    return c.length + a.length
}

function lh(a) {
    try {
        return ("string" === typeof a ? a : String(JSON.stringify(a))).substr(0, 500)
    } catch (b) {
        return `unable to serialize ${typeof a} (${b.message})`
    }
};
var mh = new Set,
    nh = 0,
    oh = 0,
    ph = 0,
    qh = [];
const rh = ["PhantomJS", "Googlebot", "TO STOP THIS SECURITY SCAN go/scan"];

function sh(a) {
    th(a)
}

function uh(a) {
    th(a, "WARNING")
}

function th(a, b = "ERROR") {
    var c = {};
    c.name = K("INNERTUBE_CONTEXT_CLIENT_NAME", 1);
    c.version = K("INNERTUBE_CONTEXT_CLIENT_VERSION", void 0);
    vh(a, c || {}, b)
}

function vh(a, b, c = "ERROR") {
    if (a) {
        a.hasOwnProperty("level") && a.level && (c = a.level);
        if (L("console_log_js_exceptions")) {
            var d = [];
            d.push(`Name: ${a.name}`);
            d.push(`Message: ${a.message}`);
            a.hasOwnProperty("params") && d.push(`Error Params: ${JSON.stringify(a.params)}`);
            a.hasOwnProperty("args") && d.push(`Error args: ${JSON.stringify(a.args)}`);
            d.push(`File name: ${a.fileName}`);
            d.push(`Stacktrace: ${a.stack}`);
            window.console.log(d.join("\n"), a)
        }
        if (!(5 <= nh)) {
            d = qh;
            var e = mc(a);
            const G = e.message || "Unknown Error",
                H = e.name || "UnknownError";
            var f = e.stack || a.i || "Not available";
            if (f.startsWith(`${H}: ${G}`)) {
                var g = f.split("\n");
                g.shift();
                f = g.join("\n")
            }
            g = e.lineNumber || "Not available";
            e = e.fileName || "Not available";
            let P = 0;
            if (a.hasOwnProperty("args") && a.args && a.args.length)
                for (var h = 0; h < a.args.length && !(P = jh(a.args[h], `params.${h}`, b, P), 500 <= P); h++);
            else if (a.hasOwnProperty("params") && a.params) {
                const Q = a.params;
                if ("object" === typeof a.params)
                    for (h in Q) {
                        if (!Q[h]) continue;
                        const la = `params.${h}`,
                            sf = lh(Q[h]);
                        b[la] = sf;
                        P += la.length + sf.length;
                        if (500 < P) break
                    } else b.params = lh(Q)
            }
            if (d.length)
                for (h = 0; h < d.length && !(P = jh(d[h], `params.context.${h}`, b, P), 500 <= P); h++);
            navigator.vendor && !b.hasOwnProperty("vendor") && (b["device.vendor"] = navigator.vendor);
            b = {
                message: G,
                name: H,
                lineNumber: g,
                fileName: e,
                stack: f,
                params: b,
                sampleWeight: 1
            };
            d = Number(a.columnNumber);
            isNaN(d) || (b.lineNumber = `${b.lineNumber}:${d}`);
            if ("IGNORED" === a.level) var k = 0;
            else a: {
                a = ch();d = b;
                for (k of a.G)
                    if (d.message && d.message.match(k.Ba)) {
                        k = k.weight;
                        break a
                    }
                for (var l of a.D)
                    if (l.pa(d)) {
                        k =
                            l.weight;
                        break a
                    }
                k = 1
            }
            b.sampleWeight = k;
            k = b;
            for (var m of $g)
                if (m.S[k.name]) {
                    l = m.S[k.name];
                    for (var p of l)
                        if (l = k.message.match(p.v)) {
                            k.params["params.error.original"] = l[0];
                            a = p.groups;
                            b = {};
                            for (d = 0; d < a.length; d++) b[a[d]] = l[d + 1], k.params[`params.error.${a[d]}`] = l[d + 1];
                            k.message = m.Y(b);
                            break
                        }
                }
            k.params || (k.params = {});
            m = ch();
            k.params["params.errorServiceSignature"] = `msg=${m.G.length}&cb=${m.D.length}`;
            k.params["params.serviceWorker"] = "true";
            u.document && u.document.querySelectorAll && (k.params["params.fscripts"] =
                String(document.querySelectorAll("script:not([nonce])").length));
            wa("sample").constructor !== va && (k.params["params.fconst"] = "true");
            window.yterr && "function" === typeof window.yterr && window.yterr(k);
            if (0 !== k.sampleWeight && !mh.has(k.message)) {
                "ERROR" === c ? (gh.Z("handleError", k), L("record_app_crashed_web") && 0 === ph && 1 === k.sampleWeight && (ph++, m = {
                    appCrashType: "APP_CRASH_TYPE_BREAKPAD"
                }, L("report_client_error_with_app_crash_ks") || (m.systemHealth = {
                    crashData: {
                        clientError: {
                            logMessage: {
                                message: k.message
                            }
                        }
                    }
                }), W("appCrashed",
                    m)), oh++) : "WARNING" === c && gh.Z("handleWarning", k);
                b: {
                    for (r of rh)
                        if ((m = za()) && 0 <= m.toLowerCase().indexOf(r.toLowerCase())) {
                            var r = !0;
                            break b
                        }
                    r = !1
                }
                if (r) var n = void 0;
                else {
                    m = {
                        stackTrace: k.stack
                    };
                    k.fileName && (m.filename = k.fileName);
                    r = k.lineNumber && k.lineNumber.split ? k.lineNumber.split(":") : [];
                    0 !== r.length && (1 !== r.length || isNaN(Number(r[0])) ? 2 !== r.length || isNaN(Number(r[0])) || isNaN(Number(r[1])) || (m.lineNumber = Number(r[0]), m.columnNumber = Number(r[1])) : m.lineNumber = Number(r[0]));
                    r = {
                        level: "ERROR_LEVEL_UNKNOWN",
                        message: k.message,
                        errorClassName: k.name,
                        sampleWeight: k.sampleWeight
                    };
                    "ERROR" === c ? r.level = "ERROR_LEVEL_ERROR" : "WARNING" === c && (r.level = "ERROR_LEVEL_WARNNING");
                    m = {
                        isObfuscated: !0,
                        browserStackInfo: m
                    };
                    p = {
                        pageUrl: window.location.href,
                        kvPairs: []
                    };
                    K("FEXP_EXPERIMENTS") && (p.experimentIds = K("FEXP_EXPERIMENTS"));
                    l = K("LATEST_ECATCHER_SERVICE_TRACKING_PARAMS", void 0);
                    a = I.EXPERIMENT_FLAGS;
                    if ((!a || !a.web_disable_gel_stp_ecatcher_killswitch) && l)
                        for (var x of Object.keys(l)) p.kvPairs.push({
                            key: x,
                            value: String(l[x])
                        });
                    if (x = k.params)
                        for (n of Object.keys(x)) p.kvPairs.push({
                            key: `client.${n}`,
                            value: String(x[n])
                        });
                    n = K("SERVER_NAME", void 0);
                    x = K("SERVER_VERSION", void 0);
                    n && x && (p.kvPairs.push({
                        key: "server.name",
                        value: n
                    }), p.kvPairs.push({
                        key: "server.version",
                        value: x
                    }));
                    n = {
                        errorMetadata: p,
                        stackTrace: m,
                        logMessage: r
                    }
                }
                n && (W("clientError", n), ("ERROR" === c || L("errors_flush_gel_always_killswitch")) && Ge());
                try {
                    mh.add(k.message)
                } catch (Q) {}
                nh++
            }
        }
    }
};
const wh = u.ytLoggingGelSequenceIdObj_ || {};

function xh(a, b, c = {}) {
    var d = Math.round(c.timestamp || M());
    B(a, 1, d < Number.MAX_SAFE_INTEGER ? d : 0);
    var e = ee();
    d = new td;
    B(d, 1, c.timestamp || !isFinite(e) ? -1 : e);
    if (L("log_sequence_info_on_gel_web") && c.A) {
        e = c.A;
        const f = Ye(e),
            g = new sd;
        B(g, 2, f);
        B(g, 1, e);
        C(d, 3, g);
        c.ha && delete wh[c.A]
    }
    C(a, 33, d);
    (c.Da ? Ke : Fe)({
        endpoint: "log_event",
        payload: a,
        cttAuthInfo: c.cttAuthInfo,
        K: c.K
    }, b)
};

function yh(a, b = {}) {
    let c = !1;
    K("ytLoggingEventsDefaultDisabled", !1) && Ig === Hg && (c = !0);
    xh(a, c ? null : Ig, b)
};

function zh(a, b, c) {
    const d = new ud;
    qb(d, 72, a);
    c ? xh(d, c, b) : yh(d, b)
}

function Ah(a, b, c) {
    const d = new ud;
    qb(d, 73, a);
    c ? xh(d, c, b) : yh(d, b)
}

function Bh(a, b, c) {
    const d = new ud;
    qb(d, 78, a);
    c ? xh(d, c, b) : yh(d, b)
}

function Ch(a, b, c) {
    const d = new ud;
    qb(d, 208, a);
    c ? xh(d, c, b) : yh(d, b)
}

function Dh(a, b, c) {
    const d = new ud;
    qb(d, 156, a);
    c ? xh(d, c, b) : yh(d, b)
}

function Eh(a, b, c) {
    const d = new ud;
    qb(d, 215, a);
    c ? xh(d, c, b) : yh(d, b)
};
class og extends mg {
    constructor(a) {
        super(arguments);
        this.csn = a
    }
}
const ug = new ng,
    Fh = [];
let Hh = Gh,
    Ih = 0;

function Jh(a, b, c, d, e, f, g) {
    const h = Hh();
    f = new Rg({
        veType: b,
        youtubeData: f,
        jspbYoutubeData: void 0
    });
    e = {
        cttAuthInfo: e,
        A: h
    };
    const k = () => {
        uh(new R("newScreen() parent element does not have a VE - rootVe", b))
    };
    if (L("il_via_jspb")) {
        const l = new jd;
        l.B(h);
        id(l, f.getAsJspb());
        c && c.visualElement ? (f = new ld, c.clientScreenNonce && B(f, 2, c.clientScreenNonce), kd(f, c.visualElement.getAsJspb()), g && B(f, 4, hd[g]), C(l, 5, f)) : c && k();
        d && B(l, 3, d);
        Dh(l, e, a)
    } else f = {
        csn: h,
        pageVe: f.getAsJson()
    }, c && c.visualElement ? (f.implicitGesture = {
        parentCsn: c.clientScreenNonce,
        gesturedVe: c.visualElement.getAsJson()
    }, g && (f.implicitGesture.gestureType = g)) : c && k(), d && (f.cloneCsn = d), a ? O("screenCreated", f, a, e) : W("screenCreated", f, e);
    tg(new og(h));
    return h
}

function Kh(a, b, c, d) {
    const e = d.filter(g => {
            g.csn !== b ? (g.csn = b, g = !0) : g = !1;
            return g
        }),
        f = {
            cttAuthInfo: Yg(b),
            A: b
        };
    for (const g of d) d = g.getAsJson(), (ra(d) || !d.trackingParams && !d.veType) && uh(Error("Child VE logged with no data"));
    if (L("il_via_jspb")) {
        const g = new od;
        g.B(b);
        md(g, c.getAsJspb());
        pa(e, h => {
            h = h.getAsJspb();
            sb(g, 3, gd, h, void 0)
        });
        "UNDEFINED_CSN" == b ? Y("visualElementAttached", g, f) : Eh(g, f, a)
    } else c = {
        csn: b,
        parentVe: c.getAsJson(),
        childVes: pa(e, g => g.getAsJson())
    }, "UNDEFINED_CSN" == b ? Y("visualElementAttached", c, f) : a ? O("visualElementAttached", c, a, f) : W("visualElementAttached", c, f)
}

function Lh(a, b, c, d, e) {
    const f = {
        cttAuthInfo: Yg(b),
        A: b
    };
    if (L("il_via_jspb")) {
        const g = new qd;
        g.B(b);
        c = c.getAsJspb();
        C(g, 2, c);
        B(g, 4, 1);
        d && C(g, 3, e);
        "UNDEFINED_CSN" == b ? Y("visualElementShown", g, f) : zh(g, f, a)
    } else e = {
        csn: b,
        ve: c.getAsJson(),
        eventType: 1
    }, d && (e.clientData = d), "UNDEFINED_CSN" == b ? Y("visualElementShown", e, f) : a ? O("visualElementShown", e, a, f) : W("visualElementShown", e, f)
}

function Mh(a, b, c, d = !1) {
    var e = d ? 16 : 8;
    const f = {
        cttAuthInfo: Yg(b),
        A: b,
        ha: d
    };
    L("il_via_jspb") ? (e = new qd, e.B(b), c = c.getAsJspb(), C(e, 2, c), B(e, 4, d ? 16 : 8), "UNDEFINED_CSN" == b ? Y("visualElementHidden", e, f) : Ah(e, f, a)) : (d = {
        csn: b,
        ve: c.getAsJson(),
        eventType: e
    }, "UNDEFINED_CSN" == b ? Y("visualElementHidden", d, f) : a ? O("visualElementHidden", d, a, f) : W("visualElementHidden", d, f))
}

function Nh(a, b, c, d) {
    var e = "INTERACTION_LOGGING_GESTURE_TYPE_GENERIC_CLICK";
    const f = {
        cttAuthInfo: Yg(b),
        A: b
    };
    if (L("il_via_jspb")) {
        const g = new pd;
        g.B(b);
        c = c.getAsJspb();
        C(g, 2, c);
        B(g, 4, hd[e]);
        d && C(g, 3, void 0);
        "UNDEFINED_CSN" == b ? Y("visualElementGestured", g, f) : Bh(g, f, a)
    } else e = {
        csn: b,
        ve: c.getAsJson(),
        gestureType: e
    }, d && (e.clientData = d), "UNDEFINED_CSN" == b ? Y("visualElementGestured", e, f) : a ? O("visualElementGestured", e, a, f) : W("visualElementGestured", e, f)
}

function Gh() {
    for (var a = Math.random() + "", b = [], c = 0, d = 0; d < a.length; d++) {
        var e = a.charCodeAt(d);
        255 < e && (b[c++] = e & 255, e >>= 8);
        b[c++] = e
    }
    return Ma(b, 3)
}

function Y(a, b, c) {
    Fh.push({
        payloadName: a,
        payload: b,
        options: c
    });
    Ih || (Ih = xg())
}

function yg(a) {
    if (Fh) {
        for (let b of Fh)
            if (b.payload)
                if (L("il_via_jspb")) switch (b.payload.B(a.csn), b.payloadName) {
                    case "screenCreated":
                        Dh(b.payload, b.options);
                        break;
                    case "visualElementAttached":
                        Eh(b.payload, b.options);
                        break;
                    case "visualElementShown":
                        zh(b.payload, b.options);
                        break;
                    case "visualElementHidden":
                        Ah(b.payload, b.options);
                        break;
                    case "visualElementGestured":
                        Bh(b.payload, b.options);
                        break;
                    case "visualElementStateChanged":
                        Ch(b.payload, b.options);
                        break;
                    default:
                        uh(new R("flushQueue unable to map payloadName to JSPB setter"))
                } else b.payload.csn =
                    a.csn, O(b.payloadName, b.payload, null, b.options);
        Fh.length = 0
    }
    Ih = 0
};

function Oh(a, b) {
    return b.data && b.data.loggingDirectives ? b.data.loggingDirectives.trackingParams || "" : b.data && b.data.trackingParams || ""
}

function Ph(a, b) {
    const c = X(void 0);
    return null !== a.j && c != a.j ? (uh(new R("VisibilityLogger called before newScreen()", {
        caller: b.tagName,
        previous_csn: a.csn,
        current_csn: c
    })), null) : c
}

function Qh(a) {
    return parseInt(a.data && a.data.loggingDirectives && a.data.loggingDirectives.visibility && a.data.loggingDirectives.visibility.types || "", 10) || 1
}

function Rh(a, b) {
    var c = Oh(0, b),
        d = b.visualElement ? b.visualElement : c,
        e = a.m.has(d);
    const f = a.i.get(d);
    a.m.add(d);
    a.i.set(d, !0);
    b.h && !e && b.h();
    if (c || b.visualElement)
        if (d = Ph(a, b)) {
            var g = !(!b.data || !b.data.loggingDirectives);
            if (Qh(b) || g) {
                var h = b.visualElement ? b.visualElement : new Rg({
                    trackingParams: c
                });
                c = b.i;
                var k = b.j;
                g || e ? Qh(b) & 4 ? f || (a = a.h, b = {
                    cttAuthInfo: Yg(d),
                    A: d
                }, L("il_via_jspb") ? (e = new qd, e.B(d), h = h.getAsJspb(), C(e, 2, h), B(e, 4, 4), c && C(e, 3, k), "UNDEFINED_CSN" == d ? Y("visualElementShown", e, b) : zh(e, b, a)) : (k = {
                    csn: d,
                    ve: h.getAsJson(),
                    eventType: 4
                }, c && (k.clientData = c), "UNDEFINED_CSN" == d ? Y("visualElementShown", k, b) : a ? O("visualElementShown", k, a, b) : W("visualElementShown", k, b))) : Qh(b) & 1 && !e && Lh(a.h, d, h, c, k) : Lh(a.h, d, h, c)
            }
        }
}
class Sh {
    constructor() {
        this.m = new Set;
        this.l = new Set;
        this.i = new Map;
        this.j = null;
        this.h = Hg
    }
    clear() {
        this.m.clear();
        this.l.clear();
        this.i.clear();
        this.j = null
    }
}(function() {
    var a = Sh;
    a.X = void 0;
    a.s = function() {
        return a.X ? a.X : a.X = new a
    }
})();
var Th = a => self.btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(a)))).replace(/\+/g, "-").replace(/\//g, "_");
var Uh = ["notifications_register", "notifications_check_registration"];
let Vh = null;

function Z(a, b) {
    const c = {};
    c.key = a;
    c.value = b;
    return Wh().then(d => new Promise((e, f) => {
        try {
            const g = d.transaction("swpushnotificationsstore", "readwrite").objectStore("swpushnotificationsstore").put(c);
            g.onsuccess = () => {
                e()
            };
            g.onerror = () => {
                f()
            }
        } catch (g) {
            f(g)
        }
    }))
}

function Xh() {
    return Z("IndexedDBCheck", "testing IndexedDB").then(() => Yh("IndexedDBCheck")).then(a => "testing IndexedDB" === a ? Promise.resolve() : Promise.reject()).then(() => !0).catch(() => !1)
}

function Yh(a) {
    const b = new R("Error accessing DB");
    return Wh().then(c => new Promise((d, e) => {
        try {
            const f = c.transaction("swpushnotificationsstore").objectStore("swpushnotificationsstore").get(a);
            f.onsuccess = () => {
                const g = f.result;
                d(g ? g.value : null)
            };
            f.onerror = () => {
                b.params = {
                    key: a,
                    source: "onerror"
                };
                e(b)
            }
        } catch (f) {
            b.params = {
                key: a,
                thrownError: String(f)
            }, e(b)
        }
    }), () => null)
}

function Wh() {
    return Vh ? Promise.resolve(Vh) : new Promise((a, b) => {
        const c = self.indexedDB.open("swpushnotificationsdb");
        c.onerror = b;
        c.onsuccess = () => {
            const d = c.result;
            if (d.objectStoreNames.contains("swpushnotificationsstore")) Vh = d, a(Vh);
            else return self.indexedDB.deleteDatabase("swpushnotificationsdb"), Wh()
        };
        c.onupgradeneeded = Zh
    })
}

function Zh(a) {
    a = a.target.result;
    a.objectStoreNames.contains("swpushnotificationsstore") && a.deleteObjectStore("swpushnotificationsstore");
    a.createObjectStore("swpushnotificationsstore", {
        keyPath: "key"
    })
};
const $h = {
    WEB_UNPLUGGED: "^unplugged/",
    WEB_UNPLUGGED_ONBOARDING: "^unplugged/",
    WEB_UNPLUGGED_OPS: "^unplugged/",
    WEB_UNPLUGGED_PUBLIC: "^unplugged/",
    WEB_CREATOR: "^creator/",
    WEB_KIDS: "^kids/",
    WEB_EXPERIMENTS: "^experiments/",
    WEB_MUSIC: "^music/",
    WEB_REMIX: "^music/",
    WEB_MUSIC_EMBEDDED_PLAYER: "^music/",
    WEB_MUSIC_EMBEDDED_PLAYER: "^main_app/|^sfv/"
};

function ai(a) {
    if (1 === a.length) return a[0];
    var b = $h.UNKNOWN_INTERFACE;
    if (b) {
        b = new RegExp(b);
        for (var c of a)
            if (b.exec(c)) return c
    }
    const d = [];
    Object.entries($h).forEach(([e, f]) => {
        "UNKNOWN_INTERFACE" !== e && d.push(f)
    });
    c = new RegExp(d.join("|"));
    a.sort((e, f) => e.length - f.length);
    for (const e of a)
        if (!c.exec(e)) return e;
    return a[0]
}

function bi(a) {
    return `/youtubei/v1/${ai(a)}`
};
const ci = window;
class di {
    constructor() {
        this.timing = {};
        this.clearResourceTimings = () => {};
        this.webkitClearResourceTimings = () => {};
        this.mozClearResourceTimings = () => {};
        this.msClearResourceTimings = () => {};
        this.oClearResourceTimings = () => {}
    }
}
var ei = ci.performance || ci.mozPerformance || ci.msPerformance || ci.webkitPerformance || new di;
ka(ei.clearResourceTimings || ei.webkitClearResourceTimings || ei.mozClearResourceTimings || ei.msClearResourceTimings || ei.oClearResourceTimings || ha, ei);
w("ytLoggingLatencyUsageStats_", u.ytLoggingLatencyUsageStats_ || {});

function fi() {
    gi.h || (gi.h = new gi);
    return gi.h
}

function hi(a, b, c = {}) {
    a.i.add(c.layer || 0);
    a.j = () => {
        ii(a, b, c);
        var d = Vg(c.layer);
        if (d) {
            for (var e of a.m) ji(a, e[0], e[1] || d, c.layer);
            for (const k of a.C) {
                e = X(0);
                var f = k[0] || Vg(0);
                if (e && f) {
                    d = a.client;
                    var g = f,
                        h = k[1];
                    f = {
                        cttAuthInfo: Yg(e),
                        A: e
                    };
                    L("il_via_jspb") ? (h = new rd, h.B(e), g = g.getAsJspb(), C(h, 2, g), "UNDEFINED_CSN" == e ? Y("visualElementStateChanged", h, f) : Ch(h, f, d)) : (g = {
                        csn: e,
                        ve: g.getAsJson(),
                        clientData: h
                    }, "UNDEFINED_CSN" == e ? Y("visualElementStateChanged", g, f) : d ? O("visualElementStateChanged", g, d, f) : W("visualElementStateChanged",
                        g, f))
                }
            }
        }
    };
    X(c.layer) || a.j();
    if (c.fa)
        for (const d of c.fa) ki(a, d, c.layer);
    else th(Error("Delayed screen needs a data promise."))
}

function ii(a, b, c = {}) {
    c.layer || (c.layer = 0);
    var d = void 0 !== c.Ca ? c.Ca : c.layer;
    var e = X(d);
    d = Vg(d);
    let f;
    d && (void 0 !== c.parentCsn ? f = {
        clientScreenNonce: c.parentCsn,
        visualElement: d
    } : e && "UNDEFINED_CSN" !== e && (f = {
        clientScreenNonce: e,
        visualElement: d
    }));
    let g;
    const h = K("EVENT_ID");
    "UNDEFINED_CSN" === e && h && (g = {
        servletData: {
            serializedServletEventId: h
        }
    });
    let k;
    try {
        k = Jh(a.client, b, f, c.ea, c.cttAuthInfo, g, c.sb)
    } catch (m) {
        a = m;
        c = [{
            Db: b,
            rootVe: d,
            parentVisualElement: void 0,
            qb: e,
            yb: f,
            ea: c.ea
        }];
        a.args || (a.args = []);
        a.args.push(...c);
        th(m);
        return
    }
    Zg(k, b, c.layer, c.cttAuthInfo);
    if ((b = e && "UNDEFINED_CSN" !== e && d) && !(b = L("screen_manager_skip_hide_killswitch"))) {
        a: {
            for (l of Object.values(Og))
                if (X(l) == e) {
                    var l = !0;
                    break a
                }
            l = !1
        }
        b = !l
    }
    b && Mh(a.client, e, d, !0);
    a.h[a.h.length - 1] && !a.h[a.h.length - 1].csn && (a.h[a.h.length - 1].csn = k || "");
    d = Sh.s();
    d.clear();
    d.j = X();
    d = Vg(c.layer);
    e && "UNDEFINED_CSN" !== e && d && (L("web_mark_root_visible") || L("music_web_mark_root_visible")) && Lh(void 0, k, d, void 0);
    a.i.delete(c.layer || 0);
    a.j = void 0;
    for (const [m, p] of a.M) e =
        m, p.has(c.layer) && d && ji(a, e, d, c.layer);
    for (c = 0; c < a.l.length; c++) {
        e = a.l[c];
        try {
            e()
        } catch (m) {
            th(m)
        }
    }
    a.l.length = 0;
    for (c = 0; c < a.o.length; c++) {
        e = a.o[c];
        try {
            e()
        } catch (m) {
            th(m)
        }
    }
}

function li(a) {
    var b = 28631,
        c = {
            layer: 8
        };
    [28631].includes(b) || (uh(new R("createClientScreen() called with a non-page VE", b)), b = 83769);
    c.isHistoryNavigation || a.h.push({
        rootVe: b,
        key: c.key || ""
    });
    a.m = [];
    a.C = [];
    c.fa ? hi(a, b, c) : ii(a, b, c)
}

function ki(a, b, c = 0) {
    b.then(d => {
        var e, f;
        a.i.has(c) && a.j && a.j();
        const g = X(c),
            h = Vg(c);
        g && h && ((null === (e = null === d || void 0 === d ? void 0 : d.response) || void 0 === e ? 0 : e.trackingParams) && Kh(a.client, g, h, [new Rg({
            trackingParams: d.response.trackingParams
        })]), (null === (f = null === d || void 0 === d ? void 0 : d.playerResponse) || void 0 === f ? 0 : f.trackingParams) && Kh(a.client, g, h, [new Rg({
            trackingParams: d.playerResponse.trackingParams
        })]))
    })
}

function ji(a, b, c, d = 0) {
    if (a.i.has(d)) a.m.push([b, c]);
    else {
        var e = X(d);
        c = c || Vg(d);
        e && c && Kh(a.client, e, c, [b])
    }
}

function mi(a, b) {
    b = new Rg({
        trackingParams: b
    });
    ji(a, b, void 0, 8);
    return b
}

function ni(a, b, c = 0) {
    (c = X(c)) && Nh(a.client, c, b, void 0)
}

function oi(a, b, c, d = 0) {
    if (!b) return !1;
    d = X(d);
    if (!d) return !1;
    Nh(a.client, d, new Rg({
        trackingParams: b
    }), c);
    return !0
}

function pi(a, b) {
    const c = b.va && b.va();
    b.visualElement ? ni(a, b.visualElement, c) : (b = Oh(Sh.s(), b), oi(a, b, void 0, c))
}
var gi = class {
    constructor() {
        this.m = [];
        this.C = [];
        this.h = [];
        this.l = [];
        this.o = [];
        this.i = new Set;
        this.M = new Map
    }
    clickCommand(a, b, c = 0) {
        return oi(this, a.clickTrackingParams, b, c)
    }
};
var qi = class extends D {
    constructor(a) {
        super(a)
    }
};
var ri = class extends D {
    constructor(a) {
        super(a)
    }
};
ri.ma = "yt.sw.adr";

function si(a) {
    return t(function*() {
        var b = yield u.fetch(a.i);
        if (200 !== b.status) return Promise.reject("Server error when retrieving AmbientData");
        b = yield b.text();
        if (!b.startsWith(")]}'\n")) return Promise.reject("Incorrect JSPB formatting");
        a: {
            b = JSON.parse(b.substring(5));
            for (let c = 0; c < b.length; c++)
                if (b[c][0] === (new ri).constructor.ma) {
                    b = new ri(b[c]);
                    break a
                }
            b = null
        }
        return b ? b : Promise.reject("AmbientData missing from response")
    })
}

function ti(a = !1) {
    const b = ui.h;
    return t(function*() {
        if (a || !b.h) b.h = si(b).then(b.j).catch(c => {
            delete b.h;
            th(c)
        });
        return b.h
    })
}
var ui = class {
    constructor() {
        this.i = `${self.location.origin}/sw.js_data`
    }
    j(a) {
        const b = ob(a, qi, 2);
        if (b) {
            const c = A(b, 5);
            c && (u.__SAPISID = c);
            L("enable_web_eom_visitor_data") && null != A(b, 10) ? J("EOM_VISITOR_DATA", A(b, 10)) : null != A(b, 7) && J("VISITOR_DATA", A(b, 7));
            null != A(b, 4) && J("SESSION_INDEX", String(A(b, 4)));
            null != A(b, 8) && J("DELEGATED_SESSION_ID", A(b, 8))
        }
        return a
    }
};

function vi(a) {
    const b = {};
    var c = kc();
    c && (b.Authorization = c, c = a = null === a || void 0 === a ? void 0 : a.sessionIndex, void 0 === c && (c = Number(K("SESSION_INDEX", 0)), c = isNaN(c) ? 0 : c), b["X-Goog-AuthUser"] = c, "INNERTUBE_HOST_OVERRIDE" in I || (b["X-Origin"] = window.location.origin), void 0 === a && "DELEGATED_SESSION_ID" in I && (b["X-Goog-PageId"] = K("DELEGATED_SESSION_ID")));
    return b
}
var wi = class {
    constructor() {
        this.Fa = !0
    }
};
var xi = {
    identityType: "UNAUTHENTICATED_IDENTITY_TYPE_UNKNOWN"
};

function yi(a, b) {
    b.encryptedTokenJarContents && (a.h[b.encryptedTokenJarContents] = b, "string" === typeof b.expirationSeconds && setTimeout(() => {
        delete a.h[b.encryptedTokenJarContents]
    }, 1E3 * Number(b.expirationSeconds)))
}
var zi = class {
    constructor() {
        this.h = {}
    }
    handleResponse(a, b) {
        var c, d, e;
        b = (null === (d = null === (c = b.I.context) || void 0 === c ? void 0 : c.request) || void 0 === d ? void 0 : d.consistencyTokenJars) || [];
        if (a = null === (e = a.responseContext) || void 0 === e ? void 0 : e.consistencyTokenJar) {
            for (const f of b) delete this.h[f.encryptedTokenJarContents];
            yi(this, a)
        }
    }
};

function Ai() {
    var a = K("INNERTUBE_CONTEXT");
    if (!a) return th(Error("Error: No InnerTubeContext shell provided in ytconfig.")), {};
    a = sa(a);
    L("web_no_tracking_params_in_shell_killswitch") || delete a.clickTracking;
    a.client || (a.client = {});
    var b = a.client;
    b.utcOffsetMinutes = -Math.floor((new Date).getTimezoneOffset());
    var c = Rd();
    c ? b.experimentsToken = c : delete b.experimentsToken;
    zi.h || (zi.h = new zi);
    b = zi.h.h;
    c = [];
    let d = 0;
    for (const e in b) c[d++] = b[e];
    a.request = Object.assign(Object.assign({}, a.request), {
        consistencyTokenJars: c
    });
    a.user = Object.assign({}, a.user);
    return a
};

function Bi(a) {
    var b = a;
    if (a = K("INNERTUBE_HOST_OVERRIDE")) {
        a = String(a);
        var c = String,
            d = b.match(z);
        b = d[5];
        var e = d[6];
        d = d[7];
        var f = "";
        b && (f += b);
        e && (f += "?" + e);
        d && (f += "#" + d);
        b = a + c(f)
    }
    return b
};
var Ci = class {};
const Di = {
    GET_DATASYNC_IDS: function(a) {
        return () => new a
    }(class extends Ci {})
};

function Ei(a) {
    var b = {
        pb: {}
    };
    wi.h || (wi.h = new wi);
    var c = wi.h;
    if (void 0 !== Fi.h) {
        const d = Fi.h;
        a = [b !== d.m, a !== d.l, c !== d.j, !1, !1, void 0 !== d.i];
        if (a.some(e => e)) throw new R("InnerTubeTransportService is already initialized", a);
    } else Fi.h = new Fi(b, a, c)
}

function Gi(a, b, c) {
    return t(function*() {
        var d;
        if (a.j.Fa) {
            const e = null === (d = null === b || void 0 === b ? void 0 : b.da) || void 0 === d ? void 0 : d.sessionIndex;
            d = vi({
                sessionIndex: e
            });
            d = Object.assign(Object.assign({}, Hi(c)), d)
        } else d = Ii(b, c);
        return d
    })
}

function Ji(a, b, c) {
    return t(function*() {
        var d, e, f, g;
        const h = null === (d = b.config) || void 0 === d ? void 0 : d.Cb;
        if (h && a.h.has(h) && L("web_memoize_inflight_requests")) return a.h.get(h);
        if (null === (e = null === b || void 0 === b ? void 0 : b.I) || void 0 === e ? 0 : e.context)
            for (var k of []) k.zb(b.I.context);
        if (null === (f = a.i) || void 0 === f ? 0 : f.l(b.input, b.I)) return a.i.j(b.input, b.I);
        k = JSON.stringify(b.I);
        b.U = Object.assign(Object.assign({}, b.U), {
            headers: c
        });
        let l = Object.assign({}, b.U);
        "POST" === b.U.method && (l = Object.assign(Object.assign({},
            l), {
            body: k
        }));
        k = a.l.fetch(b.input, l, b.config);
        h && a.h.set(h, k);
        k = yield k;
        h && a.h.has(h) && a.h.delete(h);
        !k && (null === (g = a.i) || void 0 === g ? 0 : g.h(b.input, b.I)) && (k = yield a.i.i(b.input, b.I));
        return k
    })
}

function Ki(a, b, c) {
    var d = {
        da: {
            identity: xi
        }
    };
    b.context || (b.context = Ai());
    return new E(e => t(function*() {
        var f = Bi(c);
        f = me(f) ? "same-origin" : "cors";
        f = yield Gi(a, d, f);
        var g = Bi(c);
        var h = {};
        K("INNERTUBE_OMIT_API_KEY_WHEN_AUTH_HEADER_IS_PRESENT") && (null === f || void 0 === f ? 0 : f.Authorization) || (h.key = K("INNERTUBE_API_KEY"));
        L("json_condensed_response") && (h.prettyPrint = "false");
        g = le(g, h || {}, !1);
        h = {
            method: "POST",
            mode: me(g) ? "same-origin" : "cors",
            credentials: me(g) ? "same-origin" : "include"
        };
        e(Ji(a, {
                input: g,
                U: h,
                I: b,
                config: d
            },
            f))
    }))
}

function Ii(a, b) {
    return t(function*() {
        var c, d = {
            sessionIndex: null === (c = null === a || void 0 === a ? void 0 : a.da) || void 0 === c ? void 0 : c.sessionIndex
        };
        d = yield Hc(vi(d));
        return Promise.resolve(Object.assign(Object.assign({}, Hi(b)), d))
    })
}

function Hi(a) {
    const b = {
        "Content-Type": "application/json"
    };
    L("enable_web_eom_visitor_data") && K("EOM_VISITOR_DATA") ? b["X-Goog-EOM-Visitor-Id"] = K("EOM_VISITOR_DATA") : K("VISITOR_DATA") && (b["X-Goog-Visitor-Id"] = K("VISITOR_DATA"));
    "cors" !== a && ((a = K("INNERTUBE_CONTEXT_CLIENT_NAME")) && (b["X-Youtube-Client-Name"] = a), (a = K("INNERTUBE_CONTEXT_CLIENT_VERSION")) && (b["X-Youtube-Client-Version"] = a), (a = K("CHROME_CONNECTED_HEADER")) && (b["X-Youtube-Chrome-Connected"] = a), L("forward_domain_admin_state_on_embeds") && (a =
        K("DOMAIN_ADMIN_STATE")) && (b["X-Youtube-Domain-Admin-State"] = a));
    return b
}
var Fi = class {
    constructor(a, b, c) {
        this.m = a;
        this.l = b;
        this.j = c;
        this.i = void 0;
        this.h = new Map;
        a.ba || (a.ba = {});
        a.ba = Object.assign(Object.assign({}, Di), a.ba)
    }
};
let Li;

function Mi() {
    Li || (Ei({
        fetch: (a, b) => Hc(fetch(new Request(a, b)))
    }), Li = Fi.h);
    return Li
};

function Ni(a) {
    return t(function*() {
        yield Oi();
        uh(a)
    })
}

function Pi(a) {
    t(function*() {
        var b = yield fg();
        b ? yield Fg(a, b): (yield ti(), b = {
            timestamp: a.timestamp
        }, b = a.appShellAssetLoadReport ? {
            payloadName: "appShellAssetLoadReport",
            payload: a.appShellAssetLoadReport,
            options: b
        } : a.clientError ? {
            payloadName: "clientError",
            payload: a.clientError,
            options: b
        } : void 0, b && W(b.payloadName, b.payload))
    })
}

function Oi() {
    return t(function*() {
        try {
            yield ti()
        } catch (a) {}
    })
};
const Qi = {
    granted: "GRANTED",
    denied: "DENIED",
    unknown: "UNKNOWN"
};

function Ri(a) {
    var b = a.data;
    a = b.type;
    b = b.data;
    "notifications_register" === a ? (Z("IDToken", b), Si()) : "notifications_check_registration" === a && Ti(b)
}

function Ui() {
    return self.clients.matchAll({
        type: "window",
        includeUncontrolled: !0
    }).then(a => {
        if (a)
            for (const b of a) b.postMessage({
                type: "update_unseen_notifications_count_signal"
            })
    })
}

function Vi(a) {
    const b = [];
    a.forEach(c => {
        b.push({
            key: c.key,
            value: c.value
        })
    });
    return b
}

function Wi(a) {
    return t(function*() {
        const b = Vi(a.payload.chrome.extraUrlParams),
            c = {
                recipientId: a.recipientId,
                endpoint: a.payload.chrome.endpoint,
                extraUrlParams: b
            },
            d = bi(Ad);
        return Xi().then(e => Ki(e, c, d).then(f => {
            f.json().then(g => {
                if (!g || !g.endpointUrl) return Promise.resolve();
                a.payload.chrome.postedEndpoint && Yi(a.payload.chrome.postedEndpoint);
                return Zi(a, g.endpointUrl)
            })
        }))
    })
}

function $i(a, b) {
    var c = X(8);
    return null != c && b ? `${a}&parentCsn=${c}&parentTrackingParams=${b}` : a
}

function Zi(a, b) {
    var c;
    a.deviceId && Z("DeviceId", a.deviceId);
    a.timestampSec && Z("TimestampLowerBound", a.timestampSec);
    const d = a.payload.chrome,
        e = fi();
    li(e);
    const f = null === (c = d.postedEndpoint) || void 0 === c ? void 0 : c.clickTrackingParams;
    if (f) {
        var g = mi(e, f);
        var h = Qg(82046);
        var k = Qg(74726);
        ji(e, h, g, 8);
        ji(e, k, g, 8);
        g = {
            na: 8,
            visualElement: g
        };
        k = {
            na: 8,
            visualElement: h
        };
        h = {
            na: 8,
            visualElement: h
        }
    }
    const l = {
        body: d.body,
        icon: d.iconUrl,
        data: {
            nav: $i(b, f),
            id: d.notificationId,
            attributionTag: d.attributionTag,
            clickEndpoint: d.clickEndpoint,
            parentElement: g,
            cancelElement: k,
            dismissalElement: h,
            isDismissed: !0
        },
        tag: d.notificationTag || d.title + d.body + d.iconUrl,
        requireInteraction: !0
    };
    return self.registration.showNotification(d.title, l).then(() => {
        var m, p, r;
        (null === (m = l.data) || void 0 === m ? 0 : m.parentElement) && Rh(Sh.s(), l.data.parentElement);
        (null === (p = l.data) || void 0 === p ? 0 : p.cancelElement) && Rh(Sh.s(), l.data.cancelElement);
        (null === (r = l.data) || void 0 === r ? 0 : r.dismissalElement) && Rh(Sh.s(), l.data.dismissalElement);
        aj(a.displayCap)
    }).catch(() => {})
}

function Yi(a) {
    if (!a.recordNotificationInteractionsEndpoint) return Promise.reject();
    const b = {
            serializedRecordNotificationInteractionsRequest: a.recordNotificationInteractionsEndpoint.serializedInteractionsRequest
        },
        c = bi(Bd);
    return Xi().then(d => Ki(d, b, c))
}

function aj(a) {
    -1 !== a && self.registration.getNotifications().then(b => {
        var c;
        for (let d = 0; d < b.length - a; d++) b[d].data.isDismissed = !1, b[d].close(), (null === (c = b[d].data) || void 0 === c ? 0 : c.cancelElement) && pi(fi(), b[d].data.cancelElement)
    })
}

function Ti(a) {
    const b = [bj(a), Yh("RegistrationTimestamp").then(cj), dj(), ej(), fj()];
    Promise.all(b).catch(() => {
        Z("IDToken", a);
        Si();
        return Promise.resolve()
    })
}

function cj(a) {
    a = a || 0;
    return 9E7 >= Date.now() - a ? Promise.resolve() : Promise.reject()
}

function bj(a) {
    return Yh("IDToken").then(b => a === b ? Promise.resolve() : Promise.reject())
}

function dj() {
    return Yh("Permission").then(a => Notification.permission === a ? Promise.resolve() : Promise.reject())
}

function ej() {
    return Yh("Endpoint").then(a => gj().then(b => a === b ? Promise.resolve() : Promise.reject()))
}

function fj() {
    return Yh("application_server_key").then(a => hj().then(b => a === b ? Promise.resolve() : Promise.reject()))
}

function ij() {
    var a = Notification.permission;
    if (Qi[a]) return Qi[a]
}

function Si() {
    Z("RegistrationTimestamp", 0);
    Promise.all([gj(), jj(), kj(), hj()]).then(([a, b, c, d]) => {
        b = b ? Th(b) : null;
        c = c ? Th(c) : null;
        d = d ? Ma(new Uint8Array(d), 4) : null;
        lj(a, b, c, d)
    }).catch(() => {
        lj()
    })
}

function lj(a = null, b = null, c = null, d = null) {
    Xh().then(e => {
        e && (Z("Endpoint", a), Z("P256dhKey", b), Z("AuthKey", c), Z("application_server_key", d), Z("Permission", Notification.permission), Promise.all([Yh("DeviceId"), Yh("NotificationsDisabled")]).then(([f, g]) => {
            if (null !== f && void 0 !== f) var h = f;
            else {
                f = [];
                var k;
                h = h || Uc.length;
                for (k = 0; 256 > k; k++) f[k] = Uc[0 | Math.random() * h];
                h = f.join("")
            }
            mj(h, null !== a && void 0 !== a ? a : void 0, null !== b && void 0 !== b ? b : void 0, null !== c && void 0 !== c ? c : void 0, null !== d && void 0 !== d ? d : void 0, null !==
                g && void 0 !== g ? g : void 0)
        }))
    })
}

function mj(a, b, c, d, e, f) {
    t(function*() {
        const g = {
                notificationRegistration: {
                    chromeRegistration: {
                        deviceId: a,
                        pushParams: {
                            applicationServerKey: e,
                            authKey: d,
                            p256dhKey: c,
                            browserEndpoint: b
                        },
                        notificationsDisabledInApp: f,
                        permission: ij()
                    }
                }
            },
            h = bi(Cd);
        return Xi().then(k => Ki(k, g, h).then(() => {
            Z("DeviceId", a);
            Z("RegistrationTimestamp", Date.now());
            Z("TimestampLowerBound", Date.now())
        }, l => {
            Ni(l)
        }))
    })
}

function gj() {
    return self.registration.pushManager.getSubscription().then(a => a ? Promise.resolve(a.endpoint) : Promise.resolve(null))
}

function jj() {
    return self.registration.pushManager.getSubscription().then(a => a && a.getKey ? Promise.resolve(a.getKey("p256dh")) : Promise.resolve(null))
}

function kj() {
    return self.registration.pushManager.getSubscription().then(a => a && a.getKey ? Promise.resolve(a.getKey("auth")) : Promise.resolve(null))
}

function hj() {
    return self.registration.pushManager.getSubscription().then(a => a ? Promise.resolve(a.options.applicationServerKey) : Promise.resolve(null))
}

function Xi() {
    return t(function*() {
        try {
            return yield ti(!0), Mi()
        } catch (a) {
            return yield Ni(a), Promise.reject(a)
        }
    })
};
let nj = void 0;

function oj(a) {
    return t(function*() {
        nj || (nj = yield a.open("yt-appshell-assets"));
        return nj
    })
}

function pj(a, b) {
    return t(function*() {
        const c = yield oj(a), d = b.map(e => qj(c, e));
        return Promise.all(d)
    })
}

function rj(a, b) {
    return t(function*() {
        let c;
        try {
            c = yield a.match(b, {
                cacheName: "yt-appshell-assets"
            })
        } catch (d) {}
        return c
    })
}

function sj(a, b) {
    return t(function*() {
        const c = yield oj(a), d = (yield c.keys()).filter(e => !b.includes(e.url)).map(e => c.delete(e));
        return Promise.all(d)
    })
}

function tj(a, b, c) {
    return t(function*() {
        yield(yield oj(a)).put(b, c)
    })
}

function uj(a, b) {
    t(function*() {
        yield(yield oj(a)).delete(b)
    })
}

function qj(a, b) {
    return t(function*() {
        return (yield a.match(b)) ? Promise.resolve() : a.add(b)
    })
};
var vj;
vj = Ag("yt-serviceworker-metadata", {
    L: {
        auth: {
            N: 1
        },
        ["resource-manifest-assets"]: {
            N: 2
        }
    },
    aa: !0,
    upgrade(a, b) {
        b(1) && Gf(a, "resource-manifest-assets");
        b(2) && Gf(a, "auth")
    },
    version: 2
});
let wj = null;

function xj(a) {
    return Xf(vj(), a)
}

function yj() {
    const a = Date.now();
    return IDBKeyRange.bound(0, a)
}

function zj(a, b) {
    return t(function*() {
        yield V(yield xj(a.token), ["resource-manifest-assets"], "readwrite", c => {
            const d = c.objectStore("resource-manifest-assets"),
                e = Date.now();
            return U(d.h.put(b, e)).then(() => {
                wj = e;
                let f = !0;
                return Lf(d, {
                    query: yj(),
                    direction: "prev"
                }, g => f ? (f = !1, g.advance(5)) : d.delete(g.getKey()).then(() => g.continue()))
            })
        })
    })
}

function Aj(a, b) {
    return t(function*() {
        let c = !1,
            d = 0;
        yield V(yield xj(a.token), ["resource-manifest-assets"], "readonly", e => Lf(e.objectStore("resource-manifest-assets"), {
            query: yj(),
            direction: "prev"
        }, f => {
            if (f.ia().includes(b)) c = !0;
            else return d += 1, f.continue()
        }));
        return c ? d : -1
    })
}

function Bj(a) {
    return t(function*() {
        wj || (yield V(yield xj(a.token), ["resource-manifest-assets"], "readonly", b => Lf(b.objectStore("resource-manifest-assets"), {
            query: yj(),
            direction: "prev"
        }, c => {
            wj = c.getKey()
        })));
        return wj
    })
}
var Cj = class {
    constructor(a) {
        this.token = a
    }
    static s() {
        return t(function*() {
            const a = yield fg();
            if (a) return Cj.h || (Cj.h = new Cj(a)), Cj.h
        })
    }
};

function Dj(a, b) {
    return t(function*() {
        yield If(yield xj(a.token), "auth", b, "shell_identifier_key")
    })
}

function Ej(a) {
    return t(function*() {
        return (yield(yield xj(a.token)).get("auth", "shell_identifier_key")) || ""
    })
}

function Fj(a) {
    return t(function*() {
        yield(yield xj(a.token)).clear("auth")
    })
}
var Gj = class {
    constructor(a) {
        this.token = a
    }
    static s() {
        return t(function*() {
            const a = yield fg();
            if (a) return Gj.h || (Gj.h = new Gj(a)), Gj.h
        })
    }
};

function Hj() {
    t(function*() {
        const a = yield Gj.s();
        a && (yield Fj(a))
    })
};

function Ij() {
    return [1, Wb]
}
var Jj = class extends D {
    constructor(a) {
        super(a)
    }
};

function Tb() {
    return [1, Xb, Jj, Ij]
}
var Sb = class extends D {
        constructor(a) {
            super(a, -1, Kj)
        }
    },
    Kj = [1];

function Lj(a) {
    return t(function*() {
        const b = a.headers.get("X-Resource-Manifest");
        return b ? Promise.resolve(Mj(b)) : Promise.reject(Error("No resource manifest header"))
    })
}

function Mj(a) {
    return pb(Ub(decodeURIComponent(a)), Jj, 1).reduce((b, c) => {
        (c = A(c, 1)) && b.push(c);
        return b
    }, [])
};

function Nj(a) {
    return t(function*() {
        const b = yield ti();
        if (b && null != A(b, 3)) {
            var c = yield Gj.s();
            c && (c = yield Ej(c), A(b, 3) !== c && (uj(a.h, a.i), Hj()))
        }
    })
}

function Oj(a) {
    return t(function*() {
        let b, c;
        try {
            c = yield Pj(a.j), b = yield Lj(c), yield pj(a.h, b)
        } catch (d) {
            return Promise.reject(d)
        }
        try {
            yield Qj(), yield tj(a.h, a.i, c)
        } catch (d) {
            return Promise.reject(d)
        }
        if (b) try {
            yield Rj(a, b, a.i)
        } catch (d) {}
        return Promise.resolve()
    })
}

function Sj(a) {
    return t(function*() {
        yield Nj(a);
        return Oj(a)
    })
}

function Pj(a) {
    return t(function*() {
        try {
            return yield u.fetch(new Request(a))
        } catch (b) {
            return Promise.reject(b)
        }
    })
}

function Qj() {
    return t(function*() {
        var a = yield ti();
        let b;
        a && null != A(a, 3) && (b = A(a, 3));
        return b ? (a = yield Gj.s()) ? Promise.resolve(Dj(a, b)) : Promise.reject(Error("Could not get AuthMonitor instance")) : Promise.reject(Error("Could not get datasync ID"))
    })
}

function Rj(a, b, c) {
    return t(function*() {
        const d = yield Cj.s();
        if (d) try {
            yield zj(d, b)
        } catch (e) {
            yield Ni(e)
        }
        b.push(c);
        try {
            yield sj(a.h, b)
        } catch (e) {
            yield Ni(e)
        }
        return Promise.resolve()
    })
}

function Tj(a, b) {
    return t(function*() {
        return rj(a.h, b)
    })
}

function Uj(a) {
    return t(function*() {
        return rj(a.h, a.i)
    })
}
var Vj = class {
    constructor() {
        var a = self.location.origin + "/app_shell",
            b = self.location.origin + "/app_shell_home";
        this.h = self.caches;
        this.j = a;
        this.i = b
    }
};

function Wj(a, b) {
    return t(function*() {
        const c = b.request,
            d = yield Tj(a.h, c.url);
        if (d) return Pi({
            appShellAssetLoadReport: {
                assetPath: c.url,
                cacheHit: !0
            },
            timestamp: M()
        }), d;
        Xj(c);
        return Yj(b)
    })
}

function Zj(a, b) {
    return t(function*() {
        const c = yield ak(b);
        if (c.response && (c.response.ok || "opaqueredirect" === c.response.type || 429 === c.response.status || 303 === c.response.status || 300 <= c.response.status && 400 > c.response.status)) return c.response;
        const d = yield Uj(a.h);
        if (d) return bk(a), d;
        ck(a);
        return c.response ? c.response : Promise.reject(c.error)
    })
}

function dk(a, b) {
    b = new URL(b);
    if (!a.i.includes(b.pathname)) return !1;
    if (!b.search) return !0;
    for (const c of a.l)
        if (a = b.searchParams.get(c.key), void 0 === c.value || a === c.value)
            if (b.searchParams.delete(c.key), !b.search) return !0;
    return !1
}

function ek(a, b) {
    return t(function*() {
        const c = yield Uj(a.h);
        if (!c) return ck(a), Yj(b);
        bk(a);
        var d;
        a: {
            if (c.headers && (d = c.headers.get("date")) && (d = Date.parse(d), !isNaN(d))) {
                d = Math.round(M() - d);
                break a
            }
            d = -1
        }
        if (!(-1 < d && 7 <= d / 864E5)) return c;
        d = yield ak(b);
        return d.response && d.response.ok ? d.response : c
    })
}

function Yj(a) {
    return Promise.resolve(a.preloadResponse).then(b => b || u.fetch(a.request))
}

function Xj(a) {
    const b = {
        assetPath: a.url,
        cacheHit: !1
    };
    Cj.s().then(c => {
        if (c) {
            var d = Bj(c).then(e => {
                e && (b.currentAppBundleTimestampSec = String(Math.floor(e / 1E3)))
            });
            c = Aj(c, a.url).then(e => {
                b.appBundleVersionDiffCount = e
            });
            Promise.all([d, c]).catch(e => {
                Ni(e)
            }).finally(() => {
                Pi({
                    appShellAssetLoadReport: b,
                    timestamp: M()
                })
            })
        } else Pi({
            appShellAssetLoadReport: b,
            timestamp: M()
        })
    })
}

function bk(a) {
    Pi({
        appShellAssetLoadReport: {
            assetPath: a.h.i,
            cacheHit: !0
        },
        timestamp: M()
    })
}

function ck(a) {
    Pi({
        appShellAssetLoadReport: {
            assetPath: a.h.i,
            cacheHit: !1
        },
        timestamp: M()
    })
}

function ak(a) {
    return t(function*() {
        try {
            return {
                response: yield Yj(a)
            }
        } catch (b) {
            return {
                error: b
            }
        }
    })
}
var kk = class {
    constructor() {
        var a = fk,
            b = gk,
            c = hk,
            d = ik;
        const e = [];
        e.push({
            key: "feature",
            value: "ytca"
        });
        for (var f of bc) e.push({
            key: f
        });
        f = jk();
        this.h = a;
        this.m = b;
        this.o = c;
        this.i = d;
        this.l = e;
        this.j = f
    }
};
var ik = ["/", "/feed/downloads"];
const lk = [/^\/$/, /^\/feed\/downloads$/],
    mk = [/^\/$/, /^\/feed\/\w*/, /^\/results$/, /^\/playlist$/, /^\/watch$/, /^\/channel\/\w*/];

function jk() {
    return new RegExp((L("kevlar_sw_app_wide_fallback") ? mk : lk).map(a => a.source).join("|"))
}
var gk = /^https:\/\/[\w-]*\.?youtube\.com.*(\.css$|\.js$|\.ico$|\/ytmweb\/_\/js\/|\/ytmweb\/_\/ss\/)/,
    hk = /^https:\/\/[\w-]*\.?youtube\.com.*(purge_shell=1|\/signin|\/logout)/;
var nk = class {
    constructor() {
        var a = fk,
            b = new kk;
        this.h = self;
        this.i = a;
        this.m = b;
        this.M = Uh
    }
    init() {
        this.h.oninstall = this.o.bind(this);
        this.h.onactivate = this.j.bind(this);
        this.h.onfetch = this.l.bind(this);
        this.h.onmessage = this.C.bind(this)
    }
    o(a) {
        this.h.skipWaiting();
        const b = Sj(this.i).catch(c => {
            Ni(c);
            return Promise.resolve()
        });
        a.waitUntil(b)
    }
    j(a) {
        const b = [this.h.clients.claim()];
        this.h.registration.navigationPreload && b.push(this.h.registration.navigationPreload.enable());
        a.waitUntil(Promise.all(b))
    }
    l(a) {
        const b = this;
        return t(function*() {
            var c = b.m,
                d = !!b.h.registration.navigationPreload;
            const e = a.request;
            if (c.o.test(e.url)) ui.h && (delete ui.h.h, u.__SAPISID = void 0, J("VISITOR_DATA", void 0), J("SESSION_INDEX", void 0), J("DELEGATED_SESSION_ID", void 0)), d = a.respondWith, c = c.h, uj(c.h, c.i), Hj(), c = Yj(a), d.call(a, c);
            else if (c.m.test(e.url)) a.respondWith(Wj(c,
                a));
            else if ("navigate" === e.mode) {
                if (L("sw_nav_request_network_first")) {
                    var f = new URL(e.url);
                    f = c.j.test(f.pathname)
                } else f = !1;
                f ? a.respondWith(Zj(c, a)) : dk(c, e.url) ? a.respondWith(ek(c, a)) : d && a.respondWith(Yj(a))
            }
        })
    }
    C(a) {
        const b = a.data;
        this.M.includes(b.type) ? Ri(a) : "refresh_shell" === b.type && Oj(this.i).catch(c => {
            Ni(c)
        })
    }
};
var ok = class {
    static s() {
        let a = v("ytglobal.storage_");
        a || (a = new ok, w("ytglobal.storage_", a));
        return a
    }
    estimate() {
        return t(function*() {
            var a, b;
            const c = navigator;
            if (null === (a = c.storage) || void 0 === a ? 0 : a.estimate) return c.storage.estimate();
            if (null === (b = c.webkitTemporaryStorage) || void 0 === b ? 0 : b.queryUsageAndQuota) return pk()
        })
    }
};

function pk() {
    const a = navigator;
    return new Promise((b, c) => {
        var d;
        null !== (d = a.webkitTemporaryStorage) && void 0 !== d && d.queryUsageAndQuota ? a.webkitTemporaryStorage.queryUsageAndQuota((e, f) => {
            b({
                usage: e,
                quota: f
            })
        }, e => {
            c(e)
        }) : c(Error("webkitTemporaryStorage is not supported."))
    })
}
w("ytglobal.storageClass_", ok);

function qk(a, b) {
    ok.s().estimate().then(c => {
        c = Object.assign(Object.assign({}, b), {
            isSw: void 0 === self.document,
            isIframe: self !== self.top,
            deviceStorageUsageMbytes: rk(null === c || void 0 === c ? void 0 : c.usage),
            deviceStorageQuotaMbytes: rk(null === c || void 0 === c ? void 0 : c.quota)
        });
        a.h("idbQuotaExceeded", c)
    })
}
class sk {
    constructor() {
        var a = tk;
        this.handleError = uk;
        this.h = a;
        this.i = !1;
        void 0 === self.document || self.addEventListener("beforeunload", () => {
            this.i = !0
        });
        this.j = Math.random() <= Qd("ytidb_transaction_ended_event_rate_limit", .02)
    }
    O(a, b) {
        switch (a) {
            case "IDB_DATA_CORRUPTED":
                L("idb_data_corrupted_killswitch") || this.h("idbDataCorrupted", b);
                break;
            case "IDB_UNEXPECTEDLY_CLOSED":
                this.h("idbUnexpectedlyClosed", b);
                break;
            case "IS_SUPPORTED_COMPLETED":
                L("idb_is_supported_completed_killswitch") || this.h("idbIsSupportedCompleted", b);
                break;
            case "QUOTA_EXCEEDED":
                qk(this, b);
                break;
            case "TRANSACTION_ENDED":
                this.j && this.h("idbTransactionEnded", b);
                break;
            case "TRANSACTION_UNEXPECTEDLY_ABORTED":
                a =
                    Object.assign(Object.assign({}, b), {
                        hasWindowUnloaded: this.i
                    }), this.h("idbTransactionAborted", a)
        }
    }
}

function rk(a) {
    return "undefined" === typeof a ? "-1" : String(Math.ceil(a / 1048576))
};
fh(ch(), {
    G: [{
        Ba: /Failed to fetch/,
        weight: 500
    }],
    D: []
});
var {
    handleError: uk = sh,
    O: tk = W
} = {
    handleError: function(a) {
        return t(function*() {
            yield Oi();
            th(a)
        })
    },
    O: function(a, b) {
        return t(function*() {
            yield Oi();
            W(a, b)
        })
    }
};
for (cf = new sk; 0 < bf.length;) {
    const a = bf.shift();
    switch (a.type) {
        case "ERROR":
            cf.handleError(a.payload);
            break;
        case "EVENT":
            cf.O(a.eventType, a.payload)
    }
}
ui.h = new ui;
self.onnotificationclick = function(a) {
    a.notification.close();
    const b = a.notification.data;
    b.isDismissed = !1;
    const c = self.clients.matchAll({
        type: "window",
        includeUncontrolled: !0
    });
    c.then(d => {
        a: {
            var e = b.nav;
            for (const f of d)
                if (f.url === e) {
                    f.focus();
                    break a
                }
            self.clients.openWindow(e)
        }
    });
    a.waitUntil(c);
    a.waitUntil(Yi(b.clickEndpoint))
};
self.onnotificationclose = function(a) {
    a = a.notification.data;
    if (null === a || void 0 === a ? 0 : a.parentElement) {
        a.isDismissed && (null === a || void 0 === a ? 0 : a.dismissalElement) && pi(fi(), a.dismissalElement);
        var b = Sh.s(),
            c = a.parentElement,
            d = Oh(0, c);
        a = c.visualElement ? c.visualElement : d;
        var e = b.l.has(a);
        const f = b.i.get(a);
        b.l.add(a);
        b.i.set(a, !1);
        !1 !== f && (d || c.visualElement) && (!(a = Ph(b, c)) || !Qh(c) && c.data && c.data.loggingDirectives || (d = c.visualElement ? c.visualElement : new Rg({
                trackingParams: d
            }), Qh(c) & 8 ? Mh(b.h, a, d) : Qh(c) &
            2 && !e && (b = b.h, c = {
                cttAuthInfo: Yg(a),
                A: a
            }, L("il_via_jspb") ? (e = new qd, e.B(a), d = d.getAsJspb(), C(e, 2, d), B(e, 4, 2), "UNDEFINED_CSN" == a ? Y("visualElementHidden", e, c) : Ah(e, c, b)) : (d = {
                csn: a,
                ve: d.getAsJson(),
                eventType: 2
            }, "UNDEFINED_CSN" == a ? Y("visualElementHidden", d, c) : b ? O("visualElementHidden", d, b, c) : W("visualElementHidden", d, c)))))
    }
};
self.onpush = function(a) {
    a.waitUntil(Yh("NotificationsDisabled").then(b => {
        if (b) return Promise.resolve();
        if (a.data && a.data.text().length) try {
            return Wi(a.data.json())
        } catch (c) {
            return Promise.resolve(c.message)
        }
        return Promise.resolve()
    }));
    a.waitUntil(Ui())
};
self.onpushsubscriptionchange = function() {
    Si()
};
const fk = new Vj;
(new nk).init();