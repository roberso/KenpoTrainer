/* JavaScript content from js/printHandling.js in folder common */
/**
 * 
 */

var PrintHandler = function () {};

PrintHandler.prototype.print = function (name,html) {
    name = Messages.title + ' ' + Messages.version + ': ' + name;
    cordova.plugins.printer.check(function (avail, count) {
        if (avail) {
            cordova.plugins.printer.pick(function (uri) {
                if(uri) {
                    cordova.plugins.printer.print(html, { name: name }, function (res) {
                        console.log(res);
                    });
                }
            });
        } else {
            navigator.notification.alert(
                'No printer driver found',
                null,
                Messages.title,
                Messages.ok
            );
        }
        alert(avail ? 'Found ' + count + ' services' : 'No');
    });
};