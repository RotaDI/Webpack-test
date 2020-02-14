async function start() {
    return await Promise.resolve('assycn is working')
}

start().then(console.log)

//const unused = 42

class Util{
    static id = Date.now()
}

console.log('util id', Util.id)




import('lodash').then(_=>{
    console.log('Lodash', _.random(0, 42, true))
})