!(function (e, n) {
  'function' == typeof define && define.amd
    ? define(['exports'], n)
    : n('undefined' != typeof exports ? exports : (e.syncscroll = {}));
})(this, function (e) {
  var n = 'Width',
    t = 'Height',
    o = 'Top',
    r = 'Left',
    f = 'scroll',
    i = 'client',
    s = 'EventListener',
    d = 'add' + s,
    c = 'length',
    a = Math.round,
    u = {},
    l = function () {
      var e,
        l,
        p,
        y,
        m,
        h = document.getElementsByClassName('sync' + f);
      for (m in u)
        if (u.hasOwnProperty(m))
          for (e = 0; e < u[m][c]; e++)
            u[m][e]['remove' + s](f, u[m][e].syn, 0);
      for (e = 0; e < h[c]; )
        if (((y = l = 0), (p = h[e++]), (m = p.getAttribute('name')))) {
          for (p = p[f + 'er'] || p; l < (u[m] = u[m] || [])[c]; )
            y |= u[m][l++] == p;
          y || u[m].push(p),
            (p.eX = p.eY = 0),
            (function (e, s) {
              e[d](
                f,
                (e.syn = function () {
                  var d,
                    l = u[s],
                    p = e[f + r],
                    y = e[f + o],
                    m = p / (e[f + n] - e[i + n]),
                    h = y / (e[f + t] - e[i + t]),
                    v = p != e.eX,
                    g = y != e.eY,
                    X = 0;
                  for (e.eX = p, e.eY = y; X < l[c]; )
                    (d = l[X++]),
                      d != e &&
                        (v &&
                          a(
                            d[f + r] - (p = d.eX = a(m * (d[f + n] - d[i + n])))
                          ) &&
                          (d[f + r] = p),
                        g &&
                          a(
                            d[f + o] - (y = d.eY = a(h * (d[f + t] - d[i + t])))
                          ) &&
                          (d[f + o] = y));
                }),
                0
              );
            })(p, m);
        }
    };
  'complete' == document.readyState ? l() : window[d]('load', l, 0),
    (e.reset = l);
});
