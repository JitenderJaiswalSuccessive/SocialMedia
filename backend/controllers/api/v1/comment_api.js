const Comment = require("../../../models/comment");
const Post = require("../../../models/post");
const Like = require("../../../models/like");
const { statusCode } = require("../../../lib/constants");

module.exports.create = async (req, res) => {
    try {
       const { post: postId, content } = req.body;

       //Find Post
       let post = await Post.findById(postId);

       if(post) {
           let comment = await Comment.create({
               content,
               post,
               user: req.userId
           });

           //Add comment in Post
           post.comments.push(comment);
           post.save();

           //Merge comment with user name
           comment = await comment.populate('user', 'name')
                                  .execPopulate();

           return res.status(statusCode.OK).json({
                message: "Comment Published Successfuly",
                success: true,
                comment
            });
       }
       
       return res.status(statusCode.Unauthorized).json({ 
           message: "You cannot comment this post",
           success: false
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

       //Find Comment
       let comment = await Comment.findById(id);

       if(comment.user ===  req.userId) {
           let postId = comment.post; 

           //Delete Comment
           comment.remove();
           
           //Delete Comment from Post
           let post = Post.findByIdAndUpdate(postId, { 
               $pull: {
                   comments: id
                }
            });

            //Delete like from Like
            await Like.deleteMany({
              like: comment._id,
              onModel: 'Comment'
            });

         return res.status(statusCode.OK).json({
            message: "Comment Deleted Successfuly",
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


