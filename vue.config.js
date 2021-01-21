module.exports = {
    publicPath: (() => {
      if (process.env.NODE_ENV !== 'production') {
        return '/';
      }  
      return '/app-utvonal';
  
    })
  };