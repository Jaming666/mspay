/* 2024-07-17 17:06:39 */
"use strict";

function _objectSpread(a) {
    for (var b = 1; b < arguments.length; b++) {
        var c = null != arguments[b] ? arguments[b] : {}, d = Object.keys(c);
        "function" == typeof Object.getOwnPropertySymbols && (d = d.concat(Object.getOwnPropertySymbols(c).filter(function (a) {
            return Object.getOwnPropertyDescriptor(c, a).enumerable
        }))), d.forEach(function (b) {
            _defineProperty(a, b, c[b])
        })
    }
    return a
}

function _defineProperty(a, b, c) {
    return b in a ? Object.defineProperty(a, b, {
        value: c,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[b] = c, a
}

function _toConsumableArray(a) {
    return _arrayWithoutHoles(a) || _iterableToArray(a) || _nonIterableSpread()
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance")
}

function _iterableToArray(a) {
    if (Symbol.iterator in Object(a) || "[object Arguments]" === Object.prototype.toString.call(a)) return Array.from(a)
}

function _arrayWithoutHoles(a) {
    if (Array.isArray(a)) {
        for (var b = 0, c = new Array(a.length); b < a.length; b++) c[b] = a[b];
        return c
    }
}

function _classCallCheck(a, b) {
    if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
}

function _defineProperties(a, b) {
    for (var c = 0; c < b.length; c++) {
        var d = b[c];
        d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
    }
}

function _createClass(a, b, c) {
    return b && _defineProperties(a.prototype, b), c && _defineProperties(a, c), a
}

var emUA = window.navigator.userAgent || "";
if (window.isMobile = function () {
    return emUA.indexOf("Mobile") > -1
}, window.inWx = function () {
    return emUA.indexOf("MicroMessenger") > -1 && emUA.toLowerCase().indexOf("miniprogram") == -1
}, window.inWxPc = function () {
    return emUA.indexOf("MicroMessenger") > -1 && emUA.indexOf("Mobile") < 0 && emUA.indexOf("Android") < 0 && emUA.indexOf("iPad") < 0
}, window.inWeWork = function () {
    return window.inWx() && emUA.indexOf("wxwork") > -1
}, window.inWeWorkPrivate = function () {
    return window.inWx() && emUA.indexOf("wwlocal") > -1
}, window.inWeWorkPc = function () {
    return window.inWxPc() && emUA.indexOf("wxwork") > -1
}, window.inDing = function () {
    return emUA.indexOf("DingTalk") > -1 && emUA.toLowerCase().indexOf("taurusapp") < 0
}, window.inDingPc = function () {
    return emUA.indexOf("DingTalk") > -1 && emUA.toLowerCase().indexOf("taurusapp") < 0 && emUA.indexOf("Mobile") < 0
}, window.inZheZhengDingPc = function () {
    return emUA.toLowerCase().indexOf("taurusapp") > -1 && emUA.indexOf("Mobile") < 0
}, window.dingPcVersion = function () {
    var a = emUA.split("DingTalk")[1] || "", b = a.split("-")[0] || "", c = b.slice(1);
    return c
}, window.feishuVersion = function () {
    var a = emUA.substring(emUA.indexOf("Lark/") + 5), b = a.substring(0, a.indexOf(" "));
    return b
}, window.inYun = function () {
    return !!emUA.match(/Qing\/.*;(iOS|iPhone|Android|iPad).*/)
}, window.inYunPc = function () {
    return emUA.indexOf("Qing") > -1 && !window.inYun()
}, window.inWeLink = function () {
    return emUA.indexOf("welink") > -1 || emUA.indexOf("cloudlink") > -1 || emUA.toLocaleLowerCase().indexOf("huawei-anyoffice") > -1
}, window.inFeiShu = function () {
    return emUA.indexOf("Lark") > -1
}, window.inFeiShuPc = function () {
    return window.inFeiShu() && emUA.indexOf("Mobile") < 0 && emUA.indexOf("Android") < 0
}, window.inLark = function () {
    return emUA.indexOf("Lark") > -1 && emUA.toLocaleLowerCase().indexOf("feishu") < 0
}, window.inZheZhengDing = function () {
    return emUA.toLowerCase().indexOf("taurusapp") > -1
}, window.inECWorkBench = function () {
    var a = "/spa/portal/static4em/index.html#/main", b = window.location.origin, c = window.location.href,
        d = c ? c.split("?") : [], e = d[0];
    return e.replace(b, "") === a
}, window.open.toString().indexOf("inDing") < 0) {
    var inEM7APP = emUA.indexOf("weaverClient") > -1 || emUA.indexOf("E-Mobile") > -1 && emUA.indexOf("Electron") < 0 && emUA.indexOf("nw/");
    window.windowEMOpen = window.open, window.open = function (a) {
        if (!(window.inDing() || window.inWx() && !window.inWeWorkPc() || window.inYunPc() || inEM7APP || window.inFeiShuPc() || window.inZheZhengDingPc())) {
            for (var b, c = arguments.length, d = new Array(c > 1 ? c - 1 : 0), e = 1; e < c; e++) d[e - 1] = arguments[e];
            var f = (b = window).windowEMOpen.apply(b, [a].concat(d));
            return f
        }
        window.location.href = a
    }
}
var isIframe = function () {
    return !(window.self === window.top)
}, topEmFlag = !1;
try {
    window.top.em && (topEmFlag = !0)
} catch (e) {
    topEmFlag = !1
}
if (topEmFlag && isIframe() && window.isMobile()) window.em = window.top.em, window.jEmobile = window.top.em; else {
    var dSrc = document.scripts || [], jsUrlArr = [], jsUrl = "";
    for (var i in dSrc) {
        var item = dSrc[i], itemSrc = "";
        item && item.src && (itemSrc = item.src), itemSrc.indexOf("/js/jem.js") > -1 && (jsUrlArr.push(itemSrc), jsUrl = itemSrc)
    }
    if (jsUrlArr.length > 1) {
        var jsUrlFlag = !0;
        for (var _i in jsUrlArr) {
            if (jsUrlArr[_i].indexOf("?_key") > -1) {
                jsUrl = jsUrlArr[_i];
                break
            }
            _i === jsUrlArr.length - 1 && (jsUrlFlag = !1)
        }
        if (!jsUrlFlag) {
            var origin = window.location.origin;
            jsUrlArr = jsUrlArr.filter(function (a) {
                return a.indexOf(origin) > -1
            }), jsUrl = jsUrlArr[0]
        }
    }
    window.inWxReadyFlag = !1, window.inWxReadyAgain = !1, window.inWxConfigReadyFlag = !1, window.inDingReadyFlag = !1, window.inDingReadyAgain = !1, window.inDingConfigReadyFlag = !1, window.inZZDReadyFlag = !1, window.inZZDConfigReadyFlag = !1, window.inYunReadyFlag = !1, window.inWeLinkReadyFlag = !1, window.inWeLinkConfigFlag = !1, window.inFSReadyFlag = !1, window.inFSConfigFlag = !1;
    var qingPublic = !0, openIndex = jsUrl ? jsUrl.indexOf("/open/") : 0,
        domainUrl = jsUrl ? jsUrl.slice(0, openIndex) : "";
    "/" !== domainUrl.charAt(domainUrl.length - 1) && (domainUrl = "".concat(domainUrl, "/")), window.em_url_open && (domainUrl = "".concat(window.em_url_open, "/"));
    var time = (new Date).getTime(), localUrl = window.location.href || "", localUrlSplit = localUrl.split("#"),
        finalLocalUrl = localUrlSplit[0] || "";
    finalLocalUrl = window.encodeURIComponent(finalLocalUrl);
    var NORMAL_CONFIG_JS_URL = "".concat(domainUrl, "wxapi/jsconfig?v=").concat(time, "&localurl=").concat(finalLocalUrl),
        CONFIG_JS_URL = "".concat(domainUrl, "wxapi/jsconfig?localurl=").concat(finalLocalUrl, "&noext"),
        VCONSOLE_JS_URL = "".concat(domainUrl, "open/js/vconsole.min"),
        WX_JS_URL = "//res.wx.qq.com/open/js/jweixin-1.2.0",
        DING_JS_URL = "//g.alicdn.com/dingding/dingtalk-jsapi/3.0.29/dingtalk.open",
        ZZD_JS_URL = "//g.alicdn.com/gdt/jsapi/1.9.22/index",
        QING_JS_PUBLIC_URL = "//static.yunzhijia.com/public/js/qing/latest/qing.js",
        WELINK_JS_URL = "//open-doc.welink.huaweicloud.com/docs/jsapi/2.0.8/hwh5-cloudonline",
        FEISHU_JS_URL = "//lf1-cdn-tos.bytegoofy.com/goofy/lark/op/h5-js-sdk-1.5.23", isRequire = function () {
            return window.require && window.require.config && "[object Function]" === Object.prototype.toString.apply(window.require) && "[object Function]" === Object.prototype.toString.apply(window.require.config)
        }, commonInterval = function (a) {
            if (document.head) document.head.appendChild(a); else var b = setInterval(function () {
                document.head && (document.head.appendChild(a), clearInterval(b), b = null)
            }, 50)
        }, addOpenJs = function (a, b) {
            var c = document.createElement("script");
            c.src = a, c.onload = function () {
                b()
            }, commonInterval(c)
        }, reconfigByExternalAddress = function a() {
            domainUrl = window.WX_EXTERNAL_ADDRESS + "/";
            var b = function (a) {
                var b = document.createElement("script");
                switch (b.src = "".concat(domainUrl, "wxapi/jsconfig?v=").concat(time, "&localurl=").concat(finalLocalUrl), document.head.appendChild(b), a) {
                    case"wx":
                        window.inWxReadyFlag = !0;
                    case"ding":
                        window.inDingReadyFlag = !0;
                    case"zzd":
                        window.inZZDReadyFlag = !0;
                    case"welink":
                        window.inWeLinkReadyFlag = !0;
                    case"feishu":
                        window.inFSReadyFlag = !0
                }
                b.onload = function () {
                    switch (a) {
                        case"wx":
                            window.inWxConfigReadyFlag = !0;
                        case"ding":
                            window.inDingConfigReadyFlag = !0;
                        case"zzd":
                            window.inZZDConfigReadyFlag = !0;
                        case"welink":
                            window.inWeLinkConfigFlag = !0;
                        case"feishu":
                            window.inFSConfigFlag = !0
                    }
                }
            };
            if (window.inWx()) if (window.inWxPc() && !window.inWeWorkPc()) window.inWxReadyFlag = !0; else {
                var c = function () {
                    return (emUA.indexOf("iPhone") > -1 || emUA.indexOf("iPad") > -1) && (window.wx && window.wx.onMenuShareWechat)
                }, d = function () {
                    c() ? setTimeout(function () {
                        b("wx")
                    }, 50) : addOpenJs("".concat(WX_JS_URL, ".js"), function () {
                        b("wx")
                    })
                };
                isRequire() ? emUA.indexOf("wxwork") > -1 && emUA.indexOf("Android") > -1 ? d() : (window.require.config({
                    paths: {
                        wx: WX_JS_URL,
                        config: "".concat(domainUrl, "wxapi/jsconfig?localurl=").concat(finalLocalUrl, "&noext")
                    }
                }), c() ? setTimeout(function () {
                    window.inWxReadyFlag = !0, window.require(["config"], function () {
                        return window.WX_EXTERNAL_ADDRESS && window.WX_EXTERNAL_ADDRESS !== domainUrl ? void a() : void (window.inWxConfigReadyFlag = !0)
                    })
                }, 50) : window.require(["wx"], function (b) {
                    b && (window.wx = b), window.inWxReadyFlag = !0, window.require(["config"], function () {
                        return window.WX_EXTERNAL_ADDRESS && window.WX_EXTERNAL_ADDRESS !== domainUrl ? void a() : void (window.inWxConfigReadyFlag = !0)
                    })
                })) : d()
            }
        }, addApiFunc = function () {
            var a = function (a) {
                var b = document.createElement("script");
                switch (b.src = NORMAL_CONFIG_JS_URL, document.head.appendChild(b), a) {
                    case"wx":
                        window.inWxReadyFlag = !0;
                    case"ding":
                        window.inDingReadyFlag = !0;
                    case"zzd":
                        window.inZZDReadyFlag = !0;
                    case"welink":
                        window.inWeLinkReadyFlag = !0;
                    case"feishu":
                        window.inFSReadyFlag = !0
                }
                b.onload = function () {
                    if (window.WX_EXTERNAL_ADDRESS && window.WX_EXTERNAL_ADDRESS !== domainUrl) return void reconfigByExternalAddress();
                    switch (a) {
                        case"wx":
                            window.inWxConfigReadyFlag = !0;
                        case"ding":
                            window.inDingConfigReadyFlag = !0;
                        case"zzd":
                            window.inZZDConfigReadyFlag = !0;
                        case"welink":
                            window.inWeLinkConfigFlag = !0;
                        case"feishu":
                            window.inFSConfigFlag = !0
                    }
                }
            };
            if (window.inWx()) if (window.inWxPc() && !window.inWeWorkPc()) window.inWxReadyFlag = !0; else {
                var b = function () {
                    return (emUA.indexOf("iPhone") > -1 || emUA.indexOf("iPad") > -1) && (window.wx && window.wx.onMenuShareWechat)
                }, c = function () {
                    console.warn("isWeChatShare: " + b()), b() && !inWeWorkPrivate() ? setTimeout(function () {
                        a("wx")
                    }, 50) : addOpenJs("".concat(WX_JS_URL, ".js"), function () {
                        a("wx")
                    })
                };
                isRequire() ? emUA.indexOf("wxwork") > -1 && emUA.indexOf("Android") > -1 ? c() : (window.require.config({
                    paths: {
                        wx: WX_JS_URL,
                        config: CONFIG_JS_URL
                    }
                }), b() ? setTimeout(function () {
                    window.inWxReadyFlag = !0, window.require(["config"], function () {
                        window.inWxConfigReadyFlag = !0
                    })
                }, 50) : window.require(["wx"], function (a) {
                    a && (window.wx = a), window.inWxReadyFlag = !0, window.require(["config"], function () {
                        window.inWxConfigReadyFlag = !0
                    })
                })) : c()
            }
            if (window.inDing() && (isRequire() ? (window.require.config({
                paths: {
                    ding: DING_JS_URL,
                    config: CONFIG_JS_URL
                }
            }), window.require(["ding"], function (a) {
                window.dd = a, window.inDingReadyFlag = !0, window.require(["config"], function () {
                    window.inDingConfigReadyFlag = !0
                })
            })) : addOpenJs("".concat(DING_JS_URL, ".js"), function () {
                a("ding")
            })), window.inZheZhengDing() && (isRequire() ? (window.require.config({
                paths: {
                    ding: ZZD_JS_URL,
                    config: CONFIG_JS_URL
                }
            }), window.require(["ding"], function (a) {
                try {
                    window.dd = a
                } catch (b) {
                    console.log(b)
                }
                window.inZZDReadyFlag = !0, window.require(["config"], function () {
                    window.inZZDConfigReadyFlag = !0
                })
            })) : addOpenJs("".concat(ZZD_JS_URL, ".js"), function () {
                a("zzd")
            })), window.inYun()) {
                var d = QING_JS_PUBLIC_URL;
                try {
                    var e = new XMLHttpRequest;
                    e.open("GET", "".concat(domainUrl, "wxapi/jsapiurl"), !0), e.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), e.send(), e.onreadystatechange = function () {
                        d = e.responseText || "", d = d.length > 0 ? d.slice(0, d.length - 3) : "", qingPublic = d.indexOf("yunzhijia.com") > -1, isRequire() ? (window.require.config({
                            paths: {yun: d},
                            shim: {yun: {deps: [], exports: "yun"}}
                        }), window.require(["yun"], function () {
                            window.inYunReadyFlag = !0
                        })) : addOpenJs("".concat(d, ".js"), function () {
                            window.inYunReadyFlag = !0
                        })
                    }
                } catch (f) {
                    console.log(f)
                }
            }
            window.inWeLink() && (isRequire() ? (window.require.config({
                paths: {
                    hwh5: WELINK_JS_URL,
                    config: CONFIG_JS_URL
                }
            }), window.require(["hwh5"], function (a) {
                window.HWH5 = a, window.inWeLinkReadyFlag = !0, window.require(["config"], function () {
                    window.inWeLinkConfigFlag = !0
                })
            })) : addOpenJs("".concat(WELINK_JS_URL, ".js"), function () {
                a("welink")
            })), window.inFeiShu() && (isRequire() ? (window.require.config({
                paths: {
                    h5sdk: FEISHU_JS_URL,
                    config: CONFIG_JS_URL
                }, shim: {h5sdk: {deps: [], exports: "h5sdk"}}
            }), window.require(["h5sdk"], function (a) {
                window.inFSReadyFlag = !0, window.require(["config"], function () {
                    window.inFSConfigFlag = !0
                })
            })) : addOpenJs("".concat(FEISHU_JS_URL, ".js"), function () {
                a("feishu")
            }))
        };
    window.location.href.indexOf("vConsole") > 0 ? isRequire() ? (window.require.config({paths: {VConsole: VCONSOLE_JS_URL}}), window.require(["VConsole"], function (a) {
        a && (window.vConsole = new a), addApiFunc()
    })) : addOpenJs("".concat(VCONSOLE_JS_URL, ".js"), function () {
        window.VConsole && (window.vConsole = new window.VConsole), addApiFunc()
    }) : addApiFunc();
    var weaver = function () {
        function a() {
            _classCallCheck(this, a), this.currentId = "", this.href = "*", this.configFlag = !1, this.success = {}, this.fail = {}, this.complete = {}, this.cancel = {}, this.getItemFunc = {}, this.callback = {}, this.isPCEMobileOk = !1, this.configCid = "", this.configAid = "", this.corpid = "", this.agentid = "", this.electronVersion = "", this.androidAppVersion = 0, this.pageVisibleCallback = null, this.registerEmListenerCallback = null, this.WebViewJavascriptBridge = null;
            var b = ["config", "pageVisible", "getClientInfo", "closeWindow", "sendMsg", "openLink", "getEmAuthCode", "getUserFromConversation", "ssoLogin", "pushToMain", "switchServer", "pushToLogin", "switchAccount", "setItem", "getItem", "removeItem", "getUserInfo", "getTargetInfo", "selectUserOrGroup", "initiatePrivateChat", "openConversation", "setauthtag", "playOtherVoice"],
                c = [].concat(b, ["closeAndReload", "openNewWindow", "openApp", "getLocation", "openLocation", "chooseImage", "getLocalImgData", "uploadImage", "downloadImage", "previewImage", "chooseVideo", "uploadVideo", "downloadVideo", "showVideo", "initiateGroupChat", "selectUserinitiateChat", "openChatList", "getNetWorkInfo", "getCurrentWifiInfo", "scanQRCode", "handleWriting", "editImage", "getConversation", "hideBottomToolBar", "hideTopToolBar", "changeTitle", "getModule", "openModule", "sendLocation", "sendPersonCard", "tel", "mailto", "textMessage", "getDiscussion", "getTitle", "getMobileCalendars", "getSyncSetting", "synctoMobile", "synctoServer", "configBounce", "getNavColor", "changeNavColor", "importContacts", "openUserProfile", "showPopup", "showBottomToolBar", "showTopToolBar", "setPasteBoardText", "getPasteBoardText", "resetNavigation", "getLocationList", "playAudioRecord", "getAudioRecord", "userInteractionEnabled", "userInteractionDisabled", "playVoice", "textUnderStand", "stopVoice", "navigationLBS", "speechTotext", "continueSpeech", "registerBroadcast", "postBroadcast", "configNavigation", "reloadStorage", "reloadStorageWithParams", "securitySupport", "securityEvaluation", "fileSign", "CAMethod", "setupBottomMenu", "showWaterMark", "hideWaterMark", "personCardSupport", "personCardFunction", "changeOrientation", "showLoading", "appEventListener", "setBadge", "getBadge", "showSystemBar", "hiddenSystemBar", "getFileFormatCanSign", "selectIndex", "share", "qysPrint", "openNativeSetting", "getContacts", "isFreshUser", "readNFC", "getAccount", "refreshUserInfo", "openNativeChangeTheme", "openMyWallet", "openqrCard", "downloadFile", "openBamLink", "changeAccount", "uploadFile2Doc", "pageVisible", "chooseInvoice", "registerHandler"]);
            this.pcFuncArr = [].concat(b, ["setPageReload", "pageReload", "changeLoginTitle", "getMacAddress", "registerEmListener", "joinHongshanMeeting", "changeLocale", "shareMessage", "trayFlash"]), this.iosFuncArr = [].concat(_toConsumableArray(c), ["securityStatus", "closeSecurityCheck"]), this.androidFuncArr = [].concat(_toConsumableArray(c), ["getFlowHandwrite", "saveFlowHandwrite", "deleteFlowHandwrite", "showOrHideCloseButton", "getAvatarWidthAndHeightPercent"]), this.wxFuncArr = ["closeWindow", "scanQRCode", "chooseImage", "chooseInvoice", "getLocalImgData", "getLocation", "changeTitle", "configNavigation", "resetNavigation", "switchAccount", "getCpUser", "getCpUserQrCode", "otherShare", "showMenuItems", "hideMenuItems", "onHistoryBack", "hideOptionMenu", "showOptionMenu", "onUserCaptureScreen", "wxAuthFunc", "wxPay", "hideAllNonBaseMenuItem", "showAllNonBaseMenuItem", "onMenuShareAppMessage", "onMenuShareTimeline", "uploadImage", "downloadImage", "startRecord", "stopRecord", "onVoiceRecordEnd", "playVoice", "pauseVoice", "stopVoice", "onVoicePlayEnd", "uploadVoice", "downloadVoice", "getNetworkType", "onNetworkStatusChange"], this.wxWeworkFuncArr = [].concat(_toConsumableArray(this.wxFuncArr), ["openWxEnterpriseChat", "selectEnterpriseContact", "openUserProfile", "selectExternalContact", "openUserProfile", "getCurExternalContact", "getCurExternalChat", "sendChatMessage", "getContext", "navigateToAddCustomer", "openEnterpriseChat", "updateEnterpriseChat", "onMenuShareWechat", "shareAppMessage", "shareWechatMessage", "shareToExternalContact", "shareToExternalChat", "launchMiniprogram", "translateVoice", "previewFile", "startWifi", "stopWifi", "connectWifi", "getWifiList", "onGetWifiList", "onWifiConnected", "getConnectedWifi", "openLocation", "startAutoLBS", "stopAutoLBS", "onLocationChange", "setClipboardData", "startBeaconDiscovery", "stopBeaconDiscovery", "getBeacons", "onBeaconUpdate", "onBeaconServiceChange", "openBluetoothAdapter", "closeBluetoothAdapter", "getBluetoothAdapterState", "onBluetoothAdapterStateChange", "startBluetoothDevicesDiscovery", "stopBluetoothDevicesDiscovery", "getBluetoothDevices", "onBluetoothDeviceFound", "getConnectedBluetoothDevices", "createBLEConnection", "closeBLEConnection", "onBLEConnectionStateChange", "getBLEDeviceServices", "getBLEDeviceCharacteristics", "readBLECharacteristicValue", "writeBLECharacteristicValue", "notifyBLECharacteristicValueChange", "onBLECharacteristicValueChange", "getNetWorkInfo", "openEnterpriseApp", "launchMiniprogram", "hideChatAttachmentMenu"]), this.wxPcFuncArr = ["switchAccount", "getCpUser", "getCpUserQrCode"], this.wxWeworkPcFuncArr = [].concat(_toConsumableArray(this.wxPcFuncArr), ["closeWindow", "openDefaultBrowser", "onHistoryBack", "getCurExternalContact", "getContext", "hideChatAttachmentMenu"]), this.dingFuncArr = ["closeWindow", "scanQRCode", "chooseImage", "getLocalImgData", "getLocation", "openLink", "changeTitle", "configNavigation", "resetNavigation", "getNetWorkInfo", "switchAccount", "getCpUser", "getCpUserQrCode", "dingAuthFunc", "dingCreate", "pageVisible", "downloadFileForDD", "chooseConversationForDD", "pickConversation", "dingShare", "openSingleChat", "getDeviceID"], this.dingPcFuncArr = ["closeWindow", "openDefaultBrowser", "openSingleChat", "getCpUser", "dingCreate"], this.dingNoConfigArr = ["closeWindow", "scanQRCode", "openLink", "changeTitle", "configNavigation", "resetNavigation", "switchAccount", "getCpUser", "getCpUserQrCode"], this.ZZDFuncArr = ["closeWindow", "scanQRCode", "openLink", "getLocation", "changeTitle", "configNavigation", "resetNavigation", "switchAccount", "getCpUser", "getCpUserQrCode", "getNetWorkInfo", "pageVisible"], this.commonYunFuncArr = ["closeWindow", "scanQRCode", "getLocation", "changeTitle", "configNavigation", "resetNavigation", "switchAccount", "getCpUser", "getCpUserQrCode", "chooseYunFile", "listenReturn"], this.yunPubFuncArr = [].concat(_toConsumableArray(this.commonYunFuncArr), ["openLink", "pageVisible", "getNetWorkInfo"]), this.yunPriFuncArr = _toConsumableArray(this.commonYunFuncArr), this.yunPcFuncArr = ["openLink", "openDefaultBrowser", "listenReturn"], this.ecWorkBenchArr = ["openLink"], this.weLinkArr = ["closeWindow", "changeTitle", "configNavigation", "resetNavigation", "getLocation", "scanQRCode", "chooseImage", "getLocalImgData"], this.feishuArr = ["closeWindow", "changeTitle", "configNavigation", "resetNavigation", "getLocation", "scanQRCode", "openLink", "getNetWorkInfo", "getDeviceID"], this.feishuPcArr = ["openLink", "closeWindow", "changeTitle", "openDefaultBrowser", "getNetWorkInfo"], this.geolocationStartIndex = 0, this.EM_JSAPI_CONFIG_PARAMS = null;
            var d = this;
            if (window.inDingPc()) {
                var e = window.dingPcVersion() || "", f = e.split(".");
                (f[0] > 4 || f[1] > 5 || f[2] > 9) && this.dingPcFuncArr.push("dingCreate")
            }
            var g = window.feishuVersion() || "", h = g.split(".");
            if (window.inFeiShu() && this.inIphone() && (h[0] < 5 || 5 == h[0] && h[1] < 1) && window.addEventListener("hashchange", function () {
                addApiFunc()
            }), this.inEM7APP()) {
                window.IS_JEM_FIRST_LOAD ? window.IS_JEM_FIRST_LOAD++ : window.IS_JEM_FIRST_LOAD = 1;
                var i = window.navigator.userAgent, j = i.split("/"), k = -1;
                j.map(function (a, b) {
                    a.indexOf("E-Mobile7") > -1 && (k = b + 1)
                });
                var l = j[k], m = null, n = null;
                if (this.inAndroid()) {
                    var o = l.split(".")[3] || "";
                    m = o.slice(0, 8), this.androidAppVersion = m
                } else {
                    var p = l.split(".");
                    n = p[p.length - 1]
                }
                Number(m) >= 20200427 && (this.androidFuncArr = [].concat(_toConsumableArray(this.androidFuncArr), ["uploadFile", "request", "openApplication", "queryApplication"])), Number(n) >= 20200427 && (this.iosFuncArr = [].concat(_toConsumableArray(this.iosFuncArr), ["uploadFile", "request", "openApplication", "queryApplication"])), this.checkBridge(), this.getAllSupportJsapi()
            }
            if (this.inEMobilePc()) {
                var q = window.navigator.userAgent;
                if (q.indexOf("Electron") > -1) {
                    var r = q.split("Electron"), s = r[1] || "";
                    r = s.split(" ");
                    var t = r[0] || "";
                    if (s = t.slice(1)) {
                        var u = s ? s.split(".") : [], v = u.length > 0 ? u[0] : "";
                        v >= 12 && (this.pcFuncArr = [].concat(_toConsumableArray(this.pcFuncArr), ["systemIdentify", "chooseDirectroy", "openSyncWindow", "syncRules", "noticeRuleChange", "downloadCloudFile", "uploadFileToCloud", "chooseFile"]))
                    }
                }
            }
            if (this.inPcWebview()) {
                var w = window.navigator.userAgent;
                if (w.indexOf("Electron") > -1) {
                    var x = w.split("Electron"), y = x[1] || "";
                    x = y.split(" ");
                    var z = x[0] || "";
                    y = z.slice(1), this.electronVersion = y
                }
                var A = window.emRequire ? window.emRequire("electron").ipcRenderer : window.top.emRequire("electron").ipcRenderer;
                A.on("config", function (a, b) {
                    d.agentid = b.aid, d.corpid = b.cid, d.isPCEMobileOk = !0, d.electronVersion = b.electronVersion || d.electronVersion;
                    var c = d.electronVersion ? d.electronVersion.split(".") : [], e = c.length > 0 ? c[0] : "";
                    e >= 6 ? A.sendToHost("jem", {func: "webviewConfigOk"}) : A.sendToHost({func: "webviewConfigOk"})
                }), A.on("callback", function (a, b) {
                    d.pcListener(b, d)
                })
            } else window.addEventListener("message", function (a) {
                var b = a.data || {};
                switch (b.type) {
                    case"currentId":
                        d.currentId = b.currentId || "", d.href = b.href || "*", d.corpid = b.cid, d.agentid = b.aid, d.isPCEMobileOk = !0, window.parent.postMessage({
                            type: "jem",
                            content: "getId",
                            currentId: b.currentId
                        }, d.href);
                        break;
                    case"callback":
                        d.pcListener(b, d, "iframe")
                }
            })
        }

        return _createClass(a, [{
            key: "inAndroid", value: function () {
                var a = window.navigator.userAgent || "";
                return a.indexOf("Android") > -1
            }
        }, {
            key: "inIphone", value: function () {
                var a = window.navigator.userAgent || "";
                return a.indexOf("iPhone") > -1 || a.indexOf("iPad") > -1
            }
        }, {
            key: "inEMobilePc", value: function () {
                if (this.isPCEMobileOk) return !0;
                var a = window.navigator.userAgent || "";
                return !(!(a.indexOf("Electron") > -1 && a.indexOf("E-Mobile") > -1 || a.indexOf("nw/") > -1) && (!isIframe() || window.inWx() || window.inDing() || window.inYun() || window.inWeLink() || window.inFeiShu() || window.inZheZhengDing()))
            }
        }, {
            key: "inEM7APP", value: function () {
                var a = window.navigator.userAgent || "";
                return a.indexOf("weaverClient") > -1 || a.indexOf("E-Mobile") > -1 && a.indexOf("Electron") < 0 && a.indexOf("nw/") < 0
            }
        }, {
            key: "pcListener", value: function (a, b, c) {
                var d = this, e = {errMsg: a[a.funcType]}, f = b[a.funcType][a.func];
                if ("pageVisible" === a.func) return void this.doPageVisible(a.visible, a.unread);
                if ("registerEmListener" === a.func) return void this.doRegisterEmListener(a);
                switch (a.func) {
                    case"getUserFromConversation":
                        e.userIdList = a.userIdList || [], e.baseIdList = a.baseIdList || [];
                        break;
                    case"selectUserOrGroup":
                        e.userList = a.userList || [], e.groupList = a.groupList || [];
                        break;
                    case"getClientInfo":
                        e = a.clientInfo;
                        break;
                    case"getTargetInfo":
                        e = _objectSpread({}, e, a);
                        break;
                    case"getEmAuthCode":
                        e.em_auth_code = a.emAuthCode;
                        break;
                    case"syncRules":
                    case"openSyncWindow":
                    case"systemIdentify":
                    case"chooseDirectroy":
                    case"noticeRuleChange":
                    case"downloadCloudFile":
                    case"uploadFileToCloud":
                    case"chooseFile":
                    case"getMacAddress":
                    case"trayFlash":
                    case"joinHongshanMeeting":
                        e = _objectSpread({}, e, a);
                        break;
                    case"ssoLogin":
                        void 0 !== a.errCode && (e.errCode = a.errCode), e.errMsg = a.errMsg || e.errMsg || "";
                        break;
                    case"getUserInfo":
                        e = _objectSpread({}, e, a);
                        break;
                    case"getItem":
                        if (a.value) e.value = a.value; else {
                            var g = window.localStorage.getItem(a.key);
                            "success" === a.funcType && (g ? e.value = g : (e.value = null, e.errMsg = "getItem: fail", a.funcType = "fail", f = b.fail[a.func]))
                        }
                }
                if ("iframe" === c && "config" === a.func) {
                    var h = null;
                    return void (h = setInterval(function () {
                        (b.currentId || a.currentId) && (clearInterval(h), h = null, e.currentId = b.currentId || a.currentId, d.objCallBack(e, f))
                    }, 100))
                }
                "getItem" === a.func && (f = b.getItemFunc["".concat(a.funcType, "-").concat(a.key)] || f, delete b.getItemFunc["".concat(a.funcType, "-").concat(a.key)]), this.objCallBack(e, f)
            }
        }, {
            key: "checkJsApi", value: function (a) {
                var b = this;
                if (a && "[object String]" === Object.prototype.toString.apply(a)) {
                    if (window.inECWorkBench()) return this.ecWorkBenchArr.indexOf(a) > -1;
                    if (!this.inEM7APP()) return window.inWx() ? window.inWeWorkPc() ? this.wxWeworkPcFuncArr.indexOf(a) > -1 : window.inWxPc() ? this.wxPcFuncArr.indexOf(a) > -1 : window.inWeWork() ? this.wxWeworkFuncArr.indexOf(a) > -1 : this.wxFuncArr.indexOf(a) > -1 : window.inDing() ? window.inDingPc() ? this.dingPcFuncArr.indexOf(a) > -1 : this.dingNoConfigArr.indexOf(a) > -1 || this.dingFuncArr.indexOf(a) > -1 : window.inZheZhengDing() ? this.ZZDFuncArr.indexOf(a) > -1 : window.inYun() ? qingPublic === !0 ? this.yunPubFuncArr.indexOf(a) > -1 : qingPublic === !1 && this.yunPriFuncArr.indexOf(a) > -1 : window.inYunPc() ? this.yunPcFuncArr.indexOf(a) > -1 : window.inWeLink() ? this.weLinkArr.indexOf(a) > -1 : window.inFeiShu() && !window.inFeiShuPc() ? this.feishuArr.indexOf(a) > -1 : window.inFeiShuPc() ? this.feishuPcArr.indexOf(a) > -1 : !!this.inEMobilePc() && this.pcFuncArr.indexOf(a) > -1;
                    if (this.inAndroid()) return this.androidFuncArr.indexOf(a) > -1;
                    if (this.inIphone()) return this.iosFuncArr.indexOf(a) > -1
                }
                if (a && "[object Object]" === Object.prototype.toString.apply(a)) {
                    if (this.inEM7APP()) return void this.eMobileFunc(a, "checkJsApi");
                    var c = function (a, c) {
                        var d = {};
                        a.jsApiList.map(function (a) {
                            d = c.indexOf(a) > -1 ? _objectSpread({}, d, _defineProperty({}, a, !0)) : _objectSpread({}, d, _defineProperty({}, a, !1))
                        }), b.objCallBack({checkResult: d, errMsg: "checkJsApi:ok"}, a.success)
                    };
                    try {
                        if (!a.jsApiList || "[object Array]" !== Object.prototype.toString.apply(a.jsApiList)) throw "鍙傛暟涓嶆纭摝锛宩sApiList搴旇浼犲叆涓€涓暟缁�";
                        if (window.inECWorkBench()) return void c(a, this.ecWorkBenchArr);
                        window.inWx() ? window.inWxPc() ? window.inWeWorkPc() ? c(a, this.wxWeworkPcFuncArr) : c(a, this.wxPcFuncArr) : window.inWeWork() ? c(a, this.wxWeworkFuncArr) : c(a, this.wxFuncArr) : window.inDing() ? window.inDingPc() ? c(a, this.dingPcFuncArr) : c(a, this.dingFuncArr) : window.inYun() ? qingPublic === !0 ? c(a, this.yunPubFuncArr) : qingPublic === !1 ? c(a, this.yunPriFuncArr) : c(a, []) : window.inYunPc() ? c(a, this.yunPcFuncArr) : window.inWeLink() ? c(a, this.weLinkArr) : window.inFeiShu() && !window.inFeiShuPc() ? c(a, this.feishuArr) : window.inFeiShuPc() ? c(a, this.feishuPcArr) : this.inEM7APP() ? this.inIphone() ? c(a, this.iosFuncArr) : this.inAndroid() && c(a, this.androidFuncArr) : this.inEMobilePc() ? c(a, this.pcFuncArr) : c(a, [])
                    } catch (d) {
                        this.objCallBack({errMsg: "checkJsApi:".concat(d)}, a.fail)
                    }
                    this.objCallBack({errMsg: "checkJsApi: complete"}, a.complete)
                }
            }
        }, {
            key: "postMsg", value: function (a) {
                var b = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    c = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                if (b.success && (this.success[a] = b.success), b.fail && (this.fail[a] = b.fail), b.complete && (this.complete[a] = b.complete), b.cancel && (this.cancel[a] = b.cancel), "getItem" === a && (b.success && (this.getItemFunc["success-".concat(b.key)] = b.success), b.fail && (this.getItemFunc["fail-".concat(b.key)] = b.fail), b.complete && (this.getItemFunc["complete-".concat(b.key)] = b.complete)), b.authCurrentId = this.currentId, !c || this.configFuc()) if (this.inPcWebview()) {
                    var d = window.emRequire ? window.emRequire("electron").ipcRenderer : window.top.emRequire("electron").ipcRenderer,
                        e = this.electronVersion ? this.electronVersion.split(".") : [], f = e.length > 0 ? e[0] : "";
                    f >= 6 ? d.sendToHost("jem", {func: a, data: JSON.stringify(b)}) : d.sendToHost({
                        func: a,
                        data: JSON.stringify(b)
                    })
                } else window.parent.postMessage({type: "jem", func: a, data: JSON.stringify(b)}, this.href)
            }
        }, {
            key: "check", value: function () {
                return this.inEMobilePc()
            }
        }, {
            key: "funcCheck", value: function (a) {
                var b = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                return !!this.inEM7APP() || (!!this.inEMobilePc() || (this.inEMobilePc() ? 1 === b && this.objCallBack({errMsg: "璇峰皢璇ュ嚱鏁板啓鍦╡m.ready鏂规硶涓�"}, a.fail) : 1 === b && this.objCallBack({errMsg: "鎮ㄥ綋鍓嶄笉鍦╡m鐨勭幆澧冧腑锛屾棤娉曟墽琛岃鍑芥暟"}, a.fail), !1))
            }
        }, {
            key: "checkBridge", value: function () {
                if (1 === window.IS_JEM_FIRST_LOAD) {
                    if (window.onerror || (window.onerror = function (a, b, c) {
                        console.log("WebViewJavascriptBridge: ERROR:".concat(a, "@").concat(b, ":").concat(c))
                    }), this.inIphone()) {
                        var a = function (a, b) {
                            l[a] = b
                        }, b = function (a, b, c) {
                            2 == arguments.length && "function" == typeof b && (c = b, b = null), d({
                                handlerName: a,
                                data: b
                            }, c)
                        }, c = function () {
                            q = !1
                        }, d = function (a, b) {
                            if (b) {
                                var c = "cb_".concat(p++, "_").concat((new Date).getTime());
                                o[c] = b, a.callbackId = c
                            }
                            k.push(a), j.src = m + "://" + n
                        }, e = function () {
                            var a = JSON.stringify(k);
                            return k = [], a
                        }, f = function (a) {
                            function b() {
                                var b, c = JSON.parse(a);
                                if (c.responseId) {
                                    if (b = o[c.responseId], !b) return;
                                    b(c.responseData), delete o[c.responseId]
                                } else {
                                    if (c.callbackId) {
                                        var e = c.callbackId;
                                        b = function (a) {
                                            d({handlerName: c.handlerName, responseId: e, responseData: a})
                                        }
                                    }
                                    var f = l[c.handlerName];
                                    f ? f(c.data, b) : console.log("WebViewJavascriptBridge: WARNING: no handler for message from ObjC:", c)
                                }
                            }

                            q ? setTimeout(b) : b()
                        }, g = function (a) {
                            f(a)
                        }, h = function () {
                            var a = window.WVJBCallbacks || [];
                            delete window.WVJBCallbacks;
                            for (var b = 0; b < a.length; b++) a[b](WebViewJavascriptBridge)
                        };
                        if (void 0 === window.WVJBCallbacks) {
                            window.WVJBCallbacks = [function (a) {
                            }];
                            var i = document.createElement("iframe");
                            i.style.display = "none", i.src = "https://__bridge_loaded__", document.documentElement.appendChild(i), setTimeout(function () {
                                document.documentElement.removeChild(i)
                            })
                        }
                        window.WebViewJavascriptBridge = {
                            registerHandler: a,
                            callHandler: b,
                            disableJavscriptAlertBoxSafetyTimeout: c,
                            _fetchQueue: e,
                            _handleMessageFromObjC: g
                        };
                        var j, k = [], l = {}, m = "https", n = "__wvjb_queue_message__", o = {}, p = 1, q = !0;
                        j = document.createElement("iframe"), j.style.display = "none", j.src = m + "://" + n, document.documentElement.appendChild(j), a("_disableJavascriptAlertBoxSafetyTimeout", c), setTimeout(h, 0)
                    } else if (this.inAndroid()) {
                        var r, s, t = function (a) {
                            r = a.createElement("iframe"), r.style.display = "none", a.documentElement.appendChild(r)
                        }, u = function (a) {
                            s = a.createElement("iframe"), s.style.display = "none", a.documentElement.appendChild(s)
                        }, v = function (a) {
                            if (WebViewJavascriptBridge._messageHandler) throw new Error("WebViewJavascriptBridge.init called twice");
                            WebViewJavascriptBridge._messageHandler = a;
                            var b = E;
                            E = null;
                            for (var c = 0; c < b.length; c++) B(b[c])
                        }, w = function (a, b) {
                            y({data: a}, b)
                        }, x = function (a, b) {
                            "undefined" == typeof a || null == a || "" == a ? F.emobile = b : F[a] = b
                        }, y = function (a, b) {
                            if (b) {
                                var c = "cb_" + J++ + "_" + (new Date).getTime();
                                I[c] = b, a.callbackId = c
                            }
                            D.push(a), r.src = G + "://" + H
                        }, z = function (a, b, c) {
                            y({handlerName: a, data: b}, c)
                        }, A = function () {
                            var a = JSON.stringify(D);
                            D = [], this.androidAppVersion > 20210303 ? "[]" !== a && (s.src = G + "://return/_fetchQueue/" + encodeURIComponent(a)) : s.src = G + "://return/_fetchQueue/" + encodeURIComponent(a)
                        }, B = function (a) {
                            setTimeout(function () {
                                var b, c = JSON.parse(a);
                                if (c.responseId) {
                                    if (b = I[c.responseId], !b) return;
                                    b(c.responseData), delete I[c.responseId]
                                } else {
                                    if (c.callbackId) {
                                        var d = c.callbackId;
                                        b = function (a) {
                                            y({responseId: d, responseData: a})
                                        }
                                    }
                                    var e = WebViewJavascriptBridge._messageHandler;
                                    c.handlerName && (e = F[c.handlerName]);
                                    try {
                                        e(c.data, b)
                                    } catch (f) {
                                        "undefined" != typeof console && console.log("WebViewJavascriptBridge: WARNING: javascript handler threw.", c, f)
                                    }
                                }
                            })
                        }, C = function (a) {
                            E && E.push(a), B(a)
                        }, D = [], E = [], F = {}, G = "yy", H = "__QUEUE_MESSAGE__/", I = {}, J = 1;
                        window.WebViewJavascriptBridge = {
                            init: v,
                            send: w,
                            registerHandler: x,
                            callHandler: z,
                            _fetchQueue: A,
                            _handleMessageFromNative: C
                        };
                        var K = document;
                        t(K), u(K);
                        var L = K.createEvent("Events");
                        L.initEvent("WebViewJavascriptBridgeReady"), L.bridge = window.WebViewJavascriptBridge, K.dispatchEvent(L)
                    }
                    this.WebViewJavascriptBridge = window.WebViewJavascriptBridge || window.top.WebViewJavascriptBridge
                }
            }
        }, {
            key: "inPcWebview", value: function () {
                var a = window.navigator.userAgent || "";
                return a.indexOf("emPcWebview") > 0 && (window.emRequire || window.top.emRequire)
            }
        }, {
            key: "configFuc", value: function () {
                return !this.configFlag, !0
            }
        }, {
            key: "doPageVisible", value: function (a, b) {
                this.pageVisibleCallback && this.pageVisibleCallback(a, b)
            }
        }, {
            key: "doRegisterEmListener", value: function (a) {
                this.registerEmListenerCallback && this.registerEmListenerCallback(a)
            }
        }, {
            key: "testNative", value: function (a) {
                this.eMobileFunc(a, "testObjcCallback")
            }
        }, {
            key: "invoke", value: function (a, b) {
                var c = this, d = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function () {
                };
                if (window.inWeWork() && window.wx) {
                    if (window.wx[a]) {
                        if (this[a]) {
                            var e = this[a];
                            return e.bind(this)(b)
                        }
                        if ("[object Function]" === Object.prototype.toString.apply(b)) {
                            var f = window.wx[a];
                            return f(function (a) {
                                return b(a)
                            })
                        }
                        var g = window.wx[a];
                        return g.bind(this)(b)
                    }
                    window.wx.invoke(a, b, function (a) {
                        return d(a)
                    })
                } else {
                    if (this[a]) {
                        if (this.inEM7APP() && this[a].toString().indexOf("eMobileFunc") < 0) return void this.eMobileFunc(b, a);
                        var h = this[a];
                        return h.bind(this)(b);
                    }
                    if (this.inEM7APP()) {
                        if (0 === a.indexOf("listen") || 0 === a.indexOf("on") || 0 === a.indexOf("notify")) {
                            var i = this.callback[a] || [];
                            return this.callback[a] = [].concat(_toConsumableArray(i), [b.callback]), void this.eMobileFunc(b, a, function () {
                                c.eMobileRegisterHandler(a, {}, 6)
                            })
                        }
                        this.eMobileFunc(b, a)
                    }
                    this.inEMobilePc() && this.postMsg(a, b)
                }
            }
        }, {
            key: "config", value: function () {
                var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return this.inEM7APP() ? void this.eMobileFunc(a, "config") : void (this.funcCheck(a) && (this.configCid = a.corpId, this.configAid = a.appId, this.postMsg("config", a, !1), this.configFlag = !0))
            }
        }, {
            key: "dingAuthFunc", value: function () {
                if (window.inDing() && this.inIphone() && window.location.href.indexOf("em_auth_code") < 0) if (window.inDingReadyFlag = !1, window.inDingConfigReadyFlag = !1, window.inDingReadyAgain = !0, isRequire()) window.require.config({
                    paths: {
                        ding: DING_JS_URL,
                        config: CONFIG_JS_URL
                    }
                }), window.require(["ding"], function (a) {
                    window.dd = a, window.inDingReadyFlag = !0, window.require(["config"], function () {
                        window.inDingConfigReadyFlag = !0
                    })
                }); else {
                    var a = document.createElement("script");
                    a.src = "".concat(DING_JS_URL, ".js"), a.onload = function () {
                        var a = document.createElement("script");
                        a.src = NORMAL_CONFIG_JS_URL, document.body.appendChild(a), window.inDingReadyFlag = !0, a.onload = function () {
                            window.inDingConfigReadyFlag = !0
                        }
                    };
                    var b = setInterval(function () {
                        document.body && (document.body.appendChild(a), clearInterval(b), b = null)
                    }, 50)
                }
            }
        }, {
            key: "wxAuthFunc", value: function () {
                if (window.inWx()) if (window.inWxConfigReadyFlag = !1, window.inWxReadyAgain = !0, isRequire()) window.require.config({paths: {config: "".concat(domainUrl, "wxapi/jsconfig?localurl=").concat(finalLocalUrl, "&noext")}}), window.require(["config"], function () {
                    window.inWxConfigReadyFlag = !0
                }); else {
                    var a = document.createElement("script");
                    a.src = "".concat(domainUrl, "wxapi/jsconfig?v=").concat(time, "&localurl=").concat(finalLocalUrl), document.body.appendChild(a), a.onload = function () {
                        window.inWxConfigReadyFlag = !0
                    };
                    var b = setInterval(function () {
                        document.body && (document.body.appendChild(a), clearInterval(b), b = null)
                    }, 50)
                }
            }
        }, {
            key: "chooseYunFile", value: function (a) {
                var b = this;
                window.inYun() && window.XuntongJSBridge && window.XuntongJSBridge.call("selectFile", {
                    pLink: "true",
                    type: "1"
                }, function (c) {
                    var d = "".concat(c.success);
                    if ("true" == d) {
                        var e = c.data ? c.data.files : [], f = a.resultType || 1;
                        e.map(function (c) {
                            var d = "fileId=".concat(c.fileId, "&resultType=").concat(f, "&fileName=").concat(c.fileName, "&downloadUrl=").concat(c.downloadUrl, "&fileExt=").concat(c.fileExt, "&CURRENT_CP_AGENT_ID=").concat(window.CURRENT_CP_AGENT_ID || "");
                            b.jemAjax("wxapi/saveMedia", function (d, e) {
                                if (200 == e && 0 == d.errcode) if (1 === f) {
                                    var g, h = d.fileid || "";
                                    b.objCallBack((g = {errMsg: "ok"}, _defineProperty(g, c.fileName, h), _defineProperty(g, "chooseFile", c), g), a.success)
                                } else {
                                    var i, j = d.base64file || "";
                                    b.objCallBack((i = {errMsg: "ok"}, _defineProperty(i, c.fileName, j), _defineProperty(i, "chooseFile", c), i), a.success)
                                } else {
                                    var k, l = (k = {
                                        error: d,
                                        status: e
                                    }, _defineProperty(k, c.fileName, "fail"), _defineProperty(k, "chooseFile", c), _defineProperty(k, "errMsg", "saveMedia 璋冪敤寮傚父"), k);
                                    b.writeErrorLog(l, "chooseYunFile ajax"), b.objCallBack(l, a.fail)
                                }
                            }, d)
                        })
                    } else if ("false" == d) "鐢ㄦ埛鍙栨秷" != c.error && (b.writeErrorLog(c.error, "chooseYunFile"), b.objCallBack({error: c.error}, a.fail)); else {
                        var g = {error: "鎺ュ彛杩斿洖鍊奸潪娉�"};
                        b.writeErrorLog(g, "chooseYunFile"), b.objCallBack(g, a.fail)
                    }
                })
            }
        }, {
            key: "wxPay", value: function (a) {
                var b = this;
                if (window.inWx()) try {
                    if (!a.body) return void this.objCallBack({errMsg: "鍟嗗搧鎻忚堪涓嶈兘涓虹┖"}, a.fail);
                    if (!a.total_fee) return void this.objCallBack({errMsg: "鏀粯閲戦涓嶈兘涓虹┖"}, a.fail);
                    var c = "body=".concat(a.body, "&total_fee=").concat(a.total_fee, "&CURRENT_CP_AGENT_ID=").concat(window.CURRENT_CP_AGENT_ID || "");
                    a.attach && (c = "".concat(c, "&attach=").concat(a.attach)), a.mchid && (c = "".concat(c, "&mchid=").concat(a.mchid)), this.jemAjax("wxapi/wxpay/unifiedorder", function (c, d) {
                        if (200 == d && 0 == c.errcode) {
                            var e = c.result || {}, f = _objectSpread({}, e, {status: 0, mchid: a.mchid});
                            b.objCallBack(f, a.success), WeixinJSBridge.invoke("getBrandWCPayRequest", {
                                appId: e.appId,
                                timeStamp: e.timeStamp,
                                nonceStr: e.nonceStr,
                                "package": e["package"],
                                signType: e.signType,
                                paySign: e.paySign
                            }, function (c) {
                                if (c.errMsg || (c.errMsg = c.err_msg), !(c && c.errMsg && c.errMsg.indexOf(":ok") > -1)) {
                                    var d = _objectSpread({}, c, e, {error: "鏀粯澶辫触", status: 3});
                                    return b.writeErrorLog(d, "wxPay"), void b.objCallBack(d, a.fail)
                                }
                                e.status = 2;
                                var f = "out_trade_no=".concat(e.out_trade_no, "&mchid=").concat(a.mchid ? a.mchid : "", "&CURRENT_CP_AGENT_ID=").concat(window.CURRENT_CP_AGENT_ID || "");
                                b.jemAjax("wxapi/wxpay/setPayStatus", function (c, d) {
                                    if (200 == d && 0 == c.errcode) {
                                        var f = c.result || {};
                                        e = _objectSpread({}, e, f, {mchid: a.mchid}), b.objCallBack(e, a.success)
                                    } else {
                                        var g = {error: c, status: d, errMsg: "setPayStatus 璋冪敤寮傚父"};
                                        b.writeErrorLog(g, "wxPay ajax setPayStatus"), b.objCallBack(g, a.fail)
                                    }
                                }, f)
                            })
                        } else {
                            var g = {error: c, status: d, errMsg: "unifiedorder 璋冪敤寮傚父"};
                            b.writeErrorLog(g, "wxPay ajax unifiedorder"), b.objCallBack(g, a.fail)
                        }
                    }, c)
                } catch (d) {
                    this.writeErrorLog(d, "wxPay"), this.objCallBack(d, a.fail)
                }
            }
        }, {
            key: "getAllSupportJsapi", value: function () {
                var a = this;
                this.eMobileFunc({
                    success: function (b) {
                        var c = b.supportJsapi || [];
                        c.length > 0 && (a.inAndroid() && (a.androidFuncArr = [].concat(_toConsumableArray(c), ["pageVisible"])), a.inIphone() && (a.iosFuncArr = [].concat(_toConsumableArray(c), ["pageVisible"])))
                    }
                }, "getAllSupportJsapi")
            }
        }, {
            key: "ready", value: function () {
                var a = this, b = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function () {
                };
                if (b && "[object Function]" === Object.prototype.toString.apply(b)) {
                    if (this.inEM7APP()) return void (this.WebViewJavascriptBridge ? b() : (this.WebViewJavascriptBridge = window.WebViewJavascriptBridge || window.top.WebViewJavascriptBridge, b()));
                    if (window.inWx()) {
                        var c = 0, d = 0, e = setInterval(function () {
                            if (!window.inWxReadyFlag) return void (c < 50 ? c++ : (clearInterval(e), e = null, c = 0, d = 0, console.log("wx jsapi no load"), a.writeErrorLog("wx jsapi no load", "ready wx error"), b("jsapinoload")));
                            clearInterval(e), c = 0, d = 0, e = null, window.wx && window.wx.ready(function () {
                                console.log("wx ready"), a.EM_JSAPI_CONFIG_PARAMS = window.EM_JSAPI_CONFIG_PARAMS, window.wx && void 0 === window.wx.agentConfig && (window.wx.agentConfig = function () {
                                    console.log("wx.agentConfig is not a function")
                                }), b()
                            }), window.wx && window.wx.error(function (c) {
                                return console.log("wx error", c), a.writeErrorLog(c, "ready wx error"), window.inWxReadyAgain ? void b("error") : (console.log("wx not ready again"), a.writeErrorLog("wx not ready again", "ready wx error"), void b("error"))
                            });
                            var f = setInterval(function () {
                                return window.inWxConfigReadyFlag ? (clearInterval(f), f = null, void (window.IS_CP_CONFIG_FLAG === !1 && (console.log("wx IS_CP_CONFIG_FLAG is false"), a.writeErrorLog("wx IS_CP_CONFIG_FLAG is false", "ready wx error"), b("NO_IS_CP_CONFIG_FLAG")))) : void (d < 50 ? d++ : (clearInterval(f), f = null, d = 0, console.log("wx config no load"), a.writeErrorLog("wx config no load", "ready wx error"), b("confignoload")))
                            }, 100)
                        }, 100);
                        return
                    }
                    if (window.inDing()) {
                        var f = 0, g = 0, h = setInterval(function () {
                            if (!window.inDingReadyFlag) return void (f < 50 ? f++ : (clearInterval(h), h = null, f = 0, g = 0, console.log("ding jsapi no load"), b("jsapinoload")));
                            if (clearInterval(h), f = 0, g = 0, h = null, window.inDingPc()) return console.log("ding pc"), void b();
                            var c = setInterval(function () {
                                return window.inDingConfigReadyFlag ? (clearInterval(c), g = 0, c = null, window.dd && window.dd.ready(function () {
                                    console.log("ding ready"), b()
                                }), window.dd && window.dd.error(function (c) {
                                    console.log("ding error", c), a.writeErrorLog(c, "ready ding error"), window.inDingReadyAgain ? (console.log("ding ready again"), b("error ready")) : (console.log("ding not ready again"), b("error not ready"))
                                }), void (window.IS_CP_CONFIG_FLAG === !1 && (console.log("ding IS_CP_CONFIG_FLAG is false"), b("NO_IS_CP_CONFIG_FLAG")))) : void (g < 50 ? g++ : (clearInterval(c), c = null, g = 0, console.log("ding config no load"), b("configapinoload")))
                            }, 100)
                        }, 100);
                        return
                    }
                    if (window.inZheZhengDing()) {
                        var i = 0, j = 0, k = setInterval(function () {
                            if (!window.inZZDReadyFlag) return void (i < 50 ? i++ : (clearInterval(k), k = null, i = 0, j = 0, console.log("ZZD jsapi no load"), b("jsapinoload")));
                            clearInterval(k), i = 0, j = 0, k = null;
                            var a = setInterval(function () {
                                return window.inZZDConfigReadyFlag ? (clearInterval(a), j = 0, a = null, window.dd && window.dd.ready(function () {
                                    console.log("ZZD ready"), b()
                                }), void (window.IS_CP_CONFIG_FLAG === !1 && (console.log("ZZD IS_CP_CONFIG_FLAG is false"), b("NO_IS_CP_CONFIG_FLAG")))) : void (j < 50 ? j++ : (clearInterval(a), a = null, j = 0, console.log("ZZD config no load"), b("configapinoload")))
                            }, 100)
                        }, 100);
                        return
                    }
                    if (window.inYun()) {
                        if (qingPublic) {
                            var l = 0, m = setInterval(function () {
                                return window.inYunReadyFlag ? (clearInterval(m), l = 0, m = null, void (window.qing && window.qing.ready(function () {
                                    console.log("yun ready"), b()
                                }))) : void (l < 50 ? l++ : (clearInterval(m), m = null, l = 0, console.log("yun jsapi no load"), b("jsapinoload")))
                            }, 100);
                            return
                        }
                        console.log("yun private"), b()
                    }
                    if (window.inYunPc()) return void b();
                    if (window.inWeLink()) {
                        var n = 0, o = 0, p = setInterval(function () {
                            if (!window.inWeLinkReadyFlag) return void (n < 50 ? n++ : (clearInterval(p), p = null, n = 0, o = 0, console.log("HWH5 jsapi no load"), b("jsapinoload")));
                            clearInterval(p), n = 0, o = 0, p = null, window.HWH5 && window.HWH5.ready(function () {
                                console.log("HWH5 ready"), b()
                            }), window.HWH5 && window.HWH5.error(function (a) {
                                console.log("HWH5 error", a), b("error")
                            });
                            var a = setInterval(function () {
                                return window.inWeLinkConfigFlag ? (clearInterval(a), a = null, void (window.IS_CP_CONFIG_FLAG === !1 && (console.log("HWH5 IS_CP_CONFIG_FLAG is false"), b("NO_IS_CP_CONFIG_FLAG")))) : void (o < 50 ? o++ : (clearInterval(a), a = null, o = 0, console.log("HWH5 config no load"), b("confignoload")))
                            }, 100)
                        }, 100);
                        return
                    }
                    if (window.inFeiShu()) {
                        var q = 0, r = 0, s = setInterval(function () {
                            if (!window.inFSReadyFlag) return void (q < 50 ? q++ : (clearInterval(s), s = null, q = 0, r = 0, console.log("h5sdk jsapi no load"), b("jsapinoload")));
                            clearInterval(s), q = 0, r = 0, s = null;
                            var c = setInterval(function () {
                                window.inFSConfigFlag ? (clearInterval(c), c = null, window.h5sdk && window.h5sdk.ready(function () {
                                    console.log("h5sdk ready"), b()
                                }), window.h5sdk && window.h5sdk.error(function (b) {
                                    a.writeErrorLog(b, "ready h5sdk error")
                                }), window.IS_CP_CONFIG_FLAG === !1 && (console.log("h5sdk IS_CP_CONFIG_FLAG is false"), b("NO_IS_CP_CONFIG_FLAG"))) : r < 50 ? r++ : (clearInterval(c), c = null, r = 0, console.log("h5sdk config no load"), b("confignoload"))
                            }, 100)
                        }, 100);
                        return
                    }
                    if (this.inAndroid() || this.inIphone()) return void b();
                    if (!this.inEMobilePc() || this.isPCEMobileOk) return void b();
                    var t = setInterval(function () {
                        a.isPCEMobileOk && (clearInterval(t), t = null, b())
                    }, 100);
                    setTimeout(function () {
                        a.isPCEMobileOk || (clearInterval(t), t = null, b())
                    }, 800)
                }
            }
        }, {
            key: "agentReady", value: function () {
                var a = this, b = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function () {
                };
                if (window.inWeWork()) {
                    var c = window.EM_JSAPI_AGENTCONFIG_RESULT ? window.EM_JSAPI_AGENTCONFIG_RESULT.status : 0,
                        d = window.EM_JSAPI_AGENTCONFIG_RESULT ? window.EM_JSAPI_AGENTCONFIG_RESULT.msg : "鏈繑鍥炲け璐ュ師鍥�";
                    if (0 == c) try {
                        var e = "CURRENT_CP_AGENT_ID=".concat(window.CURRENT_CP_AGENT_ID || "");
                        this.jemAjax("wxapi/jsagentconfig?v=".concat(time, "&localurl=").concat(finalLocalUrl), function (e, f) {
                            if (200 == f && 0 == e.errcode) {
                                if (c = window.EM_JSAPI_AGENTCONFIG_RESULT ? window.EM_JSAPI_AGENTCONFIG_RESULT.status : 0, d = window.EM_JSAPI_AGENTCONFIG_RESULT ? window.EM_JSAPI_AGENTCONFIG_RESULT.msg : "鏈繑鍥炲け璐ュ師鍥�", 0 == c) {
                                    var g = e.config || "{}", h = JSON.parse(g);
                                    0 == h.isprivate ? wx.agentConfig({
                                        jsApiList: h.jsApiList,
                                        agentid: h.agentid,
                                        corpid: h.corpid,
                                        timestamp: Number(h.timestamp),
                                        nonceStr: h.nonceStr,
                                        signature: h.signature,
                                        success: function () {
                                            b(), window.EM_JSAPI_AGENTCONFIG_RESULT = {status: 1}
                                        },
                                        fail: function (b) {
                                            a.writeErrorLog(b, "agentReady"), window.EM_JSAPI_AGENTCONFIG_RESULT = {
                                                status: 2,
                                                msg: b.errMsg
                                            }
                                        }
                                    }) : wx.invoke("agentConfig", {
                                        jsApiList: h.jsApiList,
                                        agentid: h.agentid,
                                        corpid: h.corpid,
                                        timestamp: Number(h.timestamp),
                                        nonceStr: h.nonceStr,
                                        signature: h.signature,
                                        success: function () {
                                            b(), window.EM_JSAPI_AGENTCONFIG_RESULT = {status: 1}
                                        },
                                        fail: function (b) {
                                            a.writeErrorLog(b, "agentReady"), window.EM_JSAPI_AGENTCONFIG_RESULT = {
                                                status: 2,
                                                msg: b.errMsg
                                            }
                                        }
                                    }, function (c) {
                                        return "agentConfig:ok" != c.err_msg ? (a.writeErrorLog(c, "agentReady"), void (window.EM_JSAPI_AGENTCONFIG_RESULT = {
                                            status: 2,
                                            msg: c
                                        })) : (b(), void (window.EM_JSAPI_AGENTCONFIG_RESULT = {status: 1}))
                                    })
                                }
                                1 == c && b(), 2 == c && a.writeErrorLog(d, "agentReady")
                            } else a.writeErrorLog(e, "agentReady ajax")
                        }, e)
                    } catch (f) {
                        this.writeErrorLog(f, "agentReady")
                    }
                    1 == c && b(), 2 == c && this.writeErrorLog(d, "agentReady")
                }
            }
        }, {
            key: "selectUserOrGroup", value: function (a) {
                return a.type = a.type || -1, this.inEM7APP() ? void this.eMobileFunc(a, "selectUserOrGroup") : void (this.funcCheck(a) && this.postMsg("selectUserOrGroup", a))
            }
        }, {
            key: "openWxEnterpriseChat", value: function (a) {
                var b = this;
                try {
                    var c = a.userIds || "", d = c.split(";"), e = d.toString(),
                        f = "outSysId=".concat(a.sysId || "", "&outSysUserId=").concat(e || "", "&CURRENT_CP_AGENT_ID=").concat(window.CURRENT_CP_AGENT_ID || "");
                    this.jemAjax("wxapi/getOpenUserId", function (c, e) {
                        if (200 == e && 0 == c.errcode) {
                            var f = c.result || {}, g = [];
                            d.map(function (a) {
                                g = [].concat(_toConsumableArray(g), _toConsumableArray(f[a]))
                            });
                            var h = g.join(";");
                            wx.openEnterpriseChat({
                                userIds: h,
                                externalUserIds: a.externalUserIds || "",
                                groupName: a.groupName || "",
                                chatId: a.chatId || "",
                                success: function (c) {
                                    b.objCallBack(c, a.success)
                                },
                                fail: function (c) {
                                    b.writeErrorLog(c, "openWxEnterpriseChat"), b.objCallBack(c, a.fail)
                                }
                            })
                        } else {
                            var i = {error: c, status: e, errMsg: "getOpenUserId 璋冪敤寮傚父"};
                            b.writeErrorLog(i, "openWxEnterpriseChat ajax"), b.objCallBack(i, a.fail)
                        }
                    }, f)
                } catch (g) {
                    this.writeErrorLog(g, "openWxEnterpriseChat"), this.objCallBack(g, a.fail)
                }
            }
        }, {
            key: "pickConversation", value: function (a) {
                var b = this, c = window.EM_JSAPI_CONFIG_PARAMS ? window.EM_JSAPI_CONFIG_PARAMS.corpId : "";
                window.dd && window.dd.biz.chat.pickConversation({
                    corpId: c, isConfirm: !0, onSuccess: function (c) {
                        b.objCallBack(c, a.success)
                    }, onFail: function (c) {
                        b.writeErrorLog(c, "pickConversation"), b.objCallBack(c, a.fail)
                    }
                })
            }
        }, {
            key: "chooseConversationForDD", value: function (a) {
                var b = this, c = window.EM_JSAPI_CONFIG_PARAMS ? window.EM_JSAPI_CONFIG_PARAMS.corpId : "";
                window.dd && window.dd.biz.chat.chooseConversationByCorpId({
                    corpId: c,
                    isAllowCreateGroup: a.isAllowCreateGroup || !1,
                    filterNotOwnerGroup: a.filterNotOwnerGroup || !1,
                    onSuccess: function (c) {
                        b.objCallBack(c, a.success)
                    },
                    onFail: function (c) {
                        b.writeErrorLog(c, "chooseConversationForDD"), b.objCallBack(c, a.fail)
                    }
                })
            }
        }, {
            key: "openSingleChat", value: function (a) {
                var b = this, c = window.EM_JSAPI_CONFIG_PARAMS ? window.EM_JSAPI_CONFIG_PARAMS.corpId : "";
                window.dd && window.dd.biz.chat.openSingleChat({
                    corpId: c, userId: a.userId, onSuccess: function (c) {
                        b.objCallBack(c, a.success)
                    }, onFail: function (c) {
                        b.writeErrorLog(err, "openSingleChat"), b.objCallBack(err, a.fail)
                    }
                })
            }
        }, {
            key: "downloadFileForDD", value: function (a) {
                var b = this, c = window.EM_JSAPI_CONFIG_PARAMS ? window.EM_JSAPI_CONFIG_PARAMS.corpId : "";
                window.dd && window.dd.biz.cspace.saveFile({
                    corpId: c,
                    url: a.filepath,
                    name: a.filename,
                    onSuccess: function (d) {
                        var e = d.data ? d.data[0] : {};
                        window.dd && window.dd.biz.cspace.preview({
                            corpId: c,
                            spaceId: e.spaceId,
                            fileId: e.fileId,
                            fileName: e.fileName,
                            fileSize: e.fileSize,
                            fileType: e.fileType,
                            onSuccess: function () {
                                b.objCallBack({errMsg: "鎵撳紑鎴愬姛"}, a.success)
                            },
                            onFail: function (c) {
                                b.writeErrorLog(c, "downloadFileForDD preview"), b.objCallBack(c, a.fail)
                            }
                        })
                    },
                    onFail: function (c) {
                        "璇锋眰琚彇娑�" !== c.errorMessage && (b.writeErrorLog(c, "downloadFileForDD saveFile"), b.objCallBack(c, a.fail))
                    }
                })
            }
        }, {
            key: "dingCreate", value: function (a) {
                var b = this, c = function (a) {
                    return Array.from(new Set(a))
                };
                try {
                    var d = a.users || [], e = a.taskInfo && a.taskInfo.ccUsers ? a.taskInfo.ccUsers : [],
                        f = c([].concat(_toConsumableArray(d), _toConsumableArray(e))), g = f.toString(),
                        h = "outSysId=".concat(a.corpId || "", "&outSysUserId=").concat(g || "", "&CURRENT_CP_AGENT_ID=").concat(window.CURRENT_CP_AGENT_ID || "");
                    this.jemAjax("wxapi/getOpenUserId", function (c, f) {
                        if (200 == f && 0 == c.errcode) try {
                            var g = c.result || {}, h = [], i = [];
                            d.length > 0 && d.map(function (a) {
                                g[a] && (h = [].concat(_toConsumableArray(h), _toConsumableArray(g[a])))
                            }), e.length > 0 && e.map(function (a) {
                                g[a] && (i = [].concat(_toConsumableArray(i), _toConsumableArray(g[a])))
                            }), a.taskInfo && (a.taskInfo.ccUsers = i), window.dd && window.dd.biz.ding.create({
                                users: h,
                                corpId: window.CURRENT_OPEN_CORP_ID || "",
                                type: a.type,
                                alertType: a.alertType,
                                alertDate: a.alertDate,
                                attachment: a.attachment,
                                text: a.text,
                                bizType: a.bizType,
                                confInfo: a.confInfo,
                                taskInfo: a.taskInfo,
                                onSuccess: function () {
                                    b.objCallBack({errMsg: "dingCreate: success", errCode: 0}, a.success)
                                },
                                onFail: function (c) {
                                    b.writeErrorLog(c, "dingCreate"), b.objCallBack(c, a.fail)
                                }
                            })
                        } catch (j) {
                            b.writeErrorLog(j, "dingCreate"), b.objCallBack(j, a.fail)
                        } else {
                            var k = {error: c, status: f, errMsg: "getOpenUserId 璋冪敤寮傚父"};
                            b.writeErrorLog(k, "dingCreate ajax"), b.objCallBack(k, a.fail)
                        }
                    }, h)
                } catch (i) {
                    this.writeErrorLog(i, "dingCreate"), this.objCallBack(i, a.fail)
                }
            }
        }, {
            key: "shareMessage", value: function (a) {
                return this.inEM7APP() ? void this.eMobileFunc(a, "shareMessage") : void (this.funcCheck(a) && this.postMsg("shareMessage", a))
            }
        }, {
            key: "getTargetInfo", value: function (a) {
                return this.inEM7APP() ? void this.eMobileFunc(a, "getTargetInfo") : void (this.funcCheck(a) && this.postMsg("getTargetInfo", a))
            }
        }, {
            key: "getCpUser", value: function () {
                var a = this, b = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                if (!this.inEM7APP() && !this.inEMobilePc()) try {
                    var c = "CURRENT_CP_AGENT_ID=".concat(window.CURRENT_CP_AGENT_ID || "");
                    b.outSysId && (c = "".concat(c, "&outSysId=").concat(b.outSysId)), this.jemAjax("wxapi/getCpUser", function (c, d) {
                        if (200 == d && 0 == c.errcode) {
                            var e = c.userinfo || {};
                            c.outsysUserId && (e.outsysUserId = c.outsysUserId), a.objCallBack(e, b.success)
                        } else {
                            var f = {error: c, status: d, errMsg: "getCpUser 璋冪敤寮傚父"};
                            a.writeErrorLog(f, "getCpUser ajax"), a.objCallBack(f, b.fail)
                        }
                    }, c)
                } catch (d) {
                    this.writeErrorLog(d, "getCpUser"), this.objCallBack(d, b.fail)
                }
            }
        }, {
            key: "getCpUserQrCode", value: function () {
                var a = this, b = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                if (!this.inEM7APP() && !this.inEMobilePc()) try {
                    var c = "CURRENT_CP_AGENT_ID=".concat(window.CURRENT_CP_AGENT_ID || "", "&outSysId=").concat(b.outSysId, "&outSysUserId=").concat(b.outSysUserId);
                    this.jemAjax("wxapi/getCpUserQrCode", function (c, d) {
                        if (200 == d && 0 == c.errcode) {
                            var e = {qrCode: c.qr_code};
                            a.objCallBack(e, b.success)
                        } else {
                            var f = {error: c, status: d, errMsg: "getCpUserQrCode 璋冪敤寮傚父"};
                            a.writeErrorLog(f, "getCpUserQrCode ajax"), a.objCallBack(f, b.fail)
                        }
                    }, c)
                } catch (d) {
                    this.writeErrorLog(d, "getCpUserQrCode"), this.objCallBack(d, b.fail)
                }
            }
        }, {
            key: "pushToLogin", value: function (a) {
                return this.inEM7APP() ? void this.eMobileFunc(a, "pushToLogin") : void (this.funcCheck(a) && this.postMsg("pushToLogin", a))
            }
        }, {
            key: "pushToMain", value: function (a) {
                return this.inEM7APP() ? void this.eMobileFunc(a, "pushToMain") : void (this.funcCheck(a) && this.postMsg("pushToMain", a))
            }
        }, {
            key: "switchServer", value: function (a) {
                return this.inEM7APP() ? void this.eMobileFunc(a, "switchServer") : void (this.funcCheck(a) && this.postMsg("switchServer", a))
            }
        }, {
            key: "ssoLogin", value: function () {
                var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return this.inEM7APP() ? void this.eMobileFunc(a, "ssoLogin") : void (this.funcCheck(a) && (void 0 === a.into && (a.into = 1), a.lang_type = a.lang_type || "zh", a.cdata = a.cdata ? "".concat(document.cookie, " ").concat(a.cdata) : document.cookie, this.postMsg("ssoLogin", a)))
            }
        }, {
            key: "pageVisible", value: function (a) {
                if (a && "[object Function]" === Object.prototype.toString.apply(a)) {
                    if (this.inEM7APP()) return void em.appEventListener({
                        name: "KPageVisibleNotificationName",
                        action: function (b) {
                            var c = "[object String]" === Object.prototype.toString.apply(b) ? JSON.parse(b) : b;
                            a(c.visible)
                        }
                    });
                    if (window.inDing() && !window.inDingPc() || window.inZheZhengDing()) return void document.addEventListener("resume", function (b) {
                        b.preventDefault(), a(!0)
                    }, !1);
                    if (window.inYun()) return void (qingPublic === !0 && (window.qing && window.qing.on("appear", function () {
                        a(!0)
                    }), window.qing && window.qing.on("disappear", function () {
                        a(!1)
                    })));
                    this.pageVisibleCallback = a
                }
            }
        }, {
            key: "registerEmListener", value: function (a) {
                a && "[object Function]" === Object.prototype.toString.apply(a) && (this.registerEmListenerCallback = a)
            }
        }, {
            key: "specialClientInfo", value: function () {
                var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    b = arguments.length > 1 ? arguments[1] : void 0,
                    c = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, d = {
                        clientType: b,
                        clientVersion: "",
                        deviceId: "",
                        osVersion: "",
                        clientModel: "",
                        clientFont: "",
                        clientTheme: "",
                        clientLang: "zh_CN",
                        networkType: "",
                        SSID: "",
                        BSSID: ""
                    }, e = _objectSpread({}, c, d);
                this.objCallBack(e, a.success)
            }
        }, {
            key: "getClientInfo", value: function (a) {
                var b = this;
                this.ready(function () {
                    if (b.inEM7APP()) b.eMobileFunc(a, "getClientInfo"); else {
                        if (!b.funcCheck(a, 2)) return void (b.inAndroid() || b.inIphone() ? b.specialClientInfo(a, 5) : b.specialClientInfo(a, 6));
                        b.postMsg("getClientInfo", a)
                    }
                })
            }
        }, {
            key: "changeLoginTitle", value: function (a) {
                this.funcCheck(a) && this.postMsg("changeLoginTitle", a)
            }
        }, {
            key: "chooseInvoice", value: function () {
                var a = this, b = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                if (window.inWeWork() || window.inWx()) try {
                    var c = "CURRENT_CP_AGENT_ID=".concat(window.CURRENT_CP_AGENT_ID || ""),
                        d = this.EM_JSAPI_CONFIG_PARAMS ? this.EM_JSAPI_CONFIG_PARAMS.appId : window.EM_JSAPI_CONFIG_PARAMS ? window.EM_JSAPI_CONFIG_PARAMS.appId : "";
                    this.jemAjax("wxapi/wxcard", function (c, e) {
                        if (200 == e && 0 == c.errcode) {
                            var f = c.result || {};
                            wx.invoke("chooseInvoice", {
                                appId: d,
                                verifyAppId: d,
                                signType: "sha1",
                                timestamp: f.timestamp,
                                nonceStr: f.nonceStr,
                                cardSign: f.signature
                            }, function (c) {
                                if (c.err_msg && c.err_msg.indexOf("ok") > -1) {
                                    var d = {
                                        errMsg: c.err_msg,
                                        errCode: c.err_code || 0,
                                        choose_invoice_info: c.choose_invoice_info || [],
                                        setInvoiceList: c.choose_invoice_info || []
                                    };
                                    a.objCallBack(d, b.success)
                                } else if (c.err_msg && c.err_msg.indexOf("cancel") > -1) {
                                    var e = {errMsg: c.err_msg, errCode: c.err_code || 0};
                                    a.objCallBack(e, b.cancel)
                                } else {
                                    var f = {errMsg: c.err_msg, errCode: c.err_code || 0};
                                    a.writeErrorLog(f, "chooseInvoice"), a.objCallBack(f, b.fail)
                                }
                            })
                        } else {
                            var g = {error: c, status: e, errMsg: "wxcard 璋冪敤寮傚父"};
                            a.writeErrorLog(g, "chooseInvoice ajax"), a.objCallBack(g, b.fail)
                        }
                    }, c)
                } catch (e) {
                    this.writeErrorLog(e, "chooseInvoice"), this.objCallBack(e, b.fail)
                }
                if (this.inEM7APP()) return void this.eMobileFunc(b, "chooseInvoice")
            }
        }, {
            key: "closeWindow", value: function () {
                var a = this, b = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return window.inWx() ? (window.wx && window.wx.closeWindow({
                    fail: function (c) {
                        a.writeErrorLog(c, "closeWindow"), a.objCallBack(c, b.fail)
                    }
                }), void (window.inWeWorkPc() && window.close())) : window.inDing() ? (window.inDingPc() && window.dd && window.dd.biz.navigation.quit({
                    message: "dd quit success",
                    onSuccess: function (c) {
                        a.objCallBack(c, b.success)
                    },
                    onFail: function (c) {
                        a.writeErrorLog(c, "closeWindow"), a.objCallBack(c, b.fail)
                    }
                }), void (window.dd && window.dd.biz.navigation.close({
                    onSuccess: function (c) {
                        a.objCallBack(c, b.success)
                    }, onFail: function (c) {
                        a.writeErrorLog(c, "closeWindow"), a.objCallBack(c, b.fail)
                    }
                }))) : window.inZheZhengDing() ? void (window.dd && window.dd.closePage().then(function (c) {
                    a.objCallBack(c, b.success)
                })["catch"](function (c) {
                    a.writeErrorLog(c, "closeWindow"), a.objCallBack(c, b.fail)
                })) : window.inYun() ? void (qingPublic === !0 ? window.qing && window.qing.call("closeWebView") : qingPublic === !1 && window.XuntongJSBridge && window.XuntongJSBridge.call("close")) : window.inYunPc() ? void (window.XuntongJSBridge && window.XuntongJSBridge.call("closeWebView")) : window.inWeLink() ? void (window.HWH5 && window.HWH5.close()["catch"](function (b) {
                    a.writeErrorLog(b, "closeWindow")
                })) : window.inFeiShu() ? void (window.h5sdk && window.h5sdk.ready(function () {
                    window.h5sdk && window.h5sdk.biz.navigation.close({
                        onSuccess: function (c) {
                            a.objCallBack(c, b.success)
                        }
                    })
                })) : this.inEM7APP() ? void this.eMobileFunc(b, "closeWindow") : void (this.funcCheck(b) && this.postMsg("closeWindow", b))
            }
        }, {
            key: "sendMsg", value: function () {
                var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return a.idType = a.idType || 0, this.inEM7APP() ? void this.eMobileFunc(a, "sendMsg") : void (this.funcCheck(a) && (10 === a.msgType && (a.msgInfo.corpid || (this.configCid ? a.msgInfo.corpid = this.configCid : a.msgInfo.corpid = this.corpid), a.msgInfo.agentid || (this.configAid ? a.msgInfo.agentid = this.configAid : a.msgInfo.agentid = this.agentid)), this.postMsg("sendMsg", a)))
            }
        }, {
            key: "openLink", value: function () {
                var a = this, b = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                if (this.inEMobilePc() || this.writeErrorLog(b, "openLink obj"), this.inEM7APP()) return void this.eMobileFunc(b, "openLink");
                var c = window.location.origin;
                if (window.inDing() && 0 === b.url.indexOf("dingtalk://")) return void (window.location.href = b.url);
                if (window.inWeWorkPc() || window.inDingPc() || window.inYunPc() || window.inFeiShuPc() || window.inZheZhengDingPc()) return void this.openDefaultBrowser(b);
                if (window.inDing() || window.inYun() || window.inFeiShu() || window.inZheZhengDing()) {
                    var d = b.url || "";
                    if (!/^http/.test(d)) {
                        var e = new RegExp("^" + window.ecologyContentPath);
                        d = e.test(d) ? c + d : c + (window.ecologyContentPath || "") + d
                    }
                    if (!d) {
                        var f = {errMsg: "url涓嶈兘涓虹┖"};
                        return this.writeErrorLog(f, "openLink"), void this.objCallBack(f, b.fail)
                    }
                    return !window.inDingPc() && window.inDing() && window.dd && window.dd.biz.util.openLink({
                        url: d,
                        onSuccess: function (c) {
                            a.objCallBack(c, b.success)
                        },
                        onFail: function (c) {
                            a.writeErrorLog(c, "openLink"), a.objCallBack(c, b.fail)
                        }
                    }), window.inZheZhengDing() && window.dd && window.dd.openLink({url: d}).then(function (c) {
                        a.objCallBack(c, b.success)
                    })["catch"](function (c) {
                        a.writeErrorLog(c, "openLink"), a.objCallBack(c, b.fail)
                    }), window.inYun() && window.qing && window.qing.call("gotoLightApp", {urlParam: d}), void (window.inFeiShu() && window.h5sdk && window.h5sdk.ready(function () {
                        window.h5sdk && window.h5sdk.biz.util.openLink({url: d, title: "", newTab: !0})
                    }))
                }
                if (this.inEMobilePc()) {
                    if (!this.funcCheck(b)) return;
                    b = _objectSpread({}, b, {emOrigin: c}), this.postMsg("openLink", b)
                } else this.openDefaultBrowser(b, "normal")
            }
        }, {
            key: "openBamLink", value: function () {
                var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                if (this.inEM7APP()) return void this.eMobileFunc(a, "openBamLink")
            }
        }, {
            key: "finalOpenDefaultBrowser", value: function (a, b) {
                var c = this;
                return window.inWeWorkPc() ? void (window.wx ? window.wx.invoke("openDefaultBrowser", {url: a}, function (d) {
                    d.errMsg = d.err_msg || d.errMsg, "openDefaultBrowser:ok" === d.errMsg ? c.objCallBack(d, b.success) : (1 !== b.noOpenNew && window.windowEMOpen(a), c.writeErrorLog(d, "finalOpenDefaultBrowser"), c.objCallBack(d, b.fail))
                }) : (window.windowEMOpen(a), this.objCallBack({}, b.success))) : window.inDingPc() ? void (window.dd && window.dd.biz.util.openLink({
                    url: a,
                    onSuccess: function (a) {
                        c.objCallBack(a, b.success)
                    },
                    onFail: function (a) {
                        c.writeErrorLog(a, "finalOpenDefaultBrowser"), c.objCallBack(a, b.fail)
                    }
                })) : (window.windowEMOpen(a), void setTimeout(function () {
                    c.objCallBack({errMsg: "openDefaultBrowser:ok", errCode: 0}, b.success)
                }))
            }
        }, {
            key: "openDefaultBrowser", value: function () {
                var a = this, b = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    c = arguments.length > 1 ? arguments[1] : void 0, d = b.url || "";
                if (d && 0 !== d.indexOf("http")) {
                    var e = window.location.origin;
                    d = "".concat(e).concat(b.url)
                }
                if (!d) return void this.objCallBack({errMsg: "url涓嶈兘涓虹┖"}, b.fail);
                if ("normal" === c) return this.objCallBack({
                    errMsg: "openDefaultBrowser:ok",
                    errCode: 0
                }, b.success), void window.windowEMOpen(d);
                if (1 == b.openType) return void (window.location.href = d);
                if (2 == b.openType && window.inWeWorkPc()) return void windowEMOpen(d);
                if (2 == b.openType && window.inDingPc()) {
                    var f = b || {}, g = f.params, h = void 0 === g ? {} : g;
                    return void dd.biz.util.invokeWorkbench({
                        app_url: d,
                        app_info: {
                            app_tab_key: h.app_tab_key || "1",
                            app_refresh_if_exist: !!h.app_refresh_if_exist,
                            app_active_if_exist: !!h.app_active_if_exist
                        },
                        onSuccess: function (a) {
                            this.objCallBack(a, b.success)
                        },
                        onFail: function (a) {
                            this.writeErrorLog(a, "invokeWorkbench"), this.objCallBack(a, b.fail)
                        }
                    })
                }
                if (!(b.corpId && b.agentId || b.sysId)) return void this.finalOpenDefaultBrowser(d, b);
                var i = d ? 0 : 1, j = {};
                b.corpId && b.agentId && (j = {
                    corpid: b.corpId,
                    agentid: b.agentId
                }, b.sysId && (j = _objectSpread({}, j, {sysid: b.sysId}))), b.corpId && b.agentId || (j = {sysid: b.sysId}), d && (j = _objectSpread({}, j, {linkurl: d})), j = _objectSpread({}, j, {
                    is_dialog: i,
                    em_client_type: 4
                });
                var k = null, l = window.localStorage.getItem("getOsInfo"),
                    m = window.localStorage.getItem("ecode_params");
                if (l && "undefined" !== l) try {
                    var n = JSON.parse(l);
                    k = n.resourceid
                } catch (o) {
                    this.writeErrorLog(o, "openDefaultBrowser getOsInfo try parse")
                }
                if (!k && m && "undefined" !== m) try {
                    var p = JSON.parse(m), q = p._user || {};
                    k = q.id || q.resourceId
                } catch (o) {
                    this.writeErrorLog(o, "openDefaultBrowser ecode_params try parse")
                }
                var r = window.localStorage.getItem("emaccesstk"), s = "emp/api/agent/client/link/msg";
                k && (s = "".concat(s, "?userid=").concat(k), j = _objectSpread({}, j, {userid: k})), r && (s = s.indexOf("?") > -1 ? "".concat(s, "&emaccesstk=").concat(r) : "".concat(s, "?emaccesstk=").concat(r)), this.jemAjax(s, function (c, d) {
                    if (200 == d && 0 == c.errcode) a.finalOpenDefaultBrowser(c.tourl, b); else {
                        var e = [125, 40001, 41001, 42001], f = {error: c, status: d};
                        a.writeErrorLog(f, "openDefaultBrowser"), a.objCallBack(f, b.fail), e.indexOf(c.errcode) > -1 && alert("鐧诲綍瓒呮椂锛岃閲嶆柊鍔犺浇姝ら〉闈㈠摝")
                    }
                }, JSON.stringify(j), "application/json")
            }
        }, {
            key: "onHistoryBack", value: function (a) {
                window.inWx() && wx.onHistoryBack(function () {
                    var b = !0;
                    return "[object Function]" === Object.prototype.toString.apply(a) && (res = a() || !0), b
                })
            }
        }, {
            key: "hideOptionMenu", value: function () {
                window.inWx() && !window.inWeWorkPc() && wx.hideOptionMenu()
            }
        }, {
            key: "showOptionMenu", value: function () {
                window.inWx() && !window.inWeWorkPc() && wx.showOptionMenu()
            }
        }, {
            key: "getEmAuthCode", value: function () {
                var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return this.inEM7APP() ? void this.eMobileFunc(a, "getEmAuthCode") : a.sysId || a.corpId && a.agentId ? void (this.funcCheck(a) && this.postMsg("getEmAuthCode", a)) : void this.objCallBack({errMsg: "鍙傛暟涓嶆纭摝锛宻ysId鍙傛暟涓嶈兘涓虹┖,鎴栬€卌orpId鍜宎gentId涓嶈兘鍚屾椂涓虹┖"}, a.fail)
            }
        }, {
            key: "getUserFromConversation", value: function () {
                var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return this.inEM7APP() ? void this.eMobileFunc(a, "getUserFromConversation") : void (this.funcCheck(a) && (this.agentid && (a.agentid = this.agentid), this.postMsg("getUserFromConversation", a)))
            }
        }, {
            key: "setPageReload", value: function (a) {
                this.funcCheck(a) && this.postMsg("setPageReload", a)
            }
        }, {
            key: "pageReload", value: function (a) {
                this.funcCheck(a) && this.postMsg("pageReload", a)
            }
        }, {
            key: "closeAndReload", value: function (a) {
                this.eMobileFunc(a, "closeAndReload")
            }
        }, {
            key: "openNewWindow", value: function (a) {
                this.eMobileFunc(a, "openNewWindow")
            }
        }, {
            key: "openApp", value: function (a) {
                this.eMobileFunc(a, "openApp")
            }
        }, {
            key: "authorizeWithGuide", value: function (a) {
                window.tt && window.tt.getSetting({
                    success: function (b) {
                        var c = b.authSetting[a.scope];
                        void 0 === c || null === c || c ? a.success() : window.tt && window.tt.showModal({
                            content: a.guideTips,
                            confirmText: "鍘昏缃�",
                            success: function (b) {
                                b.confirm ? window.tt && window.tt.openSetting({
                                    success: function (b) {
                                        b.authSetting[a.scope] ? a.success() : a.fail()
                                    }
                                }) : a.fail()
                            }
                        })
                    }
                })
            }
        }, {
            key: "getLocation", value: function () {
                var a = this, b = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    c = (new Date).getTime(), d = !1;
                b.onLocationChanged && "[object Function]" === Object.prototype.toString.apply(b.onLocationChanged) && (d = !0);
                var e = function (b) {
                    var d = (new Date).getTime() - c, e = {res: b, time: d, msg: "瀹氫綅娑堣€楁椂闂�"};
                    a.writeErrorLog(e, "getLocation")
                };
                return window.inWx() ? void (window.wx && window.wx.getLocation({
                    type: b.type, success: function (c) {
                        e(c), a.objCallBack(c, b.success)
                    }, fail: function (d) {
                        var e = (new Date).getTime() - c, f = {time: e, error: d};
                        a.writeErrorLog(f, "getLocation"), a.objCallBack(f, b.fail)
                    }
                })) : window.inDing() ? (window.dd && window.dd.device.geolocation.get({
                    targetAccuracy: 200,
                    coordinate: 1,
                    withReGeocode: !0,
                    useCache: !1,
                    onSuccess: function (c) {
                        0 == c.longitude && a.writeErrorLog(c, "getLocation"), e(c), a.objCallBack(c, b.success)
                    },
                    onFail: function (c) {
                        a.writeErrorLog(c, "getLocation"), a.objCallBack(c, b.fail)
                    }
                }), void (d && (this.geolocationStartIndex++, window.dd && window.dd.device.geolocation.start({
                    targetAccuracy: 500,
                    iOSDistanceFilter: 200,
                    useCache: !1,
                    withReGeocode: !0,
                    callBackInterval: 3e3,
                    sceneId: this.geolocationStartIndex,
                    onSuccess: function (c) {
                        a.objCallBack(c, b.onLocationChanged)
                    },
                    onFail: function (b) {
                        a.writeErrorLog(b, "getLocation onLocationChanged")
                    }
                })))) : window.inZheZhengDing() ? (window.dd && window.dd.getGeolocation({
                    targetAccuracy: 500,
                    coordinate: 1,
                    withReGeocode: !0,
                    useCache: !1
                }).then(function (c) {
                    e(c), a.objCallBack(c, b.success)
                })["catch"](function (c) {
                    a.writeErrorLog(c, "getLocation"), a.objCallBack(c, b.fail)
                }), void (d && (this.geolocationStartIndex++, window.dd && window.dd.startGeolocation({
                    targetAccuracy: 500,
                    iOSDistanceFilter: 200,
                    useCache: !1,
                    withReGeocode: !0,
                    callBackInterval: 3e3,
                    sceneId: this.geolocationStartIndex,
                    onSuccess: function (c) {
                        a.objCallBack(c, b.onLocationChanged);
                    },
                    onFail: function (b) {
                        a.writeErrorLog(b, "getLocation onLocationChanged")
                    }
                }).then(function (b) {
                    a.writeErrorLog(b, "getLocation onLocationChanged then")
                })["catch"](function (b) {
                    a.writeErrorLog(b, "getLocation onLocationChanged catch")
                })))) : window.inYun() ? void (qingPublic === !0 ? (window.qing && window.qing.call("getLocation", {
                    success: function (c) {
                        if (c.data && c.data.addressdetail && 0 != c.data.latitude) {
                            var d = c.data, f = {
                                latitude: d.latitude,
                                longitude: d.longitude,
                                address: "".concat(d.addressdetail).concat(d.name)
                            };
                            e(d), a.writeErrorLog(c, "getLocation success"), a.objCallBack(f, b.success)
                        } else a.writeErrorLog(c, "getLocation retry"), window.qing && window.qing.call("getLocation", {
                            success: function (c) {
                                if (c.data && c.data.addressdetail && 0 != c.data.latitude) {
                                    var d = c.data, f = {
                                        latitude: d.latitude,
                                        longitude: d.longitude,
                                        address: "".concat(d.addressdetail).concat(d.name)
                                    };
                                    e(d), a.writeErrorLog(c, "getLocation success"), a.objCallBack(f, b.success)
                                } else a.writeErrorLog(c, "getLocation retry fail"), a.objCallBack(c, b.fail)
                            }
                        })
                    }
                }), d && window.qing && window.qing.call("startLocation", {
                    interval: 3,
                    onlyGps: !1,
                    defLocType: 1,
                    success: function (c) {
                        if (c.data && c.data.addressdetail && 0 != c.data.latitude) {
                            console.warn("startLocation", c);
                            var d = c.data, e = {
                                latitude: d.latitude,
                                longitude: d.longitude,
                                address: "".concat(d.addressdetail).concat(d.name)
                            };
                            a.objCallBack(e, b.onLocationChanged)
                        } else a.writeErrorLog(c, "getLocation onLocationChanged")
                    }
                })) : qingPublic === !1 && window.XuntongJSBridge && window.XuntongJSBridge.call("getCurrentLatLon", {}, function (c) {
                    if ("true" === c.success.toString()) {
                        var d = c.data, f = {latitude: d.latitude, longitude: d.longitude};
                        e(d), a.objCallBack(f, b.success)
                    } else a.writeErrorLog(c, "getLocation"), a.objCallBack(c, b.fail)
                })) : window.inWeLink() ? void (window.HWH5 && window.HWH5.getLocation({
                    type: 0,
                    time: 1e4
                }).then(function (c) {
                    e(c);
                    var d = {latitude: c.latitude, longitude: c.longitude};
                    a.objCallBack(d, b.success)
                })["catch"](function (c) {
                    a.writeErrorLog(c, "getLocation"), a.objCallBack(c, b.fail)
                })) : window.inFeiShu() ? void (window.h5sdk && window.h5sdk.ready(function () {
                    var c = a;
                    a.authorizeWithGuide({
                        scope: "scope.userLocation",
                        guideTips: "褰撳墠椤甸潰瀹氫綅闇€瑕佷綘鎺堜簣鍦扮悊浣嶇疆鏉冮檺鎵嶈兘姝ｅ父浣跨敤锛屾槸鍚﹀幓璁剧疆寮€鍚紵",
                        success: function () {
                            window.tt && window.tt.getLocation({
                                type: window.inLark() ? "wgs84" : "gcj02", timeout: 60, success: function (a) {
                                    if (e(a), window.inLark()) {
                                        var d = {
                                            pi: 3.141592653589793,
                                            a: 6378245,
                                            ee: .006693421622965943,
                                            geoTransform: function (a, b) {
                                                var c = {};
                                                if (this.regionOfChina(a, b)) return c.latitude = a, c.longitude = b, c;
                                                var d = this.transformLat(b - 105, a - 35),
                                                    e = this.transformLng(b - 105, a - 35), f = a / 180 * this.pi,
                                                    g = Math.sin(f);
                                                g = 1 - this.ee * g * g;
                                                var h = Math.sqrt(g);
                                                return d = 180 * d / (this.a * (1 - this.ee) / (g * h) * this.pi), e = 180 * e / (this.a / h * Math.cos(f) * this.pi), c.latitude = a + d, c.longitude = b + e, c
                                            },
                                            regionOfChina: function (a, b) {
                                                return b < 72.004 || b > 137.8347 || (a < .8293 || a > 55.8271)
                                            },
                                            transformLat: function (a, b) {
                                                var c = -100 + 2 * a + 3 * b + .2 * b * b + .1 * a * b + .2 * Math.sqrt(Math.abs(a));
                                                return c += 2 * (20 * Math.sin(6 * a * this.pi) + 20 * Math.sin(2 * a * this.pi)) / 3, c += 2 * (20 * Math.sin(b * this.pi) + 40 * Math.sin(b / 3 * this.pi)) / 3, c += 2 * (160 * Math.sin(b / 12 * this.pi) + 320 * Math.sin(b * this.pi / 30)) / 3
                                            },
                                            transformLng: function (a, b) {
                                                var c = 300 + a + 2 * b + .1 * a * a + .1 * a * b + .1 * Math.sqrt(Math.abs(a));
                                                return c += 2 * (20 * Math.sin(6 * a * this.pi) + 20 * Math.sin(2 * a * this.pi)) / 3, c += 2 * (20 * Math.sin(a * this.pi) + 40 * Math.sin(a / 3 * this.pi)) / 3, c += 2 * (150 * Math.sin(a / 12 * this.pi) + 300 * Math.sin(a / 30 * this.pi)) / 3
                                            }
                                        }, f = d.geoTransform(a.latitude, a.longitude);
                                        c.objCallBack(_objectSpread({}, a, f), b.success)
                                    } else c.objCallBack(a, b.success)
                                }, fail: function (a) {
                                    c.writeErrorLog(a, "getLocation"), c.objCallBack(a, b.fail)
                                }
                            })
                        }
                    })
                })) : (this.eMobileFunc(b, "getLocation"), void (this.inEM7APP() && this.eMobileRegisterHandler("onLocationChanged", b, 1)))
            }
        }, {
            key: "openLocation", value: function (a) {
                this.eMobileFunc(a, "openLocation")
            }
        }, {
            key: "chooseImage", value: function () {
                var a = this, b = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                if (window.inWx()) return void (window.wx && window.wx.chooseImage({
                    count: b.count || 9,
                    sizeType: ["original", "compressed"],
                    sourceType: b.sourceType || ["album", "camera"],
                    defaultCameraMode: b.defaultCameraMode || "normal",
                    isSaveToAlbum: "undefined" == typeof b.isSaveToAlbum ? 1 : b.isSaveToAlbum,
                    success: function (c) {
                        a.objCallBack(c, b.success)
                    },
                    fail: function (c) {
                        a.writeErrorLog(c, "chooseImage"), a.objCallBack(c, b.fail)
                    }
                }));
                if (window.inDing()) {
                    var c = b.sourceType || ["album", "camera"], d = "camera" === c.toString() ? 2 : 1;
                    if (this.writeErrorLog(emUA, "dd chooseImage ua"), 1 === d) window.dd && window.dd.biz.util.uploadImage({
                        compression: b.compression || !0,
                        multiple: !0,
                        max: b.count || 3,
                        onSuccess: function (c) {
                            a.objCallBack({localIds: c}, b.success)
                        },
                        onFail: function (c) {
                            "onCancel" === c.errorMessage || "cancel" === c.errorMessage || c.errorCode == -1 || (a.writeErrorLog(c, "dd uploadImage"), a.objCallBack(c, b.fail))
                        }
                    }); else try {
                        window.dd && window.dd.biz.util.uploadImageFromCamera({
                            compression: b.compression || !0,
                            onSuccess: function (c) {
                                a.objCallBack({localIds: c}, b.success)
                            },
                            onFail: function (c) {
                                "onCancel" === c.errorMessage || "cancel" === c.errorMessage || c.errorCode == -1 || (a.writeErrorLog(c, "dd uploadImageFromCamera"), a.objCallBack(c, b.fail))
                            }
                        })
                    } catch (e) {
                        this.objCallBack(e, b.fail)
                    }
                } else {
                    if (window.inWeLink()) {
                        var f = b.sourceType || "";
                        return void (window.HWH5 && window.HWH5.chooseImage({
                            flag: 0 === f.toString().indexOf("camera") ? 2 : 1,
                            imagePickerMode: "IMAGE",
                            maxSelectedCount: b.count || 9
                        }).then(function (c) {
                            a.objCallBack({localIds: c}, b.success)
                        })["catch"](function (c) {
                            a.writeErrorLog(c, "chooseImage"), a.objCallBack(c, b.fail)
                        }))
                    }
                    this.eMobileFunc(b, "chooseImage")
                }
            }
        }, {
            key: "getLocalImgData", value: function () {
                var a = this, b = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                if (window.inWx()) return void (window.wx && window.wx.uploadImage({
                    localId: b.localId || "",
                    isShowProgressTips: 0,
                    success: function (c) {
                        b.localId = c.serverId, a.converBase64(b)
                    },
                    fail: function (c) {
                        a.writeErrorLog(c, "wx uploadImage"), a.objCallBack(c, b.fail)
                    }
                }));
                if (window.inWeLink()) {
                    var c = b.resultType || 0;
                    return void (window.HWH5 && window.HWH5.uploadImage({
                        zip: !1,
                        serverUrl: "".concat(domainUrl, "wxapi/saveMedia"),
                        filePath: b.localId,
                        name: "file",
                        headers: {},
                        formData: {resultType: c, CURRENT_CP_AGENT_ID: window.CURRENT_CP_AGENT_ID},
                        timeout: 3e4
                    }).then(function (d) {
                        if (0 == d.errcode) {
                            var e = {};
                            1 === c ? e.localData = d.fileid || "" : e.localData = d.base64file || "", a.objCallBack(e, b.success)
                        } else {
                            var f = {error: d};
                            a.writeErrorLog(f, "HWH5 uploadImage"), a.objCallBack(f, b.fail)
                        }
                    })["catch"](function (c) {
                        a.writeErrorLog(c, "HWH5 uploadImage"), a.objCallBack(c, b.fail)
                    }))
                }
                return this.inEM7APP() ? void this.eMobileFunc(b, "getLocalImgData") : void this.converBase64(b)
            }
        }, {
            key: "converBase64", value: function () {
                var a = this, b = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                try {
                    var c = b.resultType || 0,
                        d = "mediaId=".concat(b.localId || "", "&resultType=").concat(c, "&CURRENT_CP_AGENT_ID=").concat(window.CURRENT_CP_AGENT_ID || "");
                    this.jemAjax("wxapi/saveMedia", function (d, e) {
                        if (200 == e && 0 == d.errcode) {
                            var f = {};
                            1 === c ? f.localData = d.fileid || "" : f.localData = d.base64file || "", a.objCallBack(f, b.success)
                        } else {
                            var g = {error: d, status: e, errMsg: "saveMedia 璋冪敤寮傚父"};
                            a.writeErrorLog(g, "converBase64 ajax"), a.objCallBack(g, b.fail)
                        }
                    }, d)
                } catch (e) {
                    this.writeErrorLog(e, "converBase64"), this.objCallBack(e, b.fail)
                }
            }
        }, {
            key: "uploadImage", value: function (a) {
                this.eMobileFunc(a, "uploadImage")
            }
        }, {
            key: "downloadImage", value: function (a) {
                this.eMobileFunc(a, "downloadImage")
            }
        }, {
            key: "previewImage", value: function (a) {
                this.eMobileFunc(a, "previewImage")
            }
        }, {
            key: "chooseVideo", value: function (a) {
                this.eMobileFunc(a, "chooseVideo")
            }
        }, {
            key: "uploadVideo", value: function (a) {
                this.eMobileFunc(a, "uploadVideo")
            }
        }, {
            key: "downloadVideo", value: function (a) {
                this.eMobileFunc(a, "downloadVideo")
            }
        }, {
            key: "showVideo", value: function (a) {
                this.eMobileFunc(a, "showVideo")
            }
        }, {
            key: "initiatePrivateChat", value: function (a) {
                return a.idType = a.idType || 0, this.inEM7APP() ? void this.eMobileFunc(a, "initiatePrivateChat") : void (this.funcCheck(a) && this.postMsg("initiatePrivateChat", a))
            }
        }, {
            key: "initiateGroupChat", value: function (a) {
                this.eMobileFunc(a, "initiateGroupChat")
            }
        }, {
            key: "selectUserinitiateChat", value: function (a) {
                this.eMobileFunc(a, "selectUserinitiateChat")
            }
        }, {
            key: "openChatList", value: function (a) {
                this.eMobileFunc(a, "openChatList")
            }
        }, {
            key: "getDeviceID", value: function () {
                var a = this, b = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return window.inDing() ? void (window.dd && dd.device.base.getUUID({
                    onSuccess: function (a) {
                        this.objCallBack(a.uuid, b.success)
                    }, onFail: function (a) {
                        console.error(a), this.objCallBack(a, b.fail), this.writeErrorLog(a, "getDeviceID")
                    }
                })) : void (window.inFeiShu() && (window.tt && window.tt.getDeviceID ? window.tt.getDeviceID({
                    success: function (c) {
                        a.writeErrorLog(c, "getDeviceID success");
                        var d = c.deviceID;
                        a.objCallBack(d, b.success)
                    }, fail: function (c) {
                        a.writeErrorLog(c, "getDeviceID fail"), a.objCallBack(c, b.fail)
                    }
                }) : (this.writeErrorLog({errMsg: "no getDeviceID function"}, "no getDeviceID function"), this.objCallBack({errMsg: "no getDeviceID function"}, b.fail))))
            }
        }, {
            key: "getNetWorkInfo", value: function () {
                var a = this, b = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return window.inDing() ? void (window.dd && window.dd.device.base.getPhoneInfo({
                    onSuccess: function (c) {
                        var d = c.netInfo;
                        if ("wifi" === d) window.dd.device.base.getInterface({
                            onSuccess: function (c) {
                                c.ssid && (c.ssid = c.ssid.replace(/\"/g, ""));
                                var e = {SSID: c.ssid, networkType: d, BSSID: c.macIp};
                                a.objCallBack(e, b.success)
                            }, onFail: function (c) {
                                var d = {errCode: c.errorCode, errMsg: c.errorMessage};
                                a.writeErrorLog(d, "getNetWorkInfo"), a.objCallBack(d, b.fail)
                            }
                        }); else {
                            var e = {SSID: "", BSSID: "", networkType: d};
                            a.objCallBack(e, b.success)
                        }
                    }, onFail: function (c) {
                        a.writeErrorLog(c, "getPhoneInfo"), a.objCallBack(c, b.fail)
                    }
                })) : (window.inYun() && qingPublic === !0 && window.qing && window.qing.call("getNetworkType", {
                    success: function (c) {
                        c.data && "wifi" === c.data.network_type ? window.qing && window.qing.call("getWiFi", {
                            success: function (c) {
                                try {
                                    if (c.data && c.data.list) {
                                        var d = c.data.list || [], e = d.find(function (a) {
                                            return a.isLink && "true" == a.isLink.toString()
                                        });
                                        if (e) {
                                            var f = {SSID: e.ssid, networkType: "wifi", BSSID: e.bssid};
                                            a.objCallBack(f, b.success)
                                        } else a.writeErrorLog(c, "getWiFi"), a.objCallBack(c, b.fail)
                                    }
                                } catch (g) {
                                    a.writeErrorLog(c, "getWiFi"), a.objCallBack(c, b.fail)
                                }
                            }
                        }) : (a.writeErrorLog(c, "getWiFi"), a.objCallBack({
                            SSID: "",
                            networkType: c.data.network_type,
                            BSSID: ""
                        }, b.success))
                    }
                }), window.inZheZhengDing() ? void (window.dd && window.dd.getHotspotInfo().then(function (c) {
                    c.ssid && (c.ssid = c.ssid.replace(/\"/g, ""));
                    var d = {SSID: c.ssid, BSSID: c.macIp};
                    a.objCallBack(d, b.success)
                })["catch"](function (c) {
                    a.writeErrorLog(c, "getNetWorkInfo"), a.objCallBack(c, b.fail)
                })) : (window.inWeWork() && window.wx.getNetworkType({
                    success: function (c) {
                        console.warn(c);
                        var d = c.networkType;
                        if ("wifi" === d) window.wx.startWifi({
                            success: function () {
                                window.wx.getConnectedWifi({
                                    success: function (c) {
                                        if (c.wifi) {
                                            var e = {SSID: c.wifi.SSID, networkType: d, BSSID: c.wifi.BSSID};
                                            a.objCallBack(e, b.success), a.writeErrorLog(e, "getNetWorkInfo success")
                                        } else {
                                            var f = {SSID: "", networkType: d, BSSID: ""};
                                            a.objCallBack(f, b.fail), a.writeErrorLog(f, "getNetWorkInfo")
                                        }
                                    }, fail: function (c) {
                                        a.objCallBack(c, b.fail), a.writeErrorLog(c, "getNetWorkInfo.wx.getConnectedWifi")
                                    }
                                })
                            }, fail: function (c) {
                                a.objCallBack(c, b.fail), a.writeErrorLog(c, "getNetWorkInfo.wx.startWifi")
                            }
                        }); else {
                            var e = {SSID: "", BSSID: "", networkType: d};
                            a.objCallBack(e, b.success), a.writeErrorLog(e, "getNetWorkInfo success(no wifi)")
                        }
                    }, fail: function (c) {
                        console.error(c), a.objCallBack(c, b.fail), a.writeErrorLog(c, "getNetWorkInfo.wx.getNetworkType")
                    }
                }), window.inFeiShu() && window.h5sdk && window.h5sdk.ready(function () {
                    var c = a;
                    a.authorizeWithGuide({
                        scope: "scope.userLocation",
                        guideTips: "褰撳墠椤甸潰瀹氫綅闇€瑕佷綘鎺堜簣鍦扮悊浣嶇疆鏉冮檺鎵嶈兘姝ｅ父浣跨敤锛屾槸鍚﹀幓璁剧疆寮€鍚紵",
                        success: function () {
                            window.tt && window.tt.getNetworkType({
                                success: function (a) {
                                    if (console.log(JSON.stringify(a)), "wifi" === a.networkType) window.tt && window.tt.getConnectedWifi({
                                        success: function (a) {
                                            var d = {
                                                SSID: 0 === a.SSID.indexOf('"') ? a.SSID.substr(1, a.SSID.length - 2) : a.SSID,
                                                networkType: "wifi",
                                                BSSID: a.BSSID
                                            };
                                            c.writeErrorLog(a, "getConnectedWifi success"), c.objCallBack(d, b.success)
                                        }, fail: function (a) {
                                            c.writeErrorLog(a, "getConnectedWifi"), c.objCallBack(a, b.fail)
                                        }
                                    }); else {
                                        var d = {SSID: "", BSSID: "", networkType: a.networkType};
                                        c.writeErrorLog(a, "getConnectedWifi success"), c.objCallBack(d, b.success)
                                    }
                                }, fail: function (a) {
                                    console.log("getNetworkType fail: ".concat(JSON.stringify(a))), c.writeErrorLog(error, "getNetworkType"), c.objCallBack(error, b.fail)
                                }
                            })
                        }
                    })
                }), void this.eMobileFunc(b, "getNetWorkInfo")))
            }
        }, {
            key: "getCurrentWifiInfo", value: function (a) {
                this.eMobileFunc(a, "getCurrentWifiInfo")
            }
        }, {
            key: "showSystemBar", value: function (a) {
                this.eMobileFunc(a, "showSystemBar")
            }
        }, {
            key: "hiddenSystemBar", value: function (a) {
                this.eMobileFunc(a, "hiddenSystemBar")
            }
        }, {
            key: "getBadge", value: function (a) {
                this.eMobileFunc(a, "getBadge")
            }
        }, {
            key: "setBadge", value: function (a) {
                this.eMobileFunc(a, "setBadge")
            }
        }, {
            key: "appEventListener", value: function (a) {
                var b = this;
                this.eMobileFunc(a, "appEventListener", function (a) {
                    b.eMobileRegisterHandler("", a, 4)
                })
            }
        }, {
            key: "scanQRCode", value: function () {
                var a = this, b = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                if (window.inWx()) return void (window.wx && window.wx.scanQRCode({
                    desc: "scanQRCode desc",
                    needResult: 1,
                    scanType: b.scanType || ["qrCode", "barCode"],
                    success: function (c) {
                        a.inIphone() && !window.inWeWork() ? window.setTimeout(function () {
                            a.objCallBack(c, b.success)
                        }, 1e3) : a.objCallBack(c, b.success)
                    },
                    fail: function (c) {
                        if (c.errMsg.indexOf("function_not_exist") > 0) {
                            var d = {errMsg: "鐗堟湰杩囦綆璇峰崌绾�"};
                            return a.writeErrorLog(d, "scanQRCode"), void a.objCallBack(d, b.fail)
                        }
                        a.writeErrorLog(c, "scanQRCode"), a.objCallBack(c, b.fail)
                    }
                }));
                if (window.inDing()) {
                    var c = b.scanType || ["qrCode", "barCode"], d = "all";
                    return "qrCode" === c.toString() ? d = "qrCode" : "barCode" === c.toString() && (d = "barCode"), void (window.dd && window.dd.biz.util.scan({
                        type: d,
                        onSuccess: function (c) {
                            c.resultStr = c.text, a.objCallBack(c, b.success)
                        },
                        onFail: function (c) {
                            a.writeErrorLog(c, "scanQRCode"), a.objCallBack(c, b.fail)
                        }
                    }))
                }
                if (window.inZheZhengDing()) {
                    var e = b.scanType || ["qrCode", "barCode"], f = "all";
                    return "qrCode" === e.toString() ? f = "qrCode" : "barCode" === e.toString() && (f = "barCode"), void (window.dd && window.dd.scan({type: f}).then(function (c) {
                        c.resultStr = c.text, a.objCallBack(c, b.success)
                    })["catch"](function (c) {
                        a.writeErrorLog(c, "scanQRCode"), a.objCallBack(c, b.fail)
                    }))
                }
                return window.inYun() && (qingPublic === !0 ? window.qing && window.qing.call("scanQRCode", {
                    needResult: 1,
                    success: function (c) {
                        if (c.success && "true" === c.success.toString()) {
                            var d = c.data;
                            d.resultStr = d.qrcode_str, a.objCallBack(d, b.success)
                        } else a.writeErrorLog(c, "scanQRCode"), a.objCallBack(c, b.fail)
                    }
                }) : qingPublic === !1 && window.XuntongJSBridge && window.XuntongJSBridge.call("scanQRCode", {
                    needResult: 1,
                    scanType: ["qrCode"]
                }, function (c) {
                    if (c.success && "true" === c.success.toString()) {
                        var d = c.data;
                        a.objCallBack(d, b.success)
                    } else a.writeErrorLog(c, "scanQRCode"), a.objCallBack(c, b.fail)
                })), window.inWeLink() ? void (window.HWH5 && window.HWH5.scanCode({needResult: 1}).then(function (c) {
                    var d = {resultStr: c.content};
                    a.objCallBack(d, b.success)
                })["catch"](function (c) {
                    a.writeErrorLog(c, "scanQRCode"), a.objCallBack(c, b.fail)
                })) : window.inFeiShu() ? void (window.h5sdk && window.h5sdk.ready(function () {
                    window.h5sdk && window.h5sdk.biz.util.scan({
                        type: b.scanType || ["qrCode", "barCode", "datamatrix", "pdf417"],
                        onSuccess: function (c) {
                            var d = {resultStr: c.text};
                            a.objCallBack(d, b.success)
                        }
                    })
                })) : void this.eMobileFunc(b, "scanQRCode")
            }
        }, {
            key: "previewFile", value: function () {
                var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                if (window.inWeWork() && !window.inWeWorkPc()) try {
                    window.wx && window.wx.previewFile(_objectSpread({}, a, {hidePreviewMenuList: ["previewMenuItem:share:appMessage", "previewMenuItem:share:wechat", "previewMenuItem:favorite"]}))
                } catch (b) {
                    console.error("previewFile: ", b), window.wx && window.wx.previewFile(_objectSpread({}, a))
                }
            }
        }, {
            key: "openNativeSetting", value: function (a) {
                this.eMobileFunc(a, "openNativeSetting")
            }
        }, {
            key: "securityStatus", value: function (a) {
                this.eMobileFunc(a, "securityStatus")
            }
        }, {
            key: "closeSecurityCheck", value: function (a) {
                this.eMobileFunc(a, "closeSecurityCheck")
            }
        }, {
            key: "getContacts", value: function (a) {
                this.eMobileFunc(a, "getContacts")
            }
        }, {
            key: "isFreshUser", value: function (a) {
                this.eMobileFunc(a, "isFreshUser")
            }
        }, {
            key: "readNFC", value: function (a) {
                this.eMobileFunc(a, "readNFC")
            }
        }, {
            key: "handleWriting", value: function (a) {
                this.eMobileFunc(a, "handleWriting")
            }
        }, {
            key: "editImage", value: function (a) {
                this.eMobileFunc(a, "editImage")
            }
        }, {
            key: "getConversation", value: function (a) {
                this.eMobileFunc(a, "getConversation")
            }
        }, {
            key: "hideBottomToolBar", value: function (a) {
                this.eMobileFunc(a, "hideBottomToolBar")
            }
        }, {
            key: "hideTopToolBar", value: function (a) {
                this.eMobileFunc(a, "hideTopToolBar")
            }
        }, {
            key: "changeTitle", value: function (a) {
                this.setTitleSelf(a) || this.eMobileFunc(a, "changeTitle")
            }
        }, {
            key: "showOrHideCloseButton", value: function (a) {
                this.eMobileFunc(a, "showOrHideCloseButton")
            }
        }, {
            key: "saveFlowHandwrite", value: function (a) {
                this.eMobileFunc(a, "saveFlowHandwrite")
            }
        }, {
            key: "deleteFlowHandwrite", value: function (a) {
                this.eMobileFunc(a, "deleteFlowHandwrite")
            }
        }, {
            key: "getFlowHandwrite", value: function (a) {
                this.eMobileFunc(a, "getFlowHandwrite")
            }
        }, {
            key: "changeAccount", value: function (a) {
                this.eMobileFunc(a, "changeAccount")
            }
        }, {
            key: "uploadFile2Doc", value: function (a) {
                this.eMobileFunc(a, "uploadFile2Doc")
            }
        }, {
            key: "getModule", value: function (a) {
                this.eMobileFunc(a, "getModule")
            }
        }, {
            key: "openModule", value: function (a) {
                this.eMobileFunc(a, "openModule")
            }
        }, {
            key: "sendLocation", value: function (a) {
                this.eMobileFunc(a, "sendLocation")
            }
        }, {
            key: "sendPersonCard", value: function (a) {
                this.eMobileFunc(a, "sendPersonCard")
            }
        }, {
            key: "tel", value: function (a) {
                this.eMobileFunc(a, "tel")
            }
        }, {
            key: "mailto", value: function (a) {
                this.eMobileFunc(a, "mailto")
            }
        }, {
            key: "textMessage", value: function (a) {
                this.eMobileFunc(a, "textMessage")
            }
        }, {
            key: "getDiscussion", value: function (a) {
                this.eMobileFunc(a, "getDiscussion")
            }
        }, {
            key: "openConversation", value: function (a) {
                return a.type = a.type || 1, a.idType = a.idType || 0, this.inEM7APP() ? void this.eMobileFunc(a, "openConversation") : void (this.funcCheck(a) && this.postMsg("openConversation", a))
            }
        }, {
            key: "getTitle", value: function (a) {
                this.eMobileFunc(a, "getTitle")
            }
        }, {
            key: "getMobileCalendars", value: function (a) {
                this.eMobileFunc(a, "getMobileCalendars")
            }
        }, {
            key: "getSyncSetting", value: function (a) {
                this.eMobileFunc(a, "getSyncSetting")
            }
        }, {
            key: "synctoMobile", value: function (a) {
                this.eMobileFunc(a, "synctoMobile")
            }
        }, {
            key: "synctoServer", value: function (a) {
                this.eMobileFunc(a, "synctoServer")
            }
        }, {
            key: "configBounce", value: function (a) {
                this.eMobileFunc(a, "configBounce")
            }
        }, {
            key: "getNavColor", value: function (a) {
                this.eMobileFunc(a, "getNavColor")
            }
        }, {
            key: "changeNavColor", value: function (a) {
                this.eMobileFunc(a, "changeNavColor")
            }
        }, {
            key: "importContacts", value: function (a) {
                this.eMobileFunc(a, "importContacts")
            }
        }, {
            key: "openUserProfile", value: function (a) {
                this.eMobileFunc(a, "openUserProfile")
            }
        }, {
            key: "securitySupport", value: function (a) {
                this.eMobileFunc(a, "securitySupport")
            }
        }, {
            key: "securityEvaluation", value: function (a) {
                this.eMobileFunc(a, "securityEvaluation")
            }
        }, {
            key: "CAMethod", value: function (a) {
                this.eMobileFunc(a, "CAMethod")
            }
        }, {
            key: "fileSign", value: function (a) {
                this.eMobileFunc(a, "fileSign")
            }
        }, {
            key: "showWaterMark", value: function (a) {
                this.eMobileFunc(a, "showWaterMark")
            }
        }, {
            key: "hideWaterMark", value: function (a) {
                this.eMobileFunc(a, "hideWaterMark")
            }
        }, {
            key: "personCardSupport", value: function (a) {
                this.eMobileFunc(a, "personCardSupport")
            }
        }, {
            key: "personCardFunction", value: function (a) {
                this.eMobileFunc(a, "personCardFunction")
            }
        }, {
            key: "changeOrientation", value: function (a) {
                this.eMobileFunc(a, "changeOrientation")
            }
        }, {
            key: "showLoading", value: function (a) {
                this.eMobileFunc(a, "showLoading")
            }
        }, {
            key: "setPasteBoardText", value: function (a) {
                this.eMobileFunc(a, "setPasteBoardText")
            }
        }, {
            key: "getPasteBoardText", value: function (a) {
                this.eMobileFunc(a, "getPasteBoardText")
            }
        }, {
            key: "resetNavigation", value: function (a) {
                this.setTitleSelf(a) || this.eMobileFunc(a, "resetNavigation")
            }
        }, {
            key: "getLocationList", value: function (a) {
                this.eMobileFunc(a, "getLocationList")
            }
        }, {
            key: "playAudioRecord", value: function (a) {
                this.eMobileFunc(a, "playAudioRecord")
            }
        }, {
            key: "getAudioRecord", value: function (a) {
                this.eMobileFunc(a, "getAudioRecord")
            }
        }, {
            key: "userInteractionEnabled", value: function (a) {
                this.eMobileFunc(a, "userInteractionEnabled")
            }
        }, {
            key: "userInteractionDisabled", value: function (a) {
                this.eMobileFunc(a, "userInteractionDisabled")
            }
        }, {
            key: "playVoice", value: function (a) {
                this.eMobileFunc(a, "playVoice")
            }
        }, {
            key: "textUnderStand", value: function (a) {
                this.eMobileFunc(a, "textUnderStand")
            }
        }, {
            key: "stopVoice", value: function (a) {
                this.eMobileFunc(a, "stopVoice")
            }
        }, {
            key: "startRecord", value: function (a) {
                var b = this;
                (window.inWx() || window.inWeWork()) && window.wx && window.wx.startRecord({
                    success: function (c) {
                        b.objCallBack(c, a.success)
                    }, fail: function (c) {
                        b.writeErrorLog(c, "startRecord"), b.objCallBack(c, a.fail)
                    }
                })
            }
        }, {
            key: "stopRecord", value: function (a) {
                var b = this;
                (window.inWx() || window.inWeWork()) && window.wx && window.wx.stopRecord({
                    success: function (c) {
                        var d = c.localId;
                        window.wx && window.wx.uploadVoice({
                            localId: d, isShowProgressTips: 1, success: function (c) {
                                var d = c.serverId;
                                try {
                                    var e = a.resultType || 0,
                                        f = "mediaId=".concat(d || "", "&resultType=").concat(e, "&CURRENT_CP_AGENT_ID=").concat(window.CURRENT_CP_AGENT_ID || "", "&changeFileType=mp3");
                                    b.jemAjax("wxapi/saveMedia", function (c, d) {
                                        if (200 == d && 0 == c.errcode) {
                                            var f = {};
                                            1 === e ? f.localData = c.fileid || "" : f.localData = c.base64file || "", b.objCallBack(f, a.success)
                                        } else {
                                            var g = {error: c, status: d, errMsg: "saveMedia 璋冪敤寮傚父"};
                                            b.writeErrorLog(g, "uploadVoice ajax"), b.objCallBack(g, a.fail)
                                        }
                                    }, f)
                                } catch (g) {
                                    alert(JSON.stringify(g)), b.writeErrorLog(g, "uploadVoice"), b.objCallBack(g, a.fail)
                                }
                            }
                        })
                    }
                })
            }
        }, {
            key: "navigationLBS", value: function (a) {
                this.eMobileFunc(a, "navigationLBS")
            }
        }, {
            key: "getFileFormatCanSign", value: function (a) {
                this.eMobileFunc(a, "getFileFormatCanSign")
            }
        }, {
            key: "selectIndex", value: function (a) {
                this.eMobileFunc(a, "selectIndex")
            }
        }, {
            key: "getUserInfo", value: function (a) {
                this.inEM7APP() ? this.eMobileFunc(a, "getUserInfo") : this.inEMobilePc() && this.postMsg("getUserInfo", a)
            }
        }, {
            key: "share", value: function (a) {
                this.eMobileFunc(a, "share")
            }
        }, {
            key: "otherShare", value: function (a) {
                var b = this;
                a.type || (a.type = "all"), "forward" !== a.type && "all" !== a.type || window.wx && window.wx.onMenuShareAppMessage({
                    title: a.title,
                    desc: a.desc,
                    link: a.link,
                    imgUrl: a.imgUrl,
                    success: function () {
                        b.objCallBack("share success", a.success)
                    },
                    cancel: function () {
                        b.objCallBack("share cancel", a.cancel)
                    },
                    fail: function (c) {
                        b.writeErrorLog(c, "onMenuShareAppMessage"), b.objCallBack(c, a.fail)
                    }
                }), "forwardnow" === a.type && window.wx && window.wx.invoke("shareAppMessage", {
                    title: a.title,
                    desc: a.desc,
                    link: a.link,
                    imgUrl: a.imgUrl
                }, function (c) {
                    "shareAppMessage:ok" == c.err_msg ? b.objCallBack("share success", a.success) : "shareAppMessage:cancel" == c.err_msg ? b.objCallBack("share cancel", a.cancel) : (b.writeErrorLog(c, "shareAppMessage"), b.objCallBack(c, a.fail))
                }), "wx" !== a.type && "all" !== a.type || window.wx && window.wx.onMenuShareWechat({
                    title: a.title,
                    desc: a.desc,
                    link: a.link,
                    imgUrl: a.imgUrl,
                    success: function () {
                        b.objCallBack("share success", a.success)
                    },
                    cancel: function () {
                        b.objCallBack("share cancel", a.cancel)
                    },
                    fail: function (c) {
                        b.writeErrorLog(c, "onMenuShareWechat"), b.objCallBack(c, a.fail)
                    }
                }), "wxnow" === a.type && window.wx && window.wx.invoke("shareWechatMessage", {
                    title: a.title,
                    desc: a.desc,
                    link: a.link,
                    imgUrl: a.imgUrl
                }, function (c) {
                    "shareWechatMessage:ok" == c.err_msg ? b.objCallBack("share success", a.success) : "shareWechatMessage:cancel" == c.err_msg ? b.objCallBack("share cancel", a.cancel) : (b.writeErrorLog(c, "shareWechatMessage"), b.objCallBack(c, a.fail))
                }), "wxcircle" !== a.type && "all" !== a.type || window.wx && window.wx.onMenuShareTimeline({
                    title: a.title,
                    link: a.link,
                    imgUrl: a.imgUrl,
                    success: function () {
                        b.objCallBack("share success", a.success)
                    },
                    cancel: function () {
                        b.objCallBack("share cancel", a.cancel)
                    },
                    fail: function (c) {
                        b.writeErrorLog(c, "onMenuShareTimeline"), b.objCallBack(c, a.fail)
                    }
                })
            }
        }, {
            key: "dingShare", value: function (a) {
                window.inDing() && window.dd && window.dd.biz.util.share({
                    type: a.type || 0,
                    url: a.url,
                    title: a.title,
                    content: a.content,
                    image: a.image,
                    onSuccess: function () {
                        this.objCallBack("dingShare success", a.success)
                    },
                    onFail: function (b) {
                        this.writeErrorLog(b, "dingShare"), this.objCallBack(b, a.fail)
                    }
                })
            }
        }, {
            key: "showMenuItems", value: function (a) {
                var b = this;
                "all" === a.type ? window.wx && window.wx.showAllNonBaseMenuItem() : window.wx && window.wx.showMenuItems({
                    menuList: a.menuList,
                    success: function () {
                        b.objCallBack("showMenuItems success", a.success)
                    },
                    fail: function (c) {
                        b.writeErrorLog(c, "showMenuItems"), b.objCallBack(c, a.fail)
                    }
                })
            }
        }, {
            key: "hideMenuItems", value: function (a) {
                var b = this;
                "all" === a.type ? window.wx && window.wx.hideAllNonBaseMenuItem() : window.wx && window.wx.hideMenuItems({
                    menuList: a.menuList,
                    success: function () {
                        b.objCallBack("hideMenuItems success", a.success)
                    },
                    fail: function (c) {
                        b.writeErrorLog(c, "hideMenuItems"), b.objCallBack(c, a.fail)
                    }
                })
            }
        }, {
            key: "listenReturn", value: function (a) {
                var b = this;
                window.inYun() && qing.call("defback", {
                    success: function () {
                        b.objCallBack("return success", a.success)
                    }, fail: function () {
                        b.objCallBack("return fail", a.fail)
                    }
                })
            }
        }, {
            key: "launchMiniprogram", value: function (a) {
                var b = this;
                console.error("launchMiniprogram"), window.inWeWork() && this.agentReady(function () {
                    wx.invoke("launchMiniprogram", {appid: a.appid, path: a.path}, function (c) {
                        "launchMiniprogram:ok" == c.err_msg ? b.objCallBack(c, a.success) : b.objCallBack(c, a.fail)
                    })
                })
            }
        }, {
            key: "qysPrint", value: function (a) {
                this.eMobileFunc(a, "qysPrint")
            }
        }, {
            key: "getAccount", value: function (a) {
                this.eMobileFunc(a, "getAccount")
            }
        }, {
            key: "switchAccount", value: function () {
                var a = this, b = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                if (this.inEM7APP()) this.eMobileFunc(b, "switchAccount"); else if (this.inEMobilePc()) this.postMsg("switchAccount", b); else try {
                    var c = {sysid: b.sysId, account_id: b.accountId, em_client_type: 4}, d = JSON.stringify(c),
                        e = window.localStorage.getItem("emaccesstk"), f = "emp/api/integrate/client/account/switch";
                    e && (f = "".concat(f, "?emaccesstk=").concat(e)), this.jemAjax(f, function (c, d) {
                        if (200 == d && 0 == c.errcode) try {
                            var e = document.createElement("script");
                            e.src = "".concat(WX_JS_URL, ".js"), e.onload = function () {
                                var a = document.createElement("script");
                                a.src = "".concat(domainUrl, "wxapi/jsconfig?v=").concat(time, "&localurl=").concat(finalLocalUrl), a.onload = function () {
                                    console.log("configJsScript.onload"), window.wx.invoke("multiWindows_publish", {
                                        channelId: "accountSaved",
                                        message: "message info",
                                        data: {},
                                        "function": function (a) {
                                            console.log("multiWindows_publish", a)
                                        }
                                    })
                                }, document.head.appendChild(a)
                            }, document.head.appendChild(e), a.objCallBack(c, b.success)
                        } catch (f) {
                            a.objCallBack(c, b.success)
                        } else {
                            var g = {error: c, status: d, errMsg: "switch 璋冪敤寮傚父"};
                            a.writeErrorLog(g, "switchAccount ajax"), a.objCallBack(g, b.fail)
                        }
                    }, d, "application/json")
                } catch (g) {
                    this.writeErrorLog(g, "switchAccount"), this.objCallBack(g, b.fail)
                }
            }
        }, {
            key: "refreshUserInfo", value: function (a) {
                this.eMobileFunc(a, "refreshUserInfo")
            }
        }, {
            key: "openNativeChangeTheme", value: function (a) {
                this.eMobileFunc(a, "openNativeChangeTheme")
            }
        }, {
            key: "openMyWallet", value: function (a) {
                this.eMobileFunc(a, "openMyWallet")
            }
        }, {
            key: "openqrCard", value: function (a) {
                this.eMobileFunc(a, "openqrCard")
            }
        }, {
            key: "changeLocale", value: function (a) {
                var b = this;
                this.ready(function () {
                    b.postMsg("changeLocale", a)
                })
            }
        }, {
            key: "setItem", value: function () {
                var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                if (this.inEM7APP()) return void this.eMobileFunc(a, "setItem");
                var b = window.navigator.userAgent || "";
                if (this.inEMobilePc() && b.indexOf("Electron") > -1) {
                    if (!this.funcCheck(a)) return;
                    this.postMsg("setItem", a)
                } else try {
                    window.localStorage.setItem(a.key, a.value), this.objCallBack("setItem success", a.success)
                } catch (c) {
                    this.objCallBack(c, a.fail)
                }
            }
        }, {
            key: "getItem", value: function () {
                var a = this, b = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                if (this.inEM7APP()) return void this.eMobileFunc(b, "getItem");
                var c = function () {
                    try {
                        var c = window.localStorage.getItem(b.key), d = {value: c};
                        c ? a.objCallBack(d, b.success) : a.objCallBack(d, b.fail)
                    } catch (e) {
                        a.objCallBack(e, b.fail)
                    }
                }, d = window.navigator.userAgent || "";
                if (this.inEMobilePc() && d.indexOf("Electron") > -1) {
                    if (!this.funcCheck(b)) return;
                    this.ready(function () {
                        a.postMsg("getItem", b)
                    })
                } else c()
            }
        }, {
            key: "removeItem", value: function () {
                var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                if (this.inEM7APP()) return void this.eMobileFunc(a, "removeItem");
                var b = window.navigator.userAgent || "";
                if (this.inEMobilePc() && b.indexOf("Electron") > -1) {
                    if (!this.funcCheck(a)) return;
                    this.postMsg("removeItem", a)
                } else try {
                    window.localStorage.removeItem(a.key), this.objCallBack("removeItem success", a.success)
                } catch (c) {
                    this.objCallBack(c, a.fail)
                }
            }
        }, {
            key: "downloadFile", value: function (a) {
                this.eMobileFunc(a, "downloadFile")
            }
        }, {
            key: "showPopup", value: function (a) {
                var b = this;
                this.eMobileFunc(a, "showPopup", function (a) {
                    var c = a.items || [];
                    c.map(function (a) {
                        b.eMobileRegisterHandler("", a, 5)
                    })
                })
            }
        }, {
            key: "showBottomToolBar", value: function (a) {
                var b = this;
                this.eMobileFunc(a, "showBottomToolBar", function (a) {
                    var c = a.items || [];
                    c.map(function (a) {
                        b.eMobileRegisterHandler("", a, 3)
                    })
                })
            }
        }, {
            key: "setupBottomMenu", value: function (a) {
                var b = this;
                this.eMobileFunc(a, "setupBottomMenu", function (a) {
                    var c = a.items || [];
                    c.map(function (a) {
                        b.eMobileRegisterHandler("", a, 5)
                    })
                })
            }
        }, {
            key: "showTopToolBar", value: function (a) {
                var b = this;
                this.eMobileFunc(a, "showTopToolBar", function (a) {
                    var c = a.left, d = a.right, e = a.items || [];
                    b.eMobileRegisterHandler("", c, 3), b.eMobileRegisterHandler("", d, 3), e.map(function (a) {
                        b.eMobileRegisterHandler("", a, 3)
                    })
                })
            }
        }, {
            key: "speechTotext", value: function (a) {
                var b = this;
                this.eMobileFunc(a, "continueSpeech", function (a) {
                    b.eMobileRegisterHandler("speechTotext", a, 1)
                })
            }
        }, {
            key: "continueSpeech", value: function (a) {
                var b = this;
                this.eMobileFunc(a, "continueSpeech", function (a) {
                    var c = ["changeVoice", "continueSpeechend", "onContinueSpeech"];
                    c.map(function (c) {
                        b.eMobileRegisterHandler(c, a, 1, "changeVoice" !== c)
                    })
                })
            }
        }, {
            key: "registerBroadcast", value: function (a) {
                var b = this;
                this.eMobileFunc(a, "registerBroadcast", function (a) {
                    b.eMobileRegisterHandler("", a, 4)
                })
            }
        }, {
            key: "postBroadcast", value: function (a) {
                this.eMobileFunc(a, "postBroadcast")
            }
        }, {
            key: "configNavigation", value: function (a) {
                var b = this;
                this.setTitleSelf(a) || this.eMobileFunc(a, "configNavigation", function (a) {
                    var c = a.left, d = a.right;
                    b.eMobileRegisterHandler("", c, 3), b.eMobileRegisterHandler("", d, 3)
                })
            }
        }, {
            key: "reloadStorage", value: function (a) {
                this.inEM7APP() && this.eMobileRegisterHandler("reloadStorage", a, 2)
            }
        }, {
            key: "reloadStorageWithParams", value: function (a) {
                this.inEM7APP() && this.eMobileRegisterHandler("reloadStorageWithParams", a, 2)
            }
        }, {
            key: "getAvatarWidthAndHeightPercent", value: function (a) {
                this.eMobileFunc(a, "getAvatarWidthAndHeightPercent")
            }
        }, {
            key: "eMobileRegisterHandler", value: function (a, b, c) {
                var d = this, e = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
                if (1 === c) {
                    var f = b[a];
                    "function" == typeof f && this.WebViewJavascriptBridge.registerHandler(a, function (a) {
                        e && a && "string" == typeof a && (a = JSON.parse(a)), f(a)
                    })
                } else if (2 === c) b && "[object Function]" === Object.prototype.toString.apply(b) && this.WebViewJavascriptBridge.registerHandler(a, function (a) {
                    b(a)
                }); else if (3 === c) {
                    if (b) {
                        var g = b.action, h = b.name, i = b.subItems;
                        if (g) this.WebViewJavascriptBridge.registerHandler(h, function (a, b) {
                            var c = g(a);
                            b(c)
                        }); else if ("[object Array]" === Object.prototype.toString.apply(i)) for (var j = function (a) {
                            var b = i[a], c = b.action, e = b.name;
                            c && d.WebViewJavascriptBridge.registerHandler(e, function (a, b) {
                                var d = c(a);
                                b(d)
                            })
                        }, k = 0; k < i.length; k++) j(k)
                    }
                } else if (4 === c) {
                    var l = b.name, m = b.action;
                    l && "[object Function]" === Object.prototype.toString.apply(m) && this.WebViewJavascriptBridge.registerHandler(l, function (a) {
                        m(a)
                    })
                } else if (5 === c) {
                    var n = b.action, o = b.name;
                    this.WebViewJavascriptBridge.registerHandler(o, function (a, b) {
                        var c = n(a);
                        b(c)
                    })
                } else if (6 === c) {
                    var p = this.callback[a] || [];
                    this.WebViewJavascriptBridge.registerHandler(a, function (a) {
                        p.forEach(function (b) {
                            if (b && "[object Function]" === Object.prototype.toString.apply(b)) {
                                var c = a;
                                c && "[object String]" === Object.prototype.toString.apply(c) && (c = JSON.parse(c)), b(c)
                            }
                        })
                    })
                }
            }
        }, {
            key: "registerHandler", value: function (a, b) {
                var c = this;
                if (this.inEM7APP()) {
                    var d = function () {
                        c.WebViewJavascriptBridge.registerHandler(a, function (a) {
                            a && "string" == typeof a && (a = JSON.parse(a)), b && "[object Function]" === Object.prototype.toString.apply(b) && b(a)
                        })
                    };
                    this.WebViewJavascriptBridge ? d() : (window.WebViewJavascriptBridge || window.top.WebViewJavascriptBridge ? this.WebViewJavascriptBridge = window.WebViewJavascriptBridge || window.top.WebViewJavascriptBridge : this.checkBridge(), d())
                }
            }
        }, {
            key: "eMobileFunc", value: function (a, b, c) {
                if (this.inEM7APP()) {
                    (window.WebViewJavascriptBridge || window.top.WebViewJavascriptBridge) && this.WebViewJavascriptBridge || this.checkBridge();
                    var d = function (b) {
                        "string" == typeof b && (b = JSON.parse(b));
                        var c = b.errCode;
                        if (a = a || {}, 0 === c) {
                            var d = a.success;
                            "function" == typeof d && d(b)
                        } else if (c === -1) {
                            var e = a.cancel;
                            "function" == typeof e && e(b)
                        } else if (0 != c) {
                            var f = a.fail;
                            "function" == typeof f && f(b)
                        }
                        var g = a.complete;
                        "function" == typeof g && g(b)
                    };
                    c && "[object Function]" === Object.prototype.toString.apply(c) && c(a), this.WebViewJavascriptBridge.callHandler(b, a, d)
                }
            }
        }, {
            key: "setTitleSelf", value: function () {
                var a = this, b = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return window.inDing() ? !!window.inDingPc() || (!b.title || (window.dd && window.dd.biz.navigation.setTitle({
                    title: b.title,
                    onFail: function (c) {
                        a.writeErrorLog(c, "setTitle"), a.objCallBack(c, b.fail)
                    }
                }), !0)) : window.inZheZhengDing() ? (window.dd && window.dd.setTitle({title: b.title}).then(function (c) {
                    a.objCallBack(c, b.success)
                })["catch"](function (c) {
                    a.writeErrorLog(c, "setTitle"), a.objCallBack(c, b.fail)
                }), !0) : window.inWx() ? (window.inWeWork() ? b.title && (document.title = b.title) : b.title && (document.title = b.title), !0) : window.inYun() ? (qingPublic === !0 ? window.qing && window.qing.call("setWebViewTitle", {title: b.title}) : qingPublic === !1 && window.XuntongJSBridge && window.XuntongJSBridge.call("setWebViewTitle", {title: b.title}), !0) : window.inWeLink() ? (document.title = b.title, !0) : !!window.inFeiShu() && (window.h5sdk ? window.h5sdk.ready(function () {
                    window.h5sdk.biz.navigation.setTitle({title: b.title})
                }) : document.title = b.title, !0)
            }
        }, {
            key: "objCallBack", value: function (a, b) {
                b && "[object Function]" === Object.prototype.toString.apply(b) && b(a)
            }
        }, {
            key: "jemAjax", value: function (a, b, c) {
                var d = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "application/x-www-form-urlencoded",
                    e = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "json",
                    f = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : "POST", g = new XMLHttpRequest;
                g.open(f, "".concat(domainUrl).concat(a), !0), g.withCredentials = !0, g.setRequestHeader("Content-Type", d), c ? g.send(c) : g.send(), g.onreadystatechange = function () {
                    var a = null;
                    "json" === e ? a = g.responseText ? JSON.parse(g.responseText) : {} : "text" === e && (a = g.responseText || ""), b && "[object Function]" === Object.prototype.toString.apply(b) && (4 == g.readyState ? b(a, g.status) : console.log("xmlHttp.readyState: ".concat(g.readyState)))
                }
            }
        }, {
            key: "writeErrorLog", value: function (a, b) {
                var c = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
                console.log("funcError: ".concat(b)), console.log(a);
                var d = "";
                d = "[object Error]" === Object.prototype.toString.apply(a) ? a.toString() : JSON.stringify(a);
                var e = window.location.href || "", f = {level: c, logger: "".concat(b, ": ").concat(d, " ").concat(e)},
                    g = window.localStorage.getItem("emaccesstk"), h = "emp/api/log/record";
                g && (h = "".concat(h, "?emaccesstk=").concat(g)), this.jemAjax(h, function (a, b) {
                    200 == b && 0 == a.errcode || (console.log("writeErrorLog"), console.log(a))
                }, JSON.stringify(f), "application/json")
            }
        }]), a
    }();
    window.em = new weaver, window.jEmobile = window.em
}
