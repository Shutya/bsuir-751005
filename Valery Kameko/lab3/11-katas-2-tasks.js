'use strict';

/**
 * Returns the bank account number parsed from specified string.
 *
 * You work for a bank, which has recently purchased an ingenious machine to assist in reading letters and faxes sent in by branch offices.
 * The machine scans the paper documents, and produces a string with a bank account that looks like this:
 *
 *    _  _     _  _  _  _  _
 *  | _| _||_||_ |_   ||_||_|
 *  ||_  _|  | _||_|  ||_| _|
 *
 * Each string contains an account number written using pipes and underscores.
 * Each account number should have 9 digits, all of which should be in the range 0-9.
 *
 * Your task is to write a function that can take bank account string and parse it into actual account numbers.
 *
 * @param {string} bankAccount
 * @return {number}
 *
 * Example of return :
 *
 *   '    _  _     _  _  _  _  _ \n'+
 *   '  | _| _||_||_ |_   ||_||_|\n'+     =>  123456789
 *   '  ||_  _|  | _||_|  ||_| _|\n'
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '| | _| _|| ||_ |_   ||_||_|\n'+     => 23056789
 *   '|_||_  _||_| _||_|  ||_| _|\n',
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '|_| _| _||_||_ |_ |_||_||_|\n'+     => 823856989
 *   '|_||_  _||_| _||_| _||_| _|\n',
 *
 */
function parseBankAccount(bankAccount) {
    var digits = [
        ' _     _  _     _  _  _  _  _ ',
        '| |  | _| _||_||_ |_   ||_||_|',
        '|_|  ||_  _|  | _||_|  ||_| _|'
    ];
    var digitWidth = 3;
    var digitHeight = 3;
    var lines = bankAccount.split('\n');
    
    var result = 0;

    for (var i = 0; i < lines[0].length; i += digitWidth) {
        result *= 10;
        for (var j = 0; j < digits[0].length; j += digitWidth) {
            var equal = true;
            for (var di = 0; di < digitHeight && equal; di++) {
                for (var dj = 0; dj < digitWidth && equal; dj++) {
                    if (lines[di][i + dj] !== digits[di][j + dj])
                        equal = false;
                }
            }
            if (equal) {
                result += j / digitWidth;
                break;
            }
        }
    }
    return result;
}


/**
 * Returns the string, but with line breaks inserted at just the right places to make sure that no line is longer than the specified column number.
 * Lines can be broken at word boundaries only.
 *
 * @param {string} text
 * @param {number} columns
 * @return {Iterable.<string>}
 *
 * @example :
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 26 =>  'The String global object',
 *                                                                                                'is a constructor for',
 *                                                                                                'strings, or a sequence of',
 *                                                                                                'characters.'
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 12 =>  'The String',
 *                                                                                                'global',
 *                                                                                                'object is a',
 *                                                                                                'constructor',
 *                                                                                                'for strings,',
 *                                                                                                'or a',
 *                                                                                                'sequence of',
 *                                                                                                'characters.'
 */
const TokenType = Object.freeze({
    WHITESPACES: 0,
    SEPARATOR: 1,
    WORD: 2
});

function* tokenize(text) {
    function classifyChar(c) {
        if (c == ' ')
            return TokenType.WHITESPACES;
        if (c.match(/^[a-zA-Z]$/))
            return TokenType.WORD;
        return TokenType.SEPARATOR;
    }

    var currentToken = undefined;
    for (var c of text) {
        var charType = classifyChar(c);
        if (!currentToken || currentToken.type === charType) {
            if (!currentToken)
                currentToken = {
                    type: charType,
                    value: ''
                };
            currentToken.value += c;
            continue;
        }
        yield currentToken;
        currentToken = {
            type: charType,
            value: c
        };
    }
    if (currentToken)
        yield currentToken;
}

function* wrapText(text, columns) {
    var rowLength = 0;
    var row = '';
    for (var token of tokenize(text)) {
        if (row.length + token.value.length > columns) {
            yield row.trim();
            row = '';
        }
        if (row.length !== 0 || token.type !== TokenType.WHITESPACES)
            row += token.value;
    }
    yield row.trim();
}


/**
 * Returns the rank of the specified poker hand.
 * See the ranking rules here: https://en.wikipedia.org/wiki/List_of_poker_hands.
 *
 * @param {array} hand
 * @return {PokerRank} rank
 *
 * @example
 *   [ '4♥','5♥','6♥','7♥','8♥' ] => PokerRank.StraightFlush
 *   [ 'A♠','4♠','3♠','5♠','2♠' ] => PokerRank.StraightFlush
 *   [ '4♣','4♦','4♥','4♠','10♥' ] => PokerRank.FourOfKind
 *   [ '4♣','4♦','5♦','5♠','5♥' ] => PokerRank.FullHouse
 *   [ '4♣','5♣','6♣','7♣','Q♣' ] => PokerRank.Flush
 *   [ '2♠','3♥','4♥','5♥','6♥' ] => PokerRank.Straight
 *   [ '2♥','4♦','5♥','A♦','3♠' ] => PokerRank.Straight
 *   [ '2♥','2♠','2♦','7♥','A♥' ] => PokerRank.ThreeOfKind
 *   [ '2♥','4♦','4♥','A♦','A♠' ] => PokerRank.TwoPairs
 *   [ '3♥','4♥','10♥','3♦','A♠' ] => PokerRank.OnePair
 *   [ 'A♥','K♥','Q♥','2♦','3♠' ] =>  PokerRank.HighCard
 */
