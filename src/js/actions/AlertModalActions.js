const consts = require('./CoreActionConsts');

module.exports.showAlert = (alertMessage, callback) => {
    if (alertMessage) {
        return {
            type: consts.SHOW_ALERT_MODAL,
            title: alertMessage['title'],
            content: alertMessage['content'],
            leftButtonText: alertMessage['leftButtonText'],
            rightButtonText: alertMessage['rightButtonText'],
            moreInfo: alertMessage['moreInfo'] ? alertMessage['moreInfo'].toString() : null,
            visibility: true,
            callback: callback
        }
    } else {
        return {
            type: consts.SHOW_ALERT_MODAL,
            title: null,
            content: null,
            leftButtonText: null,
            rightButtonText: null,
            moreInfo: null,
            visibility: false,
            callback: null
        }
    }
}

module.exports.alertDismiss = (response, callback) => {
    return ((dispatch) => {
        if (callback) callback(response);
        dispatch(showAlert(false))
    })
}

module.exports.toggleMoreInfo = () => {
    return {
        type:consts.TOGGLE_MORE_INFO
    }
}
