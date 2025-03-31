"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadIcon, File, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function Upload() {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const sampleReponse = {
    audio_path: "outputs/1. Hash Tables Size.mp3",
    message: "Processing successful",
    notes:
      "# Lecture Notes on Hash Tables and Collision Handling\n\n## Introduction\n- The lecture focuses on the performance of hash tables, especially regarding the size of the table and methods for handling collisions.\n- Key figure: Donald Luth, known as the father of the analysis of algorithms.\n\n## Key Concepts\n\n### Hash Tables\n- **Definition**: A data structure that maps keys to values, allowing for efficient data retrieval.\n- **Collision Handling**: Occurs when multiple keys hash to the same index. Two primary methods are used for managing collisions:\n  - **Open Addressing**\n    - Method: Elements are stored directly in the array.\n    - Probing strategy: Finding the next available slot.\n    - Limitation: The number of elements can’t exceed the size of the array.\n  - **Chaining**\n    - Method: Each position in the array contains a linked list of entries that hash to that index.\n    - Expansion: The number of elements stored can exceed the size of the array, as each slot in the array can hold multiple entries through linked lists.\n\n### Load Factor\n- **Definition**: Ratio of the number of stored elements \\( n \\) to the size of the hash table \\( m \\).\n  - \\( \\text{Load Factor} (L) = \\frac{n}{m} \\)\n- Significance:\n  - For open addressing, \\( L \\) must remain below 1 to ensure no collisions exceed the storage capacity.\n  - For chaining, \\( L \\) can be greater than 1 but should still be controlled to maintain performance.\n\n### Expected Number of Comparisons\n- For **Open Addressing with Linear Probing**:\n  - A simplified formula for expected number of comparisons when searching for an element:\n    - If \\( L \\) (load factor) approaches 0, comparisons approach 1.\n    - As \\( L \\) approaches 1, the number of comparisons can approach infinity.\n- For **Chaining**:\n  - Expected number of comparisons for a successful search is calculated as:\n    - \\( \\text{Comparisons} = 1 + \\frac{L}{2} \\)\n  - This means that if \\( L \\) is the average number of items per linked list, one probe is required to check the index, plus an average traversal of half the linked list.\n\n## Examples\n1. **Performance Comparison**:\n   - If the load factor \\( L \\) is 0 (empty table):\n     - Expected comparisons: 1\n   - If \\( L \\) is 0.9 for open addressing:\n     - Expected comparisons: approximately 5.5\n   - For chaining with the same load factor:\n     - Expected comparisons: approximately 1.5\n\n2. **Open Addressing vs. Chaining**:\n   - With a load factor under 75%, hash tables can offer superior performance over binary search trees (BST) for lookups.\n   - For large datasets, ensuring the load factor is maintained allows for expected constant-time lookups.\n\n### Exercises\n- **Question**: Given a requirement of storing 60,000 values with an average of 2.5 comparisons in a hash table:\n  - For **Open Addressing**: Requires a size of 80,000.\n  - For **Chaining**: Determining the table size involves understanding relationships based on performance expectations.\n- **Answer analysis**:\n  - For chaining, with 60,000 elements and a formula setting 2.5 comparisons, the average load factor will yield a smaller required table size compared to open addressing. \n\n3. **Storage Requirement**:\n   - With chaining: \n     - Size of hash table = 20,000 (for maintaining performance).\n     - Total references required = 140,000 (includes references for linked lists).\n   - With open addressing: \n     - Size of hash table = 80,000.\n\n## Summary\n- **Comparison of Strategies**:\n  - Open addressing is often more memory-efficient but can degrade performance with high load factors.\n  - Chaining remains efficient concerning performance at a cost of greater memory usage.\n- Understanding load factors and designing appropriately sized hash tables can lead to optimal search times and efficient memory usage.\n- Future lectures will explore hash functions and how to effectively map keys to indices in hash tables.\n\n### Key Takeaways\n- Proper load factor management is crucial for maintaining the efficiency of hash tables.\n- The choice between open addressing and chaining should consider both performance and memory constraints.\n- Continuous analysis and adaptation of the hash table size with changing load factors can significantly improve operational efficiency. \n\nThis concludes the lecture notes for the session on hash tables and collision handling. Further exploration will cover hash functions to aid in key indexing within these data structures. Thank you!",
    summary:
      "the formula I give you here is a bit more simplified. this is derived by Donald Luth which by many people is considered to be the father of the analysis of algorithms. now for the training things are a bit simpler right how many probes do I have to do for a search of an element that I know exists I assume it exists in my house table.",
    transcript: {
      language: "en",
      segments: [
        {
          avg_logprob: -0.2826741732083834,
          compression_ratio: 1.536723163841808,
          end: 10,
          id: 0,
          no_speech_prob: 0.09845348447561264,
          seek: 0,
          start: 0,
          temperature: 0,
          text: " Welcome everyone. In this video we will discuss the effect of the size that we use for a",
          tokens: [
            50364, 4027, 1518, 13, 682, 341, 960, 321, 486, 2248, 264, 1802,
            295, 264, 2744, 300, 321, 764, 337, 257, 50864,
          ],
        },
        {
          avg_logprob: -0.2826741732083834,
          compression_ratio: 1.536723163841808,
          end: 18.84,
          id: 1,
          no_speech_prob: 0.09845348447561264,
          seek: 0,
          start: 10,
          temperature: 0,
          text: " stable on its performance. So let me share the slides to begin with. Again in our last class",
          tokens: [
            50864, 8351, 322, 1080, 3389, 13, 407, 718, 385, 2073, 264, 9788,
            281, 1841, 365, 13, 3764, 294, 527, 1036, 1508, 51306,
          ],
        },
        {
          avg_logprob: -0.2826741732083834,
          compression_ratio: 1.536723163841808,
          end: 24.72,
          id: 2,
          no_speech_prob: 0.09845348447561264,
          seek: 0,
          start: 18.84,
          temperature: 0,
          text: " we discussed how can we handle when we have a collision using a stable we discuss two main",
          tokens: [
            51306, 321, 7152, 577, 393, 321, 4813, 562, 321, 362, 257, 24644,
            1228, 257, 8351, 321, 2248, 732, 2135, 51600,
          ],
        },
        {
          avg_logprob: -0.1417401952481051,
          compression_ratio: 1.8262548262548262,
          end: 31.36,
          id: 3,
          no_speech_prob: 0.014447896741330624,
          seek: 2472,
          start: 24.72,
          temperature: 0,
          text: " ways the first one being the open addressing with linear probing or the additional ways we can",
          tokens: [
            50364, 2098, 264, 700, 472, 885, 264, 1269, 14329, 365, 8213, 1239,
            278, 420, 264, 4497, 2098, 321, 393, 50696,
          ],
        },
        {
          avg_logprob: -0.1417401952481051,
          compression_ratio: 1.8262548262548262,
          end: 37.04,
          id: 4,
          no_speech_prob: 0.014447896741330624,
          seek: 2472,
          start: 31.36,
          temperature: 0,
          text: " have to do the probing or the chaining. We discussed what are the pros and cons for each one of them.",
          tokens: [
            50696, 362, 281, 360, 264, 1239, 278, 420, 264, 417, 3686, 13, 492,
            7152, 437, 366, 264, 6267, 293, 1014, 337, 1184, 472, 295, 552, 13,
            50980,
          ],
        },
        {
          avg_logprob: -0.1417401952481051,
          compression_ratio: 1.8262548262548262,
          end: 42.480000000000004,
          id: 5,
          no_speech_prob: 0.014447896741330624,
          seek: 2472,
          start: 37.04,
          temperature: 0,
          text: " Now these three items that I have here as I mentioned in our last class these are the three",
          tokens: [
            50980, 823, 613, 1045, 4754, 300, 286, 362, 510, 382, 286, 2835,
            294, 527, 1036, 1508, 613, 366, 264, 1045, 51252,
          ],
        },
        {
          avg_logprob: -0.1417401952481051,
          compression_ratio: 1.8262548262548262,
          end: 48.16,
          id: 6,
          no_speech_prob: 0.014447896741330624,
          seek: 2472,
          start: 42.480000000000004,
          temperature: 0,
          text: " decision choices we have to think about every time we design a new house table. These three are also",
          tokens: [
            51252, 3537, 7994, 321, 362, 281, 519, 466, 633, 565, 321, 1715,
            257, 777, 1782, 3199, 13, 1981, 1045, 366, 611, 51536,
          ],
        },
        {
          avg_logprob: -0.1417401952481051,
          compression_ratio: 1.8262548262548262,
          end: 53.28,
          id: 7,
          no_speech_prob: 0.014447896741330624,
          seek: 2472,
          start: 49.76,
          temperature: 0,
          text: " interconnected with each other right so the decision we take for one of these three",
          tokens: [
            51616, 36611, 365, 1184, 661, 558, 370, 264, 3537, 321, 747, 337,
            472, 295, 613, 1045, 51792,
          ],
        },
        {
          avg_logprob: -0.13611349948616916,
          compression_ratio: 1.735159817351598,
          end: 60.56,
          id: 8,
          no_speech_prob: 0.0016220479737967253,
          seek: 5328,
          start: 53.92,
          temperature: 0,
          text: " topics here affects how we handle the rest of the decisions for these items here. So are we",
          tokens: [
            50396, 8378, 510, 11807, 577, 321, 4813, 264, 1472, 295, 264, 5327,
            337, 613, 4754, 510, 13, 407, 366, 321, 50728,
          ],
        },
        {
          avg_logprob: -0.13611349948616916,
          compression_ratio: 1.735159817351598,
          end: 66.24000000000001,
          id: 9,
          no_speech_prob: 0.0016220479737967253,
          seek: 5328,
          start: 60.56,
          temperature: 0,
          text: " going to use chaining or open addressing for handling the collisions. The decision about what",
          tokens: [
            50728, 516, 281, 764, 417, 3686, 420, 1269, 14329, 337, 13175, 264,
            46537, 13, 440, 3537, 466, 437, 51012,
          ],
        },
        {
          avg_logprob: -0.13611349948616916,
          compression_ratio: 1.735159817351598,
          end: 71.44,
          id: 10,
          no_speech_prob: 0.0016220479737967253,
          seek: 5328,
          start: 66.24000000000001,
          temperature: 0,
          text: " should be the size of the house table we use that's going to be different based on that decision.",
          tokens: [
            51012, 820, 312, 264, 2744, 295, 264, 1782, 3199, 321, 764, 300,
            311, 516, 281, 312, 819, 2361, 322, 300, 3537, 13, 51272,
          ],
        },
        {
          avg_logprob: -0.13611349948616916,
          compression_ratio: 1.735159817351598,
          end: 76.08,
          id: 11,
          no_speech_prob: 0.0016220479737967253,
          seek: 5328,
          start: 71.44,
          temperature: 0,
          text: " And of course everything depends on a good house function that's what I will discuss on the next",
          tokens: [
            51272, 400, 295, 1164, 1203, 5946, 322, 257, 665, 1782, 2445, 300,
            311, 437, 286, 486, 2248, 322, 264, 958, 51504,
          ],
        },
        {
          avg_logprob: -0.15296746325749222,
          compression_ratio: 1.7399103139013452,
          end: 84.24,
          id: 12,
          no_speech_prob: 0.001562116201967001,
          seek: 7608,
          start: 76.72,
          temperature: 0,
          text: " you can excuse me. So when it comes to the size of the table right if we think about open addressing",
          tokens: [
            50396, 291, 393, 8960, 385, 13, 407, 562, 309, 1487, 281, 264, 2744,
            295, 264, 3199, 558, 498, 321, 519, 466, 1269, 14329, 50772,
          ],
        },
        {
          avg_logprob: -0.15296746325749222,
          compression_ratio: 1.7399103139013452,
          end: 89.92,
          id: 13,
          no_speech_prob: 0.001562116201967001,
          seek: 7608,
          start: 85.44,
          temperature: 0,
          text: " we cannot have more elements in a house table than the actual size of the house table that we're",
          tokens: [
            50832, 321, 2644, 362, 544, 4959, 294, 257, 1782, 3199, 813, 264,
            3539, 2744, 295, 264, 1782, 3199, 300, 321, 434, 51056,
          ],
        },
        {
          avg_logprob: -0.15296746325749222,
          compression_ratio: 1.7399103139013452,
          end: 94.48,
          id: 14,
          no_speech_prob: 0.001562116201967001,
          seek: 7608,
          start: 89.92,
          temperature: 0,
          text: " using because in every location in the area again we store each one of the elements of our data",
          tokens: [
            51056, 1228, 570, 294, 633, 4914, 294, 264, 1859, 797, 321, 3531,
            1184, 472, 295, 264, 4959, 295, 527, 1412, 51284,
          ],
        },
        {
          avg_logprob: -0.15296746325749222,
          compression_ratio: 1.7399103139013452,
          end: 100.8,
          id: 15,
          no_speech_prob: 0.001562116201967001,
          seek: 7608,
          start: 94.48,
          temperature: 0,
          text: " structure. For chaining this is not the case right so if I have chaining again I initialize my",
          tokens: [
            51284, 3877, 13, 1171, 417, 3686, 341, 307, 406, 264, 1389, 558,
            370, 498, 286, 362, 417, 3686, 797, 286, 5883, 1125, 452, 51600,
          ],
        },
        {
          avg_logprob: -0.1257306362720246,
          compression_ratio: 1.7899543378995433,
          end: 108.08,
          id: 16,
          no_speech_prob: 0.0007049132836982608,
          seek: 10080,
          start: 100.88,
          temperature: 0,
          text: " house table with a size that might be less than the actual values I'm going to end up storing in my",
          tokens: [
            50368, 1782, 3199, 365, 257, 2744, 300, 1062, 312, 1570, 813, 264,
            3539, 4190, 286, 478, 516, 281, 917, 493, 26085, 294, 452, 50728,
          ],
        },
        {
          avg_logprob: -0.1257306362720246,
          compression_ratio: 1.7899543378995433,
          end: 114.16,
          id: 17,
          no_speech_prob: 0.0007049132836982608,
          seek: 10080,
          start: 108.08,
          temperature: 0,
          text: " data structure. What this means because on every location of the array I have a linked list right",
          tokens: [
            50728, 1412, 3877, 13, 708, 341, 1355, 570, 322, 633, 4914, 295,
            264, 10225, 286, 362, 257, 9408, 1329, 558, 51032,
          ],
        },
        {
          avg_logprob: -0.1257306362720246,
          compression_ratio: 1.7899543378995433,
          end: 120,
          id: 18,
          no_speech_prob: 0.0007049132836982608,
          seek: 10080,
          start: 114.16,
          temperature: 0,
          text: " I can have a number of elements in there so in the end I can have more values in my house table",
          tokens: [
            51032, 286, 393, 362, 257, 1230, 295, 4959, 294, 456, 370, 294, 264,
            917, 286, 393, 362, 544, 4190, 294, 452, 1782, 3199, 51324,
          ],
        },
        {
          avg_logprob: -0.1257306362720246,
          compression_ratio: 1.7899543378995433,
          end: 128.4,
          id: 19,
          no_speech_prob: 0.0007049132836982608,
          seek: 10080,
          start: 120.96,
          temperature: 0,
          text: " than the actual size of the table I'm using. When it comes to performance of house tables right we",
          tokens: [
            51372, 813, 264, 3539, 2744, 295, 264, 3199, 286, 478, 1228, 13,
            1133, 309, 1487, 281, 3389, 295, 1782, 8020, 558, 321, 51744,
          ],
        },
        {
          avg_logprob: -0.09863808643387025,
          compression_ratio: 1.8,
          end: 136,
          id: 20,
          no_speech_prob: 0.0015402870485559106,
          seek: 12840,
          start: 128.48000000000002,
          temperature: 0,
          text: " saw in our last class that if we have open addressing and the array gets pretty full then the",
          tokens: [
            50368, 1866, 294, 527, 1036, 1508, 300, 498, 321, 362, 1269, 14329,
            293, 264, 10225, 2170, 1238, 1577, 550, 264, 50744,
          ],
        },
        {
          avg_logprob: -0.09863808643387025,
          compression_ratio: 1.8,
          end: 141.04000000000002,
          id: 21,
          no_speech_prob: 0.0015402870485559106,
          seek: 12840,
          start: 136,
          temperature: 0,
          text: " performance instead of constant running time as we expect for a house table it gets closer to",
          tokens: [
            50744, 3389, 2602, 295, 5754, 2614, 565, 382, 321, 2066, 337, 257,
            1782, 3199, 309, 2170, 4966, 281, 50996,
          ],
        },
        {
          avg_logprob: -0.09863808643387025,
          compression_ratio: 1.8,
          end: 146.64000000000001,
          id: 22,
          no_speech_prob: 0.0015402870485559106,
          seek: 12840,
          start: 141.04000000000002,
          temperature: 0,
          text: " linear running time. So how can we make sure that we never get the linear running time by controlling",
          tokens: [
            50996, 8213, 2614, 565, 13, 407, 577, 393, 321, 652, 988, 300, 321,
            1128, 483, 264, 8213, 2614, 565, 538, 14905, 51276,
          ],
        },
        {
          avg_logprob: -0.09863808643387025,
          compression_ratio: 1.8,
          end: 152.32,
          id: 23,
          no_speech_prob: 0.0015402870485559106,
          seek: 12840,
          start: 146.64000000000001,
          temperature: 0,
          text: " the load factor. The load factor is the greatest effect is the greatest impact about the",
          tokens: [
            51276, 264, 3677, 5952, 13, 440, 3677, 5952, 307, 264, 6636, 1802,
            307, 264, 6636, 2712, 466, 264, 51560,
          ],
        },
        {
          avg_logprob: -0.14754747034429194,
          compression_ratio: 1.8401826484018264,
          end: 158.07999999999998,
          id: 24,
          no_speech_prob: 0.0021216925233602524,
          seek: 15232,
          start: 152.32,
          temperature: 0,
          text: " performance of house tables right. How is this defined is the number of elements that have stored",
          tokens: [
            50364, 3389, 295, 1782, 8020, 558, 13, 1012, 307, 341, 7642, 307,
            264, 1230, 295, 4959, 300, 362, 12187, 50652,
          ],
        },
        {
          avg_logprob: -0.14754747034429194,
          compression_ratio: 1.8401826484018264,
          end: 164.64,
          id: 25,
          no_speech_prob: 0.0021216925233602524,
          seek: 15232,
          start: 158.07999999999998,
          temperature: 0,
          text: " in my data structure divided by the table size. As you can imagine for open addressing this cannot",
          tokens: [
            50652, 294, 452, 1412, 3877, 6666, 538, 264, 3199, 2744, 13, 1018,
            291, 393, 3811, 337, 1269, 14329, 341, 2644, 50980,
          ],
        },
        {
          avg_logprob: -0.14754747034429194,
          compression_ratio: 1.8401826484018264,
          end: 170.16,
          id: 26,
          no_speech_prob: 0.0021216925233602524,
          seek: 15232,
          start: 164.64,
          temperature: 0,
          text: " be more than one right I cannot have more elements than the actual size of the array for open addressing.",
          tokens: [
            50980, 312, 544, 813, 472, 558, 286, 2644, 362, 544, 4959, 813, 264,
            3539, 2744, 295, 264, 10225, 337, 1269, 14329, 13, 51256,
          ],
        },
        {
          avg_logprob: -0.14754747034429194,
          compression_ratio: 1.8401826484018264,
          end: 177.12,
          id: 27,
          no_speech_prob: 0.0021216925233602524,
          seek: 15232,
          start: 170.72,
          temperature: 0,
          text: " For house table this is not with a chaining however this is not the case so I can have more than one",
          tokens: [
            51284, 1171, 1782, 3199, 341, 307, 406, 365, 257, 417, 3686, 4461,
            341, 307, 406, 264, 1389, 370, 286, 393, 362, 544, 813, 472, 51604,
          ],
        },
        {
          avg_logprob: -0.08044194103626723,
          compression_ratio: 1.7366071428571428,
          end: 181.92000000000002,
          id: 28,
          no_speech_prob: 0.0010227476013824344,
          seek: 17712,
          start: 177.12,
          temperature: 0,
          text: " element in every element of the array in every location of the array because these are added in a",
          tokens: [
            50364, 4478, 294, 633, 4478, 295, 264, 10225, 294, 633, 4914, 295,
            264, 10225, 570, 613, 366, 3869, 294, 257, 50604,
          ],
        },
        {
          avg_logprob: -0.08044194103626723,
          compression_ratio: 1.7366071428571428,
          end: 190.64000000000001,
          id: 29,
          no_speech_prob: 0.0010227476013824344,
          seek: 17712,
          start: 181.92000000000002,
          temperature: 0,
          text: " linked list that is connected to that location of the array. Okay so the first thing I want to show",
          tokens: [
            50604, 9408, 1329, 300, 307, 4582, 281, 300, 4914, 295, 264, 10225,
            13, 1033, 370, 264, 700, 551, 286, 528, 281, 855, 51040,
          ],
        },
        {
          avg_logprob: -0.08044194103626723,
          compression_ratio: 1.7366071428571428,
          end: 197.20000000000002,
          id: 30,
          no_speech_prob: 0.0010227476013824344,
          seek: 17712,
          start: 190.64000000000001,
          temperature: 0,
          text: " you here is a formula that is just an approximation. Now this is what we're going to use for this",
          tokens: [
            51040, 291, 510, 307, 257, 8513, 300, 307, 445, 364, 28023, 13, 823,
            341, 307, 437, 321, 434, 516, 281, 764, 337, 341, 51368,
          ],
        },
        {
          avg_logprob: -0.08044194103626723,
          compression_ratio: 1.7366071428571428,
          end: 204.72,
          id: 31,
          no_speech_prob: 0.0010227476013824344,
          seek: 17712,
          start: 197.20000000000002,
          temperature: 0,
          text: " discussion here. Our textbook has a more detailed probabilistic analysis that will give us an",
          tokens: [
            51368, 5017, 510, 13, 2621, 25591, 575, 257, 544, 9942, 31959, 3142,
            5215, 300, 486, 976, 505, 364, 51744,
          ],
        },
        {
          avg_logprob: -0.1528827201488406,
          compression_ratio: 1.6333333333333333,
          end: 210.8,
          id: 32,
          no_speech_prob: 0.0004932088777422905,
          seek: 20472,
          start: 204.72,
          temperature: 0,
          text: " expected number of comparisons when we perform a search operation in a house table again a search",
          tokens: [
            50364, 5176, 1230, 295, 33157, 562, 321, 2042, 257, 3164, 6916, 294,
            257, 1782, 3199, 797, 257, 3164, 50668,
          ],
        },
        {
          avg_logprob: -0.1528827201488406,
          compression_ratio: 1.6333333333333333,
          end: 216.64,
          id: 33,
          no_speech_prob: 0.0004932088777422905,
          seek: 20472,
          start: 210.8,
          temperature: 0,
          text: " operation for an item that does exist in our house table using open addressing with linear probing.",
          tokens: [
            50668, 6916, 337, 364, 3174, 300, 775, 2514, 294, 527, 1782, 3199,
            1228, 1269, 14329, 365, 8213, 1239, 278, 13, 50960,
          ],
        },
        {
          avg_logprob: -0.1528827201488406,
          compression_ratio: 1.6333333333333333,
          end: 222.48,
          id: 34,
          no_speech_prob: 0.0004932088777422905,
          seek: 20472,
          start: 216.64,
          temperature: 0,
          text: " The formula I give you here is a bit more simplified and this is derived by Donald Luth which by",
          tokens: [
            50960, 440, 8513, 286, 976, 291, 510, 307, 257, 857, 544, 26335,
            293, 341, 307, 18949, 538, 8632, 441, 2910, 597, 538, 51252,
          ],
        },
        {
          avg_logprob: -0.1528827201488406,
          compression_ratio: 1.6333333333333333,
          end: 229.04,
          id: 35,
          no_speech_prob: 0.0004932088777422905,
          seek: 20472,
          start: 222.48,
          temperature: 0,
          text: " many people is considered to be the father of the analysis of algorithms. So what this says right",
          tokens: [
            51252, 867, 561, 307, 4888, 281, 312, 264, 3086, 295, 264, 5215,
            295, 14642, 13, 407, 437, 341, 1619, 558, 51580,
          ],
        },
        {
          avg_logprob: -0.20136876900990805,
          compression_ratio: 1.6352459016393444,
          end: 235.76,
          id: 36,
          no_speech_prob: 0.003070962382480502,
          seek: 22904,
          start: 229.12,
          temperature: 0,
          text: " this says that if I perform a search in a house table with open addressing and the load factor is",
          tokens: [
            50368, 341, 1619, 300, 498, 286, 2042, 257, 3164, 294, 257, 1782,
            3199, 365, 1269, 14329, 293, 264, 3677, 5952, 307, 50700,
          ],
        },
        {
          avg_logprob: -0.20136876900990805,
          compression_ratio: 1.6352459016393444,
          end: 241.2,
          id: 37,
          no_speech_prob: 0.003070962382480502,
          seek: 22904,
          start: 235.76,
          temperature: 0,
          text: " L this is going to give me the expected number of comparisons I'm going to do. So let's plug in a",
          tokens: [
            50700, 441, 341, 307, 516, 281, 976, 385, 264, 5176, 1230, 295,
            33157, 286, 478, 516, 281, 360, 13, 407, 718, 311, 5452, 294, 257,
            50972,
          ],
        },
        {
          avg_logprob: -0.20136876900990805,
          compression_ratio: 1.6352459016393444,
          end: 246.16,
          id: 38,
          no_speech_prob: 0.003070962382480502,
          seek: 22904,
          start: 241.2,
          temperature: 0,
          text: " couple of values and see what this formula says really right if load factor is 0 so I don't have any",
          tokens: [
            50972, 1916, 295, 4190, 293, 536, 437, 341, 8513, 1619, 534, 558,
            498, 3677, 5952, 307, 1958, 370, 286, 500, 380, 362, 604, 51220,
          ],
        },
        {
          avg_logprob: -0.20136876900990805,
          compression_ratio: 1.6352459016393444,
          end: 253.51999999999998,
          id: 39,
          no_speech_prob: 0.003070962382480502,
          seek: 22904,
          start: 246.16,
          temperature: 0,
          text: " elements right then this fraction becomes one and then I have in the parentheses 1 plus 1 2 divided by",
          tokens: [
            51220, 4959, 558, 550, 341, 14135, 3643, 472, 293, 550, 286, 362,
            294, 264, 34153, 502, 1804, 502, 568, 6666, 538, 51588,
          ],
        },
        {
          avg_logprob: -0.1527669740759808,
          compression_ratio: 1.7339449541284404,
          end: 259.28000000000003,
          id: 40,
          no_speech_prob: 0.0024369799066334963,
          seek: 25352,
          start: 254.24,
          temperature: 0,
          text: " 1 probe right I'm never going to have to do an additional probe if my house table is empty.",
          tokens: [
            50400, 502, 22715, 558, 286, 478, 1128, 516, 281, 362, 281, 360,
            364, 4497, 22715, 498, 452, 1782, 3199, 307, 6707, 13, 50652,
          ],
        },
        {
          avg_logprob: -0.1527669740759808,
          compression_ratio: 1.7339449541284404,
          end: 266,
          id: 41,
          no_speech_prob: 0.0024369799066334963,
          seek: 25352,
          start: 260.24,
          temperature: 0,
          text: " Now of course if the load factor tends to 1 you get it gets closer to 1 this gives us an",
          tokens: [
            50700, 823, 295, 1164, 498, 264, 3677, 5952, 12258, 281, 502, 291,
            483, 309, 2170, 4966, 281, 502, 341, 2709, 505, 364, 50988,
          ],
        },
        {
          avg_logprob: -0.1527669740759808,
          compression_ratio: 1.7339449541284404,
          end: 273.28000000000003,
          id: 42,
          no_speech_prob: 0.0024369799066334963,
          seek: 25352,
          start: 266,
          temperature: 0,
          text: " infinity value right because or tends to infinity it's not really infinity but the load factor we",
          tokens: [
            50988, 13202, 2158, 558, 570, 420, 12258, 281, 13202, 309, 311, 406,
            534, 13202, 457, 264, 3677, 5952, 321, 51352,
          ],
        },
        {
          avg_logprob: -0.1527669740759808,
          compression_ratio: 1.7339449541284404,
          end: 282.56,
          id: 43,
          no_speech_prob: 0.0024369799066334963,
          seek: 25352,
          start: 273.28000000000003,
          temperature: 0,
          text: " never really allow it to get to 1 in real life. Now for the training things are a bit simpler right",
          tokens: [
            51352, 1128, 534, 2089, 309, 281, 483, 281, 502, 294, 957, 993, 13,
            823, 337, 264, 3097, 721, 366, 257, 857, 18587, 558, 51816,
          ],
        },
        {
          avg_logprob: -0.14602120399475096,
          compression_ratio: 1.6609442060085837,
          end: 288.96,
          id: 44,
          no_speech_prob: 0.0019013482378795743,
          seek: 28256,
          start: 282.64,
          temperature: 0,
          text: " how many probes do I have to do for a search of an element that I know exists I assume it exists",
          tokens: [
            50368, 577, 867, 1239, 279, 360, 286, 362, 281, 360, 337, 257, 3164,
            295, 364, 4478, 300, 286, 458, 8198, 286, 6552, 309, 8198, 50684,
          ],
        },
        {
          avg_logprob: -0.14602120399475096,
          compression_ratio: 1.6609442060085837,
          end: 294.48,
          id: 45,
          no_speech_prob: 0.0019013482378795743,
          seek: 28256,
          start: 288.96,
          temperature: 0,
          text: " in my house table. The first thing I want to do and actually let me go to the wideboard here so let",
          tokens: [
            50684, 294, 452, 1782, 3199, 13, 440, 700, 551, 286, 528, 281, 360,
            293, 767, 718, 385, 352, 281, 264, 4874, 3787, 510, 370, 718, 50960,
          ],
        },
        {
          avg_logprob: -0.14602120399475096,
          compression_ratio: 1.6609442060085837,
          end: 304.16,
          id: 46,
          no_speech_prob: 0.0019013482378795743,
          seek: 28256,
          start: 294.48,
          temperature: 0,
          text: " me stop sharing this one let me show you on the wideboard. Perfect. So let's say again how does",
          tokens: [
            50960, 385, 1590, 5414, 341, 472, 718, 385, 855, 291, 322, 264,
            4874, 3787, 13, 10246, 13, 407, 718, 311, 584, 797, 577, 775, 51444,
          ],
        },
        {
          avg_logprob: -0.14602120399475096,
          compression_ratio: 1.6609442060085837,
          end: 309.68,
          id: 47,
          no_speech_prob: 0.0019013482378795743,
          seek: 28256,
          start: 304.16,
          temperature: 0,
          text: " this house table with training looks like? I initialize my array which can have any size let's",
          tokens: [
            51444, 341, 1782, 3199, 365, 3097, 1542, 411, 30, 286, 5883, 1125,
            452, 10225, 597, 393, 362, 604, 2744, 718, 311, 51720,
          ],
        },
        {
          avg_logprob: -0.12462847883051092,
          compression_ratio: 1.7568807339449541,
          end: 317.92,
          id: 48,
          no_speech_prob: 0.0010528604034334421,
          seek: 30968,
          start: 309.68,
          temperature: 0,
          text: " say this size has m elements or m locations this array right every location of the array points",
          tokens: [
            50364, 584, 341, 2744, 575, 275, 4959, 420, 275, 9253, 341, 10225,
            558, 633, 4914, 295, 264, 10225, 2793, 50776,
          ],
        },
        {
          avg_logprob: -0.12462847883051092,
          compression_ratio: 1.7568807339449541,
          end: 323.68,
          id: 49,
          no_speech_prob: 0.0010528604034334421,
          seek: 30968,
          start: 317.92,
          temperature: 0,
          text: " to a linked list. If there is no elements here that would be just an alpha you here otherwise let's",
          tokens: [
            50776, 281, 257, 9408, 1329, 13, 759, 456, 307, 572, 4959, 510, 300,
            576, 312, 445, 364, 8961, 291, 510, 5911, 718, 311, 51064,
          ],
        },
        {
          avg_logprob: -0.12462847883051092,
          compression_ratio: 1.7568807339449541,
          end: 330.48,
          id: 50,
          no_speech_prob: 0.0010528604034334421,
          seek: 30968,
          start: 323.68,
          temperature: 0,
          text: " say the first location I have two elements that were mapped into this index on my house table",
          tokens: [
            51064, 584, 264, 700, 4914, 286, 362, 732, 4959, 300, 645, 33318,
            666, 341, 8186, 322, 452, 1782, 3199, 51404,
          ],
        },
        {
          avg_logprob: -0.12462847883051092,
          compression_ratio: 1.7568807339449541,
          end: 338.8,
          id: 51,
          no_speech_prob: 0.0010528604034334421,
          seek: 30968,
          start: 330.48,
          temperature: 0,
          text: " these are added in a linked list. Now the load factor here can exceed one right because let's",
          tokens: [
            51404, 613, 366, 3869, 294, 257, 9408, 1329, 13, 823, 264, 3677,
            5952, 510, 393, 14048, 472, 558, 570, 718, 311, 51820,
          ],
        },
        {
          avg_logprob: -0.07966529097512504,
          compression_ratio: 1.821705426356589,
          end: 343.84000000000003,
          id: 52,
          no_speech_prob: 0.00111738673876971,
          seek: 33880,
          start: 338.8,
          temperature: 0,
          text: " assume that every linked list here has two elements if I have m locations in this house table",
          tokens: [
            50364, 6552, 300, 633, 9408, 1329, 510, 575, 732, 4959, 498, 286,
            362, 275, 9253, 294, 341, 1782, 3199, 50616,
          ],
        },
        {
          avg_logprob: -0.07966529097512504,
          compression_ratio: 1.821705426356589,
          end: 348.40000000000003,
          id: 53,
          no_speech_prob: 0.00111738673876971,
          seek: 33880,
          start: 343.84000000000003,
          temperature: 0,
          text: " with training I would have two m elements total in my data structure so the load factor would be",
          tokens: [
            50616, 365, 3097, 286, 576, 362, 732, 275, 4959, 3217, 294, 452,
            1412, 3877, 370, 264, 3677, 5952, 576, 312, 50844,
          ],
        },
        {
          avg_logprob: -0.07966529097512504,
          compression_ratio: 1.821705426356589,
          end: 355.12,
          id: 54,
          no_speech_prob: 0.00111738673876971,
          seek: 33880,
          start: 348.40000000000003,
          temperature: 0,
          text: " between that case. Now again if we are in an ideal scenario and we have a house function that",
          tokens: [
            50844, 1296, 300, 1389, 13, 823, 797, 498, 321, 366, 294, 364, 7157,
            9005, 293, 321, 362, 257, 1782, 2445, 300, 51180,
          ],
        },
        {
          avg_logprob: -0.07966529097512504,
          compression_ratio: 1.821705426356589,
          end: 360.8,
          id: 55,
          no_speech_prob: 0.00111738673876971,
          seek: 33880,
          start: 355.12,
          temperature: 0,
          text: " takes every value that I want to store in my house table and creates a uniform distribution",
          tokens: [
            51180, 2516, 633, 2158, 300, 286, 528, 281, 3531, 294, 452, 1782,
            3199, 293, 7829, 257, 9452, 7316, 51464,
          ],
        },
        {
          avg_logprob: -0.07966529097512504,
          compression_ratio: 1.821705426356589,
          end: 366.64,
          id: 56,
          no_speech_prob: 0.00111738673876971,
          seek: 33880,
          start: 360.8,
          temperature: 0,
          text: " of the values of the input values into the indexes of this house table then I'm going to have",
          tokens: [
            51464, 295, 264, 4190, 295, 264, 4846, 4190, 666, 264, 8186, 279,
            295, 341, 1782, 3199, 550, 286, 478, 516, 281, 362, 51756,
          ],
        },
        {
          avg_logprob: -0.1586197909186868,
          compression_ratio: 1.8487804878048781,
          end: 373.84,
          id: 57,
          no_speech_prob: 0.00299824308604002,
          seek: 36664,
          start: 366.71999999999997,
          temperature: 0,
          text: " an equal number of elements in every linked list here right so if my load factor let's say is two",
          tokens: [
            50368, 364, 2681, 1230, 295, 4959, 294, 633, 9408, 1329, 510, 558,
            370, 498, 452, 3677, 5952, 718, 311, 584, 307, 732, 50724,
          ],
        },
        {
          avg_logprob: -0.1586197909186868,
          compression_ratio: 1.8487804878048781,
          end: 379.59999999999997,
          id: 58,
          no_speech_prob: 0.00299824308604002,
          seek: 36664,
          start: 374.47999999999996,
          temperature: 0,
          text: " this is going to give me the average length of every linked list in here and again some",
          tokens: [
            50756, 341, 307, 516, 281, 976, 385, 264, 4274, 4641, 295, 633,
            9408, 1329, 294, 510, 293, 797, 512, 51012,
          ],
        },
        {
          avg_logprob: -0.1586197909186868,
          compression_ratio: 1.8487804878048781,
          end: 383.36,
          id: 59,
          no_speech_prob: 0.00299824308604002,
          seek: 36664,
          start: 379.59999999999997,
          temperature: 0,
          text: " linked list might have three elements and one but the average is going to be two elements per",
          tokens: [
            51012, 9408, 1329, 1062, 362, 1045, 4959, 293, 472, 457, 264, 4274,
            307, 516, 281, 312, 732, 4959, 680, 51200,
          ],
        },
        {
          avg_logprob: -0.1586197909186868,
          compression_ratio: 1.8487804878048781,
          end: 392.32,
          id: 60,
          no_speech_prob: 0.00299824308604002,
          seek: 36664,
          start: 383.36,
          temperature: 0,
          text: " linked list right. Okay so if a performance search right what is the expected number of comparisons",
          tokens: [
            51200, 9408, 1329, 558, 13, 1033, 370, 498, 257, 3389, 3164, 558,
            437, 307, 264, 5176, 1230, 295, 33157, 51648,
          ],
        },
        {
          avg_logprob: -0.15490963584498355,
          compression_ratio: 1.7897196261682242,
          end: 398.8,
          id: 61,
          no_speech_prob: 0.003237722208723426,
          seek: 39232,
          start: 392.96,
          temperature: 0,
          text: " based on the load factor the first probe I always have to do I estimate I get my key I get the",
          tokens: [
            50396, 2361, 322, 264, 3677, 5952, 264, 700, 22715, 286, 1009, 362,
            281, 360, 286, 12539, 286, 483, 452, 2141, 286, 483, 264, 50688,
          ],
        },
        {
          avg_logprob: -0.15490963584498355,
          compression_ratio: 1.7897196261682242,
          end: 405.2,
          id: 62,
          no_speech_prob: 0.003237722208723426,
          seek: 39232,
          start: 398.8,
          temperature: 0,
          text: " house code and I find the index the first probe is taking the element in the table does it point",
          tokens: [
            50688, 1782, 3089, 293, 286, 915, 264, 8186, 264, 700, 22715, 307,
            1940, 264, 4478, 294, 264, 3199, 775, 309, 935, 51008,
          ],
        },
        {
          avg_logprob: -0.15490963584498355,
          compression_ratio: 1.7897196261682242,
          end: 410.56,
          id: 63,
          no_speech_prob: 0.003237722208723426,
          seek: 39232,
          start: 405.2,
          temperature: 0,
          text: " to a linked list or to an alpha so that's my first probe and then on average let's say I have",
          tokens: [
            51008, 281, 257, 9408, 1329, 420, 281, 364, 8961, 370, 300, 311,
            452, 700, 22715, 293, 550, 322, 4274, 718, 311, 584, 286, 362,
            51276,
          ],
        },
        {
          avg_logprob: -0.15490963584498355,
          compression_ratio: 1.7897196261682242,
          end: 418.15999999999997,
          id: 64,
          no_speech_prob: 0.003237722208723426,
          seek: 39232,
          start: 410.56,
          temperature: 0,
          text: " my load factor to be three right for a successful search it might be on the first second or third",
          tokens: [
            51276, 452, 3677, 5952, 281, 312, 1045, 558, 337, 257, 4406, 3164,
            309, 1062, 312, 322, 264, 700, 1150, 420, 2636, 51656,
          ],
        },
        {
          avg_logprob: -0.13424950632555732,
          compression_ratio: 1.9251968503937007,
          end: 423.44,
          id: 65,
          no_speech_prob: 0.009267078712582588,
          seek: 41816,
          start: 418.16,
          temperature: 0,
          text: " element so if L which is a load factor also gives me again as we discussed the average length",
          tokens: [
            50364, 4478, 370, 498, 441, 597, 307, 257, 3677, 5952, 611, 2709,
            385, 797, 382, 321, 7152, 264, 4274, 4641, 50628,
          ],
        },
        {
          avg_logprob: -0.13424950632555732,
          compression_ratio: 1.9251968503937007,
          end: 428.48,
          id: 66,
          no_speech_prob: 0.009267078712582588,
          seek: 41816,
          start: 423.44,
          temperature: 0,
          text: " of every linked list on average I may have to scan half of my linked list right if I'm very lucky",
          tokens: [
            50628, 295, 633, 9408, 1329, 322, 4274, 286, 815, 362, 281, 11049,
            1922, 295, 452, 9408, 1329, 558, 498, 286, 478, 588, 6356, 50880,
          ],
        },
        {
          avg_logprob: -0.13424950632555732,
          compression_ratio: 1.9251968503937007,
          end: 433.20000000000005,
          id: 67,
          no_speech_prob: 0.009267078712582588,
          seek: 41816,
          start: 428.48,
          temperature: 0,
          text: " it might be the head if I'm very unlucky might be the tail of the linked list but on average it's",
          tokens: [
            50880, 309, 1062, 312, 264, 1378, 498, 286, 478, 588, 38838, 1062,
            312, 264, 6838, 295, 264, 9408, 1329, 457, 322, 4274, 309, 311,
            51116,
          ],
        },
        {
          avg_logprob: -0.13424950632555732,
          compression_ratio: 1.9251968503937007,
          end: 439.36,
          id: 68,
          no_speech_prob: 0.009267078712582588,
          seek: 41816,
          start: 433.20000000000005,
          temperature: 0,
          text: " going to be some going to be so what is the number of the probe the number of comparisons here is one",
          tokens: [
            51116, 516, 281, 312, 512, 516, 281, 312, 370, 437, 307, 264, 1230,
            295, 264, 22715, 264, 1230, 295, 33157, 510, 307, 472, 51424,
          ],
        },
        {
          avg_logprob: -0.13424950632555732,
          compression_ratio: 1.9251968503937007,
          end: 445.92,
          id: 69,
          no_speech_prob: 0.009267078712582588,
          seek: 41816,
          start: 439.36,
          temperature: 0,
          text: " for checking the initial location in the table plus the load factor divided by two because a load",
          tokens: [
            51424, 337, 8568, 264, 5883, 4914, 294, 264, 3199, 1804, 264, 3677,
            5952, 6666, 538, 732, 570, 257, 3677, 51752,
          ],
        },
        {
          avg_logprob: -0.08808251314384993,
          compression_ratio: 1.7391304347826086,
          end: 450.72,
          id: 70,
          no_speech_prob: 0.0007429246907122433,
          seek: 44592,
          start: 445.92,
          temperature: 0,
          text: " factor again gives me the average length of every linked list on my house table when we use",
          tokens: [
            50364, 5952, 797, 2709, 385, 264, 4274, 4641, 295, 633, 9408, 1329,
            322, 452, 1782, 3199, 562, 321, 764, 50604,
          ],
        },
        {
          avg_logprob: -0.08808251314384993,
          compression_ratio: 1.7391304347826086,
          end: 462.08000000000004,
          id: 71,
          no_speech_prob: 0.0007429246907122433,
          seek: 44592,
          start: 450.72,
          temperature: 0,
          text: " chaining here okay so let me go back to the slides so this is what we discuss here",
          tokens: [
            50604, 5021, 278, 510, 1392, 370, 718, 385, 352, 646, 281, 264,
            9788, 370, 341, 307, 437, 321, 2248, 510, 51172,
          ],
        },
        {
          avg_logprob: -0.08808251314384993,
          compression_ratio: 1.7391304347826086,
          end: 469.52000000000004,
          id: 72,
          no_speech_prob: 0.0007429246907122433,
          seek: 44592,
          start: 464,
          temperature: 0,
          text: " this is for the chain right so we have these two formulas now using these two formulas we can",
          tokens: [
            51268, 341, 307, 337, 264, 5021, 558, 370, 321, 362, 613, 732,
            30546, 586, 1228, 613, 732, 30546, 321, 393, 51544,
          ],
        },
        {
          avg_logprob: -0.08808251314384993,
          compression_ratio: 1.7391304347826086,
          end: 475.04,
          id: 73,
          no_speech_prob: 0.0007429246907122433,
          seek: 44592,
          start: 469.52000000000004,
          temperature: 0,
          text: " actually I have a table on the slides just to show you based on the load factor what is the",
          tokens: [
            51544, 767, 286, 362, 257, 3199, 322, 264, 9788, 445, 281, 855, 291,
            2361, 322, 264, 3677, 5952, 437, 307, 264, 51820,
          ],
        },
        {
          avg_logprob: -0.16563073978867643,
          compression_ratio: 1.6939655172413792,
          end: 479.68,
          id: 74,
          no_speech_prob: 0.0006025037728250027,
          seek: 47504,
          start: 475.04,
          temperature: 0,
          text: " performance of these two implementations for handling collisions right open addressing with linear",
          tokens: [
            50364, 3389, 295, 613, 732, 4445, 763, 337, 13175, 46537, 558, 1269,
            14329, 365, 8213, 50596,
          ],
        },
        {
          avg_logprob: -0.16563073978867643,
          compression_ratio: 1.6939655172413792,
          end: 487.76000000000005,
          id: 75,
          no_speech_prob: 0.0006025037728250027,
          seek: 47504,
          start: 479.68,
          temperature: 0,
          text: " probing or chaining of course if the has table is empty load factor zero just one probe for every",
          tokens: [
            50596, 1239, 278, 420, 5021, 278, 295, 1164, 498, 264, 575, 3199,
            307, 6707, 3677, 5952, 4018, 445, 472, 22715, 337, 633, 51000,
          ],
        },
        {
          avg_logprob: -0.16563073978867643,
          compression_ratio: 1.6939655172413792,
          end: 494.56,
          id: 76,
          no_speech_prob: 0.0006025037728250027,
          seek: 47504,
          start: 487.76000000000005,
          temperature: 0,
          text: " the search operation if I have let's say 90% what this means if I have linear probing 90% of the",
          tokens: [
            51000, 264, 3164, 6916, 498, 286, 362, 718, 311, 584, 4289, 4, 437,
            341, 1355, 498, 286, 362, 8213, 1239, 278, 4289, 4, 295, 264, 51340,
          ],
        },
        {
          avg_logprob: -0.16563073978867643,
          compression_ratio: 1.6939655172413792,
          end: 500.08000000000004,
          id: 77,
          no_speech_prob: 0.0006025037728250027,
          seek: 47504,
          start: 494.56,
          temperature: 0,
          text: " locations of the array are four even in that scenario the average or expected number of comparisons",
          tokens: [
            51340, 9253, 295, 264, 10225, 366, 1451, 754, 294, 300, 9005, 264,
            4274, 420, 5176, 1230, 295, 33157, 51616,
          ],
        },
        {
          avg_logprob: -0.07682157933026895,
          compression_ratio: 1.7130044843049328,
          end: 506.4,
          id: 78,
          no_speech_prob: 0.004079882521182299,
          seek: 50008,
          start: 500.08,
          temperature: 0,
          text: " for a search operation is five and a half so it's not terrible right but again as you see here for",
          tokens: [
            50364, 337, 257, 3164, 6916, 307, 1732, 293, 257, 1922, 370, 309,
            311, 406, 6237, 558, 457, 797, 382, 291, 536, 510, 337, 50680,
          ],
        },
        {
          avg_logprob: -0.07682157933026895,
          compression_ratio: 1.7130044843049328,
          end: 513.28,
          id: 79,
          no_speech_prob: 0.004079882521182299,
          seek: 50008,
          start: 506.4,
          temperature: 0,
          text: " chaining this is just one approximately 1.5 so this performs significantly better and the",
          tokens: [
            50680, 417, 3686, 341, 307, 445, 472, 10447, 502, 13, 20, 370, 341,
            26213, 10591, 1101, 293, 264, 51024,
          ],
        },
        {
          avg_logprob: -0.07682157933026895,
          compression_ratio: 1.7130044843049328,
          end: 519.76,
          id: 80,
          no_speech_prob: 0.004079882521182299,
          seek: 50008,
          start: 513.28,
          temperature: 0,
          text: " difference I remember here is that for linear probing my house table limits how many elements the",
          tokens: [
            51024, 2649, 286, 1604, 510, 307, 300, 337, 8213, 1239, 278, 452,
            1782, 3199, 10406, 577, 867, 4959, 264, 51348,
          ],
        },
        {
          avg_logprob: -0.07682157933026895,
          compression_ratio: 1.7130044843049328,
          end: 523.76,
          id: 81,
          no_speech_prob: 0.004079882521182299,
          seek: 50008,
          start: 519.76,
          temperature: 0,
          text: " size of my house table limits how many elements I can store in my data structure that's not the",
          tokens: [
            51348, 2744, 295, 452, 1782, 3199, 10406, 577, 867, 4959, 286, 393,
            3531, 294, 452, 1412, 3877, 300, 311, 406, 264, 51548,
          ],
        },
        {
          avg_logprob: -0.14008970260620118,
          compression_ratio: 1.7990867579908676,
          end: 530.16,
          id: 82,
          no_speech_prob: 0.005097591783851385,
          seek: 52376,
          start: 523.76,
          temperature: 0,
          text: " case for chaining there is no so the load factor can go to two three four five and more that value",
          tokens: [
            50364, 1389, 337, 417, 3686, 456, 307, 572, 370, 264, 3677, 5952,
            393, 352, 281, 732, 1045, 1451, 1732, 293, 544, 300, 2158, 50684,
          ],
        },
        {
          avg_logprob: -0.14008970260620118,
          compression_ratio: 1.7990867579908676,
          end: 536.4,
          id: 83,
          no_speech_prob: 0.005097591783851385,
          seek: 52376,
          start: 530.16,
          temperature: 0,
          text: " will be the average length of every link list on my class table chaining how does this compare with",
          tokens: [
            50684, 486, 312, 264, 4274, 4641, 295, 633, 2113, 1329, 322, 452,
            1508, 3199, 417, 3686, 577, 775, 341, 6794, 365, 50996,
          ],
        },
        {
          avg_logprob: -0.14008970260620118,
          compression_ratio: 1.7990867579908676,
          end: 542.96,
          id: 84,
          no_speech_prob: 0.005097591783851385,
          seek: 52376,
          start: 536.4,
          temperature: 0,
          text: " a binary set tree we're going to discuss a lot more about binary set trees in our next class however",
          tokens: [
            50996, 257, 17434, 992, 4230, 321, 434, 516, 281, 2248, 257, 688,
            544, 466, 17434, 992, 5852, 294, 527, 958, 1508, 4461, 51324,
          ],
        },
        {
          avg_logprob: -0.14008970260620118,
          compression_ratio: 1.7990867579908676,
          end: 551.12,
          id: 85,
          no_speech_prob: 0.005097591783851385,
          seek: 52376,
          start: 543.92,
          temperature: 0,
          text: " a binary set tree has a login operations for a search operation again assuming that the binary",
          tokens: [
            51372, 257, 17434, 992, 4230, 575, 257, 24276, 7705, 337, 257, 3164,
            6916, 797, 11926, 300, 264, 17434, 51732,
          ],
        },
        {
          avg_logprob: -0.13889996389324746,
          compression_ratio: 1.6239669421487604,
          end: 556.48,
          id: 86,
          no_speech_prob: 0.002521272748708725,
          seek: 55112,
          start: 551.12,
          temperature: 0,
          text: " set tree is balanced we'll discuss a lot more about it in the next few classes but let's say even",
          tokens: [
            50364, 992, 4230, 307, 13902, 321, 603, 2248, 257, 688, 544, 466,
            309, 294, 264, 958, 1326, 5359, 457, 718, 311, 584, 754, 50632,
          ],
        },
        {
          avg_logprob: -0.13889996389324746,
          compression_ratio: 1.6239669421487604,
          end: 562.5600000000001,
          id: 87,
          no_speech_prob: 0.002521272748708725,
          seek: 55112,
          start: 556.48,
          temperature: 0,
          text: " for a small instance of a binary set tree with 120 and the elements for example I require seven",
          tokens: [
            50632, 337, 257, 1359, 5197, 295, 257, 17434, 992, 4230, 365, 10411,
            293, 264, 4959, 337, 1365, 286, 3651, 3407, 50936,
          ],
        },
        {
          avg_logprob: -0.13889996389324746,
          compression_ratio: 1.6239669421487604,
          end: 571.84,
          id: 88,
          no_speech_prob: 0.002521272748708725,
          seek: 55112,
          start: 562.5600000000001,
          temperature: 0,
          text: " probes right which is more than any house table that has up to 90% capacity in search and removal in",
          tokens: [
            50936, 1239, 279, 558, 597, 307, 544, 813, 604, 1782, 3199, 300,
            575, 493, 281, 4289, 4, 6042, 294, 3164, 293, 17933, 294, 51400,
          ],
        },
        {
          avg_logprob: -0.13889996389324746,
          compression_ratio: 1.6239669421487604,
          end: 577.6,
          id: 89,
          no_speech_prob: 0.002521272748708725,
          seek: 55112,
          start: 571.84,
          temperature: 0,
          text: " order to get those operations for house table again we expect constant running time operations but",
          tokens: [
            51400, 1668, 281, 483, 729, 7705, 337, 1782, 3199, 797, 321, 2066,
            5754, 2614, 565, 7705, 457, 51688,
          ],
        },
        {
          avg_logprob: -0.19571798497980292,
          compression_ratio: 1.6830357142857142,
          end: 583.44,
          id: 90,
          no_speech_prob: 0.0023133764043450356,
          seek: 57760,
          start: 577.6,
          temperature: 0,
          text: " if we have let's say house table with open addressing and linear probing and we get to 99% full",
          tokens: [
            50364, 498, 321, 362, 718, 311, 584, 1782, 3199, 365, 1269, 14329,
            293, 8213, 1239, 278, 293, 321, 483, 281, 11803, 4, 1577, 50656,
          ],
        },
        {
          avg_logprob: -0.19571798497980292,
          compression_ratio: 1.6830357142857142,
          end: 591.52,
          id: 91,
          no_speech_prob: 0.0023133764043450356,
          seek: 57760,
          start: 584.16,
          temperature: 0,
          text: " then worst case becomes linear here sorted array this would if we keep the kept the sorted array to",
          tokens: [
            50692, 550, 5855, 1389, 3643, 8213, 510, 25462, 10225, 341, 576,
            498, 321, 1066, 264, 4305, 264, 25462, 10225, 281, 51060,
          ],
        },
        {
          avg_logprob: -0.19571798497980292,
          compression_ratio: 1.6830357142857142,
          end: 596.4,
          id: 92,
          no_speech_prob: 0.0023133764043450356,
          seek: 57760,
          start: 591.52,
          temperature: 0,
          text: " perform binary search that would be big go offend to insert an element in its correct position",
          tokens: [
            51060, 2042, 17434, 3164, 300, 576, 312, 955, 352, 766, 521, 281,
            8969, 364, 4478, 294, 1080, 3006, 2535, 51304,
          ],
        },
        {
          avg_logprob: -0.19571798497980292,
          compression_ratio: 1.6830357142857142,
          end: 601.2,
          id: 93,
          no_speech_prob: 0.0023133764043450356,
          seek: 57760,
          start: 596.4,
          temperature: 0,
          text: " and binary set tree log n again if it's not balanced however it can get linear as well",
          tokens: [
            51304, 293, 17434, 992, 4230, 3565, 297, 797, 498, 309, 311, 406,
            13902, 4461, 309, 393, 483, 8213, 382, 731, 51544,
          ],
        },
        {
          avg_logprob: -0.11612591289338611,
          compression_ratio: 1.8855721393034826,
          end: 608.1600000000001,
          id: 94,
          no_speech_prob: 0.0058490196242928505,
          seek: 60120,
          start: 601.9200000000001,
          temperature: 0,
          text: " now it looks like the house table we change performs a lot better right so why would we ever",
          tokens: [
            50400, 586, 309, 1542, 411, 264, 1782, 3199, 321, 1319, 26213, 257,
            688, 1101, 558, 370, 983, 576, 321, 1562, 50712,
          ],
        },
        {
          avg_logprob: -0.11612591289338611,
          compression_ratio: 1.8855721393034826,
          end: 616.24,
          id: 95,
          no_speech_prob: 0.0058490196242928505,
          seek: 60120,
          start: 608.1600000000001,
          temperature: 0,
          text: " consider using linear probing the answer is the storage requirements right so we saw how the",
          tokens: [
            50712, 1949, 1228, 8213, 1239, 278, 264, 1867, 307, 264, 6725, 7728,
            558, 370, 321, 1866, 577, 264, 51116,
          ],
        },
        {
          avg_logprob: -0.11612591289338611,
          compression_ratio: 1.8855721393034826,
          end: 623.6800000000001,
          id: 96,
          no_speech_prob: 0.0058490196242928505,
          seek: 60120,
          start: 616.24,
          temperature: 0,
          text: " house table size affects the performance and in reality right when we use house tables what do we",
          tokens: [
            51116, 1782, 3199, 2744, 11807, 264, 3389, 293, 294, 4103, 558, 562,
            321, 764, 1782, 8020, 437, 360, 321, 51488,
          ],
        },
        {
          avg_logprob: -0.11612591289338611,
          compression_ratio: 1.8855721393034826,
          end: 628.88,
          id: 97,
          no_speech_prob: 0.0058490196242928505,
          seek: 60120,
          start: 623.6800000000001,
          temperature: 0,
          text: " want to do we want to make sure if we use linear probing specifically if we exceed the specific",
          tokens: [
            51488, 528, 281, 360, 321, 528, 281, 652, 988, 498, 321, 764, 8213,
            1239, 278, 4682, 498, 321, 14048, 264, 2685, 51748,
          ],
        },
        {
          avg_logprob: -0.21282475493675054,
          compression_ratio: 1.6394849785407726,
          end: 637.2,
          id: 98,
          no_speech_prob: 0.002654170384630561,
          seek: 62888,
          start: 628.96,
          temperature: 0,
          text: " load factor let's say 85 90% resize to a new array re-hash all the values and use a bigger instance of",
          tokens: [
            50368, 3677, 5952, 718, 311, 584, 14695, 4289, 4, 50069, 281, 257,
            777, 10225, 319, 12, 71, 1299, 439, 264, 4190, 293, 764, 257, 3801,
            5197, 295, 50780,
          ],
        },
        {
          avg_logprob: -0.21282475493675054,
          compression_ratio: 1.6394849785407726,
          end: 642.4,
          id: 99,
          no_speech_prob: 0.002654170384630561,
          seek: 62888,
          start: 637.2,
          temperature: 0,
          text: " the array to always make sure that our search operation is going to be performed in constant",
          tokens: [
            50780, 264, 10225, 281, 1009, 652, 988, 300, 527, 3164, 6916, 307,
            516, 281, 312, 10332, 294, 5754, 51040,
          ],
        },
        {
          avg_logprob: -0.21282475493675054,
          compression_ratio: 1.6394849785407726,
          end: 650.48,
          id: 100,
          no_speech_prob: 0.002654170384630561,
          seek: 62888,
          start: 642.4,
          temperature: 0,
          text: " running time and not linear so for the storage requirements the performance of housing is",
          tokens: [
            51040, 2614, 565, 293, 406, 8213, 370, 337, 264, 6725, 7728, 264,
            3389, 295, 6849, 307, 51444,
          ],
        },
        {
          avg_logprob: -0.21282475493675054,
          compression_ratio: 1.6394849785407726,
          end: 657.2,
          id: 101,
          no_speech_prob: 0.002654170384630561,
          seek: 62888,
          start: 650.48,
          temperature: 0,
          text: " superior of course to binary search trees particularly the load factor is less than 75% and also",
          tokens: [
            51444, 13028, 295, 1164, 281, 17434, 3164, 5852, 4098, 264, 3677,
            5952, 307, 1570, 813, 9562, 4, 293, 611, 51780,
          ],
        },
        {
          avg_logprob: -0.1617116805834648,
          compression_ratio: 1.8009478672985781,
          end: 662.48,
          id: 102,
          no_speech_prob: 0.0010343093890696764,
          seek: 65720,
          start: 657.2,
          temperature: 0,
          text: " this difference increases with the size of the data structure for the binary search tree",
          tokens: [
            50364, 341, 2649, 8637, 365, 264, 2744, 295, 264, 1412, 3877, 337,
            264, 17434, 3164, 4230, 50628,
          ],
        },
        {
          avg_logprob: -0.1617116805834648,
          compression_ratio: 1.8009478672985781,
          end: 668.08,
          id: 103,
          no_speech_prob: 0.0010343093890696764,
          seek: 65720,
          start: 662.48,
          temperature: 0,
          text: " is not affected really for how many values I store for my house tables as long as I maintain good load",
          tokens: [
            50628, 307, 406, 8028, 534, 337, 577, 867, 4190, 286, 3531, 337,
            452, 1782, 8020, 382, 938, 382, 286, 6909, 665, 3677, 50908,
          ],
        },
        {
          avg_logprob: -0.1617116805834648,
          compression_ratio: 1.8009478672985781,
          end: 675.84,
          id: 104,
          no_speech_prob: 0.0010343093890696764,
          seek: 65720,
          start: 668.08,
          temperature: 0,
          text: " factor a binary search tree I remember requires four references per note the actual value",
          tokens: [
            50908, 5952, 257, 17434, 3164, 4230, 286, 1604, 7029, 1451, 15400,
            680, 3637, 264, 3539, 2158, 51296,
          ],
        },
        {
          avg_logprob: -0.1617116805834648,
          compression_ratio: 1.8009478672985781,
          end: 681.0400000000001,
          id: 105,
          no_speech_prob: 0.0010343093890696764,
          seek: 65720,
          start: 675.84,
          temperature: 0,
          text: " references to pattern left and right children so more storage is required for a binary search tree",
          tokens: [
            51296, 15400, 281, 5102, 1411, 293, 558, 2227, 370, 544, 6725, 307,
            4739, 337, 257, 17434, 3164, 4230, 51556,
          ],
        },
        {
          avg_logprob: -0.20047069125705294,
          compression_ratio: 1.6228813559322033,
          end: 689.36,
          id: 106,
          no_speech_prob: 0.0019128896528854966,
          seek: 68104,
          start: 681.5999999999999,
          temperature: 0,
          text: " of a house table with let's say 75% capacity or all Japan see I should say here so just to give",
          tokens: [
            50392, 295, 257, 1782, 3199, 365, 718, 311, 584, 9562, 4, 6042, 420,
            439, 3367, 536, 286, 820, 584, 510, 370, 445, 281, 976, 50780,
          ],
        },
        {
          avg_logprob: -0.20047069125705294,
          compression_ratio: 1.6228813559322033,
          end: 696.7199999999999,
          id: 107,
          no_speech_prob: 0.0019128896528854966,
          seek: 68104,
          start: 689.36,
          temperature: 0,
          text: " you an example here right for open addressing things are very simple if I have the number of",
          tokens: [
            50780, 291, 364, 1365, 510, 558, 337, 1269, 14329, 721, 366, 588,
            2199, 498, 286, 362, 264, 1230, 295, 51148,
          ],
        },
        {
          avg_logprob: -0.20047069125705294,
          compression_ratio: 1.6228813559322033,
          end: 702.9599999999999,
          id: 108,
          no_speech_prob: 0.0019128896528854966,
          seek: 68104,
          start: 696.7199999999999,
          temperature: 0,
          text: " references to items is n again this assumes that we have a full array in reality it's going to be",
          tokens: [
            51148, 15400, 281, 4754, 307, 297, 797, 341, 37808, 300, 321, 362,
            257, 1577, 10225, 294, 4103, 309, 311, 516, 281, 312, 51460,
          ],
        },
        {
          avg_logprob: -0.20047069125705294,
          compression_ratio: 1.6228813559322033,
          end: 710.88,
          id: 109,
          no_speech_prob: 0.0019128896528854966,
          seek: 68104,
          start: 704,
          temperature: 0,
          text: " n divided by the load factor to get their house table size how many references I need the memory",
          tokens: [
            51512, 297, 6666, 538, 264, 3677, 5952, 281, 483, 641, 1782, 3199,
            2744, 577, 867, 15400, 286, 643, 264, 4675, 51856,
          ],
        },
        {
          avg_logprob: -0.1805638207329644,
          compression_ratio: 1.910569105691057,
          end: 716.48,
          id: 110,
          no_speech_prob: 0.00162205018568784,
          seek: 71104,
          start: 711.28,
          temperature: 0,
          text: " for changing the average number of nodes in elistice cell right the load factor as I we discussed",
          tokens: [
            50376, 337, 4473, 264, 4274, 1230, 295, 13891, 294, 806, 468, 573,
            2815, 558, 264, 3677, 5952, 382, 286, 321, 7152, 50636,
          ],
        },
        {
          avg_logprob: -0.1805638207329644,
          compression_ratio: 1.910569105691057,
          end: 722.64,
          id: 111,
          no_speech_prob: 0.00162205018568784,
          seek: 71104,
          start: 716.48,
          temperature: 0,
          text: " earlier and n is the number of table elements so using a double linked list there will be three",
          tokens: [
            50636, 3071, 293, 297, 307, 264, 1230, 295, 3199, 4959, 370, 1228,
            257, 3834, 9408, 1329, 456, 486, 312, 1045, 50944,
          ],
        },
        {
          avg_logprob: -0.1805638207329644,
          compression_ratio: 1.910569105691057,
          end: 727.76,
          id: 112,
          no_speech_prob: 0.00162205018568784,
          seek: 71104,
          start: 722.64,
          temperature: 0,
          text: " references in each node the item next in preview so as we discuss in one of our last classes",
          tokens: [
            50944, 15400, 294, 1184, 9984, 264, 3174, 958, 294, 14281, 370, 382,
            321, 2248, 294, 472, 295, 527, 1036, 5359, 51200,
          ],
        },
        {
          avg_logprob: -0.1805638207329644,
          compression_ratio: 1.910569105691057,
          end: 734.24,
          id: 113,
          no_speech_prob: 0.00162205018568784,
          seek: 71104,
          start: 728.4,
          temperature: 0,
          text: " using a single linked list we reduce the number of references by one so the total storage",
          tokens: [
            51232, 1228, 257, 2167, 9408, 1329, 321, 5407, 264, 1230, 295,
            15400, 538, 472, 370, 264, 3217, 6725, 51524,
          ],
        },
        {
          avg_logprob: -0.1805638207329644,
          compression_ratio: 1.910569105691057,
          end: 739.04,
          id: 114,
          no_speech_prob: 0.00162205018568784,
          seek: 71104,
          start: 734.24,
          temperature: 0,
          text: " and this is right for the first array that has the links to each one of the linked list so we",
          tokens: [
            51524, 293, 341, 307, 558, 337, 264, 700, 10225, 300, 575, 264,
            6123, 281, 1184, 472, 295, 264, 9408, 1329, 370, 321, 51764,
          ],
        },
        {
          avg_logprob: -0.11774869759877522,
          compression_ratio: 1.6256983240223464,
          end: 747.52,
          id: 115,
          no_speech_prob: 0.0007247070898301899,
          seek: 73904,
          start: 739.04,
          temperature: 0,
          text: " have n for that size and then plus two times n times l for because for every again for every one",
          tokens: [
            50364, 362, 297, 337, 300, 2744, 293, 550, 1804, 732, 1413, 297,
            1413, 287, 337, 570, 337, 633, 797, 337, 633, 472, 50788,
          ],
        },
        {
          avg_logprob: -0.11774869759877522,
          compression_ratio: 1.6256983240223464,
          end: 754.8,
          id: 116,
          no_speech_prob: 0.0007247070898301899,
          seek: 73904,
          start: 747.52,
          temperature: 0,
          text: " of the values that I have in my data structure if I have n values I need two references and then l is",
          tokens: [
            50788, 295, 264, 4190, 300, 286, 362, 294, 452, 1412, 3877, 498,
            286, 362, 297, 4190, 286, 643, 732, 15400, 293, 550, 287, 307,
            51152,
          ],
        },
        {
          avg_logprob: -0.11774869759877522,
          compression_ratio: 1.6256983240223464,
          end: 762.7199999999999,
          id: 117,
          no_speech_prob: 0.0007247070898301899,
          seek: 73904,
          start: 754.8,
          temperature: 0,
          text: " the expected length of each linked list right so at this point I'm going to give you a small",
          tokens: [
            51152, 264, 5176, 4641, 295, 1184, 9408, 1329, 558, 370, 412, 341,
            935, 286, 478, 516, 281, 976, 291, 257, 1359, 51548,
          ],
        },
        {
          avg_logprob: -0.108054098330046,
          compression_ratio: 1.5578947368421052,
          end: 770.72,
          id: 118,
          no_speech_prob: 0.004000242333859205,
          seek: 76272,
          start: 762.72,
          temperature: 0,
          text: " exercise so let's assume that we use open addressing with linear probing and let's say I want to",
          tokens: [
            50364, 5380, 370, 718, 311, 6552, 300, 321, 764, 1269, 14329, 365,
            8213, 1239, 278, 293, 718, 311, 584, 286, 528, 281, 50764,
          ],
        },
        {
          avg_logprob: -0.108054098330046,
          compression_ratio: 1.5578947368421052,
          end: 778.5600000000001,
          id: 119,
          no_speech_prob: 0.004000242333859205,
          seek: 76272,
          start: 770.72,
          temperature: 0,
          text: " have 60,000 values in my house table if I want to maintain let's say on average 2.5 comparisons and",
          tokens: [
            50764, 362, 4060, 11, 1360, 4190, 294, 452, 1782, 3199, 498, 286,
            528, 281, 6909, 718, 311, 584, 322, 4274, 568, 13, 20, 33157, 293,
            51156,
          ],
        },
        {
          avg_logprob: -0.108054098330046,
          compression_ratio: 1.5578947368421052,
          end: 784.48,
          id: 120,
          no_speech_prob: 0.004000242333859205,
          seek: 76272,
          start: 778.5600000000001,
          temperature: 0,
          text: " not more right if I go back to the slides where I showed you this one for 2.5 comparisons with open",
          tokens: [
            51156, 406, 544, 558, 498, 286, 352, 646, 281, 264, 9788, 689, 286,
            4712, 291, 341, 472, 337, 568, 13, 20, 33157, 365, 1269, 51452,
          ],
        },
        {
          avg_logprob: -0.1350325529391949,
          compression_ratio: 1.751131221719457,
          end: 794.24,
          id: 121,
          no_speech_prob: 0.0027503559831529856,
          seek: 78448,
          start: 784.48,
          temperature: 0,
          text: " addressing and linear probing I need 75% load factor right 0.75 so if I go back here so if let's say",
          tokens: [
            50364, 14329, 293, 8213, 1239, 278, 286, 643, 9562, 4, 3677, 5952,
            558, 1958, 13, 11901, 370, 498, 286, 352, 646, 510, 370, 498, 718,
            311, 584, 50852,
          ],
        },
        {
          avg_logprob: -0.1350325529391949,
          compression_ratio: 1.751131221719457,
          end: 799.9200000000001,
          id: 122,
          no_speech_prob: 0.0027503559831529856,
          seek: 78448,
          start: 794.24,
          temperature: 0,
          text: " I let's say I want to store 60,000 values in a house table without pressing a linear probing I want",
          tokens: [
            50852, 286, 718, 311, 584, 286, 528, 281, 3531, 4060, 11, 1360,
            4190, 294, 257, 1782, 3199, 1553, 12417, 257, 8213, 1239, 278, 286,
            528, 51136,
          ],
        },
        {
          avg_logprob: -0.1350325529391949,
          compression_ratio: 1.751131221719457,
          end: 807.04,
          id: 123,
          no_speech_prob: 0.0027503559831529856,
          seek: 78448,
          start: 799.9200000000001,
          temperature: 0,
          text: " to have 2.5 comparisons that would give me 0.75 for the load factor and this will give me that the",
          tokens: [
            51136, 281, 362, 568, 13, 20, 33157, 300, 576, 976, 385, 1958, 13,
            11901, 337, 264, 3677, 5952, 293, 341, 486, 976, 385, 300, 264,
            51492,
          ],
        },
        {
          avg_logprob: -0.1350325529391949,
          compression_ratio: 1.751131221719457,
          end: 812.8000000000001,
          id: 124,
          no_speech_prob: 0.0027503559831529856,
          seek: 78448,
          start: 807.04,
          temperature: 0,
          text: " size of the house table for open addressing would need to be 80,000 right I want you to",
          tokens: [
            51492, 2744, 295, 264, 1782, 3199, 337, 1269, 14329, 576, 643, 281,
            312, 4688, 11, 1360, 558, 286, 528, 291, 281, 51780,
          ],
        },
        {
          avg_logprob: -0.11649329611595641,
          compression_ratio: 1.8055555555555556,
          end: 819.76,
          id: 125,
          no_speech_prob: 0.004630253184586763,
          seek: 81280,
          start: 813.1999999999999,
          temperature: 0,
          text: " think about the question now what would be the size of a house table with chaining if I wanted to",
          tokens: [
            50384, 519, 466, 264, 1168, 586, 437, 576, 312, 264, 2744, 295, 257,
            1782, 3199, 365, 417, 3686, 498, 286, 1415, 281, 50712,
          ],
        },
        {
          avg_logprob: -0.11649329611595641,
          compression_ratio: 1.8055555555555556,
          end: 827.5999999999999,
          id: 126,
          no_speech_prob: 0.004630253184586763,
          seek: 81280,
          start: 819.76,
          temperature: 0,
          text: " have the same performance right so 2.5 comparisons on average and again keep in mind for this question",
          tokens: [
            50712, 362, 264, 912, 3389, 558, 370, 568, 13, 20, 33157, 322, 4274,
            293, 797, 1066, 294, 1575, 337, 341, 1168, 51104,
          ],
        },
        {
          avg_logprob: -0.11649329611595641,
          compression_ratio: 1.8055555555555556,
          end: 832.4799999999999,
          id: 127,
          no_speech_prob: 0.004630253184586763,
          seek: 81280,
          start: 827.5999999999999,
          temperature: 0,
          text: " that this is the number of comparisons where we get on a house table with chaining right so if I",
          tokens: [
            51104, 300, 341, 307, 264, 1230, 295, 33157, 689, 321, 483, 322,
            257, 1782, 3199, 365, 417, 3686, 558, 370, 498, 286, 51348,
          ],
        },
        {
          avg_logprob: -0.11649329611595641,
          compression_ratio: 1.8055555555555556,
          end: 838.56,
          id: 128,
          no_speech_prob: 0.004630253184586763,
          seek: 81280,
          start: 832.4799999999999,
          temperature: 0,
          text: " want to have see 2.5 what is the load factor so you can pause the video here and think about",
          tokens: [
            51348, 528, 281, 362, 536, 568, 13, 20, 437, 307, 264, 3677, 5952,
            370, 291, 393, 10465, 264, 960, 510, 293, 519, 466, 51652,
          ],
        },
        {
          avg_logprob: -0.11573290824890137,
          compression_ratio: 1.6160714285714286,
          end: 843.8399999999999,
          id: 129,
          no_speech_prob: 0.0013070349814370275,
          seek: 83856,
          start: 839.1199999999999,
          temperature: 0,
          text: " what would be the size of a house table with chaining we get the same performance right",
          tokens: [
            50392, 437, 576, 312, 264, 2744, 295, 257, 1782, 3199, 365, 417,
            3686, 321, 483, 264, 912, 3389, 558, 50628,
          ],
        },
        {
          avg_logprob: -0.11573290824890137,
          compression_ratio: 1.6160714285714286,
          end: 849.76,
          id: 130,
          no_speech_prob: 0.0013070349814370275,
          seek: 83856,
          start: 845.28,
          temperature: 0,
          text: " so pause the video think about this question resume when you have solved that question",
          tokens: [
            50700, 370, 10465, 264, 960, 519, 466, 341, 1168, 15358, 562, 291,
            362, 13041, 300, 1168, 50924,
          ],
        },
        {
          avg_logprob: -0.11573290824890137,
          compression_ratio: 1.6160714285714286,
          end: 860.56,
          id: 131,
          no_speech_prob: 0.0013070349814370275,
          seek: 83856,
          start: 854.16,
          temperature: 0,
          text: " okay so now I want to show you the answer to this one right so if we have again open addressing",
          tokens: [
            51144, 1392, 370, 586, 286, 528, 281, 855, 291, 264, 1867, 281, 341,
            472, 558, 370, 498, 321, 362, 797, 1269, 14329, 51464,
          ],
        },
        {
          avg_logprob: -0.11573290824890137,
          compression_ratio: 1.6160714285714286,
          end: 867.76,
          id: 132,
          no_speech_prob: 0.0013070349814370275,
          seek: 83856,
          start: 860.56,
          temperature: 0,
          text: " with 60,000 items in the house table we need a load factor of 0.75 for 2.5 comparisons this",
          tokens: [
            51464, 365, 4060, 11, 1360, 4754, 294, 264, 1782, 3199, 321, 643,
            257, 3677, 5952, 295, 1958, 13, 11901, 337, 568, 13, 20, 33157, 341,
            51824,
          ],
        },
        {
          avg_logprob: -0.14001800576034856,
          compression_ratio: 1.6512605042016806,
          end: 874.08,
          id: 133,
          no_speech_prob: 0.0010347414063289762,
          seek: 86776,
          start: 867.76,
          temperature: 0,
          text: " result in 80,000 for the size of the house table with open addressing a linear problem for the same",
          tokens: [
            50364, 1874, 294, 4688, 11, 1360, 337, 264, 2744, 295, 264, 1782,
            3199, 365, 1269, 14329, 257, 8213, 1154, 337, 264, 912, 50680,
          ],
        },
        {
          avg_logprob: -0.14001800576034856,
          compression_ratio: 1.6512605042016806,
          end: 880.56,
          id: 134,
          no_speech_prob: 0.0010347414063289762,
          seek: 86776,
          start: 874.08,
          temperature: 0,
          text: " size or for the same performance if I want to have chaining right 2.5 as I showed you the formula before",
          tokens: [
            50680, 2744, 420, 337, 264, 912, 3389, 498, 286, 528, 281, 362, 417,
            3686, 558, 568, 13, 20, 382, 286, 4712, 291, 264, 8513, 949, 51004,
          ],
        },
        {
          avg_logprob: -0.14001800576034856,
          compression_ratio: 1.6512605042016806,
          end: 888.48,
          id: 135,
          no_speech_prob: 0.0010347414063289762,
          seek: 86776,
          start: 881.12,
          temperature: 0,
          text: " 1 plus L over 2 so if I multiply everything with 2 I get here and then I subtract 2 from both sides",
          tokens: [
            51032, 502, 1804, 441, 670, 568, 370, 498, 286, 12972, 1203, 365,
            568, 286, 483, 510, 293, 550, 286, 16390, 568, 490, 1293, 4881,
            51400,
          ],
        },
        {
          avg_logprob: -0.14001800576034856,
          compression_ratio: 1.6512605042016806,
          end: 895.2,
          id: 136,
          no_speech_prob: 0.0010347414063289762,
          seek: 86776,
          start: 889.12,
          temperature: 0,
          text: " remember what is the load factor right it's 60,000 divided by the size of my house table",
          tokens: [
            51432, 1604, 437, 307, 264, 3677, 5952, 558, 309, 311, 4060, 11,
            1360, 6666, 538, 264, 2744, 295, 452, 1782, 3199, 51736,
          ],
        },
        {
          avg_logprob: -0.0841737767701508,
          compression_ratio: 1.9138755980861244,
          end: 901.9200000000001,
          id: 137,
          no_speech_prob: 0.005349422805011272,
          seek: 89520,
          start: 895.84,
          temperature: 0,
          text: " so that the house table is 20,000 here so does that mean that I need less space so I get better",
          tokens: [
            50396, 370, 300, 264, 1782, 3199, 307, 945, 11, 1360, 510, 370, 775,
            300, 914, 300, 286, 643, 1570, 1901, 370, 286, 483, 1101, 50700,
          ],
        },
        {
          avg_logprob: -0.0841737767701508,
          compression_ratio: 1.9138755980861244,
          end: 907.36,
          id: 138,
          no_speech_prob: 0.005349422805011272,
          seek: 89520,
          start: 901.9200000000001,
          temperature: 0,
          text: " performance and less space with chaining is at the case here again let's pause here for a minute",
          tokens: [
            50700, 3389, 293, 1570, 1901, 365, 417, 3686, 307, 412, 264, 1389,
            510, 797, 718, 311, 10465, 510, 337, 257, 3456, 50972,
          ],
        },
        {
          avg_logprob: -0.0841737767701508,
          compression_ratio: 1.9138755980861244,
          end: 912.08,
          id: 139,
          no_speech_prob: 0.005349422805011272,
          seek: 89520,
          start: 907.36,
          temperature: 0,
          text: " and think about this question right do I need less space for a house table with open addressing and chaining",
          tokens: [
            50972, 293, 519, 466, 341, 1168, 558, 360, 286, 643, 1570, 1901,
            337, 257, 1782, 3199, 365, 1269, 14329, 293, 417, 3686, 51208,
          ],
        },
        {
          avg_logprob: -0.0841737767701508,
          compression_ratio: 1.9138755980861244,
          end: 921.36,
          id: 140,
          no_speech_prob: 0.005349422805011272,
          seek: 89520,
          start: 915.2,
          temperature: 0,
          text: " okay if you thought about this question let me actually again we found that for a house table with",
          tokens: [
            51364, 1392, 498, 291, 1194, 466, 341, 1168, 718, 385, 767, 797,
            321, 1352, 300, 337, 257, 1782, 3199, 365, 51672,
          ],
        },
        {
          avg_logprob: -0.08364013886787522,
          compression_ratio: 1.646341463414634,
          end: 926.96,
          id: 141,
          no_speech_prob: 0.0014291483676061034,
          seek: 92136,
          start: 921.36,
          temperature: 0,
          text: " chaining we need 20,000 for the size of the house table so let me go back to the board and I believe I",
          tokens: [
            50364, 417, 3686, 321, 643, 945, 11, 1360, 337, 264, 2744, 295, 264,
            1782, 3199, 370, 718, 385, 352, 646, 281, 264, 3150, 293, 286, 1697,
            286, 50644,
          ],
        },
        {
          avg_logprob: -0.08364013886787522,
          compression_ratio: 1.646341463414634,
          end: 936.72,
          id: 142,
          no_speech_prob: 0.0014291483676061034,
          seek: 92136,
          start: 926.96,
          temperature: 0,
          text: " have stealing what they drew before on the board perfect yes so what did we find here we found",
          tokens: [
            50644, 362, 19757, 437, 436, 12804, 949, 322, 264, 3150, 2176, 2086,
            370, 437, 630, 321, 915, 510, 321, 1352, 51132,
          ],
        },
        {
          avg_logprob: -0.08364013886787522,
          compression_ratio: 1.646341463414634,
          end: 942.24,
          id: 143,
          no_speech_prob: 0.0014291483676061034,
          seek: 92136,
          start: 937.36,
          temperature: 0,
          text: " the size of this house table right so this is going to be 20,000 here so",
          tokens: [
            51164, 264, 2744, 295, 341, 1782, 3199, 558, 370, 341, 307, 516,
            281, 312, 945, 11, 1360, 510, 370, 51408,
          ],
        },
        {
          avg_logprob: -0.1273377990722656,
          compression_ratio: 1.7468354430379747,
          end: 955.6800000000001,
          id: 144,
          no_speech_prob: 0.007957425899803638,
          seek: 94224,
          start: 943.04,
          temperature: 0,
          text: " if this is 20,000 right this means that for 20,000 elements these are just references to",
          tokens: [
            50404, 498, 341, 307, 945, 11, 1360, 558, 341, 1355, 300, 337, 945,
            11, 1360, 4959, 613, 366, 445, 15400, 281, 51036,
          ],
        },
        {
          avg_logprob: -0.1273377990722656,
          compression_ratio: 1.7468354430379747,
          end: 962.64,
          id: 145,
          no_speech_prob: 0.007957425899803638,
          seek: 94224,
          start: 955.6800000000001,
          temperature: 0,
          text: " linked lists I have a total of 60,000 right so let me get my pen here so I have a total of 60,000",
          tokens: [
            51036, 9408, 14511, 286, 362, 257, 3217, 295, 4060, 11, 1360, 558,
            370, 718, 385, 483, 452, 3435, 510, 370, 286, 362, 257, 3217, 295,
            4060, 11, 1360, 51384,
          ],
        },
        {
          avg_logprob: -0.1273377990722656,
          compression_ratio: 1.7468354430379747,
          end: 968.88,
          id: 146,
          no_speech_prob: 0.007957425899803638,
          seek: 94224,
          start: 962.64,
          temperature: 0,
          text: " values these 60,000 values I need to start my house table these are going to be stored in",
          tokens: [
            51384, 4190, 613, 4060, 11, 1360, 4190, 286, 643, 281, 722, 452,
            1782, 3199, 613, 366, 516, 281, 312, 12187, 294, 51696,
          ],
        },
        {
          avg_logprob: -0.10421309932585686,
          compression_ratio: 1.91,
          end: 973.84,
          id: 147,
          no_speech_prob: 0.009279563091695309,
          seek: 96888,
          start: 968.88,
          temperature: 0,
          text: " elements in all of these linked lists in my house table chain right for every element if I assume",
          tokens: [
            50364, 4959, 294, 439, 295, 613, 9408, 14511, 294, 452, 1782, 3199,
            5021, 558, 337, 633, 4478, 498, 286, 6552, 50612,
          ],
        },
        {
          avg_logprob: -0.10421309932585686,
          compression_ratio: 1.91,
          end: 979.36,
          id: 148,
          no_speech_prob: 0.009279563091695309,
          seek: 96888,
          start: 973.84,
          temperature: 0,
          text: " I use singly linked list for every element I need the value and the reference to the next so for",
          tokens: [
            50612, 286, 764, 1522, 356, 9408, 1329, 337, 633, 4478, 286, 643,
            264, 2158, 293, 264, 6408, 281, 264, 958, 370, 337, 50888,
          ],
        },
        {
          avg_logprob: -0.10421309932585686,
          compression_ratio: 1.91,
          end: 984.56,
          id: 149,
          no_speech_prob: 0.009279563091695309,
          seek: 96888,
          start: 979.36,
          temperature: 0,
          text: " each one of these 60,000 elements on all of these linked lists I need a hundred and 20,000",
          tokens: [
            50888, 1184, 472, 295, 613, 4060, 11, 1360, 4959, 322, 439, 295,
            613, 9408, 14511, 286, 643, 257, 3262, 293, 945, 11, 1360, 51148,
          ],
        },
        {
          avg_logprob: -0.10421309932585686,
          compression_ratio: 1.91,
          end: 990.96,
          id: 150,
          no_speech_prob: 0.009279563091695309,
          seek: 96888,
          start: 984.56,
          temperature: 0,
          text: " references to the memory plus the 20,000 for the actual house table here so that would give me a",
          tokens: [
            51148, 15400, 281, 264, 4675, 1804, 264, 945, 11, 1360, 337, 264,
            3539, 1782, 3199, 510, 370, 300, 576, 976, 385, 257, 51468,
          ],
        },
        {
          avg_logprob: -0.15138281716240776,
          compression_ratio: 1.837962962962963,
          end: 998.8000000000001,
          id: 151,
          no_speech_prob: 0.002344160806387663,
          seek: 99096,
          start: 990.96,
          temperature: 0,
          text: " total of 140,000 right 140k references to the memory for this whole representation of the house table",
          tokens: [
            50364, 3217, 295, 21548, 11, 1360, 558, 21548, 74, 15400, 281, 264,
            4675, 337, 341, 1379, 10290, 295, 264, 1782, 3199, 50756,
          ],
        },
        {
          avg_logprob: -0.15138281716240776,
          compression_ratio: 1.837962962962963,
          end: 1003.12,
          id: 152,
          no_speech_prob: 0.002344160806387663,
          seek: 99096,
          start: 998.8000000000001,
          temperature: 0,
          text: " with chaining because I have the table and then I have all the linked lists that all of them will",
          tokens: [
            50756, 365, 417, 3686, 570, 286, 362, 264, 3199, 293, 550, 286, 362,
            439, 264, 9408, 14511, 300, 439, 295, 552, 486, 50972,
          ],
        },
        {
          avg_logprob: -0.15138281716240776,
          compression_ratio: 1.837962962962963,
          end: 1008.72,
          id: 153,
          no_speech_prob: 0.002344160806387663,
          seek: 99096,
          start: 1003.12,
          temperature: 0,
          text: " have these 60,000 values here remember that on this representation I don't have any values stored",
          tokens: [
            50972, 362, 613, 4060, 11, 1360, 4190, 510, 1604, 300, 322, 341,
            10290, 286, 500, 380, 362, 604, 4190, 12187, 51252,
          ],
        },
        {
          avg_logprob: -0.15138281716240776,
          compression_ratio: 1.837962962962963,
          end: 1017.9200000000001,
          id: 154,
          no_speech_prob: 0.002344160806387663,
          seek: 99096,
          start: 1008.72,
          temperature: 0,
          text: " here so the actual house table just has references to the actual linked list here okay so let me go",
          tokens: [
            51252, 510, 370, 264, 3539, 1782, 3199, 445, 575, 15400, 281, 264,
            3539, 9408, 1329, 510, 1392, 370, 718, 385, 352, 51712,
          ],
        },
        {
          avg_logprob: -0.10165818769540359,
          compression_ratio: 1.5309278350515463,
          end: 1032.24,
          id: 155,
          no_speech_prob: 0.0024704390671104193,
          seek: 101792,
          start: 1017.92,
          temperature: 0,
          text: " back to the slides so following this analysis here again 140,000 would be for a house table with",
          tokens: [
            50364, 646, 281, 264, 9788, 370, 3480, 341, 5215, 510, 797, 21548,
            11, 1360, 576, 312, 337, 257, 1782, 3199, 365, 51080,
          ],
        },
        {
          avg_logprob: -0.10165818769540359,
          compression_ratio: 1.5309278350515463,
          end: 1037.36,
          id: 156,
          no_speech_prob: 0.0024704390671104193,
          seek: 101792,
          start: 1032.24,
          temperature: 0,
          text: " chaining if I wanted the same performance right it was only 80,000 for open addressing with linear",
          tokens: [
            51080, 417, 3686, 498, 286, 1415, 264, 912, 3389, 558, 309, 390,
            787, 4688, 11, 1360, 337, 1269, 14329, 365, 8213, 51336,
          ],
        },
        {
          avg_logprob: -0.10165818769540359,
          compression_ratio: 1.5309278350515463,
          end: 1044.3999999999999,
          id: 157,
          no_speech_prob: 0.0024704390671104193,
          seek: 101792,
          start: 1037.36,
          temperature: 0,
          text: " probing so chaining has its own benefits performance better but it does require more storage than the",
          tokens: [
            51336, 1239, 278, 370, 417, 3686, 575, 1080, 1065, 5311, 3389, 1101,
            457, 309, 775, 3651, 544, 6725, 813, 264, 51688,
          ],
        },
        {
          avg_logprob: -0.14852657037622788,
          compression_ratio: 1.7575757575757576,
          end: 1050,
          id: 158,
          no_speech_prob: 0.001229739747941494,
          seek: 104440,
          start: 1044.4,
          temperature: 0,
          text: " open addressing with linear probing so if storage is an issue in those cases we use open addressing",
          tokens: [
            50364, 1269, 14329, 365, 8213, 1239, 278, 370, 498, 6725, 307, 364,
            2734, 294, 729, 3331, 321, 764, 1269, 14329, 50644,
          ],
        },
        {
          avg_logprob: -0.14852657037622788,
          compression_ratio: 1.7575757575757576,
          end: 1056.48,
          id: 159,
          no_speech_prob: 0.001229739747941494,
          seek: 104440,
          start: 1050,
          temperature: 0,
          text: " with linear probing with this one I'm going to stop here on the next video I'm going to discuss",
          tokens: [
            50644, 365, 8213, 1239, 278, 365, 341, 472, 286, 478, 516, 281,
            1590, 510, 322, 264, 958, 960, 286, 478, 516, 281, 2248, 50968,
          ],
        },
        {
          avg_logprob: -0.14852657037622788,
          compression_ratio: 1.7575757575757576,
          end: 1063.3600000000001,
          id: 160,
          no_speech_prob: 0.001229739747941494,
          seek: 104440,
          start: 1056.48,
          temperature: 0,
          text: " about the house functions we can use to map a value into an index in the house table thank you",
          tokens: [
            50968, 466, 264, 1782, 6828, 321, 393, 764, 281, 4471, 257, 2158,
            666, 364, 8186, 294, 264, 1782, 3199, 1309, 291, 51312,
          ],
        },
      ],
      text: " Welcome everyone. In this video we will discuss the effect of the size that we use for a stable on its performance. So let me share the slides to begin with. Again in our last class we discussed how can we handle when we have a collision using a stable we discuss two main ways the first one being the open addressing with linear probing or the additional ways we can have to do the probing or the chaining. We discussed what are the pros and cons for each one of them. Now these three items that I have here as I mentioned in our last class these are the three decision choices we have to think about every time we design a new house table. These three are also interconnected with each other right so the decision we take for one of these three topics here affects how we handle the rest of the decisions for these items here. So are we going to use chaining or open addressing for handling the collisions. The decision about what should be the size of the house table we use that's going to be different based on that decision. And of course everything depends on a good house function that's what I will discuss on the next you can excuse me. So when it comes to the size of the table right if we think about open addressing we cannot have more elements in a house table than the actual size of the house table that we're using because in every location in the area again we store each one of the elements of our data structure. For chaining this is not the case right so if I have chaining again I initialize my house table with a size that might be less than the actual values I'm going to end up storing in my data structure. What this means because on every location of the array I have a linked list right I can have a number of elements in there so in the end I can have more values in my house table than the actual size of the table I'm using. When it comes to performance of house tables right we saw in our last class that if we have open addressing and the array gets pretty full then the performance instead of constant running time as we expect for a house table it gets closer to linear running time. So how can we make sure that we never get the linear running time by controlling the load factor. The load factor is the greatest effect is the greatest impact about the performance of house tables right. How is this defined is the number of elements that have stored in my data structure divided by the table size. As you can imagine for open addressing this cannot be more than one right I cannot have more elements than the actual size of the array for open addressing. For house table this is not with a chaining however this is not the case so I can have more than one element in every element of the array in every location of the array because these are added in a linked list that is connected to that location of the array. Okay so the first thing I want to show you here is a formula that is just an approximation. Now this is what we're going to use for this discussion here. Our textbook has a more detailed probabilistic analysis that will give us an expected number of comparisons when we perform a search operation in a house table again a search operation for an item that does exist in our house table using open addressing with linear probing. The formula I give you here is a bit more simplified and this is derived by Donald Luth which by many people is considered to be the father of the analysis of algorithms. So what this says right this says that if I perform a search in a house table with open addressing and the load factor is L this is going to give me the expected number of comparisons I'm going to do. So let's plug in a couple of values and see what this formula says really right if load factor is 0 so I don't have any elements right then this fraction becomes one and then I have in the parentheses 1 plus 1 2 divided by 1 probe right I'm never going to have to do an additional probe if my house table is empty. Now of course if the load factor tends to 1 you get it gets closer to 1 this gives us an infinity value right because or tends to infinity it's not really infinity but the load factor we never really allow it to get to 1 in real life. Now for the training things are a bit simpler right how many probes do I have to do for a search of an element that I know exists I assume it exists in my house table. The first thing I want to do and actually let me go to the wideboard here so let me stop sharing this one let me show you on the wideboard. Perfect. So let's say again how does this house table with training looks like? I initialize my array which can have any size let's say this size has m elements or m locations this array right every location of the array points to a linked list. If there is no elements here that would be just an alpha you here otherwise let's say the first location I have two elements that were mapped into this index on my house table these are added in a linked list. Now the load factor here can exceed one right because let's assume that every linked list here has two elements if I have m locations in this house table with training I would have two m elements total in my data structure so the load factor would be between that case. Now again if we are in an ideal scenario and we have a house function that takes every value that I want to store in my house table and creates a uniform distribution of the values of the input values into the indexes of this house table then I'm going to have an equal number of elements in every linked list here right so if my load factor let's say is two this is going to give me the average length of every linked list in here and again some linked list might have three elements and one but the average is going to be two elements per linked list right. Okay so if a performance search right what is the expected number of comparisons based on the load factor the first probe I always have to do I estimate I get my key I get the house code and I find the index the first probe is taking the element in the table does it point to a linked list or to an alpha so that's my first probe and then on average let's say I have my load factor to be three right for a successful search it might be on the first second or third element so if L which is a load factor also gives me again as we discussed the average length of every linked list on average I may have to scan half of my linked list right if I'm very lucky it might be the head if I'm very unlucky might be the tail of the linked list but on average it's going to be some going to be so what is the number of the probe the number of comparisons here is one for checking the initial location in the table plus the load factor divided by two because a load factor again gives me the average length of every linked list on my house table when we use chaining here okay so let me go back to the slides so this is what we discuss here this is for the chain right so we have these two formulas now using these two formulas we can actually I have a table on the slides just to show you based on the load factor what is the performance of these two implementations for handling collisions right open addressing with linear probing or chaining of course if the has table is empty load factor zero just one probe for every the search operation if I have let's say 90% what this means if I have linear probing 90% of the locations of the array are four even in that scenario the average or expected number of comparisons for a search operation is five and a half so it's not terrible right but again as you see here for chaining this is just one approximately 1.5 so this performs significantly better and the difference I remember here is that for linear probing my house table limits how many elements the size of my house table limits how many elements I can store in my data structure that's not the case for chaining there is no so the load factor can go to two three four five and more that value will be the average length of every link list on my class table chaining how does this compare with a binary set tree we're going to discuss a lot more about binary set trees in our next class however a binary set tree has a login operations for a search operation again assuming that the binary set tree is balanced we'll discuss a lot more about it in the next few classes but let's say even for a small instance of a binary set tree with 120 and the elements for example I require seven probes right which is more than any house table that has up to 90% capacity in search and removal in order to get those operations for house table again we expect constant running time operations but if we have let's say house table with open addressing and linear probing and we get to 99% full then worst case becomes linear here sorted array this would if we keep the kept the sorted array to perform binary search that would be big go offend to insert an element in its correct position and binary set tree log n again if it's not balanced however it can get linear as well now it looks like the house table we change performs a lot better right so why would we ever consider using linear probing the answer is the storage requirements right so we saw how the house table size affects the performance and in reality right when we use house tables what do we want to do we want to make sure if we use linear probing specifically if we exceed the specific load factor let's say 85 90% resize to a new array re-hash all the values and use a bigger instance of the array to always make sure that our search operation is going to be performed in constant running time and not linear so for the storage requirements the performance of housing is superior of course to binary search trees particularly the load factor is less than 75% and also this difference increases with the size of the data structure for the binary search tree is not affected really for how many values I store for my house tables as long as I maintain good load factor a binary search tree I remember requires four references per note the actual value references to pattern left and right children so more storage is required for a binary search tree of a house table with let's say 75% capacity or all Japan see I should say here so just to give you an example here right for open addressing things are very simple if I have the number of references to items is n again this assumes that we have a full array in reality it's going to be n divided by the load factor to get their house table size how many references I need the memory for changing the average number of nodes in elistice cell right the load factor as I we discussed earlier and n is the number of table elements so using a double linked list there will be three references in each node the item next in preview so as we discuss in one of our last classes using a single linked list we reduce the number of references by one so the total storage and this is right for the first array that has the links to each one of the linked list so we have n for that size and then plus two times n times l for because for every again for every one of the values that I have in my data structure if I have n values I need two references and then l is the expected length of each linked list right so at this point I'm going to give you a small exercise so let's assume that we use open addressing with linear probing and let's say I want to have 60,000 values in my house table if I want to maintain let's say on average 2.5 comparisons and not more right if I go back to the slides where I showed you this one for 2.5 comparisons with open addressing and linear probing I need 75% load factor right 0.75 so if I go back here so if let's say I let's say I want to store 60,000 values in a house table without pressing a linear probing I want to have 2.5 comparisons that would give me 0.75 for the load factor and this will give me that the size of the house table for open addressing would need to be 80,000 right I want you to think about the question now what would be the size of a house table with chaining if I wanted to have the same performance right so 2.5 comparisons on average and again keep in mind for this question that this is the number of comparisons where we get on a house table with chaining right so if I want to have see 2.5 what is the load factor so you can pause the video here and think about what would be the size of a house table with chaining we get the same performance right so pause the video think about this question resume when you have solved that question okay so now I want to show you the answer to this one right so if we have again open addressing with 60,000 items in the house table we need a load factor of 0.75 for 2.5 comparisons this result in 80,000 for the size of the house table with open addressing a linear problem for the same size or for the same performance if I want to have chaining right 2.5 as I showed you the formula before 1 plus L over 2 so if I multiply everything with 2 I get here and then I subtract 2 from both sides remember what is the load factor right it's 60,000 divided by the size of my house table so that the house table is 20,000 here so does that mean that I need less space so I get better performance and less space with chaining is at the case here again let's pause here for a minute and think about this question right do I need less space for a house table with open addressing and chaining okay if you thought about this question let me actually again we found that for a house table with chaining we need 20,000 for the size of the house table so let me go back to the board and I believe I have stealing what they drew before on the board perfect yes so what did we find here we found the size of this house table right so this is going to be 20,000 here so if this is 20,000 right this means that for 20,000 elements these are just references to linked lists I have a total of 60,000 right so let me get my pen here so I have a total of 60,000 values these 60,000 values I need to start my house table these are going to be stored in elements in all of these linked lists in my house table chain right for every element if I assume I use singly linked list for every element I need the value and the reference to the next so for each one of these 60,000 elements on all of these linked lists I need a hundred and 20,000 references to the memory plus the 20,000 for the actual house table here so that would give me a total of 140,000 right 140k references to the memory for this whole representation of the house table with chaining because I have the table and then I have all the linked lists that all of them will have these 60,000 values here remember that on this representation I don't have any values stored here so the actual house table just has references to the actual linked list here okay so let me go back to the slides so following this analysis here again 140,000 would be for a house table with chaining if I wanted the same performance right it was only 80,000 for open addressing with linear probing so chaining has its own benefits performance better but it does require more storage than the open addressing with linear probing so if storage is an issue in those cases we use open addressing with linear probing with this one I'm going to stop here on the next video I'm going to discuss about the house functions we can use to map a value into an index in the house table thank you",
    },
  };

  const uploadVideo = async () => {
    localStorage.removeItem("uploadResponse");
    if (!file) {
      alert("Please select a video file.");
      return;
    }

    const formData = new FormData();
    formData.append("video", file);

    try {
      const response = await fetch("http://localhost:5001/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // setUploadStatus("Upload successful! Processing video...");
        console.log("Upload successful! Processing video...");
        const uploadResponse = await response.json();
        console.log(uploadResponse);
        localStorage.setItem("uploadResponse", JSON.stringify(uploadResponse));
      } else {
        // setUploadStatus("Upload failed. Please try again.");
        console.error("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      // setUploadStatus("Error uploading file.");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type.startsWith("video/")) {
      setFile(droppedFile);
    } else {
      toast("Invalid file type", {
        description: "Please upload a video file.",
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const showUploadProgress = async () => {
    // Simulate upload progress
    const uploadProgress = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(uploadProgress);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setProgress(0);

    try {
      showUploadProgress();
      await uploadVideo();

      // Simulate API call for processing
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const db = await window.indexedDB.open("fileDB", 1);
      db.onsuccess = () => {
        const transaction = db.result.transaction("files", "readwrite");
        const store = transaction.objectStore("files");
        store.put(file, "uploadedFile"); // Save file to IndexedDB
      };

      // setFileURL(URL.createObjectURL(file));

      const fileURL = URL.createObjectURL(file);
      localStorage.setItem("fileURL", fileURL);
      router.push(`/processing?filename=${encodeURIComponent(file.name)}`);
    } catch (error) {
      console.error(error);
      toast("Upload failed", {
        description: "There was an error uploading your video.",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25",
          file ? "bg-muted/50" : "hover:bg-muted/50"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !file && document.getElementById("file-upload")?.click()}
      >
        {!file ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="rounded-full bg-primary/10 p-4">
              <UploadIcon className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-lg font-medium">
                Drag and drop your video here
              </p>
              <p className="text-sm text-muted-foreground">
                Or click to browse files
              </p>
            </div>
            <input
              id="file-upload"
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-primary/10 p-3">
                <File className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-medium truncate max-w-[200px] sm:max-w-[300px]">
                  {file.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
              disabled={uploading}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Remove file</span>
            </Button>
          </div>
        )}
      </div>

      {file && (
        <div className="space-y-4">
          {uploading && (
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-center text-muted-foreground">
                Uploading... {progress}%
              </p>
            </div>
          )}
          <Button
            className="w-full"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? "Processing..." : "Upload and Process"}
          </Button>
        </div>
      )}
    </div>
  );
}
