'use strict';

/**
 * Returns the array of 32 compass points and heading.
 * See details here:
 * https://en.wikipedia.org/wiki/Points_of_the_compass#32_cardinal_points
 *
 * @return {array}
 *
 * Example of return :
 *  [
 *     { abbreviation : 'N',     azimuth : 0.00 ,
 *     { abbreviation : 'NbE',   azimuth : 11.25 },
 *     { abbreviation : 'NNE',   azimuth : 22.50 },
 *       ...
 *     { abbreviation : 'NbW',   azimuth : 348.75 }
 *  ]
 */
function createCompassPoints() {
    var sides = ['N','E','S','W'];  // use array of cardinal directions only!
    var result = [];
    for (var i = 0; i < 32; i++) {
        var name;
        var lastSide = sides[Math.floor(i / 8)];
        var nextSide = sides[Math.floor(i / 8 + 1) % 4];
        var nearestVerticalSide = sides[Math.round(i / 16) * 2 % 4];
        var nearestHorizontalSide = sides[(Math.round(((i + 24) % 32) / 16) * 2 + 1) % 4];
        var nearestSide = sides[Math.round(i / 8) % 4];
        var farthestSide = sides[Math.round((i + 8 - 2 * (i % 8)) / 8) % 4];
        if (i % 8 == 0)
            name = `${lastSide}`;
        else if (i % 8 == 1 || i % 8 == 7)
                name = `${nearestSide}b${farthestSide}`;
        else if (i % 8 == 2 || i % 8 == 6)
                name = `${nearestSide}${nearestVerticalSide}${nearestHorizontalSide}`;
        else if (i % 8 == 3 || i % 8 == 5)
                name = `${nearestVerticalSide}${nearestHorizontalSide}b${nearestSide}`;
        else if (i % 8 == 4)
                name = `${nearestVerticalSide}${nearestHorizontalSide}`;
        result.push({abbreviation: name, azimuth: 360 / 32 * i});
    }
    return result;
}


/**
 * Expand the braces of the specified string.
 * See https://en.wikipedia.org/wiki/Bash_(Unix_shell)#Brace_expansion
 *
 * In the input string, balanced pairs of braces containing comma-separated substrings
 * represent alternations that specify multiple alternatives which are to appear at that position in the output.
 *
 * @param {string} str
 * @return {Iterable.<string>}
 *
 * NOTE: The order of output string does not matter.
 *
 * Example:
 *   '~/{Downloads,Pictures}/*.{jpg,gif,png}'  => '~/Downloads/*.jpg',
 *                                                '~/Downloads/*.gif'
 *                                                '~/Downloads/*.png',
 *                                                '~/Pictures/*.jpg',
 *                                                '~/Pictures/*.gif',
 *                                                '~/Pictures/*.png'
 *
 *   'It{{em,alic}iz,erat}e{d,}, please.'  => 'Itemized, please.',
 *                                            'Itemize, please.',
 *                                            'Italicized, please.',
 *                                            'Italicize, please.',
 *                                            'Iterated, please.',
 *                                            'Iterate, please.'
 *
 *   'thumbnail.{png,jp{e,}g}'  => 'thumbnail.png'
 *                                 'thumbnail.jpeg'
 *                                 'thumbnail.jpg'
 *
 *   'nothing to do' => 'nothing to do'
 */
function* expandBraces(str) {
    var indexStart = str.indexOf('{');
    if (indexStart === -1) {
        yield str;
        return;
    }

    var raw = str.slice(0, indexStart);
    var variants = [];
    var currentVariant = '';
    var indexEnd = indexStart + 1;
    var balance = 1;
    while (balance > 1 || str[indexEnd] != '}') {
        if (str[indexEnd] == '{')
            balance++;
        if (str[indexEnd] == '}')
            balance--;
        if (balance == 1 && str[indexEnd] == ',') {
            variants.push(currentVariant);
            currentVariant = '';
        } else {
            currentVariant += str[indexEnd];
        }
        indexEnd++;
    }
    variants.push(currentVariant);

    var suffix = str.slice(indexEnd + 1);
    for (var suffixExpansion of expandBraces(suffix)) {
        for (var variant of variants) {
            for (var expansion of expandBraces(variant)) {
                yield `${raw}${expansion}${suffixExpansion}`;
            }
        }
    }
}


/**
 * Returns the ZigZag matrix
 *
 * The fundamental idea in the JPEG compression algorithm is to sort coefficient of given image by zigzag path and encode it.
 * In this task you are asked to implement a simple method to create a zigzag square matrix.
 * See details at https://en.wikipedia.org/wiki/JPEG#Entropy_coding
 * and zigzag path here: https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/JPEG_ZigZag.svg/220px-JPEG_ZigZag.svg.png
 *
 * @param {number} n - matrix dimension
 * @return {array}  n x n array of zigzag path
 *
 * @example
 *   1  => [[0]]
 *
 *   2  => [[ 0, 1 ],
 *          [ 2, 3 ]]
 *
 *         [[ 0, 1, 5 ],
 *   3  =>  [ 2, 4, 6 ],
 *          [ 3, 7, 8 ]]
 *
 *         [[ 0, 1, 5, 6 ],
 *   4 =>   [ 2, 4, 7,12 ],
 *          [ 3, 8,11,13 ],
 *          [ 9,10,14,15 ]]
 *
 */
