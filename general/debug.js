// This one contains my debug tools
// No strict here, makes assert slightly more robust

define(function () {

    var debug = true; // TODO: Make this configurable to off
    var haveLog = (console && console.log);

    return {
        log: hUdebugLog,
        assert: hUdebugAssert
    };

    function hUdebugLog() {

        if (!debug || !haveLog) return;

        console.log.apply(console, arguments);
    }

    function hUdebugAssert(condition, caller) {

        if (!debug) return;

        if (!condition) {
            if (!caller) {
                caller = hUdebugAssert.caller ? hUdebugAssert.caller : arguments.caller;
            }
            var callerLabel = (caller && caller.name) ? caller.name : 'Unable_to_find_caller_data';
            var e = {
                name: 'ASSERT_FAILED',
                message: 'Call failed in "' + callerLabel + '"',
                data: caller
            };

            hUdebugLog("Throwing:\n", e);
            throw(e);
        }
    }
});