const PokerRank = {
    StraightFlush: 8,
    FourOfKind: 7,
    FullHouse: 6,
    Flush: 5,
    Straight: 4,
    ThreeOfKind: 3,
    TwoPairs: 2,
    OnePair: 1,
    HighCard: 0
}

const PokerNumerals = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

function parseCard(card) {
    return {
        numeral: card.slice(0, -1),
        suit: card.slice(-1)
    };
}

function getPokerHandRank(hand) {
    var cards = hand.map(parseCard).sort((a, b) => 
        PokerNumerals.indexOf(a.numeral) - PokerNumerals.indexOf(b.numeral)
    );
    if (cards[cards.length - 1].numeral == 'A') {
        if (cards[0].numeral == PokerNumerals[0]) {
            var lastCard = cards.splice(-1, 1);
            cards.splice(0, 0, ...lastCard);
        }
    }
    var isSequential = cards.reduce((acc, e, i, arr) => {
        if (!acc)
            return false;
        var lastIndex = 
            arr[i - 1].numeral == 'A' ? 
                -1 : 
                PokerNumerals.indexOf(arr[i - 1].numeral);
        var currIndex = PokerNumerals.indexOf(e.numeral);
        return lastIndex + 1 == currIndex;
    });


    var numeralCount = cards.reduce((count, card) => {
        if (count[card.numeral])
            count[card.numeral]++;
        else
            count[card.numeral] = 1;
        return count;
    }, {});

    var suitCount = cards.reduce((count, card) => {
        if (count[card.suit])
            count[card.suit]++;
        else
            count[card.suit] = 1;
        return count;
    }, {});

    var numeralCountValues = Object.keys(numeralCount).map(key => numeralCount[key]);
    var suitCountValues = Object.keys(suitCount).map(key => suitCount[key]);
    if (suitCountValues.indexOf(5) !== -1 && isSequential)
        return PokerRank.StraightFlush;
    if (numeralCountValues.indexOf(4) !== -1)
        return PokerRank.FourOfKind;
    if (numeralCountValues.indexOf(3) !== -1 && numeralCountValues.indexOf(2) !== -1)
        return PokerRank.FullHouse;
    if (suitCountValues.length === 1)
        return PokerRank.Flush;
    if (isSequential)
        return PokerRank.Straight;
    if (numeralCountValues.indexOf(3) !== -1)
        return PokerRank.ThreeOfKind;
    if (numeralCountValues.filter(x => x == 2).length === 2)
        return PokerRank.TwoPairs;
    if (numeralCountValues.indexOf(2) !== -1)
        return PokerRank.OnePair;
    return PokerRank.HighCard;
}


/**
 * Returns the rectangles sequence of specified figure.
 * The figure is ASCII multiline string comprised of minus signs -, plus signs +, vertical bars | and whitespaces.
 * The task is to break the figure in the rectangles it is made of.
 *
 * NOTE: The order of rectanles does not matter.
 * 
 * @param {string} figure
 * @return {Iterable.<string>} decomposition to basic parts
 * 
 * @example
 *
 *    '+------------+\n'+
 *    '|            |\n'+
 *    '|            |\n'+              '+------------+\n'+
 *    '|            |\n'+              '|            |\n'+         '+------+\n'+          '+-----+\n'+
 *    '+------+-----+\n'+       =>     '|            |\n'+     ,   '|      |\n'+     ,    '|     |\n'+
 *    '|      |     |\n'+              '|            |\n'+         '|      |\n'+          '|     |\n'+
 *    '|      |     |\n'               '+------------+\n'          '+------+\n'           '+-----+\n'
 *    '+------+-----+\n'
 *
 *
 *
 *    '   +-----+     \n'+
 *    '   |     |     \n'+                                    '+-------------+\n'+
 *    '+--+-----+----+\n'+              '+-----+\n'+          '|             |\n'+
 *    '|             |\n'+      =>      '|     |\n'+     ,    '|             |\n'+
 *    '|             |\n'+              '+-----+\n'           '+-------------+\n'
 *    '+-------------+\n'
 */
function generateRectangle(width, height) {
    return [
        '+' + '-'.repeat(width - 2) + '+',
        ...Array(height - 2).fill('|' + ' '.repeat(width - 2) + '|'),
        '+' + '-'.repeat(width - 2) + '+'
    ].join('\n') + '\n';
}

function* getFigureRectangles(figure) {
    var lines = figure.split('\n').slice(0, -1);
    var height = lines.length;
    var width = lines[0].length;
    for (var i = 0; i < height - 1; i++) {
        for (var j = 0; j < width - 1; j++) {
            if (lines[i][j] !== '+')
                continue;
            if (lines[i + 1][j] === ' ' || lines[i][j + 1] === ' ')
                continue;

            var isBox = true;
            var boxWidth = 1;
            var boxHeight = 1;
            for (var ii = i + 1; ii < height; ii++) {
                boxHeight++;
                if (['+-', '++'].indexOf(lines[ii][j] + lines[ii][j + 1]) !== -1)
                    break;
            }
            if (ii == height)
                isBox = false;
            for (var jj = j + 1; jj < width; jj++) {
                boxWidth++;
                if (['+|', '++'].indexOf(lines[i][jj] + lines[i + 1][jj]) !== -1)
                    break;
            }
            if (jj == width)
                isBox = false;
            if (isBox)
                yield generateRectangle(boxWidth, boxHeight);
        }
    }
}


module.exports = {
    parseBankAccount : parseBankAccount,
    wrapText: wrapText,
    PokerRank: PokerRank,
    getPokerHandRank: getPokerHandRank,
    getFigureRectangles: getFigureRectangles
};
