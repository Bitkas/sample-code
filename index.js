let __meetings_by_project = _.groupBy(__MEETINGS, function (meeting) {
                if (meeting.fk_project === undefined) {
                    return;
                }
                if (Array.isArray(meeting.fk_project.path) === false) {
                    return;
                }
                return meeting.fk_project.path[1];
            });
            async.each(Object.keys(__meetings_by_project), __calculate_pre_installation_meetings_statistics);


const __calculate_pre_installation_meetings_statistics = function () {
    const __KEY = _.first(arguments);
    const __CALLBACK = _.last(arguments);
    const __CALLBACK_CHAINED = _.chain(arguments).last();
    if (typeof __KEY === 'undefined') {
        return __CALLBACK_CHAINED.defer(null)
    }
    const __MEETINGS = __meetings_by_project[__KEY];
    async.waterfall([
        _.partial(__pa_update_pre_installation_meetings(database_api).process_data, __MEETINGS)
    ], __CALLBACK)
}
        