module.exports = {
    publicPath: (() => {
      if (process.env.NODE_ENV !== 'production') {
        return '/';
      }  
      return '/ws';
  
    })()
  };