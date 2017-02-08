export declare class SpellCheck {
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
    sift4(s1: string, s2: string, maxOffset: any, options?: any): any;
}
