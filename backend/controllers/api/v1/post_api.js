const Post = require("../../../models/post");
const Like = require("../../../models/like");
const { statusCode } = require("../../../lib/constants");

module.exports.feeds = async (req, res) => {
    try {
       //Fetch All Post
       let posts = await Post.find({})
                            .sort('-createdAt')
                            .populate('user', 'name email');

       return res.status(statusCode.OK).json({
           message: "List of posts",
           success: true,
           posts
       });
             
    } catch (err) {
        return res.status(statusCode.InternalServerError).json({ 
            message: "Internal Server Error",
            success: false
        })
    }
}

module.exports.create = async (req, res) => {
    try {
       const { content } = req.body;
       
       //Create Post
       let post = await Post.create({
           content,
           user: req.userId,
       });

       return res.status(statusCode.OK).json({
           message: "Post Created Successfuly!",
           success: true,
           post
       });
             
    } catch (err) {
        return res.status(statusCode.InternalServerError).json({ 
            message: "Internal Server Error",
            success: false
        })
    }
}

module.exports.delete = async (req, res) => {
    try {
       const { id } = req.params;
       
       //Find Post
       let post = await Post.findById(id);

       if(post.user ===  req.userId) {
          //Delete like from Like as Post
          await Like.deleteMany({
              like: post._id,
              onModel: 'Post'
          });
     
          //Delete like from Like as Comment
          await Like.deleteMany({
            like: {                 //or use _id
                $in: post.comments
            }
          });
          
          //delete post
          post.remove();

          //Delete post from Comment
          await Comment.deleteMany({
              post: id
          })
 
         return res.status(statusCode.OK).json({
            message: "Post Deleted Successfuly",
            success: true,
         });
       }

         return res.status(statusCode.Unauthorized).json({ 
            message: "You cannot delete this post",
            success: false
         });
             
    } catch (err) {
        return res.status(statusCode.InternalServerError).json({ 
            message: "Internal Server Error",
            success: false
        })
    }
}


