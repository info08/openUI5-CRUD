sap.ui.define([
    "jquery.sap.global"  // Import jQuery to use jQuery.ajax
], function (jQuery) {
    "use strict";

    return {

        /**
         * Generic function to make an API call.
         * @param {string} sURL - The API URL.
         * @param {string} [sMethod="GET"] - The HTTP method (GET, POST, etc.).
         * @param {object} [oData] - The data to send in case of POST or PUT requests.
         * @returns {Promise} - A promise that resolves with the API response or rejects with an error.
         */
        makeAPICall: function (sURL, sMethod, oData) {
            sMethod = sMethod || "GET";  // Default to GET method

            return new Promise(function (resolve, reject) {
                jQuery.ajax({
                    url: sURL,
                    method: sMethod,
                    data: oData ? JSON.stringify(oData) : null,
                    contentType: "application/json",
                    success: function (response) {
                        resolve(response);  // Resolve the promise with response
                    },
                    error: function (error) {
                        reject(error);  // Reject the promise with error
                    }
                });
            });
        }
    };
});
