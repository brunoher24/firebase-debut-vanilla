class Toast {
    constructor(closingDelay = 6000) {
        this.elt = null;
        this.closingDelay = closingDelay;
    }

    init() {
        this.elt = document.createElement("div");
        this.elt.className = "my-toast-ctnr";
        document.body.appendChild(this.elt);
    }

    open(msg) {
        if(!this.elt) {
            this.init();
        }
        this.elt.innerText = msg;

        this.elt.className = "my-toast-ctnr my-toast-down-appear";
        setTimeout(() => {
            this.elt.className = "my-toast-ctnr my-toast-down-disappear";
        }, this.closingDelay);
    }
}

export default Toast;