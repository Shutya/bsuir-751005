import Controller from './controller';

export default class Application {
    constructor() {
        this.controller = new Controller();
    }

    start(){
        this.controller.start();
    }
}