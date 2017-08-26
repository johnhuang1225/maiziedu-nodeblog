var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Post = mongoose.model('Post'),
  Category = mongoose.model('Category');

module.exports = function (app) {
  app.use('/posts', router);
};

router.get('/', function (req, res, next) {
  Post.find({
      published: true
    })
    .sort('created')
    .populate('author')
    .populate('category')
    .exec(function (err, posts) {
      if (err) next(err);

      var pageNum = Math.abs(parseInt(req.query.page || 1, 10));
      var pageSize = 10;
      var totalCount = posts.length;
      var pageCount = Math.ceil(totalCount / pageSize);

      if (pageNum > pageCount) {
        pageNum = pageCount;
      }

      res.render('blog/index', {
        posts: posts.slice((pageNum-1) * pageSize, pageNum * pageSize),
        pageNum: pageNum,
        pageCount: pageCount,
        pretty: true
      });
    });
});

router.get('/category/:name', function (req, res, next) {
  Category.findOne({name: req.params.name}).exec(function(err, category) {
    if (err) {
      return next(err);
    }
    console.log(`22222 category.name: ${category.name}`);
    Post.find({category: category, published: true})
        .sort('created')
        .populate('category')
        .populate('author')
        .exec(function(err, posts) {
          if (err) {
            return next(err);
          }
          console.log(`33333 category.name: ${category.name}`);
          res.render('blog/category', {
            posts: posts,
            category: category,
            pretty: true
          });
        });
    
  });


});

router.get('/view/:id', function (req, res, next) {
  if (!req.params.id) {
    return next(new Error('no post id provided'));
  }
  // 同時支持id與slug
  var condition = {};
  try {
    condition._id = mongoose.Types.ObjectId(req.params.id);
  } catch (error) {
    condition.slug = req.params.id;
  }
  Post.findOne(condition)
      .populate('category')
      .populate('author')
      .exec(function(err, post) {
        if (err) {
          next(err);
        }
        res.render('blog/view', {
          post: post
        });
      });
});

router.get('/favorites/:id', function (req, res, next) {
  if (!req.params.id) {
    return next(new Error('no post id provided'));
  }
  // 同時支持id與slug
  var condition = {};
  try {
    condition._id = mongoose.Types.ObjectId(req.params.id);
  } catch (error) {
    condition.slug = req.params.id;
  }
  Post.findOne(condition)
      .populate('category')
      .populate('author')
      .exec(function(err, post) {
        if (err) {
          next(err);
        }
        post.meta.favorites = post.meta.favorites ? post.meta.favorites + 1 : 1;
        post.markModified('meta');
        post.save(function(err) {
          res.redirect('/posts/view/' + post.slug);
        });
      });
});

router.get('/comment', function (req, res, next) {});

router.get('/favorites', function (req, res, next) {});
