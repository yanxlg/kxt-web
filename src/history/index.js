var History = function () {
    function History() {}
    History.setHistory = function (history) {
        this.history = history;
    };
    History.push = function (path, state) {
        this.history.push(path, state);
    };
    History.replace = function (path, state) {
        this.history.replace(path, state);
    };
    History.go = function (n) {
        this.history.go(n);
    };
    History.goForward = function () {
        this.history.goForward();
    };
    History.goBack = function () {
        this.history.goBack();
    };
    return History;
}();
export { History };