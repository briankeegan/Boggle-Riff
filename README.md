## This project is a mess.

I just wanted to get that out of the way. That said, the main challenge here was to get it working and it basically does.

## Boggle Experiment

Challenged myself to build a boggle board and have it "solve" itself.

## The Board

All boards in this page are possible in the official boggle game. It's not just picking 16 random letters - it's picking a random boggle die (that hasn't been used yet) and picking a random side of that die.

## The "Game Logic"

I wrote a script that iterates through all possible combinations of letters on the board. If a combination is nowhere in the dictionary (like "XSFM" or something like that) the script will skip to the next letter. If a combination IS in the dictionary, it adds it to a word list which is ultimately printed on the screen.

## The Word List

Source Host: http://www.mieliestronk.com/wordlist.html
Source: http://www.mieliestronk.com/corncob_caps.txt

The dictionary was the trickiest thing here. It used to slow the whole thing down A LOT. No more!

I removed all the white space from the dictionary file and made it an object full of shorter arrays (instead of one long array, which wasn't playing nice with javascript's indexOf() function). Then I made the game logic check against the appropriate sub-dictionary instead of the entire dictionary and Violå! The dictionary worked!

## Other Dictionaries...

Source: http://www.luke-g.com/boggle/#thedict

I considered other dictionaries but they were WAY larger and full of words I've never seen (that are also not in a regular dictionary), so I ended up not using them.
