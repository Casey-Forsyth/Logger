

var buffer = []

function rec(data) {
    if(buffer.length>10){
        buffer.pop();
    }
    buffer.unshift(data);

}

function get() {
    return buffer;
}

module.exports = {
    get,
    rec
}