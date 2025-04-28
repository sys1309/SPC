const express = require('express')
const router = express.Router();

const authRoute = require('./authRoutes');
const tweetRoute = require('./tweetRoutes');
const profileRoute = require('./profileRoutes');

app.post('/login', (req,res) => {
    const {email, password} = req.body;

    db.get(query, [email], (err,user)=> {
        if(err || !user || user.password !== password) {
            return res.status(401).json('error:로그인에 실패했습니다');
        }

        req.session.user = {
            id:user.id,
            username: user.username,
            email: user.email
        };
    })
    res.json({ message: '로그인 성공'});
});

app.post('/logout', loginRequired, (req,res)=> {
    req.session.destroy(() => {
        res.json({message:'로그아웃 성공'});
    });
})

app.get('/api/tweets', (req,res) => {
    const query = `
        select * 
        from tweet 
        join user on tweet.user_id = user.id
        order by tweet.id DESC
        `;

    //아래 내용을 줄때 요청자가 좋아한건지 같이 줄 수 없을까?
    //로그인 했을 수도 안했을수도 있음 
    db.all(query, [], (err,tweets)=> {

        if (req.session.user) {
            const userId = req.session.user.id;

            const queryLike = 'select tweet_id from like where user_id=?';
            db.all(queryLike, [userId], (err, likes) => {
                const likedTweetIds = likes.map(like => like.tweet_id);
                const result = tweets.map(tweet => ({
                    ...tweet,
                    liked_by_current_user: likedTweetIds.includes(tweet.id)
                }));
                res.json(result)
            })
        }else {
            res.json(tweets.map(tweet => ({...tweet, liked_by_current_user:false})))
        }
    })
})

//일종의 미들웨어 함수 
function loginRequired(req,res,next) {
    if(!req.session || !req.session.user) {
        return res.status(401).json({error: '로그인이 필요합니다'})
    };
    next();
}

app.post('/api/tweet', loginRequired, (req,res) => {
    const {content} = req.body;

    const query = 'insert into tweet (content, user_id) values(?,?)';
    db.run(query, [content, req.session.user.id], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({error: '트윗 작성 실패'});
        }else {
            res.join({message: '트윗 작성 완료'});
        }
    });
});

app.post('/api/like/:tweet_id', loginRequired, (req,res)=> {
    const tweetId = res.params.tweet_id;
    
    const query = 'insert into like (user_id, tweet_id) values (?, ?)';
    db.run(query, [req.session.id, tweetId]);

    const query2 = 'update tweet set likes_count = likes_count + 1 where id=?'
    db.run(query2, [tweetId])

    res.json({message:'성공'});
});

app.post('/api/unlike/:tweet_id', loginRequired, (req,res)=> {
    const tweetId = res.params.tweet_id;
    
    const query = 'delete from like where user_id = ? and tweet_id =?';
    db.run(query, [req.session.id, tweetId]);

    const query2 = 'update tweet set likes_count = likes_count + 1 where id=?'
    db.run(query2, [tweetId])

    res.json({message:'성공'});
});

module.exports = router;