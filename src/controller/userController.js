
import User from "../models/User";
import Video from "../models/Video";
import routes from "../routers";


export const home = async(req,res)=> {
    try{
        const videos = await Video.find({}).sort({_id:-1});
        res.render("home", {pageTitle : "home", videos});

    } catch(error){
        console.log(error);
        res.render("home", {pageTitle : "home", videos:[]});
    }

};
export const search = async(req,res)=>{
    const {query:{term:searchingBy}} = req;
    let videos = [];
    try{
        videos = await Video.find({title:{$regex:searchingBy, $options:"i"}
        });

    }catch(error){
        console.log(error);
    }
    res.render("search", {pageTitle : "Search", searchingBy, videos});

};
export const users = (req, res) => {res.render("users", {pageTitle : "Users"})};
export const userDetail = async (req, res) =>{
    const {params:{id}}=req;
    try{
        const user = await User.findById(id).populate("videos");
        console.log(user)
        res.render("userDetail", {pageTitle : "User Detail",user});
    }catch(error){
        req.flash("error", "User not found");
        res.redirect(routes.home);
    }
};
export const getEditProfile = (req, res) => res.render("editProfile", {pageTitle : "Edit Profile"});
export const postEditProfile = async (req, res) => {
    const {body:{name, email}, file}=req;
    console.log(req.user.id);
    try{
        await User.findByIdAndUpdate(req.user.id, {
            name,
            email,
            avatarUrl: file ? file.location : req.user.avatarUrl
        });
        req.flash("success", "Profile updated");
        res.redirect(routes.me);
    }catch(error){
        req.flash("error", "Can't update profile");
        res.redirect(routes.editProfile);
    }
};

export const getChangePassword = (req, res) => res.render("changePassword", {pageTitle : "Change Password"});
export const postChangePassword = async (req, res) =>{
    const {body:{oldPassword,newPassword,newPassword2}}=req;
    console.log(`/users${routes.changePassword}`);
    try{
        if(newPassword !==newPassword2){
            req.flash("error", "Passwords don't match");
            res.status(400);
            res.redirect(`/users${routes.changePassword}`);
            return;
        }
        await req.user.changePassword(oldPassword, newPassword);
        res.redirect(routes.me);
    }catch(error){
        req.flash("error", "Can't change password");
        res.status(400);
        res.redirect(`/users${routes.changePassword}`);
    }

};