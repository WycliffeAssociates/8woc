/**
 * Utility functions
 */

module.exports = {

    // Returns a deep clone of an object
    cloneObject: function(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        var temp = obj.constructor(); // give temp the original obj's constructor
        for (var key in obj) {
            temp[key] = this.cloneObject(obj[key]);
        }
        return temp;
    }
};