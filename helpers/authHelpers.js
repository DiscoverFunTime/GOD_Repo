exports.ensureAuthenticated = (req,res,next) => {
  if(req.isAuthenticated()){
    return next()
  }
  else {
    req.flash('error','Please log in first')
    return res.redirect('/auth/login')
  }
}
exports.preventLoginSignup = (req,res,next) => {
  if(req.isAuthenticated()){
    req.flash('success','You are already logged in')
    return res.redirect('/users')
  }
  else {
    return next();
  }
}
// put req.user in EVERY SINGLE view
exports.currentUser = (req,res,next) =>{
  if(req.isAuthenticated()){
    // set the current user to be req.user
    res.locals.currentUser = req.user
    delete res.locals.currentUser.password
    return next();
  }
  else {
    return next();
  }
}

exports.ensureCorrectUserForPost = (req,res,next) =>{
  if(+req.params.user_id === req.user.id){
    return next()
  }
  else {
    return res.redirect('/users')
  }
}
