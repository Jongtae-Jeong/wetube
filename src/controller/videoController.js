import passport from "passport";
import routes from "../routers";
import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/Comment";

export const getJoin = (req, res) => {
    res.render("join", {pageTitle : "Join"});
};


export const postJoin = async (req, res, next) => {
    const {body:{ name, email, password, password2}} = req;
    if(password !== password2){
        res.status(400);
        res.render("join", {pageTitle : "Join"});
    } else {
        try{
            const user = await User({
                name,
                email
            })
            await User.register(user, password);
            next();
        }catch(error){
            console.log(error);
            res.redirect(routes.home);
        }
    }
};


export const getLogin = (req, res) => res.render("login", {pageTitle : "Login"});
export const postLogin = passport.authenticate("local", {
    failureRedirect:routes.login,
    successRedirect:routes.home
})

export const githubLogin = passport.authenticate("github");

export const postGithubLogin = (req, res) =>{
    res.redirect(routes.home);
}

export const githubLoginCallback=async (_, __, profile, cb) =>{
    const {
        _json:{id, avator_url:avatarUrl, name, email}
    }=profile;
    try{
        // console.log(profile);
        const user = await User.findOne({email});
        console.log(user);
        if(user){
            console.log(email)
            user.email=email
            user.githubId=id;
            user.save();
            return cb(null,user);
        }
        const newUser = await User.create({
            email,
            name,
            githubId:id,
            avatarUrl
        });
        return cb(null,user);
    }catch(error){
        return cb(error);
    }
}

export const facebookLogin = passport.authenticate("facebook");

export const facebookLoginCallback = (
    accessToken,
    refreshToken,
    profile,
    cb
  ) => {
    console.log(accessToken, refreshToken, profile, cb);
  };

  export const postFacebookLogin = (req, res) =>{
      res.redirect(routes.home);
  }


export const getMe= (req, res) =>{
    res.render("userDetail",{pageTitle:"User Detail", user:req.user});
}

export const logout = (req, res) => {
    req.logout();
    res.redirect(routes.home);
};

export const videos = (req, res) => res.render("videos", {pageTitle : "Videos"});
export const videoDetail = async(req, res) => {
    const {params:{id}}= req;
    try{
        const video = await Video.findById(id).populate("creator").populate("comments");
        res.render("videoDetail", {pageTitle : video.title,video});
    }catch(error){
        res.redirect(routes.home);
    }
    
};
export const deleteVideo = async(req, res) => {
    const {
        params:{id}
    }=req;
    try{
        const video = await Video.findById(id);
        if(parseInt(video.creator._id) !==parseInt(req.user._id)){
            throw Error();
        }else{
            await Video.findOneAndRemove({_id:id});
        }
        

    }catch(error){
        console.log(error);
    }
    res.redirect(routes.home);
};
    
export const getEditVideo = async(req, res) => {
    const {params:{id}} =req;
    try{
        const video = await Video.findById(id);

        if(String(video.creator._id) !==String(req.user._id)){
            throw Error();
        }else{
            res.render("editVideo", {pageTitle : `Edit ${video.title}`,video})
        }
    }catch(error){
        console.log(error);
        res.redirect(routes.home);
    }
};
export const postEditVideo = async(req, res) => {
    const {
        params:{id},
        body:{title,description}
    }=req;
    try{
        await   Video.findOneAndUpdate({_id:id},{title,description});
        res.redirect(routes.videoDetail(id));
    }catch(error){
        console.log(error);
        res.redirect(routes.home);
    }
};


export const getupload = (req, res) => res.render("upload", {pageTitle : "Upload"});
export const postUpload = async (req, res) => {
    const {
        body:{
            title,
            description,
        }
        ,file:{location}
    } = req;
    const newVideo = await Video.create({
        fileUrl:location,
        title,
        description,
        creator:req.user.id
    });
    req.user.videos.push(newVideo.id);
    req.user.save();
    res.redirect(newVideo.id);
};


export const postRegisterView = async(req, res) =>{
    const {params:{id}}=req;
    try{
        const video = await Video.findById(id);
        video.views+=1;
        video.save();
        res.status(200);
    }catch(error){
        res.status(400);
    }finally{
        res.end();
    }

}

export const postAddcomment = async (req,res) =>{
    const {params:{id},body:{comment},user}=req;
    try{
        const video = await Video.findById(id);
        const newComment = await Comment.create({
            text:comment,
            creator:user.id
        });
        video.comments.push(newComment.id);
        video.save();
    }catch(error){
        res.status(400);
    }finally{
        res.end();
    }

}

