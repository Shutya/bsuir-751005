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
    throw new Error('Not implemented');
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
    let expanded = [str];

    const bracedSubstringRegex = /\{[^\{\}]*?\}/g;

    let hasFinished = false;
    while (!hasFinished) {
        hasFinished = true;
        let newExpanded = [];

        for (let string of expanded) {
            let matches = string.match(bracedSubstringRegex);
            if (matches) {
                hasFinished = false;
                let options = matches[0].slice(1, -1).split(',');
                for (let option of options) {
                    newExpanded.push(string.replace(matches[0], option));
                }
            } else {
                newExpanded.push(string);
            }
        }
        expanded = newExpanded;
    }
    expanded = [...new Set(expanded)];

    for (let string of expanded) {
        yield string;
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
    const Moves = Object.freeze({up: 0, down: 1});

    let matrix = Array.from({length: n}, () => Array.from({length: n}, () => 0));

    let i = 0;
    let j = 0;
    let elem = 1;
    let movement = Moves.up;
    while (elem < n * n) {
        switch (movement) {
            case Moves.down:
                if (j && i != n - 1) {
                    i++;
                    j--;
                } else {
                    if (i == n - 1) {
                        j++;
                    } else {
                        i++;
                    }
                    movement = Moves.up;
                }
                break;
            case Moves.up:
                if (i && j != n - 1) {
                    i--;
                    j++;
                } else {
                    if (j == n - 1) {
                        i++;
                    } else {
                        j++;
                    }
                    movement = Moves.down;
                }
                break;
        }
        matrix[i][j] = elem++;
    }

    return matrix;
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
    const result = [[]];
    result[0] = dominoes.shift();

    let lastLength = 0;
    while (lastLength != dominoes.length && dominoes.length > 0) {
        lastLength = dominoes.length;
        for (let i = 0; i < dominoes.length; i++) {
            if (result[result.length - 1][1] == dominoes[i][0] && result[result.length - 1][0] != dominoes[i][1]) {
                result[result.length] = dominoes[i];
                dominoes.splice(i, 1);
            } else if (result[result.length - 1][1] == dominoes[i][1] && result[result.length - 1][0] != dominoes[i][1]) {
                result[result.length] = dominoes[i].reverse();
                dominoes.splice(i, 1);
            }
        }
    };

    return !dominoes.length;
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
    return nums.reduce(
        function (acc, elem, index) {
            if (acc.length > 0) {
                const last = acc[acc.length - 1].split('-');
                if (last.length > 1) {
                    if (elem - parseInt(last[1]) < 2) {
                        acc.pop();
                        acc.push(`${last[0]}-${elem}`);
                        return acc;
                    }
                }

                if (acc.length > 1) {
                    const beforeLast = acc[acc.length - 2];
                    if (beforeLast.split('-').length == 1 && elem - parseInt(beforeLast) == 2) {
                        acc.pop();
                        acc.push(`${acc.pop()}-${elem}`);
                        return acc;
                    }
                }
            }
            acc.push(elem.toString());
            return acc;
        }, []).toString();
}

module.exports = {
    createCompassPoints : createCompassPoints,
    expandBraces : expandBraces,
    getZigZagMatrix : getZigZagMatrix,
    canDominoesMakeRow : canDominoesMakeRow,
    extractRanges : extractRanges
};
