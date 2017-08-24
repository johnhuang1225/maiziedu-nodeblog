// 隨機插入大量數據

var loremipsum = require('lorem-ipsum'),
  config = require('./config/config'),
  glob = require('glob'),
  slug = require('slug'),
  mongoose = require('mongoose');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});



_test();

// ====================================
function _test() {
    var Post = mongoose.model('Post');
    Post.find().sort('category').populate('author').populate('category').exec(function(err, posts) {
        if (err) {
            return console.log('cannot find posts');
        }
        posts.forEach(function(post) {
            console.log(`category is ${post.category.name}, author is: ${post.author.name}`)
        });
    });
}


/**
 * 生成 Post 隨機數據
 */
function _createRandomPosts() {
    var Post = mongoose.model('Post');
    var User = mongoose.model('User');
    var Category = mongoose.model('Category');

    User.findOne(function(err, user) {
        if (err) {
            return console.log('cannot find user');
        }
        Category.find(function(err, categories) {
            if (err) {
                return console.log('cannot find categories');
            }
            categories.forEach(function(category) {
                for (var i = 0; i < 35; i++) {
                    var title = loremipsum({count: 1, units: 'sentence'});
                    var post = new Post({
                        title: title,
                        slug: slug(title),
                        content: loremipsum({count: 30, units: 'sentence'}),
                        category: category,
                        author: user,
                        published: true,
                        meta: {favorites: 0},
                        comments: [],
                        created: new Date
                    });

                    post.save(function(err, post) {
                        console.log(`saved post: ${post.slug}`);
                    });
                }
            });

        });
    });
}
