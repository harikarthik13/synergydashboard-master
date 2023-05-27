﻿/*
 Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
CKEDITOR.dialog.add("cellProperties", function (f) {
    function h(a) {
        return {
            isSpacer: !0,
            type: "html",
            html: "\x26nbsp;",
            requiredContent: a ? a : void 0
        }
    }

    function q() {
        return {
            type: "vbox",
            padding: 0,
            children: []
        }
    }

    function e(a) {
        return function (b) {
            for (var k = a(b[0]), c = 1; c < b.length; c++)
                if (a(b[c]) !== k) {
                    k = null;
                    break
                }
            "undefined" != typeof k && (this.setValue(k), CKEDITOR.env.gecko && "select" == this.type && !k && (this.getInputElement().$.selectedIndex = -1))
        }
    }

    function r(a) {
        if (a = u.exec(a.getStyle("width") || a.getAttribute("width"))) return a[2]
    }
    var l = f.lang.table,
        c = l.cell,
        d = f.lang.common,
        m = CKEDITOR.dialog.validate,
        u = /^(\d+(?:\.\d+)?)(px|%)$/,
        v = "rtl" == f.lang.dir,
        n = f.plugins.colordialog,
        d = [{
            requiredContent: "td{width}",
            type: "hbox",
            widths: ["70%", "30%"],
            children: [{
                type: "text",
                id: "width",
                width: "100px",
                label: d.width,
                validate: m.number(c.invalidWidth),
                onLoad: function () {
                    var a = this.getDialog().getContentElement("info", "widthType").getElement(),
                        b = this.getInputElement(),
                        c = b.getAttribute("aria-labelledby");
                    b.setAttribute("aria-labelledby", [c, a.$.id].join(" "))
                },
                setup: e(function (a) {
                    var b = parseInt(a.getAttribute("width"), 10);
                    a = parseInt(a.getStyle("width"), 10);
                    return isNaN(a) ? isNaN(b) ? "" : b : a
                }),
                commit: function (a) {
                    var b = parseInt(this.getValue(), 10),
                        c = this.getDialog().getValueOf("info", "widthType") || r(a);
                    isNaN(b) ? a.removeStyle("width") : a.setStyle("width", b + c);
                    a.removeAttribute("width")
                },
                "default": ""
            }, {
                type: "select",
                id: "widthType",
                label: f.lang.table.widthUnit,
                labelStyle: "visibility:hidden",
                "default": "px",
                items: [
                    [l.widthPx, "px"],
                    [l.widthPc, "%"]
                ],
                setup: e(r)
            }]
        }, {
            requiredContent: "td{height}",
            type: "hbox",
            widths: ["70%", "30%"],
            children: [{
                type: "text",
                id: "height",
                label: d.height,
                width: "100px",
                "default": "",
                validate: m.number(c.invalidHeight),
                onLoad: function () {
                    var a = this.getDialog().getContentElement("info", "htmlHeightType").getElement(),
                        b = this.getInputElement(),
                        c = b.getAttribute("aria-labelledby");
                    this.getDialog().getContentElement("info", "height").isVisible() && (a.setHtml("\x3cbr /\x3e" + l.widthPx), a.setStyle("display", "block"));
                    b.setAttribute("aria-labelledby", [c, a.$.id].join(" "))
                },
                setup: e(function (a) {
                    var b =
                        parseInt(a.getAttribute("height"), 10);
                    a = parseInt(a.getStyle("height"), 10);
                    return isNaN(a) ? isNaN(b) ? "" : b : a
                }),
                commit: function (a) {
                    var b = parseInt(this.getValue(), 10);
                    isNaN(b) ? a.removeStyle("height") : a.setStyle("height", CKEDITOR.tools.cssLength(b));
                    a.removeAttribute("height")
                }
            }, {
                id: "htmlHeightType",
                type: "html",
                html: "",
                style: "display: none"
            }]
        }, h(["td{width}", "td{height}"]), {
            type: "select",
            id: "wordWrap",
            requiredContent: "td{white-space}",
            label: c.wordWrap,
            "default": "yes",
            items: [
                [c.yes, "yes"],
                [c.no, "no"]
            ],
            setup: e(function (a) {
                var b =
                    a.getAttribute("noWrap");
                if ("nowrap" == a.getStyle("white-space") || b) return "no"
            }),
            commit: function (a) {
                "no" == this.getValue() ? a.setStyle("white-space", "nowrap") : a.removeStyle("white-space");
                a.removeAttribute("noWrap")
            }
        }, h("td{white-space}"), {
            type: "select",
            id: "hAlign",
            requiredContent: "td{text-align}",
            label: c.hAlign,
            "default": "",
            items: [
                [d.notSet, ""],
                [d.left, "left"],
                [d.center, "center"],
                [d.right, "right"],
                [d.justify, "justify"]
            ],
            setup: e(function (a) {
                var b = a.getAttribute("align");
                return a.getStyle("text-align") ||
                    b || ""
            }),
            commit: function (a) {
                var b = this.getValue();
                b ? a.setStyle("text-align", b) : a.removeStyle("text-align");
                a.removeAttribute("align")
            }
        }, {
            type: "select",
            id: "vAlign",
            requiredContent: "td{vertical-align}",
            label: c.vAlign,
            "default": "",
            items: [
                [d.notSet, ""],
                [d.alignTop, "top"],
                [d.alignMiddle, "middle"],
                [d.alignBottom, "bottom"],
                [c.alignBaseline, "baseline"]
            ],
            setup: e(function (a) {
                var b = a.getAttribute("vAlign");
                a = a.getStyle("vertical-align");
                switch (a) {
                    case "top":
                    case "middle":
                    case "bottom":
                    case "baseline":
                        break;
                    default:
                        a =
                            ""
                }
                return a || b || ""
            }),
            commit: function (a) {
                var b = this.getValue();
                b ? a.setStyle("vertical-align", b) : a.removeStyle("vertical-align");
                a.removeAttribute("vAlign")
            }
        }, h(["td{text-align}", "td{vertical-align}"]), {
            type: "select",
            id: "cellType",
            requiredContent: "th",
            label: c.cellType,
            "default": "td",
            items: [
                [c.data, "td"],
                [c.header, "th"]
            ],
            setup: e(function (a) {
                return a.getName()
            }),
            commit: function (a) {
                a.renameNode(this.getValue())
            }
        }, h("th"), {
            type: "text",
            id: "rowSpan",
            requiredContent: "td[rowspan]",
            label: c.rowSpan,
            "default": "",
            validate: m.integer(c.invalidRowSpan),
            setup: e(function (a) {
                if ((a = parseInt(a.getAttribute("rowSpan"), 10)) && 1 != a) return a
            }),
            commit: function (a) {
                var b = parseInt(this.getValue(), 10);
                b && 1 != b ? a.setAttribute("rowSpan", this.getValue()) : a.removeAttribute("rowSpan")
            }
        }, {
            type: "text",
            id: "colSpan",
            requiredContent: "td[colspan]",
            label: c.colSpan,
            "default": "",
            validate: m.integer(c.invalidColSpan),
            setup: e(function (a) {
                if ((a = parseInt(a.getAttribute("colSpan"), 10)) && 1 != a) return a
            }),
            commit: function (a) {
                var b = parseInt(this.getValue(),
                    10);
                b && 1 != b ? a.setAttribute("colSpan", this.getValue()) : a.removeAttribute("colSpan")
            }
        }, h(["td[colspan]", "td[rowspan]"]), {
            type: "hbox",
            padding: 0,
            widths: n ? ["60%", "40%"] : ["100%"],
            requiredContent: "td{background-color}",
            children: function () {
                var a = [{
                    type: "text",
                    id: "bgColor",
                    label: c.bgColor,
                    "default": "",
                    setup: e(function (a) {
                        var c = a.getAttribute("bgColor");
                        return a.getStyle("background-color") || c
                    }),
                    commit: function (a) {
                        this.getValue() ? a.setStyle("background-color", this.getValue()) : a.removeStyle("background-color");
                        a.removeAttribute("bgColor")
                    }
                }];
                n && a.push({
                    type: "button",
                    id: "bgColorChoose",
                    "class": "colorChooser",
                    label: c.chooseColor,
                    onLoad: function () {
                        this.getElement().getParent().setStyle("vertical-align", "bottom")
                    },
                    onClick: function () {
                        f.getColorFromDialog(function (a) {
                            a && this.getDialog().getContentElement("info", "bgColor").setValue(a);
                            this.focus()
                        }, this)
                    }
                });
                return a
            }()
        }, {
            type: "hbox",
            padding: 0,
            widths: n ? ["60%", "40%"] : ["100%"],
            requiredContent: "td{border-color}",
            children: function () {
                var a = [{
                    type: "text",
                    id: "borderColor",
                    label: c.borderColor,
                    "default": "",
                    setup: e(function (a) {
                        var c = a.getAttribute("borderColor");
                        return a.getStyle("border-color") || c
                    }),
                    commit: function (a) {
                        this.getValue() ? a.setStyle("border-color", this.getValue()) : a.removeStyle("border-color");
                        a.removeAttribute("borderColor")
                    }
                }];
                n && a.push({
                    type: "button",
                    id: "borderColorChoose",
                    "class": "colorChooser",
                    label: c.chooseColor,
                    style: (v ? "margin-right" : "margin-left") + ": 10px",
                    onLoad: function () {
                        this.getElement().getParent().setStyle("vertical-align", "bottom")
                    },
                    onClick: function () {
                        f.getColorFromDialog(function (a) {
                            a &&
                                this.getDialog().getContentElement("info", "borderColor").setValue(a);
                            this.focus()
                        }, this)
                    }
                });
                return a
            }()
        }],
        p = 0,
        t = -1,
        g = [q()],
        d = CKEDITOR.tools.array.filter(d, function (a) {
            var b = a.requiredContent;
            delete a.requiredContent;
            (b = f.filter.check(b)) && !a.isSpacer && p++;
            return b
        });
    5 < p && (g = g.concat([h(), q()]));
    CKEDITOR.tools.array.forEach(d, function (a) {
        a.isSpacer || t++;
        5 < p && t >= p / 2 ? g[2].children.push(a) : g[0].children.push(a)
    });
    CKEDITOR.tools.array.forEach(g, function (a) {
        a.isSpacer || (a = a.children, a[a.length - 1].isSpacer &&
            a.pop())
    });
    return {
        title: c.title,
        minWidth: 1 === g.length ? 205 : 410,
        minHeight: 50,
        contents: [{
            id: "info",
            label: c.title,
            accessKey: "I",
            elements: [{
                type: "hbox",
                widths: 1 === g.length ? ["100%"] : ["40%", "5%", "40%"],
                children: g
            }]
        }],
        onShow: function () {
            this.cells = CKEDITOR.plugins.tabletools.getSelectedCells(this._.editor.getSelection());
            this.setupContent(this.cells)
        },
        onOk: function () {
            for (var a = this._.editor.getSelection(), b = a.createBookmarks(), c = this.cells, d = 0; d < c.length; d++) this.commitContent(c[d]);
            this._.editor.forceNextSelectionCheck();
            a.selectBookmarks(b);
            this._.editor.selectionChange()
        },
        onLoad: function () {
            var a = {};
            this.foreach(function (b) {
                b.setup && b.commit && (b.setup = CKEDITOR.tools.override(b.setup, function (c) {
                    return function () {
                        c.apply(this, arguments);
                        a[b.id] = b.getValue()
                    }
                }), b.commit = CKEDITOR.tools.override(b.commit, function (c) {
                    return function () {
                        a[b.id] !== b.getValue() && c.apply(this, arguments)
                    }
                }))
            })
        }
    }
});