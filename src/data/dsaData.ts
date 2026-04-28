export interface Problem {
  id: string;
  slug: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  youtubeUrl?: string;
  leetcodeUrl?: string;
  codeforcesUrl?: string;
  articleUrl?: string;
  tags: string[];
  order: number;
}

export interface Topic {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  problems: Problem[];
}

export const topics: Topic[] = [
  {
    id: 't1',
    slug: 'arrays',
    title: 'Arrays & Strings',
    description: 'Sequential data fundamentals — two pointers, sliding window, hashing',
    icon: '📦',
    order: 1,
    problems: [
      { id: 'p1', slug: 'two-sum', title: 'Two Sum', difficulty: 'Easy', youtubeUrl: 'https://youtube.com/watch?v=KLlXCFG5TnA', leetcodeUrl: 'https://leetcode.com/problems/two-sum/', articleUrl: 'https://geeksforgeeks.org/two-sum-problem/', tags: ['Hash Map', 'Array'], order: 1 },
      { id: 'p2', slug: 'best-time-to-buy-sell-stock', title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', youtubeUrl: 'https://youtube.com/watch?v=1pkOgXD63yU', leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', articleUrl: 'https://geeksforgeeks.org/best-time-to-buy-and-sell-stock/', tags: ['Array', 'DP'], order: 2 },
      { id: 'p3', slug: 'contains-duplicate', title: 'Contains Duplicate', difficulty: 'Easy', youtubeUrl: 'https://youtube.com/watch?v=3OamzN90kPg', leetcodeUrl: 'https://leetcode.com/problems/contains-duplicate/', articleUrl: 'https://geeksforgeeks.org/check-array-contains-duplicates/', tags: ['Hash Map', 'Array'], order: 3 },
      { id: 'p4', slug: 'product-of-array-except-self', title: 'Product of Array Except Self', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=bNvIQ372iOw', leetcodeUrl: 'https://leetcode.com/problems/product-of-array-except-self/', articleUrl: 'https://geeksforgeeks.org/product-array-puzzle-set-2-o1-space/', tags: ['Array', 'Prefix Sum'], order: 4 },
      { id: 'p5', slug: 'maximum-subarray', title: 'Maximum Subarray (Kadane\'s)', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=5WZl3MMT0Eg', leetcodeUrl: 'https://leetcode.com/problems/maximum-subarray/', articleUrl: 'https://geeksforgeeks.org/largest-sum-contiguous-subarray/', tags: ['Array', 'DP'], order: 5 },
      { id: 'p6', slug: 'maximum-product-subarray', title: 'Maximum Product Subarray', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=lN3D1QAhCXE', leetcodeUrl: 'https://leetcode.com/problems/maximum-product-subarray/', tags: ['Array', 'DP'], order: 6 },
      { id: 'p7', slug: 'find-minimum-in-rotated-sorted-array', title: 'Find Minimum in Rotated Sorted Array', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=nIVW4P8b1VA', leetcodeUrl: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', tags: ['Array', 'Binary Search'], order: 7 },
      { id: 'p8', slug: 'search-in-rotated-sorted-array', title: 'Search in Rotated Sorted Array', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=U8XENwh8Oy8', leetcodeUrl: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', tags: ['Array', 'Binary Search'], order: 8 },
      { id: 'p9', slug: '3sum', title: '3Sum', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=jzZsG8n2R9A', leetcodeUrl: 'https://leetcode.com/problems/3sum/', articleUrl: 'https://geeksforgeeks.org/find-a-triplet-that-sum-to-a-given-value/', tags: ['Array', 'Two Pointers'], order: 9 },
      { id: 'p10', slug: 'container-with-most-water', title: 'Container With Most Water', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=UuiTKBwPgAo', leetcodeUrl: 'https://leetcode.com/problems/container-with-most-water/', tags: ['Array', 'Two Pointers', 'Greedy'], order: 10 },
    ],
  },
  {
    id: 't2',
    slug: 'linked-list',
    title: 'Linked List',
    description: 'Pointers, nodes, and list manipulation techniques',
    icon: '🔗',
    order: 2,
    problems: [
      { id: 'p11', slug: 'reverse-linked-list', title: 'Reverse Linked List', difficulty: 'Easy', youtubeUrl: 'https://youtube.com/watch?v=G0_I-ZF0S38', leetcodeUrl: 'https://leetcode.com/problems/reverse-linked-list/', articleUrl: 'https://geeksforgeeks.org/reverse-a-linked-list/', tags: ['Linked List', 'Recursion'], order: 1 },
      { id: 'p12', slug: 'merge-two-sorted-lists', title: 'Merge Two Sorted Lists', difficulty: 'Easy', youtubeUrl: 'https://youtube.com/watch?v=XIdigk956u0', leetcodeUrl: 'https://leetcode.com/problems/merge-two-sorted-lists/', tags: ['Linked List', 'Recursion'], order: 2 },
      { id: 'p13', slug: 'linked-list-cycle', title: 'Linked List Cycle', difficulty: 'Easy', youtubeUrl: 'https://youtube.com/watch?v=gBTe7lFR3vc', leetcodeUrl: 'https://leetcode.com/problems/linked-list-cycle/', articleUrl: 'https://geeksforgeeks.org/detect-loop-in-a-linked-list/', tags: ['Linked List', 'Two Pointers'], order: 3 },
      { id: 'p14', slug: 'middle-of-linked-list', title: 'Middle of the Linked List', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/middle-of-the-linked-list/', tags: ['Linked List', 'Two Pointers'], order: 4 },
      { id: 'p15', slug: 'remove-nth-node-from-end', title: 'Remove Nth Node From End of List', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=XVuQxVej6y8', leetcodeUrl: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/', tags: ['Linked List', 'Two Pointers'], order: 5 },
      { id: 'p16', slug: 'add-two-numbers', title: 'Add Two Numbers', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=LBVsXSMkhIc', leetcodeUrl: 'https://leetcode.com/problems/add-two-numbers/', tags: ['Linked List', 'Math', 'Recursion'], order: 6 },
      { id: 'p17', slug: 'odd-even-linked-list', title: 'Odd Even Linked List', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=CtaaM7JFwaI', leetcodeUrl: 'https://leetcode.com/problems/odd-even-linked-list/', tags: ['Linked List'], order: 7 },
      { id: 'p18', slug: 'merge-k-sorted-lists', title: 'Merge K Sorted Lists', difficulty: 'Hard', youtubeUrl: 'https://youtube.com/watch?v=q5a5OiGbT6Q', leetcodeUrl: 'https://leetcode.com/problems/merge-k-sorted-lists/', tags: ['Linked List', 'Heap', 'Divide and Conquer'], order: 8 },
    ],
  },
  {
    id: 't3',
    slug: 'stacks-queues',
    title: 'Stacks & Queues',
    description: 'LIFO and FIFO data structures and their applications',
    icon: '📚',
    order: 3,
    problems: [
      { id: 'p19', slug: 'valid-parentheses', title: 'Valid Parentheses', difficulty: 'Easy', youtubeUrl: 'https://youtube.com/watch?v=WTzjT7NDJgk', leetcodeUrl: 'https://leetcode.com/problems/valid-parentheses/', articleUrl: 'https://geeksforgeeks.org/check-for-balanced-parentheses-in-an-expression/', tags: ['Stack', 'String'], order: 1 },
      { id: 'p20', slug: 'min-stack', title: 'Min Stack', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=qkLl-0Ve2ag', leetcodeUrl: 'https://leetcode.com/problems/min-stack/', tags: ['Stack', 'Design'], order: 2 },
      { id: 'p21', slug: 'evaluate-reverse-polish-notation', title: 'Evaluate Reverse Polish Notation', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=iu0082c4HDE', leetcodeUrl: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/', tags: ['Stack', 'Array'], order: 3 },
      { id: 'p22', slug: 'daily-temperatures', title: 'Daily Temperatures', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=cTBiBSnjO3c', leetcodeUrl: 'https://leetcode.com/problems/daily-temperatures/', tags: ['Stack', 'Array', 'Monotonic Stack'], order: 4 },
      { id: 'p23', slug: 'largest-rectangle-in-histogram', title: 'Largest Rectangle in Histogram', difficulty: 'Hard', youtubeUrl: 'https://youtube.com/watch?v=zx5Sw9Z0Zzo', leetcodeUrl: 'https://leetcode.com/problems/largest-rectangle-in-histogram/', tags: ['Stack', 'Array', 'Monotonic Stack'], order: 5 },
      { id: 'p24', slug: 'implement-queue-using-stacks', title: 'Implement Queue using Stacks', difficulty: 'Easy', youtubeUrl: 'https://youtube.com/watch?v=Sa3EY55dU8I', leetcodeUrl: 'https://leetcode.com/problems/implement-queue-using-stacks/', tags: ['Stack', 'Queue', 'Design'], order: 6 },
    ],
  },
  {
    id: 't4',
    slug: 'trees',
    title: 'Trees & BST',
    description: 'Hierarchical data structures — traversals, BST operations, balanced trees',
    icon: '🌳',
    order: 4,
    problems: [
      { id: 'p25', slug: 'maximum-depth-of-binary-tree', title: 'Maximum Depth of Binary Tree', difficulty: 'Easy', youtubeUrl: 'https://youtube.com/watch?v=hTM3phVI6YQ', leetcodeUrl: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', tags: ['Tree', 'DFS', 'Recursion'], order: 1 },
      { id: 'p26', slug: 'same-tree', title: 'Same Tree', difficulty: 'Easy', youtubeUrl: 'https://youtube.com/watch?v=vRbbcKXCxOw', leetcodeUrl: 'https://leetcode.com/problems/same-tree/', tags: ['Tree', 'DFS', 'BFS'], order: 2 },
      { id: 'p27', slug: 'invert-binary-tree', title: 'Invert Binary Tree', difficulty: 'Easy', youtubeUrl: 'https://youtube.com/watch?v=OnSnLXgl6pg', leetcodeUrl: 'https://leetcode.com/problems/invert-binary-tree/', tags: ['Tree', 'DFS', 'BFS'], order: 3 },
      { id: 'p28', slug: 'binary-tree-level-order-traversal', title: 'Binary Tree Level Order Traversal', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=6ZnyEApgFYg', leetcodeUrl: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', tags: ['Tree', 'BFS'], order: 4 },
      { id: 'p29', slug: 'validate-binary-search-tree', title: 'Validate Binary Search Tree', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=s6ATEkipzow', leetcodeUrl: 'https://leetcode.com/problems/validate-binary-search-tree/', tags: ['Tree', 'DFS', 'BST'], order: 5 },
      { id: 'p30', slug: 'lowest-common-ancestor-of-bst', title: 'Lowest Common Ancestor of a BST', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=gs2LMfuOR9k', leetcodeUrl: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/', tags: ['Tree', 'BST', 'DFS'], order: 6 },
      { id: 'p31', slug: 'construct-bt-from-preorder-inorder', title: 'Construct BT from Preorder and Inorder', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=ihj4IQGZmzc', leetcodeUrl: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/', tags: ['Tree', 'Array', 'DFS'], order: 7 },
      { id: 'p32', slug: 'binary-tree-maximum-path-sum', title: 'Binary Tree Maximum Path Sum', difficulty: 'Hard', youtubeUrl: 'https://youtube.com/watch?v=Hr5cWUld4vU', leetcodeUrl: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/', tags: ['Tree', 'DFS', 'DP'], order: 8 },
      { id: 'p33', slug: 'serialize-deserialize-binary-tree', title: 'Serialize and Deserialize Binary Tree', difficulty: 'Hard', youtubeUrl: 'https://youtube.com/watch?v=u4JAi2JJhI8', leetcodeUrl: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/', tags: ['Tree', 'DFS', 'BFS', 'Design'], order: 9 },
    ],
  },
  {
    id: 't5',
    slug: 'graphs',
    title: 'Graphs',
    description: 'BFS, DFS, topological sort, shortest paths, union-find',
    icon: '🕸️',
    order: 5,
    problems: [
      { id: 'p34', slug: 'number-of-islands', title: 'Number of Islands', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=pV2kpPD66nE', leetcodeUrl: 'https://leetcode.com/problems/number-of-islands/', articleUrl: 'https://geeksforgeeks.org/find-number-of-islands/', tags: ['Graph', 'DFS', 'BFS', 'Union-Find'], order: 1 },
      { id: 'p35', slug: 'clone-graph', title: 'Clone Graph', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=mQeF6bN8h-k', leetcodeUrl: 'https://leetcode.com/problems/clone-graph/', tags: ['Graph', 'DFS', 'BFS'], order: 2 },
      { id: 'p36', slug: 'course-schedule', title: 'Course Schedule', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=EUDwWbmtM2Q', leetcodeUrl: 'https://leetcode.com/problems/course-schedule/', tags: ['Graph', 'Topological Sort', 'DFS'], order: 3 },
      { id: 'p37', slug: 'pacific-atlantic-water-flow', title: 'Pacific Atlantic Water Flow', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=s-VkcjHqkGI', leetcodeUrl: 'https://leetcode.com/problems/pacific-atlantic-water-flow/', tags: ['Graph', 'DFS', 'BFS'], order: 4 },
      { id: 'p38', slug: 'number-of-connected-components', title: 'Number of Connected Components', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=8f1NPm4W2cY', leetcodeUrl: 'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/', tags: ['Graph', 'DFS', 'Union-Find'], order: 5 },
      { id: 'p39', slug: 'graph-valid-tree', title: 'Graph Valid Tree', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=bXsUuownnoQ', leetcodeUrl: 'https://leetcode.com/problems/graph-valid-tree/', tags: ['Graph', 'Union-Find', 'DFS'], order: 6 },
      { id: 'p40', slug: 'word-ladder', title: 'Word Ladder', difficulty: 'Hard', youtubeUrl: 'https://youtube.com/watch?v=h9iTnkgv5HE', leetcodeUrl: 'https://leetcode.com/problems/word-ladder/', tags: ['Graph', 'BFS', 'Hash Map'], order: 7 },
      { id: 'p41', slug: 'alien-dictionary', title: 'Alien Dictionary', difficulty: 'Hard', youtubeUrl: 'https://youtube.com/watch?v=6kTZYvNNpsi', leetcodeUrl: 'https://leetcode.com/problems/alien-dictionary/', tags: ['Graph', 'Topological Sort'], order: 8 },
    ],
  },
  {
    id: 't6',
    slug: 'dynamic-programming',
    title: 'Dynamic Programming',
    description: 'Optimal substructure and overlapping subproblems — memoization & tabulation',
    icon: '⚡',
    order: 6,
    problems: [
      { id: 'p42', slug: 'climbing-stairs', title: 'Climbing Stairs', difficulty: 'Easy', youtubeUrl: 'https://youtube.com/watch?v=Y0lT9Fck7qI', leetcodeUrl: 'https://leetcode.com/problems/climbing-stairs/', articleUrl: 'https://geeksforgeeks.org/count-ways-reach-nth-stair/', tags: ['DP', 'Math'], order: 1 },
      { id: 'p43', slug: 'coin-change', title: 'Coin Change', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=H9bfqoz5qsE', leetcodeUrl: 'https://leetcode.com/problems/coin-change/', articleUrl: 'https://geeksforgeeks.org/coin-change-dp-7/', tags: ['DP', 'BFS'], order: 2 },
      { id: 'p44', slug: 'longest-increasing-subsequence', title: 'Longest Increasing Subsequence', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=cjWnW0hdF1Y', leetcodeUrl: 'https://leetcode.com/problems/longest-increasing-subsequence/', tags: ['DP', 'Binary Search'], order: 3 },
      { id: 'p45', slug: 'word-break', title: 'Word Break', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=Sx9NNgInc3A', leetcodeUrl: 'https://leetcode.com/problems/word-break/', tags: ['DP', 'Hash Map', 'Trie'], order: 4 },
      { id: 'p46', slug: 'combination-sum', title: 'Combination Sum', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=GBKI9VSKdGg', leetcodeUrl: 'https://leetcode.com/problems/combination-sum/', tags: ['DP', 'Backtracking'], order: 5 },
      { id: 'p47', slug: 'house-robber', title: 'House Robber', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=73r3KWiEvyk', leetcodeUrl: 'https://leetcode.com/problems/house-robber/', tags: ['DP'], order: 6 },
      { id: 'p48', slug: 'house-robber-ii', title: 'House Robber II', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=mFT2bIFKUFE', leetcodeUrl: 'https://leetcode.com/problems/house-robber-ii/', tags: ['DP'], order: 7 },
      { id: 'p49', slug: 'decode-ways', title: 'Decode Ways', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=6aEyTjOwlJU', leetcodeUrl: 'https://leetcode.com/problems/decode-ways/', tags: ['DP', 'String'], order: 8 },
      { id: 'p50', slug: 'unique-paths', title: 'Unique Paths', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=IlEsdxuD4lY', leetcodeUrl: 'https://leetcode.com/problems/unique-paths/', tags: ['DP', 'Math', 'Combinatorics'], order: 9 },
    ],
  },
  {
    id: 't7',
    slug: 'binary-search',
    title: 'Binary Search',
    description: 'Divide and conquer search on sorted data and answer spaces',
    icon: '🔍',
    order: 7,
    problems: [
      { id: 'p51', slug: 'binary-search', title: 'Binary Search', difficulty: 'Easy', youtubeUrl: 'https://youtube.com/watch?v=s4DPM8ct1pI', leetcodeUrl: 'https://leetcode.com/problems/binary-search/', tags: ['Binary Search'], order: 1 },
      { id: 'p52', slug: 'search-insert-position', title: 'Search Insert Position', difficulty: 'Easy', youtubeUrl: 'https://youtube.com/watch?v=K-RYzD3kSXI', leetcodeUrl: 'https://leetcode.com/problems/search-insert-position/', tags: ['Binary Search', 'Array'], order: 2 },
      { id: 'p53', slug: 'find-first-last-position-element-sorted-array', title: 'Find First and Last Position in Sorted Array', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=4LHDkhS2RnU', leetcodeUrl: 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/', tags: ['Binary Search', 'Array'], order: 3 },
      { id: 'p54', slug: 'search-in-rotated-sorted-array-ii', title: 'Search in Rotated Sorted Array II', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=w2GvbaDmMEM', leetcodeUrl: 'https://leetcode.com/problems/search-in-rotated-sorted-array-ii/', tags: ['Binary Search', 'Array'], order: 4 },
      { id: 'p55', slug: 'find-peak-element', title: 'Find Peak Element', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=cXxmbomS0Qg', leetcodeUrl: 'https://leetcode.com/problems/find-peak-element/', tags: ['Binary Search', 'Array'], order: 5 },
      { id: 'p56', slug: 'koko-eating-bananas', title: 'Koko Eating Bananas', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=U2SozAs9RzA', leetcodeUrl: 'https://leetcode.com/problems/koko-eating-bananas/', tags: ['Binary Search'], order: 6 },
    ],
  },
  {
    id: 't8',
    slug: 'sorting',
    title: 'Sorting Algorithms',
    description: 'Comparison-based and non-comparison sorting techniques',
    icon: '📊',
    order: 8,
    problems: [
      { id: 'p57', slug: 'sort-an-array', title: 'Sort an Array (Merge Sort)', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=TzeBrDU-JaY', leetcodeUrl: 'https://leetcode.com/problems/sort-an-array/', tags: ['Sorting', 'Merge Sort', 'Divide and Conquer'], order: 1 },
      { id: 'p58', slug: 'sort-colors', title: 'Sort Colors (Dutch National Flag)', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=oaVa-9wmpns', leetcodeUrl: 'https://leetcode.com/problems/sort-colors/', tags: ['Sorting', 'Two Pointers'], order: 2 },
      { id: 'p59', slug: 'top-k-frequent-elements', title: 'Top K Frequent Elements', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=YPTqKIgVk-k', leetcodeUrl: 'https://leetcode.com/problems/top-k-frequent-elements/', tags: ['Sorting', 'Heap', 'Hash Map'], order: 3 },
      { id: 'p60', slug: 'k-closest-points-to-origin', title: 'K Closest Points to Origin', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=rI2EBUEMfVk', leetcodeUrl: 'https://leetcode.com/problems/k-closest-points-to-origin/', tags: ['Sorting', 'Heap', 'Divide and Conquer'], order: 4 },
      { id: 'p61', slug: 'merge-intervals', title: 'Merge Intervals', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=44H3cEC2fFM', leetcodeUrl: 'https://leetcode.com/problems/merge-intervals/', articleUrl: 'https://geeksforgeeks.org/merging-intervals/', tags: ['Sorting', 'Array'], order: 5 },
    ],
  },
  {
    id: 't9',
    slug: 'heaps',
    title: 'Heaps & Priority Queue',
    description: 'Min/max heaps for top-K, median, and scheduling problems',
    icon: '🏔️',
    order: 9,
    problems: [
      { id: 'p62', slug: 'kth-largest-element-in-a-stream', title: 'Kth Largest Element in a Stream', difficulty: 'Easy', youtubeUrl: 'https://youtube.com/watch?v=hOochyZsLwY', leetcodeUrl: 'https://leetcode.com/problems/kth-largest-element-in-a-stream/', tags: ['Heap', 'Design'], order: 1 },
      { id: 'p63', slug: 'last-stone-weight', title: 'Last Stone Weight', difficulty: 'Easy', youtubeUrl: 'https://youtube.com/watch?v=B-QCq79-VW4', leetcodeUrl: 'https://leetcode.com/problems/last-stone-weight/', tags: ['Heap', 'Priority Queue'], order: 2 },
      { id: 'p64', slug: 'kth-largest-element-in-an-array', title: 'Kth Largest Element in an Array', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=XEmy13g1Qxc', leetcodeUrl: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', tags: ['Heap', 'Quick Select'], order: 3 },
      { id: 'p65', slug: 'find-median-from-data-stream', title: 'Find Median from Data Stream', difficulty: 'Hard', youtubeUrl: 'https://youtube.com/watch?v=itmhHWaHupI', leetcodeUrl: 'https://leetcode.com/problems/find-median-from-data-stream/', tags: ['Heap', 'Design', 'Two Pointers'], order: 4 },
      { id: 'p66', slug: 'task-scheduler', title: 'Task Scheduler', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=s8p8ukTyA2I', leetcodeUrl: 'https://leetcode.com/problems/task-scheduler/', tags: ['Heap', 'Greedy', 'Queue'], order: 5 },
    ],
  },
  {
    id: 't10',
    slug: 'tries',
    title: 'Tries',
    description: 'Prefix trees for string search, autocomplete, and word games',
    icon: '🌲',
    order: 10,
    problems: [
      { id: 'p67', slug: 'implement-trie-prefix-tree', title: 'Implement Trie (Prefix Tree)', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=oobqoCJlHA0', leetcodeUrl: 'https://leetcode.com/problems/implement-trie-prefix-tree/', tags: ['Trie', 'Design', 'String'], order: 1 },
      { id: 'p68', slug: 'design-add-and-search-words', title: 'Design Add and Search Words Data Structure', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=BTf05gs_8jU', leetcodeUrl: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/', tags: ['Trie', 'DFS', 'Design'], order: 2 },
      { id: 'p69', slug: 'word-search-ii', title: 'Word Search II', difficulty: 'Hard', youtubeUrl: 'https://youtube.com/watch?v=asbcE9mZz_U', leetcodeUrl: 'https://leetcode.com/problems/word-search-ii/', tags: ['Trie', 'DFS', 'Backtracking'], order: 3 },
      { id: 'p70', slug: 'longest-word-in-dictionary', title: 'Longest Word in Dictionary', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=YXwedjJHRQg', leetcodeUrl: 'https://leetcode.com/problems/longest-word-in-dictionary/', tags: ['Trie', 'Hash Map', 'Sorting'], order: 4 },
    ],
  },
  {
    id: 't11',
    slug: 'backtracking',
    title: 'Backtracking',
    description: 'Systematic trial-and-error for constraint satisfaction problems',
    icon: '🔄',
    order: 11,
    problems: [
      { id: 'p71', slug: 'subsets', title: 'Subsets', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=REOH22XwkkE', leetcodeUrl: 'https://leetcode.com/problems/subsets/', tags: ['Backtracking', 'Bit Manipulation'], order: 1 },
      { id: 'p72', slug: 'combination-sum-ii', title: 'Combination Sum II', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=rSA3t6BDFwg', leetcodeUrl: 'https://leetcode.com/problems/combination-sum-ii/', tags: ['Backtracking', 'Array'], order: 2 },
      { id: 'p73', slug: 'permutations', title: 'Permutations', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=s7AvT7cGdSo', leetcodeUrl: 'https://leetcode.com/problems/permutations/', tags: ['Backtracking', 'Array'], order: 3 },
      { id: 'p74', slug: 'word-search', title: 'Word Search', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=pfiQ_PS1g8E', leetcodeUrl: 'https://leetcode.com/problems/word-search/', tags: ['Backtracking', 'DFS', 'Array'], order: 4 },
      { id: 'p75', slug: 'palindrome-partitioning', title: 'Palindrome Partitioning', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=3jvWodd7ht0', leetcodeUrl: 'https://leetcode.com/problems/palindrome-partitioning/', tags: ['Backtracking', 'String'], order: 5 },
      { id: 'p76', slug: 'n-queens', title: 'N-Queens', difficulty: 'Hard', youtubeUrl: 'https://youtube.com/watch?v=Ph95IHmRp5M', leetcodeUrl: 'https://leetcode.com/problems/n-queens/', tags: ['Backtracking'], order: 6 },
    ],
  },
  {
    id: 't12',
    slug: 'two-pointers',
    title: 'Two Pointers & Sliding Window',
    description: 'Efficient linear traversal with dual pointers and windowed views',
    icon: '👉',
    order: 12,
    problems: [
      { id: 'p77', slug: 'valid-palindrome', title: 'Valid Palindrome', difficulty: 'Easy', youtubeUrl: 'https://youtube.com/watch?v=jJXJRLpmoGg', leetcodeUrl: 'https://leetcode.com/problems/valid-palindrome/', tags: ['Two Pointers', 'String'], order: 1 },
      { id: 'p78', slug: 'two-sum-ii-input-array-is-sorted', title: 'Two Sum II - Input Array Is Sorted', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=cQ1Oz4ckceM', leetcodeUrl: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/', tags: ['Two Pointers', 'Binary Search'], order: 2 },
      { id: 'p79', slug: '3sum-closest', title: '3Sum Closest', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=qBr2hqz0VJE', leetcodeUrl: 'https://leetcode.com/problems/3sum-closest/', tags: ['Two Pointers', 'Sorting'], order: 3 },
      { id: 'p80', slug: 'longest-substring-without-repeating', title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=wiGpQwVHdE0', leetcodeUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', tags: ['Sliding Window', 'Hash Map'], order: 4 },
      { id: 'p81', slug: 'minimum-window-substring', title: 'Minimum Window Substring', difficulty: 'Hard', youtubeUrl: 'https://youtube.com/watch?v=jSto0O9AJbU', leetcodeUrl: 'https://leetcode.com/problems/minimum-window-substring/', tags: ['Sliding Window', 'Hash Map', 'Two Pointers'], order: 5 },
      { id: 'p82', slug: 'longest-repeating-character-replacement', title: 'Longest Repeating Character Replacement', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=gqXU1UyA8pk', leetcodeUrl: 'https://leetcode.com/problems/longest-repeating-character-replacement/', tags: ['Sliding Window', 'Hash Map'], order: 6 },
    ],
  },
  {
    id: 't13',
    slug: 'bit-manipulation',
    title: 'Bit Manipulation',
    description: 'Binary operations for XOR, masks, and low-level optimization',
    icon: '💡',
    order: 13,
    problems: [
      { id: 'p83', slug: 'single-number', title: 'Single Number', difficulty: 'Easy', youtubeUrl: 'https://youtube.com/watch?v=qMPX1AOa83k', leetcodeUrl: 'https://leetcode.com/problems/single-number/', tags: ['Bit Manipulation'], order: 1 },
      { id: 'p84', slug: 'number-of-1-bits', title: 'Number of 1 Bits', difficulty: 'Easy', youtubeUrl: 'https://youtube.com/watch?v=5Km3utixwZs', leetcodeUrl: 'https://leetcode.com/problems/number-of-1-bits/', tags: ['Bit Manipulation'], order: 2 },
      { id: 'p85', slug: 'reverse-bits', title: 'Reverse Bits', difficulty: 'Easy', youtubeUrl: 'https://youtube.com/watch?v=ZW7stLWzMR0', leetcodeUrl: 'https://leetcode.com/problems/reverse-bits/', tags: ['Bit Manipulation'], order: 3 },
      { id: 'p86', slug: 'counting-bits', title: 'Counting Bits', difficulty: 'Easy', youtubeUrl: 'https://youtube.com/watch?v=RyBM56RIWrM', leetcodeUrl: 'https://leetcode.com/problems/counting-bits/', tags: ['Bit Manipulation', 'DP'], order: 4 },
      { id: 'p87', slug: 'missing-number', title: 'Missing Number', difficulty: 'Easy', youtubeUrl: 'https://youtube.com/watch?v=WnPLyR4ix0Q', leetcodeUrl: 'https://leetcode.com/problems/missing-number/', tags: ['Bit Manipulation', 'Math', 'Array'], order: 5 },
    ],
  },
  {
    id: 't14',
    slug: 'greedy-math',
    title: 'Greedy & Math',
    description: 'Locally optimal choices and mathematical problem-solving',
    icon: '🎯',
    order: 14,
    problems: [
      { id: 'p88', slug: 'jump-game', title: 'Jump Game', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=Yan0cv2S0lg', leetcodeUrl: 'https://leetcode.com/problems/jump-game/', tags: ['Greedy', 'DP'], order: 1 },
      { id: 'p89', slug: 'jump-game-ii', title: 'Jump Game II', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=dJ7sWiOoK7g', leetcodeUrl: 'https://leetcode.com/problems/jump-game-ii/', tags: ['Greedy', 'DP'], order: 2 },
      { id: 'p90', slug: 'gas-station', title: 'Gas Station', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=lJwbPZ3u7s8', leetcodeUrl: 'https://leetcode.com/problems/gas-station/', tags: ['Greedy'], order: 3 },
      { id: 'p91', slug: 'hand-of-straights', title: 'Hand of Straights', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=amnrMCVd2YI', leetcodeUrl: 'https://leetcode.com/problems/hand-of-straights/', tags: ['Greedy', 'Hash Map'], order: 4 },
      { id: 'p92', slug: 'merge-triplets-to-form-target', title: 'Merge Triplets to Form Target', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=kShkQLQPL9E', leetcodeUrl: 'https://leetcode.com/problems/merge-triplets-to-form-target-triplet/', tags: ['Greedy'], order: 5 },
      { id: 'p93', slug: 'partition-labels', title: 'Partition Labels', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=B7m8UmZE-vw', leetcodeUrl: 'https://leetcode.com/problems/partition-labels/', tags: ['Greedy', 'Hash Map', 'Two Pointers'], order: 6 },
      { id: 'p94', slug: 'valid-parenthesis-string', title: 'Valid Parenthesis String', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=QhPdNS143Qg', leetcodeUrl: 'https://leetcode.com/problems/valid-parenthesis-string/', tags: ['Greedy', 'String'], order: 7 },
      { id: 'p95', slug: 'robot-bounded-in-circle', title: 'Robot Bounded In Circle', difficulty: 'Medium', youtubeUrl: 'https://youtube.com/watch?v=nKvlLfbOboI', leetcodeUrl: 'https://leetcode.com/problems/robot-bounded-in-circle/', tags: ['Math', 'Simulation'], order: 8 },
    ],
  },
];

export function getAllProblems(): Problem[] {
  return topics.flatMap(t => t.problems);
}

export function getProblemCounts() {
  const all = getAllProblems();
  return {
    total: all.length,
    easy: all.filter(p => p.difficulty === 'Easy').length,
    medium: all.filter(p => p.difficulty === 'Medium').length,
    hard: all.filter(p => p.difficulty === 'Hard').length,
  };
}
