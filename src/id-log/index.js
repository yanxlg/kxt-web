var IDLog = function () {
    function IDLog() {}
    IDLog.getFunctionName = function (constractor) {
        if (constractor.name) return constractor.name;
        var funStr = constractor.toString();
        var splitIndex = funStr.indexOf("(");
        return funStr.substring(0, splitIndex).replace("function", "").trim();
    };
    IDLog.generatePageID = function (page) {
        if (typeof page === "string") {
            return this.prefix + "." + page;
        } else {
            return this.prefix + "." + this.getFunctionName(page.constructor).toLowerCase();
        }
    };
    ;
    IDLog.generatePartID = function (part, pageID) {
        return pageID + "." + this.getFunctionName(part.constructor).toLowerCase();
    };
    IDLog.generatePublicPartID = function (part) {
        return this.prefix + ".all." + this.getFunctionName(part.constructor).toLowerCase();
    };
    IDLog.generateComponentID = function (componentID, parentID) {
        var length = parentID.split(".").length;
        if (length === 5) {
            return parentID + "." + componentID.toLowerCase();
        } else if (length === 6) {
            return parentID + "-" + componentID.toLowerCase();
        } else {
            throw new Error("id与规则不匹配");
        }
    };
    IDLog.generateWidgetID = function (widgetID, parentID) {
        var length = parentID.split(".").length;
        if (length === 5) {
            return parentID + ".components." + widgetID.toLowerCase();
        } else if (length === 6) {
            return parentID + "." + widgetID.toLowerCase();
        } else {
            throw new Error("id与规则不匹配");
        }
    };
    IDLog.prefix = "codyy.cloudschool.backend";
    return IDLog;
}();
export { IDLog };