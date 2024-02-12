const { readlineReducer } = require('../utils/readLineReducer');

readlineReducer("day7/input.txt", (handBidSortedArr, line) => {
    const [hand, bid] = line.split(' ')
    return addToHandBidSortedArr(handBidSortedArr, { hand, bid: parseInt(bid) })
}, []).then((handBidSortedArr) => {
    const totalWinnings = handBidSortedArr.reduce((acc, { bid }, i) => acc + (bid * (i + 1)), 0)
    console.log(totalWinnings)
})

function addToHandBidSortedArr(handBidSortedArr, handBid) {
    const handBidSortedArrCopy = handBidSortedArr ? [...handBidSortedArr] : []
    const index = handBidSortedArrCopy.findIndex(item => createHand(item.hand).compareTo(createHand(handBid.hand)) >= 0)
    handBidSortedArrCopy.splice(index !== -1 ? index : handBidSortedArrCopy.length, 0, handBid)
    return handBidSortedArrCopy
}

const createHand = (handAsStr) => {

     // from weakest to strongest
    const cardLabelsOrderByStrength = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A']

    const handTypes = {
        HIGH_CARD: { value: 1, description: 'High card' },
        ONE_PAIR: { value: 2, description: 'One pair' },
        TWO_PAIR: { value: 3, description: 'Two pair' },
        THREE_OF_A_KIND: { value: 4, description: 'Three of a kind' },
        FULL_HOUSE: { value: 5, description: 'Full house' },
        FOUR_OF_A_KIND: { value: 6, description: 'Four of a kind' },
        FIVE_OF_A_KIND: { value: 7, description: 'Five of a kind' }
    }

    const hand = handAsStr.split('')
    const jokerReps = hand.filter(handCard => 'J' === handCard).length
    let jokerUsed = false
    
    const compareTo = (anotherHand) => {
        const hand1Value = getType().value
        const hand2Value = anotherHand.getType().value

        if (hand1Value > hand2Value) return 1
        if (hand1Value < hand2Value) return -1

        for (let i = 0; i < hand.length; i++) {
            let hand1CardValue = cardLabelsOrderByStrength.indexOf(hand[i])
            let hand2CardValue = cardLabelsOrderByStrength.indexOf(anotherHand.hand[i])

            if (hand1CardValue > hand2CardValue) return 1
            if (hand1CardValue < hand2CardValue) return -1
        }

        return 0
    }
    
    const getType = () => {

        if (cardLabelsOrderByStrength.some(cardLabel => nOfAKind(cardLabel, 5))) {
            return handTypes.FIVE_OF_A_KIND
        }

        if (cardLabelsOrderByStrength.some(cardLabel => nOfAKind(cardLabel, 4))) {
            return handTypes.FOUR_OF_A_KIND
        }

        const threeOf = cardLabelsOrderByStrength.find(cardLabel => nOfAKind(cardLabel, 3))
        if (threeOf) {
            if (cardLabelsOrderByStrength.some(cardLabel => cardLabel !== threeOf && (!jokerUsed || cardLabel !== 'J') && nOfAKind(cardLabel, 2))) {
                return handTypes.FULL_HOUSE
            }
            return handTypes.THREE_OF_A_KIND
        }

        const twoOf = cardLabelsOrderByStrength.find(cardLabel => nOfAKind(cardLabel, 2))
        if (twoOf) {
            if (cardLabelsOrderByStrength.some(cardLabel => cardLabel !== twoOf && (!jokerUsed || cardLabel !== 'J') && nOfAKind(cardLabel, 2))) {
                return handTypes.TWO_PAIR
            }
            return handTypes.ONE_PAIR
        }

        return handTypes.HIGH_CARD
    }

    const nOfAKind = (cardLabel, n) => {
        const cardReps = hand.filter(handCard => cardLabel === handCard).length

        if (!jokerUsed && cardLabel !== 'J') {
            const result = cardReps + jokerReps === n
            jokerUsed = result && jokerReps > 0
            return result
        }

        return cardReps === n
    }

    return {
        hand,
        compareTo,
        getType
    }
}