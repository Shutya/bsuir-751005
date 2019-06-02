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
    const parts = [
        [' _ ', '   ', ' _ ', ' _ ', '   ', ' _ ', ' _ ', ' _ ', ' _ ', ' _ '],
        ['| |', '  |', ' _|', ' _|', '|_|', '|_ ', '|_ ', '  |', '|_|', '|_|'],
        ['|_|', '  |', '|_ ', ' _|', '  |', ' _|', '|_|', '  |', '|_|', ' _|']
    ];

    let number = 0;
    for (let i = 0; i < bankAccount.length / 3 - 1; i += 3) {
        const digit = [bankAccount.slice(i, i + 3),
            bankAccount.slice(i + 3 * 9 + 1, i + 3 * 10 + 1),
            bankAccount.slice(i + 3 * 18 + 2, i + 3 * 19 + 2)];

        for (let j = 0; j < parts[0].length; j++) {
            if (parts[0][j] == digit[0] && parts[1][j] == digit[1] && parts[2][j] == digit[2]) {
                number = number * 10 + j;
                break;
            }
        }
    }

    return number;

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
function* wrapText(text, columns) {
    if (columns >= text.length) {
        yield text;
        text = '';
    }

    while (text.length) {
        const column = text.slice(0, columns + 1);
        const spaceIndex = column.lastIndexOf(' ');
        if (spaceIndex == -1) {
            const firstSpaceIndex = text.indexOf(' ');
            if (firstSpaceIndex == -1) {
                yield text;
                text = '';
            } else {
                yield text.slice(0, firstSpaceIndex);
                text = text.slice(firstSpaceIndex + 1);
            }
        } else {
            yield text.slice(0, spaceIndex);
            text = text.slice(spaceIndex + 1);
        }
    }
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

function getPokerHandRank(hand) {
    const getShape = card => card[card.length - 1];
    const rankToNum = rank => isNaN(parseInt(rank)) ? (11 + ['J', 'Q', 'K', 'A'].indexOf(rank)) : parseInt(rank);
    const getRank = card => rankToNum(card.length == 3 ? card.slice(0, 2) : card[0]);
    const isSameShape = cards => cards.every(card => getShape(card) == getShape(cards[0]));

    function countRanks(cards) {
        const counters = Array.from({length: 13}, elem => 0);
        for (let card of cards) {
            counters[getRank(card) - 2]++;
        }
        return counters;
    }

    function isStraight (cards) {
        const sorted = cards.map(card => getRank(card)).sort((a, b) => a - b);
        if (sorted[0] == '2' && sorted[sorted.length - 1] == '14') {
            sorted.unshift(sorted.pop());
        }
        for (let i = 1; i < sorted.length; i++) {
            const diff = sorted[i] - sorted[i - 1];
            if (diff != 1 && diff != -12) {
                return false;
            }
        }

        return true;
    }

    const ranks = countRanks(hand);
    switch(true) {
        case (isStraight(hand) && isSameShape(hand)):
            return PokerRank.StraightFlush;
        case (ranks.indexOf(4) != -1):
            return PokerRank.FourOfKind;
        case (ranks.indexOf(3) != -1 && ranks.indexOf(2) != -1):
            return PokerRank.FullHouse;
        case isSameShape(hand):
            return PokerRank.Flush;
        case isStraight(hand):
            return PokerRank.Straight;
        case ranks.indexOf(3) != -1:
            return PokerRank.ThreeOfKind;
        case ranks.indexOf(2) != -1 && ranks.lastIndexOf(2) != ranks.indexOf(2):
            return PokerRank.TwoPairs;
        case ranks.indexOf(2) != -1:
            return PokerRank.OnePair;
        default:
            return PokerRank.HighCard;
    }
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
function* getFigureRectangles(figure) {
    figure = figure.split('\n').slice(0, -1).map(line => line.split(''));

    function deleteShape(y, x, width, height) {
        for (let i = y; i < y + height - 1; i++) {
            for (let j = x; j < x + width - 1; j++) {
                figure[i][j] = ' ';
            }
        }

        // for upper right corner of shape
        let noCornersAbove = false;
        let noCornersOnRight = x + width - 1 == figure[0].length - 1 || figure[y].slice(x + width).indexOf('+') == -1;

        if (noCornersOnRight) {
            for (let i = y; i < y + height - 1; i++) {
                figure[i][x + width - 1] = ' ';
            }
            noCornersAbove = true;
        }
        if (y + height - 1 == figure.length - 1 || figure[y + height][x] == ' ') {
            figure[y + height - 1][x] = ' ';
        }

        // for lower right corner of shape
        noCornersOnRight = x + width - 1 == figure[0].length - 1 || figure[y + height - 1].slice(x + width).indexOf('+') == -1;
        let noCornersBelow = true;
        for (let i = y + height; noCornersBelow && i < figure.length; i++) {
            if (figure[i][x + width - 1] == '+') {
                noCornersBelow = false;
            }
        }

        if (noCornersBelow && (noCornersOnRight || noCornersAbove)) {
            figure[y + height - 1][x + width - 1] = ' ';
        }
    }

    function createShape(width, height) {
        const shape = Array.from({length: height});
        for (let i = 0; i < height; i++) {
            shape[i] = !i || i == height - 1 ?
                '+' + Array.from({length: width - 2}, () => '-').join('') + '+' :
                '|' + Array.from({length: width - 2}, () => ' ').join('') + '|';
        }

        shape[shape.length - 1] += '\n';
        return shape.join('\n');
    }

    let width = 0;
    let height = 0;
    let hasShape = true;
    while (hasShape) {
        hasShape = false;

        for (let i = 0; i < figure.length && !hasShape; i++) {
            for (let j = 0; j < figure[0].length && !hasShape; j++) {
                if (figure[i][j] == '+') {
                    hasShape = true;

                    width = figure[i].slice(j + 1).indexOf('+') + 2;
                    let k = i + 1;
                    while (k < figure.length && figure[k][j] != '+') {
                        k++;
                    }
                    height = k - i + 1;

                    deleteShape(i, j, width, height);
                    yield createShape(width, height);
                }
            }
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
