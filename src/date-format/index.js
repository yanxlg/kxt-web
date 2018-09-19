var DateFormat = function () {
    function DateFormat() {}
    DateFormat.parseDateString = function (date) {
        if (typeof date === "string") {
            return date.replace(/-/g, "/").replace(/\./g, "/");
        } else if (typeof date === "number") {
            return date;
        } else {
            return null;
        }
    };
    DateFormat.getDate = function (date) {
        if (date === void 0) {
            date = "";
        }
        var dateString = this.parseDateString(date);
        if (!dateString) {
            return "";
        }
        var day = new Date(dateString);
        var month = day.getMonth() + 1;
        var dayNum = day.getDate();
        return date ? day.getFullYear() + "." + (month > 9 ? month : "0" + month) + "." + (dayNum > 9 ? dayNum : "0" + dayNum) : "";
    };
    DateFormat.getDay = function (date) {
        if (date === void 0) {
            date = "";
        }
        var dateString = this.parseDateString(date);
        if (!dateString) {
            return "";
        }
        var day = new Date(dateString);
        var month = day.getMonth() + 1;
        var dayNum = day.getDate();
        return date ? (month > 9 ? month : "0" + month) + "." + (dayNum > 9 ? dayNum : "0" + dayNum) : "";
    };
    DateFormat.getTime = function (date) {
        if (date === void 0) {
            date = "";
        }
        var dateString = this.parseDateString(date);
        if (!dateString) {
            return "";
        }
        var day = new Date(dateString);
        var hour = day.getHours();
        var minute = day.getMinutes();
        return date ? (hour > 9 ? hour : "0" + hour) + ":" + (minute > 9 ? minute : "0" + minute) : "";
    };
    DateFormat.getSecondTime = function (date) {
        if (date === void 0) {
            date = "";
        }
        var dateString = this.parseDateString(date);
        if (!dateString) {
            return "";
        }
        var day = new Date(dateString);
        var hour = day.getHours();
        var minute = day.getMinutes();
        var second = day.getSeconds();
        return date ? (hour > 9 ? hour : "0" + hour) + ":" + (minute > 9 ? minute : "0" + minute) + ":" + (second > 9 ? second : "0" + second) : "";
    };
    DateFormat.getFullTime = function (date) {
        if (date === void 0) {
            date = "";
        }
        return date ? this.getDate(date) + " " + this.getTime(date) : "";
    };
    DateFormat.getAllTime = function (date) {
        if (date === void 0) {
            date = "";
        }
        return date ? this.getDate(date) + " " + this.getSecondTime(date) : "";
    };
    return DateFormat;
}();

export { DateFormat };