export class SpellCheck {
    /**
  * Sift4 - extended version
  * online algorithm to compute the distance between two strings in O(n)
  * maxOffset is the number of positions to search for matching tokens
  * - options: the options for the function, allowing for customization of the scope and algorithm:
  * - maxDistance: the distance at which the algorithm should stop computing the value and just exit (the strings are too different anyway)
  * - tokenizer: a function to transform strings into vectors of tokens
  * - tokenMatcher: a function to determine if two tokens are matching (equal)
  * - matchingEvaluator: a function to determine the way a token match should be added to the local_cs. For example a fuzzy match could be implemented.
  * - localLengthEvaluator: a function to determine the way the local_cs value is added to the lcss. For example longer continuous substrings could be awarded.
  * - transpositionCostEvaluator: a function to determine the value of an individual transposition. For example longer transpositions should have a higher cost.
  * - transpositionsEvaluator: a function to determine the way the total cost of transpositions affects the final result
  * the options can and should be implemented at a class level, but this is the demo algorithm
  */
    sift4(s1: string, s2: string, maxOffset, options?) {

        options = extend(options, {
            maxDistance: null,
            tokenizer: function (s) { return s ? s.split('') : []; },
            tokenMatcher: function (t1, t2) { return t1 == t2; },
            matchingEvaluator: function (t1, t2) { return 1; },
            localLengthEvaluator: function (local_cs) { return local_cs; },
            transpositionCostEvaluator: function (c1, c2) { return 1; },
            transpositionsEvaluator: function (lcss, trans) { return lcss - trans; }
        });

        let t1 = options.tokenizer(s1);
        let t2 = options.tokenizer(s2);

        let l1 = t1.length;
        let l2 = t2.length;

        if (l1 == 0) return l2;
        if (l2 == 0) return l1;

        let c1 = 0;  //cursor for string 1
        let c2 = 0;  //cursor for string 2
        let lcss = 0;  //largest common subsequence
        let local_cs = 0; //local common substring
        let trans = 0;  //number of transpositions ('ab' vs 'ba')
        let offset_arr = [];  //offset pair array, for computing the transpositions

        while ((c1 < l1) && (c2 < l2)) {
            if (options.tokenMatcher(t1[c1], t2[c2])) {
                local_cs += options.matchingEvaluator(t1[c1], t2[c2]);
                let isTrans = false;
                //see if current match is a transposition
                let i = 0;
                while (i < offset_arr.length) {
                    let ofs = offset_arr[i];
                    if (c1 <= ofs.c1 || c2 <= ofs.c2) {
                        // when two matches cross, the one considered a transposition is the one with the largest difference in offsets
                        isTrans = Math.abs(c2 - c1) >= Math.abs(ofs.c2 - ofs.c1);
                        if (isTrans) {
                            trans += options.transpositionCostEvaluator(c1, c2);
                        } else {
                            if (!ofs.trans) {
                                ofs.trans = true;
                                trans += options.transpositionCostEvaluator(ofs.c1, ofs.c2);
                            }
                        }
                        break;
                    } else {
                        if (c1 > ofs.c2 && c2 > ofs.c1) {
                            offset_arr.splice(i, 1);
                        } else {
                            i++;
                        }
                    }
                }
                offset_arr.push({
                    c1: c1,
                    c2: c2,
                    trans: isTrans
                });
            } else {
                lcss += options.localLengthEvaluator(local_cs);
                local_cs = 0;
                if (c1 != c2) {
                    c1 = c2 = Math.min(c1, c2);  //using min allows the computation of transpositions
                }
                //if matching tokens are found, remove 1 from both cursors (they get incremented at the end of the loop)
                //so that we can have only one code block handling matches 
                for (let i = 0; i < maxOffset && (c1 + i < l1 || c2 + i < l2); i++) {
                    if ((c1 + i < l1) && options.tokenMatcher(t1[c1 + i], t2[c2])) {
                        c1 += i - 1;
                        c2--;
                        break;
                    }
                    if ((c2 + i < l2) && options.tokenMatcher(t1[c1], t2[c2 + i])) {
                        c1--;
                        c2 += i - 1;
                        break;
                    }
                }
            }
            c1++;
            c2++;
            if (options.maxDistance) {
                let temporaryDistance = options.localLengthEvaluator(Math.max(c1, c2)) - options.transpositionsEvaluator(lcss, trans);
                if (temporaryDistance >= options.maxDistance) return Math.round(temporaryDistance);
            }
            // this covers the case where the last match is on the last token in list, so that it can compute transpositions correctly
            if ((c1 >= l1) || (c2 >= l2)) {
                lcss += options.localLengthEvaluator(local_cs);
                local_cs = 0;
                c1 = c2 = Math.min(c1, c2);
            }
        }
        lcss += options.localLengthEvaluator(local_cs);
        return Math.round(options.localLengthEvaluator(Math.max(l1, l2)) - options.transpositionsEvaluator(lcss, trans)); //add the cost of found transpositions
        function extend(obj, def) {
            let result = {};
            for (let prop in def) {
                if (!obj || !obj.hasOwnProperty(prop)) {
                    result[prop] = def[prop];
                } else {
                    result[prop] = obj[prop];
                }
            }
            return result;
        }
    }

}