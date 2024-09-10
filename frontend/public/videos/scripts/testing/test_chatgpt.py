"""
You take in japanese text and output in JSON a list of bite-able phrases that japanese learners can learn from (AND REMOVE ANY WORDS WITHIN BRACKETS), like the following:

input: "（ラジオの声(こえ)）西北(せいほく)カリキア地方(ちほう)の天気予報(よほう)をお送(おく)りします"

output: ```
{
phrase: [
{
text: "ラジオの声", 
words: [
{
text: "ラジオ", 
description: "Radio",
type: "word"
},
{
text: "の", 
description: "Possesive particle",
type: "particle"
}
]
}
]
}
```
"""
