const RENDER_TO_DOM = Symbol("render to dom");

export class Component {
    constructor() {
        this.props = Object.create(null);
        this.children = [];
        this._root = null;
        this._range = null;
    }

    setAttribute(name, value) {
        this.props[name] = value;
    }

    appendChild(component) {
        this.children.push(component);
    }

    [RENDER_TO_DOM](range) {
        this._range = range;
        this.render()[RENDER_TO_DOM](range);
    }

    rerender() {
        this._range.deleteContents();
        this[RENDER_TO_DOM](this._range);
    }

    setState(newState) {
        if(this.state === null || typeof this.state !== "object") {
            this.state = newState;
            this.rerender();
            return;
        }
        let merge = 
    }    

    /* get root() {
        if (!this._root) {
            this._root = this.render().root;
        }
        return this._root;
    } */
}

export class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type);
    }

    setAttribute(name, value) {
        if(name.match(/^on([\s\S]+)$/)) {
            this.root.addEventListener(RegExp.$1.replace(/^[\s\S]/, c => c.toLowerCase()), value);
        }
        this.root.setAttribute(name, value)
    }

    appendChild(component) {
        let range = document.createRange();
        range.setStart(this.root, this.root.childNodes.length);
        range.setEnd(this.root, this.root.childNodes.length);
        range.deleteContents();
        component[RENDER_TO_DOM](range);
    }

    [RENDER_TO_DOM](range) {
        range.deleteContents();
        range.insertNode(this.root);
    }
}

export class TextWrapper {
    constructor(content) {
        this.root = document.createTextNode(content)
    }

    [RENDER_TO_DOM](range) {
        range.deleteContents();
        range.insertNode(this.root);
    }
}


export function createElement(type, attributes, ...children) {
    let e;

    if (typeof type === "string") {
        e = new ElementWrapper(type);
    } else {
        e = new type;
    }
    for (let p in attributes) {
        e.setAttribute(p, attributes[p]);
    }
    let insertChildren = (children) => {
        for (let child of children) {
            if (typeof child === 'string') {
                child = new TextWrapper(child);
                // e.appendChild(child);
            }
            if (typeof child === 'object' && (child instanceof Array)) {
                insertChildren(child);
            } else {
                e.appendChild(child);
            }

        }
    }
    insertChildren(children)
    return e;
}

export function render(component, paren