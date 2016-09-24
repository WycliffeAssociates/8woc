
const api = window.ModuleApi;
const NAMESPACE = "TranslationNotesChecker";

module.exports = {
    goToNext(params){
        var currentCheckIndex = api.getDataFromCheckStore(NAMESPACE, 'currentCheckIndex');
        var currentGroupIndex = api.getDataFromCheckStore(NAMESPACE, 'currentGroupIndex');
        this.changeCurrentCheckInCheckStore(currentGroupIndex, currentCheckIndex + 1);
    },

    goToPrevious(params){
        var currentCheckIndex = api.getDataFromCheckStore(NAMESPACE, 'currentCheckIndex');
        var currentGroupIndex = api.getDataFromCheckStore(NAMESPACE, 'currentGroupIndex');
        this.changeCurrentCheckInCheckStore(currentGroupIndex, currentCheckIndex - 1);
    },

    goToCheck(params){
      this.changeCurrentCheckInCheckStore(params.groupIndex, params.checkIndex);
    },

    changeCheckType(params) {
      if(params.currentCheckNamespace === NAMESPACE) {
        this.updateState();
      }
    }

}
