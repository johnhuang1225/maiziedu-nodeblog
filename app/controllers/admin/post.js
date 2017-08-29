var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Post = mongoose.model('Post'),
  Category = mongoose.model('Category');

module.exports = function (app) {
  app.use('/admin/posts', router);
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

      res.render('admin/post/index', {
        posts: posts.slice((pageNum - 1) * pageSize, pageNum * pageSize),
        pageNum: pageNum,
        pageCount: pageCount,
        pretty: true
      });
    });
});

router.get('/edit/:id', function (req, res, next) {});

router.post('/edit/:id', function (req, res, next) {});

router.get('/delete/:id', function (req, res, next) {
  if (!req.params.id) {
    return next(new Error('no id provided'));
  }
  Post.remove({_id: req.params.id}).exec(function(err, rowsRemoved) {
    if (err) {
      return next(new Error());
    }
    console.log(`############ Post.remove rowsRemoved: ${rowsRemoved}`);
    if (rowsRemoved) {
      req.flash('success', '文章刪除成功');
    } else {
      req.flash('error', '文章刪除失敗');
    }
    res.redirect('/admin/posts');
  });
});
