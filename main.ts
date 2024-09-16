function getMax (array: any[]) {
    max = 0
    for (let value of array) {
        if (value > max) {
            max = value
        }
    }
    return max
}
function getMin (array: any[]) {
    min = 0
    for (let value of array) {
        if (value < min) {
            min = value
        }
    }
    return min
}
function addID (num: number) {
    activeIDs.unshift(num)
    radio.sendValue("setID", num)
}
radio.onReceivedValue(function (name, value) {
    if (name.includes("_id:" + convertToText(ID))) {
        if (name.includes("microbitActive")) {
            if (value == 0) {
                addID(getMax(activeIDs) + 1)
            } else if (value == 1) {
                addID(getMax(activeIDs) - 1)
            }
        } else if (name.includes("hasFallen")) {
            if (activeIDs.indexOf(value) != -1) {
                allHelp.push(value)
            }
        } else if (name.includes("acceptHelp")) {
            if (activeIDs.indexOf(value) != -1) {
                allHelp.removeAt(activeIDs.indexOf(value))
                radio.sendValue("isHelping_id:-1", value)
            }
        } else if (name.includes("hasHelp")) {
            radio.sendString("recieveHelp_id:" + value)
        }
    }
})
let min = 0
let max = 0
let allHelp: number[] = []
let activeIDs: number[] = []
let ID = 0
radio.setGroup(57)
ID = 0
activeIDs = [ID]
allHelp = []
basic.forever(function () {
    if (allHelp.length > 0) {
        for (let value of allHelp) {
            radio.sendValue("fallHelp_id:-1", value)
        }
    }
})
