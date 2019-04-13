'use strict';

/**
 * Returns true if word occurrs in the specified word snaking puzzle.
 * Each words can be constructed using "snake" path inside a grid with top, left, right and bottom directions.
 * Each char can be used only once ("snake" should not cross itself).
 *
 * @param {array} puzzle
 * @param {array} searchStr
 * @return {bool}
 *
 * @example
 *   var puzzle = [ 
 *      'ANGULAR',
 *      'REDNCAE',
 *      'RFIDTCL',
 *      'AGNEGSA',
 *      'YTIRTSP',
 *   ]; 
 *   'ANGULAR'   => true   (first row)
 *   'REACT'     => true   (starting from the top-right R adn follow the ↓ ← ← ↓ )
 *   'UNDEFINED' => true
 *   'RED'       => true
 *   'STRING'    => true
 *   'CLASS'     => true
 *   'ARRAY'     => true   (first column)
 *   'FUNCTION'  => false
 *   'NULL'      => false 
 */
function findStringInSnakingPuzzle(puzzle, searchStr) {
    var height = puzzle.length;
    var width = puzzle[0].length;
    var used = Array(height).fill().map(e => 
        Array(width).fill(false)
    );
    function findString(searchStr, i, j) {
        if (i < 0 || j < 0 || i >= height || j >= width || used[i][j])
            return false;
        if (searchStr.slice(-1) !== puzzle[i][j])
            return false;
        if (searchStr.length === 1)
            return true;

        used[i][j] = true;

        for (var di of [-1, +1]) {
            if (findString(searchStr.slice(0, -1), i + di, j))
                return true;
        }

        for (var dj of [-1, +1]) {
            if (findString(searchStr.slice(0, -1), i, j + dj))
                return true;
        }
        used[i][j] = false;
        return false;
    }
    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            if (findString(searchStr, i, j))
                return true;
        }
    }
    return false;
}


/**
 * Returns all permutations of the specified string.
 * Assume all chars in the specified string are different.
 * The order of permutations does not matter.
 * 
 * @param {string} chars
 * @return {Iterable.<string>} all posible strings constructed with the chars from the specfied string
 *
 * @example
 *    'ab'  => 'ab','ba'
 *    'abc' => 'abc','acb','bac','bca','cab','cba'
 */
function* getPermutations(chars) {
    if (chars.length == 1) {
        yield chars;
        return;
    }
    for (var i = 0; i < chars.length; i++) {
        var right = chars.substring(0, i);
        var left = chars.substring(i + 1);
        for (var permutation of getPermutations(left + right)) 
            yield chars[i] + permutation;
    }
}


/**
 * Returns the most profit from stock quotes.
 * Stock quotes are stores in an array in order of date.
 * The stock profit is the difference in prices in buying and selling stock.
 * Each day, you can either buy one unit of stock, sell any number of stock units you have already bought, or do nothing. 
 * Therefore, the most profit is the maximum difference of all pairs in a sequence of stock prices.
 * 
 * @param {array} quotes
 * @return {number} max profit
 *
 * @example
 *    [ 1, 2, 3, 4, 5, 6]   => 15  (buy at 1,2,3,4,5 and then sell all at 6)
 *    [ 6, 5, 4, 3, 2, 1]   => 0   (nothing to buy)
 *    [ 1, 6, 5, 10, 8, 7 ] => 18  (buy at 1,6,5 and sell all at 10)
 */
function getMostProfitFromStockQuotes(quotes) {
    var sellQuote = undefined;
    var buyQuotes = [];
    var result = 0;
    for (var quote of quotes.reverse()) {
        if (!sellQuote) {
            buyQuotes = [];
            sellQuote = quote;
            continue;
        }
        if (sellQuote < quote) {
            for (var buyQuote of buyQuotes)
                result += sellQuote - buyQuote;
            buyQuotes = [];
            sellQuote = quote;
            continue;
        }
        buyQuotes.push(quote);
    }
    if (sellQuote) {
        for (var buyQuote of buyQuotes)
            result += sellQuote - buyQuote;
    }
    return result;
}


/**
 * Class representing the url shorting helper.
 * Feel free to implement any algorithm, but do not store link in the key\value stores.
 * The short link can be at least 1.5 times shorter than the original url.
 * 
 * @class
 *
 * @example
 *    
 *     var urlShortener = new UrlShortener();
 *     var shortLink = urlShortener.encode('https://en.wikipedia.org/wiki/URL_shortening');
 *     var original  = urlShortener.decode(shortLink); // => 'https://en.wikipedia.org/wiki/URL_shortening'
 * 
 */
function UrlShortener() {
    this.urlAllowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"+
                           "abcdefghijklmnopqrstuvwxyz"+
                           "0123456789-_.~!*'();:@&=+$,/?#[]";
    this.shortURLChars= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'+
                        'abcdefghijklmnopqrstuvwxyz'+
                        '0123456789'
}

UrlShortener.prototype = {

    encode: function(url) {
        var result = '';
        var charPairs = url.match(/..?/g);

        for (var pair of charPairs) {
            var code = pair.charCodeAt(0);
            if (pair.length == 2)
                code += (pair.charCodeAt(1)) << 8;
            result += String.fromCharCode(code);
        }
        return result;
    },
    
    decode: function(code) {
        var result = '';
        for (var c of code) {
            var charCode = c.charCodeAt(0);
            if (charCode < 256) {
                result += String.fromCharCode(charCode);
            } else {
                result += String.fromCharCode(charCode % (1 << 8), charCode >> 8);
            }
        }
        return result;
    } 
}


module.exports = {
    findStringInSnakingPuzzle: findStringInSnakingPuzzle,
    getPermutations: getPermutations,
    getMostProfitFromStockQuotes: getMostProfitFromStockQuotes,
    UrlShortener: UrlShortener
};
