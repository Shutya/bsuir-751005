'use strict';

/**************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 **************************************************************************************************/


/**
 * Returns the rectagle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    var r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
    this.width = width;
    this.height = height;
}

Rectangle.prototype.getArea = function() {
    return this.width * this.height;
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
    return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    var r = fromJSON(Rectangle.prototype, '{"width":10, "height":20}');
 *
 */
function fromJSON(proto, json) {
    return Object.assign(new proto.constructor(), JSON.parse(json));
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurences
 *
 * All types of selectors can be combined using the combinators ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy and implement the functionality
 * to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string repsentation according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple, clear and readable as possible.
 *
 * @example
 *
 *  var builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()  => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()  => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()        =>    'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

const cssSelectorBuilder = {

    element: function(value) {
        return new SelectorBuilder(value).element(value);
    },

    id: function(value) {
        return new SelectorBuilder().id(value);
    },

    class: function(value) {
        return new SelectorBuilder().class(value);
    },

    attr: function(value) {
        return new SelectorBuilder().attr(value);
    },

    pseudoClass: function(value) {
        return new SelectorBuilder().pseudoClass(value);
    },

    pseudoElement: function(value) {
        return new SelectorBuilder().pseudoElement(value);
    },

    combine: function(selector1, combinator, selector2) {
        return selector1.chain(new Combinator(combinator), selector2);
    },
};

class Selector {
    constructor() {
        this.classes = [];
        this.pseudoClasses = [];
        this.attributes = [];
        this.id = null;
        this.element = null;
        this.pseudoElement = null;
    }

    stringify() {
        var result = '';
        if (this.element)
            result += `${this.element}`;
        if (this.id)
            result += `#${this.id}`;
        for (let actualClass of this.classes)
            result += `.${actualClass}`;
        for (let attribute of this.attributes)
            result += `[${attribute}]`;
        for (let pseudoClass of this.pseudoClasses)
            result += `:${pseudoClass}`;
        if (this.pseudoElement)
            result += `::${this.pseudoElement}`;
        return result;
    }
}

class Combinator {
    constructor(value) {
        this.value = value;
    }

    stringify() {
        return this.value;
    }
}

const State = Object.freeze({
    ELEMENT:        0,
    ID:             1,
    CLASS:          2,
    ATTRIBUTE:      3,
    PSEUDO_CLASS:   4,
    PSEUDO_ELEMENT: 5,
    INVALID:        6
});

class SelectorBuilder {
    constructor() {
        this.followChain = [];
        this.currentSelector = null;
        this.state = State.ELEMENT;
    }
    getCurrentSelector() {
        if (!this.currentSelector)
            this.currentSelector = new Selector();
        return this.currentSelector;
    }

    element(value) {
        if (this.getCurrentSelector().element)
            throw new 'Element, id and pseudo-element should not occur more then one time inside the selector';
        if (State.ELEMENT < this.state)
            throw new "Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element";
        this.getCurrentSelector().element = value;
        return this;
    }

    id(value) {
        if (this.getCurrentSelector().id)
            throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
        if (State.ID < this.state)
            throw new Error("Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element");
        this.state = State.ID;
        this.getCurrentSelector().id = value;
        return this;
    }

    class(value) {
        if (State.CLASS < this.state)
            throw new Error("Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element");
        this.getCurrentSelector().classes.push(value);
        this.state = State.CLASS;
        return this;
    }

    attr(value) {
        if (State.ATTRIBUTE < this.state)
            throw new Error("Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element");
        this.getCurrentSelector().attributes.push(value);
        this.state = State.ATTRIBUTE;
        return this;
    }
    
    pseudoElement(value) {
        if (this.getCurrentSelector().pseudoElement)
            throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
        if (State.PSEUDO_ELEMENT < this.state)
            throw new Error("Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element");
        this.state = State.PSEUDO_ELEMENT;
        this.getCurrentSelector().pseudoElement = value;
        return this;
    }

    pseudoClass(value) {
        if (State.PSEUDO_CLASS < this.state)
            throw new Error("Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element");
        this.getCurrentSelector().pseudoClasses.push(value);
        this.state = State.PSEUDO_CLASS;
        return this;
    }

    chain(combinator, selector) {
        if (this.currentSelector) {
            this.followChain.push(this.currentSelector);
            this.currentSelector = null;
        }
        this.followChain.push(combinator, ...selector.followChain);
        if (selector.currentSelector)
            this.followChain.push(selector.currentSelector);
        this.state = State.INVALID;
        return this;
    }

    stringify() {
        var fullFollowChain = [...this.followChain];
        if (this.currentSelector)
            fullFollowChain.push(this.currentSelector);
        
        return fullFollowChain.map(e => e.stringify()).join(' ');
    }
}

module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
};
