// Simple polyfill for a promise-class
// This class should probably not be used outside small and well defined projects. Use the ES6 implementation!. :-)
"use strict";

define(['../general/debug'], function (debug) {

    // TODO: If the Promise class is available, we'll return that one

    return hUPromise;

    function hUPromise(promiseCb) {

        var storedThenCb = null;
        var storedCatchCb = null;

        var promise = {
            then: function thenIIFE(thenCb) {
                debug.log('hUPromise.then assigned');
                storedThenCb = thenCb;
                return this;
            },
            catch: function catchIIFE(catchCb) {
                debug.log('hUPromise.catch assigned');
                storedCatchCb = catchCb;
                return this;
            }
        };

        // Make sure user can call then/catch before resolve/reject are called in case use is not so asynchronous
        setTimeout(function () {
            debug.log('hUPromise callback called');
            promiseCb(resolveFunc, rejectFunc);
        }, 1);

        return promise;

        function resolveFunc() {
            debug.log('hUPromise resolve called');
            if (storedThenCb) {
                storedThenCb.apply(promise, arguments);
            }
        }

        function rejectFunc() {
            debug.log('hUPromise reject called');
            if (storedCatchCb) {
                storedCatchCb.apply(promise, arguments);
            }
        }
    }
});