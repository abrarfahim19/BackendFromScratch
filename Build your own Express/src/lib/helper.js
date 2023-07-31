function checkMiddlewareInputs(args) {
    let path = '*';
    let handler = null;
    if (args.length == 2) {
      [path, handler] = args;
    } else {
      handler = args [0];
    }
    if (typeof path !== 'string'){
      throw new Error('Path needs to be a string');
    } else if (typeof handler !== 'function'){
      throw new Error('Middleware needs to be a function!');
    }
    return {
        path,
        handler,
    }
}

module.exports = { checkMiddlewareInputs }