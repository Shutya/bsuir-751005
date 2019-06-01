import EventEmitter from "../common/EventEmitter";

export default class SourcesController extends EventEmitter {
    constructor(model, view) {
        super();
        this.model = model;
        this.view = view;

        this.model.on("sourcesAdded", sources => 
            this.view.addNewSources(...sources)
        );
        this.view.on("sourceClicked", sourceId => {
            if (!this.view.isSourceEnabled(sourceId)) {
                this.view.enableSource(sourceId);
                this.emit("sourceEnabled", sourceId);
            } else {
                this.view.disableSource(sourceId);
                this.emit("sourceDisabled", sourceId);
            }
        });
    }

    addNewSource(source) {
        this.model.addSource(source);
    }
}