const Comment = require("../../../models/comment");
const Post = require("../../../models/post");
const Like = require("../../../models/like");

module.exports.toggleLike = async (req, res) => {
    try {
        const { type, id } = req.query;

        let likeable;
        if(type === 'Post') {
          //Find Post with likes
          likeable = await Post.findById(id)
                               .populate('likes');
        } else if(type === 'Comment'){
          //Find Comment with likes
          likeable = await Comment.findById(id)
                                  .populate('likes');
        }
 
        //Check like Exist
        let likeExist = await Like.findOne({
            user: req.userId,
            like : id,
            onModel: type,  
        })

        if(likeExist) {
            //delete like in likes array of Post | Comment
            likeable.likes.pull(likeExist._id);
            likeable.save();
            //delete like from Like
            likeExist.remove();
        } else {
            //Create new like
            let newLike = await Like.create({
                user: req.userId,
                like: id,
                onModel: type
            })

            //save like in likes array of Post | Comment
            likeable.likes.push(newLike._id);
            likeable.save();
        }
       
        return res.status(statusCode.OK).json({ 
            message : "Like toggeled Sucessfully",
            success: true,
         })
 
     } catch (err) {
         return res.status(statusCode.InternalServerError).json({ 
             message: "Internal Server Error",
             success: false
         })
     }
}