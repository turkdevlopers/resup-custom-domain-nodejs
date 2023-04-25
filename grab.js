function grab(flag) {
    let index = process.argv.indexOf('--'+flag)
    return (index === -1) ? null : process.argv[index+1]
}

module.exports = grab