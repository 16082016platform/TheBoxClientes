var helpers = require('../../../utils/widgets/helper'),

    dialogs = require('ui/dialogs'),

    dataService = require('../../../dataProviders/backendServices');

function navigatedTo(args) {
    var page = args.object;

    page.navigationContext.pageTitle =
        'Detail';

    // context changes

    page.bindingContext = page.navigationContext;
}

exports.navigatedTo = navigatedTo;