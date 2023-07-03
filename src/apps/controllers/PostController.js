const Posts = require('./models/Posts');
const Users = require('../models/Users')

class PostController {
    async create(req, res) {
        const { image, description} = req.body;

        const newPost = await Posts.create({
            image,
            description,
            author_id: req.userId,
        });

        if (!newPost) {
            return res.status(400).json({ message: 'Created post failed'});
        }

        return res.status(200).json({ data: { image, description} });
    }

    async delete(req, res) {
        const { id } = req.params;

        const verifyPost = await Posts.findOne({
            where: {
                id,
            }
        });

        if (!verifyPost) {
            return res.status(404).json({ message: "Post does not exists!"});
        }

        if (verifyPost.author_id !=  req.userId) {
            return res.status(401).json({
                message: "you do not have permission to delete this post!"
            });
        }

        const deletePost = await Posts.destroy({
            where: {
                id,
            }
        });

        if (!deletePost) {
            return res.status(400).json({ message: 'failed to delete this post!'});
        }

        return res.status(200).json({ message: 'Post deleted!' });
    }

    async update(req, res) {
        const { id } = req.params;
        const { image, description } = req.body;

        const verifyPost = await Posts.findOne({
            where: {
                id,
            }
        });

        if (!verifyPost) {
            return res.status(404).json({ message: "Post does not exists!"});
        }

        if (verifyPost.author_id !=  req.userId) {
            return res.status(401).json({
                message: "you do not have permission to delete this post!"
            });
        }

        const postUpdate = await Posts.update(req.body);

        if (!postUpdate) {
            return res.status(400).json({ message: 'Failed to update this post!'});
        }

        return res.status(200).json({ message: 'Post update'});
    }

    async addLike(res,req) {
        const { id } = req.params;

        const verifyPost = await Posts.findOne({
            where: {
                id,
            }
        });

        if (!verifyPost) {
            return res.status(404).json({ message: 'Post does not exists'});
        }

        const postUpdate = await Posts.update({ number_likes: verifyPost.number_likes + 1},
            {
                where: { id }
            });

        if (!postUpdate) {
            return res.status(400).json({ message: 'Failed to add like in this post!'});
        }

        return res.status(200).json({ 
        message: 'Like storaged!',
    })
    }

    async ListMyPosts() {
        const allPosts = awaitPosts.findAll({
            order: [ 'id', 'DESC'],
            where: {
                author_id: req.userId,
            }
        });

        if (!allPosts) {
            return res.status(400).json({ message: 'failed to list alll posts!'})
        }

        const formattedData = [];

        for (const item of allPosts) {
            formattedData.push({
                id: item.id,
                imagem: item.image,
                description: item.description,
                numnber_likes: item.mumber_likes,
            })
            
        }

        return res.status(200).json({
            data: formattedData
        })
    }

    async ListAllPosts (req, res) {
        const allPosts = await PostController.findAll({
            order: [ 'id', 'DESC'],
            atributtes: ['id', 'description', 'image', 'number_likes'],
            include: [
                {
                    model: Users,
                    as: 'user',
                    required: true,
                    atributtes: ['id', 'user_name'],
                }
            ],
        });

        return res.status(200).json({
            data: allPosts,
        })
    }
}

module.exports = new PostController();