import EventEmitter from "../common/EventEmitter";
import "../polyfills/closest-polyfill";

export default class SourcesView extends EventEmitter {
    constructor(element) {
        super();
        let self = this;
        this.element = element;
        element.addEventListener("click", event => {
            const source = event.target.closest(".source");
            if (source === null)
                return;
            const id = source.getAttribute("data-source-id");
            self.emit("sourceClicked", id);
        });
        
    }

    initializeNewSource(node, itemData) {
        node.querySelector(".source__name").textContent = itemData.name;
        node.setAttribute("data-source-id", itemData.id);
        return node;
    }

    addNewSources(...itemsData) {
        const template = document.getElementById("source-tpl");
        let container = this.element.getElementsByClassName("sources__container")[0];
        itemsData.forEach(itemData => {
            let clone = template.content.querySelector(".source").cloneNode(true);
            clone = this.initializeNewSource(clone, itemData);
            container.appendChild(clone);
        });
    }

    clearAllSources() {
        Array.from(this.element.getElementsByClassName("source")).forEach(node => 
            node.parentNode.removeChild(node)
        );
    }

    isSourceEnabled(id) {
        return this.getSourceById(id).classList.contains("enabled");
    }

    enableSource(id) {
        this.getSourceById(id).classList.add("enabled");
    }

    disableSource(id) {
        this.getSourceById(id).classList.remove("enabled");
    }

    getSourceById(id) {
        return this.element.querySelector(`.source[data-source-id="${id}"]`);
    }
}