function getZigZagMatrix(n) {
    var array = Array(n).fill().map(() => Array(n));
    var idCounter = 0;
    for (var diagonalIndex = 0; diagonalIndex < 2 * n - 1; diagonalIndex++) {
        var startJ = Math.min(diagonalIndex, n - 1);
        var startI = diagonalIndex - startJ;
        var diagonalLength = Math.min(startJ + 1, n - startI);

        var diagonal = Array(diagonalLength).fill().map(() => idCounter++);
        if (diagonalIndex % 2 == 0)
            diagonal = diagonal.reverse();
        var i = startI;
        var j = startJ;
        for (var element of diagonal) {
            array[i][j] = element;
            i++;
            j--;
        }
    }
    return array;
}


/**
 * Returns true if specified subset of dominoes can be placed in a row accroding to the game rules.
 * Dominoes details see at: https://en.wikipedia.org/wiki/Dominoes
 *
 * Each domino tile presented as an array [x,y] of tile value.
 * For example, the subset [1, 1], [2, 2], [1, 2] can be arranged in a row (as [1, 1] followed by [1, 2] followed by [2, 2]),
 * while the subset [1, 1], [0, 3], [1, 4] can not be arranged in one row.
 * NOTE that as in usual dominoes playing any pair [i, j] can also be treated as [j, i].
 *
 * @params {array} dominoes
 * @return {bool}
 *
 * @example
 *
 * [[0,1],  [1,1]] => true
 * [[1,1], [2,2], [1,5], [5,6], [6,3]] => false
 * [[1,3], [2,3], [1,4], [2,4], [1,5], [2,5]]  => true
 * [[0,0], [0,1], [1,1], [0,2], [1,2], [2,2], [0,3], [1,3], [2,3], [3,3]] => false
 *
 */
function canDominoesMakeRow(dominoes) {
    var adjacents = {};
    for (var domino of dominoes) {
        adjacents[domino[0]] = adjacents[domino[0]] || [];
        adjacents[domino[0]].push(domino[1]);
        adjacents[domino[1]] = adjacents[domino[1]] || [];
        adjacents[domino[1]].push(domino[0]);
    }
    var used = {};
    var queue = [];

    queue.unshift(Object.keys(adjacents)[0]);
    while (queue.length > 0) {
        var node = queue.pop();
        if (used[node])
            continue;
        for (var v of adjacents[node]) {
            queue.unshift(v);
        }
        used[node] = true;
    }
    if (Object.keys(used).length != Object.keys(adjacents).length)
        return false;

    var oddCount = 0;
    for (var key of Object.keys(adjacents)) {
        var count = adjacents[key].length;
        if (count % 2 == 1)
            oddCount++;
    }
    return oddCount == 0 || oddCount == 2;
}


/**
 * Returns the string expression of the specified ordered list of integers.
 *
 * A format for expressing an ordered list of integers is to use a comma separated list of either:
 *   - individual integers
 *   - or a range of integers denoted by the starting integer separated from the end integer in the range by a dash, '-'.
 *     (The range includes all integers in the interval including both endpoints)
 *     The range syntax is to be used only for, and for every range that expands to more than two values.
 *
 * @params {array} nums
 * @return {bool}
 *
 * @example
 *
 * [ 0, 1, 2, 3, 4, 5 ]   => '0-5'
 * [ 1, 4, 5 ]            => '1,4,5'
 * [ 0, 1, 2, 5, 7, 8, 9] => '0-2,5,7-9'
 * [ 1, 2, 4, 5]          => '1,2,4,5'
 */
function extractRanges(nums) {
    var ranges = [];
    var currentRange = undefined;
    for (var num of nums) {
        if (!currentRange || currentRange.right + 1 != num) {
            if (currentRange) {
                if (currentRange.left + 1 == currentRange.right) {
                    ranges.push({ left: currentRange.left, right: currentRange.left });
                    ranges.push({ left: currentRange.right, right: currentRange.right });
                } else {
                    ranges.push(currentRange);
                }
            }
            currentRange = {
                left: num,
                right: num
            };
        } else {
            currentRange.right = num;
        }
    }
    if (currentRange) {
        if (currentRange.left + 1 == currentRange.right) {
            ranges.push({ left: currentRange.left, right: currentRange.left });
            ranges.push({ left: currentRange.right, right: currentRange.right });
        } else {
            ranges.push(currentRange);
        }
    }
    return ranges.map(range => {
        if (range.left == range.right)
            return `${range.left}`;
        else
            return `${range.left}-${range.right}`;
    }).join(',');
}

module.exports = {
    createCompassPoints : createCompassPoints,
    expandBraces : expandBraces,
    getZigZagMatrix : getZigZagMatrix,
    canDominoesMakeRow : canDominoesMakeRow,
    extractRanges : extractRanges
};
