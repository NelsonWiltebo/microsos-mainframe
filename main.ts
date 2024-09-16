function getMax (array: any[]) {
    max = 0
    for (let value of array) {
        if (value > max) {
            max = value
        }
    }
    return max
}
radio.onReceivedString(function (receivedString) {
    if (receivedString == "microbitActive") {
        activeIDs.unshift(getMax(activeIDs))
        radio.sendValue("setID", getMax(activeIDs))
    }
})
let max = 0
let activeIDs: number[] = []
radio.setGroup(57)
let ID = 0
activeIDs = []
basic.forever(function () {
	
})
