// Basic functions to retrieve elements from the DOM using vanilla js

"use strict";

define(['../../general/debug'], function (debug) {

    var splitRegex = /[^a-z,A-Z,0-9,_-]+/;

    return {
        get: hzGetElements,

        addClasses: hzAddClasses,
        remClasses: hzRemoveClasses,
        toggle: hzToggleClass,

        addEvent: hzAddEvent,
        remEvent: hzRemoveEvent,

        setAttr: hzSetAttribute,
        remAttr: hzRemoveAttribute,
        getAttr: hzGetAttribute
    };

    function hzGetElements(selectors) {
        debug.log('hzGetElements called on ("' + selectors + '")');
        var qsa = document.querySelectorAll(selectors);
        debug.log("qsa returned:\n", qsa);
        return _hzNodeListToAr(qsa);
    }

    function hzAddClasses(element, classes) {

        if (Array.isArray(element)) {
            debug.log('Note: hzAddClasses got an array as argument and will recurse through it');
            return element.forEach(function(e) {
                hzAddClasses(e, classes);
            });
        }

        debug.assert(element != null && classes != null, hzAddClasses);
        debug.log('hzAddClasses', element, classes, element.className);

        var allClasses = classes + ' ' + (element.className ? element.className : '');
        var classAr = allClasses.split(splitRegex);
        console.log('classAr', classAr);

        // Reduce dupes
        var resultClassAr = classAr.reduce(function (acc, val) {
            debug.log('reduce', acc, val);
            if (acc.indexOf(val) === -1) acc.push(val);
            return acc;
        }, []);

        element.className = resultClassAr.join(' ');
    }

    function hzRemoveClasses(element, classes) {

        if (Array.isArray(element)) {
            debug.log('Note: hzRemoveClasses got an array as argument and will recurse through it');
            return element.forEach(function(e) {
                hzRemoveClasses(e, classes);
            });
        }

        debug.assert(element != null && classes != null, hzRemoveClasses);
        debug.log('hzRemoveClasses', element, classes, element.className);

        var removeClassAr = classes.split(splitRegex);
        var elementClassAr = element.className.split(splitRegex);

        // Reduce away classes to remove
        var resultClassAr = elementClassAr.reduce(function (acc, val) {
            if (removeClassAr.indexOf(val) === -1) acc.push(val);
            return acc;
        }, []);

        element.className = resultClassAr.join(' ');
    }

    function hzToggleClass(element, className) {

        if (Array.isArray(element)) {
            debug.log('Note: hzToggleClass got an array as argument and will recurse through it');
            return element.forEach(function(e) {
                hzToggleClass(e, className);
            });
        }

        debug.assert(element != null && className != null, hzToggleClass);
        debug.log('hzToggleClass', element, className, element.className);

        var elementClassAr = element.className ? element.className.split(splitRegex) : [];

        if (elementClassAr.indexOf(className.trim()) !== -1) {
            hzRemoveClasses(element, className);
            debug.log('Removed "' + className + '" from element', element);
            return;
        }

        hzAddClasses(element, className);
        debug.log('Added "' + className + '" to element', element);
    }

    function hzAddEvent(element, type, func) {

        if (Array.isArray(element)) {
            debug.log('Note: hzAddEvent got an array as argument and will recurse through it');
            return element.forEach(function(e) {
                hzAddEvent(e, type, func);
            });
        }

        debug.assert(element != null && type != null && func != null, hzAddEvent);
        debug.log('hzAddEvent', element, type, func);

        element.addEventListener(type, func);
    }

    function hzRemoveEvent(element, type, func) {

        if (Array.isArray(element)) {
            debug.log('Note: hzRemoveEvent got an array as argument and will recurse through it');
            return element.forEach(function(e) {
                hzRemoveEvent(e, type, func);
            });
        }

        debug.assert(element != null && type != null && func != null, hzRemoveEvent);
        debug.log('hzRemoveEvent', element, type, func);

        element.removeEventListener(type, func);
    }

    function hzSetAttribute(element, name, value) {

        if (Array.isArray(element)) {
            debug.log('Note: hzSetAttribute got an array as argument and will recurse through it');
            return element.forEach(function(e) {
                hzSetAttribute(e, name, value);
            });
        }

        debug.assert(element != null && name != null && value != null, hzSetAttribute);
        debug.log('hzSetAttribute', element, name, value);

        element.setAttribute(name, value);
    }

    function hzRemoveAttribute(element, name) {

        if (Array.isArray(element)) {
            debug.log('Note: hzRemoveAttribute got an array as argument and will recurse through it');
            return element.forEach(function(e) {
                hzRemoveAttribute(e, name);
            });
        }

        debug.assert(element != null && name != null, hzRemoveAttribute);
        debug.log('hzRemoveAttribute', element, name);

        element.removeAttribute(name);
    }

    function hzGetAttribute(element, name) {

        if (Array.isArray(element)) {
            debug.log('Note: hzGetAttribute got an array as argument and will recurse through it');
            return element.map(function(e) {
                return hzGetAttribute(e, name);
            });
        }

        debug.assert(element != null && name != null, hzGetAttribute);
        debug.log('hzGetAttribute', element, name);

        return element.getAttribute(name);
    }


    // Fast nodeList to Array conv, borrowed from
    // http://stackoverflow.com/questions/3199588/fastest-way-to-convert-javascript-nodelist-to-array
    function _hzNodeListToAr(nl) {
        var ar = [];
        for (var i = nl.length; i--; ar.unshift(nl[i]));
        return ar;
    }
});