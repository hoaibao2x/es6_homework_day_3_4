export default class ToDo {
    constructor(content, id) {
        this.content = content;
        this.id = id;
        this.currentTime = new Date();
    }
}