class Toast {
    constructor(closingDelay = 6000) {
        this.elt = null;
        this.closingDelay = closingDelay;
        this.isShowing = false;
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
        if(this.isShowing){
            this.elt.innerText += '\n' + msg; 
        } else {
            this.elt.innerText = msg;
        }
       

        this.elt.className = "my-toast-ctnr my-toast-down-appear";
        this.isShowing = true;
        setTimeout(() => {
            this.elt.className = "my-toast-ctnr my-toast-down-disappear";
            this.isShowing = false;
        }, this.closingDelay);
    }
}

export default Toast;