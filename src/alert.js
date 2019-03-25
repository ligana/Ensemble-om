<<<<<<< HEAD
exports.install = function (Vue, options) {
    Vue.prototype.sweetAlert = function (type,title){
        this.$swal({
            allowOutsideClick: false,
            type: type,
            width: '25%',
            title: title,
        })
    };
=======
exports.install = function (Vue, options) {
    Vue.prototype.sweetAlert = function (type,title){
        this.$swal({
            allowOutsideClick: false,
            type: type,
            width: '25%',
            title: title,
        })
    };
>>>>>>> master
};